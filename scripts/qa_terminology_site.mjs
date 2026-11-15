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
  '/', '/cases/', '/en/cases/', '/services/', '/services/website-development/', '/services/geo-audit/',
  '/tarify/', '/strategies/measurement/', '/industries/legal/', '/industries/fulfillment/',
  '/cases/methodlab-rost-neyrovidimosti-19-52-procenta/', '/en/cases/methodlab-ai-visibility-growth/',
  '/rankings/wms/', '/professional-biography/', '/en/professional-biography/', '/en/industries/fulfillment/',
  '/strategies/ecommerce-measurement/', '/articles/geo-spetsialisty-110-otvetov-bmr-frs-2026/',
  '/industries/tourism/', '/strategies/industrial-supplier-evidence/', '/industries/architectural-design-bureaus/',
  '/en/', '/en/services/', '/en/strategies/measurement/', '/strategies/', '/en/strategies/'
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
  const attribute = 'data-gaeo-term';
  const control = `:is([${attribute}="${term}"],[${attribute}^="${term}|"],[${attribute}*="|${term}|"],[${attribute}$="|${term}"]):not(.gaeo-term-trigger--reference)`;
  for (const selector of [`main h1 ${control}`, `main h2 ${control}`, `main p ${control}`, `main ${control}`, `body ${control}`]) {
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
      terms: element.dataset.gaeoTerm.split('|'),
      button: element.tagName === 'BUTTON' && element.getAttribute('type') === 'button',
      name: element.getAttribute('aria-label'),
      descriptions: element.getAttribute('aria-describedby')?.split(' ').map(id => document.getElementById(id)?.textContent),
      controls: element.getAttribute('aria-controls'),
      nested: (() => {
        const ancestor = element.parentElement.closest('a[href],button,summary,label,[role="button"],[role="link"]');
        return Boolean(ancestor && !(ancestor.matches('summary.price-summary') &&
          ancestor.closest('.tariff-plans > details.tariff-plan')));
      })(),
      mark: Boolean(element.querySelector('.gaeo-term-mark[aria-hidden="true"]')),
      linkHelp: element.matches('.gaeo-term-link-help'),
      labelStyle: element.matches('.gaeo-term-link-help') ? null : getComputedStyle(element.querySelector('.gaeo-term-label')).textDecorationStyle
    })));
    current.controlCounts = Object.fromEntries(['GEO', 'AEO', 'SEO', 'BMR', 'SoV', 'WMS', 'Fulfillment', 'Ecommerce', 'STM', 'GitHub', 'FRS', 'Shortlist', 'SKU', 'PRR', 'SCR', 'RAR', 'RRR', 'PPSR', 'DMC', 'MICE', 'KM', 'KMD', 'SKUD', 'VIN', 'EPTS', 'PSI', 'Astro', 'TZ', 'SRO', 'BIM', 'BrandFound', 'AIStart'].map(term => [term, controls.filter(control => control.terms.includes(term)).length]));
    for (const control of controls) {
      assert.ok(control.button && control.name && !control.mark, 'Accessible standalone term control ' + JSON.stringify(control));
      assert.equal(control.nested, false, 'Term button nested inside another interactive control');
      assert.equal(control.controls, 'gaeo-term-tooltip');
      assert.deepEqual(control.descriptions, control.terms.map(term => TERM_DEFINITIONS[lang][term]), 'Accessible definitions ' + control.terms.join(', '));
      if (control.labelStyle !== null) assert.equal(control.labelStyle, 'dotted', 'Dotted underline ' + control.terms[0]);
    }
    assert.equal(await page.locator('a [data-gaeo-term], a .gaeo-term-link-label, .gaeo-term-reference').count(), 0, 'No controls nested inside anchors');
    assert.equal(await page.locator('header .gaeo-term-link-help, nav .gaeo-term-link-help, footer .gaeo-term-link-help').count(), 0, 'No question marks in navigation');
    assert.equal(await page.locator('.tariff-actions .gaeo-term-link-help, .case-actions .gaeo-term-link-help').count(), 0,
      'No glossary icons inside pricing and conversion buttons');
    assert.deepEqual(await page.locator('.gaeo-term-link-inline').evaluateAll(groups => groups.flatMap(group =>
      group.querySelectorAll(':scope > .gaeo-term-link-help').length === 1 ? [] : [group.textContent.trim()])), [],
      'Each linked group has exactly one help button');
    const misalignedIcons = await page.locator('.gaeo-term-link-help:visible').evaluateAll(buttons => buttons.flatMap(button => {
      const anchor = button.parentElement.querySelector('a');
      const range = document.createRange();
      range.selectNodeContents(anchor);
      const image = anchor.querySelector(':scope > :is(img, picture):first-child');
      const first = image?.getBoundingClientRect() ?? [...range.getClientRects()].find(rect => rect.width > 0);
      const hit = button.getBoundingClientRect();
      const circle = button.querySelector('.gaeo-term-link-icon').getBoundingClientRect();
      const aligned = first && (image ? Math.abs(circle.top - first.top) <= 5 :
        circle.top >= first.top - 4 && circle.top < (first.top + first.bottom) / 2);
      if (aligned && hit.width === 18 && hit.height === 18 && circle.width === 14 && circle.height === 14) return [];
      return [{ text: anchor.textContent.trim(), first: first?.toJSON(), hit: hit.toJSON(), circle: circle.toJSON() }];
    }));
    assert.deepEqual(misalignedIcons, [], 'Question marks start at the top of the first linked line and retain their hit area');
    if (route === '/cases/' || route === '/en/cases/') {
      assert.ok(await page.locator('#geo-promotion h3 .gaeo-term-link-inline').count() >= 2, 'BMR titles retain independent help icons');
      const title = page.locator('#geo-promotion .list-card h3 a').filter({ hasText: 'MethodLab' });
      const icon = title.locator('xpath=following-sibling::button[contains(@class,"gaeo-term-link-help")]');
      assert.equal(await title.count(), 1, 'MethodLab title link exists');
      assert.equal(await icon.count(), 1, 'One independent ? follows the unexpanded BMR link');
      assert.equal(await icon.getAttribute('data-gaeo-term'), 'BMR');
      assert.equal(await icon.textContent(), '?');
      assert.equal(await title.locator('button').count(), 0, 'Link text cannot contain a button');
    }
    if (viewport.width <= 390) {
      const mobileLanguages = page.locator('#mobileMenu > .mobile-langs');
      assert.equal(await mobileLanguages.count(), 1, 'RU/EN language switch is the last mobile menu item ' + route);
      assert.equal(await page.locator('#mobileMenu > :last-child').getAttribute('class'), 'mobile-langs');
      for (const code of ['ru', 'en']) {
        const mobile = await mobileLanguages.locator('.lang-' + code).getAttribute('href');
        const desktop = await page.locator('#desktopMenu .langs .lang-' + code).getAttribute('href');
        assert.equal(mobile, desktop, 'Mobile language link must use the correct equivalent page ' + route + ' ' + code);
      }
    }
    if (route.includes('/cases/methodlab-')) {
      const brandFoundLinks = page.locator('main a[href="https://brandfound.ai/?ref=ZML17L"]');
      assert.ok(await brandFoundLinks.count() >= 1, 'MethodLab must link BrandFound to personal referral ' + route);
      assert.ok(await page.locator('main .gaeo-term-link-help[data-gaeo-term="BrandFound"]').count() >= 1,
        'MethodLab must explain BrandFound without changing its linked text ' + route);
      const label = lang === 'ru' ? 'Как измерять BMR, Share of Voice' : 'How to measure BMR, Share of Voice';
      const measurement = page.locator('main p').filter({ hasText: label }).last();
      assert.equal(await measurement.count(), 1, 'Measurement link exists on ' + route);
      const help = measurement.locator('.gaeo-term-link-help');
      assert.equal(await help.count(), 1);
      assert.equal(await help.getAttribute('data-gaeo-term'), 'BMR|SoV', 'Both metric definitions share one button');
      const pos = await measurement.evaluate(element => {
        const anchor = element.querySelector('.gaeo-term-link-inline > a');
        const range = document.createRange();
        range.selectNodeContents(anchor);
        const lines = new Set([...range.getClientRects()].filter(rect => rect.width > 0).map(rect => rect.top));
        return { lines: lines.size, trailing: anchor.parentElement.nextSibling?.textContent.trim() || '' };
      });
      assert.equal(pos.trailing, '', 'No orphan period after measurement link');
      if (viewport.width === 320) {
        assert.ok(pos.lines >= 2, 'Measurement link wraps on a phone');
      }
    }
    if (route === '/strategies/' || route === '/en/strategies/') {
      for (const [slug, terms] of [['measurement', ['BMR', 'SoV']], ['ecommerce-measurement', ['PRR', 'SCR', 'RAR', 'RRR', 'PPSR']]]) {
        const link = page.locator(`h2 a[href="${route}${slug}/"]`);
        const help = link.locator('xpath=following-sibling::button[contains(@class,"gaeo-term-link-help")]');
        assert.equal(await help.count(), 1, 'One button beside the ' + slug + ' link');
        await help.click();
        const tooltip = page.locator('#gaeo-term-tooltip');
        assert.deepEqual(await tooltip.locator('.gaeo-term-tooltip-entry').allTextContents(), terms.map(term => TERM_DEFINITIONS[lang][term]));
        assert.deepEqual(await tooltip.locator('.gaeo-term-tooltip-entry').evaluateAll(entries => entries.map(entry => getComputedStyle(entry).borderTopWidth)),
          ['0px', ...terms.slice(1).map(() => '1px')], 'Each pair of definitions has a horizontal separator');
        if (viewport.width === 1440) assert.ok(await tooltip.evaluate(element => element.scrollHeight <= element.clientHeight),
          'Grouped definitions are fully visible when there is room beside the trigger');
        await page.keyboard.press('Escape');
      }
    }
    const before = await dimensions(page);
    current.documentWidth = before.document;
    assert.ok(before.document <= viewport.width + 1, 'Document overflow: ' + JSON.stringify(before));
    if (route === '/') assert.ok(current.controlCounts.BMR > 0, 'Homepage needs an explanation for its BMR metric');
    if (route === '/' && viewport.width === 1440) {
      const dotted = page.locator('.hero-proof [data-gaeo-term="AIStart"]');
      await dotted.hover();
      assert.ok(await page.locator('#gaeo-term-tooltip').isVisible(), 'Desktop history tooltip appears on mouse hover');
      await page.mouse.move(0, 0);
      assert.equal(await page.locator('#gaeo-term-tooltip').isVisible(), false, 'Desktop tooltip disappears as soon as the cursor leaves');
    }
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
    if (route === '/tarify/') {
      const audit = page.locator('.tariff-plans > details.tariff-plan[data-plan="audit"]');
      const term = audit.locator('summary.price-summary .tariff-summary [data-gaeo-term="GEO"]');
      assert.equal(await term.count(), 1, 'Full-audit tariff must underline GEO in its summary');
      assert.equal(await term.locator('.gaeo-term-label').evaluate(el => getComputedStyle(el).textDecorationStyle),
        'dotted', 'GEO tariff text uses dotted underline');
      assert.ok(await audit.evaluate(el => el.open), 'Audit tariff initially expanded');
      await term.click();
      assert.equal(await page.locator('#gaeo-term-tooltip').textContent(),
        TERM_DEFINITIONS[lang].GEO, 'GEO tariff tooltip shows the shared definition');
      assert.ok(await audit.evaluate(el => el.open), 'Tapping term does not collapse tariff');
      await page.keyboard.press('Escape');
      await audit.locator('summary.price-summary h3').click();
      assert.equal(await audit.evaluate(el => el.open), false, 'Tapping heading still collapses tariff');
      await audit.locator('summary.price-summary h3').click();
      assert.ok(await audit.evaluate(el => el.open), 'Tapping heading still expands tariff');
    }
    if (route === '/cases/') {
      assert.ok(current.controlCounts.SEO > 0, 'SEO explanations added to development case text');
      const text = await page.locator('main').innerText();
      assert.ok(text.includes('Посмотрите, что входит'), 'Polite CTA text');
      assert.ok(!text.includes('Посмотри, что входит'), 'No informal CTA');
    }
    if (route === '/professional-biography/') assert.ok(current.controlCounts.AEO > 0, 'Biography page AEO control');
    if (route === '/professional-biography/' || route === '/en/professional-biography/') {
      assert.ok(current.controlCounts.Ecommerce > 0, 'Biography has an E-commerce term hint on ' + route);
      assert.ok(current.controlCounts.GitHub > 0, 'Biography has a GitHub term hint on ' + route);
    }
    if (route === '/services/website-development/')
      assert.ok(current.controlCounts.GitHub > 0, 'Website development page has a GitHub hint');
    if (route === '/strategies/ecommerce-measurement/')
      for (const term of ['PRR', 'SCR', 'RAR', 'RRR', 'PPSR', 'SKU'])
        assert.ok(current.controlCounts[term] > 0, 'E-commerce methodology must explain ' + term);
    if (route === '/articles/geo-spetsialisty-110-otvetov-bmr-frs-2026/')
      assert.ok(current.controlCounts.FRS > 0, 'FRS research article needs glossary help');
    if (route === '/industries/tourism/') {
      assert.ok(current.controlCounts.DMC > 0, 'DMC tourism definition');
      assert.ok(current.controlCounts.MICE > 0, 'MICE tourism definition');
    }
    if (route === '/strategies/industrial-supplier-evidence/')
      for (const term of ['KM', 'KMD'])
        assert.ok(current.controlCounts[term] > 0, 'Metal structure documentation term ' + term);
    if (route === '/industries/architectural-design-bureaus/')
      for (const term of ['SRO', 'BIM', 'TZ'])
        assert.ok(current.controlCounts[term] > 0, 'Architectural design bureau term ' + term);
    if (route === '/rankings/wms/') assert.ok(current.controlCounts.WMS > 0, 'WMS ranking page must explain WMS');
    if (route === '/industries/fulfillment/' || route === '/en/industries/fulfillment/')
      assert.ok(current.controlCounts.Fulfillment > 0, 'Fulfillment industry page must explain its category');

    // Capture tops before any tooltip interaction or automatic scrolling.
    if ([1440, 390].includes(viewport.width) && ['/', '/en/', '/services/'].includes(route)) {
      await page.evaluate(() => scrollTo({ top: 0, left: 0, behavior: 'instant' }));
      await screenshot(page, current, route === '/' ? 'home-top' : route === '/en/' ? 'en-home-top' : 'services-top');
    }
    for (const term of ['GEO', 'AEO', 'SEO', 'BMR', 'SoV', 'WMS', 'Fulfillment', 'Ecommerce', 'STM', 'GitHub', 'FRS', 'Shortlist', 'SKU', 'PRR', 'SCR', 'RAR', 'RRR', 'PPSR', 'DMC', 'MICE', 'KM', 'KMD', 'SKUD', 'VIN', 'EPTS', 'PSI', 'Astro', 'TZ', 'SRO', 'BIM', 'BrandFound', 'AIStart']) {
      const trigger = await firstVisibleTerm(page, term);
      if (!trigger) continue; // Explained terms and closed FAQ answers need no forced control.
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      const tooltip = page.locator('#gaeo-term-tooltip');
      assert.ok(await tooltip.isVisible(), 'Term hint opens ' + term + ' ' + route);
      const shownTerms = (await trigger.getAttribute('data-gaeo-term')).split('|');
      assert.deepEqual(await tooltip.locator('.gaeo-term-tooltip-entry').allTextContents(),
        shownTerms.map(key => TERM_DEFINITIONS[lang][key]), 'Exact live definitions ' + term + ' ' + route);
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
