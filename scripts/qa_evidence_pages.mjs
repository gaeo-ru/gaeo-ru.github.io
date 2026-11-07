import assert from 'node:assert/strict';
import {readFileSync,existsSync,mkdirSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {createServer} from 'node:http';
import {publications,reviewData,categories,publicationRoute,reviewsRoute,reviewSummary,BUSINESS,SITE} from '../src/lib/evidence.mjs';

const dist=resolve('dist'),summary=reviewSummary();
const read=path=>readFileSync(resolve(dist,path.slice(1),'index.html'),'utf8');
const graph=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const d=JSON.parse(m[1]);return d['@graph']||[d]});
const occurrences=(html,token)=>html.split(token).length-1;
const ids=new Set(publications.items.map(x=>x.id));
assert.equal(ids.size,publications.items.length,'Publication identifiers are unique');
assert.deepEqual(publications.items.filter(x=>x.legacyPosition).map(x=>x.legacyPosition).sort((a,b)=>a-b),Array.from({length:51},(_,i)=>i+1),'All 51 original entries retained');
assert.equal(new Set(reviewData.items.map(x=>x.id)).size,reviewData.items.length,'Review identifiers are unique');
assert.equal(new Set(reviewData.items.map(x=>x.ru.text.trim())).size,reviewData.items.length,'Identical review texts must not inflate the count');
assert.ok(reviewData.items.some(x=>x.ru.author==='Ульяна К'&&x.rating===4),'Preserve the verified four-star review');
for(const review of reviewData.items){
  assert.ok(review.ru?.text&&review.en?.text&&review.ru?.author&&review.en?.author,'Bilingual review content '+review.id);
  assert.ok(review.url.startsWith('https://'),'Review source '+review.id);
  if(review.rating!==null)assert.ok(Number.isFinite(review.rating)&&review.rating>=1&&review.rating<=5,'Verified rating '+review.id);
}

const routes=[];
for(const lang of ['ru','en']){
  const hubPath=publicationRoute(lang),hub=read(hubPath),hubGraph=graph(hub);
  routes.push(hubPath,reviewsRoute(lang),lang==='en'?'/en/':'/');
  assert.equal(hubGraph.find(x=>x['@type']==='ItemList').numberOfItems,4,'Hub lists four sections');
  assert.equal(occurrences(hub,'class="publication-directory__card"'),4,'Four visible navigation cards');
  let total=0;
  for(const category of categories){
    const path=publicationRoute(lang,category.id),html=read(path),nodes=graph(html);
    routes.push(path);
    const list=nodes.find(x=>x['@type']==='ItemList'),expected=publications.items.filter(x=>x.category===category.id);
    assert.equal(list.numberOfItems,expected.length,path+' JSON-LD count');
    assert.equal(occurrences(html,'data-publication-id='),expected.length,path+' visible count');
    assert.deepEqual(list.itemListElement.map(x=>x.position),Array.from({length:expected.length},(_,i)=>i+1),'Continuous list positions '+path);
    assert.equal(nodes.find(x=>x['@type']==='CollectionPage').isPartOf['@id'],SITE+hubPath+'#collectionpage','Parent collection '+path);
    for(const entry of expected){
      assert.ok(html.includes('id="'+entry.id+'"'),'Stable entry anchor '+entry.id);
      for(const a of entry[lang].links)assert.ok(html.includes(a.url.replace(/&/g,'&amp;')),'Retained source '+a.url);
    }
    total+=expected.length;
  }
  assert.equal(total,publications.items.length,'Exactly one category per entry');
  const reviewHtml=read(reviewsRoute(lang)),reviewGraph=graph(reviewHtml);
  const reviewNodes=reviewGraph.filter(x=>x['@type']==='Review');
  assert.equal(reviewNodes.length,reviewData.items.length,'One Review node per visible card');
  assert.equal(occurrences(reviewHtml,'data-review-id='),reviewData.items.length,'Review count matches visible page');
  const home=read(lang==='en'?'/en/':'/');
  assert.equal(occurrences(home,'class="review-carousel__card"'),reviewData.items.length,'Homepage excerpts include the full collection');
  for(const html of [reviewHtml,home]){
    const aggregate=graph(html).find(x=>x['@id']===BUSINESS).aggregateRating;
    assert.equal(aggregate.reviewCount,summary.count,'Aggregate reviewCount matches collection');
    assert.equal(aggregate.ratingCount,summary.ratedCount,'Aggregate ratingCount excludes unverified scores');
    assert.equal(aggregate.ratingValue,Number((reviewData.items.filter(x=>Number.isFinite(x.rating)).reduce((n,x)=>n+x.rating,0)/summary.ratedCount).toFixed(1)),'Average calculated from verified values');
    assert.ok(html.includes('/assets/style.css'),'Shared submenu styles');
  }
}
for(const path of routes){
  const html=read(path);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,'One H1 '+path);
  assert.equal(occurrences(html,`rel="canonical" href="${SITE+path}"`),1,'Canonical '+path);
  assert.ok(html.includes('hreflang="ru"')&&html.includes('hreflang="en"'),'Language alternates '+path);
  for(const category of categories)assert.ok(html.includes(publicationRoute(path.startsWith('/en/')?'en':'ru',category.id)),'Shared category navigation '+path);
}
console.log(`EVIDENCE_STATIC=PASS; ${publications.items.length} publications; ${summary.count} reviews; ${summary.ratedCount} ratings; ${summary.value.toFixed(1)} rounded average; ${routes.length} routes.`);
if(process.argv.includes('--static'))process.exit(0);

const {chromium}=await import('playwright');
const server=createServer((request,response)=>{
  const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
  const file=resolve(dist,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
  if(!file.startsWith(dist+'/')||!existsSync(file)){response.writeHead(404);response.end();return;}
  const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
  response.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});response.end(readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
let browser;
try{
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const context=await browser.newContext({reducedMotion:'reduce'});
  await context.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  mkdirSync('visual-evidence',{recursive:true});
  for(const width of [1440,390,320]){
    await page.setViewportSize({width,height:1000});
    for(const path of routes){
      await page.goto(origin+path,{waitUntil:'networkidle'});
      const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,items:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&s.visibility!=='hidden'&&s.display!=='none'&&!e.closest('.review-carousel__track');}).slice(0,15).map(e=>({tag:e.tagName,classes:e.className,text:e.textContent.slice(0,90),left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width}))}));
      if(overflow.scroll>width+1){
        console.error('OVERFLOW_DIAGNOSTIC',JSON.stringify({path,...overflow}));
        await page.screenshot({path:`visual-evidence/overflow-${width}-${path.replace(/\W/g,'_')}.png`,fullPage:true});
      }
      assert.ok(overflow.scroll<=width+1,'No page overflow '+width+' '+path);
      assert.equal(await page.locator('#desktopMenu > .nav-publications').count(),1,'One desktop publication menu');
      assert.equal(await page.locator('#mobileMenu > .mobile-publications').count(),1,'One mobile publication menu');
      assert.equal(await page.locator('#desktopMenu > a').filter({hasText:/^(Публикации|Publications)$/}).count(),0,'No duplicate parent link after JS');
      if(path==='/'||path==='/en/'){
        const track=page.locator('.review-carousel__track');
        await track.scrollIntoViewIfNeeded();
        assert.equal(await page.locator('[data-review-prev]').isDisabled(),true,'Previous disabled at start');
        await page.locator('[data-review-next]').click();
        await page.waitForFunction(()=>document.querySelector('.review-carousel__track').scrollLeft>1);
        await track.focus();await page.keyboard.press('End');
        await page.waitForFunction(()=>document.querySelector('[data-review-next]').disabled);
        await page.keyboard.press('Home');
        await page.waitForFunction(()=>document.querySelector('[data-review-prev]').disabled);
        await page.keyboard.press('ArrowRight');
        await page.waitForFunction(()=>document.querySelector('.review-carousel__track').scrollLeft>1);
        await page.keyboard.press('Home');
        if(path==='/'&&width!==320)await page.locator('.review-carousel').screenshot({path:`visual-evidence/carousel-${width}.png`});
      }
      if(path==='/publications/'&&width!==320)await page.screenshot({path:`visual-evidence/publications-${width}.png`,fullPage:true});
      if(path==='/reviews/'&&width===390)await page.screenshot({path:'visual-evidence/reviews-390.png'});
    }
    await page.goto(origin+'/publications/',{waitUntil:'networkidle'});
    if(await page.locator('.nav-publications').isVisible()){
      await page.locator('.nav-publications__parent').hover();
      assert.equal(await page.locator('.nav-publications__submenu a').first().isVisible(),true,'Desktop hover submenu');
    }else{
      await page.locator('.menu-toggle').click();
      await page.locator('.mobile-publications summary').click();
      assert.equal(await page.locator('.mobile-publications__submenu a').count(),5,'Mobile overview and four categories');
      assert.equal(await page.locator('.mobile-publications__submenu a').last().isVisible(),true,'Mobile submenu visible');
      if(width===390)await page.screenshot({path:'visual-evidence/menu-390.png'});
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.mobile-publications').getAttribute('open'),null,'Escape closes subsection');
    }
  }
  await page.goto(origin+'/publications/#mention-pixel',{waitUntil:'networkidle'});
  await page.waitForURL('**/publications/ratings/#mention-pixel');
  assert.ok(page.url().includes('/publications/ratings/#mention-pixel'),'Existing fragment link reaches its new category');
  assert.deepEqual(errors,[],'No browser runtime errors');
  const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
  await nojs.route('**/*',route=>route.request().url().startsWith(origin)?route.continue():route.abort());
  const plain=await nojs.newPage();await plain.goto(origin+'/',{waitUntil:'networkidle'});
  assert.equal(await plain.locator('.review-carousel__card').count(),summary.count,'All reviews present without JS');
  assert.equal(await plain.locator('.review-carousel__track').isVisible(),true,'Native scroll remains visible');
  await plain.locator('.mobile-publications summary').click();
  assert.equal(await plain.locator('.mobile-publications__submenu a').last().isVisible(),true,'Static submenu without JS');
  console.log('EVIDENCE_BROWSER=PASS; 1440/390/320 px; navigation, manual carousel, keyboard, no-JS, old anchors.');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
