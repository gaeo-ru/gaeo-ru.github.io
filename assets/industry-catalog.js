/* Progressive enhancement: the complete catalogue remains available without JavaScript. */
(() => {
  const normalize = value => String(value || '')
    .normalize('NFKC')
    .toLocaleLowerCase('ru-RU')
    .replace(/ё/g, 'е')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();

  // A small inflection fallback lets “юристы”, “коттеджи” and similar queries
  // match their forms in the source descriptions without changing the content.
  const variants = token => {
    if (!/^[а-я]{6,}$/.test(token)) return [token];
    const stem = token.replace(/(иями|ями|ами|ого|ему|ому|ыми|ими|иях|ий|ый|ой|ая|яя|ое|ее|ые|ие|ов|ев|ей|ам|ям|ах|ях|ы|и|а|я|у|ю|е)$/, '');
    return stem.length >= 4 && stem !== token ? [token, stem] : [token];
  };

  const initialize = root => {
    if (root.dataset.catalogReady === 'true') return;
    const form = root.querySelector('[data-catalog-controls]');
    const search = root.querySelector('[data-catalog-search]');
    const group = root.querySelector('[data-catalog-group]');
    const count = root.querySelector('[data-catalog-count]');
    const empty = root.querySelector('[data-catalog-empty]');
    const cards = Array.from(root.querySelectorAll('[data-catalog-item]')).map(element => ({
      element,
      group: element.dataset.group,
      haystack: normalize(element.dataset.search),
    }));
    if (!form || !search || !group || !count || !empty || !cards.length) return;

    const render = () => {
      const terms = normalize(search.value).split(' ').filter(Boolean).map(variants);
      let visible = 0;
      for (const card of cards) {
        const matchesGroup = !group.value || card.group === group.value;
        const matchesQuery = terms.every(options => options.some(term => card.haystack.includes(term)));
        const show = matchesGroup && matchesQuery;
        card.element.hidden = !show;
        if (show) visible += 1;
      }
      count.textContent = (root.dataset.countTemplate || '{count} / {total}')
        .replace('{count}', String(visible))
        .replace('{total}', String(cards.length));
      empty.hidden = visible > 0;
    };

    // On multi-column grids, opening one summary opens the whole visual row.
    // On single-column mobile layouts, native details remain independent.
    root.querySelector('[data-catalog-results]').addEventListener('click', event => {
      const summary = event.target.closest('summary');
      if (!summary || !window.matchMedia('(min-width: 701px)').matches) return;
      const details = summary.parentElement;
      if (!details?.matches('.industry-catalog__examples')) return;
      const card = details.closest('[data-catalog-item]');
      if (!card || card.hidden) return;
      const rowTop = card.getBoundingClientRect().top;
      const row = cards
        .filter(item => !item.element.hidden && Math.abs(item.element.getBoundingClientRect().top - rowTop) < 2)
        .map(item => item.element.querySelector('.industry-catalog__examples'));
      event.preventDefault();
      const expand = !details.open;
      row.forEach(element => { element.open = expand; });
    });

    let timer;
    search.addEventListener('input', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(render, 100);
    });
    group.addEventListener('change', () => {
      window.clearTimeout(timer);
      render();
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      window.clearTimeout(timer);
      render();
    });
    form.addEventListener('reset', event => {
      event.preventDefault();
      window.clearTimeout(timer);
      search.value = '';
      group.value = '';
      render();
      search.focus();
    });

    const revealLinkedCard = () => {
      const target = cards.find(card => `#${card.element.id}` === window.location.hash);
      if (!target || !target.element.hidden) return;
      window.clearTimeout(timer);
      search.value = '';
      group.value = '';
      render();
      target.element.scrollIntoView({ block: 'start' });
    };
    window.addEventListener('hashchange', revealLinkedCard);
    form.hidden = false;
    root.dataset.catalogReady = 'true';
    render();
    revealLinkedCard();
  };

  const start = () => document.querySelectorAll('[data-industry-catalog]').forEach(initialize);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  document.addEventListener('astro:page-load', start);
})();
