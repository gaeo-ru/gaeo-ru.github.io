/**
 * Batch 2X: distinct RU/EN local-service GEO specializations for beauty (#100),
 * cleaning (#101) and appliance repair (#102). Canonical tariffs and artwork reused.
 * Consumer protection, clinical licensing, 2026 sanitary rules and cleaning standards
 * are cited with appropriate applicability boundaries. No invented client cases.
 */
export const industrySpecializationsBatch2X = [
  {
    "id": 100,
    "slug": "beauty-salons-cosmetology-practices",
    "group": "local-services",
    "routes": {
      "ru": "/industries/beauty-salons-cosmetology-practices/",
      "en": "/en/industries/beauty-salons-cosmetology-practices/"
    },
    "parent": {
      "ru": "/industries/local-services/",
      "en": "/en/industries/local-services/"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/industrial-supplier-evidence/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/industrial-supplier-evidence/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения BMR",
        "Как проверять сведения о поставщике"
      ],
      "en": [
        "How BMR is measured",
        "How to verify supplier claims"
      ]
    },
    "sources": [
      {
        "href": "https://mru42.fmba.gov.ru/press-tsentr/detail/?ELEMENT_ID=87587",
        "ru": "ФМБА: санитарные правила СП 2.1.4284-26 с 1 сентября 2026 года",
        "en": "FMBA: SP 2.1.4284-26 sanitary rules effective 1 September 2026"
      },
      {
        "href": "https://www.roszdravnadzor.gov.ru/medactivities/licensing/news/35556",
        "ru": "Росздравнадзор: медицинская косметология требует соответствующей лицензии",
        "en": "Roszdravnadzor: medical cosmetology requires the appropriate medical licence"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_363382/",
        "ru": "Правила бытового обслуживания №1514: действуют до 1 января 2027 года",
        "en": "Domestic services Regulation 1514 applies through 1 January 2027"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение салонов красоты и косметологических кабинетов | GAEO.ru",
        "h1": "GEO-продвижение салонов красоты и косметологических кабинетов",
        "description": "GEO для салонов красоты и косметологических кабинетов: уход, процедуры, квалификация, лицензии, санитарные требования, цены, отзывы и замеры BMR.",
        "eyebrow": "Локальные услуги / Салоны красоты и косметология",
        "lead": "Клиенты ищут салон или косметолога по конкретной процедуре, району, цене и квалификации специалиста. Я проверяю, каких исполнителей рекомендуют нейросети, различают ли бытовые и медицинские услуги и правильно ли показывают адреса, стоимость и подтвержденные ограничения.",
        "heroPoints": [
          "Небрендовые вопросы по процедуре, району, специалисту и диапазону цены",
          "Разделение бытового ухода и лицензируемых медицинских вмешательств",
          "Согласованная информация о мастерах, услугах, записи и повторные замеры BMR"
        ],
        "problemTitle": "Почему универсальный список процедур не приводит к корректной рекомендации",
        "problemIntro": "Для записи важны не только фотографии работ. Ошибки начинаются, когда нейросеть обещает медицинский эффект, путает квалификацию, адрес или реальные виды услуг.",
        "problems": [
          {
            "title": "Медицинскую косметологию смешивают с бытовым уходом",
            "body": "Стрижки, маникюр и ряд косметических услуг не равнозначны медицинской деятельности. Инъекции и другие медицинские процедуры могут требовать соответствующей лицензии и квалифицированного персонала. Нельзя переносить разрешения с одного кабинета на сеть."
          },
          {
            "title": "Цена и длительность без конкретной процедуры",
            "body": "Сложность, состав услуги, мастер, зона воздействия и материалы влияют на цену. Общий тариф «любая процедура» и фотография без согласия клиента не отвечают реальному запросу."
          },
          {
            "title": "Сведения о мастере и филиале расходятся",
            "body": "Один специалист может работать не во всех филиалах, а услуга доступна лишь по определенному адресу. Нужны актуальные расписания, фотографии с правами и корректное описание опыта."
          }
        ],
        "scenarioTitle": "Как люди выбирают салон в ответах нейросетей",
        "scenarioIntro": "Примеры для стартовой матрицы. Это не зафиксированные рекомендации, не консультации о противопоказаниях и не подтверждение результата лечения.",
        "columns": [
          "Вопрос потенциального клиента",
          "Что можно проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где сделать маникюр или окрашивание в нужном районе вечером?",
            "Адрес конкретного салона, режим работы, запись, прайс, компетенции мастеров",
            "Связать услуги с филиалами, расписанием и реальными ценами"
          ],
          [
            "Как выбрать салон для аппаратной процедуры без необоснованных обещаний?",
            "Точное название услуги, используемое оборудование, ограничения, статус медицинской услуги и лицензия при необходимости",
            "Отделить бытовую услугу от лицензируемого медицинского вмешательства"
          ],
          [
            "Кого рекомендуют для ухода за волосами с определенным типом обработки?",
            "Специализация мастера, используемые материалы, продолжительность, документы и портфолио с разрешением",
            "Создать отдельные страницы услуг и критериев выбора"
          ],
          [
            "Есть ли косметологический кабинет рядом с метро с понятным прайсом?",
            "Точный адрес, способ записи, перечень процедур, специалисты, права на отзывы",
            "Устранить устаревшие адреса, разночтения услуг и ложные обещания"
          ]
        ],
        "proofTitle": "Какие сведения должны подтверждать салон и косметологический кабинет",
        "proofIntro": "С 1 сентября 2026 года действуют санитарные правила СП 2.1.4284-26; прежние СП 2.1.3678-20 утратили силу. Для медицинской косметологии Росздравнадзор требует соответствующей лицензии, но наличие бытовых косметических услуг само по себе не доказывает медицинский статус. Правила бытового обслуживания №1514 действуют до 1 января 2027 года; применимость норм уточняется по услуге.",
        "checks": [
          "Номенклатура услуг по филиалам, актуальные цены, расписание, адреса и достоверные способы записи",
          "Подтвержденная квалификация специалистов, лицензия именно на медицинскую деятельность при наличии такой услуги, ограничения заявлений",
          "Разрешенные фотографии, реальные отзывы с источниками, санитарные условия и дата обновления прайса"
        ],
        "proofNote": "Не заявляю лечебный эффект, медицинскую безопасность конкретной процедуры или достигнутый результат GEO чужого салона без подтверждения.",
        "workTitle": "Как организую GEO-продвижение салона",
        "workIntro": "Отдельно проверяю обычные поисковые запросы по району и процедуры, затем качество рекомендаций и полноту первичных данных.",
        "steps": [
          {
            "title": "Стартовый BMR по локальным сценариям",
            "body": "Делаю матрицу небрендовых запросов по процедурам, адресу, специалистам, графику и цене."
          },
          {
            "title": "Проверка данных и статуса услуг",
            "body": "Сверяю расписания, квалификации, подтвержденные услуги, необходимые лицензии, описания и фотографии."
          },
          {
            "title": "Уточнение страниц и внешних карточек",
            "body": "Готовлю ТЗ на конкретные услуги, филиалы, биографии мастеров, запись и источники отзывов без выдуманных рейтингов."
          },
          {
            "title": "Повторное измерение",
            "body": "На той же матрице сравниваю BMR и фиксирую ошибки нейросетей о медицинском статусе, графике и стоимости."
          }
        ],
        "faq": [
          {
            "question": "Нужна ли лицензия любому салону красоты?",
            "answer": "Не всем бытовым услугам требуется медицинская лицензия. Если предлагаются медицинские косметологические услуги, необходимо проверять соответствующий разрешенный вид деятельности и сведения реестра."
          },
          {
            "question": "Какие санитарные правила действуют в ноябре 2026 года?",
            "answer": "СП 2.1.4284-26 вступили в силу 1 сентября 2026 года и заменили СП 2.1.3678-20. Применимые положения оцениваются по виду помещения и услуги."
          },
          {
            "question": "Можно ли обещать медицинский результат аппаратной процедуры?",
            "answer": "Нельзя приписывать процедуре недоказанную эффективность или безопасность. Информация должна соответствовать статусу услуги, документации и квалифицированной оценке."
          },
          {
            "question": "Как не путать разные филиалы и специалистов?",
            "answer": "Публиковать и поддерживать точные карточки локаций, услуг и графиков, связывая мастеров только с адресами, где они действительно принимают."
          },
          {
            "question": "Сколько стоит GEO-продвижение салона?",
            "answer": "Применяются общие тарифы GAEO. Объем зависит от числа филиалов, услуг, специалистов, рынков и стартовой матрицы запросов."
          }
        ],
        "ctaTitle": "Проверим, какие салоны и кабинеты рекомендуют нейросети",
        "ctaText": "Пришли сайт, список филиалов, действующий прайс, подтвержденные услуги и документы, если есть медицинская косметология. Составлю стартовые вопросы для замера.",
        "request": "GEO для салона красоты и косметологического кабинета: адреса, процедуры, лицензии, квалификация, отзывы, локальные запросы и BMR."
      },
      "en": {
        "title": "GEO for beauty salons and cosmetology practices | GAEO.ru",
        "h1": "GEO promotion for beauty salons and cosmetology practices",
        "description": "Beauty salon and cosmetology GEO: services, practitioners, prices, clinic licence boundaries, sanitary rules, local AI recommendations and BMR.",
        "eyebrow": "Local services / Beauty salons and cosmetology",
        "lead": "People select salons by specific treatments, neighbourhood, price and practitioner. I test which businesses AI recommends and whether it accurately separates everyday beauty services from licensed medical procedures.",
        "heroPoints": [
          "Non-brand buying intents by treatment, neighbourhood and practitioner",
          "Clear boundaries between personal-care services and medical cosmetology",
          "Verified service lists, bookings, addresses and repeated BMR tests"
        ],
        "problemTitle": "Why a broad beauty menu is not enough for a trustworthy AI recommendation",
        "problemIntro": "A customer needs more than an attractive portfolio. AI may misstate a provider's medical status, location or true service availability.",
        "problems": [
          {
            "title": "Everyday beauty work is confused with medical cosmetology",
            "body": "Hair, nails and general beauty services differ from medical interventions. Some cosmetic procedures require an appropriate medical licence and qualified personnel; a permit cannot be assumed to apply to all locations."
          },
          {
            "title": "Prices omit treatment-specific scope",
            "body": "The practitioner, service area, materials and session details change pricing. General rates and unlicensed use of customer photos cannot establish a precise offer."
          },
          {
            "title": "Practitioner and branch information conflicts",
            "body": "Professionals may only work at specific addresses and times. AI should not invent availability, experience, positive outcomes or customer reviews."
          }
        ],
        "scenarioTitle": "Beauty and cosmetology buyer questions for GEO measurement",
        "scenarioIntro": "These are proposed baseline questions, not past client outcomes or medical advice.",
        "columns": [
          "Customer intent",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I book a manicure or hair colouring this evening nearby?",
            "Exact location, service availability, hours, verified price and qualified provider",
            "Keep service, branch and schedule data aligned"
          ],
          [
            "Which salon offers a device-based service with clear professional boundaries?",
            "Exact service and equipment, whether medical, relevant licence if required, provider qualifications",
            "Avoid describing non-medical providers as medical clinics"
          ],
          [
            "Who specialises in the required hair-treatment technique?",
            "Actual services, practitioner expertise, products, duration and authorised examples",
            "Create trustworthy service and provider pages"
          ],
          [
            "Which cosmetology practice is close to the station and publishes prices?",
            "Accurate address, booking channels, service list, truthful reviews",
            "Correct outdated listings and unsupported promises"
          ]
        ],
        "proofTitle": "What validates beauty-service and practitioner claims",
        "proofIntro": "Russia introduced SP 2.1.4284-26 on 1 September 2026, replacing SP 2.1.3678-20. Medical cosmetology requires applicable medical licensing under the Roszdravnadzor framework. Domestic Services Regulation 1514 remains applicable through 1 January 2027 for covered consumer services. Actual applicability depends on the procedure and provider.",
        "checks": [
          "Service-by-branch catalogue, current prices, hours, addresses and booking methods",
          "Verified professional credentials and medical licence where the specific procedure requires one",
          "Permissioned client images, source-linked reviews, appropriate premises and dated information"
        ],
        "proofNote": "This is a GEO information-quality method. It makes no clinical efficacy claim and does not invent real salon GEO outcomes.",
        "workTitle": "A local beauty-service GEO workflow",
        "workIntro": "I separate location and treatment needs, inspect authentic provider data and assess actual AI recommendations.",
        "steps": [
          {
            "title": "Measure local recommendation baseline",
            "body": "Group prompts by procedure, location, staff, schedule and price to capture starting BMR."
          },
          {
            "title": "Validate service classifications",
            "body": "Check practitioners, services, actual medical licensing boundaries, documents, times and photographs."
          },
          {
            "title": "Improve local and service pages",
            "body": "Plan accurate pages for treatments, staff and branches, including booking and source-backed reviews."
          },
          {
            "title": "Repeat accuracy and BMR checks",
            "body": "Re-run prompts, measure brand inclusion and flag incorrect clinical, price or opening claims."
          }
        ],
        "faq": [
          {
            "question": "Does every salon need a medical licence?",
            "answer": "No. Ordinary beauty services and medical cosmetology are different. Medical procedures require the applicable licence, which should be checked for the actual provider and address."
          },
          {
            "question": "Which Russian sanitary rules apply in November 2026?",
            "answer": "SP 2.1.4284-26 became effective on 1 September 2026, replacing SP 2.1.3678-20, subject to actual premises and service scope."
          },
          {
            "question": "Can a device-based beauty service promise a medical result?",
            "answer": "No unsupported medical outcomes or safety assurances should appear in content. Claims must match the actual service and professional evidence."
          },
          {
            "question": "How should multiple branches be represented?",
            "answer": "Keep individual addresses, actual practitioners, hours, services and booking details accurate rather than copying one branch's offerings to all."
          },
          {
            "question": "How much does beauty salon GEO cost?",
            "answer": "Published GAEO pricing applies. Scope depends on treatments, locations, staff and the agreed initial prompts."
          }
        ],
        "ctaTitle": "Find out which beauty providers AI recommends locally",
        "ctaText": "Share your site, branch addresses, price list, real services and any relevant medical permissions. I will define a credible initial query set.",
        "request": "Beauty salon and cosmetology GEO: service availability, branches, qualifications, medical licences, local AI results and BMR."
      }
    }
  },
  {
    "id": 101,
    "slug": "cleaning-companies",
    "group": "local-services",
    "routes": {
      "ru": "/industries/cleaning-companies/",
      "en": "/en/industries/cleaning-companies/"
    },
    "parent": {
      "ru": "/industries/local-services/",
      "en": "/en/industries/local-services/"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/industrial-supplier-evidence/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/industrial-supplier-evidence/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения BMR",
        "Как проверять сведения о поставщике"
      ],
      "en": [
        "How BMR is measured",
        "How to verify supplier claims"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/gost/details/cdda6455-2619-48eb-b04f-5b42b8115ec8",
        "ru": "Росстандарт: ГОСТ Р 51870-2014 для профессиональной уборки",
        "en": "Rosstandart: GOST R 51870-2014, general cleaning service specifications"
      },
      {
        "href": "https://protect.gost.ru/gost/details/487c0d2e-6c5f-4803-9a86-3b430f1434f1",
        "ru": "Росстандарт: ГОСТ Р 57582-2017 о системе оценки качества клининга",
        "en": "Rosstandart: GOST R 57582-2017, cleaning service quality assessment"
      },
      {
        "href": "https://protect.gost.ru/gost/details/c0ff12a0-655e-47db-9c30-6dbf2499eeba",
        "ru": "Росстандарт: ГОСТ Р 72719-2026 о бережливом производстве в клининге (с 01.10.2026)",
        "en": "Rosstandart: GOST R 72719-2026 on lean service organisation, effective October 2026"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение клининговых компаний | GAEO.ru",
        "h1": "GEO-продвижение клининговых компаний",
        "description": "GEO для клининга квартир, офисов и коммерческих объектов: состав работ, уборка после ремонта, контроль качества, выезд, договор, цена и BMR.",
        "eyebrow": "Локальные услуги / Профессиональный клининг",
        "lead": "Заказчик ищет клининг не вообще, а для конкретного помещения и режима: генеральная уборка квартиры, ежедневный офис, послестроительные загрязнения или обслуживание нескольких площадок. Я проверяю рекомендации нейросетей по таким задачам и достоверность обещаний исполнителей.",
        "heroPoints": [
          "Запросы по объекту, виду уборки, графику и району",
          "Отдельные составы работ, ограничения средств и подтверждаемое качество",
          "Понятная география выезда и повторные замеры рекомендаций BMR"
        ],
        "problemTitle": "Почему одна карточка «уборка под ключ» не описывает услугу",
        "problemIntro": "Домашний клининг, уборка офисов и промышленное обслуживание требуют разной организации, техники, времени и мер защиты имущества.",
        "problems": [
          {
            "title": "Состав работ и исключения не раскрыты",
            "body": "Уборка санузла, окон, фасадного остекления или после ремонта не являются одинаковым заказом. Нужно отделять включенные операции, дополнительные работы и вопросы доступа."
          },
          {
            "title": "Профессиональные стандарты трактуются как сертификаты",
            "body": "ГОСТ Р 51870-2014 дает общие технические условия, а ГОСТ Р 57582-2017 описывает оценку качества. Одно упоминание ГОСТ не доказывает сертификацию конкретной компании."
          },
          {
            "title": "Прайс и обещания безопасности не проверяемы",
            "body": "Площадь, состояние объекта, тип поверхностей, материалы, бригада и удаленность меняют стоимость. Нельзя утверждать, что любое средство безвредно для любой поверхности, ребенка или животного."
          }
        ],
        "scenarioTitle": "Какие вопросы о клининге задают нейросетям",
        "scenarioIntro": "Примеры коммерческих запросов для первичного BMR; они не являются подтвержденными упоминаниями конкретного подрядчика.",
        "columns": [
          "Сценарий заказчика",
          "Что подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какие компании делают уборку квартиры после ремонта и вывозят мелкий мусор?",
            "Объем операций, степень загрязнения, вынос мусора, оборудование, условия доступа",
            "Разделить строительную пыль, обычную уборку и дополнительные услуги"
          ],
          [
            "Кто возьмет ежедневный клининг офиса с вечерним графиком?",
            "Зона обслуживания, штат, карта уборки, регламент доступа, отчетность",
            "Показать отдельный договорной B2B-продукт с контрольными точками"
          ],
          [
            "Где заказать мойку окон без неподтвержденных обещаний?",
            "Тип остекления, высота, доступ, материалы, необходимость спецработ",
            "Проверяемо описать границы и безопасность применимых работ"
          ],
          [
            "Кого выбрать для обслуживания магазинов в нескольких районах?",
            "Адреса, смены, SLA, ответственный менеджер, контроль качества, стоимость",
            "Раскрыть реальную территорию и стандарты контроля, не выдумывая покрытие"
          ]
        ],
        "proofTitle": "Какими документами подтверждать профессиональную уборку",
        "proofIntro": "ГОСТ Р 51870-2014 описывает общие технические условия профессионального клининга, ГОСТ Р 57582-2017 регулирует систему оценки качества, а ГОСТ Р 72719-2026 действует с 1 октября 2026 года и касается бережливой организации уборки. Эти документы имеют разные функции и сами по себе не подтверждают квалификацию конкретной бригады.",
        "checks": [
          "Договорной состав работ, карта помещений, инвентарь и технологии с реальными ограничениями",
          "Контроль качества, приемка, источники отзывов, права на фотографии и сведения об обучении персонала",
          "Регион, график, расчет стоимости, способы связи, ответственность за имущество и действительные виды услуг"
        ],
        "proofNote": "Показываю, как проверять качество информации для рекомендаций, не заявляя подтвержденное качество конкретного клининга и не придумывая кейсы GAEO.",
        "workTitle": "Как построю GEO-продвижение клининговой компании",
        "workIntro": "Сегментирую спрос по типам помещений, периодичности, загрязнениям и региону, затем уточняю документированные возможности подрядчика.",
        "steps": [
          {
            "title": "Фиксирую исходные запросы",
            "body": "Разделяю бытовую, офисную и послестроительную уборку по объекту, времени, дополнительным работам и городу."
          },
          {
            "title": "Проверяю состав и качество",
            "body": "Уточняю регламенты, расходные материалы, ограничения обработки, систему контроля, фотографии и реальные регионы."
          },
          {
            "title": "Готовлю страницы услуг",
            "body": "Создаю ТЗ для уборки квартир, офисов, после ремонта, окон и корпоративного клининга с понятными составами работ."
          },
          {
            "title": "Перемеряю рекомендации",
            "body": "Повторяю матрицу и считаю BMR, отдельно отмечая ошибочные обещания, выдуманные цены и территории выезда."
          }
        ],
        "faq": [
          {
            "question": "Чем генеральная уборка отличается от уборки после ремонта?",
            "answer": "У них разные исходные загрязнения и состав операций. Перечень работ и ограничения следует уточнить перед расчетом, а не описывать обе услуги одним универсальным списком."
          },
          {
            "question": "Какие ГОСТ действуют для профессионального клининга?",
            "answer": "ГОСТ Р 51870-2014 задает общие технические условия, ГОСТ Р 57582-2017 описывает оценку качества. ГОСТ Р 72719-2026 действует с 1 октября 2026 года и относится к организации процессов по принципам бережливого производства."
          },
          {
            "question": "Наличие ГОСТ на сайте подтверждает профессиональную аттестацию?",
            "answer": "Нет. Ссылка на документ не заменяет подтверждений компании, персонала, методов контроля и реального состава договора."
          },
          {
            "question": "Можно ли объявлять химию безопасной для любых материалов?",
            "answer": "Нет. Материал, загрязнение и свойства применяемого средства требуют проверки инструкций производителя и ограничений обработки."
          },
          {
            "question": "Сколько стоит GEO-продвижение клининговой компании?",
            "answer": "Действуют общие тарифы GAEO. Объем зависит от видов уборки, географии, сменности и стартовой матрицы запросов."
          }
        ],
        "ctaTitle": "Проверим, какие клининговые компании рекомендуют нейросети",
        "ctaText": "Пришли сайт, реальные типы объектов, карту выезда, состав работ и подтвержденные отзывы. Определю набор запросов для первичного замера.",
        "request": "GEO для клининговой компании: уборка квартир и офисов, послестроительный клининг, сервисные зоны, качество, цены и BMR."
      },
      "en": {
        "title": "GEO for cleaning companies | GAEO.ru",
        "h1": "GEO promotion for cleaning companies",
        "description": "Cleaning services GEO: home, office and post-construction cleaning, precise scope, quality checks, scheduling, service areas and AI brand mention BMR.",
        "eyebrow": "Local services / Professional cleaning",
        "lead": "Customers do not just search for 'a cleaner': they need post-construction work, scheduled office coverage, domestic deep cleaning or servicing multiple sites. I examine which providers AI suggests for these different needs and whether claims fit their documented capabilities.",
        "heroPoints": [
          "Non-brand prompts by property, service type, schedule and location",
          "Defined work scope, product limitations and verifiable quality controls",
          "Accurate service territories with repeat brand recommendation measurement"
        ],
        "problemTitle": "Why a generic 'full-service cleaning' listing can mislead a buyer",
        "problemIntro": "Homes, retail units, offices and industrial sites differ in access, equipment, hazards, service specification and quality expectations.",
        "problems": [
          {
            "title": "Operations and exclusions are unclear",
            "body": "Routine home cleaning, renovation debris, high windows and specialist building maintenance are different tasks. Providers must distinguish included work from paid extras and access restrictions."
          },
          {
            "title": "References to technical standards imply certification",
            "body": "GOST R 51870-2014 describes general cleaning services, whereas GOST R 57582-2017 addresses quality assessment. Quoting standards is not a certificate held by the provider."
          },
          {
            "title": "Price and safety promises ignore the job",
            "body": "Floor area, stains, materials, staffing and geography affect cost. No cleaning chemical should be assumed harmless for every surface or household."
          }
        ],
        "scenarioTitle": "Cleaning procurement questions for the GEO baseline",
        "scenarioIntro": "These are examples for a prospective prompt matrix, not actual AI mentions of any specific cleaning supplier.",
        "columns": [
          "Buyer request",
          "Evidence to review",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which provider handles post-renovation dust and small rubbish removal?",
            "Detailed included tasks, waste scope, equipment, access and site restrictions",
            "Publish separate post-construction cleaning criteria"
          ],
          [
            "Who provides scheduled after-hours cleaning to an office?",
            "Coverage, staffing, cleaning schedule, handover, management and accountability",
            "Show genuine recurring B2B service terms"
          ],
          [
            "Who can clean exterior windows with appropriate access precautions?",
            "Glazing type, height, access method, surface compatibility and actual work scope",
            "Explain relevant limitations instead of blanket promises"
          ],
          [
            "Which cleaning business covers several shop locations?",
            "Real areas served, shifts, SLA, supervision, price assumptions",
            "Provide accurate service geography and control methods"
          ]
        ],
        "proofTitle": "Evidence that supports a professional cleaning recommendation",
        "proofIntro": "GOST R 51870-2014 gives general specifications for professional cleaning, GOST R 57582-2017 addresses service quality assessments, and GOST R 72719-2026 has applied since 1 October 2026 to lean cleaning organisation. They have different functions and none alone certifies a particular business.",
        "checks": [
          "Work specification, property type, authorised equipment and surface/material limits",
          "Quality inspections, acceptance process, permissioned case material and substantiated team capabilities",
          "Hours, coverage, pricing assumptions, liability terms and genuine contact methods"
        ],
        "proofNote": "This is an information-quality approach, not evidence that a particular cleaner achieved a certain BMR or service level.",
        "workTitle": "A measurable GEO plan for cleaners",
        "workIntro": "I separate property types, cleaning frequency and customer expectations, validate primary details and test AI recommendation accuracy.",
        "steps": [
          {
            "title": "Capture starting prompts",
            "body": "Group questions by domestic, office, post-renovation and specialist cleaning, location and work hours."
          },
          {
            "title": "Validate scope and evidence",
            "body": "Review service checklists, product restrictions, supervision, approved photos and territories."
          },
          {
            "title": "Build task-specific pages",
            "body": "Prepare briefs for deep cleaning, commercial cleaning, windows, post-build sites and recurring contracts."
          },
          {
            "title": "Repeat brand mention measurement",
            "body": "Re-run the baseline, track BMR and flag AI mistakes about services, prices or locations."
          }
        ],
        "faq": [
          {
            "question": "Is deep cleaning the same as post-construction cleaning?",
            "answer": "No. The starting soil and tasks differ. The exact scope and exclusions must be established before pricing."
          },
          {
            "question": "Which professional cleaning standards are current?",
            "answer": "GOST R 51870-2014 covers general service specifications and GOST R 57582-2017 deals with quality assessment. GOST R 72719-2026 has been effective since October 2026 for lean organisation."
          },
          {
            "question": "Does listing GOST mean the company is certified?",
            "answer": "No. A standard reference alone does not substantiate provider qualifications, actual operations or quality."
          },
          {
            "question": "Can cleaning chemicals be promoted as universally safe?",
            "answer": "No. Compatibility and limitations depend on the product, surface and application conditions, and need manufacturer documentation."
          },
          {
            "question": "What does cleaning company GEO cost?",
            "answer": "GAEO's published pricing applies. Scope depends on service types, territories, schedules and the baseline prompt set."
          }
        ],
        "ctaTitle": "Find out which cleaners AI recommends for your service areas",
        "ctaText": "Share your website, locations, genuine work scope and supporting reviews. I will define a useful initial measurement.",
        "request": "Cleaning company GEO: domestic, office and post-renovation services, documented quality and service areas, BMR."
      }
    }
  },
  {
    "id": 102,
    "slug": "home-appliance-repair-services",
    "group": "local-services",
    "routes": {
      "ru": "/industries/home-appliance-repair-services/",
      "en": "/en/industries/home-appliance-repair-services/"
    },
    "parent": {
      "ru": "/industries/local-services/",
      "en": "/en/industries/local-services/"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/industrial-supplier-evidence/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/industrial-supplier-evidence/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения BMR",
        "Как проверять сведения о поставщике"
      ],
      "en": [
        "How BMR is measured",
        "How to verify supplier claims"
      ]
    },
    "sources": [
      {
        "href": "https://62.rospotrebnadzor.ru/content/prava-potrebiteley-pri-okazanii-uslug-po-remontu-bytovoy-tehniki-0",
        "ru": "Роспотребнадзор: права клиента при ремонте бытовой техники, 8 ноября 2026",
        "en": "Rospotrebnadzor: consumer rights for appliance repair, November 2026"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_363382/",
        "ru": "Постановление №1514: действующие правила бытового обслуживания до 01.01.2027",
        "en": "Domestic Services Regulation 1514 applies through 1 January 2027"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/536006",
        "ru": "Роспотребнадзор: требования к договору, стоимости и приемке результатов ремонта",
        "en": "Rospotrebnadzor: repair agreements, prices and acceptance information"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение сервисов ремонта бытовой техники | GAEO.ru",
        "h1": "GEO-продвижение сервисов ремонта бытовой техники",
        "description": "GEO для ремонта холодильников, стиральных машин и бытовой техники: модель, неисправность, диагностика, выезд, запчасти, стоимость, гарантия и BMR.",
        "eyebrow": "Локальные услуги / Ремонт бытовой техники",
        "lead": "Клиент ищет мастера по конкретной марке и поломке: не холодит холодильник, не сливает стиральная машина или нужен сервисный центр с диагностикой. Я проверяю, какие ремонтные компании рекомендуют нейросети по таким запросам и нет ли в ответах вымышленных цен, гарантий и статуса авторизации.",
        "heroPoints": [
          "Сегменты запросов по прибору, бренду, симптому и району",
          "Проверка выездной диагностики, договора, оригинальности запчастей и гарантии",
          "Разграничение авторизованного сервиса и независимого мастера с замером BMR"
        ],
        "problemTitle": "Почему одно обещание «ремонтируем всё» не помогает выбрать сервис",
        "problemIntro": "Точный запрос связан с типом прибора, диагностикой, доступностью запасной части, условиями выезда и ответственностью исполнителя.",
        "problems": [
          {
            "title": "Название бренда подменяет авторизованный статус",
            "body": "Работа с техникой определенной марки не означает официальную авторизацию производителя. Указывать статус центра и условия фирменной гарантии можно только на основании подтвержденных полномочий."
          },
          {
            "title": "Цена ремонта объявлена без диагностики",
            "body": "Стоимость зависит от конкретной неисправности, модели, работ и деталей. Фиксированная цена «за любой ремонт» не должна скрывать диагностику и оплачиваемый выезд."
          },
          {
            "title": "Договор и гарантия описаны неясно",
            "body": "Потребителю нужно знать, кто является исполнителем, что фиксируется при приемке, какие работы и запчасти включены, как документируются сроки и претензии."
          }
        ],
        "scenarioTitle": "Как жители выбирают мастера через нейросеть",
        "scenarioIntro": "Примеры коммерческих вопросов для контрольной матрицы, а не подтвержденный опыт или совет о самостоятельном ремонте электрической техники.",
        "columns": [
          "Запрос владельца техники",
          "Что проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кого вызвать для диагностики холодильника, который не охлаждает?",
            "Марка, модель, район выезда, диагностика, ее стоимость, ограничения работ",
            "Точная страница услуги и регионов без удаленного «диагноза»"
          ],
          [
            "Где починят стиральную машину с проблемой слива и выдадут гарантию?",
            "Бренды, работы, порядок приемки, документы, гарантийные условия",
            "Разграничить симптому и реальную неисправность, пояснить гарантию"
          ],
          [
            "Как найти независимый сервис, а не случайное объявление от имени бренда?",
            "Юридические реквизиты, договор, подтвержденная авторизация если заявлена, отзывы",
            "Не выдавать независимую мастерскую за официальный сервис производителя"
          ],
          [
            "Кто ремонтирует крупную технику на дому с заранее известной стоимостью выезда?",
            "Адреса обслуживания, цена диагностики, условия отмены, виды работ и детали",
            "Проверяемые расходы и география без выдуманных срочных сроков"
          ]
        ],
        "proofTitle": "Какие факты подтверждают добросовестный ремонтный сервис",
        "proofIntro": "Роспотребнадзор разъясняет права клиента при ремонте бытовой техники: договор/квитанцию, описание заказа, сроки и стоимость. На ноябрь 2026 года правила бытового обслуживания по постановлению №1514 действуют до 1 января 2027 года. Перед новым годом нельзя предполагать автоматическое продолжение их действия без проверки актуального нормативного акта.",
        "checks": [
          "Реальные приборы и марки в работе, подтвержденные полномочия производителя, территории и время выезда",
          "Порядок диагностики и согласования дополнительных работ, цена выезда, договор и приемка",
          "Фактические условия гарантии, наличие деталей, прозрачные реквизиты, отзывы и адреса сервисов"
        ],
        "proofNote": "Ремонт опасной электрической техники должны выполнять квалифицированные специалисты; GEO-контент не превращается в инструкцию по самостоятельному вмешательству. Никаких клиентских результатов GAEO не заявляю.",
        "workTitle": "Как организую GEO для мастерской или сети сервисов",
        "workIntro": "Сначала отделю запросы по моделям и поломкам, затем проверю сведения об исполнителе и прозрачность коммерческого предложения.",
        "steps": [
          {
            "title": "Матрица неисправностей и регионов",
            "body": "Зафиксирую исходный BMR по холодильникам, стиральным машинам, симптомам, маркам, адресам и выездным запросам."
          },
          {
            "title": "Проверка бизнеса и условий",
            "body": "Сверю договоры, цены, выезды, гарантию, статус авторизации, мастеров и реальную сервисную территорию."
          },
          {
            "title": "Разработка страниц реальных услуг",
            "body": "Подготовлю ТЗ на приборы, бренды, типовые симптомы, диагностику и порядок приемки без дистанционных технических диагнозов."
          },
          {
            "title": "Повторное измерение ответов",
            "body": "Сравню рекомендации по исходной матрице, отмечу ложные статусы официального сервиса, стоимость и сроки."
          }
        ],
        "faq": [
          {
            "question": "Можно ли назвать независимый сервис официальным центром производителя?",
            "answer": "Только при наличии подтвержденной авторизации на соответствующие марки и услуги. Ремонт техники определенного бренда сам по себе не дает такого статуса."
          },
          {
            "question": "Правильно ли обещать точную цену без диагностики?",
            "answer": "Фиксировать можно прозрачные цены за известные работы и выезд; итог неизвестной неисправности требует согласованной диагностики и сметы."
          },
          {
            "question": "Какие документы важны при заказе ремонта?",
            "answer": "Письменный договор или квитанция, наименование работ, сроки, стоимость, данные исполнителя и условия приемки; применимые требования следует проверять в действующей редакции правил."
          },
          {
            "question": "Как долго действуют правила бытового обслуживания №1514?",
            "answer": "На ноябрь 2026 года срок их действия указан до 1 января 2027 года. Для публикаций после этой даты нужно отдельно проверить новый правовой режим."
          },
          {
            "question": "Сколько стоит GEO-продвижение сервиса ремонта техники?",
            "answer": "Действуют тарифы GAEO. Объем определяется числом видов техники, обслуживаемыми марками, городами и исходной матрицей промптов."
          }
        ],
        "ctaTitle": "Проверим, какие сервисы ремонта нейросети предлагают по поломке",
        "ctaText": "Пришли сайт, список реально обслуживаемых брендов и приборов, географию выездов, условия договора и цены диагностики. Я подготовлю контрольные запросы.",
        "request": "GEO ремонта бытовой техники: холодильники, стиральные машины, диагностика, сервисные центры, официальный статус, стоимость, гарантия и BMR."
      },
      "en": {
        "title": "GEO for home appliance repair services | GAEO.ru",
        "h1": "GEO promotion for home appliance repair services",
        "description": "Home appliance repair GEO: refrigerators, washing machines, brand and fault searches, diagnosis, call-out prices, warranty, authorised status and BMR.",
        "eyebrow": "Local services / Home appliance repair",
        "lead": "A homeowner needs a specialist for a particular model and fault, such as a refrigerator that does not cool or a washer that will not drain. I test which repair services AI recommends and check whether claimed prices, authorisations and guarantees are accurate.",
        "heroPoints": [
          "Non-brand prompts by appliance, model, symptom and district",
          "Verified on-site diagnosis, agreements, parts and repair warranty boundaries",
          "Distinguish independent technicians from manufacturer-authorised repair networks"
        ],
        "problemTitle": "Why a generic 'repair anything' listing fails specific appliance owners",
        "problemIntro": "Appliance type, identified fault, repair coverage, spare parts and contractor responsibility determine whether an AI suggestion is useful.",
        "problems": [
          {
            "title": "Brand servicing implies authorised partner status",
            "body": "Fixing a named brand does not make a business a manufacturer-authorised centre. Official partner status and warranty authority require actual evidence."
          },
          {
            "title": "Repair pricing omits diagnosis",
            "body": "The fault, model, scope and parts affect cost. A blanket fixed price may hide charges for visits and diagnostics."
          },
          {
            "title": "Contractor identity and warranty are unclear",
            "body": "Customers need a named provider, agreed work, handover conditions, timelines, receipts and disclosed warranty terms."
          }
        ],
        "scenarioTitle": "Example household appliance repair buyer questions",
        "scenarioIntro": "These are baseline query examples, not verified client results or instructions for risky do-it-yourself repairs.",
        "columns": [
          "Customer question",
          "Evidence needed",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which service can inspect a refrigerator that is not cooling nearby?",
            "Supported brands, coverage area, diagnosis conditions and call-out cost",
            "Publish precise service scope without pretending to identify the fault remotely"
          ],
          [
            "Where can I book washer drainage repair with a written warranty?",
            "Actual diagnosis, relevant brands, parts policy, agreement and warranty",
            "Show transparent process and avoid conflating symptom with root cause"
          ],
          [
            "How do I distinguish an independent workshop from an official brand centre?",
            "Entity details, attributable authorisation, customer terms and authentic reviews",
            "Correct false official-status implications"
          ],
          [
            "Which technician can visit for a large appliance with a disclosed call-out fee?",
            "Real geographical coverage, price schedule, cancellation terms and technician availability",
            "Explain costs and territory rather than invent immediate availability"
          ]
        ],
        "proofTitle": "Consumer protections relevant to an appliance-repair recommendation",
        "proofIntro": "Rospotrebnadzor explains the importance of written repair agreements, job specifications and acceptance. As of November 2026, Russia's Domestic Services Regulation 1514 is scheduled to run through 1 January 2027. Any advice after this date should be checked against whatever legal framework then applies.",
        "checks": [
          "Actual equipment and brands serviced, verified manufacturer permissions, territories and visit schedules",
          "Diagnosis process, agreed extra work, visit fees, contract/receipt and acceptance records",
          "Real warranty, parts availability, business identity, genuine reviews and service locations"
        ],
        "proofNote": "Electrical appliance repair should be handled by qualified professionals. This is supplier-information GEO, not dangerous repair instruction or a claimed client GEO success.",
        "workTitle": "A transparent appliance-repair GEO workflow",
        "workIntro": "Segment location and equipment problems, verify business legitimacy and then monitor whether AI suggests the right repair service.",
        "steps": [
          {
            "title": "Record the first recommendation matrix",
            "body": "Use prompts for refrigerators, washers, model families, symptoms, call-outs and neighbourhoods."
          },
          {
            "title": "Validate commercial evidence",
            "body": "Check real repairs offered, brand-authorised status, service territories, diagnosis rates, contracts and guarantees."
          },
          {
            "title": "Create task-specific content",
            "body": "Draft briefs for each appliance type, supported brands, diagnostic processes and customer rights without remote fault claims."
          },
          {
            "title": "Recheck accuracy and brand mentions",
            "body": "Repeat prompts, measure BMR and flag misleading claims about official status, prices or visit times."
          }
        ],
        "faq": [
          {
            "question": "Can any independent technician call themselves an authorised brand centre?",
            "answer": "Only if manufacturer authorisation can be confirmed for the relevant services. Repairing a brand is not sufficient."
          },
          {
            "question": "Can final repair cost always be provided before inspection?",
            "answer": "Not if the underlying fault is unknown. Upfront disclosed fees and agreed work are appropriate, but accurate total cost may require diagnosis."
          },
          {
            "question": "What documents should an appliance repair customer receive?",
            "answer": "A written receipt or agreement identifying the contractor, job, price, terms and acceptance process, according to the applicable current rules."
          },
          {
            "question": "Does Regulation 1514 remain in force after 2026?",
            "answer": "It is currently time-limited through 1 January 2027. Legal statements for later dates must be checked against updated requirements."
          },
          {
            "question": "How much does appliance repair GEO cost?",
            "answer": "Published GAEO plans apply. Scope depends on device types, supported manufacturers, locations and the starting prompt matrix."
          }
        ],
        "ctaTitle": "Find out which repair services AI recommends for your appliance categories",
        "ctaText": "Share your website, covered brands, repair types, service territory and transparent diagnostic prices. I will propose a baseline measurement.",
        "request": "Appliance repair service GEO: refrigerators, washing machines, diagnostics, authorisation, rates, warranty, coverage and BMR."
      }
    }
  }
];
