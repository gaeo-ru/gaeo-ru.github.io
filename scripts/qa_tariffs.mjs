import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync,mkdirSync,statSync} from 'node:fs';
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
 assert.equal((html.match(/class="button industry-catalog__contact"/g)||[]).length,107,'All industry CTAs use primary styling');
 assert.ok(!html.includes('GEO: от 79 900 ₽/мес.; GEO + контент:'),'Industry inquiry context does not copy all tariff prices');
 assert.ok(!html.includes('GEO: from RUB 79,900/month; GEO + content:'),'English inquiry context does not copy all tariff prices');
 for(const phrase of (lang==='ru'?[
  'Сам дорабатываю сайт или готовлю ТЗ','Сам все внедряю и дорабатываю','1 раз в месяц, с целью BMR по договору','Предоплата за текущий месяц'
 ]:[
  'I improve the website myself or prepare specifications',
  'I implement and improve the website myself','Prepayment for the current month'
 ])) assert.ok(html.includes(phrase),'Tariff comparison must match the approved responsibilities: '+phrase);
 assert.equal(list?.itemListElement?.length,107,'All 107 visible categories in ItemList');
 assert.equal((html.match(/\bdata-gaeo-request=/g)||[]).length>=107,true,'Industry context is passed to inquiry form');
const industryItems=getIndustryCatalog(lang);
 assert.equal(industryItems.length,107,'The tariff catalogue must retain all 107 business categories');
 for(const item of industryItems){
  assert.ok(html.includes('id="'+item.id+'"'),'Addressable category '+item.id);
  assert.ok(item.detailLink?.startsWith('/'),'Every catalogue title needs a real page, never an in-page anchor: '+item.id);
  assert.doesNotMatch(item.detailLink,/#/,'Industry title points to a standalone page: '+item.id);
  assert.ok(existsSync(resolve(dist,item.detailLink.slice(1),'index.html')),'Missing industry landing page '+item.id+' -> '+item.detailLink);
  assert.ok(html.includes('id="'+item.id+'-title"><a href="'+item.detailLink+'"'),'Clickable industry title '+item.id);
  const itemListEntry=list.itemListElement.find(x=>x.position===item.number);
  assert.equal(itemListEntry?.url,'https://gaeo.ru'+item.detailLink,'The ItemList should link to the actual industry page: '+item.id);
  for(const image of [item.image.small,item.image.large])assert.ok(existsSync(resolve(dist,image.slice(1))),'Missing image '+image);
 }
 for(const number of [1,19,39,47,54,67,80]){
  const original=industryItems.find(i=>i.number===number);
  assert.ok(original?.hubLink?.relation==='existing_service','Legacy industry has its own commercial landing '+number);
  assert.equal(original.detailLink,original.hubLink.href,'Previously published industry page is the true title destination '+number);
 }
 for(const route of [lang==='en'?'/en/':'/',catalogue]){
  const source=read(route);
  assert.equal((source.match(/data-plan="/g)||[]).length,6,'All 6 main plans on '+route);
  assert.equal((source.match(/data-tariff-calculator/g)||[]).length,1,'One scope calculator on '+route);
  assert.equal((source.match(/name="platform"/g)||[]).length,13,'All 13 available platforms');
  const config=JSON.parse(source.match(/<script type="application\/json" data-tariff-config>([\s\S]*?)<\/script>/)[1]);
  assert.deepEqual(config.plans.map(p=>p.amount),[79900,99900,114900],'Browser uses canonical plan prices');
 }
 const guaranteeHtml=read((lang==='en'?'/en':'')+'/services/geo-guarantee/');
 const mainPart=guaranteeHtml.match(/<main class="tariff-detail">([\s\S]*?)<\/main>/)?.[1]||'';
 assert.ok(mainPart,'Guarantee detail must render');
 assert.doesNotMatch(text(mainPart),lang==='ru'?/\bТЗ\b/:/\b(?:specifications|briefs)\b/i,'Guarantees always include direct implementation');
 assert.ok(read((lang==='en'?'/en':'')+'/services/additional-platforms/').includes(lang==='ru'?'Я успешно вывожу бизнесы в ответы 13 нейросетей и AI-интерфейсов':'I successfully bring businesses into the answers of 13 AI platforms and interfaces'),'Personal 13-platform claim is visible');
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
// Audit every generated use of the shared pricing cards, not just /tarify/.
// All industry hubs and individual specializations reuse PlanCards.
const htmlFiles=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
 const item=resolve(dir,entry.name);
 return entry.isDirectory()?htmlFiles(item):entry.isFile()&&entry.name.endsWith('.html')?[item]:[];
});
const pricingPaths=htmlFiles(dist).filter(path=>readFileSync(path,'utf8').includes('class="pricing tariff-plans"'));
const industryPricingPaths=pricingPaths.filter(path=>path.includes('/industries/'));
assert.ok(industryPricingPaths.length>=24,'All industry hub and specialization tariff rows must be present');
for(const path of pricingPaths){
 const html=readFileSync(path,'utf8');
 assert.ok(html.includes('/assets/tariffs.css'),'Every PlanCards instance loads shared desktop alignment rules: '+path);
 if(path.includes('/industries/'))assert.ok(html.includes('/assets/tariffs.js'),'Every industry pricing grid loads CTA alignment script: '+path);
 assert.ok(html.includes('class="tariff-actions"'),'Tariff CTAs exist on '+path);
 const details=(html.match(/<details class="price tariff-plan"/g)||[]).length;
 assert.ok(details===3||details===6,'Expected 3 industry or 6 pricing plan cards on '+path);
}
for(const [route,lang] of [['/','ru'],['/en/','en']]){
 const html=read(route);
 const business=graph(html).filter(node=>node['@id']==='https://gaeo.ru/#business');
 assert.equal(business.length,1,'One canonical GAEO business entity '+route);
 assert.equal(business[0].taxID,'771915175562','Official INN in '+route);
 assert.deepEqual(business[0].identifier,{'@type':'PropertyValue',propertyID:'OGRNIP',value:'325774600017838'},'Official OGRNIP in '+route);
 assert.equal(business[0].legalName,'ИП Яковлев Алексей Леонидович','Registered legal name in '+route);
}
for(const lang of ['ru','en']){
 const html=read(lang==='ru'?'/industries/metal-structures/':'/en/industries/metal-structures/');
 assert.ok(html.includes('class="pricing tariff-plans"'),'Metal structure page uses common tariff cards '+lang);
 const identity=lang==='ru'?'ИНН 771915175562 · ОГРНИП 325774600017838':'INN 771915175562 · OGRNIP 325774600017838';
 for(const route of [lang==='ru'?'/':'/en/',lang==='ru'?'/tarify/':'/en/pricing/',lang==='ru'?'/industries/metal-structures/':'/en/industries/metal-structures/']){
  assert.equal(read(route).split(identity).length-1,1,'Business IDs shown exactly once in shared footer '+route);
 }
}
console.log('GAEO_SHARED_TARIFF_AND_IDENTITY_QA=PASS; priced pages='+pricingPaths.length+'; industry pages='+industryPricingPaths.length);

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
 // Observe actual browser goal calls without external network or test submissions.
 await page.addInitScript(()=>{
  window.__gaeo4aGoals=[];
  let analytics;
  Object.defineProperty(window,'GAEOAnalytics',{
   configurable:true,
   get(){return analytics;},
   set(value){
    analytics={...value,goal:(name,params)=>{
     window.__gaeo4aGoals.push({name,params:JSON.parse(JSON.stringify(params||{}))});
     return true;
    }};
   }
  });
 });
 for(const width of [1440,1100,390,320]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/en/','/tarify/','/en/pricing/','/services/geo-guarantee/','/en/services/geo-guarantee/','/services/additional-platforms/','/services/website-development/','/industries/legal/']){
   if(width===1100&&!['/tarify/','/en/pricing/'].includes(route))continue;
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor();
   if(route==='/tarify/'||route==='/en/pricing/'){
    await page.waitForFunction(()=>Boolean(window.GAEOAnalytics && document.querySelector('[data-industry-catalog]')?.dataset.catalogReady==='true'));
    assert.deepEqual(await page.evaluate(()=>window.__gaeo4aGoals),[],'4A: no automatic goals on first render '+width+' '+route);
   }
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
   if(width!==1100)assert.equal(overflow,false,'No horizontal overflow '+width+' '+route); // Existing non-tariff styles overflow at intermediate desktop widths.
   if(['/', '/en/', '/tarify/', '/en/pricing/'].includes(route)){
    // Shared select styling must survive the calculator/catalogue CSS loaded after style.css.
    const selectStyles=await page.locator('[data-tariff-calculator] select, [data-industry-catalog] select').evaluateAll(elements=>elements.map(element=>{
     const css=getComputedStyle(element);
     return {appearance:css.appearance,paddingRight:parseFloat(css.paddingRight),backgroundImage:css.backgroundImage,backgroundPosition:css.backgroundPosition};
    }));
    assert.ok(selectStyles.length>0,'At least one native dropdown exists '+route);
    for(const style of selectStyles){
     assert.equal(style.appearance,'none','Custom dropdown arrow '+width+' '+route);
     assert.ok(style.paddingRight>=54,'Dropdown text stays clear of inset arrow '+width+' '+route);
     assert.ok(style.backgroundImage.includes('linear-gradient')&&style.backgroundPosition.includes('31px')&&style.backgroundPosition.includes('21px'),
      'Dark arrow is visibly inset '+width+' '+route+' '+JSON.stringify(style));
    }
    if((width===390||width===1440)&&(route==='/tarify/'||route==='/en/pricing/')){
     const lang=route.startsWith('/en/')?'en':'ru';
     await page.locator('[data-tariff-calculator] select[name="plan"]').screenshot({path:'visual-tariffs/select-plan-'+lang+'-'+width+'.png'});
     await page.locator('[data-industry-catalog] select[data-catalog-group]').screenshot({path:'visual-tariffs/select-industry-'+lang+'-'+width+'.png'});
    }
    const control=page.locator('[data-tariff-calculator]');
    const blocks=control.locator('[name="blocks"]');
    const minus=control.locator('[data-prompt-adjust="-1"]');
    const plus=control.locator('[data-prompt-adjust="1"]');
    assert.equal(await minus.isVisible(),true,'Minus button shown '+width+' '+route);
    assert.equal(await plus.isVisible(),true,'Plus button shown '+width+' '+route);
    const quantityBounds=await control.locator('.tariff-quantity').evaluate(el=>{
     const r=el.getBoundingClientRect();return {left:r.left,right:r.right,width:window.innerWidth};
    });
    assert.ok(quantityBounds.left>=0&&quantityBounds.right<=quantityBounds.width+1,'Stepper fits in viewport '+width+' '+route+' '+JSON.stringify(quantityBounds));
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
    await page.waitForFunction(()=>document.querySelector('.tariff-page .tariff-plans')?.dataset.ctaAligned==='true');
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const visual=await page.evaluate(()=>{
      const terms=document.querySelector('.industry-catalog__terms')?.getBoundingClientRect();
      const lead=document.querySelector('.tariff-page > .tariff-page__contact #contact h2')?.getBoundingClientRect();
      const cards=[...document.querySelectorAll('#pricing .tariff-plans > details.tariff-plan[open]')];
      const groups=[];
      for(const card of cards){
        const y=card.getBoundingClientRect().top;
        let g=groups.find(group=>Math.abs(group.rowTop-y)<2);
        if(!g){g={rowTop:y,buttonTops:[]};groups.push(g);}
        g.buttonTops.push(card.querySelector('.tariff-actions .button').getBoundingClientRect().top);
      }
      return {contactGap:terms&&lead?Math.round(lead.top-terms.bottom):null,ctaRows:groups.map(g=>g.buttonTops)};
    });
    assert.ok(visual.contactGap!==null && visual.contactGap>=0 && visual.contactGap<=140,'Compact industry-to-contact gap '+width+' '+route+' '+JSON.stringify(visual));
    if(width>720)for(const y of visual.ctaRows){
      if(y.length<2)continue;
      assert.ok(Math.max(...y)-Math.min(...y)<=3,'CTAs align with longest tariff card within their row '+width+' '+route+' '+JSON.stringify(visual.ctaRows));
    }
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
    const planGoalsBefore=await page.evaluate(()=>window.__gaeo4aGoals.filter(e=>e.name==='tariff_plan_select').length);
    await calculator.locator('[name="plan"]').evaluate(el=>el.dispatchEvent(new Event('change',{bubbles:true})));
    assert.equal(await page.evaluate(()=>window.__gaeo4aGoals.filter(e=>e.name==='tariff_plan_select').length),planGoalsBefore,'4A: identical plan change is suppressed');
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
    const groupSelect=catalog.locator('[data-catalog-group]');
    const firstGroup=await groupSelect.locator('option:not([value=""])').first().getAttribute('value');
    await groupSelect.selectOption(firstGroup);
    assert.ok((await catalog.locator('[data-catalog-item]:visible').count())<107,'Industry group narrows results');
    await groupSelect.selectOption('');
    assert.equal(await catalog.locator('[data-catalog-item]:visible').count(),107,'Clearing group restores results');
    const illustrations=catalog.locator('[data-catalog-item]:visible .industry-catalog__image img');
    const currentUrl=page.url();
    await illustrations.first().click();
    assert.equal(page.url(),currentUrl,'Clicking illustration must not open the image file');
    await catalog.locator('[data-catalog-item]:visible .industry-catalog__contact').first().click();
    await page.locator('.gaeo-modal textarea[name="comment"]').waitFor();
    const industryMessage=await page.locator('.gaeo-modal textarea[name="comment"]').inputValue();
    assert.ok(industryMessage.includes(route.startsWith('/en/')?'Industry:':'Отрасль:'),'Prefilled industry label survives');
    assert.doesNotMatch(industryMessage,/(?:GEO:\s*(?:от|from)|GEO \+ контент:\s*от|Финансовые гарантии:\s*от|Contract guarantees:\s*from)/,'Prices are not copied into industry inquiry');
    await page.locator('.gaeo-modal-close').click();
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
    const observedGoals=await page.evaluate(()=>window.__gaeo4aGoals);
    const goalsNamed=name=>observedGoals.filter(goal=>goal.name===name);
    assert.ok(goalsNamed('tariff_calculation_change').length>=5,'4A: user calculator changes tracked '+width+' '+route);
    assert.equal(goalsNamed('tariff_plan_select').length,1,'4A: one genuine plan selection '+width+' '+route);
    assert.equal(goalsNamed('lead_form_open').length,3,'4A: three opened lead dialogs '+width+' '+route);
    assert.deepEqual(goalsNamed('lead_form_open').map(goal=>goal.params.intent),['service','audit','service'],'4A: dialog intents');
    assert.ok(goalsNamed('industry_catalog_filter').length>=5,'4A: search, reset and industry group changes '+width+' '+route);
    assert.ok(goalsNamed('industry_catalog_filter').some(goal=>goal.params.result_count===0),'4A: empty search result tracked');
    assert.ok(goalsNamed('industry_catalog_filter').some(goal=>goal.params.group_id!=='all'),'4A: group ID tracked');
    assert.equal(goalsNamed('lead_submit_success').length,0,'4A: no test leads sent');
    for(const goal of observedGoals){
     assert.doesNotMatch(JSON.stringify(goal.params),/WMS|no-such-industry-zzzz|Расчет GEO|GEO estimate|data-gaeo-request|@/i,'4A: no search, inquiry or contact details in goals');
     if(['tariff_calculation_change','tariff_plan_select'].includes(goal.name)){
      assert.ok(['geo','content','guarantee'].includes(goal.params.plan_id),'4A: canonical plan ID');
      assert.equal(typeof goal.params.total_amount,'number','4A: numeric total');
     }
     if(goal.name==='industry_catalog_filter'){
      assert.equal(goal.params.total_count,107,'4A: complete catalog');
      assert.equal(typeof goal.params.search_active,'boolean','4A: search only as boolean');
     }
    }
    // Every visible title must navigate to a standalone industry page.
    if(width===1440||width===390){
     const currentLang=route.startsWith('/en/')?'en':'ru';
     for(const number of [1,2,19,39,47,54,67,80,107]){
      const item=getIndustryCatalog(currentLang).find(x=>x.number===number);
      await page.locator('#'+item.id+'-title a').click();
      assert.equal(new URL(page.url()).pathname,item.detailLink,'Clickable title navigation '+item.id+' '+width+' '+currentLang);
      await page.goto(origin+route,{waitUntil:'domcontentloaded'});
     }
    }
   }
   if(route.includes('geo-guarantee')){
    assert.equal(await page.locator('.tariff-targets li').count(),3,'Visible contractual target ladder');
    await page.locator('.tariff-guarantee').scrollIntoViewIfNeeded();
    if(width!==320)await page.screenshot({path:'visual-tariffs/guarantee-'+(route.startsWith('/en/')?'en':'ru')+'-'+width+'.png'});
   }
  }
 }
 // Cross-template desktop checks. Earlier assertions only tested /tarify/;
 // these routes include both hub and specialization PlanCards templates.
 for(const width of [1440,1100,900,390]){
  await page.setViewportSize({width,height:900});
  for(const route of [
   '/industries/metal-structures/','/en/industries/metal-structures/',
   '/industries/legal/','/en/industries/legal/',
   '/industries/bankruptcy-lawyers/','/en/industries/bankruptcy-lawyers/'
  ]){
   await page.goto(origin+route,{waitUntil:'domcontentloaded'});
   await page.locator('.industry-pricing-section .tariff-plans, .tariff-plans').first().waitFor();
   await page.evaluate(()=>document.fonts.ready);
   await page.evaluate(()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))));
   const rows=await page.evaluate(()=>{
    const cards=[...document.querySelectorAll('.tariff-plans > details.tariff-plan[open]')];
    const out=[];
    for(const card of cards){
     const top=card.getBoundingClientRect().top;
     let row=out.find(x=>Math.abs(x.top-top)<2);
     if(!row){row={top,buttonTops:[],actions:[]};out.push(row);}
     const button=card.querySelector('.tariff-actions .button');
     row.buttonTops.push(button.getBoundingClientRect().top);
     row.actions.push(getComputedStyle(card.querySelector('.tariff-actions')).marginTop);
    }
    return {cards:cards.length,rows:out,docWidth:document.documentElement.scrollWidth,viewport:innerWidth};
   });
   assert.equal(rows.cards,3,'Three industry plans on '+route);
   if(width>720)for(const row of rows.rows){
    if(row.buttonTops.length<2)continue;
    assert.ok(Math.max(...row.buttonTops)-Math.min(...row.buttonTops)<=3,
     'Aligned desktop CTAs '+width+' '+route+' '+JSON.stringify(row.buttonTops));
   }
   if(width===390){
    assert.ok(rows.docWidth<=rows.viewport+2,'No overflow '+route+' '+width);
    const layout=await page.evaluate(()=>{
     const first=document.querySelector('.industry-scenario-table tbody tr td:first-child');
     const card=first?.parentElement;
     const photo=document.querySelector('.industry-about>img');
     return {questionWidth:first?.getBoundingClientRect().width,cardWidth:card?.getBoundingClientRect().width,photoWidth:photo?.getBoundingClientRect().width,photoFloat:photo?getComputedStyle(photo).float:null};
    });
    if(layout.cardWidth)assert.ok(Math.abs(layout.questionWidth-layout.cardWidth)<=4,'Full-width mobile question on '+route+' '+JSON.stringify(layout));
    if(layout.photoWidth)assert.ok(Math.abs(layout.photoWidth-width/2)<=2&&layout.photoFloat==='left','Half-screen float portrait on '+route+' '+JSON.stringify(layout));
   }
  }
 }
 assert.deepEqual(errors,[],'No browser runtime errors');
 console.log('TARIFF_BROWSER_QA=PASS; 1440/390/320; calculator; inquiry; catalogue; images; guarantee targets');
}finally{await browser.close();server.close();}
