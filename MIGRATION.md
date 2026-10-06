# GAEO.ru migration rules

## Source of truth

- Homepage: the approved `GAEO_home_v0.28.html` is the exact content and visual reference. Do not rewrite, shorten, reorder, or "improve" its visible content during migration.
- Internal pages: current public `https://gaeo.ru/` pages are the content source. Preserve their meaning and content during migration; apply the v0.28 design system.
- Preserve existing public URLs 1:1 wherever technically possible.

## Authorized prelaunch state, 6 October 2026

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

- Staging URL: `https://gaeo-ru.github.io/`
- Staging must remain blocked from indexing until the final domain switch.
- Production `gaeo.ru` stays on Tilda until the new site is fully migrated and checked.

## Shared site chrome

Canonical files:
- `templates/partials/site-header.html`
- `templates/partials/site-footer.html`

Synchronization helper:
- `scripts/ensure_site_chrome.py`

Design assets extracted from approved v0.28:
- `assets/style.css`
- `assets/site.js`

## Migration acceptance for each internal page

1. Content matches the current GAEO.ru source page.
2. URL structure is preserved.
3. Title, description, canonical, hreflang and Schema.org are preserved or migrated correctly.
4. Shared header/footer are used.
5. Desktop and mobile layouts follow the v0.28 visual system.
6. Links and images work.
7. No unintended text rewrites are introduced.

## Final switch

Only after all pages, analytics, forms, sitemap, robots, 404, metadata and internal links are checked do we connect `gaeo.ru` to GitHub Pages.


## Locked wording notes

- Prep-Center case: use **«6 оплативших клиентов из нейросетей за 1,5 месяца»** everywhere. Do not use «6 оплаченных клиентов».
