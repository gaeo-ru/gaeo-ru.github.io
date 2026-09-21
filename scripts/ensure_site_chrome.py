#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from urllib.parse import urlparse
import re

ROOT = Path(__file__).resolve().parents[1]
PARTIALS = {
    "ru": (
        ROOT / "templates" / "partials" / "site-header.html",
        ROOT / "templates" / "partials" / "site-footer.html",
    ),
    "en": (
        ROOT / "templates" / "partials" / "site-header-en.html",
        ROOT / "templates" / "partials" / "site-footer-en.html",
    ),
}

HEADER_START = "<!-- SITE_HEADER_START -->"
HEADER_END = "<!-- SITE_HEADER_END -->"
FOOTER_START = "<!-- SITE_FOOTER_START -->"
FOOTER_END = "<!-- SITE_FOOTER_END -->"

HEADER_RE = re.compile(rf"{re.escape(HEADER_START)}[\s\S]*?{re.escape(HEADER_END)}")
FOOTER_RE = re.compile(rf"{re.escape(FOOTER_START)}[\s\S]*?{re.escape(FOOTER_END)}")
HTML_LANG_RE = re.compile(r'<html\b[^>]*\blang=["\']([^"\']+)["\']', re.I)
LINK_TAG_RE = re.compile(r"<link\b[^>]*>", re.I)
ATTR_RE = re.compile(
    r'''([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))''',
    re.S,
)


def attrs(tag: str) -> dict[str, str]:
    result = {}
    for m in ATTR_RE.finditer(tag):
        result[m.group(1).lower()] = next(
            (x for x in (m.group(2), m.group(3), m.group(4)) if x is not None),
            "",
        )
    return result


def page_language(text: str) -> str:
    match = HTML_LANG_RE.search(text)
    if match and match.group(1).lower().startswith("en"):
        return "en"
    return "ru"


def hreflang_href(text: str, code: str) -> str | None:
    for tag in LINK_TAG_RE.findall(text):
        a = attrs(tag)
        rels = {x.lower() for x in a.get("rel", "").split()}
        if "alternate" in rels and a.get("hreflang", "").lower() == code.lower():
            return a.get("href") or None
    return None


def local_href(url: str | None, fallback: str) -> str:
    if not url:
        return fallback
    parsed = urlparse(url)
    if parsed.scheme and parsed.netloc:
        if parsed.netloc.lower() not in {"gaeo.ru", "www.gaeo.ru"}:
            return fallback
        path = parsed.path or "/"
        if parsed.query:
            path += "?" + parsed.query
        if parsed.fragment:
            path += "#" + parsed.fragment
        return path
    return url if url.startswith("/") else fallback


def replace_lang_href(fragment: str, lang_class: str, href: str) -> str:
    pattern = re.compile(
        rf'(<a\b[^>]*\bclass=["\'][^"\']*\b{re.escape(lang_class)}\b[^"\']*["\'][^>]*\bhref=["\'])[^"\']*(["\'])',
        re.I,
    )
    return pattern.sub(lambda m: m.group(1) + href + m.group(2), fragment)


def render_chrome(text: str) -> tuple[str, str]:
    lang = page_language(text)
    header_path, footer_path = PARTIALS[lang]
    header = header_path.read_text(encoding="utf-8").strip()
    footer = footer_path.read_text(encoding="utf-8").strip()

    ru_href = local_href(hreflang_href(text, "ru"), "/")
    en_href = local_href(hreflang_href(text, "en"), "/en/")

    for css_class, href in (("lang-ru", ru_href), ("lang-en", en_href)):
        header = replace_lang_href(header, css_class, href)
        footer = replace_lang_href(footer, css_class, href)

    return header, footer


def sync_file(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    header, footer = render_chrome(text)

    if HEADER_START in text:
        block = f"{HEADER_START}\n{header}\n{HEADER_END}"
        text, n = HEADER_RE.subn(lambda _: block, text, count=1)
        if n != 1:
            raise RuntimeError(f"{path}: invalid shared header markers")

    if FOOTER_START in text:
        block = f"{FOOTER_START}\n{footer}\n{FOOTER_END}"
        text, n = FOOTER_RE.subn(lambda _: block, text, count=1)
        if n != 1:
            raise RuntimeError(f"{path}: invalid shared footer markers")

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    for lang, pair in PARTIALS.items():
        for p in pair:
            if not p.exists():
                raise SystemExit(f"Missing {lang} chrome partial: {p.relative_to(ROOT)}")

    changed = []
    for path in sorted(ROOT.rglob("*.html")):
        if any(part in {"templates", ".git", ".github"} for part in path.parts):
            continue
        if sync_file(path):
            changed.append(str(path.relative_to(ROOT)))

    print("Shared GAEO RU/EN header/footer synchronized.")
    if changed:
        print("Updated:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
