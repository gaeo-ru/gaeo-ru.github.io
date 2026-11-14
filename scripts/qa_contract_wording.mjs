// GAEO editorial rule: do not publish the contract-adjective family in Russian copy.
// Prefer "BMR по договору", "гарантии по договору" or context-specific phrasing.
import {existsSync,readdirSync,readFileSync} from 'node:fs';
import {resolve,relative,extname,join,sep} from 'node:path';

const root=resolve(process.cwd(),'dist');
if(!existsSync(root))throw new Error('Build output dist/ is missing');
const textual=new Set(['.html','.htm','.xml','.json','.txt','.js','.mjs','.css','.md']);
const forbidden=/договорн[а-яё]*/giu;
const issues=[];
let inspected=0;
function walk(dir){
 for(const item of readdirSync(dir,{withFileTypes:true})){
  const full=join(dir,item.name);
  if(item.isDirectory()){walk(full);continue;}
  if(!item.isFile()||!textual.has(extname(full).toLowerCase()))continue;
  inspected++;
  const content=readFileSync(full,'utf8');
  for(const m of content.matchAll(forbidden)){
   const name=relative(root,full).split(sep).join('/');
   issues.push(name+': '+JSON.stringify(content.slice(Math.max(0,m.index-75),m.index+105).replace(/\s+/g,' ')));
   if(issues.length>=30)return;
  }
  if(issues.length>=30)return;
 }
}
walk(root);
console.log('CONTRACT_WORDING_FILES='+inspected);
console.log('CONTRACT_WORDING_ISSUES='+issues.length);
if(issues.length){issues.forEach(x=>console.error('ERROR '+x));process.exit(1);}
console.log('CONTRACT_WORDING_QA=PASS');
