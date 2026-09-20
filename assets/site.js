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

// Mobile-only folding for catalogue-like sections (articles and publications).
document.querySelectorAll('.mobile-fold-section').forEach(section => {
  const button = section.querySelector('.mobile-fold-toggle');
  if(!button) return;
  button.addEventListener('click', () => {
    const open = section.classList.toggle('is-open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
