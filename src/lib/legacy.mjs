import {readdirSync,readFileSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
const ROOT=process.cwd(),PAGES=resolve(ROOT,'src/legacy/pages'),PARTIALS=resolve(ROOT,'templates/partials');
const MARKERS=/<!-- SITE_HEADER_START -->[\s\S]*?<!-- SITE_HEADER_END -->|<!-- SITE_FOOTER_START -->[\s\S]*?<!-- SITE_FOOTER_END -->|<div class="page-cta">[\s\S]*?<\/div>|<!-- ASTRO_INDUSTRY_COMMERCIAL_SLOT -->/g;
function walk(dir){
 const out=[];
 for(const entry of readdirSync(dir,{withFileTypes:true})){
  const p=resolve(dir,entry.name);
  if(entry.isDirectory())out.push(...walk(p));
  else if(entry.isFile()&&p.endsWith('.html'))out.push(relative(PAGES,p).split(sep).join('/'));
 }
 return out.sort();
}
export function listLegacyRoutes(){
 return walk(PAGES).filter(p=>p!=='404.html').map(p=>({
  params:{slug:p==='index.html'?undefined:p.replace(/\/index\.html$/,'').replace(/\.html$/,'')},
  props:{sourcePath:p}
 }));
}
function langHref(html,lang){
 const tags=html.match(/<link\b[^>]*>/gi)||[];
 for(const tag of tags){
  if(!/\brel=["']alternate["']/i.test(tag))continue;
  const key=(tag.match(/\bhreflang=["']([^"']+)/i)||[])[1];
  if(key!==lang)continue;
  const href=(tag.match(/\bhref=["']([^"']+)/i)||[])[1];
  if(href?.startsWith('https://gaeo.ru'))return href.substring('https://gaeo.ru'.length)||'/';
  if(href?.startsWith('/'))return href;
 }
 return lang==='en'?'/en/':'/';
}
function chrome(original,kind,lang){
 const file=(kind==='header'?'site-header':'site-footer')+(lang==='en'?'-en':'')+'.html';
 let t=readFileSync(resolve(PARTIALS,file),'utf8').trim();
 for(const id of ['ru','en']){
  const re=new RegExp('(<a class="lang-link lang-'+id+'" href=")[^"]*(")','g');
  t=t.replace(re,(_,a,b)=>a+langHref(original,id)+b);
 }
 const m=kind==='header'?'SITE_HEADER':'SITE_FOOTER';
 return '<!-- '+m+'_START -->\n'+t+'\n<!-- '+m+'_END -->';
}
export function tokenizeLegacyPage(rel){
 const file=resolve(PAGES,rel);
 if(!file.startsWith(PAGES+sep))throw Error('Invalid legacy path '+rel);
 const src=readFileSync(file,'utf8'),lang=rel.startsWith('en/')?'en':'ru';
 const sharedCta=/^(?:en\/)?(?:industries|strategies)\//.test(rel)||/(?:^|\/)cases\/methodlab-/.test(rel);
 const out=[];let cursor=0;
 for(const m of src.matchAll(MARKERS)){
  if(m.index>cursor)out.push({kind:'raw',content:src.slice(cursor,m.index)});
  const part=m[0];
  if(part.startsWith('<!-- ASTRO_INDUSTRY_COMMERCIAL_SLOT'))out.push({kind:'industry-commercial'});
  else if(part.startsWith('<!-- SITE_HEADER_START'))out.push({kind:'header',content:chrome(src,'header',lang)});
  else if(part.startsWith('<!-- SITE_FOOTER_START'))out.push({kind:'footer',content:chrome(src,'footer',lang)});
  else if(sharedCta){
   const t=readFileSync(resolve(PARTIALS,'hub-cta-'+lang+'.html'),'utf8').trim();
   out.push({kind:'cta',content:t});
  }else out.push({kind:'raw',content:part});
  cursor=m.index+part.length;
 }
 if(cursor<src.length)out.push({kind:'raw',content:src.slice(cursor)});
 for(const kind of ['header','footer'])if(out.filter(x=>x.kind===kind).length!==1)throw Error('Unexpected '+kind+' in '+rel);
 if(sharedCta&&out.filter(x=>x.kind==='cta').length!==1)throw Error('Expected one CTA in '+rel);
 if(src.includes('<!-- ASTRO_INDUSTRY_COMMERCIAL_SLOT -->')&&out.filter(x=>x.kind==='industry-commercial').length!==1)throw Error('Expected exactly one commercial slot in '+rel);
 return out;
}
