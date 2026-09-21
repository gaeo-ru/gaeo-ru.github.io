#!/usr/bin/env python3
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse, urlunparse
from urllib.request import Request, urlopen
import argparse
import re
import sys
import time

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}
PRODUCTION_HOSTS = {"gaeo.ru", "www.gaeo.ru"}
USER_AGENT = "GAEO-Staging-Crawl/1.0 (+https://gaeo.ru/)"


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.refs: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {k.lower(): (v or "") for k, v in attrs}
        tag = tag.lower()
        if tag == "a" and values.get("href"):
            self.refs.append(("link", values["href"]))
        elif tag in {"img", "script", "iframe", "source", "video", "audio"} and values.get("src"):
            self.refs.append(("asset", values["src"]))
        elif tag == "link" and values.get("href"):
            rel = {x.lower() for x in values.get("rel", "").split()}
            if rel & {"stylesheet", "icon", "preload", "manifest"}:
                self.refs.append(("asset", values["href"]))
        if tag in {"img", "source"} and values.get("srcset"):
            for part in values["srcset"].split(","):
                candidate = part.strip().split(" ", 1)[0]
                if candidate:
                    self.refs.append(("asset", candidate))


def page_paths() -> list[Path]:
    result = []
    for path in ROOT.rglob("*.html"):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if rel.as_posix() == "404.html":
            continue
        result.append(path)
    return sorted(result)


def route_for(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[:-10]
    return "/" + rel


def clean_internal_url(base_url: str, ref: str, staging_origin: str) -> str | None:
    value = ref.strip()
    if not value or value.startswith(("#", "mailto:", "tel:", "data:", "javascript:")):
        return None

    absolute = urljoin(base_url, value)
    parsed = urlparse(absolute)
    staging_host = urlparse(staging_origin).hostname
    if parsed.hostname not in ({staging_host} | PRODUCTION_HOSTS):
        return None

    path = parsed.path or "/"
    normalized = parsed._replace(
        scheme=urlparse(staging_origin).scheme,
        netloc=urlparse(staging_origin).netloc,
        path=path,
        params="",
        query="",
        fragment="",
    )
    return urlunparse(normalized)


def fetch(url: str, timeout: int, retries: int = 3) -> tuple[int, str, str]:
    last_error: Exception | None = None
    for attempt in range(1, retries + 1):
        request = Request(url, headers={"User-Agent": USER_AGENT})
        try:
            with urlopen(request, timeout=timeout) as response:
                body = response.read().decode("utf-8", errors="replace")
                return response.status, response.geturl(), body
        except HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            return exc.code, exc.geturl(), body
        except (URLError, TimeoutError) as exc:
            last_error = exc
            if attempt < retries:
                time.sleep(attempt * 2)
    raise RuntimeError(f"request failed after {retries} attempts: {url}: {last_error}")


def main() -> int:
    parser = argparse.ArgumentParser(description="HTTP crawl of deployed GAEO GitHub staging.")
    parser.add_argument("--origin", default="https://gaeo-ru.github.io")
    parser.add_argument("--timeout", type=int, default=20)
    args = parser.parse_args()

    origin = args.origin.rstrip("/")
    expected_pages = {origin + route_for(path) for path in page_paths()}
    errors: list[str] = []
    warnings: list[str] = []
    checked: dict[str, int] = {}
    html_bodies: dict[str, str] = {}

    print(f"Expected HTML routes: {len(expected_pages)}")

    for url in sorted(expected_pages):
        try:
            status, final_url, body = fetch(url, args.timeout)
        except Exception as exc:
            errors.append(str(exc))
            continue
        checked[url] = status
        if status != 200:
            errors.append(f"{url}: HTTP {status}, expected 200")
            continue
        final_host = urlparse(final_url).hostname
        if final_host != urlparse(origin).hostname:
            errors.append(f"{url}: redirected off staging to {final_url}")
            continue
        html_bodies[url] = body

    discovered: dict[str, set[str]] = {}
    for page_url, body in html_bodies.items():
        parser_obj = LinkParser()
        try:
            parser_obj.feed(body)
        except Exception as exc:
            warnings.append(f"{page_url}: HTML parser warning: {exc}")
        for kind, ref in parser_obj.refs:
            target = clean_internal_url(page_url, ref, origin)
            if not target:
                continue
            discovered.setdefault(target, set()).add(page_url)

    print(f"Unique internal link/resource targets: {len(discovered)}")

    for target, sources in sorted(discovered.items()):
        if target in checked:
            status = checked[target]
        else:
            try:
                status, final_url, _ = fetch(target, args.timeout)
                checked[target] = status
            except Exception as exc:
                errors.append(str(exc))
                continue
            if status == 200 and urlparse(final_url).hostname != urlparse(origin).hostname:
                errors.append(f"{target}: redirected off staging to {final_url}")
        if status >= 400:
            sample = ", ".join(sorted(sources)[:3])
            errors.append(f"{target}: HTTP {status}; referenced from {sample}")

    # Detect orphan HTML routes: every page except homepage should be linked from at least one HTML page.
    linked_pages = {u for u in discovered if u in expected_pages}
    home = origin + "/"
    for url in sorted(expected_pages - linked_pages - {home}):
        warnings.append(f"orphan route (not linked by crawled HTML): {url}")

    # Real GitHub Pages 404 check.
    probe = origin + "/__gaeo_missing_404_probe__/"
    try:
        status, final_url, body = fetch(probe, args.timeout, retries=1)
        if status != 404:
            errors.append(f"404 probe returned HTTP {status}, expected 404: {probe}")
        if urlparse(final_url).hostname != urlparse(origin).hostname:
            errors.append(f"404 probe redirected off staging to {final_url}")
        if len(re.sub(r"\s+", " ", body).strip()) < 100:
            errors.append("404 response body is unexpectedly empty/short.")
    except Exception as exc:
        errors.append(f"404 probe failed: {exc}")

    print(f"HTTP targets checked: {len(checked)}")
    if warnings:
        print("\nWARNINGS")
        for item in warnings:
            print(f"- {item}")

    if errors:
        print("\nERRORS")
        for item in errors:
            print(f"- {item}")
        print(f"\nFAIL: {len(errors)} error(s), {len(warnings)} warning(s).")
        return 1

    print(f"\nPASS: deployed staging crawl completed with 0 errors and {len(warnings)} warning(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
