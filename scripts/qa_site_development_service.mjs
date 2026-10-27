import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';

const root=resolve(process.cwd(),'dist');
const routes=['/services/','/en/services/','/services/website-development/','/en/services/website-development/'];
const readPage=route=>{
 const p=resolve(root,route.slice(1),'index.html');
 assert.ok(existsSync(p),'Missing service route '+route);
 return readFileSync(p,'utf8');
};
const meta=(html,key)=>{
 const tags=[...html.matchAll(/<meta\b[^>]*>/g)].map(m=>m[0]).filter(t=>t.includes('name="'+key+'"')||t.includes('property="'+key+'"'));
 assert.equal(tags.length,1,'Exactly one meta '+key);
 return tags[0].match(/\bcontent="([^"]*)"/)?.[1]||'';
};
const heading=html=>(html.match(/<h1\b[^>]*>([^<]+)<\/h1>/)||[])[1]||'';
const graph=html=>JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]||'{}')['@graph']||[];
for(const route of routes){
 const html=readPage(route),isLanding=route.includes('website-development'),dir=route.includes('/en/')?'en':'ru';
 const h1=heading(html), title=(html.match(/<title>([^<]+)<\/title>/)||[])[1]||'';
 const desc=meta(html,'description'), nodes=graph(html);
 assert.ok(h1.length>24,'Descriptive H1 '+route);
 assert.ok(title.length>35&&title.length<=85,'Search title '+route);
 assert.ok(desc.length>=100&&desc.length<=190,'Meta description '+route);
 assert.equal(meta(html,'robots'),'index,follow,max-image-preview:large','Indexable '+route);
 assert.equal(meta(html,'og:title'),title,'OG title '+route);
 assert.equal(meta(html,'twitter:title'),title,'Twitter title '+route);
 assert.equal(meta(html,'og:description'),desc,'OG description '+route);
 assert.equal(meta(html,'twitter:description'),desc,'Twitter description '+route);
 assert.equal(meta(html,'og:url'),'https://gaeo.ru'+route,'OG url '+route);
 assert.equal(meta(html,'og:image'),meta(html,'twitter:image'),'Social image '+route);
 assert.equal(meta(html,'twitter:card'),'summary_large_image','Social card '+route);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'Exactly one H1 '+route);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'Canonical count '+route);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Self canonical '+route);
 const equivalents=[dir==='en'?route.replace('/en/','/'):route,dir==='ru'?'/en'+route:route];
 for(const [i,key] of ['ru','en'].entries())assert.ok(html.includes('hreflang="'+key+'" href="https://gaeo.ru'+equivalents[i]+'"'),'Hreflang '+key+' '+route);
 assert.ok(html.includes('hreflang="x-default" href="https://gaeo.ru'+equivalents[0]+'"'),'X default '+route);
 assert.ok(html.includes('href="mailto:ya@gaeo.ru"'),'Email '+route);
 assert.ok(html.includes('href="'+(dir==='en'?'/en/':'/')+'#lead"'),'Inquiry button '+route);
 assert.ok(html.includes('/assets/site-development.css'),'Scoped site-service styles '+route);
 assert.ok(html.includes('id="contact"'),'Shared light contact section '+route);
 assert.ok(!html.includes('site-service__cta'),'No bespoke dark CTA '+route);
 assert.ok(!html.includes('Расскажи,')&&!html.includes('Напиши, какой сайт'),'No unapproved copy '+route);
 const expectedCta=dir==='en'?'Get a mini-audit':'Получить мини-аудит';
 assert.ok(html.includes('href="'+(dir==='en'?'/en/':'/')+'#lead">'+expectedCta+'</a>'),'Canonical lead CTA '+route);
 const page=nodes.find(n=>n['@type']===(isLanding?'WebPage':'CollectionPage'));
 assert.ok(page,'Page JSON-LD type '+route);
 assert.equal(page.name,h1,'Schema title '+route);
 assert.equal(page.description,desc,'Schema description '+route);
 assert.equal(page.url,'https://gaeo.ru'+route,'Schema canonical '+route);
 assert.ok(nodes.some(n=>n['@type']==='BreadcrumbList'),'Breadcrumb schema '+route);
 if(isLanding){
  const service=nodes.find(n=>n['@type']==='Service');
  assert.ok(service&&service.provider['@id']==='https://gaeo.ru/#business','Service provider '+route);
  assert.equal(service.url,'https://gaeo.ru'+route,'Service URL '+route);
  const visible=[...html.replace(/>\s+</g,'><').matchAll(/<details class="faq-item"><summary class="faq-q"><span>([^<]+)<\/span><span class="faq-toggle" aria-hidden="true">\+<\/span><\/summary><div class="faq-a">([\s\S]*?)<\/div><\/details>/g)];
  assert.ok(html.includes('<div class="eyebrow">FAQ</div>'),'Homepage FAQ eyebrow '+route);
  assert.ok(html.includes('id="faq"><div class="eyebrow">FAQ</div>'),'FAQ section structure '+route);
  assert.ok(!html.includes('site-service__faq'),'Remove bespoke FAQ component '+route);
  const faq=nodes.find(n=>n['@type']==='FAQPage');
  assert.equal(visible.length,5,'Five visible FAQs '+route);
  assert.deepEqual(faq?.mainEntity?.map(n=>n.name),visible.map(x=>x[1]),'FAQ/schema question parity '+route);
  assert.deepEqual(faq?.mainEntity?.map(n=>n.acceptedAnswer.text),visible.map(x=>x[2]),'FAQ/schema answer parity '+route);
  for(const slug of ['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours']){
   const link=(dir==='en'?'/en':'')+'/cases/'+slug+'/';
   assert.ok(html.includes('href="'+link+'"'),'Missing evidence case link '+link);
   assert.ok(existsSync(resolve(root,link.slice(1),'index.html')),'Case does not exist '+link);
  }
  for(const anchor of ['when','included','process','cases','cost','faq'])assert.ok(html.includes('id="'+anchor+'"'),'Service anchor '+anchor);
 }else{
  const list=nodes.find(n=>n['@type']==='ItemList');
  assert.equal(list?.numberOfItems,2,'Two services '+route);
  assert.equal(list?.itemListElement?.length,2,'Two service list entries '+route);
  assert.ok(html.includes('href="'+route+'website-development/"'),'Development service link '+route);
 }
 console.log('SERVICE_SEO=PASS '+route);
}
const homeRu=readPage('/'),homeEn=readPage('/en/');
const casesRu=readPage('/cases/'),casesEn=readPage('/en/cases/');
assert.ok(homeRu.includes('href="/services/website-development/"'),'RU homepage links to service');
assert.ok(homeEn.includes('href="/en/services/website-development/"'),'EN homepage links to service');
assert.ok(casesRu.includes('href="/services/website-development/"'),'RU case index links to service');
assert.ok(casesEn.includes('href="/en/services/website-development/"'),'EN case index links to service');
for(const lang of ['ru','en']){
 const rootRoute=lang==='en'?'/en/services/':'/services/';
 const p=readPage(rootRoute);
 assert.ok(p.includes('href="'+(lang==='en'?'/en/services/website-development/':'/services/website-development/')+'"'),'Directory links development');
 const html=readPage(lang==='en'?'/en/':'/');
 assert.ok(html.includes('href="'+rootRoute+'"'),'Shared top navigation service link '+lang);
}
console.log('SERVICE_LINK_GRAPH=PASS');

const base='http://127.0.0.1:4344';
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4344'],{stdio:'ignore'});
let browser,tested=0;
try{
 let ready=false;
 for(let i=0;i<65;i++){
  if(server.exitCode!==null)break;
  try{if((await fetch(base+'/services/')).ok){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,300));
 }
 assert.ok(ready,'Astro preview not ready');
 browser=await chromium.launch({headless:true});
 for(const route of routes)for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:width===1440?900:760}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
  assert.equal(response?.status(),200,'HTTP '+route);
  assert.equal(await page.locator('h1').count(),1,'Visible H1 '+route);
  assert.ok(await page.locator('main').isVisible(),'Visible content '+route);
  let docWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
  if(docWidth>width+2){await page.waitForTimeout(230);docWidth=await page.evaluate(()=>document.documentElement.scrollWidth);}
  assert.ok(docWidth<=width+2,'Horizontal overflow '+route+' '+width+': '+docWidth);
  // Match homepage: neutral sections, separator lines, no decorative panel background.
  const flat=await page.locator('.site-service__card, .site-service__step, .site-service__case').evaluateAll(items=>
    items.map(el=>{const css=getComputedStyle(el);return {background:css.backgroundColor,radius:css.borderRadius,bottom:css.borderBottomWidth};}));
  assert.ok(flat.length>=2,'Comparable service sections exist '+route);
  for(const item of flat){
   assert.ok(item.background==='rgba(0, 0, 0, 0)'||item.background==='transparent','No added colored card fill '+route+' '+width+': '+item.background);
   assert.equal(item.radius,'0px','Homepage-style flat card '+route+' '+width);
   assert.equal(item.bottom,'1px','Homepage-style row divider '+route+' '+width);
  }
  const finalContact=page.locator('#contact');
  assert.equal(await finalContact.locator('a.button').count(),1,'One canonical contact button '+route);
  const finalBackground=await finalContact.evaluate(el=>getComputedStyle(el).backgroundColor);
  assert.ok(finalBackground==='rgba(0, 0, 0, 0)'||finalBackground==='transparent','No colored contact panel '+route+' '+width);
  if(route.includes('website-development')){
   assert.equal(await page.locator('details.faq-item').count(),5,'FAQ count '+route);
   const faqRoot=page.locator('#faq .faq');
   assert.equal(await faqRoot.locator('details.faq-item').count(),5,'Homepage FAQ wrappers '+route);
   assert.equal(await faqRoot.locator('.faq-q .faq-toggle').count(),5,'FAQ plus controls '+route);
   await faqRoot.locator('.faq-q').first().click();
   assert.ok(await faqRoot.locator('details.faq-item').first().evaluate(el=>el.open),'Native FAQ toggles '+route);
   assert.equal(await faqRoot.locator('.faq-q .faq-toggle').first().textContent(),'+','FAQ icon text '+route);
   assert.equal(await page.locator('.site-service__case').count(),3,'Three case links '+route);
  }else{
   assert.equal(await page.locator('.site-service__directory-cards article').count(),2,'Two services '+route);
  }
  if(width===390){
   const toggle=page.locator('.menu-toggle');
   await toggle.click();
   await page.locator('.mobile-menu.open').waitFor({state:'visible',timeout:3500});
   assert.ok(await page.locator('.mobile-menu').locator('a[href="'+(route.includes('/en/')?'/en/services/':'/services/')+'"]').count(),'Mobile Services navigation '+route);
   await toggle.click();
   await page.locator('.mobile-menu').waitFor({state:'hidden',timeout:3500});
   if(route.includes('website-development')){
    const contact=page.locator('#contact');
    assert.ok(await contact.isVisible(),'Final contact visible '+route);
    const background=await contact.evaluate(el=>getComputedStyle(el).backgroundColor);
    assert.ok(background==='rgba(0, 0, 0, 0)'||background==='transparent','Final contact has no custom fill '+route+': '+background);
    await contact.locator('.button[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6500});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Lead modal teardown '+route);
   }
  }
  assert.deepEqual(errors,[],'Browser JS errors '+route+' '+width);
  tested++;
  await page.close();
 }
} finally {if(browser)await browser.close();server.kill('SIGTERM');}
console.log('SERVICE_BROWSER_QA=PASS; cases='+tested);
