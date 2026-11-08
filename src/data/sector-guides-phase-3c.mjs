/**
 * Phase 3C: practical source-audit checklists for four established industrial,
 * logistics and medical commercial specializations.
 * These guides are not repetitions of phase 3B measurement methodologies,
 * new client cases, regulatory approvals or new GEO measurements.
 */
const page=(title,description,lead,summary,sections,faq)=>({
 title:title+" | GAEO",h1:title,description,lead,summary,sections,faq,eyebrow:"GEO / AEO · 3C"
});
const section=(title,paragraphs,bullets=[])=>({title,p:Array.isArray(paragraphs)?paragraphs:[paragraphs],bullets});
const faq=(q,a)=>({q,a});
const guide=(id,key,slug,sources,ru,en)=>({
 ids:[id],key,routes:{method:{ru:"/strategies/"+slug+"/",en:"/en/strategies/"+slug+"/"}},
 sources,ru:{method:ru},en:{method:en}
});

export const phase3CGuides=[
 guide(42,"equipment-rfq","industrial-equipment-rfq-checklist",[
  {url:"https://protect.gost.ru/tr/details/e65e8e23-48a8-430c-8664-df229a278766",ru:"Росстандарт: ТР ТС 010/2011 о безопасности машин и оборудования",en:"Rosstandart: TR CU 010/2011 on machinery and equipment safety"}
 ],
 page("Как подготовить паспорт промышленного оборудования для закупщика и нейросетей: 12 проверок",
  "Практический чек-лист для производителей оборудования: модель, рабочий режим, документы, сервис, условия закупки и источники для GEO.",
  "Когда закупщик спрашивает нейросеть о станке, она может смешать модель, комплектацию и обязанности дилера. Для сайта поставщика полезен один паспорт предложения: 12 проверок, после которых инженер и отдел продаж могут подтвердить каждую существенную характеристику.",
  "Сначала опубликуйте сопоставимые и проверенные параметры модели. Затем соедините их с ответственным продавцом, документацией и условиями поставки.",[
  section("1. Четыре поля, без которых модель нельзя сравнивать","Для каждой модели нужно указать идентификатор, ревизию, производственную задачу и условия испытания. Обобщение «до 1000 единиц в час» без материала и режима может привести к ошибочной рекомендации.",[
   "Точная модель, серия, версия и границы модификаций.",
   "Сырье или обрабатываемый материал, размеры и требуемое качество результата.",
   "Производительность с единицами измерения и проверяемыми условиями.",
   "Ограничения по конфигурации, температуре, энергоснабжению или нагрузке."
  ]),
  section("2. Три проверки документации","Ссылка на стандарт не является доказательством соответствия изделия. Проверяют применимость требований, документ конкретной модели и статус документа; эксперт по продукции подтверждает выбор необходимых процедур.",[
   "Паспорт и руководство по эксплуатации совпадают с поставляемой модификацией.",
   "Заявления о соответствии привязаны к объекту, заявителю, сроку и актуальному статусу.",
   "В HTML есть параметры выбора, а технические PDF связаны с конкретной моделью."
  ]),
  section("3. Три проверки ответственного исполнителя","Нейросеть должна отличать изготовителя, дистрибьютора, монтажную организацию и сервис. Если компания отвечает только за продажу, текст сайта не должен обещать собственную пусконаладку.",[
   "У каждой компании подписана реальная роль и зона ответственности.",
   "Регионы поставки, пусконаладки и обслуживания перечислены раздельно.",
   "Сроки, гарантия и приемка описываются в рамках действующего предложения."
  ]),
  section("4. Две проверки структуры закупочного запроса","Поиск модели и выбор подрядчика являются разными запросами. Страница модели отвечает на техническое соответствие, а страница поставщика показывает компетенцию, условия и источники.",[
   "Сохраняйте связь от применения к модели, от модели к изготовителю и ответственному поставщику.",
   "Добавьте запрос коммерческого предложения с обязательными параметрами производства, без обещания цены до расчета."
  ]),
  section("Пример проверки ответа нейросети","Предположим, ответ предлагает «линию для тонколистовой стали» и заявляет 40 деталей в минуту. Проверяющий сначала идентифицирует модель, затем ищет условия измерения мощности, а потом устанавливает, кто отвечает за запуск и сервис. Число без подтвержденного режима помечается как неподтвержденное, даже если название изготовителя верно."),
  section("Как применять в GEO и передавать в работу","Сверьте 12 проверок с продуктовой страницей, каталогом, документацией и разделом сервиса. В матрице GAEO фиксируются промпт, источник, ошибка и дата. BMR измеряется на стабильной коммерческой выборке отдельно от технической пригодности ответа. Это пример подготовки материалов, а не результат продвижения завода.")
 ],[
  faq("Нужна ли отдельная страница для каждой модификации?","Если меняются характеристики, возможности или документы, их нужно различать в индексируемом содержимом. В некоторых каталогах достаточно самостоятельного блока с прямой ссылкой."),
  faq("Можно ли написать «сертифицировано по ТР ТС 010/2011»?","Только после проверки применимости регламента и фактического документа на конкретное изделие. Ссылка на карточку регламента сама по себе ничего не сертифицирует."),
  faq("Зачем отделять изготовителя от дилера?","Это разные задачи для закупщика: выбор технологии и выбор того, кто оформит поставку и исполнит обязательства. Их смешение создает недостоверные рекомендации."),
  faq("Как учитывать ошибочную характеристику в ответе?","Упоминание бренда учитывается в BMR по согласованным правилам, а ошибка параметра регистрируется отдельно с источником и степенью подтверждения."),
  faq("Есть ли здесь подтвержденные результаты клиентов GAEO?","Нет. Чек-лист описывает подготовку доказательств и проверку ответов; результаты конкретного клиента требуют самостоятельного кейса.")
 ]),
 page("Industrial equipment RFQ passport: 12 checks for buyers and AI recommendations",
  "Practical GEO content checklist for industrial vendors: exact model, operating conditions, documentation, supplier responsibility and procurement evidence.",
  "An AI shortlist can attach the wrong output rate to a real machine or mistake a dealer for the manufacturer. A procurement-ready product passport solves the underlying content problem through twelve verifiable fields before AI recommendation measurement begins.",
  "Publish comparable model data first. Then connect each claim to a responsible supplier, current documents and an identifiable offer.",[
  section("1. Four model-identification checks","A catalogue value is only meaningful with the model and test conditions that produced it. Avoid presenting one operating mode as universal performance.",[
   "Exact machine model, series, revision and available configurations.",
   "Material, dimensions, processing task and intended output quality.",
   "Throughput with units, operating conditions and exclusions.",
   "Utility, site, interface and environmental constraints."
  ]),
  section("2. Three documentation checks","A general regulation does not certify a product. Applicability, the model-specific documents and their current status require qualified verification.",[
   "Manuals and technical passports match the actual configuration.",
   "Conformity claims match the product, applicant, scope and record status.",
   "Decision-critical parameters appear in indexable HTML linked to the right documents."
  ]),
  section("3. Three accountability checks","A manufacturer, reseller, integrator and maintenance contractor have distinct duties. Make the contractual and geographic limits of each role explicit.",[
   "Name the legally responsible provider and describe its role.",
   "Separate shipment, commissioning and maintenance coverage.",
   "State offer-specific lead times, acceptance and warranty boundaries."
  ]),
  section("4. Two procurement-intent checks","Model-selection questions are not identical to contractor-selection questions. Organize pages for both without fabricating a single end-to-end provider.",[
   "Link application to model, model to manufacturer and model to the actual delivery partner.",
   "Provide an RFQ path that captures process, volumes and site constraints."
  ]),
  section("How a recommendation should be audited","If a response claims a sheet-metal line produces 40 parts per minute, a reviewer identifies the machine, checks the test regime and then checks who delivers commissioning. An unsupported rate is logged even if the named manufacturer exists."),
  section("GEO workflow and handover","Review the twelve checks against product pages, service pages, documents and the RFQ form. GAEO records prompts, citations, errors and verification dates. BMR remains separate from engineering suitability. This is an editorial procedure, not evidence of a completed customer result.")
 ],[
  faq("Must every revision have its own URL?","Use a distinct indexable page or clearly addressable variant when capabilities, documents or limits materially differ."),
  faq("Does linking TR CU 010/2011 certify a machine?","No. A qualified reviewer must establish the applicable requirements and verify documents for the exact supplied product."),
  faq("Why separate manufacturer and dealer?","The buyer may select a technology from one entity and contract delivery or service with another. Conflating the roles causes invalid recommendations."),
  faq("What if the AI recommends the right brand but a wrong capacity?","Count the mention only under the pre-agreed BMR definition and register the technical error separately."),
  faq("Does this guide claim verified customer results?","No. It describes a source and procurement checklist, not an observed client outcome.")
 ])
 ),
 guide(48,"packaging-brief","packaging-supplier-brief-checklist",[
  {url:"https://protect.gost.ru/tr/details/0ab50d83-4a64-455d-9c59-04b5ef9336b9",ru:"Росстандарт: ТР ТС 005/2011 о безопасности упаковки",en:"Rosstandart: TR CU 005/2011 on packaging safety"},
  {url:"https://docs.eaeunion.org/documents/429/8416/",ru:"ЕЭК: решение №118, порядок введения изменений в ТР ТС 005/2011",en:"EEC: Decision No. 118 on implementation of TR CU 005/2011 amendments"}
 ],
 page("Поставщик упаковки в ответах нейросетей: 12 пунктов технического задания и проверки фактов",
  "Как проверить рекомендации производителя упаковки, тары и этикеток: применение, материал, образцы, тираж, испытания и документы без выдуманных допусков.",
  "Запрос «кто изготовит упаковку» не имеет достаточных условий для выбора производителя. Материал, контакт с продуктом, способ печати и тираж определяют применимость предложения. Перед GEO-продвижением я собираю из этих условий проверяемую страницу продукта и техническое задание.",
  "Рекомендация поставщика упаковки обоснованна только для конкретного применения, конструкции и объема заказа.",[
  section("1. Четыре параметра применения","Нельзя переносить свойства транспортной коробки на первичную упаковку или этикетку. Для товара сначала описывают фактическое назначение.",[
   "Первичная, групповая, транспортная упаковка или отдельная этикетка.",
   "Продукт внутри, характер контакта и условия хранения.",
   "Форма, габариты, толщина, тип замка и закрывания.",
   "Режим заполнения, перевозки, температуры и ожидаемых нагрузок."
  ]),
  section("2. Три проверки материалов и печати","Название материала без конструкции и обработки не раскрывает эксплуатационные свойства. Пригодность к контакту с продуктом подтверждается отдельно применимыми документами.",[
   "Марка и структура материала, покрытия, клеи и красители по спецификации.",
   "Метод печати, стойкость изображения, макет, требования к штрихкоду.",
   "Реальные испытания, область действия результатов и дата документа."
  ]),
  section("3. Три проверки объема заказа","В поисковом ответе особенно легко выдумать минимальный тираж или срок. Вместо универсальных обещаний нужно привязать коммерческие условия к конструкции и загрузке.",[
   "Минимальная партия и ограничения по отдельным материалам.",
   "Наличие оснастки, подготовка формы и стоимость образца по запросу.",
   "Производственный срок, упаковка партии и логистика с оговоренными условиями."
  ]),
  section("4. Два доказательства, которые проверяют отдельно","ТР ТС 005/2011 касается безопасности упаковки в пределах своей области применения. Правила маркировки конкретной товарной категории и разрешения на использование заявлений требуют отдельной проверки специалистом.",[
   "Действующий документ на конкретный объект и применимость регламента.",
   "Фактическая возможность изготовителя выполнить нужную технологию и объем."
  ]),
  section("Пример неудачной рекомендации","Нейросеть советует компанию как поставщика «пищевой упаковки из любого перерабатываемого пластика». Пока нет данных о конструкции, продукте, температуре, проверенных свойствах и применимости требований, такая фраза слишком широка. Маркетинговый эпитет не заменяет техническую спецификацию."),
  section("Структура материалов и проверка GEO","Для каждого семейства изделий полезны продуктовая страница, технические параметры, сценарии применения, образцы, ответы на вопросы закупщика и условия заказа. В GAEO отдельно фиксируются упоминания поставщика, ошибки в свойствах и совпадение с реальным техническим заданием. BMR не доказывает безопасность упаковки.")
 ],[
  faq("Один регламент распространяется на любую упаковку?","Область применения и исключения нужно смотреть в действующей редакции соответствующего документа, а требования к товару внутри упаковки проверять отдельно."),
  faq("Можно ли считать экологичность подтвержденной по названию материала?","Нет. Нужны проверяемое определение заявления, условия переработки и данные по конкретной конструкции."),
  faq("Почему в GEO важен минимальный тираж?","Заказчик выбирает доступного исполнителя под конкретный объем. Неверное обещание тиража делает рекомендацию коммерчески непригодной."),
  faq("Можно ли переносить испытания между модификациями?","Только если документы и условия применения прямо охватывают эти модификации и это проверено ответственным специалистом."),
  faq("Что дает такой чек-лист?","Он помогает подготовить технические страницы и выявлять ошибки рекомендаций; не является лабораторным испытанием или гарантией роста продаж.")
 ]),
 page("Packaging supplier qualification: 12 checks for a usable RFQ and AI recommendations",
  "Packaging GEO checklist: product contact, material, construction, print, batch size, conformity records and verified supplier capability.",
  "A request for a packaging supplier only becomes useful when product contact, materials, print processes and order size are known. I turn these conditions into an evidence-backed product brief before testing whether AI recommends a technically suitable manufacturer.",
  "A packaging recommendation must match intended use, construction and actual production constraints.",[
  section("1. Four intended-use fields","Primary packaging, transport boxes and labels cannot be treated as interchangeable product categories.",[
   "Primary, grouped or transport packaging, or a separately produced label.",
   "Packaged product, contact scenario and storage conditions.",
   "Dimensions, material structure, closure and thickness.",
   "Filling, shipping, temperature and handling conditions."
  ]),
  section("2. Three material and print checks","A broad material label does not prove performance. Product-contact suitability and compliance require applicable, product-specific evidence.",[
   "Material grades, coatings, adhesives and printing inks.",
   "Print method, artwork approval, barcode and durability requirements.",
   "Actual test scope, test conditions, records and document dates."
  ]),
  section("3. Three procurement constraints","Minimum volumes and delivery promises depend on tooling, construction and plant capacity.",[
   "Minimum order and product-specific exceptions.",
   "Tooling, plates, samples and artwork preparation.",
   "Production slots, packing and shipment terms."
  ]),
  section("4. Two independent proofs","TR CU 005/2011 is a source for applicable packaging-safety requirements; it is not proof that a particular package or manufacturer has approval.",[
   "Product-specific conformity evidence with verified applicability and status.",
   "Manufacturer capabilities for the actual structure, process and batch."
  ]),
  section("Audit example: an overbroad claim","If an AI answer recommends any recyclable plastic as universally suitable for food contact, first establish the actual construction, product, use temperature and applicable evidence. A promotional adjective is not a technical specification."),
  section("Content and measurement handover","Link product-family pages to technical parameters, use cases, samples, FAQs and current purchase terms. GAEO records brand mentions, property errors and RFQ fit separately. BMR alone does not establish packaging safety.")
 ],[
  faq("Does one regulation apply to all packaging?","Check its scope, exclusions and currently effective version. Product-specific labelling rules may require separate analysis."),
  faq("Does a material name prove recyclability?","No. The claim needs a defined criterion, feasible conditions and evidence for that construction."),
  faq("Why track minimum order quantities in GEO?","A supplier recommended below its actual production minimum may be unsuitable for the buyer."),
  faq("Can test results automatically cover every variant?","Only when the documented scope and qualified verification support that conclusion."),
  faq("Is this a laboratory compliance assessment?","No. It is an editorial and buyer-evidence checklist used alongside product specialists and applicable records.")
 ])
 ),
 guide(55,"logistics-tender","international-logistics-tender-checklist",[
  {url:"https://eec.eaeunion.org/comission/department/dep_tamoj_zak/tk_eaes.php",ru:"ЕЭК: Таможенный кодекс Евразийского экономического союза",en:"EEC: Customs Code of the Eurasian Economic Union"}
 ],
 page("Выбор международного экспедитора через нейросети: 12 вопросов к маршруту и ставке",
  "Чек-лист логистического тендера: страна, маршрут, груз, роль экспедитора, таможенные процедуры, сроки и границы ставки.",
  "Ответ нейросети «компания возит груз из Китая» еще не означает, что экспедитор подойдет к конкретной сделке. Стоимость и сроки зависят от маршрута, характеристик груза, документов и распределения ответственности. Вопросы ниже помогают подготовить проверяемый тендер.",
  "Сравнивайте перевозчиков только в одной модели груза, маршрута, услуг и ответственности.",[
  section("1. Четыре параметра отправки","Без базового описания перевозки разные котировки нельзя сопоставить. Даже одинаковые города отправления и назначения не означают одинаковый состав услуги.",[
   "Точные пункты отправления и назначения, этапы мультимодального маршрута.",
   "Вид груза, габариты, вес, упаковка и ограничения.",
   "Сборный, контейнерный или выделенный транспорт, требования к транзиту.",
   "Согласованная дата готовности и допустимое окно доставки."
  ]),
  section("2. Три вопроса о ролях","Компания может быть перевозчиком, экспедитором, таможенным представителем или посредником. Роль должна следовать из фактических договоров и возможностей, без автоматического переноса полномочий.",[
   "Кто сторона договора и какой именно объем услуг принимает на себя?",
   "Кто организует таможенные действия, какие полномочия реально подтверждены?",
   "Как распределяются контроль этапов, связь и ответственность за исключения?"
  ]),
  section("3. Три проверки коммерческой ставки","Ставка «под ключ» требует расшифровки. Не придумывайте таможенные платежи, страховое покрытие и конечные сроки там, где условий недостаточно.",[
   "Какие транспортные, терминальные, складские и документарные операции включены?",
   "Какие расходы переменные и по каким условиям рассчитываются?",
   "Что известно об ответственности, страховании и порядке урегулирования претензий?"
  ]),
  section("4. Два источника фактической готовности","Кодекс ЕАЭС задает общую нормативную основу таможенных процедур в пределах применимости. Текущие маршруты, ограничения и полномочия конкретного исполнителя требуют отдельной проверки на дату запроса.",[
   "Публичное описание реально обслуживаемого направления с датой проверки.",
   "Подтвержденная роль исполнителя, документы и ответственный контакт."
  ]),
  section("Как исправлять ошибку в ответе","Если нейросеть приписывает логисту самостоятельное таможенное оформление и страхование, проверьте договорный статус, условия услуги и источник. Ошибку фиксируют отдельно от упоминания бренда и отдельно от наличия компании в рейтинге."),
  section("Перелинковка маршрутов и повторное измерение","Страница направления, виды грузов, дополнительные услуги и форма расчета должны ссылаться друг на друга по реальным условиям. В GAEO сохраняют фиксированную матрицу промптов и дату. Смену доступности маршрута нельзя автоматически считать эффектом GEO-продвижения.")
 ],[
  faq("Достаточно ли запроса «перевозка из Китая»?","Нет. Для выбора исполнителя нужны пункт отправления, назначения, тип груза, услуги и сроки."),
  faq("Любой экспедитор является таможенным представителем?","Нет. Юридические роли и необходимые полномочия нужно проверять по документам и применимому регулированию."),
  faq("Можно ли сравнивать 2 ставки «под ключ» напрямую?","Только после сверки включенных операций, исключений, переменных расходов и ответственности."),
  faq("Что делать с устаревшим маршрутом в ответе нейросети?","Сохранить источник и дату, проверить доступность и исправить актуальное публичное описание. В отчете выделить изменение маршрута отдельно."),
  faq("Означает ли упоминание компании, что доставка гарантирована?","Нет. BMR показывает частоту упоминаний в заданной выборке, но не договорную возможность исполнить перевозку.")
 ]),
 page("International freight forwarder selection: 12 route and quotation checks for AI search",
  "A procurement checklist for international logistics GEO: shipment scope, freight roles, customs responsibilities, quotes and dated route evidence.",
  "An AI answer saying that a company ships from China is not enough to select a forwarder. Comparable offers require a defined shipment, service responsibility and quote scope. These twelve checks turn generic recommendations into an auditable procurement decision.",
  "Compare forwarders only against the same cargo, route, services and accountability.",[
  section("1. Four shipment identifiers","Even the same origin and destination can lead to incomparable rates when cargo and service assumptions differ.",[
   "Precise origin and destination plus multimodal legs.",
   "Cargo type, dimensions, weight, packaging and restrictions.",
   "Groupage, container or dedicated transport requirements.",
   "Cargo readiness date and acceptable delivery window."
  ]),
  section("2. Three legal-role questions","Carriers, freight forwarders, customs representatives and brokers do not have interchangeable legal roles.",[
   "Who is the contracting party and what services are actually promised?",
   "Who performs or arranges customs formalities under verified authority?",
   "Who tracks milestones and handles exceptions and claims?"
  ]),
  section("3. Three quotation checks","An all-inclusive quotation needs an itemized scope and clear exceptions.",[
   "Which freight, terminal, storage and document operations are included?",
   "Which charges vary and under what assumptions?",
   "What liability, insurance and dispute procedures are actually agreed?"
  ]),
  section("4. Two readiness proofs","The EAEU Customs Code provides the general legal framework where applicable, not evidence that a particular provider may perform every service.",[
   "A dated, accurate description of the route and service availability.",
   "Verified provider role, public documents and an accountable contact."
  ]),
  section("Review an unsupported answer","If an AI answer attributes customs representation and insurance directly to a forwarder, verify the contractual role, service scope and cited source. Record the error independently from the brand mention."),
  section("Link architecture and repeatability","Connect route pages to cargo rules, optional services and an RFQ form. Retain a fixed query sample and observation dates. Changes in route availability must not be presented automatically as GEO-driven improvement.")
 ],[
  faq("Is «shipping from China» a complete buyer prompt?","No. A usable shortlist requires origin, destination, cargo constraints, service scope and dates."),
  faq("Is every forwarder a customs representative?","No. Roles and authorisations must be verified against the relevant regulation and records."),
  faq("Are two all-in quotations directly comparable?","Only after included items, exclusions, variable charges and responsibilities are matched."),
  faq("How should an outdated route claim be handled?","Record the source and date, verify availability and correct the public route description; report the change separately."),
  faq("Does a mention guarantee freight capacity?","No. BMR counts mentions under a defined sample; it does not establish contractual or operational capability.")
 ])
 ),
 guide(59,"clinic-directory","private-clinic-branch-facts-checklist",[
  {url:"https://roszdravnadzor.gov.ru/medactivities/licensing",ru:"Росздравнадзор: лицензирование медицинской деятельности и документы",en:"Roszdravnadzor: medical activity licensing and official documents"},
  {url:"https://roszdravnadzor.gov.ru/services/licenses",ru:"Росздравнадзор: единый реестр лицензий",en:"Roszdravnadzor: unified licence register"}
 ],
 page("Частная клиника в рекомендациях нейросетей: 12 проверок филиала, врача и записи",
  "Чек-лист GEO для клиник: организация, адрес, лицензируемые услуги, реальные врачи, запись и аккуратные медицинские формулировки.",
  "Нейросеть может верно назвать медицинский бренд и при этом отправить пациента не в тот филиал или на услугу, которая там недоступна. Для маркетинговой проверки важны сведения о самой организации, ее адресах, специалистах и записи, подтвержденные актуальными источниками.",
  "Для рекомендаций клиники проверяйте конкретный филиал и доступность услуги, а не только совпадение бренда.",[
  section("1. Четыре проверки филиала","Публикуемую услугу нельзя автоматически приписывать всей сети. Команда клиники подтверждает организационные сведения по каждому месту оказания помощи.",[
   "Юридическое лицо и наименование организации, используемое публично.",
   "Фактический адрес и способы связи для выбранного филиала.",
   "Виды деятельности и работы (услуги) в актуальной записи лицензии, когда лицензия требуется.",
   "Действующее расписание и канал записи именно в этот филиал."
  ]),
  section("2. Три проверки карточек услуг","Информация для пациентов описывает организационные условия и не заменяет медицинское решение специалиста.",[
   "Название услуги совпадает с реальной номенклатурой и перечнем клиники.",
   "Цена или порядок ее уточнения, ограничения и изменения условий понятны посетителю.",
   "Маршрут записи, подготовка и ограничения публикации подтверждены ответственным сотрудником."
  ]),
  section("3. Три проверки врача","Указание фамилии не доказывает, что врач принимает в конкретном филиале завтра или ведет заявленную услугу.",[
   "ФИО, реальная специализация, должность и место приема согласованы.",
   "Профессиональные сведения публикуются с необходимым разрешением и проверкой.",
   "Расписание, профиль и страница записи не противоречат друг другу."
  ]),
  section("4. Два ограничения медицинского контента","Росздравнадзор предоставляет нормативные материалы и доступ к реестру лицензий. Общий источник не является подтверждением лицензии конкретной клиники. Медицинские заявления проходят квалифицированную редакционную проверку.",[
   "Никаких обещаний излечения, универсальной безопасности или неподтвержденных преимуществ.",
   "Никаких диагнозов, историй болезни или персональных данных пациентов в журнале GEO-замера."
  ]),
  section("Сценарий ошибки и ее исправления","Пациент спрашивает, где записаться на исследование в определенном районе. Нейросеть называет сеть, но указывает филиал без этой услуги. Проверяющий сопоставляет адрес, наличие услуги, запись и источник, затем исправляет актуальную публичную информацию. Это ошибка пригодности рекомендации независимо от самого факта упоминания."),
  section("Замер и приоритеты доработок","GAEO сравнивает небрендовые вопросы выбора клиники на фиксированной выборке. BMR, точность филиала, услуги и пути записи оцениваются раздельно. Исследование не определяет показания к лечению и не доказывает медицинскую эффективность.")
 ],[
  faq("Достаточно ли номера лицензии в подвале?","Нет. Важна проверка актуальной записи и применимости лицензируемых работ к выбранной организации и месту оказания услуг."),
  faq("Можно ли считать все филиалы одной клиники взаимозаменяемыми?","Нет. Услуги, специалисты, часы работы и условия приема могут различаться, и это должно быть видно в публичных источниках."),
  faq("Нужны ли пациентские истории для GEO-измерения?","Нет. Для аудита рекомендаций достаточно публичных организационных сведений и обезличенных ответов нейросетей."),
  faq("Нейросеть рекомендовала клинику. Значит, она безопасна?","Нет. Частота упоминаний не является оценкой качества медицинской помощи, лицензии или клинических исходов."),
  faq("Что проверяют прежде всего?","Организацию, адрес, статус и объем лицензии, реальную услугу в филиале и актуальный способ записи.")
 ]),
 page("Private clinic recommendations: 12 checks for branches, practitioners and booking",
  "Medical GEO editorial checklist: branch identities, current licences, actual services, practitioner profiles and appointment paths.",
  "An AI answer may name the correct medical brand but send a patient to a branch that does not offer the requested service. A useful marketing audit therefore checks branch-level organisational facts, records and appointment availability, not clinical decisions.",
  "Verify the actual branch and available service, not merely the clinic brand in an AI answer.",[
  section("1. Four branch checks","Do not automatically extend a network-level service statement to every site. The provider validates each operational location.",[
   "Legal entity and the publicly used organization name.",
   "Actual address and current contact details.",
   "Licensed work or services in the current record where licensing is required.",
   "Current appointment channel and branch-specific schedule."
  ]),
  section("2. Three service-page checks","Patient-facing information describes availability and booking conditions without providing individual medical advice.",[
   "The service name matches the clinic’s actual service list and appropriate nomenclature.",
   "Prices, the way to confirm them and applicable limitations are stated.",
   "Booking, preparation text and publication wording are approved by qualified staff."
  ]),
  section("3. Three practitioner-profile checks","A practitioner mentioned on a website is not automatically available at every branch.",[
   "Identity, verified specialization, position and actual consultation site match.",
   "Professional details and publication permissions have been checked.",
   "Availability, profile content and appointment links agree."
  ]),
  section("4. Two medical safeguards","Roszdravnadzor publishes licensing materials and access to a public register. That is not proof of an individual clinic’s current authorisation.",[
   "No invented efficacy promises, guarantees of cure or unsupported clinical comparisons.",
   "No identifiable patient histories, diagnoses or personal medical records in GEO prompt logs."
  ]),
  section("Example: wrong branch recommendation","A user asks where to book a test in a neighbourhood. The answer names a real clinic network but points to a site without the service. Verify the actual location, service, booking path and source, then correct public information. This is a suitability error regardless of the brand mention."),
  section("Measurement and priorities","GAEO uses a fixed sample of unbranded clinic-selection queries. BMR, branch accuracy, service accuracy and booking accuracy remain separate metrics. Marketing measurement is not a clinical safety assessment.")
 ],[
  faq("Is displaying a licence number in a footer enough?","No. Check the current register record and whether applicable licensed activities cover the legal entity and location."),
  faq("Can all branches of a clinic be treated identically?","No. Services, practitioners, schedules and appointment procedures can differ."),
  faq("Are patient histories required for GEO?","No. Public organisational information and non-identifiable AI outputs suffice for this kind of audit."),
  faq("Does an AI recommendation prove clinical safety?","No. Mention frequency is not an evaluation of quality, licensing or treatment outcomes."),
  faq("What should be checked first?","Legal entity, branch, relevant licence record, current services and actual booking path.")
 ])
 )
];
