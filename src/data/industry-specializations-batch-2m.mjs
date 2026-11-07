/**
 * Batch 2M: evidence-led bilingual GEO specializations (#8 self-storage, #83 restaurants).
 * #7 belongs to concurrent batch 2L PR #91 and is excluded to prevent duplicates.
 * Uses the canonical prices and catalogue WebP assets; does not assert client outcomes.
 */
export const industrySpecializationsBatch2M = [
  {
    "id": 8,
    "slug": "self-storage-services",
    "group": "real-estate",
    "routes": {
      "ru": "/industries/self-storage-services/",
      "en": "/en/industries/self-storage-services/"
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
        "Real estate GEO strategy",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/afbf7746a8ab4a8753f6eeeca8749b7412f21e2a/",
        "ru": "ГК РФ, ст. 886: договор хранения и обязательства хранителя",
        "en": "Russian Civil Code, Article 886: custody and safekeeping contracts"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/83454ca2a4ad87b54134f7f9885d3dd8181a4d1b/",
        "ru": "ГК РФ, глава 47: срок, условия и ответственность при хранении",
        "en": "Russian Civil Code, Chapter 47: storage terms and obligations"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение сервисов индивидуального хранения | GAEO.ru",
        "h1": "GEO-продвижение сервисов индивидуального хранения и складских боксов",
        "description": "Продвижение self-storage в ChatGPT и Алисе: объем и размер бокса, реальные адреса, доступ, безопасность, тарифы, аренда или хранение и измерение нейровидимости.",
        "eyebrow": "Недвижимость / Индивидуальное хранение",
        "lead": "Человек ищет место для шин, сезонных вещей или содержимого квартиры на время ремонта. Нейросети должны отличать аренду индивидуального бокса от договора ответственного хранения, учитывать полезные размеры, условия доступа и расположение пункта.",
        "heroPoints": [
          "Измерение локальных запросов по назначению и объему хранения",
          "Проверка формата договора, физических размеров, доступа и ограничений",
          "Адресные страницы объектов, достоверные тарифы и повторные BMR-замеры"
        ],
        "problemTitle": "Почему ответ о self-storage может привести не туда",
        "problemIntro": "Услуги кратковременного хранения и самостоятельного доступа к боксу похожи в рекламе, но клиент получает разные возможности и ответственность.",
        "problems": [
          {
            "title": "Путают аренду бокса и прием вещей на хранение",
            "body": "При самостоятельном доступе клиент может арендовать выделенное пространство; при хранении обязательства хранителя определяет договор. Юридический формат и границы ответственности нужно указывать для конкретной услуги."
          },
          {
            "title": "Неизвестен полезный размер помещения",
            "body": "Площадь в м² не всегда равна вместимости. Высота, габариты двери, доступность лифта, тележки и требования к упаковке важны при выборе."
          },
          {
            "title": "Скрыты условия доступа и хранения",
            "body": "В ответах смешивают круглосуточный доступ, доступ по графику, условия для шин, мебели и документов. Температура, влажность и исключенные вещи должны соответствовать фактическим правилам."
          }
        ],
        "scenarioTitle": "Как клиенты ищут место для хранения",
        "scenarioIntro": "Каждая группа вопросов требует собственных доказательств по действующему объекту, тарифу и договору.",
        "columns": [
          "Вопрос клиента",
          "Что нужно проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где снять маленький бокс рядом с метро на 2 месяца?",
            "Адрес, расстояние, свободные боксы, минимальный срок, доступ и цена",
            "Создать точные страницы объектов и условий аренды"
          ],
          [
            "Куда поставить мебель на время ремонта квартиры?",
            "Размер дверного проема, доступ для грузчиков, ограничения по вещам, упаковка",
            "Показывать реальные требования к приему и перемещению имущества"
          ],
          [
            "Как хранить сезонные шины рядом с домом?",
            "Допустимые категории, правила упаковки, температурный режим, выдача",
            "Не приписывать объекту специальные условия без подтверждения"
          ],
          [
            "Чем отличается индивидуальный бокс от ответственного хранения?",
            "Сторона договора, режим доступа, ответственность и страхование при наличии",
            "Разделить форматы сервиса и его договорные обязанности"
          ]
        ],
        "proofTitle": "Чем подтвердить условия конкретного пункта хранения",
        "proofIntro": "Статья 886 ГК РФ регулирует договор хранения. При аренде индивидуального помещения правовая конструкция может быть иной; название услуги и рекламный текст сами по себе не определяют обязательства сторон.",
        "checks": [
          "Отдельные адреса, входы, подъезд, размеры ячеек, свободные места и ограничения на содержимое",
          "Договор, тариф по единице и сроку, депозит, условия доступа, порядок завершения услуги",
          "Реальные режимы безопасности, температура или влажность только при документальном подтверждении"
        ],
        "proofNote": "Эта специализация касается хранения имущества частных лиц и небольших компаний. Не путать ее с профессиональной складской логистикой и фулфилментом; кейсы соседних направлений не являются доказательством BMR self-storage.",
        "workTitle": "Как продвигать сервис индивидуального хранения в нейросетях",
        "workIntro": "Для каждого объекта проверяю локальные запросы, договор и товарную модель боксов как отдельных доступных предложений.",
        "steps": [
          {
            "title": "Составить матрицу локальных интентов",
            "body": "Выделяю поиск по району, назначению, размеру, сроку, цене и режиму доступа; фиксирую исходные рекомендации."
          },
          {
            "title": "Проверить адреса и фактические условия",
            "body": "Сверяю расположение, габариты, аренду или хранение, тарифы, ограничения, режим выдачи и доступные опции."
          },
          {
            "title": "Подготовить адресные страницы и источники",
            "body": "Ставлю ТЗ на описание пунктов, типов боксов, таблиц размеров, контактов, FAQ и профилей на картах."
          },
          {
            "title": "Повторить замер без смены сценария",
            "body": "Сравниваю ответы на те же промпты, выбранные адреса и BMR. Появление бренда не заменяет проверку корректности условий."
          }
        ],
        "faq": [
          {
            "question": "Договор аренды бокса и договор хранения одинаковы?",
            "answer": "Нет. При договоре хранения действуют обязательства хранителя, а при предоставлении пространства условия могут быть оформлены иначе. Нужно читать реальный договор сервиса."
          },
          {
            "question": "Можно ли рекомендовать размер бокса только по площади?",
            "answer": "Нет. Важны высота, проход, габариты дверей, упаковка и ограничения. Расчет вместимости следует подписывать как оценку для конкретного состава вещей."
          },
          {
            "question": "Означает ли видеонаблюдение страхование имущества?",
            "answer": "Нет. Охрана, видеозапись и страховая защита являются разными условиями. Страхование описывают только при наличии подтвержденного договора или опции."
          },
          {
            "question": "Нужны ли отдельные страницы каждого склада?",
            "answer": "Да, если адреса различаются условиями, доступностью и ассортиментом боксов. Страницы должны содержать собственные проверяемые сведения, а не дубли общего текста."
          },
          {
            "question": "Сколько стоит GEO для self-storage?",
            "answer": "Применяются общие тарифы GAEO. Объем зависит от числа объектов и районов, типов хранения и матрицы запросов."
          }
        ],
        "ctaTitle": "Узнать, рекомендуют ли нейросети ваши боксы",
        "ctaText": "Пришли сайт, адреса пунктов и действующие условия хранения. Я предложу первый замер по локальным сценариям выбора.",
        "request": "GEO self-storage: адреса, боксы, размеры, договор аренды или хранения, доступ, условия, тарифы и BMR."
      },
      "en": {
        "title": "GEO promotion for self-storage operators | GAEO.ru",
        "h1": "GEO promotion for self-storage and personal storage units",
        "description": "Self-storage GEO: local units, dimensions, access terms, custody versus space rental, accurate prices, locations and repeatable AI recommendation measurement.",
        "eyebrow": "Real estate / Self-storage",
        "lead": "People look for room to store furniture during renovation, seasonal equipment or the contents of a flat during a move. I check whether AI recommends the right type of storage service with accurate unit sizes, location, access rights and contractual conditions.",
        "heroPoints": [
          "Local buyer-intent checks by purpose, unit size and duration",
          "Review of contracts, access, available units and permitted contents",
          "Location-specific pages and repeatable BMR measurement"
        ],
        "problemTitle": "Why similar storage offers are not interchangeable",
        "problemIntro": "Self-service space rental and a custody service may sound identical in a short recommendation but differ materially in access and responsibility.",
        "problems": [
          {
            "title": "Space rental is presented as custody",
            "body": "Operators may grant access to a separate unit or accept goods under a safekeeping agreement. The customer's rights and the operator's duties depend on the actual service contract."
          },
          {
            "title": "Nominal floor area hides practical capacity",
            "body": "Square metres alone do not show ceiling height, door dimensions, lift access, corridor width or practical handling restrictions."
          },
          {
            "title": "Storage conditions and opening hours are vague",
            "body": "Access around the clock, staffed entry, seasonal tyre storage and humidity claims need evidence for each actual facility."
          }
        ],
        "scenarioTitle": "The local storage questions customers ask",
        "scenarioIntro": "Each example needs proof for a particular site, unit category and contractual arrangement. These prompts are not measured demand volumes.",
        "columns": [
          "Customer question",
          "What to verify",
          "GEO task"
        ],
        "scenarios": [
          [
            "Where can I rent a small unit near this metro station for two months?",
            "Site address, vacancy, minimum term, access windows and complete price",
            "Build precise site and unit-type pages"
          ],
          [
            "Where can I keep my furniture during a flat renovation?",
            "Door dimensions, goods lift, handling requirements, packaging and exclusions",
            "Publish real handling and storage conditions"
          ],
          [
            "Which facility accepts seasonal tyres near my home?",
            "Accepted goods, packaging, environmental conditions and pickup options",
            "Avoid unverified claims of specialist storage conditions"
          ],
          [
            "How does a storage unit differ from a custody service?",
            "Contract type, access, operator obligations and optional insurance",
            "Explain the actual legal and operational service model"
          ]
        ],
        "proofTitle": "Evidence for a trustworthy storage recommendation",
        "proofIntro": "Article 886 of the Russian Civil Code covers safekeeping contracts. A self-service space arrangement may use a different contractual model, so the operator's advertising label is not a substitute for the agreed terms.",
        "checks": [
          "Exact site addresses, routes, unit dimensions, availability and permitted items",
          "Signed terms, pricing units, minimum duration, deposits, entry arrangements and cancellation",
          "Verified security, climate conditions and insurance only where contractually supported"
        ],
        "proofNote": "Warehouse logistics and fulfilment evidence does not establish results for consumer self-storage. GAEO makes no claim of a completed self-storage GEO case or measured brand uplift here.",
        "workTitle": "How I would structure a self-storage GEO programme",
        "workIntro": "First make site-specific inventory and contractual conditions understandable, then test local purchase scenarios against AI answers.",
        "steps": [
          {
            "title": "Segment local buyer searches",
            "body": "Separate location, stored goods, capacity, duration, budget and access-intent prompts, recording baseline recommendations."
          },
          {
            "title": "Check facility-level evidence",
            "body": "Verify unit size, current availability, contract type, restrictions, addresses and operational claims."
          },
          {
            "title": "Prepare useful location content",
            "body": "Specify pages for each facility, unit-size guides, pricing and contract information, map profiles and direct enquiries."
          },
          {
            "title": "Review comparable AI recommendations",
            "body": "Repeat the initial prompts and assess factual accuracy, location relevance and BMR changes."
          }
        ],
        "faq": [
          {
            "question": "Is renting a storage unit the same as a custody contract?",
            "answer": "No. Custody entails defined safekeeping obligations, while the rental of space can allocate access and responsibility differently. The actual contract must control the description."
          },
          {
            "question": "Can a unit size be recommended from floor area alone?",
            "answer": "No. Height, access, goods dimensions and handling restrictions also matter; capacity estimates must identify their assumptions."
          },
          {
            "question": "Does CCTV mean the stored goods are insured?",
            "answer": "No. Surveillance and insurance are separate arrangements. Insurance should be advertised only if its actual coverage and terms can be verified."
          },
          {
            "question": "Should every storage location have its own website page?",
            "answer": "Yes, when locations have distinct addresses, availability or conditions. Each page should provide genuine site facts rather than repeated generic copy."
          },
          {
            "question": "What does GAEO charge storage operators?",
            "answer": "The published GAEO plans apply. Scope depends on facility count, areas served, unit types and the prompt matrix."
          }
        ],
        "ctaTitle": "Check which self-storage operators AI recommends",
        "ctaText": "Share your facilities, website and current unit terms. I will outline an initial audit for the relevant local storage questions.",
        "request": "Self-storage GEO: facilities, unit dimensions, rental/custody contracts, access hours, restrictions, pricing and BMR."
      }
    }
  },
  {
    "id": 83,
    "slug": "restaurants-coffee-chains",
    "group": "tourism",
    "routes": {
      "ru": "/industries/restaurants-coffee-chains/",
      "en": "/en/industries/restaurants-coffee-chains/"
    },
    "parent": {
      "ru": "/industries/tourism/",
      "en": "/en/industries/tourism/"
    },
    "methods": {
      "ru": [
        "/strategies/tourism-dmc-recommendations/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/tourism-dmc-recommendations/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "GEO-методика для туризма и гостеприимства",
        "Методика замера BMR"
      ],
      "en": [
        "GEO methodology for tourism and hospitality",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_363241/",
        "ru": "Постановление №1515: правила оказания услуг общепита (до 01.01.2027)",
        "en": "Russian Government Decree 1515: catering rules (effective through 1 January 2027)"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/regional/569257",
        "ru": "Роспотребнадзор: информация о меню и услугах общепита",
        "en": "Rospotrebnadzor: menu and customer information for food service"
      },
      {
        "href": "https://support.google.com/business/answer/9455840?hl=en",
        "ru": "Google Business Profile: редактор меню, цены и разделы блюд",
        "en": "Google Business Profile Help: restaurant menu editor"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение ресторанов и сетей кофеен | GAEO.ru",
        "h1": "Продвижение ресторанов и сетей кофеен в ответах нейросетей",
        "description": "GEO ресторанов и кофеен в ChatGPT и Алисе: география точек, актуальное меню, цены, бронирование, доставка, режим работы и замер рекомендаций.",
        "eyebrow": "Туризм и HoReCa / Рестораны и кофейни",
        "lead": "Гость выбирает место по кухне, району, компании, бюджету и времени визита. Для сетей добавляется различие филиалов: меню, часы работы, способ бронирования и доставка могут меняться от точки к точке. Проверяю, какие заведения рекомендуют нейросети по этим сценариям и какими сведениями они обосновывают ответ.",
        "heroPoints": [
          "Небрендовые запросы по кухне, случаю посещения, району и цене",
          "Проверка меню, адресов, режима работы, столиков и доступных каналов заказа",
          "Локальные посадочные и профили заведений с повторными замерами BMR"
        ],
        "problemTitle": "Почему нейросеть выбирает неправильное заведение",
        "problemIntro": "Рестораны конкурируют за локальный выбор и момент потребности. Старое меню или неверный адрес могут сделать рекомендацию неактуальной даже при известном бренде.",
        "problems": [
          {
            "title": "Меню и цены живут в разных версиях",
            "body": "На сайте, картах и сервисах заказа показываются разные блюда, граммовки и цены. Для сети нужно указывать, где действуют конкретные предложения, и когда сведения обновлялись."
          },
          {
            "title": "Филиалы смешаны в одном описании",
            "body": "Гость спрашивает о завтраке рядом с офисом, а нейросеть рекомендует адрес без утреннего меню. Нужны отдельные страницы точек и их реальная специализация."
          },
          {
            "title": "Бронирование и доставка не подтверждены",
            "body": "Ссылка на заказ или бронь не гарантирует свободный столик и доступность доставки в конкретное время. Ответ должен отправлять к действующим условиям и проверке доступности."
          }
        ],
        "scenarioTitle": "Четыре разных пути к выбору ресторана",
        "scenarioIntro": "Состав промптов зависит от формата заведения, городов и реальных услуг. Сценарии ниже не являются исследованием долей упоминаний.",
        "columns": [
          "Что спрашивает гость",
          "Какие сведения нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где позавтракать недалеко от офиса до 10 утра?",
            "Адрес филиала, часы работы, время завтраков и действующее меню",
            "Разделить филиалы и меню по времени и месту"
          ],
          [
            "Какой ресторан выбрать для ужина на 6 человек?",
            "Тип кухни, посадка, правила бронирования, актуальные контакты и бюджет",
            "Сделать условия группового визита доступными для проверки"
          ],
          [
            "Где купить кофе с десертом навынос рядом с метро?",
            "Адрес, точка выдачи, ассортимент, цены, режим работы",
            "Связать конкретное заведение с заказом навынос"
          ],
          [
            "Какие рестораны предлагают доставку в мой район?",
            "Реальная зона доставки, часы, меню, минимальный заказ и платформа",
            "Показывать условия доставки по адресу, а не по всему бренду"
          ]
        ],
        "proofTitle": "Меню и доступность должны подтверждаться",
        "proofIntro": "Правила оказания услуг общепита и разъяснения Роспотребнадзора помогают оценивать полноту сведений о блюдах и услугах. Google Business Profile предоставляет редактор меню, но сам профиль не доказывает наличие столиков, качество блюд или получение рекомендаций в ChatGPT.",
        "checks": [
          "Адрес каждой точки, действующие часы, способы связи, кухня и подтвержденные услуги",
          "Актуальные блюда, порции, цены, особенности состава и условия заказа или бронирования",
          "Разделение филиалов, правила доставки и источники отзывов без накрутки или вымышленных оценок"
        ],
        "proofNote": "В ноябре 2026 применяются действующие правила общепита; постановление №1515 имеет установленный срок действия до 1 января 2027 года, поэтому нормативную часть требуется перепроверять при дальнейшем обновлении страницы. На этой странице нет заявления об успешном GEO-кейсе конкретного ресторана.",
        "workTitle": "Как организую GEO для ресторана или сети",
        "workIntro": "Работа строится вокруг реального посещения и заказа, а для сети - отдельно для каждого адреса, где условия отличаются.",
        "steps": [
          {
            "title": "Составить матрицу запросов",
            "body": "Разделяю район, кухню, событие, состав гостей, бюджет, завтрак, доставку и фирменные блюда. Фиксирую базовые рекомендации."
          },
          {
            "title": "Проверить источники по каждой точке",
            "body": "Сопоставляю меню, часы, адреса, способы бронирования и условия заказа на сайте, картах и в сторонних профилях."
          },
          {
            "title": "Подготовить полезный контент и связи",
            "body": "Ставлю ТЗ на страницы филиалов, отдельные меню, FAQ, разметку доступных фактов и корректные профили заведений."
          },
          {
            "title": "Контролировать BMR и качество ответов",
            "body": "Повторяю те же промпты и проверяю не только упоминание бренда, но и точность адреса, меню и сценария заказа."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать отдельный филиал сети?",
            "answer": "Да. Для локальных запросов важны собственные часы, меню, контакты и доступные услуги филиала. Общая страница бренда не заменяет эти факты."
          },
          {
            "question": "Гарантирует ли меню в Google Business Profile рекомендации нейросетей?",
            "answer": "Нет. Оно помогает поддерживать сведения для сервисов Google, но не обеспечивает автоматически попадание в ответы ChatGPT или Алисы."
          },
          {
            "question": "Можно ли обещать свободный столик на основании страницы ресторана?",
            "answer": "Нет. Фактическая доступность зависит от даты, времени и состава гостей; для подтверждения используют действующий способ бронирования."
          },
          {
            "question": "Как учитывать доставку и заказ навынос?",
            "answer": "Отдельными сценариями с зонами обслуживания, временем работы, ассортиментом и условиями каждого канала заказа. Нельзя переносить доступность одного филиала на все остальные."
          },
          {
            "question": "Сколько стоит продвижение ресторана в нейросетях?",
            "answer": "Используются общие тарифы GAEO. Объем зависит от числа филиалов, городов, продуктовых сценариев и исходного замера."
          }
        ],
        "ctaTitle": "Проверить, какие рестораны рекомендуют нейросети",
        "ctaText": "Пришли сайт, города, список точек и меню. Определю набор запросов для первого измерения видимости ресторана или сети.",
        "request": "GEO ресторанов и сетей кофеен: меню, филиалы, часы работы, бронирование, доставка, локальные промпты и BMR."
      },
      "en": {
        "title": "GEO promotion for restaurants and coffee shop chains | GAEO.ru",
        "h1": "GEO and AI recommendations for restaurants and coffee shop chains",
        "description": "Restaurant and coffee shop GEO: location-specific menus, verified hours, prices, reservations, takeout, delivery and repeatable AI recommendations.",
        "eyebrow": "Travel and hospitality / Restaurants",
        "lead": "Diners choose venues by cuisine, neighbourhood, occasion, budget and time. Chains need an extra level of accuracy: menus, hours, bookings and delivery can differ by branch. I audit AI answers against those real choices rather than treating every outlet as interchangeable.",
        "heroPoints": [
          "Non-brand prompts for cuisine, occasion, location, price and time",
          "Branch-level menu, opening hours, reservation and delivery evidence",
          "Location landing pages and profiles followed by repeatable BMR checks"
        ],
        "problemTitle": "Why AI may recommend the wrong restaurant",
        "problemIntro": "Restaurants compete for a local decision at a specific moment. A stale menu or mistaken branch can invalidate an otherwise plausible recommendation.",
        "problems": [
          {
            "title": "Several conflicting versions of the menu",
            "body": "The website, maps and ordering apps may show different dishes, portion sizes and prices. Content should identify the outlet and the date of the currently valid offer."
          },
          {
            "title": "Individual outlets disappear inside the brand",
            "body": "A guest seeking breakfast may be directed to a branch without morning service. Separate location pages should reflect actual opening times, services and menu differences."
          },
          {
            "title": "Booking and delivery claims are too broad",
            "body": "A reservation button does not prove table availability; a delivery banner does not establish coverage for every postcode or time. Use current verifiable terms."
          }
        ],
        "scenarioTitle": "Different intents behind restaurant recommendations",
        "scenarioIntro": "Prompts should reflect the actual type of venue and markets served. These are illustrative buyer situations, not measured recommendation shares.",
        "columns": [
          "Guest question",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "Where can I have breakfast before 10 near my office?",
            "Specific branch, opening time, breakfast window and current menu",
            "Connect each location to its own time-bound offer"
          ],
          [
            "Which restaurant suits dinner for a party of six?",
            "Cuisine, group seating, reservation route, budget and direct contact",
            "Make conditions for group dining independently verifiable"
          ],
          [
            "Where can I get takeaway coffee and dessert by the station?",
            "Address, pickup service, menu, prices and trading hours",
            "Show accurate takeaway availability per branch"
          ],
          [
            "Which venues deliver to my neighbourhood tonight?",
            "Delivery radius, operating hours, ordering menu, minimum order and provider",
            "Avoid claiming chain-wide delivery without a local check"
          ]
        ],
        "proofTitle": "Reliable venue recommendations need current facts",
        "proofIntro": "Russian food-service consumer rules and Rospotrebnadzor guidance are useful for checking information shown to customers. Google Business Profile supports a restaurant menu editor; it does not certify a venue's food quality, free tables or inclusion in ChatGPT.",
        "checks": [
          "Accurate individual venue addresses, current hours, contact routes and cuisine or service claims",
          "Up-to-date menu items, prices, portions, ingredient information and reservation channels",
          "Branch-specific takeaway and delivery conditions, real review sources and consistent profiles"
        ],
        "proofNote": "The cited Russian Government Decree 1515 is currently scheduled to expire on 1 January 2027; re-check the legal basis before updating this page after that date. No completed restaurant GEO case or restaurant-specific BMR uplift is claimed.",
        "workTitle": "How I structure GEO for a restaurant or chain",
        "workIntro": "The starting point is a real dining or ordering decision, with each materially different branch treated separately.",
        "steps": [
          {
            "title": "Record the baseline buyer scenarios",
            "body": "Build prompts around neighbourhood, cuisine, occasion, group size, budget, breakfast, takeaway and delivery."
          },
          {
            "title": "Audit branch-specific sources",
            "body": "Compare menus, hours, addresses, booking methods and ordering conditions across site pages and map profiles."
          },
          {
            "title": "Specify practical content updates",
            "body": "Write briefs for venue pages, menus, FAQs, clear machine-readable facts and accurate business profiles."
          },
          {
            "title": "Recheck BMR and answer accuracy",
            "body": "Run the same prompts and inspect both brand inclusion and the correctness of the proposed branch, menu and booking scenario."
          }
        ],
        "faq": [
          {
            "question": "Can GEO focus on one branch of a restaurant chain?",
            "answer": "Yes. Local recommendations depend on the branch's genuine hours, menu, contact details and services, even when the parent brand is shared."
          },
          {
            "question": "Does a Google Business Profile menu guarantee AI recommendations?",
            "answer": "No. It can support Google surfaces with structured restaurant information, but does not guarantee results in ChatGPT or other AI services."
          },
          {
            "question": "Can the restaurant website prove a table is available?",
            "answer": "No. Availability depends on the exact date, time and party size. A live booking route is needed to check it."
          },
          {
            "question": "Should delivery and takeaway have separate prompts?",
            "answer": "Yes. Delivery area, service window and menu may differ from dine-in and vary by individual outlet."
          },
          {
            "question": "How does GAEO price restaurant GEO?",
            "answer": "Standard published GAEO plans apply. Work scope depends on outlets, cities, ordering channels and the baseline prompt matrix."
          }
        ],
        "ctaTitle": "Discover which restaurants AI actually recommends",
        "ctaText": "Share your website, locations and current menus. I will define a first measurement of relevant local dining and ordering questions.",
        "request": "Restaurant and coffee chain GEO: branch menus, hours, reservations, takeaway, delivery, local intent prompts and BMR."
      }
    }
  }
];
