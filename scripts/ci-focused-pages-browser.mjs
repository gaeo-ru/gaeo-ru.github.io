// A small real-browser smoke test for only source pages modified in this release.
// Large sector/ranking browser suites remain separately change-gated.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdirSync} from 'node:fs';
import {chromium} from 'playwright';

const routes=JSON.parse(process.env.GAEO_CI_ROUTES||'[]');
assert.ok(Array.isArray(routes)&&routes.length>0&&routes.length<=8,'Expected 1..8 changed routes');
assert.ok(routes.every(route=>typeof route==='string'&&/^\/[a-zA-Z0-9/_-]*(?:\.html)?$/.test(route)),
  'Untrusted/invalid preview route');
const base='http://127.0.0.1:4379';
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4379'],{
 stdio:['ignore','pipe','pipe']
});
let diagnostic='';
server.stdout.on('data',chunk=>diagnostic+=String(chunk).slice(-1000));
server.stderr.on('data',chunk=>diagnostic+=String(chunk).slice(-1000));
const pause=ms=>new Promise(done=>setTimeout(done,ms));
async function awaitServer(){
 for(let n=0;n<60;n++){
  if(server.exitCode!==null)throw Error('Astro preview exited: '+diagnostic.slice(-2000));
  try{if((await fetch(base+'/')).ok)return;}catch{}
  await pause(250);
 }
 throw Error('Astro preview did not start: '+diagnostic.slice(-2000));
}
let browser,checked=0;
try{
 await awaitServer();
 browser=await chromium.launch({headless:true});
 mkdirSync('visual-ci-focused',{recursive:true});
 const widths=process.env.GAEO_CI_MODE==='text-only'?[1440,390]:[1440,390,320];
 for(const route of routes)for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',error=>errors.push(String(error)));
  try{
   const response=await page.goto(base+route,{waitUntil:'domcontentloaded',timeout:25000});
   assert.equal(response?.status(),200,'Missing page '+route);
   assert.equal(await page.locator('h1').count(),1,'Missing/duplicate H1: '+route);
   const lang=route.startsWith('/en/')?'en':'ru';
   assert.equal(await page.locator('html').getAttribute('lang'),lang,'Wrong page language '+route);
   const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
   assert.equal(canonical,'https://gaeo.ru'+route,'Incorrect canonical '+route);
   const screen=await page.evaluate(()=>({
    doc:document.documentElement.scrollWidth,
    viewport:window.innerWidth,
    title:document.title,
    h1:document.querySelector('h1')?.innerText
   }));
   assert.ok(screen.doc<=width+2,'Horizontal overflow '+JSON.stringify({route,width,...screen}));
   if(width===1440){
    // Check that the first real content image can be decoded, not just referenced.
    const first=page.locator('main img').first();
    if(await first.count()){
     await first.scrollIntoViewIfNeeded();
     await first.evaluate(async image=>{
      if(!image.complete)await new Promise(done=>{
       image.addEventListener('load',done,{once:true});
       image.addEventListener('error',done,{once:true});
       setTimeout(done,3500);
      });
     });
     assert.ok(await first.evaluate(image=>image.complete&&image.naturalWidth>0),
       'First content image did not load on '+route);
    }
   }
   assert.deepEqual(errors,[],'Browser errors on '+route);
   await page.evaluate(()=>scrollTo(0,0));
   const safe=(route.replace(/^\/|\/$/g,'').replaceAll('/','-')||'home');
   await page.screenshot({
    path:'visual-ci-focused/'+safe+'-'+width+'.png',
    animations:'disabled',timeout:12000
   });
   console.log('FOCUSED_BROWSER_PASS '+route+' '+width+'px');
   checked++;
  }finally{await page.close();}
 }
 console.log('FOCUSED_BROWSER_QA=PASS screenshots='+checked);
}finally{
 if(browser)await browser.close();
 server.kill();
}
