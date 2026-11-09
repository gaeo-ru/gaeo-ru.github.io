// Independent public HTTPS and Chromium acceptance for the existing GAEO phase 3A.
// Reads canonical source to discover its actual URLs. No POST requests, no edits,
// no client performance or licence claims. Published main is checked byte-for-byte.
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {phase3AClusters} from '../src/data/industry-clusters-phase-3a.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';

const origin=(process.env.GAEO_PUBLIC_ORIGIN||'https://gaeo.ru').replace(/\/$/,'');
const out=resolve('visual-sector-3a-live');
mkdirSync(out,{recursive:true});
const widths=[1440,390,320], priorityIds=[75,76,27,30];
const pairs=[];
for(const cluster of phase3AClusters){
 for(const kind of ['hub','method'])
  pairs.push({kind:kind==='method'?'guide':'hub',cluster:cluster.key,
   routes:cluster.routes[kind],expectedFaq:kind==='method'?cluster.ru.method.faq.length:cluster.ru.hub.faq.length,
   refs:cluster.sources.map(x=>x.url)});
}
for(const id of priorityIds){
 const s=industrySpecializations.find(x=>x.id===id);
 if(!s)throw Error('Missing original commercial specialization #'+id);
 const cluster=phase3AClusters.find(c=>c.ids.includes(id));
 if(!cluster)throw Error('Missing 3A cluster for #'+id);
 pairs.push({kind:'landing',cluster:cluster.key,id,routes:s.routes});
}
pairs.push({kind:'directory',directory:'industries',routes:{ru:'/industries/',en:'/en/industries/'}});
pairs.push({kind:'directory',directory:'strategies',routes:{ru:'/strategies/',en:'/en/strategies/'}});
const entries=pairs.flatMap(p=>['ru','en'].map(lang=>({...p,lang,route:p.routes[lang]})));
if(entries.length!==20||new Set(entries.map(x=>x.route)).size!==20)
 throw Error('Unexpected phase 3A route inventory (expected 20 unique URLs)');
const sha=b=>createHash('sha256').update(b).digest('hex');
function check(ok,msg){if(!ok)throw Error(msg)}
const report={batch:'3A-public-acceptance',origin,
 started_at:new Date().toISOString(),source_branch:'astro-source',
 published_main_sha:process.env.PUBLISHED_MAIN_SHA||null,form_submitted:false,
 scope:{unique_urls:entries.length,viewport_widths:widths,priority_catalogue_ids:priorityIds},
 https:[],browser:[],errors:[],status:'in_progress'};
let browser;
try{
 const sr=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(30000),headers:{'cache-control':'no-cache'}});
 check(sr.status===200,'Sitemap HTTP '+sr.status);
 const sitemap=await sr.text();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const item of entries){
  const route=item.route,url=origin+route;
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(35000),headers:{'cache-control':'no-cache'}});
   const bytes=Buffer.from(await response.arrayBuffer());
   const path=resolve('published-main',route.slice(1),'index.html');
   check(response.status===200,'Public HTTP '+response.status+' '+route);
   check(existsSync(path),'Missing published main HTML '+route);
   const publicSha=sha(bytes),mainSha=sha(readFileSync(path));
   check(publicSha===mainSha,'Public HTML SHA256 mismatch '+route+' public='+publicSha+' main='+mainSha);
   check(sitemap.includes('https://gaeo.ru'+route+'</loc>'),'Public sitemap missing '+route);
   report.https.push({route,status:200,sha256:publicSha,matches_main:true,sitemap:true});
  }catch(e){
   const msg=String(e.message||e);
   report.https.push({route,status:'failed',matches_main:false,error:msg});
   report.errors.push('HTTPS '+route+': '+msg);
   continue;
  }
  for(const width of widths){
   const outcome={route,width,status:'pending',images_decoded:0,faq:null,dialog:null,no_overflow:null,screenshot:null};
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const errors=[];let posts=0;
   page.on('pageerror',e=>errors.push(e.message));
   page.on('request',r=>{if(r.method()==='POST')posts++;});
   try{
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:35000});
    check(response?.status()===200,'Chromium HTTP '+response?.status());
    await page.locator('main h1').first().waitFor({state:'visible',timeout:15000});
    check(await page.locator('main h1').count()===1,'Expected exactly one main H1');
    check(await page.locator('html').getAttribute('lang')===item.lang,'Wrong HTML language');
    check(await page.locator('link[rel="canonical"]').count()===1,'Expected one canonical');
    check(await page.locator('link[rel="canonical"]').getAttribute('href')==='https://gaeo.ru'+route,'Wrong self canonical');
    for(const lang of ['ru','en'])
     check(await page.locator('link[rel="alternate"][hreflang="'+lang+'"]').getAttribute('href')==='https://gaeo.ru'+item.routes[lang],'Wrong '+lang+' hreflang');
    check(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),'Horizontal overflow at '+width);
    outcome.no_overflow=true;
    const hero=await page.locator('main h1').first().boundingBox();
    check(hero&&hero.x>=-2&&hero.x+hero.width<=width+2,'Clipped H1 at '+width);
    const imgs=page.locator('main img');
    for(let k=0;k<await imgs.count();k++){
     const img=imgs.nth(k);
     if(!await img.isVisible())continue;
     await img.scrollIntoViewIfNeeded({timeout:10000});
     check(await img.evaluate(async el=>{try{await el.decode();return el.naturalWidth>0&&el.naturalHeight>0}catch{return false}}),'Undecodable image '+k+' at '+width);
     outcome.images_decoded++;
    }
    if(item.kind==='hub'||item.kind==='guide'){
     const cluster=phase3AClusters.find(c=>c.key===item.cluster);
     const kind=item.kind==='guide'?'method':'hub';
     const count=cluster[item.lang][kind].faq.length;
     const details=page.locator('main #faq details');
     check(await details.count()===count,'Expected '+count+' visible FAQs');
     outcome.faq=count;
     const scripts=await page.locator('script[type="application/ld+json"]').allTextContents();
     const nodes=scripts.flatMap(s=>{const v=JSON.parse(s);return v['@graph']||[v]});
     const q=nodes.filter(n=>n['@type']==='FAQPage');
     check(q.length===1&&q[0].mainEntity?.length===count,'FAQPage parity');
     check(q[0].mainEntity.every((q,i)=>q.name===cluster[item.lang][kind].faq[i].q),'FAQ text parity');
     await details.first().locator('summary').click();
     check(await details.first().evaluate(el=>el.open),'FAQ not expandable');
     const other=kind==='hub'?'method':'hub';
     check(await page.locator('main a[href="'+cluster.routes[other][item.lang]+'"]').count()>0,'Missing reciprocal method/hub');
     for(const id of cluster.ids){
      const s=industrySpecializations.find(v=>v.id===id);
      check(await page.locator('main a[href="'+s.routes[item.lang]+'"]').count()>0,'Missing specialization #'+id);
     }
     for(const source of cluster.sources)
      check(await page.locator('main a[href="'+source.url+'"][target="_blank"]').count()>0,'Missing primary source '+source.url);
     const pricing=item.lang==='en'?'/en/pricing/':'/tarify/';
     check(await page.locator('main a[href^="'+pricing+'"]').count()>0,'Missing canonical tariffs');
     if(width===390){
      const cta=page.locator('main [data-gaeo-intent="service"]').first();
      check(await cta.count()===1,'Missing service inquiry CTA');
      await cta.click({timeout:14000});
      await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:12000});
      await page.locator('.gaeo-modal-close').first().click();
      outcome.dialog='opened_closed_without_post';
     }
    }
    if(item.kind==='landing'){
     const cluster=phase3AClusters.find(c=>c.key===item.cluster);
     for(const kind of ['hub','method'])
      check(await page.locator('main a[href="'+cluster.routes[kind][item.lang]+'"]').count()>0,'Missing specialization backlink to 3A '+kind);
     check(await page.locator('main a[href^="'+(item.lang==='en'?'/en/pricing/':'/tarify/')+'"]').count()>0,'Missing tariff link');
    }
    if(item.kind==='directory'){
     const targets=pairs.filter(x=>item.directory==='industries'?x.kind==='hub':x.kind==='guide');
     for(const p of targets)
      check(await page.locator('main a[href="'+p.routes[item.lang]+'"]').count()>0,'Missing directory entry '+p.routes[item.lang]);
    }
    check(errors.length===0,'Page JS errors '+errors.join(' | '));
    check(posts===0,'Form submission unexpectedly issued');
    const filename=route.split('/').filter(Boolean).join('-')+'-'+width+'.jpg';
    await page.screenshot({path:resolve(out,filename),fullPage:true,type:'jpeg',quality:60,animations:'disabled',timeout:30000});
    outcome.screenshot=filename;
    outcome.status='passed';
   }catch(e){
    outcome.status='failed';outcome.error=String(e.message||e);
    report.errors.push('Browser '+route+' '+width+': '+outcome.error);
   }finally{report.browser.push(outcome);await page.close()}
  }
 }
}catch(e){report.errors.push('Fatal: '+String(e.stack||e))}
finally{
 await browser?.close();
 report.status=report.errors.length===0&&report.https.length===20&&report.browser.length===60?'pass':'fail';
 report.finished_at=new Date().toISOString();
 writeFileSync(resolve(out,'sector-3a-live-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log('3A public audit '+report.status.toUpperCase()+': '+report.https.filter(x=>x.matches_main).length+'/'+report.https.length+' HTTPS SHA256 matches; '+report.browser.filter(x=>x.status==='passed').length+'/'+report.browser.length+' Chromium widths; '+report.errors.length+' errors.');
 if(report.errors.length)console.error(report.errors.slice(0,30).join('\n'));
 if(report.status!=='pass')process.exitCode=1;
}