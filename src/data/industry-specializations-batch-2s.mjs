/**
 * Phase 2S: building material manufacturers (#52) and workwear/PPE suppliers (#53).
 * Original RU/EN procurement-intent content and product-specific evidence boundaries.
 * Existing catalogue IDs, canonical GAEO tariffs, approved WebP, shared templates and industrial methodologies remain unchanged.
 * No fictitious client outcomes, blanket safety certifications or guaranteed AI recommendations.
 */
export const industrySpecializationsBatch2S = [
  {
    "id": 52,
    "slug": "building-material-manufacturers",
    "group": "industry",
    "routes": {
      "ru": "/industries/building-material-manufacturers/",
      "en": "/en/industries/building-material-manufacturers/"
    },
    "parent": {
      "ru": "/industries/metal-structures/",
      "en": "/en/industries/metal-structures/"
    },
    "methods": {
      "ru": [
        "/strategies/industrial-supplier-evidence/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/industrial-supplier-evidence/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как проверять сведения о промышленных поставщиках",
        "Методика измерения BMR"
      ],
      "en": [
        "Verifying industrial supplier evidence",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://mchs.gov.ru/deyatelnost/grazhdanskaya-oborona/opoveshchenie-naseleniya/normativno-pravovaya-baza/federalnyy-zakon-ot-30-dekabrya-2009-goda-384-fz-tehnicheskiy-reglament-o-bezopasnosti-zdaniy-i-sooruzheniy",
        "ru": "384-ФЗ, ст. 34: требования к материалам и соответствие проектной документации",
        "en": "Federal Law 384-FZ, Article 34: building materials and project requirements"
      },
      {
        "href": "https://protect.gost.ru/gost/details/540e6d41-0aa3-4280-a123-b983634fa349",
        "ru": "Росстандарт: ГОСТ 31108-2020 для общестроительных цементов",
        "en": "Rosstandart: GOST 31108-2020 for common cements"
      },
      {
        "href": "https://protect.gost.ru/gost/details/9eb7e295-f214-4040-a214-22f44be24024",
        "ru": "Росстандарт: ГОСТ 7473-2026 для определенных бетонных смесей, с 01.11.2026",
        "en": "Rosstandart: GOST 7473-2026 for specified fresh concrete, effective November 2026"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение производителей строительных материалов | GAEO.ru",
        "h1": "GEO-продвижение производителей строительных материалов",
        "description": "Продвижение производителей стройматериалов в нейросетях: смеси, цемент, фасады и утеплители, параметры, проектные требования, подтвержденные испытания и BMR.",
        "eyebrow": "Промышленность / Строительные материалы",
        "lead": "Проектировщик подбирает материал под конструкцию и условия эксплуатации, подрядчик уточняет технологию и сроки поставки. Проверяю, каких производителей нейросети предлагают по этим задачам и хватает ли на сайте достоверных характеристик конкретных изделий.",
        "heroPoints": [
          "Небрендовые запросы по материалу, проектному назначению и региону",
          "Проверка технических листов, условий испытаний и документов по изделию",
          "Раздельные страницы применений и контроль точности рекомендаций"
        ],
        "problemTitle": "Почему общая страница завода не помогает выбрать материал",
        "problemIntro": "Теплоизоляция, цемент, товарный бетон и фасадные смеси сравниваются по разным показателям. Условия применения и документы имеют значение не меньше торгового названия.",
        "problems": [
          {
            "title": "Показатель без испытательных условий",
            "body": "Прочность, теплопроводность и морозостойкость относятся к определенным материалам и методам испытаний. Без состава, условий и единиц измерения нейросеть может ошибочно сравнить несопоставимые изделия."
          },
          {
            "title": "Смешаны продукт и система применения",
            "body": "Клей, утеплитель, облицовка и крепеж работают в составе фасадного решения. Заявление о совместимости или сроке службы всей системы требует подтверждения ее компонентов и проектных ограничений."
          },
          {
            "title": "Документы и поставка оторваны от марки",
            "body": "Протокол испытаний, технический лист, класс материала, выпускаемый формат, партия и адрес производства должны относиться к конкретной позиции. Данные для товарного бетона нельзя без проверки переносить на сухие смеси."
          }
        ],
        "scenarioTitle": "Как покупатели ищут стройматериалы в нейросетях",
        "scenarioIntro": "Это примеры будущей матрицы GEO-замеров. Точный материал, условия проекта и перечень конкурентов устанавливаются при анализе производителя.",
        "columns": [
          "Вопрос проектировщика или закупщика",
          "Какие факты нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какого производителя теплоизоляции выбрать для фасада с заданными условиями?",
            "Тип утеплителя, заявленная теплопроводность, пожарные характеристики, совместимость системы и документы",
            "Подготовить отдельные страницы материалов и проверяемых областей применения"
          ],
          [
            "Где заказать готовую бетонную смесь с нужным классом прочности и сроком доставки?",
            "Марка/класс, подвижность, условия транспортировки, география РБУ и документ о качестве партии",
            "Соотнести реальные смеси и зоны поставок с запросом стройплощадки"
          ],
          [
            "Какие заводы выпускают общестроительный цемент нужного типа?",
            "Тип и класс цемента, характеристики, актуальные стандарты, упаковка и доступность",
            "Уточнить продуктовую классификацию и версии технических документов"
          ],
          [
            "Чем отличаются фасадные смеси для утепления и отделки?",
            "Основание, слой, технология нанесения, условия работ и системная совместимость",
            "Опубликовать инструкции по выбору из разрешенных технических источников"
          ]
        ],
        "proofTitle": "Какие подтверждения нужны перед публикацией преимуществ",
        "proofIntro": "Сопоставляю свойства материалов с документами производителя и реальными условиями применения. Статья 34 закона №384-ФЗ требует соответствия проектной документации и применимому техническому регулированию. ГОСТ 31108-2020 касается общестроительных цементов; ГОСТ 7473-2026 введен с 1 ноября 2026 года для предусмотренных им бетонных смесей. Сфера действия каждого документа проверяется по продукту.",
        "checks": [
          "Номенклатура и назначение: марка, состав, формат, класс, технические характеристики и условия испытаний",
          "Протоколы, документы о качестве, применимые стандарты, разрешенные сведения о системной совместимости",
          "Производственные площадки, наличие, партии, сроки поставки, техническая поддержка и разрешенные примеры объектов"
        ],
        "proofNote": "Эта страница описывает отраслевой метод GEO-аудита. Результаты продвижения конкретного изготовителя стройматериалов здесь не заявлены.",
        "workTitle": "Как организую GEO для производителя стройматериалов",
        "workIntro": "Матрицу рекомендаций составляю вокруг задач проектирования, строительства и закупки. Затем сопоставляю ответы нейросетей с первичной технической информацией.",
        "steps": [
          {
            "title": "Стартовый замер по применению",
            "body": "Разделяю запросы по материалам, типам конструкций, климату, географии и формату закупки; записываю исходные рекомендации."
          },
          {
            "title": "Проверка продуктовых данных",
            "body": "Согласую со специалистами производителя точные характеристики, документы, границы применимости и актуальность ассортимента."
          },
          {
            "title": "Страницы изделий и отраслевых решений",
            "body": "Подготовлю ТЗ для классов материалов, технических листов, совместимых систем, способов применения и подтвержденных поставок."
          },
          {
            "title": "Повторная проверка BMR",
            "body": "Повторяю исходные запросы и оцениваю упоминание бренда вместе с точностью характеристик и обоснованностью рекомендации."
          }
        ],
        "faq": [
          {
            "question": "Можно ли одновременно продвигать бетон, сухие смеси и утеплители?",
            "answer": "Да, при отдельной матрице запросов и характеристик каждого семейства. Общий каталог полезен для навигации, но выбор материала зависит от проекта и технической документации."
          },
          {
            "question": "Какой стандарт действует для товарных бетонных смесей с ноября 2026 года?",
            "answer": "По данным Росстандарта ГОСТ 7473-2026 введен в действие с 1 ноября 2026 года взамен ГОСТ 7473-2010. Он распространяется на предусмотренные его областью применения готовые смеси; применимость к товару проверяется отдельно."
          },
          {
            "question": "Может ли указание ГОСТ в тексте доказать соответствие товара?",
            "answer": "Нет. Для конкретной марки нужны фактические документы и характеристики. Номер стандарта в описании сам по себе не подтверждает испытания или применимость изделия к проекту."
          },
          {
            "question": "Нужны ли производителю отдельные страницы для фасадных систем?",
            "answer": "При наличии соответствующих решений полезно показывать состав системы, условия применения, ограничения и подтверждения совместимости. Свойства одного компонента нельзя автоматически приписывать всей системе."
          },
          {
            "question": "Сколько стоит GEO-продвижение производителя стройматериалов?",
            "answer": "Применяются общие тарифы GAEO. Объем работ зависит от ассортимента, технических документов, регионов сбыта и исходного замера по согласованным запросам."
          }
        ],
        "ctaTitle": "Проверим рекомендации производителей по вашим стройматериалам",
        "ctaText": "Пришли сайт, основные товарные группы, действующие технические листы и регионы поставки. Я определю запросы закупщиков и стартовую диагностику.",
        "request": "GEO для производителя стройматериалов: ассортимент, бетонные смеси, фасадные материалы, технические паспорта, применимые стандарты, регионы и BMR."
      },
      "en": {
        "title": "GEO for building materials manufacturers | GAEO.ru",
        "h1": "GEO promotion for building materials manufacturers",
        "description": "Building materials GEO: concrete mixes, cement, facade systems and insulation, project requirements, tested properties, supplier information and AI visibility.",
        "eyebrow": "Manufacturing / Building materials",
        "lead": "Designers shortlist materials for a specified structure and operating environment, while contractors need installation and supply details. I examine which manufacturers AI recommends for those tasks and whether their product evidence is accessible and accurate.",
        "heroPoints": [
          "Non-brand questions by product family, specification and delivery region",
          "Verified test conditions, technical documents and product limitations",
          "Useful application pages and repeat AI visibility measurements"
        ],
        "problemTitle": "Why a manufacturer overview does not answer a specification question",
        "problemIntro": "Insulation, ready-mix concrete, cement and facade compounds use different performance measures. Claims must follow each material's applicable documents and use conditions.",
        "problems": [
          {
            "title": "Performance figures lack test context",
            "body": "Strength, thermal conductivity and frost resistance mean different things for different materials. A value without product grade, method and conditions is insufficient for a reliable comparison."
          },
          {
            "title": "A component is mistaken for a facade system",
            "body": "Adhesive, insulation, cladding and fasteners interact in a full solution. Compatibility and system-level claims require suitable evidence for the assembled configuration."
          },
          {
            "title": "Quality documents are detached from the product",
            "body": "Test results, class, batch records, manufacturing site and supply format must match the stated item. Documentation for ready-mix concrete cannot be reused as proof for a dry compound."
          }
        ],
        "scenarioTitle": "Buyer questions for measuring AI recommendations",
        "scenarioIntro": "These are candidate commercial prompts for a baseline, not findings for a named supplier. Product groups and competing manufacturers are determined during the audit.",
        "columns": [
          "Designer or buyer question",
          "Evidence to verify",
          "GEO improvement"
        ],
        "scenarios": [
          [
            "Which insulation manufacturer suits a facade with specified performance requirements?",
            "Insulation type, thermal properties, fire characteristics, system compatibility and documentation",
            "Explain verified product-specific applications"
          ],
          [
            "Where can a contractor buy ready-mix concrete of the required strength class?",
            "Concrete specification, workability, batch quality document, plant location and delivery conditions",
            "Match real available mixes and service areas to the project"
          ],
          [
            "Which plants produce the specified type of common cement?",
            "Cement class, technical properties, applicable standard, packaging and distribution",
            "Publish searchable grades and up-to-date product documents"
          ],
          [
            "How should facade adhesives and finishing compounds be compared?",
            "Substrate, layer, application conditions and confirmed system compatibility",
            "Build useful selection guidance around validated product data"
          ]
        ],
        "proofTitle": "Evidence required before claiming material suitability",
        "proofIntro": "I align product claims with manufacturer documents and the intended construction use. Article 34 of Federal Law 384-FZ addresses the relationship between project documents and construction materials. GOST 31108-2020 covers specified common cements; GOST 7473-2026 took effect on 1 November 2026 for the concrete mixes within its scope. Each reference must be checked per product.",
        "checks": [
          "Product identification and intended applications: grade, composition, physical properties and measurement conditions",
          "Product-specific quality records, applicable standards and authorised system compatibility statements",
          "Manufacturing sites, batch information, availability, delivery areas, technical support and approved references"
        ],
        "proofNote": "This is an industry-specific GEO audit approach, not evidence of completed AI promotion results for an individual manufacturer.",
        "workTitle": "How building materials GEO work is organised",
        "workIntro": "I start with the buyer's technical task, verify product facts, and test whether the AI recommendation matches the stated requirement.",
        "steps": [
          {
            "title": "Measure procurement prompts",
            "body": "Separate queries by material family, building application, climate, location and ordering constraints; retain a baseline."
          },
          {
            "title": "Review technical evidence",
            "body": "Confirm product specifications, test conditions, current documents and realistic claims with the manufacturer's specialists."
          },
          {
            "title": "Prepare application content",
            "body": "Create briefs for grades, product families, tested applications, assembly guidance and verifiable supplier information."
          },
          {
            "title": "Recheck BMR and answer accuracy",
            "body": "Repeat prompts, record brand inclusion and inspect whether AI suggests the correct product for the specified project."
          }
        ],
        "faq": [
          {
            "question": "Can concrete, insulation and dry mixes share one GEO strategy?",
            "answer": "They can share a supplier framework, but each family needs separate buyer questions, technical properties and relevant documents."
          },
          {
            "question": "Which concrete mix standard applies from November 2026 in Russia?",
            "answer": "Rosstandart lists GOST 7473-2026 as effective from 1 November 2026, replacing GOST 7473-2010 for mixes within the new standard's scope. Application must be checked for each product."
          },
          {
            "question": "Does mentioning a GOST prove the product's conformity?",
            "answer": "No. Product-specific documentation and the actual conditions of use are required. A standard reference alone is not evidence of testing or approval."
          },
          {
            "question": "Should facade systems have separate application pages?",
            "answer": "Where supported by genuine product data, yes. The entire system's verified components, use limits and compatibility should be explained independently from individual component marketing."
          },
          {
            "question": "What does GAEO charge building material manufacturers?",
            "answer": "Published GAEO plans apply. Scope depends on product groups, technical documentation, target regions and the starting prompt matrix."
          }
        ],
        "ctaTitle": "Check which building materials manufacturers AI recommends",
        "ctaText": "Share your website, product families, current technical sheets and delivery territories. I will define a focused baseline of buyer questions.",
        "request": "Building materials manufacturer GEO: mixes, facade systems, technical sheets, applicable GOST standards, regions and BMR."
      }
    }
  },
  {
    "id": 53,
    "slug": "workwear-ppe-suppliers",
    "group": "industry",
    "routes": {
      "ru": "/industries/workwear-ppe-suppliers/",
      "en": "/en/industries/workwear-ppe-suppliers/"
    },
    "parent": {
      "ru": "/industries/metal-structures/",
      "en": "/en/industries/metal-structures/"
    },
    "methods": {
      "ru": [
        "/strategies/industrial-supplier-evidence/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/industrial-supplier-evidence/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Проверяемость промышленного поставщика",
        "Методика измерения BMR"
      ],
      "en": [
        "Industrial supplier evidence methodology",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/tr/details/add929e6-1ff3-4964-916e-bec08ffe7d49",
        "ru": "Росстандарт: действующий ТР ТС 019/2011 по безопасности СИЗ",
        "en": "Rosstandart: current TR CU 019/2011 on personal protective equipment"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_405210/",
        "ru": "Минтруд, приказ №766н: правила обеспечения работников СИЗ",
        "en": "Ministry of Labour, Order 766n: rules for provision of PPE to employees"
      },
      {
        "href": "https://docs.eaeunion.org/documents/461/",
        "ru": "ЕЭК: решение Совета №40 от 13.03.2026 об изменении ТР ТС 019/2011",
        "en": "EEC Council Decision 40 of 13 March 2026 on amendments to TR CU 019/2011"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение поставщиков спецодежды и СИЗ | GAEO.ru",
        "h1": "GEO-продвижение поставщиков спецодежды и средств индивидуальной защиты",
        "description": "GEO для поставщиков СИЗ и спецодежды: защитные свойства, размеры, документы, ТР ТС 019/2011, отраслевые риски, оптовые поставки и BMR.",
        "eyebrow": "Промышленность / Спецодежда и СИЗ",
        "lead": "Работодатель закупает спецодежду и СИЗ по рискам рабочих мест, защитным свойствам, размерам и срокам обеспечения. Я проверяю, какие бренды и поставщиков называют нейросети, насколько верно они различают назначение изделий и какие документы подтверждают ассортимент.",
        "heroPoints": [
          "Запросы по профессии, опасным факторам и назначению средств защиты",
          "Разделение защитной спецодежды, обычной униформы и специализированных СИЗ",
          "Точные изделия, применимые документы и повторный замер BMR"
        ],
        "problemTitle": "Почему запрос «купить спецодежду оптом» не описывает весь спрос",
        "problemIntro": "Одинаковый внешний вид одежды не означает одинаковую защиту. Для B2B-выбора значимы реальная функция изделия, риск на рабочем месте и состав закупки.",
        "problems": [
          {
            "title": "Униформа смешана с защитными изделиями",
            "body": "Корпоративная форма, одежда от общих загрязнений и СИЗ для конкретных опасных факторов требуют разных подтверждений. Заявленная защитная функция должна соответствовать назначению, документам и маркировке."
          },
          {
            "title": "Защита названа без условий и класса",
            "body": "Устойчивость к химическим факторам, термическим рискам, порезам или воздействию погоды нельзя подтверждать общей фразой «усиленная защита». Нужны реальные категории изделия и условия применения."
          },
          {
            "title": "Неполный комплект и неверный размерный ряд",
            "body": "Поставщик может выпускать куртки, обувь, перчатки и дополнительные средства разных брендов. Доступные размеры, совместимость комплекта, сроки поставки и фактические документы проверяются отдельно."
          }
        ],
        "scenarioTitle": "Что специалист по охране труда спрашивает у нейросети",
        "scenarioIntro": "Примеры для измерения рекомендаций поставщиков. Окончательный выбор СИЗ по профессиональным рискам остается за уполномоченными специалистами работодателя.",
        "columns": [
          "Запрос закупщика",
          "Что подтвердить",
          "GEO-задача"
        ],
        "scenarios": [
          [
            "Кто поставит защитную спецодежду для производственного персонала с конкретными рисками?",
            "Назначение, защитные свойства, применимая оценка соответствия, размерный ряд",
            "Отдельные страницы по реальным видам защиты и условиям использования"
          ],
          [
            "Где заказать сигнальную одежду повышенной видимости для выездных бригад?",
            "Классификация изделия, видимые маркировки, размеры, условия эксплуатации",
            "Показать характеристики и документы выбранной модели"
          ],
          [
            "Какой поставщик соберет комплект СИЗ для склада или строительной площадки?",
            "Перечень факторов, совместимость элементов, ограничения, действующие документы",
            "Разделить комплектацию под риски и обычные ассортиментные подборки"
          ],
          [
            "Какие компании доставляют спецодежду организациям по регионам?",
            "Складские остатки, минимальная партия, сроки, логистика, документы и сервис",
            "Добавить проверяемые данные для оптовых закупок"
          ]
        ],
        "proofTitle": "Какие данные подтверждают поставку защитных изделий",
        "proofIntro": "ТР ТС 019/2011 устанавливает требования к средствам индивидуальной защиты в пределах своей области применения. Правила обеспечения работников СИЗ регулирует приказ Минтруда №766н. Изменения ТР ТС 019/2011, принятые ЕЭК в 2026 году, имеют отдельные сроки вступления в силу: при подготовке коммерческих утверждений проверяю применимую редакцию, тип изделия и реальные документы о соответствии.",
        "checks": [
          "Категория и назначение изделия: опасные факторы, заявленный класс защиты, маркировка, размеры и инструкции",
          "Применимые требования ТР ТС 019/2011, действительные сертификаты или декларации для конкретных изделий и их идентификаторы",
          "Состав линейки, комплектность, остатки, оптовые условия, регионы, сроки и способ получения документов"
        ],
        "proofNote": "Материал описывает метод проверки рекомендаций поставщиков СИЗ. Конкретная продукция и ее безопасность здесь не сертифицируются; результатов GEO-продвижения поставщика не заявляется.",
        "workTitle": "Как выстрою GEO-продвижение поставщика спецодежды",
        "workIntro": "Составляю матрицу закупочных ситуаций по типу защиты и отрасли, а затем показываю нейросетям подтвержденную фактуру производителя и продавца.",
        "steps": [
          {
            "title": "Стартовый замер",
            "body": "Разделяю запросы по производственным рискам, профессиям, регионам и формату опта, фиксирую базовый BMR."
          },
          {
            "title": "Инвентаризация товара и документов",
            "body": "Проверяю заявленные защитные свойства, виды изделий, маркировку, оценку соответствия и наличие по SKU."
          },
          {
            "title": "Страницы по рискам и видам защиты",
            "body": "Готовлю ТЗ на структурирование каталога и материалы по применению изделий с согласованными техническими данными."
          },
          {
            "title": "Контроль рекомендаций",
            "body": "Повторяю запросы и оцениваю включение бренда, корректность класса защиты, размера и роли поставщика."
          }
        ],
        "faq": [
          {
            "question": "Любая спецодежда считается СИЗ?",
            "answer": "Нет. Правовой статус и требования зависят от назначения и заявленных защитных функций изделия. Корпоративная форма и одежда для конкретного опасного фактора могут подпадать под разные правила."
          },
          {
            "question": "Можно ли выбирать комплект СИЗ только по ответу нейросети?",
            "answer": "Нет. Работодатель оценивает риски и обеспечивает работников средствами защиты по действующим требованиям, включая правила приказа №766н. Сведения нейросети требуют проверки по документам и фактическим условиям работы."
          },
          {
            "question": "Как учитывать изменения ТР ТС 019/2011, принятые в 2026 году?",
            "answer": "Перед публикацией проверять дату вступления отдельных положений и переходные условия, а также актуальную редакцию регламента для данного типа изделия. Новые требования не следует автоматически выдавать за уже действующие."
          },
          {
            "question": "Достаточно ли одного сертификата для всего каталога?",
            "answer": "Нет. Документ должен относиться к соответствующей продукции, ее моделям и заявленным защитным свойствам. Для разных товаров могут применяться разные формы подтверждения соответствия."
          },
          {
            "question": "Сколько стоит GEO для поставщика спецодежды и СИЗ?",
            "answer": "Применяются общие тарифы GAEO. Объем работ зависит от ассортимента, типов защиты, географии поставок и стартовой матрицы запросов."
          }
        ],
        "ctaTitle": "Проверим, кого нейросети рекомендуют для закупок СИЗ",
        "ctaText": "Пришли сайт, основные группы изделий, документы о соответствии и регионы оптовых поставок. Определю стартовые запросы для GEO-аудита.",
        "request": "GEO поставщика спецодежды и СИЗ: защитные свойства, маркировка, ТР ТС 019/2011, документы, размеры, оптовые поставки и BMR."
      },
      "en": {
        "title": "GEO for workwear and PPE suppliers | GAEO.ru",
        "h1": "GEO promotion for workwear and PPE suppliers",
        "description": "Workwear and PPE GEO: protective properties, occupational risks, sizes, TR CU 019/2011, conformity documents, wholesale supply and AI visibility.",
        "eyebrow": "Manufacturing / Workwear and protective equipment",
        "lead": "Employers procure workwear and protective equipment based on workplace risks, product performance, sizing and supply schedules. I test which suppliers AI recommends for those requirements and whether the answers reflect documented protection claims.",
        "heroPoints": [
          "Buyer prompts by occupational risk, job role and protective purpose",
          "Separate ordinary uniforms from protective garments and specialised PPE",
          "Accurate product evidence, supply details and repeat BMR measurements"
        ],
        "problemTitle": "Why a generic workwear product list does not solve a PPE procurement task",
        "problemIntro": "Similar-looking garments can serve different purposes. The buyer must establish what risks an item is designed to address and which statements are verified.",
        "problems": [
          {
            "title": "Uniforms are confused with protective PPE",
            "body": "Corporate clothing, garments for ordinary dirt and certified protective items have different roles. Product descriptions must match the declared protective function and relevant conformity documentation."
          },
          {
            "title": "Protection is claimed without the appropriate conditions",
            "body": "Chemical resistance, cut protection, thermal hazards and visibility require product-specific properties and applicable test evidence. Generic marketing phrases cannot establish a protection class."
          },
          {
            "title": "Ranges and supply bundles are poorly documented",
            "body": "Jackets, footwear, gloves and related items may have different manufacturers and conformity records. Real sizes, combinations, availability and delivery conditions need to be stated separately."
          }
        ],
        "scenarioTitle": "How occupational safety buyers ask AI to recommend suppliers",
        "scenarioIntro": "These are baseline query examples. Workplace risk assessments and product selection remain the responsibility of qualified personnel and the employer.",
        "columns": [
          "Buyer question",
          "Required evidence",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which supplier offers protective workwear for our production risks?",
            "Intended protection, applicable conformity, size range and actual product specification",
            "Provide distinct product pages by verified risk and protection purpose"
          ],
          [
            "Where can we buy high-visibility garments for roadside crews?",
            "Garment classification, verified visibility properties, labels and sizing",
            "Explain the exact model's protective features and records"
          ],
          [
            "Who can deliver a PPE kit for a warehouse or construction site?",
            "Risk profile, compatibility of items, applicable requirements and documents",
            "Separate risk-based procurement from broad catalogue bundles"
          ],
          [
            "Which workwear wholesalers deliver to multiple regions?",
            "Availability, minimum orders, shipping terms and document access",
            "Make verified wholesale coverage discoverable"
          ]
        ],
        "proofTitle": "Evidence behind an appropriate protective equipment recommendation",
        "proofIntro": "TR CU 019/2011 establishes safety requirements for PPE within its scope. Russian Labour Ministry Order 766n regulates how employers provide PPE. Amendments adopted by the EEC in 2026 have distinct effective dates and transition provisions. I review the applicable version and product-level conformity before presenting technical claims.",
        "checks": [
          "PPE category, protective purpose, declared performance, markings, dimensions and instructions",
          "Relevant regulatory scope, valid product-specific conformity documents and precise identifiers",
          "Product families, compatible items, stock and wholesale terms, delivery regions and documentation access"
        ],
        "proofNote": "The page describes supplier GEO diagnosis. It does not certify any product, guarantee workplace safety or claim proven client GEO performance.",
        "workTitle": "How PPE supplier GEO is organised",
        "workIntro": "Start with occupational buyer intents and substantiate each actual product family before monitoring AI recommendations.",
        "steps": [
          {
            "title": "Measure procurement questions",
            "body": "Segment prompts by risk, occupation, industry, region and purchasing volume, recording the starting BMR."
          },
          {
            "title": "Audit products and conformity evidence",
            "body": "Verify protective functions, markings, sizes, relevant conformity records and real SKU availability."
          },
          {
            "title": "Improve risk-based catalogue pages",
            "body": "Prepare content briefs for protection types, authorised uses, product families and supported documents."
          },
          {
            "title": "Recheck AI answers",
            "body": "Repeat the prompts and inspect both brand inclusion and whether the suggested protection, sizes and supplier responsibilities are correct."
          }
        ],
        "faq": [
          {
            "question": "Is every work uniform legally PPE?",
            "answer": "No. Classification depends on purpose and claimed protective function. General corporate uniforms and products designed for specific hazards may be subject to different requirements."
          },
          {
            "question": "Can an AI response replace a workplace PPE selection process?",
            "answer": "No. Employers are responsible for risk assessment and appropriate protection under applicable rules, including Order 766n. AI outputs need verification against product documents and workplace conditions."
          },
          {
            "question": "What about the 2026 TR CU 019/2011 amendments?",
            "answer": "Check each provision's effective date and transitional arrangements before making current-compliance claims. Adopted changes are not necessarily all in force at the same time."
          },
          {
            "question": "Can one certificate substantiate an entire workwear catalogue?",
            "answer": "Not automatically. Conformity evidence must cover the actual models and intended protection, and different items can be subject to different assessment procedures."
          },
          {
            "question": "What does GAEO charge workwear and PPE suppliers?",
            "answer": "The published GAEO plans apply. Final scope follows product families, protection categories, markets and the baseline prompt matrix."
          }
        ],
        "ctaTitle": "Find out which PPE suppliers AI recommends to employers",
        "ctaText": "Share your website, core product ranges, conformity records and wholesale territories. I will propose a focused first set of buyer questions.",
        "request": "Workwear and PPE supplier GEO: risks, protective properties, TR CU 019/2011, compliance documents, sizes and BMR."
      }
    }
  }
];
