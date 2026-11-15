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
    <title>GEO, AEO, BMR, SoV</title><meta name="description" content="GEO test">
    <style>body{margin:16px;font:16px/1.6 Arial,sans-serif}h1{font-size:48px;line-height:1.1}a.card{display:block}.scroll-table{overflow:auto;max-width:100%}</style>
    <script type="application/ld+json">{"name":"GEO","metric":"BMR"}</script>
  </head><body>
    <header><nav><a id="nav" href="#destination">GEO</a></nav></header>
    <h1 id="heading">Сравнение <span>GEO</span> и SEO</h1>
    <p id="metrics">Измеряем BMR и SoV.</p>
    <p id="aeo">AEO помогает подготовить контент.</p>
    <p id="already"><b>GEO</b> (Generative Engine Optimization)</p>
    <p id="already-aeo"><strong>AEO</strong> (Answer Engine Optimization)</p>
    <p id="brand">GAEO.ru, GEOLOGY, GEO@example.ru, https://example.ru/GEO/</p>
    <p><a id="inline-link" href="#destination">Методика <em>GEO/AEO</em>, BMR и SoV</a></p>
    <a class="card" href="#destination">GEO: ссылка на целую карточку</a>
    <p id="compound">GEO/AEO-эксперт</p>
    <div class="scroll-table"><table><tr><th>Показатель</th><th id="metric-cell">BMR</th></tr></table></div>
    <p id="faq-answer">GEO помогает бренду. BMR измеряет долю ответов.</p>
    <pre id="code">GEO BMR SoV</pre><p data-term-hints="off" id="off">GEO</p>
    <form><label for="input">BMR</label><input id="input" value="GEO"><button>GEO</button></form>
    <div id="dynamic"></div><button id="outside" type="button">Закрыть подсказку</button>
    <p id="destination">Цель ссылки</p>
  </body></html>`);
  const originalLink = await page.locator('#inline-link').evaluate(element => ({
    html: element.innerHTML, decoration: getComputedStyle(element).textDecorationStyle,
    href: element.getAttribute('href')
  }));
  await page.addStyleTag({ content: css });
  await page.addScriptTag({ type: 'module', content: js });
  await page.waitForFunction(() => document.documentElement.dataset.gaeoTermHints === 'ready');
  const tooltip = page.locator('#gaeo-term-tooltip');
  assert.equal(await page.locator('#heading [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#metric-cell [data-gaeo-term="BMR"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#aeo [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#already [data-gaeo-term], #already-aeo [data-gaeo-term], #code [data-gaeo-term], #brand [data-gaeo-term], #off [data-gaeo-term], header [data-gaeo-term], form [data-gaeo-term], a [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('.gaeo-term-mark,.gaeo-term-reference,.gaeo-term-link-label,[data-gaeo-term-link-label]').count(), 0, 'No circles, icons or added link markup');
  assert.equal(await page.title(), 'GEO, AEO, BMR, SoV');
  assert.equal(await page.locator('script[type="application/ld+json"]').textContent(), '{"name":"GEO","metric":"BMR"}');
  assert.equal(await page.locator('#faq-answer').textContent(), 'GEO помогает бренду. BMR измеряет долю ответов.', 'Term buttons do not change FAQ text/schema parity');
  const headingStyle = await page.locator('#heading [data-gaeo-term]').evaluate(el => ({ font: getComputedStyle(el).fontSize, parent: getComputedStyle(el.closest('h1')).fontSize, label: getComputedStyle(el.querySelector('.gaeo-term-label')).textDecorationStyle }));
  assert.equal(headingStyle.font, headingStyle.parent, 'Heading type size is inherited');
  assert.equal(headingStyle.label, 'dotted');

  // Only the dotted acronym opens the exact definition; no icon is inserted.
  const bmr = page.locator('#metrics [data-gaeo-term="BMR"]');
  await bmr.locator('.gaeo-term-label').click();
  assert.equal(await tooltip.textContent(), 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await tooltip.isVisible(), false);
  await bmr.click();
  assert.ok(await tooltip.isVisible());
  await tooltip.click();
  assert.equal(await tooltip.isVisible(), false, 'Clicking the displayed explanation closes it');
  await bmr.click();
  assert.ok(await tooltip.isVisible(), 'Clicking the term opens the explanation again');
  await page.locator('#outside').click();
  assert.equal(await tooltip.isVisible(), false);
  await page.locator('#aeo [data-gaeo-term="AEO"]').click();
  assert.equal(await tooltip.textContent(), 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей');
  assert.equal(await page.locator('#aeo .gaeo-term-label').evaluate(element => getComputedStyle(element).textDecorationStyle), 'dotted', 'The active term keeps its dotted underline');
  await page.keyboard.press('Escape');

  // Native button keyboard interaction remains available after timed dismissal.
  await bmr.focus();
  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');
  await page.keyboard.press('Space');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');

  // An inline link keeps exactly its own markup, styling and normal navigation.
  assert.deepEqual(await page.locator('#inline-link').evaluate(element => ({
    html: element.innerHTML, decoration: getComputedStyle(element).textDecorationStyle,
    href: element.getAttribute('href')
  })), originalLink);
  await page.locator('#inline-link').hover();
  assert.equal(await tooltip.isVisible(), false, 'Hovering a link adds no term popup');
  await page.locator('#inline-link').focus();
  assert.equal(await tooltip.isVisible(), false, 'Focusing a link adds no term popup');
  await page.locator('#inline-link').click();
  assert.ok(page.url().endsWith('#destination'));

  // Newly rendered ordinary text gets hints once, including AEO.
  await page.evaluate(() => { document.querySelector('#dynamic').innerHTML = '<p id="inserted">BMR вырос.</p>'; });
  await page.waitForFunction(() => document.querySelectorAll('#inserted [data-gaeo-term="BMR"]').length === 1);
  await page.evaluate(() => { document.querySelector('#inserted').textContent = 'SoV, GEO и AEO'; });
  await page.waitForFunction(() => document.querySelectorAll('#inserted [data-gaeo-term]').length === 3);
  const count = await page.locator('[data-gaeo-term]').count();
  await page.addScriptTag({ type: 'module', content: js });
  assert.equal(await page.locator('[data-gaeo-term]').count(), count, 'Repeat install does not duplicate controls');
  await page.evaluate(() => { document.querySelector('#inline-link').textContent = 'Методика GEO/AEO'; });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(await page.locator('#inline-link').innerHTML(), 'Методика GEO/AEO', 'Updated link text stays unmodified');
  assert.equal(await page.locator('.gaeo-term-reference,.gaeo-term-link-label').count(), 0);
  // If another renderer moves an existing term into a link, restore plain text.
  await page.evaluate(() => {
    const link = document.createElement('a');
    link.id = 'moved-link';
    link.href = '#destination';
    link.append(document.querySelector('#inserted [data-gaeo-term="AEO"]'));
    document.querySelector('#dynamic').append(link);
  });
  await page.waitForFunction(() => document.querySelector('#moved-link')?.textContent === 'AEO' && !document.querySelector('#moved-link [data-gaeo-term]'));
  assert.equal(await page.locator('#moved-link').innerHTML(), 'AEO');

  // Long SoV text stays inside a 320 px viewport, including after scroll.
  await page.setViewportSize({ width: 320, height: 640 });
  const sov = page.locator('#metrics [data-gaeo-term="SoV"]');
  await sov.click();
  let box = await tooltip.boundingBox();
  assert.ok(box.x >= 10 && box.x + box.width <= 310, JSON.stringify(box));
  assert.ok(box.y >= 10 && box.y + box.height <= 630, JSON.stringify(box));
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320);
  assert.equal(await page.locator('button button, a button').count(), 0, 'No nested interactive controls');

  // Real elapsed time checks the new five-second reading window.
  await sov.click();
  const started = Date.now();
  await page.waitForTimeout(3900);
  assert.ok(await tooltip.isVisible(), 'The hint remains visible before five seconds');
  await page.waitForTimeout(Math.max(0, 5400 - (Date.now() - started)));
  assert.equal(await tooltip.isVisible(), false, 'The hint automatically closes after five seconds');
  const elapsed = Date.now() - started;
  await sov.press('Enter');
  assert.ok(await tooltip.isVisible(), 'The hint can be reopened after timeout');
  assert.deepEqual(errors, []);

  const english = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await english.setContent('<!doctype html><html lang="en"><head><title>Terms</title></head><body><p>GEO, AEO, BMR and SoV</p></body></html>');
  await english.addStyleTag({ content: css });
  await english.addScriptTag({ type: 'module', content: js });
  for (const [term, definition] of Object.entries({
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    AEO: 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer'
  })) {
    await english.locator(`[data-gaeo-term="${term}"]`).click();
    assert.equal(await english.locator('#gaeo-term-tooltip').textContent(), definition);
  }
  assert.equal(await english.locator('.gaeo-term-mark,.gaeo-term-reference').count(), 0);
  console.log(`Term hint browser QA passed: 4 terms, dotted text without icons, unchanged links, keyboard, mutation, idempotence, language, 320 px layout, visible at 3.9 s and closed when checked at ${elapsed} ms, click-to-dismiss.`);
} finally {
  await browser.close();
}
