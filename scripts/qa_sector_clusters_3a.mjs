import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
import {phase3AClusters} from '../src/data/industry-clusters-phase-3a.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getPlan} from '../src/data/pricing.mjs';

const read = route => readFileSync(resolve('dist',route.slice(1),'index.html'),'utf8');
const graph = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => {const node=JSON.parse(m[1]);return node['@graph']||[node]});
const urls=[];
for(const cluster of phase3AClusters){
 assert.ok(cluster.ids.length>=5,'GEO cluster must have substantial specializations');
 for(const id of cluster.ids){
  const s=industrySpecializations.find(x=>x.id===id);
  assert.ok(s,'Existing commercial specialization #'+id);
  for(const lang of ['ru','en']){
   assert.ok(s.methods[lang].includes(cluster.routes.hub[lang]),'Incoming industry hub link '+id+' '+lang);
   assert.ok(s.methods[lang].includes(cluster.routes.method[lang]),'Incoming method link '+id+' '+lang);
   const c=read(s.routes[lang]);
   assert.ok(c.includes('href="'+cluster.routes.hub[lang]+'"'),'Rendered specialization backlink to hub '+id+' '+lang);
   assert.ok(c.includes('href="'+cluster.routes.method[lang]+'"'),'Rendered specialization backlink to method '+id+' '+lang);
  }
 }
 for(const lang of ['ru','en']){
  const en=lang==='en';
  for(const kind of ['hub','method']){
   const path=cluster.routes[kind][lang],other=cluster.routes[kind][en?'ru':'en'];
   const html=read(path),url='https://gaeo.ru'+path,c=cluster[lang][kind],nodes=graph(html);
   assert.equal((html.match(/<main\b[^>]*>/g)||[]).length,1,'Single main '+path);
   assert.equal((html.match(/<h1\b/g)||[]).length,1,'Single H1 '+path);
   assert.ok(html.includes('<html lang="'+lang+'"'),'Correct language '+path);
   assert.ok(html.includes('<title>'+c.title+'</title>'),'SEO title '+path);
   assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Self canonical '+path);
   assert.ok(html.includes('hreflang="'+(en?'ru':'en')+'" href="https://gaeo.ru'+other+'"'),'Reciprocal hreflang '+path);
   assert.ok(html.includes('id="faq"')&&html.includes('id="sources"'),'Visible FAQ and sources '+path);
   assert.equal((html.match(/<details class="faq-item">/g)||[]).length,c.faq.length,'FAQ count '+path);
   assert.ok((html.match(/<section class="industry-cluster-section">/g)||[]).length>=6,'Individual content sections '+path);
   assert.ok(html.includes('href="'+cluster.routes[kind==='hub'?'method':'hub'][lang]+'"'),'Direct related method/hub '+path);
   assert.ok(html.includes('data-gaeo-intent="service"'),'Inquiry button '+path);
   assert.ok(html.includes('+5/+10/+15'),'Contractual BMR unchanged '+path);
   assert.ok(nodes.find(n=>n['@type']==='FAQPage')?.mainEntity.length===c.faq.length,'FAQ Schema '+path);
   assert.ok(nodes.find(n=>n['@type']==='WebPage'||n['@type']==='CollectionPage'),'Webpage schema '+path);
   for(const id of cluster.ids){
    const s=industrySpecializations.find(x=>x.id===id);
    assert.ok(html.includes('href="'+s.routes[lang]+'"'),'All specialization links '+path+' #'+id);
    assert.ok(html.includes('href="'+(en?'/en/pricing/':'/tarify/')+'#industry-'+String(id).padStart(3,'0')+'"'),'All catalogue entry links '+path+' #'+id);
   }
   for(const id of ['geo','content','guarantee'])assert.ok(html.includes('href="'+getPlan(id,lang).href+'"'),'All three canonical tariff links '+id+' '+path);
   if(kind==='hub'){
    const l=nodes.find(n=>n['@type']==='ItemList'&&n['@id']===url+'#catalog');
    assert.equal(l?.numberOfItems,cluster.ids.length,'ItemList number '+path);
    assert.equal(l?.itemListElement.length,cluster.ids.length,'ItemList entries '+path);
   }else assert.ok(nodes.find(n=>n['@type']==='CreativeWork'&&n['@id']===url+'#method'),'CreativeWork methodology '+path);
   const listPath=(en?'/en/':'/')+(kind==='hub'?'industries/':'strategies/');
   const listing=read(listPath);
   assert.ok(listing.includes('href="'+path+'"'),'Index links back '+path);
   assert.ok(nodes.find(n=>n['@type']==='FAQPage').mainEntity.every((q,i)=>q.name===c.faq[i].q),'FAQ structured text match '+path);
   urls.push(path);
  }
 }
}
for(const kind of ['hub','method'])for(const lang of ['ru','en']){
 const index=read((lang==='en'?'/en/':'/')+(kind==='hub'?'industries/':'strategies/'));
 const list=graph(index).find(x=>x['@type']==='ItemList');
 const expected=(index.match(/<article class="list-card">/g)||[]).length;
 assert.ok(expected>=(kind==='hub'?20:9),'No previous directory entries removed');
 assert.equal(list?.numberOfItems,expected,'Updated '+kind+' '+lang+' directory ItemList');
 assert.equal(list?.itemListElement?.length,expected,'Updated item count '+kind+' '+lang);
}
assert.equal(urls.length,8,'Four RU/EN page pairs');
if(process.argv.includes('--static')){console.log('Phase 3A static SEO/GEO audit PASS: 8 pages, 11 specialization backlinks, pricing and sources');process.exit(0);}
const base='http://127.0.0.1:4382';
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4382'],{stdio:'ignore'});
const pause=ms=>new Promise(res=>setTimeout(res,ms));
let browser;
try{
 let started=false;
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw Error('Preview exited');try{const r=await fetch(base+urls[0]);if(r.ok){started=true;break}}catch{}await pause(400)}
 assert.ok(started,'Preview unavailable');
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-industry',{recursive:true});
 for(const path of urls)for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(base+path,{waitUntil:'domcontentloaded',timeout:20000});
  assert.equal(response?.status(),200,'HTTP '+path);
  assert.equal(await page.locator('main h1').count(),1,'Browser H1 '+path);
  assert.ok(await page.locator('main .listing-grid .list-card').count()>=5,'Visible sector connections '+path);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
  assert.ok(overflow<=2,'Horizontal overflow '+path+' @ '+width+'px: '+overflow);
  assert.equal(errors.length,0,'JS runtime errors '+path+' '+errors.join('; '));
  if(width===390){
   await page.locator('main .industry-actions .button[data-gaeo-intent="service"]').click();
   await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:7000});
   await page.locator('.gaeo-modal-close').click();
   await page.screenshot({path:'visual-industry/sector-3a-'+path.split('/').filter(Boolean).join('-')+'-390.png',fullPage:true,animations:'disabled'});
  }
  await page.close();
 }
 console.log('Phase 3A browser QA PASS: 8 pages × 1440/390/320, dialogs, link graph and no overflow');
}finally{await browser?.close();server.kill('SIGTERM')}
