// Verify reciprocal internal links for the GAEO e-commerce content cluster.
// This check uses the generated Astro HTML; it is independent of browser runtime.
import {readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
const root=resolve(process.cwd(),'dist');
const required={
 '/': ['/industries/ecommerce/'],
 '/en/': ['/en/industries/ecommerce/'],
 '/industries/': ['/industries/ecommerce/'],
 '/en/industries/': ['/en/industries/ecommerce/'],
 '/strategies/': ['/strategies/ecommerce-measurement/','/strategies/ecommerce-catalog/'],
 '/en/strategies/': ['/en/strategies/ecommerce-measurement/','/en/strategies/ecommerce-catalog/'],
 '/articles/': ['/articles/agentnaya-torgovlya-gotovnost-internet-magazina/'],
 '/en/articles/': ['/en/articles/agentic-commerce-readiness/'],
 '/industries/ecommerce/': [
  '/strategies/ecommerce-measurement/','/strategies/ecommerce-catalog/',
  '/articles/agentnaya-torgovlya-gotovnost-internet-magazina/','/industries/fulfillment/'
 ],
 '/en/industries/ecommerce/': [
  '/en/strategies/ecommerce-measurement/','/en/strategies/ecommerce-catalog/',
  '/en/articles/agentic-commerce-readiness/','/en/industries/fulfillment/'
 ],
 '/strategies/ecommerce-measurement/': ['/industries/ecommerce/','/strategies/ecommerce-catalog/'],
 '/en/strategies/ecommerce-measurement/': ['/en/industries/ecommerce/','/en/strategies/ecommerce-catalog/'],
 '/strategies/ecommerce-catalog/': ['/industries/ecommerce/','/strategies/ecommerce-measurement/'],
 '/en/strategies/ecommerce-catalog/': ['/en/industries/ecommerce/','/en/strategies/ecommerce-measurement/'],
 '/articles/agentnaya-torgovlya-gotovnost-internet-magazina/': [
  '/industries/ecommerce/','/strategies/ecommerce-catalog/','/strategies/ecommerce-measurement/'
 ],
 '/en/articles/agentic-commerce-readiness/': [
  '/en/industries/ecommerce/','/en/strategies/ecommerce-catalog/','/en/strategies/ecommerce-measurement/'
 ],
 '/industries/fulfillment/': ['/industries/ecommerce/'],
 '/en/industries/fulfillment/': ['/en/industries/ecommerce/']
};
const externalRequired=[
 'https://habr.com/ru/articles/1087822/',
 'https://oborot.ru/blogs/geo-dlya-internet-magazina-kak-poluchat-prodazhi-iz-nejrosetej-esli-na-marketplejse-tot-zhe-tovar-deshevle-i279922.html'
];
const problems=[];
let pages=0,edges=0;
const htmlFile=route=>resolve(root,route.substring(1),'index.html');
for(const [route,targetPaths] of Object.entries(required)){
 const file=htmlFile(route);
 if(!existsSync(file)){problems.push('Page missing: '+route);continue}
 const html=readFileSync(file,'utf8');
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
 if(!main){problems.push('No main: '+route);continue}
 pages++;
 const hrefs=[...main.matchAll(/\bhref="([^"]+)"/g)].map(m=>m[1].replace(/&amp;/g,'&'));
 for(const target of targetPaths){
  if(!hrefs.some(h=>h.split('#')[0].split('?')[0]===target))
   problems.push(route+' missing contextual link to '+target);
  else edges++;
  if(!existsSync(htmlFile(target)))
   problems.push(route+' links to absent page '+target);
 }
 const canonical=html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1];
 if(!canonical || canonical!=='https://gaeo.ru'+route)
  problems.push(route+' incorrect canonical: '+String(canonical));
 if(!/<meta\s+name="robots"\s+content="index,follow/i.test(html))
  problems.push(route+' missing indexable robots meta');
}
for(const route of ['/industries/ecommerce/','/en/industries/ecommerce/']){
 const html=readFileSync(htmlFile(route),'utf8');
 for(const ext of externalRequired)
  if(!html.includes(ext))problems.push(route+' missing existing author publication citation: '+ext);
}
for(const [ru,en] of [
 ['/industries/ecommerce/','/en/industries/ecommerce/'],
 ['/strategies/ecommerce-measurement/','/en/strategies/ecommerce-measurement/'],
 ['/strategies/ecommerce-catalog/','/en/strategies/ecommerce-catalog/'],
 ['/articles/agentnaya-torgovlya-gotovnost-internet-magazina/','/en/articles/agentic-commerce-readiness/']
]){
 for(const route of [ru,en]){
  const h=readFileSync(htmlFile(route),'utf8');
  for(const [lang,target] of [['ru',ru],['en',en]])
   if(!h.includes('hreflang="'+lang+'" href="https://gaeo.ru'+target+'"'))
    problems.push(route+' missing reciprocal hreflang '+lang+' => '+target);
 }
}
console.log('ECOM_CLUSTER_PAGES='+pages);
console.log('ECOM_CLUSTER_LINKS='+edges);
console.log('ECOM_CLUSTER_ISSUES='+problems.length);
if(problems.length){
 for(const p of problems.slice(0,50))console.error('ERROR: '+p);
 process.exit(1);
}
console.log('ECOM_CLUSTER_QA=PASS');
