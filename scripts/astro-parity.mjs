import {readFileSync,existsSync,readdirSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {createHash} from 'node:crypto';
const ROOT=process.cwd(),ORIGINAL=resolve(ROOT,'src/legacy/pages'),PUBLIC=resolve(ROOT,'public'),OUTPUT=resolve(ROOT,'dist');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
 const abs=resolve(dir,x.name);
 return x.isDirectory()?walk(abs):x.isFile()?[abs]:[];
});
const hash=b=>createHash('sha256').update(b).digest('hex');
const normalize=s=>s.replace(/\r\n/g,'\n').replace(/>\s+</g,'><').trim();
const originals=walk(ORIGINAL).filter(p=>p.endsWith('.html'));
const assets=walk(PUBLIC);
const problems=[];
// Two real-estate landing pages now intentionally render a structured Astro component.
// Preserve and verify their SEO shell while retaining exact parity for untouched routes.
const commercialRoutes=new Set([
 'geo-prodvizhenie-nedvizhimosti/index.html',
 'en/geo-for-real-estate/index.html'
]);

for(const original of originals){
 const path=relative(ORIGINAL,original).split(sep).join('/');
 const generated=resolve(OUTPUT,path);
 if(!existsSync(generated)){problems.push('Missing route: '+path);continue;}
 const before=normalize(readFileSync(original,'utf8'));
 const after=normalize(readFileSync(generated,'utf8'));
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
  if((after.match(/<details\b/g)||[]).length<6)problems.push('Commercial FAQ requires at least six questions in '+path);
  if(!after.includes('href="/#lead"')&&!after.includes('href="/en/#lead"'))problems.push('Commercial CTA missing in '+path);
  continue;
 }
 if(before!==after){
  let i=0;while(i<before.length&&i<after.length&&before[i]===after[i])i++;
  problems.push('HTML mismatch '+path+' at '+i+', source='+JSON.stringify(before.slice(i,i+100))+', astro='+JSON.stringify(after.slice(i,i+100)));
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
