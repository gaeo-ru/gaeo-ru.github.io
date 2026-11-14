import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const version = name => createHash('sha256')
  .update(readFileSync(resolve(process.cwd(), 'public/assets', name)))
  .digest('hex').slice(0, 12);
const css = `/assets/term-hints.css?v=${version('term-hints.css')}`;
const js = `/assets/term-hints.js?v=${version('term-hints.js')}`;

/** Insert one shared progressive enhancement without touching page content. */
export function injectTermHintAssets(html) {
  if (!html.includes('data-gaeo-term-styles')) html = html.replace(/<\/head>/i,
    `<link rel="stylesheet" href="${css}" data-gaeo-term-styles>\n</head>`);
  if (!html.includes('data-gaeo-term-script')) html = html.replace(/<\/body>/i,
    `<script type="module" src="${js}" data-gaeo-term-script></script>\n</body>`);
  return html;
}
