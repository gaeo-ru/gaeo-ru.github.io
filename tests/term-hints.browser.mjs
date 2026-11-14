import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

// Run with: node tests/term-hints.browser.mjs
// This fixture deliberately exercises interaction and dynamic content, rather
// than relying on the public website or changing any service-side state.
const js = readFileSync(new URL('../public/assets/term-hints.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../public/assets/term-hints.css', import.meta.url), 'utf8');
const browser = await chromium.launch({
  ...(process.env.GAEO_CHROMIUM_PATH ? { executablePath: process.env.GAEO_CHROMIUM_PATH } : {}),
  args: ['--no-sandbox']
});
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.setContent(`<!doctype html><html lang="ru"><head>
    <title>GEO, BMR, SoV</title><meta name="description" content="GEO test">
    <style>body{margin:16px;font:16px/1.6 Arial,sans-serif}h1{font-size:48px;line-height:1.1}a.card{display:block}.scroll-table{overflow:auto;max-width:100%}</style>
    <script type="application/ld+json">{"name":"GEO","metric":"BMR"}</script>
  </head><body>
    <header><nav><a id="nav" href="#destination">GEO</a></nav></header>
    <h1 id="heading">Сравнение <span>GEO</span> и SEO</h1>
    <p id="metrics">Измеряем BMR и SoV.</p>
    <p id="already"><b>GEO</b> (Generative Engine Optimization)</p>
    <p id="brand">GAEO.ru, GEOLOGY, GEO@example.ru, https://example.ru/GEO/</p>
    <p><a id="inline-link" href="#destination">Методика BMR</a></p>
    <a class="card" href="#destination">GEO: ссылка на целую карточку</a>
    <p id="compound">GEO/AEO-эксперт</p>
    <div class="scroll-table"><table><tr><th>Показатель</th><th id="metric-cell">BMR</th></tr></table></div>
    <p id="faq-answer">GEO помогает бренду. BMR измеряет долю ответов.</p>
    <pre id="code">GEO BMR SoV</pre><p data-term-hints="off" id="off">GEO</p>
    <form><label for="input">BMR</label><input id="input" value="GEO"><button>GEO</button></form>
    <div id="dynamic"></div><button id="outside" type="button">Закрыть подсказку</button>
    <p id="destination">Цель ссылки</p>
  </body></html>`);
  await page.addStyleTag({ content: css });
  await page.addScriptTag({ type: 'module', content: js });
  await page.waitForFunction(() => document.documentElement.dataset.gaeoTermHints === 'ready');
  const tooltip = page.locator('#gaeo-term-tooltip');
  assert.equal(await page.locator('#heading [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#metric-cell [data-gaeo-term="BMR"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#already [data-gaeo-term], #code [data-gaeo-term], #brand [data-gaeo-term], #off [data-gaeo-term], header [data-gaeo-term], form [data-gaeo-term], a.card [data-gaeo-term]').count(), 0);
  assert.equal(await page.title(), 'GEO, BMR, SoV');
  assert.equal(await page.locator('script[type="application/ld+json"]').textContent(), '{"name":"GEO","metric":"BMR"}');
  assert.equal(await page.locator('#faq-answer').textContent(), 'GEO помогает бренду. BMR измеряет долю ответов.', 'Decorative question marks do not change FAQ text/schema parity');
  const headingStyle = await page.locator('#heading [data-gaeo-term]').evaluate(el => ({ font: getComputedStyle(el).fontSize, parent: getComputedStyle(el.closest('h1')).fontSize, label: getComputedStyle(el.querySelector('.gaeo-term-label')).textDecorationStyle }));
  assert.equal(headingStyle.font, headingStyle.parent, 'Heading type size is inherited');
  assert.equal(headingStyle.label, 'dotted');

  // Both the acronym and its circled question mark open the exact definition.
  const bmr = page.locator('#metrics [data-gaeo-term="BMR"]');
  await bmr.locator('.gaeo-term-label').click();
  assert.equal(await tooltip.textContent(), 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await tooltip.isVisible(), false);
  await bmr.locator('.gaeo-term-mark').click();
  assert.ok(await tooltip.isVisible());
  await page.locator('#outside').click();
  assert.equal(await tooltip.isVisible(), false);

  // Native button keyboard interaction remains available after timed dismissal.
  await bmr.focus();
  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');
  await page.keyboard.press('Space');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');

  // An inline link still navigates; its question mark is outside the link.
  assert.equal(await page.locator('#inline-link button').count(), 0);
  assert.equal(await page.locator('#inline-link .gaeo-term-link-label').count(), 1);
  assert.equal(await page.locator('#inline-link').textContent(), 'Методика BMR');
  const reference = page.locator('#inline-link + .gaeo-term-reference [data-gaeo-term="BMR"]');
  await reference.click();
  assert.ok(await tooltip.isVisible());
  await page.locator('#inline-link').click();
  assert.ok(page.url().endsWith('#destination'));

  // Newly rendered content gets hints once; changed/removed links lose stale hints.
  await page.evaluate(() => { document.querySelector('#dynamic').innerHTML = '<p id="inserted">BMR вырос.</p>'; });
  await page.waitForFunction(() => document.querySelectorAll('#inserted [data-gaeo-term="BMR"]').length === 1);
  await page.evaluate(() => { document.querySelector('#inserted').textContent = 'SoV и GEO'; });
  await page.waitForFunction(() => document.querySelectorAll('#inserted [data-gaeo-term]').length === 2);
  const count = await page.locator('[data-gaeo-term]').count();
  await page.addScriptTag({ type: 'module', content: js });
  assert.equal(await page.locator('[data-gaeo-term]').count(), count, 'Repeat install does not duplicate controls');
  await page.evaluate(() => { document.querySelector('#inline-link').textContent = 'Методика GEO'; });
  await page.waitForFunction(() => document.querySelector('#inline-link + .gaeo-term-reference')?.dataset.gaeoTermReference === 'GEO');
  await page.evaluate(() => { document.querySelector('#inline-link').textContent = 'Методика'; });
  await page.waitForFunction(() => !document.querySelector('#inline-link + .gaeo-term-reference'));

  // Long SoV text stays inside a 320 px viewport, including after scroll.
  await page.setViewportSize({ width: 320, height: 640 });
  const sov = page.locator('#metrics [data-gaeo-term="SoV"]');
  await sov.click();
  let box = await tooltip.boundingBox();
  assert.ok(box.x >= 10 && box.x + box.width <= 310, JSON.stringify(box));
  assert.ok(box.y >= 10 && box.y + box.height <= 630, JSON.stringify(box));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320);
  assert.equal(await page.locator('button button, a button').count(), 0, 'No nested interactive controls');

  // Real elapsed time checks the requested 6–7 second reading window.
  await sov.click();
  const started = Date.now();
  await page.waitForTimeout(5000);
  assert.ok(await tooltip.isVisible(), 'The hint remains visible long enough to read');
  await page.waitForTimeout(Math.max(0, 6900 - (Date.now() - started)));
  assert.equal(await tooltip.isVisible(), false, 'The hint closes within the requested reading window');
  const elapsed = Date.now() - started;
  await sov.press('Enter');
  assert.ok(await tooltip.isVisible(), 'The hint can be reopened after timeout');
  assert.deepEqual(errors, []);

  const english = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await english.setContent('<!doctype html><html lang="en"><head><title>Terms</title></head><body><p>BMR and GEO</p></body></html>');
  await english.addStyleTag({ content: css });
  await english.addScriptTag({ type: 'module', content: js });
  await english.locator('[data-gaeo-term="GEO"]').click();
  assert.equal(await english.locator('#gaeo-term-tooltip').textContent(), 'GEO (Generative Engine Optimization) - promotion in AI recommendations');
  console.log(`Term hint browser QA passed: keyboard, links, mutation, idempotence, language, 320 px layout, visible at 5 s and closed when checked at ${elapsed} ms.`);
} finally {
  await browser.close();
}
