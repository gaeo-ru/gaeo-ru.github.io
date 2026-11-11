import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';

const root=resolve(process.argv[2]||'dist');
const base='https://gaeo.ru/';

function nodesAt(route){
  const html=readFileSync(resolve(root,route.replace(/^\//,''),'index.html'),'utf8');
  const nodes=[];
  for(const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
    const doc=JSON.parse(m[1]);
    nodes.push(...(doc['@graph']||[doc]));
  }
  return nodes;
}

function findId(route,id){return nodesAt(route).find(x=>x['@id']===id);}
function serviceAt(route){return findId(route,base+route.replace(/^\//,'')+'#service');}

const cases=['razrabotka-sajta-gaeo','razrabotka-sajta-indexresearch','razrabotka-sajta-adatours'];
const hubs=['/industries/','/strategies/','/services/','/tarify/','/en/industries/','/en/strategies/','/en/services/','/en/pricing/'];

for(const lang of ['ru','en']){
  const prefix=lang==='en'?'/en':'';
  for(const route of [prefix+'/',prefix+'/professional-biography/']){
    const data=nodesAt(route);
    const expert=data.find(x=>x['@id']===base+'#person');
    const company=data.find(x=>x['@id']===base+'#business');
    assert(expert&&company,'Canonical person and company '+route);
    assert(expert.knowsAbout?.length>=35,'Expert knowledge '+route);
    assert(company.knowsAbout?.length>=38,'GAEO knowledge '+route);
    assert(expert.knowsAbout.some(x=>x?.url?.includes('/strategies/measurement/')),'BMR expertise '+route);
    assert(company.knowsAbout.some(x=>x?.url?.includes('/services/website-development/')),'Development expertise '+route);
    assert.equal(company.logo?.['@id'],base+'#logo','Company logo '+route);
    assert.equal(company.hasOfferCatalog?.['@id'],base+(lang==='en'?'en/pricing/':'tarify/')+'#catalog','Service catalog '+route);
    for(const slug of cases)
      assert(expert.workExample?.some(x=>x['@id']===base+(lang==='en'?'en/':'')+'cases/'+slug+'/#article'),'Verified case '+slug+' '+route);
    if(route.includes('biography'))
      assert(expert.hasOccupation?.skills?.some(x=>x.includes('Schema.org')),'Technical skills '+route);
  }

  const site=findId(prefix+'/',base+'#website');
  for(const route of hubs)
    assert(site.hasPart.some(x=>x['@id']===base+route.slice(1)+'#webpage'),'Site section '+route);

  const pricing=lang==='en'?'/en/pricing/':'/tarify/';
  const catalog=findId(pricing,base+pricing.slice(1)+'#catalog');
  const sectors=findId(pricing,base+pricing.slice(1)+'#industry-list');
  assert.equal(catalog.itemListElement.length,8,'8 original services and extras '+lang);
  assert.equal(sectors.itemListElement.length,107,'107 sectors '+lang);
  for(const item of sectors.itemListElement){
    assert(item.item.serviceType,'Specific industry service type '+lang);
    assert.equal(item.item.audience?.['@type'],'BusinessAudience','Industry business audience '+lang);
  }

  const dev=serviceAt(prefix+'/services/website-development/');
  assert(dev,'Website development Service '+lang);
  for(const slug of cases)
    assert(dev.subjectOf?.some(x=>x['@id']===base+(lang==='en'?'en/':'')+'cases/'+slug+'/#article'),'Development case proof '+slug+' '+lang);
}

for(const entry of industrySpecializations){
  for(const lang of ['ru','en']){
    const route=entry.routes[lang],s=serviceAt(route);
    assert(s,'Missing specialization '+route);
    assert.equal(s.serviceType,entry.content[lang].h1,'Specific serviceType '+route);
    assert.equal(s.audience?.audienceType,entry.content[lang].eyebrow,'Business audience '+route);
    assert.equal(s.provider?.['@id'],base+'#business','Canonical provider '+route);
    assert.equal(s.offers?.length,3,'Three shared monthly offers '+route);
  }
}

for(const route of [
  '/geo-prodvizhenie-nedvizhimosti/',
  '/industries/fulfillment/','/industries/tourism/','/industries/highload-it/',
  '/en/industries/fulfillment/','/en/industries/tourism/','/en/industries/highload-it/'
]){
  assert.equal(serviceAt(route)?.provider?.['@id'],base+'#business','Legacy provider '+route);
}
console.log('ENTITY_SCHEMA_QA=PASS: expert entities, 8 offers, 107 sector services, 3 development cases, RU/EN');
