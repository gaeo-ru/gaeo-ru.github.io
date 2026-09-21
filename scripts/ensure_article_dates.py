#!/usr/bin/env python3
from __future__ import annotations

from datetime import date
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlparse
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

JSONLD_RE = re.compile(
    r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)([\s\S]*?)(</script>)',
    re.I,
)
ARTICLE_META_RE = re.compile(
    r'<div\b[^>]*class=["\'][^"\']*\barticle-meta\b[^"\']*["\'][^>]*>[\s\S]*?</div>',
    re.I,
)
SPAN_RE = re.compile(r'<span\b[^>]*>([\s\S]*?)</span>', re.I)
CANONICAL_RE = re.compile(
    r'<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*\bhref=["\']([^"\']+)["\'][^>]*>',
    re.I,
)
CANONICAL_ALT_RE = re.compile(
    r'<link\b(?=[^>]*\bhref=["\']([^"\']+)["\'])[^>]*\brel=["\']canonical["\'][^>]*>',
    re.I,
)
META_PROPERTY_RE_TEMPLATE = (
    r'<meta\b(?=[^>]*\bproperty=["\']{prop}["\'])[^>]*>'
)

RU_MONTHS = {
    1: "января", 2: "февраля", 3: "марта", 4: "апреля",
    5: "мая", 6: "июня", 7: "июля", 8: "августа",
    9: "сентября", 10: "октября", 11: "ноября", 12: "декабря",
}
EN_MONTHS = {
    1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December",
}


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\s+", " ", unescape(value)).strip()


def canonical_url(text: str) -> str | None:
    m = CANONICAL_RE.search(text) or CANONICAL_ALT_RE.search(text)
    return m.group(1).strip() if m else None


def html_lang(text: str) -> str:
    m = re.search(r'<html\b[^>]*\blang=["\']([^"\']+)["\']', text, re.I)
    return (m.group(1).lower() if m else "ru")


def valid_iso(value: str) -> bool:
    try:
        date.fromisoformat(value)
        return bool(re.fullmatch(r"\d{4}-\d{2}-\d{2}", value))
    except Exception:
        return False


def format_date(value: str, lang: str) -> str:
    d = date.fromisoformat(value)
    if lang.startswith("en"):
        return f"{EN_MONTHS[d.month]} {d.day}, {d.year}"
    return f"{d.day} {RU_MONTHS[d.month]} {d.year}"


def node_types(node: dict) -> set[str]:
    value = node.get("@type")
    values = value if isinstance(value, list) else [value]
    return {str(v) for v in values if v}


def article_matches_page(node: dict, canonical: str) -> bool:
    if "Article" not in node_types(node):
        return False
    url = str(node.get("url") or "").split("#", 1)[0].rstrip("/") + "/"
    canon = canonical.split("#", 1)[0].rstrip("/") + "/"
    if url and url == canon:
        return True
    node_id = str(node.get("@id") or "").split("#", 1)[0].rstrip("/") + "/"
    return bool(node_id and node_id == canon)


def find_article(data, canonical: str) -> dict | None:
    if isinstance(data, dict) and isinstance(data.get("@graph"), list):
        nodes = data["@graph"]
    elif isinstance(data, list):
        nodes = data
    else:
        nodes = [data]
    for node in nodes:
        if isinstance(node, dict) and article_matches_page(node, canonical):
            return node
    return None


def load_page_article(text: str):
    canonical = canonical_url(text)
    if not canonical:
        return None
    for match in JSONLD_RE.finditer(text):
        try:
            data = json.loads(match.group(2))
        except Exception:
            continue
        article = find_article(data, canonical)
        if article is not None:
            return match, data, article
    return None


def set_meta_property(text: str, prop: str, value: str) -> str:
    pattern = re.compile(META_PROPERTY_RE_TEMPLATE.format(prop=re.escape(prop)), re.I)
    tag = f'<meta property="{prop}" content="{escape(value, quote=True)}">'
    if pattern.search(text):
        first = True
        def replace(match):
            nonlocal first
            if first:
                first = False
                return tag
            return ""
        return pattern.sub(replace, text)

    marker = "</head>"
    if marker not in text:
        raise RuntimeError(f"Cannot add {prop}: </head> is missing.")
    return text.replace(marker, tag + "\n" + marker, 1)


def normalized_article_meta(text: str, published: str, modified: str, lang: str) -> str:
    match = ARTICLE_META_RE.search(text)
    if not match:
        raise RuntimeError("Article page has no visible .article-meta block.")

    spans = SPAN_RE.findall(match.group(0))
    author = clean_text(spans[0]) if spans else ""
    if not author:
        raise RuntimeError("Article page .article-meta has no author/name span.")

    pub_label = "Published" if lang.startswith("en") else "Опубликовано"
    mod_label = "Updated" if lang.startswith("en") else "Обновлено"
    rendered = (
        '<div class="article-meta">'
        f'<span>{escape(author)}</span>'
        f'<span>{pub_label}: {escape(format_date(published, lang))}</span>'
        f'<span>{mod_label}: {escape(format_date(modified, lang))}</span>'
        '</div>'
    )
    return text[:match.start()] + rendered + text[match.end():]


def normalize(path: Path) -> tuple[bool, bool]:
    text = path.read_text(encoding="utf-8")
    original = text
    found = load_page_article(text)
    if found is None:
        return False, False

    match, data, article = found
    published = str(article.get("datePublished") or "")[:10]
    modified = str(article.get("dateModified") or published)[:10]

    if not valid_iso(published):
        raise RuntimeError(f"{path.relative_to(ROOT)}: Article.datePublished is invalid or missing: {published!r}")
    if not valid_iso(modified):
        raise RuntimeError(f"{path.relative_to(ROOT)}: Article.dateModified is invalid: {modified!r}")
    if date.fromisoformat(modified) < date.fromisoformat(published):
        raise RuntimeError(
            f"{path.relative_to(ROOT)}: dateModified {modified} is earlier than datePublished {published}."
        )

    if article.get("dateModified") != modified:
        article["dateModified"] = modified
    if article.get("datePublished") != published:
        article["datePublished"] = published

    rendered_json = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    text = text[:match.start()] + match.group(1) + rendered_json + match.group(3) + text[match.end():]

    lang = html_lang(text)
    text = normalized_article_meta(text, published, modified, lang)
    text = set_meta_property(text, "article:published_time", published)
    text = set_meta_property(text, "article:modified_time", modified)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True, True
    return False, True


def main() -> None:
    changed = []
    article_pages = 0

    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        did_change, is_article = normalize(path)
        if is_article:
            article_pages += 1
        if did_change:
            changed.append(rel.as_posix())

    print(f"Article date metadata synchronized across {article_pages} Article pages.")
    if changed:
        print(f"Updated {len(changed)} pages:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
