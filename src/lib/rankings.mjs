import {readdirSync,readFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';

export const SITE='https://gaeo.ru';
export const categories=JSON.parse(readFileSync(new URL('../data/rankings/categories.json',import.meta.url),'utf8'));
export const articleDirectory=resolve('src/data/rankings/articles');

const syncAffiliates=JSON.parse(readFileSync(new URL('../data/rankings/synchronize-admitad-links.json',import.meta.url),'utf8'));
export const synchronizeAffiliateUrls=new Set(syncAffiliates.links.map(link=>link.url));
const synchronizeByPath=new Map(syncAffiliates.links.map(link=>{
  const destination=new URL(link.destination);
  return [(destination.pathname.replace(/\/+$/,'')||'/').toLowerCase(),link];
}));
export function isDirectSynchronizationUrl(value){
  if(!value)return false;
  try{
    const hostname=new URL(value).hostname.toLowerCase();
    return hostname==='synchronize.ru'||hostname.endsWith('.synchronize.ru');
  }catch{return false;}
}
// Returns the exact XLSX affiliate URL for a known Synchronizatsiya destination.
// Unknown direct destinations have NO advertising link: never synthesize ulp/erid.
export function resolveSynchronizationLink(value){
  if(!isDirectSynchronizationUrl(value))return value;
  const url=new URL(value);
  const path=(url.pathname.replace(/\/+$/,'')||'/').toLowerCase();
  return synchronizeByPath.get(path)?.url||null;
}
function enforceSynchronizationAffiliates(article){
  const clientLinks=[],seen=new Set();
  for(const link of article.clientLinks||[]){
    const url=resolveSynchronizationLink(link.url);
    if(!url)continue;
    const k=targetKey(url);
    if(seen.has(k))continue;
    seen.add(k);
    const affiliate=syncAffiliates.links.find(item=>item.url===url);
    clientLinks.push({
      ...link,url,
      ...(affiliate&&isDirectSynchronizationUrl(link.url)?{
        relation:'sponsored',
        label:{ru:link.label?.ru||affiliate.title.ru,en:'Synchronizatsiya: '+affiliate.title.en}
      }:{})
    });
  }
  const rank=lang=>({...article[lang],ranking:article[lang].ranking.map(entry=>{
    if(!entry.url||!isDirectSynchronizationUrl(entry.url))return entry;
    const url=resolveSynchronizationLink(entry.url);
    if(url)return {...entry,url};
    const {url:ignored,...rest}=entry;
    return rest;
  })});
  return {...article,clientLinks,ru:rank('ru'),en:rank('en')};
}

// A dated, read-only snapshot of exact published editions and author links in GAEO's
// publication registry. Article JSON is still canonical for its editorial text.
// Enrichment is deliberately additive and does not rewrite the article's research.
const publicationRegistry=JSON.parse(readFileSync(new URL('../data/rankings/publication-registry-links.json',import.meta.url),'utf8'));
const key=value=>String(value||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const registeredFamilies=new Map(Object.entries(publicationRegistry.families||{}).map(([id,value])=>[key(id),value]));
export const registrySnapshotDate=publicationRegistry.snapshotDate;

function targetKey(value){
  try{
    const url=new URL(value);
    url.hash='';
    // Only measurement tags may be ignored for detecting the same destination.
    // Affiliate destination, erid and other non-UTM parameters remain significant.
    for(const name of [...url.searchParams.keys()])if(name.toLowerCase().startsWith('utm_'))url.searchParams.delete(name);
    return url.hostname.replace(/^www\./,'').toLowerCase()+url.pathname.replace(/\/+$/,'')+url.search;
  }catch{return String(value);}
}
const versionKey=v=>String(v.platform||'').toLowerCase()+'|'+String(v.ru||v.url||'');
function linkLabelEN(a,source){
  const site=new URL(source.url).hostname.replace(/^www\./,'');
  const type=source.kind||'';
  const kind=/подписк/i.test(type)?'subscription information':/каталог/i.test(type)?'course catalogue':/сертификат/i.test(type)?'gift certificates':/кейс|проект/i.test(type)?'case study':/услуг|тариф/i.test(type)?'service details':/курс/i.test(type)?'course details':/профил/i.test(type)?'company profile':/главная/i.test(type)?'official website':'relevant details';
  return site+': '+kind+(source.anchor?' ('+source.anchor+')':'');
}
function enrichRanking(a){
  const snapshot=registeredFamilies.get(key(a.familyId))||registeredFamilies.get(key(a.id));
  if(!snapshot)return a;
  const versions=[...(a.versions||[])],seen=new Set(versions.map(v=>v.ru||v.url||''));
  for(const v of snapshot.versions||[]){
    if(!/^https:\/\/\S+$/.test(v.url))continue;
    const item={platform:v.platform,ru:v.url,en:v.url,label:{ru:v.platform,en:v.platform+(/Sostav|TenChat/i.test(v.platform)?' (Russian)':'')}};
    const id=item.ru;
    if(!seen.has(id)){versions.push(item);seen.add(id);}
  }
  const clientLinks=[...(a.clientLinks||[])],targets=new Set(clientLinks.map(l=>targetKey(l.url)));
  for(const source of snapshot.sostavLinks||[]){
    if(!source.commercial||!/^https:\/\/\S+$/.test(source.url))continue;
    const k=targetKey(source.url);if(targets.has(k))continue;
    clientLinks.push({
      url:source.url,
      label:{ru:source.anchor||'Ссылка на профильную страницу',en:linkLabelEN(a,source)},
      relation:'sponsored',
      sourceAnchor:{ru:source.anchor||'',en:''},
      sourceRegistryRow:source.registryRow
    });
    targets.add(k);
  }
  return {...a,versions,clientLinks};
}
export const articles=existsSync(articleDirectory)
  ?readdirSync(articleDirectory).filter(x=>x.endsWith('.json')).sort()
    .map(x=>enforceSynchronizationAffiliates(enrichRanking(JSON.parse(readFileSync(resolve(articleDirectory,x),'utf8')))))
  :[];
export const route=(lang,category='',slug='')=>`${lang==='en'?'/en':''}/rankings/${category?category+'/':''}${slug?slug+'/':''}`;
export const articleRoute=(a,lang)=>route(lang,a.category,a.slug);
export const categoryArticles=id=>articles.filter(a=>a.category===id).sort((a,b)=>b.sourceDate.localeCompare(a.sourceDate)||a.id.localeCompare(b.id));
export const categoryFor=id=>categories.find(c=>c.id===id);
export const versionsFor=(a,lang)=>a.versions.map(v=>({platform:v.platform,label:typeof v.label==='object'?v.label[lang]:v.label||v.platform,url:v[lang]||v.url||v.ru})).filter(v=>v.url);
export const formatDate=(date,lang)=>new Intl.DateTimeFormat(lang==='en'?'en-US':'ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z')).replace(/ г\.$/,'');
export const plain=value=>String(value??'').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();

function need(condition,message){if(!condition)throw Error('Rankings: '+message);}
function safeUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
export function validateArticle(a){
  need(a.schemaVersion===1,`${a.id}: unsupported schema`);
  need(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.id),`bad id ${a.id}`);
  need(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a.slug),`${a.id}: bad slug`);
  need(categoryFor(a.category),`${a.id}: unknown category`);
  need(a.familyId,`${a.id}: familyId required`);
  need(!a.excluded,`${a.id}: excluded article`);
  const selection=a.contentType==='selection';
  if(selection)need(a.category==='products'&&a.firstPlace===null&&a.entityType==='Product',`${a.id}: product selection cannot declare a winner`);
  for(const key of ['sourceDate','publishedDate','modifiedDate'])need(/^\d{4}-\d{2}-\d{2}$/.test(a[key])&&!Number.isNaN(Date.parse(a[key])),`${a.id}: invalid ${key}`);
  need(a.modifiedDate>=a.publishedDate,`${a.id}: modified date before publication`);
  need(a.source&&a.source.status==='found',`${a.id}: a Drive or Yandex source is required`);
  need(Array.isArray(a.versions)&&a.versions.length>0,`${a.id}: source versions missing`);
  for(const v of a.versions){
    for(const key of ['ru','en','url'])if(v[key])need(safeUrl(v[key]),`${a.id}: unsafe version URL`);
    if(/indexresearch|github/i.test(v.platform))need(v.en,`${a.id}: verified English ${v.platform} URL missing`);
  }
  for(const img of a.images||[]){
    need(img.src.startsWith(`/assets/rankings/${a.id}/`)&&!img.src.includes('..'),`${a.id}: image outside scope`);
    need(img.width>0&&img.height>0&&img.alt?.ru&&img.alt?.en,`${a.id}: image metadata missing`);
    need(existsSync(resolve('public'+img.src)),`${a.id}: missing image ${img.src}`);
    need(safeUrl(img.sourceUrl),`${a.id}: image provenance required`);
  }
  for(const l of a.clientLinks||[])need(safeUrl(l.url)&&l.label?.ru&&l.label?.en,`${a.id}: invalid client link`);
  for(const lang of ['ru','en']){
    const t=a[lang];need(t?.title&&t.seoTitle&&t.description,`${a.id}/${lang}: metadata missing`);
    for(const key of ['intro','methodology','selection','conclusion'])need(Array.isArray(t[key])&&t[key].length>0,`${a.id}/${lang}: empty ${key}`);
    need(Array.isArray(t.ranking)&&t.ranking.length>=2,`${a.id}/${lang}: ranking missing`);
    t.ranking.forEach((e,i)=>{
      need(e.position===i+1&&e.name&&e.summary&&e.paragraphs?.length,`${a.id}/${lang}: invalid entry ${i+1}`);
      if(e.rank!==undefined)need(Number.isInteger(e.rank)&&e.rank>=1&&e.rank<=e.position,`${a.id}/${lang}: invalid shared rank`);
      if(e.url)need(safeUrl(e.url),`${a.id}/${lang}: unsafe company URL`);
    });
    need(t.faq?.length>=4,`${a.id}/${lang}: minimum 4 FAQs`);
    need(new Set(t.faq.map(x=>x.question)).size===t.faq.length,`${a.id}/${lang}: repeated FAQ`);
    need(t.faq.every(x=>x.question&&x.answer),`${a.id}/${lang}: incomplete FAQ`);
    need(!/\[\[(?:AGENT|ВСТАВИТЬ)|\[ИЗОБРАЖЕНИЕ|TODO|TBD/i.test(JSON.stringify(t)),`${a.id}/${lang}: unfinished text`);
    need(!/[<>]/.test(JSON.stringify(t)),`${a.id}/${lang}: HTML is not allowed in article data`);
  }
  if(selection)need([...a.ru.ranking,...a.en.ranking].every(e=>e.score===undefined||e.score===null||e.score===''),`${a.id}: selection scores are unsupported`);
  else need(a.ru.ranking[0].name===a.firstPlace,`${a.id}: winner changed`);
  need(a.ru.ranking.length===a.en.ranking.length,`${a.id}: RU/EN count mismatch`);
  a.ru.ranking.forEach((r,i)=>need(r.position===a.en.ranking[i].position&&(r.rank??r.position)===(a.en.ranking[i].rank??a.en.ranking[i].position)&&(r.url||'')===(a.en.ranking[i].url||'')&&String(r.score||'')===String(a.en.ranking[i].score||''),`${a.id}: ranking order/URL/score mismatch ${i+1}`));
}
export function validateAll(){
  for(const a of articles)validateArticle(a);
  for(const field of ['id','familyId','slug'])need(new Set(articles.map(a=>a[field])).size===articles.length,`duplicate ${field}`);
}

export function articleSchema(a,lang){
  const t=a[lang],url=SITE+articleRoute(a,lang),other=SITE+articleRoute(a,lang==='en'?'ru':'en');
  const versions=versionsFor(a,lang).map(v=>v.url);
  const graph=[
    {'@type':'WebSite','@id':SITE+'/#website',url:SITE+'/',name:'GAEO.ru'},
    {'@type':'Person','@id':SITE+'/#person',name:lang==='en'?'Alexey Yakovlev':'Алексей Яковлев',url:SITE+(lang==='en'?'/en':'')+'/professional-biography/'},
    {'@type':'ProfessionalService','@id':SITE+'/#business',name:'GAEO.ru',url:SITE+'/',founder:{'@id':SITE+'/#person'}},
    {'@type':'WebPage','@id':url+'#webpage',url,name:t.title,description:t.description,inLanguage:lang==='en'?'en':'ru-RU',isPartOf:{'@id':SITE+'/#website'},mainEntity:{'@id':url+'#article'},breadcrumb:{'@id':url+'#breadcrumb'}},
    {'@type':'Article','@id':url+'#article',url,headline:t.title,description:t.description,inLanguage:lang==='en'?'en':'ru-RU',datePublished:a.publishedDate,dateModified:a.modifiedDate,author:{'@id':SITE+'/#person'},publisher:{'@id':SITE+'/#business'},mainEntityOfPage:{'@id':url+'#webpage'},articleSection:categoryFor(a.category)[lang],isAccessibleForFree:true,isBasedOn:versions,citation:versions,mainEntity:{'@id':url+'#ranking'},...(a.images?.length?{image:a.images.map(x=>SITE+x.src)}:{}),...(lang==='en'?{translationOfWork:{'@id':other+'#article'}}:{workTranslation:{'@id':other+'#article'}})},
    {'@type':'ItemList','@id':url+'#ranking',name:t.title,itemListOrder:a.contentType==='selection'?'https://schema.org/ItemListUnordered':'https://schema.org/ItemListOrderAscending',numberOfItems:t.ranking.length,itemListElement:t.ranking.map(e=>({'@type':'ListItem',position:e.rank??e.position,name:e.name,url:url+'#place-'+e.position,item:{'@type':a.entityType||'Organization',name:e.name,...(e.url&&!synchronizeAffiliateUrls.has(e.url)?{url:e.url}:{})}}))},
    {'@type':'FAQPage','@id':url+'#faq',isPartOf:{'@id':url+'#webpage'},mainEntity:t.faq.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}
  ];
  return graph;
}
