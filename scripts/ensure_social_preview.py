#!/usr/bin/env python3
from __future__ import annotations

from html import escape
from pathlib import Path
import re
import struct

from ensure_article_dates import load_page_article

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

FALLBACK_PATH = "/assets/gaeo-social-preview.jpg"
FALLBACK_URL = "https://gaeo.ru" + FALLBACK_PATH
FALLBACK_ALT = "GAEO.ru — Generative & Answer Engine Optimization"

TAG_RE = re.compile(r"<meta\b[^>]*>", re.I)
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


def meta_values(text: str, key: str, value: str) -> list[str]:
    result = []
    for tag in TAG_RE.findall(text):
        a = attrs(tag)
        if a.get(key, "").lower() == value.lower():
            result.append(a.get("content", ""))
    return result


def set_meta(text: str, key: str, value: str, content: str) -> str:
    pattern = re.compile(
        rf'<meta\b(?=[^>]*\b{re.escape(key)}=["\']{re.escape(value)}["\'])[^>]*>',
        re.I,
    )
    rendered = f'<meta {key}="{value}" content="{escape(content, quote=True)}">'
    if pattern.search(text):
        first = True
        def replace(match):
            nonlocal first
            if first:
                first = False
                return rendered
            return ""
        return pattern.sub(replace, text)

    if "</head>" not in text:
        raise RuntimeError(f"Cannot add {key}={value}: </head> is missing.")
    return text.replace("</head>", rendered + "\n</head>", 1)


def jpeg_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    if data[:2] != b"\xff\xd8":
        raise RuntimeError(f"{path}: not a JPEG file")
    pos = 2
    while pos < len(data):
        if data[pos] != 0xFF:
            pos += 1
            continue
        while pos < len(data) and data[pos] == 0xFF:
            pos += 1
        if pos >= len(data):
            break
        marker = data[pos]
        pos += 1
        if marker in (0xD8, 0xD9):
            continue
        if pos + 2 > len(data):
            break
        length = struct.unpack(">H", data[pos:pos+2])[0]
        if length < 2 or pos + length > len(data):
            break
        if marker in {
            0xC0, 0xC1, 0xC2, 0xC3, 0xC5, 0xC6, 0xC7,
            0xC9, 0xCA, 0xCB, 0xCD, 0xCE, 0xCF,
        }:
            if pos + 7 > len(data):
                break
            height = struct.unpack(">H", data[pos+3:pos+5])[0]
            width = struct.unpack(">H", data[pos+5:pos+7])[0]
            return width, height
        pos += length
    raise RuntimeError(f"{path}: JPEG dimensions not found")


def normalize(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text

    og_title = meta_values(text, "property", "og:title")
    og_desc = meta_values(text, "property", "og:description")
    og_image = meta_values(text, "property", "og:image")
    og_alt = meta_values(text, "property", "og:image:alt")

    if len(og_title) != 1 or len(og_desc) != 1:
        raise RuntimeError(f"{path.relative_to(ROOT)}: expected one og:title and og:description.")

    article = load_page_article(text)
    if article is None:
        image = FALLBACK_URL
        alt = FALLBACK_ALT
        text = set_meta(text, "property", "og:image", image)
        text = set_meta(text, "property", "og:image:alt", alt)
        text = set_meta(text, "property", "og:image:width", "1200")
        text = set_meta(text, "property", "og:image:height", "630")
        text = set_meta(text, "property", "og:image:type", "image/jpeg")
    else:
        if len(og_image) != 1 or not og_image[0]:
            raise RuntimeError(f"{path.relative_to(ROOT)}: Article page has no own og:image.")
        image = og_image[0]
        alt = og_alt[0] if len(og_alt) == 1 and og_alt[0] else og_title[0]

    text = set_meta(text, "name", "twitter:card", "summary_large_image")
    text = set_meta(text, "name", "twitter:title", og_title[0])
    text = set_meta(text, "name", "twitter:description", og_desc[0])
    text = set_meta(text, "name", "twitter:image", image)
    text = set_meta(text, "name", "twitter:image:alt", alt)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    fallback = ROOT / FALLBACK_PATH.lstrip("/")
    if not fallback.exists():
        raise SystemExit(f"Fallback social preview is missing: {fallback.relative_to(ROOT)}")
    width, height = jpeg_dimensions(fallback)
    if (width, height) != (1200, 630):
        raise SystemExit(f"Fallback social preview must be 1200x630; found {width}x{height}.")

    changed = []
    fallback_pages = 0
    article_pages = 0

    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        text = path.read_text(encoding="utf-8")
        if load_page_article(text) is None:
            fallback_pages += 1
        else:
            article_pages += 1
        if normalize(path):
            changed.append(rel.as_posix())

    print(
        f"Social preview normalized: fallback={fallback_pages} pages, "
        f"own Article cover={article_pages} pages."
    )
    if changed:
        print(f"Updated {len(changed)} pages:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
