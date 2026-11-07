import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const BASE='http://127.0.0.1:4348';
const definitions=[
 'Product Recommendation Rate',
 'Seller Criterion Rate',
 'Retailer Association Rate',
 'Retailer Recommendation Rate',
 'Price Premium Survival Rate'
];
const cases=[
 {ru:'/strategies/ecommerce-measurement/',en:'/en/strategies/ecommerce-measurement/',checks:[
  {selector:'.ecommerce-method-table--metrics',firstMax:110},
  {selector:'.ecommerce-method-table:not(.ecommerce-method-table--metrics)',firstMax:147}
 ],metricNames:true},
 {ru:'/strategies/ecommerce-catalog/',en:'/en/strategies/ecommerce-catalog/',checks:[
  {selector:'.ecommerce-method-table',firstMax:147}
 ]},
 {ru:'/articles/agentnaya-torgovlya-gotovnost-internet-magazina/',en:'/en/articles/agentic-commerce-readiness/',checks:[
  {selector:'.agent-commerce-table',firstMax:157}
 ]},
 {ru:'/articles/geo-spetsialisty-110-otvetov-bmr-frs-2026/',en:'/en/articles/geo-experts-110-ai-responses-bmr-frs-2026/',checks:[
  {selector:'.geo-study-table--comparison',firstMax:162},
  {selector:'.geo-study-table--providers',firstMax:142,secondMax:154}
 ]},
 {ru:'/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/',en:'/en/articles/legal-website-geo-12-checks/',checks:[
  {selector:'.legal-proof-table',firstMax:186,all:true}
 ]},
 {ru:'/tarify/',en:'/en/pricing/',checks:[
  {selector:'.tariff-comparison table',firstMax:156}
 ]},
 {ru:'/strategies/legal-recommendations/',en:'/en/strategies/legal-recommendations/',stacked:true,checks:[]}
];
const preview=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4348'],{stdio:['ignore','pipe','pipe']});
let output='';
preview.stdout.on('data',b=>output+=String(b));
preview.stderr.on('data',b=>output+=String(b));
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
 for(let i=0;i<50;i++){
  if(preview.exitCode!==null)throw Error('Astro preview exited: '+output.slice(-1000));
  try{if((await fetch(BASE+'/strategies/ecommerce-measurement/')).ok)return}catch{}
  await pause(400);
 }
 throw Error('Preview not ready: '+output.slice(-1000));
}
mkdirSync('visual-mobile-tables',{recursive:true});
let browser,completed=0;
try{
 await ready();
 browser=await chromium.launch({headless:true});
 for(const entry of cases)for(const lang of ['ru','en'])for(const width of [390,320]){
  const route=entry[lang];
  const page=await browser.newPage({viewport:{width,height:844},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(BASE+route,{waitUntil:'domcontentloaded',timeout:30000});
  assert.equal(response?.status(),200,'Page did not load: '+route);
  assert.equal(await page.locator('html').getAttribute('lang'),lang,'Wrong language: '+route);
  if(entry.metricNames){
   const names=await page.locator('.ecommerce-metric-full').allTextContents();
   assert.deepEqual(names.map(x=>x.trim()),definitions,'Missing full metric names: '+route);
  }
  if(entry.stacked){
   const info=await page.locator('.industry-table-scroll').first().evaluate(wrapper=>{
    const table=wrapper.querySelector('table');
    return {viewport:wrapper.clientWidth,tableWidth:table.getBoundingClientRect().width,tableMinimum:getComputedStyle(table).minWidth};
   });
   assert.ok(info.tableWidth<=info.viewport+2,'Stacked legal table still overflows at '+width+': '+JSON.stringify(info));
  }
  for(const check of entry.checks){
   const tables=page.locator(check.selector);
   const count=check.all?await tables.count():1;
   assert.ok(count>0,'Missing '+check.selector+' on '+route);
   for(let n=0;n<count;n++){
    const table=tables.nth(n);
    const dims=await table.evaluate(el=>{
     const first=el.querySelector('thead th:first-child');
     const second=el.querySelector('thead th:nth-child(2)');
     const wrapper=el.parentElement;
     return {
      first:first?.getBoundingClientRect().width||0,
      second:second?.getBoundingClientRect().width||0,
      scrollWidth:wrapper?.scrollWidth||0,
      clientWidth:wrapper?.clientWidth||0
     };
    });
    assert.ok(dims.first>0&&dims.first<=check.firstMax,'First column too wide: '+route+' '+check.selector+' '+width+' '+JSON.stringify(dims));
    if(check.secondMax)assert.ok(dims.second>0&&dims.second<=check.secondMax,'Second column too wide: '+route+' '+check.selector+' '+width+' '+JSON.stringify(dims));
    assert.ok(dims.scrollWidth>dims.clientWidth+40,'Table should remain scrollable: '+route+' '+check.selector+' '+width+' '+JSON.stringify(dims));
    if(width===390&&n===0){
     await table.scrollIntoViewIfNeeded();
     const id=route.replace(/^\/|\/$/g,'').replaceAll('/','-')||'home';
     await page.screenshot({path:'visual-mobile-tables/'+id+'-'+check.selector.replace(/[^a-z0-9]+/gi,'-')+'.png',animations:'disabled'});
    }
   }
  }
  assert.deepEqual(errors,[],'Browser script errors: '+route);
  await page.close();
  completed++;
  console.log('MOBILE_SCROLL_TABLE_PASS '+route+' width='+width);
 }
 assert.equal(completed,cases.length*2*2,'Unexpected tested page count');
 console.log('MOBILE_SCROLL_TABLE_QA=PASS cases='+completed);
}finally{
 if(browser)await browser.close();
 preview.kill();
}
