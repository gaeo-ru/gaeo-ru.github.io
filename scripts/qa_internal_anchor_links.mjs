// Check the rendered site so raw legacy HTML and Astro-generated anchors are both covered.
// Incoming UTM parameters are retained for analytics, but a visitor navigating within
// the site must not unknowingly carry tracking parameters into an anchor destination.
import {readdirSync,readFileSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';

const root=resolve(process.cwd(),'dist');
const files=[];
function walk(dir){
 for(const entry of readdirSync(dir,{withFileTypes:true})){
  const path=resolve(dir,entry.name);
  if(entry.isDirectory())walk(path);
  else if(entry.isFile()&&path.endsWith('.html'))files.push(path);
 }
}
walk(root);

const issues=[];
let allAnchors=0;
let internalAnchors=0;
let fragmentOnly=0;
let trackedAnchors=0;

for(const file of files){
 const path=relative(root,file).split(sep).join('/');
 const pagePath=path==='index.html'?'/':'/'+path.replace(/index\.html$/,'');
 const base='https://gaeo.ru'+pagePath;
 const html=readFileSync(file,'utf8');
 const links=html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi);
 for(const match of links){
  const raw=match[2].replace(/&amp;/gi,'&');
  if(!raw.includes('#'))continue;
  allAnchors++;
  let target;
  try{target=new URL(raw,base)}catch{continue}
  if(!['gaeo.ru','www.gaeo.ru','gaeo-ru.github.io'].includes(target.hostname))continue;
  internalAnchors++;
  const utmKeys=[...target.searchParams.keys()].filter(k=>k.toLowerCase().startsWith('utm_'));
  if(utmKeys.length || /(?:^|[?&#])utm_[a-z_]+=/i.test(target.hash)){
   trackedAnchors++;
   issues.push(path+': internal fragment link carries UTM: '+raw);
  }
  if(raw.startsWith('#')){
   fragmentOnly++;
   issues.push(path+': bare fragment inherits URL query parameters: '+raw);
  }
 }
}
console.log('ANCHOR_HTML_PAGES='+files.length);
console.log('ALL_HASH_LINKS='+allAnchors);
console.log('INTERNAL_HASH_LINKS='+internalAnchors);
console.log('BARE_FRAGMENT_LINKS='+fragmentOnly);
console.log('INTERNAL_UTM_HASH_LINKS='+trackedAnchors);
console.log('ANCHOR_QA_ISSUES='+issues.length);
if(issues.length){
 for(const issue of issues.slice(0,70))console.error('ERROR: '+issue);
 process.exit(1);
}
console.log('ANCHOR_QA=PASS');
