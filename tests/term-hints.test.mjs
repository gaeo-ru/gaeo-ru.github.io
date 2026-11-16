import test from 'node:test';
import assert from 'node:assert/strict';
import { findTermMatches, TERM_DEFINITIONS, TERM_HINT_DURATION } from '../public/assets/term-hints.js';
import { injectTermHintAssets, linkBrandFoundMentions } from '../src/lib/term-hint-assets.mjs';

test('sitemap explains XML URL discovery in Russian and English', () => {
  assert.deepEqual(findTermMatches('Сформировали sitemap.', {language:'ru'}).map(m => m.term), ['sitemap']);
  assert.deepEqual(findTermMatches('The Sitemap lists important pages.', {language:'en'}).map(m => m.term), ['sitemap']);
  assert.deepEqual(findTermMatches('mysitemap sitemap2026', {language:'ru'}), []);
  assert.match(TERM_DEFINITIONS.ru.sitemap,/XML-файл/);
  assert.match(TERM_DEFINITIONS.en.sitemap,/website URLs/);
});

test('standalone terms in normal copy, headings and metric labels', () => {
  const source = 'GEO-продвижение: BMR 22%, SoV 15%. SEO/AEO и GAEO.ru. SOV';
  assert.deepEqual(findTermMatches(source).map(match => match.term), ['GEO', 'BMR', 'SoV', 'SEO', 'AEO', 'SoV']);
  assert.deepEqual(findTermMatches('НЕGEO GEOLOGY _GEO GEO2 myBMR SOVEREIGN GAEO _AEO AEO2'), []);
  assert.deepEqual(findTermMatches('GEO/AEO-эксперт, BMR/SoV').map(match => match.term), ['GEO', 'AEO', 'BMR', 'SoV']);
  assert.deepEqual(findTermMatches('SEO/GEO-проверки, SEO для бизнеса').map(hit => hit.term), ['SEO','GEO','SEO']);
  assert.deepEqual(findTermMatches('SEOLOG mySEO SEO2'), []);
  assert.deepEqual(findTermMatches('Brand Mention Rate и Share of Voice').map(hit => hit.term), ['BMR', 'SoV']);
  assert.deepEqual(findTermMatches('brand mention rate; share of voice').map(hit => hit.term), ['BMR', 'SoV']);
  assert.deepEqual(findTermMatches('Brand Mention Rates, Share of Voices, myBrand Mention Rate'), []);
  assert.deepEqual(findTermMatches('WMS/TMS, фулфилмент, Фулфилмента, фулфилментом, фулфилменты, фулфилментов и Fulfillment').map(match => match.term),
    ['WMS', 'TMS', 'Fulfillment', 'Fulfillment', 'Fulfillment', 'Fulfillment', 'Fulfillment', 'Fulfillment']);
  assert.deepEqual(findTermMatches('профулфилмент, фулфилментный, WMS123, otherWMS, Фулфилмент24'), []);
});

test('percentage points have the agreed Russian glossary explanation', () => {
  const hits=findTermMatches('Рост на 5 п.п. и затем на 10 п. п.').filter(hit=>hit.term==='PP');
  assert.deepEqual(hits.map(hit=>hit.text),['п.п.','п. п.']);
  assert.deepEqual(findTermMatches('5 п.п.', { language:'en' }),[]);
  assert.equal(findTermMatches('п.п. - процентные пункты').filter(hit=>hit.term==='PP').length,0);
  assert.match(TERM_DEFINITIONS.ru.PP,/50% \+ 5 п\.п\. = 55%/);
  assert.match(TERM_DEFINITIONS.ru.PP,/52,5%/);
});

test('GEO glossary hints are consistent in hyphenated publication headings', () => {
  const latinHeadings = [
    'Безопасное и агрессивное GEO-продвижение в нейросетях: вождение и работа в кепке',
    'Стратегия GEO-продвижения недвижимости в нейросетях на базе кейса премиального ЖК в Москве под NDA',
    'Персональное GEO-продвижение бизнеса: ТОП-10 специалистов России, 2026',
    'Каких GEO-специалистов России чаще называют нейросети: BMR по 110 ответам',
    'GEO/AEO-продвижение бизнеса в нейросетях: ТОП-10 подрядчиков России, 2026',
    'GEO-аудит и GEO-эксперт в сфере недвижимости'
  ];
  for (const heading of latinHeadings) {
    const geo = findTermMatches(heading).filter(hit => hit.term === 'GEO');
    assert.ok(geo.length > 0, 'Missing GEO explanation in heading: ' + heading);
    assert.ok(geo.every(hit => hit.text === 'GEO'), 'Only the acronym should be dotted: ' + heading);
  }
  for (const heading of [
    'ГЕО-продвижение в нейросетях', 'гео-продвижения бренда',
    'Геопродвижение бизнеса', 'геопродвижения в нейросетях',
    'Геоспециалисты России', 'гео-специалистов по продвижению'
  ]) assert.equal(findTermMatches(heading).filter(hit => hit.term === 'GEO').length, 1, heading);

  for (const explanation of [
    'GEO — продвижение в рекомендациях нейросетей',
    'GEO: продвижение в нейросетях',
    'GEO - продвижение в нейросетях',
    'ГЕО — продвижение в рекомендациях нейросетей'
  ]) assert.deepEqual(findTermMatches(explanation), [], 'Existing definition should not need a hint: ' + explanation);
  for (const geography of ['география', 'геоинформатика', 'геолокация', 'гео-данные', 'геология']) {
    assert.deepEqual(findTermMatches(geography), [], 'Do not treat geography as GEO: ' + geography);
  }
  assert.deepEqual(findTermMatches('геопродвижение геоспециалисты', { language: 'en' }), []);
});

test('E-commerce and СТМ have global glossary matches with proper boundaries', () => {
  assert.deepEqual(findTermMatches('E-commerce, e-Commerce, ecommerce, E-COMMERCE, СТМ и стм').map(hit => hit.term),
    ['Ecommerce', 'Ecommerce', 'Ecommerce', 'Ecommerce', 'STM', 'STM']);
  assert.deepEqual(findTermMatches('myEcommerce, ecommerce24, антиСТМ и СТМ2'), []);
  assert.equal(TERM_DEFINITIONS.ru.Ecommerce, 'E-commerce - электронная коммерция: интернет-магазины и продажа товаров с маркетплейсов');
  assert.equal(TERM_DEFINITIONS.ru.STM, 'СТМ - собственная торговая марка. Товары, производимые или импортируемые под брендом правообладателя. Обычно зарегистрирована в Роспатенте.');
});

test('GitHub Pages takes priority over GitHub, including inside links', () => {
  assert.deepEqual(findTermMatches('GitHub, github, Github, GITHUB и GitHub Pages').map(hit => hit.term),
    ['GitHub', 'GitHub', 'GitHub', 'GitHub', 'GitHubPages']);
  assert.deepEqual(findTermMatches('GitHub Pages и GitHub, github pages, GITHUB PAGES').map(hit => hit.term),
    ['GitHubPages', 'GitHub', 'GitHubPages', 'GitHubPages']);
  assert.deepEqual(findTermMatches('GitHub Pages и GitHub', { language: 'en' }).map(hit => hit.term),
    ['GitHubPages', 'GitHub']);
  assert.deepEqual(findTermMatches('GitHub Pages').map(hit => hit.text), ['GitHub Pages'],
    'The entire phrase receives one explanation; GitHub is not nested within it');
  assert.deepEqual(findTermMatches('myGitHub GitHub123 GitHubness GitHub_ myGitHub Pages'), []);
  assert.equal(TERM_DEFINITIONS.ru.GitHubPages,
    'GitHub Pages — сервис GitHub для размещения статических сайтов. Он публикует файлы сайта из репозитория без отдельного веб-сервера.');
  assert.equal(TERM_DEFINITIONS.en.GitHubPages,
    'GitHub Pages is a GitHub service for hosting static websites directly from a repository.');
  assert.equal(TERM_DEFINITIONS.ru.GitHub,
    'GitHub — это онлайн-платформа для хранения кода, управления его версиями и совместной работы над проектами.');
  assert.equal(TERM_DEFINITIONS.en.GitHub,
    'GitHub is an online platform for hosting code, managing its versions and collaborating on projects.');
});

test('Schema.org has a glossary hint in prose while URLs and explicit definitions remain untouched', () => {
  assert.deepEqual(findTermMatches('В разметке Schema.org описаны товары и услуги.').map(hit => hit.term), ['SchemaOrg']);
  assert.deepEqual(findTermMatches('schema.org, SCHEMA.ORG, Schema.org.').map(hit => hit.term), ['SchemaOrg', 'SchemaOrg', 'SchemaOrg']);
  for (const path of ['https://schema.org/LegalService', 'www.schema.org', 'schema.org/Person', 'Schema.org@example.ru']) {
    assert.deepEqual(findTermMatches(path), [], path);
  }
  assert.deepEqual(findTermMatches('Schema.org - общий словарь типов и свойств для структурированных данных'), []);
  assert.ok(TERM_DEFINITIONS.ru.SchemaOrg.includes('структурированной разметки'));
  assert.match(TERM_DEFINITIONS.en.SchemaOrg, /shared vocabulary/);
});

test('Russian content-marketing terminology is matched in all cases without changing unrelated words', () => {
  const samples = {
    Interlinking: 'перелинковка перелинковки перелинковке перелинковку перелинковкой перелинковкою перелинковок перелинковкам перелинковками перелинковках',
    ContentDistribution: 'дистрибуция дистрибуции дистрибуцию дистрибуцией дистрибуциею дистрибуций дистрибуциям дистрибуциями дистрибуциях',
    Intent: 'интент интента интенту интентом интенте интенты интентов интентам интентами интентах',
    Prompt: 'промпт промпта промпту промптом промпте промпты промптов промптам промптами промптах'
  };
  for (const [term, phrase] of Object.entries(samples)) {
    assert.deepEqual(findTermMatches(phrase).map(hit => hit.term), Array(phrase.split(' ').length).fill(term), term);
    assert.ok(TERM_DEFINITIONS.ru[term], 'Missing definition for ' + term);
  }
  assert.deepEqual(findTermMatches('Перелинковка, интент и промпт.').map(hit => hit.term), ['Interlinking', 'Intent', 'Prompt']);
  assert.deepEqual(findTermMatches('План дистрибуции контента на площадках').map(hit => hit.term), ['ContentDistribution','Content']);
  assert.deepEqual(findTermMatches('Дистрибуция товаров и логистика по складам'), []);
  assert.deepEqual(findTermMatches('промптинг, суперинтент, перепромптовать, перелинковочный'), []);
  assert.deepEqual(findTermMatches('перелинковка интент промпт', { language: 'en' }), []);
});

test('Added 20 terms: e-commerce, research, travel, manufacturing, vehicles, site development', () => {
  const text = 'FRS shortlist SKU PRR SCR RAR RRR PPSR DMC MICE КМ КМД СКУД VIN ЭПТС PSI Astro ТЗ СРО BIM';
  assert.deepEqual(findTermMatches(text).map(hit => hit.term), ["FRS","Shortlist","SKU","PRR","SCR","RAR","RRR","PPSR","DMC","MICE","KM","KMD","SKUD","VIN","EPTS","PSI","Astro","TZ","SRO","BIM"]);
  assert.deepEqual(findTermMatches('frs Shortlist SHORTLIST shortlists astro ASTRO').map(hit => hit.term),
    ['FRS', 'Shortlist', 'Shortlist', 'Shortlist', 'Astro', 'Astro']);
  assert.deepEqual(findTermMatches('КМ/КМД и VIP/MICE').map(hit => hit.term), ['KM', 'KMD', 'VIP', 'MICE']);
  assert.deepEqual(findTermMatches('12 км, километр, КМД12, магазинSKU, SKU_1, AstroJS, VINO, VIN123'), []);
  for (const term of ["FRS","Shortlist","SKU","PRR","SCR","RAR","RRR","PPSR","DMC","MICE","KM","KMD","SKUD","VIN","EPTS","PSI","Astro","TZ","SRO","BIM"]) {
    assert.ok(TERM_DEFINITIONS.ru[term], 'Russian definition missing: ' + term);
    assert.ok(TERM_DEFINITIONS.en[term], 'English definition missing: ' + term);
    assert.doesNotMatch(TERM_DEFINITIONS.en[term], /[А-Яа-я]/);
  }
  assert.equal(TERM_DEFINITIONS.ru.PSI,
    'PSI (PageSpeed Insights) - сервис от Google для анализа производительности и скорости загрузки страницы сайта.');
  assert.equal(TERM_DEFINITIONS.ru.Astro,
    'Astro — инструмент для разработки контентных сайтов: блогов, лендингов, портфолио, каталогов, интернет-магазинов, документации.');
  assert.match(TERM_DEFINITIONS.ru.FRS, /порядок упоминания, а не обязательно рекомендацию/);
  assert.match(TERM_DEFINITIONS.ru.RAR, /среди ответов, где соответствующий критерий/);
  assert.match(TERM_DEFINITIONS.ru.PPSR, /парных тестах/);
});

test('URLs, email addresses and file paths are not decorated', () => {
  for (const value of ['https://gaeo.ru/GEO/', 'GEO@example.ru', 'www.GEO.com', '/assets/GEO/data.json', 'GEO.ru', 'AEO@example.ru', '/assets/AEO/data.json', 'WMS@example.ru', '/docs/WMS/TMS', 'фулфилмент.ru', 'https://example.com/fulfillment/', 'https://example.com/e-commerce/', 'https://example.com/СТМ/', 'СТМ@example.ru', 'https://github.com/gaeo-ru/', 'github.com', 'GitHub@example.com', '/docs/GitHub/index.html', 'PSI@example.ru', 'https://example.com/Astro/', 'https://example.org/VIN/', '/docs/SKU/data.json', 'www.DMC.com']) {
    assert.deepEqual(findTermMatches(value), [], value);
  }
});

test('adjacent expansions need no duplicate help', () => {
  for (const value of [
    'GEO (Generative Engine Optimization)', 'AEO (Answer Engine Optimization)',
    'SEO (Search Engine Optimization)', 'Search Engine Optimization (SEO)', 'SEO — продвижение сайта в поисковых системах',
    'Answer Engine Optimization (AEO)', 'AEO - продвижение контента в источники ответов нейросетей',
    'BMR — Brand Mention Rate',
    'Share of Voice (SoV)', 'SoV — Share of Voice', 'Brand Mention Rate (BMR)',
    'Brand Mention Rate — доля упоминаний бренда в ответах нейросетей',
    'Share of Voice — доля упоминаний бренда среди всех брендов',
    'продвижение в нейросетях (GEO)',
    'GEO — продвижение в рекомендациях нейросетей', 'BMR: доля упоминаний бренда в ответах нейросетей',
    'WMS (Warehouse Management System)', 'Warehouse Management System (WMS)',
    'WMS — система управления складом.', 'E-commerce - электронная коммерция', 'E-commerce (Electronic Commerce)', 'СТМ - собственная торговая марка', 'СТМ (собственная торговая марка)', 'GitHub — это онлайн-платформа для хранения кода', 'GitHub is an online platform', 'FRS (First Recommendation Share)', 'PRR (Product Recommendation Rate)', 'SCR (Seller Criterion Rate)', 'RAR (Retailer Association Rate)', 'RRR (Retailer Recommendation Rate)', 'PPSR (Price Premium Survival Rate)', 'SKU (Stock Keeping Unit)', 'DMC (Destination Management Company)', 'MICE (Meetings, Incentives, Conferences, Exhibitions)', 'PSI (PageSpeed Insights)', 'КМ (конструкции металлические)', 'КМД (конструкции металлические деталировочные)', 'СКУД (система контроля и управления доступом)', 'VIN (Vehicle Identification Number)', 'ЭПТС (электронный паспорт транспортного средства)', 'ТЗ (техническое задание)', 'СРО (саморегулируемая организация)', 'BIM (Building Information Modeling)', 'Astro — инструмент для разработки контентных сайтов', 'Shortlist (short list)', 'shortlist — короткий список', 'Фулфилмент (Fulfillment)', 'Fulfillment (Фулфилмент)', 'Фулфилмент — комплекс логистических услуг'
  ]) assert.deepEqual(findTermMatches(value).filter(hit => hit.term !== 'Content'), [], value);
  const context = 'Показатель BMR (Brand Mention Rate) изменился.';
  assert.deepEqual(findTermMatches('BMR', { context, offset: 11 }), []);
  const aeoContext = 'Термин AEO (Answer Engine Optimization) уже раскрыт.';
  assert.deepEqual(findTermMatches('AEO', { context: aeoContext, offset: 7 }), []);
  assert.equal(findTermMatches('BMR вырос с 22% до 48%.')[0].term, 'BMR');
  assert.deepEqual(findTermMatches('MethodLab: BMR вырос с 19% до 52,4%').map(x => x.term), ['BMR']);
  assert.deepEqual(findTermMatches('BMR (Brand Mention Rate)').map(x => x.term), [], 'Already expanded BMR in a link needs no question icon');
});

test('exact user wording and the requested display duration are retained', () => {
  assert.equal(TERM_HINT_DURATION, 5000);
  assert.equal(TERM_DEFINITIONS.ru.GEO, 'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей');
  assert.equal(TERM_DEFINITIONS.ru.SEO, 'SEO (Search Engine Optimization) - продвижение сайта в поисковых системах');
  assert.equal(TERM_DEFINITIONS.en.SEO, 'SEO (Search Engine Optimization) - website promotion in search engines');
  assert.equal(TERM_DEFINITIONS.ru.AEO, 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей');
  assert.equal(TERM_DEFINITIONS.en.AEO, 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers');
  assert.equal(TERM_DEFINITIONS.ru.BMR, 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  assert.equal(TERM_DEFINITIONS.ru.SoV, 'SoV (Share of Voice) - доля упоминаний бренда среди всех брендов, упомянутых в ответах нейросети');
  assert.equal(TERM_DEFINITIONS.ru.WMS, 'WMS (Warehouse Management System) — система управления складом.');
  assert.equal(TERM_DEFINITIONS.ru.Fulfillment, 'Фулфилмент (Fulfillment) — комплекс логистических услуг в сфере интернет-торговли, который включает полный цикл работы с заказами: от приёмки товара на склад до отправки покупателю и обработки возвратов.');
  assert.equal(TERM_DEFINITIONS.en.WMS, 'WMS (Warehouse Management System) — a warehouse management system.');
  assert.equal(TERM_DEFINITIONS.en.Fulfillment, 'Fulfillment — e-commerce logistics services covering the full order cycle, from receiving goods at a warehouse to shipping to buyers and handling returns.');
  assert.equal(TERM_DEFINITIONS.ru.AIStart, 'В 1997–1998 годах учился у Владимира Николаевича Пильщикова, доцента ВМиК МГУ, создателя первой в СССР системы программирования для задач ИИ.');
  assert.equal(TERM_DEFINITIONS.en.AIStart, "In 1997–1998, I studied under Vladimir Nikolayevich Pilshchikov, an associate professor at Moscow State University's Faculty of Computational Mathematics and Cybernetics and creator of the USSR's first programming system for AI tasks.");
  assert.deepEqual(findTermMatches('С 1997 года изучаю ИИ, с 2008 года занимаюсь SEO').map(hit => hit.term), ['SEO'], 'The year is contextual; SEO receives a tooltip');
  assert.equal(TERM_DEFINITIONS.ru.BrandFound, 'BrandFound - сервис мониторинга ответов нейросетей');
  assert.equal(TERM_DEFINITIONS.en.BrandFound, 'BrandFound - a service for monitoring AI responses');
  assert.deepEqual(findTermMatches('BrandFound и Brandfound').map(match => match.term), ['BrandFound', 'BrandFound']);
  assert.deepEqual(findTermMatches('https://brandfound.ai/ и myBrandFound'), []);
  for (const definition of Object.values(TERM_DEFINITIONS.en)) assert.doesNotMatch(definition, /[А-Яа-я]/);
});

test('global asset injection is idempotent and leaves metadata/content intact', () => {
  const original = '<html><head><title>GEO & BMR</title><script type="application/ld+json">{"name":"GEO"}</script></head><body><h1>BMR</h1></body></html>';
  const enhanced = injectTermHintAssets(original);
  assert.equal(injectTermHintAssets(enhanced), enhanced);
  assert.equal((enhanced.match(/data-gaeo-term-styles/g) || []).length, 1);
  assert.equal((enhanced.match(/data-gaeo-term-script/g) || []).length, 1);
  assert.ok(enhanced.includes('<title>GEO & BMR</title>'));
  assert.ok(enhanced.includes('<script type="application/ld+json">{"name":"GEO"}</script>'));
  assert.ok(enhanced.includes('<h1>BMR</h1>'));
});

test('BrandFound editorial mentions become static referral links, with metadata and existing anchors preserved', () => {
  const source = '<html><head><title>BrandFound</title><meta content="BrandFound"><script type="application/ld+json">{"name":"BrandFound"}</script></head><body><header>BrandFound</header><main><p>Выгрузка BrandFound и brandfound.</p><p>BrandFound - сервис мониторинга ответов нейросетей.</p><p><a href="/other/">BrandFound</a></p><p><a href="https://app.brandfound.ai/">BrandFound</a></p><p>https://brandfound.ai/</p><pre>BrandFound</pre></main></body></html>';
  const linked = linkBrandFoundMentions(source);
  assert.equal(linkBrandFoundMentions(linked), linked);
  assert.equal((linked.match(/href="https:\/\/brandfound\.ai\/\?ref=ZML17L"/g) || []).length, 4);
  assert.ok(linked.includes('<title>BrandFound</title>'));
  assert.ok(linked.includes('<header>BrandFound</header>'));
  assert.ok(linked.includes('<a href="/other/">BrandFound</a>'));
  assert.ok(!linked.includes('href="https://app.brandfound.ai/"'), 'Old login homepage link is upgraded');
  assert.ok(linked.includes('<pre>BrandFound</pre>'));
  assert.ok(linked.includes('<p>https://brandfound.ai/</p>'));
  assert.equal(injectTermHintAssets(linked), injectTermHintAssets(injectTermHintAssets(linked)));
});


test('approved Russian glossary favors longest abbreviations and avoids excluded words', () => {
  assert.deepEqual(findTermMatches('ТН ВЭД/ОКПД2, ВЭД, ГИС ЖКХ, ГИС МТ, ГИС, АСУ ТП, PHP-FPM')
    .map(hit => hit.term), ['ТН ВЭД', 'ОКПД2', 'ВЭД', 'ГИС ЖКХ', 'ГИС МТ', 'ГИС', 'АСУ ТП', 'PHP-FPM']);
  assert.deepEqual(findTermMatches('ВМК и ВМиК').map(hit => hit.term), ['ВМК', 'ВМК']);
  assert.deepEqual(findTermMatches('FBO/FBS, FBL, 3PL').map(hit => hit.term), ['FBO', 'FBS', 'FBL', '3PL']);
  assert.deepEqual(findTermMatches('ФИО, ИНН, ООО, РФ, ЖК, МГУ, ИИ').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('ТН ВЭД (товарная номенклатура внешнеэкономической деятельности)').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches("FBL (Fulfillment by L'Étoile)").map(hit => hit.term), []);
  assert.equal(TERM_DEFINITIONS.ru.FBL, "FBL (Fulfillment by L'Étoile) - Продажи со складов ЛЭТУАЛЬ");
  for (const term of ['ЦА', 'ЛПР', 'КАСКО', 'МП', 'ТО', 'ТТК', 'МО', 'МПГУ', 'ВМК', 'МДФ', 'УФ'])
    assert.ok(TERM_DEFINITIONS.ru[term], 'Missing approved special term: ' + term);
});
test('ambiguous RU terms are context-sensitive; extensions do not appear in English', () => {
  assert.deepEqual(findTermMatches('SPA, сауна, массаж').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('SPA в серверном рендеринге').map(hit => hit.term), ['SPA']);
  assert.deepEqual(findTermMatches('South American Tours (SAT)').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('FAT/SAT при приемке оборудования').map(hit => hit.term), ['FAT', 'SAT']);
  assert.deepEqual(findTermMatches('Общий договор ТО не подписан').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('Плановое ТО автомобиля').map(hit => hit.term), ['ТО']);
  assert.deepEqual(findTermMatches('МП с товарами маркетплейса').map(hit => hit.term), ['МП']);
  assert.deepEqual(findTermMatches('Новая ГИС ЖКХ и BMR', { language: 'en' }).map(hit => hit.term), ['BMR']);
  assert.deepEqual(findTermMatches('ВМиК', { language: 'en' }), []);
});


test('B2B wording and RU-only glossary for Web Vitals, JavaScript, canonical, indexing and feeds', () => {
  assert.equal(TERM_DEFINITIONS.ru.B2B, 'B2B (Business-to-Business) - продажи товаров и услуг одними компаниями - другим');
  assert.match(TERM_DEFINITIONS.ru['Core Web Vitals'], /LCP, INP и CLS/);
  assert.match(TERM_DEFINITIONS.ru.JavaScript, /язык программирования/);
  assert.match(TERM_DEFINITIONS.ru.canonical, /предпочтительного адреса страницы/);
  assert.match(TERM_DEFINITIONS.ru.Indexing, /поисковый индекс/);
  assert.match(TERM_DEFINITIONS.ru.Feed, /выгрузка данных/);
  assert.deepEqual(
    findTermMatches('Core Web Vitals, JavaScript, canonical и Canonical, Javascript и javascript').map(hit => hit.term),
    ['Core Web Vitals', 'JavaScript', 'canonical', 'canonical', 'JavaScript', 'JavaScript']
  );
  assert.deepEqual(
    findTermMatches('Индексация сайта, индексации страниц, индексацию URL, индексацией робота, об индексациях сайтов')
      .map(hit => hit.term),
    ['Indexing', 'Indexing', 'Indexing', 'URL', 'Indexing', 'Indexing']
  );
  assert.deepEqual(
    findTermMatches('Фид, фида, фиду, фидом, фиды, фидов, фидами, в фидах')
      .map(hit => hit.term),
    ['Feed', 'Feed', 'Feed', 'Feed', 'Feed', 'Feed', 'Feed', 'Feed']
  );
  assert.deepEqual(findTermMatches('Индексация зарплат и пенсий'), []);
  assert.deepEqual(findTermMatches('Конфиденциальность, фидер и фидбек'), []);
  assert.deepEqual(findTermMatches('canonical (канонический URL)').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('Core Web Vitals (основные веб-показатели)').map(hit => hit.term), []);
  assert.deepEqual(findTermMatches('https://example.ru/canonical/'), []);
  assert.deepEqual(
    findTermMatches('Core Web Vitals, JavaScript, canonical, индексация, фид', { language: 'en' }),
    []
  );
});


test('Ambiguous PR is excluded without affecting PRR', () => {
  assert.equal(TERM_DEFINITIONS.ru.PR, undefined);
  assert.deepEqual(findTermMatches('PR и PRR').map(hit => hit.term), ['PRR']);
  assert.deepEqual(findTermMatches('PR', {language: 'en'}), []);
});


test('«кейс» is excluded in every form while other glossary terms remain active', () => {
  assert.equal(TERM_DEFINITIONS.ru.CaseStudy, undefined);
  const forms = ['Кейс', 'кейса', 'кейсу', 'кейсом', 'кейсе',
    'кейсы', 'кейсов', 'кейсам', 'кейсами', 'кейсах'];
  assert.deepEqual(findTermMatches(forms.join(', ')), []);
  assert.deepEqual(findTermMatches('Кейсы и кейсы клиентов'), []);
  assert.deepEqual(findTermMatches('кейс и кейсы', { language: 'en' }), []);
  assert.deepEqual(findTermMatches('Контент и кейсы').map(hit => hit.term), ['Content']);
  assert.deepEqual(findTermMatches('Кейс GEO и SEO').map(hit => hit.term), ['GEO', 'SEO']);
});


test('«контент»: approved meaning, singular/plural declensions, boundaries and no English injection', () => {
  assert.equal(TERM_DEFINITIONS.ru.Content,
    'Контент - это любое информационное наполнение сайта: то, что пользователь видит, читает, слушает или с чем взаимодействует');
  const forms = ['Контент', 'контента', 'контенту', 'контентом', 'контенте',
    'контенты', 'контентов', 'контентам', 'контентами', 'контентах'];
  assert.deepEqual(findTermMatches(forms.join(', ')).map(hit => hit.term),
    forms.map(() => 'Content'));
  assert.deepEqual(findTermMatches('Контент — это любое информационное наполнение сайта'), []);
  assert.deepEqual(findTermMatches('контентный контентщик контент24 контентность'), []);
  assert.deepEqual(findTermMatches('Контент и кейсы').map(hit => hit.term), ['Content']);
  assert.deepEqual(findTermMatches('контент и кейсы', {language:'en'}), []);
});


test('«репозиторий»: singular and plural cases, safe boundaries and original meaning', () => {
  assert.equal(TERM_DEFINITIONS.ru.Repository,
    'Репозиторий — хранилище файлов проекта и истории их изменений. Обычно используется с системой контроля версий Git для отслеживания правок и совместной разработки.');
  const forms = ['Репозиторий', 'репозитория', 'репозиторию', 'репозиторием',
    'репозитории', 'репозиториев', 'репозиториям', 'репозиториями', 'репозиториях'];
  assert.deepEqual(findTermMatches(forms.join(', ')).map(hit => hit.term), forms.map(() => 'Repository'));
  assert.deepEqual(findTermMatches('Кейсы, контент и репозитории').map(hit => hit.term),
    ['Content','Repository']);
  assert.deepEqual(findTermMatches('Репозиторий — хранилище файлов проекта'), []);
  assert.deepEqual(findTermMatches('репозиториальный антирепозиторий репозиторий2'), []);
  assert.deepEqual(findTermMatches('/docs/репозиторий/index.html'), []);
  assert.deepEqual(findTermMatches('Репозиторий', {language:'en'}), []);
});
test('Six technical glossary terms from the GAEO website development case', () => {
  for (const key of ['workflow','Title','description','hreflang','Postbox','CTA'])
    assert.ok(TERM_DEFINITIONS.ru[key], 'No RU definition for '+key);
  assert.match(TERM_DEFINITIONS.ru.Postbox, /Yandex Cloud Postbox/);
  assert.match(TERM_DEFINITIONS.ru.CTA, /Call to Action/);
  assert.deepEqual(findTermMatches('SEO: Title, description, canonical, hreflang').map(x=>x.term),
    ['SEO','Title','description','canonical','hreflang']);
  assert.deepEqual(findTermMatches('GitHub workflow запускает проверки').map(x=>x.term),
    ['GitHub','workflow']);
  assert.deepEqual(findTermMatches('Форма сайта отправляет письма через Yandex Cloud Postbox').map(x=>x.term),
    ['Postbox']);
  assert.deepEqual(findTermMatches('Кнопка CTA отправляет заявку').map(x=>x.term), ['CTA']);
  assert.deepEqual(findTermMatches('Это книга: Title и description автора').map(x=>x.term), []);
  assert.deepEqual(findTermMatches('Postbox в городе без электронной почты').map(x=>x.term), []);
  assert.deepEqual(findTermMatches('PR, PRR, workflow, Title, description, hreflang, Postbox, CTA, репозитории',
    {language: 'en'}).map(x=>x.term), ['PRR']);
  assert.deepEqual(findTermMatches('https://example.com/description/'), []);
});
