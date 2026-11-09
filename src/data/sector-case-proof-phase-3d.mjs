/**
 * Phase 3D: public editorial method for assessing whether a sector GEO observation
 * can be published as a baseline diagnosis, an implementation record, or a measured
 * case. Private source inventory and publication permissions live ONLY in the
 * canonical handoff and roadmap. No unpublished client numbers enter this module.
 * All commercial landing pages, industry IDs and prices are reused unchanged.
 */
const section=(title,p,bullets=[])=>({title,p:Array.isArray(p)?p:[p],bullets});
const faq=(q,a)=>({q,a});
const page=(title,description,lead,summary,sections,questions)=>({
 title:title+' | GAEO',h1:title,description,lead,summary,sections,faq:questions,eyebrow:'GEO / AEO · доказательность'
});

export const phase3DCaseProof={
 key:'sector-case-proof-3d',
 ids:[42,48,55,59],
 routes:{method:{ru:'/strategies/sector-geo-case-proof/',en:'/en/strategies/sector-geo-case-proof/'}},
 sources:[
  {url:'https://protect.gost.ru/tr/details/e65e8e23-48a8-430c-8664-df229a278766',ru:'Росстандарт: ТР ТС 010/2011, требования безопасности машин и оборудования',en:'Rosstandart: TR CU 010/2011, machinery and equipment safety'},
  {url:'https://protect.gost.ru/tr/details/0ab50d83-4a64-455d-9c59-04b5ef9336b9',ru:'Росстандарт: ТР ТС 005/2011, требования к безопасности упаковки',en:'Rosstandart: TR CU 005/2011, packaging safety'},
  {url:'https://eec.eaeunion.org/comission/department/dep_tamoj_zak/tk_eaes.php',ru:'Евразийская экономическая комиссия: Таможенный кодекс ЕАЭС',en:'Eurasian Economic Commission: EAEU Customs Code'},
  {url:'https://roszdravnadzor.gov.ru/services/licenses',ru:'Росздравнадзор: единый реестр лицензий',en:'Roszdravnadzor: national licence register'}
 ],
 ru:{method:page(
  'Когда GEO-аудит становится кейсом: доказательства для промышленности, логистики и клиник',
  'Как отличать заявку, наблюдение, исходный BMR, выполненные работы и подтвержденную динамику GEO. Публичная методика проверки отраслевых кейсов GAEO.',
  'Для промышленного B2B, международной логистики и клиник одна найденная рекомендация нейросети еще не доказывает результат продвижения. Публикуемость зависит от источника, сопоставимости замеров, факта внедрения и разрешения клиента.',
  'Практический критерий: исходный аудит можно назвать диагностикой, а кейс с результатом требует проверенных действий, повторного сопоставимого измерения и права раскрыть факты.',
  [
   section('Пять стадий доказательности: что разрешено утверждать',[
    'Я разделяю историю работы на пять последовательных стадий. У каждой свой предел публичного вывода. Само наличие обращения не доказывает ни проблему с рекомендациями, ни опыт успешного продвижения.',
    'В публичной статье лучше прямо назвать стадию: предварительная беседа, наблюдение, диагностический срез, выполненное внедрение или измеренный результат. Эти названия сообщают читателю больше, чем общая фраза «мы работали с отраслью».'
   ],[
    'Заявка или бриф: известна задача компании, но вывод о видимости пока не подтвержден.',
    'Наблюдение: сохранен конкретный ответ нейросети с условиями воспроизведения.',
    'Диагностический срез: есть запросы, платформы, даты, исходные ответы и правила подсчета.',
    'Внедрение: подтверждены реально выполненные мероприятия и их приемка, а не список намерений.',
    'Измеренный результат: повторен сопоставимый набор вопросов, указаны числитель, знаменатель и ограничения атрибуции.'
   ]),
   section('Исходная выборка: минимальный паспорт замера',[
    'Для отраслевого мини-аудита сначала фиксируются коммерческие вопросы без подсказки названия клиента. Отдельно ведутся брендовые вопросы. Не смешиваю ответ с упоминанием фирмы и рекомендацию обратиться к ней: один ответ может назвать несколько компаний и при этом не рекомендовать ни одну.',
    'Доля упоминаний BMR равна числу ответов с зафиксированным брендом, деленному на число полученных ответов в согласованной выборке. Количество запросов не тождественно количеству ответов: пропуски и технические ошибки нужно показывать отдельно.'
   ],[
    'Дата и временное окно, страна или регион, интерфейс нейросети и условия доступа.',
    'Точные формулировки запросов, коммерческий интент и принадлежность к брендовому или небрендовому набору.',
    'Полный ответ, источники и ручная классификация: упоминание, самостоятельная рекомендация, ссылка, фактическая ошибка.',
    'Число полученных и отсутствующих ответов, правило обращения с повторениями и спорными упоминаниями.'
   ]),
   section('Когда два периода действительно можно сравнить',[
    'Изменение процента при другом количестве ответов может быть арифметическим эффектом. Для динамики нужны те же вопросы, понятная панель нейросетей и одинаковое правило оценки. Если к списку добавили новые запросы или заменили интерфейс, показываю это как другой срез, без искусственного графика «роста».',
    'Даже при сопоставимом росте BMR нельзя автоматически приписать его единственной статье, микроразметке или другому действию. Для аргументированного кейса сохраняются хронология внедрения, независимые влияния и исходные артефакты. Пример корректно представленного повторного замера можно увидеть в опубликованном кейсе MethodLab, который относится к техническим IT-услугам, а не к промышленному оборудованию, логистике или клиникам.'
   ],[
    'Одинаковое ядро вопросов и четко зафиксированные исключения.',
    'Сопоставимые интерфейсы и одинаковые признаки прямого упоминания и рекомендации.',
    'Отдельный учет пропущенных ответов, измененного объема панели и новых интентов.',
    'История выполненных работ с датами; вывод о связи работ и динамики формулируется с ограничениями.'
   ]),
   section('Промышленность: документы поставщика и результат GEO нельзя смешивать',[
    'Закупщик оборудования оценивает модель, рабочий режим, производительность, соответствие требованиям и сервис. Для упаковки важны материал, назначение, тираж, условия изготовления и характеристики печати. Это проверяемые свойства предложения, но они сами по себе не являются доказательством того, что GAEO обеспечил рост рекомендаций производителя.',
    'ТР ТС 010/2011 относится к безопасности машин и оборудования, ТР ТС 005/2011 к безопасности упаковки. Наличие нормативного акта не подтверждает соответствие конкретной модели, наличие декларации или сертификата у отдельного производителя. Такие утверждения требуют проверки применимости и документов именно этого изделия.'
   ],[
    'Сохранять исходный запрос покупателя с техническими ограничениями и отраслью применения.',
    'Разделять документ изделия, заявление изготовителя и независимое подтверждение параметра.',
    'В замере GEO классифицировать рекомендацию конкретной модели отдельно от общих упоминаний производителя.',
    'Публиковать клиентский результат только после подтверждения выполненных работ, повторного замера и права на раскрытие.'
   ]),
   section('Международная логистика: проверяем маршрут, роль и условия ставки',[
    'Фраза «везем из Китая» не раскрывает маршрут, вид груза, ответственную сторону и состав предложения. В исследовании нейроответов нужно отделять перевозчика от экспедитора и посредника, а цену без определения включенных услуг не считать доказанным конкурентным преимуществом.',
    'Таможенный кодекс ЕАЭС задает нормативный контекст процедур. Он не подтверждает полномочия, сроки доставки, договорную ответственность или качество конкретного логистического подрядчика. Для публикации кейса GEO отдельно нужны исходные ответы, факты внедрения и сопоставимый повторный замер.'
   ],[
    'Груз, география, маршрут и ограничения на перевозку задаются в запросе.',
    'Проверяются договорная роль, состав ставки, таможенные обязанности и ответственность сторон.',
    'Оценка рекомендации привязана к выполнимому сценарию, а не к общему названию компании.',
    'Показатели логистической услуги и динамика рекомендаций нейросетей учитываются раздельно.'
   ]),
   section('Частная клиника: граница маркетинговой и медицинской проверки',[
    'В рекомендациях клиник маркетолог может проверить юридическое лицо, филиал, вид услуги, запись и соответствие публичных сведений. Вопросы диагноза, эффективности лечения и назначения препарата рассматривает профильный медицинский специалист. Попадание в ответ нейросети не является оценкой клинического качества или безопасности.',
    'Реестр Росздравнадзора помогает проверять сведения о лицензиях. Для конкретной клиники нужно сверить лицензиата, адрес осуществления деятельности и применимые работы или услуги; ссылка на общий раздел реестра не заменяет проверку записи. Пациентские данные, истории болезней и рекламные лечебные обещания в исследование GEO не включаются.'
   ],[
    'В матрице вопросов отдельно фиксируются филиал, специальность, услуга и способ записи.',
    'Публичные сведения сверяются с применимой реестровой записью и официальной информацией клиники.',
    'Медицинские утверждения проходят профильную проверку; отсутствие разрешения блокирует публикацию.',
    'Результаты GEO описываются как качество и частота упоминаний, без выводов о лечении пациентов.'
   ]),
   section('Паспорт публичного кейса: 9 обязательных полей',[
    'Перед публикацией я сверяю паспорт будущего материала с первичными данными. Заполненный шаблон помогает заметить пробел раньше, чем диагностический аудит превратится в рекламную историю успеха.',
    'Если исходных ответов или согласования нет, можно опубликовать общую отраслевую методику, но нельзя добавлять неподтвержденные цифры, персональные данные, имена клиентов или описание завершенных работ.'
   ],[
    'Предмет и отрасль исследования; коммерческие вопросы покупателя.',
    'Период, география, нейросети и точные условия выборки.',
    'Промпты, исходные ответы и ссылка на закрытый архив с контролем доступа.',
    'Правила BMR и классификация прямых рекомендаций.',
    'Базовые числитель, знаменатель и исключенные ответы.',
    'Проверенный перечень выполненных работ и даты внедрения.',
    'Сопоставимый повторный срез либо явная пометка об его отсутствии.',
    'Ограничения выводов, источники отраслевых фактов и медицинская проверка при необходимости.',
    'Зафиксированное разрешение на публикацию имени, цифр и допустимого уровня обезличивания.'
   ]),
   section('Как использовать эту методику при выборе подрядчика',[
    'Попроси показать не общий процент роста, а его исходную выборку и условия сравнения. Для промышленности и логистики отдельно проверяй, что исполнитель умеет работать с техническими критериями сделки. Для клиник потребуются дополнительные проверки лицензии, источников и медицинских формулировок.',
    'В GAEO я начинаю с диагностики и связываю рекомендации нейросетей с конкретными покупательскими задачами. Состав сопровождения, тарифы и условия финансовой гарантии приведены в основном разделе услуг; ни одна отрасль не получает вымышленного отдельного тарифа.'
   ])
  ],[
   faq('Можно ли назвать разовый мини-аудит кейсом роста GEO?','Нет. Он дает исходный диагностический срез. Для результата нужны подтвержденные действия и сопоставимое повторное измерение.'),
   faq('Достаточно ли одного выросшего процента BMR?','Нет. Нужны исходные числитель и знаменатель, те же вопросы и нейросети, учет пропусков и ограничения причинного вывода.'),
   faq('Можно ли раскрывать анонимизированные данные без проверки разрешения?','Нет. Даже без названия сочетание отрасли, региона и уникальной фактуры может раскрыть клиента. Публикационный объем проверяется отдельно.'),
   faq('Подтверждает ли лицензия клиники хороший результат лечения?','Нет. Запись в реестре относится к разрешенному виду деятельности, не измеряет эффективность лечения и не является доказательством качества GEO.'),
   faq('Что делать, если повторного замера нет?','Назвать материал диагностическим разбором, показать исходную методику и ограничение. Не заявлять рост рекомендаций или клиентов.')
  ])},
 en:{method:{
  title:'When a GEO audit becomes a case study: evidence in industry, logistics and healthcare | GAEO',
  h1:'When a GEO audit becomes a case study: evidence in industry, logistics and healthcare',
  description:'Distinguish initial AI mentions, baseline BMR, completed work and repeatable GEO results for industrial suppliers, logistics and private clinics.',
  lead:'A single AI recommendation of an industrial supplier, freight forwarder or clinic is not evidence of successful GEO work. A publishable case requires a reproducible baseline, verified interventions, comparable follow-up results and disclosure permission.',
  summary:'A baseline is a diagnostic finding. A result case study needs verified implementation, a comparable follow-up measurement and permission to publish.',
  eyebrow:'GEO / AEO · evidence standards',
  sections:[
   section('Five evidence stages and the claims each supports',[
    'A business enquiry does not prove low visibility or completed work. I separate a client engagement into five stages, each with its own defensible public conclusion.',
    'Describe the stage in ordinary language. A prospective customer should be able to tell whether an article documents an observation, a baseline audit, implementation or an actual repeat measurement.'
   ],[
    'Enquiry or brief: a business question is known, but no measured conclusion has been established.',
    'Observation: a specific AI response and its reproducibility conditions have been saved.',
    'Baseline: prompts, interfaces, dates, raw answers and classification rules are recorded.',
    'Implementation: actual changes, dates and their acceptance are documented instead of proposed future actions.',
    'Measured result: a comparable follow-up sample shows the numerator, denominator and attribution limits.'
   ]),
   section('What belongs in a baseline measurement record',[
    'Start with unbranded commercial buyer prompts; keep branded tests separate. An answer mentioning a supplier is not necessarily recommending it, and a source citation is not equivalent to an unprompted recommendation.',
    'Brand Mention Rate (BMR) is the share of received responses mentioning the brand under the fixed counting rule. Missing answers and failed calls must be documented separately; prompt count and response count are not interchangeable.'
   ],[
    'Time window, region, AI interface and access conditions.',
    'Exact prompts, buyer intent and branded versus unbranded classification.',
    'Full answer, cited sources and human review of mention, recommendation, link and factual error.',
    'Received and missing responses, duplicate handling and disputed-mention rules.'
   ]),
   section('Four conditions for comparable before-and-after evidence',[
    'A percentage can increase simply because fewer responses were returned. When the panel changes, I treat the new sample as a separate baseline unless the unchanged comparable subset can be demonstrated.',
    'Even with matching prompts, an improved BMR does not establish that one article, structured-data change or media mention caused the increase. Keep an intervention timeline and report other possible influences. The public MethodLab case shows a comparable follow-up in technical IT services; it is not a client success claim for equipment manufacturing, freight or healthcare.'
   ],[
    'Freeze the core buyer prompts and record any added or excluded intents.',
    'Use comparable AI interfaces and stable mention-versus-recommendation classification.',
    'Report missing responses and panel-size changes separately.',
    'Preserve implementation dates and qualify causal attribution.'
   ]),
   section('Manufacturing: product compliance differs from GEO performance',[
    'Machinery buyers need a specific model, operating conditions, specifications, conformity documents and service options. Packaging buyers need material, intended use, print properties, batch size and supply conditions. These are supplier-qualification facts, not evidence that GAEO improved a brand’s AI recommendations.',
    'TR CU 010/2011 concerns machinery and equipment; TR CU 005/2011 concerns packaging. Neither standard certifies an individual manufacturer or product simply by being cited. Product-specific applicability and records must be checked.'
   ],[
    'Record the technical intent and production constraints in each buyer question.',
    'Distinguish supplier claims, product records and independently verifiable evidence.',
    'Classify recommendations of a specific model separately from generic brand mentions.',
    'Publish an outcome case only when implementation, follow-up and disclosure rights are verified.'
   ]),
   section('International logistics: route, provider role and quote scope',[
    'A general claim to ship goods from Asia does not establish a workable route, cargo suitability, contractual responsibility or pricing scope. Distinguish the carrier, forwarder and intermediary before counting an AI response as a suitable recommendation.',
    'The EAEU Customs Code establishes the regulatory framework. It cannot validate a specific provider’s responsibilities, lead times or successful completion of a shipping operation. GEO case evidence requires separate raw answers and follow-up results.'
   ],[
    'Define cargo, route, jurisdictions and transport constraints.',
    'Check provider role, included costs, customs responsibility and liability.',
    'Assess AI recommendations against the stated operational scenario.',
    'Keep shipping service performance and AI recommendation change as different outcomes.'
   ]),
   section('Private clinics: marketing verification is not clinical evaluation',[
    'A GEO review can assess the legal entity, branch, public service description, appointment path and source consistency. Clinical accuracy, diagnosis and treatment effectiveness require qualified healthcare review. Appearing in an AI answer is not a proxy for patient safety or quality of care.',
    'The Roszdravnadzor licence register supports checking licensee details, premises and applicable activities. A link to the register homepage is not proof that a specific clinic is licensed. No patient histories or unsupported treatment claims belong in a public marketing case.'
   ],[
    'Test separate branch, specialty, service and booking intents.',
    'Match relevant official licensing data and the clinic’s current public facts.',
    'Obtain qualified review and an explicit publication-permission decision.',
    'Report AI visibility and source accuracy, not patient outcomes.'
   ]),
   section('The nine fields required before publishing a GEO case',[
    'I use a fixed editorial evidence record. It prevents preliminary audits from being described as results and makes the limits visible to clients and reviewers.',
    'If full raw answers or disclosure permission are missing, publish a general method instead of a fictitious success story.'
   ],[
    'Study subject, sector and commercial buyer scenarios.',
    'Measurement period, location, AI systems and sampling conditions.',
    'Exact prompts, raw responses and access-controlled archive.',
    'BMR definition and recommendation-classification policy.',
    'Baseline numerator, denominator and excluded responses.',
    'Verified actions implemented, with dates and acceptance.',
    'Comparable follow-up or an explicit statement that none exists.',
    'Sources, interpretive limits and healthcare review where applicable.',
    'Permission to disclose names, figures and the approved level of anonymisation.'
   ]),
   section('Use this standard when assessing a GEO provider',[
    'Ask for the underlying prompt matrix and denominator rather than only a growth percentage. For industrial and logistics suppliers, inspect how the consultant handles technical purchasing conditions. Healthcare projects need additional licensing, clinical accuracy and confidentiality checks.',
    'GAEO starts with a baseline and ties recommendations to buyer decisions. Service packages, pricing and contractual BMR terms are defined on the canonical pricing pages rather than invented for each sector.'
   ])
  ],
  faq:[
   faq('Can a one-off mini-audit be called a GEO growth case?','No. It is a baseline diagnostic. Measured improvement requires verified interventions and a comparable follow-up.'),
   faq('Is an increased BMR percentage sufficient?','No. Check the numerator, denominator, same buyer questions and AI interfaces, missing answers and causal limitations.'),
   faq('Can anonymised audit data always be published?','No. Sector, geography and distinctive facts can still identify a client. The permitted scope must be verified first.'),
   faq('Does a clinic licence prove treatment effectiveness?','No. Licensing defines authorisation to conduct relevant activities, not treatment effectiveness or GEO performance.'),
   faq('What if there is no repeat measurement?','Label the work a diagnostic review, describe its baseline and limitations, and do not claim additional recommendations or customers.')
  ]
 }}
};
