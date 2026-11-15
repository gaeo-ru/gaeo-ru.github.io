// Select QA by changes since the last *published* source commit, not HEAD^.
// Pending commits from cancelled/failed workflows are therefore never skipped.
import {readFileSync, appendFileSync, existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';

const changedGroups=new Set();
const pages=new Set();
const changedTitlePaths=[];
let structural=false, full=false;
const reasons=[];
const repoRead=(revision,path)=>execFileSync('git',['show',revision+':'+path],{encoding:'utf8',maxBuffer:16*1024*1024});
const run=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:16*1024*1024}).trim();
const markFull=reason=>{full=true;reasons.push(reason);};
const htmlTitle=html=>{
 const match=html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
 return match?match[1].replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim():'';
};
const h1=html=>{
 const match=html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
 return match?match[1].replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim():'';
};
// Preserve scripts, styles, tag attributes, comments and element order.
// Only ordinary text nodes may differ in the lightweight "text-only" mode.
const markup=html=>(html.match(/<script\b[^>]*>[\s\S]*?<\/script\s*>|<style\b[^>]*>[\s\S]*?<\/style\s*>|<!--[\s\S]*?-->|<![^>]*>|<[^>]*>/gi)||[]).join('\n');
const fromSourcePath=path=>{
 const suffix=path.slice('src/legacy/pages/'.length);
 if(suffix==='index.html')return '/';
 if(suffix==='404.html')return '/404.html';
 if(suffix.endsWith('/index.html'))return '/'+suffix.slice(0,-10);
 return '/'+suffix;
};
const outputs={};
const set=(key,value)=>outputs[key]=String(value);
let base='';
try{
 const manifestPath='published/astro-release-manifest.json';
 if(!existsSync(manifestPath))throw Error('No published release manifest');
 const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));
 base=manifest.sourceCommit;
 if(!/^[0-9a-f]{40}$/.test(base))throw Error('Missing valid sourceCommit in published manifest');
 run('cat-file','-e',base+'^{commit}');
 const paths=run('diff','--name-only','--diff-filter=ACDMRT',base,'HEAD').split('\n').filter(Boolean);
 if(paths.length===0)markFull('No unpublished changes or manual dispatch: full validation');
 if(paths.length>60)markFull('Large change set: '+paths.length+' files');
 for(const path of paths){
  if(path.startsWith('docs/')||path==='README.md'||path.startsWith('.github/ISSUE_TEMPLATE/'))continue;
  if(/^src\/legacy\/pages\/.+\.html$/.test(path)){
   const route=fromSourcePath(path);
   pages.add(route);
   // A page can contain an industry-specific integration or a fragile mobile table.
   // These dependencies matter even when the changed source file is local.
   if(/(?:ecommerce|agentnaya-torgovlya)/i.test(route))changedGroups.add('ecommerce');
   if(/(?:legal|yuridichesk)/i.test(route))changedGroups.add('legal');
   if(/(?:industrial|b2b|metal-structures)/i.test(route))changedGroups.add('industrial');
   if(/(?:ecommerce-measurement|ecommerce-catalog|agentnaya-torgovlya|geo-spetsialisty-110|legal-website|sajt-yuridicheskoj|tarify|pricing|legal-recommendations)/i.test(route))changedGroups.add('tables');
   let previous,current;
   try{
    previous=repoRead(base,path);
    current=readFileSync(path,'utf8');
   }catch{
    markFull('Added/deleted/unknown page: '+path);
    continue;
   }
   if(!htmlTitle(current)||!h1(current))markFull('Page lacks title/H1: '+path);
   if(markup(previous)!==markup(current))structural=true;
   if(htmlTitle(previous)!==htmlTitle(current)||h1(previous)!==h1(current)){
    changedTitlePaths.push(path);
    structural=true;
   }
   continue;
  }
  if(path.startsWith('src/data/rankings/')){changedGroups.add('rankings');continue;}
  if(path==='src/data/publications.json'||path==='src/data/reviews.json'){changedGroups.add('evidence');continue;}
  if(path==='src/data/2gis-services.json'){changedGroups.add('tariffs');continue;}
  if(/^src\/data\/industry-specializations(?:-batch-[a-z0-9]+)?\.mjs$/.test(path)){
   changedGroups.add('specializations');continue;
  }
  if(path==='src/data/industry-commercial-pages.mjs'){
   changedGroups.add('industry');continue;
  }
  if(path==='src/data/industry-clusters-phase-3a.mjs'||path==='src/data/industry-methods-phase-3b.mjs'){
   changedGroups.add('sector3a');continue;
  }
  if(path==='src/data/sector-guides-phase-3c.mjs'){changedGroups.add('sector3c');continue;}
  if(path==='src/data/sector-case-proof-phase-3d.mjs'){changedGroups.add('sector3d');continue;}
  if(path==='src/data/sector-buyer-intents-phase-3e.mjs'){changedGroups.add('sector3e');continue;}
  if(path==='src/data/service-detail-content.mjs'){changedGroups.add('development');continue;}
  // Shared templates, CSS, JS, site builders, CI, unclassified data etc.
  // Unknown impact is never allowed into the fast path.
  markFull('Shared or unclassified source: '+path);
 }
 if(pages.size>8)markFull('More than eight independently changed pages');
 if(changedTitlePaths.length>8)markFull('More than eight title changes');
 set('files',paths.length);
}catch(e){
 markFull('Cannot compare with published source: '+e.message);
}
const mode=full?'full':changedGroups.size?'profile':structural?'page-structure':'text-only';
const active=group=>full||changedGroups.has(group);
set('mode',mode);
set('baseline',base);
set('routes',JSON.stringify([...pages].sort()));
set('title_paths',JSON.stringify(changedTitlePaths));
set('titles_changed',changedTitlePaths.length>0);
set('focused_browser',pages.size>0);
for(const group of ['rankings','industry','specializations','evidence','tariffs','sector3a','sector3c','sector3d','sector3e','development','ecommerce','legal','industrial','tables'])set('check_'+group,active(group));
set('check_terms',full);
set('check_research',full);
set('check_tables',full||changedGroups.has('tables'));
set('chromium',full||pages.size>0||active('rankings')||active('industry')||active('specializations')||active('evidence')||active('tariffs')||active('sector3a')||active('development')||active('tables'));
const info='GAEO_CI_SCOPE '+JSON.stringify({
 mode,files:outputs.files||'unknown',baseline:base.slice(0,12),
 routes:[...pages],titlePaths:changedTitlePaths,groups:[...changedGroups],reasons
});
console.log(info);
if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,'### GAEO deploy checks\n\n'+info+'\n\n');
if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,Object.entries(outputs).map(([k,v])=>k+'='+v).join('\n')+'\n');
