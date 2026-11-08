/**
 * Phase 2U: bilingual engineering installation (#17) and landscaping (#18).
 * Parallel 2T PR #106 owns #14/#15/#16; 2U MUST NOT duplicate those IDs.
 * Shared GAEO pricing, BMR contract rules and catalogue WebP are unchanged.
 */
export const industrySpecializationsBatch2U = [
  {
    "id": 17,
    "slug": "engineering-installation-contractors",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/engineering-installation-contractors/",
      "en": "/en/industries/engineering-installation-contractors/"
    },
    "parent": {
      "ru": "/geo-prodvizhenie-nedvizhimosti/",
      "en": "/en/geo-for-real-estate/"
    },
    "methods": {
      "ru": [
        "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/articles/geo-for-real-estate/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "GEO-стратегия для недвижимости",
        "Методика измерения BMR"
      ],
      "en": [
        "Real-estate GEO strategy",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_51040/df32b8231cf067c4d4e864c717eb6b398358b504/",
        "ru": "ГрК РФ, ст. 52: выполнение строительства, реконструкции и капитального ремонта",
        "en": "Russian Town Planning Code, Article 52: construction and renovation works"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/b0da391a51396ddb67727145adb0141c346ab424/",
        "ru": "ГК РФ, ст. 740: монтажные и пусконаладочные работы в контексте строительного подряда",
        "en": "Civil Code, Article 740: installation and commissioning under construction contracts"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/b48c040fb20b324efb339e89ad832027d4b5d97a/",
        "ru": "ГК РФ, ст. 743: техническая документация, смета и дополнительные работы",
        "en": "Civil Code, Article 743: technical documentation and estimates"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение инженерных и монтажных компаний | GAEO.ru",
        "h1": "GEO-продвижение инженерных и монтажных компаний",
        "description": "GEO для монтажа инженерных систем: вентиляция, электрика, отопление, водоснабжение, пусконаладка, проектные работы, договоры и BMR.",
        "eyebrow": "Инженерные системы / Монтаж и пусконаладка",
        "lead": "Застройщик или управляющий объектом ищет исполнителя конкретной инженерной системы: вентиляции, электроснабжения, отопления, водоснабжения, автоматики здания. Я проверяю рекомендации нейросетей по типу инженерных работ и реальным условиям объекта, не объединяя проектирование, монтаж, сервис и пусконаладку в универсальное обещание.",
        "heroPoints": [
          "Отдельные запросы для ОВиК, электрики, водоснабжения, автоматики и обслуживания",
          "Проверка проектных решений, монтажной роли, пусконаладки и актов испытаний",
          "Фиксированная матрица BMR и технически достоверные страницы услуг"
        ],
        "problemTitle": "Почему нейросеть может рекомендовать неподходящего монтажного подрядчика",
        "problemIntro": "Компании с похожим рекламным описанием могут работать с разными системами, мощностями и этапами объекта.",
        "problems": [
          {
            "title": "Проектировщика приравнивают к монтажнику",
            "body": "Участие в разработке документации не подтверждает поставку, монтаж или сдачу системы. В портфолио нужно указывать отдельные роли и реальные этапы."
          },
          {
            "title": "Не учитываются параметры эксплуатации",
            "body": "Расход воздуха, тепловая нагрузка, электрическая мощность или режим водоснабжения привязаны к расчету и объекту. Рекламные мощности не заменяют проектного обоснования."
          },
          {
            "title": "Пусконаладку обещают без границ ответственности",
            "body": "Испытания, балансировка, исполнительная документация, согласования с эксплуатацией и обучение могут входить в разные договоры. Нельзя приписывать подрядчику неподтвержденные результаты."
          }
        ],
        "scenarioTitle": "Как технический заказчик ищет монтажную компанию",
        "scenarioIntro": "Для разных инженерных дисциплин и стадий закупки нужны самостоятельные группы запросов.",
        "columns": [
          "Запрос заказчика",
          "Что проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто монтирует вентиляцию и проводит наладку для ресторана?",
            "Проектные расходы, монтаж, оборудование, балансировка, режим объекта",
            "Показать подтвержденные ОВиК-проекты и результаты работ"
          ],
          [
            "Как выбрать подрядчика по электрике для бизнес-центра?",
            "Мощность, вид сетей, проект, испытания, распределение ответственности",
            "Развести внутренние сети, подключение и эксплуатационные работы"
          ],
          [
            "Кто устраивает отопление и водоснабжение на складе?",
            "Схемы и нагрузки, тип объекта, реальные случаи, документация",
            "Разделить системы и заявлять параметры только из проектов"
          ],
          [
            "Кому поручить сервис и модернизацию инженерных систем?",
            "Наличие сервиса, время реакции в договоре, запасные части, действующие объекты",
            "Показать фактическую географию и перечень поддерживаемого оборудования"
          ]
        ],
        "proofTitle": "Что подтверждает инженерную компетенцию",
        "proofIntro": "ГрК РФ, ст. 52 определяет требования к отдельным строительным работам, а ГК РФ, ст. 740 и 743 регулируют определенные подрядные отношения, включая монтаж и пусконаладку. Не каждый сервисный выезд подпадает под одинаковую процедуру. Для каждой специализации проверяются конкретные работы и договорные обязательства.",
        "checks": [
          "Проектные задачи: дисциплина (ОВ/ВК/ЭОМ/автоматика), параметры, стадия проекта и реальная роль компании",
          "Монтажные доказательства: объект, фактический состав работ, испытания, исполнительные документы и согласованные материалы",
          "Сервис и гарантии: виды оборудования, районы работы, договорные сроки реагирования, ответственность за эксплуатацию"
        ],
        "proofNote": "Эта страница описывает подход к GEO инженерного подрядчика; отдельный подтвержденный результат клиента GAEO не заявляется.",
        "workTitle": "Как я разрабатываю GEO для инженерного монтажа",
        "workIntro": "Исхожу из конкретного оборудования и системы, а не из общей фразы «полный комплекс инженерных работ».",
        "steps": [
          {
            "title": "Разделить запросы по дисциплинам",
            "body": "Выделяю вентиляцию, отопление, электрику, водоснабжение, автоматику, монтаж, сервис и пусконаладку; фиксирую базовый BMR."
          },
          {
            "title": "Проверить проекты и обязательства",
            "body": "Сверяю технические параметры, фактические работы, документацию, сервисную географию и роли подрядчика."
          },
          {
            "title": "Подготовить структурные изменения",
            "body": "Пишу ТЗ на инженерные разделы, портфолио, FAQ по этапам испытаний, ограничениям и обслуживанию."
          },
          {
            "title": "Контролировать рекомендации",
            "body": "Повторяю сопоставимые вопросы и проверяю долю упоминаний и точность указания дисциплин, объектов и зон обслуживания."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать компанию, которая занимается только пусконаладкой?",
            "answer": "Да. Следует описывать именно наладку, испытания, ввод в работу, границы ответственности и подтвержденные типы оборудования, не добавляя несуществующий монтаж."
          },
          {
            "question": "Нужно ли делать отдельные страницы по вентиляции и электрике?",
            "answer": "Да, при наличии собственных реальных компетенций. Параметры, проектные требования и покупатели различаются; одно универсальное описание недостаточно."
          },
          {
            "question": "Требуется ли одинаковое разрешение для любого монтажа?",
            "answer": "Нет. Обязательные условия зависят от вида работ, объекта, проекта и договора. Применимость требований проверяют индивидуально."
          },
          {
            "question": "Гарантирует ли AI-GEO соответствие системы проекту?",
            "answer": "Нет. GEO помогает точности доступных сведений, но не заменяет проектирование, испытания, технадзор или законную приемку."
          },
          {
            "question": "Как формируется цена GEO для инженерной компании?",
            "answer": "По текущим опубликованным тарифам GAEO и объему: дисциплины, регионы, проекты, документы и матрица запросов."
          }
        ],
        "ctaTitle": "Проверим, какие инженерные компании рекомендуют нейросети",
        "ctaText": "Пришли сайт, направления ОВ/ВК/ЭОМ/автоматики, примеры проектов и регионы. Я определю запросы для исходного замера.",
        "request": "GEO инженерных подрядчиков: вентиляция, электрика, водоснабжение, отопление, монтаж, пусконаладка, BMR."
      },
      "en": {
        "title": "GEO for building-services engineering and installation contractors | GAEO.ru",
        "h1": "AI visibility for building-services and installation contractors",
        "description": "GEO for HVAC, electrical, plumbing and building automation contractors: project roles, installation, testing, commissioning, service territories and BMR.",
        "eyebrow": "Building systems / Installation and commissioning",
        "lead": "Property developers and facilities managers need contractors for particular systems: HVAC, electrical installations, heating, plumbing or building automation. I test AI recommendations by discipline and project stage while keeping design, installation, commissioning and service roles distinct.",
        "heroPoints": [
          "Separate queries for HVAC, power distribution, water and building automation",
          "Verified project roles, installation scope, commissioning and testing documents",
          "Measurement baseline and technically accurate service references"
        ],
        "problemTitle": "Why AI may recommend the wrong systems contractor",
        "problemIntro": "Similar all-purpose marketing copy can hide very different technical capabilities.",
        "problems": [
          {
            "title": "Engineering design is mistaken for installation",
            "body": "Producing design documents is not evidence that the firm installed, tested or delivered a system. Case descriptions need confirmed work roles."
          },
          {
            "title": "Building loads and operating limits are ignored",
            "body": "Airflow, heating capacity, electrical load and water requirements belong to actual project designs. Headline figures cannot replace site-specific engineering."
          },
          {
            "title": "Commissioning is vaguely promised",
            "body": "Testing, balancing, as-built documentation, approvals and training may be separate contracts. Companies should not inherit unverified commissioning results."
          }
        ],
        "scenarioTitle": "Technical procurement questions AI should answer",
        "scenarioIntro": "The prompt set separates disciplines, building uses and contract phases.",
        "columns": [
          "Buyer question",
          "Evidence to check",
          "GEO improvement"
        ],
        "scenarios": [
          [
            "Who installs and commissions ventilation in restaurants?",
            "Designed airflow, equipment, testing, balancing and work scope",
            "Real HVAC cases and defined commissioning services"
          ],
          [
            "Which contractor can wire a commercial office?",
            "Electrical loads, documentation, acceptance and interface responsibility",
            "Separate internal wiring from utility connection and maintenance"
          ],
          [
            "Who delivers heating and water installations for warehouses?",
            "System schematics, capacities, documented roles and facilities",
            "Separate HVAC/plumbing disciplines and project boundaries"
          ],
          [
            "Who services or upgrades existing building systems?",
            "Actual asset types, service coverage, contractual response times and spare parts",
            "Show verifiable maintenance capability and regional scope"
          ]
        ],
        "proofTitle": "Evidence behind a building-services recommendation",
        "proofIntro": "Article 52 of Russia's Town Planning Code concerns specified construction and capital works; Civil Code Articles 740 and 743 address certain installation-related contracts, technical records and estimates. Not every maintenance call has the same legal framework; actual project obligations must be checked.",
        "checks": [
          "Engineering discipline, intended building function, actual project specifications and contractor role",
          "Completed projects, performed installation and testing, relevant acceptance and as-built records",
          "Supported equipment, geographic service capacity, documented response terms and maintenance scope"
        ],
        "proofNote": "This page does not claim any measured GAEO client outcome for installation contractors.",
        "workTitle": "How I develop building-services GEO",
        "workIntro": "The programme starts with concrete systems and buyer decisions instead of unsupported universal claims.",
        "steps": [
          {
            "title": "Segment disciplines",
            "body": "Measure separate prompts for HVAC, power, plumbing, automation, installation, service and commissioning."
          },
          {
            "title": "Audit project evidence",
            "body": "Verify operating parameters, actual works, documentation and service territories."
          },
          {
            "title": "Improve useful technical pages",
            "body": "Plan discipline pages, substantiated case studies and FAQs about tests, acceptance and maintenance."
          },
          {
            "title": "Repeat comparable measurements",
            "body": "Track BMR and verify the accuracy of project, system and coverage descriptions in AI answers."
          }
        ],
        "faq": [
          {
            "question": "Can a commissioning-only contractor benefit from GEO?",
            "answer": "Yes. Its verified service should be described as commissioning and testing without implying it performed all installation work."
          },
          {
            "question": "Should ventilation and electrical work have separate pages?",
            "answer": "When the company actually provides both, yes: operating parameters, project requirements and buyers are different."
          },
          {
            "question": "Is one construction licence sufficient for every system?",
            "answer": "No universal claim applies. Requirements depend on the works, object type and contract."
          },
          {
            "question": "Does GEO validate engineering compliance?",
            "answer": "No. Information quality and AI mention measurements do not replace design, tests, inspections or legal acceptance."
          },
          {
            "question": "What does building-services GEO cost?",
            "answer": "GAEO's published plans apply; scope depends on systems, territories, real projects and measurement questions."
          }
        ],
        "ctaTitle": "Find out which building-services contractors AI recommends",
        "ctaText": "Share your website, supported engineering disciplines, project cases and regions for an initial BMR audit.",
        "request": "Building services GEO: HVAC, electrical, plumbing, automation, installation, commissioning, service and BMR."
      }
    }
  },
  {
    "id": 18,
    "slug": "landscape-site-improvement-contractors",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/landscape-site-improvement-contractors/",
      "en": "/en/industries/landscape-site-improvement-contractors/"
    },
    "parent": {
      "ru": "/geo-prodvizhenie-nedvizhimosti/",
      "en": "/en/geo-for-real-estate/"
    },
    "methods": {
      "ru": [
        "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/articles/geo-for-real-estate/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "GEO-стратегия для недвижимости",
        "Методика измерения BMR"
      ],
      "en": [
        "Real-estate GEO strategy",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/sp/details/8d5a8ef5-f450-4356-ac88-72cd17c416cf",
        "ru": "Росстандарт: СП 82.13330.2016, благоустройство территорий",
        "en": "Rosstandart: SP 82.13330.2016, site improvement"
      },
      {
        "href": "https://protect.gost.ru/gost/details/c4141c07-9d4b-441f-8396-4baa6243fade",
        "ru": "Росстандарт: ГОСТ Р 71473-2024, терминология ландшафтной архитектуры",
        "en": "Rosstandart: GOST R 71473-2024, landscaping terminology"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_546063/",
        "ru": "Минстрой: письмо 23.09.2026 о классификации работ благоустройства по договору",
        "en": "Ministry of Construction, September 2026 guidance on site works and contract scope"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение ландшафтных и благоустроительных компаний | GAEO.ru",
        "h1": "GEO-продвижение ландшафтных и благоустроительных компаний",
        "description": "GEO для ландшафтных компаний: частные участки, дорожки, дренаж, озеленение, уход, общественные территории, география и BMR.",
        "eyebrow": "Строительство / Ландшафт и благоустройство",
        "lead": "Владелец загородного дома выбирает подрядчика для сада, дорожек и дренажа, а управляющий коммерческой недвижимостью — исполнителя по озеленению и уходу. Я проверяю, какие компании нейросети рекомендуют по этим разным задачам и можно ли подтвердить их реальные проекты, технические условия и договорные услуги.",
        "heroPoints": [
          "Контрольные запросы по типам территорий, ландшафту и инженерным работам",
          "Проверка реальных объектов, растений, покрытий, дренажа и договорного ухода",
          "Подтвержденные локальные страницы и повторные измерения BMR"
        ],
        "problemTitle": "Почему нейросети путают ландшафтные услуги",
        "problemIntro": "Проект озеленения, фактические посадки, устройство дренажа и круглогодичное обслуживание не равны одному виду работ.",
        "problems": [
          {
            "title": "Визуализацию считают выполненным проектом",
            "body": "Ландшафтный эскиз не доказывает, что подрядчик посадил деревья или построил дорожки. Разделяют авторство, выполненные этапы и права на публикацию объекта."
          },
          {
            "title": "Не объясняют сезонность и содержание сада",
            "body": "Приживаемость и состояние растений зависят от вида, посадочного материала, грунта, климата и регулярного ухода. Универсальную гарантию нельзя приписывать исполнителю."
          },
          {
            "title": "Местные ограничения игнорируются",
            "body": "Общественные территории и частные участки могут подчиняться разным правилам. Применимость СП и муниципальных требований зависит от реального объекта и состава работ."
          }
        ],
        "scenarioTitle": "Как заказчики ищут исполнителя благоустройства",
        "scenarioIntro": "Для частного сада, бизнес-центра и общественной территории нужны разные источники и критерии выбора.",
        "columns": [
          "Вопрос заказчика",
          "Что проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто спроектирует и посадит сад на участке?",
            "Портфолио, тип посадок, авторство дизайна, география и план ухода",
            "Разделить проектирование и выполненные посадки"
          ],
          [
            "Кто сделает дорожки, дренаж и освещение?",
            "Пирог покрытия, водоотведение, инженерные роли, состав сметы",
            "Показать фактические технические компетенции"
          ],
          [
            "Кому доверить благоустройство бизнес-центра?",
            "Сходные коммерческие объекты, режим доступа, этапы и обслуживание",
            "Подтвердить объем и результат выполненных работ"
          ],
          [
            "Кто обслуживает общественное озеленение по сезонам?",
            "Режим ухода, инвентарь, климат, местные правила, сроки договора",
            "Отделить разовый проект от регулярной эксплуатации"
          ]
        ],
        "proofTitle": "Какие факты повышают качество рекомендации",
        "proofIntro": "СП 82.13330.2016 устанавливает требования к определенным решениям благоустройства, а ГОСТ Р 71473-2024 определяет терминологию. Минстрой в сентябре 2026 года уточнил, что виды работ, включая возможный ремонт, следует определять по конкретному договору и объекту. Ни один стандарт не подтверждает качество конкретного подрядчика сам по себе.",
        "checks": [
          "Проекты: тип территории, год, роль подрядчика, реальные фотографии и разрешение на публикацию",
          "Технические условия: рельеф, грунт, водоотведение, покрытия, видовой состав растений и ограничения",
          "Договор: объем и этапы работ, сезонность, полив и уход, приемка, допустимые гарантии, территория выездов"
        ],
        "proofNote": "Здесь не утверждается, что у GAEO уже есть успешный клиентский кейс или рост BMR в благоустройстве.",
        "workTitle": "Как я организую GEO для ландшафтного бизнеса",
        "workIntro": "Начинаю с реальных критериев собственника и технического заказчика, затем улучшаю проверяемые данные компании.",
        "steps": [
          {
            "title": "Разделить покупательские запросы",
            "body": "Измеряю частные сады, коммерческие и общественные территории, уход, дренаж и географию раздельно."
          },
          {
            "title": "Сверить фактуру",
            "body": "Проверяю портфолио, фактические работы, инженерные компоненты, сезонность, договоры и права на изображения."
          },
          {
            "title": "Подготовить страницы услуг и проектов",
            "body": "Разделяю озеленение, проектирование, мощение, полив, дренаж и сопровождение; включаю практические FAQ."
          },
          {
            "title": "Повторить матрицу BMR",
            "body": "Сравниваю ответы нейросетей и проверяю правильность услуг, регионов и ролей подрядчика."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать только ландшафтное проектирование?",
            "answer": "Да. Но на странице должны быть именно проекты, без присвоения посадок, монтажа и ухода, если студия ими не занималась."
          },
          {
            "question": "СП 82.13330.2016 обязателен для любой частной клумбы?",
            "answer": "Нет универсального правила: важны вид работ, объект и местные требования. Нужно определить применимость документа."
          },
          {
            "question": "Стоит ли объединять озеленение и дренаж?",
            "answer": "Связать можно, но технический объем, инженерные работы и ответственность следует раскрывать отдельно."
          },
          {
            "question": "Можно ли обещать стопроцентную приживаемость растений?",
            "answer": "Нет без конкретных условий и доказательств. Реальные гарантии зависят от посадочного материала, сезона и договорного ухода."
          },
          {
            "question": "Сколько стоит GEO для ландшафтной компании?",
            "answer": "Действуют общие тарифы GAEO; объем определяется географией, направлениями услуг и проверяемостью проектов."
          }
        ],
        "ctaTitle": "Проверим, каких подрядчиков по благоустройству рекомендуют нейросети",
        "ctaText": "Пришли сайт, виды работ, регионы, 2–3 реальных объекта. Я предложу список контрольных запросов.",
        "request": "GEO ландшафтных компаний: сады, благоустройство, дорожки, дренаж, уход, регионы, BMR."
      },
      "en": {
        "title": "GEO for landscaping and site improvement contractors | GAEO.ru",
        "h1": "AI visibility for landscape design and site improvement contractors",
        "description": "GEO for landscaping providers: gardens, drainage, paving, municipal and commercial grounds, seasonal maintenance, case evidence and BMR.",
        "eyebrow": "Construction / Landscaping",
        "lead": "Homeowners seek garden design and planting teams, while commercial property managers need paving, drainage and ongoing grounds maintenance. I evaluate which companies AI assistants recommend for these distinct decisions and check whether the suppliers' actual project roles and conditions can be verified.",
        "heroPoints": [
          "Separate AI prompts by property type, services and local territory",
          "Verify built projects, plant selection, drainage, hardscape and maintenance",
          "Evidence-based source pages and repeat BMR measurements"
        ],
        "problemTitle": "Why AI confuses landscape and site-improvement services",
        "problemIntro": "Landscape design, planting, drainage construction and seasonal maintenance require different capabilities.",
        "problems": [
          {
            "title": "Renderings are mistaken for constructed gardens",
            "body": "A design visualisation does not show the company delivered planting or paving. Real roles, completion stages and photo permissions must be established."
          },
          {
            "title": "Seasonal obligations are missing",
            "body": "Plant establishment depends on species, site conditions, irrigation and upkeep. Blanket survival promises need actual contractual support."
          },
          {
            "title": "Local regulations are generalized",
            "body": "Municipal and private sites can face different rules; the scope of relevant standards and local requirements must be verified for the works."
          }
        ],
        "scenarioTitle": "Questions that shape landscaping recommendations",
        "scenarioIntro": "Each buyer group needs its own evidence and prompt set.",
        "columns": [
          "Buyer question",
          "Facts to verify",
          "GEO work"
        ],
        "scenarios": [
          [
            "Who designs and plants private gardens in our area?",
            "Real portfolio, design authorship, planted work and aftercare",
            "Separate planning from delivered landscaping"
          ],
          [
            "Which contractor installs paths, drainage and lighting?",
            "Construction layers, drainage, electrical responsibility and quote",
            "Show documented work packages"
          ],
          [
            "Who can improve commercial office grounds?",
            "Comparable sites, construction stages, access and maintenance",
            "Publish substantiated corporate projects"
          ],
          [
            "Who maintains public greenery year round?",
            "Seasonal crews, maintenance schedule, locality and contracts",
            "Differentiate ongoing service from one-off works"
          ]
        ],
        "proofTitle": "Evidence supporting responsible recommendations",
        "proofIntro": "SP 82.13330.2016 addresses certain territory-improvement solutions, GOST R 71473-2024 defines landscape terms, and a September 2026 Ministry of Construction letter clarifies that work classification depends on the contract and site. None certifies an individual firm.",
        "checks": [
          "Real sites: type, date, design and construction roles and approved portfolio images",
          "Technical scope: terrain, soil, drainage, planting material, paving specifications and limits",
          "Contract scope: phases, seasonal timing, maintenance, handover, real warranty conditions and service regions"
        ],
        "proofNote": "This methodology page does not claim measured GEO outcomes for a landscaping client.",
        "workTitle": "How I build GEO for landscape contractors",
        "workIntro": "The process follows actual buyer intent and evidence of delivered work.",
        "steps": [
          {
            "title": "Segment procurement prompts",
            "body": "Separate domestic gardens, public and commercial spaces, landscaping, drainage and maintenance."
          },
          {
            "title": "Check provider evidence",
            "body": "Review projects, site conditions, engineering responsibilities and approved public references."
          },
          {
            "title": "Improve service content",
            "body": "Build pages for landscaping disciplines, specific projects, upkeep and realistic FAQs."
          },
          {
            "title": "Measure comparable recommendations",
            "body": "Repeat the prompt matrix, track BMR and review accuracy of contractor roles and service areas."
          }
        ],
        "faq": [
          {
            "question": "Can a design-only studio use GEO?",
            "answer": "Yes, provided designs are clearly described and not shown as completed planting or installation."
          },
          {
            "question": "Does SP 82.13330.2016 cover every home garden?",
            "answer": "No blanket conclusion applies; verify the site, actual works and applicable local rules."
          },
          {
            "question": "Should planting and drainage share one service page?",
            "answer": "They can link to each other but need distinct technical scope and evidence where services differ."
          },
          {
            "question": "Can an AI recommendation guarantee plant survival?",
            "answer": "No. Survival depends on site and maintenance; only case-specific contractual terms can define any warranty."
          },
          {
            "question": "How much does landscape GEO cost?",
            "answer": "Published GAEO plans apply; scope depends on regions, actual services, portfolio and baseline prompts."
          }
        ],
        "ctaTitle": "See which landscape firms AI assistants recommend",
        "ctaText": "Share your website, real projects, service categories and regions for an initial review.",
        "request": "Landscaping GEO: gardens, paving, drainage, public grounds, maintenance, regions and BMR."
      }
    }
  }
];
