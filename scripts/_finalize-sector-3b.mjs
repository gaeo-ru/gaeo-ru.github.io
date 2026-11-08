import assert from 'node:assert/strict';
import fs from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const repo='gaeo-ru/gaeo-ru.github.io', merge='e8df34a2f7fb06325b78fbb5e75db78e3c736234';
const production=42523780898, prCI=42521534840;
const root=process.cwd(),out=resolve('visual-sector-3b');fs.mkdirSync(out,{recursive:true});
const report={batch:'3B',started_at:new Date().toISOString(),source_merge:merge,pr:128,pr_ci_run:prCI,production_run:production,origin:'https://gaeo.ru',form_submitted:false,https:[],browser:[],status:'running'};
const save=()=>fs.writeFileSync(resolve(out,'report.json'),JSON.stringify(report,null,2)+'\n');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const hash=b=>createHash('sha256').update(b).digest('hex');
async function api(path){const r=await fetch('https://api.github.com/repos/'+repo+path,{headers:{Authorization:'Bearer '+process.env.GH_TOKEN,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(30000)});assert.ok(r.ok,'GitHub '+path+' '+r.status);return r.json();}
async function waitRun(id,minutes=35){for(let i=0;i<minutes*3;i++){const r=await api('/actions/runs/'+id);if(r.status==='completed'){assert.equal(r.conclusion,'success','Workflow '+id);return r;}if(i%6===0)console.log('Release gate',id,r.status);await pause(20000);}throw Error('Release workflow not completed within finite acceptance window');}
async function publicGet(path){const r=await fetch('https://gaeo.ru'+path,{cache:'no-store',signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,'Public HTTPS '+path);assert.equal(new URL(r.url).origin,'https://gaeo.ru','Public origin');return Buffer.from(await r.arrayBuffer());}
let browser;
try{
 const pr=await api('/pulls/128');assert.ok(pr.merged);assert.equal(pr.merge_commit_sha,merge);
 const ci=await waitRun(prCI,1);assert.equal(ci.head_sha,'fd744982c0939dcbf6cb939eee5610ad9cfccb2b');report.pr_ci_status='pass';
 const prod=await waitRun(production);assert.equal(prod.head_sha,merge);report.production_status='pass';
 git('fetch','origin','main');report.published_commit=git('rev-parse','FETCH_HEAD');
 git('worktree','add','--detach','_published',report.published_commit);
 const published=resolve('_published');
 const manifest=JSON.parse(fs.readFileSync(resolve(published,'astro-release-manifest.json'),'utf8'));
 assert.equal(manifest.sourceCommit,merge,'Accept this precise 3B release');
 report.released_at=manifest.releasedAt;report.manifest_files=manifest.files.length;report.html_pages=manifest.files.filter(x=>x.kind==='html').length;
 const sitemap=fs.readFileSync(resolve(published,'sitemap.xml'),'utf8');report.sitemap_urls=(sitemap.match(/<loc>/g)||[]).length;
 let pages;
 for(let i=0;i<60;i++){
  const runs=await api('/actions/runs?branch=main&head_sha='+report.published_commit+'&per_page=30');
  pages=runs.workflow_runs.find(x=>/pages.*(build|deploy)/i.test(x.name));
  if(pages?.status==='completed'){assert.equal(pages.conclusion,'success','Pages deployment');break;}
  await pause(10000);
 }
 assert.ok(pages&&pages.status==='completed','Confirmed Pages workflow required');report.pages_run=pages.id;report.pages_status='pass';
 // The public manifest is checked separately from main and the Pages workflow.
 let visible=false;
 for(let i=0;i<24;i++){try{const live=JSON.parse((await publicGet('/astro-release-manifest.json?qa3b='+Date.now())).toString());if(live.sourceCommit===merge){visible=true;break;}}catch(e){if(i===23)throw e;}await pause(10000);}
 assert.ok(visible,'Public release manifest still differs');
 const {phase3BMethods}=await import(pathToFileURL(resolve('src/data/industry-methods-phase-3b.mjs')));
 const {industrySpecializations}=await import(pathToFileURL(resolve('src/data/industry-specializations.mjs')));
 assert.deepEqual(phase3BMethods.flatMap(x=>x.ids),[42,48,55,59]);assert.equal(industrySpecializations.length,100);
 const methods=phase3BMethods.flatMap(x=>['ru','en'].map(lang=>({route:x.routes.method[lang],lang,type:'method',entry:x,service:industrySpecializations.find(s=>s.id===x.ids[0])})));
 const services=phase3BMethods.flatMap(x=>['ru','en'].map(lang=>({route:industrySpecializations.find(s=>s.id===x.ids[0]).routes[lang],lang,type:'service',entry:x})));
 const targets=[...methods,...services,...['ru','en'].map(lang=>({route:(lang==='en'?'/en':'')+'/strategies/',lang,type:'index'}))];
 fs.mkdirSync('dist',{recursive:true});
 for(const file of manifest.files){const src=resolve(published,file.path),dst=resolve('dist',file.path);if(fs.existsSync(src)){fs.mkdirSync(resolve(dst,'..'),{recursive:true});fs.copyFileSync(src,dst);}}
 execFileSync('node',['scripts/qa_sector_methods_3b.mjs','--static'],{stdio:'inherit'});
 const assets=new Set();
 for(const t of targets){
  const filename=t.route.slice(1)+'index.html',bytes=await publicGet(t.route),local=fs.readFileSync(resolve(published,filename));
  assert.equal(hash(bytes),hash(local),'Live HTML matches published main '+t.route);
  const html=bytes.toString();assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes('rel="canonical" href="https://gaeo.ru'+t.route+'"'));
  assert.ok(sitemap.includes('<loc>https://gaeo.ru'+t.route+'</loc>'),'Sitemap '+t.route);
  for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)(?:[?#][^"]*)?"/g))assets.add(m[1]);
  report.https.push({route:t.route,status:200,sha256:hash(bytes),matches_main:true,sitemap:true});
 }
 for(const path of assets){const local=resolve(published,path.slice(1));if(fs.existsSync(local))assert.equal(hash(await publicGet(path)),hash(fs.readFileSync(local)),'Live asset matches main '+path);}
 report.local_assets_verified=assets.size;
 // Exercise the maintained 3B test against the public origin, not preview.
 execFileSync('node',['scripts/qa_sector_methods_3b.mjs'],{stdio:'inherit',env:{...process.env,GAEO_QA_BASE_URL:'https://gaeo.ru'}});
 const {chromium}=await import(pathToFileURL(resolve('node_modules/playwright/index.mjs')));
 browser=await chromium.launch({headless:true});
 for(const t of targets)for(const width of [1440,390,320]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const r=await page.goto('https://gaeo.ru'+t.route,{waitUntil:'networkidle',timeout:45000});assert.equal(r.status(),200);
  await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('main h1').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'Overflow '+t.route+' @'+width);
  const images=page.locator('main img');let imageCount=await images.count();
  for(let n=0;n<imageCount;n++){const img=images.nth(n);await img.scrollIntoViewIfNeeded();await img.evaluate(el=>Promise.race([el.decode(),new Promise((_,reject)=>setTimeout(()=>reject(Error('Image decode timeout')),10000))]));assert.ok(await img.evaluate(el=>el.complete&&el.naturalWidth>0),'Decoded image '+t.route);}
  if(t.type==='service'){const href=t.entry.routes.method[t.lang];assert.ok(await page.locator('main a[href="'+href+'"]').count()>0,'Incoming public method link');}
  if(t.type==='index')for(const e of phase3BMethods)assert.ok(await page.locator('main a[href="'+e.routes.method[t.lang]+'"]').count()>0,'Directory link');
  if(t.type==='method'){
   assert.equal(await page.locator('main #faq details').count(),5);
   for(let n=0;n<5;n++){const f=page.locator('main #faq details').nth(n);await f.locator('summary').click();assert.ok(await f.evaluate(el=>el.open));await f.locator('summary').click();}
   await page.locator('main [data-gaeo-intent="service"]').first().click();await page.locator('[role="dialog"]').waitFor({state:'visible'});await page.locator('.gaeo-modal-close').click();
   assert.ok(await page.locator('main a[href="'+t.service.routes[t.lang]+'"]').count()>0,'Outgoing public service link');
  }
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(100);
  const h1=await page.locator('main h1').boundingBox(),header=await page.locator('header').first().boundingBox();assert.ok(h1&&(!header||h1.y>=header.y+header.height-2),'Initial H1 unobscured '+t.route);
  const file=t.route.split('/').filter(Boolean).join('-')+'-'+width+'.jpg';await page.screenshot({path:resolve(out,file),type:'jpeg',quality:65,fullPage:true,animations:'disabled'});
  assert.deepEqual(errors,[],'JavaScript errors '+t.route);
  report.browser.push({route:t.route,width,status:200,images_decoded:imageCount,no_overflow:true,h1_unobscured:true,faq:t.type==='method'?5:null,dialog:t.type==='method'?'opened_closed_no_submission':null,screenshot:file});
  await context.close();save();
 }
 await browser.close();browser=null;
 report.status='pass';report.verified_at=new Date().toISOString();report.verified_moscow=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Moscow',dateStyle:'short',timeStyle:'medium'}).format(new Date());save();
 // Patch the same canonical records from the freshest branch; never replace a stale full document.
 git('fetch','origin','astro-source');const latest=git('rev-parse','FETCH_HEAD');
 assert.equal(git('merge-base',merge,latest),merge,'Current source must retain 3B');
 for(const path of ['src/data/industry-methods-phase-3b.mjs','scripts/generate-tariff-pages.mjs','src/data/pricing.mjs'])assert.equal(git('rev-parse',merge+':'+path),git('rev-parse',latest+':'+path),'Verified implementation moved '+path);
 git('worktree','add','--detach','_handoff',latest);const handoff=resolve('_handoff');
 const p=resolve(handoff,'docs/tariff-industry-roadmap.json'),data=JSON.parse(fs.readFileSync(p,'utf8'));
 const date=report.verified_moscow.slice(0,10),proof='docs/qa/sector-3b-live-'+date+'.json',url=id=>'https://github.com/'+repo+'/actions/runs/'+id;
 fs.mkdirSync(resolve(handoff,'docs/qa'),{recursive:true});fs.writeFileSync(resolve(handoff,proof),JSON.stringify(report,null,2)+'\n');
 data.updated_date=date;const phase=data.release.phase_3b;assert.ok(phase&&phase.batch==='3B');
 Object.assign(phase,{status:'completed_public_https_browser_verified',pull_request:'https://github.com/'+repo+'/pull/128',source_commit:merge,pr_ci_run:url(prCI),ci_status:'pass',production_run:url(production),production_status:'pass',published_commit:report.published_commit,pages_run:url(report.pages_run),pages_status:'pass',released_at:report.released_at,manifest_files:report.manifest_files,built_html_pages:report.html_pages,sitemap_urls:report.sitemap_urls,public_https_browser_verified:true,verified_at:report.verified_at,verified_moscow:report.verified_moscow,public_verification_report:proof,public_verification_run:url(process.env.GITHUB_RUN_ID),verified_https_urls:18,verified_browser_viewports:54,verification_widths:[1440,390,320],lead_form_submitted:false,next_required_step:'3B complete; do not recreate methods or services. Select the next phase batch separately from the current roadmap.'});
 for(const value of Object.values(data))if(Array.isArray(value))for(const row of value)if(row&&row.batch==='3B')Object.assign(row,{work_status:phase.status,condition:'4 оригинальные RU/EN-методики опубликованы; 8 новых URL и связи с существующими услугами проверены по публичному HTTPS и Chromium.',pull_request:phase.pull_request,verification_report:proof});
 if(String(data.release.next_batch).startsWith('3B')){data.release.next_phase=3;data.release.next_batch='3B completed: 4 bilingual methods, 8 new URLs, public HTTPS and desktop/mobile browser PASS. Next research batch requires separate scope selection; do not repeat 3B.';}
 fs.writeFileSync(p,JSON.stringify(data,null,2)+'\n');
 const md=resolve(handoff,'docs/TARIFFS_EXPANSION_HANDOFF.md');let text=fs.readFileSync(md,'utf8');
 const old=/## Текущая работа: 3B,[\s\S]*?(?=\*\*Рабочий файл продолжения\.)/;assert.ok(old.test(text),'Existing 3B handoff section');
 const routes=phase3BMethods.map(e=>'| '+e.ids[0]+' | `'+e.routes.method.ru+'` | `'+e.routes.method.en+'` |').join('\n');
 const note=`## Партия 3B завершена: публикация и внешний браузер подтверждены (${date})\n\n**Проверено ${report.verified_moscow} МСК.** 4 оригинальные двуязычные методики для №42 (промышленное оборудование), №48 (упаковка, тара и этикетки), №55 (международная логистика), №59 (частные клиники): **8 новых URL**. Существующие коммерческие страницы сохранены, новые дубли не созданы.\n\n| № | RU | EN |\n|---:|---|---|\n${routes}\n\n**Цепочка выпуска:** [PR #128](https://github.com/${repo}/pull/128) объединен в source \`${merge}\`; [полный PR CI](${url(prCI)}) PASS; [production](${url(production)}) PASS; опубликованный main \`${report.published_commit}\`; [GitHub Pages](${url(report.pages_run)}) PASS. Manifest: \`sourceCommit=${merge}\`, \`releasedAt=${report.released_at}\`, ${report.manifest_files} файлов, ${report.html_pages} HTML, ${report.sitemap_urls} URL sitemap. Сохранены параллельные исправления подвала рейтингов и компактных связанных отраслей.\n\n**Прямая приемка публичного сайта:** [внешний Chromium и HTTPS](${url(process.env.GITHUB_RUN_ID)}) проверили именно \`https://gaeo.ru\`, без подмены preview: 8 методик, 8 связанных коммерческих страниц и 2 индекса стратегий; **18 HTML совпали с main**, ${report.local_assets_verified} локальных ресурсов проверены по содержимому, все 8 новых URL есть в sitemap. Браузер: **18 × 1440/390/320 = 54 проверки**, фактическое декодирование изображений, видимость H1, отсутствие горизонтального переполнения и ошибок JavaScript, взаимные ссылки. На каждой методике раскрыты все 5 FAQ; форма открыта и закрыта без отправки заявки. Дополнительно выполнен штатный тест 3B против публичного origin. Отчет: [${proof}](../${proof}); снимки всех проверенных страниц сохранены в артефакте того же запуска.\n\n**Неизменные условия:** 107 постоянных ID, 100 оригинальных специализаций, цены и договорная формула BMR +5/+10/+15 п.п. сохранены. Новых замеров и клиентских результатов нет. Публикация и доступность подтверждены; индексация поисковиками отдельно не проверялась.\n\n**Точка продолжения:** 3B завершена. Не создавать повторный PR, ветку, методики или коммерческие страницы для №42/48/55/59. Следующий исследовательский пакет определяется отдельно по плану; 3C этим выпуском не запускалась. Исторические статусы ниже не отменяют подтвержденный итог 3B.\n\n`;
 text=text.replace(old,note);fs.writeFileSync(md,text);
 execFileSync('git',['config','user.name','github-actions[bot]'],{cwd:handoff});execFileSync('git',['config','user.email','41898282+github-actions[bot]@users.noreply.github.com'],{cwd:handoff});
 execFileSync('git',['add','docs/TARIFFS_EXPANSION_HANDOFF.md','docs/tariff-industry-roadmap.json',proof],{cwd:handoff});
 execFileSync('git',['commit','-m','docs(3B): record production, Pages and public browser acceptance [skip ci]'],{cwd:handoff,stdio:'inherit'});
 // A normal fast-forward push rejects concurrent source movement; never force it.
 execFileSync('git',['push','origin','HEAD:astro-source'],{cwd:handoff,stdio:'inherit'});
 report.handoff_commit=execFileSync('git',['rev-parse','HEAD'],{cwd:handoff,encoding:'utf8'}).trim();save();
 console.log('3B_ACCEPTANCE_PASS',JSON.stringify({source:merge,main:report.published_commit,pages:report.pages_run,handoff:report.handoff_commit,https:report.https.length,browser:report.browser.length}));
}catch(e){report.status='failed';report.error=String(e.stack||e);save();throw e;}finally{await browser?.close();}
