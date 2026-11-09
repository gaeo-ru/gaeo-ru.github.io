import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {phase3DCaseProof} from '../src/data/sector-case-proof-phase-3d.mjs';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {phase3CGuides} from '../src/data/sector-guides-phase-3c.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getPlan} from '../src/data/pricing.mjs';

const read=route=>readFileSync(resolve('dist',route.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
 .flatMap(x=>{const j=JSON.parse(x[1]);return j['@graph']||[j]});
const allMethods=[...phase3BMethods,...phase3CGuides];
assert.deepEqual(phase3DCaseProof.ids,[42,48,55,59]);
assert.equal(industrySpecializations.length,100,'All existing commercial specializations preserved');
assert.equal(phase3BMethods.length,4,'All 3B methods preserved');
assert.equal(phase3CGuides.length,4,'All 3C guides preserved');
assert.equal(phase3DCaseProof.ru.method.faq.length,5);
assert.equal(phase3DCaseProof.en.method.faq.length,5);
for(const lang of ['ru','en']){
 const en=lang==='en';
 const route=phase3DCaseProof.routes.method[lang];
 const other=phase3DCaseProof.routes.method[en?'ru':'en'];
 const html=read(route),c=phase3DCaseProof[lang].method;
 const url='https://gaeo.ru'+route,nodes=graph(html);
 assert.equal((html.match(/<h1\b/g)||[]).length,1,'One visible H1 '+route);
 assert.ok(html.includes('<html lang="'+lang+'">'),'Correct HTML language '+route);
 assert.ok(html.includes('<title>'+c.title+'</title>'),'Unique title '+route);
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'One canonical '+route);
 assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Self canonical '+route);
 assert.ok(html.includes('href="https://gaeo.ru'+other+'"'),'Mutual hreflang '+route);
 assert.equal((html.match(/<section class="industry-cluster-section">/g)||[]).length>=8,true,'Substantial independent analysis '+route);
 assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Five factual FAQ answers '+route);
 const faq=nodes.find(n=>n['@type']==='FAQPage');
 assert.ok(faq&&faq.mainEntity.length===5,'One correct FAQPage '+route);
 assert.deepEqual(faq.mainEntity.map(x=>x.name),c.faq.map(x=>x.q),'FAQ/schema parity '+route);
 assert.ok(nodes.some(n=>n['@type']==='CreativeWork'&&n['@id']===url+'#method'),'CreativeWork evidence schema '+route);
 assert.ok(html.includes('data-gaeo-intent="service"'),'Real shared enquiry path '+route);
 assert.ok(html.includes('+5/+10/+15'),'Unchanged canonical guarantee terms '+route);
 for(const id of phase3DCaseProof.ids){
  const service=industrySpecializations.find(s=>s.id===id);
  assert.ok(service,'Service exists '+id);
  assert.ok(html.includes('href="'+service.routes[lang]+'"'),'Direct relevant service link '+id);
  assert.ok(html.includes('href="'+(en?'/en/pricing/':'/tarify/')+'#industry-'+String(id).padStart(3,'0')+'"'),'Catalogue ID '+id);
  assert.ok(service.methods[lang].includes(route),'Data backlink '+id);
  assert.ok(read(service.routes[lang]).includes('href="'+route+'"'),'Rendered service backlink '+id);
 }
 for(const g of allMethods){
  assert.ok(html.includes('href="'+g.routes.method[lang]+'"'),'Existing method or guide linked '+g.key);
  assert.ok(read(g.routes.method[lang]).includes('href="'+route+'"'),'Existing material backlink '+g.key);
 }
 for(const plan of ['geo','content','guarantee'])
  assert.ok(html.includes('href="'+getPlan(plan,lang).href+'"'),'Canonical plan '+plan+' '+route);
 for(const source of phase3DCaseProof.sources)
  assert.ok(html.includes('href="'+source.url+'" target="_blank" rel="noopener"'),'Verified primary source '+route);
 assert.ok(!/STEELMETRIXX|Импортекс|Logistic company 765|личный пациент|patient record from client/i.test(html),'No confidential client information '+route);
 for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g))
  if(m[1].endsWith('/'))assert.ok(existsSync(resolve('dist',m[1].slice(1),'index.html')),'Broken local link '+route+' -> '+m[1]);
 const directory=en?'/en/strategies/':'/strategies/',index=read(directory);
 assert.ok(index.includes('href="'+route+'"'),'Visible directory link '+route);
 const list=graph(index).find(x=>x['@type']==='ItemList'&&x['@id']==='https://gaeo.ru'+directory+'#items');
 const visible=(index.match(/<article class="list-card">/g)||[]).length;
 assert.ok(visible>=22,'Original 22 strategy entries preserved after subsequent batches '+directory);
 assert.equal(list?.numberOfItems,visible,'Structured item count '+directory);
 assert.equal(list?.itemListElement?.length,visible,'Structured items '+directory);
 assert.equal(new Set(list.itemListElement.map(x=>x.url)).size,visible,'Unique structured links '+directory);
 assert.ok(list.itemListElement.some(x=>x.url===url),'New URL in schema '+route);
}
if(process.argv.includes('--static')){console.log('Phase 3D static PASS: 2 original pages, 8 methodological and 8 commercial backlinks, RU/EN 22-entry directories, BMR and privacy safeguards');process.exit(0);}
const base=process.env.GAEO_QA_BASE_URL||'http://127.0.0.1:4385';
const server=process.env.GAEO_QA_BASE_URL?null:spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4385'],{stdio:'ignore'});
let browser;const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
 let ready=false;
 for(let i=0;i<55;i++){try{const r=await fetch(base+'/strategies/');if(r.ok){ready=true;break}}catch{}await sleep(400)}
 assert.ok(ready,'Preview / public HTTP reachable '+base);
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-industry',{recursive:true});
 const routes=[phase3DCaseProof.routes.method.ru,phase3DCaseProof.routes.method.en,'/strategies/','/en/strategies/'];
 for(const route of routes)for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:860},deviceScaleFactor:1});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
  assert.equal(response?.status(),200,'HTTP 200 '+route);
  await page.locator('main h1').first().waitFor({state:'visible'});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
  assert.equal(overflow,false,'No horizontal overflow '+route+' '+width);
  if(route.includes('case-proof')){
   assert.equal(await page.locator('main h1').count(),1,'Single H1 '+route);
   assert.equal(await page.locator('#faq details').count(),5,'Five visible FAQ '+route);
   await page.locator('#faq details summary').first().click();
   assert.ok(await page.locator('#faq details').first().evaluate(x=>x.open),'FAQ toggles '+route);
   if(width===390){
    await page.locator('main [data-gaeo-intent="service"]').first().click();
    await page.locator('[role="dialog"]').waitFor({state:'visible'});
    await page.locator('.gaeo-modal-close').click();
   }
  }else assert.equal(await page.locator('main .list-card').count(),22,'Directory listing '+route);
  if(width===320)await page.screenshot({path:'visual-industry/3d-'+route.split('/').filter(Boolean).join('-')+'-320.png',fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[],'No JS errors '+route+' '+width);
  await page.close();
 }
 console.log('Phase 3D browser PASS: 2 guides + 2 directories at 1440/390/320; FAQ, enquiry, links, responsive layout; '+(server?'local build':'public origin'));
}finally{await browser?.close();server?.kill('SIGTERM')}
