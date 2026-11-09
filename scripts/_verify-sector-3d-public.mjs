/**
 * Isolated one-time public acceptance for sector 3D.
 * Run only AFTER Pages build is confirmed; checks immutable bytes against main.
 * This is a validation artifact on the already-merged feature branch and
 * does not modify astro-source or deploy anything.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {phase3DCaseProof} from '../src/data/sector-case-proof-phase-3d.mjs';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {phase3CGuides} from '../src/data/sector-guides-phase-3c.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';

const source=process.env.GAEO_EXPECTED_SOURCE_COMMIT;
assert.match(source||'',/^[a-f0-9]{40}$/,'Pin expected production source SHA');
const root=resolve('published'),origin='https://gaeo.ru',output=resolve('visual-sector-3d');
fs.mkdirSync(output,{recursive:true});
const report={batch:'3D',expected_source_commit:source,origin,started_at:new Date().toISOString(),
 status:'running',pages:[],assets:[],form_submitted:false};
const save=()=>fs.writeFileSync(resolve(output,'report.json'),JSON.stringify(report,null,2)+'\n');
const hash=b=>createHash('sha256').update(b).digest('hex');
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function get(path){
 const r=await fetch(origin+path,{cache:'no-store',headers:{'Cache-Control':'no-cache'},
  signal:AbortSignal.timeout(35000)});
 assert.equal(r.status,200,'Public HTTPS '+path+' returned '+r.status);
 assert.equal(new URL(r.url).origin,origin,'Unexpected public origin for '+path);
 return Buffer.from(await r.arrayBuffer());
}
try{
 const manifest=JSON.parse(fs.readFileSync(resolve(root,'astro-release-manifest.json'),'utf8'));
 assert.equal(manifest.sourceCommit,source,'main source SHA differs from 3D release');
 report.source_commit=manifest.sourceCommit;report.released_at=manifest.releasedAt;
 report.manifest_files=manifest.files.length;
 report.main_html_count=manifest.files.filter(x=>x.kind==='html').length;
 const sitemap=fs.readFileSync(resolve(root,'sitemap.xml'),'utf8');
 report.sitemap_count=(sitemap.match(/<loc>/g)||[]).length;
 let ready=false;
 for(let n=0;n<15;n++){
  try{
   const live=JSON.parse((await get('/astro-release-manifest.json?qa3d='+n)).toString('utf8'));
   if(live.sourceCommit===source){ready=true;break;}
   console.log('CDN behind main:',live.sourceCommit,'expected',source);
  }catch(e){console.log('Public release not ready:',String(e.message).slice(0,150));}
  await pause(10000);
 }
 assert.ok(ready,'Public origin did not deploy expected 3D main release');
 const proof=['ru','en'].map(lang=>({type:'proof',lang,path:phase3DCaseProof.routes.method[lang]}));
 const methods=phase3BMethods.flatMap(entry=>['ru','en'].map(lang=>({type:'method',lang,entry,path:entry.routes.method[lang]})));
 const guides=phase3CGuides.flatMap(entry=>['ru','en'].map(lang=>({type:'guide',lang,entry,path:entry.routes.method[lang]})));
 const services=phase3BMethods.flatMap(entry=>['ru','en'].map(lang=>{
  const company=industrySpecializations.find(x=>x.id===entry.ids[0]);
  assert.ok(company,'Existing service '+entry.ids[0]);
  return {type:'service',lang,entry,path:company.routes[lang]};
 }));
 const indexes=['ru','en'].map(lang=>({type:'index',lang,path:lang==='ru'?'/strategies/':'/en/strategies/'}));
 const targets=[...proof,...methods,...guides,...services,...indexes];
 assert.equal(targets.length,28,'Expected 2+8+8+8+2 pages');
 const assets=new Set();
 for(const t of targets){
  const path=t.path.slice(1)+'index.html';
  assert.ok(manifest.files.some(f=>f.path===path&&f.kind==='html'),'Missing main manifest '+path);
  assert.ok(sitemap.includes('<loc>'+origin+t.path+'</loc>'),'Missing sitemap '+t.path);
  const publicBytes=await get(t.path),local=fs.readFileSync(resolve(root,path));
  assert.equal(hash(publicBytes),hash(local),'Live byte mismatch '+t.path);
  const html=publicBytes.toString('utf8'),url=origin+t.path;
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'One H1 '+t.path);
  assert.ok(html.includes('rel="canonical" href="'+url+'"'),'Canonical '+t.path);
  const proofHref=phase3DCaseProof.routes.method[t.lang];
  if(t.type==='proof'){
   assert.equal((html.match(/<details class="faq-item">/g)||[]).length,5,'5 FAQ '+t.path);
   for(const x of phase3BMethods){
    const s=industrySpecializations.find(c=>c.id===x.ids[0]);
    assert.ok(html.includes('href="'+s.routes[t.lang]+'"'),'Proof links to original service #'+x.ids[0]);
   }
   for(const x of [...phase3BMethods,...phase3CGuides])
    assert.ok(html.includes('href="'+x.routes.method[t.lang]+'"'),'Proof links to method '+x.key);
  }
  if(['method','guide','service'].includes(t.type))
   assert.ok(html.includes('href="'+proofHref+'"'),'Missing original article backlink '+t.path);
  if(t.type==='index'){
   assert.equal((html.match(/<article class="list-card">/g)||[]).length,22,'22 visible strategies '+t.path);
   assert.ok(html.includes('href="'+proofHref+'"'),'Directory does not link new guide');
   const schema=(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)||[])[1];
   assert.ok(schema,'Directory schema absent '+t.path);
   const graph=JSON.parse(schema)['@graph'];
   const list=graph.find(x=>x['@type']==='ItemList'&&x['@id']===url+'#items');
   assert.equal(list?.numberOfItems,22,'Directory JSON-LD count');
   assert.ok(list.itemListElement.some(x=>x.url===origin+proofHref),'3D item in structured listing');
  }
  for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)(?:[?#][^"]*)?"/g))assets.add(m[1]);
  report.pages.push({path:t.path,type:t.type,lang:t.lang,status:200,sitemap:true,
   sha256:hash(publicBytes),matches_main:true});
  console.log('3D_HTTP_OK',t.type,t.path);
 }
 for(const p of assets){
  const local=resolve(root,p.slice(1));if(!fs.existsSync(local))continue;
  const live=await get(p);
  assert.equal(hash(live),hash(fs.readFileSync(local)),'Asset differs from main '+p);
  report.assets.push({path:p,sha256:hash(live),matches_main:true});
 }
 report.status='pass';report.completed_at=new Date().toISOString();
 report.verified_moscow=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Moscow',
  dateStyle:'short',timeStyle:'medium'}).format(new Date());
 report.https_verified=report.pages.length;report.assets_verified=report.assets.length;
 save();
 console.log('3D_PUBLIC_HTTP_PASS',JSON.stringify({https:report.pages.length,
  assets:report.assets.length,source:source,sitemap:report.sitemap_count,moscow:report.verified_moscow}));
}catch(e){report.status='failed';report.error=String(e.stack||e);save();throw e;}
