# GAEO.ru: change-aware publication checks

Updated: 2026-11-15. Canonical code: .github/workflows/astro-production.yml and scripts/ci-deploy-scope.mjs.

## Why this exists

The old publishing workflow always ran every Playwright suite: rankings (~6-7 minutes), industry specializations (~5-7 minutes), and industry landings (~3 minutes). The five successful 2026-11-15 runs averaged 22m23s. A local copy edit does not justify those runs.

## Reliable comparison point

Compare the current astro-source commit with **sourceCommit from the deployed main/astro-release-manifest.json**. Never rely on HEAD^: runs may have failed or been cancelled, so a release can contain several previously unshipped commits.

Unknown/missing baseline, a large change set, a new/deleted page, modified shared components/templates/CSS/JS, workflow edits, or unrecognized code/data default to **full** validation.

## QA matrix

| Changed source | Classification | Additional QA |
| --- | --- | --- |
| Only text nodes within one existing src/legacy/pages/**/*.html, with unchanged markup and H1/title | text-only | Build + all-page static SEO/link QA + browser smoke for the changed route at 1440/390 px |
| Markup, attributes, images or links on a specific existing HTML page | page-structure | Same static QA + changed-route browser smoke at 1440/390/320 px |
| Title or H1 on a specific HTML page | page-structure | As above; plus an audit across ALL generated pages of incoming anchor labels, link title attributes and linked JSON-LD names/headlines |
| Ranking data | profile/rankings | Ranking browser QA |
| Industry specialization batch | profile/specializations | Specialization browser QA |
| Industry commercial data | profile/industry | Industry browser QA |
| Publications or reviews data | profile/evidence | Evidence/carousel QA |
| 2GIS service data | profile/tariffs | Tariff/catalogue QA |
| Sector 3A / 3C / 3D / 3E data | profile/sector | Matching sector QA |
| Shared/unknown/large changes | full | All suites |

A changed page in the e-commerce, legal or industrial groups additionally invokes its graph validator. Routes with sensitive mobile tables also run table-layout QA.

A simple edit to a heading inside a case can affect the names shown on the home page, case listing, related article links and structured data. The incoming-link audit runs across the *entire* generated site even in page-structure mode. Its error names the canonical source page that must be fixed. Generated output is not patched directly, because the next Astro build would overwrite it. Deliberately shortened navigation labels are permitted; exact obsolete names/values are rejected.

## Always mandatory

- Node install and Astro build; page generation and source/content validation.
- Static parity, entity, internal anchor, approved design, rankings data/queue, contract wording and editorial checks.
- Production metadata normalization + full static production QA across every generated page (indexability, canonical, hreflang, sitemap, internal links, metadata, assets).
- Check GitHub Pages main for unexpected parallel edits, staged output reconciliation, production QA, safe commit to main and Pages build request.
- Verify each changed route in the browser on desktop/mobile, with a screenshot and no body overflow.

Only the **slow, specialized browser/sector suites** are change-gated. Run workflow_dispatch to force a full check when there is no unpublished diff. The change classifier prints its mode, routes and reasons into GitHub Actions.

## Operational notes

- For local copy: expected goal 2-4 minutes; this is a target, not measured until a real test publication completes.
- For shared components: full checks remain appropriate.
- If an expected link title changes, update its canonical source, not generated main/dist. Confirm that dependent lists/structured data are consistent and rerun publication.
- Tests should be extended when new page generators, shared data dependencies, or specialized validators are added. Unknown paths automatically trigger full mode until mapped.
- Standard GitHub concurrency and parallel-edit protection remain in place.
