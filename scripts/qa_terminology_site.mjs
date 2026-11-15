import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, resolve, sep } from 'node:path';
import { chromium } from 'playwright';
import { TERM_DEFINITIONS } from '../public/assets/term-hints.js';

// Integration coverage of the actual Astro output and its existing page styles.
// The independent fixture test checks timing and dynamic-content edge cases.
const root = resolve('dist');
const evidence = resolve('visual-terminology');
const routes = [
  '/', '/services/', '/services/website-development/', '/services/geo-audit/',
  '/tarify/', '/strategies/measurement/', '/industries/legal/', '/industries/fulfillment/',
  '/rankings/wms/', '/professional-biography/', '/en/industries/fulfillment/',
  '/en/', '/en/services/', '/en/strategies/measurement/'
];
const viewports = [
  { width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 720 }
];
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8'
};
mkdirSync(evidence, { recursive: true });
const summary = {
  startedAt: new Date().toISOString(), status: 'running',
  routes, widths: viewports.map(viewport => viewport.width), checks: [], screenshots: []
};
const save = () => writeFileSync(resolve(evidence, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
const routeId = route => route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '-');

const server = createServer((request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403); response.end(); return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file, 'index.html');
    if (!existsSync(file) || !statSync(file).isFile()) {
      response.writeHead(404); response.end('Not found'); return;
    }
    response.writeHead(200, {
      'Content-Type': types[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(request.method === 'HEAD' ? undefined : readFileSync(file));
  } catch {
    response.writeHead(400); response.end('Invalid request');
  }
});

async function dimensions(page) {
  return page.evaluate(() => ({
    viewport: innerWidth,
    document: document.documentElement.scrollWidth,
    offenders: document.documentElement.scrollWidth <= innerWidth + 1 ? [] :
      [...document.querySelectorAll('body *')].filter(element => {
        const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
        return rect.width > 0 && style.display !== 'none' && style.visibility !== 'hidden' &&
          (rect.right > innerWidth + 1 || rect.left < -1);
      }).slice(0, 15).map(element => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName, class: String(element.className), text: element.textContent.trim().slice(0, 90), left: rect.left, right: rect.right };
      })
  }));
}

async function firstVisibleTerm(page, term) {
  // Prefer informative headings/prose over breadcrumbs or an adjacent link icon.
  const control = `[data-gaeo-term="${term}"]:not(.gaeo-term-trigger--reference)`;
  for (const selector of [`main h1 ${control}`, `main h2 ${control}`, `main p ${control}`, `main ${control}`, `body ${control}`, `body [data-gaeo-term="${term}"]`]) {
    for (const candidate of await page.locator(selector).all()) if (await candidate.isVisible()) return candidate;
  }
  return null;
}

async function screenshot(page, entry, name) {
  const filename = `${name}-${entry.width}.png`;
  await page.screenshot({ path: resolve(evidence, filename), fullPage: false, animations: 'disabled' });
  const detail = { file: filename, route: entry.route, width: entry.width };
  summary.screenshots.push(detail);
  entry.screenshots.push(filename);
}

let browser, currentPage, current;
try {
  for (const route of routes) assert.ok(existsSync(resolve(root, route.slice(1), 'index.html')), 'Missing built route ' + route);
  await new Promise((resolveReady, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolveReady);
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.GAEO_CHROMIUM_PATH ? { executablePath: process.env.GAEO_CHROMIUM_PATH } : {})
  });
  for (const route of routes) for (const viewport of viewports) {
    const lang = route.startsWith('/en/') ? 'en' : 'ru';
    current = { route, width: viewport.width, lang, status: 'running', screenshots: [], clickedTerms: [] };
    summary.checks.push(current);
    currentPage = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    const page = currentPage, errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    const response = await page.goto(base + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    assert.equal(response?.status(), 200, 'HTTP status ' + route);
    await page.waitForFunction(() => document.documentElement.dataset.gaeoTermHints === 'ready', null, { timeout: 10000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    assert.equal(await page.locator('html').getAttribute('lang'), lang, 'Document language ' + route);
    const initialization = await page.evaluate(() => ({
      ready: document.documentElement.dataset.gaeoTermHints,
      styles: document.querySelectorAll('link[data-gaeo-term-styles]').length,
      scripts: document.querySelectorAll('script[data-gaeo-term-script]').length,
      descriptions: document.querySelectorAll('[data-gaeo-term-definitions]').length,
      tooltips: document.querySelectorAll('#gaeo-term-tooltip').length
    }));
    assert.deepEqual(initialization, { ready: 'ready', styles: 1, scripts: 1, descriptions: 1, tooltips: 1 }, 'Single initialization ' + route);
    current.initialization = initialization;
    const controls = await page.locator('[data-gaeo-term]').evaluateAll(elements => elements.map(element => ({
      term: element.dataset.gaeoTerm,
      button: element.tagName === 'BUTTON' && element.getAttribute('type') === 'button',
      name: element.getAttribute('aria-label'),
      description: document.getElementById(element.getAttribute('aria-describedby'))?.textContent,
      controls: element.getAttribute('aria-controls'),
      nested: Boolean(element.parentElement.closest('a[href],button,summary,label,[role="button"],[role="link"]')),
      mark: Boolean(element.querySelector('.gaeo-term-mark[aria-hidden="true"]')),
      labelStyle: element.classList.contains('gaeo-term-trigger--reference') ? null : getComputedStyle(element.querySelector('.gaeo-term-label')).textDecorationStyle
    })));
    current.controlCounts = Object.fromEntries(['GEO', 'AEO', 'BMR', 'SoV', 'WMS', 'Fulfillment', 'AIStart'].map(term => [term, controls.filter(control => control.term === term).length]));
    for (const control of controls) {
      assert.ok(control.button && control.name && !control.mark, 'Plain accessible term control without a question icon ' + JSON.stringify(control));
      assert.equal(control.nested, false, 'Term button nested inside another interactive control');
      assert.equal(control.controls, 'gaeo-term-tooltip');
      assert.equal(control.description, TERM_DEFINITIONS[lang][control.term], 'Accessible definition ' + control.term);
      if (control.labelStyle !== null) assert.equal(control.labelStyle, 'dotted', 'Dotted underline ' + control.term);
    }
    assert.equal(await page.locator('a [data-gaeo-term], a .gaeo-term-link-label, .gaeo-term-reference').count(), 0, 'Links keep their original markup without added term controls');
    const before = await dimensions(page);
    current.documentWidth = before.document;
    assert.ok(before.document <= viewport.width + 1, 'Document overflow: ' + JSON.stringify(before));
    if (route === '/') assert.ok(current.controlCounts.BMR > 0, 'Homepage needs an explanation for its BMR metric');
    if (route === '/' || route === '/en/') {
      assert.equal(current.controlCounts.AIStart, 1, 'History hint exists exactly once on ' + route);
      const proof = await page.locator('.hero-proof').innerText();
      assert.ok(proof.includes(lang === 'ru' ? 'с 1997 года' : 'since 1997'), 'Correct first AI-study year');
      assert.ok(!proof.includes('1998'), 'No old AI-study year in hero');
      const statistics = await page.locator('.trustbar').innerText();
      assert.ok(statistics.includes('70+'), 'Publications statement reflects documented count');
      assert.ok(!statistics.includes('40+'), 'Legacy publications count removed');
    }
    if (route === '/strategies/measurement/') {
      assert.ok(current.controlCounts.BMR > 0, 'Measurement page BMR control');
      assert.ok(current.controlCounts.SoV > 0, 'Measurement page SoV control');
    }
    if (route === '/services/geo-audit/') assert.ok(current.controlCounts.GEO > 0, 'Audit page GEO control');
    if (route === '/professional-biography/') assert.ok(current.controlCounts.AEO > 0, 'Biography page AEO control');
    if (route === '/rankings/wms/') assert.ok(current.controlCounts.WMS > 0, 'WMS ranking page must explain WMS');
    if (route === '/industries/fulfillment/' || route === '/en/industries/fulfillment/')
      assert.ok(current.controlCounts.Fulfillment > 0, 'Fulfillment industry page must explain its category');

    // Capture tops before any tooltip interaction or automatic scrolling.
    if ([1440, 390].includes(viewport.width) && ['/', '/en/', '/services/'].includes(route)) {
      await page.evaluate(() => scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      await screenshot(page, current, route === '/' ? 'home-top' : route === '/en/' ? 'en-home-top' : 'services-top');
    }
    for (const term of ['GEO', 'AEO', 'BMR', 'SoV', 'WMS', 'Fulfillment', 'AIStart']) {
      const trigger = await firstVisibleTerm(page, term);
      if (!trigger) continue; // Explained terms and closed FAQ answers need no forced control.
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      const tooltip = page.locator('#gaeo-term-tooltip');
      assert.ok(await tooltip.isVisible(), 'Term hint opens ' + term + ' ' + route);
      assert.equal(await tooltip.textContent(), TERM_DEFINITIONS[lang][term], 'Exact live definition ' + term + ' ' + route);
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
      const box = await tooltip.boundingBox();
      assert.ok(box && box.x >= 10 && box.x + box.width <= viewport.width - 10,
        'Tooltip horizontal bounds ' + JSON.stringify({ route, term, viewport, box }));
      assert.ok(box && box.y >= 10 && box.y + box.height <= viewport.height - 10,
        'Tooltip vertical bounds ' + JSON.stringify({ route, term, viewport, box }));
      current.clickedTerms.push({ term, bounds: box });
      const capture = [1440, 390].includes(viewport.width) &&
        ((route === '/strategies/measurement/' && ['BMR', 'SoV'].includes(term)) ||
         (route === '/services/geo-audit/' && term === 'GEO') ||
         (route === '/professional-biography/' && term === 'AEO') ||
         ((route === '/' || route === '/en/') && term === 'AIStart'));
      if (capture) {
        // Reset the reading window immediately before capturing the live popup.
        await trigger.click();
        await screenshot(page, current, `${route === '/strategies/measurement/' ? 'measurement' : route === '/professional-biography/' ? 'biography' : route === '/' ? 'home' : route === '/en/' ? 'en-home' : 'geo-audit'}-${term}-tooltip`);
      }
      await page.keyboard.press('Escape');
      assert.equal(await tooltip.isVisible(), false, 'Escape dismisses live tooltip');
      await page.mouse.move(0, 0);
    }
    const after = await dimensions(page);
    assert.ok(after.document <= viewport.width + 1, 'Overflow after tooltip interaction: ' + JSON.stringify(after));
    assert.deepEqual(errors, [], 'Page JavaScript errors ' + route);
    current.status = 'passed';
    console.log(`TERMINOLOGY_SITE=PASS ${route} ${viewport.width}px controls=${controls.length} clicked=${current.clickedTerms.map(item => item.term).join(',') || 'none needed'}`);
    await page.close();
    currentPage = null;
    save();
  }
  summary.status = 'passed';
  summary.completedAt = new Date().toISOString();
  save();
  console.log(`Terminology integration QA passed: ${summary.checks.length} page/viewport combinations; ${summary.screenshots.length} screenshots.`);
} catch (error) {
  summary.status = 'failed';
  summary.error = String(error.stack || error);
  if (current) {
    current.status = 'failed';
    current.error = String(error.message || error);
    if (currentPage) {
      try { await screenshot(currentPage, current, `${routeId(current.route)}-failure`); } catch {}
    }
  }
  summary.completedAt = new Date().toISOString();
  save();
  throw error;
} finally {
  await browser?.close();
  await new Promise(done => server.listening ? server.close(done) : done());
}
