/** Shared, progressively enhanced explanations of GAEO's specialist terms. */
export const TERM_DEFINITIONS = Object.freeze({
  ru: Object.freeze({
    GEO: 'GEO (Generative Engine Optimization) - продвижение в рекомендациях нейросетей',
    BMR: 'BMR (Brand Mention Rate) - доля упоминаний бренда в ответах нейросетей',
    SoV: 'SoV (Share of Voice) - доля упоминаний бренда среди всех брендов, упомянутых в ответах нейросети'
  }),
  en: Object.freeze({
    GEO: 'GEO (Generative Engine Optimization) - promotion in AI recommendations',
    BMR: 'BMR (Brand Mention Rate) - the share of AI answers that mention a brand',
    SoV: 'SoV (Share of Voice) - a brand’s share of mentions among all brands mentioned in an AI answer'
  })
});

export const TERM_HINT_DURATION = 6500;
const FULL_NAMES = {
  GEO: 'Generative\\s+Engine\\s+Optimization',
  BMR: 'Brand\\s+Mention\\s+Rate',
  SoV: 'Share\\s+of\\s+Voice'
};
const TERMS = /(?<![\p{L}\p{N}_])(?:GEO|BMR|SoV|SOV)(?![\p{L}\p{N}_])/gu;

function isAddress(text, start, end) {
  const token = text.slice(0, start).split(/\s/).pop() + text.slice(start, end) + text.slice(end).split(/\s/)[0];
  // GEO/AEO and similar editorial compounds are not URL paths.
  if (/^[([«"']*(?:GEO|AEO|SEO|BMR|SoV|SOV)\/(?:GEO|AEO|SEO|BMR|SoV|SOV)(?:$|[^\w/])/.test(token)) return false;
  return /(?:https?:\/\/|www\.|mailto:|[\w.+-]+@|\/[\w./-]*|\.(?:ru|com|org|net|io|ai)\b)/i.test(token);
}

function alreadyExplained(context, start, end, term) {
  const before = context.slice(Math.max(0, start - 180), start);
  const after = context.slice(end, end + 180);
  const name = FULL_NAMES[term];
  if (new RegExp('^\\s*(?:[(:—–-]\\s*)?' + name, 'i').test(after) ||
      new RegExp(name + '\\s*[(：:]?\\s*$', 'i').test(before)) return true;
  const meaning = term === 'GEO'
    ? 'продвижение(?:\\s+(?:бизнеса|бренда|компании))?\\s+в\\s+(?:нейросетях|ответах(?:\\s+нейросетей)?|рекомендациях(?:\\s+нейросетей)?)'
    : term === 'BMR' ? 'доля\\s+упоминаний(?:\\s+бренда)?(?:\\s+в\\s+ответах(?:\\s+нейросетей)?)?'
      : 'доля\\s+упоминаний\\s+бренда\\s+среди\\s+всех\\s+брендов';
  return new RegExp('^\\s*[(:—–-]\\s*(?:это\\s+)?' + meaning, 'i').test(after) ||
    new RegExp(meaning + '\\s*\\(\\s*$', 'i').test(before);
}

/** Match visible standalone terms, retaining original spelling and character offsets. */
export function findTermMatches(text, { context = text, offset = 0 } = {}) {
  const matches = [];
  for (const match of text.matchAll(TERMS)) {
    const start = match.index, end = start + match[0].length;
    const term = match[0] === 'SOV' ? 'SoV' : match[0];
    if (isAddress(text, start, end) || alreadyExplained(context, offset + start, offset + end, term)) continue;
    matches.push({ start, end, term, text: match[0] });
  }
  return matches;
}

const EXCLUDED = [
  'script', 'style', 'noscript', 'textarea', 'input', 'select', 'option',
  'pre', 'code', 'kbd', 'samp', 'svg', 'math', 'canvas', 'template', 'iframe',
  '[contenteditable]:not([contenteditable="false"])', '[data-term-hints="off"]',
  '[data-gaeo-term]', '[data-gaeo-term-reference]', '[data-gaeo-term-definitions]',
  '.gaeo-term-tooltip', 'abbr[title]', '[role="tooltip"]'
].join(',');
const INTERACTIVE = 'a[href],button,summary,label,[role="button"],[role="link"]';
const REFERENCE_EXCLUDED = 'nav,header,form,summary,label,[role="navigation"],[role="menu"],.mobile-menu';
const CONTEXT = 'p,li,td,th,dt,dd,h1,h2,h3,h4,h5,h6,figcaption,blockquote,summary,label';

export function installTermHints(doc = document) {
  if (!doc.body || doc.documentElement.dataset.gaeoTermHints === 'ready') return;
  doc.documentElement.dataset.gaeoTermHints = 'ready';
  const win = doc.defaultView;
  const language = doc.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'ru';
  const definitions = TERM_DEFINITIONS[language];
  const labels = language === 'en'
    ? term => `Explain ${term}`
    : term => `Что означает ${term}`;
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
  let active = null, timer = null, frame = null;
  const referenceControls = new WeakMap();

  function makeTrigger(term, text, reference = false) {
    const trigger = doc.createElement('button');
    trigger.type = 'button';
    trigger.className = `gaeo-term-trigger${reference ? ' gaeo-term-trigger--reference' : ''}`;
    trigger.dataset.gaeoTerm = term;
    trigger.setAttribute('aria-label', labels(term));
    trigger.setAttribute('aria-describedby', `gaeo-term-description-${term.toLowerCase()}`);
    trigger.setAttribute('aria-controls', tooltip.id);
    trigger.setAttribute('aria-expanded', 'false');
    if (!reference) {
      const label = doc.createElement('span');
      label.className = 'gaeo-term-label';
      label.textContent = text;
      trigger.append(label);
    }
    const mark = doc.createElement('span');
    mark.className = 'gaeo-term-mark';
    mark.setAttribute('aria-hidden', 'true');
    trigger.append(mark);
    return trigger;
  }

  function contextFor(node) {
    const container = node.parentElement.closest(CONTEXT) || node.parentElement;
    const range = doc.createRange();
    range.selectNodeContents(container);
    range.setEnd(node, 0);
    return { context: container.textContent, offset: range.toString().length };
  }

  // A tooltip must never steal the action of a link or create nested buttons.
  // Inline links receive an adjacent, separately focusable question mark.
  // Navigation, form controls, disclosure controls and entire linked cards keep
  // their native interaction and layout; surrounding prose remains annotated.
  function canAnnotateReference(element) {
    if (element.closest(REFERENCE_EXCLUDED)) return false;
    const display = win.getComputedStyle(element).display;
    return ['inline', 'inline-block', 'inline-flex'].includes(display);
  }

  function referenceTerms(reference) {
    const terms = new Set();
    const walker = doc.createTreeWalker(reference, win.NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement.closest(EXCLUDED)) continue;
      for (const match of findTermMatches(node.data, contextFor(node))) terms.add(match.term);
    }
    return terms;
  }

  function enhance(root) {
    if (!root || !root.isConnected || root.closest?.(EXCLUDED)) return;
    const nodes = [];
    if (root.nodeType === 3) nodes.push(root);
    else {
      const walker = doc.createTreeWalker(root, win.NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push(walker.currentNode);
    }
    const references = new Set();
    const enclosing = root.parentElement?.closest(INTERACTIVE) || root.closest?.(INTERACTIVE);
    if (enclosing && referenceControls.has(enclosing)) references.add(enclosing);
    for (const reference of root.querySelectorAll?.(INTERACTIVE) || []) {
      if (referenceControls.has(reference)) references.add(reference);
    }
    for (const node of nodes) {
      if (!node.isConnected || !node.parentElement || node.parentElement.closest(EXCLUDED)) continue;
      const text = node.data;
      if (!/(?:GEO|BMR|SoV|SOV)/.test(text)) continue;
      let interactive = node.parentElement.closest(INTERACTIVE);
      // Always use the outer interactive control if old markup contains nesting.
      if (interactive) while (interactive.parentElement?.closest(INTERACTIVE)) interactive = interactive.parentElement.closest(INTERACTIVE);
      if (interactive && !canAnnotateReference(interactive)) continue;
      if (interactive && node.parentElement.closest('[data-gaeo-term-link-label]')) {
        references.add(interactive);
        continue;
      }
      const matches = findTermMatches(text, contextFor(node));
      if (!matches.length) continue;
      if (interactive) references.add(interactive);
      const fragment = doc.createDocumentFragment();
      let cursor = 0;
      for (const match of matches) {
        fragment.append(doc.createTextNode(text.slice(cursor, match.start)));
        if (interactive) {
          const label = doc.createElement('span');
          label.className = 'gaeo-term-link-label';
          label.dataset.gaeoTermLinkLabel = '';
          label.textContent = match.text;
          fragment.append(label);
        } else fragment.append(makeTrigger(match.term, match.text));
        cursor = match.end;
      }
      fragment.append(doc.createTextNode(text.slice(cursor)));
      node.replaceWith(fragment);
    }
    for (const reference of references) {
      const terms = canAnnotateReference(reference) ? referenceTerms(reference) : new Set();
      for (const label of reference.querySelectorAll('[data-gaeo-term-link-label]')) {
        if (!findTermMatches(label.textContent).length) label.replaceWith(...label.childNodes);
      }
      let controls = referenceControls.get(reference);
      if (!terms.size) {
        controls?.remove();
        referenceControls.delete(reference);
        continue;
      }
      if (!controls?.isConnected) {
        controls = doc.createElement('span');
        controls.className = 'gaeo-term-reference';
        controls.dataset.gaeoTermReference = '';
        reference.after(controls);
        referenceControls.set(reference, controls);
      }
      const signature = [...terms].join(',');
      if (controls.dataset.gaeoTermReference !== signature) {
        controls.replaceChildren(...[...terms].map(term => makeTrigger(term, term, true)));
        controls.dataset.gaeoTermReference = signature;
      }
    }
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
    tooltip.hidden = true;
  }

  function show(trigger) {
    if (!definitions[trigger.dataset.gaeoTerm]) return;
    if (active && active !== trigger) active.setAttribute('aria-expanded', 'false');
    active = trigger;
    tooltip.textContent = definitions[trigger.dataset.gaeoTerm];
    tooltip.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    place();
    if (timer) win.clearTimeout(timer);
    timer = win.setTimeout(hide, TERM_HINT_DURATION);
  }

  doc.addEventListener('click', event => {
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (!trigger) return;
    event.preventDefault();
    event.stopPropagation();
    show(trigger);
  });
  doc.addEventListener('pointerdown', event => {
    if (active && !event.target.closest?.('[data-gaeo-term],.gaeo-term-tooltip')) hide();
  }, { passive: true });
  doc.addEventListener('pointerover', event => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (trigger && !trigger.contains(event.relatedTarget)) show(trigger);
  }, { passive: true });
  doc.addEventListener('focusin', event => {
    const trigger = event.target.closest?.('[data-gaeo-term]');
    if (trigger) show(trigger);
    else if (active) hide();
  });
  doc.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
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
      for (const node of record.removedNodes || []) {
        if (node.isConnected || node.nodeType !== 1) continue;
        referenceControls.get(node)?.remove();
        for (const reference of node.querySelectorAll?.(INTERACTIVE) || []) referenceControls.get(reference)?.remove();
      }
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
