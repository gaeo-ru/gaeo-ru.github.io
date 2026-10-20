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
for(const original of originals){
 const path=relative(ORIGINAL,original).split(sep).join('/');
 const generated=resolve(OUTPUT,path);
 if(!existsSync(generated)){problems.push('Missing route: '+path);continue;}
 const before=normalize(readFileSync(original,'utf8'));
 const after=normalize(readFileSync(generated,'utf8'));
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
