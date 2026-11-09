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
GOOGLE_BUSINESS_MAP = "https://www.google.com/maps?cid=2392662518453919003"

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


def is_google_business_map_url(value) -> bool:
    if not isinstance(value, str):
        return False
    value = value.lower()
    return any(
        marker in value
        for marker in (
            "google.com/maps",
            "maps.google.",
            "maps.app.goo.gl",
            "goo.gl/maps",
            "g.page/",
            "google.com/search?cid=",
        )
    )


def sync_business_map_schema(text: str) -> str:
    def rewrite(match):
        try:
            data = json.loads(match.group(2))
        except Exception:
            return match.group(0)

        if isinstance(data, dict) and isinstance(data.get("@graph"), list):
            nodes = data["@graph"]
        elif isinstance(data, list):
            nodes = data
        elif isinstance(data, dict):
            nodes = [data]
        else:
            return match.group(0)

        changed = False
        for node in nodes:
            if not isinstance(node, dict):
                continue

            is_business = has_type(node, "ProfessionalService") or (
                node.get("@id") == "https://gaeo.ru/#business"
                and any(key in node for key in ("name", "url", "legalName", "address"))
            )
            if not is_business:
                continue

            if node.get("hasMap") != GOOGLE_BUSINESS_MAP:
                node["hasMap"] = GOOGLE_BUSINESS_MAP
                changed = True

            same_as = node.get("sameAs")
            if isinstance(same_as, str):
                values = [same_as]
            elif isinstance(same_as, list):
                values = list(same_as)
            else:
                values = []

            normalized = []
            google_added = False
            for value in values:
                if is_google_business_map_url(value):
                    if not google_added:
                        normalized.append(GOOGLE_BUSINESS_MAP)
                        google_added = True
                    continue
                normalized.append(value)

            if not google_added:
                normalized.append(GOOGLE_BUSINESS_MAP)

            if normalized != values:
                node["sameAs"] = normalized
                changed = True

        if not changed:
            return match.group(0)

        rendered = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        return match.group(1) + rendered + match.group(3)

    return JSONLD_RE.sub(rewrite, text)



def visible_faq_questions(text: str) -> list[str]:
    """Use the same FAQ summaries that site_qa.py validates."""
    questions = []
    for block in FAQ_DETAILS_RE.findall(text):
        match = re.search(r"<summary\b[^>]*>([\s\S]*?)</summary>", block, re.I)
        if match:
            question = re.sub(r"\s*\+\s*$", "", clean_text(match.group(1))).strip()
            if question:
                questions.append(question)
    return questions


def faq_nodes(data) -> list[dict]:
    """Find top-level FAQPage nodes in every supported JSON-LD container."""
    if isinstance(data, dict) and isinstance(data.get("@graph"), list):
        nodes = data["@graph"]
    elif isinstance(data, list):
        nodes = data
    else:
        nodes = [data]
    return [node for node in nodes if has_type(node, "FAQPage")]


def faq_schema_questions(node: dict) -> list[str]:
    return [clean_text(str(item["name"])) for item in node.get("mainEntity", [])
            if isinstance(item, dict) and item.get("name")]


def strip_duplicate_faq_type(node: dict) -> bool:
    """Return True to remove a FAQ-only node; preserve non-FAQ co-types."""
    types = node.get("@type")
    remaining = [value for value in types if value != "FAQPage"] if isinstance(types, list) else []
    if remaining:
        node["@type"] = remaining if len(remaining) > 1 else remaining[0]
        node.pop("mainEntity", None)
        return False
    return True


def sync_faq_schema(text: str, page: str) -> str:
    """Keep one factual FAQPage across ALL JSON-LD scripts on a page.

    Prefer a canonical, already authored FAQ node. Rewrite JSON-LD only where
    a stale/duplicated node must change. This avoids the former first-script
    reserialization and repeated duplicate insertion in GitHub Actions.
    """
    questions = visible_faq_questions(text)
    pairs = visible_faq(text)
    canonical = canonical_url(text)
    if questions and not canonical:
        raise RuntimeError(f"{page}: visible FAQ exists but canonical is missing.")
    if questions and ([question for question, _ in pairs] != questions):
        raise RuntimeError(f"{page}: FAQ answers could not be read for all visible questions.")

    faq_id = canonical.rstrip("/") + "/#faq" if canonical else None
    lang = "en-US" if html_lang(text).startswith("en") else "ru-RU"
    blocks = []
    locations = []
    for match in JSONLD_RE.finditer(text):
        try:
            data = json.loads(match.group(2))
        except (TypeError, ValueError):
            continue  # site_qa.py reports invalid JSON-LD without concealing it
        index = len(blocks)
        blocks.append({"match": match, "data": data, "changed": False, "remove": False})
        for node in faq_nodes(data):
            locations.append((index, node))

    def rank(location):
        index, node = location
        entities = node.get("mainEntity") or []
        has_answers = all(
            isinstance(item, dict) and isinstance(item.get("acceptedAnswer"), dict)
            and bool(item["acceptedAnswer"].get("text"))
            for item in entities
        )
        return (faq_schema_questions(node) == questions,
                node.get("@id") == faq_id, has_answers,
                node.get("@type") == "FAQPage", index)

    keeper = max(locations, key=rank) if questions and locations else None
    keeper_node = keeper[1] if keeper else None
    for block in blocks:
        data = block["data"]
        if isinstance(data, dict) and isinstance(data.get("@graph"), list):
            graph = data["@graph"]
            kept = []
            for node in graph:
                if has_type(node, "FAQPage") and node is not keeper_node:
                    block["changed"] = True
                    if strip_duplicate_faq_type(node):
                        continue
                kept.append(node)
            if block["changed"]:
                data["@graph"] = kept
                if not kept and set(data) <= {"@context", "@graph"}:
                    block["remove"] = True
        elif isinstance(data, list):
            kept = []
            for node in data:
                if has_type(node, "FAQPage") and node is not keeper_node:
                    block["changed"] = True
                    if strip_duplicate_faq_type(node):
                        continue
                kept.append(node)
            if block["changed"]:
                block["data"] = kept
                block["remove"] = not bool(kept)
        elif has_type(data, "FAQPage") and data is not keeper_node:
            # Standalone FAQPage script: remove it, but preserve other types if mixed.
            block["changed"] = True
            block["remove"] = strip_duplicate_faq_type(data)

    if questions:
        entities = [
            {"@type": "Question", "name": question,
             "acceptedAnswer": {"@type": "Answer", "text": answer}}
            for question, answer in pairs
        ]
        if keeper is not None:
            index, node = keeper
            desired = {"@id": faq_id, "inLanguage": lang, "mainEntity": entities}
            for key, value in desired.items():
                if node.get(key) != value:
                    node[key] = value
                    blocks[index]["changed"] = True
        else:
            if not blocks:
                raise RuntimeError(f"{page}: visible FAQ exists but no parseable JSON-LD script.")
            target = blocks[-1]
            data, graph = ensure_graph(target["data"])
            if data is None or graph is None:
                raise RuntimeError(f"{page}: unsupported JSON-LD container for FAQPage.")
            graph.append({"@type": "FAQPage", "@id": faq_id,
                          "inLanguage": lang, "mainEntity": entities})
            target["data"] = data
            target["changed"] = True

    # Replace from right to left so offsets stay valid. Unchanged scripts are
    # byte-for-byte preserved (avoids cosmetic or unrelated schema diffs).
    for block in reversed(blocks):
        if not block["changed"]:
            continue
        match = block["match"]
        rendered = "" if block["remove"] else (
            match.group(1)
            + json.dumps(block["data"], ensure_ascii=False, separators=(",", ":"))
            + match.group(3)
        )
        text = text[:match.start()] + rendered + text[match.end():]
    return text


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

    text = sync_business_map_schema(text)
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
