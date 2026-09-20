const mainNav = document.getElementById('mainNav');
const desktopMenu = document.getElementById('desktopMenu');
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');

function setCollapsed(collapsed){
  mainNav.classList.toggle('menu-collapsed', collapsed);
  if(!collapsed && mobileMenu){
    mobileMenu.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
  }
}

function fitHeader(){
  if(!mainNav || !desktopMenu) return;

  setCollapsed(false);

  requestAnimationFrame(() => {
    const navWidth = mainNav.getBoundingClientRect().width;
    const brandWidth = mainNav.querySelector('.brand-wrap').getBoundingClientRect().width;
    const menuWidth = desktopMenu.getBoundingClientRect().width;
    const actionsWidth = mainNav.querySelector('.header-actions').getBoundingClientRect().width;

    // Collapse shortly before visual collision.
    const requiredWidth = brandWidth + menuWidth + actionsWidth + 48;
    setCollapsed(requiredWidth > navWidth);
  });
}

if(toggle && mobileMenu){
  toggle.addEventListener('click',()=>{
    const open = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

let lastViewportWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;
  if(currentWidth === lastViewportWidth) return;
  lastViewportWidth = currentWidth;
  fitHeader();
}, {passive:true});

window.addEventListener('load', fitHeader);
if(document.fonts && document.fonts.ready) document.fonts.ready.then(fitHeader);
fitHeader();

// Keep the physical bottom stable on mobile when the viewport or late-loading
// resources change the document height just after the user reaches the footer.
// There is no programmatic scroll-to-top on the site; this guards against
// mobile Chrome reflow/clamping near the end of the document.
let reachedBottomAt = -Infinity;
const bottomDistance = () => {
  const root = document.documentElement;
  return Math.max(0, root.scrollHeight - (window.scrollY + window.innerHeight));
};
const markBottom = () => {
  if(bottomDistance() <= 24) reachedBottomAt = performance.now();
};
const restoreBottomIfRecent = () => {
  if(performance.now() - reachedBottomAt > 900) return;
  requestAnimationFrame(() => {
    window.scrollTo({top: document.documentElement.scrollHeight, left:0, behavior:'auto'});
  });
};

window.addEventListener('scroll', markBottom, {passive:true});
window.addEventListener('resize', restoreBottomIfRecent, {passive:true});
if(window.visualViewport){
  window.visualViewport.addEventListener('resize', restoreBottomIfRecent, {passive:true});
}
if(window.ResizeObserver){
  const pageResizeObserver = new ResizeObserver(restoreBottomIfRecent);
  pageResizeObserver.observe(document.body);
}

// Mobile-only folding for catalogue-like sections (articles and publications).
document.querySelectorAll('.mobile-fold-section').forEach(section => {
  const button = section.querySelector('.mobile-fold-toggle');
  if(!button) return;
  button.addEventListener('click', () => {
    const open = section.classList.toggle('is-open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});


// Footer brand lockup: mirror header brand wording beside the footer logo.
(function enhanceFooterBrand(){
  const brand = document.querySelector('.footer-brand');
  if(!brand || brand.querySelector('.footer-logo-tagline')) return;

  const logo = brand.querySelector('img');
  if(!logo) return;

  const lockup = document.createElement('div');
  lockup.className = 'footer-brand-lockup';

  const logoLink = document.createElement('a');
  logoLink.className = 'footer-logo-link';
  logoLink.href = '/';
  logoLink.setAttribute('aria-label', 'GAEO.ru — главная');

  const tagline = document.createElement('a');
  tagline.className = 'footer-logo-tagline';
  tagline.href = '/';
  tagline.innerHTML = 'Generative &amp; Answer<br>Engine Optimization';

  logo.parentNode.insertBefore(lockup, logo);
  logoLink.appendChild(logo);
  lockup.appendChild(logoLink);
  lockup.appendChild(tagline);

  const style = document.createElement('style');
  style.textContent = `
    .footer-brand-lockup{
      display:flex;
      align-items:center;
      gap:14px;
    }
    .footer-logo-link{
      display:block!important;
      margin:0!important;
      line-height:0;
      text-decoration:none!important;
      flex:0 0 auto;
    }
    .footer-logo-link img{
      display:block;
    }
    .footer-logo-tagline{
      display:block!important;
      margin:0!important;
      color:#f5f8ff!important;
      font-family:Manrope,Arial,sans-serif;
      font-size:14px!important;
      line-height:1.16;
      font-weight:600;
      text-decoration:none!important;
      white-space:nowrap;
    }
    .footer-logo-tagline:hover{
      color:#fff!important;
      text-decoration:underline!important;
    }
    @media(max-width:480px){
      .footer-brand-lockup{gap:11px}
      .footer-logo-tagline{font-size:13px!important}
    }
  `;
  document.head.appendChild(style);
})();
