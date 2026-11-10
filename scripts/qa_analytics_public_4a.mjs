import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {chromium} from 'playwright';

const origin=process.env.GAEO_PUBLIC_ORIGIN || 'https://gaeo.ru';
const published='published-main';
const out='visual-analytics-4a';
mkdirSync(out,{recursive:true});
const sha=value=>createHash('sha256').update(value).digest('hex');
const expectedManifest=JSON.parse(readFileSync(published+'/astro-release-manifest.json','utf8'));
assert.equal(expectedManifest.engine,'Astro');
const sources=['assets/site.js','assets/analytics.js','assets/tariffs.js','assets/industry-catalog.js'];
const assetChecks=[];
for(const source of sources){
 const expected=sha(readFileSync(published+'/'+source));
 let actual='';
 let status=0;
 for(let attempt=0;attempt<8;attempt++){
  const response=await fetch(origin+'/'+source+'?gaeo_qa_4a='+attempt+'-'+expected.slice(0,12),{cache:'no-store'});
  status=response.status;
  if(response.ok)actual=sha(Buffer.from(await response.arrayBuffer()));
  if(status===200 && actual===expected)break;
  await new Promise(done=>setTimeout(done,1500));
 }
 assert.equal(status,200,'Public asset HTTPS status: '+source);
 assert.equal(actual,expected,'Public asset does not match published main SHA-256: '+source);
 assetChecks.push({source,status,sha256:actual});
}
const browser=await chromium.launch({headless:true});
const cases=[];
try{
 for(const route of ['/tarify/','/en/pricing/'])for(const width of [1440,390,320]){
  const lang=route.startsWith('/en/')?'en':'ru';
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[],ownPosts=[];
  page.on('pageerror',error=>errors.push(String(error)));
  page.on('request',req=>{if(req.method()==='POST' && new URL(req.url()).hostname.endsWith('gaeo.ru'))ownPosts.push(req.url())});
  await page.route('https://mc.yandex.ru/**',r=>r.abort());
  await page.addInitScript(()=>{
   window.__gaeo4aPublicGoals=[];
   let analytics;
   Object.defineProperty(window,'GAEOAnalytics',{
    configurable:true,
    get(){return analytics;},
    set(value){analytics={...value,goal:(name,params)=>{
     window.__gaeo4aPublicGoals.push({name,params:JSON.parse(JSON.stringify(params||{}))});
     return true;
    }};}
   });
  });
  const response=await page.goto(origin+route,{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(response?.status(),200,'Public pricing HTTPS '+route);
  await page.waitForFunction(()=>Boolean(window.GAEOAnalytics&&document.querySelector('[data-industry-catalog]')?.dataset.catalogReady==='true'));
  assert.deepEqual(await page.evaluate(()=>window.__gaeo4aPublicGoals),[],'No automatic goals on public page');
  assert.equal(await page.locator('h1').count(),1,'One H1');
  assert.equal(await page.locator('[data-catalog-item]').count(),107,'107 industry categories');
  assert.equal(await page.locator('[data-tariff-calculator] [name="platform"]').count(),13,'13 AI platforms');
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1),false,'Page horizontal overflow');
  const calc=page.locator('[data-tariff-calculator]');
  await calc.locator('[data-prompt-adjust="1"]').click();
  await calc.locator('[name="plan"]').selectOption('guarantee');
  await calc.locator('[name="platform"][value="gemini"]').check();
  const search=page.locator('[data-catalog-search]');
  await search.fill('WMS');
  await page.waitForFunction(()=>document.querySelectorAll('[data-catalog-item]:not([hidden])').length===3);
  await search.fill('');
  await page.waitForFunction(()=>document.querySelectorAll('[data-catalog-item]:not([hidden])').length===107);
  const group=page.locator('[data-catalog-group]');
  await group.selectOption(await group.locator('option:not([value=""])').first().getAttribute('value'));
  assert.ok(await page.locator('[data-catalog-item]:visible').count()<107,'Group narrowed catalogue');
  await group.selectOption('');
  await calc.locator('[data-quote-inquiry]').click();
  await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1),false,'Modal overflow');
  await page.screenshot({path:out+'/4a-'+lang+'-'+width+'.png',animations:'disabled'});
  await page.locator('.gaeo-modal-close').click();
  assert.equal(await page.locator('[role="dialog"]').count(),0,'Modal closed');
  const goals=await page.evaluate(()=>window.__gaeo4aPublicGoals);
  const by=name=>goals.filter(e=>e.name===name);
  assert.ok(by('tariff_calculation_change').length>=2,'Calculator goals missing');
  assert.equal(by('tariff_plan_select').length,1,'Plan change goal should occur once');
  assert.ok(by('industry_catalog_filter').length>=4,'Catalog goals missing');
  assert.equal(by('lead_form_open').length,1,'One modal-open goal');
  assert.equal(by('lead_submit_success').length,0,'No test form submission');
  for(const goal of goals){
   assert.doesNotMatch(JSON.stringify(goal.params),/WMS|Расчет GEO|GEO estimate|data-gaeo-request|@/i,'Personal/request/search strings must not reach analytics');
  }
  assert.equal(ownPosts.length,0,'Public QA must not POST a lead');
  assert.equal(errors.length,0,'Browser JavaScript errors: '+errors.join('; '));
  cases.push({route,width,lang,goals:goals.map(e=>e.name),status:'PASS',lead_posts:0});
  await page.close();
 }
}finally{await browser.close();}
const report={
 published_main_sha:process.env.PUBLISHED_MAIN_SHA||'unknown',
 manifest_source_commit:expectedManifest.sourceCommit,
 public_origin:origin,
 asset_checks:assetChecks,
 public_browser_cases:cases,
 errors:0,
 lead_posts:0,
 result:'PASS'
};
writeFileSync(out+'/report.json',JSON.stringify(report,null,2)+'\n');
console.log('GAEO 4A public QA PASS: 4/4 assets SHA256 main parity; 6/6 RU/EN Chromium 1440/390/320; 4 goals; zero lead POST; zero errors');
