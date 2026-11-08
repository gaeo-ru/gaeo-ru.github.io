/**
 * Phase 2AJ: evidence-led RU/EN automotive GEO pages for repair shops (#77),
 * commercial-vehicle dealers (#78), and motorcycle dealers (#79).
 * Verified sources describe regulations and official document processes;
 * no unverified customer outcomes, registrations, inventory or BMR are claimed.
 * Pricing, 107 catalogue IDs, BMR terms and approved artwork stay canonical.
 */
export const industrySpecializationsBatch2AJ = [
  {
    "id": 77,
    "slug": "automotive-service-repair",
    "group": "automotive",
    "routes": {
      "ru": "/industries/automotive-service-repair/",
      "en": "/en/industries/automotive-service-repair/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/technical-b2b-vendor-evidence/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/technical-b2b-vendor-evidence/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения BMR",
        "Как проверять данные и заявления поставщика услуг"
      ],
      "en": [
        "BMR measurement methodology",
        "Checking professional service evidence"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/575844",
        "ru": "Роспотребнадзор: документы при ремонте автомобиля, июль 2026",
        "en": "Rospotrebnadzor: documents issued for vehicle repair, July 2026"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_506689/",
        "ru": "Постановление РФ №780: правила ремонта автомототранспортных средств с 01.09.2025",
        "en": "Russian Decree 780: vehicle-maintenance and repair rules effective September 2025"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение автосервисов и СТО в ChatGPT и Алисе | GAEO.ru",
        "h1": "Продвижение автосервисов и СТО в ответах нейросетей",
        "description": "GEO для автосервисов и СТО: диагностика, ремонт по марке автомобиля, география, запись, договор и документы по постановлению №780. Замеры BMR и тарифы GAEO.",
        "eyebrow": "Авторынок / Автосервисы и СТО",
        "lead": "Водитель ищет сервис для определенной марки, поломки и района, а не просто «лучший автосервис». Я проверяю, какие СТО нейросети рекомендуют по конкретным задачам, и помогает ли открытая информация подтвердить специализацию, условия ремонта и запись.",
        "heroPoints": [
          "Небрендовые запросы по неисправности, модели и району",
          "Проверка услуг, диагностического оборудования и условий приема",
          "Раздельные замеры по филиалам, типам ремонта и рекомендациям"
        ],
        "problemTitle": "Почему популярный автосервис может пропускать целевые рекомендации",
        "problemIntro": "Общая высокая оценка не отвечает на вопрос о ремонте вариатора, электрики или кузова конкретной модели. Нужны подтвержденные услуги и актуальные условия обращения.",
        "problems": [
          {
            "title": "Нельзя проверить специализацию",
            "body": "Заявление «ремонтируем все марки» не показывает опыт с конкретным агрегатом, наличие оборудования и доступность нужной работы в выбранном филиале."
          },
          {
            "title": "Неясны условия и стоимость",
            "body": "Диагностическая цена, предварительная смета и итоговая стоимость ремонта имеют разный смысл. Гарантийные условия и перечень работ нужно показывать без ложных фиксированных цен."
          },
          {
            "title": "Филиалы смешиваются",
            "body": "Адрес, часы, прием без записи, эвакуация и профиль мастеров могут различаться у точек одной сети. Нейросеть не должна переносить возможности одного сервиса на другой."
          }
        ],
        "scenarioTitle": "Какие вопросы водителей стоит измерять в нейросетях",
        "scenarioIntro": "Примеры покупательских запросов формируют матрицу BMR после сверки настоящих услуг и географии конкретного сервиса.",
        "columns": [
          "Вопрос автовладельца",
          "Что подтверждает ответ",
          "Что подготовить для GEO"
        ],
        "scenarios": [
          [
            "Где рядом со мной диагностируют электрику этой модели?",
            "Филиал, марка, конкретный вид диагностики, запись и оборудование",
            "Посадочную по диагностике с доступными марками и адресами"
          ],
          [
            "Как выбрать СТО для ремонта автоматической коробки передач?",
            "Виды коробок, выполняемые работы, квалификация, договор и гарантия",
            "Разделить ремонт АКПП, вариатора и обслуживание по реальным компетенциям"
          ],
          [
            "Какие сервисы выполняют кузовной ремонт с оформлением заказа?",
            "Виды работ, примеры с разрешением, порядок приемки и документы",
            "Опубликовать этапы приемки, сметы и выдачи автомобиля"
          ],
          [
            "Как записаться в автосервис в выходные в моем районе?",
            "Фактические часы каждой точки, контакты и условия приема",
            "Синхронизировать филиалы, контакты и расписание во внешних источниках"
          ]
        ],
        "proofTitle": "Какие сведения помогают отличить реальный сервис от общего описания",
        "proofIntro": "Правила по постановлению Правительства РФ №780 действуют с 1 сентября 2025 года и регулируют отношения по техническому обслуживанию и ремонту автомототранспорта. Роспотребнадзор разъясняет состав документов, выдаваемых потребителю. Наличие этих норм не доказывает качество какой-либо СТО.",
        "checks": [
          "Проверяемые виды ремонта, модели и оборудование по каждому фактическому адресу",
          "Порядок записи, предварительной оценки стоимости, договорных документов и гарантийных условий",
          "Согласованные фотографии процесса, подтвержденные квалификации и ограничения диагностики"
        ],
        "proofNote": "GAEO анализирует рекомендации нейросетей, а не оценивает безопасность выполненного ремонта. Клиентских результатов GEO-продвижения СТО здесь не заявлено.",
        "workTitle": "Как организую GEO-продвижение автосервиса",
        "workIntro": "Сначала разделяю запросы о проблеме автомобиля, выборе сервиса и удобстве записи; затем сопоставляю ответы с действительными услугами.",
        "steps": [
          {
            "title": "Стартовый BMR по работам",
            "body": "Фиксирую вопросы о диагностике, агрегатах, марках, филиалах и районах без названия сервиса."
          },
          {
            "title": "Проверка условий обслуживания",
            "body": "Уточняю перечни работ, доступность оборудования, документы и согласованные гарантии по конкретным точкам."
          },
          {
            "title": "Доработка сайта и источников",
            "body": "Формирую задания для страниц услуг, филиалов, профилей специалистов, контактов и экспертных объяснений типовых неисправностей."
          },
          {
            "title": "Повторный замер",
            "body": "Сравниваю исходную матрицу запросов и проверяю, точно ли нейросети указывают работы, адреса и ограничения."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать сеть СТО одной общей страницей?",
            "answer": "Общая страница нужна для выбора сети, но адреса, часы и список услуг требуется подтверждать отдельно для каждого филиала. Это снижает риск неверных рекомендаций."
          },
          {
            "question": "Какие документы важны при ремонте автомобиля?",
            "answer": "Постановление №780 регулирует оформление отношений и порядок оказания услуг. Состав договора и выдаваемых документов следует сверять с актуальными правилами и конкретной ситуацией."
          },
          {
            "question": "Можно ли обещать точную стоимость ремонта по запросу в нейросети?",
            "answer": "Без диагностики и согласованного объема работ итоговая стоимость может быть неизвестна. Разумно публиковать реальные базовые цены, условия расчета и ограничения."
          },
          {
            "question": "Как измеряется видимость автосервиса?",
            "answer": "BMR считают по заранее зафиксированным небрендовым запросам, отдельно для ремонтных работ, марок и районов. Упоминание названия сети само по себе не равно рекомендации."
          },
          {
            "question": "Сколько стоит GEO-продвижение СТО?",
            "answer": "Для автосервисов действуют опубликованные тарифы GAEO. Объем зависит от числа услуг, филиалов, конкурентов и стартовых запросов."
          }
        ],
        "ctaTitle": "Проверим, какие СТО нейросети рекомендуют именно твоим клиентам",
        "ctaText": "Пришли адреса, марки и виды ремонта, подтвержденные услуги и условия записи. Составлю исходную матрицу запросов.",
        "request": "GEO-продвижение автосервиса и СТО: диагностика, ремонт по марке, филиалы, запись и BMR."
      },
      "en": {
        "title": "GEO for independent auto repair shops and service centres | GAEO",
        "h1": "GEO visibility for auto repair shops and service centres",
        "description": "AI recommendations for vehicle repair shops: make-specific services, diagnostic work, workshop locations, booking, repair documents and BMR.",
        "eyebrow": "Automotive / Repair workshops",
        "lead": "Drivers look for a workshop able to fix a particular fault on a particular model within a practical distance. I measure which providers AI recommends for these non-branded questions and check whether real services, locations and booking conditions support the recommendation.",
        "heroPoints": [
          "Repair-specific search prompts by model, fault and neighbourhood",
          "Verifiable service list, diagnostic capabilities and customer documents",
          "Separate comparisons for locations and types of work"
        ],
        "problemTitle": "Why a well-known garage may not be recommended for a repair",
        "problemIntro": "A strong overall rating does not tell a driver whether the shop handles a particular transmission, electrical fault or body repair. AI needs specific, current evidence.",
        "problems": [
          {
            "title": "Service claims are too broad",
            "body": "“All makes and models” does not prove equipment, mechanics' experience or the availability of a specific repair at each location."
          },
          {
            "title": "Prices and terms are unclear",
            "body": "A diagnostic fee, provisional estimate and final repair price are distinct. Work scope and warranty terms require precise wording."
          },
          {
            "title": "Workshop locations are conflated",
            "body": "Hours, appointments, services and emergency assistance may vary across branches. A recommendation must refer to the right site."
          }
        ],
        "scenarioTitle": "Real questions that can drive repair-shop recommendations",
        "scenarioIntro": "These are proposed measurement prompts, not reported AI answers. They are refined against the workshop's verified service catalogue.",
        "columns": [
          "Driver question",
          "Evidence to verify",
          "GEO content task"
        ],
        "scenarios": [
          [
            "Which nearby workshop diagnoses electronics on my car model?",
            "Supported models, electrical diagnostics, branch, booking and tools",
            "Explain diagnostic scope and workshop locations"
          ],
          [
            "Who repairs this type of automatic transmission?",
            "Transmission types, actual work, staff competence and service terms",
            "Differentiate automatic, CVT and maintenance services"
          ],
          [
            "Where can I book documented body repairs?",
            "Permitted work examples, estimates, customer paperwork and handover",
            "Publish the repair and approval process"
          ],
          [
            "What repair shop is open at weekends in my area?",
            "Branch-specific hours, contact details and booking terms",
            "Align public profiles with actual schedules"
          ]
        ],
        "proofTitle": "Evidence a customer can check before choosing a workshop",
        "proofIntro": "Russian Government Decree 780, in effect since September 2025, sets rules for motor vehicle maintenance and repair services. Rospotrebnadzor also explains the paperwork a customer should receive. Those rules do not certify a particular workshop.",
        "checks": [
          "Actual repair categories, compatible models and equipment at each branch",
          "Booking terms, documented estimates, written terms and applicable guarantees",
          "Approved repair examples, specialist qualifications and diagnostic limits"
        ],
        "proofNote": "GAEO measures the quality of AI recommendations, not vehicle repair safety. This page makes no claims of completed automotive GEO client projects.",
        "workTitle": "How I develop GEO for a repair service",
        "workIntro": "I separate fault-based search, workshop selection and booking convenience, then evaluate what AI actually says about the business.",
        "steps": [
          {
            "title": "Measure baseline BMR",
            "body": "Record non-branded prompts by repair type, model, neighbourhood and opening hours."
          },
          {
            "title": "Validate service evidence",
            "body": "Verify the offered jobs, real equipment, customer paperwork and branch-specific service scope."
          },
          {
            "title": "Improve public information",
            "body": "Prepare work for repair-category pages, locations, team expertise and independent technical explanations."
          },
          {
            "title": "Re-measure accuracy",
            "body": "Repeat the same question matrix and audit location, model and service misattribution."
          }
        ],
        "faq": [
          {
            "question": "Can one page cover every branch of a garage network?",
            "answer": "Use a network overview for navigation, but keep each branch's hours, address and services separately verifiable."
          },
          {
            "question": "What paperwork should a repair shop provide?",
            "answer": "The applicable Russian vehicle repair rules govern service agreements and customer documentation. Verify the exact requirements for the transaction."
          },
          {
            "question": "Can AI state one exact repair price?",
            "answer": "An assessment may be required before the full scope and cost are known. Publish actual price ranges and estimation conditions rather than inventing a fixed total."
          },
          {
            "question": "How is repair-shop visibility measured?",
            "answer": "BMR is measured using a fixed set of non-branded repair, vehicle and location prompts. Brand-name mentions are reported separately."
          },
          {
            "question": "How much does automotive GEO cost?",
            "answer": "GAEO's published plans apply. Scope depends on the services, branches, competing workshops and baseline prompt matrix."
          }
        ],
        "ctaTitle": "See which workshops AI recommends for your repair categories",
        "ctaText": "Share branch addresses, the vehicles you service and booking conditions. I will outline the initial buyer-question matrix.",
        "request": "GEO for automotive repair workshops: service types, diagnostics, makes, location pages, booking and BMR."
      }
    }
  },
  {
    "id": 78,
    "slug": "commercial-vehicle-equipment-dealers",
    "group": "automotive",
    "routes": {
      "ru": "/industries/commercial-vehicle-equipment-dealers/",
      "en": "/en/industries/commercial-vehicle-equipment-dealers/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "methods": {
      "ru": [
        "/strategies/technical-b2b-vendor-evidence/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/technical-b2b-vendor-evidence/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как проверять B2B-поставщика",
        "Методика измерения BMR"
      ],
      "en": [
        "B2B supplier evidence checks",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_125114/",
        "ru": "ТР ТС 018/2011: безопасность колесных транспортных средств, редакция 2026 года",
        "en": "TR CU 018/2011: wheeled-vehicle safety regulation, 2026 edition"
      },
      {
        "href": "https://docs.elpts.ru/ncher/otts",
        "ru": "Администратор СЭП: реестр одобрений типа транспортного средства (ОТТС)",
        "en": "Electronic Passport Administrator: vehicle type approval register"
      },
      {
        "href": "https://elpts.ru/novye-formaty-vypisok/",
        "ru": "Администратор СЭП: порядок получения выписок из ЭПТС, октябрь 2026",
        "en": "Electronic Passport Administrator: extract procedure, October 2026"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение дилеров коммерческого транспорта и спецтехники | GAEO",
        "h1": "GEO-продвижение дилеров коммерческого транспорта и спецтехники",
        "description": "GEO для дилеров грузовиков, автобусов и спецтехники: грузоподъемность, назначение, наличие, сервис, лизинг, ОТТС/ЭПТС и BMR. Тарифы GAEO.",
        "eyebrow": "Авторынок / Коммерческий транспорт",
        "lead": "Покупатель грузовика или спецтехники сравнивает машину под конкретную задачу, нагрузки и доступный сервис. Я проверяю, каких дилеров нейросети предлагают по таким запросам и насколько точно они передают характеристики, комплектации, наличие и условия поставки.",
        "heroPoints": [
          "Матрица запросов по тоннажу, кузову, назначению и региону",
          "Разделение наличия, срока поставки, лизинга и сервиса",
          "Сверка характеристик с документацией по конкретной модификации"
        ],
        "problemTitle": "Почему каталог моделей недостаточен для рекомендации дилера",
        "problemIntro": "Покупка коммерческого транспорта обычно привязана к маршруту, грузу, нормативам и стоимости владения. Одна общая характеристика модельного ряда не заменяет точные параметры модификации.",
        "problems": [
          {
            "title": "Характеристики модельного ряда усреднены",
            "body": "Грузоподъемность, полная масса, колесная формула, надстройка и ограничения по дороге могут различаться у версий одной модели."
          },
          {
            "title": "Наличие и способ приобретения смешаны",
            "body": "Машина на площадке, в производственном заказе и с прогнозируемой поставкой имеют разные сроки. Лизинговое предложение зависит от условий сделки."
          },
          {
            "title": "Обещания сервиса без территории",
            "body": "Наличие запчастей и регламент обслуживания нужно подтверждать по региону и конкретному договору, особенно для корпоративных автопарков."
          }
        ],
        "scenarioTitle": "Запросы автопарков и подрядчиков к нейросетям",
        "scenarioIntro": "Ниже 4 гипотезы коммерческого спроса для стартового BMR; реальные модели и конкуренты определяются после сверки ассортимента.",
        "columns": [
          "Вопрос закупщика",
          "Проверяемые параметры",
          "Работа над GEO"
        ],
        "scenarios": [
          [
            "Какого дилера выбрать для закупки рефрижераторов 5 тонн?",
            "Кузов, допустимая нагрузка, температурный режим, комплектация и наличие",
            "Отдельно раскрыть тип надстройки и документы"
          ],
          [
            "У кого есть самосвалы с конкретной колесной формулой?",
            "Модель, формула, полная масса, условия эксплуатации и остаток на складе",
            "Поддерживать актуальные комплектации и статус поставки"
          ],
          [
            "Какие дилеры грузовиков обслуживают парк в 3 регионах?",
            "География сервиса, партнерская сеть, регламенты и реальная доступность",
            "Связать продажу и последующее обслуживание"
          ],
          [
            "Где сравнить условия покупки тягача в лизинг?",
            "Документированные условия финансирования, первоначальный взнос и ограничения",
            "Публиковать расчетные условия с оговорками, без обещания одобрения"
          ]
        ],
        "proofTitle": "Как проверять пригодность коммерческой техники по документам",
        "proofIntro": "ТР ТС 018/2011 устанавливает требования к применимым категориям колесных транспортных средств и компонентам. Администратор системы электронных паспортов предоставляет реестр ОТТС и процедуры получения выписок из ЭПТС. Эти сведения помогают проверять документы, но не доказывают наличие конкретной машины у дилера.",
        "checks": [
          "Модификация, допустимые массы, назначение, кузов и применимая документация на транспортное средство",
          "Реальное наличие, срок поставки, территория гарантийного и постгарантийного обслуживания",
          "Прозрачные условия приобретения, лизинга и обслуживания без универсальной гарантии одобрения"
        ],
        "proofNote": "Не присваиваю дилеру сертификаты, складские остатки или выполненные проекты GAEO без первичного подтверждения. Страница описывает методику.",
        "workTitle": "Как работаю с GEO дилера грузовиков и спецтехники",
        "workIntro": "Задача связать запрос закупщика с проверяемой модификацией и реальными возможностями дилерского центра.",
        "steps": [
          {
            "title": "Базовый BMR по сценариям закупки",
            "body": "Фиксирую вопросы по классу техники, назначению, массе, сроку поставки и географии."
          },
          {
            "title": "Проверка товарных данных",
            "body": "Сопоставляю комплектации, официальные спецификации, документы, остатки и условия сервиса."
          },
          {
            "title": "Содержание и отраслевые объяснения",
            "body": "Готовлю задания для страниц моделей, сравнения надстроек, обслуживания, лизинга и технических пояснений."
          },
          {
            "title": "Контроль рекомендаций",
            "body": "Повторяю запросы и проверяю правильность модели, условий поставки и ограничений применения."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать все виды спецтехники одной страницей?",
            "answer": "Только в качестве навигации. Экскаваторы, грузовики и автобусы имеют разные критерии выбора, документы и покупателей. Матрицы запросов лучше разделять."
          },
          {
            "question": "Что доказывает наличие ОТТС?",
            "answer": "ОТТС относится к документам одобрения типа транспортного средства в установленном порядке. Оно не подтверждает складской остаток, будущую цену или индивидуальные условия поставки."
          },
          {
            "question": "Можно ли обещать одобрение лизинга?",
            "answer": "Нет, если решение принимает лизинговая организация и зависит от ее проверки и конкретного договора. Публикуются подтвержденные условия предложения."
          },
          {
            "question": "Какая характеристика важна для покупателя грузовика?",
            "answer": "Зависит от задачи: груз, маршрут, ограничения по массе, кузов, сервис и стоимость владения. Нельзя заменять все параметры одним показателем грузоподъемности."
          },
          {
            "question": "Сколько стоит GEO для дилера коммерческого транспорта?",
            "answer": "Действуют общие тарифы GAEO. Объем определяется моделями, территориями продаж, сервисной сетью и числом сценариев выбора."
          }
        ],
        "ctaTitle": "Проверим рекомендации дилеров по реальным задачам автопарков",
        "ctaText": "Пришли модельный ряд, регионы, подтвержденные комплектации и условия сервиса. Подберу исходные запросы закупщиков.",
        "request": "GEO дилера коммерческого транспорта и спецтехники: грузовики, надстройки, ОТТС, ЭПТС, лизинг и BMR."
      },
      "en": {
        "title": "GEO for commercial vehicle and special-equipment dealers | GAEO",
        "h1": "GEO for truck, fleet and commercial-equipment dealers",
        "description": "AI recommendations for truck and special-equipment dealers: payload, configuration, availability, leasing terms, type approvals, service and BMR.",
        "eyebrow": "Automotive / Commercial vehicle dealers",
        "lead": "Fleet buyers compare vehicles for a specific load, route, body configuration and ongoing maintenance. I assess which dealers AI recommends in these scenarios and whether the stated specification, stock position and delivery conditions can actually be verified.",
        "heroPoints": [
          "Non-branded prompts for payload, configuration and region",
          "Separate stock, lead-time, finance and after-sales claims",
          "Model-specific specification and document checks"
        ],
        "problemTitle": "Why a model catalogue alone does not qualify a dealer",
        "problemIntro": "Commercial vehicle procurement depends on the intended operation, legal limits and cost of ownership. Generic model-family information may misrepresent the exact build.",
        "problems": [
          {
            "title": "Variants are presented as one specification",
            "body": "Payload, gross weight, axle layout and body equipment can differ between variants of the same truck."
          },
          {
            "title": "Stock and leasing are conflated",
            "body": "An in-stock vehicle, a production order and a finance quotation have different conditions and deadlines."
          },
          {
            "title": "Service promises lack geographic proof",
            "body": "Parts availability and maintenance coverage depend on actual locations, arrangements and the vehicle in question."
          }
        ],
        "scenarioTitle": "Questions fleet buyers might ask AI",
        "scenarioIntro": "These example prompts are starting hypotheses for measurement, not evidence of actual recommendations.",
        "columns": [
          "Buyer prompt",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "Who supplies five-tonne refrigerated vehicles?",
            "Body, payload, temperature requirements, specification and stock",
            "Make the relevant configuration and limitations explicit"
          ],
          [
            "Which dealers have trucks with this axle configuration?",
            "Exact variant, gross weight, intended use and stock position",
            "Maintain variant-level inventory and delivery status"
          ],
          [
            "Who can service a truck fleet across three regions?",
            "Workshop geography, after-sales partners and documented terms",
            "Connect sales claims to operational service coverage"
          ],
          [
            "Where can I compare truck leasing options?",
            "Actual finance terms, deposit assumptions and eligibility limits",
            "Publish conditional examples, never automatic approval promises"
          ]
        ],
        "proofTitle": "Verifying commercial vehicle offers against source documents",
        "proofIntro": "TR CU 018/2011 defines technical requirements for relevant wheeled vehicle categories. The Electronic Passport Administrator publishes type-approval records and details electronic-passport extracts. These sources support documentary checks but do not verify a dealer's current inventory.",
        "checks": [
          "Specific variant, mass, vehicle function, body type and applicable approval documents",
          "Verifiable availability, lead time, warranty/service territories and parts arrangements",
          "Realistic purchase and leasing conditions with customer and vehicle qualifications"
        ],
        "proofNote": "No dealer certifications, stock levels or GAEO client outcomes are claimed without direct evidence. This page explains a buyer-led GEO method.",
        "workTitle": "How I work on GEO for fleet and truck dealers",
        "workIntro": "The goal is to connect a buyer's operational requirement with the right variant and documented dealer capabilities.",
        "steps": [
          {
            "title": "Baseline procurement prompts",
            "body": "Capture questions by vehicle class, payload, intended use, region and delivery timing."
          },
          {
            "title": "Check product evidence",
            "body": "Review official specifications, available variants, supporting documents and service terms."
          },
          {
            "title": "Improve vehicle pages",
            "body": "Plan content for configurations, body types, ownership costs, maintenance and leasing criteria."
          },
          {
            "title": "Audit repeated recommendations",
            "body": "Measure the same prompts and check model accuracy, stock claims and application limits."
          }
        ],
        "faq": [
          {
            "question": "Does one page work for every type of special equipment?",
            "answer": "It can introduce the range, but excavators, buses and trucks use different buyer questions and documentary requirements. Separate comparisons are usually stronger."
          },
          {
            "question": "Does type approval prove dealer stock?",
            "answer": "No. Type-approval documents address a vehicle type under the relevant rules. They do not prove inventory, price or an individual delivery date."
          },
          {
            "question": "Can a dealer guarantee leasing approval?",
            "answer": "Only the financing provider can decide under its actual terms. GEO content should disclose conditional assumptions rather than promise approval."
          },
          {
            "question": "Which technical metric matters most in truck selection?",
            "answer": "It depends on the intended load, route, mass restrictions, body equipment and ongoing servicing. A single payload figure is not sufficient."
          },
          {
            "question": "How are GAEO services priced for fleet dealers?",
            "answer": "GAEO's published plans apply. Final scope follows vehicle classes, sales regions, after-sales geography and the prompt matrix."
          }
        ],
        "ctaTitle": "Measure which dealers AI recommends for real fleet requirements",
        "ctaText": "Share your range, regions, verified configurations and servicing arrangements. I will define a relevant initial procurement prompt set.",
        "request": "Commercial vehicle dealer GEO: trucks, equipment, specifications, type approvals, electronic passports, leasing and BMR."
      }
    }
  },
  {
    "id": 79,
    "slug": "motorcycle-motorsport-dealers",
    "group": "automotive",
    "routes": {
      "ru": "/industries/motorcycle-motorsport-dealers/",
      "en": "/en/industries/motorcycle-motorsport-dealers/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "methods": {
      "ru": [
        "/strategies/ecommerce-catalog/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/ecommerce-catalog/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Структура товарного каталога",
        "Методика измерения BMR"
      ],
      "en": [
        "Product catalogue structure",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_125114/",
        "ru": "ТР ТС 018/2011: применимые категории мототранспортных средств и оценка соответствия",
        "en": "TR CU 018/2011: relevant powered-two-wheeler categories and conformity framework"
      },
      {
        "href": "https://elpts.ru/novye-formaty-vypisok/",
        "ru": "СЭП: сведения об электронных паспортах и выписках, октябрь 2026",
        "en": "Electronic Passports: extract information and October 2026 procedure"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/570451",
        "ru": "Роспотребнадзор: правила ремонта автомототранспортных средств с сентября 2025",
        "en": "Rospotrebnadzor: motor vehicle repair rules effective September 2025"
      }
    ],
    "content": {
      "ru": {
        "title": "Продвижение дилеров мотоциклов и мототехники в нейросетях | GAEO",
        "h1": "GEO-продвижение дилеров мотоциклов и мототехники",
        "description": "Продвижение мотосалонов в ChatGPT, Алисе и других нейросетях: дорожная и внедорожная техника, категория, ЭПТС, наличие, экипировка, сервис и BMR.",
        "eyebrow": "Авторынок / Мотоциклы и мототехника",
        "lead": "Покупатель выбирает дорожный мотоцикл, эндуро или другую мототехнику по назначению, опыту, бюджету и условиям регистрации. Я проверяю, какие дилеры появляются в рекомендациях нейросетей и насколько точно ответы описывают конкретную модель и статус поставки.",
        "heroPoints": [
          "Интенты по назначению, классу техники и опыту водителя",
          "Разделение дорожных моделей, спорта и внедорожного использования",
          "Проверяемые характеристики, документы, наличие и обслуживание"
        ],
        "problemTitle": "Что мешает нейросети корректно советовать мотосалон",
        "problemIntro": "В каталоге рядом могут оказаться модели с совершенно разной областью использования и документами. Сравнение только по кубатуре или стоимости приводит к ошибочным советам.",
        "problems": [
          {
            "title": "Назначение техники не определено",
            "body": "Дорожный мотоцикл, кроссовая модель и техника для закрытой трассы не взаимозаменяемы. Допустимость эксплуатации и документы проверяются для каждой модели."
          },
          {
            "title": "Комплектации и остатки устаревают",
            "body": "Цена, наличие конкретного цвета, год модели, доставка, ЭПТС и набор аксессуаров меняются; их нельзя автоматически считать постоянными."
          },
          {
            "title": "Сервис и экипировка заявлены общими словами",
            "body": "Для выбора важны наличие запчастей, регламент технического обслуживания, совместимость экипировки и реальные условия гарантии."
          }
        ],
        "scenarioTitle": "Какой спрос на мототехнику анализировать",
        "scenarioIntro": "Эти запросы служат гипотезами для исследования. Соответствие конкретной модели требованиям и ее доступность проверяются отдельно.",
        "columns": [
          "Вопрос покупателя",
          "Какие факты нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какой дорожный мотоцикл выбрать новичку в моем бюджете?",
            "Назначение, посадка, масса, модель, документальные характеристики и наличие",
            "Показать допустимые параметры моделей без обещаний безопасности"
          ],
          [
            "Где купить эндуро для конкретного вида использования?",
            "Различие дорожной и внедорожной эксплуатации, документы, комплектация",
            "Объяснить ограничения модели и способы проверки"
          ],
          [
            "Кто продает мотоциклы с оформлением электронного паспорта?",
            "Применимость ЭПТС, документы конкретной техники и условия сделки",
            "Отделить наличие документа от обещания легкой регистрации"
          ],
          [
            "В каком мотосалоне есть сервис и расходники для этой модели?",
            "Реальные сервисные мощности, расходники, сроки и регион",
            "Связать модель и послепродажное обслуживание"
          ]
        ],
        "proofTitle": "Какие документы и данные нужны для корректного выбора",
        "proofIntro": "ТР ТС 018/2011 регулирует соответствующие категории колесных транспортных средств, включая ряд мототранспортных средств; применимость зависит от классификации модели. Администратор СЭП описывает выписки из электронных паспортов. Требования к сервису следует отделять от требований к продаже и документам.",
        "checks": [
          "Класс и назначение модели, характеристики, комплектации и область разрешенной эксплуатации",
          "Фактическое наличие, год модели, ЭПТС или другие применимые документы и условия сделки",
          "Адреса дилера, сервис, расходники, согласованные гарантийные условия и параметры экипировки"
        ],
        "proofNote": "Страница не устанавливает категорию прав, законность конкретной поездки или качество техники. GAEO не заявляет реализованные GEO-кейсы мотоциклетных дилеров.",
        "workTitle": "Как организую GEO для дилера мототехники",
        "workIntro": "Разделяю запросы о модели, назначении и покупке; затем проверяю достоверность открытых сведений и динамику рекомендаций.",
        "steps": [
          {
            "title": "Базовый BMR по назначению",
            "body": "Фиксирую вопросы по городскому использованию, туризму, эндуро, характеристикам и региону."
          },
          {
            "title": "Документы и ассортимент",
            "body": "Сверяю классификацию, реальные модели, комплектации, цены и поставки с разрешенной документацией."
          },
          {
            "title": "Модельные и экспертные страницы",
            "body": "Готовлю рекомендации для каталога, сравнений классов техники, сервисных разделов и проверяемых обзоров."
          },
          {
            "title": "Повторный BMR и точность",
            "body": "Повторяю запросы и отдельно выявляю ошибочные обещания по регистрации, наличию и условиям сервиса."
          }
        ],
        "faq": [
          {
            "question": "Можно ли назвать любой эндуро дорожным мотоциклом?",
            "answer": "Нет. Назначение и документы зависят от конкретной модели и применимых требований. Покупателю следует проверять характеристики и условия допуска к эксплуатации."
          },
          {
            "question": "Наличие ЭПТС означает, что модель можно использовать где угодно?",
            "answer": "Нет. Электронный паспорт содержит сведения о транспортном средстве, но не подменяет требования к условиям эксплуатации и правам управления."
          },
          {
            "question": "Как сравнивать технику для новичка?",
            "answer": "Нужны назначение, масса, посадка, характеристики и реальная возможность ознакомления с моделью. Давать универсальные обещания безопасности по объему двигателя нельзя."
          },
          {
            "question": "Нужно ли отдельно продвигать сервис мотосалона?",
            "answer": "Да, если дилер действительно оказывает услуги. Покупатели спрашивают о расходниках, ремонте и гарантии иначе, чем о покупке новой модели."
          },
          {
            "question": "Сколько стоит GEO-продвижение мотосалона?",
            "answer": "Действуют опубликованные тарифы GAEO. Конкретный объем определяется модельным рядом, географией продаж и матрицей запросов."
          }
        ],
        "ctaTitle": "Проверить рекомендации мотосалона по реальным сценариям выбора",
        "ctaText": "Пришли сайт, модельный ряд, регионы, документы на технику и перечень сервисных услуг. Подберу матрицу проверки.",
        "request": "GEO мотосалона и дилера мототехники: дорожные мотоциклы, эндуро, ЭПТС, комплектации, сервис и BMR."
      },
      "en": {
        "title": "GEO for motorcycle and powersports dealers | GAEO",
        "h1": "GEO visibility for motorcycle and powersports dealers",
        "description": "AI visibility for motorcycle dealers: road versus off-road use, model documentation, electronic passports, availability, maintenance and BMR.",
        "eyebrow": "Automotive / Motorcycles and powersports",
        "lead": "Buyers compare road motorcycles, enduro bikes and other powersports vehicles by intended use, experience, budget and registration requirements. I test which dealers AI recommends and verify whether the answers match real model specifications, available stock and servicing.",
        "heroPoints": [
          "Questions by riding purpose, vehicle class and experience",
          "Clear separation of road, competition and off-road use",
          "Verifiable model data, documents, stock and after-sales service"
        ],
        "problemTitle": "Why AI may suggest the wrong motorcycle dealer",
        "problemIntro": "Retail listings may mix vehicles with very different intended uses and documentation. Engine displacement or a headline price alone is not a responsible comparison.",
        "problems": [
          {
            "title": "Use cases are confused",
            "body": "A road bike, motocross machine and closed-course competition model are not necessarily interchangeable. Check actual model classification and documents."
          },
          {
            "title": "Stock and specification drift",
            "body": "Model year, available colour, delivery date, electronic passport and included accessories may change quickly."
          },
          {
            "title": "Service claims lack detail",
            "body": "Parts, maintenance schedules, warranty conditions and protective-gear fit need model-specific evidence."
          }
        ],
        "scenarioTitle": "Buyer questions worth measuring for powersports",
        "scenarioIntro": "These are proposed research prompts. A given model's road-use eligibility and current availability require separate verification.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "What road motorcycle suits a beginner in my price range?",
            "Intended use, weight, ergonomics, factual model specifications and stock",
            "Compare actual models without blanket safety claims"
          ],
          [
            "Where can I buy an enduro bike for this type of riding?",
            "Road/off-road category, documents and configuration",
            "Explain intended use and any limitations"
          ],
          [
            "Which dealer handles electronic motorcycle passports?",
            "Applicability and status of electronic-passport documents for the actual unit",
            "Separate documentation from guaranteed registration"
          ],
          [
            "Who can service this motorcycle and supply parts nearby?",
            "Workshop location, inventory, maintenance scope and timing",
            "Connect vehicle pages with genuine after-sales offerings"
          ]
        ],
        "proofTitle": "What to verify before recommending a motorcycle dealership",
        "proofIntro": "TR CU 018/2011 governs applicable classes of wheeled vehicles, including relevant powered-two-wheeler categories. The Electronic Passport Administrator explains passport extracts. Rules for maintenance services are distinct from the paperwork needed for a vehicle purchase.",
        "checks": [
          "Model class, intended use, configuration and applicable legal/documentary status",
          "Current availability, model year, electronic passport where relevant and purchase terms",
          "Dealer geography, maintenance capability, parts, actual warranty conditions and equipment compatibility"
        ],
        "proofNote": "This page makes no universal claims about road legality or rider licensing and reports no completed GAEO GEO campaign for motorcycle dealers.",
        "workTitle": "How I improve motorcycle-dealer GEO",
        "workIntro": "I map motorcycle selection, intended use and purchase questions to verifiable model information, then measure recommendations again.",
        "steps": [
          {
            "title": "Measure use-specific baseline",
            "body": "Collect non-branded prompts about commuter riding, touring, enduro, specifications and region."
          },
          {
            "title": "Review models and documents",
            "body": "Verify class, actual stock, model year, prices, equipment and relevant documentation."
          },
          {
            "title": "Plan model-level content",
            "body": "Prepare the catalogue structure, vehicle comparisons, service pages and expert explainers."
          },
          {
            "title": "Recheck AI responses",
            "body": "Repeat prompts and identify inaccurate claims about registration, availability and servicing."
          }
        ],
        "faq": [
          {
            "question": "Is every enduro bike legal for road use?",
            "answer": "No. Intended use and the applicable documentation differ by model. Actual technical classification and permission to operate must be checked."
          },
          {
            "question": "Does an electronic passport guarantee any kind of use?",
            "answer": "No. An electronic vehicle passport records vehicle data but does not override driving-entitlement and operating rules."
          },
          {
            "question": "How should a beginner compare motorcycles?",
            "answer": "Consider the intended riding, ergonomics, weight, documented specifications and opportunities to inspect the specific model. Displacement alone is insufficient."
          },
          {
            "question": "Should a motorcycle dealer promote its workshop separately?",
            "answer": "Yes, when it offers real services. Parts and maintenance questions differ significantly from new-bike purchasing queries."
          },
          {
            "question": "How does GAEO price motorcycle-dealer GEO?",
            "answer": "The published GAEO plans apply. Scope follows the model range, sales regions and baseline prompt matrix."
          }
        ],
        "ctaTitle": "Find out which motorcycle dealers AI recommends for actual needs",
        "ctaText": "Share your model range, regions, product documents and servicing scope. I will outline an initial question set.",
        "request": "Motorcycle dealer GEO: road motorcycles, enduro, model documents, electronic passports, stock, maintenance and BMR."
      }
    }
  }
];
