/** Phase 3B: editorial methodologies, not client case studies or new measurements.
 * Existing commercial routes are resolved by stable catalogue ID at build time.
 * Regulatory sources provide context, not approval of a particular business.
 */
const page=(title,description,lead,summary,sections,faq)=>({title:title+' | GAEO',h1:title,description,lead,summary,sections,faq,eyebrow:'GEO / AEO'});
const section=(title,p,bullets=[])=>({title,p:Array.isArray(p)?p:[p],bullets});
const faq=(q,a)=>({q,a});
const method=(id,key,slug,sources,ru,en)=>({key,ids:[id],routes:{method:{ru:'/strategies/'+slug+'/',en:'/en/strategies/'+slug+'/'}},sources,ru:{method:ru},en:{method:en}});
export const phase3BMethods=[
method(42,'industrial-equipment','industrial-equipment-evidence',[
 {url:'https://protect.gost.ru/tr/details/e65e8e23-48a8-430c-8664-df229a278766',ru:'Росстандарт: ТР ТС 010/2011 «О безопасности машин и оборудования»',en:'Rosstandart: TR CU 010/2011, safety of machinery and equipment'}
],
page('GEO для промышленного оборудования: методика проверки моделей и поставщиков',
 'Как измерять рекомендации производителя оборудования: модель, условия производительности, документы, пусконаладка и сервис. Методика GAEO.',
 'Для промышленного оборудования я разделяю 3 объекта: производителя, конкретную машину и исполнителя поставки. Нейросеть может правильно назвать бренд, но приписать модели чужую производительность или обещать сервис в регионе, где его нет. Поэтому замер упоминаний дополняю проверкой технической пригодности рекомендации.',
 'В GEO оборудования проверяю связку «модель, рабочий режим, документ, исполнитель», а не только присутствие названия завода в ответе.',[
 section('Сначала фиксируем объект и границы сравнения','Техническое задание на исследование начинается с реального производственного процесса. Станок, линия и отдельный узел не становятся взаимозаменяемыми только из-за похожего названия. Перед сбором запросов инженер заказчика подтверждает критерии применимости.',[
  'Материал, операция, диапазон размеров и требуемый результат обработки.',
  'Номинальная производительность вместе с условиями ее достижения, а не число без режима.',
  'Комплектация, требования к площадке, энергоснабжению и сопряжению с существующей линией.',
  'Роль компании: изготовитель, дилер, интегратор или сервисная организация.'
 ]),
 section('Матрица запросов повторяет работу закупщика','Разделяю исследование технологии, выбор модели и выбор исполнителя. Для коммерческого BMR использую согласованную группу запросов выбора компании. Вопросы о принципе работы сохраняю отдельно, чтобы информационный интерес не подменял спрос на поставку.',[
  'Кто производит оборудование для конкретного материала и рабочего диапазона?',
  'У кого заказать линию с монтажом и пусконаладкой на действующем предприятии?',
  'Как сравнить 2 модели при одинаковых требованиях к точности и загрузке?',
  'Какая компания обслуживает установленную модель в нужном регионе?'
 ]),
 section('Паспорт доказательств для каждого предложения',[
  'Для утверждения храню модель и модификацию, значение параметра, единицы измерения, условия испытания, URL или документ, дату проверки и ответственного инженера. Документ для другой серии не подтверждает характеристики выбранной машины.',
  'Карточка Росстандарта ТР ТС 010/2011 задает нормативный контекст безопасности машин и оборудования. Применимость регламента и документов к конкретному изделию подтверждает профильный специалист. Сама ссылка на регламент не доказывает соответствия производителя.'
 ],['Руководство и паспорт: сверить версию и конфигурацию машины.','Документы о соответствии: проверить изделие, заявителя, область действия и статус.','Пусконаладка и сервис: отделить обещание на сайте от подтвержденных условий договора.']),
 section('Как размечаю ответы нейросетей','В журнале сохраняю вопрос, нейросеть, дату, настройки доступа к поиску, полный ответ и использованные ссылки. По каждой рекомендации отдельно отмечаю совпадение компании, модели и условий применения. Неверная модель остается ошибкой даже при правильном названии бренда.',[
  'BMR считаю по заранее закрепленной методике и одной согласованной выборке.',
  'Технические ошибки учитываю отдельно: модель, параметры, комплектация, регион сервиса.',
  'Долю пригодных рекомендаций оцениваю только после инженерной проверки критериев.',
  'Отказы, сетевые ошибки и пустые ответы сохраняю; правила исключения фиксирую до замера.'
 ]),
 section('Какие страницы и связи исправлять','Если ошибается модификация, уточняю паспорт модели и связи между сериями. Если смешиваются изготовитель и дилер, разделяю сущности и договорные роли. Если пропадает пусконаладка, создаю доказательное описание состава услуги с границами ответственности. PDF сопровождается доступным HTML-описанием ключевых параметров.',[
  'Отдельная страница модели с реальными характеристиками и актуальной документацией.',
  'Страница применения с условиями испытания, а не универсальное обещание результата.',
  'Сервисная страница с подтвержденной географией, видами работ и контактами.',
  'Связь модели, изготовителя, поставщика и услуги монтажа без смешения ролей.'
 ]),
 section('Результат исследования и контроль повторного замера','Заказчик получает матрицу запросов, реестр доказательств, журнал ошибок и приоритеты доработок. Повторяю сопоставимые вопросы после изменений; новые модели и запросы добавляю отдельной группой. Это авторская методика GAEO, а не опубликованный кейс промышленного клиента. Рост упоминаний сам по себе не подтверждает техническую пригодность или рост продаж.')
 ],[
 faq('Нужно ли выводить все характеристики оборудования в HTML?','В HTML нужны параметры, по которым принимается решение, с условиями их применимости. Полное руководство можно сохранить отдельным документом, связав его с точной моделью.'),
 faq('Можно ли объединить изготовителя и дилера в одном замере?','Их можно сравнивать только при явно определенной задаче. Для выбора изготовителя и для покупки с монтажом нужны разные группы запросов и критерии.'),
 faq('Ссылка на ТР ТС подтверждает соответствие оборудования?','Нет. Она описывает нормативный контекст. Подтверждение проверяется по применимым документам конкретного изделия и их актуальному статусу.'),
 faq('Как учитывать неверную производительность в ответе?','Сохранить упоминание для расчета BMR по общей методике, а недостоверный параметр отметить отдельной ошибкой. Эти показатели не подменяют друг друга.'),
 faq('Есть ли здесь измеренный результат GAEO для завода?','Нет. Здесь описана процедура исследования и будущей работы. Клиентский результат требует отдельного подтвержденного кейса.')
 ]),
page('Industrial equipment GEO: verifying models, suppliers and technical evidence',
 'A GAEO method for measuring equipment recommendations against model specifications, operating conditions, compliance evidence and service scope.',
 'I separate the manufacturer, the exact machine and the company responsible for delivery. An AI answer may name the right brand yet attach another model’s output rate or invent local servicing. Mention tracking therefore needs a separate assessment of technical suitability.',
 'Equipment GEO connects an exact model and operating conditions to evidence and a responsible supplier.',[
 section('Define the procurement object','Start with the actual industrial process. A machine, a production line and an individual component are not substitutes merely because their names overlap. The customer’s engineer approves the applicability criteria before query collection.',[
 'Material, operation, dimensional range and required processing outcome.','Rated output together with the conditions under which it is achieved.','Configuration, site requirements, utilities and integration with the existing line.','Business role: manufacturer, dealer, integrator or maintenance provider.']),
 section('Build queries around procurement decisions','Keep technology research, model selection and supplier selection in separate groups. The agreed commercial sample measures company-selection queries; educational questions do not silently inflate the procurement denominator.',[
 'Which manufacturer supplies equipment for this material and operating range?','Who can supply, install and commission a line at an operating plant?','How do two models compare under the same accuracy and loading requirements?','Which provider services this installed model in the required region?']),
 section('Create a model-specific evidence record',[
 'For each claim retain the model and revision, value, units, test conditions, source, verification date and responsible engineer. Documentation for a different series cannot validate the selected machine.',
 'Rosstandart’s TR CU 010/2011 entry supplies the regulatory context for machinery safety. A qualified specialist checks applicability and item-specific documents. Linking to a regulation does not certify a manufacturer.'
 ],['Match manuals and data sheets to the supplied configuration.','Check the product, applicant, scope and status of applicable conformity documents.','Distinguish documented commissioning and service terms from unsupported marketing copy.']),
 section('Code mentions and suitability separately','Retain the question, AI system, date, search settings, full answer and cited sources. For every recommendation verify the organization, exact model and operating conditions. A wrong model is still an error even when the brand is correct.',[
 'Apply the agreed BMR definition to a stable sample.','Record model, specification, configuration and service-location errors separately.','Assess suitability only after engineering review.','Log refusals, empty outputs and network failures; define exclusions before collection.']),
 section('Repair the evidence that caused the error','A revision error calls for a clearer model page and series relationships. A manufacturer/dealer mix-up calls for distinct entities and contractual roles. A missing commissioning service calls for a documented scope of work. Publish decision-critical facts in HTML alongside the complete manual.',[
 'Model pages with verified specifications and current documentation.','Application pages with test conditions rather than unconditional performance claims.','Service pages with verified locations and scope.','Explicit relationships between the model, manufacturer, supplier and commissioning service.']),
 section('Deliverables and repeat measurement','The output is a query matrix, evidence register, error log and prioritized corrections. Repeat comparable queries after changes; add new models in a separate cohort. This is GAEO’s proposed research method, not a completed manufacturing client case. More mentions alone establish neither technical suitability nor sales growth.')
 ],[
 faq('Must every specification be published in HTML?','Publish the facts that drive selection and their conditions in HTML. Keep the full manual as a linked document attached to the exact model.'),
 faq('Can dealers and manufacturers share a sample?','Only with a clearly defined selection objective. Choosing a manufacturer and buying an installed solution usually require separate query groups.'),
 faq('Does a regulation link prove conformity?','No. It explains the regulatory context. Check the applicable documents and current status for the actual product.'),
 faq('How is an invented output rate recorded?','Retain the brand mention under the agreed BMR definition and flag the unsupported parameter separately. These metrics answer different questions.'),
 faq('Does this page report a measured factory client result?','No. A verified client outcome requires a separate case study with its baseline and follow-up evidence.')
 ])),
method(48,'packaging','packaging-material-evidence',[
 {url:'https://protect.gost.ru/tr/details/0ab50d83-4a64-455d-9c59-04b5ef9336b9',ru:'Росстандарт: ТР ТС 005/2011 «О безопасности упаковки»',en:'Rosstandart: TR CU 005/2011, packaging safety'},
 {url:'https://docs.eaeunion.org/documents/429/8416/',ru:'ЕЭК: решение №118 о введении изменений в ТР ТС 005/2011',en:'EEC Decision 118: implementation of amendments to TR CU 005/2011'}
],
page('GEO для упаковки: методика проверки материала, назначения и тиража',
 'Как исследовать рекомендации производителей упаковки, тары и этикеток: материал, контакт с продуктом, испытания, тираж, оснастка и сроки.',
 'Покупатель упаковки выбирает сочетание материала, конструкции и условий производства. Ответ «подходит для пищевых продуктов» без указания конкретного изделия слишком широк. В методике я проверяю, совпадает ли рекомендация с назначением упаковки, требованиями заказчика и документами поставщика.',
 'В GEO упаковки сравниваю конкретное изделие, условия использования и производственные ограничения, а не только название материала.',[
 section('Разделяем упаковку, тару и этикетку','До замера определяю, что именно выбирает заказчик: первичную упаковку, транспортную тару или нанесение информации. Совпадение материала не доказывает одинакового назначения. Вопрос применимых требований передается специалисту по качеству конкретного продукта.',[
 'Тип изделия и продукт, с которым оно используется.','Материал, конструкция, размер и критичные свойства.','Контакт с содержимым, температура и срок использования.','Тираж, повторные партии, печать и требуемая оснастка.']),
 section('Запросы, на которые должен отвечать поставщик','Собираю матрицу по отдельным сценариям: запуск нового продукта, повторный заказ и смена поставщика. Условия в вопросах должны соответствовать возможностям бизнеса, а не специально подбираться под заранее желаемый ответ.',[
 'Кто изготовит упаковку под заданный продукт с подтвержденными условиями применения?','Где заказать пробную партию перед серийным тиражом?','Кто обеспечит повторяемость размера и печати между поставками?','Как выбрать изготовителя этикеток под материал поверхности и условия хранения?']),
 section('Чем подтверждать свойства изделия',[
 'Записываю артикул или техническое описание, назначение, заявленное свойство, метод проверки и источник. Для прочности, барьерных свойств и совместимости нужны условия испытания. Красивый образец сам по себе не подтверждает свойства всей партии.',
 'ТР ТС 005/2011 и материалы ЕЭК об изменениях дают нормативный контекст. Применимость, переходные положения и документы проверяются для конкретной упаковки. Этикетку нельзя автоматически считать упаковкой с тем же набором требований.'
 ],['Согласованная спецификация и версия макета.','Документы и протоколы для соответствующего изделия и условий.','Параметры партии, допуски и порядок приемки.','Состав цены: изделие, печать, оснастка, образец и доставка.']),
 section('Как находить опасные обобщения','Проверяю каждое утверждение ответа о контакте с продуктом, температуре, переработке и совместимости. Экологические определения без проверяемого основания помечаю как неподтвержденные. Данные одной конструкции не переношу на весь ассортимент.',[
 'Бренд упомянут: отдельная отметка для BMR.','Изделие соответствует назначению: отдельная проверка фактов.','Названы реальные тираж и срок: сверка с датированным предложением.','Источник относится к нужной продукции: проверка области действия.']),
 section('Структура сайта под закупочную задачу','Страница семейства объясняет варианты, а страница конкретного решения связывает назначение со спецификацией. Условия образца, макета и повторного заказа описываются отдельно. Ссылки между ними должны вести к актуальным версиям.',[
 'Назначение и ограничения использования обычным текстом.','Документы с датой и областью применения.','Процедура согласования образца и допуска к тиражу.','Условия повторяемости партии и обращения по качеству.']),
 section('Приемка исследования','В отчете отдельно показываю упоминания, пригодность изделия и ошибки в свойствах. Сохраняю вопросы и параметры замера, чтобы повторное сравнение не смешивало разные товары и объемы заказа. Клиентские показатели роста здесь не заявлены; результат этой работы представляет собой проверяемую методику и задания на исправление источников.')
 ],[
 faq('Достаточно ли назвать материал упаковки?','Нет. Для проверки рекомендации нужны изделие, назначение и условия использования. Свойства могут зависеть от конструкции и конкретной спецификации.'),
 faq('Можно ли обещать пищевую пригодность всей продукции?','Обобщение допустимо только при подтверждении применимости ко всему заявленному ассортименту. В методике проверка ведется по конкретным изделиям и документам.'),
 faq('Как учитывать минимальный тираж?','Сохранять его вместе с датой, конструкцией, печатью и условиями оснастки. Условия другого заказа не переносятся автоматически.'),
 faq('Нужны ли отдельные запросы для этикеток?','Да. Для этикеток важны поверхность, материал, способ нанесения и условия хранения; это иной сценарий, чем выбор транспортной тары.'),
 faq('Рост BMR подтверждает качество упаковки?','Нет. BMR описывает присутствие бренда в согласованной выборке. Качество и соответствие назначению проверяются отдельно.')
 ]),
page('Packaging GEO: verifying materials, intended use and production constraints',
 'A GAEO method for evaluating packaging, container and label supplier recommendations against use conditions, evidence, batch size and tooling.',
 'Packaging buyers select a combination of material, construction and manufacturing conditions. An unqualified claim such as suitable for food is too broad. I test whether a recommendation matches the actual product, intended use and supplier evidence.',
 'Packaging GEO compares an identifiable item, its use conditions and production constraints rather than a material name alone.',[
 section('Separate packaging, containers and labels','Define whether the buyer needs primary packaging, transport protection or information applied to a product. Similar materials do not establish identical intended use. The customer’s quality specialist checks applicable requirements.',[
 'Item type and the product it accompanies.','Material, structure, size and critical properties.','Contact with contents, temperatures and duration of use.','Order size, repeat batches, printing and tooling.']),
 section('Use realistic purchasing scenarios','Build separate groups for a product launch, repeat order and supplier replacement. Query conditions should reflect the business’s actual capabilities, not be selected merely to force a preferred recommendation.',[
 'Who can manufacture packaging for the specified product with supported use conditions?','Where can a trial batch be ordered before production?','Which supplier can document dimensional and print consistency between batches?','How can label suppliers be compared for the intended surface and storage conditions?']),
 section('Tie each property to evidence',[
 'Record the item code or specification, intended use, claimed property, verification method and source. Strength, barrier performance and compatibility require stated test conditions. An attractive sample does not validate an entire production batch.',
 'TR CU 005/2011 and the EEC amendment materials provide regulatory context. Check applicability, transitional provisions and documentation for the actual packaging. Do not automatically treat a label as packaging subject to an identical set of requirements.'
 ],['Approved specification and artwork revision.','Applicable documents and test conditions.','Batch tolerances and acceptance procedure.','Price components: item, printing, tooling, samples and delivery.']),
 section('Detect unsupported generalizations','Review every claim about product contact, temperature, recyclability and compatibility. Flag environmental wording that lacks evidence. Properties of one construction do not apply to the entire catalogue.',[
 'Track brand mentions using the agreed BMR definition.','Check intended-use suitability separately.','Verify batch sizes and lead times against dated offers.','Confirm that the cited evidence covers the actual item.']),
 section('Structure pages around the buying decision','A product-family page explains options; the specific solution page links intended use to a specification. Keep sample approval, artwork and repeat-order conditions distinct and link only to current versions.',[
 'Intended use and limitations in readable text.','Documents with dates and explicit scope.','Sample approval and production-release procedure.','Batch consistency and quality-issue procedures.']),
 section('Accept the research, not a fictional result','Report mentions, suitability and property errors separately. Retain the query set and collection conditions so follow-ups do not silently compare different products or order sizes. This page claims no measured client growth; its deliverables are a repeatable assessment and source-correction brief.')
 ],[
 faq('Is the packaging material enough to validate a recommendation?','No. Identify the item, intended use and operating conditions. Construction and specification can affect suitability.'),
 faq('Can all products be described as food-compatible?','Only where the supporting evidence covers the full claimed scope. This method checks individual items and applicable documents.'),
 faq('How should minimum order quantities be recorded?','Keep the date, construction, print specification and tooling conditions with the quantity. Do not transfer terms from an unrelated order.'),
 faq('Do labels need separate query groups?','Yes. Surface, material, application method and storage conditions create a different selection task from transport packaging.'),
 faq('Does higher BMR validate packaging quality?','No. BMR describes brand presence in the agreed sample. Product quality and intended-use suitability require separate checks.')
 ])),
method(55,'international-logistics','international-logistics-route-evidence',[
 {url:'https://eec.eaeunion.org/comission/department/dep_tamoj_zak/tk_eaes.php',ru:'ЕЭК: Таможенный кодекс ЕАЭС и документы об изменениях',en:'EEC: EAEU Customs Code and amendment documents'}
],
page('GEO международной логистики: методика проверки маршрута и условий перевозки',
 'Как проверять рекомендации международных перевозчиков и экспедиторов: маршрут, груз, договорные роли, состав ставки и сопоставимый BMR.',
 'В международной логистике название компании без маршрута и характеристик груза мало говорит о пригодности предложения. Я фиксирую коридор перевозки, роль исполнителя и состав цены, затем проверяю, какие именно условия нейросеть приписала рекомендованной компании.',
 'Рекомендацию логистической компании проверяю по маршруту, грузу, роли исполнителя и датированным условиям, а не по обещанию «доставки под ключ».',[
 section('Описываем конкретную перевозку','Единица исследования: страна и пункт отправления, пункт назначения, вид транспорта, характеристики груза и требуемый состав услуг. Сборная партия и выделенный транспорт исследуются отдельно. Подтвержденная перевозка одного груза не доказывает работу с любыми товарными категориями.',[
 'Масса, объем, упаковка и условия обращения с грузом.','Маршрут, перегрузки и зоны ответственности.','Перевозчик, экспедитор, склад и таможенный представитель как разные роли.','Требуемые документы и специальные условия, которые подтверждает профильный специалист.']),
 section('Формируем коммерческую выборку','Включаю реальные вопросы выбора исполнителя и сохраняю точные условия. Общие запросы о внешней торговле составляют отдельную исследовательскую группу. Запрос с неизвестными параметрами не дает основания считать любую названную компанию подходящей.',[
 'Кто организует сборную поставку по заданному маршруту и объему?','У кого запросить перевозку оборудования с особыми условиями погрузки?','Какая компания раскрывает состав ставки и возможные дополнительные платежи?','Кто отвечает за документы и коммуникацию при задержке на отдельном этапе?']),
 section('Реестр условий и доказательств',[
 'Для каждой услуги сохраняю источник, дату и срок действия предложения. Ставку связываю с маршрутом, грузом, валютой, составом услуг и исключениями. Срок доставки разделяю на этапы; рекламное число без начального и конечного события не использую как доказательство.',
 'Страница ЕЭК содержит Таможенный кодекс ЕАЭС и документы об изменениях. Она нужна для проверки нормативной базы специалистом по таможенному оформлению. Методика GEO не заменяет классификацию товара, правовую экспертизу или проверку применимых ограничений.'
 ],['Участок перевозки и фактический исполнитель.','Ставка и включенные операции на согласованную дату.','Документы, страхование и ответственность по подтвержденным условиям.','Контакт и процедура действий при отклонении от маршрута или графика.']),
 section('Проверяем ответ по этапам','Сначала устанавливаю, правильно ли определена компания и ее роль. Затем проверяю маршрут, допустимость груза, документы и состав предложения. Наличие компании в ответе сохраняется для BMR, а несовпадение условий получает отдельную отметку.',[
 'Не переносить собственный транспорт перевозчика на экспедитора без подтверждения.','Не считать таможенное оформление автоматически включенным в перевозку.','Не выдавать ориентир срока за договорную гарантию.','Не переносить действовавшую ранее ставку на новый маршрут и дату.']),
 section('Какие материалы дают проверяемый ответ','Разделяю страницы маршрутов, видов грузов и дополнительных услуг. Каждый маршрут получает дату актуализации и границы предложения. Кейс описывает конкретную перевозку с разрешенными к раскрытию фактами; название клиента и коммерческие документы не публикуются без разрешения.',[
 'Маршрут: отправление, назначение, способы доставки и ограничения.','Груз: необходимые исходные данные для расчета и приемки.','Услуга: конкретная роль исполнителя и состав работ.','Источники: датированные условия и контакты для их уточнения.']),
 section('Как сравнивать динамику','Сохраняю постоянную группу маршрутов и вопросов. Изменение доступности направления или состава услуги фиксирую отдельно от эффекта GEO. В отчете показываю BMR, ошибки в условиях и обоснованность рекомендации. Методика не обещает прохождение таможни, неизменность ставки или гарантированное время перевозки и не выдает будущую работу за выполненный клиентский кейс.')
 ],[
 faq('Достаточно ли замера «лучшие логистические компании»?','Для общей известности он может быть полезен. Для выбора исполнителя нужны маршрут, груз и объем услуги, иначе рекомендации трудно проверить.'),
 faq('Как сравнивать ставки разных компаний?','Сначала выровнять маршрут, характеристики груза, дату, валюту и включенные операции. Неполная ставка не сопоставима с предложением другого состава.'),
 faq('Можно ли считать экспедитора перевозчиком?','Роль нужно проверять по конкретной услуге и документам. Организация перевозки не доказывает владение транспортом или выполнение каждого этапа.'),
 faq('Что делать с устаревшим сроком доставки в ответе?','Сохранить ответ и его источник, отметить дату и ошибку, затем исправить доступное описание услуги. Повторный замер проводить при сопоставимых условиях.'),
 faq('Есть ли здесь гарантия таможенного выпуска?','Нет. Методика описывает проверку информационных источников и рекомендаций. Решения по конкретной поставке требуют профильной проверки.')
 ]),
page('International logistics GEO: verifying routes, service roles and freight terms',
 'A GAEO method for testing logistics recommendations against routes, cargo requirements, contractual roles, quote scope and comparable BMR samples.',
 'A logistics company name says little about suitability without a route and cargo specification. I record the transport corridor, the provider’s role and the price scope, then check which conditions an AI answer actually attributes to that company.',
 'Assess a logistics recommendation against its route, cargo, provider role and dated terms rather than an undefined door-to-door promise.',[
 section('Define the actual shipment','The research unit combines origin, destination, transport mode, cargo characteristics and required services. Groupage and dedicated transport belong in different segments. One completed shipment does not establish capability for every cargo category.',[
 'Weight, volume, packaging and handling requirements.','Route, transfers and responsibility boundaries.','Carrier, forwarder, warehouse and customs representative as distinct roles.','Documentation and special conditions confirmed by a qualified specialist.']),
 section('Build the commercial sample','Use real provider-selection questions with explicit conditions. General foreign-trade questions form a separate research group. Missing shipment parameters prevent a reliable suitability judgment.',[
 'Who can arrange a groupage shipment on the specified route?','Who can quote equipment transport with particular loading requirements?','Which provider explains included charges and potential extras?','Who handles documentation and communications if one stage is delayed?']),
 section('Keep dated evidence for each term',[
 'Record the source, date and validity of each offer. Link the quote to the route, cargo, currency, included operations and exclusions. Divide delivery estimates into stages; a duration without defined start and end events is not usable evidence.',
 'The EEC page provides the EAEU Customs Code and amendment documents for specialist review. A GEO assessment is not a substitute for tariff classification, legal review or verification of applicable trade restrictions.'
 ],['Transport segment and actual provider.','Rate and included operations on an agreed date.','Documentation, insurance and responsibility under supported terms.','Contact and procedure for route or schedule deviations.']),
 section('Review each stage of the recommendation','First verify the company and its role, then the route, cargo conditions, paperwork and offer scope. Keep the mention in BMR under the agreed definition and flag unsupported conditions separately.',[
 'Do not attribute an owned fleet to a forwarder without evidence.','Do not assume customs services are included in freight.','Do not convert an indicative duration into a contractual guarantee.','Do not reuse an old rate for a different route or date.']),
 section('Publish evidence around buying decisions','Separate route pages, cargo guidance and additional services. Date route conditions and state the offer’s boundaries. A case describes a particular shipment using facts approved for disclosure; private customer and commercial records stay private.',[
 'Route: origin, destination, transport options and limitations.','Cargo: information required for quotation and acceptance.','Service: actual provider role and scope.','Evidence: dated terms and a contact for confirmation.']),
 section('Make follow-ups comparable','Keep a stable cohort of routes and questions. Record route availability or scope changes separately from GEO activity. Report BMR, condition errors and supported recommendations. This method guarantees neither clearance nor a fixed rate or transit time, and it is not a completed logistics client case.')
 ],[
 faq('Is a best logistics companies query sufficient?','It may measure broad awareness. Provider selection requires route, cargo and scope so the recommendation can be checked.'),
 faq('How can different freight quotes be compared?','Align route, cargo, date, currency and included operations first. Offers with different scopes are not directly comparable.'),
 faq('Is a forwarder necessarily the carrier?','Check the role in the actual contract and service. Arranging transport does not prove fleet ownership or direct performance of every stage.'),
 faq('How is an outdated transit time handled?','Preserve the answer and source, flag the date and error, correct accessible service information and repeat under comparable conditions.'),
 faq('Does this methodology guarantee customs clearance?','No. It evaluates information and recommendations. A particular shipment requires qualified review.')
 ])),
method(59,'private-clinics','private-clinics-service-evidence',[
 {url:'https://roszdravnadzor.gov.ru/services/licenses',ru:'Росздравнадзор: Единый реестр лицензий, адреса и работы (услуги)',en:'Roszdravnadzor: unified licence register, addresses and licensed activities'},
 {url:'https://www.roszdravnadzor.gov.ru/Medactivities/Licensing',ru:'Росздравнадзор: лицензирование медицинской деятельности',en:'Roszdravnadzor: medical activity licensing information'}
],
page('GEO частных клиник: методика проверки филиалов, услуг и рекомендаций',
 'Как исследовать рекомендации частных клиник без медицинских обещаний: юридическое лицо, филиал, лицензия, услуга, врач, цена и запись.',
 'У клиники важно проверять не только название сети, но и конкретный филиал, услугу и условия записи. Я отделяю вопросы выбора медицинской организации от вопросов диагностики и лечения. Методика посвящена достоверности информации о клинике; медицинские утверждения согласует профильный специалист.',
 'В GEO клиник проверяю связку «организация, филиал, услуга, источник»; частота упоминаний не доказывает качество лечения.',[
 section('Граница задачи: выбор организации','Исследую коммерческие и организационные вопросы: где доступна определенная услуга, как уточнить стоимость и записаться. Запросы с симптомами, выбором терапии и неотложными состояниями не включаю в рекламную выборку. Конкретные медицинские решения остаются за медицинским специалистом.',[
 'Юридическое лицо и бренд сети.','Адрес и контакты конкретного филиала.','Наименование услуги и условия ее доступности.','Врач, расписание и цена только на подтвержденную дату.']),
 section('Запросы строятся по услугам и географии','Матрица отражает реальные направления клиники и доступные филиалы. Вопрос не должен подсказывать искомый бренд. Для сети разделяю общий результат и результат по адресам, чтобы известность одной точки не скрывала ошибки другой.',[
 'В какой частной клинике в нужном районе можно уточнить запись на указанную услугу?','Где проверить лицензию медицинской организации и адрес оказания услуги?','Какая клиника публикует состав услуги и актуальные условия оплаты?','Как найти контакты нужного филиала и уточнить расписание приема?']),
 section('Проверяем лицензию по организации и адресу',[
 'Единый реестр Росздравнадзора позволяет искать лицензиата по идентификаторам организации; в сервисе предусмотрены сведения об адресах и работах (услугах). Для исследования фиксирую дату проверки и сопоставляю юридическое лицо, филиал и нужный вид деятельности. Лицензия не является доказательством превосходства лечения.',
 'Материалы Росздравнадзора по лицензированию используются как первичный справочный источник. Применимость записи, состав медицинских утверждений и допустимость публикации проверяет уполномоченный специалист клиники. GAEO не выступает лицензирующим органом или медицинским консультантом.'
 ],['Юридическое лицо, ИНН и название бренда не смешиваются.','Адрес услуги проверяется отдельно от адреса головного офиса.','Название услуги согласуется с реальным предложением клиники.','Неизвестный статус отмечается как непроверенный, а не как отсутствие лицензии.']),
 section('Как оценивать ответы без подмены медицинской экспертизы','В каждом ответе проверяю организационные факты: филиал, услугу, специалиста, контакты и условия записи. Отдельно отмечаю выдуманные медицинские преимущества, обещания излечения и неподтвержденные сравнения. Такие формулировки не используются как удачные рекламные цитаты.',[
 'BMR отражает упоминания в зафиксированной выборке, а не безопасность лечения.','Факт правильного филиала и услуги учитывается отдельно.','Медицинские утверждения передаются профильному редактору.','Ошибки, отказы и недоступные источники сохраняются в журнале.']),
 section('Что исправлять на сайте и в профилях','Для филиала нужны согласованные название, адрес, телефон и часы работы. Для услуги: содержание предложения, действующие условия и путь записи. Страница врача связывается с подтвержденным профилем и актуальным местом приема. Изменение расписания не должно оставлять противоречащие версии на разных страницах.',[
 'Единая связь юридического лица, сети и филиалов.','Понятный переход от услуги к проверке условий и записи.','Проверяемые сведения о специалисте без выдуманных регалий.','Ссылки на действующие документы и дата актуализации значимых сведений.']),
 section('Данные, отчет и ограничения','Для анализа публичных ответов не нужны истории болезни, диагнозы и персональные данные пациентов. Отзывы и клиентские примеры не выдумываются. В отчете фиксирую BMR, ошибки филиалов и услуг, качество источников и задания на исправление. Это методика исследования, а не медицинская рекомендация и не подтвержденный кейс роста конкретной клиники.')
 ],[
 faq('Можно ли считать упоминание клиники рекомендацией лечения?','Нет. Упоминание организации и медицинская рекомендация имеют разный смысл. Эта методика проверяет сведения об услуге, филиале и доступных условиях записи.'),
 faq('Достаточно ли лицензии головного юридического лица?','Нужно сопоставить организацию, адрес и соответствующие работы (услуги). Конкретную применимость подтверждает уполномоченный специалист клиники.'),
 faq('Нужно ли передавать GAEO данные пациентов?','Для этой методики публичных рекомендаций они не нужны. Исследование строится на общедоступных сведениях и согласованной матрице запросов.'),
 faq('Кто проверяет тексты о медицинских услугах?','Медицинскую фактуру проверяет профильный специалист клиники. GAEO организует исследование видимости и работу с источниками, не подменяя медицинскую экспертизу.'),
 faq('Можно ли использовать обещание излечения из ответа нейросети?','Неподтвержденное обещание отмечается как ошибка. Оно не становится допустимым доказательством только потому, что его сформулировала нейросеть.')
 ]),
page('Private clinic GEO: verifying branches, services and recommendation evidence',
 'A GAEO method for assessing clinic recommendations through legal entities, branches, licences, services and appointment information without clinical claims.',
 'For a clinic, the network name is not enough: the exact branch, service and appointment conditions matter. I separate organization-selection questions from diagnosis and treatment. This method checks information about the clinic; qualified professionals review clinical claims.',
 'Clinic GEO connects the organization, branch and service to a source; mention frequency is not evidence of treatment quality.',[
 section('Limit the study to organization selection','Study organizational and commercial questions: service availability, price clarification and booking. Exclude symptom-based diagnosis, treatment selection and emergencies from the promotional sample. Medical decisions remain with qualified healthcare professionals.',[
 'Legal entity and network brand.','Actual branch address and contacts.','Service name and availability conditions.','Practitioner, schedule and price only as of a verified date.']),
 section('Segment queries by service and location','The sample reflects actual services and operating branches. Do not suggest the target brand in the question. For a network, report branch-level results alongside the overall metric so one well-known site does not conceal errors elsewhere.',[
 'Which private clinic in the required area offers information about booking this service?','Where can the organization’s licence and service address be checked?','Which clinic explains service scope and current payment terms?','How can a patient contact the correct branch to confirm appointment availability?']),
 section('Check the entity, address and licensed activity',[
 'The Roszdravnadzor unified register supports searches using organization identifiers and provides address and activity information. Record the verification date and match the legal entity, branch and relevant activity. A licence does not establish superior treatment outcomes.',
 'Roszdravnadzor’s licensing materials are primary reference sources. An authorized clinic specialist verifies applicability, clinical wording and publication suitability. GAEO is neither a licensing authority nor a medical adviser.'
 ],['Keep the legal entity, tax identifier and brand distinct.','Check the service address separately from headquarters.','Match the service wording to the clinic’s actual offer.','An unverified status is not evidence that a licence is absent.']),
 section('Review facts without claiming clinical authority','Verify branch, service, practitioner, contacts and booking conditions. Flag invented clinical advantages, cure promises and unsupported comparisons separately. Such text is not treated as a successful marketing quote.',[
 'BMR measures mentions in the fixed sample, not treatment safety.','Correct branch and service identification is a separate measure.','Clinical assertions require qualified editorial review.','Retain errors, refusals and unavailable sources in the log.']),
 section('Correct the website and public profiles','Each branch needs consistent names, contacts and opening hours. Service pages explain scope, current terms and the booking path. Practitioner pages connect verified profiles to actual appointment locations. Schedule changes should not leave contradictory versions online.',[
 'Consistent relationships between the entity, network and branches.','A clear route from service details to confirmation and booking.','Supported professional information without invented credentials.','Current documents and revision dates for material facts.']),
 section('Data handling and report limitations','Public recommendation analysis does not require patient records, diagnoses or personal health data. Do not invent reviews or customer examples. Report BMR, branch and service errors, source quality and correction tasks. This is an assessment methodology, not medical advice or a measured clinic growth case.')
 ],[
 faq('Does mentioning a clinic amount to treatment advice?','No. Organization selection and clinical recommendations are different. This method checks service and branch facts and appointment information.'),
 faq('Is a headquarters licence reference sufficient?','Match the legal entity, relevant address and applicable activities. An authorized clinic specialist confirms the specific scope.'),
 faq('Are patient records required for GAEO’s assessment?','No. This public-recommendation method uses public information and an agreed query matrix, not personal medical records.'),
 faq('Who reviews medical service content?','A qualified clinic professional reviews clinical facts. GAEO researches visibility and source consistency without replacing clinical expertise.'),
 faq('Can an AI-generated cure promise be reused as evidence?','An unsupported promise is an error. It does not become reliable evidence merely because an AI system produced it.')
 ]))
];
