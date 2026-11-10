// Reusable public-site acceptance of unpublished-QA bilingual GAEO industry specializations.
// Does not create or alter pages, submit forms, or infer client evidence.
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {getPlan} from '../src/data/pricing.mjs';

const origin=(process.env.GAEO_PUBLIC_ORIGIN||'https://gaeo.ru').replace(/\/$/,'');
const out=resolve('visual-specialization-live');
mkdirSync(out,{recursive:true});
const registry=JSON.parse(readFileSync(resolve('docs/tariff-industry-roadmap.json'),'utf8'));
const batchSize=Number(process.env.GAEO_LIVE_BATCH_SIZE||8);
const explicit=(process.env.GAEO_LIVE_IDS||'').trim();
const unverified=registry.records.filter(r=>
 r.coverage_kind==='dedicated_original_bilingual_specialization' &&
 r.public_https_browser_verified!==true
).sort((a,b)=>Number(a.priority||99)-Number(b.priority||99)||a.id-b.id);
const chosen=explicit
 ? explicit.split(',').map(v=>Number(v.trim()))
 : unverified.slice(0,batchSize).map(x=>x.id);
if(!chosen.length || chosen.some(id=>!Number.isInteger(id)) ||
 new Set(chosen).size!==chosen.length || chosen.length>12)
 throw Error('Invalid batch selection: '+JSON.stringify(chosen));
const entries=[];
for(const id of chosen){
 const row=registry.records.find(x=>x.id===id);
 if(!row || row.coverage_kind!=='dedicated_original_bilingual_specialization' ||
 row.public_https_browser_verified===true)
  throw Error('Selection is not an unverified original specialization: #'+id);
 const spec=industrySpecializations.find(x=>x.id===id);
 if(!spec || !spec.routes?.ru || !spec.routes?.en)
  throw Error('Original source does not contain bilingual industry #'+id);
 for(const lang of ['ru','en'])
  entries.push({id,lang,route:spec.routes[lang],otherRoute:spec.routes[lang==='ru'?'en':'ru']});
}
if(new Set(entries.map(e=>e.route)).size!==entries.length)
 throw Error('Duplicate route in batch');
const widths=[1440,390,320], sha=b=>createHash('sha256').update(b).digest('hex');
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const normalize=t=>String(t||'').replace(/\s+/g,' ').trim();
const report={
 batch:'unverified-original-industry-specializations',
 selected_ids:chosen, source_branch:'astro-source',
 origin,published_main_sha:process.env.PUBLISHED_MAIN_SHA||null,
 started_at:new Date().toISOString(),scope:{public_urls:entries.length,viewport_widths:widths},
 forms_submitted:false,https:[],browser:[],errors:[],status:'in_progress'
};
let browser;
try{
 const sitemapResponse=await fetch(origin+'/sitemap.xml',{
  signal:AbortSignal.timeout(30000),headers:{'cache-control':'no-cache'}
 });
 assert(sitemapResponse.status===200,'Public sitemap HTTP '+sitemapResponse.status);
 const sitemap=await sitemapResponse.text();
 const manifest=JSON.parse(readFileSync(resolve('published-main/astro-release-manifest.json'),'utf8'));
 report.main_manifest_source_commit=manifest.sourceCommit||null;
 report.main_manifest_release_at=manifest.releasedAt||null;
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const item of entries){
  const url=origin+item.route;
  try{
   const response=await fetch(url,{
    signal:AbortSignal.timeout(40000),
    headers:{'cache-control':'no-cache'}
   });
   assert(response.status===200,'Public HTTP '+response.status);
   assert(!/\bnoindex\b/i.test(response.headers.get('x-robots-tag')||''),'Unexpected X-Robots-Tag noindex');
   const bytes=Buffer.from(await response.arrayBuffer());
   const mainPath=resolve('published-main',item.route.slice(1),'index.html');
   assert(existsSync(mainPath),'Missing main HTML '+item.route);
   const publishedSha=sha(readFileSync(mainPath)),publicSha=sha(bytes);
   assert(publishedSha===publicSha,'Public/main SHA-256 mismatch '+item.route);
   assert(sitemap.includes('https://gaeo.ru'+item.route+'</loc>'),
    'Public sitemap lacks '+item.route);
   report.https.push({route:item.route,id:item.id,status:200,
    public_sha256:publicSha,main_sha256:publishedSha,matched:true,in_sitemap:true});
  }catch(error){
   const reason=String(error.message||error);
   report.https.push({route:item.route,status:'failed',error:reason});
   report.errors.push('HTTPS '+item.route+': '+reason);
   continue;
  }
  for(const width of widths){
   const outcome={route:item.route,id:item.id,lang:item.lang,width,status:'pending',
    images_decoded:0,faq_count:null,dialog:null,no_horizontal_overflow:null,screenshot:null};
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const pageErrors=[];let formPosts=0;
   page.on('pageerror',e=>pageErrors.push(String(e.message||e)));
   page.on('request',request=>{
    if(request.method()==='POST')formPosts++;
   });
   const filename='industry-'+String(item.id).padStart(3,'0')+'-'+item.lang+'-'+width+'.jpg';
   try{
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:40000});
    assert(response?.status()===200,'Chromium HTTP '+response?.status());
    await page.locator('main h1').first().waitFor({state:'visible',timeout:20000});
    assert(await page.locator('main h1').count()===1,'Expected exactly one main H1');
    assert(await page.locator('html').getAttribute('lang')===item.lang,'Wrong HTML lang');
    assert(await page.title()!=='','Missing HTML title');
    assert(await page.locator('meta[name="description"]').count()===1,'Missing/duplicate description');
    const robotsTags=await page.locator('meta[name="robots"]').evaluateAll(els=>els.map(el=>el.getAttribute('content')||''));
    assert(!robotsTags.some(s=>/\bnoindex\b/i.test(s)),'Robots meta noindex');
    assert(await page.locator('link[rel="canonical"]').count()===1,'Missing/duplicate canonical');
    assert(await page.locator('link[rel="canonical"]').getAttribute('href')===url,'Wrong self canonical');
    for(const lang of ['ru','en']){
     const expected=origin+(lang===item.lang?item.route:item.otherRoute);
     assert(await page.locator('link[rel="alternate"][hreflang="'+lang+'"]').getAttribute('href')===expected,
      'Wrong '+lang+' hreflang');
    }
    const geometry=await page.evaluate(()=>{
     const delta=document.documentElement.scrollWidth-innerWidth;
     const offenders=[...document.querySelectorAll('body *')].map(el=>{
      const r=el.getBoundingClientRect();
      return {el,right:Math.round(r.right),left:Math.round(r.left)};
     }).filter(x=>x.right>innerWidth+2||x.left< -2).slice(0,5)
      .map(x=>({tag:x.el.tagName,className:String(x.el.className).slice(0,80),right:x.right,left:x.left}));
     return {delta,offenders};
    });
    assert(geometry.delta<=2,'Horizontal overflow at '+width+': '+JSON.stringify(geometry));
    outcome.no_horizontal_overflow=true;
    const heading=await page.locator('main h1').first().boundingBox();
    assert(heading&&heading.x>=-2&&heading.x+heading.width<=width+2,'Clipped H1');
    const faq=page.locator('main details.faq-item');
    const count=await faq.count();
    assert(count===5,'Expected five visible FAQs, got '+count);
    outcome.faq_count=count;
    const graph=(await page.locator('script[type="application/ld+json"]').allTextContents())
     .flatMap(s=>{const value=JSON.parse(s);return value['@graph']||[value]});
    const pages=graph.filter(x=>x['@type']==='FAQPage');
    assert(pages.length===1&&pages[0].mainEntity?.length===count,'FAQPage JSON-LD parity');
    for(let i=0;i<count;i++){
     const visible=normalize(await faq.nth(i).locator('summary span:not(.faq-toggle)').first().textContent());
     assert(visible===normalize(pages[0].mainEntity[i].name),'FAQ question mismatch '+i);
    }
    assert(graph.some(x=>x['@type']==='Service'),'Missing Service schema');
    const pricePrefix=item.lang==='ru'?'/tarify/':'/en/pricing/';
    for(const plan of ['geo','content','guarantee']){
     const target=getPlan(plan,item.lang).href;
     assert(await page.locator('main a[href="'+target+'"]').count()>0,
      'Missing canonical '+plan+' tariff link: '+target);
    }
    assert(await page.locator('main a[href^="'+pricePrefix+'"]').count()>0,'Missing industry price link');
    const bio=item.lang==='ru'?'/professional-biography/':'/en/professional-biography/';
    assert(await page.locator('main a[href="'+bio+'"]').count()>0,'Missing expert biography link');
    assert(await page.locator('main [data-gaeo-intent="service"]').count()>0,'Missing service inquiry CTA');
    const images=page.locator('main img');
    for(let i=0;i<await images.count();i++){
     const img=images.nth(i);
     if(!await img.isVisible())continue;
     await img.scrollIntoViewIfNeeded({timeout:12000});
     assert(await img.evaluate(async el=>{
      try{await el.decode();return el.naturalWidth>0&&el.naturalHeight>0;}
      catch{return false;}
     }),'Image failed to decode '+i);
     outcome.images_decoded++;
    }
    if(width===390){
     const first=page.locator('main [data-gaeo-intent="service"]').first();
     await first.click({timeout:16000});
     await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:12000});
     await page.locator('.gaeo-modal-close').first().click({timeout:10000});
     outcome.dialog='opened_closed_without_post';
    }
    assert(pageErrors.length===0,'JavaScript errors: '+pageErrors.join(' | '));
    assert(formPosts===0,'Unexpected POST; form was not authorized to submit');
    await page.screenshot({path:resolve(out,filename),fullPage:true,type:'jpeg',
     quality:60,animations:'disabled',timeout:40000});
    outcome.screenshot=filename;
    outcome.status='passed';
   }catch(error){
    outcome.status='failed';outcome.error=String(error.message||error);
    report.errors.push('Browser '+item.route+' '+width+': '+outcome.error);
    try{
     await page.screenshot({path:resolve(out,filename.replace('.jpg','-FAILED.jpg')),
      fullPage:true,type:'jpeg',quality:55,timeout:12000});
    }catch{}
   }finally{report.browser.push(outcome);await page.close()}
  }
 }
}catch(error){report.errors.push('Fatal: '+String(error.stack||error))}
finally{
 await browser?.close();
 report.finished_at=new Date().toISOString();
 report.status=report.errors.length===0&&report.https.length===entries.length&&
 report.browser.length===entries.length*widths.length?'pass':'fail';
 writeFileSync(resolve(out,'specialization-live-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log('Specializations public QA '+report.status.toUpperCase()+': '+
  report.https.filter(x=>x.matched).length+'/'+entries.length+' HTTPS SHA256; '+
  report.browser.filter(x=>x.status==='passed').length+'/'+(entries.length*widths.length)+
  ' Chromium; '+report.errors.length+' errors; IDs '+chosen.join(','));
 if(report.errors.length)console.error(report.errors.slice(0,40).join('\n'));
 if(report.status!=='pass')process.exitCode=1;
}
