import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {phase3EIntents} from '../src/data/sector-buyer-intents-phase-3e.mjs';
import {getPlan} from '../src/data/pricing.mjs';

const read=route=>readFileSync(resolve('dist',route.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
 .flatMap(m=>{const d=JSON.parse(m[1]);return d['@graph']||[d];});
const planIds=['geo','content','guarantee'];
assert.deepEqual(phase3EIntents.map(e=>e.id),[1,19,39],'3E complements exactly three existing broader catalogue IDs');
assert.equal(phase3EIntents.length,3);
const allPaths=[],commercialPaths=[],indexPages=['/strategies/','/en/strategies/'];
for(const entry of phase3EIntents){
 assert.equal(entry.sources.length>=2,true,'Public verifiable source set for '+entry.id);
 for(const lang of ['ru','en']){
  const route=entry.routes.method[lang],mirror=entry.routes.method[lang==='ru'?'en':'ru'];
  const target=entry.routes.hub[lang],c=entry[lang].method;
  const html=read(route),nodes=graph(html),url='https://gaeo.ru'+route;
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'Unique H1 '+route);
  assert.ok(html.includes('<html lang="'+lang+'">'),'Language '+route);
  assert.ok(html.includes('<title>'+c.title+'</title>'),'SEO title '+route);
  assert.ok(html.includes('name="description" content="'+c.description+'"'),'SEO description '+route);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'Single canonical '+route);
  assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Self canonical '+route);
  assert.ok(html.includes('href="https://gaeo.ru'+mirror+'"'),'Reciprocal hreflang '+route);
  assert.equal(c.sections.length,6,'Six independently researched sections '+route);
  assert.ok((html.match(/<section class="industry-cluster-section">/g)||[]).length>=6,'Rendered substantive sections '+route);
  assert.equal(c.faq.length,5,'Five authored questions '+route);
  assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Rendered factual FAQ '+route);
  const q=nodes.find(n=>n['@type']==='FAQPage');
  assert.deepEqual(q?.mainEntity?.map(x=>x.name),c.faq.map(x=>x.q),'FAQ schema visible parity '+route);
  assert.ok(nodes.some(n=>n['@type']==='CreativeWork'&&n['@id']===url+'#method'),'CreativeWork schema '+route);
  assert.ok(html.includes('data-gaeo-intent="service"'),'Existing enquiry mechanism '+route);
  assert.ok(html.includes('href="'+target+'"'),'Existing commercial landing, no duplicated service '+route);
  assert.ok(html.includes('href="'+(lang==='en'?'/en/pricing/':'/tarify/')+'#industry-'+String(entry.id).padStart(3,'0')+'"'),'Original 107-ID catalogue link '+route);
  for(const id of planIds)assert.ok(html.includes('href="'+getPlan(id,lang).href+'"'),'Canonical shared tariff '+id+' on '+route);
  for(const s of entry.sources)assert.ok(html.includes('href="'+s.url+'" target="_blank" rel="noopener"'),'Official independent source '+route);
  for(const m of entry.relatedMethods[lang])assert.ok(html.includes('href="'+m.href+'"'),'Existing editorial cross-link '+m.href);
  assert.equal(html.includes('рассчитанный_рост_нового_клиента'),false,'No invented case');
  const parent=read(target);
  assert.ok(parent.includes('href="'+route+'"'),'Existing broad commercial page must link back '+target);
  assert.ok(read(lang==='ru'?'/strategies/':'/en/strategies/').includes('href="'+route+'"'),'Index backlink '+route);
  for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g))
   if(m[1].endsWith('/'))assert.ok(existsSync(resolve('dist',m[1].slice(1),'index.html')),'Broken internal link '+route+' -> '+m[1]);
  allPaths.push(route);commercialPaths.push(target);
 }
}
assert.equal(new Set(allPaths).size,6,'Exactly six unique RU/EN page URLs');
for(const dir of indexPages){
 const html=read(dir),nodes=graph(html),index=nodes.find(n=>n['@type']==='ItemList'&&n['@id']==='https://gaeo.ru'+dir+'#items');
 const visible=(html.match(/<article class="list-card">/g)||[]).length;
 assert.equal(visible,25,'22 existing and three original 3E guides '+dir);
 assert.equal(index?.numberOfItems,25,'Structured count '+dir);
 assert.equal(index?.itemListElement?.length,25,'Structured URLs '+dir);
 assert.deepEqual(index.itemListElement.map(x=>x.position),Array.from({length:25},(_,i)=>i+1),'Consistent positions '+dir);
 assert.equal(new Set(index.itemListElement.map(x=>x.url)).size,25,'No duplicate indexed URLs '+dir);
 for(const e of phase3EIntents)assert.ok(index.itemListElement.some(x=>x.url==='https://gaeo.ru'+e.routes.method[dir.includes('/en/')?'en':'ru']),'New public guide listed '+dir+' '+e.id);
}
if(process.argv.includes('--static')){console.log('Phase 3E static PASS: six RU/EN editorial pages, three existing commercial parents, 25-entry strategy indexes, six guides FAQ/schema and canonical pricing');process.exit(0);}
const base=process.env.GAEO_QA_BASE_URL||'http://127.0.0.1:4386';
const server=process.env.GAEO_QA_BASE_URL?null:spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4386'],{stdio:'ignore'});
let browser;
try{
 let ready=false;
 for(let i=0;i<65;i++){try{if((await fetch(base+'/strategies/')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,400))}
 assert.ok(ready,'Preview/public origin reachable');
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-industry',{recursive:true});
 for(const route of [...allPaths,...commercialPaths,...indexPages]){
  for(const width of [1440,390,320]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
   assert.equal(response?.status(),200,'HTTP 200 '+route+' '+width);
   assert.ok(await page.locator('main h1').first().isVisible(),'Visible H1 '+route);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'No overflow '+route+' '+width);
   const broken=await page.locator('main img').evaluateAll(xs=>xs.filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src));
   assert.deepEqual(broken,[],'Image decode '+route+' '+width);
   if(allPaths.includes(route)){
    assert.equal(await page.locator('main #faq details').count(),5,'Five real FAQs '+route);
    await page.locator('main #faq details summary').first().click();
    assert.ok(await page.locator('main #faq details').first().evaluate(x=>x.open),'FAQ toggles '+route);
    if(width===390){
     await page.locator('main [data-gaeo-intent="service"]').first().click();
     await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:8000});
     await page.locator('.gaeo-modal-close').click();
    }
   }
   if(indexPages.includes(route))assert.equal(await page.locator('main .list-card').count(),25,'25 visible cards '+route);
   if(width===320&&allPaths.includes(route))
    await page.screenshot({path:'visual-industry/3e-'+route.split('/').filter(Boolean).join('-')+'-320.png',fullPage:true,animations:'disabled'});
   assert.deepEqual(errors,[],'No JS page errors '+route+' '+width);
   await page.close();
  }
 }
 console.log('Phase 3E browser PASS: 6 guides + 6 existing commercial pages + 2 indexes, 42 viewport checks (1440/390/320), FAQ, CTA, images and responsive layout; '+(server?'local build':'public origin'));
}finally{await browser?.close();server?.kill('SIGTERM')}
