import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';

const slugs=['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours'];
const root=resolve(process.cwd(),'dist');
let count=0;
for(const slug of slugs)for(const lang of ['ru','en']){
 const route='/'+(lang==='en'?'en/':'')+'cases/'+slug+'/';
 const path=resolve(root,route.slice(1),'index.html');
 assert.ok(existsSync(path),'Missing case: '+route);
 const html=readFileSync(path,'utf8');
 assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+route+'"'),'Canonical '+route);
 assert.ok(html.includes('property="og:url" content="https://gaeo.ru'+route+'"'),'OG '+route);
 for(const alt of ['ru','en']){
  const target='https://gaeo.ru/'+(alt==='en'?'en/':'')+'cases/'+slug+'/';
  assert.ok(html.includes('hreflang="'+alt+'" href="'+target+'"'),'Hreflang '+route);
 }
 assert.equal((html.match(/<h1/g)||[]).length,1,'H1 count '+route);
 const data=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 assert.ok(data,'Schema '+route);
 const entities=JSON.parse(data[1])['@graph'];
 const article=entities.find(x=>x['@type']==='Article');
 const faq=entities.find(x=>x['@type']==='FAQPage');
 assert.equal(article.dateModified,'2026-10-26','Date modified '+route);
 assert.ok(article.image && !article.image.endsWith('gaeo-social-preview.jpg'),'Cover '+route);
 assert.equal(faq.mainEntity.length,3,'FAQ length '+route);
 const updated=lang==='en'?'Updated: October 26, 2026':'Обновлено: 26 октября 2026';
 assert.ok(html.includes(updated),'Visible date '+route);
 count++;
}
console.log('DEVELOPMENT_CASE_QA=PASS; pages='+count);

const base='http://127.0.0.1:4333';
const server=spawn('./node_modules/.bin/astro',['preview','--host','127.0.0.1','--port','4333'],{stdio:'ignore'});
let browser,tests=0;
try{
 let started=false;
 for(let i=0;i<60;i++){
  if(server.exitCode!==null)break;
  try{if((await fetch(base+'/cases/')).ok){started=true;break;}}catch{}
  await new Promise(done=>setTimeout(done,350));
 }
 assert.ok(started,'Astro preview could not start');
 browser=await chromium.launch({headless:true});
 for(const slug of slugs)for(const lang of ['ru','en'])for(const width of [1440,390,320]){
  const route='/'+(lang==='en'?'en/':'')+'cases/'+slug+'/';
  const page=await browser.newPage({viewport:{width,height:width===1440?900:780}});
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200,'HTTP status '+route);
  assert.equal(await page.locator('h1').count(),1,'H1 '+route);
  assert.equal(await page.locator('.dev-case__chapter').count(),7,'Sections '+route);
  assert.equal(await page.locator('details.faq-item').count(),3,'FAQ '+route);
  const before=await page.evaluate(()=>document.documentElement.scrollWidth);
  assert.ok(before<=width+2,'Overflow before modal '+route+' at '+width+'='+before);
  const faq=page.locator('details.faq-item').first();
  await faq.locator('summary').click();
  assert.ok(await faq.evaluate(el=>el.open),'FAQ interaction '+route);
  await page.locator('.page-cta .button[href$="#lead"]').click();
  await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
  await page.locator('.gaeo-modal-close').click();
  assert.equal(await page.locator('[role="dialog"]').count(),0,'Modal teardown '+route);
  let after=await page.evaluate(()=>document.documentElement.scrollWidth);
  if(after>width+2){await page.waitForTimeout(200);after=await page.evaluate(()=>document.documentElement.scrollWidth);}
  assert.ok(after<=width+2,'Overflow after modal '+route+' at '+width+'='+after);
  assert.deepEqual(errors,[],'JS errors '+route);
  tests++;await page.close();
 }
}finally{if(browser)await browser.close();server.kill('SIGTERM');}
console.log('DEVELOPMENT_CASE_BROWSER_QA=PASS; cases='+tests);
