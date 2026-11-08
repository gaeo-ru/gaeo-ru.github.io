import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getPlan} from '../src/data/pricing.mjs';
const read=route=>readFileSync(resolve('dist',route.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
const urls=[];
assert.deepEqual(phase3BMethods.flatMap(x=>x.ids),[42,48,55,59]);
assert.equal(industrySpecializations.length,100,'No duplicate or missing commercial specializations');
for(const entry of phase3BMethods){
 const service=industrySpecializations.find(x=>x.id===entry.ids[0]);
 assert.ok(service,'Existing commercial page');
 for(const lang of ['ru','en']){
  const route=entry.routes.method[lang],other=entry.routes.method[lang==='ru'?'en':'ru'];
  const html=read(route),data=entry[lang].method,nodes=graph(html),url='https://gaeo.ru'+route;
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'Single H1 '+route);
  assert.equal((html.match(/<main\b/g)||[]).length,1,'Single main '+route);
  assert.ok(html.includes('<html lang="'+lang+'"'),'Language '+route);
  assert.ok(html.includes('<title>'+data.title+'</title>'),'Title '+route);
  assert.equal((html.match(/rel="canonical"/g)||[]).length,1,'One canonical '+route);
  assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Self canonical '+route);
  assert.ok(html.includes('href="https://gaeo.ru'+other+'"'),'Language alternate '+route);
  assert.ok(html.includes('href="'+service.routes[lang]+'"'),'Existing commercial destination '+route);
  assert.ok(service.methods[lang].includes(route),'Data backlink '+route);
  assert.ok(read(service.routes[lang]).includes('href="'+route+'"'),'Rendered backlink '+route);
  assert.ok(read((lang==='en'?'/en':'')+'/strategies/').includes('href="'+route+'"'),'Index discovery '+route);
  assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Visible canonical FAQ '+route);
  assert.equal(nodes.filter(n=>n['@type']==='FAQPage').length,1,'Single FAQ graph '+route);
  assert.deepEqual(nodes.find(n=>n['@type']==='FAQPage').mainEntity.map(x=>x.name),data.faq.map(x=>x.q));
  assert.ok(nodes.some(n=>n['@type']==='CreativeWork'&&n['@id']===url+'#method'),'Method schema '+route);
  assert.ok(data.sections.length>=6,'Substantive distinct content '+route);
  assert.ok(html.includes('data-gaeo-intent="service"'),'Inquiry '+route);
  assert.ok(html.includes('+5/+10/+15'),'Contractual formula '+route);
  for(const id of ['geo','content','guarantee'])assert.ok(html.includes('href="'+getPlan(id,lang).href+'"'),'Canonical tariff '+route);
  for(const source of entry.sources)assert.ok(html.includes('href="'+source.url+'" target="_blank" rel="noopener"'),'Primary source '+route);
  assert.ok(!html.includes('ASTRO_INDUSTRY_SPECIALIZATION_SLOT'),'No unresolved slot '+route);
  for(const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
   const href=m[1];
   if(href.endsWith('/'))assert.ok(existsSync(resolve('dist',href.slice(1),'index.html')),'Internal destination '+href);
  }
  urls.push(route);
 }
}
assert.equal(new Set(urls).size,8);
if(process.argv.includes('--static')){console.log('3B static PASS: 8 pages, 8 service backlinks, sources and metadata');process.exit(0);}
const base=process.env.GAEO_QA_BASE_URL||'http://127.0.0.1:4383';
const external=Boolean(process.env.GAEO_QA_BASE_URL);
const server=external?null:spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4383'],{stdio:'ignore'});
let browser;
try{
 let ready=false;
 for(let i=0;i<60;i++){try{if((await fetch(base+urls[0])).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,400));}
 assert.ok(ready,'Preview unavailable');
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-industry',{recursive:true});
 for(const route of urls)for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  assert.equal((await page.goto(base+route,{waitUntil:'domcontentloaded'}))?.status(),200);
  assert.equal(await page.locator('main h1').count(),1);
  await page.locator('main #faq details').first().locator('summary').click();
  assert.equal(await page.locator('main #faq details').first().getAttribute('open'),'');
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Overflow '+route+' '+width);
  const broken=await page.locator('main img').evaluateAll(images=>images.filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src));
  assert.deepEqual(broken,[],'Broken content image '+route);
  if(width===390){
   await page.locator('main .industry-actions [data-gaeo-intent="service"]').click();
   await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:7000});
   await page.locator('.gaeo-modal-close').click();
  }
  if(width!==1440)await page.screenshot({path:'visual-industry/3b-'+route.split('/').filter(Boolean).join('-')+'-'+width+'.png',fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[],'Runtime errors '+route);
  await page.close();
 }
 console.log('3B browser PASS: 8 × 1440/390/320, FAQ, inquiry, internal links and no overflow; '+(external?'public origin':'local production build'));
}finally{await browser?.close();server?.kill('SIGTERM');}
