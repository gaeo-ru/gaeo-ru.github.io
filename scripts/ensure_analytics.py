#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

from ensure_asset_versions import versioned_url

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github", "templates"}

ANALYTICS_SRC = "/assets/analytics.js"
ANALYTICS_TAG_RE = re.compile(
    r'<script\b[^>]*\bsrc=["\']/assets/analytics\.js(?:\?[^"\']*)?["\'][^>]*>\s*</script>',
    re.I,
)
LEGACY_METRIKA_SCRIPT_RE = re.compile(
    r'<!--\s*Yandex\.Metrika counter[\s\S]*?<!--\s*/Yandex\.Metrika counter\s*-->',
    re.I,
)
LEGACY_METRIKA_NOSCRIPT_RE = re.compile(
    r'<noscript>\s*<div>\s*<img\b[^>]*mc\.yandex\.ru/watch/[^>]*>\s*</div>\s*</noscript>',
    re.I,
)


def analytics_tag() -> str:
    src = versioned_url(ANALYTICS_SRC)
    return f'<script src="{src}" defer></script>'


def normalize(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    original = text
    tag = analytics_tag()

    existing = ANALYTICS_TAG_RE.findall(text)
    has_legacy = bool(
        LEGACY_METRIKA_SCRIPT_RE.search(text)
        or LEGACY_METRIKA_NOSCRIPT_RE.search(text)
        or "mc.yandex.ru/metrika/tag.js" in text
    )

    # Fast idempotent path: one correct include and no legacy inline counter.
    if len(existing) == 1 and existing[0].strip() == tag and not has_legacy:
        return False

    # Otherwise normalize duplicates / old versions / legacy inline counters.
    text = ANALYTICS_TAG_RE.sub("", text)
    text = LEGACY_METRIKA_SCRIPT_RE.sub("", text)
    text = LEGACY_METRIKA_NOSCRIPT_RE.sub("", text)

    if "</head>" not in text:
        raise RuntimeError(f"{path.relative_to(ROOT)}: missing </head>.")
    text = text.replace("</head>", tag + "\n</head>", 1)

    if text != original:
        path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    analytics_path = ROOT / "assets" / "analytics.js"
    if not analytics_path.exists():
        raise SystemExit("assets/analytics.js is missing.")

    changed = []
    for path in sorted(ROOT.rglob("*.html")):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        if normalize(path):
            changed.append(rel.as_posix())

    print(f"Yandex Metrica include synchronized across {len(changed)} changed HTML pages.")
    if changed:
        print("Updated:", ", ".join(changed))
    else:
        print("No HTML changes required.")


if __name__ == "__main__":
    main()
