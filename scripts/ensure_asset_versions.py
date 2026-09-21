#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit
import hashlib
import re

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

LINK_RE = re.compile(r"<link\b[^>]*>", re.I)
SCRIPT_RE = re.compile(r"<script\b[^>]*>", re.I)
ATTR_RE = re.compile(
    r'''([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))''',
    re.S,
)


def attrs(tag: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for m in ATTR_RE.finditer(tag):
        result[m.group(1).lower()] = next(
            (x for x in (m.group(2), m.group(3), m.group(4)) if x is not None),
            "",
        )
    return result


def asset_path_from_url(value: str) -> Path | None:
    parsed = urlsplit(value)
    path = parsed.path
    if not path.startswith("/assets/"):
        return None
    if not path.lower().endswith((".css", ".js")):
        return None
    target = ROOT / path.lstrip("/")
    return target


def asset_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:12]


def expected_version(value: str) -> str | None:
    target = asset_path_from_url(value)
    if target is None or not target.exists():
        return None
    return asset_hash(target)


def versioned_url(value: str) -> str:
    target = asset_path_from_url(value)
    if target is None:
        return value
    if not target.exists():
        raise RuntimeError(f"Local CSS/JS asset does not exist: {value}")

    parsed = urlsplit(value)
    params = [(k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=True) if k != "v"]
    params.append(("v", asset_hash(target)))
    query = urlencode(params)
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, query, parsed.fragment))


def replace_attr(tag: str, name: str, new_value: str) -> str:
    pattern = re.compile(
        rf'''(\b{re.escape(name)}\s*=\s*)(["'])(.*?)\2''',
        re.I | re.S,
    )
    if not pattern.search(tag):
        return tag
    return pattern.sub(lambda m: m.group(1) + m.group(2) + new_value + m.group(2), tag, count=1)


def normalize_tag(tag: str) -> str:
    a = attrs(tag)
    value = None
    attr_name = None

    if tag.lower().startswith("<link"):
        rels = {x.lower() for x in a.get("rel", "").split()}
        if "stylesheet" in rels and a.get("href"):
            value = a["href"]
            attr_name = "href"
    elif tag.lower().startswith("<script") and a.get("src"):
        value = a["src"]
        attr_name = "src"

    if not value or not attr_name:
        return tag
    updated = versioned_url(value)
    if updated == value:
        return tag
    return replace_attr(tag, attr_name, updated)


def normalize_html(text: str) -> str:
    text = LINK_RE.sub(lambda m: normalize_tag(m.group(0)), text)
    text = SCRIPT_RE.sub(lambda m: normalize_tag(m.group(0)), text)
    return text


def main() -> None:
    changed = []
    refs = 0

    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        text = path.read_text(encoding="utf-8")
        original = text
        text = normalize_html(text)

        for tag in LINK_RE.findall(text) + SCRIPT_RE.findall(text):
            a = attrs(tag)
            value = a.get("href") or a.get("src") or ""
            if asset_path_from_url(value):
                refs += 1

        if text != original:
            path.write_text(text, encoding="utf-8")
            changed.append(rel.as_posix())

    print(f"CSS/JS cache-busting synchronized for {refs} local references.")
    if changed:
        print(f"Updated {len(changed)} HTML pages:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
