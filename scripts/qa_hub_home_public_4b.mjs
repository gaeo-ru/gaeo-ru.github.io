/**
 * Independent public GAEO phase-4B acceptance for the approved home → industries
 * → specific sector path. Reads published pages; no form submission or analytics.
 * Compares complete public HTML SHA-256 against the current published main branch.
 */
import {chromium} from 'playwright';
import {createHash} from 'node:crypto';
import {readFileSync, existsSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const origin=(process.env.GAEO_PUBLIC_ORIGIN||'https://gaeo.ru').replace(/\/$/,'');
const linksRU=['/industries/ecommerce/','/industries/legal/','/industries/metal-structures/'];
const linksEN=linksRU.map(x=>'/en'+x);
const cases=[
  {route:'/',lang:'ru',kind:'home',expected:['/industries/']},
  {route:'/en/',lang:'en',kind:'home',expected:['/en/industries/']},
  {route:'/industries/',lang:'ru',kind:'catalog',expected:linksRU},
  {route:'/en/industries/',lang:'en',kind:'catalog',expected:linksEN},
  ...linksRU.map(route=>({route,lang:'ru',kind:'sector',expected:[]})),
  ...linksEN.map(route=>({route,lang:'en',kind:'sector',expected:[]}))
];
const widths=[1440,390,320];
const out='visual-hub-home-public';
mkdirSync(out,{recursive:true});
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const assert=(ok,what)=>{if(!ok)throw Error(what)};
const report={
  batch:'4B-home-directory-sector-recovery',
  origin, tested_at:new Date().toISOString(),
  published_main_sha:process.env.PUBLISHED_MAIN_SHA||null,
  expected_public_urls:cases.length,
  expected_chromium_viewports:cases.length*widths.length,
  forms_submitted:false, https:[], chromium:[], errors:[], status:'running'
};
let browser;
try {
  const sitemapResponse=await fetch(origin+'/sitemap.xml',{signal:AbortSignal.timeout(35000),headers:{'cache-control':'no-cache'}});
  assert(sitemapResponse.status===200,'sitemap HTTP '+sitemapResponse.status);
  const sitemap=await sitemapResponse.text();
  const manifest=JSON.parse(readFileSync('published-main/astro-release-manifest.json','utf8'));
  report.manifest_source_commit=manifest.sourceCommit;
  report.manifest_released_at=manifest.releasedAt;
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  for(const entry of cases){
    const url=origin+entry.route;
    try {
      const response=await fetch(url,{signal:AbortSignal.timeout(40000),headers:{'cache-control':'no-cache'}});
      assert(response.status===200,'HTTP '+response.status);
      const bytes=Buffer.from(await response.arrayBuffer());
      const file=resolve('published-main',entry.route.replace(/^\//,''),'index.html');
      assert(existsSync(file),'main HTML absent '+file);
      assert(hash(bytes)===hash(readFileSync(file)),'public SHA-256 differs from main');
      assert(sitemap.includes('<loc>'+url+'</loc>'),'public sitemap lacks route');
      report.https.push({route:entry.route,status:200,sha256:hash(bytes),same_as_main:true,sitemap:true});
    } catch(e){
      report.https.push({route:entry.route,status:'failed',error:String(e.message||e)});
      report.errors.push('HTTPS '+entry.route+': '+String(e.message||e));
      continue;
    }
    for(const width of widths){
      const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
      let posts=0; const jsErrors=[];
      page.on('request',req=>{if(req.method()==='POST')posts++;});
      page.on('pageerror',e=>jsErrors.push(String(e.message||e)));
      const slug=(entry.route==='/'?'home-ru':entry.route==='/en/'?'home-en':entry.route.replace(/^\/|\/$/g,'').replaceAll('/','-'));
      const shot=out+'/'+slug+'-'+width+'.jpg';
      try{
        const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:40000});
        assert(response?.status()===200,'Chromium HTTP '+response?.status());
        await page.locator('main h1').first().waitFor({state:'visible',timeout:18000});
        assert(await page.locator('main h1').count()===1,'one main H1 required');
        assert(await page.locator('html').getAttribute('lang')===entry.lang,'wrong HTML lang');
        assert(Boolean(await page.title()),'missing page title');
        assert(await page.locator('meta[name="description"]').count()===1,'one meta description required');
        assert(await page.locator('link[rel="canonical"]').count()===1,'one canonical required');
        assert(await page.locator('link[rel="canonical"]').getAttribute('href')===url,'wrong self canonical');
        const anchors=await page.locator('main a[href]').evaluateAll(els=>els.map(x=>x.getAttribute('href')||''));
        for(const route of entry.expected)assert(anchors.some(x=>x.split('#')[0].split('?')[0]===route),'missing contextual link to '+route);
        if(entry.kind==='home') {
          const prohibited=entry.lang==='ru'?linksRU:linksEN;
          for(const route of prohibited)assert(!anchors.some(x=>x.split('#')[0].split('?')[0]===route),
            'approved homepage cleanup reverted for '+route);
        }
        if(entry.kind==='sector'){
          const tariff=entry.lang==='ru'?'/tarify/':'/en/pricing/';
          assert(anchors.some(x=>x.split('#')[0].split('?')[0]===tariff),'sector lacks pricing link');
        }
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
        assert(overflow<=2,'horizontal overflow '+overflow+'px');
        for(const img of await page.locator('main img').all()){
          if(!(await img.isVisible()))continue;
          await img.scrollIntoViewIfNeeded({timeout:12000});
          const decoded=await img.evaluate(async el=>{
            try{await el.decode();return el.naturalWidth>0 && el.naturalHeight>0;}
            catch{return false;}
          });
          assert(decoded,'broken main image '+await img.getAttribute('src'));
        }
        assert(posts===0,'unexpected POST request');
        assert(jsErrors.length===0,'JS errors '+jsErrors.join(' | '));
        await page.evaluate(()=>scrollTo(0,0));
        await page.screenshot({path:shot,type:'jpeg',quality:72,fullPage:true,animations:'disabled'});
        report.chromium.push({route:entry.route,width,status:'pass',image:shot,posts:0});
      }catch(e){
        report.errors.push('Chromium '+entry.route+' '+width+'px: '+String(e.message||e));
        report.chromium.push({route:entry.route,width,status:'failed',error:String(e.message||e)});
        try{await page.screenshot({path:shot,type:'jpeg',quality:68,fullPage:true,timeout:12000});}catch{}
      }finally{await page.close();}
    }
  }
}catch(e){report.errors.push('Top-level: '+String(e.message||e));}
finally{if(browser)await browser.close();}
report.status=report.errors.length?'FAIL':'PASS';
writeFileSync(out+'/summary.json',JSON.stringify(report,null,2)+'\n');
console.log('GAEO_HOME_4B='+report.status+' HTTPS='+report.https.filter(x=>x.status===200).length+'/'+cases.length+
  ' BROWSER='+report.chromium.filter(x=>x.status==='pass').length+'/'+cases.length*widths.length+
  ' ERRORS='+report.errors.length+' MAIN='+String(report.published_main_sha));
for(const e of report.errors.slice(0,40))console.error('GAEO_HOME_4B_ERROR '+e);
if(report.errors.length)process.exitCode=1;
