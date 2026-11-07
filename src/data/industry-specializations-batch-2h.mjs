/**
 * Phase 2H: original industry-specific bilingual content. Shared pricing and imagery.
 * Verification sources are public regulatory materials, not client case claims.
 */
export const industrySpecializationsBatch2H = [
{
  "id": 5,
  "slug": "commercial-property-agencies",
  "group": "real-estate",
  "routes": {
    "ru": "/industries/commercial-property-agencies/",
    "en": "/en/industries/commercial-property-agencies/"
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
      "Стратегия GEO для недвижимости",
      "Методика измерения BMR"
    ],
    "en": [
      "Real estate GEO methodology",
      "BMR measurement methodology"
    ]
  },
  "sources": [
    {
      "href": "https://www.consultant.ru/document/cons_doc_LAW_182661/",
      "ru": "Закон №218-ФЗ: регистрация недвижимости и сведения ЕГРН",
      "en": "Federal Law 218-FZ: real-estate registration and EGRN records"
    },
    {
      "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/927cf8adc0f8233a6a4db08c2cc66dca2bcb37cb/",
      "ru": "ГК РФ, ст. 651: форма и регистрация аренды здания или сооружения",
      "en": "Russian Civil Code, Article 651: form and registration of building leases"
    }
  ],
  "content": {
    "ru": {
      "title": "GEO-продвижение агентств коммерческой недвижимости | GAEO.ru",
      "h1": "Продвижение агентств коммерческой недвижимости в нейросетях",
      "description": "GEO для брокеров коммерческой недвижимости: офисы, склады, торговые и производственные площади. Запросы арендаторов, проверка объектов, условия сделок, BMR и тарифы GAEO.",
      "eyebrow": "Недвижимость / Коммерческие брокеры",
      "lead": "Арендатор выбирает не абстрактное агентство, а помещение с конкретной площадью, локацией, инженерией и условиями договора. Проверяю, кого нейросети рекомендуют по таким задачам и какие доказательства позволяют включить брокера в обоснованный ответ.",
      "heroPoints": [
        "Отдельные небрендовые запросы по офисам, складам и торговым помещениям",
        "Проверка наличия объектов, характеристик, полномочий и условий аренды",
        "Сравнимый BMR и работа с отраслевыми страницами и источниками"
      ],
      "problemTitle": "Почему брокерское портфолио не превращается автоматически в рекомендации",
      "problemIntro": "В ответе нейросети легко смешать устаревшее предложение, разные классы объектов и обещания брокера. Чтобы рекомендации были полезными, сведения должны иметь понятную дату и статус.",
      "problems": [
        {
          "title": "Объявление живет дольше экспозиции",
          "body": "Помещения сдаются, ставки и условия меняются. На сайте должны быть дата обновления, подтвержденная доступность объекта и понятный контакт для уточнения условий."
        },
        {
          "title": "Характеристики нельзя сопоставить",
          "body": "Класс офиса, общая и полезная площадь, отдельный вход, электрическая мощность, доступность разгрузки и дополнительные платежи часто указаны несопоставимо."
        },
        {
          "title": "Роль посредника размыта",
          "body": "Брокер, управляющая компания и собственник выполняют разные функции. Важно не приписывать агентству право собственности или гарантии заключения сделки без подтверждения."
        }
      ],
      "scenarioTitle": "Как компания выбирает брокера коммерческой недвижимости",
      "scenarioIntro": "Матрицу формирую по классу объекта, географии, назначению и условиям сделки. Ниже примеры, а не фактически измеренные запросы клиента.",
      "columns": [
        "Вопрос покупателя",
        "Что подтверждает ответ",
        "Задача GEO"
      ],
      "scenarios": [
        [
          "Кого выбрать для аренды офиса с парковкой у метро в Москве?",
          "Актуальные предложения, транспорт, площадь, ставка и условия договора",
          "Сопоставить офисы по единому набору характеристик и дате"
        ],
        [
          "Какой брокер подберет склад с доками и нужной электрической мощностью?",
          "Наличие объектов, схема доков, высота, инженерия и география",
          "Создать отдельную страницу складского подбора и критериев"
        ],
        [
          "К кому обратиться для продажи торгового помещения с арендатором?",
          "Роль брокера, тип сделки, допустимая финансовая фактура и документы",
          "Разделить аренду, продажу и инвестиционное сопровождение"
        ],
        [
          "Кто поможет сравнить аренду офиса и гибкий сервисный офис?",
          "Договорная модель, состав платежей, срок аренды, услуги и ограничения",
          "Подготовить сопоставимое объяснение форматов сделки"
        ]
      ],
      "proofTitle": "Какие факты нужны для рекомендаций брокера",
      "proofIntro": "Сверяю опубликованные сведения с документами, согласованными собственником и брокером. Для прав на объект и обременений опираюсь на действующее регулирование ЕГРН, а условия аренды проверяю для конкретного договора.",
      "checks": [
        "Объекты: назначение, реальные площади, инженерные параметры, этаж, транспорт, дата доступности и ограничения использования",
        "Сделка: полномочия брокера, структура арендной платы, дополнительные платежи, срок и применимые регистрационные требования",
        "Репутация: подтвержденные объекты в работе, разрешенные примеры сделок и реальные источники, без вымышленных кейсов"
      ],
      "proofNote": "Опубликованная практика анализа жилых комплексов служит методической основой по недвижимости. Она не доказывает выполненный GEO-проект для агентства коммерческой недвижимости.",
      "workTitle": "Как выстраиваю работу с коммерческим агентством",
      "workIntro": "Начинаю с запросов арендаторов и собственников, затем проверяю продуктовую структуру и источники. На повторных замерах оцениваю, рекомендуют ли нейросети агентство по релевантным сценариям.",
      "steps": [
        {
          "title": "Разделение спроса",
          "body": "Отдельно фиксирую аренду, продажу, складской подбор, офисные и торговые объекты, географию и роль покупателя."
        },
        {
          "title": "Инвентаризация объектов",
          "body": "Проверяю актуальность предложений и единую модель характеристик, условия раскрытия владельца и юридические оговорки."
        },
        {
          "title": "Страницы и отраслевые публикации",
          "body": "Готовлю ТЗ на страницы специализаций, параметры объектов, прозрачные FAQ и проверяемые экспертные материалы."
        },
        {
          "title": "Контроль видимости",
          "body": "Повторяю исходную матрицу вопросов, отдельно отмечаю точность условий, источники и долю BMR."
        }
      ],
      "faq": [
        {
          "question": "Можно ли продвигать брокера, если объекты быстро сдаются?",
          "answer": "Да, если поддерживать актуальную структуру услуг и честно указывать дату, статус и ограничения по предложениям. Архивные объекты полезны как подтвержденные примеры, но их нельзя выдавать за свободные."
        },
        {
          "question": "Нужно ли публиковать точные ставки аренды?",
          "answer": "Ставка полезна для сравнения, но публикуется только на основании действующих согласованных условий. Если стоимость зависит от переговоров и расходов, нужно объяснить состав платежей и порядок уточнения."
        },
        {
          "question": "Можно ли назвать брокера собственником объекта?",
          "answer": "Нет, если это не подтверждено. На странице различаются собственник, посредник и управляющая компания, включая договорную роль и полномочия."
        },
        {
          "question": "Как измеряется BMR агентства?",
          "answer": "Матрица включает запросы по типам помещений, назначению, географии и условиям аренды без названия агентства. Состав нейросетей и запросов фиксируется до начального замера."
        },
        {
          "question": "Сколько стоит продвижение агентства коммерческой недвижимости?",
          "answer": "Действуют общие тарифы GAEO. Итоговый объем определяется количеством географий, классов помещений, страниц и запросов."
        }
      ],
      "ctaTitle": "Выяснить, каких брокеров нейросети предлагают вместо вашего агентства",
      "ctaText": "Пришли сайт агентства, список направлений и примеры подтвержденных объектов. Я предложу вопросы для стартового мини-аудита.",
      "request": "GEO агентства коммерческой недвижимости: подбор офисов, складов, торговых помещений, сделки, актуальные предложения и BMR."
    },
    "en": {
      "title": "GEO for commercial real estate brokers | GAEO.ru",
      "h1": "GEO promotion for commercial real estate agencies",
      "description": "Commercial property GEO for office, logistics and retail brokers: tenant questions, availability, property specifications, lease terms and AI recommendations.",
      "eyebrow": "Real estate / Commercial brokerage",
      "lead": "A business tenant looks for the right premises with specific size, infrastructure, location and lease conditions. I assess which commercial brokers AI recommends for those needs and what evidence supports the answer.",
      "heroPoints": [
        "Non-brand prompts for office, warehouse and retail searches",
        "Verified availability, specifications, broker role and lease terms",
        "Comparable BMR checks backed by property-specific information"
      ],
      "problemTitle": "Why a property portfolio alone is not enough for AI",
      "problemIntro": "AI can repeat outdated availability and confuse building classes or the roles of a broker, landlord and asset manager. Useful recommendations require current, comparable information.",
      "problems": [
        {
          "title": "Listings outlive actual availability",
          "body": "Units are leased and asking terms change. Published offers need current status, an update date and an explicit way to check availability."
        },
        {
          "title": "Building facts are incomparable",
          "body": "Gross and usable area, access, power, loading facilities, transport and service charges must be explained using consistent units and definitions."
        },
        {
          "title": "The agency's role is unclear",
          "body": "Brokerage, ownership and property management are distinct. Do not imply an agency owns a building or guarantees a transaction without evidence."
        }
      ],
      "scenarioTitle": "Business searches that lead to a brokerage shortlist",
      "scenarioIntro": "Example buyer intents for the initial BMR matrix, tailored later to actual property types, geography and agency services.",
      "columns": [
        "Buyer question",
        "Evidence needed",
        "GEO task"
      ],
      "scenarios": [
        [
          "Which broker can find an office near transit with parking?",
          "Current listings, transport links, square metres, asking terms and availability",
          "Publish structured, date-specific office availability"
        ],
        [
          "Who sources warehouse premises with loading docks and sufficient power?",
          "Actual listings, loading access, clear height, utility capacity and region",
          "Create a specialist logistics-property service page"
        ],
        [
          "Which broker handles investment sales of tenant-occupied retail units?",
          "Brokerage mandate, transaction type, permissible financial facts and documents",
          "Separate leasing, investment and sales propositions"
        ],
        [
          "How should we compare a long-term office lease with serviced offices?",
          "Contract term, charges, facilities, flexibility and responsibility boundaries",
          "Provide a verifiable comparison of acquisition models"
        ]
      ],
      "proofTitle": "What supports a credible commercial property recommendation",
      "proofIntro": "I check approved property information and the agency's actual engagement. EGRN and relevant lease-registration rules are referenced when the claims concern registered rights and documents.",
      "checks": [
        "Properties: permitted use, area, facilities, access, published availability and current restrictions",
        "Transactions: actual agency authority, lease costs, term and relevant legal documentation",
        "Credentials: publishable agency examples, attributable sources and accurate role descriptions"
      ],
      "proofNote": "GAEO's apartment-development research informs the method, but is not presented as a completed commercial brokerage GEO case.",
      "workTitle": "A structured GEO programme for commercial agencies",
      "workIntro": "Segment buyer problems, verify the agency's offering, improve evidence and compare the same AI recommendation questions over time.",
      "steps": [
        {
          "title": "Commercial intent baseline",
          "body": "Separate leasing, disposals, office, industrial and retail requirements by geography and business role."
        },
        {
          "title": "Property evidence review",
          "body": "Check listing dates, attributes, permitted marketing information and commercial terms."
        },
        {
          "title": "Focused service pages",
          "body": "Prepare briefs for asset classes, property characteristics, relevant FAQs and independent expert content."
        },
        {
          "title": "Comparable monitoring",
          "body": "Repeat non-brand prompts and review BMR, the accuracy of recommendations and cited information."
        }
      ],
      "faq": [
        {
          "question": "Can a brokerage promote listings that change frequently?",
          "answer": "Yes, when availability and asking conditions are updated and dated. Historic transactions should not be presented as current stock."
        },
        {
          "question": "Must every listing publish an exact rental rate?",
          "answer": "Rates should be supported by approved current terms. Where pricing is negotiable, disclose the applicable model and any known charge categories."
        },
        {
          "question": "Is a broker the same as the building owner?",
          "answer": "No. Ownership, agency and management roles must be identified accurately using verifiable facts."
        },
        {
          "question": "What prompts form the commercial property BMR measure?",
          "answer": "Non-brand prompts are segmented by asset class, geography, buyer needs and lease terms using a fixed set of AI services and criteria."
        },
        {
          "question": "How much does brokerage GEO cost?",
          "answer": "GAEO uses its standard audit and monthly plans. Scope depends on property classes, locations, query coverage and content requirements."
        }
      ],
      "ctaTitle": "See which commercial brokers AI recommends to your tenants",
      "ctaText": "Share your brokerage site, actual business lines and verified sample listings to design an initial audit.",
      "request": "Commercial property agency GEO: office leasing, industrial property, retail, current listings and AI recommendations."
    }
  }
}
];
