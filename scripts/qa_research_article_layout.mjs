import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';

const BASE='http://127.0.0.1:4341';
const articles=[
 {lang:'ru',slug:'/articles/geo-spetsialisty-110-otvetov-bmr-frs-2026/'},
 {lang:'en',slug:'/en/articles/geo-experts-110-ai-responses-bmr-frs-2026/'}
];
const viewports=[{width:1440,height:900},{width:390,height:844},{width:320,height:720}];
mkdirSync('visual-research',{recursive:true});
const preview=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4341'],{stdio:['ignore','pipe','pipe']});
let serverOutput='';
preview.stdout.on('data',v=>serverOutput+=String(v));
preview.stderr.on('data',v=>serverOutput+=String(v));
const pause=ms=>new Promise(done=>setTimeout(done,ms));
async function ready(){
 for(let i=0;i<50;i++){
  if(preview.exitCode!==null)throw Error('Astro preview exited: '+serverOutput.slice(-1500));
  try{const r=await fetch(BASE+articles[0].slug);if(r.ok)return}catch{}
  await pause(400);
 }
 throw Error('Preview not ready: '+serverOutput.slice(-1500));
}
let browser;let tested=0;
try{
 await ready();browser=await chromium.launch({headless:true});
 for(const article of articles){
  for(const viewport of viewports){
   const page=await browser.newPage({viewport,deviceScaleFactor:1});
   const jsErrors=[];page.on('pageerror',e=>jsErrors.push(String(e)));
   const response=await page.goto(BASE+article.slug,{waitUntil:'domcontentloaded',timeout:30000});
   assert.equal(response?.status(),200,'HTTP status');
   assert.equal(await page.locator('html').getAttribute('lang'),article.lang,'HTML language');
   assert.equal(await page.locator('h1').count(),1,'Exactly one heading');
   assert.equal(await page.locator('.geo-study-highlights__item').count(),4,'Four research indicators');
   assert.equal(await page.locator('.geo-study-toc a').count(),6,'Six named section links');
   assert.equal(await page.locator('.geo-study-scroll').count(),2,'Both tables');
   assert.equal(await page.locator('details.faq-item').count(),5,'Five shared FAQ entries');
   assert.equal(await page.locator('.geo-study-disclosure').count(),1,'Interest disclosure');
   assert.equal(await page.locator('.geo-study-sources').count(),1,'Research sources block');
   assert.equal(await page.locator('.geo-study-hero-figure img').count(),1,'Hero image');
   const info=await page.evaluate(()=>{
    const nav=[...document.querySelectorAll('.geo-study-toc a')];
    const missing=nav.filter(x=>!document.getElementById(new URL(x.href).hash.slice(1)));
    const schema=JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    const faq=schema['@graph'].find(x=>x['@type']==='FAQPage');
    const firstTable=document.querySelector('.geo-study-scroll');
    return {navMissing:missing.map(x=>x.href),faq:faq?.mainEntity?.length,htmlWidth:document.documentElement.scrollWidth,
      tableClient:firstTable?.clientWidth,tableScroll:firstTable?.scrollWidth,
      sourceLinks:document.querySelectorAll('.geo-study-article a[href^="https://indexresearch.ru"]').length};
   });
   assert.deepEqual(info.navMissing,[],'Broken in-page links');
   assert.equal(info.faq,5,'Structured FAQ consistency');
   assert.ok(info.sourceLinks>=2,'Original studies linked');
   assert.ok(info.htmlWidth<=viewport.width+2,'Page horizontal overflow at '+viewport.width+': '+info.htmlWidth);
   if(viewport.width<500)assert.ok(info.tableScroll>info.tableClient+40,'Mobile table scroll missing');
   const img=page.locator('.geo-study-hero-figure img');
   await img.scrollIntoViewIfNeeded();
   await img.evaluate(async el=>{
    if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,5000)});
   });
   assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Broken hero image');
   assert.deepEqual(jsErrors,[],'Page JavaScript errors');
   await page.evaluate(()=>scrollTo(0,0));
   await page.screenshot({path:'visual-research/'+article.lang+'-'+viewport.width+'-hero.png',animations:'disabled'});
   if(viewport.width===390){
     await page.locator('.geo-study-scroll').first().scrollIntoViewIfNeeded();
     await page.screenshot({path:'visual-research/'+article.lang+'-390-table.png',animations:'disabled'});
   }
   console.log('RESEARCH_LAYOUT_PASS '+article.lang+' '+viewport.width+'px indicators=4 faq=5 links=6 overflow=0 tableScroll='+info.tableScroll);
   tested++;await page.close();
  }
 }
 assert.equal(tested,6,'Unexpected number of tested layouts');
 console.log('RESEARCH_LAYOUT_QA=PASS; screenshots in visual-research');
}finally{
 if(browser)await browser.close();preview.kill('SIGTERM');
}
