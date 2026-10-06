#!/usr/bin/env python3
"""Synchronize indexability without changing the domain or editorial metadata.

staging: blocked preview; prelaunch: indexable, domain switch still pending;
production: indexable and served from the configured custom domain.
"""
from pathlib import Path
import re

from build_sitemap import is_deployable_html, INTENTIONAL_NOINDEX_PATHS
from ensure_site_metadata import set_meta_name

ROOT = Path(__file__).resolve().parents[1]
VALID_MODES = {"staging", "prelaunch", "production"}
PUBLIC_ROBOTS = "index,follow,max-image-preview:large"


def main() -> None:
    mode = (ROOT / "SITE_MODE").read_text(encoding="utf-8").strip()
    if mode not in VALID_MODES:
        raise SystemExit(f"Invalid SITE_MODE: {mode!r}")
    updated = []
    for path in sorted(ROOT.rglob("*.html")):
        if not is_deployable_html(path):
            continue
        rel = path.relative_to(ROOT).as_posix()
        if mode == "staging":
            value = "noindex,follow" if rel == "404.html" else "noindex,nofollow,noarchive"
        else:
            value = "noindex,follow" if rel in INTENTIONAL_NOINDEX_PATHS else PUBLIC_ROBOTS
        text = path.read_text(encoding="utf-8")
        revised = set_meta_name(text, "robots", value)
        if revised != text:
            path.write_text(revised, encoding="utf-8")
            updated.append(rel)
    robots = "User-agent: *\nDisallow: /\n" if mode == "staging" else (ROOT / "robots.production.txt").read_text(encoding="utf-8")
    if mode != "staging" and re.search(r"^Disallow:\s*/\s*$", robots, re.M | re.I):
        raise SystemExit("Refusing indexable mode with a site-wide robots.txt block.")
    target = ROOT / "robots.txt"
    if not target.exists() or target.read_text(encoding="utf-8") != robots:
        target.write_text(robots, encoding="utf-8")
    print(f"Indexability synchronized: mode={mode}, updated HTML={len(updated)}")
    print("Domain settings and title/description are unchanged.")


if __name__ == "__main__":
    main()
