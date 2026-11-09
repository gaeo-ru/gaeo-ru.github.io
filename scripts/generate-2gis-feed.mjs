import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPlan, money, priceLabel } from '../src/data/pricing.mjs';

const publicDir = new URL('../public/', import.meta.url);
const source = readFileSync(new URL('gaeo-services.yml.xml', publicDir), 'utf8');
// Keep existing 2GIS IDs, titles, groups and photo references when moving to the URL.
const services = JSON.parse(readFileSync(new URL('../src/data/2gis-services.json', import.meta.url), 'utf8'));
const output = fileURLToPath(new URL('assets/feeds/2gis.csv', publicDir));
const fields = ['id', 'name', 'price', 'currencyId', 'category', 'description', 'url', 'picture', 'measure'];
const origin = 'https://gaeo.ru';
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

function tag(block, name) {
  return block?.match(new RegExp(`<${name}>([^]*?)</${name}>`))?.[1].replace(
    /&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi,
    (_, entity) => entity.startsWith('#')
      ? String.fromCodePoint(entity.startsWith('#x') ? parseInt(entity.slice(2), 16) : Number(entity.slice(1)))
      : entities[entity],
  );
}

function elements(name) {
  const items = [...source.matchAll(new RegExp(`<${name}>([^]*?)</${name}>`, 'g'))]
    .map(([, block]) => [tag(block, 'persistent_id'), block]);
  const result = new Map(items);
  if (result.has(undefined) || result.size !== items.length) {
    throw new Error(`Missing or duplicate ${name} ID in the services feed`);
  }
  return result;
}

function csvField(value = '') {
  const text = String(value).replace(/[\r\n\t]+/g, ' ');
  return /[;"]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
}

const categories = elements('category');
const remaining = elements('service');
const formatMoney = amount => money(amount).replace(/[\u00a0\u202f]/g, ' ');
const industryPrices = ['geo', 'content', 'guarantee'].map(id => priceLabel(getPlan(id)).replace(/[\u00a0\u202f]/g, ' '));

function offerFromFeed(sourceId, metadata) {
  const block = remaining.get(sourceId);
  if (!block) throw new Error(`Missing service in GAEO feed: ${sourceId}`);
  remaining.delete(sourceId);
  const priceBlock = tag(block, 'price');
  const value = tag(priceBlock, 'value');
  const price = tag(priceBlock, 'is_free') === '1' ? 0 : Number(value);
  const measure = tag(priceBlock, 'unit') ?? (sourceId.endsWith('-addon') ? 'месяц' : '');
  const category = metadata.category ?? tag(categories.get(tag(block, 'category_id')), 'name');
  let description = tag(block, 'description');
  if (sourceId.startsWith('industry-')) {
    description = description.replace(/ GEO-продвижение от [\d\s]+ ₽\/мес\.[\s\S]*$/, '')
      .replace('кухнях на заказ', 'кухнях по индивидуальным размерам');
    description += ` GEO-продвижение ${industryPrices[0]}; с экспертным контентом ${industryPrices[1]}; с финансовыми гарантиями ${industryPrices[2]}.`;
  } else if (sourceId.endsWith('-addon') || sourceId === 'additional-prompts-10') {
    description = description.replace(/\d[\d \u00a0\u202f]* ₽/g, formatMoney(price));
  } else if (tag(priceBlock, 'from')) {
    if (sourceId === 'geo-guarantee') {
      const plan = getPlan('guarantee');
      description += ' ' + [plan.summary, ...plan.items].map(item => item.replace(/\.$/, '')).join('. ') + '.';
    }
    description = `Стоимость от ${formatMoney(price)}${measure ? ' в месяц' : ''}. ${description}`;
  }
  return {
    ...metadata,
    name: metadata.name ?? tag(block, 'name'),
    price,
    currencyId: 'RUB',
    category,
    description,
    url: tag(block, 'url'),
    measure,
  };
}

const rows = Object.entries(services).map(([sourceId, metadata]) => {
  if (sourceId !== 'extra-platform') return offerFromFeed(sourceId, metadata);
  const plan = getPlan('platform');
  return {
    ...metadata,
    price: plan.amount,
    currencyId: 'RUB',
    description: `${plan.summary} Стоимость ${formatMoney(plan.amount)} в месяц. ${plan.items.join('. ')}.`,
    url: origin + plan.href,
    measure: 'месяц',
  };
});

for (const sourceId of remaining.keys()) {
  if (!/^industry-\d+$/.test(sourceId)) throw new Error(`Missing 2GIS mapping for ${sourceId}`);
  rows.push(offerFromFeed(sourceId, { id: sourceId.replace('-', '') }));
}
if (rows.length <= Object.keys(services).length) throw new Error('Missing industry services in the GAEO feed');

const ids = new Set();
for (const { id, name, price, category, description, url, picture = '' } of rows) {
  if (!/^[A-Za-z0-9]{1,20}$/.test(id) || ids.has(id) ||
      !name || name.length > 512 || !Number.isInteger(price) || price < 0 ||
      !category || !description || description.length > 5000 || !url?.startsWith(origin + '/') ||
      url.length > 1024 || picture.length > 512) {
    throw new Error(`Invalid or duplicate 2GIS offer: ${id}`);
  }
  ids.add(id);
}

const csv = [fields.join(';'), ...rows.map(row => fields.map(field => csvField(row[field])).join(';'))];
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, csv.join('\r\n') + '\r\n', 'utf8');
console.log(`2GIS feed: ${rows.length} offers`);
