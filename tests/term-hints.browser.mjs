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
    <style>body{margin:16px;font:16px/1.6 Arial,sans-serif}h1{font-size:48px;line-height:1.1}a.card{display:block}.scroll-table{overflow:auto;max-width:100%}#case-heading{max-width:260px;font-size:26px;line-height:1.2}</style>
    <script type="application/ld+json">{"name":"GEO","metric":"BMR"}</script>
  </head><body>
    <header><nav><a id="nav" href="#destination">GEO</a></nav></header>
    <h1 id="heading">Сравнение <span>GEO</span> и SEO</h1>
    <p id="metrics">Измеряем BMR и SoV.</p>
    <p id="aeo">AEO помогает подготовить контент.</p>
    <p id="seo">SEO помогает оптимизировать сайт.</p>
    <p id="seo-expanded">SEO (Search Engine Optimization) помогает бизнесу.</p>
    <p id="historical">Начал учиться: <b><button type="button" class="gaeo-term-trigger" data-gaeo-term="AIStart" aria-label="Как началось изучение ИИ" aria-describedby="gaeo-term-description-aistart" aria-controls="gaeo-term-tooltip" aria-expanded="false"><span class="gaeo-term-label">с 1997 года</span></button></b></p>
    <p id="warehouse">WMS и фулфилмент помогают складу. Для фулфилмента и фулфилментов.</p>
    <p id="warehouse-expanded">WMS (Warehouse Management System) и Фулфилмент (Fulfillment).</p>
    <p id="already"><b>GEO</b> (Generative Engine Optimization)</p>
    <p id="already-aeo"><strong>AEO</strong> (Answer Engine Optimization)</p>
    <p id="brand">GAEO.ru, GEOLOGY, GEO@example.ru, https://example.ru/GEO/</p>
    <main><p><a id="inline-link" href="#destination">Методика <em>GEO/AEO</em>, BMR, SoV, WMS и фулфилмент</a></p>
    <h3 id="case-heading"><a href="#case">MethodLab: BMR вырос с 19% до 52,4%</a></h3>
    <div class="tariff-actions"><a class="button" id="tariff-cta" href="#destination">GEO promotion</a></div>
    <p id="expanded-link"><a href="#expanded">BMR (Brand Mention Rate)</a></p>
    <p id="expanded-seo-link"><a href="#expanded">SEO (Search Engine Optimization)</a></p>
    <h3 id="seo-linked"><a href="#seo-case">Разработка сайта с SEO/GEO-проверками</a></h3>
    <a class="card" href="#destination">GEO: ссылка на целую карточку</a>
    <p id="compound">GEO/AEO-эксперт</p>
    <div class="scroll-table"><table><tr><th>Показатель</th><th id="metric-cell">BMR</th></tr></table></div>
    <p id="faq-answer">GEO помогает бренду. BMR измеряет долю ответов.</p>
    <p id="brandfound-referral">Выгрузка BrandFound содержит ответы.</p>
    <p id="brandfound-explained">BrandFound — сервис мониторинга ответов нейросетей.</p>
    <pre id="code">GEO BMR SoV</pre><p data-term-hints="off" id="off">GEO</p>
    <form><label for="input">BMR</label><input id="input" value="GEO"><button>GEO</button></form>
    <div id="dynamic"></div><button id="outside" type="button">Закрыть подсказку</button>
    <p id="destination">Цель ссылки</p></main>
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
  assert.equal(await page.locator('#heading [data-gaeo-term="SEO"]').count(), 1);
  assert.equal(await page.locator('#seo [data-gaeo-term="SEO"]').count(), 1);
  assert.equal(await page.locator('#seo-expanded [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#expanded-seo-link .gaeo-term-link-help').count(), 0);
  assert.equal(await page.locator('#seo-linked .gaeo-term-link-inline > .gaeo-term-link-help[data-gaeo-term="SEO"]').count(), 1);
  assert.equal(await page.locator('#metric-cell [data-gaeo-term="BMR"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#aeo [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#historical [data-gaeo-term="AIStart"]').count(), 1);
  assert.equal(await page.locator('#warehouse [data-gaeo-term="WMS"]').count(), 1);
  assert.equal(await page.locator('#warehouse [data-gaeo-term="Fulfillment"]').count(), 3);
  assert.equal(await page.locator('#warehouse-expanded [data-gaeo-term]').count(), 0, 'Adjacent full definitions require no popup');
  assert.equal(await page.locator('#already [data-gaeo-term], #already-aeo [data-gaeo-term], #code [data-gaeo-term], #brand [data-gaeo-term], #off [data-gaeo-term], header [data-gaeo-term], form [data-gaeo-term], a [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('.gaeo-term-mark,.gaeo-term-reference,.gaeo-term-link-label,[data-gaeo-term-link-label]').count(), 0, 'No obsolete controls');
  assert.equal(await page.locator('#case-heading .gaeo-term-link-inline > a + button.gaeo-term-link-help[data-gaeo-term="BMR"]').count(), 1, 'BMR help icon follows link in wrapper');
  assert.equal(await page.locator('#expanded-link .gaeo-term-link-help').count(), 0, 'Expanded BMR needs no icon');
  assert.equal(await page.locator('#tariff-cta + .gaeo-term-link-help, .tariff-actions .gaeo-term-link-help').count(), 0, 'Pricing and CTA links stay free of question icons');
  assert.equal(await page.locator('nav .gaeo-term-link-help, a .gaeo-term-link-help').count(), 0, 'No nested or navigational help controls');
  assert.equal(await page.locator('#inline-link').locator('xpath=..').locator(':scope > .gaeo-term-link-help[data-gaeo-term="GEO"]').count(), 1, 'Inline content link gets question help');
  assert.equal(await page.title(), 'GEO, AEO, BMR, SoV');
  assert.equal(await page.locator('script[type="application/ld+json"]').textContent(), '{"name":"GEO","metric":"BMR"}');
  assert.equal(await page.locator('#faq-answer').textContent(), 'GEO помогает бренду. BMR измеряет долю ответов.', 'Term buttons do not change FAQ text/schema parity');
  await page.waitForFunction(() => document.querySelector('#brandfound-referral .gaeo-term-link-help'));
  assert.equal(await page.locator('#brandfound-referral a').getAttribute('href'), 'https://brandfound.ai/?ref=ZML17L');
  assert.equal(await page.locator('#brandfound-referral .gaeo-term-link-help').count(), 1);
  assert.equal(await page.locator('#brandfound-explained a').getAttribute('href'), 'https://brandfound.ai/?ref=ZML17L');
  assert.equal(await page.locator('#brandfound-explained .gaeo-term-link-help').count(), 0, 'Explained BrandFound needs no help icon');
  const headingStyle = await page.locator('#heading [data-gaeo-term="GEO"]').evaluate(el => ({ font: getComputedStyle(el).fontSize, parent: getComputedStyle(el.closest('h1')).fontSize, label: getComputedStyle(el.querySelector('.gaeo-term-label')).textDecorationStyle }));
  assert.equal(headingStyle.font, headingStyle.parent, 'Heading type size is inherited');
  assert.equal(headingStyle.label, 'dotted');
  const geometry = await page.locator('#case-heading .gaeo-term-link-inline').evaluate(group => {
    const a = group.querySelector('a').getBoundingClientRect();
    const icon = group.querySelector('.gaeo-term-link-help').getBoundingClientRect();
    const lh = parseFloat(getComputedStyle(group.querySelector('a')).lineHeight);
    return { top: a.top, height: a.height, iconTop: icon.top, iconBottom: icon.bottom, lh };
  });
  assert.ok(geometry.height > geometry.lh * 1.5, 'Long linked heading wraps onto multiple lines');
  assert.ok(geometry.iconTop >= geometry.top - 1 && geometry.iconBottom <= geometry.top + geometry.lh + 5,
    'Question mark aligns with FIRST line: ' + JSON.stringify(geometry));

  // Only the dotted acronym opens the exact definition; no icon is inserted.
  const bmr = page.locator('#metrics [data-gaeo-term="BMR"]');
  await bmr.locator('.gaeo-term-label').click();
  assert.equal(await tooltip.textContent(), 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  assert.ok(await tooltip.isVisible());
  await page.keyboard.press('Escape');
  assert.equal(await tooltip.isVisible(), false);
  await bmr.click();
  assert.ok(await tooltip.isVisible());
  await tooltip.evaluate(el => el.click());
  assert.equal(await tooltip.isVisible(), false, 'Clicking the displayed explanation closes it');
  await bmr.click();
  assert.ok(await tooltip.isVisible(), 'Clicking the term opens the explanation again');
  await page.locator('#outside').click();
  assert.equal(await tooltip.isVisible(), false);
  await page.locator('#aeo [data-gaeo-term="AEO"]').click();
  assert.equal(await tooltip.textContent(), 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей');
  assert.equal(await page.locator('#aeo .gaeo-term-label').evaluate(element => getComputedStyle(element).textDecorationStyle), 'dotted', 'The active term keeps its dotted underline');
  await page.keyboard.press('Escape');
  await page.locator('#historical [data-gaeo-term="AIStart"]').click();
  assert.equal(await tooltip.textContent(), 'В 1997–1998 годах учился у Владимира Николаевича Пильщикова, доцента ВМиК МГУ, создателя первой в СССР системы программирования для задач ИИ.');
  assert.equal(await page.locator('#historical .gaeo-term-label').evaluate(el => getComputedStyle(el).textDecorationStyle), 'dotted');
  await tooltip.evaluate(el => el.click());
  assert.equal(await tooltip.isVisible(), false, 'Manual history hint closes on click');
  await page.locator('#warehouse [data-gaeo-term="WMS"]').click();
  assert.equal(await tooltip.textContent(), 'WMS (Warehouse Management System) — система управления складом.');
  await tooltip.evaluate(el => el.click());
  assert.equal(await tooltip.isVisible(), false, 'WMS explanation closes on click');
  await page.locator('#warehouse [data-gaeo-term="Fulfillment"]').first().click();
  assert.equal(await tooltip.textContent(), 'Фулфилмент (Fulfillment) — комплекс логистических услуг в сфере интернет-торговли, который включает полный цикл работы с заказами: от приёмки товара на склад до отправки покупателю и обработки возвратов.');
  await tooltip.evaluate(el => el.click());
  assert.equal(await tooltip.isVisible(), false, 'Fulfillment explanation closes on click');

  // Mouse hover has no persistence once the pointer leaves the dotted text or the ?.
  await bmr.hover();
  assert.ok(await tooltip.isVisible(), 'Desktop: hovering over the dotted term opens help');
  await page.mouse.move(0, 0);
  assert.equal(await tooltip.isVisible(), false, 'Desktop: mouseout hides the tip immediately');
  const caseHelp = page.locator('#case-heading .gaeo-term-link-inline > .gaeo-term-link-help');
  await caseHelp.hover();
  assert.equal(await tooltip.textContent(), 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  await page.mouse.move(0, 0);
  assert.equal(await tooltip.isVisible(), false, 'Desktop: leaving the ? hides help');

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
  await page.waitForFunction(() => document.querySelector('#inline-link')?.parentElement?.querySelectorAll(':scope > .gaeo-term-link-help').length === 2);
  assert.equal(await page.locator('#inline-link').locator('xpath=..').locator(':scope > .gaeo-term-link-help[data-gaeo-term="GEO"]').count(), 1, 'Dynamic linked terms preserved');
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
  await page.keyboard.press('Escape');
  const fulfillmentTrigger = page.locator('#warehouse [data-gaeo-term="Fulfillment"]').first();
  await fulfillmentTrigger.click();
  assert.equal(await tooltip.textContent(), 'Фулфилмент (Fulfillment) — комплекс логистических услуг в сфере интернет-торговли, который включает полный цикл работы с заказами: от приёмки товара на склад до отправки покупателю и обработки возвратов.');
  const longTipBox = await tooltip.boundingBox();
  assert.ok(longTipBox && longTipBox.x >= 10 && longTipBox.x + longTipBox.width <= 310 && longTipBox.y >= 10 && longTipBox.y + longTipBox.height <= 630,
    'Long Russian fulfillment hint remains inside mobile viewport: ' + JSON.stringify(longTipBox));
  await tooltip.evaluate(el => el.click());
  assert.equal(await tooltip.isVisible(), false);
  assert.equal(await page.locator('button button, a button').count(), 0, 'No nested interactive controls');

  // With a mouse, the explanation stays visible beyond five seconds while hovered.
  await sov.hover();
  await page.waitForTimeout(5200);
  assert.ok(await tooltip.isVisible(), 'Desktop: no timeout during continued hover');
  await page.mouse.move(0, 0);
  assert.equal(await tooltip.isVisible(), false, 'Desktop: leave closes regardless of elapsed time');
  assert.deepEqual(errors, []);

  // On touch devices, tap opens help for five seconds, then closes automatically.
  const touch = await browser.newPage({
    viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true
  });
  await touch.setContent('<!doctype html><html lang="ru"><body><main><p>Измеряем BMR.</p><h3><a href="#case">MethodLab: BMR вырос с 19% до 52,4%</a></h3></main></body></html>');
  await touch.addStyleTag({ content: css });
  await touch.addScriptTag({ type: 'module', content: js });
  const touchTrigger = touch.locator('p [data-gaeo-term="BMR"]');
  const touchTip = touch.locator('#gaeo-term-tooltip');
  assert.equal(await touch.locator('h3 .gaeo-term-link-inline > .gaeo-term-link-help[data-gaeo-term="BMR"]').count(), 1);
  await touchTrigger.tap();
  const started = Date.now();
  await touch.waitForTimeout(3900);
  assert.ok(await touchTip.isVisible(), 'Touch: five-second hint remains visible');
  await touch.waitForTimeout(Math.max(0, 5400 - (Date.now() - started)));
  assert.equal(await touchTip.isVisible(), false, 'Touch: five-second timeout works');
  const elapsed = Date.now() - started;
  await touch.locator('h3 .gaeo-term-link-inline > .gaeo-term-link-help').tap();
  assert.ok(await touchTip.isVisible(), 'Touch: question icon opens definition');
  await touchTip.tap();
  assert.equal(await touchTip.isVisible(), false, 'Touch: tap on popup dismisses it');

  const english = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await english.setContent('<!doctype html><html lang="en"><head><title>Terms</title></head><body><p>GEO, AEO, SEO, BMR, SoV, WMS and Fulfillment</p></body></html>');
  await english.addStyleTag({ content: css });
  await english.addScriptTag({ type: 'module', content: js });
  for (const [term, definition] of Object.entries({
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    AEO: 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers',
    SEO: 'SEO (Search Engine Optimization) - website promotion in search engines',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer',
    WMS: 'WMS (Warehouse Management System) — a warehouse management system.',
    Fulfillment: 'Fulfillment — e-commerce logistics services covering the full order cycle, from receiving goods at a warehouse to shipping to buyers and handling returns.'
  })) {
    await english.locator(`[data-gaeo-term="${term}"]`).click();
    assert.equal(await english.locator('#gaeo-term-tooltip').textContent(), definition);
  }
  assert.equal(await english.locator('.gaeo-term-mark,.gaeo-term-reference').count(), 0);
  console.log(`Term hint browser QA passed: first-line help circles, SEO glossary, mouseout, keyboard, dynamic links, mobile touch timeout ${elapsed} ms.`);
} finally {
  await browser.close();
}
