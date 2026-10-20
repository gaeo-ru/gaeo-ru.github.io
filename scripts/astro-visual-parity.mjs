import {chromium} from 'playwright';
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs';
import {spawn} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
const SERVER='http://127.0.0.1:4321',LIVE='https://gaeo.ru';
const routes=['/','/publications/','/industries/tourism/','/strategies/measurement/','/cases/ada-tours-rost-neyrovidimosti-za-2-nedeli/','/en/industries/'];
const cases=[];
for(const route of routes)for(const mobile of [true,false]){
 cases.push({route,mobile,view:mobile?{width:390,height:844}:{width:1440,height:900},scenario:'top'});
}
cases.push({route:'/publications/',mobile:true,view:{width:390,height:844},scenario:'menu'});
cases.push({route:'/industries/tourism/',mobile:true,view:{width:390,height:844},scenario:'cta'});
cases.push({route:'/strategies/measurement/',mobile:true,view:{width:390,height:844},scenario:'cta'});
const server=spawn('python3',['-m','http.server','4321','--directory','dist'],{stdio:'ignore'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function ready(){
 for(let n=0;n<30;n++){
  try{const res=await fetch(SERVER);if(res.ok)return;}catch{}
  await sleep(500);
 }
 throw Error('Astro preview did not start');
}
async function screenshot(browser,origin,test){
 const page=await browser.newPage({viewport:test.view,deviceScaleFactor:1,colorScheme:'light',reducedMotion:'reduce',locale:'ru-RU',timezoneId:'Europe/Moscow'});
 page.on('dialog',dialog=>dialog.dismiss());
 try{
  await page.goto(origin+test.route,{waitUntil:'domcontentloaded',timeout:45000});
  await page.waitForLoadState('networkidle',{timeout:8000}).catch(()=>{});
  await page.evaluate(async()=>{await document.fonts.ready;});
  await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}'});
  if(test.scenario==='menu'){
   const button=page.locator('.menu-toggle');
   await button.click({timeout:12000});
   if(!await page.locator('.mobile-menu.open').count())throw Error('Mobile menu did not open');
  }
  if(test.scenario==='cta'){
   const cta=page.locator('.page-cta');
   if(await cta.count()!==1)throw Error('Expected 1 CTA in '+test.route);
   await cta.scrollIntoViewIfNeeded({timeout:12000});
  }
  await sleep(350);
  return await page.screenshot({type:'png',fullPage:false});
 }finally{await page.close();}
}
const safe=s=>s.replace(/[^a-z0-9]+/gi,'_').replace(/^_+|_+$/g,'')||'home';
mkdirSync('visual-parity',{recursive:true});
let browser;const errors=[];const report=[];
try{
 await ready();
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const test of cases){
  const name=safe(test.route)+'_'+(test.mobile?'mobile':'desktop')+'_'+test.scenario;
  try{
   const a=PNG.sync.read(await screenshot(browser,LIVE,test));
   const b=PNG.sync.read(await screenshot(browser,SERVER,test));
   if(a.width!==b.width||a.height!==b.height){errors.push(name+' dimensions differ');continue;}
   const diff=new PNG({width:a.width,height:a.height});
   const pixels=pixelmatch(a.data,b.data,diff.data,a.width,a.height,{threshold:0.10,includeAA:false});
   const ratio=pixels/(a.width*a.height);
   report.push({name,pixels,ratio:Math.round(ratio*10000)/100});
   if(ratio>0.005){
    errors.push(name+' '+(ratio*100).toFixed(3)+'% pixels differ (max 0.5%)');
    writeFileSync('visual-parity/'+name+'_DIFF.png',PNG.sync.write(diff));
    writeFileSync('visual-parity/'+name+'_PRODUCTION.png',PNG.sync.write(a));
    writeFileSync('visual-parity/'+name+'_ASTRO.png',PNG.sync.write(b));
   }
  }catch(err){errors.push(name+' '+err.message);}
 }
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
writeFileSync('visual-parity/report.json',JSON.stringify({report,errors},null,2));
console.log('VISUAL_CHECKS='+report.length);
for(const row of report)console.log(row.name+' '+row.ratio+'% differing pixels');
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('VISUAL_PARITY=PASS (each comparison at most 0.5% differing pixels)');
