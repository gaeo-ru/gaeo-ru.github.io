#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path
from urllib import error, request
from urllib.parse import urlparse

from build_sitemap import collect_pages

ROOT = Path(__file__).resolve().parents[1]
HOST = "gaeo.ru"
BASE = f"https://{HOST}"
ENDPOINT = "https://api.indexnow.org/indexnow"
KEY = "da791ac7b06753005d91601fa2c3a20fbf4be51db4dab804fa3a82d6335a229e"
KEY_FILE = f"{KEY}.txt"
KEY_LOCATION = f"{BASE}/{KEY_FILE}"

NON_INDEXABLE_PATHS = {
    "404.html",
    "privacy-policy/index.html",
    "personal-data-consent/index.html",
    "en/privacy-policy/index.html",
    "en/personal-data-consent/index.html",
}
SETUP_FILES = {
    "SITE_MODE",
    "scripts/indexnow_submit.py",
    KEY_FILE,
}


def site_mode() -> str:
    path = ROOT / "SITE_MODE"
    if not path.exists():
        raise SystemExit("SITE_MODE is missing.")
    mode = path.read_text(encoding="utf-8").strip()
    if mode not in {"staging", "prelaunch", "production"}:
        raise SystemExit(f"Invalid SITE_MODE: {mode!r}")
    return mode


def url_for_html_path(path: str) -> str:
    value = path.replace("\\", "/").lstrip("/")
    if value == "index.html":
        return BASE + "/"
    if value.endswith("/index.html"):
        return BASE + "/" + value[:-10]
    return BASE + "/" + value


def is_html_path(path: str) -> bool:
    return path.lower().endswith(".html")


def current_indexable_urls(mode: str) -> set[str]:
    preview = mode == "staging"
    return {loc for _, loc, _ in collect_pages(preview_staging=preview)}


def current_html_paths_by_url(mode: str) -> dict[str, str]:
    preview = mode == "staging"
    return {loc: rel for rel, loc, _ in collect_pages(preview_staging=preview)}


def git_changed(before: str | None) -> tuple[set[str], set[str], set[str]]:
    """Return (changed paths, deleted HTML paths, renamed-away HTML paths)."""
    if not before or set(before) == {"0"}:
        return set(), set(), set()

    try:
        output = subprocess.check_output(
            ["git", "diff", "--name-status", "--find-renames", before, "HEAD"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.STDOUT,
        )
    except subprocess.CalledProcessError as exc:
        raise SystemExit(f"Unable to inspect Git changes: {exc.output}") from exc

    changed: set[str] = set()
    deleted: set[str] = set()
    renamed_away: set[str] = set()

    for raw in output.splitlines():
        if not raw.strip():
            continue
        parts = raw.split("\t")
        status = parts[0]

        if status.startswith("R") and len(parts) >= 3:
            old, new = parts[1], parts[2]
            changed.update({old, new})
            if is_html_path(old):
                renamed_away.add(old)
            continue

        if len(parts) < 2:
            continue

        path = parts[1]
        changed.add(path)
        if status.startswith("D") and is_html_path(path):
            deleted.add(path)

    return changed, deleted, renamed_away


def git_file_text(commit: str, path: str) -> str | None:
    try:
        return subprocess.check_output(
            ["git", "show", f"{commit}:{path}"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        )
    except subprocess.CalledProcessError:
        return None


def was_intentionally_noindex(before: str | None, path: str) -> bool:
    if path in NON_INDEXABLE_PATHS:
        return True
    if not before or set(before) == {"0"}:
        return False
    text = git_file_text(before, path)
    if not text:
        return False
    match = re.search(
        r'<meta\b[^>]*name=["\']robots["\'][^>]*content=["\']([^"\']+)["\']',
        text,
        re.I,
    )
    if not match:
        return False
    value = match.group(1).lower().replace(" ", "")
    # Temporary staging noindex must not make a future deleted production URL invisible
    # to IndexNow. Only explicit noindex,follow service/legal pages are skipped.
    return "noindex,follow" in value


def changed_urls(before: str | None, force_all: bool, mode: str) -> list[str]:
    current_urls = current_indexable_urls(mode)
    current_by_url = current_html_paths_by_url(mode)
    changed, deleted, renamed_away = git_changed(before)

    if force_all or bool(changed & SETUP_FILES):
        return sorted(current_urls)

    urls: set[str] = set()

    # Current HTML pages touched by the release.
    for url, path in current_by_url.items():
        if path in changed:
            urls.add(url)

    # Removed and renamed-away URLs should also be submitted so engines can
    # discover the resulting 404/redirect promptly.
    for path in deleted | renamed_away:
        if was_intentionally_noindex(before, path):
            continue
        urls.add(url_for_html_path(path))

    return sorted(urls)


class TemporaryIndexNowError(RuntimeError):
    """DNS, TLS propagation, timeouts or retryable HTTP responses."""


def wait_for_key(max_attempts: int = 18, delay: int = 10) -> None:
    last_error = "key not available"
    for attempt in range(1, max_attempts + 1):
        try:
            req = request.Request(
                KEY_LOCATION,
                headers={"User-Agent": "GAEO-IndexNow/1.0"},
            )
            # Keep normal TLS verification: never submit through an invalid certificate.
            with request.urlopen(req, timeout=20) as resp:
                body = resp.read().decode("utf-8", errors="replace").strip()
                if resp.status != 200 or body != KEY or resp.geturl() != KEY_LOCATION:
                    raise RuntimeError("IndexNow key response does not match the configured key/location.")
                print(f"IndexNow key is publicly reachable: {KEY_LOCATION}")
                return
        except error.HTTPError as exc:
            if exc.code not in (404, 408, 429, 500, 502, 503, 504):
                raise
            last_error = f"HTTP {exc.code}"
        except (error.URLError, OSError) as exc:
            last_error = str(exc)
        print(f"Key check {attempt}/{max_attempts}: {last_error}")
        if attempt < max_attempts:
            time.sleep(delay)
    raise TemporaryIndexNowError(
        f"IndexNow key is temporarily unavailable: {KEY_LOCATION}: {last_error}"
    )


def payload_for(urls: list[str]) -> dict:
    return {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_LOCATION,
        "urlList": urls,
    }


def post_indexnow(urls: list[str]) -> int:
    payload = payload_for(urls)
    data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    last_error: Exception | None = None

    for attempt in range(1, 4):
        try:
            req = request.Request(
                ENDPOINT,
                data=data,
                headers={
                    "Content-Type": "application/json; charset=utf-8",
                    "User-Agent": "GAEO-IndexNow/1.0",
                },
                method="POST",
            )
            with request.urlopen(req, timeout=30) as resp:
                code = resp.status
                body = resp.read().decode("utf-8", errors="replace").strip()
                print(f"IndexNow response: HTTP {code} {body}".rstrip())
                if code in (200, 202):
                    return code
                raise RuntimeError(f"Unexpected IndexNow HTTP {code}: {body}")
        except error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace").strip()
            print(f"IndexNow HTTP error {exc.code}: {body}")
            last_error = exc
            if exc.code not in (408, 429, 500, 502, 503, 504):
                raise
        except (error.URLError, OSError) as exc:
            print(f"IndexNow attempt {attempt}/3 failed: {exc}")
            last_error = exc

        if attempt < 3:
            time.sleep(10 * attempt)

    raise TemporaryIndexNowError(f"IndexNow submission failed after retries: {last_error}")


def load_pending(path: Path | None) -> list[str]:
    if path is None or not path.exists():
        return []
    payload = json.loads(path.read_text(encoding="utf-8"))
    if any(payload.get(k) != v for k, v in payload_for([]).items() if k != "urlList"):
        raise ValueError("Pending IndexNow queue belongs to a different host/key.")
    urls = payload.get("urlList")
    if not isinstance(urls, list) or any(
        not isinstance(u, str) or urlparse(u).scheme != "https" or urlparse(u).netloc != HOST
        for u in urls
    ):
        raise ValueError("Invalid pending IndexNow URLs.")
    return urls


def save_pending(path: Path | None, urls: list[str]) -> None:
    if path is None:
        return
    if not urls:
        path.unlink(missing_ok=True)
        return
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(payload_for(urls), indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def report_submission(status: str, count: int, detail: str = "") -> None:
    print(f"INDEXNOW_SUBMISSION={status} URLS={count} {detail}".rstrip())
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_path:
        with open(summary_path, "a", encoding="utf-8") as summary:
            summary.write(f"\nIndexNow: **{status}**, URLs: {count}. {detail}\n")


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare or submit GAEO.ru URLs to IndexNow.")
    parser.add_argument("--before", default="", help="Previous Git SHA from a push event.")
    parser.add_argument("--all", action="store_true", help="Use all current indexable production URLs.")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print the payload only. Network submission and key checks are disabled.",
    )
    parser.add_argument(
        "--json",
        action="store_true",
        help="Print the IndexNow payload as JSON after the URL list.",
    )
    parser.add_argument("--defer-unavailable", action="store_true",
                        help="Queue temporary DNS/TLS/HTTP failures without failing the release.")
    parser.add_argument("--pending-file", type=Path,
                        help="Durable queue payload; merged with newly changed/deleted URLs.")
    parser.add_argument("--pending-only", action="store_true", help="Retry only the saved queue.")
    args = parser.parse_args()
    if (args.defer_unavailable or args.pending_only) and args.pending_file is None:
        parser.error("--defer-unavailable and --pending-only require --pending-file")

    mode = site_mode()
    pending = load_pending(args.pending_file)
    changed = [] if args.pending_only else changed_urls(args.before or None, args.all, mode)
    urls = sorted(set(pending) | set(changed))

    if len(urls) > 10000:
        raise SystemExit("IndexNow urlList exceeds the 10,000 URL protocol limit.")

    print(f"INDEXNOW_MODE={mode}")
    print(f"INDEXNOW_DRY_RUN={'yes' if args.dry_run else 'no'}")
    print(f"INDEXNOW_URLS={len(urls)}")
    for url in urls:
        print("INDEXNOW_URL", url)

    if args.json and urls:
        print(json.dumps(payload_for(urls), ensure_ascii=False, indent=2))

    if not urls:
        print("IndexNow: no URLs to submit.")
        return

    if args.dry_run:
        print("INDEXNOW_SUBMISSION=SKIPPED_DRY_RUN")
        return

    if mode != "production":
        raise SystemExit(
            "Refusing IndexNow network submission because SITE_MODE is not production. "
            "Use --dry-run before the production domain switch."
        )

    # Save before any network operation; failures retain changed and removed URLs.
    save_pending(args.pending_file, urls)
    try:
        wait_for_key()
        code = post_indexnow(urls)
    except TemporaryIndexNowError as exc:
        if not args.defer_unavailable:
            raise SystemExit(str(exc)) from exc
        print(f"::warning title=IndexNow deferred::{exc}")
        report_submission("DEFERRED", len(urls), "Saved for retry; production release is unaffected.")
        return
    save_pending(args.pending_file, [])
    report_submission("SUCCESS", len(urls), f"HTTP={code}")


if __name__ == "__main__":
    main()

