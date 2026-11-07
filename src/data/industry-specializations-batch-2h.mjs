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
},
{
  "id": 6,
  "slug": "warehouse-industrial-parks",
  "group": "real-estate",
  "routes": {
    "ru": "/industries/warehouse-industrial-parks/",
    "en": "/en/industries/warehouse-industrial-parks/"
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
      "GEO-методика для недвижимости",
      "Замер BMR для небрендовых запросов"
    ],
    "en": [
      "Real estate GEO methodology",
      "Non-brand BMR measurement"
    ]
  },
  "sources": [
    {
      "href": "https://gisp.gov.ru/nmp/measure/8123826",
      "ru": "ГИСП: подтверждение соответствия индустриальных парков требованиям Минпромторга",
      "en": "State industry information system: recognised industrial park requirements"
    },
    {
      "href": "https://gisp.gov.ru/nmp/measure/8123826/document",
      "ru": "ГИСП: документы об инфраструктуре, резидентах и управляющей компании",
      "en": "State industry information system: infrastructure and management evidence"
    },
    {
      "href": "https://www.consultant.ru/document/cons_doc_LAW_182661/",
      "ru": "Закон №218-ФЗ: права и сведения об объектах недвижимости",
      "en": "Federal Law 218-FZ: registered real estate rights and property records"
    }
  ],
  "content": {
    "ru": {
      "title": "GEO для складских комплексов и индустриальных парков | GAEO.ru",
      "h1": "Продвижение складских и индустриальных парков в нейросетях",
      "description": "GEO для собственников складских комплексов и индустриальных парков: доступные площади, высота, доки, мощности, дороги, режимы, резиденты и договоры. Методика BMR GAEO.",
      "eyebrow": "Недвижимость / Складские и индустриальные объекты",
      "lead": "Производитель и логистическая компания выбирают площадку по транспортному доступу, мощности сетей, размеру блока и срокам готовности. Проверяю, какие парки нейросети предлагают арендаторам и какие характеристики нуждаются в подтверждении.",
      "heroPoints": [
        "Небрендовые запросы производителей, логистов и промышленных резидентов",
        "Проверка реальных площадей, сетей, погрузки и статуса инфраструктуры",
        "Страницы объектов и независимые факты для сопоставимого BMR"
      ],
      "problemTitle": "Что мешает нейросети рекомендовать подходящий парк",
      "problemIntro": "«Складской комплекс класса А» и «индустриальный парк» обозначают разные свойства. Для рекомендации конкретного объекта нужны точные параметры, готовность помещений и статус заявлений.",
      "problems": [
        {
          "title": "Складской формат смешан с индустриальным статусом",
          "body": "Обычный складской комплекс нельзя автоматически называть парком из федерального реестра. Если управляющая компания заявляет подтвержденный статус, проверяем запись, действующий срок и требования ГИСП."
        },
        {
          "title": "Площадь и инженерия указаны без единиц",
          "body": "Общая площадь территории, сдаваемый модуль, высота хранения, полы, ворота, электрическая мощность и газ имеют разные единицы и готовность. Нельзя объединять проект и введенные мощности."
        },
        {
          "title": "Логистика описана рекламно",
          "body": "Отгрузка зависит от подъездных дорог, ограничений для грузовиков, географии и графика работы. Расстояние по прямой не заменяет время и условия реального маршрута."
        }
      ],
      "scenarioTitle": "Какие требования резиденты задают при выборе площадки",
      "scenarioIntro": "Сценарии для построения измеряемой матрицы: запросы уточняются по региону, типу арендатора и реальным техническим условиям парка.",
      "columns": [
        "Запрос потенциального резидента",
        "Что проверить",
        "Задача GEO"
      ],
      "scenarios": [
        [
          "Где арендовать склад с 12-метровой высотой и доковыми воротами?",
          "Реальная свободная площадь, рабочая высота, число доков и нагрузки на пол",
          "Опубликовать таблицу фактических параметров по каждому корпусу"
        ],
        [
          "Какой индустриальный парк подойдет для пищевого производства?",
          "Назначение помещений, санитарные и инженерные требования, вода, электричество и ограничения",
          "Описать допустимые виды производств и статус инженерных сетей"
        ],
        [
          "Где разместить логистический центр с круглосуточной отгрузкой?",
          "Подъезды, правила доступа, график, площадки маневрирования и транспортные ограничения",
          "Проверить дороги и операции по реальным документам и условиям"
        ],
        [
          "Какие парки имеют подтвержденный статус в реестре Минпромторга?",
          "Реестровое подтверждение, категория объекта, заявитель и текущий статус",
          "Отделить официальное признание от маркетингового названия"
        ]
      ],
      "proofTitle": "Какие характеристики имеют силу доказательства",
      "proofIntro": "Сверяю документацию собственника и управляющей компании, сведения о правах, технические условия и актуальные доступные блоки. Реестр ГИСП применим к соответствующим индустриальным паркам; не распространяю его критерии автоматически на обычные логистические склады.",
      "checks": [
        "Объект: тип и назначение, доступные блоки, год и стадия ввода, права, план корпуса, инженерные мощности и их фактическая готовность",
        "Операции: подъезд для транспорта, режим доступа, погрузочные места, ограничения хранения и работы производств",
        "Договор: сторона аренды или продажи, сроки доступа, услуги управляющей компании, ставки и порядок подтверждения текущих условий"
      ],
      "proofNote": "Методика GAEO по недвижимости и фулфилменту помогает формулировать требования покупателей. Она не подтверждает завершенный проект GEO для конкретного складского или индустриального парка.",
      "workTitle": "Как продвигаю площадку в рекомендациях нейросетей",
      "workIntro": "Разделяю объекты и реальные сценарии резидентов, фиксирую исходный BMR и готовлю проверяемые страницы с техническими параметрами.",
      "steps": [
        {
          "title": "Замер спроса",
          "body": "Составляю запросы по типу резидента, логистике, площади, коммуникациям и географии. Отдельно измеряю брендовые вопросы."
        },
        {
          "title": "Проверка площадки",
          "body": "Получаю актуальные схемы и подтверждения мощности, проверяю правоотношения, дату доступности и заявленный индустриальный статус."
        },
        {
          "title": "Сайт и внешние доказательства",
          "body": "Готовлю ТЗ на страницы корпусов, FAQ об инженерии, логистике, договоре, а также на экспертные публикации с источниками."
        },
        {
          "title": "Повторный контроль BMR",
          "body": "Сравниваю те же запросы и нейросети, отдельно фиксирую неверные сведения об инфраструктуре и резидентских условиях."
        }
      ],
      "faq": [
        {
          "question": "Каждый логопарк считается индустриальным парком по реестру Минпромторга?",
          "answer": "Нет. Статус индустриального парка, соответствующего требованиям государственной поддержки, проверяется отдельно по действующим данным ГИСП. Название складского объекта само по себе ничего не подтверждает."
        },
        {
          "question": "Можно ли продвигать парк с еще не готовой инженерией?",
          "answer": "Да, если четко обозначить стадию проекта, запланированные сроки, фактически доступные мощности и документально подтвержденные технические условия."
        },
        {
          "question": "Как показать свободные складские площади?",
          "answer": "Нужны датированные сведения по конкретному корпусу или модулю, назначению, площади, высоте, инженерии и условиям доступа. Изменения доступности регулярно обновляются."
        },
        {
          "question": "Является ли продвижение складского парка тем же, что GEO фулфилмент-оператора?",
          "answer": "Нет. Собственник предлагает недвижимость и инфраструктуру, а фулфилмент-оператор выполняет складские операции для клиентов. Покупательские интенты, доказательства и договорная модель различаются."
        },
        {
          "question": "Сколько стоит GEO для логистического или индустриального парка?",
          "answer": "Применяются общие тарифы GAEO. Масштаб зависит от числа объектов, корпусов, регионов и выбранных сценариев резидентов."
        }
      ],
      "ctaTitle": "Проверить, какие площадки нейросети советуют потенциальным резидентам",
      "ctaText": "Пришли сайт парка, фактическую готовность корпусов, схемы и разрешенные технические характеристики. Определю начальную матрицу запросов.",
      "request": "GEO складского и индустриального парка: доступные блоки, доки, инженерия, логистика, резиденты и BMR."
    },
    "en": {
      "title": "GEO for warehouse and industrial park owners | GAEO.ru",
      "h1": "GEO promotion for warehouse and industrial park owners",
      "description": "Warehouse and industrial property GEO: real unit availability, loading bays, floor load, utilities, access roads, park status and tenant questions. GAEO BMR.",
      "eyebrow": "Real estate / Warehouse and industrial parks",
      "lead": "Manufacturers and logistics operators select sites by truck access, available capacity, utility connections and occupancy dates. I test which parks AI recommends and whether their documented specifications match tenant needs.",
      "heroPoints": [
        "Non-brand questions from logistics and manufacturing tenants",
        "Verified unit availability, power, loading and infrastructure status",
        "Evidence-based property content and comparable BMR tracking"
      ],
      "problemTitle": "Why an industrial property is not automatically recommended",
      "problemIntro": "A warehouse complex and a formally recognised industrial park may be different propositions. AI shortlists need accurate specifications and a clear distinction between existing and planned facilities.",
      "problems": [
        {
          "title": "Park status is overstated",
          "body": "A logistics building cannot be assumed to hold official industrial park status. Where management claims recognition, the relevant state registry and supporting evidence must be checked."
        },
        {
          "title": "Engineering capacity is ambiguous",
          "body": "Site area, rentable unit area, clear height, loading doors, floor load and electrical capacity need consistent units and actual readiness dates."
        },
        {
          "title": "Transport access lacks evidence",
          "body": "Truck routes and operational access depend on roads, operating windows and vehicle restrictions. Straight-line distance is not a substitute for feasible logistics."
        }
      ],
      "scenarioTitle": "The searches that drive tenant decisions",
      "scenarioIntro": "Illustrative commercial prompts; final query coverage follows the specific assets, tenant types and geography.",
      "columns": [
        "Tenant question",
        "Evidence required",
        "GEO action"
      ],
      "scenarios": [
        [
          "Where can I rent a warehouse with high clear height and dock doors?",
          "Vacant units, clear height, dock availability, floor load and location",
          "Provide building-specific, dated technical inventories"
        ],
        [
          "Which industrial park can accommodate food production?",
          "Permitted operations, utilities, fit-out, water and hygiene-related constraints",
          "Describe allowed uses and verified utility readiness"
        ],
        [
          "Where can we run a logistics hub with 24-hour dispatch?",
          "Truck access, gate rules, loading schedule and yard constraints",
          "Document actual operating conditions and road connections"
        ],
        [
          "Which industrial parks have recognised status in the Russian registry?",
          "Actual registry entry, managing company and current status",
          "Distinguish verified state status from a marketing description"
        ]
      ],
      "proofTitle": "Evidence behind a credible property recommendation",
      "proofIntro": "I review owner and manager documentation, registered property information, technical conditions and live unit availability. The state industrial park registry applies only when the specified recognition criteria are relevant.",
      "checks": [
        "Property: type, permitted use, available units, readiness stage, floorplans and verified utility capacities",
        "Operations: truck access, loading, security, permitted activities and actual site restrictions",
        "Commercial offer: leasing party, access dates, manager services, current terms and contract scope"
      ],
      "proofNote": "GAEO's real estate and fulfilment experience provides methodological context. No completed GEO outcome for an industrial or warehouse park is claimed.",
      "workTitle": "A practical GEO programme for industrial sites",
      "workIntro": "Segment tenant questions, document the property and compare AI recommendations before and after improving the available facts.",
      "steps": [
        {
          "title": "Demand and BMR baseline",
          "body": "Record non-brand queries by tenant profile, region, usable area, utilities and logistics requirements."
        },
        {
          "title": "Verify asset capabilities",
          "body": "Review available units, actual capacity, property role, commissioning stages and any claimed registry status."
        },
        {
          "title": "Build evidence-led pages",
          "body": "Specify building pages, technical FAQs, logistics notes, leasing terms and sourced sector publications."
        },
        {
          "title": "Repeat measured queries",
          "body": "Compare the same AI responses, noting BMR and errors about utilities, availability or park designation."
        }
      ],
      "faq": [
        {
          "question": "Does every logistics park qualify as a registered industrial park?",
          "answer": "No. Government-recognised industrial park status must be checked against the applicable registry and official requirements. A project's name alone is not evidence."
        },
        {
          "question": "Can an unfinished site use GEO?",
          "answer": "Yes, if plans, currently available space and confirmed technical conditions are separated clearly, with appropriate dates and limitations."
        },
        {
          "question": "How should vacant units be described?",
          "answer": "Publish dated inventory for individual units with area, clear height, available infrastructure, permitted use and conditions for taking possession."
        },
        {
          "question": "Is warehouse real estate GEO the same as fulfilment operator GEO?",
          "answer": "No. A property owner provides facilities and access, whereas a fulfilment operator provides operational services. Their buyer decisions and evidence differ."
        },
        {
          "question": "What does industrial park GEO cost?",
          "answer": "GAEO's standard audit and promotion plans apply. Scope depends on assets, regions and the number of distinct tenant requirements."
        }
      ],
      "ctaTitle": "See which industrial and logistics sites AI recommends",
      "ctaText": "Share your park website, available buildings and approved technical details to prepare a focused baseline audit.",
      "request": "Warehouse and industrial park GEO: units, loading, power, transport access, tenants and AI recommendations."
    }
  }
}
];
