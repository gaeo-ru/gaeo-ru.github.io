#!/usr/bin/env node
/**
 * Refresh the EXISTING 15 services in the version 1.4 feed from pricing.mjs.
 * Persistent IDs are provider identities: never rename or silently add them.
 * The 107 industry offers and new core services require a separate export phase.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PRICES, platforms, getPlan, serviceHref } from '../src/data/pricing.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const FEED = path.join(ROOT, 'public/gaeo-services.yml.xml');
const ORIGIN = 'https://gaeo.ru';

export const existingServiceMapping = Object.freeze({
  'quick-geo-audit': { plan: 'free' },
  'full-geo-audit': { plan: 'audit' },
  'geo-aeo-promotion': { plan: 'geo' },
  'geo-aeo-promotion-content': { plan: 'content' },
  'alice-ai-addon': { platform: 'alice' },
  'chatgpt-addon': { platform: 'chatgpt' },
  'gemini-addon': { platform: 'gemini' },
  'google-ai-overviews-addon': { platform: 'google-ai-overviews' },
  'perplexity-addon': { platform: 'perplexity' },
  'deepseek-addon': { platform: 'deepseek' },
  'gigachat-addon': { platform: 'gigachat' },
  'copilot-addon': { platform: 'copilot' },
  'qwen-addon': { platform: 'qwen' },
  'claude-addon': { platform: 'claude' },
  'grok-addon': { platform: 'grok' },
});

const xmlEscape = text => String(text)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

function replaceTag(block, tag, value) {
  const pattern = new RegExp(`<${tag}>[\\s\\S]*?<\\/${tag}>`, 'g');
  const matches = block.match(pattern) || [];
  if (matches.length !== 1) throw new Error(`Expected 1 ${tag} element in a service, found ${matches.length}`);
  return block.replace(pattern, `<${tag}>${xmlEscape(value)}</${tag}>`);
}

function priceXml(offer) {
  if (offer.amount === 0) return '<price>\n            <is_free>1</is_free>\n          </price>';
  const kind = offer.from ? 'from' : 'exact';
  return `<price>\n            <${kind}>\n              <value>${offer.amount}</value>\n              <currency>RUB</currency>\n            </${kind}>${offer.kind === 'monthly' ? '\n            <unit>месяц</unit>' : ''}\n          </price>`;
}

function moscowTimestamp() {
  return new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString().slice(0, 19) + '+03:00';
}

export function serviceFeedRecord(persistentId) {
  const mapping = existingServiceMapping[persistentId];
  if (!mapping) throw new Error(`No approved mapping for existing feed ID: ${persistentId}`);
  let offer;
  if (mapping.plan) {
    const plan = getPlan(mapping.plan, 'ru');
    if (!plan) throw new Error(`Missing canonical plan: ${mapping.plan}`);
    offer = {
      name: plan.name,
      amount: plan.amount,
      from: plan.from,
      kind: plan.kind,
      image: plan.image,
      url: ORIGIN + plan.href,
      description: [plan.summary, ...plan.items].map(value => String(value).replace(/[.\s]+$/, '')).join('. ') + '.',
    };
  } else {
    const platform = platforms.find(item => item.id === mapping.platform);
    if (!platform) throw new Error(`Missing canonical platform: ${mapping.platform}`);
    offer = {
      name: `GEO-продвижение в ${platform.name}`,
      amount: PRICES.platform,
      from: false,
      kind: 'monthly',
      image: platform.image,
      url: ORIGIN + serviceHref('additional-platforms', 'ru') + '#' + platform.id,
      description: `Целенаправленное GEO-продвижение и мониторинг в ${platform.name}. ${getPlan('platform', 'ru').summary} Подключается дополнительно к базовому тарифу продвижения.`,
    };
  }
  offer.photo = `/assets/tariffs/services/${String(offer.image).padStart(2, '0')}.jpg`;
  return offer;
}

export function synchronizeServiceFeed(source, { updatedAt = moscowTimestamp(), verifyImages = true } = {}) {
  if (!/<services_feed\b[^>]*version="1\.4"/.test(source)) throw new Error('Expected services_feed version 1.4');
  const seen = new Set();
  let updated = source.replace(/<service>[^]*?<\/service>/g, block => {
    const id = block.match(/<persistent_id>([^<]+)<\/persistent_id>/)?.[1];
    if (!id || seen.has(id)) throw new Error(`Missing or duplicate service persistent_id: ${id}`);
    seen.add(id);
    const offer = serviceFeedRecord(id);
    if (verifyImages && !fs.existsSync(path.join(ROOT, 'public', offer.photo))) throw new Error(`Missing feed photograph: ${offer.photo}`);
    let next = replaceTag(block, 'url', offer.url);
    next = replaceTag(next, 'name', offer.name);
    next = replaceTag(next, 'photo_url', ORIGIN + offer.photo);
    next = replaceTag(next, 'description', offer.description);
    const prices = next.match(/<price>[^]*?<\/price>/g) || [];
    if (prices.length !== 1) throw new Error(`Expected 1 price block in ${id}`);
    return next.replace(/<price>[^]*?<\/price>/, priceXml(offer));
  });
  const expected = Object.keys(existingServiceMapping);
  if (seen.size !== expected.length || expected.some(id => !seen.has(id))) {
    throw new Error('Existing service identities changed. Review the export scope before updating the mapping.');
  }
  // Keep repeat builds deterministic when commercial data have not changed.
  if (updated !== source) {
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+03:00$/.test(updatedAt)) throw new Error('Expected a Moscow ISO timestamp');
    updated = updated.replace(/(<services_feed\b[^>]*date=")[^"]*(")/, `$1${updatedAt}$2`);
  }
  return updated;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const source = fs.readFileSync(FEED, 'utf8');
  const updated = synchronizeServiceFeed(source);
  const changed = updated !== source;
  if (process.argv.includes('--check')) {
    if (changed) {
      console.error('Service feed differs from canonical pricing. Run node scripts/sync-service-feed.mjs.');
      process.exitCode = 1;
    } else console.log(`Service feed matches pricing.mjs (${Object.keys(existingServiceMapping).length} persistent IDs).`);
  } else {
    if (changed) fs.writeFileSync(FEED, updated);
    console.log(`Service feed ${changed ? 'updated' : 'already current'} (${Object.keys(existingServiceMapping).length} persistent IDs).`);
  }
}
