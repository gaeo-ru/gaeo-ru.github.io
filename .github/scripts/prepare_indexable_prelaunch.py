from pathlib import Path
import json

root = Path(__file__).resolve().parents[2]
mode = (root / 'SITE_MODE').read_text().strip()
if mode == 'prelaunch':
    print('Prelaunch changes already applied.')
    raise SystemExit(0)
if mode != 'staging':
    raise SystemExit('This one-time release requires staging; refusing a domain-state change.')

data = json.loads((root / 'reports/metadata-comparison-2026-10-06.json').read_text())
old = {x['url']: x for x in data['old_pages']}
matched = [n for n in data['new_pages'] if old.get(n['canonical'], {}).get('status') == 200]
assert len(matched) == 15 and not data['unfetched_urls']
assert all(n['title'] == old[n['canonical']]['title'] and n['description'] == old[n['canonical']]['description'] for n in matched)

(root / 'SITE_MODE').write_text('prelaunch\n')
helper = '''#!/usr/bin/env python3
"""Synchronize indexability without changing the domain or editorial metadata.

staging: blocked preview; prelaunch: indexable, domain switch still pending;
production: indexable and served from the configured custom domain.
"""
from pathlib import Path
import re

from build_sitemap import is_deployable_html, INTENTIONAL_NOINDEX_PATHS
from ensure_site_metadata import set_meta_name

ROOT = Path(__file__).resolve().parents[1]
VALID_MODES = {"staging", "prelaunch", "production"}
PUBLIC_ROBOTS = "index,follow,max-image-preview:large"


def main() -> None:
    mode = (ROOT / "SITE_MODE").read_text(encoding="utf-8").strip()
    if mode not in VALID_MODES:
        raise SystemExit(f"Invalid SITE_MODE: {mode!r}")
    updated = []
    for path in sorted(ROOT.rglob("*.html")):
        if not is_deployable_html(path):
            continue
        rel = path.relative_to(ROOT).as_posix()
        if mode == "staging":
            value = "noindex,follow" if rel == "404.html" else "noindex,nofollow,noarchive"
        else:
            value = "noindex,follow" if rel in INTENTIONAL_NOINDEX_PATHS else PUBLIC_ROBOTS
        text = path.read_text(encoding="utf-8")
        revised = set_meta_name(text, "robots", value)
        if revised != text:
            path.write_text(revised, encoding="utf-8")
            updated.append(rel)
    robots = "User-agent: *\\nDisallow: /\\n" if mode == "staging" else (ROOT / "robots.production.txt").read_text(encoding="utf-8")
    if mode != "staging" and re.search(r"^Disallow:\\s*/\\s*$", robots, re.M | re.I):
        raise SystemExit("Refusing indexable mode with a site-wide robots.txt block.")
    target = ROOT / "robots.txt"
    if not target.exists() or target.read_text(encoding="utf-8") != robots:
        target.write_text(robots, encoding="utf-8")
    print(f"Indexability synchronized: mode={mode}, updated HTML={len(updated)}")
    print("Domain settings and title/description are unchanged.")


if __name__ == "__main__":
    main()
'''
assert not (root / 'scripts/ensure_indexability.py').exists()
(root / 'scripts/ensure_indexability.py').write_text(helper)

p = root / '.github/workflows/site-maintenance.yml'
s = p.read_text()
s = s.replace('staging|production) ;;', 'staging|prelaunch|production) ;;')
s = s.replace('      - name: Materialize shared RU/EN header and footer', '      - name: Synchronize indexability for current release mode\n        run: python scripts/ensure_indexability.py\n\n      - name: Materialize shared RU/EN header and footer')
s = s.replace('[ "$SITE_MODE" = "production" ]', '[ "$SITE_MODE" != "staging" ]')
s = s.replace("git add -A -- '*.html'", "git add -A -- '*.html'\n          git add robots.txt")
s = s.replace('Dry-run changed URLs for IndexNow on staging', 'Dry-run changed URLs for IndexNow before domain cutover')
s = s.replace('Dry-run all IndexNow URLs manually on staging', 'Dry-run all IndexNow URLs manually before domain cutover')
s = s.replace("env.SITE_MODE == 'staging'", "env.SITE_MODE != 'production'")
p.write_text(s)

p = root / 'scripts/indexnow_submit.py'
s = p.read_text().replace('{"staging", "production"}', '{"staging", "prelaunch", "production"}').replace('Use --dry-run on staging.', 'Use --dry-run before the production domain switch.')
p.write_text(s)

p = root / 'scripts/site_qa.py'
s = p.read_text().replace('choices=("staging", "production")', 'choices=("staging", "prelaunch", "production")')
s = s.replace('''            if page in INTENTIONAL_NOINDEX:
                if "noindex" not in robot_value or "follow" not in robot_value:
                    errors.append(f"{page}: production service/legal page must be noindex,follow.")
            elif "noindex" in robot_value:
                errors.append(f"{page}: production content page remains noindex.")''', '''            tokens = set(robot_value.split(","))
            expected_tokens = {"noindex", "follow"} if page in INTENTIONAL_NOINDEX else {"index", "follow", "max-image-preview:large"}
            if tokens != expected_tokens:
                errors.append(f"{page}: {mode} robots is {robots[0]!r}, expected {sorted(expected_tokens)}.")''')
s = s.replace('''        if "Allow: /" not in current or f"Sitemap: {BASE}/sitemap.xml" not in current:
            errors.append("robots.txt: production must Allow / and declare sitemap.")''', '''        if "Allow: /" not in current or f"Sitemap: {BASE}/sitemap.xml" not in current:
            errors.append("robots.txt: indexable mode must Allow / and declare sitemap.")
        if re.search(r"^Disallow:\\s*/\\s*$", current, re.M | re.I):
            errors.append("robots.txt: site-wide Disallow / is forbidden in indexable mode.")''')
s = s.replace('''    if mode == "staging":
        if active.exists():
            errors.append("CNAME must not exist on staging; it would activate the production custom domain prematurely.")''', '''    if mode in {"staging", "prelaunch"}:
        if active.exists():
            errors.append(f"CNAME must not exist in {mode}; the custom-domain switch is a separate step.")''')
p.write_text(s)

p = root / 'scripts/staging_visual_smoke.mjs'
s = p.read_text()
s = s.replace("const OUT = process.env.GAEO_VISUAL_OUT || 'visual-smoke';", "const OUT = process.env.GAEO_VISUAL_OUT || 'visual-smoke';\nconst SITE_MODE = (await fs.readFile('SITE_MODE', 'utf8')).trim();\nif (!['staging', 'prelaunch', 'production'].includes(SITE_MODE)) throw new Error(`Invalid SITE_MODE: ${SITE_MODE}`);")
s = s.replace('''    if (!audit.robots.toLowerCase().includes('noindex')) {
      failures.push(`${modeName}/${pageName}: staging robots meta is not noindex: ${audit.robots}`);
    }''', '''    const expectedRobots = SITE_MODE === 'staging' ? 'noindex,nofollow,noarchive' : 'index,follow,max-image-preview:large';
    if (audit.robots.toLowerCase().replaceAll(' ', '') !== expectedRobots) {
      failures.push(`${modeName}/${pageName}: ${SITE_MODE} robots meta mismatch: ${audit.robots}`);
    }''')
p.write_text(s)

p = root / 'robots.production.txt'
s = p.read_text().replace('# Keep robots.txt closed on staging. Replace robots.txt with this file only after gaeo.ru serves the new site.', '# Activated by ensure_indexability.py in prelaunch and production modes.').replace('Disallow: /templates/', 'Disallow: /templates/\nDisallow: /reports/\nDisallow: /SITE_MODE')
p.write_text(s)

p = root / 'MIGRATION.md'
s = p.read_text().replace('## Staging\n', '''## Authorized prelaunch state, 6 October 2026

The owner explicitly requested opening indexing and publishing the production
sitemap BEFORE the separate DNS/custom-domain switch.

- `SITE_MODE=prelaunch`: content pages are `index,follow,max-image-preview:large`;
  the 404 and 4 legal pages stay `noindex,follow`.
- `robots.txt` is open and `sitemap.xml` contains only canonical `gaeo.ru` URLs.
- No root `CNAME` is added and DNS is not changed in this release.
- IndexNow remains dry-run; sending URLs is blocked unless mode is `production`.
- Next cutover: configure the custom domain and DNS, add root `CNAME` containing
  `gaeo.ru`, set `SITE_MODE=production`, verify the new public domain and HTTPS.
- Do not revert to `staging` automatically. This explicit decision supersedes
  the earlier instruction to keep the preview blocked until the domain switch.

## Original staging policy (superseded for this authorized prelaunch)
''')
p.write_text(s)

report = ['# GAEO: сверка метатегов и открытие индексации', '', 'Дата: 6 октября 2026 года.', '', '## Сверка title и description', '', f"Старый сайт прочитан заново: {data['captured_at']}. Источник: текущий HTML https://gaeo.ru/ и его sitemap, а не сентябрьский архив.", '', 'Обнаружены 15 действующих страниц старого сайта. На всех 15 title и description дословно совпадают с новой версией. Существующие варианты сохранены без переписывания. На новых страницах сохранены их текущие уникальные метатеги. 17 адресов новой версии пока возвращают 404 на старом домене: это новые страницы, а не потери миграции.', '', '| URL | Title | Description | Решение |', '|---|---|---|---|']
for n in sorted(matched, key=lambda n: n['route']):
    report.append(f"| `{n['route']}` | Совпадает | Совпадает | Сохранен текущий вариант |")
report += ['', '## Открытие индексации', '', '- 28 содержательных страниц RU/EN: `index,follow,max-image-preview:large`.', '- 404 и 4 юридические страницы: `noindex,follow`; в sitemap не включаются.', '- `robots.txt`: разрешен обход; снят только глобальный запрет. Технические каталоги закрыты.', '- Публикуется `sitemap.xml` с 28 каноническими адресами на https://gaeo.ru/.', '- `SITE_MODE=prelaunch`: настройки индексации рабочие, переключение домена еще не выполнено.', '- DNS и root CNAME в этом релизе не меняются. IndexNow до переключения работает только в dry-run.', '', '## Проверка', '', 'Техническую приемку и проверку опубликованного HTML выполняет release workflow. Не считать DNS-переезд выполненным по этому документу.', '', 'Точный снимок обеих версий: `reports/metadata-comparison-2026-10-06.json`.', '']
(root / 'reports/metadata-selection-2026-10-06.md').write_text('\n'.join(report))
for name in ('export-release-source.yml', 'metadata-inventory.yml'):
    (root / '.github/workflows' / name).unlink(missing_ok=True)
