import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { TERM_DEFINITIONS } from '../public/assets/term-hints.js';

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
    <style>body{margin:16px;font:16px/1.6 Arial,sans-serif}h1{font-size:48px;line-height:1.1}a.card{display:block}.scroll-table{overflow:auto;max-width:100%}#case-heading{max-width:260px;font-size:26px;line-height:1.2}#orphan-period{max-width:280px;font-size:26px;line-height:1.2}</style>
    <script type="application/ld+json">{"name":"GEO","metric":"BMR"}</script>
  </head><body>
    <header><nav><a id="nav" href="#destination">GEO</a></nav></header>
    <h1 id="heading">Сравнение <span>GEO</span> и SEO</h1>
    <p id="metrics">Измеряем BMR и SoV.</p>
    <p id="full-metrics">Измеряем Brand Mention Rate и Share of Voice.</p>
    <h2 id="large-full-metric" style="max-width:180px;font:40px/1.15 Arial,sans-serif">Brand Mention Rate</h2>
    <p id="full-expanded">Brand Mention Rate (BMR), Share of Voice (SoV).</p>
    <p id="aeo">AEO помогает подготовить контент.</p>
    <p id="seo">SEO помогает оптимизировать сайт.</p>
    <p id="seo-expanded">SEO (Search Engine Optimization) помогает бизнесу.</p>
    <p id="historical">Начал учиться: <b><button type="button" class="gaeo-term-trigger" data-gaeo-term="AIStart" aria-label="Как началось изучение ИИ" aria-describedby="gaeo-term-description-aistart" aria-controls="gaeo-term-tooltip" aria-expanded="false"><span class="gaeo-term-label">с 1997 года</span></button></b></p>
    <p id="warehouse">WMS и фулфилмент помогают складу. Для фулфилмента и фулфилментов.</p>
    <p id="warehouse-expanded">WMS (Warehouse Management System) и Фулфилмент (Fulfillment).</p>
    <p id="github">Разработка на GitHub и GitHub Pages.</p>
    <p id="github-explained">GitHub — это онлайн-платформа для хранения кода.</p>
    <p id="commerce">Опыт E-commerce, e-commerce и СТМ.</p>
    <p id="commerce-expanded">E-commerce - электронная коммерция; СТМ - собственная торговая марка.</p>
    <p id="new-terms">FRS shortlist SKU PRR SCR RAR RRR PPSR DMC MICE КМ/КМД СКУД VIN ЭПТС PSI Astro ТЗ СРО BIM</p>
    <p id="terms-expanded">PRR (Product Recommendation Rate), PSI (PageSpeed Insights), КМД (конструкции металлические деталировочные), Astro — инструмент для разработки контентных сайтов.</p>
    <p id="lower-distance">До объекта 20 км, на схеме используются КМ и КМД.</p>
    <p id="schema-marketing">Schema.org, перелинковку, дистрибуцией контента, интентами и промптов.</p>
    <p id="schema-context">Дистрибуция товаров и логистика по складам.</p>
    <p id="schema-source"><a href="https://schema.org/LegalService">Schema.org</a> - официальный словарь.</p>
    <p id="already"><b>GEO</b> (Generative Engine Optimization)</p>
    <p id="already-aeo"><strong>AEO</strong> (Answer Engine Optimization)</p>
    <p id="brand">GAEO.ru, GEOLOGY, GEO@example.ru, https://example.ru/GEO/</p>
    <main><p><a id="inline-link" href="#destination">Методика <em>GEO/AEO</em>, BMR, SoV, WMS и фулфилмент</a></p>
    <h3 id="case-heading"><a href="#case">MethodLab: BMR вырос с 19% до 52,4%</a></h3>
    <p id="orphan-period"><a href="#case">Как измерять BMR, Share of Voice и качество рекомендаций</a>.</p>
    <p id="punctuation-context"><a href="#case">Как измерять BMR</a>. Следом идет пояснение.</p>
    <div class="tariff-actions"><a class="button" id="tariff-cta" href="#destination">GEO promotion</a></div>
    <p id="github-link"><a href="#destination">Исходники на GitHub</a></p>
    <p id="expanded-link"><a href="#expanded">BMR (Brand Mention Rate)</a></p>
    <p id="expanded-seo-link"><a href="#expanded">SEO (Search Engine Optimization)</a></p>
    <h3 id="seo-linked"><a href="#seo-case">Разработка сайта с SEO/GEO-проверками</a></h3>
    <a class="card" href="#destination">GEO: ссылка на целую карточку</a>
    <p id="compound">GEO/AEO-эксперт</p>
    <div class="scroll-table"><table><tr><th>Показатель</th><th id="metric-cell">BMR</th></tr></table></div>
    <p id="faq-answer">GEO помогает бренду. BMR измеряет долю ответов.</p>
    <section class="tariff-plans">
      <details class="price tariff-plan" open data-plan="audit" id="audit-tariff">
        <summary class="price-summary" id="audit-summary"><div><h3>Полный аудит рекомендаций нейросетей</h3><p class="tariff-summary">GEO-аудит сайта и ответов нейросетей</p></div><span aria-hidden="true">×</span></summary>
        <div class="price-details"><p>До 100 промптов и до 11 нейросетей</p></div>
      </details>
      <details class="price tariff-plan" open data-plan="geo" id="geo-tariff">
        <summary class="price-summary"><div><h3>Продвижение в нейросетях</h3><p class="tariff-summary">ТЗ на сайт и GEO-контент</p></div></summary>
        <div class="price-details"><p>Работы</p></div>
      </details>
    </section>
    <details id="faq-accordion"><summary>GEO и BMR: что означают термины?</summary><p>Подробное объяснение</p></details>
    <p id="brandfound-referral">Выгрузка BrandFound содержит ответы.</p>
    <p id="brandfound-explained">BrandFound — сервис мониторинга ответов нейросетей.</p>
    <pre id="code">GEO BMR SoV</pre><p data-term-hints="off" id="off">GEO</p>
    <form><label for="input">BMR</label><input id="input" value="GEO"><button>GEO</button></form>
    <div id="dynamic"></div><button id="outside" type="button">Закрыть подсказку</button>
    <p id="ru-longest">ТН ВЭД/ОКПД2, ГИС ЖКХ, ГИС МТ, ВЭД, FBL и FBO/FBS, ВМК и ВМиК.</p>
    <p id="car-context">Плановое ТО автомобиля, МП для товаров маркетплейса, склад Москвы и МО.</p>
    <p id="spa-hotel">SPA, сауна и массаж в отеле.</p>
    <p id="spa-tech">SPA для серверного рендеринга.</p>
    <p id="sat-travel">South American Tours (SAT) организует туры.</p>
    <p id="sat-tech">FAT/SAT при приемке оборудования.</p>
    <p id="new-link"><a href="#destination">ТН ВЭД и FBL</a></p>
    <p id="full-expand-fbl">FBL (Fulfillment by L'Étoile)</p>
    <p id="glossary-added">Core Web Vitals, JavaScript, canonical, индексация сайта, индексации страниц, индексацию URL, индексацией поискового робота, фид, фида, фидом, фиды и фидах.</p>
    <p id="glossary-finance">Индексация пенсий и зарплат.</p>
    <p id="glossary-linked"><a href="#destination">Core Web Vitals и canonical</a></p>
    <p id="case-inflections">Кейс, кейса, кейсу, кейсом, кейсе, кейсы, кейсов, кейсам, кейсами, кейсах.</p>
    <p id="case-defined">Кейс — подробное описание реальной ситуации, проблемы или задачи.</p>
    <p id="case-link"><a href="#destination">Кейсы клиентов и подробные кейсы</a></p>
    <p id="content-inflections">Контент, контента, контенту, контентом, контенте, контенты, контентов, контентам, контентами, контентах.</p>
    <p id="content-defined">Контент — это любое информационное наполнение сайта: то, что пользователь видит, читает, слушает или с чем взаимодействует.</p>
    <p id="content-linked"><a href="#destination">Контент и кейсы</a></p>
    <p id="destination">Цель ссылки</p></main>
    <footer id="footer-terms"><p>ИНН, ФНС, BMR, GEO, КИЗ и FBL не подчеркиваются в подвале</p></footer>
  </body></html>`);
  const originalLink = await page.locator('#inline-link').evaluate(element => ({
    html: element.innerHTML, decoration: getComputedStyle(element).textDecorationStyle,
    href: element.getAttribute('href')
  }));
  await page.addStyleTag({ content: css });
  await page.addScriptTag({ type: 'module', content: js });
  await page.waitForFunction(() => document.documentElement.dataset.gaeoTermHints === 'ready');
  const tooltip = page.locator('#gaeo-term-tooltip');
  assert.deepEqual(await page.locator('#case-inflections [data-gaeo-term]').evaluateAll(
    els => els.map(el => el.dataset.gaeoTerm)), Array(10).fill('CaseStudy'));
  assert.equal(await page.locator('#case-defined [data-gaeo-term]').count(), 0);
  assert.deepEqual(await page.locator('#content-inflections [data-gaeo-term]').evaluateAll(
    els => els.map(el => el.dataset.gaeoTerm)), Array(10).fill('Content'));
  assert.equal(await page.locator('#content-defined [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#content-linked > .gaeo-term-link-inline > a').getAttribute('href'), '#destination');
  assert.equal(await page.locator('#content-linked .gaeo-term-link-help').count(), 1);
  assert.equal(await page.locator('#content-linked .gaeo-term-link-help').getAttribute('data-gaeo-term'), 'Content|CaseStudy');
  assert.equal(await page.locator('#case-link > .gaeo-term-link-inline > a').getAttribute('href'), '#destination');
  assert.equal(await page.locator('#case-link .gaeo-term-link-help[data-gaeo-term="CaseStudy"]').count(), 1);

  assert.deepEqual(await page.locator('#glossary-added [data-gaeo-term]').evaluateAll(
    elements => elements.map(element => element.dataset.gaeoTerm)),
    ['Core Web Vitals', 'JavaScript', 'canonical', 'Indexing', 'Indexing', 'Indexing', 'URL', 'Indexing', 'Feed', 'Feed', 'Feed', 'Feed', 'Feed']);
  assert.equal(await page.locator('#glossary-finance [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#glossary-linked > .gaeo-term-link-inline > a').getAttribute('href'), '#destination');
  const glossaryLinkHelp = page.locator('#glossary-linked .gaeo-term-link-help');
  assert.equal(await glossaryLinkHelp.count(), 1);
  assert.equal(await glossaryLinkHelp.getAttribute('data-gaeo-term'), 'Core Web Vitals|canonical');
  assert.equal(await page.locator('footer [data-gaeo-term]').count(), 0);

  assert.deepEqual(await page.locator('#ru-longest [data-gaeo-term]').evaluateAll(els => els.map(e => e.dataset.gaeoTerm)),
    ['ТН ВЭД', 'ОКПД2', 'ГИС ЖКХ', 'ГИС МТ', 'ВЭД', 'FBL', 'FBO', 'FBS', 'ВМК', 'ВМК']);
  assert.deepEqual(await page.locator('#car-context [data-gaeo-term]').evaluateAll(els => els.map(e => e.dataset.gaeoTerm)),
    ['ТО', 'МП', 'МО']);
  assert.deepEqual(await page.locator('#schema-marketing [data-gaeo-term]').evaluateAll(
    elements => elements.map(element => element.dataset.gaeoTerm)
  ), ['SchemaOrg', 'Interlinking', 'ContentDistribution', 'Content', 'Intent', 'Prompt']);
  assert.equal(await page.locator('#schema-context [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#schema-source a').getAttribute('href'), 'https://schema.org/LegalService');
  assert.equal(await page.locator('#schema-marketing [data-gaeo-term="SchemaOrg"] .gaeo-term-label').evaluate(
    element => getComputedStyle(element).textDecorationStyle
  ), 'dotted');
  assert.equal(await page.locator('#spa-hotel [data-gaeo-term], #sat-travel [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#spa-tech [data-gaeo-term="SPA"]').count(), 1);
  assert.equal(await page.locator('#sat-tech [data-gaeo-term="SAT"]').count(), 1);
  assert.equal(await page.locator('#full-expand-fbl [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#footer-terms [data-gaeo-term], #footer-terms .gaeo-term-link-help').count(), 0);
  assert.equal(await page.locator('#ru-longest [data-gaeo-term="ТН ВЭД"]').getAttribute('aria-describedby'), 'gaeo-term-description-тн-вэд');
  assert.ok(await page.locator('#ru-longest [data-gaeo-term="ТН ВЭД"]').evaluate(el => !!document.getElementById(el.getAttribute('aria-describedby'))));
  assert.equal(await page.locator('#new-link > .gaeo-term-link-inline > a').getAttribute('href'), '#destination');
  assert.equal(await page.locator('#new-link .gaeo-term-link-help').count(), 1);

  assert.equal(await page.locator('#heading [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#heading [data-gaeo-term="SEO"]').count(), 1);
  assert.equal(await page.locator('#seo [data-gaeo-term="SEO"]').count(), 1);
  assert.equal(await page.locator('#seo-expanded [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#expanded-seo-link .gaeo-term-link-help').count(), 0);
  assert.equal(await page.locator('#seo-linked .gaeo-term-link-inline > .gaeo-term-link-help[data-gaeo-term="SEO|GEO"]').count(), 1);
  assert.equal(await page.locator('#metric-cell [data-gaeo-term="BMR"]').count(), 1);
  assert.equal(await page.locator('#full-metrics [data-gaeo-term="BMR"]').count(), 1);
  const phraseBounds = await page.locator('#large-full-metric .gaeo-term-label').evaluate(label => {
    const region = label.closest('h2').getBoundingClientRect();
    const fragments = [...label.getClientRects()].filter(rect => rect.width > 0);
    return { width: fragments.length, within: fragments.every(rect => rect.left >= region.left - 1 && rect.right <= region.right + 1) };
  });
  assert.ok(phraseBounds.width >= 2 && phraseBounds.within, 'Full metric name wraps inside a narrow heading');
  assert.equal(await page.locator('#full-metrics [data-gaeo-term="SoV"]').count(), 1);
  assert.equal(await page.locator('#full-expanded [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('#orphan-period .gaeo-term-link-help').count(), 1);
  assert.ok(!(await page.locator('#orphan-period').textContent()).trim().endsWith('.'), 'No orphaned final period after the help icon');
  assert.ok((await page.locator('#punctuation-context').textContent()).includes('. Следом идет пояснение.'), 'Sentence punctuation remains when prose continues');
  assert.equal(await page.locator('#compound [data-gaeo-term="GEO"]').count(), 1);
  assert.equal(await page.locator('#compound [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#aeo [data-gaeo-term="AEO"]').count(), 1);
  assert.equal(await page.locator('#historical [data-gaeo-term="AIStart"]').count(), 1);
  assert.equal(await page.locator('#warehouse [data-gaeo-term="WMS"]').count(), 1);
  assert.equal(await page.locator('#warehouse [data-gaeo-term="Fulfillment"]').count(), 3);
  assert.equal(await page.locator('#warehouse-expanded [data-gaeo-term]').count(), 0, 'Adjacent full definitions require no popup');
  assert.equal(await page.locator('#github [data-gaeo-term="GitHub"]').count(), 2, 'GitHub and GitHub Pages are explained');
  assert.equal(await page.locator('#github-explained [data-gaeo-term]').count(), 0, 'No hint where GitHub is already defined');
  assert.equal(await page.locator('#github-link .gaeo-term-link-help[data-gaeo-term="GitHub"]').count(), 1, 'GitHub within a link gets independent help');
  assert.equal(await page.locator('#github-link a [data-gaeo-term]').count(), 0, 'GitHub link has no dotted underline');
  assert.equal(await page.locator('#commerce [data-gaeo-term="Ecommerce"]').count(), 2);
  assert.equal(await page.locator('#commerce [data-gaeo-term="STM"]').count(), 1);
  assert.equal(await page.locator('#commerce-expanded [data-gaeo-term]').count(), 0, 'Inline E-commerce and СТМ explanations require no hints');
  assert.deepEqual(await page.locator('#new-terms [data-gaeo-term]').evaluateAll(els => els.map(e => e.dataset.gaeoTerm)),
    ["FRS","Shortlist","SKU","PRR","SCR","RAR","RRR","PPSR","DMC","MICE","KM","KMD","SKUD","VIN","EPTS","PSI","Astro","TZ","SRO","BIM"]);
  assert.equal(await page.locator('#terms-expanded [data-gaeo-term]').count(), 0, 'No duplicate glossary hints for defined terms');
  assert.equal(await page.locator('#lower-distance [data-gaeo-term="KM"]').count(), 1, 'Uppercase КМ is not lowercase км');
  assert.equal(await page.locator('#lower-distance [data-gaeo-term="KMD"]').count(), 1);
  assert.equal(await page.locator('#already [data-gaeo-term], #already-aeo [data-gaeo-term], #code [data-gaeo-term], #brand [data-gaeo-term], #off [data-gaeo-term], header [data-gaeo-term], form [data-gaeo-term], a [data-gaeo-term]').count(), 0);
  assert.equal(await page.locator('.gaeo-term-mark,.gaeo-term-reference,.gaeo-term-link-label,[data-gaeo-term-link-label]').count(), 0, 'No obsolete controls');
  assert.equal(await page.locator('#case-heading .gaeo-term-link-inline > a + button.gaeo-term-link-help[data-gaeo-term="BMR"]').count(), 1, 'BMR help icon follows link in wrapper');
  assert.equal(await page.locator('#expanded-link .gaeo-term-link-help').count(), 0, 'Expanded BMR needs no icon');
  assert.equal(await page.locator('#tariff-cta + .gaeo-term-link-help, .tariff-actions .gaeo-term-link-help').count(), 0, 'Pricing and CTA links stay free of question icons');
  assert.equal(await page.locator('#audit-tariff .tariff-summary [data-gaeo-term="GEO"]').count(), 1,
    'GEO in expandable tariff description has a dotted glossary button');
  assert.equal(await page.locator('#geo-tariff .tariff-summary [data-gaeo-term="TZ"]').count(), 1,
    'ТЗ in another tariff description gets an explanation');
  assert.equal(await page.locator('#faq-accordion summary [data-gaeo-term]').count(), 0,
    'Unrelated interactive FAQ summaries stay untouched');
  const auditDotted = await page.locator('#audit-tariff .tariff-summary .gaeo-term-label').evaluate(
    el => getComputedStyle(el).textDecorationStyle);
  assert.equal(auditDotted, 'dotted', 'Tariff summary keeps the site-wide dotted underline');
  assert.equal(await page.locator('nav .gaeo-term-link-help, a .gaeo-term-link-help').count(), 0, 'No nested or navigational help controls');
  assert.equal(await page.locator('#inline-link').locator('xpath=..').locator(':scope > .gaeo-term-link-help').count(), 1, 'Inline content link gets one help button');
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
    const anchor = group.querySelector('a');
    const textRange = document.createRange();
    textRange.selectNodeContents(anchor);
    const lines = [...textRange.getClientRects()].filter(rect => rect.width > 0);
    const button = group.querySelector('.gaeo-term-link-help');
    const icon = button.querySelector('.gaeo-term-link-icon').getBoundingClientRect();
    const hit = button.getBoundingClientRect();
    return { count: lines.length, firstTop: lines[0].top, firstBottom: lines[0].bottom,
      iconTop: icon.top, iconSize: [icon.width, icon.height], hitSize: [hit.width, hit.height] };
  });
  assert.ok(geometry.count >= 2, 'Long linked heading wraps onto multiple lines');
  assert.ok(geometry.iconTop >= geometry.firstTop - 4 &&
    geometry.iconTop < (geometry.firstTop + geometry.firstBottom) / 2,
    'Question mark aligns with the top of the first line: ' + JSON.stringify(geometry));
  assert.deepEqual(geometry.iconSize, [14, 14]);
  assert.deepEqual(geometry.hitSize, [18, 18]);
  const metricHelp = page.locator('#orphan-period .gaeo-term-link-help');
  assert.equal(await metricHelp.getAttribute('aria-describedby'), 'gaeo-term-description-bmr gaeo-term-description-sov');
  await metricHelp.click({ position: { x: 1, y: 9 } });
  assert.deepEqual(await tooltip.locator('.gaeo-term-tooltip-entry').allTextContents(), [TERM_DEFINITIONS.ru.BMR, TERM_DEFINITIONS.ru.SoV]);
  await page.keyboard.press('Escape');

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
  assert.equal(await page.locator('#aeo [data-gaeo-term="AEO"] .gaeo-term-label').evaluate(element => getComputedStyle(element).textDecorationStyle), 'dotted', 'The active term keeps its dotted underline');
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

  await page.locator('#commerce [data-gaeo-term="Ecommerce"]').first().click();
  assert.equal(await tooltip.textContent(), 'E-commerce - электронная коммерция: интернет-магазины и продажа товаров с маркетплейсов');
  await tooltip.evaluate(el => el.click());
  await page.locator('#commerce [data-gaeo-term="STM"]').click();
  assert.equal(await tooltip.textContent(), 'СТМ - собственная торговая марка. Товары, производимые или импортируемые под брендом правообладателя. Обычно зарегистрирована в Роспатенте.');
  await tooltip.evaluate(el => el.click());

  await page.locator('#github [data-gaeo-term="GitHub"]').first().click();
  assert.equal(await tooltip.textContent(), 'GitHub — это онлайн-платформа для хранения кода, управления его версиями и совместной работы над проектами.');
  await tooltip.evaluate(element => element.click());
  assert.equal(await tooltip.isVisible(), false);
  await page.locator('#github-link .gaeo-term-link-help[data-gaeo-term="GitHub"]').click();
  assert.equal(await tooltip.textContent(), 'GitHub — это онлайн-платформа для хранения кода, управления его версиями и совместной работы над проектами.');
  await tooltip.evaluate(element => element.click());

  for (const term of ["FRS","Shortlist","SKU","PRR","SCR","RAR","RRR","PPSR","DMC","MICE","KM","KMD","SKUD","VIN","EPTS","PSI","Astro","TZ","SRO","BIM"]) {
    const trigger = page.locator('#new-terms [data-gaeo-term="' + term + '"]').first();
    await trigger.click();
    assert.ok(await tooltip.isVisible(), 'Tooltip visible for ' + term);
    assert.ok((await tooltip.textContent()).length > 30, 'Full glossary definition for ' + term);
    await page.keyboard.press('Escape');
  }
  // The term button inside a native <summary> opens help without toggling
  // the native details. Other parts of that same summary keep their toggle.
  const auditDetails = page.locator('#audit-tariff');
  const auditTerm = page.locator('#audit-tariff .tariff-summary [data-gaeo-term="GEO"]');
  assert.ok(await auditDetails.evaluate(el => el.open), 'Audit tariff begins expanded');
  await auditTerm.click();
  assert.ok(await tooltip.isVisible(), 'GEO tooltip opens from the tariff description');
  assert.equal(await tooltip.textContent(),
    'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей');
  assert.ok(await auditDetails.evaluate(el => el.open), 'Clicking dotted GEO does not collapse the tariff');
  await page.keyboard.press('Escape');
  await page.locator('#audit-summary h3').click();
  assert.equal(await auditDetails.evaluate(el => el.open), false, 'Clicking the rest of the summary closes the tariff');
  await page.locator('#audit-summary').focus();
  await page.keyboard.press('Enter');
  assert.ok(await auditDetails.evaluate(el => el.open), 'Summary stays accessible with keyboard Enter');
  await auditTerm.focus();
  await page.keyboard.press('Enter');
  assert.ok(await tooltip.isVisible(), 'Keyboard Enter opens tariff-term help');
  assert.ok(await auditDetails.evaluate(el => el.open), 'Keyboard activation of the term does not collapse the tariff');
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    document.querySelector('#audit-tariff .tariff-summary').textContent = 'GEO-аудит и ТЗ на сайт';
  });
  await page.waitForFunction(() =>
    document.querySelectorAll('#audit-tariff .tariff-summary [data-gaeo-term]').length === 2);
  assert.deepEqual(await page.locator('#audit-tariff .tariff-summary [data-gaeo-term]')
    .evaluateAll(items => items.map(el => el.dataset.gaeoTerm)), ['GEO', 'TZ'],
    'Dynamically replaced tariff text is decorated once');
  assert.equal(await page.locator('#audit-tariff .tariff-summary button button').count(), 0);

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
  await page.evaluate(() => { document.querySelector('#inline-link').innerHTML = 'Методика <em>GEO/AEO</em>'; });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.equal(await page.locator('#inline-link').innerHTML(), 'Методика <em>GEO/AEO</em>', 'Updated link markup stays unmodified');
  await page.waitForFunction(() => document.querySelector('#inline-link + .gaeo-term-link-help')?.dataset.gaeoTerm === 'GEO|AEO');
  await page.locator('#inline-link + .gaeo-term-link-help').click();
  assert.ok(await tooltip.isVisible());
  await page.evaluate(() => { document.querySelector('#inline-link em').firstChild.data = 'BMR'; });
  await page.waitForFunction(() => document.querySelector('#inline-link + .gaeo-term-link-help')?.dataset.gaeoTerm === 'BMR');
  assert.equal(await tooltip.isVisible(), false, 'Updating a linked term closes the stale popup');
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

  // Touch reading time is five seconds per definition.
  const touch = await browser.newPage({
    viewport: { width: 320, height: 640 }, hasTouch: true, isMobile: true
  });
  await touch.clock.install();
  await touch.setContent(`<!doctype html><html lang="ru"><head><meta name="viewport" content="width=device-width"></head><body><main>
    <p>Измеряем BMR.</p><h3><a href="#case">MethodLab: BMR вырос с 19% до 52,4%</a></h3>
    <h3 id="two-terms"><a href="#case">Как измерять BMR, Share of Voice и качество рекомендаций</a></h3>
    <h3 id="five-terms"><a href="#case">PRR, SCR, RAR, RRR, PPSR: оцениваем ответы</a></h3>
    </main></body></html>`);
  await touch.addStyleTag({ content: css });
  await touch.addScriptTag({ type: 'module', content: js });
  const touchTip = touch.locator('#gaeo-term-tooltip');
  assert.equal(await touch.locator('h3 .gaeo-term-link-inline > .gaeo-term-link-help[data-gaeo-term="BMR"]').count(), 1);
  const timers = [['p [data-gaeo-term="BMR"]', ['BMR'], 5000],
    ['#two-terms .gaeo-term-link-help', ['BMR', 'SoV'], 10000],
    ['#five-terms .gaeo-term-link-help', ['PRR', 'SCR', 'RAR', 'RRR', 'PPSR'], 25000]];
  for (const [selector, terms, duration] of timers) {
    const trigger = touch.locator(selector);
    assert.equal(await trigger.count(), 1);
    await trigger.tap();
    assert.deepEqual(await touchTip.locator('.gaeo-term-tooltip-entry').allTextContents(), terms.map(term => TERM_DEFINITIONS.ru[term]));
    await touch.clock.fastForward(duration - 600);
    assert.ok(await touchTip.isVisible(), `Touch: ${terms.length} definitions stay visible before ${duration} ms`);
    await touch.clock.fastForward(1000);
    assert.equal(await touchTip.isVisible(), false, `Touch: ${terms.length} definitions close after ${duration} ms`);
  }
  await touch.locator('#five-terms .gaeo-term-link-help').tap();
  assert.ok(await touchTip.isVisible(), 'Touch: question icon opens definition');
  await touchTip.tap();
  assert.equal(await touchTip.isVisible(), false, 'Touch: tap on popup dismisses it');

  const english = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await english.setContent('<!doctype html><html lang="en"><head><title>Terms</title></head><body><p>GEO, AEO, SEO, BMR, SoV, WMS, Fulfillment, GitHub, FRS, shortlist, SKU, PRR, SCR, RAR, RRR, PPSR, DMC, MICE, KM, KMD, SKUD, VIN, EPTS, PSI, Astro, TZ, SRO and BIM</p></body></html>');
  await english.addStyleTag({ content: css });
  await english.addScriptTag({ type: 'module', content: js });
  for (const [term, definition] of Object.entries({
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    AEO: 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers',
    SEO: 'SEO (Search Engine Optimization) - website promotion in search engines',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer',
    WMS: 'WMS (Warehouse Management System) — a warehouse management system.',
    Fulfillment: 'Fulfillment — e-commerce logistics services covering the full order cycle, from receiving goods at a warehouse to shipping to buyers and handling returns.',
    GitHub: 'GitHub is an online platform for hosting code, managing its versions and collaborating on projects.',
    FRS: 'FRS (First Recommendation Share) - the share of AI answers in which a participant is the first recognized full person name. It measures mention order, not necessarily a recommendation.',
    Shortlist: 'Shortlist (short list) - a small selection of providers, candidates or options retained for further consideration.',
    SKU: 'SKU (Stock Keeping Unit) - an inventory unit identifying a specific product variant with its characteristics and configuration.',
    PRR: 'PRR (Product Recommendation Rate) - the share of relevant product-selection AI answers recommending the target product or product line.',
    SCR: 'SCR (Seller Criterion Rate) - the share of AI answers spontaneously adding a seller-selection criterion when the user did not specify one.',
    RAR: 'RAR (Retailer Association Rate) - the share of answers correctly linking a real benefit to the target retailer, among answers where the relevant seller criterion appeared.',
    RRR: 'RRR (Retailer Recommendation Rate) - the share of eligible AI answers explicitly suggesting the target retailer as a purchase option.',
    PPSR: 'PPSR (Price Premium Survival Rate) - the share of paired AI answers retaining the retailer recommendation despite a cheaper offer for an identical SKU, measured at different price gaps.',
    DMC: 'DMC (Destination Management Company) - a local travel operator coordinating destination services such as transfers, accommodation, excursions and trip support.',
    MICE: 'MICE (Meetings, Incentives, Conferences, Exhibitions) - business tourism involving meetings, incentive trips, conferences and exhibitions.',
    KM: 'KM (metal structures, steel structure design drawings) - the Russian working-documentation stage defining metal structure design solutions and requirements.',
    KMD: 'KMD (metal structure detailing drawings) - Russian fabrication and erection detail drawings developed from KM design documentation.',
    SKUD: 'SKUD (access control and management system) - hardware and software used to authorize, monitor and record access by people or vehicles to a site.',
    VIN: 'VIN (Vehicle Identification Number) - a manufacturer-assigned identifier used to distinguish an individual vehicle.',
    EPTS: 'EPTS (electronic vehicle passport) - Russia\'s digital vehicle document containing identification and technical information.',
    PSI: 'PSI (PageSpeed Insights) - Google\'s service for analyzing a webpage\'s performance and loading speed.',
    Astro: 'Astro is a tool for building content-focused websites, including blogs, landing pages, portfolios, catalogs, online stores and documentation.',
    TZ: 'TZ (technical specification) - a document defining work requirements, expected deliverables and acceptance criteria.',
    SRO: 'SRO (self-regulatory organization) - an association of industry professionals that sets standards and oversees member compliance. Membership may be required for certain construction and design activities in Russia.',
    BIM: 'BIM (Building Information Modeling) - creating and using a digital model of a building or infrastructure asset across design, construction and operation.'
  })) {
    await english.locator(`[data-gaeo-term="${term}"]`).click();
    assert.equal(await english.locator('#gaeo-term-tooltip').textContent(), definition);
  }
  assert.equal(await english.locator('.gaeo-term-mark,.gaeo-term-reference').count(), 0);
  console.log('Term hint browser QA passed: first-line help circles, grouped definitions, dynamic links and 5/10/25-second touch timers.');
} finally {
  await browser.close();
}
