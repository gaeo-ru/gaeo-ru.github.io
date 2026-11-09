// Public, independent Chromium acceptance for the already published GAEO 3D/3E/3F pages.
// Does not submit forms, change content, or assert search indexing.
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const origin=(process.env.GAEO_PUBLIC_ORIGIN||'https://gaeo.ru').replace(/\/$/,'');
const out=resolve('visual-sector-live');
mkdirSync(out,{recursive:true});
const widths=[1440,390,320];
const pairs=[
 {kind:'guide',batch:'3D/3F',id:null,ru:'/strategies/sector-geo-case-proof/',en:'/en/strategies/sector-geo-case-proof/'},
 {kind:'guide',batch:'3E',id:1,ru:'/strategies/developer-project-evidence-checklist/',en:'/en/strategies/developer-project-evidence-checklist/'},
 {kind:'guide',batch:'3E',id:19,ru:'/strategies/b2b-law-firm-matter-fit/',en:'/en/strategies/b2b-law-firm-matter-fit/'},
 {kind:'guide',batch:'3E',id:39,ru:'/strategies/load-testing-vendor-proof/',en:'/en/strategies/load-testing-vendor-proof/'},
 {kind:'landing',batch:'3E',id:1,ru:'/geo-prodvizhenie-nedvizhimosti/',en:'/en/geo-for-real-estate/'},
 {kind:'landing',batch:'3E',id:19,ru:'/industries/legal/',en:'/en/industries/legal/'},
 {kind:'landing',batch:'3E',id:39,ru:'/industries/highload-it/',en:'/en/industries/highload-it/'},
 {kind:'directory',batch:'3D/3E/3F',id:null,ru:'/strategies/',en:'/en/strategies/'}
];
const entries=pairs.flatMap(p=>['ru','en'].map(lang=>({...p,lang,route:p[lang]})));
const sha=b=>createHash('sha256').update(b).digest('hex');
const fail=(msg)=>{throw new Error(msg)};
const check=(ok,msg)=>{if(!ok)fail(msg)};
const report={
 batch:'3D/3E/3F-public-acceptance',
 origin,
 captured_at:new Date().toISOString(),
 source_branch:'astro-source',
 source_main_sha:process.env.PUBLISHED_MAIN_SHA||null,
 form_submitted:false,
 scope:{unique_urls:entries.length,viewport_widths:widths},
 https:[],browser:[],status:'in_progress',errors:[]
};
let browser;
try {
 const smResponse=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(25000),headers:{'cache-control':'no-cache'}});
 check(smResponse.status===200,'Sitemap HTTP '+smResponse.status);
 const sitemap=await smResponse.text();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const item of entries){
  const route=item.route, url=origin+route;
  try {
   const response=await fetch(url,{signal:AbortSignal.timeout(30000),headers:{'cache-control':'no-cache'}});
   const bytes=Buffer.from(await response.arrayBuffer());
   const path=resolve('published-main',route.slice(1),'index.html');
   check(response.status===200,'HTTPS status '+response.status+' '+route);
   check(existsSync(path),'Missing published main HTML '+path);
   const main=readFileSync(path);
   const publicSha=sha(bytes),mainSha=sha(main);
   check(publicSha===mainSha,'Public HTML differs from published main '+route+' public='+publicSha+' main='+mainSha);
   check(sitemap.includes('https://gaeo.ru'+route+'</loc>'),'Not in public sitemap '+route);
   report.https.push({route,status:response.status,sha256:publicSha,matches_main:true,sitemap:true});
  }catch(error){
   report.https.push({route,status:'failed',matches_main:false,error:String(error.message||error)});
   report.errors.push('HTTPS '+route+': '+String(error.message||error));
   continue;
  }
  for(const width of widths){
   const entry={route,width,status:'pending',images_decoded:0,faq:null,dialog:null,no_overflow:null,screenshot:null};
   const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
   const pageErrors=[];
   let posts=0;
   page.on('pageerror',error=>pageErrors.push(error.message));
   page.on('request',req=>{if(req.method()==='POST')posts++;});
   try {
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
    check(response?.status()===200,'Chromium HTTP '+response?.status());
    await page.locator('main h1').first().waitFor({state:'visible',timeout:15000});
    check(await page.locator('main h1').count()===1,'Expected one visible main H1');
    check(await page.locator('html').getAttribute('lang')===item.lang,'Incorrect HTML lang');
    const expectedUrl='https://gaeo.ru'+route;
    check(await page.locator('link[rel="canonical"]').count()===1,'Expected one canonical');
    check(await page.locator('link[rel="canonical"]').getAttribute('href')===expectedUrl,'Wrong canonical');
    for(const locale of ['ru','en'])
     check(await page.locator('link[rel="alternate"][hreflang="'+locale+'"]').getAttribute('href')==='https://gaeo.ru'+item[locale],'Incorrect '+locale+' hreflang');
    const isOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);
    check(!isOverflow,'Horizontal overflow at '+width+'px');
    entry.no_overflow=true;
    const hero=await page.locator('main h1').first().boundingBox();
    check(hero&&hero.x>=-2&&hero.x+hero.width<=width+2,'Clipped H1 at '+width+'px');
    const imgs=page.locator('main img');
    for(let k=0;k<await imgs.count();k++){
     const img=imgs.nth(k);
     if(!(await img.isVisible()))continue;
     await img.scrollIntoViewIfNeeded({timeout:9000});
     const good=await img.evaluate(async e=>{try{await e.decode();return e.naturalWidth>0&&e.naturalHeight>0}catch{return false}});
     check(good,'Image did not decode at width '+width+', index '+k);
     entry.images_decoded++;
    }
    if(item.kind==='guide'){
     const details=page.locator('main #faq details');
     check(await details.count()===5,'Guide needs five visible FAQ answers');
     entry.faq=5;
     const graph=await page.locator('script[type="application/ld+json"]').allTextContents();
     let faqs=[];
     for(const raw of graph) {
      const parsed=JSON.parse(raw);
      const nodes=parsed['@graph']||[parsed];
      faqs.push(...nodes.filter(n=>n['@type']==='FAQPage'));
     }
     check(faqs.length===1&&faqs[0].mainEntity.length===5,'FAQPage structured data parity');
     await details.first().locator('summary').click();
     check(await details.first().evaluate(e=>e.open),'FAQ could not expand');
     const pricing=item.lang==='en'?'/en/pricing/':'/tarify/';
     check(await page.locator('main a[href^="'+pricing+'"]').count()>0,'Missing canonical tariff link');
     if(item.id!==null){
      const parent=pairs.find(p=>p.kind==='landing'&&p.id===item.id);
      check(await page.locator('main a[href="'+parent[item.lang]+'"]').count()>0,'Missing source commercial landing link');
     }
     if(width===390){
      const cta=page.locator('main [data-gaeo-intent="service"]').first();
      check(await cta.count()===1,'Missing enquiry CTA');
      await cta.click({timeout:12000});
      await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:10000});
      await page.locator('.gaeo-modal-close').first().click();
      entry.dialog='opened_closed_no_submission';
     }
    }
    if(item.kind==='landing' && item.id!==null){
     const method=pairs.find(p=>p.kind==='guide'&&p.id===item.id);
     check(await page.locator('main a[href="'+method[item.lang]+'"]').count()>0,'Missing reverse link to 3E guide');
    }
    if(item.kind==='directory'){
     check(await page.locator('main .list-card').count()>=25,'Strategy directory missing items');
     for(const p of pairs.filter(p=>p.kind==='guide'))
      check(await page.locator('main a[href="'+p[item.lang]+'"]').count()>0,'Missing directory link '+p[item.lang]);
    }
    check(pageErrors.length===0,'Unhandled page errors: '+pageErrors.join(' | '));
    check(posts===0,'Unexpected form POST');
    const filename=route.split('/').filter(Boolean).join('-')+'-'+width+'.jpg';
    await page.screenshot({path:resolve(out,filename),fullPage:true,type:'jpeg',quality:64,animations:'disabled',timeout:20000});
    entry.screenshot=filename;
    entry.status='passed';
   }catch(error){
    entry.status='failed';
    entry.error=String(error.message||error);
    report.errors.push('Browser '+route+' '+width+': '+entry.error);
   }finally{
    report.browser.push(entry);
    await page.close();
   }
  }
 }
} catch(error){
 report.errors.push('Fatal: '+String(error.stack||error));
} finally {
 await browser?.close();
 report.status=(report.errors.length===0 && report.https.length===16 && report.browser.length===48)?'pass':'fail';
 report.finished_at=new Date().toISOString();
 writeFileSync(resolve(out,'sector-3def-live-report.json'),JSON.stringify(report,null,2)+'\n');
 console.log('Sector 3D/3E/3F public HTTPS audit: '+report.status.toUpperCase()+'; '+report.https.filter(x=>x.matches_main).length+'/'+report.https.length+' HTML matched main; '+report.browser.filter(x=>x.status==='passed').length+'/'+report.browser.length+' viewport checks; '+report.errors.length+' errors; screenshots in visual-sector-live/.');
 if(report.errors.length)console.error(report.errors.slice(0,30).join('\n'));
 if(report.status!=='pass')process.exitCode=1;
}
