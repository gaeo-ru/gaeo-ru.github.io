/* Reviews are static HTML. JavaScript adds manual controls, never autoplay. */
(() => {
  const initialize = () => {
    document.querySelectorAll('.review-carousel').forEach((carousel, index) => {
      if(carousel.classList.contains('is-enhanced')) return;
      const track = carousel.querySelector('.review-carousel__track');
      const previous = carousel.querySelector('[data-review-prev]');
      const next = carousel.querySelector('[data-review-next]');
      const cards = Array.from(track?.querySelectorAll('.review-carousel__card') || []);
      if(!track || !previous || !next || !cards.length) return;

      const isEn = document.documentElement.lang === 'en';
      const status = carousel.querySelector('.review-carousel__status');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if(!track.id) track.id = `review-carousel-track-${index + 1}`;
      previous.setAttribute('aria-controls', track.id);
      next.setAttribute('aria-controls', track.id);
      if(!previous.hasAttribute('aria-label')) previous.setAttribute('aria-label', isEn ? 'Previous reviews' : 'Предыдущие отзывы');
      if(!next.hasAttribute('aria-label')) next.setAttribute('aria-label', isEn ? 'Next reviews' : 'Следующие отзывы');
      if(!track.hasAttribute('tabindex')) track.tabIndex = 0;

      const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
      const updateButtons = () => {
        previous.disabled = track.scrollLeft <= 2;
        next.disabled = track.scrollLeft >= maxScroll() - 2;
      };
      const updateStatus = () => {
        if(!status) return;
        const viewport = track.getBoundingClientRect();
        const visible = cards.map((card, cardIndex) => {
          const rect = card.getBoundingClientRect();
          const visibleWidth = Math.min(rect.right, viewport.right) - Math.max(rect.left, viewport.left);
          return visibleWidth >= rect.width * .6 ? cardIndex + 1 : 0;
        }).filter(Boolean);
        if(!visible.length) return;
        const first = visible[0];
        const last = visible[visible.length - 1];
        const range = first === last ? `${first}` : `${first}–${last}`;
        const message = isEn ? `Reviews ${range} of ${cards.length}` : `Отзывы ${range} из ${cards.length}`;
        if(status.textContent !== message) status.textContent = message;
      };
      const scrollTo = (left) => {
        track.scrollTo({left:Math.max(0, Math.min(maxScroll(), left)), behavior:reducedMotion.matches ? 'instant' : 'smooth'});
      };
      const step = (direction) => {
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
        scrollTo(track.scrollLeft + direction * (cards[0].getBoundingClientRect().width + gap));
      };

      previous.addEventListener('click', () => step(-1));
      next.addEventListener('click', () => step(1));
      track.addEventListener('keydown', (event) => {
        if(event.target !== track || event.altKey || event.ctrlKey || event.metaKey) return;
        if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          step(event.key === 'ArrowRight' ? 1 : -1);
        } else if(event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          scrollTo(event.key === 'Home' ? 0 : maxScroll());
        }
      });

      let frame = 0;
      let announceTimer = 0;
      const onScroll = () => {
        if(!frame) frame = requestAnimationFrame(() => {
          frame = 0;
          updateButtons();
        });
        window.clearTimeout(announceTimer);
        announceTimer = window.setTimeout(updateStatus, 160);
      };
      const onResize = () => {
        updateButtons();
        updateStatus();
      };
      track.addEventListener('scroll', onScroll, {passive:true});
      if('ResizeObserver' in window) new ResizeObserver(onResize).observe(track);
      else window.addEventListener('resize', onResize, {passive:true});
      carousel.classList.add('is-enhanced');
      updateButtons();
      updateStatus();
    });
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, {once:true});
  else initialize();
})();
