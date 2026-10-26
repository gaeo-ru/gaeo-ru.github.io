// Industrial B2B GEO cluster: generated Astro HTML, source evidence and link graph.
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const root=resolve(process.cwd(),'dist'),origin='https://gaeo.ru';
const pages=[
 '/industries/metal-structures/',
 '/en/industries/metal-structures/',
 '/strategies/industrial-supplier-evidence/',
 '/en/strategies/industrial-supplier-evidence/'
];
const pairs=[[pages[0],pages[1]],[pages[2],pages[3]]];
const edges={
 '/':['/industries/metal-structures/'],
 '/en/':['/en/industries/metal-structures/'],
 '/industries/':['/industries/metal-structures/'],
 '/en/industries/':['/en/industries/metal-structures/'],
 '/strategies/':['/strategies/industrial-supplier-evidence/'],
 '/en/strategies/':['/en/strategies/industrial-supplier-evidence/'],
 '/industries/metal-structures/':['/strategies/industrial-supplier-evidence/'],
 '/en/industries/metal-structures/':['/en/strategies/industrial-supplier-evidence/'],
 '/strategies/industrial-supplier-evidence/':['/industries/metal-structures/','/strategies/measurement/'],
 '/en/strategies/industrial-supplier-evidence/':['/en/industries/metal-structures/','/en/strategies/measurement/']
};
const f=route=>resolve(root,route.slice(1),'index.html');
const errors=[];let edgeCount=0;
for(const [route,destinations] of Object.entries(edges)){
 if(!existsSync(f(route))){errors.push('Missing page: '+route);continue}
 const html=readFileSync(f(route),'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]||'';
 const urls=[...main.matchAll(/\bhref="([^"]+)"/gi)].map(x=>x[1].split(/[?#]/)[0]);
 if(!main)errors.push('Missing main: '+route);
 for(const to of destinations){
  if(!urls.includes(to))errors.push(route+' missing contextual link '+to);
  else edgeCount++;
  if(!existsSync(f(to)))errors.push('Broken target '+to);
 }
 if(!pages.includes(route))continue;
 if((html.match(/<h1\b/gi)||[]).length!==1)errors.push('Incorrect H1 count '+route);
 if((main.match(/<details\b/g)||[]).length!==6)errors.push('Expected six FAQ details '+route);
 if(!html.includes('<link rel="canonical" href="'+origin+route+'"'))errors.push('Canonical mismatch '+route);
 if(!/<meta name="robots" content="index,follow/i.test(html))errors.push('Not indexable '+route);
 if(/SteelMetriXX|стилметрикс|Афонин|Afonin|pharma-geo|ASTRO_INDUSTRY_COMMERCIAL_SLOT/.test(html))
  errors.push('Confidential or inherited content '+route);
 const scripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 let nodes=[];
 for(const [,value] of scripts){try{const obj=JSON.parse(value);nodes.push(...(obj['@graph']||[obj]));}catch{errors.push('Broken JSON-LD '+route)}}
 const faq=nodes.find(x=>x['@type']==='FAQPage');
 if(faq?.mainEntity?.length!==6)errors.push('FAQPage JSON-LD != six '+route);
 const article=route.startsWith('/strategies/')||route.startsWith('/en/strategies/');
 if(article){
  if(!nodes.some(x=>x['@type']==='Article'))errors.push('No Article schema '+route);
  if(!main.includes('class="article-meta"'))errors.push('Article author/date missing '+route);
  const altOG=html.match(/<meta property="og:image:alt" content="([^"]+)"/)?.[1];
  const altTW=html.match(/<meta name="twitter:image:alt" content="([^"]+)"/)?.[1];
  if(!altOG||altOG!==altTW)errors.push('Social image descriptions differ '+route);
  if(!main.includes('class="industrial-evidence-flow"')||!main.includes('industrial-evidence-flow__grid'))errors.push('Native technical responsibility diagram missing '+route);
  if((main.match(/class="industrial-evidence-flow__step"/g)||[]).length!==4)errors.push('Native diagram must have four distinct responsibility steps '+route);
  if(main.includes('industrial-steel-evidence.svg'))errors.push('Disallowed SVG illustration referenced '+route);
 }
 if(route.includes('/industries/')){
  if(!main.includes('class="industrial-hero-art"') || (main.match(/class="industrial-hero-art__card"/g)||[]).length!==4)
   errors.push('Native industrial hero does not expose four supplier stages '+route);
  if(main.includes('industrial-steel-evidence.svg'))errors.push('Industrial hero still references obsolete SVG '+route);
  for(const id of ['industry-hero','industry-evidence-section','industry-scenarios-section','industry-process-section','industry-pricing-section'])
   if(!main.includes(id))errors.push('Missing commercial module '+id+' '+route);
 }
 for(const tag of main.matchAll(/<a\b[^>]*>/g)){
  const htmlTag=tag[0],href=htmlTag.match(/href="([^"]+)"/)?.[1];
  if(href&&href.startsWith('https://')&&!href.startsWith(origin)&&!htmlTag.includes('target="_blank"'))
   errors.push('External reference missing target=_blank '+route+' '+href);
 }
}
for(const [ru,en] of pairs)for(const route of [ru,en]){
 if(!existsSync(f(route)))continue;
 const html=readFileSync(f(route),'utf8');
 for(const [lang,target] of [['ru',ru],['en',en]])
  if(!html.includes('hreflang="'+lang+'" href="'+origin+target+'"'))errors.push('Missing '+lang+' hreflang '+route);
}
for(const route of pages){
 if(!existsSync(f(route)))continue;
 const html=readFileSync(f(route),'utf8');
 for(const source of [
  'https://protect.gost.ru/gost/details/57d18a56-0d60-4071-8f93-053f789060ad',
  'https://protect.gost.ru/gost/details/a139fae5-836f-498f-9490-22aa98f70e03'
 ])if(!html.includes(source))errors.push('Missing official standard '+route+' '+source);
}
if(existsSync(resolve(root,'assets/articles/industrial-steel-evidence.svg')))
 errors.push('Obsolete industrial SVG still included in published assets');
console.log('INDUSTRIAL_CLUSTER_PAGES='+pages.length);
console.log('INDUSTRIAL_CLUSTER_LINKS='+edgeCount);
console.log('INDUSTRIAL_CLUSTER_ERRORS='+errors.length);
if(errors.length){errors.forEach(e=>console.error('ERROR '+e));process.exit(1)}
console.log('INDUSTRIAL_CLUSTER_QA=PASS');
