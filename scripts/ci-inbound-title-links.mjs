// Generated-page title audit: compare deployed main against the new Astro build.
// This covers legacy HTML and generated bilingual industry specializations alike.
// Scan incoming anchors and linked JSON-LD labels throughout the entire build.
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {execFileSync} from 'node:child_process';

const routes=JSON.parse(process.env.GAEO_CI_ROUTES||'[]');
assert.ok(Array.isArray(routes)&&routes.length>0&&routes.length<=8,'Need 1..8 affected routes');
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
const destination=route=>route==='/'?'index.html':route.endsWith('/')?route.slice(1)+'index.html':route.slice(1);
const normalizeURL=(url,from)=>{
 try{
  const u=new URL(url,'https://gaeo.ru'+from);
  return ['gaeo.ru','www.gaeo.ru'].includes(u.hostname)?u.pathname:null;
 }catch{return null;}
};
const hasOld=(value,labels)=>labels.some(x=>x&&clean(value).toLocaleLowerCase()===x.toLocaleLowerCase());
const all=walk(root).map(path=>({
 route:'/'+relative(root,path).split(sep).join('/').replace(/(^|\/)index\.html$/,''),
 html:readFileSync(path,'utf8')
}));
const scanJSON=(value,target,labels,from)=>{
 if(!value||typeof value!=='object')return;
 if(Array.isArray(value)){for(const child of value)scanJSON(child,target,labels,from);return;}
 const url=typeof value.url==='string'?normalizeURL(value.url,from):typeof value['@id']==='string'?normalizeURL(value['@id'],from):null;
 if(url===target&&(hasOld(value.name||'',labels)||hasOld(value.headline||'',labels)))
  errors.push(from+' JSON-LD refers to '+target+' using an obsolete title');
 for(const child of Object.values(value))if(child&&typeof child==='object')scanJSON(child,target,labels,from);
};
for(const target of routes){
 const file=destination(target);
 const generated=resolve(root,file);
 assert.ok(existsSync(generated),'Affected route was not generated: '+target);
 const current=readFileSync(generated,'utf8');
 let previous;
 try{previous=execFileSync('git',['show','origin/main:'+file],{encoding:'utf8',maxBuffer:16*1024*1024});}
 catch{console.log('TITLE_INBOUND_NEW_PAGE '+target+' (no previous deployed route)');continue;}
 const oldH1=grab(previous,'h1'),newH1=grab(current,'h1');
 const oldTitle=grab(previous,'title'),newTitle=grab(current,'title');
 const obsolete=[
  ...(oldH1!==newH1&&oldH1.length>12?[oldH1]:[]),
  ...(oldTitle!==newTitle&&oldTitle.length>12?[oldTitle]:[])
 ];
 if(!obsolete.length)continue;
 const inbound=[];
 for(const entry of all){
  for(const anchor of entry.html.matchAll(/<a\b([^>]*\bhref\s*=\s*(?:"[^"]*"|'[^']*')[^>]*)>([\s\S]*?)<\/a>/gi)){
   const href=anchor[1].match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
   if(!href||normalizeURL(href[1]??href[2],entry.route)!==target)continue;
   const label=clean(anchor[2]);
   inbound.push({page:entry.route,text:label.slice(0,170)});
   if(hasOld(label,obsolete))errors.push(entry.route+' => '+target+' anchor still says: '+label);
   const title=anchor[1].match(/\btitle\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
   if(title&&hasOld(title[1]??title[2],obsolete))
    errors.push(entry.route+' => '+target+' title attribute still uses the old name');
  }
  for(const script of entry.html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){
   try{scanJSON(JSON.parse(script[1]),target,obsolete,entry.route);}
   catch(e){if(e instanceof SyntaxError)errors.push(entry.route+' has invalid JSON-LD: '+e.message);else throw e;}
  }
 }
 console.log('TITLE_INBOUND_AUDIT '+JSON.stringify({
  target,oldH1,newH1,oldTitle,newTitle,incomingCount:inbound.length,examples:inbound.slice(0,15)
 }));
}
if(errors.length){
 for(const error of errors)console.error('STALE_INBOUND_TITLE '+error);
 throw Error('Changed heading/title has '+errors.length+' stale incoming references: fix canonical sources, never compiled HTML');
}
console.log('TITLE_INBOUND_QA=PASS affectedRoutes='+routes.length);
