import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {publications,reviewData,UPDATED,SITE,BUSINESS,PERSON,categories,publicationRoute,reviewsRoute,sortedPublications,sortedReviews,reviewSummary,aggregateRating,publicationNode,entityNodes,reviewNode} from '../src/lib/evidence.mjs';

const ROOT=resolve('src/legacy/pages');
const esc=value=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const json=value=>JSON.stringify(value).replace(/</g,'\\u003c');
const nojs=readFileSync(resolve('templates/partials/nojs-fallback.html'),'utf8').trim();
const save=(path,body)=>{mkdirSync(dirname(path),{recursive:true});let prior;try{prior=readFileSync(path,'utf8')}catch{}if(prior!==body)writeFileSync(path,body);};
const absolute=path=>path.startsWith('/')?SITE+path:path;
const base=lang=>lang==='en'?'/en/':'/';
const countLabel=(count,lang)=>lang==='en'?`${count} ${count===1?'item':'items'}`:`${count} ${count%10===1&&count%100!==11?'материал':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'материала':'материалов'}`;
const reviewCountLabel=(count,lang)=>lang==='en'?`${count} ${count===1?'review':'reviews'}`:`${count} ${count%10===1&&count%100!==11?'отзыв':count%10>=2&&count%10<=4&&(count%100<12||count%100>14)?'отзыва':'отзывов'}`;
const displayDate=(date,lang)=>new Intl.DateTimeFormat(lang==='en'?'en-GB':'ru-RU',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(date+'T12:00:00Z'));
const externalAttrs=url=>url.startsWith('https://')&&!url.startsWith(SITE)?' target="_blank" rel="noopener"':'';

function crumbs(lang,path,label,parent=false){
  return [{name:lang==='en'?'Home':'Главная',item:SITE+base(lang)},...(parent?[{name:lang==='en'?'Publications':'Публикации',item:SITE+publicationRoute(lang)}]:[]),{name:label,item:SITE+path}];
}
function shell({lang,path,equivalent,title,description,body,graph,breadcrumbs}){
  const en=lang==='en',url=SITE+path,ru=en?equivalent:path,english=en?path:equivalent;
  const visibleCrumbs=breadcrumbs.map((x,i)=>i<breadcrumbs.length-1?`<a href="${esc(x.item)}">${esc(x.name)}</a><span class="breadcrumbs__sep" aria-hidden="true">›</span>`:`<span class="breadcrumbs__current" aria-current="page">${esc(x.name)}</span>`).join('');
  graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:breadcrumbs.map((x,i)=>({'@type':'ListItem',position:i+1,...x}))});
  return `<!doctype html>
<!-- Generated from src/data/publications.json and reviews.json; edit the data and generator. -->
<html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow,max-image-preview:large">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="ru" href="${SITE+ru}"><link rel="alternate" hreflang="en" href="${SITE+english}"><link rel="alternate" hreflang="x-default" href="${SITE+ru}">
<!-- SOCIAL_AND_ICONS_START -->
<meta property="og:type" content="website"><meta property="og:site_name" content="GAEO.ru"><meta property="og:locale" content="${en?'en_US':'ru_RU'}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/assets/gaeo-social-preview.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:alt" content="GAEO.ru — ${esc(title)}"><meta name="theme-color" content="#021641">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${SITE}/assets/gaeo-social-preview.jpg"><meta name="twitter:image:alt" content="GAEO.ru — ${esc(title)}">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png">
<!-- SOCIAL_AND_ICONS_END -->
<!-- FONT_LOADING_START -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600&family=Manrope:wght@400;500;600;700&display=swap&subset=cyrillic" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600&family=Manrope:wght@400;500;600;700&display=swap&subset=cyrillic"></noscript>
<!-- FONT_LOADING_END -->
<link rel="stylesheet" href="/assets/style.css?v=0"><link rel="stylesheet" href="/assets/internal.css?v=0"><link rel="stylesheet" href="/assets/site-development.css?v=0"><link rel="stylesheet" href="/assets/evidence.css?v=0">
<style data-fix="page-shell-gap">.page-shell{padding-top:0!important}</style>
<script src="/assets/analytics.js?v=0" defer></script>
<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>
<!-- NOJS_FALLBACK_START -->
${nojs}
<!-- NOJS_FALLBACK_END -->
</head><body>
<!-- SITE_HEADER_START --><header data-astro-shared-header="true"></header><!-- SITE_HEADER_END -->
<!-- VISIBLE_BREADCRUMBS_START -->
<nav class="breadcrumbs" aria-label="${en?'Breadcrumbs':'Хлебные крошки'}"><div class="container breadcrumbs__inner">${visibleCrumbs}</div></nav>
<!-- VISIBLE_BREADCRUMBS_END -->
${body}
<!-- SITE_FOOTER_START --><footer data-astro-shared-footer="true"></footer><!-- SITE_FOOTER_END -->
<script src="/assets/form-config.js?v=0"></script><script src="/assets/site.js?v=0"></script>
</body></html>
`;
}

function categoryNav(lang,active=''){
  return `<nav class="publication-category-nav" aria-label="${lang==='en'?'Publication sections':'Разделы публикаций'}"><a href="${publicationRoute(lang)}"${!active?' aria-current="page"':''}>${lang==='en'?'All sections':'Все разделы'}</a>${categories.map(c=>`<a href="${publicationRoute(lang,c.id)}"${active===c.id?' aria-current="page"':''}>${esc(c[lang])}</a>`).join('')}</nav>`;
}
function publicationCard(entry,lang,heading='h2'){
  const local=entry[lang];
  return `<article class="publication-item" id="${esc(entry.id)}" data-publication-id="${esc(entry.id)}">
<div class="publication-meta">${esc(local.meta)}</div><${heading}>${esc(local.title)}</${heading}>
${local.paragraphs.map(p=>`<p>${p}</p>`).join('')}${local.result?`<p class="result">${esc(local.result)}</p>`:''}
<div class="publication-actions">${local.links.map(a=>`<a class="button outline" href="${esc(a.url)}"${externalAttrs(a.url)}>${esc(a.label)}</a>`).join('')}</div></article>`;
}
function related(lang){
  const prefix=lang==='en'?'/en':'';
  return `<section class="evidence-related"><h2>${lang==='en'?'More about the work':'Еще о моей работе'}</h2><div class="link-buttons"><a class="button outline" href="${prefix}/cases/">${lang==='en'?'Project results':'Результаты проектов'}</a><a class="button outline" href="${prefix}/reviews/">${lang==='en'?'Client reviews':'Отзывы клиентов'}</a><a class="button outline" href="${prefix}/professional-biography/">${lang==='en'?'Professional biography':'Профессиональная биография'}</a><a class="button outline" href="${prefix}/articles/">${lang==='en'?'GEO/AEO guides':'Статьи о GEO/AEO'}</a><a class="button outline" href="${prefix}/services/">${lang==='en'?'Services':'Услуги'}</a></div></section>`;
}

function buildPublications(lang){
  const en=lang==='en',path=publicationRoute(lang),title=en?'Publications, interviews and research by Alexey Yakovlev | GAEO.ru':'Публикации, интервью и исследования Алексея Яковлева | GAEO.ru';
  const h1=en?'Publications, case studies and mentions':'Публикации, кейсы и упоминания';
  const description=en?'Explore GAEO.ru and Alexey Yakovlev’s rankings, interviews, expert commentary, public case studies and authored research. Direct links to original sources.':'Рейтинги и упоминания GAEO.ru и Алексея Яковлева, интервью, экспертные комментарии, публичные кейсы и авторские исследования. Четыре раздела со ссылками на источники.';
  const collection={'@type':'CollectionPage','@id':SITE+path+'#collectionpage',url:SITE+path,name:h1,description,inLanguage:en?'en':'ru-RU',dateModified:UPDATED,isPartOf:{'@id':SITE+'/#website'},about:[{'@id':BUSINESS},{'@id':PERSON}],breadcrumb:{'@id':SITE+path+'#breadcrumb'},mainEntity:{'@id':SITE+path+'#sections'},hasPart:categories.map(c=>({'@id':SITE+publicationRoute(lang,c.id)+'#collectionpage'}))};
  const graph=[collection,{'@type':'ItemList','@id':SITE+path+'#sections',numberOfItems:4,itemListElement:categories.map((c,i)=>({'@type':'ListItem',position:i+1,name:c[lang],url:SITE+publicationRoute(lang,c.id),item:{'@type':'CollectionPage','@id':SITE+publicationRoute(lang,c.id)+'#collectionpage',name:c[lang],url:SITE+publicationRoute(lang,c.id)}}))},...entityNodes(lang)];
  const newest=sortedPublications().filter(x=>x.sortDate).slice(0,4);
  graph.push(...newest.map(x=>publicationNode(x,lang)));
  const redirects=Object.fromEntries(publications.items.filter(x=>x.legacyPosition).map(x=>[x.id,publicationRoute(lang,x.category)+'#'+x.id]));
  const body=`<main class="page-shell evidence-page">
<section class="listing-hero"><div class="container"><div class="eyebrow">GAEO · ${en?'Alexey Yakovlev':'Алексей Яковлев'}</div><h1>${h1}</h1><p class="evidence-lead">${en?'Choose the evidence you want to explore: coverage by other authors, expert discussions, project results or research.':'Выберите, что хотите посмотреть: материалы других авторов, экспертные обсуждения, результаты проектов или исследования.'}</p><div class="evidence-summary">${esc(countLabel(publications.items.length,lang))} · ${en?'4 sections':'4 раздела'} · ${en?'Updated':'Обновлено'} ${displayDate(UPDATED,lang)}</div></div></section>
<section class="inner-content"><div class="container"><div class="publication-directory">${categories.map((c,i)=>`<a class="publication-directory__card" href="${publicationRoute(lang,c.id)}"><span class="publication-directory__number">0${i+1}</span><h2>${esc(c[lang])}</h2><p>${esc(c.intro[lang])}</p><span class="publication-directory__link">${esc(countLabel(sortedPublications(c.id).length,lang))}<span aria-hidden="true">↗</span></span></a>`).join('')}</div>
<section class="evidence-latest"><div class="eyebrow">${en?'Recently added and updated':'Последние публикации и обновления'}</div><h2>${en?'New in the collection':'Новое в подборке'}</h2><div class="evidence-latest__list">${newest.map(x=>`<article><span class="publication-meta">${esc(x[lang].meta)}</span><h3><a href="${publicationRoute(lang,x.category)}#${esc(x.id)}">${esc(x[lang].title)}</a></h3><a class="text-link" href="${publicationRoute(lang,x.category)}#${esc(x.id)}">${esc(categories.find(c=>c.id===x.category)[lang])} →</a></article>`).join('')}</div></section>
<section class="evidence-note"><h2>${en?'How to use this collection':'Как пользоваться подборкой'}</h2><p>${en?'Every entry links to its source. A ranking, an interview and an authored article answer different questions: who mentions the practice, how the expert reasons, and what the work involves. Check the publication date, methodology and project context.':'У каждого материала есть ссылка на источник. Рейтинг, интервью и авторская статья помогают оценить разные стороны работы: кто упоминает практику, как эксперт объясняет свои решения и какие задачи разбирает. Учитывайте дату публикации, методику и контекст проекта.'}</p><p>${en?'Multiple versions of one interview are collected in one entry. The IndexResearch studies disclose Alexey’s role as co-founder and GAEO’s funding of the source measurement.':'Версии одного интервью на нескольких площадках собраны в одной карточке. В исследованиях IndexResearch раскрыта роль Алексея как сооснователя и участие GAEO в оплате исходного замера.'}</p></section>
${related(lang)}<!-- GAEO_DESIGN:CONTACT --></div></section></main>
<script>/* Preserve incoming links and in-page navigation to previous publication anchors. */{const routes=${json(redirects)};const redirect=()=>{let hash='';try{hash=decodeURIComponent(location.hash.slice(1));}catch{}if(Object.prototype.hasOwnProperty.call(routes,hash))location.replace(routes[hash]);};addEventListener('hashchange',redirect);redirect();}</script>`;
  save(resolve(ROOT,path.slice(1),'index.html'),shell({lang,path,equivalent:publicationRoute(en?'ru':'en'),title,description,body,graph,breadcrumbs:crumbs(lang,path,en?'Publications':'Публикации')}));

  for(const category of categories){
    const entries=sortedPublications(category.id),route=publicationRoute(lang,category.id),url=SITE+route;
    const heading=category[lang];
    const pageTitle=heading+(en?' — Alexey Yakovlev and GAEO.ru':' — Алексей Яковлев и GAEO.ru');
    const nodes=entries.map(x=>publicationNode(x,lang));
    const graph=[{'@type':'CollectionPage','@id':url+'#collectionpage',url,name:heading,description:category.intro[lang],inLanguage:en?'en':'ru-RU',dateModified:UPDATED,isPartOf:{'@id':SITE+path+'#collectionpage'},about:[{'@id':BUSINESS},{'@id':PERSON}],breadcrumb:{'@id':url+'#breadcrumb'},mainEntity:{'@id':url+'#itemlist'},hasPart:nodes.map(n=>({'@id':n['@id']}))},
      {'@type':'ItemList','@id':url+'#itemlist',name:heading,numberOfItems:entries.length,itemListOrder:'https://schema.org/ItemListOrderDescending',itemListElement:entries.map((entry,i)=>({'@type':'ListItem',position:i+1,name:entry[lang].title,url:absolute(entry[lang].links[0].url),item:nodes[i]}))},...entityNodes(lang,entries)];
    const explanation=category.id==='ratings'?(en?'These are publications by different authors and market participants. A listing or a score describes their comparison; it is not a guarantee of a future project result.':'Это публикации разных авторов и участников рынка. Упоминание или место в списке описывает их сравнение; результат будущего проекта зависит от его исходных условий.'):
      category.id==='articles'?(en?'Authored articles and research are grouped separately so their relationship with GAEO is clear. Research links include source data where published.':'Авторские материалы и исследования выделены в отдельный раздел, чтобы была понятна их связь с GAEO. Для исследований указаны исходные данные, когда они опубликованы.'):
      category.id==='cases'?(en?'Results belong to the reported project and period. Full case studies explain the query sets, measurements and work performed.':'Результаты относятся к указанному проекту и периоду. В полных кейсах описаны наборы запросов, замеры и выполненная работа.'):
      (en?'One interview may have several publication links. Expert commentary is linked to the full editorial question and discussion.':'У одного интервью может быть несколько ссылок на публикации. Экспертные комментарии ведут к полному вопросу редакции и обсуждению.');
    const body=`<main class="page-shell evidence-page"><section class="listing-hero"><div class="container"><div class="eyebrow">${en?'Publications':'Публикации'} · ${esc(countLabel(entries.length,lang))}</div><h1>${esc(heading)}</h1><p class="evidence-lead">${esc(category.intro[lang])}</p></div></section><section class="inner-content"><div class="article-wrap evidence-list-wrap">${categoryNav(lang,category.id)}<p class="evidence-editorial-note">${esc(explanation)}</p><p class="evidence-updated">${en?'Updated':'Обновлено'} ${displayDate(UPDATED,lang)}. ${en?'Dated items are ordered from newest to oldest; undated entries appear last.':'Материалы с известной датой расположены от новых к старым; записи без точной даты — в конце.'}</p><div class="publication-list">${entries.map(x=>publicationCard(x,lang)).join('\n')}</div>${related(lang)}<!-- GAEO_DESIGN:CONTACT --></div></section></main>`;
    save(resolve(ROOT,route.slice(1),'index.html'),shell({lang,path:route,equivalent:publicationRoute(en?'ru':'en',category.id),title:pageTitle,description:category.intro[lang],body,graph,breadcrumbs:crumbs(lang,route,heading,true)}));
  }
}

function sourceLinks(review,lang){
  const local=review[lang]||review.ru;
  const translated={'Яндекс.Карты':'Yandex Maps','2ГИС':'2GIS'};
  const alternatives=(review.sources||[]).filter(x=>x.url!==review.url).map(x=>({...x,label:lang==='en'?(translated[x.label]||x.label):x.label}));
  const candidates=[{label:local.sourceLabel||review.source,url:review.url},...alternatives];
  const seen=new Set();const links=candidates.filter(a=>{if(seen.has(a.label))return false;seen.add(a.label);return true;});
  return links.map(a=>`<a class="button outline" href="${esc(a.url)}" target="_blank" rel="noopener">${esc(a.label)} ↗</a>`).join('');
}
function buildReviews(lang){
  const en=lang==='en',path=reviewsRoute(lang),url=SITE+path,summary=reviewSummary();
  const title=en?'Client reviews of Alexey Yakovlev and GAEO.ru':'Отзывы клиентов об Алексее Яковлеве и GAEO.ru';
  const description=en?`${summary.count} client reviews of GAEO.ru audits, consulting and GEO promotion, with source links. Average rating ${summary.value.toFixed(1)} out of 5, rounded to one decimal place.`:`${reviewCountLabel(summary.count,lang)} о GEO-аудитах, консультациях и продвижении с Алексеем Яковлевым. Ссылки на оригиналы. Средняя оценка ${summary.value.toFixed(1)} из 5 с округлением до десятых.`;
  const reviews=sortedReviews(),nodes=reviews.map(r=>reviewNode(r,lang));
  const entities=entityNodes(lang,[]),business=entities.find(x=>x['@id']===BUSINESS);
  business.aggregateRating=aggregateRating();business.review=nodes.map(x=>({'@id':x['@id']}));
  const graph=[{'@type':'CollectionPage','@id':url+'#collectionpage',url,name:title,description,inLanguage:en?'en':'ru-RU',dateModified:UPDATED,isPartOf:{'@id':SITE+'/#website'},about:[{'@id':BUSINESS},{'@id':PERSON}],mainEntity:{'@id':url+'#reviews'},breadcrumb:{'@id':url+'#breadcrumb'}},
    {'@type':'ItemList','@id':url+'#reviews',numberOfItems:reviews.length,itemListElement:nodes.map((node,i)=>({'@type':'ListItem',position:i+1,item:{'@id':node['@id']}}))},...entities,...nodes];
  const platforms=new Map();for(const r of reviews){if(!platforms.has(r.source))platforms.set(r.source,{label:(r[lang]||r.ru).sourceLabel||r.source,url:r.platformUrl||reviewData.verification.find(x=>x.type==='platform'&&x.source===r.source)?.url||r.url});}
  const body=`<main class="page-shell evidence-page"><section class="listing-hero"><div class="container"><div class="eyebrow">GAEO · ${en?'Client experience':'Опыт клиентов'}</div><h1>${title}</h1><p class="evidence-lead">${en?'What clients say about audits, consulting and project support: the business task, the work itself and the changes they noticed.':'Что клиенты рассказывают об аудитах, консультациях и сопровождении: с какой задачей пришли, как строилась работа и какие изменения заметили.'}</p></div></section>
<section class="inner-content"><div class="article-wrap evidence-list-wrap"><div class="review-summary"><div class="review-summary__score"><strong>${summary.value.toFixed(1).replace('.',en?'.':',')}</strong><span> / 5</span></div><div><strong>${esc(reviewCountLabel(summary.count,lang))} ${en?'in this collection':'в этой подборке'}</strong><p>${en?`Average based on ${summary.ratedCount} verified ratings, rounded to one decimal place. Original ratings and dates are shown where confirmed.`:`Средняя по ${summary.ratedCount} подтвержденным оценкам, округленная до десятых. Исходные оценки и даты указаны там, где удалось их подтвердить.`}</p></div></div>
<p>${en?'Each card links to the original publication. We use excerpts from longer reviews and count identical reviews posted on multiple platforms once. This collection’s average is calculated separately from each platform’s overall rating.':'У каждой карточки есть ссылка на оригинал. Из длинных отзывов приведены фрагменты; одинаковые отзывы на разных площадках считаются один раз. Средняя оценка этой подборки рассчитывается отдельно от общего рейтинга каждой площадки.'}</p>${en?'<p class="evidence-editorial-note">The English texts below are translations of Russian originals. Follow the source links to read the original wording.</p>':''}
<div class="review-platforms" aria-label="${en?'Review sources':'Источники отзывов'}">${[...platforms.values()].map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('')}</div><p class="evidence-updated">${en?'Sources checked':'Источники проверены'} ${displayDate(UPDATED,lang)}.</p>
<h2>${en?'Client reviews':'Отзывы клиентов'}</h2><div class="review-grid">${reviews.map(r=>{const local=r[lang]||r.ru;return `<article class="review-card" id="${esc(r.id)}" data-review-id="${esc(r.id)}"><div class="review-card__head"><h3>${esc(local.author)}</h3>${Number.isFinite(r.rating)?`<span class="review-card__rating" aria-label="${en?'Rating':'Оценка'} ${r.rating} ${en?'out of':'из'} 5">${r.rating} / 5</span>`:''}</div>${local.context?`<p class="review-card__context">${esc(local.context)}</p>`:''}<blockquote>${en?'“':'«'}${esc(local.text)}${en?'”':'»'}</blockquote><div class="review-meta"><span>${esc(local.sourceLabel||r.source)}</span>${r.date?`<time datetime="${esc(r.date)}">${esc(displayDate(r.date,lang))}</time>`:''}</div><div class="review-actions">${sourceLinks(r,lang)}</div></article>`;}).join('\n')}</div>
<section class="evidence-note"><h2>${en?'What to look for in a review':'На что смотреть в отзывах'}</h2><p>${en?'Look for a task similar to yours and check what was done: an audit, content changes, source work or ongoing measurement. A review describes one client’s experience; the case studies provide more detail about methods and results.':'Ищите задачу, похожую на вашу, и смотрите, что именно было сделано: аудит, изменения контента, работа с источниками или регулярные замеры. Отзыв описывает опыт конкретного клиента; подробности методики и результатов приведены в кейсах.'}</p></section>
${related(lang)}<section class="evidence-note"><h2>${en?'Share your experience':'Поделитесь опытом работы'}</h2><p>${en?'If we have worked together, you can leave a review on any convenient platform. Describe your starting task, what was useful and what could be improved. Specific details help future clients make an informed choice.':'Если мы уже работали вместе, оставьте отзыв на удобной площадке. Расскажите о своей задаче, что оказалось полезным и что можно улучшить. Конкретные детали помогут будущим клиентам сделать выбор.'}</p><div class="link-buttons"><a class="button outline" href="https://yandex.ru/maps/org/gaeo_prodvizheniye_v_neyrosetyakh/45723529742/reviews/" target="_blank" rel="noopener">${en?'Yandex Maps':'Яндекс.Карты'} ↗</a><a class="button outline" href="https://2gis.ru/moscow/firm/70000001115160942/tab/reviews" target="_blank" rel="noopener">2${en?'GIS':'ГИС'} ↗</a><a class="button outline" href="https://www.google.com/maps?cid=2392662518453919003" target="_blank" rel="noopener">Google Maps ↗</a><a class="button outline" href="https://zoon.ru/msk/internet/kompaniya_po_prodvizheniyu_v_nejrosetyah_gaeoru/" target="_blank" rel="noopener">Zoon ↗</a></div></section><!-- GAEO_DESIGN:CONTACT --></div></section></main>`;
  save(resolve(ROOT,path.slice(1),'index.html'),shell({lang,path,equivalent:reviewsRoute(en?'ru':'en'),title,description,body,graph,breadcrumbs:crumbs(lang,path,en?'Reviews':'Отзывы')}));
}

function carousel(lang){
  const en=lang==='en',summary=reviewSummary(),reviews=sortedReviews();
  return `<section class="section white reviews-section review-carousel" aria-labelledby="reviews-heading"><div class="container">
<div class="content-head reviews-head review-carousel__heading"><div><div class="eyebrow">${en?'Reviews':'Отзывы'}</div><h2 id="reviews-heading">${en?'What clients highlight':'Что клиенты отмечают в работе'}</h2><p class="review-carousel__rating"><strong>${summary.value.toFixed(1).replace('.',en?'.':',')} / 5</strong> · <a href="${reviewsRoute(lang)}">${esc(reviewCountLabel(summary.count,lang))}</a> · ${en?'rounded average':'средняя с округлением'}</p></div><a class="text-link" href="${reviewsRoute(lang)}">${en?'All reviews':'Все отзывы'} →</a></div>
<div class="review-carousel__controls"><button type="button" data-review-prev aria-label="${en?'Previous reviews':'Предыдущие отзывы'}" aria-controls="home-reviews-track" disabled><span aria-hidden="true">←</span></button><button type="button" data-review-next aria-label="${en?'Next reviews':'Следующие отзывы'}" aria-controls="home-reviews-track"><span aria-hidden="true">→</span></button><span class="review-carousel__status" aria-live="polite" aria-atomic="true"></span></div>
<div class="review-carousel__track" id="home-reviews-track" role="list" tabindex="0" aria-label="${en?'Client review excerpts. Use the left and right arrow keys.':'Фрагменты отзывов клиентов. Используйте клавиши со стрелками влево и вправо.'}">${reviews.map((r,i)=>{const local=r[lang]||r.ru;return `<article class="review-carousel__card" role="listitem" data-review-id="${esc(r.id)}"><div class="review-carousel__context">${esc(local.context||local.sourceLabel||r.source)}</div><blockquote>${en?'“':'«'}${esc(local.excerpt||local.text)}${en?'”':'»'}</blockquote><p class="review-carousel__author">${esc(local.author)}</p><a class="review-carousel__source" href="${reviewsRoute(lang)}#${esc(r.id)}">${esc(local.sourceLabel||r.source)} · ${en?'Read review':'Читать отзыв'} ↗</a></article>`;}).join('')}</div>
${en?'<p class="review-carousel__translation">Excerpts translated from Russian. Original source links are available on the reviews page.</p>':''}
</div></section>`;
}

function updateHomepage(lang){
  const path=resolve(ROOT,lang==='en'?'en/index.html':'index.html');
  let html=readFileSync(path,'utf8');
  const re=/<section class="section white reviews-section(?: review-carousel)?"[\s\S]*?<\/section>/;
  if(!re.test(html))throw new Error('Missing homepage review section: '+lang);
  html=html.replace(re,carousel(lang));
  html=html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(all,raw)=>{
    const data=JSON.parse(raw),nodes=data['@graph']||[data];
    for(const node of nodes){
      if(node['@type']==='WebPage')node.dateModified=UPDATED;
      if(node['@id']===BUSINESS){node.aggregateRating=aggregateRating();node.review=sortedReviews().map(r=>({'@id':SITE+reviewsRoute(lang)+'#'+r.id}));}
      if([BUSINESS,PERSON].includes(node['@id'])){
        const resolved=entityNodes(lang).find(x=>x['@id']===node['@id']);
        node.subjectOf=resolved.subjectOf;
      }
    }
    return '<script type="application/ld+json">'+json(data)+'</script>';
  });
  if(lang==='ru'){
    // Keep homepage-specific overrides after the shared base stylesheet.
    html=html.replace(/<link rel="stylesheet" href="\/assets\/style\.css[^\"]*">\s*/g,'');
    html=html.replace('<style>','<link rel="stylesheet" href="/assets/style.css?v=0">\n<style>');
  }else if(!html.includes('href="/assets/style.css'))html=html.replace('</head>','<link rel="stylesheet" href="/assets/style.css?v=0">\n</head>');
  if(!html.includes('/assets/review-carousel.css'))html=html.replace('</head>','<link rel="stylesheet" href="/assets/review-carousel.css?v=0">\n</head>');
  if(!html.includes('/assets/review-carousel.js'))html=html.replace('</body>','<script src="/assets/review-carousel.js?v=0" defer></script>\n</body>');
  const navigation=`<!-- PUBLICATION_CATEGORY_LINKS_START --><nav class="home-publication-links pill-links" aria-label="${lang==='en'?'Publication sections':'Разделы публикаций'}">${categories.map(c=>`<a href="${publicationRoute(lang,c.id)}">${esc(c[lang])}</a>`).join('')}</nav><!-- PUBLICATION_CATEGORY_LINKS_END -->`;
  if(html.includes('<!-- PUBLICATION_CATEGORY_LINKS_START -->'))html=html.replace(/<!-- PUBLICATION_CATEGORY_LINKS_START -->[\s\S]*?<!-- PUBLICATION_CATEGORY_LINKS_END -->/,navigation);
  else if(lang==='ru')html=html.replace(/(<div class="publications mobile-fold-body" id="publicationsFoldBody">)/,navigation+'\n$1');
  save(path,html);
}

function connectEditorialIndexes(lang){
  const en=lang==='en';
  for(const [section,category,label] of [['cases','cases',en?'More public case studies and external publications':'Публичные кейсы и публикации на внешних площадках'],['articles','articles',en?'Authored articles and research on other platforms':'Авторские публикации и исследования на других площадках']]){
    const path=resolve(ROOT,en?'en':'',section,'index.html');let html=readFileSync(path,'utf8');
    const block=`<!-- EVIDENCE_RELATED_LINK_START --><aside class="section-sm" aria-label="${esc(label)}"><div class="container"><p><strong>${label}</strong></p><p><a class="text-link" href="${publicationRoute(lang,category)}">${en?'View the publication collection':'Перейти в раздел публикаций'} →</a></p></div></aside><!-- EVIDENCE_RELATED_LINK_END -->`;
    if(html.includes('<!-- EVIDENCE_RELATED_LINK_START -->'))html=html.replace(/<!-- EVIDENCE_RELATED_LINK_START -->[\s\S]*?<!-- EVIDENCE_RELATED_LINK_END -->/,block);
    else html=html.replace('</main>',block+'\n</main>');
    save(path,html);
  }
}

for(const lang of ['ru','en']){buildPublications(lang);buildReviews(lang);updateHomepage(lang);connectEditorialIndexes(lang);}
console.log(`Evidence pages synchronized: ${publications.items.length} publications; ${reviewData.items.length} unique reviews; ${reviewSummary().ratedCount} verified ratings; average ${reviewSummary().value.toFixed(1)}.`);
