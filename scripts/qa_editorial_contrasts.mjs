// GAEO editorial policy (Правила написания любых текстов, п. 18).
// The "а не" construction is permitted only for a factual, genuinely meaningful contrast.
// Any new occurrence requires conscious editorial review and an explained exception here.
import {readFileSync,readdirSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
const root=process.cwd();
const pages=resolve(root,'src/legacy/pages');
const collected=[];
function collect(folder){
 for(const item of readdirSync(folder,{withFileTypes:true})){
  const path=resolve(folder,item.name);
  if(item.isDirectory())collect(path);
  else if(item.isFile()&&path.endsWith('.html'))collected.push(path);
 }
}
collect(pages);
const files=[...collected,
 resolve(root,'src/data/industry-commercial-pages.mjs'),
 resolve(root,'src/components/IndustryCommercialLanding.astro')
];
for(const f of readdirSync(resolve(root,'templates/partials'))){
 if(f.endsWith('.html'))files.push(resolve(root,'templates/partials',f));
}
const exceptions=[
 {
  path:'src/legacy/pages/cases/ada-tours-rost-neyrovidimosti-za-2-nedeli/index.html',
  phrase:'Почему канонический результат 35%, а не 43,5%',
  reason:'Разграничение ручного и машинного подсчета BMR'
 },
 {
  path:'src/legacy/pages/cases/prep-center-6-klientov-iz-neyrosetey/index.html',
  phrase:'Это оценка, а не фактическая выручка',
  reason:'Отделение сценарного расчета от выручки по счетам'
 },
 {
  path:'src/legacy/pages/cases/prep-center-6-klientov-iz-neyrosetey/index.html',
  phrase:'это оценка, а не заявленная выручка',
  reason:'Повторная оговорка при заключительном выводе о финансах'
 },
 {
  path:'src/legacy/pages/articles/prodvizhenie-lichnogo-brenda-eksperta-v-neyrosetyah/index.html',
  phrase:'Кто в России занимается GEO-продвижением лично, а не как агентство?',
  reason:'Пример коммерческого запроса с реальным выбором модели подрядчика'
 }
];
const contrast=/(?<![\\p{L}])а(?:\\s|&nbsp;)+не(?![\\p{L}])/giu;
const issues=[];
let found=0,approved=0;
for(const absolute of files){
 const path=relative(root,absolute).split(sep).join('/');
 const html=readFileSync(absolute,'utf8');
 for(const m of html.matchAll(contrast)){
  found++;
  const accepted=exceptions.some(e=>{
   if(e.path!==path)return false;
   const at=html.indexOf(e.phrase);
   const inPhrase=e.phrase.search(/а\\s+не/i);
   return at>=0&&inPhrase>=0&&m.index===at+inPhrase;
  });
  if(accepted)approved++;
  else issues.push(path+': '+JSON.stringify(html.slice(Math.max(0,m.index-85),m.index+125).replace(/\\s+/g,' ')));
 }
 if(html.includes('Цифры аудита опубликованы текстом.'))issues.push(path+': leftover internal image caption');
 if(html.includes('вместо набора красивых скриншотов'))issues.push(path+': banned empty marketing phrase');
}
console.log('EDITORIAL_FILES='+files.length);
console.log('A_NE_MATCHES='+found);
console.log('A_NE_APPROVED='+approved);
console.log('EDITORIAL_ISSUES='+issues.length);
if(issues.length){
 for(const issue of issues.slice(0,25))console.error('ERROR '+issue);
 process.exit(1);
}
console.log('EDITORIAL_QA=PASS');
