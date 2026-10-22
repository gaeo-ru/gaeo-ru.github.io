import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const BASE = 'http://127.0.0.1:4329';
const CASES = [
  {route:'/geo-prodvizhenie-nedvizhimosti/', lang:'ru'},
  {route:'/en/geo-for-real-estate/', lang:'en'},
  {route:'/industries/pharma/', lang:'ru'},
  {route:'/en/industries/pharma/', lang:'en'},
  {route:'/industries/ecommerce/', lang:'ru', ecommerce:true},
  {route:'/en/industries/ecommerce/', lang:'en', ecommerce:true},
  {route:'/strategies/ecommerce-measurement/', lang:'ru', methodology:true},
  {route:'/en/strategies/ecommerce-measurement/', lang:'en', methodology:true}
];
const VIEWPORTS = [
  {width:1440,height:900},
  {width:390,height:844},
  {width:320,height:720}
];
const checks = [];
mkdirSync('visual-industry', {recursive:true});

const preview = spawn('./node_modules/.bin/astro',
  ['preview','--host','127.0.0.1','--port','4329'], {
  stdio:['ignore','pipe','pipe']
});
let serverOutput = '';
preview.stdout.on('data', b=>serverOutput+=String(b));
preview.stderr.on('data', b=>serverOutput+=String(b));
const pause = ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function waitForPreview() {
  for(let i=0;i<50;i++){
    if(preview.exitCode!==null)throw new Error('Astro preview exited: '+serverOutput.slice(-1500));
    try{
      const r=await fetch(BASE+'/geo-prodvizhenie-nedvizhimosti/');
      if(r.ok)return;
    }catch{}
    await pause(400);
  }
  throw new Error('Astro preview did not start: '+serverOutput.slice(-1500));
}

let browser;
try {
  await waitForPreview();
  browser=await chromium.launch({headless:true});
  for(const entry of CASES)for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(String(err)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Page did not return HTTP 200');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Wrong document language');
    if(entry.methodology){
      assert.equal(await page.locator('h1').count(),1,'Methodology requires exactly one H1');
      assert.equal(await page.locator('.ecommerce-metric-step').count(),5,'Five measurement stages missing');
      assert.equal(await page.locator('.ecommerce-method-table').count(),2,'Metric and price experiment tables missing');
      assert.equal(await page.locator('.method-faq-item').count(),5,'Five metric FAQ entries missing');
      assert.equal(await page.locator('details.faq-item summary').count(),5,'Visible native FAQs missing');
      assert.ok(await page.locator('a[href$="/industries/ecommerce/"]').count()>0,'Commercial ecommerce page link missing');
      const schemaOkay=await page.evaluate(()=>{
        const parts=[...document.querySelectorAll('script[type="application/ld+json"]')];
        const graphs=parts.flatMap(x=>{try{const j=JSON.parse(x.textContent);return j['@graph']||[j]}catch{return []}});
        const f=graphs.find(x=>x['@type']==='FAQPage');
        const visible=[...document.querySelectorAll('details.faq-item summary')].map(x=>x.textContent.trim());
        return f?.mainEntity?.length===5 && f.mainEntity.every((q,i)=>q.name===visible[i]);
      });
      assert.ok(schemaOkay,'FAQPage structured data differs from visible questions');
      const imageCount=await page.locator('.ecommerce-method-figure img').count();
      if(entry.lang==='ru')assert.equal(imageCount,1,'Original author illustration missing');
      for(const img of await page.locator('main img').all()){
        await img.scrollIntoViewIfNeeded();
        const loaded=await img.evaluate(async el=>{
          if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,4500)});
          return el.complete && el.naturalWidth>0;
        });
        assert.ok(loaded,'Broken methodology image: '+await img.getAttribute('src'));
      }
      const pageWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
      assert.ok(pageWidth<=viewport.width+2,'Methodology horizontal overflow '+pageWidth+' at '+viewport.width);
      await page.locator('.page-cta .button[href$="#lead"]').click();
      await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
      await page.locator('.gaeo-modal-close').click();
      assert.equal(await page.locator('[role="dialog"]').count(),0,'Methodology lead dialog remained open');
      assert.equal(errors.length,0,'JS errors: '+errors.join('; '));
      await page.evaluate(()=>scrollTo(0,0));
      const id=entry.route.split('/').filter(Boolean).join('-');
      await page.screenshot({path:'visual-industry/'+id+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
      checks.push(entry.lang+' '+viewport.width+'px ecommerce methodology/metrics/FAQ/images/lead-dialog/overflow PASS');
      await page.close();
      continue;
    }
    assert.equal(await page.locator('h1').count(),1,'Expected exactly one H1');
    assert.equal(await page.locator('.industry-problem').count(),4,'Problem cards missing');
    assert.equal(await page.locator('.industry-metric').count(),3,'Evidence statistics missing');
    assert.equal(await page.locator('.industry-step').count(),6,'Commercial steps missing');
    assert.equal(await page.locator('.faq-item').count(),6,'FAQ questions missing');
    assert.equal(await page.locator('.industry-price').count(),3,'Rates missing');
    if(entry.ecommerce){
      assert.equal(await page.locator('.industry-framework-card').count(),5,'Five ecommerce framework indicators missing');
      assert.equal(await page.locator('.industry-scenario-table tbody tr').count(),5,'Five buying stages missing');
      assert.equal(await page.locator('a[href*="1087822"]').count()>0,true,'Author methodology source missing');
    }
    assert.equal(await page.locator('.industry-hero__media img').count(),1,'Hero image missing');
    assert.equal(await page.locator('.industry-hero .button[href$="#lead"]').count(),1,'Lead trigger missing');
    const width = await page.evaluate(()=>document.documentElement.scrollWidth);
    assert.ok(width<=viewport.width+2,'Horizontal overflow '+width+'px at '+viewport.width+'px');
    // Load all images using actual scrolling before checking image decode and screenshots.
    for(const img of await page.locator('main img').all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(async el=>{
        if(!el.complete) await new Promise(resolve=>{el.addEventListener('load',resolve,{once:true});el.addEventListener('error',resolve,{once:true});setTimeout(resolve,4500)});
      });
      const loaded=await img.evaluate(el=>el.complete && el.naturalWidth>0);
      assert.ok(loaded,'Broken image: '+await img.getAttribute('src'));
    }
    await page.locator('.industry-hero__copy .button[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Lead dialog did not close');
    const afterWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    assert.ok(afterWidth<=viewport.width+2,'Overflow after opening form');
    assert.equal(errors.length,0,'Runtime errors: '+errors.join('; '));
    await page.evaluate(()=>scrollTo(0,0));
    const slug=entry.route.replace(/^\/|\/$/g,'').replaceAll('/','-');
    await page.screenshot({path:'visual-industry/'+slug+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push(entry.lang+' '+viewport.width+'px H1/4 problems/3 evidence/6 steps/6 FAQ/3 prices/images/lead-dialog/overflow PASS');
    await page.close();
  }

  // E-commerce catalog methodology: technical guide parity, images, mobile tables and lead form.
  for (const entry of [
    {route:'/strategies/ecommerce-catalog/',lang:'ru'},
    {route:'/en/strategies/ecommerce-catalog/',lang:'en'}
  ]) for (const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(String(err)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Catalog guide HTTP status');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Catalog guide language');
    assert.equal(await page.locator('h1').count(),1,'Catalog guide one H1');
    assert.ok(await page.locator('.catalog-guide h2').count()>=10,'Guide must have substantive chapters');
    assert.equal(await page.locator('.catalog-example-grid section').count(),4,'Scenario and rendering comparisons missing');
    assert.equal(await page.locator('.catalog-code code').count(),1,'Product/Offer example missing');
    assert.equal(await page.locator('.catalog-checklist li').count(),10,'Ten point acceptance list missing');
    assert.equal(await page.locator('.faq-item').count(),6,'Catalog guide FAQ count');
    assert.equal(await page.locator('.catalog-guide .ecommerce-method-figure img').count(),2,'Relevant illustrations missing');
    const tags=await page.locator('script[type="application/ld+json"]').allTextContents();
    const ld=tags.map(t=>JSON.parse(t));
    const faq=ld.flatMap(o=>o['@graph']||[]).find(x=>x['@type']==='FAQPage');
    const visible=await page.locator('.faq-item summary > span:first-child').allTextContents();
    assert.ok(faq?.mainEntity?.length===6,'Catalog FAQPage schema count');
    assert.ok(faq.mainEntity.every((x,i)=>x.name===visible[i].trim()),'FAQPage questions match visible FAQ');
    assert.ok(await page.locator('a[href*="ecommerce-measurement/"]').count()>=1,'Metrics cross-link missing');
    assert.ok(await page.locator('a[href*="industries/ecommerce/"]').count()>=1,'Commercial landing cross-link missing');
    for(const img of await page.locator('main img').all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(async el=>{
        if(!el.complete)await new Promise(done=>{
          el.addEventListener('load',done,{once:true});
          el.addEventListener('error',done,{once:true});
          setTimeout(done,4500);
        });
      });
      assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Catalog broken image');
    }
    let width=await page.evaluate(()=>document.documentElement.scrollWidth);
    assert.ok(width<=viewport.width+2,'Catalog horizontal overflow '+width+'px at '+viewport.width+'px');
    await page.locator('.catalog-guide .page-cta a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Catalog lead dialog did not close');
    width=await page.evaluate(()=>document.documentElement.scrollWidth);
    assert.ok(width<=viewport.width+2,'Catalog modal caused horizontal overflow');
    assert.deepEqual(errors,[],'Catalog runtime errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/catalog-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('catalog '+entry.lang+' '+viewport.width+'px SEO/chapters/images/FAQ/code/lead/overflow PASS');
    await page.close();
  }

  console.log(checks.join('\n'));
  console.log('INDUSTRY_BROWSER_QA=PASS; cases='+checks.length);
} finally {
  if(browser)await browser.close();
  preview.kill('SIGTERM');
}