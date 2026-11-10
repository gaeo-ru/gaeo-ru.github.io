/**
 * Phase 4B: deterministic, non-invasive baseline of the GAEO RU/EN content funnel.
 * Reads built dist/ pages; never calls external services or sends analytics.
 * Static indexability signals are NOT proof of indexing, goal receipt or conversion.
 */
import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getIndustryCatalog} from '../src/data/industry-catalog.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {pricingHref} from '../src/data/pricing.mjs';

const root = resolve('dist');
const errors = [];
const rows = [];
const reusedIds = new Set([1, 19, 39, 47, 54, 67, 80]);
const specialties = new Map(industrySpecializations.map(item => [item.id, item]));
const pathFile = route => resolve(root, route.replace(/^\//, ''), 'index.html');
const normalize = value => {
  try {
    const u = new URL(value.replace(/&amp;/g, '&'), 'https://gaeo.ru/');
    return ['gaeo.ru', 'www.gaeo.ru'].includes(u.hostname) ? u.pathname : null;
  } catch { return null; }
};
const hrefs = html => [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(['"])(.*?)\1/gi)].map(m => m[2]);
const hasLink = (links, target) => links.some(href => normalize(href) === target);
const read = route => existsSync(pathFile(route)) ? readFileSync(pathFile(route), 'utf8') : null;
const canonical = html => (html.match(/<link\b[^>]*\brel=['"]canonical['"][^>]*\bhref=['"]([^'"]+)/i) || [])[1];
const hasAlternate = (html, lang, target) => [...html.matchAll(/<link\b[^>]*\brel=['"]alternate['"][^>]*>/gi)].some(m =>
  m[0].includes('hreflang="' + lang + '"') &&
  m[0].includes('href="https://gaeo.ru' + target + '"')
);

for (const lang of ['ru', 'en']) {
  const catalog = getIndustryCatalog(lang);
  const equivalents = new Map(getIndustryCatalog(lang === 'ru' ? 'en' : 'ru').map(item => [item.number, item.detailLink]));
  const pricing = pricingHref(lang);
  const priceHtml = read(pricing);
  if (!priceHtml) { errors.push('Missing tariff page ' + pricing); continue; }
  const priceLinks = hrefs(priceHtml.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || priceHtml);
  if (catalog.length !== 107) errors.push('Expected 107 categories, got ' + catalog.length + ' (' + lang + ')');
  for (const item of catalog) {
    const route = item.detailLink;
    const equivalent = equivalents.get(item.number);
    if (!route) { errors.push('No destination for ' + item.id + ' ' + lang); continue; }
    const html = read(route);
    if (!html) { errors.push('Missing target ' + route); continue; }
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
    const links = hrefs(main);
    const sector = specialties.get(item.number);
    const methods = sector?.methods?.[lang] || [];
    const linkedMethods = methods.filter(target => hasLink(links, target));
    const related = [...new Set(links.map(normalize).filter(x => x && /\/(strategies|articles|cases)\//.test(x)))];
    const priceLinked = hasLink(links, pricing);
    const contactLinked = links.some(x => x.startsWith(lang === 'ru' ? '/#lead' : '/en/#lead'));
    const indexedSignal = !/<meta\b[^>]*\bname=['"]robots['"][^>]*\bcontent=['"][^'"]*noindex/i.test(html);
    const canonicalOk = canonical(html) === 'https://gaeo.ru' + route;
    const hreflangOk = hasAlternate(html, lang, route) && hasAlternate(html, lang === 'ru' ? 'en' : 'ru', equivalent);
    const h1Count = (html.match(/<h1\b/gi) || []).length;
    const row = {
      id: item.number, category: item.name, lang, route,
      category_kind: reusedIds.has(item.number) ? 'reused_existing_landing' : 'original_specialization',
      tariff_catalog_link: hasLink(priceLinks, route), tariff_page_backlink: priceLinked,
      method_links_declared: methods.length, method_links_present: linkedMethods.length,
      related_content_links: related.length, related_content_paths: related,
      contact_path: contactLinked, canonical_ok: canonicalOk, reciprocal_hreflang: hreflangOk,
      indexability_signal: indexedSignal, h1_count: h1Count,
      search_indexed: null, metrika_goal_receipt: null,
    };
    rows.push(row);
    if (!row.tariff_catalog_link) errors.push('Tariff catalogue missing ' + route);
    if (!row.tariff_page_backlink) errors.push('Tariff backlink missing ' + route);
    if (!row.contact_path) errors.push('Contact path missing ' + route);
    if (!canonicalOk || !hreflangOk || h1Count !== 1 || !indexedSignal) errors.push('SEO signals invalid on ' + route);
    if (!reusedIds.has(item.number)) {
      if (!sector || !methods.length) errors.push('Original landing has no declared method ' + route);
      if (linkedMethods.length !== methods.length) errors.push('Missing declared methods ' + route + ' (' + linkedMethods.length + '/' + methods.length + ')');
      for (const target of methods) if (!read(target)) errors.push('Method target missing ' + route + ' => ' + target);
    } else if (!related.length) errors.push('Reused landing has no linked editorial material ' + route);
    for (const target of related) if (!read(target)) errors.push('Editorial target missing ' + route + ' => ' + target);
  }
}
const unique = new Set(rows.map(x => x.route));
if (unique.size !== rows.length) errors.push('Duplicate landing routes: ' + (rows.length - unique.size));
if (rows.length !== 214) errors.push('Expected 214 RU/EN category destinations, got ' + rows.length);
const count = predicate => rows.filter(predicate).length;
const report = {
  batch: '4B', source: 'Astro dist, local static HTML only', generated_at: new Date().toISOString(),
  meaning: 'Indexability/canonical/hreflang are technical signals, not proof of indexing; goal calls are not proof of receipt.',
  categories: 107, expected_routes: 214, analyzed_routes: rows.length,
  original_specialization_routes: count(x => x.category_kind === 'original_specialization'),
  reused_existing_routes: count(x => x.category_kind === 'reused_existing_landing'),
  tariff_to_landing: count(x => x.tariff_catalog_link),
  landing_to_tariff: count(x => x.tariff_page_backlink),
  landing_to_contact: count(x => x.contact_path),
  original_with_declared_method_link: count(x => x.category_kind === 'original_specialization' && x.method_links_present > 0),
  reused_with_editorial_link: count(x => x.category_kind === 'reused_existing_landing' && x.related_content_links > 0),
  canonical_hreflang_indexability_ok: count(x => x.canonical_ok && x.reciprocal_hreflang && x.indexability_signal && x.h1_count === 1),
  errors,
  rows,
};
mkdirSync('visual-hub-funnel', {recursive:true});
writeFileSync('visual-hub-funnel/gaeo-phase4b-link-matrix.json', JSON.stringify(report, null, 2) + '\n');
console.log('HUB_FUNNEL_4B: ' + rows.length + '/214 RU/EN; original:' + report.original_specialization_routes +
  ', reused:' + report.reused_existing_routes + ', tariff->landing:' + report.tariff_to_landing +
  ', landing->tariff:' + report.landing_to_tariff + ', contact:' + report.landing_to_contact +
  ', originals->methods:' + report.original_with_declared_method_link +
  ', SEO:' + report.canonical_hreflang_indexability_ok + ', errors:' + errors.length);
for (const e of errors.slice(0, 80)) console.error('HUB_FUNNEL_4B ERROR: ' + e);
if (errors.length) process.exit(1);
console.log('HUB_FUNNEL_4B=PASS');
