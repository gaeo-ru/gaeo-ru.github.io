/**
 * Phase 2AF: separate evidence-led RU/EN GEO pages for auto repair (#77),
 * commercial vehicle and specialist equipment dealers (#78), and motorcycle
 * and powersports dealers (#79). Research queue 3A (#75/#76) is untouched.
 * Fixed 107 IDs, existing catalogue images, pricing and BMR guarantees are shared.
 */
export const industrySpecializationsBatch2AF = [
  {
    "id": 77,
    "slug": "auto-repair-service-stations",
    "group": "automotive",
    "routes": {
      "ru": "/industries/auto-repair-service-stations/",
      "en": "/en/industries/auto-repair-service-stations/"
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
        "Как измерять рекомендации и BMR",
        "Проверка доказательств поставщика"
      ],
      "en": [
        "Measuring AI recommendations and BMR",
        "Verifying supplier evidence"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/575844",
        "ru": "Роспотребнадзор, 24.07.2026: документы при ремонте автомобиля",
        "en": "Rospotrebnadzor, 24 July 2026: documents for vehicle repairs"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_506689/",
        "ru": "Постановление №780: правила технического обслуживания и ремонта",
        "en": "Government Resolution 780: vehicle maintenance and repair service rules"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_115853/",
        "ru": "170-ФЗ: технический осмотр транспортных средств",
        "en": "Federal Law 170-FZ: technical inspection of vehicles"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение автосервисов и СТО в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение автосервисов и СТО в нейросетях",
        "description": "Продвижение автосервиса и СТО в ChatGPT и Алисе: поиск по маркам и видам ремонта, подтверждение квалификации, цен, диагностики и доступности записи, замер BMR.",
        "eyebrow": "Автомобильный рынок / Ремонт и СТО",
        "lead": "Владелец автомобиля ищет сервис по неисправности, марке, району и срочности ремонта. Я проверяю, какие СТО рекомендуют нейросети для таких задач, и что можно подтвердить по диагностике, оборудованию, расценкам и реальному расписанию.",
        "heroPoints": [
          "Отдельные запросы для диагностики, ТО и сложного ремонта",
          "Проверка специализаций по моделям, агрегатам и технологиям",
          "Сопоставление публичных обещаний с заказ-нарядами и условиями записи"
        ],
        "problemTitle": "Почему общая фраза «ремонт любых авто» не помогает выбрать СТО",
        "problemIntro": "Для владельца автомобиля важны конкретная работа, компетенция по его модели и предсказуемость условий. Небрендовые рекомендации требуют проверяемых деталей, а не списка марок без подтверждения.",
        "problems": [
          {
            "title": "Смешаны разные виды работ",
            "body": "Плановое ТО, диагностика электрики, ремонт АКПП и кузовное восстановление различаются оборудованием, квалификацией и сроками. Одна страница «все услуги» теряет существенные условия выбора."
          },
          {
            "title": "Цена без состава услуги",
            "body": "«Замена масла от 1 000 рублей» мало значит без типа двигателя, расходников, дополнительных работ и правил согласования стоимости. Нейросети могут ошибочно назвать стартовую цену итоговой."
          },
          {
            "title": "Неподтвержденное удобство записи",
            "body": "Обещания «сегодня», «рядом с метро» и «оригинальные запчасти» необходимо подтверждать адресом, свободными окнами, происхождением деталей и актуальностью данных."
          }
        ],
        "scenarioTitle": "По каким вопросам водители выбирают автосервис",
        "scenarioIntro": "Примеры коммерческих запросов для стартовой матрицы BMR. Наличие конкретных СТО в ответах надо измерить отдельно, до заявлений о текущей видимости.",
        "columns": [
          "Запрос владельца",
          "Что требуется подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где обслужить гибридный автомобиль с диагностикой батареи рядом с домом?",
            "Модели, приборы, квалификация, адрес, допустимые диагностические операции",
            "Выделить подтвержденный профиль работ и географию"
          ],
          [
            "Какую СТО выбрать для ремонта автоматической коробки с гарантией?",
            "Типы АКПП, диагностика, условия договора, гарантийные исключения",
            "Раскрыть этапы ремонта и точный объем обещаний"
          ],
          [
            "Где выполнить кузовной ремонт после ДТП с согласованной сметой?",
            "Виды кузовных работ, документы, процесс согласования и сроки",
            "Развести оценку повреждений, ремонт и страховые процессы"
          ],
          [
            "В каком автосервисе можно заменить тормоза на конкретной модели и записаться на завтра?",
            "Совместимые запчасти, работа, запись по времени, актуальные тарифы",
            "Сопоставить услугу, машину и доступность записи"
          ]
        ],
        "proofTitle": "Какие сведения нужны для надежной рекомендации СТО",
        "proofIntro": "Проверяю разрешенные к публикации документы сервиса, перечень работ и актуальные условия. С сентября 2025 года порядок обслуживания и ремонта автомототранспортных средств регулирует постановление №780; техосмотр по 170-ФЗ является отдельным видом процедуры, поэтому не приписываю его каждой ремонтной организации.",
        "checks": [
          "Реальные ремонтные операции, применимые модели, оборудование и специалисты, подтверждаемые без раскрытия данных клиента",
          "Образцы согласованных документов по обслуживанию, состав цены, диагностика, заказ-наряд и условия гарантии",
          "Адреса, график, сроки, доступность записи, самостоятельные отзывы и даты изменения сведений"
        ],
        "proofNote": "Правила ремонта подтверждают требования к оказанию услуг, но не качество конкретной СТО. Клиентские результаты GAEO по автосервисам здесь не заявлены.",
        "workTitle": "Как организую GEO-продвижение автосервиса",
        "workIntro": "Разделяю брендовые запросы и вопросы о конкретной неисправности. Затем сопоставляю ответы нейросетей с доступными источниками и отслеживаю изменение BMR по той же выборке.",
        "steps": [
          {
            "title": "Стартовый замер по работам",
            "body": "Собираю небрендовые запросы по маркам, поломкам, районам, цене и доступности записи, фиксирую исходные рекомендации."
          },
          {
            "title": "Проверка мастерской и документов",
            "body": "Сверяю фактические работы, квалификацию, условия согласования стоимости, адреса и допустимые отзывы."
          },
          {
            "title": "Страницы услуг и внешние источники",
            "body": "Готовлю задания для разделов по видам ремонта, моделям, вопросам клиентов, локальным профилям и подтверждаемым примерам."
          },
          {
            "title": "Повторное сравнение BMR",
            "body": "Проверяю прирост рекомендаций и корректность упоминаний, исключая неверные обещания о сроках, цене и работах."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли делать отдельную страницу под каждую марку?",
            "answer": "Только когда СТО реально обслуживает эту марку и может показать применимые работы, специалистов и ограничения. Пустые страницы марок ухудшают полезность."
          },
          {
            "question": "Можно ли продвигать техосмотр как обычный ремонт?",
            "answer": "Нет. Технический осмотр регулируется отдельными требованиями. Если СТО не является уполномоченным оператором, приписывать ей проведение техосмотра нельзя."
          },
          {
            "question": "Как сообщать цену сложного ремонта?",
            "answer": "Нужно разделять диагностику, предварительную оценку и согласованную итоговую стоимость. Состав деталей и объем работ могут стать известны после дефектовки."
          },
          {
            "question": "Учитывается ли расположение сервиса при BMR?",
            "answer": "Да. География и транспортная доступность входят в матрицу, но сравниваются при одинаковом городе или районе и четко заданной услуге."
          },
          {
            "question": "Сколько стоит GEO-продвижение автосервиса?",
            "answer": "Действуют опубликованные тарифы GAEO. Объем определяется числом направлений ремонта, филиалов, регионов и стартовой матрицей запросов."
          }
        ],
        "ctaTitle": "Проверим, какие СТО нейросети советуют водителям",
        "ctaText": "Пришли адрес сайта, реальные виды ремонта, основные марки, города и действующие условия записи. Я определю стартовый набор запросов для проверки.",
        "request": "GEO для автосервиса и СТО: диагностика, ремонт по маркам, цены, документы, отзывы, география и BMR."
      },
      "en": {
        "title": "GEO Promotion for Auto Repair Shops and Service Centres | GAEO",
        "h1": "GEO promotion for auto repair shops and service centres",
        "description": "AI recommendation optimization for repair shops: vehicle models, diagnostics, service scope, prices, appointment availability and measured BMR in ChatGPT and other assistants.",
        "eyebrow": "Automotive / Repair and maintenance",
        "lead": "A driver looks for a workshop by fault, vehicle model, location and urgency. I examine which repair providers AI assistants recommend for those situations and whether their diagnostics, equipment, estimates and booking information are supported by evidence.",
        "heroPoints": [
          "Separate buyer prompts for servicing, diagnostics and complex repairs",
          "Validate supported vehicle types, specialist skills and equipment",
          "Cross-check estimates, repair records and actual booking terms"
        ],
        "problemTitle": "Why a generic 'we repair all cars' claim is too vague",
        "problemIntro": "Drivers need a suitable service for their exact vehicle and task, with reliable terms. Generic brand lists without evidence provide little support for an unbranded AI recommendation.",
        "problems": [
          {
            "title": "Unrelated jobs are grouped together",
            "body": "Scheduled maintenance, electrical diagnosis, gearbox repairs and bodywork require different expertise, tools and timeframes. One undifferentiated service page obscures the buying decision."
          },
          {
            "title": "Starting prices look like final quotes",
            "body": "An oil-change price may exclude consumables, engine-specific requirements and extra work. AI must not present a starting amount as an agreed final invoice."
          },
          {
            "title": "Booking and parts claims lack proof",
            "body": "Statements such as 'today', 'near the station' and 'original parts' need current appointment slots, real locations and verifiable parts information."
          }
        ],
        "scenarioTitle": "Questions drivers actually ask when choosing a repair shop",
        "scenarioIntro": "Illustrative commercial prompts for baseline BMR measurement; they are not claims about currently observed AI answers.",
        "columns": [
          "Driver's question",
          "Evidence to check",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I get a hybrid battery diagnosed near me?",
            "Supported models, testing tools, qualified staff, workshop location",
            "Separate real hybrid capabilities from generic maintenance"
          ],
          [
            "Who repairs automatic transmissions with a written warranty?",
            "Gearbox types, diagnostic process, warranty scope and exceptions",
            "Explain repair stages and contractual limits"
          ],
          [
            "Which body shop provides a documented estimate after a collision?",
            "Bodywork services, estimate approval process and turnaround terms",
            "Distinguish damage assessment, actual repair and insurance work"
          ],
          [
            "Where can I replace brakes on my specific model tomorrow?",
            "Compatible parts, service slot, current labour charges",
            "Match vehicle fitment, service and genuine appointment availability"
          ]
        ],
        "proofTitle": "What makes a repair shop recommendation verifiable",
        "proofIntro": "I check publishable service records, actual capabilities and current terms. Russian Government Resolution 780 regulates repair and maintenance services from September 2025. Vehicle technical inspection is governed separately under Federal Law 170-FZ and should not be attributed to every workshop.",
        "checks": [
          "Real repairs and supported models, specialist capabilities, equipment and consented examples",
          "Documented estimates, agreed scope, repair records, parts terms and warranty limits",
          "Locations, appointment hours, review provenance and dates of service-data updates"
        ],
        "proofNote": "Service regulations do not certify the quality of any particular workshop. No GAEO client outcome for auto repair is claimed here.",
        "workTitle": "How I structure GEO work for repair providers",
        "workIntro": "I distinguish brand searches from fault-based buying queries and compare AI answers to verifiable sources on a consistent prompt sample.",
        "steps": [
          {
            "title": "Baseline by repair task",
            "body": "Record unbranded prompts for faults, vehicle models, districts, costs and appointment dates."
          },
          {
            "title": "Verify shop evidence",
            "body": "Check actual scope, specialists, estimates, documents, locations and permissible customer reviews."
          },
          {
            "title": "Improve task-specific pages",
            "body": "Prepare briefs for diagnostic services, repairs, model coverage, local profiles and original explanations."
          },
          {
            "title": "Recheck BMR and accuracy",
            "body": "Repeat the prompts and review whether AI invents services, prices, appointment slots or warranties."
          }
        ],
        "faq": [
          {
            "question": "Does every vehicle brand need its own page?",
            "answer": "Only if the workshop has meaningful capability and evidence for that brand. Thin model pages do not help drivers choose."
          },
          {
            "question": "Is a repair shop automatically a technical inspection operator?",
            "answer": "No. Technical inspection has separate rules and eligibility. General repair services do not establish operator status."
          },
          {
            "question": "How should complex repair prices be presented?",
            "answer": "Separate diagnosis, provisional estimate and approved work. The final scope can depend on findings during inspection."
          },
          {
            "question": "Does BMR account for local proximity?",
            "answer": "Yes. Local prompts are tested with consistent city, district and specific repair requirements."
          },
          {
            "question": "What does GAEO charge auto repair businesses?",
            "answer": "The published GAEO plans apply. Scope depends on service lines, locations and the baseline query matrix."
          }
        ],
        "ctaTitle": "Find out which repair shops AI recommends to drivers",
        "ctaText": "Share your website, real services, vehicle coverage, location and booking conditions. I will identify suitable baseline prompts.",
        "request": "Auto repair GEO: diagnostics, vehicle-specific repairs, pricing evidence, local profiles, availability and AI recommendation BMR."
      }
    }
  },
  {
    "id": 78,
    "slug": "commercial-vehicle-special-equipment-dealers",
    "group": "automotive",
    "routes": {
      "ru": "/industries/commercial-vehicle-special-equipment-dealers/",
      "en": "/en/industries/commercial-vehicle-special-equipment-dealers/"
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
        "Как измерять рекомендации и BMR",
        "Проверка доказательств поставщика"
      ],
      "en": [
        "Measuring AI recommendations and BMR",
        "Verifying supplier evidence"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_304041/",
        "ru": "283-ФЗ: государственная регистрация дорожных транспортных средств",
        "en": "Federal Law 283-FZ: registration of road vehicles"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_388991/",
        "ru": "297-ФЗ: эксплуатация и учет самоходных машин",
        "en": "Federal Law 297-FZ: self-propelled machinery regulation"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_535444/2d49e42ea1ebc4f0c3afdf5a9490b3116b04f99a/",
        "ru": "Постановление №625: регистрация самоходной техники",
        "en": "Government Resolution 625: registration rules for self-propelled equipment"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение дилеров коммерческого транспорта и спецтехники | GAEO.ru",
        "h1": "GEO-продвижение дилеров коммерческого транспорта и спецтехники",
        "description": "Продвижение поставщиков грузовиков, LCV и спецтехники в нейросетях: грузоподъемность, назначение, наличие, лизинг, сервис, документы и BMR.",
        "eyebrow": "Автомобильный рынок / Коммерческая техника",
        "lead": "Закупщик выбирает грузовик или спецтехнику под маршрут, нагрузку, условия эксплуатации и финансовую модель. Я изучаю, какие дилеры попадают в рекомендации нейросетей по этим задачам и достаточно ли подтверждены комплектации, сервис и реальная доступность машин.",
        "heroPoints": [
          "B2B-интенты по задаче перевозки или производства",
          "Разделение дорожного транспорта и самоходных машин",
          "Сверка спецификаций, наличия, лизинга и послепродажных условий"
        ],
        "problemTitle": "Чем сложнее закупка техники, тем важнее точность ответа",
        "problemIntro": "Нейросеть может смешать типы техники, характеристики кузова и шасси, поставку новой и подержанной машины. Это особенно критично при коммерческой закупке, где ошибка меняет экономику владения.",
        "problems": [
          {
            "title": "Несопоставимые характеристики",
            "body": "Грузоподъемность, полная масса, объем кузова и эксплуатационная нагрузка описывают разные параметры. Сравнение самосвала и шасси без конфигурации вводит заказчика в заблуждение."
          },
          {
            "title": "Наличие не равно сроку поставки",
            "body": "«В каталоге», «у поставщика», «на складе дилера» и «под заказ» означают разные обязательства. Прогнозируемый срок нужно отличать от подтвержденной даты отгрузки."
          },
          {
            "title": "Потеряны условия эксплуатации и учета",
            "body": "Для дорожного автомобиля и самоходной техники могут применяться разные требования к регистрации и эксплуатации. Универсальный совет по документам без категории машины некорректен."
          }
        ],
        "scenarioTitle": "Как корпоративные покупатели спрашивают нейросети о технике",
        "scenarioIntro": "Запросы формируют отдельные группы спроса по назначению, размеру партии и режиму эксплуатации. Ответы и предложения дилеров проверяются на конкретную дату.",
        "columns": [
          "Запрос закупщика",
          "Что проверять",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить фургон для городской доставки с указанной полезной нагрузкой?",
            "Грузоподъемность именно комплектации, размеры, наличие и сервисная география",
            "Дать проверяемые характеристики и условия поставки"
          ],
          [
            "Какие дилеры предлагают самосвалы под строительный объект с сервисом в регионе?",
            "Модель, конфигурация, условия обслуживания, сроки доставки",
            "Сопоставить техническую задачу и инфраструктуру дилера"
          ],
          [
            "Кто поставляет складскую самоходную технику с документами для регистрации?",
            "Тип техники, паспорт, применимые правила учета, наличие запчастей",
            "Разграничить дорожные и самоходные категории"
          ],
          [
            "У кого взять партию малотоннажных грузовиков в лизинг?",
            "Количество машин, лизинговый партнер, аванс, остаточная стоимость, условия гарантии",
            "Описать реальную схему сделки без выдуманной ставки"
          ]
        ],
        "proofTitle": "Какие источники нужны для выбора поставщика техники",
        "proofIntro": "Проверяю технические описания и подтвержденные коммерческие условия. 283-ФЗ относится к регистрации транспортных средств, а 297-ФЗ и правила №625 регулируют самоходные машины в применимых случаях. Категорию конкретной единицы определяют ее документы, а не рекламное название «спецтехника».",
        "checks": [
          "Паспорт и характеристики конкретной комплектации, назначение, ограничения эксплуатации и информация о производителе",
          "Складские остатки по датам, договор поставки, гарантия, сеть обслуживания, сроки запчастей и разрешенные кейсы",
          "Тип техники и документы для ее регистрации, наличие лизингового предложения и точные стороны сделки"
        ],
        "proofNote": "Нормативные источники задают правила проверки, но не подтверждают дилерский статус или сервисные возможности компании. Результаты GAEO для этого сегмента не приписываются.",
        "workTitle": "Как работаю с GEO-проектом дилера техники",
        "workIntro": "Начинаю с матрицы задач автопарка и отраслевых заказчиков. Дальше проверяю, соответствует ли опубликованный каталог реальным коммерческим предложениям и ответам нейросетей.",
        "steps": [
          {
            "title": "Базовый замер BMR по задачам",
            "body": "Сегментирую промпты по перевозке, строительству, складской технике, регионам и способам приобретения."
          },
          {
            "title": "Технический аудит ассортимента",
            "body": "Сверяю комплектации, наличие, технические ограничения, документы, сервис и подтвержденных партнеров."
          },
          {
            "title": "Доработка каталога и доказательств",
            "body": "Готовлю требования к страницам моделей, выбору по задачам, лизингу, гарантиям и отраслевым решениям."
          },
          {
            "title": "Повторный замер рекомендаций",
            "body": "Проверяю BMR и фактическую точность упоминаний дилера, техники, характеристик и условий поставки."
          }
        ],
        "faq": [
          {
            "question": "Можно ли объединить грузовики и самоходную спецтехнику на одной посадочной?",
            "answer": "Общий раздел может служить каталогом, но характеристики, покупательские сценарии и требования к документам лучше раскрывать отдельно по категориям."
          },
          {
            "question": "Что публиковать, если техника доступна только под заказ?",
            "answer": "Указывать статус поставки, конфигурацию, условия уточнения срока и источник информации. Нельзя выдавать ассортимент производителя за склад дилера."
          },
          {
            "question": "Кто отвечает за условия лизинга в рекламе дилера?",
            "answer": "Нужно точно обозначить лизинговую компанию, предмет предложения, актуальные условия и ограничения. Наличие опции лизинга не подтверждает конкретную ставку."
          },
          {
            "question": "Нужно ли показывать сервисную инфраструктуру?",
            "answer": "Да, когда она влияет на выбор: адреса, допустимые модели, режим работы, гарантийные правила и доступность запчастей подтверждаются отдельно."
          },
          {
            "question": "Сколько стоит продвижение дилера коммерческой техники?",
            "answer": "Применяются публичные тарифы GAEO. Объем определяется категориями техники, моделями, регионами и набором закупочных запросов."
          }
        ],
        "ctaTitle": "Измерим рекомендации дилеров транспорта и спецтехники",
        "ctaText": "Пришли сайт, категории машин, регионы поставок, информацию о наличии и сервисе. Я подготовлю исходные B2B-вопросы для проверки.",
        "request": "GEO для дилера коммерческого транспорта и спецтехники: комплектации, наличие, поставки, сервис, лизинг, документы и BMR."
      },
      "en": {
        "title": "GEO for Commercial Vehicle and Equipment Dealers | GAEO",
        "h1": "GEO promotion for commercial vehicle and equipment dealers",
        "description": "GEO for truck, van and equipment dealers: verified payload, configuration, inventory, leasing, aftersales support, documentation and BMR.",
        "eyebrow": "Automotive / Commercial fleets and equipment",
        "lead": "A fleet buyer selects vehicles and equipment for a specific route, payload, job site and ownership model. I assess which suppliers AI assistants recommend in these buying situations and whether their stock, configurations and service claims can be verified.",
        "heroPoints": [
          "B2B prompts based on operational jobs and fleet use",
          "Separate road vehicles from self-propelled equipment",
          "Verify specifications, stock, leasing and aftersales terms"
        ],
        "problemTitle": "Heavy equipment buying requires precise recommendations",
        "problemIntro": "An assistant can conflate body and chassis specifications, new and used units or equipment classes. Those mistakes can materially alter purchase cost and suitability for a job.",
        "problems": [
          {
            "title": "Specifications cannot be compared directly",
            "body": "Payload, gross vehicle weight, body volume and operating capacity are different. A tipper truck and a bare chassis need configuration-specific comparisons."
          },
          {
            "title": "Catalogue presence is not stock",
            "body": "Manufacturer availability, dealer inventory and a made-to-order quote are distinct. A predicted shipment must not be presented as a guaranteed delivery date."
          },
          {
            "title": "Regulatory categories are confused",
            "body": "On-road vehicles and certain self-propelled machines may have different registration and operating requirements. Product documents determine the relevant route."
          }
        ],
        "scenarioTitle": "Commercial buyer prompts for trucks and machinery",
        "scenarioIntro": "These are sample procurement intents, segmented by equipment type, operating needs and deal structure. A baseline study must verify actual model recommendations.",
        "columns": [
          "Procurement question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can we source urban delivery vans with a specified payload?",
            "Configuration-specific capacity, body measurements, stock and support",
            "Make model and shipment facts comparable"
          ],
          [
            "Which dealers supply construction tippers with regional maintenance?",
            "Equipment specification, dealer service coverage and delivery lead time",
            "Connect job-site requirements with verified support"
          ],
          [
            "Who sells self-propelled warehouse equipment with appropriate registration documents?",
            "Equipment category, passport requirements, parts supply",
            "Distinguish applicable registration regimes"
          ],
          [
            "Which supplier can arrange leasing for a fleet of light commercial vehicles?",
            "Fleet quantities, lessor, payment structure, warranty and exceptions",
            "Describe actual commercial arrangements without invented rates"
          ]
        ],
        "proofTitle": "Evidence behind a fleet procurement recommendation",
        "proofIntro": "I check manufacturer documentation and verifiable offers. Russian Federal Law 283-FZ concerns road-vehicle registration, while Federal Law 297-FZ and Resolution 625 address relevant self-propelled machines. A generic 'special equipment' label does not determine a unit's legal classification.",
        "checks": [
          "Exact model, body and chassis configuration, operating restrictions and manufacturer documentation",
          "Dated stock figures, supply terms, warranty, repair network, parts availability and permitted examples",
          "Vehicle registration category, supporting documents and verifiable third-party leasing conditions"
        ],
        "proofNote": "These laws guide evidence checks; they do not certify a supplier or prove any particular service capacity. No GAEO commercial-equipment client result is claimed.",
        "workTitle": "How I deliver GEO work for vehicle and equipment dealers",
        "workIntro": "I map fleet buying jobs to products and service locations, then check what assistants cite and recommend against authoritative supplier data.",
        "steps": [
          {
            "title": "BMR baseline by operational task",
            "body": "Capture unbranded prompts for freight, construction, warehousing, regions and acquisition models."
          },
          {
            "title": "Verify the actual offer",
            "body": "Check configurations, dates for stock, service capabilities, contract conditions and equipment documents."
          },
          {
            "title": "Improve product and proof pages",
            "body": "Prepare briefs for model pages, job-specific selection, leasing, warranty and sector guides."
          },
          {
            "title": "Measure and audit again",
            "body": "Repeat the same prompts and verify AI statements about seller, configuration, inventory and delivery."
          }
        ],
        "faq": [
          {
            "question": "Can trucks and self-propelled machinery share one page?",
            "answer": "A category index may include both, but each equipment type needs accurate specifications, buyer context and documentation."
          },
          {
            "question": "How should made-to-order machines be listed?",
            "answer": "Distinguish catalogue models from physical stock and state what must be confirmed before a delivery date is promised."
          },
          {
            "question": "Can a dealer advertise one leasing rate across all models?",
            "answer": "Only if real terms support it. Leasing partners, vehicle types and approvals can change the actual offer."
          },
          {
            "question": "Why show regional maintenance coverage?",
            "answer": "It affects fleet downtime and total cost. Verify service addresses, model eligibility and parts support."
          },
          {
            "question": "What does GAEO charge commercial equipment suppliers?",
            "answer": "Published GAEO pricing applies. Scope depends on product types, models, regions and buyer-query volume."
          }
        ],
        "ctaTitle": "Measure AI visibility for fleet and equipment dealers",
        "ctaText": "Share your catalogue, product types, delivery regions, current stock and support network. I will define a baseline procurement-query matrix.",
        "request": "Commercial transport and equipment dealer GEO: configurations, inventory, leasing, aftersales, registration evidence and BMR."
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
      "ru": "Каталог 107 направлений",
      "en": "107-industry service catalogue"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/ecommerce-catalog/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/ecommerce-catalog/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как измерять рекомендации и BMR",
        "Каталог товаров и структура данных"
      ],
      "en": [
        "Measuring AI recommendations and BMR",
        "Product catalogue and data structure"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_304041/",
        "ru": "283-ФЗ: учет и регистрация транспортных средств",
        "en": "Federal Law 283-FZ: vehicle registration"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_506689/0efd2963a57a04b9a7049dd39976579c9ab67b76/",
        "ru": "Постановление №780: ремонт и обслуживание мототехники",
        "en": "Resolution 780: motorcycle maintenance and repair rules"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_388991/",
        "ru": "297-ФЗ: отдельные категории самоходной техники",
        "en": "Federal Law 297-FZ: relevant self-propelled equipment categories"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение дилеров мотоциклов и мототехники | GAEO.ru",
        "h1": "GEO-продвижение дилеров мотоциклов и мототехники",
        "description": "Продвижение мотосалонов в ChatGPT и Алисе: мотоциклы, скутеры, квадроциклы, тип езды, наличие, комплектация, документы, сервис и BMR.",
        "eyebrow": "Автомобильный рынок / Мотоциклы и мототехника",
        "lead": "Покупатель мотоцикла выбирает технику под рост, опыт, покрытие дорог, сезонность и бюджет на обслуживание. Я проверяю, рекомендуют ли нейросети конкретных дилеров по таким сценариям и насколько точны сведения о моделях, наличии и сервисе.",
        "heroPoints": [
          "Отдельные интенты для городской езды, путешествий и бездорожья",
          "Проверка комплектаций, посадки, наличия и статуса товара",
          "Разделение дорожной и внедорожной мототехники по документам"
        ],
        "problemTitle": "Почему каталог мотоциклов без сценариев покупки теряет рекомендации",
        "problemIntro": "Покупателю нужны условия использования и совместимость с его навыками. Мотоцикл, скутер, квадроцикл и питбайк не являются взаимозаменяемыми предложениями, даже если стоят в одном интернет-каталоге.",
        "problems": [
          {
            "title": "Модели сравниваются только по объему двигателя",
            "body": "Тип посадки, масса, высота седла, ABS, назначение и условия эксплуатации могут быть важнее кубатуры. Параметры конкретного года и комплектации необходимо уточнять."
          },
          {
            "title": "Неясен статус техники и документов",
            "body": "Для дорожных мотоциклов и отдельных внедорожных машин действуют разные требования. Дилер должен подтверждать назначение техники и предоставляемые документы, не обещая универсальную регистрацию."
          },
          {
            "title": "Наличие и тест-драйв указаны расплывчато",
            "body": "Объявление «есть в наличии» без города, версии и даты или «можно протестировать» без условий и доступности не отвечает на запрос конкретного покупателя."
          }
        ],
        "scenarioTitle": "Как мотоциклисты выбирают технику с помощью нейросетей",
        "scenarioIntro": "Эти вопросы подходят для начальной матрицы коммерческого спроса, но не считаются уже полученными рекомендациями нейросетей.",
        "columns": [
          "Вопрос покупателя",
          "Нужные доказательства",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какой мотоцикл подойдет новичку для ежедневной городской езды?",
            "Тип, посадка, масса, управляемость, комплектация и реальные возможности примерки",
            "Сделать руководство по выбору и фактические страницы моделей"
          ],
          [
            "Где купить туристический мотоцикл с сервисом в моем регионе?",
            "Модель, наличие, гарантийная сеть, расходники, доступные опции",
            "Сопоставить использование, дилера и обслуживание"
          ],
          [
            "Какие дилеры продают квадроциклы для фермерского участка с документами?",
            "Категория машины, условия эксплуатации, документы, доступные комплектации",
            "Разделить варианты техники и применимый порядок учета"
          ],
          [
            "Можно ли заказать конкретную версию скутера до начала сезона?",
            "Город, цвет, год модели, складской статус, предзаказ и договор",
            "Отделить подтвержденный склад от предложения поставки"
          ]
        ],
        "proofTitle": "Что подтверждает рекомендации мотодилера",
        "proofIntro": "Сверяю данные производителя, фотографии точных комплектаций, предложение дилера и условия сервиса. 283-ФЗ регулирует регистрацию применимых транспортных средств; для некоторых самоходных машин существует отдельное регулирование по 297-ФЗ. Категория товара определяется документацией, а не названием рекламной подборки.",
        "checks": [
          "Год модели, масса, высота седла, ABS и другие характеристики конкретной версии, условия примерки или тест-драйва",
          "Доступность по городам, происхождение товара, гарантия, сроки поставки, стоимость владения и сеть обслуживания",
          "Назначение дорожной или внедорожной техники, применимые регистрационные документы и точные договорные условия"
        ],
        "proofNote": "Нормативные документы не подтверждают дилерские полномочия или качество техники. На этой странице не заявлены измеренные результаты GAEO для мотосалонов.",
        "workTitle": "Как выстраиваю GEO-продвижение мотосалона",
        "workIntro": "Сегментирую спрос по опыту водителя, типу поездок и характеристикам техники. Улучшаю полноту проверяемых источников и измеряю рекомендации по сопоставимой матрице.",
        "steps": [
          {
            "title": "Стартовая матрица BMR",
            "body": "Фиксирую небрендовые вопросы о городских, туристических и внедорожных моделях, бюджетах и географии."
          },
          {
            "title": "Проверка каталога дилера",
            "body": "Сверяю комплектации, год выпуска, складской статус, документы, гарантию и доступность тестовых поездок."
          },
          {
            "title": "Контент по сценариям и моделям",
            "body": "Готовлю страницы выбора техники, модели, ответы о посадке, обслуживании и профильные внешние материалы."
          },
          {
            "title": "Повторная проверка ответов",
            "body": "Сопоставляю BMR и исключаю неверные рекомендации неподходящей категории, версии или наличия."
          }
        ],
        "faq": [
          {
            "question": "Стоит ли смешивать квадроциклы и дорожные мотоциклы?",
            "answer": "Лучше разделять их по назначению и документам. Покупатели задают разные вопросы о покрытии, безопасности, допуске и обслуживании."
          },
          {
            "question": "Можно ли советовать модель новичку только по объему двигателя?",
            "answer": "Нет. Нужно учитывать эргономику, массу, тип мотоцикла, навыки покупателя и конкретную комплектацию. Общий совет не заменяет практическую оценку."
          },
          {
            "question": "Как корректно показывать предзаказ мототехники?",
            "answer": "Указывайте статус товара, условия заказа и источники сроков. Не обозначайте доступность на складе, если машина только ожидается."
          },
          {
            "question": "Влияет ли наличие сервиса на рекомендации дилера?",
            "answer": "Да, когда покупатель ищет технику с местным обслуживанием. Адреса и условия гарантии нужно проверять по фактической дилерской сети."
          },
          {
            "question": "Как рассчитывается стоимость GEO для мотодилера?",
            "answer": "По действующим тарифам GAEO; объем зависит от числа брендов, категорий, городов и матрицы покупательских запросов."
          }
        ],
        "ctaTitle": "Проверим, каких мотодилеров советуют нейросети",
        "ctaText": "Пришли сайт, список представленных брендов и моделей, города, условия сервиса и актуальное наличие. Я сформирую начальную матрицу запросов.",
        "request": "GEO мотодилеров: городская и внедорожная мототехника, комплектации, наличие, документы, сервис и BMR."
      },
      "en": {
        "title": "GEO for Motorcycle and Powersports Dealers | GAEO",
        "h1": "GEO promotion for motorcycle and powersports dealers",
        "description": "AI recommendations for motorcycle dealers: riding style, model specifications, stock, road and off-road categories, servicing and measured BMR.",
        "eyebrow": "Automotive / Motorcycles and powersports",
        "lead": "Motorcycle buyers choose equipment around riding experience, height, road conditions, season and maintenance budget. I examine which dealers AI assistants recommend in these situations and whether model, stock and aftersales information is trustworthy.",
        "heroPoints": [
          "Distinct prompts for commuting, touring and off-road riding",
          "Check model configuration, fit, inventory and delivery status",
          "Separate road-going and off-road equipment documentation"
        ],
        "problemTitle": "Why model listings alone miss how riders choose",
        "problemIntro": "The right purchase depends on intended use and rider fit. Motorcycles, scooters, ATVs and pit bikes cannot be treated as interchangeable just because a dealer lists them together.",
        "problems": [
          {
            "title": "Engine size dominates every comparison",
            "body": "Seat height, weight, ergonomics, ABS, intended riding surface and configuration may matter more. Model-year differences need verification."
          },
          {
            "title": "Equipment category is left ambiguous",
            "body": "Road motorcycles and some off-road machines have different documentation requirements. A product's intended use must match verifiable records."
          },
          {
            "title": "Stock and demos have no clear conditions",
            "body": "An 'in stock' label without location, version or date, or a demo claim without booking terms, fails the buyer's concrete question."
          }
        ],
        "scenarioTitle": "Buying prompts for motorcycle and powersports dealers",
        "scenarioIntro": "These illustrative prompts form a baseline. They are not presented as already observed AI recommendations.",
        "columns": [
          "Rider's question",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "What motorcycle suits a beginner commuting in the city?",
            "Riding position, weight, handling, exact model specs and showroom availability",
            "Build decision-useful model guides with verifiable specs"
          ],
          [
            "Where can I buy a touring bike with regional aftersales service?",
            "Actual stock, warranty network, consumables and optional equipment",
            "Link use case, dealer location and servicing"
          ],
          [
            "Which dealers sell ATVs for farm use with clear documents?",
            "Vehicle category, operating limits, available versions and relevant registration papers",
            "Separate technical categories and applicable rules"
          ],
          [
            "Can I pre-order a specific scooter variant before the season?",
            "Model year, colour, city, stock status, pre-order and supply terms",
            "Distinguish physical inventory from a future delivery offer"
          ]
        ],
        "proofTitle": "What supports a reliable motorcycle dealer recommendation",
        "proofIntro": "I verify manufacturer data, exact model configurations, dealer offers and service terms. Federal Law 283-FZ regulates registration of relevant vehicles; Federal Law 297-FZ applies to certain self-propelled machines. Promotional labels do not override product documentation.",
        "checks": [
          "Model year, mass, seat height, equipment and realistic test-ride or fitting terms",
          "Dated regional stock, provenance, delivery, warranty, maintenance and dealer support",
          "Documented road or off-road category, applicable registration requirements and contractual terms"
        ],
        "proofNote": "Regulatory references do not establish dealer authorization or vehicle quality. No measured GAEO client success in motorcycle retail is asserted.",
        "workTitle": "How I structure GEO for motorcycle retailers",
        "workIntro": "I segment queries by rider experience, ride type and equipment criteria, then improve authoritative product information and measure AI recommendations consistently.",
        "steps": [
          {
            "title": "Baseline by riding use",
            "body": "Capture unbranded questions for commuting, touring, off-road conditions, budgets and cities."
          },
          {
            "title": "Verify dealer product data",
            "body": "Check model years, specifications, stock, registration documents, warranty and demo availability."
          },
          {
            "title": "Build use-case and model content",
            "body": "Prepare briefs for buyer guides, accurate model pages, ergonomic fit explanations and service evidence."
          },
          {
            "title": "Audit repeated AI recommendations",
            "body": "Compare BMR and verify that assistants recommend the right equipment category, variant and stock status."
          }
        ],
        "faq": [
          {
            "question": "Should road bikes and ATVs be promoted on one page?",
            "answer": "A shared catalogue can work, but buying guidance and documentation should be separated by type and intended use."
          },
          {
            "question": "Is engine displacement enough to recommend a first bike?",
            "answer": "No. Fit, weight, handling, configuration and rider experience are also important, and a general answer cannot replace personal assessment."
          },
          {
            "question": "How should pre-orders be described?",
            "answer": "Distinguish a physical unit from an expected shipment and specify the actual contractual delivery terms."
          },
          {
            "question": "Does dealer servicing influence recommendations?",
            "answer": "It can when customers need regional support. Warranty coverage and local service availability should be checked."
          },
          {
            "question": "What does GAEO charge motorcycle retailers?",
            "answer": "Current GAEO plans apply; scope varies with brands, product groups, regions and baseline buyer prompts."
          }
        ],
        "ctaTitle": "See which motorcycle dealers AI recommends",
        "ctaText": "Share your site, represented brands and models, locations, current inventory and aftersales terms. I will prepare a baseline query set.",
        "request": "Motorcycle dealer GEO: commuting, touring and off-road models, specs, stock, documentation, servicing and BMR."
      }
    }
  }
];
