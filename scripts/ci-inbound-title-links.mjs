// Title/H1 changes are not ordinary copy edits: detect stale incoming labels
// across ALL generated pages, including JSON-LD entries linking to the page.
// Do not silently rewrite generated HTML; fix the canonical source instead.
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {execFileSync} from 'node:child_process';

const base=process.env.GAEO_CI_BASELINE||'';
const paths=JSON.parse(process.env.GAEO_CI_TITLE_PATHS||'[]');
assert.ok(/^[a-f0-9]{40}$/.test(base),'Published source baseline must be known');
const root=resolve('dist'),errors=[];
const decode=str=>String(str||'').replace(/&(?:amp|quot|apos|lt|gt|nbsp|#(\d+)|#x([a-f0-9]+));/gi,(s,dec,hex)=>{
 const basic={amp:'&',quot:'"',apos:"'",lt:'<',gt:'>',nbsp:' '};
 if(dec)return String.fromCodePoint(Number(dec));
 if(hex)return String.fromCodePoint(parseInt(hex,16));
 return basic[s.slice(1,-1).toLowerCase()]||s;
});
const clean=str=>decode(str.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')).replace(/\s+/g,' ').trim();
const grab=(html,tag)=>{
 const match=html.match(new RegExp('<'+tag+'\\b[^>]*>([\\s\\S]*?)<\\/'+tag+'>','i'));
 return match?clean(match[1]):'';
};
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=resolve(dir,e.name);
 return e.isDirectory()?walk(p):e.isFile()&&p.endsWith('.html')?[p]:[];
});
const all=walk(root).map(path=>({
 route:'/'+relative(root,path).split(sep).join('/').replace(/(^|\/)index\.html$/,''),
 html:readFileSync(path,'utf8')
}));
const normalizeURL=(url,from)=>{
 try{
  const u=new URL(url,'https://gaeo.ru'+from);
  return ['gaeo.ru','www.gaeo.ru'].includes(u.hostname)?u.pathname:null;
 }catch{return null;}
};
const hasOld=(value,labels)=>labels.some(x=>x&&clean(value).toLocaleLowerCase()===x.toLocaleLowerCase());
const scanJSON=(value,target,labels,from)=>{
 if(!value||typeof value!=='object')return;
 if(Array.isArray(value)){for(const child of value)scanJSON(child,target,labels,from);return;}
 const url=typeof value.url==='string'?normalizeURL(value.url,from):null;
 if(url===target&&(hasOld(value.name||'',labels)||hasOld(value.headline||'',labels)))
  errors.push(from+' JSON-LD references '+target+' using an obsolete title');
 for(const child of Object.values(value))if(child&&typeof child==='object')scanJSON(child,target,labels,from);
};
for(const sourcePath of paths){
 const target='/'+sourcePath.slice('src/legacy/pages/'.length).replace(/(^|\/)index\.html$/,'');
 let previous;
 try{previous=execFileSync('git',['show',base+':'+sourcePath],{encoding:'utf8'});}
 catch{throw Error('Cannot read old title from '+sourcePath+' at '+base);}
 assert.ok(existsSync(sourcePath),'Changed title source must exist: '+sourcePath);
 const current=readFileSync(sourcePath,'utf8');
 const oldH1=grab(previous,'h1'),newH1=grab(current,'h1');
 const oldTitle=grab(previous,'title'),newTitle=grab(current,'title');
 const obsolete=[
  ...(oldH1!==newH1&&oldH1.length>12?[oldH1]:[]),
  ...(oldTitle!==newTitle&&oldTitle.length>12?[oldTitle]:[])
 ];
 if(obsolete.length===0)continue;
 const inbound=[];
 for(const entry of all){
  for(const a of entry.html.matchAll(/<a\b([^>]*\bhref\s*=\s*(?:"[^"]*"|'[^']*')[^>]*)>([\s\S]*?)<\/a>/gi)){
   const href=a[1].match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
   if(!href||normalizeURL(href[1]??href[2],entry.route)!==target)continue;
   const label=clean(a[2]);
   inbound.push({page:entry.route,text:label.slice(0,170)});
   if(hasOld(label,obsolete))errors.push(entry.route+' => '+target+' anchor still says: '+label);
   const title=a[1].match(/\btitle\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
   if(title&&hasOld(title[1]??title[2],obsolete))
    errors.push(entry.route+' => '+target+' link title attribute is obsolete');
  }
  for(const script of entry.html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
   try{scanJSON(JSON.parse(script[1]),target,obsolete,entry.route);}
   catch(e){if(e instanceof SyntaxError)errors.push(entry.route+' has invalid JSON-LD: '+e.message);else throw e;}
  }
 }
 console.log('TITLE_INBOUND_AUDIT '+JSON.stringify({
  target,oldH1,newH1,oldTitle,newTitle,numberOfIncomingLinks:inbound.length,
  examples:inbound.slice(0,15)
 }));
}
if(errors.length){
 errors.forEach(error=>console.error('STALE_INBOUND_TITLE '+error));
 throw Error('Title or heading changed: update '+errors.length+' stale incoming reference(s) in canonical source files');
}
console.log('TITLE_INBOUND_QA=PASS changedRoutes='+paths.length);
