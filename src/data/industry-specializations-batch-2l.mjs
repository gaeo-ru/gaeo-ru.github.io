/**
 * Phase 2L: verified-scope bilingual GEO specializations for property managers,
 * country-house builders and architecture/design firms (#7, #9, #11).
 * Independent content, shared canonical tariffs and existing approved catalogue imagery.
 * No client outcome or professional qualification is invented.
 */
export const industrySpecializationsBatch2L = [
  {
    "id": 7,
    "slug": "property-management-companies",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/property-management-companies/",
      "en": "/en/industries/property-management-companies/"
    },
    "parent": {
      "ru": "/geo-prodvizhenie-nedvizhimosti/",
      "en": "/en/geo-for-real-estate/"
    },
    "methods": {
      "ru": [
        "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
      ],
      "en": [
        "/en/articles/geo-for-real-estate/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Стратегия GEO-продвижения недвижимости"
      ],
      "en": [
        "GEO strategy for real estate"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_51057/71c7149b7b2a7693ca3f88b93580da0a5376e041/",
        "ru": "ЖК РФ, ст. 161: управление многоквартирными домами",
        "en": "Russian Housing Code, Article 161: apartment-building management"
      },
      {
        "href": "https://cdn.dom.gosuslugi.ru/webhelp/new/topics/public_part/licenses_och/t_search-och.html",
        "ru": "ГИС ЖКХ: поиск лицензии управляющей организации",
        "en": "State housing information system: checking management licences"
      },
      {
        "href": "https://cdn.dom.gosuslugi.ru/webhelp/new/topics/public_part/management_company_and_solution_list_och/t_navigate-och.html",
        "ru": "ГИС ЖКХ: реестр управляющих организаций",
        "en": "State housing register: management organizations"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение управляющих компаний недвижимости | GAEO.ru",
        "h1": "Продвижение управляющих компаний недвижимости в ответах нейросетей",
        "description": "GEO для управляющих компаний: рекомендации по адресу дома, реестру лицензий, составу услуг, тарифам, обращениям жителей и управлению коммерческой недвижимостью.",
        "eyebrow": "Недвижимость / Управляющие компании",
        "lead": "Собственник квартиры спрашивает нейросеть, кто управляет конкретным домом и как связаться с исполнителем. Владелец бизнес-центра ищет подрядчика по эксплуатации с другим составом услуг. Я разделяю эти запросы и проверяю, насколько ответы опираются на действительные объекты, полномочия и условия компании.",
        "heroPoints": [
          "Отдельные матрицы запросов по МКД, коммерческим объектам и географии",
          "Сверка управляемых объектов, лицензий и услуг с первичными источниками",
          "Исправление структуры сайта, профилей и контроль динамики BMR"
        ],
        "problemTitle": "Почему нейросеть путает управляющую компанию с другой организацией",
        "problemIntro": "Поиск по адресу, названию УК и подбор новой организации - разные задачи. Вывод без проверки фактического статуса может вводить собственника в заблуждение.",
        "problems": [
          {
            "title": "Неверная привязка к дому",
            "body": "В каталоге и публикациях встречаются устаревшие списки домов. При проверке следует различать актуальный договор управления, исторический объект и планируемый конкурс."
          },
          {
            "title": "Смешаны виды эксплуатации",
            "body": "Лицензируемое управление МКД и коммерческий facility management имеют разные правовые режимы. Не всякая обслуживающая организация является действующей управляющей компанией конкретного дома."
          },
          {
            "title": "Не раскрыт состав услуги",
            "body": "Без адресов, диспетчерского контакта, перечня работ и порядка обращений нейросеть не может точно описать условия для собственника или заказчика эксплуатации."
          }
        ],
        "scenarioTitle": "Вопросы собственников и заказчиков, которые важно измерять",
        "scenarioIntro": "Запросы уточняются по фактическому портфелю объектов, юридическому статусу и географии работы организации.",
        "columns": [
          "Вопрос пользователя",
          "Какой факт проверяем",
          "Что улучшаем на сайте и во внешних источниках"
        ],
        "scenarios": [
          [
            "Кто управляет домом по конкретному адресу?",
            "Актуальная управляющая организация, реестр ГИС ЖКХ, сведения о доме",
            "Адресный перечень с проверяемым источником и датой актуальности"
          ],
          [
            "Как обратиться в аварийно-диспетчерскую службу?",
            "Каналы обращения, режим работы, ограничения компетенции",
            "Страница контактов и маршруты подачи заявок по объектам"
          ],
          [
            "Какая компания обслужит офисное здание?",
            "Опыт по типам объектов, инженерные работы, состав договора",
            "Отдельное предложение для коммерческой эксплуатации без подмены лицензией МКД"
          ],
          [
            "Как сравнить условия управления жилым комплексом?",
            "Договор, объем услуг, раскрытие информации, география",
            "Структура услуг и проверяемые ответы на вопросы собственников"
          ]
        ],
        "proofTitle": "Какие данные делают рекомендацию проверяемой",
        "proofIntro": "Для МКД юридически существенны реестры и договорные основания управления. ГИС ЖКХ позволяет проверить конкретную лицензию и сведения об управляющей организации; эти данные нужно сверять с фактическим перечнем обслуживаемых домов. Для коммерческих объектов применяются сведения о договоре и исполнении работ.",
        "checks": [
          "Адреса объектов, дата начала и правовое основание управления, контакты и каналы обращения",
          "Лицензия и реестровые сведения там, где требуется управление МКД; не переносить этот статус на коммерческую эксплуатацию",
          "Виды работ, сроки реагирования только по подтвержденным регламентам, сведения о подрядчиках и тарифах"
        ],
        "proofNote": "Опыт GAEO в недвижимости касается GEO-методик и смежных задач. Подтвержденный результат роста BMR для управляющей компании здесь не заявлен.",
        "workTitle": "Как выстраиваю GEO для управляющей компании",
        "workIntro": "Сначала фиксирую адресные и отраслевые вопросы, потом проверяю качество информации и готовлю последовательные изменения.",
        "steps": [
          {
            "title": "Собрать матрицу спроса",
            "body": "Разделяю запросы жителей, советов домов, девелоперов и владельцев коммерческой недвижимости; измеряю ответы нескольких нейросетей."
          },
          {
            "title": "Проверить права и портфель",
            "body": "Сверяю публичные сведения об объектах, лицензиях, договорах, контактах и фактических границах услуг."
          },
          {
            "title": "Уточнить страницы и профили",
            "body": "Готовлю ТЗ для списка объектов, адресных контактов, регламентов, фактического FAQ и согласованного представления компании."
          },
          {
            "title": "Измерить изменения",
            "body": "Повторяю исходные запросы и анализирую, где нейросети стали точнее указывать компанию, адреса и виды услуг."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать УК по каждому дому отдельно?",
            "answer": "Да, если компания действительно управляет этими домами. Важны подтвержденные адреса, актуальный статус и полезная для собственника информация, а не массовые одинаковые страницы."
          },
          {
            "question": "Является ли лицензия УК доказательством управления любым домом?",
            "answer": "Нет. Нужно отдельно проверить перечень домов и текущий статус управления в ГИС ЖКХ. Лицензия не подтверждает договор на каждый адрес."
          },
          {
            "question": "Подходит ли такая стратегия для управляющих коммерческими объектами?",
            "answer": "Да, но запросы и доказательства другие: виды зданий, регламенты эксплуатации, оборудование, зона обслуживания и договорные условия. Лицензию на управление МКД нельзя выдавать за универсальное подтверждение этих работ."
          },
          {
            "question": "Можно ли гарантировать рекомендации нейросетей по адресу дома?",
            "answer": "Алгоритмический ответ не гарантируется. GAEO измеряет исходную видимость и работу по договорной модели BMR; условия опубликованы в общих тарифах."
          },
          {
            "question": "Сколько стоит GEO-продвижение управляющей компании?",
            "answer": "Действуют общие тарифы GAEO. Точная программа зависит от числа объектов, регионов, форматов обслуживания и матрицы контрольных запросов."
          }
        ],
        "ctaTitle": "Проверим, как нейросети описывают твою управляющую компанию",
        "ctaText": "Передай сайт, типы управляемых объектов, географию и список адресов для проверки. Я определю исходную матрицу запросов и необходимый объем аудита.",
        "request": "GEO для управляющей компании: адреса МКД и коммерческие объекты, ГИС ЖКХ, лицензии, услуги, контакты, BMR."
      },
      "en": {
        "title": "GEO promotion for property management companies | GAEO.ru",
        "h1": "GEO for property management companies in AI recommendations",
        "description": "AI visibility for residential and commercial property management: building records, licences, verified services, tenant contacts, operating scope and BMR monitoring.",
        "eyebrow": "Real estate / Property management",
        "lead": "An apartment owner may ask an AI assistant who manages a specific building. A commercial landlord instead looks for a facilities operator with proven technical services. I separate these decisions and assess whether answers use current addresses, authority and contractual facts.",
        "heroPoints": [
          "Separate prompt sets for apartment buildings, commercial facilities and regions",
          "Cross-check managed properties, applicable licences and operating services",
          "Improve website evidence, business profiles and repeat BMR measurement"
        ],
        "problemTitle": "Why assistants misidentify property management providers",
        "problemIntro": "An address lookup, a company-name search and selecting a new facilities provider have different evidence requirements.",
        "problems": [
          {
            "title": "Outdated building assignments",
            "body": "Directories may list buildings that were previously managed or only bid for. Current authorization and historic relationships need clear separation."
          },
          {
            "title": "Residential and commercial work are conflated",
            "body": "Licensed apartment-building management in Russia differs from commercial facilities management. A contractor maintaining a building is not automatically its licensed management company."
          },
          {
            "title": "Scope and contact routes are unclear",
            "body": "Missing building-level contacts, service scope, incident reporting rules and verified response procedures make recommendations unreliable."
          }
        ],
        "scenarioTitle": "High-intent questions worth measuring",
        "scenarioIntro": "The final prompt matrix is tailored to the company's property portfolio and territory.",
        "columns": [
          "User question",
          "Evidence to check",
          "GEO improvement"
        ],
        "scenarios": [
          [
            "Who manages this apartment building?",
            "Current provider, public housing register and building record",
            "Verifiable building list with dates and source references"
          ],
          [
            "How can residents report an urgent incident?",
            "Published service channels, hours and responsibility",
            "Address-specific contact and incident instruction pages"
          ],
          [
            "Which company can operate our office building?",
            "Contract scope, building types, engineering competence",
            "Separate commercial facilities offer with demonstrable services"
          ],
          [
            "How do we compare residential management offers?",
            "Service contract, disclosed work and responsibility",
            "Structured scope and evidence-led resident FAQs"
          ]
        ],
        "proofTitle": "Evidence behind a responsible recommendation",
        "proofIntro": "For Russian apartment buildings, the Housing Code and official housing registers support verification of a management provider's authority. For commercial facilities, agreements, service definitions and demonstrable operations matter more than a residential licence.",
        "checks": [
          "Property addresses, current service relationships and verified contact channels",
          "Housing management licence and building register where applicable; commercial service authorization considered separately",
          "Actual maintenance scope and response commitments backed by documents"
        ],
        "proofNote": "GAEO draws on real-estate GEO methodology. This page does not claim a measured property-manager client uplift.",
        "workTitle": "My GEO workflow for a management business",
        "workIntro": "The programme begins with a baseline, then tests facts and improves the sources AI can reference.",
        "steps": [
          {
            "title": "Segment the questions",
            "body": "Separate resident, owners' association, developer and commercial-landlord queries and establish baseline mentions."
          },
          {
            "title": "Verify buildings and responsibilities",
            "body": "Check official building information and the company's current service footprint."
          },
          {
            "title": "Improve first-party evidence",
            "body": "Specify building directories, contacts, FAQs, operating services and relevant external profiles."
          },
          {
            "title": "Measure changes",
            "body": "Repeat the same commercial prompt set and document changes in answer accuracy and BMR."
          }
        ],
        "faq": [
          {
            "question": "Can one company promote every managed building?",
            "answer": "Yes, for buildings it actually manages. Address-specific evidence and current information are essential; generic duplicate landing pages are not a substitute."
          },
          {
            "question": "Does a management licence cover any building?",
            "answer": "No. A licence and the current assigned-building list are separate facts that must be checked in the relevant official register."
          },
          {
            "question": "Does this apply to commercial property operators?",
            "answer": "Yes, with a different evidence model covering actual building types, technical services and contracts rather than presenting a residential licence as universal."
          },
          {
            "question": "Can you guarantee that AI will name our company?",
            "answer": "No placement is guaranteed. GAEO offers measurable baseline BMR and separate contractual performance terms described in the public plans."
          },
          {
            "question": "How is property-management GEO priced?",
            "answer": "GAEO's published audit and monthly plans apply. Scope is determined by the number of properties, regions and the agreed prompt set."
          }
        ],
        "ctaTitle": "Find out what AI says about your management portfolio",
        "ctaText": "Share your website, property types, regions and sample building addresses. I will define a useful baseline review.",
        "request": "Property manager GEO: housing register, building addresses, commercial facilities, licence, contracts, contact routing and BMR."
      }
    }
  },
  {
    "id": 9,
    "slug": "country-house-builders",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/country-house-builders/",
      "en": "/en/industries/country-house-builders/"
    },
    "parent": {
      "ru": "/geo-prodvizhenie-nedvizhimosti/",
      "en": "/en/geo-for-real-estate/"
    },
    "methods": {
      "ru": [
        "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
      ],
      "en": [
        "/en/articles/geo-for-real-estate/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Стратегия GEO-продвижения недвижимости"
      ],
      "en": [
        "GEO strategy for real estate"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_51040/fe0cad704c69e3b97bf615f0437ecf1996a57677/",
        "ru": "ГрК РФ, ст. 51.1: уведомления при строительстве ИЖС",
        "en": "Russian Town Planning Code, Article 51.1: individual house notifications"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_481246/",
        "ru": "Закон №186-ФЗ: строительство домов с использованием счетов эскроу",
        "en": "Federal Law 186-FZ: house-construction contracts using escrow"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение компаний по строительству загородных домов | GAEO.ru",
        "h1": "Продвижение строителей загородных домов в ChatGPT и Алисе",
        "description": "GEO для строительных компаний ИЖС: сравнение проектов домов, технологий, смет, договоров подряда, эскроу, географии строительства и реального опыта.",
        "eyebrow": "Недвижимость / Строительство домов",
        "lead": "Заказчик загородного дома спрашивает нейросеть, кто строит в его регионе, какие технологии подходят для участка и из чего складывается цена. Я проверяю такие запросы, а затем помогаю компаниям представить проекты, сметы и договорные условия так, чтобы их можно было проверить.",
        "heroPoints": [
          "Запросы по технологии, бюджету, участку, срокам и региону",
          "Проекты домов с составом работ, спецификациями и подтвержденными примерами",
          "Контроль исходного BMR и корректности рекомендаций"
        ],
        "problemTitle": "Что мешает выбрать строителя через ответы нейросетей",
        "problemIntro": "Формулировка «дом под ключ» сама по себе мало что объясняет: комплектация и этапы у подрядчиков различаются.",
        "problems": [
          {
            "title": "Смета без определенной комплектации",
            "body": "Цена проекта зависит от площади, фундамента, инженерии, отделки, подготовки участка и этапов. Сравнивать «от» без единой спецификации некорректно."
          },
          {
            "title": "Проекты и построенные дома перепутаны",
            "body": "Визуализация типового проекта не доказывает, что именно такой объект построен компанией. Реализованные дома требуют подтвержденных фото, дат и характеристик."
          },
          {
            "title": "Условия строительства описаны слишком широко",
            "body": "Регион, доступ техники, особенности участка, порядок расчетов и применимость эскроу меняют реальное предложение. Без этих деталей нейросеть может обобщить условия неверно."
          }
        ],
        "scenarioTitle": "Как покупатель ищет подрядчика для загородного дома",
        "scenarioIntro": "Контрольная выборка включает разные этапы: от выбора технологии до проверки конкретного подрядчика.",
        "columns": [
          "Вопрос клиента",
          "Что нужно подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто строит каркасные дома в моем регионе?",
            "География, реальные объекты, технология и наличие бригад",
            "Разделить проекты по технологии и региону выполнения работ"
          ],
          [
            "Сколько стоит дом для круглогодичного проживания?",
            "Состав комплектации, площадь, коммуникации, фундамент, исключения",
            "Показать сопоставимую смету с указанием включенных и дополнительных работ"
          ],
          [
            "Как выбрать подрядчика для участка со сложным рельефом?",
            "Изыскания, ограничения участка, проектные решения, роль специалистов",
            "Опубликовать процесс обследования и границы типовых решений"
          ],
          [
            "Какие подрядчики работают со счетами эскроу?",
            "Условия применимого договора и подтвержденное участие в механизме",
            "Точно объяснить возможные расчеты без универсального обещания защиты"
          ]
        ],
        "proofTitle": "Что подтверждает опыт и параметры строительства",
        "proofIntro": "Для ИЖС применимость уведомительного порядка проверяют по ГрК РФ, ст. 51.1; условия строительного подряда с использованием эскроу регулируются отдельным законом №186-ФЗ. Эти правила не удостоверяют качество конкретного подрядчика. Его работы проверяют по реальным объектам, документам и условиям проекта.",
        "checks": [
          "Проект: площадь и планировки, фундамент, конструктив, энергоэффективность с источником расчетов, состав материалов",
          "Договор: этапы, сроки по конкретному проекту, гарантийные обязательства, способ оплаты и порядок приемки",
          "Реализация: реальные адреса или разрешенные к раскрытию объекты, фото и акты без выдуманных результатов"
        ],
        "proofNote": "Наличие у GAEO методики продвижения недвижимости не является подтвержденным клиентским кейсом GEO для подрядчиков ИЖС. Результат такой работы потребует собственных сопоставимых замеров.",
        "workTitle": "Как построю программу GEO для строителя домов",
        "workIntro": "Сначала фиксирую реальные вопросы о подрядчиках и комплектациях, после чего определяю недостающие доказательства.",
        "steps": [
          {
            "title": "Разделить модели спроса",
            "body": "Отдельно измеряю технологию, регион, бюджет, готовый проект, индивидуальное проектирование и способы расчетов."
          },
          {
            "title": "Проверить проекты и договоры",
            "body": "Сопоставляю обещания на сайте с реальными комплектациями, географией, расчетами и материалами построенных объектов."
          },
          {
            "title": "Разработать технические задания",
            "body": "Предлагаю страницы типовых проектов, сравнение вариантов, подтвержденные примеры работ, FAQ и внешние публикации по выбору технологии."
          },
          {
            "title": "Сопоставить повторные ответы",
            "body": "Проверяю, изменилось ли присутствие компании в запросах и насколько нейросети корректно воспроизводят условия."
          }
        ],
        "faq": [
          {
            "question": "Можно ли получить рекомендации по запросу «строительство дома под ключ»?",
            "answer": "Можно развивать видимость по этому интенту, но сначала нужно определить комплектацию и географию. Рекомендации нейросети нельзя обещать как гарантированный результат."
          },
          {
            "question": "Обязана ли каждая компания ИЖС работать через эскроу?",
            "answer": "Нет, условия применения соответствующего механизма зависят от договора и законодательства. Наличие эскроу нельзя приписывать компании без проверки."
          },
          {
            "question": "Можно ли использовать 3D-визуализации проектов как готовые объекты?",
            "answer": "Нет. Проектные изображения должны быть обозначены как визуализации, а построенные дома подтверждены отдельными данными и реальными фотографиями."
          },
          {
            "question": "Какие показатели измеряются в GEO для строителей?",
            "answer": "Базовый BMR по согласованным покупательским запросам, точность упоминания подрядчика, наличие источников, динамика по тем же запросам и нейросетям."
          },
          {
            "question": "Сколько стоит продвижение строительной компании?",
            "answer": "Действуют опубликованные тарифы GAEO. Объем зависит от числа проектов, технологий, регионов и согласованной матрицы запросов."
          }
        ],
        "ctaTitle": "Проверим, рекомендуют ли нейросети твою строительную компанию",
        "ctaText": "Пришли сайт, регионы строительства, типы домов и 2–3 примера комплектации. Я определю исходные запросы и фактические пробелы.",
        "request": "GEO ИЖС: строители загородных домов, проекты, комплектация, сметы, эскроу, география, BMR."
      },
      "en": {
        "title": "AI visibility for country-house builders | GAEO.ru",
        "h1": "GEO for country-house builders and home construction contractors",
        "description": "AI recommendations for house builders: house types, real built projects, specification-based pricing, contract terms, escrow eligibility, regions and BMR.",
        "eyebrow": "Real estate / House builders",
        "lead": "Prospective homeowners ask AI assistants which builders operate locally, how construction systems differ and what is included in a quoted price. I measure those questions and help contractors present verifiable projects, specifications and actual contract terms.",
        "heroPoints": [
          "Queries by building method, budget, site constraints and region",
          "Clear descriptions of specifications, realised homes and contractual scope",
          "Baseline BMR and repeat checks of recommendation accuracy"
        ],
        "problemTitle": "Why AI has trouble comparing home builders",
        "problemIntro": "A headline 'turnkey house' is not a standard specification. Buyers need consistent facts to compare offers.",
        "problems": [
          {
            "title": "Unclear package pricing",
            "body": "Foundation, materials, utilities, interior finishes and site preparation can sit outside a starting price. Each quote needs its own scope."
          },
          {
            "title": "Renderings presented as delivered homes",
            "body": "A design visualisation is not evidence of completed construction. Built projects require their own photographs and verifiable details."
          },
          {
            "title": "Contract and site restrictions are hidden",
            "body": "Delivery region, terrain, site access, scheduling and eligibility for escrow terms materially affect the offer."
          }
        ],
        "scenarioTitle": "Questions homeowners ask before selecting a contractor",
        "scenarioIntro": "The measurement set covers both early research and procurement-stage decisions.",
        "columns": [
          "Buyer question",
          "Evidence needed",
          "GEO work"
        ],
        "scenarios": [
          [
            "Who builds timber-frame homes in my region?",
            "Construction method, service radius, real completed examples",
            "Separate technologies and verified regional availability"
          ],
          [
            "What is included in a year-round house price?",
            "Floor area, structure, utilities, finishing and exclusions",
            "Document comparable package and specification levels"
          ],
          [
            "Who can build on a challenging sloped site?",
            "Design constraints, required surveys and project responsibilities",
            "Explain site assessment and limits of standard plans"
          ],
          [
            "Which house builders offer escrow arrangements?",
            "Applicable contract model and actual payment terms",
            "Accurately describe escrow eligibility, not a blanket promise"
          ]
        ],
        "proofTitle": "Evidence for costs, delivery and contractor claims",
        "proofIntro": "Russian individual-homebuilding notifications are addressed in Article 51.1 of the Town Planning Code. Federal Law 186-FZ governs a distinct escrow construction-contract model. Neither legal source independently validates any contractor's performance; completed works and contract terms must be verified separately.",
        "checks": [
          "Project and technical specification, dimensions, structural system and source of performance claims",
          "Contract scope, milestones, individual delivery timelines, warranties and payment conditions",
          "Genuine built examples with permitted-to-share images and accurate project descriptions"
        ],
        "proofNote": "GAEO's real-estate GEO experience is methodological context, not a claimed homebuilder client outcome.",
        "workTitle": "My GEO process for home builders",
        "workIntro": "I start with questions buyers actually ask, then identify missing technical or contractual evidence.",
        "steps": [
          {
            "title": "Build a demand matrix",
            "body": "Separate construction methods, budgets, regions, turnkey definitions and custom-design questions."
          },
          {
            "title": "Audit project claims",
            "body": "Cross-check specifications, delivered examples, geographical scope and proposed payment model."
          },
          {
            "title": "Improve structured content",
            "body": "Plan precise project pages, package comparisons, verifiable examples and practical FAQs."
          },
          {
            "title": "Repeat the measurement",
            "body": "Compare baseline and later results across the same AI prompts and track factual accuracy."
          }
        ],
        "faq": [
          {
            "question": "Can AI recommend us for turnkey house construction?",
            "answer": "Visibility can be improved and measured, but the meaning of 'turnkey' and the geographic offer need clear substantiation. A named recommendation is not guaranteed."
          },
          {
            "question": "Do all builders use escrow contracts?",
            "answer": "No. Eligibility and the actual offered arrangement depend on the contract model and applicable law. Never claim escrow without verification."
          },
          {
            "question": "Can architectural renders count as completed projects?",
            "answer": "No. Mark renderings as proposed designs, and verify built homes separately with photographs and supporting details."
          },
          {
            "question": "Which metrics are tracked?",
            "answer": "A fixed baseline prompt set, BMR, verified recommendation attributes and changes measured under comparable conditions."
          },
          {
            "question": "How much does GEO for builders cost?",
            "answer": "GAEO's published plans apply. The actual scope depends on projects, technologies, territories and research prompts."
          }
        ],
        "ctaTitle": "See whether AI recommends your construction company",
        "ctaText": "Share your website, construction regions, methods and sample project specifications for a baseline assessment.",
        "request": "Country-house builders GEO: home projects, specifications, pricing, contracts, escrow, geography and BMR."
      }
    }
  },
  {
    "id": 11,
    "slug": "architectural-design-bureaus",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/architectural-design-bureaus/",
      "en": "/en/industries/architectural-design-bureaus/"
    },
    "parent": {
      "ru": "/geo-prodvizhenie-nedvizhimosti/",
      "en": "/en/geo-for-real-estate/"
    },
    "methods": {
      "ru": [
        "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
      ],
      "en": [
        "/en/articles/geo-for-real-estate/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Стратегия GEO-продвижения недвижимости"
      ],
      "en": [
        "GEO strategy for real estate"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_51040/b884020ea7453099ba8bc9ca021b84982cadea7d/",
        "ru": "ГрК РФ, ст. 48: проектная и рабочая документация",
        "en": "Russian Town Planning Code, Article 48: design and working documents"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_51040/a856e9636e5a3eca479377557ee86fb41304dafb/",
        "ru": "ГрК РФ, ст. 55.8: условия членства в СРО и право выполнения работ",
        "en": "Russian Town Planning Code, Article 55.8: design SRO requirements"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение архитектурных и проектных бюро | GAEO.ru",
        "h1": "Продвижение архитектурных и проектных бюро в ответах нейросетей",
        "description": "GEO для архитектурных бюро: архитектурные концепции, проектная и рабочая документация, BIM, функции генпроектировщика, СРО, портфолио и сценарии выбора заказчика.",
        "eyebrow": "Недвижимость / Архитектура и проектирование",
        "lead": "Заказчики спрашивают нейросети о бюро под конкретную задачу: концепция коттеджного поселка, проект бизнес-центра или рабочая документация для промышленного объекта. Я проверяю рекомендации по типу объекта, компетенциям, стадии проектирования и реальным завершенным работам.",
        "heroPoints": [
          "Запросы по типу здания, стадии проекта, географии и роли бюро",
          "Портфолио с ясным указанием концепций, реализованных проектов и участников",
          "Проверка правомерности заявлений о СРО и повторные замеры BMR"
        ],
        "problemTitle": "Где теряется архитектурная экспертиза в ответах нейросетей",
        "problemIntro": "Слова «проектирование под ключ» не показывают, что именно бюро умеет, на какой стадии участвует и какие работы действительно выполнило.",
        "problems": [
          {
            "title": "Портфолио без статусов",
            "body": "Концепт, конкурсная заявка, проектная документация и построенное здание неравнозначны. Нужны разные подписи, даты, роли и разрешения на публикацию."
          },
          {
            "title": "Размыты стадии и ответственность",
            "body": "Архитектурная концепция, проектная документация, рабочая документация и авторский надзор имеют разный состав работ. Нельзя сводить их к одному обещанию."
          },
          {
            "title": "Неподтвержденные квалификации",
            "body": "Упоминание СРО, BIM, генпроектирования и прохождения экспертизы требует конкретных проверяемых оснований; условия членства зависят от вида и модели работ."
          }
        ],
        "scenarioTitle": "Запросы заказчиков на выбор проектного бюро",
        "scenarioIntro": "Для каждого типа здания и стадии разработки проверяются компетенции, реальные исходные данные и критерии выбора.",
        "columns": [
          "Вопрос заказчика",
          "Что проверить",
          "Как использовать в GEO"
        ],
        "scenarios": [
          [
            "Какое бюро разработает концепцию общественного здания?",
            "Тип объекта, задачи, конкурсные/реализованные работы и роль исполнителя",
            "Страницы специализаций с документированным портфолио"
          ],
          [
            "Кому поручить проектную и рабочую документацию?",
            "Состав разделов, договорная ответственность и СРО при применимости",
            "Отделить стадии и условия работы, подтвердить компетенции"
          ],
          [
            "Кто проектирует жилые комплексы с BIM?",
            "Реальные процессы информационного моделирования, стадии, формат выдачи",
            "Описать конкретные результаты BIM без неподтвержденных квалификаций"
          ],
          [
            "Нужен генпроектировщик для промышленного объекта",
            "Опыт по типу объекта, координация смежных разделов, действительная роль",
            "Связать компетенции, кейсы и процесс согласования"
          ]
        ],
        "proofTitle": "Чем подтвердить специализацию архитектурного бюро",
        "proofIntro": "Статья 48 ГрК РФ определяет содержание проектной и рабочей документации и делает важное различие для ИЖС: обязательность проектной документации зависит от категории объекта. Статья 55.8 описывает условия деятельности членов СРО с предусмотренными законом исключениями. Ни один из этих актов сам по себе не доказывает опыт конкретного бюро.",
        "checks": [
          "Портфолио: тип объекта, стадия, год, роль автора и исполнителей, разрешение на раскрытие материалов",
          "Компетенции: архитектура, конструктив, инженерные разделы, BIM и проверяемые результаты для каждой специализации",
          "Договорная модель и полномочия: проверка применимости СРО, функция генпроектировщика, ответственность за разделы"
        ],
        "proofNote": "GAEO изучает GEO-продвижение недвижимости, но измеренный результат продвижения именно архитектурного бюро здесь не заявлен.",
        "workTitle": "Как проектирую GEO для архитектурных бюро",
        "workIntro": "Опорой становятся покупательские запросы, документированные проекты и точная терминология строительного процесса.",
        "steps": [
          {
            "title": "Сегментировать спрос",
            "body": "Разделяю архитектурные концепции, проектную документацию, генпроектирование, BIM и авторский надзор по типам заказчиков."
          },
          {
            "title": "Проверить портфолио",
            "body": "Сверяю дату, статус, роль бюро, исходные данные и разрешение на публикацию конкретных изображений."
          },
          {
            "title": "Структурировать компетенции",
            "body": "Готовлю ТЗ на страницы объектов, специализаций, стадий работ, разметку и проверяемые внешние материалы."
          },
          {
            "title": "Контролировать рекомендации",
            "body": "Измеряю небрендовые запросы и точность того, как нейросети описывают специализации и реальные проекты."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать бюро без завершенных построенных объектов?",
            "answer": "Да, если корректно обозначить проекты, концепции и стадии участия. Нельзя выдавать конкурсную визуализацию за реализованное здание."
          },
          {
            "question": "Нужно ли писать, что все архитектурные работы требуют СРО?",
            "answer": "Нет. Применимость членства зависит от типа работ и законных исключений; проверка проводится по конкретному договору и деятельности."
          },
          {
            "question": "Достаточно ли добавить BIM в описание услуг?",
            "answer": "Нет. Нужны реальные процедуры, роли, стадии, примеры выдаваемых материалов и пределы компетенций."
          },
          {
            "question": "Что измеряется в GEO для проектировщиков?",
            "answer": "Частота появления бюро по согласованным запросам, точность специализации, релевантность упомянутых проектов и BMR в сопоставимых замерах."
          },
          {
            "question": "Сколько стоит GEO-продвижение архитектурного бюро?",
            "answer": "Общие тарифы GAEO опубликованы. Объем работ определяется числом направлений проектирования, отраслей и целевых рынков."
          }
        ],
        "ctaTitle": "Выясним, по каким проектным задачам нейросети видят твое бюро",
        "ctaText": "Пришли сайт, 3–5 разрешенных к публикации проектов, типы объектов и приоритетные услуги. Я предложу матрицу исходного замера.",
        "request": "GEO архитектурного бюро: проекты, стадии проектирования, BIM, генпроектирование, СРО, портфолио, BMR."
      },
      "en": {
        "title": "GEO for architecture and engineering design firms | GAEO.ru",
        "h1": "AI recommendation visibility for architecture and design firms",
        "description": "GEO promotion for architecture firms: concept versus built projects, design stages, BIM, lead-designer roles, SRO qualifications and baseline AI recommendation measurement.",
        "eyebrow": "Real estate / Architecture and design",
        "lead": "Clients may ask AI to recommend a design firm for a housing development concept, an office project or industrial working documentation. I measure these selection queries against the firm's actual building types, design stages, team roles and evidenced project experience.",
        "heroPoints": [
          "Distinct buyer prompts by building type, project stage and geography",
          "Portfolio records separating concepts, design deliverables and completed buildings",
          "Qualification evidence and repeat BMR tracking"
        ],
        "problemTitle": "What stops AI from identifying the right design practice",
        "problemIntro": "The broad phrase 'full-service design' does not tell a client which work stages and responsibilities the firm really covers.",
        "problems": [
          {
            "title": "Portfolio status is ambiguous",
            "body": "Unbuilt concepts, competition entries, design documentation and constructed buildings are different achievements. Dates and actual responsibilities must be visible."
          },
          {
            "title": "Stages are conflated",
            "body": "Concept design, statutory design documentation, working drawings and construction-stage services have distinct deliverables and contracts."
          },
          {
            "title": "Qualifications are unsupported",
            "body": "SRO membership, BIM proficiency and lead-designer claims require applicable records and evidence; a generic badge is insufficient."
          }
        ],
        "scenarioTitle": "How design clients search for a suitable practice",
        "scenarioIntro": "Each buyer intent is checked against actual past projects and proposed deliverables.",
        "columns": [
          "Client question",
          "Evidence to check",
          "GEO improvement"
        ],
        "scenarios": [
          [
            "Who designs public-building concepts?",
            "Comparable assignments and the firm's actual contribution",
            "Project pages with role, stage and supporting evidence"
          ],
          [
            "Who can prepare design and working documentation?",
            "Contract scope, stages, credentials where legally required",
            "Differentiate deliverables and applicable qualifications"
          ],
          [
            "Which practices use BIM for residential developments?",
            "Real model workflows, delivery stages and usable examples",
            "Explain actual information-modelling outputs"
          ],
          [
            "We need a lead designer for an industrial facility",
            "Building-type experience and multi-discipline coordination",
            "Show documented coordination roles and relevant case examples"
          ]
        ],
        "proofTitle": "Evidence for architectural and engineering expertise",
        "proofIntro": "Article 48 of the Russian Town Planning Code distinguishes design and working documentation; individual-home requirements are not identical to large capital projects. Article 55.8 sets out conditions for SRO-member rights with statutory exceptions. These texts guide verification, but do not establish any particular firm's project history.",
        "checks": [
          "Portfolio: building type, design stage, dates, actual contribution and permission to publish",
          "Competence: architecture, engineering disciplines and verifiable information-modelling practices",
          "Rights and responsibility: SRO applicability, contract duties and lead-designer scope"
        ],
        "proofNote": "GAEO brings real-estate GEO methodology, not a claimed measured outcome for an architecture-firm client.",
        "workTitle": "My GEO programme for architecture practices",
        "workIntro": "I pair project-specific commercial demand with documented expertise and accurate wording.",
        "steps": [
          {
            "title": "Map the target questions",
            "body": "Separate concept design, technical documentation, BIM, lead design and construction-stage roles."
          },
          {
            "title": "Audit portfolio evidence",
            "body": "Verify stage, year, authorial contribution, source and publication rights for each project."
          },
          {
            "title": "Improve structured content",
            "body": "Plan specialism pages, project records, service-stage explanations and relevant expert references."
          },
          {
            "title": "Measure recommendation quality",
            "body": "Repeat non-brand questions and track BMR alongside accuracy of AI descriptions."
          }
        ],
        "faq": [
          {
            "question": "Can a practice promote concepts without completed buildings?",
            "answer": "Yes, if their stage and unbuilt status are explicit. Visualisations must not be labelled as built projects."
          },
          {
            "question": "Does every design assignment legally require SRO membership?",
            "answer": "No. Specific contract types and statutory exceptions determine applicability. Each claim should be verified against the applicable rules."
          },
          {
            "question": "Is adding 'BIM' to a services list enough?",
            "answer": "No. Describe the actual process, model outputs, project stages and team responsibilities."
          },
          {
            "question": "How do you measure GEO for architects?",
            "answer": "We track a fixed set of buyer questions, BMR, accuracy of specialism attribution and reference to real projects."
          },
          {
            "question": "What does architectural GEO cost?",
            "answer": "The published GAEO audit and monthly plans apply. The scope depends on building types, services, jurisdictions and target queries."
          }
        ],
        "ctaTitle": "Discover which design assignments AI associates with your firm",
        "ctaText": "Share your site, permissible portfolio examples and target building types. I will define a baseline research scope.",
        "request": "Architecture firm GEO: portfolio, design stages, BIM, lead designer, applicable SRO, building types and BMR."
      }
    }
  }
];
