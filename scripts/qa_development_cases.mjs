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
 const expectedHeading=lang==='en'?'Website Development for GEO and AI Search':'Разработка сайтов под GEO-продвижение в нейросетях';
 assert.ok(listing.includes('<h2 id="dev-case-listing-title">'+expectedHeading+'</h2>'),'Development heading '+lang);
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

// Editorial and technical SEO checks for all six development cases and both catalogs.
// Compare rendered content with metadata and JSON-LD to catch stale titles after edits.
function readMeta(html,key){
 const tag=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0])
   .filter(s=>s.includes('name="'+key+'"')||s.includes('property="'+key+'"'));
 assert.equal(tag.length,1,'Exactly one meta '+key);
 return tag[0].match(/\bcontent="([^"]*)"/)?.[1]||'';
}
function readGraph(html){
 const entries=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 assert.equal(entries.length,1,'Exactly one JSON-LD block');
 return JSON.parse(entries[0][1])['@graph'];
}
function caseSeoAudit(route,listing=false){
 const html=readFileSync(resolve(root,route.slice(1),'index.html'),'utf8');
 const title=html.match(/<title>([^<]+)<\/title>/)?.[1]||'';
 const desc=readMeta(html,'description');
 const h1s=[...html.matchAll(/<h1\b[^>]*>([^<]+)<\/h1>/g)].map(m=>m[1]);
 assert.equal(h1s.length,1,'One H1 '+route);
 assert.ok(title.length>=40&&title.length<=90,'Reasonable unique title length '+route);
 assert.ok(desc.length>=105&&desc.length<=180,'Useful meta description length '+route);
 assert.ok(readMeta(html,'robots').startsWith('index,follow'),'Indexable page '+route);
 assert.equal(readMeta(html,'og:title'),title,'Open Graph title '+route);
 assert.equal(readMeta(html,'twitter:title'),title,'Twitter title '+route);
 assert.equal(readMeta(html,'og:description'),desc,'Open Graph description '+route);
 assert.equal(readMeta(html,'twitter:description'),desc,'Twitter description '+route);
 assert.equal(readMeta(html,'og:url'),'https://gaeo.ru'+route,'Open Graph URL '+route);
 assert.equal(readMeta(html,'twitter:card'),'summary_large_image','Social preview format '+route);
 assert.equal(readMeta(html,'twitter:image'),readMeta(html,'og:image'),'Social image consistency '+route);
 const image=readMeta(html,'og:image');
 assert.ok(image.startsWith('https://gaeo.ru/assets/')&&existsSync(resolve(root,new URL(image).pathname.slice(1))),'Social image exists '+route);
 assert.ok(readMeta(html,'og:image:alt').length>10,'Meaningful social image ALT '+route);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Self canonical '+route);
 assert.ok(html.includes('hreflang="ru"')&&html.includes('hreflang="en"')&&html.includes('hreflang="x-default"'),'All language links '+route);
 const graph=readGraph(html);
 const breadcrumb=graph.find(n=>n['@type']==='BreadcrumbList');
 assert.ok(breadcrumb,'Breadcrumb schema '+route);
 if(listing){
  const collection=graph.find(n=>n['@type']==='CollectionPage');
  const list=graph.find(n=>n['@type']==='ItemList');
  assert.equal(collection.name,h1s[0],'Catalog schema name '+route);
  assert.equal(collection.description,desc,'Catalog schema description '+route);
  assert.equal(list.name,h1s[0],'Catalog list schema name '+route);
  assert.equal(list.numberOfItems,7,'Catalog item count '+route);
  assert.equal((html.match(/<h2\b/g)||[]).length,2,'Two category H2 only '+route);
  assert.equal((html.match(/<h3\b/g)||[]).length,7,'Seven case H3 '+route);
  for(const item of list.itemListElement){
   const path=new URL(item.url).pathname;
   assert.ok(html.includes('href="'+path+'"'),'Visible case matches schema '+path);
   assert.ok(existsSync(resolve(root,path.slice(1),'index.html')),'Catalog links to built case '+path);
  }
  assert.equal(collection.hasPart.length,7,'Catalog collection membership '+route);
 }else{
  const article=graph.find(n=>n['@type']==='Article');
  const webPage=graph.find(n=>n['@type']==='WebPage');
  const faq=graph.find(n=>n['@type']==='FAQPage');
  assert.equal(article.headline,h1s[0],'Article headline matches H1 '+route);
  assert.equal(webPage.name,h1s[0],'WebPage name matches H1 '+route);
  assert.equal(article.description,desc,'Article description '+route);
  assert.equal(webPage.description,desc,'WebPage description '+route);
  assert.equal(breadcrumb.itemListElement.at(-1).name,h1s[0],'Breadcrumb name '+route);
  assert.equal(article.image,image,'Article image matches social preview '+route);
  assert.equal(readMeta(html,'article:published_time'),article.datePublished,'Publication date '+route);
  assert.equal(readMeta(html,'article:modified_time'),article.dateModified,'Modified date '+route);
  const headings=[...html.matchAll(/<h2\b[^>]*>([^<]+)<\/h2>/g)].map(m=>m[1]);
  assert.equal(headings.length,7,'Seven editorial sections '+route);
  assert.ok(!headings.some(x=>/границы доказанного|пределы кейса|evidence limits|verifiable public output|моя роль/i.test(x)),'No artificial editorial headings '+route);
  const visibleFaq=[...html.replace(/>\s+</g,'><').matchAll(/<details class="faq-item"><summary class="faq-q"><span>([^<]+)<\/span><span class="faq-toggle" aria-hidden="true">\+<\/span><\/summary><div class="faq-a">([\s\S]*?)<\/div><\/details>/g)];
  assert.equal(visibleFaq.length,3,'Three homepage-style FAQ rows '+route);
  assert.ok(html.includes('<div class="eyebrow">FAQ</div>'),'FAQ label like homepage '+route);
  assert.ok(html.includes('<div class="faq">'),'FAQ wrapper like homepage '+route);
  assert.deepEqual(faq.mainEntity.map(x=>x.name),visibleFaq.map(x=>x[1]),'FAQ schema equals visible questions '+route);
  assert.deepEqual(faq.mainEntity.map(x=>x.acceptedAnswer.text),visibleFaq.map(x=>x[2]),'FAQ answers equal schema '+route);
 }
}
for(const lang of ['ru','en']){
 const prefix=lang==='en'?'/en':'';
 caseSeoAudit(prefix+'/cases/',true);
 for(const slug of slugs)caseSeoAudit(prefix+'/cases/'+slug+'/');
}
console.log('CASE_SEO_QA=PASS; pages=8');

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
  const faqRoot=page.locator('.dev-case__chapter .faq');
  assert.equal(await faqRoot.locator('details.faq-item').count(),3,'Homepage FAQ structure '+route);
  assert.equal(await faqRoot.locator('.faq-q .faq-toggle').count(),3,'Homepage FAQ plus icons '+route);
  const faq=faqRoot.locator('details.faq-item').first();
  await faq.locator('.faq-q').click();
  assert.ok(await faq.evaluate(el=>el.open),'FAQ interaction '+route);
  assert.equal(await faq.locator('.faq-toggle').textContent(),'+','FAQ icon '+route);
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
