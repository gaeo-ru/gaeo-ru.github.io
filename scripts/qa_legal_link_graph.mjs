// Validate the GAEO legal-services GEO cluster after Astro build.
// All user-facing content is checked in generated HTML, not merely in source templates.
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const dist=resolve(process.cwd(),'dist'),origin='https://gaeo.ru';
const cases={
 '/':['/industries/legal/'],
 '/en/':['/en/industries/legal/'],
 '/industries/':['/industries/legal/'],
 '/en/industries/':['/en/industries/legal/'],
 '/strategies/':['/strategies/legal-recommendations/'],
 '/articles/':['/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/'],
 '/en/articles/':['/en/articles/legal-website-geo-12-checks/'],
 '/en/strategies/':['/en/strategies/legal-recommendations/'],
 '/industries/legal/':['/strategies/legal-recommendations/','/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/'],
 '/en/industries/legal/':['/en/strategies/legal-recommendations/','/en/articles/legal-website-geo-12-checks/'],
 '/strategies/legal-recommendations/':['/industries/legal/','/strategies/measurement/','/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/'],
 '/en/strategies/legal-recommendations/':['/en/industries/legal/','/en/strategies/measurement/','/en/articles/legal-website-geo-12-checks/'],
 '/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/':['/industries/legal/','/strategies/legal-recommendations/'],
 '/en/articles/legal-website-geo-12-checks/':['/en/industries/legal/','/en/strategies/legal-recommendations/']
};
const pages=new Set(['/industries/legal/','/en/industries/legal/','/strategies/legal-recommendations/','/en/strategies/legal-recommendations/','/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/','/en/articles/legal-website-geo-12-checks/']);
const pairs=[
 ['/industries/legal/','/en/industries/legal/'],
 ['/strategies/legal-recommendations/','/en/strategies/legal-recommendations/'],
 ['/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/','/en/articles/legal-website-geo-12-checks/']
];
const pathFor=r=>resolve(dist,r.slice(1),'index.html');
const errors=[];
let edges=0;
for(const [route,destinations] of Object.entries(cases)){
 const file=pathFor(route);
 if(!existsSync(file)){errors.push('Missing generated route '+route);continue}
 const html=readFileSync(file,'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
 const urls=[...main.matchAll(/\bhref=["']([^"']+)["']/g)].map(x=>x[1].split('?')[0].split('#')[0]);
 if(!main)errors.push('Missing main element '+route);
 for(const to of destinations){
   if(!urls.includes(to))errors.push(route+' missing contextual link to '+to);
   else edges++;
   if(!existsSync(pathFor(to)))errors.push('Link points to a missing page '+to);
 }
 if(!pages.has(route))continue;
 if((html.match(/<h1\b/gi)||[]).length!==1)errors.push('Expected exactly one H1 '+route);
 const canonical=html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
 if(canonical!==origin+route)errors.push('Canonical mismatch '+route+' '+String(canonical));
 if(!/<meta\s+name="robots"\s+content="index,follow/i.test(html))errors.push('No indexable robots '+route);
 if(/ASTRO_INDUSTRY_COMMERCIAL_SLOT|Afonin|Афонин|1\s*\/\s*52|Фармацевтик|Pharmaceutical|__FAQ__/.test(html))errors.push('Sensitive/legacy marker '+route);
 const faqNodes=(main.match(/<details\b/g)||[]).length;
 if(faqNodes!==6)errors.push('Expected 6 visible FAQ details '+route+' got '+faqNodes);
 const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 let list=[];
 for(const [,json] of scripts){try{let j=JSON.parse(json);list.push(...(j['@graph']||[j]));}catch{errors.push('Bad JSON-LD '+route)}}
 const faq=list.find(x=>x['@type']==='FAQPage');
 if(faq?.mainEntity?.length!==6)errors.push('FAQPage does not contain 6 questions '+route);
 for(const tag of main.matchAll(/<a\b[^>]*>/g)){
   const opening=tag[0],href=opening.match(/\bhref="([^"]+)"/)?.[1];
   if(href && /^https?:\/\//.test(href) && !href.startsWith(origin) && !/\btarget="_blank"/.test(opening))
      errors.push('External link missing new tab '+route+' '+href);
 }
}
for(const [ru,en] of pairs)for(const route of [ru,en]){
 const file=pathFor(route);if(!existsSync(file))continue;
 const html=readFileSync(file,'utf8');
 for(const [lang,target] of [['ru',ru],['en',en]]){
  if(!html.includes('hreflang="'+lang+'" href="'+origin+target+'"'))errors.push(route+' missing '+lang+' hreflang');
 }
}
for(const r of ['/strategies/legal-recommendations/','/en/strategies/legal-recommendations/']){
 const file=pathFor(r);if(!existsSync(file))continue;
 const html=readFileSync(file,'utf8');
 for(const url of ['https://minjust.gov.ru/ru/pages/advokaty-rossijskoj-federacii/','https://kad.arbitr.ru/','https://bankrot.fedresurs.ru/','https://egrul.nalog.ru/']){
  if(!html.includes(url))errors.push(r+' missing official source '+url);
 }
 if(!html.includes('"@type":"Article"'))errors.push(r+' missing Article structured data');
}
for(const r of ['/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/','/en/articles/legal-website-geo-12-checks/']){
 const html=readFileSync(pathFor(r),'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
 if((main.match(/class="legal-proof-check"/g)||[]).length!==12)errors.push('Expected 12 distinct checklist items '+r);
 if((main.match(/<h2\b/g)||[]).length<7)errors.push('Insufficient source-backed sections '+r);
 if(!html.includes('"@type":"Article"'))errors.push('Missing Article schema '+r);
 if(!main.includes('class="article-meta"'))errors.push('Missing article author and dates '+r);
 for(const ext of ['https://www.nalog.gov.ru/donline/','https://minjust.gov.ru/ru/pages/advokaty-rossijskoj-federacii/','https://fparf.ru/documents/fpa-rf/the-documents-of-the-council/','https://developers.google.com/search/docs/appearance/ai-features']){
  if(!main.includes(ext))errors.push('Missing primary source '+ext+' '+r);
 }
}
console.log('LEGAL_CLUSTER_PAGES='+pages.size);
console.log('LEGAL_CLUSTER_CONTEXTUAL_LINKS='+edges);
console.log('LEGAL_CLUSTER_ERRORS='+errors.length);
if(errors.length){for(const v of errors.slice(0,80))console.error('FAIL '+v);process.exit(1);}
console.log('LEGAL_CLUSTER_QA=PASS');