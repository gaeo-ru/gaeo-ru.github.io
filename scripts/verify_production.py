#!/usr/bin/env python3
"""Verify production with normal HTTPS certificate checks."""
import json
import xml.etree.ElementTree as ET
from urllib import request
from urllib.robotparser import RobotFileParser
from build_sitemap import ROOT, INTENTIONAL_NOINDEX_PATHS, JSONLD_RE, canonical_url, collect_pages, robots_content
from indexnow_submit import BASE, KEY, KEY_LOCATION, url_for_html_path


def fetch(url):
    req = request.Request(url, headers={"User-Agent": "GAEO-Production-QA/1.0"})
    with request.urlopen(req, timeout=30) as response:
        if response.status != 200:
            raise RuntimeError(f"{url}: HTTP {response.status}")
        return response.geturl(), response.read().decode("utf-8"), response.headers.get("X-Robots-Tag", "").lower()


def main():
    if (ROOT / "SITE_MODE").read_text().strip() != "production":
        raise SystemExit("Public production QA requires SITE_MODE=production.")
    if (ROOT / "CNAME").read_text().strip() != "gaeo.ru":
        raise RuntimeError("Production CNAME must be gaeo.ru.")
    expected = {url for _, url, _ in collect_pages(preview_staging=False)}
    final, robots, _ = fetch(BASE + "/robots.txt")
    if final != BASE + "/robots.txt" or "Sitemap: https://gaeo.ru/sitemap.xml" not in robots:
        raise RuntimeError("Public robots.txt is missing the production sitemap or redirects.")
    policy = RobotFileParser()
    policy.parse(robots.splitlines())
    if any(not policy.can_fetch("*", url) for url in expected):
        raise RuntimeError("Public robots.txt blocks production content.")
    final, sitemap, _ = fetch(BASE + "/sitemap.xml")
    ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    locations = [node.text for node in ET.fromstring(sitemap).findall(f"{ns}url/{ns}loc")]
    if final != BASE + "/sitemap.xml" or set(locations) != expected or len(locations) != len(expected):
        raise RuntimeError("Public sitemap differs from the canonical production inventory.")
    for url in sorted(expected):
        final, html, header = fetch(url)
        if final != url or canonical_url(html) != url:
            raise RuntimeError(f"{url}: wrong redirect or canonical.")
        directives = robots_content(html) + "," + header
        tokens = {x.strip() for x in directives.split(',')}
        if tokens & {"noindex", "nofollow", "none"}:
            raise RuntimeError(f"{url}: blocked by robots directives.")
        schemas = JSONLD_RE.findall(html)
        if not schemas:
            raise RuntimeError(f"{url}: public Schema.org is missing.")
        for schema in schemas:
            json.loads(schema)
    print(f"PUBLIC_INDEXABLE_PAGES={len(expected)} CANONICAL_ROBOTS_SCHEMA=PASS")
    for path in sorted(INTENTIONAL_NOINDEX_PATHS - {"404.html"}):
        url = url_for_html_path(path)
        final, html, header = fetch(url)
        if final != url or "noindex" not in robots_content(html) + header:
            raise RuntimeError(f"{url}: legal page lost intentional noindex.")
    print("PUBLIC_LEGAL_NOINDEX=PASS")
    final, key, _ = fetch(KEY_LOCATION)
    if final != KEY_LOCATION or key.strip() != KEY:
        raise RuntimeError("Public IndexNow key/location is incorrect.")
    print("PUBLIC_INDEXNOW_KEY_TLS=PASS")
    for route in ("/", "/articles/", "/en/"):
        final, _, _ = fetch("https://gaeo-ru.github.io" + route)
        if final != BASE + route:
            raise RuntimeError(f"GitHub Pages did not redirect {route} to production.")
    print("GITHUB_PAGES_PRODUCTION_REDIRECTS=PASS")
    print("PUBLIC_PRODUCTION_QA=PASS")


if __name__ == "__main__":
    main()
