import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
import {phase3AClusters} from '../src/data/industry-clusters-phase-3a.mjs';
const ROOT=process.cwd(),ORIGINAL=resolve(ROOT,'src/legacy/pages'),PUBLIC=resolve(ROOT,'public'),OUTPUT=resolve(ROOT,'dist');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
 const abs=resolve(dir,x.name);
 return x.isDirectory()?walk(abs):x.isFile()?[abs]:[];
});
const hash=b=>createHash('sha256').update(b).digest('hex');
const normalize=s=>s.replace(/\r\n/g,'\n').replace(/>\s+</g,'><').trim();
// Site-wide header/footer are rebuilt from canonical partials, and may intentionally
// differ from the legacy HTML copies. Compare all other content exactly.
const withoutSharedChrome=s=>s
 .replace(/<!-- SITE_HEADER_START -->[\s\S]*?<!-- SITE_HEADER_END -->/g,'<!-- SHARED_HEADER -->')
 .replace(/<!-- SITE_FOOTER_START -->[\s\S]*?<!-- SITE_FOOTER_END -->/g,'<!-- SHARED_FOOTER -->')
 // Only approved Astro slots can differ from the hybrid HTML source.
 // Every slot is separately verified by qa_approved_design_system.mjs.
 .replace(/<!-- GAEO_DESIGN:(FAQ|CONTACT|SERVICES|WHEN|STEPS|CASES)_START -->[\s\S]*?<!-- GAEO_DESIGN:\1_END -->/g,(_,kind)=>'<!-- GAEO_DESIGN:'+kind+' -->')
 // Tariff components have their own numeric, schema, accessibility and link QA.
 .replace(/<!-- GAEO_TARIFF:(OVERVIEW|CALCULATOR|COMPARISON|CATALOG|DETAIL|SCHEMA|INDUSTRY|DEVELOPMENT)_START -->[\s\S]*?<!-- GAEO_TARIFF:\1_END -->/g,(_,kind)=>'<!-- GAEO_TARIFF:'+kind+' -->');
const originals=walk(ORIGINAL).filter(p=>p.endsWith('.html'));
const assets=walk(PUBLIC);
const problems=[];
// Evidence-led RU/EN industry pages intentionally render a shared structured Astro component.
// Preserve and verify their SEO shell while retaining exact parity for untouched routes.
const specializationRoutes=new Set(industrySpecializations.flatMap(p=>Object.values(p.routes).map(route=>route.slice(1)+'index.html')));
// Phase 3A sector hubs and methodology pages use the existing shared CTA component.
// Their entire rendered content is verified separately in qa_sector_clusters_3a.mjs.
const phase3ARoutes=new Set(phase3AClusters.flatMap(cluster=>['hub','method'].flatMap(kind=>Object.values(cluster.routes[kind]).map(route=>route.slice(1)+'index.html'))));
const commercialRoutes=new Set([
 'geo-prodvizhenie-nedvizhimosti/index.html',
 'en/geo-for-real-estate/index.html',
 'industries/pharma/index.html',
 'en/industries/pharma/index.html',
 'industries/ecommerce/index.html',
 'en/industries/ecommerce/index.html',
 'industries/legal/index.html',
 'en/industries/legal/index.html',
 'industries/metal-structures/index.html',
 'en/industries/metal-structures/index.html'
]);

for(const original of originals){
 const path=relative(ORIGINAL,original).split(sep).join('/');
 const generated=resolve(OUTPUT,path);
 if(!existsSync(generated)){problems.push('Missing route: '+path);continue;}
 const before=normalize(readFileSync(original,'utf8'));
 const after=normalize(readFileSync(generated,'utf8'));
 if(specializationRoutes.has(path)){
  if(!before.includes('<!-- ASTRO_INDUSTRY_SPECIALIZATION_SLOT -->'))problems.push('Missing specialization slot in '+path);
  if(after.includes('ASTRO_INDUSTRY_SPECIALIZATION_SLOT'))problems.push('Unrendered specialization in '+path);
  for(const section of ['industry-specialization__hero','industry-problem-section','industry-scenarios-section','industry-evidence-section','industry-process-section','industry-pricing-section','industry-faq-section','industry-final-section']){
   if(!after.includes(section))problems.push('Missing specialization section '+section+' in '+path);
  }
  if((after.match(/<h1\b/g)||[]).length!==1)problems.push('Specialization must have one H1 in '+path);
  for(const marker of ['rel="canonical"','hreflang="ru"','hreflang="en"','type="application/ld+json"'])if(!after.includes(marker))problems.push('Specialization missing SEO '+marker+' in '+path);
  continue;
 }
 if(phase3ARoutes.has(path)){
  if(!before.includes('<div class="page-cta"></div>'))problems.push('Missing shared CTA slot in phase 3A page '+path);
  if(after.includes('<div class="page-cta"></div>'))problems.push('Shared CTA slot left unrendered in '+path);
  if((after.match(/<h1\\b/g)||[]).length!==1)problems.push('Phase 3A page must contain one H1 in '+path);
  for(const marker of ['rel="canonical"','hreflang="ru"','hreflang="en"','type="application/ld+json"','id="specializations"','id="sources"']){
   if(!after.includes(marker))problems.push('Phase 3A page missing '+marker+' in '+path);
  }
  continue;
 }
 if(commercialRoutes.has(path)){
  if(!before.includes('<!-- ASTRO_INDUSTRY_COMMERCIAL_SLOT -->'))problems.push('Missing managed Astro slot in '+path);
  if(after.includes('ASTRO_INDUSTRY_COMMERCIAL_SLOT'))problems.push('Unrendered managed Astro slot in '+path);
  for(const section of ['industry-hero','industry-problem-section','industry-evidence-section','industry-scenarios-section','industry-process-section','industry-pricing-section','industry-faq-section','industry-final-section']){
    if(!after.includes(section))problems.push('Missing commercial section '+section+' in '+path);
  }
  for(const marker of ['rel="canonical"','hreflang="ru"','hreflang="en"','type="application/ld+json"']){
    if(!after.includes(marker))problems.push('Missing SEO metadata '+marker+' in '+path);
  }
  if((after.match(/<h1\b/g)||[]).length!==1)problems.push('Commercial page requires exactly one H1 in '+path);
  if((after.match(/<details\b[^>]*class="[^"]*\bfaq-item\b[^"]*"/g)||[]).length<6)problems.push('Commercial FAQ requires at least six questions in '+path);
  if(!after.includes('href="/#lead"')&&!after.includes('href="/en/#lead"'))problems.push('Commercial CTA missing in '+path);
  continue;
 }
 const plainBefore=withoutSharedChrome(before),plainAfter=withoutSharedChrome(after);
 if(plainBefore!==plainAfter){
  let i=0;while(i<plainBefore.length&&i<plainAfter.length&&plainBefore[i]===plainAfter[i])i++;
  problems.push('HTML mismatch '+path+' at '+i+', source='+JSON.stringify(plainBefore.slice(i,i+100))+', astro='+JSON.stringify(plainAfter.slice(i,i+100)));
 }
}
for(const asset of assets){
 const path=relative(PUBLIC,asset).split(sep).join('/');
 const output=resolve(OUTPUT,path);
 if(!existsSync(output))problems.push('Missing static asset: '+path);
 else if(hash(readFileSync(asset))!==hash(readFileSync(output)))problems.push('Static asset changed: '+path);
}
console.log('HTML_ROUTES='+originals.length);
console.log('STATIC_RESOURCES='+assets.length);
console.log('PARITY_ISSUES='+problems.length);
if(problems.length){
 for(const item of problems.slice(0,45))console.error('ERROR '+item);
 process.exit(1);
}
console.log('PARITY=PASS: all original pages and static files preserved.');
