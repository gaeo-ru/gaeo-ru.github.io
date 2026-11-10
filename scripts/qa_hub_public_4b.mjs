// QA-only independent HTTPS/Chromium acceptance for seven reused bilingual GAEO landings.
// This file lives on a qa/* branch; do not merge it into astro-source or main.
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getIndustryCatalog} from '../src/data/industry-catalog.mjs';

const origin='https://gaeo.ru', widths=[1440,390,320], ids=[1,19,39,47,54,67,80];
const out=resolve('visual-hub-public-4b');
const report={batch:'4B',kind:'reused-existing-RU-EN-public-live',
 ids,urls_expected:14,viewport_checks_expected:42,origin,
 public_main_sha256_matches:0,chromium_passed:0,errors:[],
 requests_post:0,https:[],browser:[],finished_at:null};
mkdirSync(out,{recursive:true});
const sha=buf=>createHash('sha256').update(buf).digest('hex');
const check=(value,message)=>{if(!value)throw Error(message)};
const entries=ids.flatMap(id=>['ru','en'].map(lang=>{
 const item=getIndustryCatalog(lang).find(x=>x.number===id);
 const other=getIndustryCatalog(lang==='ru'?'en':'ru').find(x=>x.number===id);
 check(item?.detailLink&&other?.detailLink,'Missing route #'+id);
 return {id,lang,route:item.detailLink,other:other.detailLink};
}));
let browser;
try{
 const manifest=JSON.parse(readFileSync('published-main/astro-release-manifest.json','utf8'));
 report.published_manifest_source_commit=manifest.sourceCommit;
 report.released_at=manifest.releasedAt;
 const sitemapResponse=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(30000),headers:{'cache-control':'no-cache'}});
 check(sitemapResponse.status===200,'Sitemap HTTP '+sitemapResponse.status);
 const sitemap=await sitemapResponse.text();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const item of entries){
  const url=origin+item.route;
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(35000),headers:{'cache-control':'no-cache'}});
   check(response.status===200,'HTTP '+response.status+' '+item.route);
   check(!/\bnoindex\b/i.test(response.headers.get('x-robots-tag')||''),'X-Robots noindex '+item.route);
   const bytes=Buffer.from(await response.arrayBuffer());
   const published=resolve('published-main',item.route.slice(1),'index.html');
   check(existsSync(published),'Missing main HTML '+item.route);
   check(sha(bytes)===sha(readFileSync(published)),'Public/main SHA mismatch '+item.route);
   check(sitemap.includes('https://gaeo.ru'+item.route+'</loc>'),'Not in sitemap '+item.route);
   report.public_main_sha256_matches++;
   report.https.push({id:item.id,lang:item.lang,route:item.route,http:200,main_parity:true,sitemap:true});
  }catch(e){report.errors.push('HTTP '+item.route+': '+String(e.message||e));continue}
  for(const width of widths){
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const entry={...item,width,status:'pending',images_decoded:0,has_editorial_link:false,has_tariff_link:false,has_contact:false};
   const errs=[];
   let post=0;
   page.on('pageerror',e=>errs.push(e.message));
   page.on('request',req=>{if(req.method()==='POST')post++;});
   const filename='reused-'+String(item.id).padStart(3,'0')+'-'+item.lang+'-'+width+'.jpg';
   try{
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:35000});
    check(response?.status()===200,'Chromium HTTP '+response?.status());
    await page.locator('main h1').first().waitFor({state:'visible',timeout:18000});
    check(await page.locator('main h1').count()===1,'H1 count '+item.route);
    check(await page.locator('html').getAttribute('lang')===item.lang,'HTML lang');
    check((await page.title()).trim().length>12,'Title empty');
    check(await page.locator('meta[name="description"]').count()===1,'Description absent/duplicate');
    check(await page.locator('link[rel="canonical"]').count()===1,'Canonical missing/duplicate');
    check(await page.locator('link[rel="canonical"]').getAttribute('href')===url,'Canonical wrong');
    for(const l of ['ru','en'])check(
     await page.locator('link[rel="alternate"][hreflang="'+l+'"]').getAttribute('href')===
     origin+(l===item.lang?item.route:item.other),
     l+' hreflang wrong');
    const robots=await page.locator('meta[name="robots"]').all();
    for(const tag of robots)check(!/\bnoindex\b/i.test(await tag.getAttribute('content')||''),'noindex meta');
    const links=await page.locator('main a[href]').evaluateAll(nodes=>nodes.map(el=>el.getAttribute('href')||''));
    const pricing=item.lang==='ru'?'/tarify/':'/en/pricing/';
    const lead=item.lang==='ru'?'/#lead':'/en/#lead';
    entry.has_tariff_link=links.some(x=>x.startsWith(pricing));
    entry.has_contact=links.some(x=>x.startsWith(lead));
    entry.has_editorial_link=links.some(x=>/(?:^\/|https:\/\/gaeo\.ru\/)(?:en\/)?(?:strategies|articles|cases)\//.test(x));
    check(entry.has_tariff_link&&entry.has_contact&&entry.has_editorial_link,
      'Missing price/contact/editorial funnel link '+JSON.stringify(entry));
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    check(overflow<=2,'Horizontal overflow '+width+' '+overflow);
    const imgs=page.locator('main img');
    for(let i=0;i<await imgs.count();i++){
     const img=imgs.nth(i);
     if(!(await img.isVisible()))continue;
     await img.scrollIntoViewIfNeeded({timeout:12000});
     const ok=await img.evaluate(async e=>{try{await e.decode();return e.naturalWidth>0&&e.naturalHeight>0;}catch{return false}});
     check(ok,'Image failed '+i);
     entry.images_decoded++;
    }
    check(!errs.length,'JS errors: '+errs.join(' | '));
    check(post===0,'Unexpected POST');
    await page.screenshot({path:resolve(out,filename),fullPage:true,type:'jpeg',quality:53,animations:'disabled',timeout:35000});
    entry.status='pass';entry.screenshot=filename;report.chromium_passed++;
   }catch(e){entry.status='fail';entry.error=String(e.message||e);report.errors.push(item.route+' width='+width+': '+entry.error);
    try{await page.screenshot({path:resolve(out,filename.replace('.jpg','-FAILED.jpg')),fullPage:true,type:'jpeg',quality:45,timeout:15000})}catch{}
   }finally{report.requests_post+=post;report.browser.push(entry);await page.close();}
  }
 }
}catch(e){report.errors.push('Fatal: '+String(e.stack||e))}
finally{
 await browser?.close();
 report.finished_at=new Date().toISOString();
 report.status=report.errors.length===0&&report.public_main_sha256_matches===14&&report.chromium_passed===42&&report.requests_post===0?'pass':'fail';
 writeFileSync(resolve(out,'gaeo-phase4b-public-reused.json'),JSON.stringify(report,null,2)+'\n');
 console.log('GAEO_4B_PUBLIC='+report.status.toUpperCase()+'; HTTPS/main SHA='+report.public_main_sha256_matches+'/14; Chromium='+report.chromium_passed+'/42; POST='+report.requests_post+'; errors='+report.errors.length);
 if(report.errors.length)console.error(report.errors.slice(0,40).join('\n'));
 if(report.status!=='pass')process.exitCode=1;
}
