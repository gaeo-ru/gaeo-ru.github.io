#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

FONT_URL = (
    "https://fonts.googleapis.com/css2?"
    "family=Literata:opsz,wght@7..72,500;7..72,600&"
    "family=Manrope:wght@400;500;600;700&"
    "display=swap&subset=cyrillic"
)
START = "<!-- FONT_LOADING_START -->"
END = "<!-- FONT_LOADING_END -->"

BLOCK = f"""<!-- FONT_LOADING_START -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="{FONT_URL}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="{FONT_URL}"></noscript>
<!-- FONT_LOADING_END -->"""

MARKED_RE = re.compile(
    re.escape(START) + r"[\s\S]*?" + re.escape(END),
    re.I,
)

LEGACY_RE = re.compile(
    r'<link\s+rel=["\']preconnect["\']\s+href=["\']https://fonts\.googleapis\.com["\']\s*>\s*'
    r'<link\s+rel=["\']preconnect["\']\s+href=["\']https://fonts\.gstatic\.com["\']\s+crossorigin(?:=["\'][^"\']*["\'])?\s*>\s*'
    r'<link\s+href=["\']'
    + re.escape(FONT_URL)
    + r'["\']\s+rel=["\']stylesheet["\']\s*>',
    re.I,
)


def normalize(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    if START in text or END in text:
        if not (START in text and END in text):
            raise RuntimeError(f"{path}: incomplete font loading markers.")
        text, count = MARKED_RE.subn(BLOCK, text, count=1)
        if count != 1:
            raise RuntimeError(f"{path}: could not normalize marked font loading block.")
    elif FONT_URL in text:
        text, count = LEGACY_RE.subn(BLOCK, text, count=1)
        if count != 1:
            raise RuntimeError(
                f"{path}: Google Fonts URL exists but legacy blocking block was not recognized."
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
