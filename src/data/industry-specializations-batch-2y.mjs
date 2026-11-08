/**
 * Phase 2Y: agricultural producers (#106) and agricultural input suppliers (#107).
 * Distinct evidence-led RU/EN content; stable catalogue IDs, approved assets and central pricing.
 * No farm-client performance claims or legal certification inferred from cited sources.
 */
export const industrySpecializationsBatch2Y = [
  {
    "group": "agriculture",
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "id": 106,
    "slug": "agricultural-producers",
    "routes": {
      "ru": "/industries/agricultural-producers/",
      "en": "/en/industries/agricultural-producers/"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения BMR"
      ],
      "en": [
        "How BMR is measured"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_397906/a266f0811cb225f76a13cb891a85e49ee1df72b8/",
        "ru": "Правила ФГИС прослеживаемости зерна, редакция с изменениями 2026 года",
        "en": "Russian grain traceability rules, including the 2026 amendments"
      },
      {
        "href": "https://mercury.vetrf.ru/",
        "ru": "Россельхознадзор: «Меркурий» для поднадзорных ветеринарии товаров",
        "en": "Rosselkhoznadzor: Mercury veterinary consignment traceability"
      },
      {
        "href": "https://checklist.fsvps.gov.ru/checks/forms/index?formId=6",
        "ru": "Россельхознадзор: контрольные вопросы для объектов животноводства",
        "en": "Rosselkhoznadzor: official animal-production compliance checklist"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение сельхозпредприятий и фермерских хозяйств | GAEO.ru",
        "h1": "GEO-продвижение сельскохозяйственных предприятий",
        "description": "Продвижение сельхозпроизводителей в ChatGPT и Алисе: зерно, животноводство, сезонные поставки, документы происхождения, регионы и замеры BMR.",
        "eyebrow": "Агробизнес / Сельхозпроизводители",
        "lead": "Закупщик ищет не абстрактное сельхозпредприятие, а производителя определенной продукции, с нужным объемом, сезоном отгрузки и подтвержденным происхождением. Я проверяю, кого нейросети рекомендуют по таким запросам и насколько их ответы опираются на факты конкретного хозяйства.",
        "heroPoints": [
          "Раздельные B2B-запросы для растениеводства и животноводства",
          "Сезонность, партии, регион отгрузки и документы без выдуманных мощностей",
          "Матрица небрендовых рекомендаций и ежемесячный контроль BMR"
        ],
        "problemTitle": "Почему название хозяйства не помогает закупщику выбрать поставщика",
        "problemIntro": "Поставки зерна, молока и живых животных различаются по документам, логистике и условиям сделки. Общая фраза «производим сельхозпродукцию» не описывает ни один из этих сценариев.",
        "problems": [
          {
            "title": "Не определена товарная партия",
            "body": "Культура, класс или качество зерна, объем партии, влажность и условия хранения должны соответствовать конкретной поставке. Указание годового валового сбора не равнозначно наличию товара к отгрузке."
          },
          {
            "title": "Смешаны растениеводство и животноводство",
            "body": "Для зерновых партий и подконтрольных ветеринарии грузов действуют разные механизмы прослеживаемости. Нельзя переносить требования к «Меркурию» на каждую сельскохозяйственную культуру."
          },
          {
            "title": "Сезонность скрыта за общими обещаниями",
            "body": "Урожай, контрактные объемы, площадки хранения и логистические плечи меняются. Нейросеть может рекомендовать хозяйство по устаревшему описанию без учета региона или даты."
          }
        ],
        "scenarioTitle": "Какие вопросы задают покупатели сельхозпродукции",
        "scenarioIntro": "Эти вопросы задают основу будущего исследования рекомендаций. Продукция, объемы и конкуренты уточняются по фактическому ассортименту предприятия.",
        "columns": [
          "Коммерческий запрос",
          "Что подтверждает ответ",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить партию пшеницы определенного класса с отгрузкой в ЦФО?",
            "Характеристики партии, место хранения, документы качества, условия поставки",
            "Показать актуальные товарные партии и отделить их от прошлых урожаев"
          ],
          [
            "Как выбрать хозяйство для долгосрочных поставок молока?",
            "Производственная модель, логистика охлаждения, объем и подтверждаемые процедуры",
            "Создать страницу B2B-поставок с проверяемыми условиями"
          ],
          [
            "Какие агропроизводители отгружают урожай напрямую без посредника?",
            "Юридическое лицо, собственное производство, контракты и география отгрузок",
            "Различить производителя и трейдера по подтвержденной роли"
          ],
          [
            "Кто поставляет сельхозпродукцию в конкретном регионе в сезон?",
            "Сезонный календарь, доступность партий, маршруты и дата обновления",
            "Контролировать географические запросы и свежесть источников"
          ]
        ],
        "proofTitle": "Какие данные нужны для проверяемых рекомендаций",
        "proofIntro": "Сначала сверяю товарную и юридическую информацию компании с актуальными материалами и только затем предлагаю публикации. Регуляторные требования зависят от вида продукции и операции.",
        "checks": [
          "Вид продукции, подтвержденные объемы и свойства конкретной партии, сезонность и готовность к отгрузке",
          "Происхождение и прослеживаемость: документы на зерно в применимых случаях, ветеринарные документы только для подконтрольных грузов",
          "Договорная роль производителя, регион, логистика, сроки, доступные каналы связи и разрешенные к публикации материалы"
        ],
        "proofNote": "Это методика оценки видимости сельхозпредприятия. Опубликованного кейса роста BMR для конкретного хозяйства здесь не заявлено.",
        "workTitle": "Как строится GEO-программа для сельхозпроизводителя",
        "workIntro": "От коммерческой матрицы запросов перехожу к проверке исходных данных, содержанию сайта и сопоставимым повторным измерениям.",
        "steps": [
          {
            "title": "Диагностика спроса",
            "body": "Разделяю запросы закупщиков по культурам, категориям животноводства, объемам, регионам и характеру контракта."
          },
          {
            "title": "Проверка доказательств",
            "body": "Сверяю публичные описания с документами хозяйства и применимыми реестрами, отмечаю дату и ограничения данных."
          },
          {
            "title": "Сайт и отраслевые материалы",
            "body": "Готовлю страницы направлений поставок, условия работы с B2B-заказчиком, ответы на вопросы и экспертные материалы без неподтвержденных заявлений."
          },
          {
            "title": "Повторный замер",
            "body": "Проверяю одинаковые коммерческие запросы в согласованных нейросетях, фиксирую долю рекомендаций BMR и источники ошибок."
          }
        ],
        "faq": [
          {
            "question": "Подходит ли GEO небольшому фермерскому хозяйству?",
            "answer": "Да, когда у хозяйства есть конкретная продукция и доступная география продаж. Для небольшого поставщика полезнее точные запросы по товару и региону, чем общие запросы о крупнейших агрохолдингах."
          },
          {
            "question": "Нужен ли «Меркурий» для любого сельхозпроизводителя?",
            "answer": "Нет. Электронные ветеринарные документы относятся к определенным подконтрольным товарам и операциям. Для зерна используется отдельный механизм прослеживаемости в предусмотренных законом случаях."
          },
          {
            "question": "Можно ли писать объем урожая и запасов в ответах нейросетей?",
            "answer": "Можно публиковать подтвержденные цифры с датой и условиями. Годовой сбор, плановый урожай, складской остаток и готовая к продаже партия являются разными показателями."
          },
          {
            "question": "Как учитываются сезонность и регионы?",
            "answer": "Матрица запросов разделяется по сезону, продукту, региону покупателя и направлению отгрузки. При повторном замере отмечаем, какие сведения изменились с исходной даты."
          },
          {
            "question": "Сколько стоит продвижение сельхозпредприятия?",
            "answer": "Для этой отрасли действуют опубликованные тарифы GAEO. Объем определяется количеством товарных групп, географией, выбранными нейросетями и первоначальным замером."
          }
        ],
        "ctaTitle": "Узнать, какие хозяйства рекомендуют нейросети твоим закупщикам",
        "ctaText": "Пришли сайт, товарные группы, регионы поставок и доступные подтверждения по продукции. Определю матрицу запросов для первоначального аудита.",
        "request": "GEO сельхозпроизводителя: товарные партии, растениеводство/животноводство, регионы, сезонность, прослеживаемость, BMR."
      },
      "en": {
        "title": "GEO services for farms and agricultural producers | GAEO.ru",
        "h1": "GEO visibility for agricultural producers and farms",
        "description": "AI recommendation audits for agricultural producers: crop lots, livestock goods, traceability, regional B2B buyers, seasonal supply and BMR.",
        "eyebrow": "Agribusiness / Producers",
        "lead": "A commodity buyer needs a producer that can supply a specified lot, in a particular region and season. I examine which farms AI recommends for these real procurement decisions and whether the cited evidence supports each recommendation.",
        "heroPoints": [
          "Separate buyer prompts for crops and livestock supply",
          "Lot-level evidence, shipment geography and seasonality",
          "A fixed non-branded prompt matrix with comparable BMR reviews"
        ],
        "problemTitle": "Why a farm name is not enough to qualify a supplier",
        "problemIntro": "Grain procurement, chilled milk collection and livestock supply require different documents and logistics. AI recommendations become unreliable when all are compressed into one company description.",
        "problems": [
          {
            "title": "Output is confused with available inventory",
            "body": "Annual harvest volume does not establish the specification, quality, storage location or delivery readiness of an individual lot. Buyer-facing facts need a dated scope."
          },
          {
            "title": "Traceability categories are conflated",
            "body": "Grain traceability and veterinary documentation apply to different regulated products and activities. The Mercury system should never be described as mandatory for every crop."
          },
          {
            "title": "Seasonal capacity is presented as permanent",
            "body": "Supply windows, harvest years, cold-chain availability and delivery regions change. An old company profile can become misleading even when the company name is correct."
          }
        ],
        "scenarioTitle": "Procurement questions worth measuring",
        "scenarioIntro": "These are candidate commercial prompts. Actual crops, contract sizes and competitors are selected after reviewing the producer's real offering.",
        "columns": [
          "Buyer question",
          "Evidence to check",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which grain producers can supply a specified wheat grade in Central Russia?",
            "Lot specifications, quality records, storage point and contract terms",
            "Publish dated lot information distinct from historical harvest figures"
          ],
          [
            "Where can a processor source raw milk under a recurring contract?",
            "Production scope, chilled logistics, quantity and applicable records",
            "Clarify B2B supply terms with verifiable operational details"
          ],
          [
            "Which farms sell directly instead of brokering third-party goods?",
            "Producer identity, actual activities, invoicing entity and supply contract",
            "Explain the verified producer versus trader relationship"
          ],
          [
            "Which nearby farms can deliver during a particular harvest season?",
            "Season calendar, delivery geography, availability and update date",
            "Measure regional and time-sensitive AI recommendations"
          ]
        ],
        "proofTitle": "What should substantiate an agricultural recommendation",
        "proofIntro": "I match marketing claims to operational documents and current official references before specifying new content. Applicability depends on the exact product and transaction.",
        "checks": [
          "Products and lots: real specifications, confirmed volumes, timing and shipment readiness",
          "Product-specific traceability: grain records where relevant, veterinary certificates only for covered consignments",
          "Producer role, legal entity, territories served, logistics, contacts and permitted evidence for publication"
        ],
        "proofNote": "This is a proposed evidence-led GEO approach. No farm-specific client performance result or BMR growth is claimed.",
        "workTitle": "Four steps from buyer demand to measurable AI visibility",
        "workIntro": "The scope follows the producer's commercial market rather than a generic keyword package.",
        "steps": [
          {
            "title": "Map procurement intent",
            "body": "Separate crops, animal products, order size, sourcing regions, delivery constraints and contract types."
          },
          {
            "title": "Validate source material",
            "body": "Check each claim against producer-approved records and relevant registries, preserving dates and limitations."
          },
          {
            "title": "Improve the information supply",
            "body": "Prepare targeted supply pages, evidence-based FAQs, expert content and distribution instructions."
          },
          {
            "title": "Measure again",
            "body": "Repeat comparable prompts across agreed AI services and review BMR, source citations and factual mistakes."
          }
        ],
        "faq": [
          {
            "question": "Can a small farm benefit from GEO?",
            "answer": "Yes, if the farm offers a clearly defined product in a real supply region. Specific local procurement questions are usually a more useful starting point than generic national rankings."
          },
          {
            "question": "Does every agricultural business need Mercury records?",
            "answer": "No. Electronic veterinary certificates apply to covered goods and operations. Grain has a separate traceability framework where its rules apply."
          },
          {
            "question": "Can we publish an annual harvest number as stock?",
            "answer": "No. Harvest output, forecast production, stored inventory and lots available to sell are different figures. AI-facing content should name the metric and reporting date."
          },
          {
            "question": "How do you handle harvest seasons?",
            "answer": "The prompt set distinguishes products, seasons, locations and order terms. Repeat measurements explicitly track material changes in availability."
          },
          {
            "question": "What does agricultural producer GEO cost?",
            "answer": "The standard GAEO plans apply. Scope depends on product groups, markets served, AI services and the baseline prompt sample."
          }
        ],
        "ctaTitle": "Audit the farms AI recommends to your buyers",
        "ctaText": "Share your website, production categories, delivery regions and available source evidence. I will define a useful initial prompt matrix.",
        "request": "Farm GEO audit: crop lots, livestock goods, supply region, seasonality, traceability and BMR."
      }
    }
  },
  {
    "group": "agriculture",
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "id": 107,
    "slug": "agricultural-input-suppliers",
    "routes": {
      "ru": "/industries/agricultural-input-suppliers/",
      "en": "/en/industries/agricultural-input-suppliers/"
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
        "Как проверять B2B-поставщика",
        "Методика измерения BMR"
      ],
      "en": [
        "Evidence for industrial B2B suppliers",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_15221/3f0aee9b3b8b7521c4c5747c723709d9402559d0/",
        "ru": "109-ФЗ, статья 11.1: реестр пестицидов и агрохимикатов",
        "en": "Russian Federal Law 109-FZ, Article 11.1: pesticide and agrochemical register"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_478092/667b685ff1d23284deeea0b6c5cfe5fe9b0957d7/",
        "ru": "Минсельхоз: предоставление сведений из ФГИС «Семеноводство»",
        "en": "Russian Ministry of Agriculture: agricultural seed register information rules"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_15221/b723c4e20b05451690f199d105bf539856ebac21/",
        "ru": "109-ФЗ, статья 3: условия обращения пестицидов и агрохимикатов",
        "en": "Russian Federal Law 109-FZ, Article 3: rules governing agrochemical circulation"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение поставщиков товаров для агробизнеса | GAEO.ru",
        "h1": "GEO-продвижение производителей и поставщиков товаров для агробизнеса",
        "description": "GEO для поставщиков семян, средств защиты растений, кормовых добавок и агрооборудования: применимость, регистрация, каталоги, регионы, BMR.",
        "eyebrow": "Агробизнес / Средства производства",
        "lead": "Агроном или руководитель хозяйства ищет семена определенной культуры, зарегистрированный препарат, запчасть или оборудование под конкретную задачу. Для GEO поставщика важны точные характеристики продукта, подтвержденный статус и реальные условия поставки, а не общие обещания «все для фермы».",
        "heroPoints": [
          "Разные коммерческие сценарии для семян, СЗР, кормов и техники",
          "Проверка документов и применимости каждого товара",
          "Каталог, экспертные источники и BMR по товарным задачам"
        ],
        "problemTitle": "Почему общий ассортимент затрудняет рекомендацию поставщика",
        "problemIntro": "Решение о закупке семян не похоже на выбор запчасти к трактору или средства защиты растений. Название бренда без данных о продукте не помогает выполнить эти задачи.",
        "problems": [
          {
            "title": "Смешаны несовместимые категории",
            "body": "Сорта семян, пестициды, кормовые продукты и механические запчасти имеют разные свойства и требования. Сведения о регистрации одного препарата не подтверждают соответствие всей линейки."
          },
          {
            "title": "Не показаны условия применения",
            "body": "Культура, объект обработки, допустимые регламенты и актуальная регистрация важны для отдельных средств защиты растений. Ответ нейросети нельзя использовать вместо действующей этикетки и официальных указаний."
          },
          {
            "title": "Непрозрачны поставки и совместимость",
            "body": "Модель техники, обозначение детали, реальная совместимость, единица поставки, регион и сезонные остатки требуют проверки по данным поставщика и производителя."
          }
        ],
        "scenarioTitle": "Коммерческие вопросы агрономов и снабженцев",
        "scenarioIntro": "Формулировки используются как примеры для начального BMR-замера; применимые категории и допустимость конкретных средств определяются по официальным сведениям.",
        "columns": [
          "Запрос закупщика",
          "Что требуется проверить",
          "Что улучшаем для GEO"
        ],
        "scenarios": [
          [
            "Где заказать семена определенной культуры с документами по партии?",
            "Сорт, назначение, партия, документы и сроки доставки",
            "Разделить сорта и партии, добавить проверяемые сведения и условия заказа"
          ],
          [
            "Как выбрать зарегистрированное средство защиты для конкретной культуры?",
            "Регистрационный номер, действующий регламент и ограничения применения",
            "Связать карточку продукта с актуальными официальными сведениями"
          ],
          [
            "Кто поставит совместимую запчасть к определенной модели трактора?",
            "Артикул, модель и модификация машины, документированная совместимость",
            "Сделать точный каталог применимости без ложных аналогов"
          ],
          [
            "Где купить кормовую добавку с доставкой в регион?",
            "Состав и назначение по документации, условия хранения, доступность и логистика",
            "Описать реальный продукт и каналы B2B-поставки"
          ]
        ],
        "proofTitle": "Как отличать маркетинговое обещание от проверяемого свойства товара",
        "proofIntro": "Поставщик может выступать производителем, дилером или дистрибьютором. Я фиксирую его роль и проверяю документы по отдельной товарной категории до подготовки публичных утверждений.",
        "checks": [
          "Точное наименование товара, партия или модель, характеристики, назначение и подтвержденная совместимость",
          "Действующая регистрация и применимые требования для семян, пестицидов и агрохимикатов; ограничения по конкретному продукту",
          "Роль в цепочке поставки, подтвержденный ассортимент, регион, наличие и условия доставки с датой обновления"
        ],
        "proofNote": "Официальные правила служат источниками для проверки. Они не подтверждают соответствие продукции конкретного поставщика и не являются заявлением о результатах продвижения GAEO.",
        "workTitle": "Что входит в GEO-продвижение агропоставщика",
        "workIntro": "Задачи делятся по ассортиментным группам и реальным покупательским ситуациям, после чего фиксируются измеряемые запросы.",
        "steps": [
          {
            "title": "Сегментация закупок",
            "body": "Определяю товарные группы, типы покупателей, сезонность, целевые регионы и критерии выбора."
          },
          {
            "title": "Аудит каталога и доказательств",
            "body": "Проверяю атрибуты SKU, документы, актуальность статуса, совместимость, дилерские полномочия и ограничения."
          },
          {
            "title": "Технические и редакционные работы",
            "body": "Готовлю ТЗ на структуру категорий, страницы товаров, FAQ, источники и публикации для профессиональных покупателей."
          },
          {
            "title": "Контроль рекомендаций",
            "body": "Повторяю небрендовые промпты, фиксирую BMR и отдельно проверяю фактическую безопасность рекомендаций."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать в нейросетях средства защиты растений?",
            "answer": "Можно улучшать доступность проверенной информации о зарегистрированной продукции. Рекомендации по применению должны опираться на действующий регламент и официальные сведения о конкретном препарате, а не на вывод нейросети."
          },
          {
            "question": "Нужна ли регистрация каждому товару для агробизнеса?",
            "answer": "Нет. Требования различаются для семян, пестицидов, кормовых продуктов, техники и деталей. Проверять применимость необходимо по конкретной категории."
          },
          {
            "question": "Можно ли указывать аналоги деталей к сельхозтехнике?",
            "answer": "Да, если совместимость подтверждена производителем или технической документацией. В каталог нельзя переносить соответствие только по внешнему сходству запчастей."
          },
          {
            "question": "Как учитывать сезонность закупок?",
            "answer": "Разделяю постоянный каталог, сезонное наличие, предзаказы и региональные предложения. Повторные замеры выполняются по сопоставимым коммерческим запросам."
          },
          {
            "question": "Какова стоимость GEO для агропоставщика?",
            "answer": "Действуют общие тарифы GAEO. Смета зависит от номенклатуры, числа товарных направлений, регионов и базовой матрицы промптов."
          }
        ],
        "ctaTitle": "Проверить, каких агропоставщиков рекомендуют нейросети",
        "ctaText": "Пришли сайт, основные товарные группы, регионы и документы по продукции. Составлю план стартового GEO-аудита без предположений о соответствии товаров.",
        "request": "GEO агропоставщика: семена, СЗР, корма, техника, регистрация, применимость, SKU, BMR."
      },
      "en": {
        "title": "GEO for agricultural input and equipment suppliers | GAEO.ru",
        "h1": "GEO for agricultural input and equipment suppliers",
        "description": "GEO services for seed, crop protection, feed and farm-equipment suppliers: registered product facts, fitment, B2B availability and BMR.",
        "eyebrow": "Agribusiness / Inputs and equipment",
        "lead": "An agronomist selects products for a particular crop, whereas a maintenance buyer needs the right part for a machine model. I audit which suppliers AI recommends and whether product-level evidence supports its claims.",
        "heroPoints": [
          "Separate AI prompts for seed, crop protection, feed and equipment",
          "Registration and technical evidence checked at product level",
          "Searchable catalog facts, expert content and repeat BMR measurements"
        ],
        "problemTitle": "Why a broad agricultural catalog leads to poor answers",
        "problemIntro": "A pesticide label, seed lot and machinery parts diagram answer different questions. Group-level promotional claims are inadequate evidence for a precise procurement recommendation.",
        "problems": [
          {
            "title": "Different regulatory categories are mixed",
            "body": "Seed varieties, crop protection products, feed supplements and mechanical parts have distinct requirements. One registered product does not validate a supplier's entire catalog."
          },
          {
            "title": "Application details are missing",
            "body": "For regulated crop protection products, the crop, target and authorized uses need checking against current product-specific records. An AI answer must not replace official application directions."
          },
          {
            "title": "Fitment and supply terms are unverified",
            "body": "Machine model, part identifier, technical compatibility, order unit, stock, location and lead time must reflect the actual offer, not generic claims about availability."
          }
        ],
        "scenarioTitle": "Agricultural procurement intents to examine",
        "scenarioIntro": "Examples for an initial non-branded GEO prompt set. Real product categories, sources and suppliers are validated before any audit is presented as a result.",
        "columns": [
          "Purchasing question",
          "Evidence required",
          "GEO deliverable"
        ],
        "scenarios": [
          [
            "Where can I order a specific crop seed variety with lot records?",
            "Variety, lot data, relevant documents and delivery window",
            "Make offers and supporting evidence findable by variety and batch"
          ],
          [
            "Which registered crop protection product fits the intended crop?",
            "Valid registration, prescribed uses and limitations",
            "Link product pages to verifiable regulatory references"
          ],
          [
            "Who supplies a verified part for a particular tractor variant?",
            "Part number, machine configuration and documented compatibility",
            "Publish fitment-focused category and SKU information"
          ],
          [
            "Where can a farm source a feed supplement locally?",
            "Product specification, storage conditions, supplier availability and region",
            "Distinguish the current offer from a broad corporate catalog"
          ]
        ],
        "proofTitle": "Evidence required before recommending an agricultural product",
        "proofIntro": "I separate manufacturer, authorized distributor and reseller roles, then check the available technical and regulatory material for the relevant product group.",
        "checks": [
          "Exact product, lot or part, declared purpose, supported properties and manufacturer-backed compatibility",
          "Registration and product-specific rules for seeds, pesticides and agrochemicals where those frameworks apply",
          "Supplier role, territory, stock status, delivery commitments and the information's last verified date"
        ],
        "proofNote": "The linked legal sources are verification references, not certificates issued to any named supplier. No results for a particular GAEO agricultural supplier client are asserted.",
        "workTitle": "A GEO workflow built around actual product selection",
        "workIntro": "Every recommendation test uses a defined buyer task, product group and sourcing condition rather than a generic supplier keyword.",
        "steps": [
          {
            "title": "Segment buyer intent",
            "body": "Group needs by input type, crop, machine application, season, geography and procurement role."
          },
          {
            "title": "Audit product evidence",
            "body": "Review SKU attributes, applicable registration data, compatibility records, supplier rights and availability."
          },
          {
            "title": "Prepare content and site tasks",
            "body": "Specify product and category pages, verification links, expert articles and structured technical explanations."
          },
          {
            "title": "Review AI answer quality",
            "body": "Repeat the baseline prompts, track BMR and flag unsupported or unsafe product recommendations."
          }
        ],
        "faq": [
          {
            "question": "Can GEO cover crop protection suppliers?",
            "answer": "Yes, by making accurate registered-product information easier to find. Product use and safety guidance must still come from current official information and the approved product documentation."
          },
          {
            "question": "Is the same registration required for every farm product?",
            "answer": "No. Seed, crop protection, feed products, equipment and spare parts have different regulatory or technical obligations. Applicability must be checked separately."
          },
          {
            "question": "Can AI show interchangeable machinery parts?",
            "answer": "Only supported interchange information should be published as a fact. A similar-looking component is not proof of compatibility with a particular machine variant."
          },
          {
            "question": "How are seasonal offers handled?",
            "answer": "I distinguish the full range from current inventory, pre-orders and regional lead times, and use comparable prompts for later measurement."
          },
          {
            "question": "What is the GEO budget for input suppliers?",
            "answer": "The published GAEO service plans apply. Scope depends on product groups, catalog complexity, regions and the baseline question set."
          }
        ],
        "ctaTitle": "See which agricultural suppliers AI actually recommends",
        "ctaText": "Share the supplier website, principal product families, delivery regions and technical source material. I will outline a baseline audit.",
        "request": "Agricultural supplier GEO: seed, crop protection, feed, equipment, registration, fitment, SKU data and BMR."
      }
    }
  }
];
