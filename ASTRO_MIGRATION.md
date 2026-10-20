# GAEO Astro migration - non-production parity branch

Purpose: move GAEO.ru to Astro with no visible or functional regression.

## Source-of-truth policy
The 47 original HTML files are preserved under src/legacy/pages.
Static assets are preserved as original Git blobs under public.
All current URLs, canonical/hreflang/meta/Schema.org, CSS, JS, form endpoints and site assets remain unchanged.
Astro renders these files through reusable SharedHeader, SharedFooter and LeadCTA components, using existing approved template partials.

## Build and comparison
Node.js 22 or newer is required.
1. npm install
2. npm run build
3. npm run check:parity

The parity script checks every original HTML route and byte equality of all public assets.
No automatic production deployment is configured on this branch.

## Next steps
1. Pass 47 page and 258 static-resource parity checks.
2. Run mobile and desktop visual comparisons against production, including open menu and lead form.
3. Extract template families incrementally into real Astro layouts, continuing parity checks.
4. Switch the GitHub Pages publication pipeline only after no-regression evidence.
5. Preserve the old main branch output as rollback until the Astro release succeeds.

The existing site remains live and does not depend on this experimental branch.
