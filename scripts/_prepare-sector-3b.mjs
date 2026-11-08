import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';
import {industrySpecializations} from '../src/data/industry-specializations.mjs';
const branch='feat/sector-methods-3b-2026-11-08';
assert.equal(process.env.GITHUB_REF_NAME,branch,'Preparation restricted to isolated branch');
const files=new Map();
const read=p=>files.get(p)??readFileSync(p,'utf8');
const put=(p,t)=>files.set(p,t);
const once=(p,old,value)=>{const t=read(p);assert.equal(t.split(old).length-1,1,'Unique patch anchor '+p+' '+old.slice(0,90));put(p,t.replace(old,value));};
const importData="import {phase3BMethods} from '../src/data/industry-methods-phase-3b.mjs';\n";
const generator='scripts/generate-tariff-pages.mjs';
assert.ok(!read(generator).includes('phase3BMethods'),'3B already integrated: do not repeat');
put(generator,importData+read(generator));
once(generator,'// Managed existing pages retain their URL, expert content and original schema graph.',`// Phase 3B adds independent methods to existing commercial pages, without new hub duplicates.
for(const entry of phase3BMethods){
 const service=industrySpecializations.find(x=>x.id===entry.ids[0]);
 if(!service)throw new Error('Missing phase 3B commercial page '+entry.ids[0]);
 const cluster={...entry,methodOnly:true,routes:{...entry.routes,hub:service.routes}};
 for(const lang of ['ru','en']){
  const route=entry.routes.method[lang],equivalent=entry.routes.method[lang==='ru'?'en':'ru'],c=entry[lang].method;
  save(resolve(root,route.slice(1),'index.html'),shell({lang,route,equivalent,title:c.title,description:c.description,h1:c.h1,body:render3APage(cluster,'method',lang),schemaMarker:false,directory:'strategies',mainEntitySuffix:'method',modifiedDate:'2026-11-08'}));
 }
}

// Managed existing pages retain their URL, expert content and original schema graph.`);
once(generator,"(en?'Related industry hub':'Отраслевой хаб и специализации')","(cluster.methodOnly?(en?'Related GEO service':'Связанная услуга GEO'):(en?'Related industry hub':'Отраслевой хаб и специализации'))");
once(generator,"(en?'See the industry hub':'Все специализации')","(cluster.methodOnly?(en?'See the service':'Услуга GAEO'):(en?'See the industry hub':'Все специализации'))");
once(generator,'No completed automotive or financial-services client performance is asserted by these pages.','No completed client performance in this sector is asserted by this page.');
const special='src/data/industry-specializations.mjs';
put(special,"import {phase3BMethods} from './industry-methods-phase-3b.mjs';\n"+read(special));
once(special,'export const getIndustrySpecialization =',`// Phase 3B: retain every existing method and add exactly one sector-specific method.
for(const entry of phase3BMethods){
 const service=industrySpecializations.find(x=>x.id===entry.ids[0]);
 if(!service)throw new Error('Missing 3B service '+entry.ids[0]);
 service.methodLabels ||= {ru:[],en:[]};
 for(const lang of ['ru','en']){
  service.methods[lang] ||= [];
  service.methodLabels[lang] ||= [];
  while(service.methodLabels[lang].length<service.methods[lang].length)service.methodLabels[lang].push(lang==='ru'?'Тематическая методика GEO':'Related GEO methodology');
  const href=entry.routes.method[lang];
  if(!service.methods[lang].includes(href)){
   service.methods[lang].push(href);
   service.methodLabels[lang].push(entry[lang].method.h1);
  }
 }
}

export const getIndustrySpecialization =`);
const design='scripts/qa_approved_design_system.mjs';
put(design,importData+read(design));
once(design,'for(const slug of caseSlugs){',`for(const entry of phase3BMethods)for(const route of Object.values(entry.routes.method))approved[route.slice(1)+'index.html']=['FAQ','CONTACT'];
for(const slug of caseSlugs){`);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
for(const lang of ['ru','en']){
 const p='src/legacy/pages/'+(lang==='en'?'en/':'')+'strategies/index.html';
 const cards=phase3BMethods.map(entry=>{const d=entry[lang].method,u=entry.routes.method[lang];return '<article class="list-card"><div class="eyebrow">'+(lang==='ru'?'Отраслевая методика / 2026':'Industry methodology / 2026')+'</div><h2><a href="'+u+'">'+esc(d.h1)+'</a></h2><p>'+esc(d.description)+'</p><a class="button outline" href="'+u+'">'+(lang==='ru'?'Изучить методику':'Explore methodology')+'</a></article>';}).join('');
 once(p,'<div class="listing-grid">','<div class="listing-grid">'+cards);
 let html=read(p),updated=0;
 const items=[...html.matchAll(/<article class="list-card">[\s\S]*?<h[23]><a href="([^"]+)">([^<]+)<\/a><\/h[23]>[\s\S]*?<\/article>/g)].map((m,i)=>({'@type':'ListItem',position:i+1,name:m[2].replace(/&amp;/g,'&'),url:'https://gaeo.ru'+m[1]}));
 assert.ok(items.length>=13,'Preserve existing listing cards');
 assert.equal(new Set(items.map(x=>x.url)).size,items.length,'Unique visible methods');
 html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(all,text)=>{const data=JSON.parse(text),nodes=data['@graph']||[data];for(const node of nodes){if(node['@type']==='ItemList'){node.itemListElement=items;node.numberOfItems=items.length;updated++;}if(node['@type']==='CollectionPage')node.dateModified='2026-11-08';}return '<script type="application/ld+json">'+JSON.stringify(data).replace(/</g,'\\u003c')+'</script>';});
 assert.equal(updated,1,'One directory ItemList');put(p,html);
}
// Compare ItemList with visible content instead of keeping the obsolete 9-item strategy count.
const qa3a='scripts/qa_sector_clusters_3a.mjs';
once(qa3a,"const expected=kind==='hub'?20:9;","const expected=(index.match(/<article class=\"list-card\">/g)||[]).length;\n assert.ok(expected>=(kind==='hub'?20:9),'No previous directory entries removed');");
const pkg=JSON.parse(read('package.json'));assert.ok(!pkg.scripts['check:sector3b']);pkg.scripts['check:sector3b']='node scripts/qa_sector_methods_3b.mjs';put('package.json',JSON.stringify(pkg,null,2)+'\n');
const pr='.github/workflows/legal-geo-pr-qa.yml';
once(pr,"      - 'src/data/industry-clusters-phase-3a.mjs'","      - 'src/data/industry-clusters-phase-3a.mjs'\n      - 'src/data/industry-methods-phase-3b.mjs'\n      - 'scripts/qa_sector_methods_3b.mjs'");
once(pr,'      - run: npm run check:sector3a','      - run: npm run check:sector3a\n      - run: npm run check:sector3b');
once(pr,'            visual-research/','            visual-research/\n            visual-industry/');
const prod='.github/workflows/astro-production.yml';
once(prod,'run: npm run check:sector3a','run: npm run check:sector3a\n      - name: Check phase 3B evidence methodologies and reciprocal service links\n        run: npm run check:sector3b');
const roadmapPath='docs/tariff-industry-roadmap.json';
const roadmap=JSON.parse(read(roadmapPath));roadmap.updated_date='2026-11-08';
roadmap.release.phase_3b={phase:3,batch:'3B',status:'prepared_in_isolated_branch_ci_pending',work_branch:branch,records:[42,48,55,59],scope:'Four original bilingual evidence methodologies; reuse existing commercial landings, do not duplicate hubs or services',new_method_pairs:4,new_ru_en_urls:8,method_urls:phase3BMethods.map(x=>({id:x.ids[0],...x.routes.method})),source_file:'src/data/industry-methods-phase-3b.mjs',public_https_browser_verified:false,next_required_step:'Full PR CI, source merge, production/main/Pages; independent public HTTPS and browser inspection remain separate',evidence_sources:phase3BMethods.map(x=>({id:x.ids[0],urls:x.sources.map(s=>s.url)}))};
roadmap.release.next_phase=3;roadmap.release.next_batch='3B prepared: complete CI and publication of four bilingual evidence methods for #42/#48/#55/#59. Do not recreate commercial pages. External live acceptance remains separate.';
put(roadmapPath,JSON.stringify(roadmap,null,2)+'\n');
const handoff='docs/TARIFFS_EXPANSION_HANDOFF.md';
const note=`## Текущая работа: 3B, методики для 4 готовых отраслей (8 ноября 2026)

Продолжение разрешено Алексеем после проверки 3A. 3B использует существующие коммерческие специализации №42 (оборудование), №48 (упаковка), №55 (международная логистика), №59 (частные клиники). Созданы 4 самостоятельные RU/EN-методики, всего 8 URL; новые коммерческие дубли и новые отраслевые хабы не создаются. Модуль: \`src/data/industry-methods-phase-3b.mjs\`. Общая верстка, FAQ и форма переиспользованы из действующего шаблона 3A.

**Статус:** подготовлено в изолированной ветке \`${branch}\`. Полные PR CI, source merge, production, main, Pages и внешний HTTPS пока НЕ подтверждены. Цены, 107 ID, комплектность и BMR +5/+10/+15 п.п. не изменены. Новых замеров и клиентских результатов нет. Доказательства: Росстандарт (ТР ТС 010/2011 и 005/2011), ЕЭК (упаковка и Таможенный кодекс), Росздравнадзор (реестр лицензий). У каждого направления своя матрица вопросов, проверка применимости фактов и 5 FAQ.

**Приемка:** 8 страниц, взаимные RU/EN ссылки, H1/canonical/CreativeWork/FAQPage, первичные источники, 8 обратных связей от действующих услуг и ссылки из обоих разделов стратегий. Исправляется также рассогласование ItemList раздела стратегий с реально видимыми карточками: в реестр включается весь видимый список, а не устаревшие 9 пунктов. Проверка 3A теперь сопоставляет разметку со всем видимым списком и сохраняет нижнюю границу ранее опубликованного состава.

**Точка продолжения:** проверить ту же ветку и единственный PR 3B, устранить выявленные ошибки, пройти полный CI, безопасно объединить с актуальным astro-source. Затем отдельно проверить production/main/Pages и внешний сайт. Не создавать вторую 3B, не переписывать существующие услуги. Обновлять эти же 2 файла; live-поля не повышать без фактической проверки.

`;
assert.ok(!read(handoff).includes('## Текущая работа: 3B,'));
const t=read(handoff),breakAt=t.indexOf('\n')+1;put(handoff,t.slice(0,breakAt)+'\n'+note+t.slice(breakAt));
for(const [path,text] of files)writeFileSync(path,text);
console.log('Prepared narrow 3B integration:',[...files.keys()].join('\n'));
