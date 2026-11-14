import test from 'node:test';
import assert from 'node:assert/strict';
import { findTermMatches, TERM_DEFINITIONS, TERM_HINT_DURATION } from '../public/assets/term-hints.js';
import { injectTermHintAssets } from '../src/lib/term-hint-assets.mjs';

test('standalone terms in normal copy, headings and metric labels', () => {
  const source = 'GEO-продвижение: BMR 22%, SoV 15%. SEO/AEO и GAEO.ru. SOV';
  assert.deepEqual(findTermMatches(source).map(match => match.term), ['GEO', 'BMR', 'SoV', 'AEO', 'SoV']);
  assert.deepEqual(findTermMatches('НЕGEO GEOLOGY _GEO GEO2 myBMR SOVEREIGN GAEO _AEO AEO2'), []);
  assert.deepEqual(findTermMatches('GEO/AEO-эксперт, BMR/SoV').map(match => match.term), ['GEO', 'AEO', 'BMR', 'SoV']);
});

test('URLs, email addresses and file paths are not decorated', () => {
  for (const value of ['https://gaeo.ru/GEO/', 'GEO@example.ru', 'www.GEO.com', '/assets/GEO/data.json', 'GEO.ru', 'AEO@example.ru', '/assets/AEO/data.json']) {
    assert.deepEqual(findTermMatches(value), [], value);
  }
});

test('adjacent expansions need no duplicate help', () => {
  for (const value of [
    'GEO (Generative Engine Optimization)', 'AEO (Answer Engine Optimization)',
    'Answer Engine Optimization (AEO)', 'AEO - продвижение контента в источники ответов нейросетей',
    'BMR — Brand Mention Rate',
    'Share of Voice (SoV)', 'продвижение в нейросетях (GEO)',
    'GEO — продвижение в рекомендациях нейросетей', 'BMR: доля упоминаний бренда в ответах нейросетей'
  ]) assert.deepEqual(findTermMatches(value), [], value);
  const context = 'Показатель BMR (Brand Mention Rate) изменился.';
  assert.deepEqual(findTermMatches('BMR', { context, offset: 11 }), []);
  const aeoContext = 'Термин AEO (Answer Engine Optimization) уже раскрыт.';
  assert.deepEqual(findTermMatches('AEO', { context: aeoContext, offset: 7 }), []);
  assert.equal(findTermMatches('BMR вырос с 22% до 48%.')[0].term, 'BMR');
});

test('exact user wording and the requested display duration are retained', () => {
  assert.equal(TERM_HINT_DURATION, 6500);
  assert.equal(TERM_DEFINITIONS.ru.GEO, 'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей');
  assert.equal(TERM_DEFINITIONS.ru.AEO, 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей');
  assert.equal(TERM_DEFINITIONS.en.AEO, 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers');
  assert.equal(TERM_DEFINITIONS.ru.BMR, 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей');
  assert.equal(TERM_DEFINITIONS.ru.SoV, 'SoV (Share of Voice) - доля упоминаний бренда среди всех брендов, упомянутых в ответах нейросети');
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
