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
const ids=industrySpecializations.map(x=>x.id);
assert.equal(new Set(ids).size,ids.length,'Duplicate catalogue specialization IDs');
for(const id of [2,3,4,5,6,8,20,21,22,23,24,25,26,33,34,35,36,37,38,40,41,58,66,81,82,83,84,85,86,87,88,89,90,91,95,96,97,98,99,10,12,13,42,43,44,45,46,48,7,9,11,55,56,57,92,93,94,49,50,51,52,53,14,15,16,59,60,61])assert.ok(ids.includes(id),'Published or prepared batch ID missing: '+id);
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
// Batch 2W healthcare hub, internal routes and structured sector index.
for(const lang of ['ru','en']){
 const hub=lang==='ru'?'/industries/medical-care-providers/':'/en/industries/medical-care-providers/';
 const alternate=lang==='ru'?'/en/industries/medical-care-providers/':'/industries/medical-care-providers/';
 const html=read(hub);
 assert.equal((html.match(/<h1\\b/g)||[]).length,1,'Medical hub one H1 '+hub);
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+hub+'"'),'Medical hub canonical '+hub);
 assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+alternate+'"'),'Medical hub reciprocal hreflang '+hub);
 for(const slug of ['private-medical-clinics','dental-clinics','diagnostic-centres-medical-laboratories']){
  const route=(lang==='ru'?'/industries/':'/en/industries/')+slug+'/';
  assert.ok(html.includes('href="'+route+'"'),'Medical hub specialization link '+route);
 }
 assert.ok(read(lang==='ru'?'/industries/':'/en/industries/').includes('href="'+hub+'"'),'Industry index must link medical hub '+lang);
 const listing=graph(html).find(n=>n['@type']==='ItemList');
 assert.equal(listing?.numberOfItems,3,'Medical hub three sectors '+lang);
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
  const img=page.locator('main .industry-specialization__media img');
  assert.equal(await img.count(),1,'Hero image '+row.path);
  await img.evaluate(el=>el.decode());
  assert.ok(await img.evaluate(el=>el.naturalWidth>0),'Hero failed to decode '+row.path);
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
 console.log('Industry specializations browser QA PASS: '+urls.length+' pages at 1440/390/320, hero images, FAQ, pricing, form and overflow');
}finally{await browser?.close();server.kill('SIGTERM')}
