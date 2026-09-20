const mainNav = document.getElementById('mainNav');
const desktopMenu = document.getElementById('desktopMenu');
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobileMenu');


/* Burger menu UI is injected here so the same behavior applies to the
   homepage with inline CSS and to all internal pages with shared CSS. */
(function installBurgerMenuStyles(){
  if(document.getElementById('gaeo-burger-menu-styles')) return;
  const style = document.createElement('style');
  style.id = 'gaeo-burger-menu-styles';
  style.textContent = `
    .menu-toggle{
      cursor:pointer!important;
    }
    .menu-toggle span,
    .menu-toggle span::before,
    .menu-toggle span::after{
      transition:transform .18s ease, top .18s ease, background-color .18s ease;
    }
    .menu-toggle[aria-expanded="true"] span{
      background:transparent!important;
    }
    .menu-toggle[aria-expanded="true"] span::before{
      top:0!important;
      transform:rotate(45deg);
    }
    .menu-toggle[aria-expanded="true"] span::after{
      top:0!important;
      transform:rotate(-45deg);
    }
    .mobile-menu{
      left:auto!important;
      right:max(20px, calc((100vw - min(1240px, calc(100vw - 112px))) / 2))!important;
      width:min(340px, calc(100vw - 40px))!important;
      max-width:340px!important;
      border:1px solid var(--line)!important;
      border-top:0!important;
      border-radius:0 0 12px 12px!important;
      box-shadow:0 14px 32px rgba(2,22,65,.14)!important;
    }
    @media(max-width:720px){
      .mobile-menu{
        right:20px!important;
        width:min(340px, calc(100vw - 40px))!important;
      }
    }
    @media(max-width:400px){
      .mobile-menu{
        right:16px!important;
        width:calc(100vw - 32px)!important;
      }
    }
  `;
  document.head.appendChild(style);
})();

function setCollapsed(collapsed){
  mainNav.classList.toggle('menu-collapsed', collapsed);
  if(!collapsed && mobileMenu){
    mobileMenu.classList.remove('open');
    toggle?.setAttribute('aria-expanded','false');
    toggle?.setAttribute('aria-label','Открыть меню');
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
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
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


// Keep desktop, mobile and footer navigation in one canonical order.
(function syncNavigationMenus(){
  const isEn = document.documentElement.lang === 'en';

  const desktopItems = isEn ? [
    ['About me','/en/professional-biography/'],
    ['How I work','/en/#process'],
    ['Cases','/cases/'],
    ['Reviews','/reviews/'],
    ['Articles','/articles/'],
    ['Publications','/publications/'],
    ['Pricing','/en/#pricing']
  ] : [
    ['Обо мне','/professional-biography/'],
    ['Как работаю','/#process'],
    ['Кейсы','/cases/'],
    ['Отзывы','/reviews/'],
    ['Статьи','/articles/'],
    ['Публикации','/publications/'],
    ['Тарифы','/#pricing']
  ];

  const desktop = document.getElementById('desktopMenu');
  if(desktop){
    const langs = desktop.querySelector('.langs');
    desktop.querySelectorAll(':scope > a').forEach(a => a.remove());
    desktopItems.forEach(([label, href]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      desktop.insertBefore(a, langs || null);
    });
  }

  const mobile = document.getElementById('mobileMenu');
  if(mobile){
    const langs = mobile.querySelector('.mobile-langs');
    mobile.querySelectorAll(':scope > a').forEach(a => a.remove());
    desktopItems.forEach(([label, href]) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = label;
      mobile.insertBefore(a, langs || null);
    });
  }

  const footerGrid = document.querySelector('footer .footer-grid');
  if(footerGrid && footerGrid.children.length >= 3){
    const left = footerGrid.children[1];
    const right = footerGrid.children[2];
    const footerLang = right.querySelector('.footer-lang');

    const leftItems = isEn ? [
      ['Professional biography','/en/professional-biography/'],
      ['How I work','/en/#process'],
      ['Cases','/cases/'],
      ['Reviews','/reviews/'],
      ['Pricing','/en/#pricing']
    ] : [
      ['Профессиональная биография','/professional-biography/'],
      ['Как работаю','/#process'],
      ['Кейсы','/cases/'],
      ['Отзывы','/reviews/'],
      ['Тарифы','/#pricing']
    ];

    const rightItems = isEn ? [
      ['Articles','/articles/'],
      ['Publications','/publications/'],
      ['Official external profiles','/en/professional-biography/#external-profiles'],
      ['Privacy policy',null],
      ['Personal data processing',null]
    ] : [
      ['Статьи','/articles/'],
      ['Публикации','/publications/'],
      ['Официальные внешние профили','/professional-biography/#external-profiles'],
      ['Политика конфиденциальности',null],
      ['Обработка персональных данных',null]
    ];

    const fillColumn = (column, items) => {
      column.querySelectorAll(':scope > a').forEach(a => a.remove());
      items.forEach(([label, href]) => {
        const a = document.createElement('a');
        if(href) a.href = href;
        a.textContent = label;
        if(footerLang && column === right){
          column.insertBefore(a, footerLang);
        }else{
          column.appendChild(a);
        }
      });
    };

    fillColumn(left, leftItems);
    fillColumn(right, rightItems);
  }

  // Re-evaluate whether the desktop menu still fits after adding Reviews.
  requestAnimationFrame(fitHeader);
})();

// Link legal entity name in footer to RBC Companies profile.
(function linkFooterLegalEntity(){
  const footerBottom = document.querySelector('footer .footer-bottom');
  if(!footerBottom || footerBottom.querySelector('.footer-rbc-link')) return;

  const targetText = 'ИП Яковлев Алексей Леонидович';
  const link = document.createElement('a');
  link.className = 'footer-rbc-link';
  link.href = 'https://companies.rbc.ru/persons/ogrnip/325774600017838-yakovlev-aleksej-leonidovich/';
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = targetText;

  for(const node of Array.from(footerBottom.childNodes)){
    if(node.nodeType === Node.TEXT_NODE && node.nodeValue.includes(targetText)){
      const parts = node.nodeValue.split(targetText);
      const frag = document.createDocumentFragment();
      if(parts[0]) frag.appendChild(document.createTextNode(parts[0]));
      frag.appendChild(link);
      if(parts[1]) frag.appendChild(document.createTextNode(parts[1]));
      footerBottom.replaceChild(frag, node);
      break;
    }
  }

  const style = document.createElement('style');
  style.textContent = `
    .footer-bottom .footer-rbc-link{
      display:inline!important;
      margin:0!important;
      color:inherit!important;
      font-size:inherit!important;
      text-decoration:none!important;
    }
    .footer-bottom .footer-rbc-link:hover{
      color:#dbe5f3!important;
      text-decoration:underline!important;
    }
  `;
  document.head.appendChild(style);
})();

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
