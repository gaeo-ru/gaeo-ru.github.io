import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {phase3CGuides} from '../src/data/sector-guides-phase-3c.mjs';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';

const expectedSource='0a34e8292235428b5b96175244bd4123113c6aac';
const root=resolve('published');
const publicOrigin='https://gaeo.ru';
const output=resolve('visual-sector-3c');
fs.mkdirSync(output,{recursive:true});
const report={batch:'3C',source_merge:expectedSource,origin:publicOrigin,started_at:new Date().toISOString(),status:'running',pages:[],assets:[],form_submitted:false};
const save=()=>fs.writeFileSync(resolve(output,'report.json'),JSON.stringify(report,null,2)+'\n');
const hash=b=>createHash('sha256').update(b).digest('hex');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function get(path){
 const response=await fetch(publicOrigin+path,{cache:'no-store',headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(30000)});
 assert.equal(response.status,200,'Public HTTPS '+path+' '+response.status);
 assert.equal(new URL(response.url).origin,publicOrigin,'Public origin '+path);
 return Buffer.from(await response.arrayBuffer());
}
try{
 const manifest=JSON.parse(fs.readFileSync(resolve(root,'astro-release-manifest.json'),'utf8'));
 assert.equal(manifest.sourceCommit,expectedSource,'Published main did not originate from accepted 3C merge');
 report.source_commit=manifest.sourceCommit;
 report.released_at=manifest.releasedAt;
 report.main_html_count=manifest.files.filter(f=>f.kind==='html').length;
 report.main_files_count=manifest.files.length;
 const sitemap=fs.readFileSync(resolve(root,'sitemap.xml'),'utf8');
 report.sitemap_count=(sitemap.match(/<loc>/g)||[]).length;
 let liveReady=false;
 for(let n=0;n<12;n++){
  try {
   const live=JSON.parse((await get('/astro-release-manifest.json?qa3c='+n)).toString('utf8'));
   if(live.sourceCommit===expectedSource){liveReady=true;break;}
   console.log('Public manifest lag',live.sourceCommit,'vs',expectedSource);
  }catch(e){console.log('Public manifest not ready',String(e.message).slice(0,200));}
  await pause(10000);
 }
 assert.ok(liveReady,'Public origin has not deployed exact 3C source commit');
 const guides=phase3CGuides.flatMap(entry=>['ru','en'].map(lang=>({path:entry.routes.method[lang],type:'guide',lang,entry})));
 const methods=phase3BMethods.flatMap(entry=>['ru','en'].map(lang=>({path:entry.routes.method[lang],type:'method',lang,entry})));
 const services=phase3BMethods.flatMap(entry=>['ru','en'].map(lang=>({path:industrySpecializations.find(s=>s.id===entry.ids[0]).routes[lang],type:'service',lang,entry})));
 const directories=['ru','en'].map(lang=>({path:lang==='ru'?'/strategies/':'/en/strategies/',type:'index',lang}));
 const targets=[...guides,...methods,...services,...directories];
 assert.equal(targets.length,26);
 const assets=new Set();
 for(const t of targets){
  const path=t.path.slice(1)+'index.html';
  assert.ok(manifest.files.some(f=>f.path===path&&f.kind==='html'),'Main manifest missing '+path);
  assert.ok(sitemap.includes('<loc>'+publicOrigin+t.path+'</loc>'),'Missing sitemap '+t.path);
  const publicBytes=await get(t.path);
  const mainBytes=fs.readFileSync(resolve(root,path));
  assert.equal(hash(publicBytes),hash(mainBytes),'Public HTML differs from published main '+t.path);
  const html=publicBytes.toString('utf8');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'Single H1 '+t.path);
  assert.ok(html.includes('rel="canonical" href="'+publicOrigin+t.path+'"'),'Canonical '+t.path);
  if(t.type==='guide') {
   assert.ok(html.includes('href="'+phase3BMethods.find(x=>x.ids[0]===t.entry.ids[0]).routes.method[t.lang]+'"'),'Guide backlink to 3B');
   assert.ok(html.includes('href="'+industrySpecializations.find(x=>x.id===t.entry.ids[0]).routes[t.lang]+'"'),'Guide backlink to original commercial');
   assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'Guide 5 FAQ');
  }else if(t.type==='method'){
   const guide=phase3CGuides.find(x=>x.ids[0]===t.entry.ids[0]);
   assert.ok(html.includes('href="'+guide.routes.method[t.lang]+'"'),'Original 3B method now links to 3C');
  }else if(t.type==='service'){
   const guide=phase3CGuides.find(x=>x.ids[0]===t.entry.ids[0]);
   assert.ok(html.includes('href="'+guide.routes.method[t.lang]+'"'),'Commercial landing links to guide');
  }else{
   for(const guide of phase3CGuides) assert.ok(html.includes('href="'+guide.routes.method[t.lang]+'"'),'Strategy index contains 3C');
   assert.equal((html.match(/<article class="list-card">/g)||[]).length,21,'All 21 strategy items');
  }
  for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)(?:[?#][^"]*)?"/g))assets.add(m[1]);
  report.pages.push({route:t.path,type:t.type,lang:t.lang,status:200,sha256:hash(publicBytes),matches_main:true,sitemap:true});
  console.log('3C_PUBLIC_HTML_PASS',t.type,t.path);
 }
 for(const path of assets){
  const local=resolve(root,path.slice(1));
  if(!fs.existsSync(local))continue;
  const publicBytes=await get(path);
  assert.equal(hash(publicBytes),hash(fs.readFileSync(local)),'Public resource differs from main '+path);
  report.assets.push({path,sha256:hash(publicBytes),matches_main:true});
 }
 report.status='pass';
 report.completed_at=new Date().toISOString();
 report.verified_moscow=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Moscow',dateStyle:'short',timeStyle:'medium'}).format(new Date());
 report.https_verified=report.pages.length;
 report.assets_verified=report.assets.length;
 save();
 console.log('3C_PUBLIC_HTTP_PASS',JSON.stringify({https:report.pages.length,assets:report.assets.length,sitemap:report.sitemap_count,source:expectedSource,verified_moscow:report.verified_moscow}));
}catch(e){report.status='failed';report.error=String(e.stack||e);save();throw e;}
