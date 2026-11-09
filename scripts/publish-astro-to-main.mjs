import {readFileSync,existsSync,readdirSync,copyFileSync,mkdirSync,writeFileSync,appendFileSync,rmSync} from 'node:fs';
import {resolve,relative,dirname,sep} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base=process.cwd(),dist=resolve(base,'dist'),target=resolve(base,'published');
const marker=resolve(target,'astro-release-manifest.json');
const mode=process.argv[2];
if(!['preflight','publish'].includes(mode))throw Error('Use preflight or publish');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=resolve(dir,e.name);return e.isDirectory()?walk(p):e.isFile()?[p]:[];
});
function hashContent(bytes,kind){
 const body=kind==='html'?bytes.toString('utf8').replace(/\r\n/g,'\n').replace(/>\s+</g,'><').trim():bytes;
 return createHash('sha256').update(body).digest('hex');
}
function hash(path,kind){return hashContent(readFileSync(path),kind);}
// main automatically refreshes metadata after a generated release. A bot-only
// maintenance delta is safe to supersede when the previous blob is identical
// to the recorded release manifest, and the new build has been normalized by
// the same production scripts. Any other parallel edit still aborts the release.
function isVerifiedMaintenanceDelta(f){
 try{
  const log=execFileSync('git',['-C',target,'log','-1','--format=%H%x00%s%x00%an','--',f.path],{encoding:'utf8'}).trim().split('\\0');
  if(log.length<3||log[1]!=='Auto-maintain GAEO site metadata'||!/^github-actions\\[bot\\]$/.test(log[2]))return false;
  const before=execFileSync('git',['-C',target,'show',log[0]+'^:'+f.path]);
  return hashContent(before,f.kind)===f.sha256;
 }catch{return false;}
}
const sourcePages=resolve(base,'src/legacy/pages'),sourceAssets=resolve(base,'public');
// Astro component-scoped CSS/JS is emitted under dist/_astro. Publishing only
// public/ and source HTML silently left 404 stylesheets on hundreds of pages.
const astroDir=resolve(dist,'_astro');
const generatedAssets=existsSync(astroDir)?walk(astroDir).map(p=>({
 path:'_astro/'+relative(astroDir,p).split(sep).join('/'),kind:'asset'
})):[];
if(!generatedAssets.some(f=>f.path.endsWith('.css')))
 throw Error('Astro component CSS is missing from dist/_astro; refuse an unstyled release');
const files=[
 ...walk(sourcePages).filter(p=>p.endsWith('.html')).map(p=>({path:relative(sourcePages,p).split(sep).join('/'),kind:'html'})),
 ...walk(sourceAssets).map(p=>({path:relative(sourceAssets,p).split(sep).join('/'),kind:'asset'})),
 ...generatedAssets
].sort((a,b)=>a.path.localeCompare(b.path));
if(new Set(files.map(f=>f.path)).size!==files.length)throw Error('Duplicate page/asset path');
/* Check all HTML references, not only the presence of any CSS file. */
const stagedPaths=new Set(files.map(f=>f.path));
for(const page of files.filter(f=>f.kind==='html')){
 const html=readFileSync(resolve(dist,page.path),'utf8');
 for(const match of html.matchAll(/(?:href|src)=["']\/(_astro\/[^"'?#]+)(?:[?#][^"']*)?["']/g)){
  if(!stagedPaths.has(match[1]))throw Error('Missing Astro asset '+match[1]+' referenced by '+page.path);
 }
}

for(const name of ['index.html','404.html','robots.txt','sitemap.xml','CNAME','assets/site.js'])
 if(!files.some(f=>f.path===name))throw Error('Required output missing: '+name);
let prior=null;
if(existsSync(marker)){
 prior=JSON.parse(readFileSync(marker,'utf8'));
 if(prior.engine!=='Astro'||prior.schema!==1||!Array.isArray(prior.files))throw Error('Unsupported publication manifest');
}
const expected=prior?prior.files:files.map(f=>({...f,sha256:hash(resolve(dist,f.path),f.kind)}));
const errors=[];
for(const f of expected){
 const p=resolve(target,f.path);
 if(!existsSync(p))errors.push('Missing published file '+f.path);
 else{
  const publishedHash=hash(p,f.kind);
  if(publishedHash===f.sha256)continue;
  // A parallel edit is safe to adopt when the source build reproduces it.
  const built=resolve(dist,f.path);
  if(!stagedPaths.has(f.path)||!existsSync(built)||
    (hash(built,f.kind)!==publishedHash&&!isVerifiedMaintenanceDelta(f)))
   errors.push('Unmerged edit on published main: '+f.path);
  else if(hash(built,f.kind)!==publishedHash)
   console.log('Validated main metadata maintenance for '+f.path);
 }
}
for(const f of files)if(!existsSync(resolve(dist,f.path)))errors.push('Astro did not build '+f.path);
if(errors.length){console.error(errors.slice(0,30).join('\n'));throw Error('SAFE PUBLISH ABORTED: '+errors.length+' differences');}
console.log('RELEASE_PREFLIGHT=PASS; initial='+(!prior)+'; html='+files.filter(f=>f.kind==='html').length+'; assets='+files.filter(f=>f.kind==='asset').length+'; astroBundles='+generatedAssets.length);
if(mode==='preflight'){
 if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'initial='+(!prior)+'\n');
 process.exit(0);
}
for(const f of files){
 const dest=resolve(target,f.path);
 mkdirSync(dirname(dest),{recursive:true});
 copyFileSync(resolve(dist,f.path),dest);
}
// Keep every HTML cache key consistent with the actual CSS/JS copied from Astro.
// Run before writing the release manifest so the recorded HTML hashes match production.
execFileSync('python', ['scripts/ensure_asset_versions.py'], {cwd:target,stdio:'inherit'});
const available=new Set(files.map(f=>f.path));
if(prior)for(const f of prior.files)if(!available.has(f.path))rmSync(resolve(target,f.path),{force:true});
// Regenerate the production sitemap from the actual published pages after cleanup.
// Git-derived fallback lastmod dates can change after a prior release.
execFileSync('python', ['scripts/build_sitemap.py'], {cwd:target,stdio:'inherit'});
const updated={
 schema:1,engine:'Astro',sourceBranch:'astro-source',
 sourceCommit:process.env.GITHUB_SHA||'unknown',releasedAt:new Date().toISOString(),
 files:files.map(f=>({...f,sha256:hash(resolve(target,f.path),f.kind)}))
};
writeFileSync(marker,JSON.stringify(updated,null,2)+'\n');
console.log('ASTRO_OUTPUT_STAGED_FOR_PAGES=PASS');
