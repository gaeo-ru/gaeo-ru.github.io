import {readFileSync,writeFileSync,mkdirSync,existsSync,readdirSync,rmSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {SITE,categories,articles,route,articleRoute,categoryArticles,categoryFor,versionsFor,formatDate,validateAll,articleSchema} from '../src/lib/rankings.mjs';

validateAll();
const ROOT=resolve('src/legacy/pages');
const nojs=readFileSync('templates/partials/nojs-fallback.html','utf8').trim();
const esc=v=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const json=v=>JSON.stringify(v).replace(/</g,'\\u003c');
const rendered=new Set();
const paragraphs=items=>items.map(p=>`<p>${esc(p)}</p>`).join('\n');
const count=(n,lang)=>lang==='en'?`${n} ${n===1?'article':'articles'}`:`${n} ${n%10===1&&n%100!==11?'материал':n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'материала':'материалов'}`;
const external=(url,label,sponsored=false)=>`<a href="${esc(url)}" target="_blank" rel="${sponsored?'sponsored ':''}noopener noreferrer">${esc(label)}</a>`;
const latest=articles.map(x=>x.modifiedDate).sort().at(-1)||'2026-11-08';
function save(path,html){const full=resolve(ROOT,path.slice(1),'index.html');rendered.add(full);mkdirSync(dirname(full),{recursive:true});if(!existsSync(full)||readFileSync(full,'utf8')!==html)writeFileSync(full,html);}
function breadcrumbs(lang,path,category,article){
  const en=lang==='en';
  const out=[{name:en?'Home':'Главная',item:SITE+(en?'/en/':'/')},{name:en?'Rankings':'Рейтинги',item:SITE+route(lang)}];
  if(category)out.push({name:category[lang],item:SITE+route(lang,category.id)});
  if(article)out.push({name:article[lang].title,item:SITE+path});
  return out;
}
function shell({lang,path,equivalent,title,description,body,graph,crumbs,article}){
  const en=lang==='en',url=SITE+path,ru=en?equivalent:path,english=en?path:equivalent;
  const cover=article?.images?.[0];
  const image=cover?{url:SITE+cover.src,width:cover.width,height:cover.height,alt:cover.alt[lang]}:{url:SITE+'/assets/gaeo-social-preview.jpg',width:1200,height:630,alt:'GAEO.ru'};
  const visible=crumbs.map((c,i)=>i===crumbs.length-1?`<span class="breadcrumbs__current" aria-current="page">${esc(c.name)}</span>`:`<a href="${esc(c.item)}">${esc(c.name)}</a><span class="breadcrumbs__sep" aria-hidden="true">›</span>`).join('');
  graph.push({'@type':'BreadcrumbList','@id':url+'#breadcrumb',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
  return `<!doctype html>
<!-- Generated from src/data/rankings/articles/*.json. Edit article data, not this HTML. -->
<html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow,max-image-preview:large">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}"><link rel="alternate" hreflang="ru" href="${SITE+ru}"><link rel="alternate" hreflang="en" href="${SITE+english}"><link rel="alternate" hreflang="x-default" href="${SITE+ru}">
<!-- SOCIAL_AND_ICONS_START -->
<meta property="og:type" content="${article?'article':'website'}"><meta property="og:site_name" content="GAEO.ru"><meta property="og:locale" content="${en?'en_US':'ru_RU'}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="${image.url}"><meta property="og:image:width" content="${image.width}"><meta property="og:image:height" content="${image.height}"><meta property="og:image:type" content="${image.url.endsWith('.png')?'image/png':image.url.endsWith('.webp')?'image/webp':'image/jpeg'}"><meta property="og:image:alt" content="${esc(image.alt)}"><meta name="theme-color" content="#021641">
${article?`<meta property="article:published_time" content="${article.publishedDate}"><meta property="article:modified_time" content="${article.modifiedDate}">`:''}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${image.url}"><meta name="twitter:image:alt" content="${esc(image.alt)}">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"><link rel="apple-touch-icon" href="/assets/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="192x192" href="/assets/android-chrome-192x192.png"><link rel="icon" type="image/png" sizes="512x512" href="/assets/android-chrome-512x512.png">
<!-- SOCIAL_AND_ICONS_END -->
<!-- FONT_LOADING_START -->
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600&family=Manrope:wght@400;500;600;700&display=swap&subset=cyrillic" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,500;7..72,600&family=Manrope:wght@400;500;600;700&display=swap&subset=cyrillic"></noscript>
<!-- FONT_LOADING_END -->
<link rel="stylesheet" href="/assets/style.css?v=0"><link rel="stylesheet" href="/assets/internal.css?v=0"><link rel="stylesheet" href="/assets/rankings.css?v=0">
<style data-fix="page-shell-gap">.page-shell{padding-top:0!important}</style>
<script src="/assets/analytics.js?v=0" defer></script>
<script type="application/ld+json">${json({'@context':'https://schema.org','@graph':graph})}</script>
<!-- NOJS_FALLBACK_START -->
${nojs}
<!-- NOJS_FALLBACK_END -->
</head><body class="rankings-page">
<!-- SITE_HEADER_START --><header data-astro-shared-header="true"></header><!-- SITE_HEADER_END -->
<!-- VISIBLE_BREADCRUMBS_START -->
<nav class="breadcrumbs" aria-label="${en?'Breadcrumbs':'Хлебные крошки'}"><div class="container breadcrumbs__inner">${visible}</div></nav>
<!-- VISIBLE_BREADCRUMBS_END -->
${body}
<!-- SITE_FOOTER_START --><footer data-astro-shared-footer="true"></footer><!-- SITE_FOOTER_END -->
<script src="/assets/form-config.js?v=0"></script><script src="/assets/site.js?v=0"></script>
</body></html>\n`;
}
function categoryNav(lang,active=''){
  return `<nav class="ranking-categories" aria-label="${lang==='en'?'Ranking categories':'Категории рейтингов'}"><a href="${route(lang)}"${!active?' aria-current="page"':''}>${lang==='en'?'All categories':'Все категории'}</a>${categories.map(c=>`<a href="${categoryArticles(c.id).length?route(lang,c.id):route(lang)+'#'+c.id}"${active===c.id?' aria-current="page"':''}>${esc(c[lang])}</a>`).join('')}</nav>`;
}
function card(a,lang){
  const t=a[lang],img=a.images?.[0];
  return `<article class="ranking-card"><a class="ranking-card__link" href="${articleRoute(a,lang)}">${img?`<img src="${img.src}" alt="${esc(img.alt[lang])}" width="${img.width}" height="${img.height}" loading="lazy" decoding="async">`:''}<div class="ranking-card__body"><div class="ranking-card__meta">${esc(formatDate(a.sourceDate,lang))} · ${t.ranking.length} ${lang==='en'?'participants':'участников'}</div><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><span class="ranking-card__read">${lang==='en'?'Read the comparison':'Читать сравнение'} <span aria-hidden="true">↗</span></span></div></a></article>`;
}
function collectionGraph(lang,path,name,description,entries){
  const url=SITE+path;
  return [
    {'@type':'CollectionPage','@id':url+'#webpage',url,name,description,inLanguage:lang==='en'?'en':'ru-RU',dateModified:latest,isPartOf:{'@id':SITE+'/#website'},mainEntity:{'@id':url+'#list'},breadcrumb:{'@id':url+'#breadcrumb'}},
    {'@type':'ItemList','@id':url+'#list',name,numberOfItems:entries.length,itemListElement:entries.map((a,i)=>({'@type':'ListItem',position:i+1,name:a[lang].title,url:SITE+articleRoute(a,lang)}))}
  ];
}
function buildIndex(lang){
  const en=lang==='en',path=route(lang),name=en?'Rankings':'Рейтинги';
  const description=en?'Comparisons of companies, services and products: methodology, participants and links to published versions.':'Сравнения компаний, услуг и товаров: методика, участники и ссылки на опубликованные версии материалов.';
  const body=`<main class="page-shell rankings-index"><section class="ranking-index-hero"><div class="container"><p class="ranking-eyebrow">GAEO / ${en?'Comparisons':'Сравнения'}</p><h1>${name}</h1><p class="ranking-index-lead">${description}</p><div class="ranking-index-note">${en?'Editorial versions of previously published comparisons. Each article preserves its original scope and links to the source material.':'Редакционные версии ранее опубликованных сравнений. В каждом материале сохранены задача исходного рейтинга и ссылки на источники.'}</div><p class="ranking-index-count">${count(articles.length,lang)} · ${categories.length} ${en?'categories':'категорий'}</p></div></section><div class="container rankings-layout"><aside class="ranking-sidebar">${categoryNav(lang)}</aside><div class="ranking-collections">${categories.map(c=>{
    const list=categoryArticles(c.id);
    return `<section class="ranking-collection${list.length?'':' ranking-collection--empty'}" id="${c.id}"><div class="ranking-collection__heading"><h2>${list.length?`<a href="${route(lang,c.id)}">${esc(c[lang])}</a>`:esc(c[lang])}</h2><span>${count(list.length,lang)}</span></div><p class="ranking-collection__intro">${esc(c.description[lang])}</p>${list.length?`<div class="ranking-card-grid">${list.map(a=>card(a,lang)).join('')}</div>`:`<p class="ranking-empty">${en?'The first articles in this category are being prepared.':'Первые материалы этой рубрики готовятся к публикации.'}</p>`}</section>`;
  }).join('')}</div></div></main>`;
  save(path,shell({lang,path,equivalent:route(en?'ru':'en'),title:(en?'Company, service and product rankings':'Рейтинги компаний, услуг и товаров')+' | GAEO.ru',description,body,graph:collectionGraph(lang,path,name,description,articles),crumbs:breadcrumbs(lang,path)}));
}
function buildCategory(c,lang){
  const list=categoryArticles(c.id);if(!list.length)return;
  const en=lang==='en',path=route(lang,c.id),name=c[lang],description=c.description[lang];
  const body=`<main class="page-shell rankings-index"><section class="ranking-index-hero"><div class="container"><p class="ranking-eyebrow">${en?'Rankings':'Рейтинги'}</p><h1>${esc(name)}</h1><p class="ranking-index-lead">${esc(description)}</p><p class="ranking-index-count">${count(list.length,lang)}</p></div></section><div class="container rankings-layout"><aside class="ranking-sidebar">${categoryNav(lang,c.id)}</aside><section class="ranking-collections" aria-label="${en?'Articles':'Материалы'}"><h2 class="ranking-category-subheading">${en?'Rankings and comparisons: ':'Рейтинги и сравнения: '}${esc(name)}</h2><div class="ranking-card-grid">${list.map(a=>card(a,lang)).join('')}</div></section></div></main>`;
  save(path,shell({lang,path,equivalent:route(en?'ru':'en',c.id),title:`${name}: ${en?'rankings and comparisons':'рейтинги и сравнения'} | GAEO.ru`,description,body,graph:collectionGraph(lang,path,name,description,list),crumbs:breadcrumbs(lang,path,c)}));
}
function figure(img,lang,hero=false){if(!img)return '';return `<figure class="ranking-figure${hero?' ranking-figure--hero':''}"><img src="${img.src}" alt="${esc(img.alt[lang])}" width="${img.width}" height="${img.height}" loading="${hero?'eager':'lazy'}" decoding="async"${hero?' fetchpriority="high"':''}>${img.caption?.[lang]?`<figcaption>${esc(img.caption[lang])}</figcaption>`:''}</figure>`;}
function clientLinks(a,lang,inline){
  const links=inline.remaining();
  if(!links.length)return '';
  return `<aside class="ranking-client-links"><h3>${lang==='en'?'Company and service details':'Компания и профильные услуги'}</h3><ul>${links.map(l=>`<li>${external(l.url,l.label[lang],l.relation==='sponsored')}</li>`).join('')}</ul></aside>`;
}

function makeInlineLinks(a,lang){
  const links=(a.clientLinks||[]).filter(l=>l.url&&l.label?.[lang]);
  const used=new Set();
  const normalize=value=>String(value||'').toLocaleLowerCase().replace(/[\s«»"'.,:;!?()[\]{}]+/g,'');
  const hrefKey=value=>{
    try{
      const u=new URL(value);
      u.hash='';
      for(const name of [...u.searchParams.keys()])if(name.toLowerCase().startsWith('utm_'))u.searchParams.delete(name);
      return u.hostname.replace(/^www\./,'').toLowerCase()+u.pathname.replace(/\/+$/,'')+u.search;
    }catch{return String(value);}
  };
  const link=(l,label)=>external(l.url,label,l.relation==='sponsored');
  const variants=l=>{
    const originals=[l.sourceAnchor?.[lang],l.label?.[lang]].filter(Boolean);
    const out=[...originals];
    for(const value of originals){
      const colon=value.indexOf(': ');
      if(colon>=2)out.push(value.slice(colon+2));
      // The source text can omit quote marks while retaining the exact course name.
      const quote=value.match(/«([^»]{5,})»/);
      if(quote)out.push(quote[1]);
    }
    return [...new Set(out.filter(v=>v.length>=5&&!/^(здесь|подробнее|ссылка|главная|сайт)$/i.test(v)))];
  };
  function render(value){
    const raw=String(value??''),lower=raw.toLocaleLowerCase(),matches=[];
    for(const l of links){
      const id=hrefKey(l.url);if(used.has(id))continue;
      for(const anchor of variants(l)){
        const at=lower.indexOf(anchor.toLocaleLowerCase());
        if(at>=0){matches.push({at,len:anchor.length,l,id});break;}
      }
    }
    matches.sort((x,y)=>x.at-y.at||y.len-x.len);
    let cursor=0,html='';
    for(const m of matches){
      if(m.at<cursor||used.has(m.id))continue;
      html+=esc(raw.slice(cursor,m.at))+link(m.l,raw.slice(m.at,m.at+m.len));
      cursor=m.at+m.len;used.add(m.id);
    }
    return html+esc(raw.slice(cursor));
  }
  function heading(entry,selection){
    if(!selection&&entry.position!==1)return esc(entry.name);
    const name=normalize(entry.name),original=normalize(entry.originalName||a.firstPlace||'');
    const choices=links.filter(l=>!used.has(hrefKey(l.url))).map(l=>{
      const labels=[l.label?.[lang],l.label?.ru,l.sourceAnchor?.ru].filter(Boolean).map(normalize);
      let match=labels.some(label=>(name.length>=4&&label.includes(name))||(original.length>=4&&label.includes(original)));
      // A product heading should only link to the matching product, never to another seller.
      if(selection&&!labels.some(label=>label===name||label.includes(name)))match=false;
      const main=/(?:главная|официальный сайт|официальная страница|learning platform|official website|website)/i.test((l.label?.ru||'')+' '+(l.label?.en||'')+' '+(l.sourceAnchor?.ru||''))||/^(?:\/)?$/.test(new URL(l.url).pathname)||/Admitad \/ главная/i.test(l.sourceAnchor?.ru||'');
      return {l,score:(match?5:0)+(main?2:0)};
    }).filter(x=>x.score>=5).sort((x,y)=>y.score-x.score);
    if(!choices.length)return esc(entry.name);
    const l=choices[0].l;used.add(hrefKey(l.url));
    return link(l,entry.name);
  }
  return {render,heading,remaining:()=>links.filter(l=>!used.has(hrefKey(l.url)))};
}

function buildArticle(a,lang){
  const en=lang==='en',t=a[lang],path=articleRoute(a,lang),c=categoryFor(a.category),isSelection=a.contentType==='selection',hasScores=t.ranking.some(e=>e.score!==undefined);
  const inline=makeInlineLinks(a,lang);
  const richParagraphs=items=>items.map(p=>`<p>${inline.render(p)}</p>`).join('\n');
  const words=[...t.intro,...t.methodology,...t.ranking.flatMap(e=>[e.summary,...e.paragraphs,...(e.strengths||[]),e.caution||'']),...t.selection,...t.conclusion].join(' ').split(/\s+/).length;
  const ids=['summary','methodology','comparison','participants','selection','faq','versions'];
  const labels=en?['At a glance','Methodology','Comparison table','The participants','How to choose','FAQ','Published versions']:['Короткий ответ','Методика','Сравнение','Участники','Как выбрать','Вопросы и ответы','Версии публикации'];
  const toc=`<nav class="ranking-toc" aria-label="${en?'In this article':'Содержание статьи'}">${ids.map((id,i)=>`<a href="${path}#${id}">${labels[i]}</a>`).join('')}</nav>`;
  const provenance=isSelection?(en?`This is a new edition of an earlier editorial product shortlist. No research winner or product-test scores are claimed; source order and published-version links are retained.`:`Это новая редакция ранее опубликованной подборки товаров. Здесь нет победителя исследования и испытательных баллов; порядок товаров и ссылки на версии сохранены.`):(en?`This is a new editorial version of an earlier comparison. The original ranking and data date are retained; the links below lead to other versions of the same material.`:`Это новая редакционная версия ранее опубликованного сравнения. Порядок участников и дата исходных данных сохранены; внизу собраны другие версии этого материала.`);
  const body=`<main class="page-shell ranking-article" data-ranking-id="${a.id}"><article><section class="ranking-article-hero"><div class="article-wrap"><a class="ranking-eyebrow" href="${route(lang,c.id)}">${esc(c[lang])}</a><h1>${esc(t.title)}</h1><div class="article-meta"><span>${en?'Published':'Опубликовано'}: ${formatDate(a.publishedDate,lang)}</span><span>${en?'Updated':'Обновлено'}: ${formatDate(a.modifiedDate,lang)}</span><span>${Math.max(1,Math.ceil(words/(en?220:180)))} ${en?'min read':'мин чтения'}</span></div><p class="ranking-byline"><a href="${en?'/en':''}/professional-biography/">${en?'Alexey Yakovlev':'Алексей Яковлев'}</a> · ${en?'GAEO editorial version':'Редакционная версия GAEO'}</p><p class="ranking-data-date">${isSelection?(en?'Original selection date':'Дата исходной подборки'):(en?'Original data as of':'Данные исходного рейтинга')}: <time datetime="${a.dataAsOf||a.sourceDate}">${formatDate(a.dataAsOf||a.sourceDate,lang)}</time></p>${toc}${isSelection?'':figure(a.images?.[0],lang,true)}</div></section><div class="article-wrap ranking-body">
<section id="summary"><div class="ranking-answer"><span class="ranking-answer__label">${labels[0]}</span><p>${inline.render(t.shortAnswer||t.intro[0])}</p></div>${richParagraphs(t.intro)}</section>
${t.context?.length?`<section class="ranking-context"><h2>${esc(t.contextTitle||(en?'What this comparison covers':'Что сравниваем'))}</h2>${richParagraphs(t.context)}</section>`:''}
<section id="methodology"><h2>${labels[1]}</h2>${richParagraphs(t.methodology)}${t.criteria?.length?`<ul class="ranking-criteria">${t.criteria.map(k=>`<li><strong>${esc(k.name)}</strong>${k.weight?` <span>${esc(k.weight)}</span>`:''}${k.description?`<p>${esc(k.description)}</p>`:''}</li>`).join('')}</ul>`:''}</section>
${isSelection?'':figure(a.images?.[1],lang)}
<section id="comparison"><h2>${isSelection?(en?'Product shortlist':'Подборка товаров'):(en?'The ranking at a glance':'Рейтинг в одной таблице')}</h2><p class="ranking-table-hint">${en?'Select a participant to read the full profile. On small screens, scroll horizontally to see all columns.':'Нажми на участника, чтобы перейти к подробному разбору. На небольшом экране таблицу можно прокрутить вправо.'}</p><div class="ranking-table-scroll" role="region" tabindex="0" aria-label="${en?'Comparison table; scroll horizontally on narrow screens':'Таблица сравнения, на узком экране прокручивается по горизонтали'}"><table class="ranking-table"><thead><tr><th scope="col">№</th><th scope="col">${en?'Participant':'Участник'}</th>${hasScores?`<th scope="col">${en?'Score':'Баллы'}</th>`:''}<th scope="col">${en?'Main consideration':'Главное при выборе'}</th></tr></thead><tbody>${t.ranking.map(e=>`<tr${!isSelection&&e.position===1?' class="ranking-table__leader"':''}><td>${e.rank??e.position}</td><th scope="row"><a href="${path}#place-${e.position}">${esc(e.name)}</a></th>${hasScores?`<td class="ranking-score">${esc(e.score||'')}</td>`:''}<td>${esc(e.summary)}</td></tr>`).join('')}</tbody></table></div></section>
<section id="participants"><h2>${isSelection?(en?'Products in the shortlist':'Товары в подборке'):(en?'Participant profiles':'Подробно об участниках')}</h2>${t.ranking.map(e=>`<section id="place-${e.position}" class="ranking-entry${!isSelection&&e.position===1?' ranking-entry--first':''}"><div class="ranking-entry__heading"><span class="ranking-position" aria-label="${isSelection?(en?'Item':'Позиция подборки'):(en?'Position':'Место')} ${e.rank??e.position}">${String(e.rank??e.position).padStart(2,'0')}</span><div><h3>${inline.heading(e,isSelection)}</h3>${e.score?`<p class="ranking-entry__score">${esc(e.score)}${en?' points in the original comparison':' баллов в исходном сравнении'}</p>`:''}</div></div><p class="ranking-entry__summary">${inline.render(e.summary)}</p>${richParagraphs(e.paragraphs)}${e.strengths?.length?`<ul>${e.strengths.map(s=>`<li>${inline.render(s)}</li>`).join('')}</ul>`:''}${e.caution?`<p class="ranking-entry__check"><strong>${en?'Check before choosing':'Что уточнить'}:</strong> ${inline.render(e.caution)}</p>`:''}${e.url?`<p class="ranking-entry__website">${external(e.url,isSelection?(en?'View this product':'Посмотреть товар'):(en?'Company website':'Сайт участника'),isSelection||(e.position===1&&a.clientLinks?.some(l=>l.relation==='sponsored')))}</p>`:''}${isSelection?(a.images||[]).filter(img=>img.productPosition===e.position).map(img=>figure(img,lang)).join(''):''}</section>`).join('')}</section>
${isSelection?'':(a.images||[]).slice(2).map(img=>figure(img,lang)).join('')}
<section id="selection"><h2>${isSelection?(en?'How to choose among these products':'Как выбрать подходящий товар'):(en?'How to use this ranking':'Как использовать рейтинг при выборе')}</h2>${richParagraphs(t.selection)}</section>
${clientLinks(a,lang,inline)}
<section id="faq"><h2>${labels[5]}</h2><!-- GAEO_DESIGN:FAQ --></section>
<section class="ranking-conclusion"><h2>${en?'What the comparison shows':'Выводы'}</h2>${paragraphs(t.conclusion)}</section>
<section id="versions" class="ranking-versions"><h2>${labels[6]}</h2><p class="ranking-provenance">${provenance}</p>${a.source.originalAuthor?.[lang]?`<p class="ranking-original-author">${en?'Original author':'Автор исходной публикации'}: ${esc(a.source.originalAuthor[lang])}</p>`:''}${a.disclosure?.[lang]?`<p class="ranking-disclosure">${esc(a.disclosure[lang])}</p>`:''}<p>${isSelection?(en?'Other published editions of this product selection:':'Другие опубликованные версии подборки:'):(en?'Other publications of this comparison and its research data:':'Другие публикации этого сравнения и его исследовательские данные:')}</p><ul>${versionsFor(a,lang).map(v=>`<li>${external(v.url,v.label)}</li>`).join('')}</ul></section>
<nav class="ranking-back" aria-label="${en?'More comparisons':'Другие сравнения'}"><a class="button outline" href="${route(lang,c.id)}">${esc(c[lang])} →</a><a class="text-link" href="${route(lang)}">${en?'All rankings':'Все рейтинги'} →</a></nav>
</div></article></main>`;
  save(path,shell({lang,path,equivalent:articleRoute(a,en?'ru':'en'),title:t.seoTitle,description:t.description,body,graph:articleSchema(a,lang),crumbs:breadcrumbs(lang,path,c,a),article:a}));
}
for(const lang of ['ru','en']){buildIndex(lang);for(const c of categories)buildCategory(c,lang);for(const a of articles)buildArticle(a,lang);}
// Only this generator owns these two new route trees. Remove obsolete generated
// files so a removed/renamed input cannot leave a second public copy behind.
function clean(dir){if(!existsSync(dir))return;for(const e of readdirSync(dir,{withFileTypes:true})){const p=resolve(dir,e.name);if(e.isDirectory())clean(p);else if(e.name==='index.html'&&!rendered.has(p)&&readFileSync(p,'utf8').includes('Generated from src/data/rankings/articles/'))rmSync(p);}}
clean(resolve(ROOT,'rankings'));clean(resolve(ROOT,'en/rankings'));
console.log(`Rankings: ${articles.length} bilingual articles; ${categories.length} categories; ${rendered.size} generated pages.`);
