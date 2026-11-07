// Canonical public commercial terms. Update amounts here before refreshing images.
// Sources: the 19 approved GAEO service images, 2026-11-07, and Alexey's task.
export const PRICES = Object.freeze({free:0,audit:29900,geo:79900,content:99900,guarantee:114900,development:69900,platform:10000,prompts:10000});
export const BASE_PLATFORMS=5;
export const BASE_PROMPTS=50;
export const PROMPT_BLOCK=10;
export const UPDATED='2026-11-07';
// Agreed by Alexey in this task: cumulative targets relative to the initial BMR.
export const GUARANTEE_TARGETS=[{month:1,points:5},{month:2,points:10},{month:3,points:15}];
export const platforms=[
 ['chatgpt','ChatGPT',7],['alice','Алиса',6],['yandex-alice','Яндекс с Алисой',17],
 ['google-ai-overviews','Google AI Overviews',10],['google-ai-mode','Google AI Mode',9],
 ['gemini','Gemini',8],['perplexity','Perplexity',12],['deepseek','DeepSeek',11],
 ['grok','Grok',5],['gigachat','GigaChat',13],['copilot','Microsoft Copilot',14],
 ['qwen','Qwen',15],['claude','Claude',16]
].map(([id,name,image])=>({id,name,nameEn:id==='alice'?'Alice':id==='yandex-alice'?'Yandex with Alice':name,image}));
const records=[
 {id:'free',slug:'free-audit',image:4,amount:PRICES.free,kind:'once',from:false,
  ru:{name:'Бесплатный мини-аудит',summary:'Первый взгляд на видимость бренда и точки роста.',items:['До 5 промптов и до 5 нейросетей','До 3 страниц с выводами','1 рабочий день после получения данных'],cta:'Получить мини-аудит'},
  en:{name:'Free mini-audit',summary:'An initial look at your brand visibility and opportunities.',items:['Up to 5 prompts and up to 5 AI platforms','Up to 3 pages of findings','1 business day after receiving the inputs'],cta:'Get a mini-audit'}},
 {id:'audit',slug:'geo-audit',image:3,amount:PRICES.audit,kind:'once',from:false,
  ru:{name:'Полный GEO-аудит',summary:'Диагностика, разбор конкурентов и план работ.',items:['До 100 промптов и до 11 нейросетей','Отчет на 25–35 страницах','Погружение в бизнес и план GEO-работ','3–5 рабочих дней после получения данных'],cta:'Заказать аудит'},
  en:{name:'Full GEO audit',summary:'Diagnosis, competitor analysis and an action plan.',items:['Up to 100 prompts and 11 AI platforms','A 25–35-page report','Business review and a GEO action plan','3–5 business days after receiving the inputs'],cta:'Request an audit'}},
 {id:'geo',slug:'geo-promotion',image:18,amount:PRICES.geo,kind:'monthly',from:true,
  ru:{name:'GEO-продвижение',summary:'Веду стратегию; ваша команда внедряет ТЗ на сайт и контент.',items:['От 50 промптов и от 5 нейросетей','Карта интентов и ТЗ на доработки сайта','ТЗ на экспертный контент','Дистрибуция, ссылки и репутация','Отчетность 1 раз в месяц','Предоплата за текущий месяц'],cta:'Обсудить продвижение'},
  en:{name:'GEO promotion',summary:'I lead the strategy; your team implements website and content specifications.',items:['From 50 prompts and 5 AI platforms','Intent map and website specifications','Expert content briefs','Distribution, links and reputation','Monthly reporting','Prepayment for the current month'],cta:'Discuss GEO promotion'}},
 {id:'content',slug:'geo-content',image:19,amount:PRICES.content,kind:'monthly',from:true,
  ru:{name:'GEO + контент',summary:'Изучаю ваш продукт, создаю контент и организую публикации.',items:['Все работы базового GEO-продвижения','От 50 промптов и от 5 нейросетей','Создание экспертного контента','Организация публикаций и дистрибуция','Сам дорабатываю сайт или готовлю ТЗ для вашей команды','Предоплата за текущий месяц'],cta:'Обсудить GEO + контент'},
  en:{name:'GEO + content',summary:'I study your product, create the content and organize publication.',items:['All core GEO promotion activities','From 50 prompts and 5 AI platforms','Expert content creation','Publication and distribution','I implement website changes or provide specifications','Prepayment for the current month'],cta:'Discuss GEO + content'}},
 {id:'guarantee',slug:'geo-guarantee',image:2,amount:PRICES.guarantee,kind:'monthly',from:true,
  ru:{name:'GEO с финансовыми гарантиями',summary:'Цели BMR по договору: старт +5 / +10 / +15 п.п. за 1 / 2 / 3 месяца.',items:['От 50 промптов и от 5 нейросетей','Сам внедряю и дорабатываю сайт, создаю контент','Цели BMR: старт +5 / +10 / +15 п.п.','50% фикс + 50% премия при целевом BMR','Сопоставимые замеры и отчет каждый месяц'],cta:'Обсудить условия'},
  en:{name:'GEO with financial guarantees',summary:'Contractual BMR targets: baseline +5 / +10 / +15 percentage points in months 1 / 2 / 3.',items:['From 50 prompts and 5 AI platforms','I implement and improve the website, and create content','BMR targets: baseline +5 / +10 / +15 pp','50% fixed + 50% bonus at the target BMR','Comparable measurements and monthly reporting'],cta:'Discuss the terms'}},
 {id:'development',slug:'website-development',image:1,amount:PRICES.development,kind:'once',from:true,
  ru:{name:'Разработка сайта',summary:'Создание и перенос сайта с учетом SEO, GEO и AEO.',items:['GitHub Pages + Astro','Перенос контента и техническое SEO','Управление голосом и задания по расписанию','Заявки на почту и в Telegram','Состав проекта и автоматизацию согласуем'],cta:'Обсудить сайт'},
  en:{name:'Website development',summary:'Build or migrate a website with SEO, GEO and AEO in mind.',items:['GitHub Pages + Astro','Content migration and technical SEO','Voice-driven management and scheduled tasks','Email and Telegram inquiries','Project scope and automation agreed in advance'],cta:'Discuss a website'}}
];
const extras=[
 {id:'platform',slug:'additional-platforms',amount:PRICES.platform,kind:'monthly',from:false,
  ru:{name:'Дополнительные нейросети',summary:'Для 6-й и каждой следующей нейросети сверх 5 в базовом наборе.',items:['13 нейросетей и интерфейсов на выбор','Оптимизация и мониторинг выбранного направления','Подключается к тарифу продвижения'],cta:'Выбрать нейросети'},
  en:{name:'Additional AI platforms',summary:'For the 6th and each additional platform beyond the 5 included.',items:['Choose from 13 AI platforms and interfaces','Optimization and monitoring for the chosen platform','Added to a monthly GEO plan'],cta:'Choose platforms'}},
 {id:'prompts',slug:'additional-prompts',amount:PRICES.prompts,kind:'monthly',from:false,
  ru:{name:'Еще 10 запросов',summary:'Пакет из 10 промптов сверх базовых 50.',items:['Дополнительные интенты и формулировки','Мониторинг в согласованном наборе нейросетей','Подключается к тарифу продвижения'],cta:'Расширить запросы'},
  en:{name:'10 additional prompts',summary:'A block of 10 prompts beyond the base 50.',items:['Additional intents and query formulations','Monitoring in the agreed platform set','Added to a monthly GEO plan'],cta:'Extend the prompt set'}}
];
export const planIds=records.map(p=>p.id);
export const optionIds=extras.map(p=>p.id);
export function allPlans(lang='ru'){return [...records,...extras].map(p=>({...p,...p[lang],href:serviceHref(p.slug,lang)}));}
export function getPlan(id,lang='ru'){return allPlans(lang).find(p=>p.id===id||p.slug===id);}
export function serviceHref(slug,lang='ru'){return (lang==='en'?'/en':'')+'/services/'+slug+'/';}
export function pricingHref(lang='ru'){return lang==='en'?'/en/pricing/':'/tarify/';}
export function money(amount,lang='ru'){return lang==='en'?'RUB '+new Intl.NumberFormat('en-US').format(amount):new Intl.NumberFormat('ru-RU').format(amount)+' ₽';}
export function priceLabel(p,lang='ru'){
 if(p.id==='free')return lang==='en'?'Free':'Бесплатно';
 return (p.from?(lang==='en'?'from ':'от '):optionIds.includes(p.id)?'+':'')+money(p.amount,lang)+(p.kind==='monthly'?(lang==='en'?'/month':'/мес.'):'');
}
export function imagePath(number,size=480){return '/assets/tariffs/services/'+String(number).padStart(2,'0')+'-'+size+'.webp';}
export function quote(planId,selectedIds=[],blocks=0){
 const plan=getPlan(planId);if(!plan||plan.kind!=='monthly'||optionIds.includes(plan.id))throw Error('Select a monthly plan');
 const allowed=new Set(platforms.map(p=>p.id));
 const selected=[...new Set(selectedIds)].filter(id=>allowed.has(id));
 const count=Math.max(0,Math.min(100,Math.trunc(Number(blocks)||0)));
 const additional=Math.max(0,selected.length-BASE_PLATFORMS);
 return {base:plan.amount,additionalPlatforms:additional,platformAmount:additional*PRICES.platform,promptBlocks:count,promptAmount:count*PRICES.prompts,prompts:BASE_PROMPTS+PROMPT_BLOCK*count,total:plan.amount+additional*PRICES.platform+count*PRICES.prompts};
}
export function offerNode(id,lang='ru'){
 const p=getPlan(id,lang),url='https://gaeo.ru'+p.href;
 const specification={'@type':p.kind==='monthly'?'UnitPriceSpecification':'PriceSpecification',[p.from?'minPrice':'price']:p.amount,priceCurrency:'RUB'};
 if(p.kind==='monthly')Object.assign(specification,{unitText:lang==='en'?'month':'месяц',referenceQuantity:{'@type':'QuantitativeValue',value:1,unitCode:'MON'}});
 return {'@type':'Offer','@id':url+'#offer',url,name:p.name,description:p.summary,priceSpecification:specification,seller:{'@id':'https://gaeo.ru/#business'},itemOffered:{'@id':url+'#service'}};
}
export function serviceNodes(id,lang='ru'){
 const p=getPlan(id,lang),url='https://gaeo.ru'+p.href;
 return [{'@type':'Service','@id':url+'#service',url,name:p.name,description:p.summary+' '+p.items.join('. '),serviceType:p.name,provider:{'@id':'https://gaeo.ru/#business'},offers:{'@id':url+'#offer'}},offerNode(id,lang)];
}
export function pricingGraph(lang='ru'){
 const all=allPlans(lang),url='https://gaeo.ru'+pricingHref(lang);
 return {'@context':'https://schema.org','@graph':[
  {'@type':'OfferCatalog','@id':url+'#catalog',name:lang==='en'?'GAEO services and pricing':'Услуги и тарифы GAEO',url,itemListElement:all.map(p=>({'@id':'https://gaeo.ru'+p.href+'#offer'}))},
  ...all.flatMap(p=>serviceNodes(p.id,lang))
 ]};
}
