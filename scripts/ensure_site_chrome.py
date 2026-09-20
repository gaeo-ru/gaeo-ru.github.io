#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HEADER_PATH = ROOT / "templates" / "partials" / "site-header.html"
FOOTER_PATH = ROOT / "templates" / "partials" / "site-footer.html"

HEADER_START = "<!-- SITE_HEADER_START -->"
HEADER_END = "<!-- SITE_HEADER_END -->"
FOOTER_START = "<!-- SITE_FOOTER_START -->"
FOOTER_END = "<!-- SITE_FOOTER_END -->"

HEADER_RE = re.compile(rf"{re.escape(HEADER_START)}[\\s\\S]*?{re.escape(HEADER_END)}")
FOOTER_RE = re.compile(rf"{re.escape(FOOTER_START)}[\\s\\S]*?{re.escape(FOOTER_END)}")

header = HEADER_PATH.read_text(encoding="utf-8").strip()
footer = FOOTER_PATH.read_text(encoding="utf-8").strip()
header_block = f"{HEADER_START}\\n{header}\\n{HEADER_END}"
footer_block = f"{FOOTER_START}\\n{footer}\\n{FOOTER_END}"

changed = []
for path in sorted(ROOT.rglob("*.html")):
    if any(part in {"templates", ".git"} for part in path.parts):
        continue
    text = path.read_text(encoding="utf-8")
    original = text

    if HEADER_START in text:
        text, n = HEADER_RE.subn(header_block, text, count=1)
        if n != 1:
            raise SystemExit(f"{path}: invalid shared header markers")

    if FOOTER_START in text:
        text, n = FOOTER_RE.subn(footer_block, text, count=1)
        if n != 1:
            raise SystemExit(f"{path}: invalid shared footer markers")

    if text != original:
        path.write_text(text, encoding="utf-8")
        changed.append(str(path.relative_to(ROOT)))

print("Shared GAEO header/footer synchronized.")
if changed:
    print("Updated:", ", ".join(changed))
else:
    print("No HTML changes required.")
