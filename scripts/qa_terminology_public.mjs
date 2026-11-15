import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';
const TERM_DEFINITIONS = {
  ru: {
    GEO: 'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей',
    AEO: 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей',
    BMR: 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей',
    SoV: 'SoV (Share of Voice) - доля упоминаний бренда среди всех брендов, упомянутых в ответах нейросети',
    WMS: 'WMS (Warehouse Management System) — система управления складом.',
    Fulfillment: 'Фулфилмент (Fulfillment) — комплекс логистических услуг в сфере интернет-торговли, который включает полный цикл работы с заказами: от приёмки товара на склад до отправки покупателю и обработки возвратов.'
  },
  en: {
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    AEO: 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer',
    WMS: 'WMS (Warehouse Management System) — a warehouse management system.',
    Fulfillment: 'Fulfillment — e-commerce logistics services covering the full order cycle, from receiving goods at a warehouse to shipping to buyers and handling returns.'
  }
};

// Read-only acceptance of the publicly released website. No local build or server.
// Only term-hint buttons are clicked; forms and publishing endpoints are untouched.
const base = 'https://gaeo.ru';
const expectedSourceCommit = process.env.GAEO_EXPECTED_SOURCE_COMMIT || '2cd492b7efb66fdd0c5e41d6d85aa8b8e99559f8';
const evidence = resolve('visual-terminology-public');
const routes = [
  '/', '/services/', '/services/website-development/', '/services/geo-audit/',
  '/tarify/', '/strategies/measurement/', '/industries/legal/', '/industries/fulfillment/',
  '/rankings/wms/', '/professional-biography/', '/en/industries/fulfillment/',
  '/en/services/', '/en/strategies/measurement/'
];
const viewports = [
  { width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 720 }
];
mkdirSync(evidence, { recursive: true });
const summary = {
  startedAt: new Date().toISOString(), status: 'running', base, expectedSourceCommit,
  formsSubmitted: false, release: {},
  routes, widths: viewports.map(viewport => viewport.width), checks: [], screenshots: []
};
const save = () => writeFileSync(resolve(evidence, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
const routeId = route => route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '-');

async function verifyPublicRelease(phase) {
  const url = new URL('/astro-release-manifest.json', base);
  url.searchParams.set('qa_source', expectedSourceCommit);
  url.searchParams.set('t', String(Date.now()));
  const response = await fetch(url, {
    headers: { 'cache-control': 'no-cache', pragma: 'no-cache' },
    signal: AbortSignal.timeout(20000)
  });
  assert.equal(response.status, 200, `Public release manifest HTTP ${response.status}`);
  const manifest = await response.json();
  summary.release[phase] = {
    sourceCommit: manifest.sourceCommit, sourceBranch: manifest.sourceBranch,
    releasedAt: manifest.releasedAt, checkedAt: new Date().toISOString()
  };
  writeFileSync(resolve(evidence, `release-manifest-${phase}.json`), JSON.stringify(manifest, null, 2) + '\n');
  assert.equal(manifest.schema, 1, 'Manifest schema');
  assert.equal(manifest.engine, 'Astro', 'Manifest engine');
  assert.equal(manifest.sourceBranch, 'astro-source', 'Manifest source branch');
  assert.equal(manifest.sourceCommit, expectedSourceCommit, `Public source commit ${phase} QA`);
}

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
  // Prefer informative headings/prose; links keep their original behavior and markup.
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
  await verifyPublicRelease('before');
  save();
  browser = await chromium.launch({
    headless: true,
    ...(process.env.GAEO_CHROMIUM_PATH ? { executablePath: process.env.GAEO_CHROMIUM_PATH } : {})
  });
  for (const route of routes) for (const viewport of viewports) {
    const lang = route.startsWith('/en/') ? 'en' : 'ru';
    current = { route, width: viewport.width, lang, status: 'running', screenshots: [], clickedTerms: [] };
    summary.checks.push(current);
    currentPage = await browser.newPage({ viewport, deviceScaleFactor: 1, extraHTTPHeaders: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' } });
    const page = currentPage, errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    const publicUrl = new URL(route, base);
    publicUrl.searchParams.set('qa_source', expectedSourceCommit);
    current.publicUrl = publicUrl.href;
    const response = await page.goto(publicUrl.href, { waitUntil: 'domcontentloaded', timeout: 40000 });
    assert.equal(response?.status(), 200, 'HTTP status ' + route);
    await page.waitForFunction(() => document.documentElement.dataset.gaeoTermHints === 'ready', null, { timeout: 20000 });
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
    current.controlCounts = Object.fromEntries(['GEO', 'AEO', 'BMR', 'SoV', 'WMS', 'Fulfillment'].map(term => [term, controls.filter(control => control.term === term).length]));
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
    if (route === '/strategies/measurement/') {
      assert.ok(current.controlCounts.BMR > 0, 'Measurement page BMR control');
      assert.ok(current.controlCounts.SoV > 0, 'Measurement page SoV control');
    }
    if (route === '/services/geo-audit/') assert.ok(current.controlCounts.GEO > 0, 'Audit page GEO control');
    if (route === '/professional-biography/') assert.ok(current.controlCounts.AEO > 0, 'Biography page AEO control');
    if (route === '/rankings/wms/') assert.ok(current.controlCounts.WMS > 0, 'WMS must be explained on WMS ranking');
    if (route === '/industries/fulfillment/' || route === '/en/industries/fulfillment/')
      assert.ok(current.controlCounts.Fulfillment > 0, 'Fulfillment term must be explained on industry page');

    // Capture tops before any tooltip interaction or automatic scrolling.
    if ([1440, 390].includes(viewport.width) && ['/', '/services/'].includes(route)) {
      await page.evaluate(() => scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      await screenshot(page, current, route === '/' ? 'home-top' : 'services-top');
    }
    for (const term of ['GEO', 'AEO', 'BMR', 'SoV', 'WMS', 'Fulfillment']) {
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
         (route === '/rankings/wms/' && term === 'WMS') ||
         (route === '/industries/fulfillment/' && term === 'Fulfillment'));
      if (capture) {
        // Reset the reading window immediately before capturing the live popup.
        await trigger.click();
        await screenshot(page, current, `${route === '/strategies/measurement/' ? 'measurement' : route === '/professional-biography/' ? 'biography' : route === '/rankings/wms/' ? 'warehouse' : route === '/industries/fulfillment/' ? 'fulfillment' : 'geo-audit'}-${term}-tooltip`);
      }
      if (current.clickedTerms.length === 1) {
        await tooltip.click();
        assert.equal(await tooltip.isVisible(), false, 'Clicking the live explanation dismisses it');
        assert.equal(await trigger.getAttribute('aria-expanded'), 'false', 'Dismissal resets accessibility state');
        await trigger.click();
        assert.ok(await tooltip.isVisible(), 'Term can be reopened after clicking the explanation');
      }
      await page.keyboard.press('Escape');
      assert.equal(await tooltip.isVisible(), false, 'Escape dismisses live tooltip');
      if (route === '/' && viewport.width === 390 && term === 'BMR') {
        await trigger.click();
        const timingStart = Date.now();
        await page.waitForTimeout(3900);
        assert.ok(await tooltip.isVisible(), 'Live tooltip remains visible before five seconds');
        await page.waitForTimeout(Math.max(0, 5400 - (Date.now() - timingStart)));
        assert.equal(await tooltip.isVisible(), false, 'Live tooltip automatically closes after five seconds');
        current.timerVerifiedMs = Date.now() - timingStart;
      }
      await page.mouse.move(0, 0);
    }
    const after = await dimensions(page);
    assert.ok(after.document <= viewport.width + 1, 'Overflow after tooltip interaction: ' + JSON.stringify(after));
    assert.deepEqual(errors, [], 'Page JavaScript errors ' + route);
    current.status = 'passed';
    console.log(`TERMINOLOGY_PUBLIC=PASS ${route} ${viewport.width}px controls=${controls.length} clicked=${current.clickedTerms.map(item => item.term).join(',') || 'none needed'}`);
    await page.close();
    currentPage = null;
    save();
  }
  await verifyPublicRelease('after');
  summary.status = 'passed';
  summary.completedAt = new Date().toISOString();
  save();
  console.log(`Public terminology QA passed: ${summary.checks.length} page/viewport combinations; ${summary.screenshots.length} screenshots.`);
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
}
