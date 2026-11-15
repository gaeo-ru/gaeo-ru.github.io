import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const version = name => createHash('sha256')
  .update(readFileSync(resolve(process.cwd(), 'public/assets', name)))
  .digest('hex').slice(0, 12);
const css = `/assets/term-hints.css?v=${version('term-hints.css')}`;
const js = `/assets/term-hints.js?v=${version('term-hints.js')}`;

/** Insert one shared progressive enhancement without touching page content. */
export function injectTermHintAssets(html) {
  if (!html.includes('data-gaeo-term-styles')) html = html.replace(/<\/head>/i,
    `<link rel="stylesheet" href="${css}" data-gaeo-term-styles>\n</head>`);
  if (!html.includes('data-gaeo-term-script')) html = html.replace(/<\/body>/i,
    `<script type="module" src="${js}" data-gaeo-term-script></script>\n</body>`);
  return linkBrandFoundMentions(html);
}

/** Make every editorial BrandFound mention a crawlable referral link at build time. */
export function linkBrandFoundMentions(html) {
  if (!/brandfound/i.test(html)) return html;
  const referral = 'https://brandfound.ai/?ref=ZML17L';
  const blocked = new Set(['head','script','style','noscript','template','svg','nav','header','footer','a','button','label','textarea','select','option','pre','code','kbd','samp']);
  const raw = new Set(['head','script','style','noscript','template','svg','textarea','pre','code']);
  const voidElements = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const replaceText = text => text.replace(/\bbrandfound\b/gi, (name, at, original) => {
    const before = original.slice(Math.max(0, at - 150), at);
    const after = original.slice(at + name.length, at + name.length + 20);
    if (/(?:https?:\/\/|www\.)[^\s<]*$/i.test(before) || /@[^\s<]*$/i.test(before) ||
        /^\.(?:ai|ru|com|org|net|io)\b/i.test(after)) return name;
    return `<a href="${referral}" target="_blank" rel="noopener noreferrer">${name}</a>`;
  });
  function tagEnd(source, from) {
    let quote = null;
    for (let n = from + 1; n < source.length; n++) {
      const c = source[n];
      if (quote) { if (c === quote) quote = null; }
      else if (c === "'" || c === '"') quote = c;
      else if (c === '>') return n + 1;
    }
    return source.length;
  }
  let result = '', cursor = 0;
  const stack = [];
  while (cursor < html.length) {
    const current = stack.at(-1)?.name;
    if (raw.has(current)) {
      const closing = new RegExp(`</${current}\\s*>`, 'i').exec(html.slice(cursor));
      if (!closing) { result += html.slice(cursor); break; }
      const boundary = cursor + closing.index;
      result += html.slice(cursor, boundary);
      cursor = boundary;
    }
    const next = html.indexOf('<', cursor);
    if (next < 0) {
      const plain = html.slice(cursor);
      result += stack.some(item => item.name === 'body') && !stack.some(item => blocked.has(item.name)) ? replaceText(plain) : plain;
      break;
    }
    if (next > cursor) {
      const plain = html.slice(cursor, next);
      result += stack.some(item => item.name === 'body') && !stack.some(item => blocked.has(item.name)) ? replaceText(plain) : plain;
      cursor = next;
      continue;
    }
    if (html.startsWith('<!--', cursor)) {
      const end = html.indexOf('-->', cursor + 4);
      const after = end < 0 ? html.length : end + 3;
      result += html.slice(cursor, after);
      cursor = after;
      continue;
    }
    const after = tagEnd(html, cursor);
    let tag = html.slice(cursor, after);
    // Preserve the original linked text while upgrading old service-home links.
    if (/^<a\b/i.test(tag) && /^\s*BrandFound\s*<\/a\s*>/i.test(html.slice(after))) {
      tag = tag.replace(/\bhref=(["'])https?:\/\/(?:app\.)?brandfound\.ai\/?(?:\?[^"']*)?\1/i, `href="${referral}"`);
    }
    result += tag;
    cursor = after;
    const m = /^<\s*(\/?)\s*([a-z][\w:-]*)\b/i.exec(tag);
    if (!m) continue;
    const name = m[2].toLowerCase();
    if (m[1]) {
      const at = stack.findLastIndex(item => item.name === name);
      if (at >= 0) stack.length = at;
    } else if (!voidElements.has(name) && !/\/\s*>$/.test(tag)) {
      stack.push({name});
    }
  }
  return result;
}
