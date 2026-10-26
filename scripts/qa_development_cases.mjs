import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';

const slugs=['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours'];
const root=resolve(process.cwd(),'dist');
let count=0;
for(const slug of slugs)for(const lang of ['ru','en']){
 const route='/'+(lang==='en'?'en/':'')+'cases/'+slug+'/';
 const path=resolve(root,route.slice(1),'index.html');
 assert.ok(existsSync(path),'Missing case: '+route);
 const html=readFileSync(path,'utf8');
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Canonical '+route);
 assert.ok(html.includes('property="og:url" content="https://gaeo.ru'+route+'"'),'OG '+route);
 for(const alt of ['ru','en']){
  const target='https://gaeo.ru/'+(alt==='en'?'en/':'')+'cases/'+slug+'/';
  assert.ok(html.includes('hreflang="'+alt+'" href="'+target+'"'),'Hreflang '+route);
 }
 assert.equal((html.match(/<h1/g)||[]).length,1,'H1 count '+route);
 const data=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(data,'Schema '+route);
 const entities=JSON.parse(data[1])['@graph'];
 const article=entities.find(x=>x['@type']==='Article');
 const faq=entities.find(x=>x['@type']==='FAQPage');
 assert.equal(article.dateModified,'2026-10-26','Date modified '+route);
 assert.ok(article.image && !article.image.endsWith('gaeo-social-preview.jpg'),'Cover '+route);
 assert.equal(faq.mainEntity.length,3,'FAQ length '+route);
 const updated=lang==='en'?'Updated: October 26, 2026':'Обновлено: 26 октября 2026';
 assert.ok(html.includes(updated),'Visible date '+route);
 count++;
}

for(const lang of ['ru','en']){
 const rootPrefix=lang==='en'?'en/':'';
 const listing=readFileSync(resolve(root,rootPrefix+'cases/index.html'),'utf8');
 const landing=readFileSync(resolve(root,rootPrefix+'index.html'),'utf8');
 const dest='/'+rootPrefix+'cases/';
 for(const html of [listing,landing]){
  for(const hash of ['geo-promotion','website-development']){
   assert.ok(html.includes(dest+'#'+hash),'Shared navigation link missing '+dest+hash);
  }
  assert.ok(html.includes('class="nav-cases"'),'Desktop cases dropdown missing '+lang);
  assert.ok(html.includes('class="mobile-cases"'),'Mobile cases submenu missing '+lang);
 }
 assert.equal((listing.match(/id="geo-promotion"/g)||[]).length,1,'One GEO section '+lang);
 assert.equal((listing.match(/id="website-development"/g)||[]).length,1,'One development section '+lang);
 assert.ok(listing.indexOf('id="geo-promotion"')<listing.indexOf('id="website-development"'),'Promotion should come first '+lang);
 const data=listing.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(data,'Collection JSON-LD missing '+lang);
 const nodes=JSON.parse(data[1])['@graph'];
 const list=nodes.find(x=>x['@type']==='ItemList');
 const collection=nodes.find(x=>x['@type']==='CollectionPage');
 assert.equal(list.numberOfItems,7,'Seven case list entries '+lang);
 assert.equal(list.itemListElement.length,7,'List item count '+lang);
 assert.equal(collection.hasPart.length,7,'Collection membership count '+lang);
 assert.equal(list.itemListElement[0].position,1,'List starts at 1 '+lang);
}

console.log('DEVELOPMENT_CASE_QA=PASS; pages='+count);

const base='http://127.0.0.1:4333';
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4333'],{stdio:'ignore'});
let browser,tests=0;
try{
 let started=false;
 for(let i=0;i<60;i++){
  if(server.exitCode!==null)break;
  try{if((await fetch(base+'/cases/')).ok){started=true;break;}}catch{}
  await new Promise(done=>setTimeout(done,350));
 }
 assert.ok(started,'Astro preview could not start');
 browser=await chromium.launch({headless:true});
 for(const slug of slugs)for(const lang of ['ru','en'])for(const width of [1440,390,320]){
  const route='/'+(lang==='en'?'en/':'')+'cases/'+slug+'/';
  const page=await browser.newPage({viewport:{width,height:width===1440?900:780}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200,'HTTP status '+route);
  assert.equal(await page.locator('h1').count(),1,'H1 '+route);
  assert.equal(await page.locator('.dev-case__chapter').count(),7,'Sections '+route);
  assert.equal(await page.locator('details.faq-item').count(),3,'FAQ '+route);
  const before=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert.ok(before<=width+2,'Overflow before modal '+route+' at '+width+'='+before);
  const faq=page.locator('details.faq-item').first();
  await faq.locator('summary').click();
  assert.ok(await faq.evaluate(el=>el.open),'FAQ interaction '+route);
  await page.locator('.page-cta .button[href$="#lead"]').click();
  await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
  await page.locator('.gaeo-modal-close').click();
  assert.equal(await page.locator('[role="dialog"]').count(),0,'Modal teardown '+route);
  let after=await page.evaluate(()=>document.documentElement.scrollWidth);
  if(after>width+2){await page.waitForTimeout(200);after=await page.evaluate(()=>document.documentElement.scrollWidth);}
  assert.ok(after<=width+2,'Overflow after modal '+route+' at '+width+'='+after);
  assert.deepEqual(errors,[],'JS errors '+route);
  tests++;await page.close();
 }

 for(const lang of ['ru','en']){
  const prefix=lang==='en'?'en/':'';
  const route='/'+prefix+'cases/';
  const desktop=await browser.newPage({viewport:{width:1680,height:900}});
  await desktop.goto(base+route,{waitUntil:'domcontentloaded'});
  assert.equal(await desktop.locator('.desktop-menu > a[href="'+route+'"], .desktop-menu > .nav-cases > a[href="'+route+'"]').count(),1,'Exactly one desktop Cases parent, excluding language links '+lang);
  const mainCategory=desktop.locator('.desktop-menu .nav-cases__parent');
  await mainCategory.waitFor({state:'visible'});
  await mainCategory.hover();
  const sub=desktop.locator('.desktop-menu .nav-cases__submenu');
  let submenuVisible=false;
  try{await sub.waitFor({state:'visible',timeout:2200});submenuVisible=true;}catch{}
  if(!submenuVisible){
   const details=await desktop.evaluate(()=>{
    const root=document.querySelector('.desktop-menu .nav-cases');
    const main=document.querySelector('.desktop-menu');
    const menu=document.querySelector('.desktop-menu .nav-cases__submenu');
    const nav=document.querySelector('#mainNav');
    const styles=menu?getComputedStyle(menu):null;
    return {navClasses:nav?.className,menuDisplay:main&&getComputedStyle(main).display,
      wrapperHovered:root?.matches(':hover'),wrapperFocused:root?.matches(':focus-within'),
      submenuDisplay:styles?.display,submenuVisibility:styles?.visibility,
      submenuOpacity:styles?.opacity,submenuWidth:menu?.getBoundingClientRect().width,
      rootHtml:root?.outerHTML.slice(0,260),viewport:innerWidth};
   });
   console.error('CASE_NAV_DEBUG '+lang+' '+JSON.stringify(details));
  }
  assert.ok(submenuVisible,'Desktop cases submenu invisible '+lang);
  assert.equal(await sub.locator('a').count(),2,'Two submenu entries '+lang);
  await mainCategory.focus();
  await sub.waitFor({state:'visible',timeout:2200});
  assert.ok(await sub.isVisible(),'Keyboard focus must reveal case submenu '+lang);
  await sub.locator('a[href$="#website-development"]').click();
  await desktop.waitForURL(url=>url.hash==='#website-development');
  assert.equal(await desktop.locator('#website-development .list-card').count(),3,'Development group '+lang);
  assert.equal(await desktop.locator('#geo-promotion .list-card').count(),4,'GEO group '+lang);
  await desktop.close();
  for(const width of [390,320]){
   const mobile=await browser.newPage({viewport:{width,height:760}});
   await mobile.goto(base+route,{waitUntil:'domcontentloaded'});
   const hamburger=mobile.locator('.menu-toggle');
   assert.equal(await mobile.locator('.mobile-menu > a[href="'+route+'"], .mobile-menu > .mobile-cases > a[href="'+route+'"]').count(),1,'Exactly one mobile Cases parent, excluding language links '+lang);
   await hamburger.click();
   await mobile.locator('.mobile-menu.open').waitFor({state:'visible',timeout:3000});
   assert.equal(await hamburger.getAttribute('aria-expanded'),'true','Hamburger should report open '+lang);
   // Late load/font measurements must not close an already open mobile menu.
   await mobile.evaluate(()=>window.dispatchEvent(new Event('load')));
   await mobile.waitForTimeout(160);
   assert.ok(await mobile.locator('.mobile-menu').evaluate(el=>el.classList.contains('open')),'Mobile menu closed after late header sizing '+lang);
   assert.equal(await hamburger.getAttribute('aria-expanded'),'true','Hamburger reset by late sizing '+lang);
   await mobile.locator('.mobile-cases__submenu a[href$="#geo-promotion"]').click();
   await mobile.waitForURL(url=>url.hash==='#geo-promotion');
   assert.ok(!await mobile.locator('.mobile-menu').evaluate(el=>el.classList.contains('open')),'Mobile menu remained open '+lang);
   assert.equal(await hamburger.getAttribute('aria-expanded'),'false','Hamburger state '+lang);
   const docWidth=await mobile.evaluate(()=>document.documentElement.scrollWidth);
   assert.ok(docWidth<=width+2,'Case categories overflow at '+width+': '+docWidth);
   await mobile.close();
  }
 }
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
console.log('DEVELOPMENT_CASE_BROWSER_QA=PASS; cases='+tests);
