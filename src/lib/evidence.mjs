import {readFileSync} from 'node:fs';

export const publications = JSON.parse(readFileSync(new URL('../data/publications.json', import.meta.url), 'utf8'));
export const reviewData = JSON.parse(readFileSync(new URL('../data/reviews.json', import.meta.url), 'utf8'));
export const UPDATED = '2026-11-08';
export const SITE = 'https://gaeo.ru';
export const BUSINESS = `${SITE}/#business`;
export const PERSON = `${SITE}/#person`;

export const categories = [
  {id:'ratings', ru:'Рейтинги и внешние упоминания', en:'Rankings and external mentions',
    intro:{ru:'Рейтинги, обзоры рынка и профессиональные каталоги, в которых представлены GAEO.ru и Алексей Яковлев. Места и баллы относятся к методикам авторов и дате исследования.', en:'Rankings, market reviews and professional directories featuring GAEO.ru and Alexey Yakovlev. Positions and scores reflect each publisher’s methodology and research date.'}},
  {id:'interviews', ru:'Интервью и экспертные комментарии', en:'Interviews and expert commentary',
    intro:{ru:'Интервью, ответы на вопросы редакций и экспертные комментарии Алексея Яковлева о GEO, AEO, поиске, маркетинге и продажах.', en:'Interviews, editorial questions and expert commentary by Alexey Yakovlev on GEO, AEO, search, marketing and sales.'}},
  {id:'cases', ru:'Публичные кейсы', en:'Public case studies',
    intro:{ru:'Опубликованные кейсы GAEO.ru и клиентских проектов: исходная задача, выполненная работа, результаты и ограничения замеров. Ссылки ведут к полным разборам и внешним публикациям.', en:'Published GAEO.ru and client case studies covering the starting point, work performed, results and measurement limitations. Follow the links to full reports and external publications.'}},
  {id:'articles', ru:'Авторские публикации и исследования', en:'Authored articles and research',
    intro:{ru:'Статьи Алексея Яковлева и исследования с его участием о продвижении в нейросетях, источниках ответов, e-commerce и оценке результатов. У исследований раскрыты данные и связь с GAEO.', en:'Articles by Alexey Yakovlev and research involving him on AI visibility, answer sources, e-commerce and measurement. Research entries disclose their data and relationship with GAEO.'}}
];

export const publicationRoute = (lang, category='') => `${lang==='en'?'/en':''}/publications/${category?category+'/':''}`;
export const reviewsRoute = lang => `${lang==='en'?'/en':''}/reviews/`;
export const sortedPublications = (category) => publications.items.filter(x=>!category || x.category===category)
  .sort((a,b)=>(b.sortDate||'').localeCompare(a.sortDate||'') || (a.legacyPosition||1000)-(b.legacyPosition||1000));
export const sortedReviews = () => [...reviewData.items].sort((a,b)=>(b.date||'').localeCompare(a.date||''));

export function reviewSummary(){
  const rated=reviewData.items.filter(r=>Number.isFinite(r.rating));
  if(!rated.length)throw new Error('Verified individual ratings are required for the aggregate.');
  const average=rated.reduce((sum,r)=>sum+r.rating,0)/rated.length;
  return {count:reviewData.items.length, ratedCount:rated.length, average, value:Number(average.toFixed(1))};
}

export function aggregateRating(){
  const summary=reviewSummary();
  return {'@type':'AggregateRating',ratingValue:summary.value,bestRating:5,worstRating:1,reviewCount:summary.count,ratingCount:summary.ratedCount};
}

export function publicationNode(entry, lang='ru'){
  const local=entry[lang];
  const node=structuredClone(local.schema||{});
  node['@type'] ||= 'Article';
  node.url ||= local.links[0].url.startsWith('/')?SITE+local.links[0].url:local.links[0].url;
  node['@id'] ||= node.url+'#publication';
  node.name ||= local.title;
  if(entry.datePublished)node.datePublished=entry.datePublished;
  if(entry.dateModified)node.dateModified=entry.dateModified;
  if(!node.description && local.paragraphs?.length) node.description=local.paragraphs.map(x=>x.replace(/<[^>]*>/g,'')).join(' ');
  if(['ratings','interviews','cases'].includes(entry.category))node.about ||= [{'@id':BUSINESS},{'@id':PERSON}];
  return node;
}

export function entityNodes(lang, entries=publications.items){
  const entities=structuredClone(publications.entities[lang]);
  const mentions=entries.filter(x=>['ratings','interviews','cases'].includes(x.category)).map(x=>publicationNode(x,lang));
  for(const node of entities){
    if([BUSINESS,PERSON].includes(node['@id'])){
      // Existing dataset references also document Alexey's participation in IndexResearch.
      const prior=(node.subjectOf||[]).filter(x=>x['@type']==='Dataset');
      node.subjectOf=[...mentions,...prior];
      delete node.aggregateRating;
      delete node.review;
    }
  }
  return entities;
}

export function reviewNode(entry, lang='ru'){
  const local=entry[lang]||entry.ru;
  return {'@type':'Review','@id':SITE+reviewsRoute(lang)+'#'+entry.id,url:SITE+reviewsRoute(lang)+'#'+entry.id,
    author:{'@type':'Person',name:local.author},itemReviewed:{'@id':BUSINESS},reviewBody:local.text,inLanguage:lang==='en'?'en':'ru-RU',
    ...(entry.date?{datePublished:entry.date}:{}),
    ...(Number.isFinite(entry.rating)?{reviewRating:{'@type':'Rating',ratingValue:entry.rating,bestRating:5,worstRating:1}}:{}),
    isBasedOn:entry.url};
}
