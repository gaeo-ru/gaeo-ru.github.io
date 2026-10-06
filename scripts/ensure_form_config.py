#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}
CONFIG_SRC = "/assets/form-config.js"

SITE_JS_RE = re.compile(
    r'(?P<tag><script\b[^>]*\bsrc=["\']/assets/site\.js(?:\?[^"\']*)?["\'][^>]*></script>)',
    re.I,
)
CONFIG_RE = re.compile(
    r'<script\b[^>]*\bsrc=["\']/assets/form-config\.js(?:\?[^"\']*)?["\'][^>]*></script>\s*',
    re.I,
)


def normalize(text: str) -> tuple[str, bool]:
    original = text
    if not SITE_JS_RE.search(text):
        return text, False

    # Keep exactly one public form configuration include and always load it
    # before site.js, because site.js reads window.GAEO_FORM_ENDPOINT.
    text = CONFIG_RE.sub("", text)
    text = SITE_JS_RE.sub(
        lambda m: f'<script src="{CONFIG_SRC}"></script>\n{m.group("tag")}',
        text,
        count=1,
    )
    return text, text != original


def main() -> None:
    changed = []
    checked = 0
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        text = path.read_text(encoding="utf-8")
        if not SITE_JS_RE.search(text):
            continue
        checked += 1
        updated, did_change = normalize(text)
        if did_change:
            path.write_text(updated, encoding="utf-8")
            changed.append(rel.as_posix())

    print(f"GAEO form config include checked on {checked} HTML pages.")
    if changed:
        print(f"Updated {len(changed)} pages:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
