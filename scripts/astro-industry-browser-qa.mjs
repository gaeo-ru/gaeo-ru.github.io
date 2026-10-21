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
  {route:'/en/industries/ecommerce/', lang:'en', ecommerce:true}
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
  console.log(checks.join('\n'));
  console.log('INDUSTRY_BROWSER_QA=PASS; cases='+checks.length);
} finally {
  if(browser)await browser.close();
  preview.kill('SIGTERM');
}