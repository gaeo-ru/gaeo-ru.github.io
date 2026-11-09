/**
 * GAEO Phase 3E: 3 original RU/EN buyer-intent verification guides.
 * Stable catalogue IDs 1,19,39 continue to use their existing broader commercial
 * pages. These are practical editorial methods, not new commercial landings,
 * newly measured AI results, legal opinions, or client performance claims.
 */
const sec=(title,p,bullets=[])=>({title,p:Array.isArray(p)?p:[p],bullets});
const faq=(q,a)=>({q,a});
const page=(h1,description,lead,summary,sections,faqItems)=>({
 title:h1+' | GAEO',h1,description,lead,summary,sections,faq:faqItems,
 eyebrow:'GEO / AEO · проверка коммерческих интентов'
});
function method(id,key,slug,landing,sources,relatedMethods,ru,en) {
 const routes={method:{ru:'/strategies/'+slug+'/',en:'/en/strategies/'+slug+'/'},
  hub:{ru:landing.ru.route,en:landing.en.route}};
 return {id,ids:[id],key,methodOnly:true,routes,sources,relatedMethods,
  relatedServices:[{id,routes:routes.hub,content:{
   ru:{h1:landing.ru.name,lead:landing.ru.lead},
   en:{h1:landing.en.name,lead:landing.en.lead}
  }}],ru:{method:ru},en:{method:en}};
}
export const phase3EIntents=[
 method(1,'developer-project-intents','developer-project-evidence-checklist',{
  ru:{route:'/geo-prodvizhenie-nedvizhimosti/',name:'GEO-продвижение недвижимости и девелоперов',lead:'Действующая коммерческая страница GAEO для жилых комплексов и застройщиков, с отраслевым аудитом и тарифами.'},
  en:{route:'/en/geo-for-real-estate/',name:'GEO for real estate developers',lead:'The existing GAEO commercial page for real estate GEO services, baseline audits and pricing.'}
 },[
  {url:'https://xn--80az8a.xn--d1aqf.xn--p1ai/',ru:'ЕИСЖС «наш.дом.рф»: сведения о проектах, застройщиках и проектных декларациях',en:'Official unified housing construction information system: projects, developers and declarations'},
  {url:'https://www.consultant.ru/document/cons_doc_LAW_51038/a9d2c9fd3a6b153a7b2094a93824ee93f1ed2881/',ru:'214-ФЗ, статья 19: состав и публикация проектной декларации',en:'Federal Law 214-FZ, Article 19: project declaration obligations'}
 ],{
  ru:[{href:'/articles/strategiya-geo-prodvizheniya-nedvizhimosti/',label:'Ранее опубликованная стратегия GEO для недвижимости'}],
  en:[{href:'/en/articles/geo-for-real-estate/',label:'Existing real-estate GEO strategy and pre-audit'}]
 },
 page(
  'ЖК в ответах нейросетей: как проверить застройщика, корпус и реальные условия покупки',
  'Матрица проверки рекомендаций жилых комплексов: застройщик, корпус, сроки, проектная декларация, цена и источники. Практика GEO без выдуманных замеров.',
  'Покупатель ищет квартиру по району, бюджету, планировке и сроку переезда. Для ответа нейросети важно не спутать бренд девелопера, конкретный ЖК и корпус: у этих сущностей бывают разные юридические лица, условия продажи и сроки.',
  'Проверяем не только появление названия ЖК, но и точное соответствие объекта вопросу покупателя: адрес, корпус, проектная декларация, актуальность предложения и оговорки.',
  [
   sec('Разные сущности: девелопер, застройщик, ЖК, корпус и квартира',[
    'В публичном описании недвижимости слова «девелопер» и «застройщик» часто стоят рядом, но юридически обязательства по проекту нужно связывать с конкретным лицом и объектом. Торговое название жилого комплекса не заменяет разрешение на строительство или проектную декларацию. При разборе нейроответа сохраняю идентификатор корпуса, адрес и дату источника.',
    'Ответ «проект X сдается в этом году» нельзя считать точным, если у комплекса несколько очередей. Для покупателя имеет значение его корпус и предусмотренный договором срок передачи, а не усредненный срок по бренду.'
   ],[
    'Бренд девелопера и юридическое лицо застройщика фиксируются раздельно.',
    'ЖК, очередь, корпус и конкретное предложение имеют собственные идентификаторы.',
    'Для сроков указываются дата документа, плановый ввод и передача, где это применимо.',
    'Изменение цены или доступности лота требует нового источника и даты.'
   ]),
   sec('Отбор запросов: 5 сценариев, которые нельзя свести к узнаваемости бренда',[
    'До замера составляется небольшой набор небрендовых вопросов, на которые потенциальный покупатель ожидает конкретный ответ. Бюджет, район, статус строительства, метраж и срок переезда задают ограничения. В брендовой группе отдельно проверяется, насколько корректно нейросеть описывает уже названный жилой комплекс.',
    'Ниже примеры формулировок для проектирования матрицы, а не данные проведенного исследования. Их следует адаптировать к реальным проектам и актуальным предложениям.'
   ],[
    'Какие строящиеся ЖК в нужном районе подходят семье с ребенком при заданном бюджете?',
    'Какие корпуса выбранного проекта заявлены к передаче до определенного месяца?',
    'Какие новостройки рядом с нужным маршрутом общественного транспорта имеют подходящую планировку?',
    'Чем отличаются 2 конкретных корпуса по срокам, составу проекта и предложениям?',
    'Где проверить юридическое лицо, проектную декларацию и ход строительства названного объекта?'
   ]),
   sec('Первичный источник: ЕИСЖС и проектная декларация',[
    'Для объектов, подпадающих под соответствующий режим 214-ФЗ, ЕИСЖС «наш.дом.рф» содержит материалы о строительстве. Статья 19 закона описывает проектную декларацию. Эти источники позволяют проверить заявленные сведения, но их наличие не доказывает качество отделки, фактическую транспортную доступность или выполнение обещаний конкретной рекламной страницы.',
    'При расхождении между маркетинговым текстом и опубликованной декларацией нужен разбор текущей редакции и содержания договора. Статус «проверено» присваивается отдельному факту, с датой и документом, а не всему проекту разом.'
   ],[
    'Найти точный объект и юридическое лицо, а не только рекламное имя.',
    'Сверить актуальную редакцию декларации и при необходимости историю изменений.',
    'Отдельно проверить заявленные сроки, характеристики и документы по конкретному корпусу.',
    'Записать, какие сведения относятся к плану, а какие уже подтверждены фактом.'
   ]),
   sec('Паспорт утверждения на странице: что нейросеть может сопоставить',[
    'Страница ЖК должна помогать человеку самостоятельно проверить информацию. Я выделяю устойчивые сведения: местоположение, тип объекта, разрешения, корпус, планировки и источники. Динамические поля: доступность, цена, условия программы финансирования, сроки предложения - выводятся с датой актуальности.',
    'Наличие Schema.org само по себе не заменяет эти данные. Разметку следует согласовывать с тем, что посетитель действительно видит на странице; не указывать неподтвержденные Offer, рейтинг или срок.'
   ],[
    'Название проекта и альтернативные написания; адрес и точка на карте.',
    'Корпус, этап, юридическое лицо и ссылка на проверяемую документацию.',
    'Актуальные характеристики лота с источником и датой.',
    'Граница применимости: проектная информация, предложение продавца, оценка района.'
   ]),
   sec('Классификация ответа нейросети: 4 разных исхода',[
    'Один ответ может содержать название девелопера, но не рекомендовать нужный корпус. Для каждой пары «промпт × нейросеть» сохраняются полный ответ и ссылки на использованные источники. Упоминание бренда, корректная рекомендация проекта, рекомендация не того корпуса и существенная ошибка учитываются раздельно.',
    'Для динамики BMR фиксируют исходный набор вопросов и число реально полученных ответов. Последующая смена проекта, корпуса или состава выборки образует отдельную серию. Без повторного сопоставимого замера рост рекомендации не заявляется.'
   ],[
    'Упоминание только бренда застройщика.',
    'Релевантная рекомендация конкретного ЖК или корпуса по условиям вопроса.',
    'Название найдено, но сроки, местоположение или объект перепутаны.',
    'Ответ отсутствует, либо факт нельзя подтвердить на заданную дату.'
   ]),
   sec('Когда нужен отдельный материал, а когда достаточно действующей посадочной',[
    'Коммерческая страница GAEO о недвижимости уже описывает работу с девелоперами и содержит актуальные общие тарифы. Этот материал решает другую задачу: дает покупателю и маркетологу протокол проверки конкретного строящегося объекта. Он не выдается за новую специализированную услугу или за дополнительный клиентский кейс.',
    'Для нового коммерческого URL по застройщикам потребовалось бы подтвердить отдельный устойчивый поисковый интент и фактуру, отличающую его от действующей отраслевой страницы. Пока разумнее расширять доказательную структуру существующего хаба.'
   ])
  ],[
   faq('Упоминание девелопера означает рекомендацию конкретного ЖК?','Нет. Нужно проверить, назван ли именно подходящий проект или корпус и соответствует ли он бюджету, сроку и географии вопроса.'),
   faq('Можно ли считать сроки из рекламного объявления подтвержденными?','Только после проверки их источника и актуальности. Для применимых строящихся объектов сверяются ЕИСЖС, проектная декларация и относящиеся к сделке документы.'),
   faq('Что делать, если у ЖК несколько очередей?','Собирать отдельные сущности по корпусам и этапам. Утверждения о сроках и наличии квартир должны относиться к нужной очереди, а не к названию комплекса в целом.'),
   faq('Нужен ли новый тариф GEO для застройщиков?','Нет. У GAEO действует единая ценовая модель и коммерческая страница по недвижимости. Этот материал дополняет проверку отраслевой фактуры.'),
   faq('Доказывает ли этот текст, что GAEO улучшил рекомендации конкретного ЖК?','Нет. Это практическая методика, а не новый результат клиента. Опубликованный предаудит недвижимости имеет собственные дату, выборку и ограничения.')
  ]),
 {
  title:'Verifying residential projects in AI answers: developer, building, schedule and purchase terms | GAEO',
  h1:'Verifying residential projects in AI answers: developer, building, schedule and purchase terms',
  description:'Practical residential GEO evidence checklist: developer identity, building, deadlines, statutory declarations and current offers without invented performance outcomes.',
  lead:'Homebuyers ask about a district, budget, layout and move-in date. An AI answer can confuse the property brand, the legal developer, the individual building and a specific apartment. Each can have different documents and delivery dates.',
  summary:'A useful recommendation should match the buyer question to a specific project and building, with evidence for location, timeline, declaration and offer recency.',
  sections:[
   sec('Separate the development brand, legal entity, building and unit',[
    'A marketing brand can cover multiple construction stages. Project obligations should be checked against the relevant legal entity and documentation, rather than being inferred from a shared logo. Store building identifiers, address and source dates along with the AI response.',
    'Saying that an entire development will be ready this year is misleading when individual stages have different schedules. The buyer needs the date associated with the selected building and contractual delivery conditions.'
   ],['Keep developer brand and legal project entity as different fields.','Record project, construction stage, building and offer identifiers.','Distinguish planned completion from applicable handover terms.','Attach a source date to availability and price statements.']),
   sec('Five unbranded purchase-intent examples',[
    'Build a baseline from real constraints: district, budget, transport, layout, delivery date and household needs. Keep prompts mentioning the project name in a separate branded group.',
    'These are examples for designing a test set, not answers from a completed AI measurement.'
   ],['Which new developments in this district fit a family and this budget?','Which buildings are scheduled for handover by a specified month?','What developments near a particular transit corridor offer the requested layout?','How do two buildings compare on dates, specification and available units?','Where can I verify the declaration and legal developer of this project?']),
   sec('Housing construction information and declarations',[
    'For projects subject to the applicable Russian shared-construction legislation, the official housing information system publishes construction materials. Article 19 of Federal Law 214-FZ covers project declarations. A published declaration does not independently certify marketing promises about finishing quality or travel times.',
    'When descriptions disagree, inspect the current declaration, change history and the actual transaction documents. Verify each claim against its own source rather than applying a blanket verified status to a development.'
   ],['Find the exact legal entity and building.','Review the current declaration and relevant amendments.','Match dates and characteristics to the specific stage.','Distinguish projected plans from completed outcomes.']),
   sec('A fact passport suitable for buyers and AI retrieval',[
    'A project page should expose stable facts, such as location, project identity, construction status and documentation, separately from fast-changing offers. Unit prices, stock and financing terms require a dated source.',
    'Structured data must correspond to information actually visible to visitors. Do not add fabricated offers, ratings or delivery dates merely to populate Schema.org.'
   ],['Project identity and address.','Building, stage, legal developer and documents.','Offer fields with update date and evidence.','The difference between official project facts and third-party neighbourhood opinions.']),
   sec('Four different outcomes from an AI response',[
    'A brand mention is not the same as a relevant building recommendation. Record the full output, cited sources and a manual assessment for each prompt and AI interface.',
    'For BMR changes, keep the same prompt set, response denominator and classification rules. A new building or a changed test panel creates a different sample, not evidence of an automatic improvement.'
   ],['Developer brand mentioned only.','Correct project or building recommended.','Project named but factual entity or deadline confused.','Answer absent or claim not verifiable at the tested date.']),
   sec('Editorial guide, not a duplicate commercial landing',[
    'GAEO already has a bilingual real-estate service page and standard pricing. This guide adds a verification protocol for a specific project; it is neither a new service tariff nor evidence of a newly completed client project.',
    'Any future narrower commercial page should be justified by genuinely distinct buyer demand and additional verifiable facts.'
   ])
  ],
  faq:[
   faq('Does naming the developer mean an AI service recommends the building?','No. The answer must refer to the relevant project or building and match the location, budget and date requirements.'),
   faq('Can a marketing completion date be treated as verified?','Only after checking its current supporting source and the documents applicable to the specific building and transaction.'),
   faq('How should multi-stage developments be evaluated?','Treat each stage and building as a separate entity for deadlines, specifications and offers.'),
   faq('Does GAEO need a new developer pricing plan?','No. The existing real-estate service and common pricing remain the commercial source.'),
   faq('Is this guide proof of increased AI recommendations?','No. It provides an evidence method, not a newly measured client outcome.')
  ],
  eyebrow:'GEO / AEO · buyer intent evidence'
 }),
 method(19,'b2b-legal-matter-fit','b2b-law-firm-matter-fit',{
  ru:{route:'/industries/legal/',name:'GEO-продвижение юридических компаний',lead:'Действующая отраслевая страница GAEO для юридических услуг, профессиональных сведений и тарифов.'},
  en:{route:'/en/industries/legal/',name:'GEO for law firms and legal practices',lead:'The existing commercial guide for legal-service GEO, proof and pricing.'}
 },[
  {url:'https://minjust.gov.ru/ru/pages/advokaty-rossijskoj-federacii/',ru:'Минюст России: единый государственный реестр адвокатов',en:'Russian Ministry of Justice: unified official register of advocates'},
  {url:'https://minjust.gov.ru/ru/documents/7885/',ru:'63-ФЗ об адвокатской деятельности, включая нормы о реестре',en:'Federal Law 63-FZ on the legal profession and the advocate register'},
  {url:'https://www.nalog.gov.ru/rn77/related_activities/registries/egrul/',ru:'ФНС: сведения ЕГРЮЛ и ЕГРИП для проверки юридического лица',en:'Federal Tax Service: legal entity and sole trader registries'}
 ],{
  ru:[{href:'/strategies/legal-recommendations/',label:'Общая методика измерения рекомендаций юридических фирм'},{href:'/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/',label:'12 проверок сайта юридической компании'}],
  en:[{href:'/en/strategies/legal-recommendations/',label:'Existing methodology for law-firm recommendations'},{href:'/en/articles/legal-website-geo-12-checks/',label:'Twelve checks for a legal-services website'}]
 },
 page(
  'Как нейросети выбирают юридическую фирму для бизнеса: дело, полномочия и проверяемая практика',
  'Практическая матрица GEO для B2B-юристов: задачи компании, отрасль, статус адвоката, полномочия, договор и источники без вымышленных результатов.',
  'Компания ищет юридического советника по конкретной сделке или спору, а не самого известного юриста вообще. Ответ нейросети должен соотнести правовую задачу со специализацией исполнителя, регионом, договорной моделью и проверяемой практикой.',
  'Проверяем соответствие юридической фирмы конкретному делу: компетенцию, команду, статус заявленных адвокатов, применимость опыта и условия взаимодействия.',
  [
   sec('От общего рейтинга юристов к предмету дела',[
    'Покупатель юридической услуги для бизнеса приходит с ограничениями: стадией спора, сроком, юрисдикцией, суммой риска, спецификой отрасли. Эти признаки должны входить в исходный запрос. Общая популярность фирмы не говорит, может ли она вести конкретный налоговый спор или сопровождать международную сделку.',
    'Я разделяю выбор юридической компании, отдельного специалиста и конкретной команды под проект. Ответ может назвать фирму правильно, но ошибиться со специализацией партнера; такая рекомендация требует уточнения.'
   ],[
    'Тип дела: договор, корпоративный конфликт, налоги, несостоятельность, сопровождение сделки.',
    'Роль исполнителя: консультация, представительство, досудебный этап, судебное сопровождение.',
    'Юрисдикция и география работы; возможность дистанционного взаимодействия.',
    'Требования к конфиденциальности, конфликту интересов и документам.'
   ]),
   sec('Примеры 5 небрендовых клиентских запросов',[
    'Вопросы ниже представляют проектную матрицу. Они не являются результатами выполненного замера нейросетей. В реальном аудите формулировки согласуются с типом клиентов и услугами конкретной фирмы.',
    'Вопрос «назови лучших юристов» полезен как контрольный, но не заменяет специализированных запросов, по которым руководитель выбирает исполнителя.'
   ],[
    'Какие фирмы сопровождают покупку доли в российском ООО и проверяют корпоративные ограничения?',
    'Кому поручить спор с поставщиком в конкретном регионе с указанной стадией процесса?',
    'Как выбрать налогового консультанта для подготовки к выездной проверке?',
    'Кто консультирует по рискам субсидиарной ответственности руководителя компании?',
    'Как проверить статус адвоката и юридическое лицо предложенной нейросетью фирмы?'
   ]),
   sec('Реестр адвокатов и сведения о юридическом лице',[
    'Термин «юрист» не равен юридически регулируемому статусу «адвокат». Если компания заявляет статус конкретного адвоката, проверяем открытые сведения реестра Минюста на момент обращения. Общие ссылки на закон или реестр не подтверждают конкретного человека без поиска по записи.',
    'Организационную идентичность юридической фирмы можно сопоставить с официальными сведениями ФНС. Это проверка существования и реквизитов, но не гарантия добросовестности, победы в суде или квалификации каждого сотрудника.'
   ],[
    'Сопоставить полное название, ИНН/ОГРН, домен и контактные данные.',
    'При заявлении статуса адвоката проверить применимую запись в государственном реестре.',
    'Отделить адвокатские полномочия от общего юридического консалтинга.',
    'Не выводить из существования записи обещаний результата дела.'
   ]),
   sec('Как показывать практику без раскрытия клиентских тайн',[
    'Кейс может описывать тип задачи, роль исполнителя, процесс работы и проверяемый исход, но только в допустимом объеме. Наличие судебного акта в открытом источнике не означает автоматического разрешения раскрывать коммерческие подробности клиента или все условия договора.',
    'Если публикация опыта не согласована, на сайте лучше детально раскрыть процесс: квалификация команды, отраслевые компетенции, предмет договора, типичные документы и способ взаимодействия. Не приписывать фирме неизвестные выигранные дела.'
   ],[
    'Точно обозначить роль фирмы: консультант, представитель, внешний эксперт.',
    'Указать стадию дела и дату, если раскрытие разрешено.',
    'Отделить публичную судебную информацию от закрытых документов клиента.',
    'Подтвердить право использовать имя компании, результат и цитаты.'
   ]),
   sec('Как оценить качество самой рекомендации',[
    'Упоминание бренда без основания выбора и проверенной специализации не считается полноценной квалифицированной рекомендацией. В оценке записываю: названа ли компания, как обосновано ее соответствие делу, не перепутаны ли статусы и какие источники приведены.',
    'Сравнимый GEO-замер использует одинаковые промпты и нейросети, а результаты соотносятся с фактически полученными ответами. Для незавершенных или спорных ответов нужны отдельные категории; нельзя включать их как успешные рекомендации без проверки.'
   ],[
    'Брендовая узнаваемость фирмы.',
    'Небрендовое упоминание по конкретному виду дела.',
    'Обоснованная рекомендация с корректной специализацией.',
    'Недоказанный статус, ошибочная юрисдикция или придуманная судебная практика.'
   ]),
   sec('Что проверяет GAEO и чего эта методика не обещает',[
    'На действующей отраслевой странице GAEO представлены форматы аудита и сопровождения юридического бизнеса. Эта статья дополняет ее предметной матрицей выбора B2B-практики и проверкой статуса, не создает новую коммерческую специализацию №19.',
    'Опубликованные материалы о юридическом GEO и диагностике описывают методики. Эта страница не является подтверждением новых клиентских внедрений, выигранных дел или роста BMR.'
   ])
  ],[
   faq('Как проверить, подходит ли юридическая фирма для конкретного спора?','Сопоставить вид дела, стадию, юрисдикцию, команду и заявленную практику с проверяемыми материалами фирмы.'),
   faq('Любой юрист должен состоять в реестре адвокатов?','Нет. Реестр Минюста относится к адвокатам. Для юристов без такого статуса применяются другие способы проверки квалификации и юридического лица.'),
   faq('Можно ли использовать судебное решение в GEO-кейсе фирмы?','Только с учетом допустимого раскрытия и роли фирмы. Открытый судебный документ не дает права публиковать все закрытые сведения клиента.'),
   faq('Как считать рекомендации юридических фирм в нейросетях?','Отдельно фиксировать упоминание, корректную рекомендацию под задачу и фактические ошибки; сравнивать неизменную выборку вопросов.'),
   faq('Доказан ли здесь рост рекомендаций GAEO для клиента?','Нет. Это аналитическая методика проверки B2B-интентов и источников, без нового клиентского результата.')
  ]),
 {
  title:'How AI selects a B2B law firm: matter fit, authority and verifiable expertise | GAEO',
  h1:'How AI selects a B2B law firm: matter fit, authority and verifiable expertise',
  description:'A practical B2B legal GEO matrix covering corporate disputes, representation, advocate status, legal entity verification and confidentiality.',
  lead:'A business seeks counsel for a specific matter, not necessarily the most famous lawyer. A reliable AI recommendation should align the assignment with expertise, jurisdiction, team capacity and supported claims.',
  summary:'Evaluate a law firm against the actual matter: service scope, named practitioners, any claimed advocate status, applicable experience and engagement terms.',
  sections:[
   sec('Start with the matter, not a generic league table',[
    'A corporate buyer brings constraints: dispute stage, jurisdiction, risk exposure, timing and industry. A broad reputation score does not prove that a provider can handle a particular tax matter or transaction.',
    'Distinguish the law firm, an individual practitioner and the team responsible for the engagement. An answer can correctly identify the firm but invent a specialization for a partner.'
   ],['Matter: contracts, corporate disputes, taxation, insolvency or M&A.','Role: advisory, representation, negotiation or litigation.','Jurisdiction and geography; remote versus on-site execution.','Conflicts, confidentiality and engagement documentation.']),
   sec('Five example unbranded business questions',[
    'These prompts are templates for a future audit, not outputs of a performed test. Adapt each to the firm actual services and clients.',
    'A generic best-lawyers query can be a benchmark, but a decision-maker needs qualified recommendations for particular matters.'
   ],['Which firms advise on buying a stake in a Russian company and related corporate restrictions?','Who can represent a supplier in a contract dispute at the current procedural stage?','How should a company choose tax counsel for an upcoming audit?','Who advises directors on potential subsidiary liability?','How can I verify the legal entity and claimed advocate status of a suggested firm?']),
   sec('The advocate register and legal entity data',[
    'In Russia the general term lawyer and the regulated status of advocate are not interchangeable. If a practitioner claims advocate status, check an applicable public record in the Ministry of Justice register rather than assuming it from a job title.',
    'Federal Tax Service registries can corroborate the legal entity. Such checks do not establish litigation skill, integrity or guaranteed success.'
   ],['Match registered legal name and identifiers to the website.','Check advocate status only when it is specifically claimed.','Separate regulated advocacy from general consultancy.','Do not infer case outcomes from a registry entry.']),
   sec('Evidence of practice without breaching confidentiality',[
    'A matter description may disclose the scope, role and an authorized outcome. Public case documents do not necessarily permit disclosure of privileged client materials or the terms of a private engagement.',
    'Where permission is absent, describe the service workflow, team qualifications, engagement boundaries and public professional materials without fabricating case wins.'
   ],['Explain the provider actual role in the engagement.','Disclose client, date and outcome only when permitted.','Distinguish court-public information from confidential business data.','Verify permission to use names, quotations and results.']),
   sec('Rate the recommendation, not merely the mention',[
    'A firm name in an answer does not prove a qualified recommendation. Record whether the provider fits the matter, whether the stated professional status is correct and which sources support the choice.',
    'For repeated GEO measurement, keep the same prompts, interfaces and denominator. Ambiguous and failed answers need explicit handling instead of being counted as successes.'
   ],['Branded recognition.','Unbranded mention for a defined legal matter.','Qualified recommendation with supported practice fit.','Incorrect status, jurisdiction or fabricated case experience.']),
   sec('An editorial method alongside the existing GEO service',[
    'GAEO already maintains a bilingual legal-services commercial page and pricing. This guide addresses a narrower question about evidence and buyer qualification.',
    'It does not claim a new client engagement, a litigation result or a measured improvement in law-firm recommendations.'
   ])
  ],
  faq:[
   faq('How should a company assess law-firm fit?','Match the matter, procedure, jurisdiction, named team and verifiable scope of work.'),
   faq('Must every legal consultant appear in the advocates register?','No. The register concerns people with advocate status; other legal service providers require appropriate alternative checks.'),
   faq('Can a court decision be reused freely in a client case study?','Publication requires attention to client confidentiality, role and disclosure rights beyond the public status of the decision.'),
   faq('How can law-firm AI recommendations be measured?','Track mentions, verified matter fit and errors separately, using a stable set of prompts and interfaces.'),
   faq('Does this demonstrate new client results?','No. It is a buyer-intent evidence framework without newly claimed client outcomes.')
  ],
  eyebrow:'GEO / AEO · buyer intent evidence'
 }),
 method(39,'load-test-vendor-evidence','load-testing-vendor-proof',{
  ru:{route:'/industries/highload-it/',name:'GEO-продвижение технических IT-подрядчиков',lead:'Действующая коммерческая страница GAEO для ускорения сайтов, highload и технических услуг.'},
  en:{route:'/en/industries/highload-it/',name:'GEO for technical IT service providers',lead:'The existing GAEO highload and technical B2B service page.'}
 },[
  {url:'https://developers.google.com/search/docs/appearance/core-web-vitals',ru:'Google Search Central: Core Web Vitals, LCP, INP и CLS',en:'Google Search Central: Core Web Vitals (LCP, INP, CLS)'},
  {url:'https://grafana.com/docs/k6/latest/testing-guides/load-testing-websites/',ru:'Grafana k6: подходы к нагрузочному тестированию сайтов',en:'Grafana k6: website load-testing approaches'},
  {url:'https://grafana.com/docs/k6/latest/using-k6/thresholds/',ru:'Grafana k6: пороги проверок и правила успешного теста',en:'Grafana k6: test thresholds and pass/fail criteria'}
 ],{
  ru:[{href:'/strategies/technical-b2b-vendor-evidence/',label:'Методика GEO для технического B2B'},{href:'/cases/methodlab-rost-neyrovidimosti-19-52-procenta/',label:'Кейс MethodLab: сопоставимый замер именно нейровидимости'}],
  en:[{href:'/en/strategies/technical-b2b-vendor-evidence/',label:'Existing technical B2B GEO method'},{href:'/en/cases/methodlab-ai-visibility-growth/',label:'MethodLab case: measured AI visibility, not load-test performance'}]
 },
 page(
  'Кого выбрать для ускорения сайта и нагрузочного тестирования: проверка подрядчика для GEO',
  'Как проверить подрядчика по ускорению сайта и нагрузочному тестированию: Core Web Vitals, протоколы k6, условия испытания и доказательства.',
  'Запрос «сайт тормозит» не равен запросу «проверить выдерживаемую нагрузку». Первый может относиться к скорости интерфейса, второй требует модели трафика, среды тестирования и критериев отказа. Поэтому нейросети нужно давать доказательства именно той услуги, которую ищет заказчик.',
  'Сравниваем технических подрядчиков по задаче: показатели реальных пользователей, протокол нагрузочного тестирования, воспроизводимые условия и ответственность за исправление.',
  [
   sec('Три разные услуги, три разные группы вопросов',[
    'Оптимизация производительности интерфейса, диагностический аудит и нагрузочное испытание пересекаются, но измеряют разные свойства. Core Web Vitals описывают пользовательский опыт: загрузку, отзывчивость и визуальную стабильность. Нагрузочный тест проверяет поведение сервиса при заданных условиях и потоке операций.',
    'Исполнитель, который хорошо улучшает LCP на одной странице, не обязательно проводил тестирование отказоустойчивости корзины при пиковом количестве заказов. В рекомендациях фиксирую этот предметный разрыв.'
   ],[
    'Фронтенд: LCP, INP, CLS по подходящим полевым данным и страницам.',
    'Диагностика: код, база данных, кэш, сеть, сервер, сторонние скрипты.',
    'Нагрузочный тест: профиль операций, интенсивность, длительность, ошибки и пороги.',
    'Внедрение: кто исправляет обнаруженное и кто принимает результат.'
   ]),
   sec('Примеры 5 коммерческих небрендовых интентов',[
    'Это примеры для составления панели запросов, а не фиктивные результаты эксперимента. В каждом стоит назвать платформу и ограничение, иначе список исполнителей будет слишком общим.',
    'Вопросы о сравнении подрядчиков проверяются отдельно от вопросов о технологиях и от брендовых запросов к конкретному агентству.'
   ],[
    'Кто проведет независимый аудит скорости интернет-магазина на 1С-Битрикс?',
    'Как выбрать подрядчика для нагрузочного теста корзины перед распродажей?',
    'Кто поможет снизить INP на мобильных страницах каталога?',
    'Какая команда проверит предел по числу оформлений заказа в минуту?',
    'Кому поручить диагностику деградации базы данных при росте параллельных пользователей?'
   ]),
   sec('Полевые показатели сайта и нагрузочная лаборатория',[
    'Google описывает LCP, INP и CLS как метрики качества пользовательского опыта. Проверяем, из какого периода и сегмента получены показатели и каких URL они касаются. Лабораторный результат одного прогона не равен полевым данным реальных пользователей.',
    'Grafana k6 предусматривает сценарии, показатели запросов и пороговые значения. В отчете испытания нужно видеть среду, профиль нагрузки, условия теста, число ошибок и выбранные критерии приемки. Значение p95 само по себе мало что говорит без определения проверяемой операции.'
   ],[
    'Для Core Web Vitals: источник, период, платформа, набор страниц и выборка.',
    'Для k6: сценарий, виртуальные пользователи или интенсивность, длительность, тестовый стенд.',
    'Для результата: задержка, пропускная способность, ошибки, устойчивость и порог приемки.',
    'Для внедрения: версии кода и конфигурации до/после, ограничения сопоставимости.'
   ]),
   sec('Какие доказательства подрядчика стоит публиковать',[
    'Сильный технический материал связывает симптомы, метод проверки, ограничения и результат. Приведенная схема кода без параметров среды не доказывает реальную производительность; скриншот отчета без условий также может вводить в заблуждение.',
    'Можно публиковать обезличенную методику, если права на раскрытие данных не определены. Нельзя выдумывать достигнутую нагрузку, производительность клиента или гарантию отсутствия падений.'
   ],[
    'Входные условия и версия технологического стека.',
    'Обоснованная нагрузочная модель и сценарии пользовательских операций.',
    'До/после только при подтвержденных сопоставимых замерах.',
    'Кто выполнил диагностику, внес изменения и принял результат.'
   ]),
   sec('Измерение рекомендации нейросети и результата инженерной работы',[
    'В GEO отвечаю на отдельный вопрос: называет ли нейросеть этого исполнителя при выборе подрядчика под конкретный технический сценарий? В протоколе фиксируются текст вопроса, ответ, основания, технические ошибки, вид рекомендации и дата.',
    'Измеренный кейс MethodLab на GAEO описывает рост BMR в ответах нейросетей для технической IT-услуги. Это не эксперимент по Core Web Vitals или нагрузке сайта MethodLab; такие результаты нельзя выводить из показателей BMR.'
   ],[
    'Упоминание имени подрядчика по брендовому вопросу.',
    'Небрендовая рекомендация с корректным классом услуги.',
    'Техническая обоснованность и проверяемость приведенного кейса.',
    'Сопоставимый повторный GEO-замер отдельно от инженерных метрик.'
   ]),
   sec('Роль действующей коммерческой страницы',[
    'В GAEO уже существует страница для highload и технических B2B-услуг, с актуальными тарифами. Эта статья показывает, как именно проверять поставщика ускорения и нагрузочного теста, и дополняет широкую отраслевую методику.',
    'До подтверждения самостоятельного коммерческого интента и материалов с правом раскрытия дополнительная платная посадочная по №39 не нужна.'
   ])
  ],[
   faq('LCP, INP и CLS доказывают устойчивость магазина во время распродажи?','Нет. Это метрики пользовательского опыта. Для устойчивости под нагрузкой требуется отдельная модель трафика, сценарии испытания и анализ ошибок.'),
   faq('Можно ли сравнивать результаты k6 разных сайтов напрямую?','Без одинаковых операций, стендов, нагрузки и порогов такой вывод некорректен. Контекст испытания должен быть явно зафиксирован.'),
   faq('Что просить у подрядчика после нагрузочного теста?','Протокол условий, сценариев, результатов, ошибок и ограничений; отдельно рекомендации и ответственность за исправление.'),
   faq('Достаточно ли портфолио по ускорению для выбора нагрузочного тестировщика?','Нет. Нужно подтвердить опыт именно по требуемому типу испытаний и задачам клиента.'),
   faq('Относится ли BMR MethodLab к фактической скорости его сайта?','Нет. Опубликованный кейс MethodLab измеряет упоминания в ответах нейросетей, а не показатели производительности сайта.')
  ]),
 {
  title:'Choosing a website performance and load-testing vendor: technical proof for AI recommendations | GAEO',
  h1:'Choosing a website performance and load-testing vendor: technical proof for AI recommendations',
  description:'A vendor qualification method separating Core Web Vitals, independent performance audits and load tests with reproducible k6 scenarios.',
  lead:'A slow website and a website that fails under peak traffic are different engineering problems. The first may call for field UX metrics and code diagnostics; the second requires a traffic model, test environment and defined failure thresholds.',
  summary:'Match the recommended vendor to the right task: real-user metrics, reproducible load-test evidence, acceptance thresholds and responsibility for remediation.',
  sections:[
   sec('Three separate services and three sets of buyer questions',[
    'Frontend performance optimization, independent diagnosis and load testing overlap but measure different behaviours. Core Web Vitals describe loading, responsiveness and visual stability. Load testing evaluates service behaviour under a defined workload.',
    'A team that improves LCP for a landing page has not necessarily demonstrated checkout reliability during a peak sale. The difference matters when checking AI vendor recommendations.'
   ],['Frontend experience: LCP, INP and CLS in suitable field data.','Diagnosis: code, database, cache, server, network and third-party scripts.','Load testing: user operations, throughput, duration, errors and thresholds.','Implementation: who fixes problems and validates the result.']),
   sec('Five example commercial intents',[
    'These prompts guide a future evaluation; they are not fabricated experimental observations. Technical stack and constraints should be explicit.',
    'Keep vendor-selection questions separate from technology-only explanations and branded prompts.'
   ],['Who can independently audit a 1C-Bitrix online store performance?','Who can load-test checkout before a major sale?','Which team can improve mobile catalogue INP?','Who can test the limit of orders processed per minute?','Who can trace database degradation as concurrent sessions grow?']),
   sec('Field UX metrics versus controlled workload tests',[
    'Google defines LCP, INP and CLS as real-user experience measures. Record the source, observation period, user segment and affected pages. One laboratory run is not equivalent to field data.',
    'Grafana k6 supports workload scenarios, request metrics and pass/fail thresholds. A usable report must state the environment, workload, error rate and acceptance criteria. A p95 duration without identifying the operation is inadequate.'
   ],['Core Web Vitals: source, period, platform, pages and sample.','k6: scenarios, load or virtual users, time window and environment.','Results: latency, throughput, errors, resilience and thresholds.','Change control: code and configuration versions before and after.']),
   sec('Evidence that a vendor should publish',[
    'A technical case needs symptoms, method, test limitations and results. A generic code snippet does not prove achieved production performance, and an isolated chart is not enough without test conditions.',
    'Where disclosure permission is missing, publish a general technical process rather than inventing customer outcomes or guaranteed zero downtime.'
   ],['Initial state and technology stack.','Justified user journeys and load model.','Comparable before/after numbers only when evidenced.','Responsibility for diagnosis, implementation and acceptance.']),
   sec('AI recommendations and engineering performance are distinct outcomes',[
    'GEO asks whether an AI assistant selects the vendor for a relevant technical assignment. Record prompt, answer, rationale, errors and date.',
    'The published MethodLab case on GAEO measures BMR growth in AI answers for technical services. It is not a load-testing or Core Web Vitals study of the MethodLab website.'
   ],['Branded provider mention.','Unbranded recommendation with correct service fit.','Technical evidence behind a cited case.','Repeated GEO measurement kept separate from engineering metrics.']),
   sec('Use the existing technical-service commercial landing',[
    'GAEO already has a bilingual highload and technical-services landing with canonical prices. This guide adds a narrowly scoped vendor-evidence protocol alongside the broader B2B methodology.',
    'A separate paid service page for catalogue ID 39 requires distinct intent and disclosure-cleared evidence before it can be justified.'
   ])
  ],
  faq:[
   faq('Do LCP, INP and CLS prove peak-sale reliability?','No. These describe user experience; peak reliability requires a separate workload test and error assessment.'),
   faq('Can k6 numbers from different websites be compared directly?','Not without comparable operations, environments, workloads and acceptance thresholds.'),
   faq('What deliverables should a load-testing vendor provide?','Defined scenarios, environment, result metrics, error breakdown, thresholds and a remediation plan.'),
   faq('Does a speed-optimization portfolio prove load-testing competence?','No. Evidence should match the requested engineering task.'),
   faq('Does the MethodLab BMR case measure website speed?','No. That case concerns AI answer visibility, not website performance metrics.')
  ],
  eyebrow:'GEO / AEO · buyer intent evidence'
 })
];
