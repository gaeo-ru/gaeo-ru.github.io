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
  {route:'/industries/legal/', lang:'ru'},
  {route:'/en/industries/legal/', lang:'en'},
  {route:'/industries/metal-structures/', lang:'ru'},
  {route:'/en/industries/metal-structures/', lang:'en'},
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
    assert.equal(await page.locator('.industry-metric').count(),entry.route.includes('/industries/pharma/')?6:3,'Evidence statistics missing');
    assert.equal(await page.locator('.industry-step').count(),6,'Commercial steps missing');
    assert.equal(await page.locator('.faq-item').count(),6,'FAQ questions missing');
    assert.equal(await page.locator('.industry-price').count(),3,'Rates missing');
    if(entry.ecommerce){
      assert.equal(await page.locator('.industry-framework-card').count(),5,'Five ecommerce framework indicators missing');
      assert.equal(await page.locator('.industry-scenario-table tbody tr').count(),5,'Five buying stages missing');
      assert.equal(await page.locator('a[href*="1087822"]').count()>0,true,'Author methodology source missing');
    }
    if(entry.route.includes('/industries/pharma/')){
      assert.equal(await page.locator('#supplement-evidence .industry-metric').count(),3,'Supplement metrics missing');
      assert.equal(await page.locator('#supplement-evidence .industry-scenario-table tbody tr').count(),4,'Four supplement query families missing');
      assert.equal(await page.locator('#industry-scenarios .industry-scenario-table tbody tr').count(),7,'Seven medicine/supplement scenarios missing');
      const evidenceText=await page.locator('#supplement-evidence').innerText();
      assert.ok(evidenceText.includes('24')&&evidenceText.includes('18'),'New anonymized supplement study not rendered');
      const fullText=await page.locator('main').innerText();
      assert.ok(!/Zubareva|Зубарева|Триазавирин|риамиловир|Медсинтез|Эвалар|doctorzubareva/i.test(fullText),'Protected client or product identity leaked');
    }
    if(entry.route.includes('/metal-structures/')){
      assert.equal(await page.locator('.industry-hero__media .industrial-hero-art').count(),1,'Native industrial hero missing');
      assert.equal(await page.locator('.industry-hero__media .industrial-hero-art__card').count(),4,'Industrial hero requires four evidence cards');
      assert.equal(await page.locator('.industry-hero__media img').count(),0,'Industrial hero still references obsolete SVG image');
    }else{
      assert.equal(await page.locator('.industry-hero__media img').count(),1,'Hero image missing');
    }
    assert.equal(await page.locator('.industry-hero .button[href$="#lead"]').count(),1,'Lead trigger missing');
    const width = await page.evaluate(()=>document.documentElement.scrollWidth);
    if(width>viewport.width+2){
      const offenders=await page.evaluate(()=>[...document.body.querySelectorAll('*')]
        .map(el=>{const r=el.getBoundingClientRect();return {tag:el.tagName,classes:String(el.className||'').slice(0,120),right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),text:(el.textContent||'').trim().slice(0,90)}})
        .filter(r=>r.right>innerWidth+2 || r.left<-2).sort((a,b)=>b.right-a.right).slice(0,18));
      console.error('LAYOUT_OVERFLOW_DEBUG '+entry.route+' '+viewport.width+'px '+JSON.stringify(offenders));
    }
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
    // Scroll restoration and modal teardown can be asynchronous. Report the real cause.
    let afterWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    if(afterWidth>viewport.width+2){
      // First allow the modal's layout cleanup to settle instead of taking a transient frame as a defect.
      await page.waitForTimeout(200);
      afterWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    }
    if(afterWidth>viewport.width+2){
      const diagnostics=await page.evaluate(()=>{
        const objects=[...document.body.querySelectorAll('*')].map(el=>{
          const r=el.getBoundingClientRect();
          return {tag:el.tagName,cls:String(el.className||'').slice(0,100),
            right:Math.round(r.right),left:Math.round(r.left),width:Math.round(r.width),
            text:(el.textContent||'').trim().slice(0,75)};
        }).filter(v=>v.right>innerWidth+2||v.left< -2)
          .sort((a,b)=>b.right-a.right).slice(0,16);
        return {innerWidth,docWidth:document.documentElement.scrollWidth,
          bodyWidth:document.body.scrollWidth,bodyStyle:document.body.getAttribute('style'),
          documentStyle:document.documentElement.getAttribute('style'),overflowing:objects};
      });
      console.error('AFTER_MODAL_OVERFLOW_DEBUG route='+entry.route+' viewport='+viewport.width+
        ' before='+width+' after='+afterWidth+' '+JSON.stringify(diagnostics));
      const slug=entry.route.split('/').filter(Boolean).join('-');
      await page.screenshot({path:'visual-industry/overflow-'+slug+'-'+viewport.width+'.png',
        fullPage:true,animations:'disabled'});
    }
    assert.ok(afterWidth<=viewport.width+2,
      'Overflow after opening form '+entry.route+' '+viewport.width+'px: '+afterWidth);
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

  // Incoming ChatGPT UTM data must not carry into navigational fragments.
  // Initial attribution remains available in sessionStorage after the navigation.
  const anchorCases = [
    {route:'/strategies/ecommerce-catalog/', hash:'catalog-data'},
    {route:'/en/strategies/ecommerce-catalog/', hash:'catalog-data'},
    {route:'/industries/ecommerce/', hash:'evidence'},
    {route:'/en/industries/ecommerce/', hash:'evidence'},
  ];
  for(const item of anchorCases){
    const page=await browser.newPage({viewport:{width:390,height:844}});
    const inbound=BASE+item.route+'?utm_source=chatgpt.com&utm_medium=smoke';
    const response=await page.goto(inbound,{waitUntil:'load'});
    assert.equal(response?.status(),200,'Incoming UTM page failed');
    const href=item.route+'#'+item.hash;
    const anchor=page.locator('a[href="'+href+'"]').first();
    assert.equal(await anchor.count(),1,'Clean internal anchor missing '+href);
    assert.equal(await page.locator('#'+item.hash).count(),1,'Anchor target missing '+item.hash);
    await anchor.click();
    await page.waitForURL(url=>url.pathname===item.route&&url.hash==='#'+item.hash&&!url.searchParams.has('utm_source')&&!url.searchParams.has('utm_medium'),{timeout:10000});
    const attribution=await page.evaluate(()=>{
      try{return JSON.parse(sessionStorage.getItem('gaeo_tracking_v1')||'{}')}
      catch{return {}}
    });
    assert.equal(attribution.utm_source,'chatgpt.com','Referral attribution lost for '+item.route);
    checks.push(item.route+' clean #'+item.hash+' URL + preserved original attribution PASS');
    await page.close();
  }
  // Industrial supplier methodology: KM/KMD engineering sources and technical procurement tables.
  for(const entry of [
    {route:'/strategies/industrial-supplier-evidence/',lang:'ru'},
    {route:'/en/strategies/industrial-supplier-evidence/',lang:'en'}
  ])for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Industrial GEO methodology HTTP');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Industrial GEO methodology language');
    assert.equal(await page.locator('h1').count(),1,'Industrial methodology H1');
    assert.ok(await page.locator('.industrial-b2b-guide h2').count()>=9,'Industrial methodology chapters');
    assert.equal(await page.locator('.industrial-b2b-guide .industry-scenario-table tbody tr').count(),6,'Industrial six procurement intents');
    assert.equal(await page.locator('.industrial-b2b-guide .faq-item').count(),6,'Industrial FAQ');
    assert.ok(await page.locator('.industrial-b2b-guide a[href*="protect.gost.ru"]').count()>=3,'Rostandard citations');
    assert.ok(await page.locator('.industrial-b2b-guide a[href*="industries/metal-structures"]').count()>0,'Industrial commercial crosslink');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.ok(canonical?.endsWith(entry.route),'Industrial methodology canonical');
    const ld=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(x=>JSON.parse(x)).flatMap(x=>x['@graph']||[]);
    assert.ok(ld.some(x=>x['@type']==='Article'),'Industrial methodology Article schema');
    const faq=ld.find(x=>x['@type']==='FAQPage');
    const questions=(await page.locator('.industrial-b2b-guide .faq-item summary > span:first-child').allTextContents()).map(x=>x.trim());
    assert.ok(faq?.mainEntity?.length===6 && faq.mainEntity.every((x,i)=>x.name===questions[i]),'Industrial FAQ schema parity');
    const diagram=page.locator('.industrial-b2b-guide .industrial-evidence-flow');
    assert.equal(await diagram.count(),1,'Industrial native evidence diagram missing');
    assert.equal(await diagram.locator('.industrial-evidence-flow__step').count(),4,'Four distinct responsibilities missing');
    assert.equal(await page.locator('img[src$=".svg"]').count(),0,'SVG illustration prohibited in industrial methodology');
    await diagram.scrollIntoViewIfNeeded();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Industrial methodology overflow');
    await page.locator('.industrial-b2b-guide .page-cta a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Industrial lead dialog remained open');
    let afterModalWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    if(afterModalWidth>viewport.width+2){
      await page.waitForTimeout(200);
      afterModalWidth=await page.evaluate(()=>document.documentElement.scrollWidth);
    }
    assert.ok(afterModalWidth<=viewport.width+2,'Industrial page overflow after closing modal '+entry.route+' at '+viewport.width+'px: '+afterModalWidth);
    assert.deepEqual(errors,[],'Industrial JavaScript errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/industrial-method-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('industrial-method '+entry.lang+' '+viewport.width+'px 6-intents/3-GOST-sources/6-FAQ/native-diagram/CTA/post-close-overflow PASS');
    await page.close();
  }
  // Legal GEO guides: bilingual methodological content, sources, FAQs and lead interaction.
  for(const entry of [
    {route:'/strategies/legal-recommendations/',lang:'ru'},
    {route:'/en/strategies/legal-recommendations/',lang:'en'}
  ])for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Legal guide HTTP');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Legal guide language');
    assert.equal(await page.locator('h1').count(),1,'Legal guide single H1');
    assert.ok(await page.locator('.legal-guide h2').count()>=9,'Legal guide substantive sections');
    assert.equal(await page.locator('.legal-guide .faq-item').count(),6,'Legal guide six FAQs');
    assert.equal(await page.locator('.legal-guide .industry-scenario-table tbody tr').count(),6,'Legal guide six scenarios');
    assert.ok(await page.locator('a[href*="minjust.gov.ru"]').count()>0,'Legal guide official register');
    assert.ok((await page.locator('link[rel="canonical"]').getAttribute('href')).endsWith(entry.route),'Legal canonical');
    const ld=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(x=>JSON.parse(x)).flatMap(o=>o['@graph']||[]);
    assert.ok(ld.some(x=>x['@type']==='Article'),'Legal guide article schema');
    const faq=ld.find(x=>x['@type']==='FAQPage');
    const visible=(await page.locator('.legal-guide .faq-item summary > span:first-child').allTextContents()).map(x=>x.trim());
    assert.ok(faq?.mainEntity?.length===6 && faq.mainEntity.every((q,i)=>q.name===visible[i]),'Legal FAQ schema matches visible FAQ');
    for(const img of await page.locator('.legal-guide img').all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(async el=>{if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,4500)})});
      assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Broken legal guide image');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Legal guide horizontal overflow');
    await page.locator('.legal-guide .page-cta a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Legal guide dialog not closed');
    assert.deepEqual(errors,[],'Legal guide JS errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/legal-guide-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('legal-guide '+entry.lang+' '+viewport.width+'px SEO/6-scenarios/6-FAQ/Article/sources/lead/overflow PASS');
    await page.close();
  }
  // Legal services website GEO checklist: all editorial evidence and responsive components.
  for(const entry of [
    {route:'/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/',lang:'ru'},
    {route:'/en/articles/legal-website-geo-12-checks/',lang:'en'}
  ])for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Legal checklist HTTP');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Legal checklist language');
    assert.equal(await page.locator('h1').count(),1,'Legal checklist H1');
    assert.equal(await page.locator('.legal-proof-check').count(),12,'Legal checklist 12 evidence checks');
    assert.equal(await page.locator('.legal-proof-summary>div').count(),3,'Legal checklist summary');
    assert.equal(await page.locator('.legal-proof-table').count(),2,'Legal source and prompt tables');
    assert.equal(await page.locator('.legal-proof-example').count(),2,'Legal copy examples');
    assert.equal(await page.locator('.legal-proof-code code').count(),1,'LegalService schema example');
    assert.equal(await page.locator('.legal-proof-article .faq-item').count(),6,'Legal checklist FAQs');
    assert.ok(await page.locator('a[href*="fparf.ru"]').count()>0,'Federal bar ethics source');
    assert.ok(await page.locator('a[href*="developers.google.com/search/docs/appearance/ai-features"]').count()>0,'Official Google source');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.ok(canonical.endsWith(entry.route),'Legal checklist canonical');
    const ld=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(v=>JSON.parse(v)).flatMap(v=>v['@graph']||[]);
    assert.ok(ld.some(o=>o['@type']==='Article'),'Legal checklist Article JSON-LD');
    const faq=ld.find(o=>o['@type']==='FAQPage');
    const visible=(await page.locator('.legal-proof-article .faq-item summary > span:first-child').allTextContents()).map(x=>x.trim());
    assert.ok(faq?.mainEntity?.length===6 && faq.mainEntity.every((q,i)=>q.name===visible[i]),'Legal FAQ schema parity');
    const hero=page.locator('.legal-proof-article .inner-hero__media img');
    await hero.scrollIntoViewIfNeeded();
    await hero.evaluate(async el=>{if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,5000)})});
    assert.ok(await hero.evaluate(el=>el.complete&&el.naturalWidth>0),'Legal checklist broken hero image');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Legal checklist overflow');
    await page.locator('.legal-proof-article .page-cta a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Legal checklist lead modal did not close');
    assert.equal(errors.length,0,'Legal checklist JS errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/legal-checklist-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('legal-checklist '+entry.lang+' '+viewport.width+'px 12-checks/6-FAQ/2-tables/Schema.org/CTA/overflow PASS');
    await page.close();
  }
  // Evidence-based GEO methodology for tourism: same RU/EN components and mobile behaviour.
  for(const entry of [
    {route:'/strategies/tourism-dmc-recommendations/',lang:'ru'},
    {route:'/en/strategies/tourism-dmc-recommendations/',lang:'en'}
  ])for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Tourism GEO method HTTP');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Tourism GEO method language');
    assert.equal(await page.locator('h1').count(),1,'Tourism GEO H1');
    assert.ok(await page.locator('.tourism-dmc-guide h2').count()>=8,'Tourism methodology chapters');
    assert.equal(await page.locator('.tourism-dmc-guide .industry-scenario-table tbody tr').count(),8,'Eight distinct tourism buyer intents');
    assert.equal(await page.locator('.tourism-dmc-guide .faq-item').count(),6,'Tourism methodology FAQ count');
    assert.equal(await page.locator('.tourism-dmc-guide .content-media img').count(),2,'Two genuine published case images');
    for(const src of ['iata.org','gov.br','ats.aq','developers.google.com']){
      assert.ok(await page.locator('.tourism-dmc-guide a[href*="'+src+'"]').count()>0,'Missing official travel source: '+src);
    }
    assert.ok(await page.locator('.tourism-dmc-guide a[href*="/industries/tourism/"]').count()>0,'Missing industry crosslink');
    assert.ok(await page.locator('.tourism-dmc-guide a[href*="/cases/ada-tours"]').count()>0,'Missing measured case crosslink');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.equal(canonical,'https://gaeo.ru'+entry.route,'Tourism canonical');
    for(const lang of ['ru','en']){
      const alternate=await page.locator('link[rel="alternate"][hreflang="'+lang+'"]').getAttribute('href');
      const expected='https://gaeo.ru/'+(lang==='en'?'en/':'')+'strategies/tourism-dmc-recommendations/';
      assert.equal(alternate,expected,'Tourism hreflang '+lang);
    }
    const objects=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s)).flatMap(s=>s['@graph']||[]);
    assert.ok(objects.some(x=>x['@type']==='Article'),'Tourism Article schema');
    const faq=objects.find(x=>x['@type']==='FAQPage');
    const questions=(await page.locator('.tourism-dmc-guide .faq-item summary > span:first-child').allTextContents()).map(s=>s.trim());
    assert.ok(faq?.mainEntity?.length===6&&faq.mainEntity.every((q,i)=>q.name===questions[i]),'Tourism FAQ JSON-LD parity');
    const modified=objects.find(x=>x['@type']==='Article')?.dateModified;
    assert.equal(modified,'2026-10-27','Tourism Article modified date');
    for(const img of await page.locator('.tourism-dmc-guide .content-media img').all()){
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(async el=>{if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,4500)})});
      assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Tourism case evidence image failed');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Tourism page horizontal overflow '+entry.route+' '+viewport.width);
    await page.locator('.tourism-dmc-guide #contact a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Tourism lead dialog remained');
    assert.deepEqual(errors,[],'Tourism page JavaScript errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/tourism-method-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('tourism-method '+entry.lang+' '+viewport.width+'px/8-intents/6-FAQ/4-sources/2-images/canonical/lead PASS');
    await page.close();
  }
  // Technical B2B GEO: shared components, sourced evidence and responsive behavior.
  for(const entry of [
    {route:'/strategies/technical-b2b-vendor-evidence/',lang:'ru'},
    {route:'/en/strategies/technical-b2b-vendor-evidence/',lang:'en'}
  ])for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',e=>errors.push(String(e)));
    const response=await page.goto(BASE+entry.route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Technical B2B method HTTP 200');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Technical B2B lang');
    assert.equal(await page.locator('h1').count(),1,'Technical B2B H1');
    assert.ok(await page.locator('.technical-b2b-guide h2').count()>=9,'Technical B2B chapter count');
    assert.equal(await page.locator('.technical-b2b-guide .industry-scenario-table tbody tr').count(),8,'Eight technical buyer intents');
    assert.equal(await page.locator('.technical-b2b-guide .faq-item').count(),6,'Technical FAQ count');
    assert.equal(await page.locator('.technical-b2b-guide .content-media img').count(),1,'One public MethodLab evidence chart');
    for(const host of ['dev.1c-bitrix.ru','developers.google.com','grafana.com','tpc.org','postgresql.org']){
      assert.ok(await page.locator('.technical-b2b-guide a[href*="'+host+'"]').count()>0,'Missing official technical source '+host);
    }
    const prefix=entry.lang==='en'?'/en':'';
    assert.ok(await page.locator('.technical-b2b-guide a[href="'+prefix+'/industries/highload-it/"]').count()>0,'Missing technical industry crosslink');
    const caseUrl=entry.lang==='en'?'/en/cases/methodlab-ai-visibility-growth/':'/cases/methodlab-rost-neyrovidimosti-19-52-procenta/';
    assert.ok(await page.locator('.technical-b2b-guide a[href="'+caseUrl+'"]').count()>0,'Missing public MethodLab case');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.equal(canonical,'https://gaeo.ru'+entry.route,'Technical B2B canonical');
    for(const language of ['ru','en']){
      const target='https://gaeo.ru/'+(language==='en'?'en/':'')+'strategies/technical-b2b-vendor-evidence/';
      const link=await page.locator('link[rel="alternate"][hreflang="'+language+'"]').getAttribute('href');
      assert.equal(link,target,'Technical B2B hreflang '+language);
    }
    const graphs=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s)).flatMap(s=>s['@graph']||[]);
    const article=graphs.find(o=>o['@type']==='Article');
    assert.equal(article?.dateModified,'2026-10-27','Technical Article date');
    const faq=graphs.find(o=>o['@type']==='FAQPage');
    const visible=(await page.locator('.technical-b2b-guide .faq-item summary > span:first-child').allTextContents()).map(s=>s.trim());
    assert.ok(faq?.mainEntity?.length===6 && faq.mainEntity.every((q,i)=>q.name===visible[i]),'Technical FAQ schema parity');
    const img=page.locator('.technical-b2b-guide .content-media img');
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(async el=>{if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,4500)})});
    assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Technical MethodLab evidence WebP failed');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Technical B2B horizontal overflow '+entry.route+' '+viewport.width);
    await page.locator('.technical-b2b-guide #contact a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(await page.locator('[role="dialog"]').count(),0,'Technical B2B dialog left open');
    assert.deepEqual(errors,[],'Technical B2B JS errors');
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/technical-b2b-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('technical-b2b '+entry.lang+' '+viewport.width+'px/8-intents/6-FAQ/5-sources/MethodLab-WebP/CTA PASS');
    await page.close();
  }
  // Pharma GEO pages: official sources, shared FAQ, safe copy and responsive CTA.
  for(const lang of ['ru','en'])for(const viewport of VIEWPORTS){
    const route='/'+(lang==='en'?'en/':'')+'strategies/pharma-geo-evidence/';
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const response=await page.goto(BASE+route,{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Pharma method HTTP');
    assert.equal(await page.locator('html').getAttribute('lang'),lang,'Pharma language');
    assert.equal(await page.locator('h1').count(),1,'Pharma H1');
    assert.equal(await page.locator('.pharma-geo-guide .industry-scenario-table tbody tr').count(),18,'Pharma tables: 11 scenarios, 3 medicine outcomes and 4 supplement outcomes');
    assert.equal(await page.locator('.pharma-geo-guide details.faq-item').count(),6,'Pharma FAQ count');
    assert.equal(await page.locator('.pharma-geo-guide .article-wrap > h2').count(),10,'Nine chapters and one FAQ header');
    assert.ok(await page.locator('.pharma-geo-guide a[href*="ods.od.nih.gov"]').count()>=2,'Supplement composition evidence missing');
    assert.ok(await page.locator('.pharma-geo-guide a[href*="consultant.ru"]').count()>=2,'Separate medicine and supplement advertising rules missing');
    assert.ok(!/Zubareva|Зубарева|Триазавирин|риамиловир|Медсинтез|Эвалар|doctorzubareva/i.test(await page.locator('.pharma-geo-guide').innerText()),'Pharma guide anonymization failed');

    for(const host of ['grls.rosminzdrav.ru','cr.minzdrav.gov.ru','roszdravnadzor.gov.ru','consultant.ru','ema.europa.eu','who.int','developers.google.com']){
      assert.ok(await page.locator('.pharma-geo-guide a[href*="'+host+'"]').count()>0,'Missing pharma source '+host);
    }
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://gaeo.ru'+route,'Pharma canonical');
    const nodes=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(s=>JSON.parse(s)).flatMap(s=>s['@graph']||[]);
    assert.equal(nodes.find(x=>x['@type']==='Article')?.dateModified,'2026-10-28','Pharma article modified date');
    const faq=nodes.find(x=>x['@type']==='FAQPage');
    const qs=(await page.locator('.pharma-geo-guide details.faq-item summary > span:first-child').allTextContents()).map(s=>s.trim());
    assert.ok(faq?.mainEntity?.length===6&&faq.mainEntity.every((q,i)=>q.name===qs[i]),'Pharma schema parity');
    const img=page.locator('.pharma-geo-guide .content-media img');
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(async el=>{if(!el.complete)await new Promise(done=>{el.addEventListener('load',done,{once:true});el.addEventListener('error',done,{once:true});setTimeout(done,4500)})});
    assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Pharma evidence image');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Pharma overflow');
    await page.locator('.pharma-geo-guide #contact a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    await page.screenshot({path:'visual-industry/pharma-geo-'+lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('pharma '+lang+' '+viewport.width+'px/FAQ/sources/CTA PASS');
    await page.close();
  }
  const articleCases=[
    {route:'/articles/agentnaya-torgovlya-gotovnost-internet-magazina/',lang:'ru'},
    {route:'/en/articles/agentic-commerce-readiness/',lang:'en'}
  ];
  for(const entry of articleCases)for(const viewport of VIEWPORTS){
    const page=await browser.newPage({viewport,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(String(err)));
    const response=await page.goto(BASE+entry.route+'?utm_source=chatgpt.com',{waitUntil:'domcontentloaded',timeout:25000});
    assert.equal(response?.status(),200,'Agent commerce article HTTP 200');
    assert.equal(await page.locator('html').getAttribute('lang'),entry.lang,'Wrong article language');
    assert.equal(await page.locator('h1').count(),1,'Agent commerce requires one H1');
    assert.equal(await page.locator('.agent-commerce-table tbody tr').count(),3,'YCP ACP UCP comparison incomplete');
    assert.equal(await page.locator('.agent-commerce-checks li').count(),12,'Twelve readiness checks missing');
    assert.equal(await page.locator('.faq-item').count(),6,'Six article FAQ items expected');
    assert.equal(await page.locator('a[href*="developers.openai.com/commerce"]').count()>0,true,'Official commerce sources missing');
    const canonical=await page.locator('link[rel="canonical"]').getAttribute('href');
    assert.ok(canonical.endsWith(entry.route),'Article canonical mismatch');
    await page.locator('.inner-hero__media img').scrollIntoViewIfNeeded();
    const img=page.locator('.inner-hero__media img');
    await img.evaluate(async el=>{if(!el.complete)await new Promise(resolve=>{el.addEventListener('load',resolve,{once:true});el.addEventListener('error',resolve,{once:true});setTimeout(resolve,5000)})});
    assert.equal(await img.evaluate(el=>el.naturalWidth>0),true,'Article hero WebP failed to load');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth)<=viewport.width+2,'Article horizontal overflow');
    await page.locator('.page-cta a[href$="#lead"]').click();
    await page.locator('[role="dialog"]').waitFor({state:'visible',timeout:6000});
    await page.locator('.gaeo-modal-close').click();
    assert.equal(errors.length,0,'Article page runtime errors: '+errors.join('; '));
    await page.evaluate(()=>scrollTo(0,0));
    await page.screenshot({path:'visual-industry/agent-commerce-'+entry.lang+'-'+viewport.width+'.png',fullPage:true,animations:'disabled'});
    checks.push('agent-commerce '+entry.lang+' '+viewport.width+'px HTTP/H1/12-checks/6-FAQ/3-protocols/WebP/CTA/overflow PASS');
    await page.close();
  }
  console.log(checks.join('\n'));
  console.log('INDUSTRY_BROWSER_QA=PASS; cases='+checks.length);
} finally {
  if(browser)await browser.close();
  preview.kill('SIGTERM');
}