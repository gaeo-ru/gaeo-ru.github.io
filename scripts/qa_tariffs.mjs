import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {createServer} from 'node:http';
import {once} from 'node:events';
import {allPlans,getPlan,pricingHref,quote,platforms,PRICES,GUARANTEE_TARGETS} from '../src/data/pricing.mjs';
import {serviceDetails} from '../src/data/service-detail-content.mjs';
import {getIndustryCatalog} from '../src/data/industry-catalog.mjs';

const dist=resolve('dist');
const read=route=>readFileSync(resolve(dist,route.replace(/^\//,''),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const d=JSON.parse(m[1]);return d['@graph']||[d];});
const decode=s=>s.replace(/&#39;|&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const text=s=>decode(s.replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim());
const types=node=>Array.isArray(node['@type'])?node['@type']:[node['@type']];
assert.deepEqual(GUARANTEE_TARGETS.map(x=>x.points),[5,10,15],'Cumulative contractual BMR targets');
const first5=platforms.slice(0,5).map(p=>p.id),first6=platforms.slice(0,6).map(p=>p.id);
assert.equal(quote('geo',first5,0).total,79900,'Five platforms are included');
assert.equal(quote('geo',first6,0).total,89900,'Only the sixth platform incurs a surcharge');
assert.equal(quote('geo',first5.slice(1).concat(platforms[6].id),0).total,79900,'Replacing one included platform costs no extra');
assert.equal(quote('content',platforms.map(p=>p.id),2).total,199900,'Combined platforms and prompt blocks');
assert.equal(quote('guarantee',platforms.slice(0,7).map(p=>p.id),3).total,164900,'Guarantee plan plus both extras');
assert.equal(quote('geo',first5.concat(first5,'unknown'),-1).total,79900,'No duplicate or unknown platform charges');
for(const id of ['free','audit','development','platform','prompts','additional-platforms','additional-prompts'])assert.throws(()=>quote(id,[],0),'One-time services and extras cannot be used as a base plan');

const allRoutes=[];
const nojsBlock='<!-- NOJS_FALLBACK_START -->\n'+readFileSync('templates/partials/nojs-fallback.html','utf8').trim()+'\n<!-- NOJS_FALLBACK_END -->';
for(const lang of ['ru','en']){
 const catalogue=pricingHref(lang),html=read(catalogue),nodes=graph(html),list=nodes.find(n=>n['@type']==='ItemList'&&n.numberOfItems===107);
 assert.equal((html.match(/\bdata-catalog-item\b/g)||[]).length,107,'Full industry catalogue must be server-rendered');
 assert.equal((html.match(/<div class="industry-catalog__image">/g)||[]).length,107,'All industry illustrations render without direct image links');
 assert.equal((html.match(/<a class="industry-catalog__image"/g)||[]).length,0,'No industry image links to raw files');
 for(const phrase of (lang==='ru'?[
  'Внедряю все сам, либо пишу ТЗ','Сам все внедряю и дорабатываю','Предоплата за текущий месяц'
 ]:[
  'I implement the website changes myself or provide a specification',
  'I implement and improve the website myself','Prepayment for the current month'
 ])) assert.ok(html.includes(phrase),'Tariff comparison must match the approved responsibilities: '+phrase);
 assert.equal(list?.itemListElement?.length,107,'All 107 visible categories in ItemList');
 assert.equal((html.match(/\bdata-gaeo-request=/g)||[]).length>=107,true,'Industry context is passed to inquiry form');
 for(const item of getIndustryCatalog(lang)){
  assert.ok(html.includes('id="'+item.id+'"'),'Addressable category '+item.id);
  if(item.detailLink)assert.ok(html.includes('href="'+item.detailLink+'"'),'Specialized category page '+item.id);
  else assert.ok(html.includes('href="'+catalogue+'#'+item.id+'"'),'Canonical category fragment');
  for(const image of [item.image.small,item.image.large])assert.ok(existsSync(resolve(dist,image.slice(1))),'Missing image '+image);
 }
 for(const route of [lang==='en'?'/en/':'/',catalogue]){
  const source=read(route);
  assert.equal((source.match(/data-plan="/g)||[]).length,6,'All 6 main plans on '+route);
  assert.equal((source.match(/data-tariff-calculator/g)||[]).length,1,'One scope calculator on '+route);
  assert.equal((source.match(/name="platform"/g)||[]).length,13,'All 13 available platforms');
  const config=JSON.parse(source.match(/<script type="application\/json" data-tariff-config>([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(config.plans.map(p=>p.amount),[79900,99900,114900],'Browser uses canonical plan prices');
 }
 for(const p of allPlans(lang)){
  const source=read(p.href),nodes=graph(source),offer=nodes.find(n=>types(n).includes('Offer')&&n['@id']==='https://gaeo.ru'+p.href+'#offer');
  assert.ok(offer,'Canonical offer '+p.href);
  assert.equal(offer.priceSpecification[p.from?'minPrice':'price'],p.amount,'Visible starting/exact price semantics '+p.href);
  assert.equal(offer.priceSpecification.priceCurrency,'RUB');
  if(p.kind==='monthly')assert.equal(offer.priceSpecification.referenceQuantity?.unitCode,'MON');
  else assert.ok(!offer.priceSpecification.referenceQuantity,'One-time service is not a monthly charge');
  if(serviceDetails[lang][p.slug]){
   const faq=nodes.find(n=>n['@type']==='FAQPage');
   const visible=[...source.matchAll(/<details class="faq-item">([\s\S]*?)<\/details>/g)];
   assert.equal(visible.length,faq.mainEntity.length,'Visible FAQ/schema count '+p.href);
   visible.forEach((v,i)=>{
    assert.equal(text(v[1].match(/<summary class="faq-q"><span>([\s\S]*?)<\/span>/)[1]),faq.mainEntity[i].name);
    assert.equal(text(v[1].match(/<div class="faq-a">([\s\S]*?)<\/div>/)[1]),faq.mainEntity[i].acceptedAnswer.text.replace(/\s+/g,' ').trim());
   });
  }
  allRoutes.push(p.href);
 }
 allRoutes.push(catalogue);
}
for(const route of allRoutes){
 const html=read(route),other=route==='/tarify/'?'/en/pricing/':route==='/en/pricing/'?'/tarify/':route.startsWith('/en/')?route.slice(3):'/en'+route;
 for(const marker of ['FONT_LOADING_START','FONT_LOADING_END','NOJS_FALLBACK_START','NOJS_FALLBACK_END'])assert.equal(html.split('<!-- '+marker+' -->').length-1,1,'Required production template marker '+marker+' '+route);
 assert.ok(html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1].includes(nojsBlock),'Canonical no-JS fallback in head '+route);
 for(const img of html.matchAll(/<img\b[^>]*class="tariff-detail__image"[^>]*>/g))assert.match(img[0],/\bloading="eager"/,'Above-the-fold service image has explicit eager loading '+route);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One H1 '+route);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'One canonical '+route);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Self canonical '+route);
 assert.ok(html.includes('hreflang="'+(route.startsWith('/en/')?'ru':'en')+'" href="https://gaeo.ru'+other+'"'),'Language equivalent '+route);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,'No duplicate IDs '+route);
 assert.ok(!html.includes('<!-- GAEO_TARIFF:SCHEMA -->'),'No unrendered tariff slots '+route);
 for(const m of html.matchAll(/<(?:a|img|script|link)\b[^>]*(?:href|src)="(\/[^"?#]*)[^">]*"/g)){
  const url=m[1],file=resolve(dist,url.slice(1),url.endsWith('/')?'index.html':'');assert.ok(existsSync(file),'Broken local resource '+url+' from '+route);
 }
}
console.log('TARIFF_STATIC_QA=PASS; 6 plans; 2 extras; 13 platforms; 107 categories; RU/EN; prices; schema; links');
if(process.argv.includes('--static'))process.exit(0);

const {chromium}=await import('playwright');
const server=createServer((req,res)=>{
 let path=resolve(dist,decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,''));
 if(!path.startsWith(dist+'/')&&path!==dist){res.writeHead(403);res.end();return;}
 if(existsSync(path)&&statSync(path).isDirectory())path=resolve(path,'index.html');
 if(!existsSync(path)){res.writeHead(404);res.end('Not found');return;}
 const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml'}[extname(path)]||'application/octet-stream';
 res.writeHead(200,{'Content-Type':mime});res.end(readFileSync(path));
});
server.listen(0,'127.0.0.1');await once(server,'listening');const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,
 ...(process.env.GAEO_CHROMIUM_EXECUTABLE?{executablePath:process.env.GAEO_CHROMIUM_EXECUTABLE}:{}),
 ...(process.env.GAEO_CHROMIUM_ARGS?{args:JSON.parse(process.env.GAEO_CHROMIUM_ARGS)}:{})
});
mkdirSync('visual-tariffs',{recursive:true});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 for(const width of [1440,1100,390,320]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/en/','/tarify/','/en/pricing/','/services/geo-guarantee/','/en/services/geo-guarantee/','/services/additional-platforms/','/services/website-development/','/industries/legal/']){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor();
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);assert.equal(overflow,false,'No horizontal overflow '+width+' '+route);
   if(['/', '/en/', '/tarify/', '/en/pricing/'].includes(route)){
    const control=page.locator('[data-tariff-calculator]');
    const blocks=control.locator('[name="blocks"]');
    const minus=control.locator('[data-prompt-adjust="-1"]');
    const plus=control.locator('[data-prompt-adjust="1"]');
    assert.equal(await minus.isVisible(),true,'Minus button shown '+width+' '+route);
    assert.equal(await plus.isVisible(),true,'Plus button shown '+width+' '+route);
    assert.equal(await minus.isDisabled(),true,'Minus disabled at zero');
    await plus.click();
    await plus.click();
    assert.equal(await blocks.inputValue(),'2','Plus buttons add 2 packs');
    assert.match(await control.locator('[data-prompt-price]').innerText(),/20[\s,\u00a0\u202f]?000/,'Pack clicks update amount');
    await minus.click();
    assert.equal(await blocks.inputValue(),'1','Minus button removes a pack');
    await blocks.fill('999');
    await blocks.press('Tab');
    assert.equal(await blocks.inputValue(),'100','Manual entry is capped at 100');
    assert.equal(await plus.isDisabled(),true,'Plus disabled at maximum');
    await blocks.fill('0');
    await blocks.press('Tab');
    assert.equal(await minus.isDisabled(),true,'Minus re-disabled at zero');
   }
   if(route==='/tarify/'||route==='/en/pricing/'){
    const gap=await page.evaluate(()=>{
     const rect=selector=>document.querySelector(selector)?.getBoundingClientRect();
     const links=rect('.tariff-page__intro .tariff-related');
     const overviewTitle=rect('.tariff-page > #pricing .eyebrow');
     const overviewLink=rect('.tariff-page > #pricing > .container > a.tariff-text-link');
     const calculatorTitle=rect('.tariff-page > #calculator .eyebrow');
     if(!links||!overviewTitle||!overviewLink||!calculatorTitle)return null;
     return {introToOverview:Math.round(overviewTitle.top-links.bottom),overviewToCalculator:Math.round(calculatorTitle.top-overviewLink.bottom)};
    });
    assert.ok(gap&&gap.introToOverview>=0&&gap.introToOverview<=120,'Compact intro-to-pricing spacing '+width+' '+route+' '+JSON.stringify(gap));
    assert.ok(gap.overviewToCalculator>=0&&gap.overviewToCalculator<=120,'Compact pricing-to-calculator spacing '+width+' '+route+' '+JSON.stringify(gap));
    if(route==='/tarify/'){
     assert.equal((await page.locator('#calculator > .container > .eyebrow').textContent())?.trim(),'Объем и стоимость работ');
     assert.equal((await page.locator('#calculator > .container > h2').textContent())?.trim(),'Калькулятор стоимости продвижения');
    }
    const calculator=page.locator('[data-tariff-calculator]');
    await calculator.locator('[name="platform"][value="gemini"]').check();
    await calculator.locator('[name="blocks"]').fill('2');
    await calculator.locator('[name="plan"]').selectOption('guarantee');
    assert.match(await calculator.locator('[data-total]').innerText(),/144[\s,\u00a0\u202f]?900/,'Interactive formula');
    await calculator.locator('[data-quote-inquiry]').click();
    await page.locator('.gaeo-modal textarea[name="comment"]').waitFor();
    assert.equal(await page.locator('.gaeo-modal-title').innerText(),route.startsWith('/en/')?'Discuss your project':'Обсудить проект','A paid scope opens the project inquiry');
    const message=await page.locator('.gaeo-modal textarea[name="comment"]').inputValue();assert.match(message,/144[\s,\u00a0\u202f]?900/,'Quote is transferred to the real inquiry form');
    await page.locator('.gaeo-modal-close').click();
    await page.locator('[data-plan="free"] .button').click();
    assert.equal(await page.locator('.gaeo-modal-title').innerText(),route.startsWith('/en/')?'Request a mini-audit':'Получить мини-аудит','The free audit retains its own inquiry title');
    await page.locator('.gaeo-modal-close').click();
    const catalog=page.locator('[data-industry-catalog]');
    await catalog.locator('[data-catalog-search]').fill('WMS');
    await page.waitForFunction(()=>document.querySelectorAll('[data-catalog-item]:not([hidden])').length===3);
    assert.equal(await catalog.locator('[data-catalog-item]:visible').count(),3,'WMS finds the relevant three categories');
    await catalog.locator('[data-catalog-search]').fill('no-such-industry-zzzz');
    await page.waitForFunction(()=>document.querySelectorAll('[data-catalog-item]:not([hidden])').length===0);
    assert.equal(await catalog.locator('[data-catalog-item]:visible').count(),0,'Empty search state');
    await catalog.locator('[data-catalog-empty] button[type="reset"]').click();
    assert.equal(await catalog.locator('[data-catalog-item]:visible').count(),107,'Reset restores all categories');
    const illustrations=catalog.locator('[data-catalog-item]:visible .industry-catalog__image img');
    const currentUrl=page.url();
    await illustrations.first().click();
    assert.equal(page.url(),currentUrl,'Clicking illustration must not open the image file');
    const examples=catalog.locator('[data-catalog-item]:visible .industry-catalog__examples');
    const rowSize=width>=1200?3:width>700?2:1;
    await examples.first().locator('summary').click();
    for(let i=0;i<Math.min(rowSize+1,107);i++)
     assert.equal(await examples.nth(i).evaluate(el=>el.open),i<rowSize,'Only the clicked visual row expands '+width+' index '+i);
    await examples.first().locator('summary').click();
    for(let i=0;i<rowSize;i++)
     assert.equal(await examples.nth(i).evaluate(el=>el.open),false,'Same-row accordions close together '+width+' index '+i);
    await catalog.locator('#industry-019 img').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>{const img=document.querySelector('#industry-019 img');return img.complete&&img.naturalWidth>0});
    if(width!==320)await page.screenshot({path:'visual-tariffs/catalog-'+(route.startsWith('/en/')?'en':'ru')+'-'+width+'.png'});
   }
   if(route.includes('geo-guarantee')){
    assert.equal(await page.locator('.tariff-targets li').count(),3,'Visible contractual target ladder');
    await page.locator('.tariff-guarantee').scrollIntoViewIfNeeded();
    if(width!==320)await page.screenshot({path:'visual-tariffs/guarantee-'+(route.startsWith('/en/')?'en':'ru')+'-'+width+'.png'});
   }
  }
 }
 assert.deepEqual(errors,[],'No browser runtime errors');
 console.log('TARIFF_BROWSER_QA=PASS; 1440/390/320; calculator; inquiry; catalogue; images; guarantee targets');
}finally{await browser.close();server.close();}
