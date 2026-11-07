/**
 * Phase 2J: evidence-led bilingual GEO pages for home improvement retail, pet supplies and household chemistry brands.
 * Catalogue IDs #87, #91, #99; shared imagery and canonical pricing only.
 * Phase 2I already owns #95–#98; avoid overlap. No invented client results.
 */
export const industrySpecializationsBatch2J = [
  {
    "id": 87,
    "slug": "home-improvement-online-stores",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/home-improvement-online-stores/",
      "en": "/en/industries/home-improvement-online-stores/"
    },
    "parent": {
      "ru": "/industries/ecommerce/",
      "en": "/en/industries/ecommerce/"
    },
    "methods": {
      "ru": [
        "/strategies/ecommerce-catalog/",
        "/strategies/ecommerce-measurement/",
        "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
      ],
      "en": [
        "/en/strategies/ecommerce-catalog/",
        "/en/strategies/ecommerce-measurement/",
        "/en/articles/agentic-commerce-readiness/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Структура товарного каталога для GEO",
        "Методика измерения видимости интернет-магазина",
        "Подготовка интернет-магазина к агентной торговле"
      ],
      "en": [
        "Product catalogue architecture for GEO",
        "How to measure online-store AI visibility",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing",
        "ru": "Google Search Central: Product/Offer, наличие, доставка и возвраты",
        "en": "Google Search Central: Product/Offer, availability, shipping and returns"
      },
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/product-variants",
        "ru": "Google Search Central: идентификация товарных вариантов ProductGroup",
        "en": "Google Search Central: variant identification with ProductGroup"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение магазинов товаров для дома и ремонта | GAEO.ru",
        "h1": "GEO-продвижение интернет-магазинов товаров для дома и ремонта",
        "description": "Продвижение магазинов товаров для дома и ремонта в ChatGPT и Алисе: размеры, совместимость, материалы, расход, комплектация, наличие, доставка и измерение BMR.",
        "eyebrow": "Электронная коммерция / Дом и ремонт",
        "lead": "Покупатель ищет не абстрактные материалы, а товар, который подходит под размеры помещения, поверхность, инструмент или задачу монтажа. Я проверяю, какие магазины нейросети рекомендуют по таким сценариям и насколько их каталоги позволяют проверить совместимость и реальную доступность.",
        "heroPoints": [
          "Небрендовые запросы по материалу, назначению, размерам и условиям монтажа",
          "Аудит характеристик SKU, вариантов, комплектации и складского наличия",
          "Подготовка понятных товарных данных и повторные замеры рекомендаций"
        ],
        "problemTitle": "Почему магазин не попадает в рекомендации по задачам ремонта",
        "problemIntro": "Для ремонта ошибочный выбор товара часто оборачивается дополнительными работами. Неопределенные характеристики и смешение вариантов снижают пригодность каталога для точного ответа.",
        "problems": [
          {
            "title": "Совместимость сведена к рекламной фразе",
            "body": "Размеры, тип крепления, основание, материалы и допустимые условия эксплуатации должны совпадать с инструкцией производителя. Фраза «подходит для всего» не заменяет характеристик."
          },
          {
            "title": "Упаковка и расход не сопоставимы",
            "body": "Продукт продается поштучно, в упаковках, рулонах и литрах. Площадь покрытия и расход зависят от основания и условий; расчет нельзя выдавать за универсальный факт."
          },
          {
            "title": "Наличие зависит от склада и региона",
            "body": "Крупногабаритные товары, тяжелые смеси и заказные позиции доставляются на разных условиях. Для точной рекомендации нужны реальные остатки, стоимость и доступные регионы."
          }
        ],
        "scenarioTitle": "Покупательские запросы, которые стоит измерять",
        "scenarioIntro": "Примеры коммерческих интентов, которые затем уточняются по товарным группам магазина и данным производителей.",
        "columns": [
          "Вопрос покупателя",
          "Что требуется проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить покрытие для ванной с подходящими характеристиками?",
            "Назначение для влажных помещений, материал, размеры, ограничения и наличие",
            "Сделать проверяемые фильтры и страницы изделий по сценарию применения"
          ],
          [
            "Как подобрать дверную фурнитуру под конкретные размеры?",
            "Межосевые размеры, крепления, совместимые модели и чертежи",
            "Связать совместимые изделия и отделить предположения от спецификаций"
          ],
          [
            "Какие краски можно заказать для определенного основания?",
            "Допустимые основания, подготовка поверхности, объем и расчетный расход по инструкции",
            "Показать применимость товара и условия, а не неподтвержденные свойства"
          ],
          [
            "Какой магазин доставит строительный материал в мой город?",
            "Актуальная цена, вес, склад, зона доставки, условия подъема и возврата",
            "Согласовать предложения, регионы и реальные условия выполнения заказа"
          ]
        ],
        "proofTitle": "Какие сведения подтверждают пригодность товара",
        "proofIntro": "Разметка Product и Offer помогает системам поиска обрабатывать цену, наличие и условия покупки; ProductGroup описывает допустимые варианты. Это технические ориентиры, а не гарантия рекомендаций ChatGPT. Свойства ремонтных материалов проверяются по паспортам и инструкциям самих производителей.",
        "checks": [
          "Характеристики: размеры, материал, область применения, совместимость, инструкция по монтажу и ограничения",
          "Товарная модель: SKU, единицы продажи, комплектность, варианты цвета и размера, достоверные остатки и цены",
          "Покупка: зона доставки, вес и габариты, условия возврата, фотографии товара и документы от производителя"
        ],
        "proofNote": "У GAEO есть методика для интернет-магазинов и работы с каталогами, однако подтвержденного кейса роста BMR отдельного магазина ремонта на этой странице нет.",
        "workTitle": "Как построю GEO-программу для магазина товаров для ремонта",
        "workIntro": "Сначала измеряю реальные вопросы о подборе товара. Затем проверяю, какие характеристики и подтверждения нужны для корректных ответов.",
        "steps": [
          {
            "title": "Разделить покупательские сценарии",
            "body": "Фиксирую запросы по назначению, совместимости, упаковке, бюджету и географии, отдельно учитывая брендовые запросы."
          },
          {
            "title": "Сверить каталог с первичными данными",
            "body": "Проверяю спецификации, варианты, единицы измерения, документацию, остатки и условия доставки для выбранных категорий."
          },
          {
            "title": "Исправить источники и структуру страниц",
            "body": "Готовлю ТЗ на фильтры, страницы продукции, FAQ по выбору и монтажным ограничениям, Product/Offer и экспертные материалы."
          },
          {
            "title": "Проверить динамику BMR",
            "body": "Повторяю сопоставимые промпты и анализирую источники, точность рекомендаций и наличие нужных товаров."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать магазин без собственных брендов?",
            "answer": "Да. Измеряем рекомендации продавцов по категориям, ассортименту, условиям доставки и подтвержденной компетенции подбора, не присваивая магазину свойства производителя."
          },
          {
            "question": "Зачем указывать единицу продажи и комплектацию?",
            "answer": "Нейросеть может спутать цену за штуку с упаковкой или набором. Отдельные SKU, количество в комплекте и фактические условия предложения помогают избежать ошибки."
          },
          {
            "question": "Может ли нейросеть сама гарантировать совместимость деталей?",
            "answer": "Нет. Совместимость подтверждается параметрами производителя, чертежами и условиями применения. При недостатке данных нужна явная оговорка, а не предположение."
          },
          {
            "question": "Поможет ли Schema.org получить рекомендации ChatGPT?",
            "answer": "Корректная разметка облегчает обработку фактов там, где она используется, но не гарантирует показ магазина в нейросети. Не менее важны реальные товарные сведения и внешние источники."
          },
          {
            "question": "Сколько стоит продвижение магазина товаров для ремонта?",
            "answer": "Применяются опубликованные тарифы GAEO. Объем работ зависит от числа категорий, вариантов товаров, регионов и исходного замера."
          }
        ],
        "ctaTitle": "Проверить, какие магазины ремонта рекомендуют нейросети",
        "ctaText": "Пришли сайт, 2–3 приоритетные товарные категории и регионы доставки. Я предложу проверку рекомендаций по реальным запросам покупателей.",
        "request": "GEO магазина товаров для дома и ремонта: совместимость, размеры, комплектация, доставка, товарный каталог и BMR."
      },
      "en": {
        "title": "GEO for home improvement online stores | GAEO.ru",
        "h1": "GEO for home improvement online stores",
        "description": "Home improvement store GEO: product compatibility, dimensions, materials, pack units, inventory, delivery and repeatable AI visibility measurement.",
        "eyebrow": "E-commerce / Home improvement",
        "lead": "Shoppers need products that fit a surface, room size, fixture or installation requirement. I analyse which stores AI recommends for these needs and whether the underlying catalogue can substantiate compatibility and live availability.",
        "heroPoints": [
          "Non-brand prompts by use case, dimensions, materials and installation needs",
          "SKU, pack unit, compatibility and inventory evidence review",
          "Better product content and repeatable AI recommendation checks"
        ],
        "problemTitle": "Why a home-improvement catalogue may not be recommended",
        "problemIntro": "Choosing the wrong material or fitting can require costly rework. Generic specifications and inconsistent variants undermine a precise recommendation.",
        "problems": [
          {
            "title": "Compatibility is described too broadly",
            "body": "Dimensions, fixings, substrate and allowed conditions should match the maker's technical documentation. A claim that a product works everywhere is not enough."
          },
          {
            "title": "Units and coverage are ambiguous",
            "body": "Items can be sold by piece, pack, roll or litre. Coverage depends on the actual surface and instructions, not a universal conversion."
          },
          {
            "title": "Delivery depends on region and item",
            "body": "Bulky goods, heavy materials and special orders have different stock and delivery limits. A recommendation needs accurate fulfilment terms."
          }
        ],
        "scenarioTitle": "The home improvement prompts worth measuring",
        "scenarioIntro": "Examples of commercial intents to refine against actual stock, product groups and manufacturer specifications.",
        "columns": [
          "Shopping question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which bathroom finish suits a particular environment?",
            "Material, dimensions, approved use in wet areas, limitations and stock",
            "Publish use-specific filters and verifiable product attributes"
          ],
          [
            "Where can I find hardware compatible with my door measurements?",
            "Mounting dimensions, compatible models, drawings and available options",
            "Explain fitment using the manufacturer's actual specification"
          ],
          [
            "Which paint can be ordered for a given substrate?",
            "Suitable substrates, preparation requirements, pack volume and stated coverage",
            "Distinguish approved applications from broad claims"
          ],
          [
            "Which supplier can deliver building materials to my city?",
            "Current offer, item weight, warehouse, shipping rules and return conditions",
            "Align live offers with the buyer's location"
          ]
        ],
        "proofTitle": "Evidence behind a useful product recommendation",
        "proofIntro": "Google's Product and Offer documentation covers product details, inventory and shipping, while ProductGroup describes relevant variants. These are search data practices, not a guarantee of ChatGPT recommendations. Product specifications need the manufacturer's own evidence.",
        "checks": [
          "Physical suitability: dimensions, materials, installation instructions, compatible uses and restrictions",
          "Catalogue structure: item SKU, pack units, included parts, colour or size variants, real inventory and prices",
          "Order conditions: delivery regions, dimensions and weight, returns, images and supporting product documents"
        ],
        "proofNote": "GAEO has general e-commerce catalogue methodology but does not claim a completed home-improvement-store GEO result or measured BMR uplift here.",
        "workTitle": "How I would structure home improvement GEO",
        "workIntro": "Measure the real product-selection question, then repair the gaps between manufacturer evidence, the storefront and external discovery sources.",
        "steps": [
          {
            "title": "Map purchase intents",
            "body": "Group prompts by use, compatibility, packaging, budget and region, with brand and non-brand results recorded separately."
          },
          {
            "title": "Verify catalogue facts",
            "body": "Review technical specifications, SKU variants, measurement units, documentation, inventory and delivery coverage."
          },
          {
            "title": "Improve discoverable content",
            "body": "Specify product filters, detailed pages, safe installation FAQs, suitable Product/Offer data and contextual expert guides."
          },
          {
            "title": "Recheck recommendations",
            "body": "Repeat the same prompts to measure BMR, source selection, matching accuracy and availability errors."
          }
        ],
        "faq": [
          {
            "question": "Can a retailer without its own brand benefit from GEO?",
            "answer": "Yes. Measure seller recommendations based on assortment, supported selection guidance and real delivery terms, without presenting the retailer as the manufacturer."
          },
          {
            "question": "Why do pack units and included components matter?",
            "answer": "An AI response can confuse a single item with a kit or pack. Exact units, components, SKUs and offer terms make comparison more accurate."
          },
          {
            "question": "Can AI guarantee that a fitting will be compatible?",
            "answer": "No. Fitment must be confirmed from actual dimensions and product instructions. Missing evidence should be stated explicitly."
          },
          {
            "question": "Does structured Product data guarantee AI inclusion?",
            "answer": "No. It helps participating services interpret product facts but cannot control AI answers. Accurate visible source content remains essential."
          },
          {
            "question": "How does GAEO price home-improvement GEO?",
            "answer": "Published GAEO plans apply. Scope depends on catalogue depth, item variants, regions and the baseline query set."
          }
        ],
        "ctaTitle": "See which home improvement stores AI recommends",
        "ctaText": "Share your store, priority categories and delivery regions. I will propose a relevant baseline measurement.",
        "request": "Home improvement retailer GEO: product compatibility, dimensions, pack units, delivery, catalogue and BMR."
      }
    }
  },
  {
    "id": 91,
    "slug": "pet-supplies-online-stores",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/pet-supplies-online-stores/",
      "en": "/en/industries/pet-supplies-online-stores/"
    },
    "parent": {
      "ru": "/industries/ecommerce/",
      "en": "/en/industries/ecommerce/"
    },
    "methods": {
      "ru": [
        "/strategies/ecommerce-catalog/",
        "/strategies/ecommerce-measurement/",
        "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
      ],
      "en": [
        "/en/strategies/ecommerce-catalog/",
        "/en/strategies/ecommerce-measurement/",
        "/en/articles/agentic-commerce-readiness/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Структура товарного каталога для GEO",
        "Методика измерения видимости интернет-магазина",
        "Подготовка интернет-магазина к агентной торговле"
      ],
      "en": [
        "Product catalogue architecture for GEO",
        "How to measure online-store AI visibility",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://wsava.org/global-guidelines/global-nutrition-guidelines/",
        "ru": "WSAVA: рекомендации по оценке питания домашних животных и кормовых этикеток",
        "en": "WSAVA: pet food labels and evidence-based nutrition selection"
      },
      {
        "href": "https://europeanpetfood.org/self-regulation/nutritional-guidelines/",
        "ru": "FEDIAF: руководство 2025 года по полнорационным и дополнительным кормам кошек и собак",
        "en": "FEDIAF: 2025 guidance for complete and complementary cat and dog food"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение интернет-магазинов зоотоваров | GAEO.ru",
        "h1": "GEO-продвижение интернет-магазинов зоотоваров",
        "description": "Продвижение зоомагазинов в ChatGPT и Алисе: корма, товары по виду и возрасту питомца, размеры аксессуаров, упаковки, наличие и достоверные рекомендации.",
        "eyebrow": "Электронная коммерция / Зоотовары",
        "lead": "Хозяин питомца ищет корм, переноску или шлейку для конкретного вида, возраста и размера животного. Я проверяю, какие магазины нейросети рекомендуют по таким вопросам, и сопоставляю ответы с данными товаров и актуальным ассортиментом.",
        "heroPoints": [
          "Запросы по виду питомца, возрасту, назначению и формату товара",
          "Проверка этикеток кормов, параметров аксессуаров и наличия SKU",
          "Сопоставимые замеры BMR и проверка фактической точности рекомендаций"
        ],
        "problemTitle": "Почему рекомендованный зоотовар может не подойти",
        "problemIntro": "В зоотоварах ошибка вида, возраста или размера имеет большее значение, чем общая популярность бренда. Факты о товаре должны быть привязаны к конкретному варианту.",
        "problems": [
          {
            "title": "Корм описан только рекламными эпитетами",
            "body": "Слова «премиальный» или «натуральный» не сообщают, является ли корм полнорационным, для какого вида и жизненного этапа он предназначен. Используются сведения этикетки и производителя."
          },
          {
            "title": "Размер аксессуара не сопоставлен с животным",
            "body": "У шлейки, ошейника и переноски важны фактические измерения, ограничения по весу и инструкции. Одна надпись «для маленьких собак» не гарантирует подходящий размер."
          },
          {
            "title": "Ветеринарные и торговые рекомендации смешиваются",
            "body": "Обычная подборка товаров не заменяет назначения ветеринарного врача, особенно при заболевании или лечебной диете. Маркетинговый контент не должен обещать лечение."
          }
        ],
        "scenarioTitle": "Какие запросы приводят покупателя в зоомагазин",
        "scenarioIntro": "Примеры для исходной матрицы; реальные категории определяются ассортиментом магазина и рынком продаж.",
        "columns": [
          "Вопрос владельца",
          "Что проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить полнорационный корм для котенка определенного возраста?",
            "Вид, жизненный этап, назначение корма, производитель, упаковка и наличие",
            "Уточнить товарные атрибуты и не подменять рацион общими рекламными обещаниями"
          ],
          [
            "Как выбрать шлейку для собаки с конкретным обхватом груди?",
            "Размерная сетка, диапазон измерений, материал, застежки и доступные варианты",
            "Создать проверяемые страницы размеров и инструкции производителя"
          ],
          [
            "Какая переноска подходит под заданные габариты питомца?",
            "Внутренние размеры, допустимая нагрузка, материал, условия перевозчика при применимости",
            "Различать реальную вместимость и рекламное описание"
          ],
          [
            "Какой магазин доставляет наполнитель нужного типа в мой регион?",
            "Состав, фасовка, вес, цена, остатки и зона доставки",
            "Связать товарную страницу с актуальным предложением и логистикой"
          ]
        ],
        "proofTitle": "На чем может основываться рекомендация зоотовара",
        "proofIntro": "Рекомендации WSAVA и руководства FEDIAF помогают оценивать факты о корме и его назначении; они не означают сертификацию конкретной марки этими организациями и не заменяют требования страны продажи.",
        "checks": [
          "Корм: вид животного, жизненный этап, тип рациона, заявленный состав, рекомендации производителя и формат упаковки",
          "Аксессуары: размеры, нагрузка, материал, инструкция, безопасные ограничения, настоящие фотографии и вариации SKU",
          "Покупка: производитель и продавец, наличие, сроки годности при применимости, доставка и возврат"
        ],
        "proofNote": "Это отраслевое применение общей методики GAEO для товарных каталогов. Завершенный результат продвижения конкретного зоомагазина или ветеринарная компетенция GAEO не заявляются.",
        "workTitle": "Как организую GEO для интернет-магазина зоотоваров",
        "workIntro": "Стартуем с реальных вопросов владельцев и допустимых критериев выбора, затем улучшаем источники, где нейросети ищут данные.",
        "steps": [
          {
            "title": "Разделить запросы по животным и товарам",
            "body": "Группирую вопросы по виду, возрасту, размеру, типу корма, аксессуарам, цене и доставке. Сохраняю исходные ответы и BMR."
          },
          {
            "title": "Сверить ассортимент с этикетками",
            "body": "Проверяю назначение кормов, информацию производителя, размерные сетки, варианты упаковок, действительное наличие."
          },
          {
            "title": "Сделать страницы и материалы точнее",
            "body": "Формирую ТЗ на товарные свойства, разделы подбора, FAQ, источники и корректные Product/Offer без медицинских обещаний."
          },
          {
            "title": "Повторить замер",
            "body": "Сравниваю те же запросы, источники, BMR и число некорректных рекомендаций по виду, возрасту и размеру."
          }
        ],
        "faq": [
          {
            "question": "Может ли магазин обещать лечебный эффект корма?",
            "answer": "Не следует переносить лечебные утверждения без соответствующих оснований. При заболеваниях рацион выбирается совместно с ветеринарным специалистом; задача GEO — точно передать проверенные сведения товара."
          },
          {
            "question": "Обозначение «премиальный корм» доказывает его качество?",
            "answer": "Нет. WSAVA рекомендует смотреть на более содержательную информацию о корме и производителе. Маркетинговая категория сама по себе не является подтвержденной характеристикой питания."
          },
          {
            "question": "Зачем учитывать размеры животного для шлейки или переноски?",
            "answer": "Размерные ограничения относятся к конкретному изделию. Обхваты, внутренние габариты и допустимая нагрузка позволяют сопоставить запрос с актуальным товаром."
          },
          {
            "question": "Можно ли делать GEO для зоомагазина только через категорийные статьи?",
            "answer": "Для рекомендаций нужны также достоверные страницы конкретных товаров, сведения об остатках и доставке. Текстовые статьи дополняют каталог, а не заменяют его."
          },
          {
            "question": "Какова цена продвижения интернет-магазина зоотоваров?",
            "answer": "Действуют единые тарифы GAEO. Окончательный объем определяется категориями, регионами, размером каталога и стартовым замером рекомендаций."
          }
        ],
        "ctaTitle": "Выяснить, какие зоомагазины рекомендуют нейросети",
        "ctaText": "Пришли магазин, основные категории, сведения производителей и регионы продаж. Я предложу матрицу исходных запросов.",
        "request": "GEO зоомагазина: вид и возраст питомца, корма, размеры аксессуаров, упаковка, наличие, доставка, BMR."
      },
      "en": {
        "title": "GEO for pet supplies online stores | GAEO.ru",
        "h1": "GEO for pet supplies online stores",
        "description": "Pet store GEO for AI recommendations: species, life stage, feed labels, accessory sizing, pack variants, inventory and trustworthy product evidence.",
        "eyebrow": "E-commerce / Pet supplies",
        "lead": "Pet owners select food, carriers and harnesses for a particular animal, life stage and size. I examine which retailers AI recommends for those intents and whether the underlying product evidence supports the suggestion.",
        "heroPoints": [
          "Non-brand prompts by animal, life stage, size and product category",
          "Review of food labels, accessory measurements and actual SKU availability",
          "Repeatable BMR measurement and accuracy checks"
        ],
        "problemTitle": "Why a recommended pet product may be unsuitable",
        "problemIntro": "A species, age or size mismatch matters more than a broad popularity claim. Each recommendation should point to an identifiable item and verifiable limitations.",
        "problems": [
          {
            "title": "Food is described using marketing labels",
            "body": "Premium or natural does not explain whether a food is complete, which species or life stage it targets, or what the manufacturer actually states."
          },
          {
            "title": "Accessories have vague sizing",
            "body": "Harnesses, collars and carriers need real measurements, load limits and instructions. A label saying suitable for small dogs is insufficient by itself."
          },
          {
            "title": "Retail information turns into medical advice",
            "body": "A product shortlist cannot replace a veterinarian's guidance for illness, therapeutic diets or treatment. Commercial content should not promise medical outcomes."
          }
        ],
        "scenarioTitle": "The pet shopping queries to measure",
        "scenarioIntro": "Example commercial prompts to refine for the retailer's actual catalogue and markets.",
        "columns": [
          "Owner question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I buy complete food for a kitten of a given age?",
            "Species, life stage, food type, maker, pack size and stock",
            "Publish exact feed attributes and avoid unsupported nutrition promises"
          ],
          [
            "Which harness fits a dog with a certain chest measurement?",
            "Sizing chart, measurement range, materials, buckles and available variants",
            "Provide variant-level fit information with maker evidence"
          ],
          [
            "What carrier fits my pet's dimensions?",
            "Internal dimensions, load limits, materials and carrier requirements where relevant",
            "Distinguish usable space from generic marketing claims"
          ],
          [
            "Which store ships a specified cat-litter type to my region?",
            "Material, pack size, weight, price, inventory and delivery coverage",
            "Align the product with a real local offer"
          ]
        ],
        "proofTitle": "Evidence behind a pet-product recommendation",
        "proofIntro": "WSAVA provides guidance on reading food labels and selecting appropriate foods. FEDIAF publishes nutrition guidelines for cat and dog food; neither source automatically certifies a particular brand or replaces local sale requirements.",
        "checks": [
          "Food: species, life stage, complete or complementary status, supported labelling and maker's feeding information",
          "Accessories: size measurements, permitted weight, instructions, clear photographs and actual SKU variants",
          "Orders: seller identity, stock, applicable expiry information, shipping coverage and returns"
        ],
        "proofNote": "GAEO applies general e-commerce catalogue methods here. No completed pet-store GEO case or veterinary qualification is claimed.",
        "workTitle": "How I would build pet store GEO",
        "workIntro": "Start with actual owner needs and the limits of the product evidence, then improve the information available to AI discovery tools.",
        "steps": [
          {
            "title": "Group animal and shopping intents",
            "body": "Separate species, life stage, size, food type, accessories, price and shipping queries; record a comparable baseline."
          },
          {
            "title": "Check manufacturer and catalogue data",
            "body": "Review food labels, accessory sizing, SKU variants, pack sizes and inventory against available source records."
          },
          {
            "title": "Improve product and category pages",
            "body": "Prepare briefs for reliable attributes, sizing guidance, FAQs, suitable product data and non-medical expert context."
          },
          {
            "title": "Compare the same prompts again",
            "body": "Measure BMR and audit errors in species, age, size and product availability with the same query set."
          }
        ],
        "faq": [
          {
            "question": "Can a pet shop make therapeutic claims about food?",
            "answer": "Product claims require the appropriate evidence. Medical diet selection for an animal with a condition belongs with a veterinarian, not a generic AI shopping recommendation."
          },
          {
            "question": "Does the word premium prove food quality?",
            "answer": "No. WSAVA encourages examining more meaningful manufacturer and label information rather than relying on marketing terms."
          },
          {
            "question": "Why must a harness or carrier have exact dimensions?",
            "answer": "A stated size category alone does not prove a fit. Real measurements, weight limits and instructions help match a product to the animal."
          },
          {
            "question": "Can pet store GEO rely on category articles alone?",
            "answer": "No. Credible recommendations also need accurate product pages, variants, inventory and fulfilment terms. Editorial content supports rather than replaces the catalogue."
          },
          {
            "question": "What does GAEO charge pet-supply retailers?",
            "answer": "Published GAEO plans apply. The final scope depends on product categories, locations, catalogue size and the baseline measurement matrix."
          }
        ],
        "ctaTitle": "Find out which pet stores AI recommends",
        "ctaText": "Share your store, key categories, manufacturer information and delivery regions. I will outline an appropriate baseline audit.",
        "request": "Pet supplies GEO: animal species and life stage, feed labels, accessory sizes, pack variants, inventory, delivery and BMR."
      }
    }
  },
  {
    "id": 99,
    "slug": "household-chemistry-brands",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/household-chemistry-brands/",
      "en": "/en/industries/household-chemistry-brands/"
    },
    "parent": {
      "ru": "/industries/ecommerce/",
      "en": "/en/industries/ecommerce/"
    },
    "methods": {
      "ru": [
        "/strategies/ecommerce-catalog/",
        "/strategies/ecommerce-measurement/",
        "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
      ],
      "en": [
        "/en/strategies/ecommerce-catalog/",
        "/en/strategies/ecommerce-measurement/",
        "/en/articles/agentic-commerce-readiness/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Каталог и данные товаров для рекомендаций нейросетей",
        "Как измерять нейровидимость интернет-магазина",
        "Готовность магазина к агентной торговле"
      ],
      "en": [
        "Catalogue evidence for AI product recommendations",
        "How to measure e-commerce AI visibility",
        "Preparing a store for agentic commerce"
      ]
    },
    "sources": [
      {
        "href": "https://markirovka.ru/knowledge/tovarnye-gruppy/kosmetika-bytovaya-himiya/kosmetika-bytovaya-khimiya-i-tovary-lichnoy-gigieny-podlezhashchie-obyazatelnoy-markirovke",
        "ru": "«Честный знак»: какие категории бытовой химии подлежат обязательной маркировке",
        "en": "Chestny ZNAK: categories of household chemicals subject to mandatory marking"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/575174",
        "ru": "Роспотребнадзор: изменения правил маркировки бытовой химии в 2026 году",
        "en": "Rospotrebnadzor: 2026 changes to household-chemical marking rules"
      }
    ],
    "content": {
      "ru": {
        "title": "Продвижение брендов бытовой химии в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение брендов бытовой химии",
        "description": "GEO-продвижение бытовой химии: назначение средства, поверхности, состав и предупреждения, объем, маркировка, доступность и рекомендации в ChatGPT и Алисе.",
        "eyebrow": "Электронная коммерция / Бытовая химия",
        "lead": "Покупатель ищет моющее или чистящее средство под конкретную задачу: поверхность, тип загрязнения, формат упаковки и ограничения применения. Я проверяю, какие бренды нейросети рекомендуют в этих сценариях и совпадают ли ответы с маркировкой и реальными характеристиками продукта.",
        "heroPoints": [
          "Небрендовые запросы по назначению средства и типу поверхности",
          "Проверка этикеток, условий применения, вариантов упаковки и маркировки",
          "Товарный контент, внешние подтверждения и повторный замер BMR"
        ],
        "problemTitle": "Что мешает бренду бытовой химии попасть в подходящий ответ",
        "problemIntro": "Универсальные рекламные обещания часто пропускают ограничения. Для рекомендаций важны точное назначение средства и сведения, позволяющие не предложить неподходящий продукт.",
        "problems": [
          {
            "title": "Свойства продукта обещают без оснований",
            "body": "Фразы о «любой поверхности», обеззараживании или гипоаллергенности нельзя переносить на весь ассортимент. Каждое существенное свойство требует доказательств и корректной формулировки."
          },
          {
            "title": "Упаковки и средства смешиваются",
            "body": "Концентрат и готовый раствор, бытовой и профессиональный продукт, флаконы разных объемов имеют разные параметры. Отдельно фиксируются артикулы и применимость."
          },
          {
            "title": "Рекомендации не учитывают меры предосторожности",
            "body": "Ограничения для материалов, предупреждения и условия хранения должны соответствовать этикетке. Не стоит создавать советы по смешиванию химических средств ради продвижения."
          }
        ],
        "scenarioTitle": "Потребности, по которым выбирают бытовую химию",
        "scenarioIntro": "Примеры для диагностики товарной видимости; после проверки ассортимента запросы адаптируются к разрешенным утверждениям и рынкам продаж.",
        "columns": [
          "Вопрос покупателя",
          "Данные для проверки",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какое средство подходит для очистки конкретного покрытия?",
            "Разрешенные производителем поверхности, ограничения и инструкция",
            "Связать товар с его подтвержденным назначением и предосторожностями"
          ],
          [
            "Где купить средство для уборки в канистре для бизнеса?",
            "Концентрация, объем, категория применения, минимальная партия, доставка",
            "Разделить бытовые и профессиональные варианты с реальными условиями"
          ],
          [
            "Какие средства для стирки доступны без выбранного компонента?",
            "Актуальный состав по этикетке, критерий исключения и ассортимент",
            "Дать проверяемый состав конкретной формулы без медицинских обещаний"
          ],
          [
            "Где заказать моющее средство нужного объема с доставкой?",
            "SKU, объем, актуальная цена, остатки, зона доставки и маркировка",
            "Синхронизировать товарную страницу с реальным предложением и каналами продаж"
          ]
        ],
        "proofTitle": "Какие данные проверяю до публикации",
        "proofIntro": "Правила цифровой маркировки отдельных видов бытовой химии менялись в 2026 году. Применимость к конкретному товару определяется его кодами классификации и действующими нормами; нельзя объявлять обязательной маркировку всей бытовой химии без исключений.",
        "checks": [
          "Безопасность и назначение: действующая этикетка, состав в пределах раскрываемых данных, предупреждения, ограничения по поверхностям и применению",
          "Товар и предложение: форма продукта, концентрация при указании, объем, артикул, сроки и условия хранения, цена и доступность",
          "Происхождение и маркировка: производитель, применимые разрешительные документы, категория по ТН ВЭД/ОКПД2, проверка требований «Честного знака»"
        ],
        "proofNote": "Практика GAEO в продвижении товарных категорий и логистических услуг помогает разбирать спрос и структуру каталога, но не доказывает результат GEO-продвижения конкретного бренда бытовой химии. Заявления об эффективности и безопасности подтверждаются отдельно.",
        "workTitle": "Как выстрою GEO-продвижение бытовой химии",
        "workIntro": "Задача начинается с того, по каким проблемам уборки выбирают продукцию. Затем сравниваем ответы с проверенными этикетками и текущим предложением.",
        "steps": [
          {
            "title": "Собрать стартовый спрос",
            "body": "Фиксирую запросы по назначению, поверхностям, формату упаковки, цене, объему и регионам; записываю исходные рекомендации нейросетей."
          },
          {
            "title": "Проверить продуктовые сведения",
            "body": "Сверяю утверждения с этикетками, действующим составом и документами; отмечаю неподтвержденные свойства и ограничения."
          },
          {
            "title": "Подготовить страницы и публикации",
            "body": "Формирую ТЗ на SKU, категории применения, инструкции в разрешенном объеме, FAQ, маркировку и экспертные материалы без опасных советов."
          },
          {
            "title": "Провести повторный замер",
            "body": "Сравниваю BMR на исходных запросах, источники и ошибки назначения, не обещая рекомендацию в каждом ответе."
          }
        ],
        "faq": [
          {
            "question": "Можно ли обещать, что средство подходит для любой поверхности?",
            "answer": "Только если такое назначение подтверждено документацией конкретного продукта. Для разных покрытий, концентраций и составов могут действовать ограничения; они должны быть видимы пользователю."
          },
          {
            "question": "Вся бытовая химия подлежит обязательной цифровой маркировке?",
            "answer": "Нет, объем регулирования зависит от конкретного товара и его кодов классификации. Проверяем актуальный список категорий и исключений в официальных материалах «Честного знака»."
          },
          {
            "question": "Нужны ли рекомендации о смешивании чистящих средств для GEO?",
            "answer": "Нет. Рекламный контент не должен создавать опасные способы применения. Используем только проверенные рекомендации производителя и предупреждения на этикетке."
          },
          {
            "question": "Можно ли использовать опыт фулфилмента как кейс бренда бытовой химии?",
            "answer": "Нет. Опыт с логистикой и обработкой жидких товаров может помочь методике, но подтвержденный результат продвижения бренда требует отдельного проекта и повторных измерений."
          },
          {
            "question": "Сколько стоит продвижение бренда бытовой химии?",
            "answer": "Применяются общие тарифы GAEO. Объем зависит от ассортимента, числа продуктовых вариантов, рынков и согласованной матрицы запросов после диагностики."
          }
        ],
        "ctaTitle": "Проверить, какие бренды бытовой химии советуют нейросети",
        "ctaText": "Пришли сайт, группы товаров, актуальные этикетки или спецификации и регионы продаж. Я определю стартовые запросы для проверки видимости.",
        "request": "GEO-продвижение бренда бытовой химии: назначение, состав, предупреждения, маркировка, объем, остатки и BMR."
      },
      "en": {
        "title": "GEO for household cleaning product brands | GAEO.ru",
        "h1": "GEO for household cleaning product brands",
        "description": "Household cleaning brand GEO: intended use, surfaces, formula and safety claims, packaging, labelling, availability and AI recommendations.",
        "eyebrow": "E-commerce / Household cleaning products",
        "lead": "A buyer needs a cleaner for a specific task, surface, package size and set of usage restrictions. I check which brands AI recommends for those intents and whether the answers match the actual labels and product evidence.",
        "heroPoints": [
          "Non-brand prompts based on cleaning task, surface and product category",
          "Review of labels, supported claims, packages and applicable marking rules",
          "Product-source improvements, external evidence and repeat BMR checks"
        ],
        "problemTitle": "Why generic cleaning-product claims make poor recommendations",
        "problemIntro": "Broad advertising phrases often hide product constraints. Reliable matching depends on the stated use, warnings and whether an actual purchasable variant exists.",
        "problems": [
          {
            "title": "Performance claims exceed the evidence",
            "body": "Promises about all surfaces, disinfection or hypoallergenic properties should not be extended to an entire range without product-specific support."
          },
          {
            "title": "Product forms and pack sizes are conflated",
            "body": "Concentrates, ready-to-use products, home and professional lines and different volumes require clear distinctions, identifiers and purchasing terms."
          },
          {
            "title": "Usage restrictions are omitted",
            "body": "Surface limitations, warnings and storage instructions must follow the product label. Promotional copy must not invent advice about mixing cleaning chemicals."
          }
        ],
        "scenarioTitle": "The cleaning-product needs worth measuring",
        "scenarioIntro": "Illustrative buyer questions, to be adapted to the brand's real products and approved claims.",
        "columns": [
          "Buyer question",
          "Source evidence",
          "GEO action"
        ],
        "scenarios": [
          [
            "What cleaner is appropriate for a particular surface?",
            "Manufacturer-approved surfaces, limitations and instructions",
            "Match the right product to the intended use and stated precautions"
          ],
          [
            "Where can a business order a large-volume cleaning product?",
            "Concentration where relevant, volume, use category, order conditions and delivery",
            "Separate home and professional variants with accurate terms"
          ],
          [
            "Which laundry products exclude a specified ingredient?",
            "Current product label, composition evidence and actual assortment",
            "Publish verifiable formula distinctions without unsupported health promises"
          ],
          [
            "Where can I buy a specified pack size with delivery?",
            "SKU, pack volume, price, stock, coverage and relevant marking",
            "Keep product data and current offers consistent"
          ]
        ],
        "proofTitle": "Evidence to verify before claiming product suitability",
        "proofIntro": "Russia's digital product-marking rules for certain cleaning products were updated in 2026. Applicability depends on the specific classification codes and current regulations, not a blanket claim about every household product.",
        "checks": [
          "Use and safety: current label, supported composition information, warnings, surfaces and restrictions",
          "Product and offer: formulation, concentration if stated, pack size, SKU, shelf-life or storage limits, price and actual inventory",
          "Identity and compliance: manufacturer, relevant documents, commodity classification and applicable Chestny ZNAK requirements"
        ],
        "proofNote": "GAEO's product-category and fulfilment experience helps shape the audit, but it is not a completed household-cleaning-brand GEO success case. Performance and safety claims require separate evidence.",
        "workTitle": "How I would structure household cleaning GEO",
        "workIntro": "Start with the real cleaning need, then check whether the sources enable AI to recommend an appropriate product and actual seller.",
        "steps": [
          {
            "title": "Measure task-based prompts",
            "body": "Group prompts by use, surface, package, price, volume and location; record baseline answers and BMR."
          },
          {
            "title": "Verify product source material",
            "body": "Review actual labels, approved formulation claims, safety warnings and applicable documents; flag unsupported statements."
          },
          {
            "title": "Improve product and editorial pages",
            "body": "Specify variant pages, intended-use categories, safe FAQs, supported instructions and relevant third-party context."
          },
          {
            "title": "Repeat comparable measurements",
            "body": "Check BMR, sources, product matching and wrong usage claims against the same core prompts."
          }
        ],
        "faq": [
          {
            "question": "Can a cleaner be described as suitable for every surface?",
            "answer": "Only when the manufacturer has evidence supporting that specific product claim. Different surfaces and product formulations may have restrictions that must remain visible."
          },
          {
            "question": "Does mandatory digital marking cover every cleaning product?",
            "answer": "No. Scope depends on product classification and current rules. Check the applicable list and exceptions in official Russian marking guidance."
          },
          {
            "question": "Should GEO content suggest mixing cleaning agents?",
            "answer": "No. Marketing material must not invent hazardous uses. Rely only on manufacturer-supported instructions and product safety warnings."
          },
          {
            "question": "Can a fulfilment project be presented as a cleaning-brand GEO case?",
            "answer": "No. Logistics experience can inform the methodology, but measured brand-GEO results need their own project and comparable before-and-after evidence."
          },
          {
            "question": "How does GAEO price household-cleaning GEO?",
            "answer": "The published GAEO audit and monthly plans apply. Scope depends on the catalogue, product variants, markets and agreed measurement prompts."
          }
        ],
        "ctaTitle": "See which cleaning brands AI actually recommends",
        "ctaText": "Share your site, product lines, current labels or specifications and sales regions. I will define a useful baseline audit.",
        "request": "Household cleaning GEO: intended use, formulation claims, warnings, marking, pack size, availability and BMR."
      }
    }
  }
];
