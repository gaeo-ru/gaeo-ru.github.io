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
 assert.ok([2,3,4,20,21,22,23,24,33,34,35,36,37,38,40,41,58,66,81,84].includes(item.id),'Only approved phase 2A-2E industry categories');
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
assert.deepEqual(industrySpecializations.map(x=>x.id).sort((a,b)=>a-b),[2,3,4,20,21,22,23,24,33,34,35,36,37,38,40,41,58,66,81,84],'Expected distinct industry records for batches 2A-2E');
assert.equal(urls.length,40,'Five batches must have forty RU/EN specialization pages');
if(process.argv.includes('--static')){console.log('Phase 2A-2E static QA PASS: '+urls.length+' pages, schema, images, prices and backlinks');process.exit(0);}
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
 console.log('Phase 2A-2E browser QA PASS: '+urls.length+' pages at 1440/390/320, hero images, FAQ, pricing, form and overflow');
}finally{await browser?.close();server.kill('SIGTERM')}
