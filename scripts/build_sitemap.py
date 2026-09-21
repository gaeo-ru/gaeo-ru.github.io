#!/usr/bin/env python3
from __future__ import annotations

from argparse import ArgumentParser
from datetime import date
from pathlib import Path
from urllib.parse import urlparse
import json
import re
import subprocess
import sys
import xml.sax.saxutils as xmlutils

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://gaeo.ru"

HTML_EXCLUDED_DIRS = {
    ".git",
    ".github",
    "templates",
}
EXCLUDED_FILES = {
    "404.html",
}
INTENTIONAL_NOINDEX_PATHS = {
    "404.html",
    "privacy-policy/index.html",
    "personal-data-consent/index.html",
    "en/privacy-policy/index.html",
    "en/personal-data-consent/index.html",
}

CANONICAL_RE = re.compile(
    r'<link\b[^>]*\brel=["\']canonical["\'][^>]*\bhref=["\']([^"\']+)["\'][^>]*>',
    re.I,
)
CANONICAL_RE_ALT = re.compile(
    r'<link\b[^>]*\bhref=["\']([^"\']+)["\'][^>]*\brel=["\']canonical["\'][^>]*>',
    re.I,
)
ROBOTS_RE = re.compile(
    r'<meta\b[^>]*\bname=["\']robots["\'][^>]*\bcontent=["\']([^"\']+)["\'][^>]*>',
    re.I,
)
ROBOTS_RE_ALT = re.compile(
    r'<meta\b[^>]*\bcontent=["\']([^"\']+)["\'][^>]*\bname=["\']robots["\'][^>]*>',
    re.I,
)
JSONLD_RE = re.compile(
    r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>',
    re.I,
)
DATE_RE = re.compile(r"\d{4}-\d{2}-\d{2}")


def relpath(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def is_deployable_html(path: Path) -> bool:
    rel = path.relative_to(ROOT)
    if any(part in HTML_EXCLUDED_DIRS for part in rel.parts):
        return False
    return path.name.endswith(".html")


def canonical_url(text: str) -> str | None:
    match = CANONICAL_RE.search(text) or CANONICAL_RE_ALT.search(text)
    if not match:
        return None
    value = match.group(1).strip()
    parsed = urlparse(value)
    if parsed.scheme != "https" or parsed.netloc not in {"gaeo.ru", "www.gaeo.ru"}:
        return None
    if parsed.netloc == "www.gaeo.ru":
        value = "https://gaeo.ru" + parsed.path
        if parsed.query:
            value += "?" + parsed.query
    return value


def robots_content(text: str) -> str:
    match = ROBOTS_RE.search(text) or ROBOTS_RE_ALT.search(text)
    return match.group(1).strip().lower() if match else ""


def staging_noindex_only(robots: str) -> bool:
    tokens = {item.strip() for item in robots.split(",") if item.strip()}
    return {"noindex", "nofollow", "noarchive"}.issubset(tokens)


def jsonld_nodes(text: str):
    for raw in JSONLD_RE.findall(text):
        try:
            parsed = json.loads(raw)
        except Exception:
            continue
        if isinstance(parsed, dict) and isinstance(parsed.get("@graph"), list):
            nodes = parsed["@graph"]
        elif isinstance(parsed, list):
            nodes = parsed
        else:
            nodes = [parsed]
        for node in nodes:
            if isinstance(node, dict):
                yield node


def node_types(node: dict) -> set[str]:
    value = node.get("@type")
    if isinstance(value, list):
        return {str(v) for v in value}
    return {str(value)} if value else set()


def semantic_lastmod(text: str) -> str | None:
    nodes = list(jsonld_nodes(text))
    priority_types = (
        "Article",
        "ProfilePage",
        "CollectionPage",
        "WebPage",
        "ProfessionalService",
    )
    for wanted in priority_types:
        for node in nodes:
            if wanted not in node_types(node):
                continue
            for field in ("dateModified", "datePublished"):
                value = str(node.get(field) or "")[:10]
                if DATE_RE.fullmatch(value):
                    return value
    return None


def git_lastmod(path: Path) -> str:
    rel = relpath(path)
    try:
        value = subprocess.check_output(
            ["git", "log", "-1", "--format=%cs", "--", rel],
            cwd=ROOT,
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
        if DATE_RE.fullmatch(value):
            return value
    except Exception:
        pass
    return date.today().isoformat()


def page_lastmod(path: Path, text: str) -> str:
    return semantic_lastmod(text) or git_lastmod(path)


def collect_pages(preview_staging: bool) -> list[tuple[str, str, str]]:
    pages = []
    canonical_seen = {}

    for path in sorted(ROOT.rglob("*.html")):
        if not is_deployable_html(path):
            continue

        rel = relpath(path)
        if rel in EXCLUDED_FILES:
            continue

        text = path.read_text(encoding="utf-8")
        robots = robots_content(text)

        if "noindex" in robots:
            if not preview_staging:
                continue
            if rel in INTENTIONAL_NOINDEX_PATHS:
                continue
            if not staging_noindex_only(robots):
                continue

        canonical = canonical_url(text)
        if not canonical:
            raise RuntimeError(f"{rel}: missing or non-production canonical")

        if "gaeo-ru.github.io" in canonical or canonical.startswith(BASE + "/templates/"):
            raise RuntimeError(f"{rel}: staging/technical canonical is not allowed: {canonical}")

        previous = canonical_seen.get(canonical)
        if previous:
            raise RuntimeError(f"Duplicate canonical {canonical}: {previous} and {rel}")
        canonical_seen[canonical] = rel

        pages.append((rel, canonical, page_lastmod(path, text)))

    pages.sort(key=lambda row: (0 if row[1] == BASE + "/" else 1, row[1]))
    return pages


def render_sitemap(pages: list[tuple[str, str, str]]) -> str:
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for _, loc, modified in pages:
        lines.append(
            f"  <url><loc>{xmlutils.escape(loc)}</loc>"
            f"<lastmod>{modified}</lastmod></url>"
        )
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = ArgumentParser(description="Build GAEO.ru sitemap.xml from canonical HTML pages.")
    parser.add_argument(
        "--preview-staging",
        action="store_true",
        help=(
            "Treat the site-wide staging noindex,nofollow,noarchive directive as temporary. "
            "Intentional legal/service noindex pages remain excluded."
        ),
    )
    parser.add_argument(
        "--output",
        default="sitemap.xml",
        help="Output path relative to the repository root. Use '-' to print XML only.",
    )
    parser.add_argument(
        "--check-only",
        action="store_true",
        help="Validate and print URL inventory without writing a sitemap file.",
    )
    args = parser.parse_args()

    pages = collect_pages(args.preview_staging)
    if not pages:
        raise RuntimeError(
            "No sitemap URLs selected. On staging use --preview-staging; "
            "on production make sure indexable pages no longer have noindex."
        )

    content = render_sitemap(pages)
    print(f"SITEMAP_URLS={len(pages)}")
    for rel, loc, modified in pages:
        print(f"URL\t{modified}\t{rel}\t{loc}")

    if args.check_only:
        print("SITEMAP_CHECK=PASS")
        return 0

    if args.output == "-":
        sys.stdout.write(content)
        return 0

    target = ROOT / args.output
    if target.exists() and target.read_text(encoding="utf-8") == content:
        print(f"{args.output} already current.")
        return 0

    target.write_text(content, encoding="utf-8")
    print(f"Updated {args.output} with {len(pages)} URLs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
