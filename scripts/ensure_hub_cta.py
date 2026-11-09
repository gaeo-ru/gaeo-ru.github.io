#!/usr/bin/env python3
"""Sync legacy hub CTA blocks and preserve current page-specific CTA designs."""

from html.parser import HTMLParser
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
RU = ROOT / "templates/partials/hub-cta-ru.html"
EN = ROOT / "templates/partials/hub-cta-en.html"
LEGACY_CTA = re.compile(r'<div class="page-cta">[\s\S]*?</div>')


class LeadButtonParser(HTMLParser):
    """Find CTA buttons inside the actual page content, not in site chrome."""

    def __init__(self, expected_href):
        super().__init__(convert_charrefs=True)
        self.expected_href = expected_href
        self.inside_main = False
        self.buttons = 0

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.inside_main = True
        elif tag == "a" and self.inside_main:
            attrs = dict(attrs)
            if (attrs.get("href") == self.expected_href
                    and "button" in attrs.get("class", "").split()):
                self.buttons += 1

    def handle_endtag(self, tag):
        if tag == "main":
            self.inside_main = False


def has_page_cta(html, english):
    target = "/en/#lead" if english else "/#lead"
    parser = LeadButtonParser(target)
    parser.feed(html)
    parser.close()
    return parser.buttons > 0


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
    templates = {
        False: RU.read_text(encoding="utf-8").strip(),
        True: EN.read_text(encoding="utf-8").strip(),
    }
    changed = []
    preserved = 0
    synchronized = 0
    for path in pages():
        html = path.read_text(encoding="utf-8")
        english = path.relative_to(ROOT).parts[0] == "en"
        count = len(LEGACY_CTA.findall(html))
        if count > 1:
            raise RuntimeError(f"{path.relative_to(ROOT)}: found {count} legacy page-cta blocks")
        if count == 1:
            # Only the old generic block is replaced with its canonical partial.
            updated = LEGACY_CTA.sub(lambda _: templates[english], html, count=1)
            synchronized += 1
            if updated != html:
                path.write_text(updated, encoding="utf-8")
                changed.append(str(path.relative_to(ROOT)))
        elif has_page_cta(html, english):
            # Astro pages have their own CTA text and often several lead buttons.
            # Do not overwrite them or add a second generic CTA.
            preserved += 1
        else:
            target = "/en/#lead" if english else "/#lead"
            raise RuntimeError(
                f"{path.relative_to(ROOT)}: no legacy page-cta or page-content CTA button to {target}"
            )
    print(
        f"Hub CTAs verified: {synchronized} legacy blocks synchronized, "
        f"{preserved} native pages preserved, {len(changed)} file(s) changed."
    )


if __name__ == "__main__":
    main()
