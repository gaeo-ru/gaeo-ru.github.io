/**
 * Phase 2AE: evidence-led original RU/EN specializations for auto repair shops (#77),
 * commercial vehicle and machinery dealers (#78), and motorcycle dealers (#79).
 * Sources describe applicable rules, not certification, endorsements or client results.
 * Shared GAEO tariffs, BMR contract terms, catalogue IDs and approved artwork unchanged.
 */
export const industrySpecializationsBatch2AE = [
  {
    "id": 77,
    "slug": "auto-repair-shops",
    "group": "automotive",
    "routes": {
      "ru": "/industries/auto-repair-shops/",
      "en": "/en/industries/auto-repair-shops/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 отраслевых услуг",
      "en": "107-industry service catalogue"
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
        "Методика замера BMR и рекомендаций нейросетей"
      ],
      "en": [
        "BMR and AI recommendation measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/557684",
        "ru": "Роспотребнадзор: правила ремонта автомототранспорта №780 с 1 сентября 2025 года",
        "en": "Rospotrebnadzor: vehicle servicing rules No. 780, effective 1 September 2025"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/575844",
        "ru": "Роспотребнадзор: договор и приемо-сдаточный акт при ремонте (июль 2026)",
        "en": "Rospotrebnadzor: written contract and vehicle handover record (July 2026)"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/569887",
        "ru": "Роспотребнадзор: условия и информация об автосервисных услугах",
        "en": "Rospotrebnadzor: service terms and consumer information"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение автосервисов и СТО в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение автосервисов и СТО в нейросетях",
        "description": "GEO для автосервисов, СТО и техцентров: запросы по маркам и видам ремонта, адресам, стоимости, записи и реальным отзывам. Аудит BMR и тарифы GAEO.",
        "eyebrow": "Автомобильный рынок / Автосервисы и СТО",
        "lead": "Владелец автомобиля спрашивает нейросеть, куда обратиться с конкретной неисправностью, учитывая модель машины, район, свободную запись и стоимость диагностики. Проверяю, какие СТО оказываются в таких рекомендациях и какие сведения о вашем сервисе можно независимо подтвердить.",
        "heroPoints": [
          "Небрендовые запросы по неисправности, марке и географии",
          "Проверка реальных работ, оборудования, адресов и условий записи",
          "Сопоставимый BMR-замер и исправление противоречий в источниках"
        ],
        "problemTitle": "Почему СТО может отсутствовать в ответах на запросы о ремонте",
        "problemIntro": "Для выбора автосервиса недостаточно списка «все виды работ». Нейросети и покупателям нужны конкретные специализации, условия приемки автомобиля, время и проверяемая репутация.",
        "problems": [
          {
            "title": "Неясная специализация",
            "body": "Фраза «ремонт любых автомобилей» не показывает, работает ли СТО с определенной моделью, трансмиссией, гибридной системой или типом диагностики."
          },
          {
            "title": "Сроки и цены без условий",
            "body": "Стоимость нормо-часа не равна полной цене ремонта. Предварительная диагностика, согласование деталей и дополнительные работы должны быть различимы."
          },
          {
            "title": "Отзывы без контекста",
            "body": "Оценки разных филиалов, давние отзывы и неподтвержденные обещания гарантии не заменяют реальную историю работ и актуальный адрес."
          }
        ],
        "scenarioTitle": "По каким запросам автовладельцы выбирают СТО",
        "scenarioIntro": "Это примеры будущей матрицы замера, а не уже полученные ответы ChatGPT или Алисы. Регион, марки и сравниваемые сервисы определяются при аудите.",
        "columns": [
          "Запрос автомобилиста",
          "Что проверять",
          "Что улучшать для GEO"
        ],
        "scenarios": [
          [
            "Где диагностировать неисправность вариатора конкретной модели рядом со мной?",
            "Марки, коробки передач, диагностическое оборудование, филиал и доступные слоты",
            "Страницу специализации, географию, подтверждения компетенций"
          ],
          [
            "Как выбрать СТО для обслуживания коммерческого фургона по выходным?",
            "Тип транспорта, рабочие часы конкретной точки, условия приемки и ограничения",
            "Правильную привязку услуги к филиалу и графику"
          ],
          [
            "Какая цена замены тормозных дисков с работой и деталями?",
            "Состав работ, модель автомобиля, тип деталей, подтвержденный прайс и смета",
            "Разделить базовый прайс, диагностику и финальное согласование"
          ],
          [
            "Кто дает документы и гарантийные условия после кузовного ремонта?",
            "Договор, приемо-сдаточный акт, заказ-наряд, условия гарантийных обязательств",
            "Показать процесс приемки, документов и исполнения"
          ]
        ],
        "proofTitle": "Что должно быть подтверждено в материалах СТО",
        "proofIntro": "С 1 сентября 2025 года действуют Правила оказания услуг по техническому обслуживанию и ремонту автомототранспортных средств, утвержденные постановлением №780. Роспотребнадзор отдельно разъясняет, какие сведения и документы получает потребитель. Наличие правил само по себе не доказывает качество конкретного автосервиса.",
        "checks": [
          "Подтвержденные марки и виды работ, оснащение, реальные адреса, часы и условия записи",
          "Образцы допустимых к публикации условий ремонта: договор, приемо-сдаточный акт, калькуляция и гарантия, если установлена",
          "Атрибутированные отзывы по филиалам, даты, разрешенные фотографии работ и ограничения компетенций"
        ],
        "proofNote": "Это специализированная методика GEO для СТО. Подтвержденного роста BMR конкретных автосервисов из практики GAEO здесь не заявляется.",
        "workTitle": "Как выстрою GEO-продвижение автосервиса",
        "workIntro": "Начинаю с вопросов, которые решают выбор СТО, затем сверяю публичную информацию с фактическим перечнем работ и режимом работы.",
        "steps": [
          {
            "title": "Исходный замер",
            "body": "Фиксирую ответы по географии, видам ремонта, маркам, срокам и ценовым критериям; отделяю брендовые рекомендации."
          },
          {
            "title": "Проверка данных сервиса",
            "body": "Сверяю фактические возможности, оснащение, филиалы, часы и согласованные документы."
          },
          {
            "title": "Материалы и присутствие",
            "body": "Готовлю ТЗ для страниц услуг и филиалов, FAQ, профилей специалистов и подтвержденных публикаций."
          },
          {
            "title": "Повторная оценка",
            "body": "Сравниваю BMR на той же матрице и проверяю точность рекомендаций по услугам и адресам."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли делать отдельную страницу для каждой марки автомобиля?",
            "answer": "Только для реально обслуживаемых марок и самостоятельных покупательских запросов. Пустые страницы с заменой названия марки не помогут выбрать сервис."
          },
          {
            "question": "Можно ли показывать точную стоимость ремонта?",
            "answer": "Да, если явно определены модель, состав работ, детали и условия расчета. Предварительная цена диагностики не должна выглядеть как окончательная смета."
          },
          {
            "question": "Какие документы важны при передаче машины в ремонт?",
            "answer": "Роспотребнадзор разъясняет требования постановления №780 к письменному договору и приемо-сдаточному акту в применимых обстоятельствах."
          },
          {
            "question": "Как учитываются отзывы разных филиалов?",
            "answer": "По каждому реальному адресу отдельно, с датами и проверкой повторяющихся тем. Чужие отзывы и оценки другой точки не переносим."
          },
          {
            "question": "Сколько стоит GEO для автосервиса?",
            "answer": "Действуют опубликованные тарифы GAEO. Объем зависит от числа СТО, марок, услуг, городов и стартового набора запросов."
          }
        ],
        "ctaTitle": "Проверить, какие СТО нейросети рекомендуют вместо вашей",
        "ctaText": "Пришли адреса филиалов, марки, список услуг и сайт. Я определю исходную матрицу запросов и приоритеты аудита.",
        "request": "GEO для СТО: филиалы, марки, виды ремонта, документы, запись и исходный BMR."
      },
      "en": {
        "title": "GEO for auto repair shops and vehicle service centres | GAEO.ru",
        "h1": "GEO for auto repair shops and service centres",
        "description": "AI recommendation auditing for vehicle repair shops: make and model expertise, diagnostics, local branches, estimates, bookings, reviews and BMR.",
        "eyebrow": "Automotive / Vehicle repair shops",
        "lead": "Drivers ask AI where to repair a specific fault, often adding vehicle model, neighbourhood, appointment availability and diagnostic costs. I examine which service centres appear in those recommendations and which claims about a workshop can be checked against real evidence.",
        "heroPoints": [
          "Non-brand prompts by fault, vehicle and location",
          "Verified workshop services, equipment, booking terms and addresses",
          "Comparable BMR checks and correction of inconsistent listings"
        ],
        "problemTitle": "Why a repair shop may be missing from an AI shortlist",
        "problemIntro": "A blanket claim to repair all vehicles does not answer a driver's specific question. Customers need credible specialisms, clear intake procedures, availability and attributable local reviews.",
        "problems": [
          {
            "title": "Unclear specialism",
            "body": "An all-makes claim does not establish competence with a particular gearbox, vehicle configuration, diagnostic procedure or high-voltage system."
          },
          {
            "title": "Estimates without scope",
            "body": "An hourly labour rate is not a complete repair quote. Diagnostics, parts approval and additional work need clear boundaries."
          },
          {
            "title": "Reviews detached from branches",
            "body": "Old reviews, aggregated branch ratings and unsupported warranty claims do not establish what a specific location can do today."
          }
        ],
        "scenarioTitle": "The questions that trigger repair-shop recommendations",
        "scenarioIntro": "These are candidate measurement prompts, not observed recommendations. Actual locations, vehicle makes and competitors are chosen during the audit.",
        "columns": [
          "Driver question",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which nearby shop can diagnose a CVT fault on my vehicle model?",
            "Supported models, technician qualifications, diagnostic equipment and workshop location",
            "Publish a verifiable service specialism and accurate local information"
          ],
          [
            "Where can a commercial van be serviced at the weekend?",
            "Vehicle coverage, branch hours, intake procedure and actual capacity",
            "Connect each service to the correct branch and schedule"
          ],
          [
            "How much is a brake-disc replacement including labour and parts?",
            "Vehicle details, itemised scope, parts options, published estimates",
            "Separate indicative pricing from the approved final estimate"
          ],
          [
            "Who documents warranty terms after bodywork?",
            "Contract, intake report, job order and applicable warranty conditions",
            "Explain repair acceptance and documentation"
          ]
        ],
        "proofTitle": "Evidence a workshop should make available",
        "proofIntro": "Russian Government Resolution No. 780 introduced updated vehicle servicing and repair rules on 1 September 2025. Rospotrebnadzor explains the information and written documents relevant to consumer jobs. Those rules do not certify any particular workshop's service quality.",
        "checks": [
          "Verified supported makes, repair services, equipment, branch addresses, opening hours and booking rules",
          "Publishable information on contracts, vehicle intake, itemised estimates and any stated warranty conditions",
          "Attributable reviews per branch, dated work examples, permissions for photographs and competence boundaries"
        ],
        "proofNote": "This is an automotive GEO methodology, not a claim of measured GAEO BMR uplift for repair-shop clients.",
        "workTitle": "How I would develop GEO for a repair business",
        "workIntro": "Start with the questions that determine a garage booking, then align public claims with actual work, hours and services.",
        "steps": [
          {
            "title": "Baseline discovery",
            "body": "Record comparable prompts by repair category, vehicle, location, availability and budget; separate branded queries."
          },
          {
            "title": "Check workshop information",
            "body": "Validate capabilities, tools, branches, published hours and permitted contractual facts."
          },
          {
            "title": "Improve web and public evidence",
            "body": "Brief service and location pages, FAQs, expert profiles and attributable external content."
          },
          {
            "title": "Retest recommendations",
            "body": "Repeat the same BMR sample and flag incorrect service or branch recommendations."
          }
        ],
        "faq": [
          {
            "question": "Does every car make need a dedicated page?",
            "answer": "Only where the shop genuinely serves that make and there is a distinct buying need. Thin pages with changed vehicle names add little value."
          },
          {
            "question": "Can AI quote an exact repair price?",
            "answer": "Only where vehicle details, parts, labour and limitations support that amount. An initial diagnostic fee is not the final repair quote."
          },
          {
            "question": "Which documents matter when a vehicle is handed over?",
            "answer": "Rospotrebnadzor explains written contracts and vehicle handover records under Resolution No. 780 in applicable circumstances."
          },
          {
            "question": "How should multi-location reviews be handled?",
            "answer": "Use real, dated, attributable reviews for the specific branch. A different workshop's rating must not be reassigned."
          },
          {
            "question": "What are GAEO's rates for vehicle repair shops?",
            "answer": "Published GAEO plans apply. Scope depends on branch count, vehicle coverage, repairs, regions and baseline prompts."
          }
        ],
        "ctaTitle": "Find out which repair shops AI recommends instead",
        "ctaText": "Share your branches, vehicle makes, main services and website. I will outline a useful baseline question set.",
        "request": "Vehicle repair-shop GEO: locations, brands, service scope, booking, documentation and baseline BMR."
      }
    }
  },
  {
    "id": 78,
    "slug": "commercial-vehicle-machinery-dealers",
    "group": "automotive",
    "routes": {
      "ru": "/industries/commercial-vehicle-machinery-dealers/",
      "en": "/en/industries/commercial-vehicle-machinery-dealers/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 отраслевых услуг",
      "en": "107-industry service catalogue"
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
        "Методика замера BMR и рекомендаций нейросетей"
      ],
      "en": [
        "BMR and AI recommendation measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/tr/details/89583411-7805-4836-abd5-3b3d9057eed7",
        "ru": "Росстандарт: действующий ТР ТС 018/2011, категории колесного транспорта",
        "en": "Rosstandart: current TR CU 018/2011 and road-vehicle categories"
      },
      {
        "href": "https://elpts.ru/novye-formaty-vypisok/",
        "ru": "СЭП: форматы выписок из электронных паспортов с октября 2026 года",
        "en": "Electronic Passport System: October 2026 extract formats"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_535444/",
        "ru": "Постановление №625: регистрация самоходных машин по применимым категориям",
        "en": "Resolution No. 625: registration of applicable self-propelled machinery"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/593809",
        "ru": "Роспотребнадзор: новые правила розничной продажи с сентября 2026 года",
        "en": "Rospotrebnadzor: updated retail-sale rules from September 2026"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение дилеров грузовиков и спецтехники в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение дилеров коммерческого транспорта и спецтехники",
        "description": "GEO для дилеров грузовиков, фургонов, спецтехники: модели, грузоподъемность, надстройки, сервис, лизинг, наличие и документы. Тарифы GAEO и замер BMR.",
        "eyebrow": "Автомобильный рынок / Коммерческий транспорт",
        "lead": "Предприниматель выбирает грузовик или спецтехнику для конкретного маршрута, нагрузки и бюджета. Я исследую, какие дилеры попадают в рекомендации нейросетей, и проверяю, совпадают ли заявленные характеристики, сроки поставки и сервисные возможности с фактическими предложениями.",
        "heroPoints": [
          "Интенты по назначению техники, массе, надстройке и региону",
          "Проверка модельного ряда, доступности и условий поставки",
          "Разграничение колесного транспорта и самоходных машин"
        ],
        "problemTitle": "Почему дилера трудно рекомендовать по конкретной транспортной задаче",
        "problemIntro": "Для B2B-покупателя автомобиль или машина оценивается по полной конфигурации и затратам владения. Универсальная страница «вся техника в наличии» не отвечает на эти условия.",
        "problems": [
          {
            "title": "Модификации смешаны",
            "body": "Базовое шасси, готовый фургон, рефрижератор и подъемник различаются назначением, габаритами и возможной полезной нагрузкой."
          },
          {
            "title": "Наличие выглядит постоянным",
            "body": "Рекламная цена, поставка под заказ, склад конкретного дилера и сезонные сроки не равнозначны реальной готовности отгрузить технику."
          },
          {
            "title": "Неверно описаны документы",
            "body": "Категории колесных машин и отдельных видов самоходной техники регулируются по-разному. Нельзя обещать одинаковый набор документов для всех моделей."
          }
        ],
        "scenarioTitle": "Какие вопросы приводят B2B-покупателя к дилеру",
        "scenarioIntro": "Вопросы нужны для начальной матрицы BMR. Марки, модели и география выбираются по фактическому ассортименту, без придуманных ответов нейросетей.",
        "columns": [
          "Запрос закупщика",
          "Проверяемые параметры",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить фургон под доставку охлажденных продуктов в регионе?",
            "Шасси, тип кузова и охлаждения, полезная нагрузка, поставка и сервис",
            "Сравнить конкретные комплектации и доступность"
          ],
          [
            "Кто поставит самосвал для работы на стройплощадке с гарантийным обслуживанием?",
            "Условия эксплуатации, полезная нагрузка, сервисная сеть, применимые документы",
            "Показать реальные сценарии применения и сервис"
          ],
          [
            "Что выбрать для парка: несколько малотоннажных грузовиков или среднетоннажную модель?",
            "Маршруты, объем, масса груза, стоимость владения, конфигурации",
            "Добавить воспроизводимые критерии сравнения без фиктивной экономии"
          ],
          [
            "Какая спецтехника доступна с навесным оборудованием и доставкой?",
            "Тип машины, совместимость навески, склад, сроки и документы",
            "Развести машины, совместимое оборудование и опции поставки"
          ]
        ],
        "proofTitle": "Какие данные дилер должен подтверждать",
        "proofIntro": "ТР ТС 018/2011 распространяется на определенные категории колесного транспорта, в том числе N и M; правила для самоходных машин могут отличаться. В электронном паспорте есть сведения по конкретному транспортному средству. Эти нормативные и технические источники не заменяют проверку документов на модель и предложение дилера.",
        "checks": [
          "Точная модель и модификация, категория, полезная нагрузка, размеры, надстройки и подтвержденная совместимость",
          "Статус предложения: склад, заказ, сроки, регион, конечная комплектация, цена и сервисные условия на дату обновления",
          "Документы применительно к конкретному типу техники: сведения электронного паспорта, оценка соответствия, регистрационный режим"
        ],
        "proofNote": "Наличие бренда в ассортименте и соответствие конкретной модели документам проверяются по первичным данным дилера. Результатов продвижения GAEO для продавцов техники здесь не заявлено.",
        "workTitle": "Как выстрою GEO для поставщика коммерческой техники",
        "workIntro": "Сначала разделяю автопарк, строительные задачи и сервисное обслуживание, затем связываю требования закупщика с подтверждаемыми товарными данными.",
        "steps": [
          {
            "title": "Замер рекомендаций",
            "body": "Фиксирую запросы по назначению, региону, модели, конфигурации, лизингу и срокам поставки."
          },
          {
            "title": "Проверка продукта",
            "body": "Уточняю перечень моделей, модификаций, складские статусы, сервис и обязательные сведения."
          },
          {
            "title": "Контент и источники",
            "body": "Готовлю ТЗ на страницы моделей, сравнений, сервисных условий и отраслевых сценариев с проверяемыми источниками."
          },
          {
            "title": "Контроль BMR",
            "body": "Повторяю те же запросы; проверяю, не путают ли нейросети наличие, категории машин и характеристики."
          }
        ],
        "faq": [
          {
            "question": "Можно ли объединить грузовые автомобили и внедорожную спецтехнику?",
            "answer": "В каталоге дилера можно, но технические и регистрационные режимы для конкретных категорий нужно разделять. Покупательские сценарии также разные."
          },
          {
            "question": "Нужно ли указывать модификацию грузовика?",
            "answer": "Да. Данные базового шасси недостаточны, если заказчик выбирает готовую надстройку или другую колесную базу."
          },
          {
            "question": "Как отображать технику под заказ?",
            "answer": "Явно указывать заказной статус и подтвержденные условия поставки. Нельзя показывать планируемую поставку как складскую."
          },
          {
            "question": "Гарантирует ли разметка Product рекомендации нейросетей?",
            "answer": "Нет. Разметка помогает структурировать доступные данные, но сама по себе не обеспечивает появления дилера в конкретном ответе."
          },
          {
            "question": "Какие тарифы GAEO действуют для дилеров коммерческой техники?",
            "answer": "Общие опубликованные тарифы. Объем определяется марками, модификациями, регионами, источниками данных и стартовой матрицей BMR."
          }
        ],
        "ctaTitle": "Узнать, кого нейросети советуют закупщикам транспорта",
        "ctaText": "Пришли сайт дилера, модельный ряд, регионы поставки и сервисную сеть. Предложу отдельные группы запросов для грузовиков и спецтехники.",
        "request": "GEO для дилера коммерческого транспорта: модели, модификации, склад, поставка, сервис, применимые документы и BMR."
      },
      "en": {
        "title": "GEO for commercial vehicle and equipment dealers | GAEO.ru",
        "h1": "GEO for commercial vehicle and equipment dealers",
        "description": "GEO for truck and machinery dealers: fleet use cases, vehicle specifications, bodies, local inventory, service, delivery terms and AI recommendation BMR.",
        "eyebrow": "Automotive / Commercial vehicle dealers",
        "lead": "Fleet buyers ask which truck or machine fits a specific payload, operating route, budget and service requirement. I test which dealers AI recommends for these questions and whether model specifications, stock claims and support terms can be verified against actual offers.",
        "heroPoints": [
          "B2B prompts by operation, payload, body type and region",
          "Evidence for model variations, inventory and delivery terms",
          "Separate rules for road vehicles and self-propelled machinery"
        ],
        "problemTitle": "Why a dealer may fail to match a fleet buyer's brief",
        "problemIntro": "Commercial vehicles are judged on complete configurations and operating costs. An undifferentiated all-machinery catalogue does not resolve the buyer's constraints.",
        "problems": [
          {
            "title": "Configurations are conflated",
            "body": "A chassis, insulated van, refrigerated body and lifting platform have different applications, dimensions and payload limitations."
          },
          {
            "title": "Availability is misleading",
            "body": "A promotional price, factory order and a particular branch's ready stock are different commercial propositions."
          },
          {
            "title": "Documentation is overgeneralised",
            "body": "Road-vehicle categories and certain self-propelled machines have different applicable frameworks. One document set cannot be presumed for every model."
          }
        ],
        "scenarioTitle": "Questions commercial transport buyers ask AI",
        "scenarioIntro": "These are candidate BMR prompts, not observed output. Actual vehicle brands, stock and target regions follow the dealer's offer.",
        "columns": [
          "Procurement question",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which local dealer has a refrigerated delivery van for regional distribution?",
            "Chassis, body specification, cooling system, usable load, service and lead time",
            "Present the real configuration and current availability"
          ],
          [
            "Who supplies tipper trucks with after-sales support for construction sites?",
            "Site conditions, payload, service network, warranty terms and applicable documentation",
            "Show verified application and support coverage"
          ],
          [
            "Should a fleet buy several light vans or medium-duty trucks?",
            "Routes, capacity, weight, lifecycle cost and equivalent configurations",
            "Explain comparison assumptions without invented savings"
          ],
          [
            "Where can I order equipment with compatible attachments and delivery?",
            "Equipment category, attachment compatibility, stock, transport and legal regime",
            "Separate machine models, options and fulfilment conditions"
          ]
        ],
        "proofTitle": "Specifications and legal scope that must be checked",
        "proofIntro": "TR CU 018/2011 addresses designated wheeled vehicle categories, including N and M. Certain self-propelled machines fall under different rules. Electronic vehicle passport data relates to individual vehicles; neither framework is proof that any dealer has a specific configuration in stock.",
        "checks": [
          "Verified model and variant, vehicle category, payload, dimensions, mounted equipment and compatible options",
          "Real availability: stock, factory order, delivery region, price validity and service support",
          "Applicable paperwork for each vehicle type, including electronic passport information and registration treatment where relevant"
        ],
        "proofNote": "Commercial inventory, certifications and model documentation must be checked with primary evidence. This page does not claim measured GAEO results for truck dealers.",
        "workTitle": "How I would structure GEO for vehicle suppliers",
        "workIntro": "Separate operational tasks and maintenance needs, then map procurement language to reliable model and dealer information.",
        "steps": [
          {
            "title": "Baseline the buying queries",
            "body": "Record prompts by equipment use, region, configuration, leasing and lead times."
          },
          {
            "title": "Validate the offer",
            "body": "Check vehicle variants, current stock, servicing, documents and actual delivery commitments."
          },
          {
            "title": "Strengthen content and sources",
            "body": "Prepare specifications, comparison pages, application guides and attributable industry evidence."
          },
          {
            "title": "Retest BMR",
            "body": "Repeat prompts and identify incorrect availability, model classes or equipment claims."
          }
        ],
        "faq": [
          {
            "question": "Can road trucks and off-road machinery share a catalogue?",
            "answer": "They can share a commercial catalogue, but buyer tasks and applicable technical and registration rules should be separated by equipment type."
          },
          {
            "question": "Why specify a vehicle variant rather than a model name?",
            "answer": "A chassis alone does not define the finished body, wheelbase, payload or equipment configuration."
          },
          {
            "question": "How should factory-order equipment be shown?",
            "answer": "Label it as an order with current, substantiated lead times. Do not display planned arrival as ready stock."
          },
          {
            "question": "Does Product markup guarantee an AI recommendation?",
            "answer": "No. Structured data can describe an offer more clearly but cannot guarantee selection by an AI service."
          },
          {
            "question": "How does GAEO price commercial-vehicle GEO?",
            "answer": "Published plans apply. Scope depends on models, variants, distribution regions, evidence and baseline prompts."
          }
        ],
        "ctaTitle": "Check which dealers AI recommends to fleet buyers",
        "ctaText": "Share your dealer website, main vehicle ranges, distribution regions and after-sales support. I will propose a segmented baseline audit.",
        "request": "Commercial vehicle dealer GEO: vehicles, variants, availability, after-sales support, documentation and BMR."
      }
    }
  },
  {
    "id": 79,
    "slug": "motorcycle-powersports-dealers",
    "group": "automotive",
    "routes": {
      "ru": "/industries/motorcycle-powersports-dealers/",
      "en": "/en/industries/motorcycle-powersports-dealers/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 отраслевых услуг",
      "en": "107-industry service catalogue"
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
        "Методика замера BMR и рекомендаций нейросетей"
      ],
      "en": [
        "BMR and AI recommendation measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/tr/details/89583411-7805-4836-abd5-3b3d9057eed7",
        "ru": "Росстандарт: ТР ТС 018/2011 и применимые категории мототранспорта L",
        "en": "Rosstandart: TR CU 018/2011 and applicable L-category powered two/three-wheel vehicles"
      },
      {
        "href": "https://elpts.ru/novye-formaty-vypisok/",
        "ru": "СЭП: электронные паспорта и выписки, изменения октября 2026 года",
        "en": "Electronic Passport System: passport extracts updated in October 2026"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/593809",
        "ru": "Роспотребнадзор: правила розничной торговли с сентября 2026 года",
        "en": "Rospotrebnadzor: retail-sale rules effective September 2026"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/570249",
        "ru": "Роспотребнадзор: ремонт автомототранспортных средств и правила №780",
        "en": "Rospotrebnadzor: vehicle and motorcycle repair rules No. 780"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение дилеров мотоциклов и мототехники в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение дилеров мотоциклов и мототехники",
        "description": "GEO для мотодилеров: дорожные мотоциклы, эндуро, скутеры, категория техники, посадка, наличие, тест-драйв, сервис и документы. Замеры BMR.",
        "eyebrow": "Автомобильный рынок / Мотоциклы и мототехника",
        "lead": "Покупатель выбирает мотоцикл под рост, опыт, тип маршрута и обслуживание в своем городе. Я проверяю, какие дилеры попадают в ответы нейросетей по этим сценариям, и насколько точно в рекомендациях отражены реальные модели, доступность, условия покупки и сервис.",
        "heroPoints": [
          "Запросы новичков, туристов и городских мотоциклистов по задачам",
          "Различия дорожных моделей, эндуро и внедорожной техники",
          "Проверка поставки, испытания модели покупателем и сервисной сети"
        ],
        "problemTitle": "Почему мотодилер не попадает в рекомендацию по сценарию езды",
        "problemIntro": "Маркетинговое «мотоцикл для всех» стирает технические различия. Новичку нужны сведения о посадке, массе и обслуживании; опытному покупателю о назначении, оборудовании и условиях покупки.",
        "problems": [
          {
            "title": "Типы техники смешаны",
            "body": "Дорожные мотоциклы, скутеры, эндуро, питбайки и квадроциклы нельзя описывать как одну правовую и эксплуатационную категорию."
          },
          {
            "title": "Посадка и опыт игнорируются",
            "body": "Объем двигателя не заменяет массу, высоту сиденья, назначение и ограничения конкретной модели. Нельзя обещать универсальную пригодность для новичка."
          },
          {
            "title": "Наличие и сервис не подтверждены",
            "body": "Модель из каталога, доступный тест-драйв, гарантийное обслуживание и возможность выдачи техники в конкретном городе требуют отдельных фактов."
          }
        ],
        "scenarioTitle": "Сценарии, по которым выбирают мототехнику",
        "scenarioIntro": "Вопросы ниже предназначены для будущего замера BMR. Конкретные мотоциклы и ответы нейросетей подтверждаются только после исследования.",
        "columns": [
          "Запрос покупателя",
          "Подтверждение",
          "GEO-задача"
        ],
        "scenarios": [
          [
            "Какой легкий городской мотоцикл подойдет начинающему в моем городе?",
            "Конкретная модель, масса, высота сиденья, назначение, фактические предложения",
            "Показать выбор по росту и практике без рекомендаций по безопасности без оснований"
          ],
          [
            "Где найти туристический мотоцикл с сервисом в регионе?",
            "Модель, комплектация, дилер, авторизованный сервис и география",
            "Разделить наличие товара, продажу и обслуживание"
          ],
          [
            "Чем эндуро отличается от внедорожной спортивной техники при покупке?",
            "Назначение модели, применимая категория и документы, условия использования",
            "Правильно обозначить границы категорий и эксплуатации"
          ],
          [
            "Кто продает нужную модель и дает согласованный тест-драйв?",
            "Наличие по салону, правила тест-драйва, требования и согласованные условия",
            "Показывать актуальные слоты и ограничения, без фиктивных обещаний"
          ]
        ],
        "proofTitle": "Какие сведения о мототехнике нужно проверять",
        "proofIntro": "ТР ТС 018/2011 относит определенные дорожные мототранспортные средства к категории L, но область его действия не следует автоматически переносить на каждую внедорожную машину. Электронные паспорта и применимые правила продажи проверяются по конкретному продукту. Это источник требований, а не подтверждение качества конкретного дилера.",
        "checks": [
          "Назначение, актуальная модель, масса, посадочная высота, характеристики, комплектность и доступность",
          "Тип транспортного средства и применимые документы, статус электронного паспорта там, где он предусмотрен",
          "Точные салон и сервис, запись на тест-драйв, гарантийные условия, поставка и публичные подтверждения опыта"
        ],
        "proofNote": "Примеры запросов не являются советами по водительской квалификации или оценкой безопасности модели. Подтвержденных клиентских BMR-результатов для мотодилеров GAEO здесь не заявлено.",
        "workTitle": "Как выстрою продвижение мотодилера в ответах нейросетей",
        "workIntro": "Разделяю выбор первого мотоцикла, городские поездки, путешествия и сервис, затем проверяю доступность и технические факты каждой модели.",
        "steps": [
          {
            "title": "Стартовый замер",
            "body": "Собираю небрендовые вопросы по назначению, опыту, посадке, бюджету, региону и наличию."
          },
          {
            "title": "Сверка модельного ряда",
            "body": "Проверяю доступные комплектации, документы, условия тест-драйва, точки продаж и сервиса."
          },
          {
            "title": "Контент дилера",
            "body": "Готовлю модельные страницы, полезные сравнения по применению, FAQ и подтвержденные сведения о дилере."
          },
          {
            "title": "Повторная проверка",
            "body": "Измеряю BMR по той же группе вопросов и отслеживаю устаревшие или опасно неточные рекомендации."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать квадроциклы вместе с дорожными мотоциклами?",
            "answer": "Можно представить их в общем каталоге, но назначения и применимые категории различаются. Данные о правовом режиме нужно проверять для конкретной модели."
          },
          {
            "question": "Достаточно ли указать кубатуру двигателя для новичка?",
            "answer": "Нет. Масса, посадочная высота, характер эксплуатации и технические параметры важны для сопоставимого описания модели."
          },
          {
            "question": "Можно ли обещать тест-драйв каждой модели?",
            "answer": "Только когда конкретный дилер действительно предоставляет такую услугу на опубликованных условиях и для доступной техники."
          },
          {
            "question": "Как учитывать сервис и гарантию?",
            "answer": "Отдельно указывать подтвержденные сервисные точки, условия и ограничения на дату проверки, без универсальных обещаний."
          },
          {
            "question": "Сколько стоит GEO для мотодилера?",
            "answer": "Действуют общие тарифы GAEO. Объем зависит от числа моделей, салонов, сервисных направлений и исходных запросов."
          }
        ],
        "ctaTitle": "Узнать, каких мотодилеров нейросети рекомендуют покупателям",
        "ctaText": "Пришли сайт салона, перечень моделей, города продаж и сервисные условия. Предложу стартовый набор запросов для аудита.",
        "request": "GEO для дилера мототехники: модели, назначения, категории, наличие, тест-драйв, сервис и BMR."
      },
      "en": {
        "title": "GEO for motorcycle and powersports dealers in AI | GAEO.ru",
        "h1": "GEO for motorcycle and powersports dealers",
        "description": "Motorcycle dealer GEO: road bikes, scooters, enduro use cases, model fit, availability, test rides, servicing, documentation and BMR measurement.",
        "eyebrow": "Automotive / Motorcycle and powersports dealers",
        "lead": "A rider may choose a motorcycle based on height, riding experience, intended route and nearby service support. I examine which dealers AI recommends for these scenarios, and whether the answers reflect real models, stock availability, purchase terms and maintenance options.",
        "heroPoints": [
          "Buyer prompts for novice, city and touring motorcycle use cases",
          "Clear separation of road bikes, enduro and off-road machines",
          "Confirmed availability, test-ride terms and after-sales coverage"
        ],
        "problemTitle": "Why a motorcycle dealer may be absent from a relevant shortlist",
        "problemIntro": "A generic motorcycle-for-everyone claim hides important differences. New riders need model fit and service facts; experienced customers need application, configuration and actual dealer availability.",
        "problems": [
          {
            "title": "Different vehicles are lumped together",
            "body": "Road motorcycles, scooters, enduro, pit bikes and quadricycles must not be assumed to share the same operating or legal category."
          },
          {
            "title": "Fit and experience are ignored",
            "body": "Engine displacement alone does not establish weight, seat height, intended use or suitability for a particular rider."
          },
          {
            "title": "Stock and servicing are ambiguous",
            "body": "A listed model, available test ride, warranty service and local handover each require separate verification."
          }
        ],
        "scenarioTitle": "How customers ask AI about powered two-wheelers",
        "scenarioIntro": "These are sample prompts for a future measurement, not previously observed AI replies. Actual stock, models and competitors are defined with the dealer.",
        "columns": [
          "Buyer question",
          "What to substantiate",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which lightweight city motorcycle should a beginner compare locally?",
            "Actual model, weight, seat height, intended use and local offers",
            "Organise verified fit-related details without unsupported safety promises"
          ],
          [
            "Where can I buy a touring motorcycle with nearby service?",
            "Model and trim, authorised support, coverage area and delivery",
            "Separate sales location from real servicing coverage"
          ],
          [
            "How do enduro models differ from off-road competition machines?",
            "Intended use, applicable vehicle categories, registration and documents",
            "Describe differences without treating all variants as road legal"
          ],
          [
            "Which dealer has this model available for a test ride?",
            "Live local stock, actual test-ride policy, conditions and slots",
            "Publish correct availability and constraints"
          ]
        ],
        "proofTitle": "What a powersports dealer must substantiate",
        "proofIntro": "TR CU 018/2011 covers designated L-category road vehicles, but its scope should not automatically be assigned to every off-road machine. Relevant electronic passport and sale requirements must be checked per model and jurisdiction. A regulation does not certify a particular dealer.",
        "checks": [
          "Model and variant, weight, seat height, intended use, equipment and current availability",
          "Vehicle classification and applicable documents, including electronic passport records where required",
          "Local store and servicing locations, real test-ride terms, warranty conditions and attributable evidence"
        ],
        "proofNote": "The prompt examples are not rider licensing or vehicle safety advice. No measured GAEO BMR improvements for motorcycle dealers are asserted.",
        "workTitle": "How I would organise motorcycle-dealer GEO",
        "workIntro": "Separate beginner choices, commuting, touring, off-road use and after-sales support before checking specific product facts.",
        "steps": [
          {
            "title": "Baseline rider prompts",
            "body": "Collect non-brand questions by purpose, experience, fit, budget, geography and stock."
          },
          {
            "title": "Verify real model offers",
            "body": "Check variants, documentation, local inventory, test-ride rules and servicing."
          },
          {
            "title": "Create useful source pages",
            "body": "Brief model descriptions, comparisons by intended use, FAQs and attributable dealer evidence."
          },
          {
            "title": "Measure again",
            "body": "Repeat BMR prompts and flag stale or materially incorrect motorcycle recommendations."
          }
        ],
        "faq": [
          {
            "question": "Can quad bikes and road motorcycles share a catalogue?",
            "answer": "Yes as commercial categories, but their uses and applicable regulatory regimes should be described separately for each model."
          },
          {
            "question": "Is engine capacity enough to compare beginner bikes?",
            "answer": "No. Mass, seat height, intended operation and technical characteristics also matter."
          },
          {
            "question": "Can every model be advertised with a test ride?",
            "answer": "Only where the dealer offers a test ride for that vehicle under confirmed current terms."
          },
          {
            "question": "How should warranty and servicing be shown?",
            "answer": "List real servicing locations, coverage terms and limitations with dates, rather than universal claims."
          },
          {
            "question": "What does GAEO charge motorcycle dealers?",
            "answer": "The standard published GAEO plans apply. Scope depends on models, locations, service offerings and baseline query coverage."
          }
        ],
        "ctaTitle": "See which motorcycle dealers AI recommends to your buyers",
        "ctaText": "Share your dealer site, stock ranges, locations and service terms. I will outline a suitable baseline query set.",
        "request": "Motorcycle dealer GEO: models, use cases, vehicle categories, availability, test rides, service and BMR."
      }
    }
  }
];
