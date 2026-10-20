#!/usr/bin/env python3
"""Synchronize industry and strategy lead CTAs to the canonical Ada Tours design."""
from pathlib import Path
import re
ROOT = Path(__file__).resolve().parents[1]
RU = ROOT / "templates/partials/hub-cta-ru.html"
EN = ROOT / "templates/partials/hub-cta-en.html"
CTA = re.compile(r'<div class="page-cta">[\s\S]*?</div>')
def pages():
    for directory in ("industries", "strategies", "en/industries", "en/strategies"):
        folder = ROOT / directory
        if folder.is_dir():
            yield from sorted(folder.rglob("index.html"))
    for rel in ("cases/methodlab-rost-neyrovidimosti-19-52-procenta/index.html",
                "en/cases/methodlab-ai-visibility-growth/index.html"):
        path = ROOT / rel
        if path.exists():
            yield path
def main():
    ru = RU.read_text(encoding="utf-8").strip()
    en = EN.read_text(encoding="utf-8").strip()
    changed = []
    for path in pages():
        text = path.read_text(encoding="utf-8")
        if len(CTA.findall(text)) != 1:
            raise RuntimeError(f"{path.relative_to(ROOT)}: expected 1 CTA")
        value = en if path.relative_to(ROOT).parts[0] == "en" else ru
        updated = CTA.sub(lambda _: value, text, count=1)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            changed.append(str(path.relative_to(ROOT)))
    print(f"Canonical hub CTA synchronized: {len(changed)} page(s).")
if __name__ == "__main__":
    main()
