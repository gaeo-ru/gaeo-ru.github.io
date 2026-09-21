#!/usr/bin/env python3
from __future__ import annotations

from html import unescape
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}
GOOGLE_VERIFICATION = "2nIA9bL_leEm2TniUtryyUUtEiKU5k9syCqxJRLELw0"
YANDEX_VERIFICATION = "7936ae703c9ab353"

JSONLD_RE = re.compile(
    r'(<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>)([\s\S]*?)(</script>)',
    re.I,
)
TAG_RE = re.compile(r"<([a-zA-Z0-9:-]+)\b([^>]*)>", re.S)
ATTR_RE = re.compile(
    r'''([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))''',
    re.S,
)
FAQ_DETAILS_RE = re.compile(
    r'<details\b[^>]*class=["\'][^"\']*\bfaq-item\b[^"\']*["\'][^>]*>([\s\S]*?)</details>',
    re.I,
)


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\s+", " ", unescape(value)).strip()


def attrs(fragment: str) -> dict[str, str]:
    result = {}
    for m in ATTR_RE.finditer(fragment):
        result[m.group(1).lower()] = next(
            (x for x in (m.group(2), m.group(3), m.group(4)) if x is not None),
            "",
        )
    return result


def tags(text: str, name: str) -> list[dict[str, str]]:
    result = []
    for m in TAG_RE.finditer(text):
        if m.group(1).lower() == name.lower():
            result.append(attrs(m.group(2)))
    return result


def canonical_url(text: str) -> str | None:
    for item in tags(text, "link"):
        if "canonical" in {x.lower() for x in item.get("rel", "").split()}:
            return item.get("href") or None
    return None


def html_lang(text: str) -> str:
    items = tags(text, "html")
    return items[0].get("lang", "ru").lower() if items else "ru"


def set_meta_property(text: str, prop: str, value: str) -> str:
    rendered = f'<meta property="{prop}" content="{value}">'
    pattern = re.compile(
        rf'<meta\b(?=[^>]*\bproperty=["\']{re.escape(prop)}["\'])[^>]*>',
        re.I,
    )
    matches = list(pattern.finditer(text))
    if matches:
        text = pattern.sub(rendered, text, count=1)
        # Remove accidental duplicates after the canonical first tag.
        first = True
        def dedupe(match):
            nonlocal first
            if first:
                first = False
                return match.group(0)
            return ""
        text = pattern.sub(dedupe, text)
        return text

    marker = "</head>"
    if marker in text:
        return text.replace(marker, rendered + "\n" + marker, 1)
    return text


def set_meta_name(text: str, name: str, value: str) -> str:
    rendered = f'<meta name="{name}" content="{value}">'
    pattern = re.compile(
        rf"""<meta\b(?=[^>]*\bname=["']{re.escape(name)}["'])[^>]*>""",
        re.I,
    )
    matches = list(pattern.finditer(text))
    if matches:
        text = pattern.sub(rendered, text, count=1)
        first = True
        def dedupe(match):
            nonlocal first
            if first:
                first = False
                return match.group(0)
            return ""
        return pattern.sub(dedupe, text)

    marker = "</head>"
    if marker in text:
        return text.replace(marker, rendered + "\n" + marker, 1)
    return text


def visible_faq(text: str) -> list[tuple[str, str]]:
    items = []
    for block in FAQ_DETAILS_RE.findall(text):
        q = re.search(r"<summary\b[^>]*>([\s\S]*?)</summary>", block, re.I)
        a = re.search(
            r'<(?:div|p)\b[^>]*class=["\'][^"\']*\bfaq-a\b[^"\']*["\'][^>]*>([\s\S]*?)</(?:div|p)>',
            block,
            re.I,
        )
        if not q or not a:
            continue
        question = clean_text(q.group(1))
        question = re.sub(r"\s*\+\s*$", "", question).strip()
        answer = clean_text(a.group(1))
        if question and answer:
            items.append((question, answer))
    return items


def load_jsonld(text: str):
    match = JSONLD_RE.search(text)
    if not match:
        return None, None
    try:
        return match, json.loads(match.group(2))
    except Exception:
        return match, None


def ensure_graph(data):
    if isinstance(data, dict) and isinstance(data.get("@graph"), list):
        return data, data["@graph"]
    if isinstance(data, dict):
        context = data.get("@context", "https://schema.org")
        node = {k: v for k, v in data.items() if k != "@context"}
        wrapped = {"@context": context, "@graph": [node]}
        return wrapped, wrapped["@graph"]
    if isinstance(data, list):
        wrapped = {"@context": "https://schema.org", "@graph": data}
        return wrapped, wrapped["@graph"]
    return None, None


def has_type(node, wanted: str) -> bool:
    if not isinstance(node, dict):
        return False
    value = node.get("@type")
    values = value if isinstance(value, list) else [value]
    return wanted in values


def sync_faq_schema(text: str, page: str) -> str:
    items = visible_faq(text)
    match, data = load_jsonld(text)

    # Legal pages may intentionally have no JSON-LD; there is nothing to sync.
    if match is None or data is None:
        return text

    data, graph = ensure_graph(data)
    if data is None or graph is None:
        return text

    graph[:] = [node for node in graph if not has_type(node, "FAQPage")]

    if items:
        canonical = canonical_url(text)
        if not canonical:
            raise RuntimeError(f"{page}: visible FAQ exists but canonical is missing.")
        lang = "en-US" if html_lang(text).startswith("en") else "ru-RU"
        graph.append(
            {
                "@type": "FAQPage",
                "@id": canonical.rstrip("/") + "/#faq",
                "inLanguage": lang,
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": question,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": answer,
                        },
                    }
                    for question, answer in items
                ],
            }
        )

    rendered = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return text[:match.start()] + match.group(1) + rendered + match.group(3) + text[match.end():]


def normalize(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    page = path.relative_to(ROOT).as_posix()

    # Repair accidental concatenation of the production base with an already absolute URL.
    text = re.sub(r"https://gaeo\.ru(?=https?://)", "", text)

    canonical = canonical_url(text)
    lang = html_lang(text)

    if page == "index.html":
        text = set_meta_name(text, "google-site-verification", GOOGLE_VERIFICATION)
        text = set_meta_name(text, "yandex-verification", YANDEX_VERIFICATION)

    if canonical:
        text = set_meta_property(text, "og:site_name", "GAEO.ru")
        text = set_meta_property(text, "og:locale", "en_US" if lang.startswith("en") else "ru_RU")
        text = set_meta_property(text, "og:url", canonical)

    text = sync_faq_schema(text, page)

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

    print(f"GAEO metadata normalized. Updated {len(changed)} pages.")
    if changed:
        print("Updated:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
