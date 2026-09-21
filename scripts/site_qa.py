#!/usr/bin/env python3
from __future__ import annotations

from argparse import ArgumentParser
from html import unescape
from pathlib import Path
from urllib.parse import urlparse, unquote
import json
import re
import subprocess
import sys
import tempfile
import xml.etree.ElementTree as ET

from ensure_site_chrome import render_chrome
from ensure_asset_versions import asset_path_from_url, expected_version
from indexnow_submit import KEY as INDEXNOW_KEY, KEY_FILE as INDEXNOW_KEY_FILE

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://gaeo.ru"
STAGING_HOST = "gaeo-ru.github.io"
METRIKA_COUNTER_ID = "109744589"
ANALYTICS_PATH = "/assets/analytics.js"

SKIP_DIRS = {".git", ".github", "templates"}
LEGAL_NOINDEX = {
    "privacy-policy/index.html",
    "personal-data-consent/index.html",
    "en/privacy-policy/index.html",
    "en/personal-data-consent/index.html",
}
SERVICE_NOINDEX = {"404.html"}
INTENTIONAL_NOINDEX = LEGAL_NOINDEX | SERVICE_NOINDEX

errors: list[str] = []
warnings: list[str] = []

TITLE_RE = re.compile(r"<title>([\s\S]*?)</title>", re.I)
H1_RE = re.compile(r"<h1\b[^>]*>([\s\S]*?)</h1>", re.I)
JSONLD_RE = re.compile(
    r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>',
    re.I,
)
TAG_RE = re.compile(r"<([a-zA-Z0-9:-]+)\b([^>]*)>", re.S)
ATTR_RE = re.compile(
    r'''([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>]+))''',
    re.S,
)


def clean_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value or "")
    return re.sub(r"\s+", " ", unescape(value)).strip()


def attrs(fragment: str) -> dict[str, str]:
    result: dict[str, str] = {}
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


def meta_values(text: str, key: str, value: str) -> list[str]:
    result = []
    for item in tags(text, "meta"):
        if item.get(key.lower(), "").lower() == value.lower():
            result.append(item.get("content", ""))
    return result


def link_values(text: str, rel_value: str) -> list[dict[str, str]]:
    result = []
    for item in tags(text, "link"):
        rels = {x.lower() for x in item.get("rel", "").split()}
        if rel_value.lower() in rels:
            result.append(item)
    return result


def page_paths() -> list[Path]:
    result = []
    for path in ROOT.rglob("*.html"):
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        result.append(path)
    return sorted(result)


def relpath(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def expected_url(path: Path) -> str:
    rel = relpath(path)
    if rel == "index.html":
        return BASE + "/"
    if rel.endswith("/index.html"):
        return BASE + "/" + rel[:-10]
    return BASE + "/" + rel


def path_from_site_url(url: str) -> Path | None:
    parsed = urlparse(url)
    if parsed.scheme and parsed.netloc:
        if parsed.netloc.lower() not in {"gaeo.ru", "www.gaeo.ru"}:
            return None
        route = parsed.path
    else:
        route = url.split("?", 1)[0].split("#", 1)[0]

    route = unquote(route or "/")
    if route == "/":
        return ROOT / "index.html"

    target = ROOT / route.lstrip("/")
    if route.endswith("/"):
        return target / "index.html"
    if target.exists():
        return target
    if target.suffix == "":
        return target / "index.html"
    return target


def internal_target(source: Path, href: str) -> Path | None:
    href = href.strip()
    if not href or href.startswith("#"):
        return None
    if href.startswith(("mailto:", "tel:")):
        return None
    if href.lower().startswith("javascript:"):
        errors.append(f"{relpath(source)}: javascript: link is not allowed: {href!r}")
        return None
    if href.startswith(("http://", "https://", "//")):
        parsed = urlparse("https:" + href if href.startswith("//") else href)
        if parsed.hostname not in {"gaeo.ru", "www.gaeo.ru", STAGING_HOST}:
            return None
        return path_from_site_url(parsed.path)

    clean = href.split("?", 1)[0].split("#", 1)[0]
    if not clean:
        return None
    if clean.startswith("/"):
        return path_from_site_url(clean)

    target = (source.parent / clean).resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        errors.append(f"{relpath(source)}: local link escapes repository: {href!r}")
        return None

    if clean.endswith("/"):
        return target / "index.html"
    if target.exists():
        return target
    if target.suffix == "":
        return target / "index.html"
    return target


def jsonld_objects(text: str, page: str) -> list[dict]:
    objects: list[dict] = []
    for raw in JSONLD_RE.findall(text):
        try:
            data = json.loads(raw)
        except Exception as exc:
            errors.append(f"{page}: invalid JSON-LD: {exc}")
            continue
        if isinstance(data, dict) and isinstance(data.get("@graph"), list):
            nodes = data["@graph"]
        elif isinstance(data, list):
            nodes = data
        else:
            nodes = [data]
        objects.extend(node for node in nodes if isinstance(node, dict))
    return objects


def schema_types(objects: list[dict]) -> dict[str, list[dict]]:
    result: dict[str, list[dict]] = {}
    for obj in objects:
        value = obj.get("@type")
        values = value if isinstance(value, list) else [value]
        for item in values:
            if item:
                result.setdefault(str(item), []).append(obj)
    return result


def visible_summary_questions(text: str) -> list[str]:
    questions = []
    blocks = re.findall(
        r"""<details\b[^>]*class=["'][^"']*\bfaq-item\b[^"']*["'][^>]*>([\s\S]*?)</details>""",
        text,
        re.I,
    )
    for block in blocks:
        match = re.search(r"<summary\b[^>]*>([\s\S]*?)</summary>", block, re.I)
        if not match:
            continue
        question = clean_text(match.group(1))
        question = re.sub(r"\s*\+\s*$", "", question).strip()
        if question:
            questions.append(question)
    return questions

def faq_schema_questions(faq: dict) -> list[str]:
    result = []
    for item in faq.get("mainEntity") or []:
        if isinstance(item, dict) and item.get("name"):
            result.append(clean_text(str(item["name"])))
    return result


def href_absolute_urls(path: Path, text: str) -> set[str]:
    result = set()
    for item in tags(text, "a"):
        href = item.get("href", "").strip()
        if not href or href.startswith(("mailto:", "tel:", "#")):
            continue
        if href.startswith(("http://", "https://")):
            parsed = urlparse(href)
            if parsed.hostname not in {"gaeo.ru", "www.gaeo.ru", STAGING_HOST}:
                continue
            target = path_from_site_url(parsed.path)
        else:
            target = internal_target(path, href)
        if target and target.exists() and target.suffix == ".html":
            result.add(expected_url(target))
    return result


def itemlist_urls(itemlist: dict) -> list[str]:
    result = []
    for element in itemlist.get("itemListElement") or []:
        if not isinstance(element, dict):
            continue
        candidate = element.get("url")
        item = element.get("item")
        if not candidate and isinstance(item, dict):
            candidate = item.get("url") or item.get("@id")
        elif not candidate and isinstance(item, str):
            candidate = item
        if candidate:
            value = str(candidate).split("#", 1)[0]
            if value.startswith(BASE):
                result.append(value)
    return result


def expected_lang(path: Path) -> str:
    return "en" if relpath(path).startswith("en/") else "ru"


def check_shared_chrome(path: Path, text: str) -> None:
    page = relpath(path)
    header, footer = render_chrome(text)
    expected_header = f"<!-- SITE_HEADER_START -->\n{header}\n<!-- SITE_HEADER_END -->"
    expected_footer = f"<!-- SITE_FOOTER_START -->\n{footer}\n<!-- SITE_FOOTER_END -->"

    if text.count("<!-- SITE_HEADER_START -->") != 1 or text.count("<!-- SITE_HEADER_END -->") != 1:
        errors.append(f"{page}: shared header markers must appear exactly once.")
    elif expected_header not in text:
        errors.append(f"{page}: shared header differs from canonical {expected_lang(path).upper()} partial.")

    if text.count("<!-- SITE_FOOTER_START -->") != 1 or text.count("<!-- SITE_FOOTER_END -->") != 1:
        errors.append(f"{page}: shared footer markers must appear exactly once.")
    elif expected_footer not in text:
        errors.append(f"{page}: shared footer differs from canonical {expected_lang(path).upper()} partial.")


def check_page(path: Path, mode: str, page_texts: dict[Path, str]) -> None:
    text = page_texts[path]
    page = relpath(path)
    target_url = expected_url(path)

    check_shared_chrome(path, text)

    title_matches = TITLE_RE.findall(text)
    if len(title_matches) != 1 or not clean_text(title_matches[0]):
        errors.append(f"{page}: expected exactly one non-empty <title>; found {len(title_matches)}.")

    descriptions = meta_values(text, "name", "description")
    if len(descriptions) != 1 or len(clean_text(descriptions[0])) < 20:
        errors.append(f"{page}: meta description must appear exactly once and be meaningful; found {len(descriptions)}.")

    robots = meta_values(text, "name", "robots")
    if len(robots) != 1:
        errors.append(f"{page}: robots meta must appear exactly once; found {len(robots)}.")
    else:
        robot_value = robots[0].lower().replace(" ", "")
        if mode == "staging":
            expected = "noindex,follow" if page in SERVICE_NOINDEX else "noindex,nofollow,noarchive"
            if robot_value != expected:
                errors.append(f"{page}: staging robots is {robots[0]!r}, expected {expected!r}.")
        else:
            if page in INTENTIONAL_NOINDEX:
                if "noindex" not in robot_value or "follow" not in robot_value:
                    errors.append(f"{page}: production service/legal page must be noindex,follow.")
            elif "noindex" in robot_value:
                errors.append(f"{page}: production content page remains noindex.")

    canonicals = link_values(text, "canonical")
    if len(canonicals) != 1:
        errors.append(f"{page}: canonical must appear exactly once; found {len(canonicals)}.")
    else:
        canonical = canonicals[0].get("href", "")
        if canonical != target_url:
            errors.append(f"{page}: canonical {canonical!r} != expected {target_url!r}.")

    h1s = H1_RE.findall(text)
    if len(h1s) != 1 or not clean_text(h1s[0]):
        errors.append(f"{page}: expected exactly one non-empty H1; found {len(h1s)}.")

    html_tags = tags(text, "html")
    lang = html_tags[0].get("lang", "").lower() if html_tags else ""
    if lang != expected_lang(path):
        errors.append(f"{page}: html lang={lang!r}, expected {expected_lang(path)!r}.")

    for prop in ("og:type", "og:site_name", "og:locale", "og:title", "og:description", "og:url", "og:image", "og:image:alt"):
        values = meta_values(text, "property", prop)
        if len(values) != 1:
            errors.append(f"{page}: {prop} must appear exactly once; found {len(values)}.")

    if page not in SERVICE_NOINDEX:
        alternates = [x for x in link_values(text, "alternate") if x.get("hreflang")]
        by_lang: dict[str, list[str]] = {}
        for item in alternates:
            by_lang.setdefault(item.get("hreflang", "").lower(), []).append(item.get("href", ""))
        for code in ("ru", "en", "x-default"):
            if len(by_lang.get(code, [])) != 1:
                errors.append(f"{page}: hreflang {code!r} must appear exactly once; found {len(by_lang.get(code, []))}.")
        if len(by_lang.get("x-default", [])) == 1 and len(by_lang.get("ru", [])) == 1:
            if by_lang["x-default"][0] != by_lang["ru"][0]:
                errors.append(f"{page}: x-default must point to the RU equivalent.")
        for code, hrefs in by_lang.items():
            for href in hrefs:
                target = path_from_site_url(href)
                if target is None or not target.exists():
                    errors.append(f"{page}: hreflang {code} points to missing page: {href}.")

    objects = jsonld_objects(text, page)
    types = schema_types(objects)
    if page not in LEGAL_NOINDEX and not objects:
        errors.append(f"{page}: missing Schema.org JSON-LD.")

    visible_faq = visible_summary_questions(text)
    faq_pages = types.get("FAQPage", [])
    if faq_pages:
        if len(faq_pages) != 1:
            errors.append(f"{page}: expected at most one FAQPage; found {len(faq_pages)}.")
        else:
            schema_faq = faq_schema_questions(faq_pages[0])
            if schema_faq != visible_faq:
                errors.append(
                    f"{page}: FAQPage questions/order ({len(schema_faq)}) do not match visible <summary> FAQ ({len(visible_faq)})."
                )
    elif visible_faq:
        warnings.append(f"{page}: has {len(visible_faq)} visible <summary> blocks but no FAQPage schema.")

    visible_links = href_absolute_urls(path, text)
    for idx, itemlist in enumerate(types.get("ItemList", []), 1):
        elements = itemlist.get("itemListElement") or []
        declared = itemlist.get("numberOfItems")
        if declared is not None:
            try:
                declared_int = int(declared)
            except Exception:
                errors.append(f"{page}: ItemList #{idx} numberOfItems is not an integer: {declared!r}.")
            else:
                if declared_int != len(elements):
                    errors.append(
                        f"{page}: ItemList #{idx} numberOfItems={declared_int} but itemListElement has {len(elements)} items."
                    )
        urls = itemlist_urls(itemlist)
        missing_visible = [u for u in urls if u not in visible_links and u != target_url]
        if missing_visible:
            errors.append(
                f"{page}: ItemList #{idx} contains URLs not present as visible internal links: {', '.join(missing_visible[:8])}."
            )

    for a in tags(text, "a"):
        if "href" not in a:
            continue
        href = a.get("href", "")
        if href == "":
            errors.append(f"{page}: contains empty href attribute.")
            continue
        target = internal_target(path, href)
        if target is not None and not target.exists():
            try:
                shown = target.relative_to(ROOT)
            except ValueError:
                shown = target
            errors.append(f"{page}: broken internal link {href!r} -> {shown}.")

    analytics_scripts = []
    for script in tags(text, "script"):
        src = script.get("src", "")
        if urlparse(src).path == ANALYTICS_PATH:
            analytics_scripts.append(script)
    if len(analytics_scripts) != 1:
        errors.append(
            f"{page}: /assets/analytics.js must be included exactly once; found {len(analytics_scripts)}."
        )
    analytics_defer = re.findall(
        r'<script\b(?=[^>]*\bsrc=["\']/assets/analytics\.js(?:\?[^"\']*)?["\'])(?=[^>]*\bdefer\b)[^>]*>\s*</script>',
        text,
        re.I,
    )
    if len(analytics_defer) != 1:
        errors.append(f"{page}: analytics.js include must use defer exactly once.")

    lower_html = text.lower()
    if "mc.yandex.ru/metrika/tag.js" in lower_html or re.search(r"\bym\s*\(", text):
        errors.append(f"{page}: contains legacy/inline Yandex Metrica code outside analytics.js.")

    # Local CSS/JS references must use the current content hash for cache-busting.
    asset_refs = []
    for link in tags(text, "link"):
        rels = {x.lower() for x in link.get("rel", "").split()}
        href = link.get("href", "")
        if "stylesheet" in rels and asset_path_from_url(href):
            asset_refs.append(("stylesheet", href))
    for script in tags(text, "script"):
        src = script.get("src", "")
        if asset_path_from_url(src):
            asset_refs.append(("script", src))

    for kind, value in asset_refs:
        parsed = urlparse(value)
        params = dict(x.split("=", 1) if "=" in x else (x, "") for x in parsed.query.split("&") if x)
        actual = params.get("v")
        expected = expected_version(value)
        if expected is None:
            errors.append(f"{page}: {kind} points to missing local CSS/JS asset: {value}.")
        elif actual != expected:
            errors.append(
                f"{page}: {kind} cache version for {parsed.path} is {actual!r}, expected {expected!r}."
            )

    for img in tags(text, "img"):
        src = img.get("src", "")
        if not src:
            errors.append(f"{page}: img without src.")
            continue
        if src.startswith("/"):
            target = ROOT / src.split("?", 1)[0].split("#", 1)[0].lstrip("/")
            if not target.exists():
                errors.append(f"{page}: image src points to missing local file: {src}.")
            if src.startswith("/assets/"):
                for required in ("alt", "width", "height", "loading", "decoding"):
                    if required not in img:
                        errors.append(f"{page}: local image {src} missing {required}.")
        if src.lower().startswith("data:image"):
            errors.append(f"{page}: contains Base64/data:image content.")

    for og_image in meta_values(text, "property", "og:image"):
        parsed = urlparse(og_image)
        if parsed.hostname in {"gaeo.ru", "www.gaeo.ru"}:
            target = ROOT / parsed.path.lstrip("/")
            if not target.exists():
                errors.append(f"{page}: og:image points to missing local file: {og_image}.")

    lower = text.lower()
    if "static.tildacdn.com" in lower or "tildacdn.com" in lower:
        errors.append(f"{page}: contains Tilda CDN reference.")
    if "data:image" in lower or ";base64," in lower:
        errors.append(f"{page}: contains Base64 image data.")
    if STAGING_HOST in lower:
        errors.append(f"{page}: contains staging hostname {STAGING_HOST}.")


def check_hreflang_reciprocity(page_texts: dict[Path, str]) -> None:
    canonical_to_path = {expected_url(p): p for p in page_texts}
    alternate_maps: dict[Path, dict[str, str]] = {}
    for path, text in page_texts.items():
        mapping = {}
        for item in link_values(text, "alternate"):
            code = item.get("hreflang", "").lower()
            href = item.get("href", "")
            if code and href:
                mapping[code] = href
        alternate_maps[path] = mapping

    for path, mapping in alternate_maps.items():
        if relpath(path) in SERVICE_NOINDEX:
            continue
        self_url = expected_url(path)
        for code in ("ru", "en"):
            href = mapping.get(code)
            target = canonical_to_path.get(href or "")
            if not target:
                continue
            target_mapping = alternate_maps.get(target, {})
            source_code = expected_lang(path)
            if target_mapping.get(source_code) != self_url:
                errors.append(
                    f"{relpath(path)}: hreflang reciprocity broken with {relpath(target)}; "
                    f"target {source_code!r} points to {target_mapping.get(source_code)!r}, expected {self_url!r}."
                )


def check_assets_css_js() -> None:
    for path in sorted(list((ROOT / "assets").glob("*.css")) + list((ROOT / "assets").glob("*.js"))):
        text = path.read_text(encoding="utf-8", errors="replace")
        low = text.lower()
        if "static.tildacdn.com" in low or "tildacdn.com" in low:
            errors.append(f"{relpath(path)}: contains Tilda CDN reference.")
        if "data:image" in low or ";base64," in low:
            errors.append(f"{relpath(path)}: contains Base64 image data.")


def check_analytics_bundle() -> None:
    analytics = ROOT / "assets" / "analytics.js"
    site_js = ROOT / "assets" / "site.js"
    if not analytics.exists():
        errors.append("assets/analytics.js is missing.")
        return

    text = analytics.read_text(encoding="utf-8")
    required = [
        f"var COUNTER_ID = {METRIKA_COUNTER_ID};",
        "https://mc.yandex.ru/metrika/tag.js",
        "trackLinks: true",
        "accurateTrackBounce: true",
        "webvisor: true",
        "lead_submit_success",
        "gaeo:lead-success",
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "gaeo_tracking_v1",
        "PRODUCTION_HOSTS",
        "gaeo_analytics_debug",
    ]
    for needle in required:
        if needle not in text:
            errors.append(f"assets/analytics.js missing required analytics feature: {needle!r}.")

    init_calls = len(
        re.findall(
            rf"window\.ym\(COUNTER_ID,\s*['\"]init['\"]",
            text,
            re.I,
        )
    )
    if init_calls != 1:
        errors.append(f"assets/analytics.js must initialize Metrika exactly once; found {init_calls} init calls.")

    if site_js.exists():
        site_text = site_js.read_text(encoding="utf-8")
        if "gaeo:lead-success" not in site_text:
            errors.append("assets/site.js does not emit gaeo:lead-success after successful lead submit.")
        if "gaeo_tracking_v1" not in site_text:
            errors.append("assets/site.js does not preserve session campaign attribution for lead payloads.")
    else:
        errors.append("assets/site.js is missing.")


def check_indexnow_preparation() -> None:
    key_path = ROOT / INDEXNOW_KEY_FILE
    if not key_path.exists():
        errors.append(f"IndexNow key file is missing: {INDEXNOW_KEY_FILE}.")
        return
    actual = key_path.read_text(encoding="utf-8").strip()
    if actual != INDEXNOW_KEY:
        errors.append(
            f"IndexNow key file content does not match scripts/indexnow_submit.py: {INDEXNOW_KEY_FILE}."
        )


def check_robots_files(mode: str) -> None:
    robots = ROOT / "robots.txt"
    production = ROOT / "robots.production.txt"
    if not robots.exists():
        errors.append("robots.txt is missing.")
        return
    current = robots.read_text(encoding="utf-8")
    if mode == "staging":
        if "Disallow: /" not in current:
            errors.append("robots.txt: staging must contain Disallow: /.")
    else:
        if "Allow: /" not in current or f"Sitemap: {BASE}/sitemap.xml" not in current:
            errors.append("robots.txt: production must Allow / and declare sitemap.")

    if not production.exists():
        errors.append("robots.production.txt is missing.")
    else:
        prod = production.read_text(encoding="utf-8")
        for needle in ("Allow: /", "Clean-param:", f"Sitemap: {BASE}/sitemap.xml"):
            if needle not in prod:
                errors.append(f"robots.production.txt missing {needle!r}.")


def check_sitemap(mode: str) -> None:
    generator = ROOT / "scripts" / "build_sitemap.py"
    if not generator.exists():
        errors.append("scripts/build_sitemap.py is missing.")
        return

    with tempfile.TemporaryDirectory() as tmp:
        preview = Path(tmp) / "sitemap.xml"
        cmd = [sys.executable, str(generator)]
        if mode == "staging":
            cmd.append("--preview-staging")
        cmd += ["--output", str(preview)]
        result = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True)
        if result.returncode != 0:
            errors.append(
                "sitemap generator failed: "
                + (result.stdout.strip() or result.stderr.strip() or f"exit {result.returncode}")
            )
            return
        try:
            tree = ET.parse(preview)
            ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = [n.text.strip() for n in tree.findall(".//s:loc", ns) if n.text]
        except Exception as exc:
            errors.append(f"generated sitemap is invalid XML: {exc}")
            return

        generated_content = preview.read_text(encoding="utf-8")

    if len(urls) != len(set(urls)):
        errors.append("generated sitemap contains duplicate URLs.")
    if any(STAGING_HOST in u for u in urls):
        errors.append("generated sitemap contains staging hostname.")
    if any(not u.startswith(BASE + "/") for u in urls):
        errors.append("generated sitemap contains non-production URL.")

    expected = {
        expected_url(p)
        for p in page_paths()
        if relpath(p) not in INTENTIONAL_NOINDEX
    }
    if set(urls) != expected:
        missing = sorted(expected - set(urls))
        extra = sorted(set(urls) - expected)
        if missing:
            errors.append("generated sitemap missing expected URLs: " + ", ".join(missing))
        if extra:
            errors.append("generated sitemap has unexpected URLs: " + ", ".join(extra))

    actual = ROOT / "sitemap.xml"
    if mode == "staging":
        if actual.exists():
            errors.append("sitemap.xml must not be published on staging.")
    else:
        if not actual.exists():
            errors.append("production sitemap.xml is missing.")
        elif actual.read_text(encoding="utf-8") != generated_content:
            errors.append("production sitemap.xml differs from generator output.")


def main() -> int:
    parser = ArgumentParser(description="Technical SEO/GEO QA for GAEO.ru.")
    parser.add_argument("--mode", choices=("staging", "production"), default="staging")
    args = parser.parse_args()

    paths = page_paths()
    if not paths:
        errors.append("No deployable HTML pages found.")

    required_partials = [
        ROOT / "templates" / "partials" / "site-header.html",
        ROOT / "templates" / "partials" / "site-footer.html",
        ROOT / "templates" / "partials" / "site-header-en.html",
        ROOT / "templates" / "partials" / "site-footer-en.html",
    ]
    for partial in required_partials:
        if not partial.exists():
            errors.append(f"Missing shared partial: {partial.relative_to(ROOT)}.")

    page_texts = {p: p.read_text(encoding="utf-8") for p in paths}
    for path in paths:
        check_page(path, args.mode, page_texts)

    check_hreflang_reciprocity(page_texts)
    check_assets_css_js()
    check_analytics_bundle()
    check_indexnow_preparation()
    check_robots_files(args.mode)
    check_sitemap(args.mode)

    print(f"QA_MODE={args.mode}")
    print(f"HTML_PAGES={len(paths)}")
    print(f"ERRORS={len(errors)}")
    print(f"WARNINGS={len(warnings)}")
    for message in warnings:
        print("WARNING:", message)

    if errors:
        for message in errors:
            print("ERROR:", message)
        print("SITE_QA=FAIL")
        return 1

    print("SITE_QA=PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
