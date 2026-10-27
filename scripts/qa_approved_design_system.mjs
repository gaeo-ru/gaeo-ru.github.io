import assert from 'node:assert/strict';
import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {faqItemsFor,approvedLeadFor,approvedCardsFor,DESIGN_BLOCKS} from '../src/lib/approved-design-system.mjs';
import {preexistingLegacyRoutes} from '../src/data/preexisting-legacy-routes.mjs';

const ROOT=process.cwd();
const src=resolve(ROOT,'src/legacy/pages'),dist=resolve(ROOT,'dist');
const caseSlugs=['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours'];
const approved={
 'index.html':['FAQ'],'en/index.html':['FAQ'],
 'strategies/fulfillment-provider-selection/index.html':['FAQ','CONTACT'],
 'en/strategies/fulfillment-provider-selection/index.html':['FAQ','CONTACT'],
 'strategies/tourism-dmc-recommendations/index.html':['FAQ','CONTACT'],
 'en/strategies/tourism-dmc-recommendations/index.html':['FAQ','CONTACT'],
 'strategies/technical-b2b-vendor-evidence/index.html':['FAQ','CONTACT'],
 'en/strategies/technical-b2b-vendor-evidence/index.html':['FAQ','CONTACT'],
 'services/index.html':['CONTACT','SERVICES'],
 'en/services/index.html':['CONTACT','SERVICES'],
 'services/website-development/index.html':['FAQ','CONTACT','WHEN','STEPS','CASES'],
 'en/services/website-development/index.html':['FAQ','CONTACT','WHEN','STEPS','CASES']
};
for(const slug of caseSlugs){
 approved['cases/'+slug+'/index.html']=['FAQ'];
 approved['en/cases/'+slug+'/index.html']=['FAQ'];
}
const allFiles=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(item=>{
 const path=resolve(dir,item.name);
 return item.isDirectory()?allFiles(path):item.isFile()&&path.endsWith('.html')?[path]:[];
});
const actual=allFiles(src).map(p=>relative(src,p).split(sep).join('/')).sort();
const compact=html=>html.replace(/>\s+</g,'><').trim();
const count=(s,needle)=>s.split(needle).length-1;
const decode=text=>text.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g,x=>({
 '&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&#39;':"'",'&#x27;':"'"
})[x]||x);
const unpack=s=>decode(s.replace(/<[^>]*>/g,'').trim());
const dataRoutes=new Set(Object.keys(approved));

// Legacy exceptions are fixed to the known October 27 production inventory.
// Every new page must use the shared components, not copied raw markup.
for(const rel of actual){
 if(preexistingLegacyRoutes.has(rel)||dataRoutes.has(rel))continue;
 const raw=readFileSync(resolve(src,rel),'utf8');
 const hasIndustryTemplate=raw.includes('<!-- ASTRO_INDUSTRY_COMMERCIAL_SLOT -->');
 if(hasIndustryTemplate)continue;
 if(/class="(?:faq|faq-item|faq-q|faq-toggle|faq-a|page-cta|site-service__cta|site-service__card|site-service__step|site-service__case)"/.test(raw))
  throw new Error('New page '+rel+' copies design markup. Use the approved Astro component slot.');
 if(raw.includes('"@type":"FAQPage"')&&!raw.includes('<!-- GAEO_DESIGN:FAQ -->'))
  throw new Error('New FAQPage '+rel+' must use the shared Astro FAQ slot');
}
for(const [rel,blocks] of Object.entries(approved)){
 const source=readFileSync(resolve(src,rel),'utf8');
 const builtPath=resolve(dist,rel);
 assert.ok(existsSync(builtPath),'Missing generated page '+rel);
 const html=readFileSync(builtPath,'utf8');
 for(const match of source.matchAll(/<!-- GAEO_DESIGN:([A-Z]+) -->/g))
  assert.ok(blocks.includes(match[1]),'Unapproved slot '+match[1]+' in '+rel);
 for(const block of blocks){
  const marker='<!-- GAEO_DESIGN:'+block+' -->';
  assert.equal(count(source,marker),1,'Exactly one source marker '+block+' in '+rel);
  assert.equal(count(html,'<!-- GAEO_DESIGN:'+block+'_START -->'),1,'Missing rendered component '+block+' on '+rel);
  assert.equal(count(html,'<!-- GAEO_DESIGN:'+block+'_END -->'),1,'Missing closing component marker '+block+' on '+rel);
  const start=html.indexOf('<!-- GAEO_DESIGN:'+block+'_START -->');
  const finish=html.indexOf('<!-- GAEO_DESIGN:'+block+'_END -->',start);
  assert.ok(start>=0&&finish>start,'Malformed rendered component '+rel+' '+block);
  const body=compact(html.slice(start,finish));
  assert.ok(!body.includes('site-service__cta'),'Deprecated custom contact skin '+rel);
  if(block==='FAQ'){
   const items=faqItemsFor(rel);
   const details=[...body.matchAll(/<details class="faq-item">[\s\S]*?<\/details>/g)];
   assert.equal(details.length,items.length,'FAQ item count '+rel);
   assert.ok(body.includes('<div class="faq">'),'Canonical FAQ wrapper '+rel);
   for(let i=0;i<items.length;i++){
    const d=details[i][0];
    assert.ok(d.includes('<summary class="faq-q">'),'FAQ summary style '+rel);
    assert.ok(d.includes('<span class="faq-toggle" aria-hidden="true">+</span>'),'FAQ plus toggle '+rel);
    const question=d.match(/<summary class="faq-q"><span>([\s\S]*?)<\/span>/)?.[1];
    const answer=d.match(/<div class="faq-a">([\s\S]*?)<\/div>/)?.[1];
    assert.equal(unpack(question||''),items[i].question,'FAQ question '+(i+1)+' '+rel);
    assert.equal(unpack(answer||''),items[i].answer,'FAQ answer '+(i+1)+' '+rel);
   }
   assert.ok(!source.includes('<details class="faq-item">'),'FAQ content must come from JSON-LD, not duplicated source HTML '+rel);
  }else if(block==='CONTACT'){
   const lead=approvedLeadFor(rel);
   assert.ok(body.includes('<section class="site-service__section" id="contact">'),'Canonical light contact component '+rel);
   assert.ok(body.includes('<h2>'+lead.title+'</h2>'),'Shared contact heading '+rel);
   assert.ok(body.includes('<p>'+lead.description+'</p>'),'Shared contact explanation '+rel);
   assert.ok(body.includes('href="'+lead.href+'">'+lead.label+'</a>'),'Shared contact button '+rel);
   assert.ok(!source.includes('id="contact"'),'No hand-built lead section '+rel);
  }else{
   const items=approvedCardsFor(rel,block);
   const expectedClass={SERVICES:'site-service__card',WHEN:'site-service__card',STEPS:'site-service__step',CASES:'site-service__case'}[block];
   assert.equal(count(body,'<article class="'+expectedClass+'">'),items.length,'Canonical '+block+' entries '+rel);
   for(const item of items){
    assert.ok(body.includes(item.title),'Card title from typed data '+rel);
    if(item.href)assert.ok(body.includes('href="'+item.href+'"'),'Card link '+item.href+' '+rel);
   }
   assert.ok(!source.includes('<div class="'+{
     SERVICES:'site-service__directory-cards',WHEN:'site-service__grid',
     STEPS:'site-service__steps',CASES:'site-service__cases'
   }[block]+'">'),'Hand-built cards forbidden on '+rel);
  }
 }
 for(const block of DESIGN_BLOCKS){
  if(!blocks.includes(block)){
   assert.equal(count(source,'<!-- GAEO_DESIGN:'+block+' -->'),0,'Unexpected component on '+rel);
  }
 }
 console.log('DESIGN_COMPONENT_QA=PASS '+rel+' '+blocks.join(','));
}
const css=readFileSync(resolve(ROOT,'public/assets/site-development.css'),'utf8');
assert.ok(!css.includes('.site-service__cta{'),'Custom dark lead skin must stay removed');
assert.ok(!css.includes('.site-service__faq{'),'FAQ must inherit the homepage stylesheet');
const internal=readFileSync(resolve(ROOT,'public/assets/internal.css'),'utf8');
assert.ok(!internal.includes('.dev-case .dev-case__chapter .faq-item{'),'No case-specific FAQ skin');
console.log('DESIGN_GUARD=PASS; managed='+Object.keys(approved).length+'; legacy='+preexistingLegacyRoutes.size+'; pages='+actual.length);
