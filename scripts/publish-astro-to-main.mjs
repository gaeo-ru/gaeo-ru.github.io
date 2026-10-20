import {readFileSync,existsSync,readdirSync,copyFileSync,mkdirSync,writeFileSync,appendFileSync,rmSync} from 'node:fs';
import {resolve,relative,dirname,sep} from 'node:path';
import {createHash} from 'node:crypto';
const base=process.cwd(),dist=resolve(base,'dist'),target=resolve(base,'published');
const marker=resolve(target,'astro-release-manifest.json');
const mode=process.argv[2];
if(!['preflight','publish'].includes(mode))throw Error('Use preflight or publish');
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
 const p=resolve(dir,e.name);return e.isDirectory()?walk(p):e.isFile()?[p]:[];
});
function hash(path,kind){
 const bytes=readFileSync(path);
 const body=kind==='html'?bytes.toString('utf8').replace(/\r\n/g,'\n').replace(/>\s+</g,'><').trim():bytes;
 return createHash('sha256').update(body).digest('hex');
}
const sourcePages=resolve(base,'src/legacy/pages'),sourceAssets=resolve(base,'public');
const files=[
 ...walk(sourcePages).filter(p=>p.endsWith('.html')).map(p=>({path:relative(sourcePages,p).split(sep).join('/'),kind:'html'})),
 ...walk(sourceAssets).map(p=>({path:relative(sourceAssets,p).split(sep).join('/'),kind:'asset'}))
].sort((a,b)=>a.path.localeCompare(b.path));
if(new Set(files.map(f=>f.path)).size!==files.length)throw Error('Duplicate page/asset path');
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
 else if(hash(p,f.kind)!==f.sha256)errors.push('Unmerged edit on published main: '+f.path);
}
for(const f of files)if(!existsSync(resolve(dist,f.path)))errors.push('Astro did not build '+f.path);
if(errors.length){console.error(errors.slice(0,30).join('\n'));throw Error('SAFE PUBLISH ABORTED: '+errors.length+' differences');}
console.log('RELEASE_PREFLIGHT=PASS; initial='+(!prior)+'; html='+files.filter(f=>f.kind==='html').length+'; assets='+files.filter(f=>f.kind==='asset').length);
if(mode==='preflight'){
 if(process.env.GITHUB_OUTPUT)appendFileSync(process.env.GITHUB_OUTPUT,'initial='+(!prior)+'\n');
 process.exit(0);
}
for(const f of files){
 const dest=resolve(target,f.path);
 mkdirSync(dirname(dest),{recursive:true});
 copyFileSync(resolve(dist,f.path),dest);
}
const available=new Set(files.map(f=>f.path));
if(prior)for(const f of prior.files)if(!available.has(f.path))rmSync(resolve(target,f.path),{force:true});
const updated={
 schema:1,engine:'Astro',sourceBranch:'astro-source',
 sourceCommit:process.env.GITHUB_SHA||'unknown',releasedAt:new Date().toISOString(),
 files:files.map(f=>({...f,sha256:hash(resolve(target,f.path),f.kind)}))
};
writeFileSync(marker,JSON.stringify(updated,null,2)+'\n');
console.log('ASTRO_OUTPUT_STAGED_FOR_PAGES=PASS');
