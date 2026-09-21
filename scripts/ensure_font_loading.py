#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

START = "<!-- FONT_LOADING_START -->"
END = "<!-- FONT_LOADING_END -->"

MARKED_RE = re.compile(
    re.escape(START) + r"[\s\S]*?" + re.escape(END),
    re.I,
)

FONT_URL_RE = re.compile(
    r'https://fonts\.googleapis\.com/css2\?[^"\']+',
    re.I,
)

LEGACY_RE = re.compile(
    r'<link\s+rel=["\']preconnect["\']\s+href=["\']https://fonts\.googleapis\.com["\']\s*>\s*'
    r'<link\s+rel=["\']preconnect["\']\s+href=["\']https://fonts\.gstatic\.com["\']\s+crossorigin(?:=["\'][^"\']*["\'])?\s*>\s*'
    r'<link\s+href=["\'](?P<url>https://fonts\.googleapis\.com/css2\?[^"\']+)["\']\s+rel=["\']stylesheet["\']\s*>',
    re.I,
)


def render_block(font_url: str) -> str:
    return f"""<!-- FONT_LOADING_START -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="{font_url}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="{font_url}"></noscript>
<!-- FONT_LOADING_END -->"""


def normalize(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    if START in text or END in text:
        if not (START in text and END in text):
            raise RuntimeError(f"{path}: incomplete font loading markers.")
        marked = MARKED_RE.search(text)
        if not marked:
            raise RuntimeError(f"{path}: could not locate marked font loading block.")
        url_match = FONT_URL_RE.search(marked.group(0))
        if not url_match:
            raise RuntimeError(f"{path}: marked font loading block has no Google Fonts CSS URL.")
        text = text[:marked.start()] + render_block(url_match.group(0)) + text[marked.end():]
    else:
        legacy = LEGACY_RE.search(text)
        if legacy:
            text = text[:legacy.start()] + render_block(legacy.group("url")) + text[legacy.end():]
        elif "fonts.googleapis.com/css2?" in text:
            raise RuntimeError(
                f"{path}: Google Fonts CSS exists but the blocking legacy block was not recognized."
            )
        else:
            return False

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if normalize(path):
            changed.append(rel.as_posix())

    print(f"GAEO font loading normalized. Updated {len(changed)} pages.")
    if changed:
        print("Updated:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
