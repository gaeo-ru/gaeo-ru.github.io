import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {createServer} from 'node:http';
import {articles,categories,categoryArticles,route,articleRoute,versionsFor,validateAll,SITE} from '../src/lib/rankings.mjs';

validateAll();
const dist=resolve('dist');
const esc=v=>String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const read=path=>readFileSync(resolve(dist,path.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const d=JSON.parse(m[1]);return d['@graph']||[d];});
const paths=[];
assert.equal(categories[0].id,'products','Products precedes every research category');
assert.equal(categories.length,8,'The eight included IndexResearch categories');
for(const lang of ['ru','en']){
  const index=read(route(lang));paths.push(route(lang));
  assert.equal(graph(index).find(n=>n['@type']==='ItemList').numberOfItems,articles.length,'One index entry per article family');
  for(const c of categories){
    assert.ok(index.includes(`id="${c.id}"`),'Every category is available from the index');
    if(categoryArticles(c.id).length){const path=route(lang,c.id);paths.push(path);assert.equal(graph(read(path)).find(n=>n['@type']==='ItemList').numberOfItems,categoryArticles(c.id).length,'Exact category count');}
  }
  const home=read(lang==='en'?'/en/':'/');
  const header=home.match(/<!-- SITE_HEADER_START -->[\s\S]*?<!-- SITE_HEADER_END -->/)?.[0];
  const footer=home.match(/<!-- SITE_FOOTER_START -->[\s\S]*?<!-- SITE_FOOTER_END -->/)?.[0];
  assert.ok(!header.includes('href="'+route(lang)+'"'),'No rankings link in the main navigation');
  assert.equal(footer.split('href="'+route(lang)+'"').length-1,1,'One understated footer entry');
  const main=home.match(/<main\b[\s\S]*?<\/main>/)?.[0]||'';
  assert.ok(!main.includes('href="'+route(lang)+'"'),'No homepage promotion for rankings');
}
for(const a of articles){
  const sourcePath=resolve(`docs/rankings/sources/${a.id}.json`);
  let manifest=null;if(existsSync(sourcePath))manifest=JSON.parse(readFileSync(sourcePath,'utf8'));
  for(const lang of ['ru','en']){
    const path=articleRoute(a,lang),html=read(path),nodes=graph(html);paths.push(path);
    assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' has one H1');
    assert.equal((html.match(/rel="canonical"/g)||[]).length,1,path+' has one canonical');
    assert.ok(html.includes(`rel="canonical" href="${SITE+path}"`),'Self canonical '+path);
    for(const code of ['ru','en','x-default'])assert.ok(html.includes(`hreflang="${code}" href="${SITE+articleRoute(a,code==='en'?'en':'ru')}"`),'Reciprocal language link '+path);
    assert.equal(nodes.filter(n=>n['@type']==='Article').length,1,'One Article node');
    assert.equal(nodes.filter(n=>n['@type']==='FAQPage').length,1,'One FAQPage node');
    assert.ok(!nodes.some(n=>['AggregateRating','Review','Dataset'].includes(n['@type'])),'An editorial ranking does not fabricate review or dataset markup');
    const list=nodes.find(n=>n['@type']==='ItemList');
    assert.equal(list.numberOfItems,a[lang].ranking.length,'Declared participant count');
    assert.deepEqual(list.itemListElement.map(x=>x.position),a[lang].ranking.map(x=>x.position),'Exact order in JSON-LD');
    assert.deepEqual(list.itemListElement.map(x=>x.name),a[lang].ranking.map(x=>x.name),'Exact entities in JSON-LD');
    assert.equal((html.match(/class="ranking-entry(?: ranking-entry--first)?"/g)||[]).length,a[lang].ranking.length,'Every participant has a complete visible profile');
    assert.equal((html.match(/<details class="faq-item">/g)||[]).length,a[lang].faq.length,'Canonical FAQ markup');
    assert.deepEqual(nodes.find(n=>n['@type']==='FAQPage').mainEntity.map(f=>[f.name,f.acceptedAnswer.text]),a[lang].faq.map(f=>[f.question,f.answer]),'FAQ schema is generated from the visible answers');
    for(const f of a[lang].faq)assert.ok(html.includes(esc(f.question))&&html.includes(esc(f.answer)),'FAQ text visible without JavaScript');
    for(const v of versionsFor(a,lang))assert.ok(html.includes(`href="${esc(v.url)}"`),'Publication version retained '+v.url);
    for(const l of a.clientLinks)assert.ok(html.includes(`href="${esc(l.url)}" target="_blank" rel="sponsored noopener noreferrer"`),'Exact registered client link retained');
    const linked=new Set(versionsFor(a,lang).map(v=>v.url));
    if(manifest?.publishedVersions){
      for(const v of manifest.publishedVersions){
        if((lang==='ru'&&v.language==='en')||(lang==='en'&&v.language==='ru'&&/indexresearch|github/i.test(v.platform)))continue;
        assert.ok(linked.has(v.url),`${a.id}/${lang}: missing registered published version ${v.url}`);
      }
    }
    assert.ok(!html.includes('drive.google.com')&&!html.includes('docs.google.com')&&!html.includes('disk:/'),'Private source paths remain in the repository, not public HTML');
    const article=nodes.find(n=>n['@type']==='Article');
    assert.equal(article.datePublished,a.publishedDate,'GAEO publication date');
    assert.ok(html.includes(`datetime="${a.dataAsOf||a.sourceDate}"`),'Original evidence date is visible');
    for(const img of a.images){assert.ok(html.includes(`src="${img.src}"`),'The actual image is included');assert.ok(existsSync(resolve(dist,'.'+img.src)),'The image was copied into the build');}
    assert.ok(!/\[\[AGENT|\[ВСТАВИТЬ|\[ИЗОБРАЖЕНИЕ/.test(html),'No source preparation instructions leak into the page');
  }
}
console.log(`RANKINGS_STATIC=PASS; articles=${articles.length}; languages=2; routes=${paths.length}; categories=${categories.length}`);
if(!process.argv.includes('--browser'))process.exit(0);

let server;const supplied=process.argv.find(x=>x.startsWith('--origin='))?.slice(9);
let origin=supplied;
if(!origin){
  server=createServer((req,res)=>{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=resolve(dist,'.'+pathname+(pathname.endsWith('/')?'index.html':''));if(!file.startsWith(dist+'/')||!existsSync(file)){res.writeHead(404);res.end();return;}const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream'});res.end(readFileSync(file));});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));origin=`http://127.0.0.1:${server.address().port}`;
}
const {chromium}=await import('playwright');
let browser;
const report=[];mkdirSync('visual-rankings',{recursive:true});
const footerChecks=[];
try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({reducedMotion:'reduce'});
  await context.route('**/*',request=>request.request().url().startsWith(origin)?request.continue():request.abort());
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:960});
    for(const path of paths){
      const response=await page.goto(origin+path,{waitUntil:'networkidle'});assert.equal(response.status(),200,'Public response '+path);
      assert.equal(await page.locator('h1').count(),1,'One visible main heading');
      const footerLink=page.locator(`footer a:not(.lang-link)[href="${route(path.startsWith('/en/')?'en':'ru')}"]`);
      assert.equal(await footerLink.count(),1,'One rankings footer link after JavaScript');
      assert.ok(await footerLink.isVisible(),'Rankings footer entry remains visible after shared navigation rebuild');
      const overflow=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth}));
      if(overflow.document>width+1)console.error('OVERFLOW_ELEMENTS',path,width,await page.evaluate(()=>Array.from(document.querySelectorAll('body *')).filter(e=>!e.closest('.ranking-table-scroll')).filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,class:e.className,text:e.textContent.slice(0,75),right:e.getBoundingClientRect().right})).slice(0,15)));
      assert.ok(overflow.document<=width+1,`No horizontal page overflow ${width} ${path}: ${JSON.stringify(overflow)}`);
      const desktop=page.locator('header .desktop-menu');
      if(await desktop.isVisible()){const language=await desktop.locator('.lang-en').boundingBox(),cta=await page.locator('header .header-cta').boundingBox();assert.ok(language.x+language.width<=cta.x,'Desktop language switch is not covered by CTA');}
      const a=articles.find(a=>path===articleRoute(a,path.startsWith('/en/')?'en':'ru'));
      if(a){
        for(const img of await page.locator('.ranking-figure img').all()){
          await img.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
          await img.evaluate(el=>new Promise((resolve,reject)=>{
            if(el.complete&&el.naturalWidth>0)return resolve();
            const timer=setTimeout(()=>reject(new Error('Image load timed out: '+el.currentSrc)),15000);
            el.addEventListener('load',()=>{clearTimeout(timer);resolve();},{once:true});
            el.addEventListener('error',()=>{clearTimeout(timer);reject(new Error('Image failed: '+el.currentSrc));},{once:true});
          }));
          await img.evaluate(el=>el.decode());
          assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'A real image renders '+path);
        }
        const faq=page.locator('.faq-item').first();await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),'','FAQ opens');assert.ok(await faq.locator('.faq-a').isVisible(),'FAQ answer visible');await faq.locator('summary').click();assert.equal(await faq.getAttribute('open'),null,'FAQ closes');
        const schemaFaq=await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent)['@graph'].find(n=>n['@type']==='FAQPage').mainEntity.map(x=>x.acceptedAnswer.text));
        const renderedFaq=await page.locator('.faq-a').allTextContents();assert.deepEqual(renderedFaq.map(x=>x.trim()),schemaFaq,'Browser text agrees with FAQ schema');
        if(width===390||width===1440){await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`visual-rankings/${a.id}-${path.startsWith('/en/')?'en':'ru'}-${width}-hero.png`});}
        if(width===390&&!path.startsWith('/en/')){await page.locator('#comparison').screenshot({path:`visual-rankings/${a.id}-${width}-comparison.png`});}
      }else{
        for(const img of await page.locator('.ranking-card__link>img').all()){
          await img.evaluate(el=>{el.loading='eager';el.scrollIntoView({block:'center',behavior:'instant'});});
          await page.waitForFunction(el=>el.complete&&el.naturalWidth>0,await img.elementHandle(),{timeout:15000});
          await img.evaluate(el=>el.decode());
        }
        if(path===route(path.startsWith('/en/')?'en':'ru')&&(width===1440||width===390)){await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.screenshot({path:`visual-rankings/index-${path.startsWith('/en/')?'en':'ru'}-${width}.png`,fullPage:true});}
      }
      report.push({path,width,status:200,overflow:false,images:a?a.images.length:null,faq:a?'native-details-pass':null});
    }
  }
  for(const width of [1440,390,320])for(const lang of ['ru','en']){
    await page.setViewportSize({width,height:960});
    const path=lang==='en'?'/en/':'/';
    const response=await page.goto(origin+path,{waitUntil:'networkidle'});assert.equal(response.status(),200);
    const footerLink=page.locator(`footer a:not(.lang-link)[href="${route(lang)}"]`);
    assert.equal(await footerLink.count(),1,'One homepage footer link after JavaScript');
    assert.ok(await footerLink.isVisible(),'Homepage footer provides a real visible archive entry');
    assert.equal(await page.locator(`header a[href="${route(lang)}"]`).count(),0,'No archive entry added to the homepage header');
    const cols=page.locator('footer .footer-grid');
    const caseLinks=cols.locator(':scope > div:nth-child(2) > .footer-submenu--cases > a.footer-case-link');
    assert.deepEqual(await caseLinks.evaluateAll(els=>els.map(a=>a.getAttribute('href'))),
      lang==='en'?['/en/cases/#geo-promotion','/en/cases/#website-development']:['/cases/#geo-promotion','/cases/#website-development'],'Footer case submenu follows the header');
    const rightLinks=await cols.locator(':scope > div:nth-child(3) a').evaluateAll(els=>els.map(a=>a.getAttribute('href')));
    const articleHref=lang==='en'?'/en/publications/articles/':'/publications/articles/';
    const rankingHref=route(lang);
    const profileHref=lang==='en'?'/en/professional-biography/#official-profiles':'/professional-biography/#external-profiles';
    assert.ok(rightLinks.indexOf(articleHref)>=0 && rightLinks.indexOf(rankingHref)===rightLinks.indexOf(articleHref)+1 && rightLinks.indexOf(profileHref)===rightLinks.indexOf(rankingHref)+1,'Rankings follow authored publications and precede profiles');
    assert.equal(await cols.locator(':scope > .footer-brand > .footer-lang').count(),1,'Footer language switch is under brand/contact column');
    assert.equal(await cols.locator(':scope > div:nth-child(3) > .footer-lang').count(),0,'No language switch below publications');
    const contact=await cols.locator(':scope > .footer-brand .footer-contact').innerText();
    assert.ok(contact.includes('Email: ya@gaeo.ru') && contact.includes((lang==='en'?'Phone:':'Телефон:')+' +7 (926) 42-42-333'),'Email and phone have labeled separate lines');
    const contactLines=contact.split(/\n+/).map(s=>s.trim());
    assert.ok(contactLines.some(s=>s.startsWith('Email:')) && contactLines.some(s=>s.startsWith(lang==='en'?'Phone:':'Телефон:')),'Labeled contacts are separate');
    const telegramLabel=cols.locator(':scope > .footer-brand .footer-contact__label').filter({hasText:'Telegram:'});
    assert.equal(await telegramLabel.count(),1,'Telegram label exists');
    assert.ok(Number(await telegramLabel.evaluate(el=>getComputedStyle(el).fontWeight))>=600,'Telegram label is bold');
    for(const type of ['cases','publications']){
      const group=cols.locator('.footer-submenu--'+type);
      assert.equal(await group.count(),1,'One submenu '+type);
      const m=await group.evaluate(el=>{
        const g=el.getBoundingClientRect(),children=[...el.querySelectorAll('a')];
        return {style:getComputedStyle(el).borderLeftStyle,height:g.height,first:children[0].getBoundingClientRect().top-g.top,last:g.bottom-children[children.length-1].getBoundingClientRect().bottom};
      });
      assert.ok(m.style==='solid'&&m.height>25&&m.first>=-2&&m.last>=-2,'Continuous border covers the entire submenu '+type);
    }
    footerChecks.push({path,width,visible:true,headerEntry:false});
  }
  assert.deepEqual(errors,[],'No page JavaScript errors');
  writeFileSync('visual-rankings/report.json',JSON.stringify({origin,checkedAt:new Date().toISOString(),result:'pass',checks:report,footerChecks},null,2)+'\n');
  console.log(`RANKINGS_BROWSER=PASS; ${report.length} route/viewport checks; footer_checks=${footerChecks.length}; widths=1440,390,320; origin=${origin}`);
}finally{if(browser)await browser.close();if(server)await new Promise(r=>server.close(r));}
