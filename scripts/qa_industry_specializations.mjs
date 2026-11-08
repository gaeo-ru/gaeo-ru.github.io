import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getIndustryCatalog} from '../src/data/industry-catalog.mjs';
import {pricingHref} from '../src/data/pricing.mjs';
const read=path=>readFileSync(resolve('dist',path.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const d=JSON.parse(m[1]);return d['@graph']||[d];});
const urls=[];
for(const item of industrySpecializations){
 assert.ok(Number.isInteger(item.id)&&item.id>=1&&item.id<=107,'Specialization must reference permanent catalogue number');
 for(const lang of ['ru','en']){
  const path=item.routes[lang],html=read(path),url='https://gaeo.ru'+path,c=item.content[lang];
  const equivalent='https://gaeo.ru'+item.routes[lang==='en'?'ru':'en'];
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'One H1 '+path);
  assert.ok(html.includes('<html lang="'+lang+'"'),'Correct language '+path);
  assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Canonical '+path);
  assert.ok(html.includes('hreflang="'+(lang==='en'?'ru':'en')+'" href="'+equivalent+'"'),'Mutual hreflang '+path);
  assert.ok(html.includes('id="industry-pricing"'),'IndustryPricing '+path);
  assert.ok(html.includes('href="'+pricingHref(lang)+'#industry-'+String(item.id).padStart(3,'0')+'"'),'Catalogue backlink '+path);
  assert.equal((html.match(new RegExp('href="'+pricingHref(lang)+'#industry-'+String(item.id).padStart(3,'0')+'"','g'))||[]).length,1,'Exactly one category-specific catalogue link '+path);
  assert.equal((html.match(new RegExp('href="'+pricingHref(lang)+'#industry-catalog"','g'))||[]).length,0,'No redundant full-catalogue link '+path);
  assert.ok(html.includes('industry-specialization__catalog-button'),'Accessible category catalogue button '+path);
   assert.ok(html.includes('industry-pricing__quick-links'),'Separate audit links in shared price component '+path);
   assert.ok(html.includes('industry-specialization__related-links'),'Styled related navigation '+path);
   assert.ok(html.includes('/_astro/')&&html.includes('rel="stylesheet"'),
     'Astro component styles must have a visible page stylesheet reference '+path);
  assert.equal((html.match(/class="industry-specialization__catalog-label-line"/g)||[]).length,2,'Two intentional catalogue button lines '+path);
  assert.ok(html.includes(lang==='en'?'View this category':'Смотреть это направление'),'Correct first line of catalogue button '+path);
  assert.ok(html.includes(lang==='en'?'in the 107-service catalogue':'в каталоге 107 услуг'),'Correct second line of catalogue button '+path);
  assert.equal((html.match(/<tr\b/g)||[]).length,5,'Scenario table header and four rows '+path);
  assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Five visible FAQ '+path);
  const faq=graph(html).find(n=>n['@type']==='FAQPage');
  assert.deepEqual(faq?.mainEntity?.map(q=>q.name),c.faq.map(x=>x.question),'FAQ schema equals source '+path);
  const service=graph(html).find(n=>n['@type']==='Service'&&n['@id']===url+'#service');
  assert.ok(service&&service.offers?.length===3,'Three canonical offers '+path);
  assert.ok(html.includes('industry-'+String(item.id).padStart(3,'0')+'-960.webp'),'Correct industry image '+path);
  assert.ok(existsSync(resolve('dist/assets/tariffs/industries/industry-'+String(item.id).padStart(3,'0')+'-960.webp')),'Industry image missing');
  assert.ok(read(item.parent[lang]).includes('href="'+path+'"'),'Parent hub lacks incoming link '+path);
  assert.ok(read(pricingHref(lang)).includes('href="'+path+'"'),'Catalogue lacks specialization link '+path);
  assert.ok(read(pricingHref(lang)).includes('id="industry-'+String(item.id).padStart(3,'0')+'"'),'Permanent catalogue fragment missing '+path);
  assert.ok(html.includes('data-gaeo-intent="service"'),'Project inquiry intent '+path);
  urls.push({path,lang});
 }
}
// Batch 2AH: original finance-sector prompts, sources and bilingual content.
for(const id of [27,29]){
 const item=industrySpecializations.find(p=>p.id===id);
 assert.ok(item && item.group==='finance','2AH finance category '+id);
 assert.ok(item.sources.length>=3,'2AH official sources '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.problems.length,3,'2AH barriers '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AH buyer prompts '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AH GEO process '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AH visible FAQ '+id+' '+lang);
  assert.ok(c.lead.length>110 && c.proofIntro.length>160,'2AH individual sector analysis '+id+' '+lang);
 }
}
// 2AI: registered audit organisation content and index backlink must be distinct from general consulting.
const audit28=industrySpecializations.find(item=>item.id===28);
assert.ok(audit28&&audit28.group==='professional-services','2AI permanent audit ID');
assert.ok(audit28.sources.length>=3,'2AI professional and registry sources');
for(const lang of ['ru','en']){
 const c=audit28.content[lang];
 assert.equal(c.problems.length,3,'2AI problems '+lang);
 assert.equal(c.scenarios.length,4,'2AI buyer questions '+lang);
 assert.equal(c.steps.length,4,'2AI workflow '+lang);
 assert.equal(c.faq.length,5,'2AI FAQ '+lang);
 assert.ok(c.lead.length>100&&c.proofIntro.length>100,'2AI original copy '+lang);
 const index=read(lang==='ru'?'/industries/':'/en/industries/');
 const route=audit28.routes[lang];
 assert.ok(index.includes('href="'+route+'"'),'2AI visible industry link '+lang);
 const structured=graph(index).find(n=>n['@type']==='ItemList');
 assert.ok(structured?.itemListElement.some(n=>n.url==='https://gaeo.ru'+route),'2AI structured index link '+lang);
 assert.equal(structured.numberOfItems,structured.itemListElement.length,'Industry index schema count '+lang);
}
// Phase 2AE: distinct automotive buyers, documented evidence, immutable catalogue IDs.
for(const id of [77,78,79]){
 const item=industrySpecializations.find(x=>x.id===id);
 assert.ok(item&&item.group==='automotive','2AE automotive category '+id);
 assert.ok(item.sources.length>=3,'2AE primary-source depth '+id);
 assert.ok(item.parent.ru==='/tarify/'&&item.parent.en==='/en/pricing/','2AE catalogue parent '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.problems.length,3,'2AE problems '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AE scenarios '+id+' '+lang);
  assert.equal(c.checks.length,3,'2AE evidence checklist '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AE workflow '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AE FAQs '+id+' '+lang);
  assert.ok(c.lead.length>100&&c.proofIntro.length>100,'2AE substantial copy '+id+' '+lang);
  assert.ok(c.proofNote.toLowerCase().includes(lang==='ru'?'не заяв':'not')||c.proofNote.toLowerCase().includes('no measured'),'2AE evidence boundary '+id+' '+lang);
 }
}

// Phase 2AF: distinct, sensitive rehabilitation (#65) and counselling (#104) services.
for(const [id,group] of [[65,'healthcare'],[104,'local-services']]){
 const item=industrySpecializations.find(x=>x.id===id);
 assert.ok(item&&item.group===group,'2AF correct regulated/specialist group '+id);
 assert.ok(item.sources.length>=3,'2AF multiple primary sources '+id);
 assert.equal(item.parent.ru,'/tarify/','2AF canonical RU catalog '+id);
 assert.equal(item.parent.en,'/en/pricing/','2AF canonical EN catalog '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.problems.length,3,'2AF barriers '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AF demand intents '+id+' '+lang);
  assert.ok(c.scenarios.every(x=>x.length===3),'2AF table structure '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AF service process '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AF visible FAQ '+id+' '+lang);
  assert.ok(c.lead.length>100&&c.proofIntro.length>100,'2AF original evidence copy '+id+' '+lang);
 }
}

// Phase 2AG: leasing and payment-service sector evidence.
for(const id of [31,32]){
 const sector=industrySpecializations.find(x=>x.id===id);
 assert.ok(sector&&sector.group==='financial-services','2AG financial-services group '+id);
 assert.equal(sector.parent.ru,'/tarify/','2AG canonical catalogue parent RU '+id);
 assert.equal(sector.parent.en,'/en/pricing/','2AG canonical catalogue parent EN '+id);
 assert.ok(sector.sources.length>=3,'2AG regulatory sources '+id);
 for(const lang of ['ru','en']){
  const c=sector.content[lang];
  assert.equal(c.problems.length,3,'2AG buyer barriers '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AG buyer-intent scenarios '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AG process stages '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AG FAQ '+id+' '+lang);
  assert.ok(c.lead.length>130&&c.proofIntro.length>110,'2AG evidence-led copy '+id+' '+lang);
 }
}

// Batch 2AK completes the remaining three dedicated original bilingual pages (30, 75, 76).
for(const [id,group] of [[30,'finance'],[75,'automotive'],[76,'automotive']]){
 const item=industrySpecializations.find(x=>x.id===id);
 assert.ok(item&&item.group===group,'2AK correct permanent ID and sector '+id);
 assert.ok(item.sources.length>=3,'2AK primary sources '+id);
 assert.equal(item.parent.ru,'/tarify/','2AK RU catalog parent '+id);
 assert.equal(item.parent.en,'/en/pricing/','2AK EN catalog parent '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.heroPoints.length,3,'2AK hero facts '+id+' '+lang);
  assert.equal(c.problems.length,3,'2AK distinct barriers '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AK buyer intents '+id+' '+lang);
  assert.ok(c.scenarios.every(s=>s.length===3),'2AK table '+id+' '+lang);
  assert.equal(c.checks.length,3,'2AK evidence review '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AK process '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AK five FAQ '+id+' '+lang);
  assert.ok(c.lead.length>=150&&c.proofIntro.length>=170,'2AK substantial sector content '+id+' '+lang);
  assert.ok(JSON.stringify(c).includes('BMR'),'2AK BMR '+id+' '+lang);
  const html=read(lang==='ru'?'/industries/':'/en/industries/');
  assert.ok(html.includes('href="'+item.routes[lang]+'"'),'2AK industry listing backlink '+id+' '+lang);
  const list=graph(html).find(n=>n['@type']==='ItemList');
  assert.equal(list?.numberOfItems,20,'2AK + 3A industry directory structured items '+lang);
  assert.equal(list.itemListElement.length,20,'2AK + 3A industry directory JSON-LD coherence '+lang);
  assert.ok(list.itemListElement.some(n=>n.url==='https://gaeo.ru'+item.routes[lang]),'2AK industry directory JSON-LD link '+id+' '+lang);
 }
}
assert.equal(industrySpecializations.length,100,'100 distinct dedicated RU/EN specializations plus seven existing non-specialization pages');

const ids=industrySpecializations.map(x=>x.id);
assert.equal(new Set(ids).size,ids.length,'Duplicate catalogue specialization IDs');
for(const id of [2,3,4,5,6,8,20,21,22,23,24,25,26,33,34,35,36,37,38,40,41,58,66,81,82,83,84,85,86,87,88,89,90,91,95,96,97,98,99,10,12,13,42,43,44,45,46,48,7,9,11,55,56,57,92,93,94,49,50,51,52,53,14,15,16,106,107,103,105,17,18,59,60,61,68,69,70,71,72,73,74,100,101,102,62,63,64,28,77,78,79,65,104,31,32,30,75,76])assert.ok(ids.includes(id),'Published or prepared batch ID missing: '+id);
for(const lang of ['ru','en']){
 const hub=lang==='ru'?'/industries/international-logistics/':'/en/industries/international-logistics/';
 const equivalent=lang==='ru'?'/en/industries/international-logistics/':'/industries/international-logistics/';
 const html=read(hub);
 assert.equal((html.match(/<h1/g)||[]).length,1,'Logistics hub H1 '+hub);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+hub+'"'),'Logistics hub canonical '+hub);
 assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+equivalent+'"'),'Logistics hub hreflang '+hub);
 for(const slug of ['international-freight-forwarders','customs-representatives','import-trade-support']){
  assert.ok(html.includes('href="'+(lang==='ru'?'/industries/':'/en/industries/')+slug+'/"'),'Hub link '+slug+' '+lang);
 }
 assert.ok(read(lang==='ru'?'/industries/':'/en/industries/').includes('href="'+hub+'"'),'Main industries index link to logistics hub '+lang);
 const collection=graph(html).find(n=>n['@type']==='ItemList');
 assert.equal(collection?.numberOfItems,3,'Three sector choices in structured data '+hub);
}
// Phase 2AD: distinct medical specializations, original bilingual copy and sources.
for(const id of [62,63,64]){
 const item=industrySpecializations.find(x=>x.id===id);
 assert.ok(item&&item.group==='medical-care','2AD healthcare group '+id);
 assert.ok(item.sources.length>=3,'2AD legal sources '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.problems.length,3,'2AD problems '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'2AD patient questions '+id+' '+lang);
  assert.equal(c.steps.length,4,'2AD work steps '+id+' '+lang);
  assert.equal(c.faq.length,5,'2AD FAQ '+id+' '+lang);
  assert.ok(c.lead.length>100&&c.proofIntro.length>100,'2AD substantive copy '+id+' '+lang);
 }
}
// Phase 2AA: verifiable professional-services content, stable IDs 71/72/74.
for(const id of [71,72,74]){
 const item=industrySpecializations.find(x=>x.id===id);
 assert.ok(item&&item.group==='professional-services','2AA professional-services group '+id);
 assert.ok(item.sources.length>=2,'2AA sources '+id);
 for(const lang of ['ru','en']){
  const c=item.content[lang];
  assert.equal(c.problems.length,3,'Buying barriers '+id+' '+lang);
  assert.equal(c.scenarios.length,4,'Buyer questions '+id+' '+lang);
  assert.equal(c.steps.length,4,'Work phases '+id+' '+lang);
  assert.equal(c.faq.length,5,'FAQ count '+id+' '+lang);
  assert.ok(c.lead.length>100&&c.proofIntro.length>100,'Sector-specific copy '+id+' '+lang);
 }
}

for(const lang of ['ru','en']){
 const hub=lang==='ru'?'/industries/education-providers/':'/en/industries/education-providers/';
 const equivalent=lang==='ru'?'/en/industries/education-providers/':'/industries/education-providers/';
 const html=read(hub);
 assert.equal((html.match(/<h1/g)||[]).length,1,'2V education hub H1 '+hub);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+hub+'"'),'2V education hub canonical '+hub);
 assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+equivalent+'"'),'2V education hub hreflang '+hub);
 for(const slug of ['private-schools','online-schools-edtech','universities-business-schools','childrens-education-centres']){
  const href=(lang==='ru'?'/industries/':'/en/industries/')+slug+'/';
  assert.ok(html.includes('href="'+href+'"'),'2V education hub link '+href);
 }
 assert.ok(read(lang==='ru'?'/industries/':'/en/industries/').includes('href="'+hub+'"'),'2V education index link '+hub);
 const list=graph(html).find(x=>x['@type']==='ItemList');
 assert.equal(list?.numberOfItems,4,'2AB education hub ItemList '+hub);
}


// Batch 2W healthcare hub, internal routes and structured sector index.
for(const lang of ['ru','en']){
 const hub=lang==='ru'?'/industries/medical-care-providers/':'/en/industries/medical-care-providers/';
 const alternate=lang==='ru'?'/en/industries/medical-care-providers/':'/industries/medical-care-providers/';
 const html=read(hub);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'Medical hub one H1 '+hub);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+hub+'"'),'Medical hub canonical '+hub);
 assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+alternate+'"'),'Medical hub reciprocal hreflang '+hub);
 for(const slug of ['private-medical-clinics','dental-clinics','diagnostic-centres-medical-laboratories','ophthalmology-clinics','plastic-surgery-clinics','reproductive-medicine-clinics']){
  const route=(lang==='ru'?'/industries/':'/en/industries/')+slug+'/';
  assert.ok(html.includes('href="'+route+'"'),'Medical hub specialization link '+route);
 }
 assert.ok(read(lang==='ru'?'/industries/':'/en/industries/').includes('href="'+hub+'"'),'Industry index must link medical hub '+lang);
 const listing=graph(html).find(n=>n['@type']==='ItemList');
 assert.equal(listing?.numberOfItems,6,'Medical hub six sectors '+lang);
}

// Batch 2X local-services hub.
for(const lang of ['ru','en']){
 const hub=lang==='ru'?'/industries/local-services/':'/en/industries/local-services/';
 const eq=lang==='ru'?'/en/industries/local-services/':'/industries/local-services/';
 const html=read(hub);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'2X local H1 '+hub);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+hub+'"'),'2X local canonical '+hub);
 assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+eq+'"'),'2X local hreflang '+hub);
 for(const slug of ['beauty-salons-cosmetology-practices','cleaning-companies','home-appliance-repair-services'])
  assert.ok(html.includes('href="'+(lang==='ru'?'/industries/':'/en/industries/')+slug+'/"'),'2X child '+slug);
 assert.ok(read(lang==='ru'?'/industries/':'/en/industries/').includes('href="'+hub+'"'),'2X index link '+hub);
 assert.equal(graph(html).find(n=>n['@type']==='ItemList')?.numberOfItems,3,'2X ItemList '+hub);
}
assert.equal(urls.length,industrySpecializations.length*2,'Each specialization must have two RU/EN pages');
if(process.argv.includes('--static')){console.log('Industry specializations static QA PASS: '+urls.length+' pages, schema, images, prices and backlinks');process.exit(0);}
const base='http://127.0.0.1:4378';const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4378'],{stdio:'ignore'});
const pause=ms=>new Promise(res=>setTimeout(res,ms));let browser;
try{
 let running=false;for(let i=0;i<60;i++){if(server.exitCode!==null)throw Error('Preview exited');try{const r=await fetch(base+urls[0].path);if(r.ok){running=true;break;}}catch{}await pause(400)}
 assert.ok(running,'Preview never became ready');browser=await chromium.launch({headless:true});mkdirSync('visual-industry',{recursive:true});
 for(const row of urls)for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});const errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(base+row.path,{waitUntil:'domcontentloaded',timeout:25000});
  assert.equal(response?.status(),200,'HTTP '+row.path);
  assert.equal(await page.locator('main h1').count(),1,'H1 '+row.path);
  assert.equal(await page.locator('main details.faq-item').count(),5,'Visible FAQs '+row.path);
  assert.equal(await page.locator('main .industry-scenario-table tbody tr').count(),4,'Scenario rows '+row.path);
  assert.equal(await page.locator('main .industry-pricing-section [data-plan]').count(),3,'Canonical pricing '+row.path);
  assert.equal(await page.locator('main .industry-pricing__quick-links a').count(),3,'Three pricing choice links '+row.path);
  assert.equal(await page.locator('main .industry-specialization__related-links a').count(),2,'Two final related links '+row.path);
  const linkStyles=await page.evaluate(()=>{
    const nav=document.querySelector('.industry-pricing__quick-links');
    const anchor=nav?.querySelector('a');
    const related=document.querySelector('.industry-specialization__related-links');
    const relatedAnchor=related?.querySelector('a');
    const style=el=>{const cs=getComputedStyle(el);return {display:cs.display,border:cs.borderTopStyle,radius:parseFloat(cs.borderTopLeftRadius),gap:parseFloat(cs.columnGap||'0'),color:cs.color}};
    return {nav:style(nav),anchor:style(anchor),related:style(related),relatedAnchor:style(relatedAnchor)};
  });
  assert.equal(linkStyles.nav.display,'flex','Price navigation is styled as a flexible group '+row.path);
  assert.equal(linkStyles.related.display,'flex','Related navigation is styled as a flexible group '+row.path);
  for(const key of ['anchor','relatedAnchor']){
    assert.equal(linkStyles[key].display,'inline-flex','Styled pill link '+key+' '+row.path);
    assert.equal(linkStyles[key].border,'solid','Pill border '+key+' '+row.path);
    assert.ok(linkStyles[key].radius>=18,'Rounded pill corners '+key+' '+row.path);
  }
  const pricingGap=await page.evaluate(()=>{
    const a=document.querySelector('.industry-specialization__catalog-button').getBoundingClientRect();
    const b=document.querySelector('.industry-specialization__faq .industry-eyebrow').getBoundingClientRect();
    return Math.round(b.top-a.bottom);
  });
  assert.ok(pricingGap>=12&&pricingGap<=60,'Compact catalogue-to-FAQ spacing '+row.path+' '+width+': '+pricingGap);
  const catalogButton=page.locator('main .industry-specialization__catalog-button');
  assert.equal(await catalogButton.count(),1,'Exactly one industry catalogue button '+row.path);
  const catalogGeometry=await catalogButton.evaluate(el=>{
   const b=el.getBoundingClientRect();
   const a=el.querySelector('.industry-specialization__catalog-arrow').getBoundingClientRect();
   const lines=[...el.querySelectorAll('.industry-specialization__catalog-label-line')].map(node=>{
    const r=node.getBoundingClientRect();
    return {left:r.left,right:r.right,top:r.top,height:r.height,scrollWidth:node.scrollWidth,clientWidth:node.clientWidth};
   });
   return {left:b.left,right:b.right,arrowLeft:a.left,lines};
  });
  assert.equal(catalogGeometry.lines.length,2,'Two visible lines '+row.path+' '+width);
  assert.ok(catalogGeometry.lines[1].top>catalogGeometry.lines[0].top+4,'Explicit second line '+row.path+' '+width);
  for(const line of catalogGeometry.lines){
   assert.ok(line.left>=catalogGeometry.left-1&&line.right<catalogGeometry.arrowLeft+1,'Catalogue text must not collide with arrow '+row.path+' '+width+' '+JSON.stringify(catalogGeometry));
   assert.ok(line.scrollWidth<=line.clientWidth+1,'Catalogue text must stay on its own line '+row.path+' '+width);
  }
  const img=page.locator('main .industry-specialization__media img');
  assert.equal(await img.count(),1,'Hero image '+row.path);
  await img.evaluate(el=>el.decode());
  assert.ok(await img.evaluate(el=>el.naturalWidth>0),'Hero failed to decode '+row.path);
  assert.equal(await page.locator('.industry-specialization__media figcaption').count(),0,'No internal catalogue-number caption '+row.path);
  // Assert responsive geometry as well as overall scroll width. A narrow first
  // table cell passed overflow checks before this fix but was unreadable.
  const layout=await page.evaluate(()=>{
   const image=document.querySelector('.industry-specialization__media img');
   const question=document.querySelector('.industry-scenario-table tbody tr:first-child td:first-child');
   const questionRow=question.parentElement;
   const table=document.querySelector('.industry-scenario-table');
   const portrait=document.querySelector('.industry-about>img');
   const box=element=>{const r=element.getBoundingClientRect();return {left:r.left,width:r.width};};
   const media=image.closest('.industry-specialization__media');
   return {image:box(image),media:box(media),imageRight:image.getBoundingClientRect().right,imageFit:getComputedStyle(image).objectFit,
      naturalAspect:image.naturalWidth/image.naturalHeight,renderedAspect:image.clientWidth/image.clientHeight,
      question:box(question),questionRow:box(questionRow),tableDisplay:getComputedStyle(table).display,portrait:box(portrait),portraitFloat:getComputedStyle(portrait).float};
  });
  assert.equal(layout.imageFit,'contain','Full specialist image is never cropped by CSS '+row.path);
  assert.ok(Math.abs(layout.naturalAspect-layout.renderedAspect)<0.04,'Hero image keeps its natural aspect ratio '+row.path);
  assert.ok(layout.image.left-layout.media.left>=10,'Hero contains visible left-side inset '+row.path+' '+width);
  if(width<=390){
   assert.ok(layout.image.width>=width-28&&layout.image.left>=0&&layout.imageRight<=width+1,'Mobile image retains inset white safety margins '+row.path+' '+width+' '+JSON.stringify(layout));
   assert.ok(Math.abs(layout.question.width-layout.questionRow.width)<=4,'Buyer question must occupy the entire mobile card '+row.path+' '+width+' '+JSON.stringify(layout));
   assert.ok(Math.abs(layout.portrait.width-width/2)<=2&&layout.portraitFloat==='left','Expert photo takes half mobile viewport and floats left '+row.path+' '+width+' '+JSON.stringify(layout));
   assert.equal(layout.tableDisplay,'block','Mobile scenarios use stacked rows '+row.path+' '+width);
  }else{
   assert.equal(layout.tableDisplay,'table','Desktop preserves the real 3-column comparison '+row.path);
   assert.equal(layout.portraitFloat,'none','Desktop expert portrait retains the side-by-side grid '+row.path);
   assert.ok(layout.question.width>200,'Desktop first column remains readable '+row.path);
  }
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(overflow<=2,'Horizontal overflow '+row.path+' at '+width+': '+overflow);
  assert.equal(errors.length,0,'JS errors '+row.path+' '+errors.join('; '));
  if(width===390){await page.locator('.industry-specialization__hero .button[data-gaeo-intent="service"]').click();await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});await page.locator('.gaeo-modal-close').click();}
  await page.screenshot({path:'visual-industry/industry-specialization-'+row.path.split('/').filter(Boolean).join('-')+'-'+width+'.png',fullPage:true,animations:'disabled'});
  await page.close();
 }
 for(const lang of ['ru','en']){
  const path=lang==='ru'?'/industries/international-logistics/':'/en/industries/international-logistics/';
  for(const width of [1440,390,320]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:25000});
   assert.equal(response?.status(),200,'Logistics hub HTTP '+path);
   assert.equal(await page.locator('main h1').count(),1,'Logistics hub visible H1 '+path);
   assert.equal(await page.locator('main .industry-problem-grid article').count(),3,'Logistics hub three services '+path);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(overflow<=2,'Logistics hub horizontal overflow '+path+' at '+width+': '+overflow);
   assert.equal(errors.length,0,'Logistics hub JS errors '+path+': '+errors.join('; '));
   if(width===390){await page.locator('main .industry-actions .button[data-gaeo-intent="service"]').click();await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});await page.locator('.gaeo-modal-close').click();}
   await page.close();
  }
 }
 for(const lang of ['ru','en']){
  const path=lang==='ru'?'/industries/education-providers/':'/en/industries/education-providers/';
  for(const width of [1440,390,320]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(String(e)));
   const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:25000});
   assert.equal(response?.status(),200,'2V education hub HTTP '+path);
   assert.equal(await page.locator('main h1').count(),1,'2V education hub H1 '+path);
   assert.equal(await page.locator('main .industry-problem-grid article').count(),4,'2AB education hub sectors '+path);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(overflow<=2,'2V education hub overflow '+path+' width '+width+': '+overflow);
   assert.equal(errors.length,0,'2V education hub JS error '+path+': '+errors.join('; '));
   if(width===390){await page.locator('main .industry-actions .button[data-gaeo-intent="service"]').click();await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});await page.locator('.gaeo-modal-close').click();}
   await page.close();
  }
 }
 console.log('Industry specializations browser QA PASS: '+urls.length+' pages at 1440/390/320, hero images, FAQ, pricing, form and overflow');
}finally{await browser?.close();server.kill('SIGTERM')}
