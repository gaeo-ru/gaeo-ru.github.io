/** Shared, progressively enhanced explanations of GAEO's specialist terms. */
export const TERM_DEFINITIONS = Object.freeze({
  ru: Object.freeze({
    GEO: 'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей',
    SEO: 'SEO (Search Engine Optimization) - продвижение сайта в поисковых системах',
    GitHub: 'GitHub — это онлайн-платформа для хранения кода, управления его версиями и совместной работы над проектами.',
    Ecommerce: 'E-commerce - электронная коммерция: интернет-магазины и продажа товаров с маркетплейсов',
    STM: 'СТМ - собственная торговая марка. Товары, производимые или импортируемые под брендом правообладателя. Обычно зарегистрирована в Роспатенте.',
    AEO: 'AEO (Answer Engine Optimization) - продвижение контента в источники ответов нейросетей',
    BMR: 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей',
    SoV: 'SoV (Share of Voice) - доля упоминаний бренда среди всех брендов, упомянутых в ответах нейросети',
    WMS: 'WMS (Warehouse Management System) — система управления складом.',
    Fulfillment: 'Фулфилмент (Fulfillment) — комплекс логистических услуг в сфере интернет-торговли, который включает полный цикл работы с заказами: от приёмки товара на склад до отправки покупателю и обработки возвратов.',
    BrandFound: 'BrandFound - сервис мониторинга ответов нейросетей',
    AIStart: 'В 1997–1998 годах учился у Владимира Николаевича Пильщикова, доцента ВМиК МГУ, создателя первой в СССР системы программирования для задач ИИ.'
  }),
  en: Object.freeze({
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    SEO: 'SEO (Search Engine Optimization) - website promotion in search engines',
    GitHub: 'GitHub is an online platform for hosting code, managing its versions and collaborating on projects.',
    Ecommerce: 'E-commerce - electronic commerce: online stores and selling goods on marketplaces',
    STM: "STM (private label) - goods manufactured or imported under the brand owner's name. The trademark is usually registered with Rospatent.",
    AEO: 'AEO (Answer Engine Optimization) - promoting content into sources used in AI answers',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer',
    WMS: 'WMS (Warehouse Management System) — a warehouse management system.',
    Fulfillment: 'Fulfillment — e-commerce logistics services covering the full order cycle, from receiving goods at a warehouse to shipping to buyers and handling returns.',
    BrandFound: 'BrandFound - a service for monitoring AI responses',
    AIStart: "In 1997–1998, I studied under Vladimir Nikolayevich Pilshchikov, an associate professor at Moscow State University's Faculty of Computational Mathematics and Cybernetics and creator of the USSR's first programming system for AI tasks."
  })
});

export const TERM_HINT_DURATION = 5000;
const FULL_NAMES = {
  GEO: 'Generative\\s+Engine\\s+Optimization',
  SEO: 'Search\\s+Engine\\s+Optimization',
  AEO: 'Answer\\s+Engine\\s+Optimization',
  BMR: 'Brand\\s+Mention\\s+Rate',
  SoV: 'Share\\s+of\\s+Voice',
  WMS: 'Warehouse\\s+Management\\s+System',
  Fulfillment: 'Fulfillment',
  Ecommerce: 'Electronic\\s+Commerce',
  STM: 'собственная\\s+торговая\\s+марка'
};
// Both Russian case forms and English spelling map to one glossary entry.
const TERMS = /(?<![\p{L}\p{N}_])(?:[Bb]rand\s+[Mm]ention\s+[Rr]ate|[Ss]hare\s+of\s+[Vv]oice|GEO|AEO|SEO|BMR|SoV|SOV|WMS|[Gg][Ii][Tt][Hh][Uu][Bb]|[Ee][-‐‑–]?(?:[Cc]ommerce|COMMERCE)|[Сс][Тт][Мм]|(?:[Фф]улфилмент|ФУЛФИЛМЕНТ)(?:ами|ах|ам|ов|ом|а|у|е|ы)?|[Ff]ulfill?ment(?:s)?|[Bb]rand[Ff]ound|BRANDFOUND)(?![\p{L}\p{N}_])/gu;

function isAddress(text, start, end) {
  const token = text.slice(0, start).split(/\s/).pop() + text.slice(start, end) + text.slice(end).split(/\s/)[0];
  // GEO/AEO and similar editorial compounds are not URL paths.
  if (/^[([«"']*(?:GEO|AEO|SEO|BMR|SoV|SOV|WMS|TMS)\/(?:GEO|AEO|SEO|BMR|SoV|SOV|WMS|TMS)(?:$|[^\w/])/.test(token)) return false;
  return /(?:https?:\/\/|www\.|mailto:|[\w.+-]+@|\/[\w./-]*|\.(?:ru|com|org|net|io|ai)\b)/i.test(token);
}

function alreadyExplained(context, start, end, term, spelling) {
  const before = context.slice(Math.max(0, start - 180), start);
  const after = context.slice(end, end + 180);
  // When a metric name expands an adjacent abbreviation, the expansion
  // is already visible and neither form needs a redundant help control.
  if (term === 'BMR' && /^Brand\s+Mention\s+Rate$/i.test(spelling) &&
      (/\bBMR\s*(?:\(|[:—–-])\s*$/i.test(before) || /^\s*\(\s*BMR\s*\)/i.test(after))) return true;
  if (term === 'SoV' && /^Share\s+of\s+Voice$/i.test(spelling) &&
      (/\b(?:SoV|SOV)\s*(?:\(|[:—–-])\s*$/i.test(before) || /^\s*\(\s*(?:SoV|SOV)\s*\)/i.test(after))) return true;
  // A bilingual parenthesis is already an explicit expansion; neither word needs a hint.
  if (term === 'Fulfillment' && (/(?:[Фф]улфилмент|ФУЛФИЛМЕНТ)\s*\(\s*$/u.test(before) || /^\s*\(\s*(?:[Фф]улфилмент|ФУЛФИЛМЕНТ)\s*\)/u.test(after))) return true;
  if (term === 'GitHub') return /^\s*(?:[(:—–-]\s*)?(?:это\s+)?онлайн-платформа(?![\p{L}\p{N}])/iu.test(after) ||
    /^\s*(?:[(:—–-]\s*)?(?:is\s+(?:an?\s+)?)?online\s+platform\b/i.test(after);
  const name = FULL_NAMES[term];
  if (new RegExp('^\\s*(?:[(:—–-]\\s*)?' + name, 'i').test(after) ||
      new RegExp(name + '\\s*[(：:]?\\s*$', 'i').test(before)) return true;
  const meaning = term === 'GEO'
    ? 'продвижение(?:\\s+(?:бизнеса|бренда|компании))?\\s+в\\s+(?:нейросетях|ответах(?:\\s+нейросетей)?|рекомендациях(?:\\s+нейросетей)?)'
    : term === 'AEO' ? 'продвижение\\s+контента\\s+в\\s+источники\\s+ответов\\s+нейросетей'
    : term === 'SEO' ? 'продвижение\\s+сайта\\s+в\\s+поисковых\\s+системах'
    : term === 'BMR' ? 'доля\\s+упоминаний(?:\\s+бренда)?(?:\\s+в\\s+ответах(?:\\s+нейросетей)?)?'
      : term === 'SoV' ? 'доля\\s+упоминаний\\s+бренда\\s+среди\\s+всех\\s+брендов'
      : term === 'WMS' ? 'система\\s+управления\\s+складом'
      : term === 'Ecommerce' ? 'электронная\\s+коммерция'
      : term === 'STM' ? 'собственная\\s+торговая\\s+марка'
      : 'комплекс\\s+логистических\\s+услуг';
  return new RegExp('^\\s*[(:—–-]\\s*(?:это\\s+)?' + meaning, 'i').test(after) ||
    new RegExp(meaning + '\\s*\\(\\s*$', 'i').test(before);
}

/** Match visible standalone terms, retaining original spelling and character offsets. */
export function findTermMatches(text, { context = text, offset = 0 } = {}) {
  const matches = [];
  for (const match of text.matchAll(TERMS)) {
    const start = match.index, end = start + match[0].length;
    const value = match[0];
    const term = /^Brand\s+Mention\s+Rate$/i.test(value) ? 'BMR'
      : /^Share\s+of\s+Voice$/i.test(value) ? 'SoV'
      : value === 'SOV' ? 'SoV'
      : /^[Ee][-‐‑–]?(?:[Cc]ommerce|COMMERCE)$/u.test(value) ? 'Ecommerce'
      : /^[Сс][Тт][Мм]$/u.test(value) ? 'STM'
      : /^github$/i.test(value) ? 'GitHub'
      : /^(?:[Фф]улфилмент|ФУЛФИЛМЕНТ|[Ff]ulfill?ment)/u.test(value) ? 'Fulfillment'
      : /^brandfound$/i.test(value) ? 'BrandFound'
      : value;
    if (isAddress(text, start, end) || (term !== 'BrandFound' && alreadyExplained(context, offset + start, offset + end, term, value))) continue;
    matches.push({ start, end, term, text: match[0] });
  }
  return matches;
}

const EXCLUDED = [
  'script', 'style', 'noscript', 'textarea', 'input', 'select', 'option',
  'pre', 'code', 'kbd', 'samp', 'svg', 'math', 'canvas', 'template', 'iframe',
  '[contenteditable]:not([contenteditable="false"])', '[data-term-hints="off"]',
  '[data-gaeo-term]', '[data-gaeo-term-definitions]',
  '.gaeo-term-tooltip', 'abbr[title]', '[role="tooltip"]'
].join(',');
const INTERACTIVE = 'a[href],button,summary,label,[role="button"],[role="link"]';
const LINK_HELP_SELECTOR = '[data-gaeo-term-link-help]';
const LINK_WRAPPER_SELECTOR = '.gaeo-term-link-inline';
const CONTEXT = 'p,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6,figcaption,blockquote,summary,label';

export function installTermHints(doc = document) {
  if (!doc.body || doc.documentElement.dataset.gaeoTermHints === 'ready') return;
  doc.documentElement.dataset.gaeoTermHints = 'ready';
  const win = doc.defaultView;
  const language = doc.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'ru';
  const definitions = TERM_DEFINITIONS[language];
  const labels = language === 'en'
    ? term => `Explain ${term === 'Ecommerce' ? 'E-commerce' : term}`
    : term => `Что означает ${term === 'Fulfillment' ? 'фулфилмент' : term === 'Ecommerce' ? 'E-commerce' : term === 'STM' ? 'СТМ' : term}`;
  const descriptions = doc.createElement('div');
  descriptions.hidden = true;
  descriptions.dataset.gaeoTermDefinitions = '';
  for (const [term, definition] of Object.entries(definitions)) {
    const description = doc.createElement('span');
    description.id = `gaeo-term-description-${term.toLowerCase()}`;
    description.textContent = definition;
    descriptions.append(description);
  }
  const tooltip = doc.createElement('div');
  tooltip.id = 'gaeo-term-tooltip';
  tooltip.className = 'gaeo-term-tooltip';
  tooltip.setAttribute('role', 'tooltip');
  tooltip.hidden = true;
  doc.body.append(descriptions, tooltip);
  let active = null, timer = null, frame = null, activeMode = null;
  let lastInput = null;
  function makeTrigger(term, text) {
    const trigger = doc.createElement('button');
    trigger.type = 'button';
    trigger.className = 'gaeo-term-trigger';
    if (text.includes(' ')) trigger.classList.add('gaeo-term-trigger--phrase');
    trigger.dataset.gaeoTerm = term;
    trigger.setAttribute('aria-label', labels(term));
    trigger.setAttribute('aria-describedby', `gaeo-term-description-${term.toLowerCase()}`);
    trigger.setAttribute('aria-controls', tooltip.id);
    trigger.setAttribute('aria-expanded', 'false');
    const label = doc.createElement('span');
    label.className = 'gaeo-term-label';
    label.textContent = text;
    trigger.append(label);
    return trigger;
  }

  function makeLinkHelp(term) {
    const button = doc.createElement('button');
    button.type = 'button';
    button.className = 'gaeo-term-link-help';
    button.dataset.gaeoTerm = term;
    button.dataset.gaeoTermLinkHelp = '';
    button.setAttribute('aria-label', labels(term));
    button.setAttribute('aria-describedby', `gaeo-term-description-${term.toLowerCase()}`);
    button.setAttribute('aria-controls', tooltip.id);
    button.setAttribute('aria-expanded', 'false');
    button.textContent = '?';
    return button;
  }

  function brandFoundLinkIsExplained(link) {
    const context = link.closest(CONTEXT);
    if (!context) return false;
    const range = doc.createRange();
    range.selectNodeContents(context);
    range.setEndBefore(link);
    const before = range.toString().length;
    const after = context.textContent.slice(before + link.textContent.length, before + link.textContent.length + 160);
    return /^\s*(?:[(:—–-]\s*)?(?:это\s+)?(?:сервис|платформа|инструмент)\s+(?:для\s+)?(?:мониторинга|отслеживания|анализа)\s+(?:ответов|упоминаний)/i.test(after) ||
      /^\s*(?:[(:—–-]\s*)?(?:is\s+(?:an?\s+)?)?(?:service|platform|tool)\s+(?:for\s+)?(?:monitoring|tracking)\s+(?:AI\s+)?(?:answers|responses)/i.test(after);
  }

  // An orphaned terminal dot is visually separated from a wrapped link by
  // its independent help icon. Drop only the dot if nothing follows it.
  function removeOrphanPeriod(wrapper) {
    const tail = wrapper.nextSibling;
    if (tail?.nodeType !== 3 || !/^\s*\.\s*$/u.test(tail.data)) return;
    for (let next = tail.nextSibling; next; next = next.nextSibling) {
      if (next.nodeType !== 3 || next.data.trim()) return;
    }
    tail.data = tail.data.replace('.', '');
  }

  // The original anchor remains intact and its help controls follow the
  // LAST visual line even when the anchor wraps across multiple lines.
  function enhanceLinks(root) {
    const links = root.matches?.('a[href]') ? [root] : [...(root.querySelectorAll?.('a[href]') || [])];
    for (const link of links) {
      if (!link.isConnected) continue;
      let wrapper = link.parentElement?.matches(LINK_WRAPPER_SELECTOR) ? link.parentElement : null;
      const allowed = link.closest('main,article') &&
        !link.closest('header,footer,nav,aside,[data-term-hints="off"],[contenteditable="true"]') &&
        !link.closest(EXCLUDED) &&
        !link.closest('button,[role="button"],.tariff-actions,.case-actions,.hero-actions,.cta-actions') &&
        !link.matches('.button,.btn,[role="button"],[class*="button"],[class*="btn"],[class*="cta"]');
      if (allowed && /^brandfound$/i.test(link.textContent.trim())) {
        link.href = 'https://brandfound.ai/?ref=ZML17L';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      const terms = allowed ? [...new Set(findTermMatches(link.textContent)
        .filter(hit => hit.term !== 'BrandFound' || !brandFoundLinkIsExplained(link))
        .map(hit => hit.term))] : [];
      if (!terms.length) {
        if (wrapper) {
          if (active && wrapper.contains(active)) hide();
          wrapper.replaceWith(link);
        }
        continue;
      }
      if (!wrapper) {
        const block = /^(?:block|flex|grid|table|list-item)$/.test(win.getComputedStyle(link).display);
        wrapper = doc.createElement('span');
        wrapper.className = 'gaeo-term-link-inline';
        if (block) wrapper.classList.add('gaeo-term-link-inline--block');
        link.replaceWith(wrapper);
        wrapper.append(link);
      }
      wrapper.style.setProperty('--gaeo-term-help-space', `${terms.length * 24 + 2}px`);
      removeOrphanPeriod(wrapper);
      const existing = [...wrapper.children].filter(child => child.matches?.(LINK_HELP_SELECTOR));
      if (terms.length === existing.length && terms.every((term, i) => term === existing[i].dataset.gaeoTerm)) continue;
      for (const button of existing) {
        if (button === active) hide();
        button.remove();
      }
      for (const term of terms) wrapper.append(makeLinkHelp(term));
    }
  }

  function contextFor(node) {
    const container = node.parentElement.closest(CONTEXT) || node.parentElement;
    const range = doc.createRange();
    range.selectNodeContents(container);
    range.setEnd(node, 0);
    return { context: container.textContent, offset: range.toString().length };
  }

  // Links and other interactive elements remain entirely unchanged. Only terms
  // in ordinary text receive a dotted button, without a separate visual marker.
  function enhance(root) {
    if (!root || !root.isConnected) return;
    // A later renderer may move already decorated text into a link/control.
    // Restore its original text rather than leave nested interactive elements.
    const moved = root.matches?.('[data-gaeo-term]') ? [root] : [...(root.querySelectorAll?.('[data-gaeo-term]') || [])];
    for (const trigger of moved) if (trigger.parentElement?.closest(INTERACTIVE)) {
      if (trigger === active) hide();
      if (trigger.matches(LINK_HELP_SELECTOR)) trigger.remove();
      else trigger.replaceWith(doc.createTextNode(trigger.textContent));
    }
    if (!root.isConnected || root.closest?.(EXCLUDED)) return;
    enhanceLinks(root);
    if (root.closest?.(INTERACTIVE)) return;
    const nodes = [];
    if (root.nodeType === 3) nodes.push(root);
    else {
      const walker = doc.createTreeWalker(root, win.NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push(walker.currentNode);
    }
    for (const node of nodes) {
      if (!node.isConnected || !node.parentElement || node.parentElement.closest(EXCLUDED)) continue;
      if (node.parentElement.closest(INTERACTIVE)) continue;
      const text = node.data;
      if (!/(?:GEO|AEO|SEO|BMR|SoV|SOV|WMS|[Gg][Ii][Tt][Hh][Uu][Bb]|[Ee][-‐‑–]?(?:[Cc]ommerce|COMMERCE)|[Сс][Тт][Мм]|[Bb]rand\s+[Mm]ention\s+[Rr]ate|[Ss]hare\s+of\s+[Vv]oice|[Фф]улфилмент|ФУЛФИЛМЕНТ|[Ff]ulfill?ment|[Bb]rand[Ff]ound|BRANDFOUND)/.test(text)) continue;
      const matches = findTermMatches(text, contextFor(node));
      if (!matches.length) continue;
      const fragment = doc.createDocumentFragment();
      let cursor = 0;
      for (const match of matches) {
        fragment.append(doc.createTextNode(text.slice(cursor, match.start)));
        if (match.term === 'BrandFound') {
          const link = doc.createElement('a');
          link.href = 'https://brandfound.ai/?ref=ZML17L';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = match.text;
          fragment.append(link);
        } else fragment.append(makeTrigger(match.term, match.text));
        cursor = match.end;
      }
      fragment.append(doc.createTextNode(text.slice(cursor)));
      node.replaceWith(fragment);
    }
    // BrandFound anchors created from text nodes need their help controls immediately.
    if (root.nodeType === 1 || root.nodeType === 9) enhanceLinks(root);
  }

  function place() {
    if (!active?.isConnected) { hide(); return; }
    const anchor = active.getBoundingClientRect();
    const viewport = win.visualViewport;
    const bounds = {
      left: viewport?.offsetLeft || 0,
      top: viewport?.offsetTop || 0,
      width: viewport?.width || doc.documentElement.clientWidth,
      height: viewport?.height || win.innerHeight
    };
    const margin = 12, gap = 10;
    tooltip.style.maxWidth = `${Math.min(380, Math.max(120, bounds.width - margin * 2))}px`;
    tooltip.style.maxHeight = `${Math.max(80, bounds.height - margin * 2)}px`;
    const box = tooltip.getBoundingClientRect();
    const left = Math.min(Math.max(bounds.left + margin, anchor.left + (anchor.width - box.width) / 2), bounds.left + bounds.width - box.width - margin);
    const fitsBelow = anchor.bottom + gap + box.height <= bounds.top + bounds.height - margin;
    const preferredTop = fitsBelow ? anchor.bottom + gap : anchor.top - box.height - gap;
    const top = Math.min(Math.max(bounds.top + margin, preferredTop), bounds.top + bounds.height - box.height - margin);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    tooltip.dataset.placement = fitsBelow ? 'below' : 'above';
    tooltip.style.setProperty('--gaeo-term-arrow', `${Math.min(box.width - 18, Math.max(18, anchor.left + anchor.width / 2 - left))}px`);
  }

  function hide() {
    if (timer) win.clearTimeout(timer);
    timer = null;
    active?.setAttribute('aria-expanded', 'false');
    active = null;
    activeMode = null;
    tooltip.hidden = true;
  }

  function show(trigger, mode = 'timed') {
    if (!definitions[trigger.dataset.gaeoTerm]) return;
    if (active && active !== trigger) active.setAttribute('aria-expanded', 'false');
    active = trigger;
    activeMode = mode;
    tooltip.textContent = definitions[trigger.dataset.gaeoTerm];
    tooltip.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    place();
    if (timer) win.clearTimeout(timer);
    timer = mode === 'hover' ? null : win.setTimeout(hide, TERM_HINT_DURATION);
  }

  doc.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    if (lastInput === 'mouse') {
      if (active !== trigger && trigger.matches(':hover')) show(trigger, 'hover');
    } else show(trigger);
  });
  // A tap or click on the open explanation closes it immediately.
  tooltip.addEventListener('click', event => {
    event.stopPropagation();
    hide();
  });
  doc.addEventListener('pointerdown', event => {
    lastInput = event.pointerType || 'mouse';
    if (active && !event.target.closest?.('[data-gaeo-term],.gaeo-term-tooltip')) hide();
  }, { passive: true });
  doc.addEventListener('pointerover', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (trigger && !trigger.contains(event.relatedTarget)) {
      lastInput = 'mouse';
      show(trigger, 'hover');
    }
  }, { passive: true });
  doc.addEventListener('pointerout', event => {
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (trigger === active && activeMode === 'hover' && !trigger.contains(event.relatedTarget)) hide();
  }, { passive: true });
  doc.addEventListener('focusin', event => {
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (trigger && lastInput !== 'mouse') show(trigger);
    else if (!trigger && active) hide();
  });
  doc.addEventListener('keydown', event => {
    lastInput = 'keyboard';
    if (event.key === 'Escape') hide();
  });
  const reposition = () => {
    if (!active || frame !== null) return;
    frame = win.requestAnimationFrame(() => { frame = null; if (active) place(); });
  };
  win.addEventListener('resize', reposition, { passive: true });
  doc.addEventListener('scroll', reposition, { capture: true, passive: true });
  win.visualViewport?.addEventListener('resize', reposition, { passive: true });
  win.visualViewport?.addEventListener('scroll', reposition, { passive: true });

  enhance(doc.body);
  const pending = new Set();
  let scheduled = false;
  const observerOptions = { childList: true, subtree: true, characterData: true };
  const observer = new win.MutationObserver(records => {
    for (const record of records) {
      if (record.target.parentElement?.closest(EXCLUDED) || record.target.closest?.(EXCLUDED)) continue;
      if (record.type === 'characterData') pending.add(record.target.parentElement);
      for (const node of record.addedNodes || []) if (node.nodeType === 1 || node.nodeType === 3) pending.add(node.nodeType === 3 ? node.parentElement : node);
    }
    if (active && !active.isConnected) hide();
    if (!pending.size || scheduled) return;
    scheduled = true;
    win.requestAnimationFrame(() => {
      scheduled = false;
      observer.disconnect();
      for (const root of pending) enhance(root);
      pending.clear();
      observer.observe(doc.body, observerOptions);
    });
  });
  observer.observe(doc.body, observerOptions);
  return { enhance, hide };
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => installTermHints(), { once: true });
  else installTermHints();
}
