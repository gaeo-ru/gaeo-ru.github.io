import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {phase3CGuides} from '../src/data/sector-guides-phase-3c.mjs';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getPlan} from '../src/data/pricing.mjs';

const read=route=>readFileSync(resolve('dist',route.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
 .flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
const routes=[];
assert.deepEqual(phase3CGuides.flatMap(x=>x.ids),[42,48,55,59],'Only four new editorial guides');
assert.equal(industrySpecializations.length,100,'No new commercial pages or duplicate IDs');
assert.equal(phase3BMethods.length,4,'Original 3B methods preserved');
for(const entry of phase3CGuides){
 const service=industrySpecializations.find(x=>x.id===entry.ids[0]);
 const method=phase3BMethods.find(x=>x.ids[0]===entry.ids[0]);
 assert.ok(service&&method,'Original landing and method must already exist');
 for(const lang of ['ru','en']){
  const route=entry.routes.method[lang],counterpart=entry.routes.method[lang==='ru'?'en':'ru'],c=entry[lang].method;
  const html=read(route),nodes=graph(html),url='https://gaeo.ru'+route;
  assert.ok((html.match(/<h1\b/g)||[]).length===1,'One H1 '+route);
  assert.ok(html.includes('<html lang="'+lang+'">'),'Lang '+route);
  assert.ok(html.includes('<title>'+c.title+'</title>'),'Title '+route);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'One canonical');
  assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Correct canonical '+route);
  assert.ok(html.includes('hreflang="'+(lang==='ru'?'en':'ru')+'" href="https://gaeo.ru'+counterpart+'"'),'Language alternate '+route);
  assert.ok(html.includes('href="'+method.routes.method[lang]+'"'),'3B method link '+route);
  assert.ok(html.includes('href="'+service.routes[lang]+'"'),'Original commercial landing '+route);
  assert.ok(html.includes('href="'+(lang==='ru'?'/tarify/':'/en/pricing/')+'#industry-'+String(entry.ids[0]).padStart(3,'0')+'"'),'Catalogue link '+route);
  assert.ok(read(service.routes[lang]).includes('href="'+route+'"'),'Original service backlink '+route);
  assert.ok(read(method.routes.method[lang]).includes('href="'+route+'"'),'Original 3B method backlink '+route);
  assert.ok(read(lang==='ru'?'/strategies/':'/en/strategies/').includes('href="'+route+'"'),'Directory link '+route);
  assert.ok(c.sections.length>=6&&c.faq.length===5,'Distinct sections and FAQs '+route);
  assert.ok((html.match(/<section class="industry-cluster-section">/g)||[]).length>=6,'Visible article sections '+route);
  assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Visible FAQs '+route);
  assert.ok(html.includes('data-gaeo-intent="service"'),'Working inquiry path '+route);
  assert.ok(html.includes('+5/+10/+15'),'BMR terms unchanged '+route);
  assert.ok(html.includes('href="'+(lang==='ru'?'/articles/geo-spetsialisty-110-otvetov-bmr-frs-2026/':'/en/articles/geo-experts-110-ai-responses-bmr-frs-2026/')+'"'),'Research link '+route);
  assert.ok(html.includes('href="'+(lang==='ru'?'/cases/methodlab-rost-neyrovidimosti-19-52-procenta/':'/en/cases/methodlab-ai-visibility-growth/')+'"'),'Explicitly unrelated measured case '+route);
  assert.ok(nodes.some(n=>n['@type']==='CreativeWork'&&n['@id']===url+'#method'),'Correct methodology schema '+route);
  const questions=nodes.filter(n=>n['@type']==='FAQPage');
  assert.equal(questions.length,1,'One FAQPage '+route);
  assert.deepEqual(questions[0].mainEntity.map(q=>q.name),c.faq.map(q=>q.q),'Visible/schema questions match');
  for(const plan of ['geo','content','guarantee'])assert.ok(html.includes('href="'+getPlan(plan,lang).href+'"'),'Canonical plan '+plan+' '+route);
  for(const source of entry.sources)assert.ok(html.includes('href="'+source.url+'" target="_blank" rel="noopener"'),'Regulatory source '+route);
  for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g))if(m[1].endsWith('/'))assert.ok(existsSync(resolve('dist',m[1].slice(1),'index.html')),'No broken internal href '+m[1]+' on '+route);
  routes.push(route);
 }
}
assert.equal(new Set(routes).size,8,'8 original RU/EN guides');
for(const lang of ['ru','en']){
 const route=lang==='ru'?'/strategies/':'/en/strategies/',html=read(route);
 const index=graph(html).find(x=>x['@type']==='ItemList'&&x['@id']==='https://gaeo.ru'+route+'#items');
 const visible=(html.match(/<article class="list-card">/g)||[]).length;
 assert.equal(visible,21,'Existing 17 entries plus 4 3C guides '+route);
 assert.equal(index?.numberOfItems,visible,'ItemList count '+route);
 assert.equal(index?.itemListElement.length,visible,'ItemList entries '+route);
 const all=index.itemListElement.map(x=>x.url);
 assert.equal(new Set(all).size,all.length,'No duplicate directory entries '+route);
 for(const e of phase3CGuides)assert.ok(all.includes('https://gaeo.ru'+e.routes.method[lang]),'Included in ItemList');
}
if(process.argv.includes('--static')){console.log('Phase 3C static PASS: 8 editorial pages, original 8 services/methods, 21-entry RU/EN directories, 5 FAQ each, pricing and sources');process.exit(0);}
const base=process.env.GAEO_QA_BASE_URL||'http://127.0.0.1:4384';
const server=process.env.GAEO_QA_BASE_URL?null:spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4384'],{stdio:'ignore'});
let browser;
try{
 let ready=false;for(let i=0;i<70;i++){try{if((await fetch(base+routes[0])).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,400));}
 assert.ok(ready,'Preview or public origin unavailable');
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-industry',{recursive:true});
 for(const route of [...routes,'/strategies/','/en/strategies/'])for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(base+route,{waitUntil:'domcontentloaded'}))?.status(),200,'HTTP '+route);
  await page.evaluate(async()=>{await document.fonts.ready;window.scrollTo({top:0,behavior:'instant'});});
  assert.equal(await page.locator('main h1').count(),1,'Single visual H1');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'No horizontal overflow '+route+' '+width);
  const broken=await page.locator('main img').evaluateAll(images=>images.filter(x=>x.complete&&x.naturalWidth===0).map(x=>x.src));
  assert.deepEqual(broken,[],'Images must decode '+route);
  if(route.includes('checklist')){
   assert.equal(await page.locator('main #faq details').count(),5,'FAQ visible');
   await page.locator('main #faq details summary').first().click();
   assert.equal(await page.locator('main #faq details').first().getAttribute('open'),'','FAQ works');
   if(width===390){
    await page.locator('main [data-gaeo-intent="service"]').first().click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:7000});
    await page.locator('.gaeo-modal-close').click();
   }
  }
  if(width===320)await page.screenshot({path:'visual-industry/3c-'+route.split('/').filter(Boolean).join('-')+'-320.png',fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[],'Runtime errors '+route+' '+width);
  await page.close();
 }
 console.log('Phase 3C browser PASS: 8 guides + 2 directories at 1440/390/320; FAQ, enquiry dialogs, images, no overflow; '+(server?'local release':'public origin'));
}finally{await browser?.close();server?.kill('SIGTERM');}
