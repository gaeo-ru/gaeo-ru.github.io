/**
 * Phase 2K: independent bilingual GEO specializations #92, #93, #94.
 * Sports nutrition, medical-device retail, and cosmetics claims require evidence-led copy.
 * Canonical prices, image assets and existing industry layout remain shared.
 */
export const industrySpecializationsBatch2K = [
  {
    "id": 92,
    "slug": "sports-goods-nutrition-stores",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/sports-goods-nutrition-stores/",
      "en": "/en/industries/sports-goods-nutrition-stores/"
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
        "Товарный каталог и факты для GEO",
        "Как измерять рекомендации интернет-магазина",
        "Как готовить магазин к агентной торговле"
      ],
      "en": [
        "Catalogue facts for product GEO",
        "Measuring online-store AI recommendations",
        "Preparing retail content for agentic commerce"
      ]
    },
    "sources": [
      {
        "href": "https://fhr.ru/antidoping/blacklist/",
        "ru": "Антидопинговая информация: риски состава спортивного питания и БАД",
        "en": "Anti-doping information: risks of unverified sports nutrition and supplement composition"
      },
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/product-variants",
        "ru": "Google Search Central: варианты товара, Product и ProductGroup",
        "en": "Google Search Central: Product and ProductGroup variants"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение магазинов спортивных товаров и питания | GAEO.ru",
        "h1": "GEO-продвижение интернет-магазинов спортивных товаров и питания",
        "description": "Продвижение спортивных магазинов в ChatGPT и Алисе: подбор по виду спорта, размерам, нагрузке, составу питания, SKU, наличию и BMR.",
        "eyebrow": "Электронная коммерция / Спортивные товары",
        "lead": "В спортивном магазине ищут не название бренда, а подходящий размер обуви, инвентарь для конкретной дисциплины или продукт с проверяемым составом. Я выясняю, какие магазины нейросети рекомендуют по таким запросам, и проверяю, насколько ответы соответствуют каталогу и документам производителя.",
        "heroPoints": [
          "Запросы по виду спорта, уровню подготовки, нагрузке и бюджету",
          "Проверка размеров инвентаря, товарных вариантов и состава питания",
          "Исправление товарных источников и сопоставимые замеры BMR"
        ],
        "problemTitle": "Почему известный спортивный магазин могут не рекомендовать",
        "problemIntro": "Популярность магазина не доказывает пригодность конкретного товара для задачи покупателя. Ошибки в размерах, назначении и наличии мешают точным рекомендациям.",
        "problems": [
          {
            "title": "Спортивные параметры не связаны с моделью",
            "body": "Размер рамы, длина лыж, допустимая нагрузка тренажера или посадка обуви зависят от точного артикула и рекомендаций производителя. Универсальная таблица не подходит для всех моделей."
          },
          {
            "title": "Варианты и остатки расходятся",
            "body": "Цвет, размер, комплектация и масса упаковки могут быть отдельными SKU. Если цена и наличие относятся к другому варианту, даже правильная рекомендация приводит к ошибке покупки."
          },
          {
            "title": "О спортивном питании заявляют без доказательств",
            "body": "Состав, порция, предупреждения и ограничения должны соответствовать фактической этикетке. Нельзя приписывать БАД гарантированный эффект, отсутствие допинговых рисков или свойства лекарственного препарата."
          }
        ],
        "scenarioTitle": "По каким сценариям покупатели выбирают спортивные товары",
        "scenarioIntro": "Это примеры коммерческих запросов для диагностики. Матрица уточняется под реальные дисциплины, товары, аудитории и географию магазина.",
        "columns": [
          "Вопрос покупателя",
          "Какие факты нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где найти беговые кроссовки нужного размера для конкретного покрытия?",
            "Размерная сетка модели, назначение, материалы, остатки по размеру и региону",
            "Связать свойства конкретных моделей с запросами покупателей"
          ],
          [
            "Какой магазин продает тренажер с известной допустимой нагрузкой?",
            "Модель, допустимая нагрузка по паспорту, габариты, сборка и условия доставки",
            "Сопоставить подтвержденные технические параметры, а не рекламные обещания"
          ],
          [
            "Где заказать спортивное питание с указанным составом и вкусом?",
            "Ингредиенты и порция по этикетке, партия, формат упаковки, наличие и предупреждения",
            "Разделить товарные факты и неподтвержденные утверждения об эффективности"
          ],
          [
            "Где купить экипировку для соревнований с доставкой до старта?",
            "Требования дисциплины, размеры, актуальные остатки, дата и зона доставки",
            "Показывать только реальные товары и выполнимые условия покупки"
          ]
        ],
        "proofTitle": "На какие данные можно опираться в спортивном GEO",
        "proofIntro": "Для экипировки проверяем характеристики изготовителя, а для питания точное назначение, состав и предупреждения. Антидопинговые организации предупреждают о рисках недостоверного состава добавок: это причина проверять факты, а не обещать спортивный результат.",
        "checks": [
          "Модель и применимость: вид спорта, размер, технические ограничения, материал, комплект, инструкции и источник характеристик",
          "Питание и добавки: товарная классификация, действующая этикетка, порция, список ингредиентов, предупреждения, происхождение и применимые документы",
          "Торговое предложение: разные SKU, размеры, вкусы, масса, текущая цена, остатки, региональная доставка и условия возврата"
        ],
        "proofNote": "GAEO применяет опыт работы с интернет-магазинами и каталогами. Эта страница не утверждает, что GAEO уже достиг измеренного роста BMR для спортивного магазина; медицинские и антидопинговые гарантии не заявляются.",
        "workTitle": "Как организую продвижение спортивного магазина",
        "workIntro": "Измеряю реальные сценарии выбора товаров, затем готовлю требования к карточкам, категориям и внешним источникам на основании проверенных параметров.",
        "steps": [
          {
            "title": "Исходный замер",
            "body": "Группирую запросы по дисциплине, типу товара, размеру, цене и географии. Записываю рекомендации по фиксированной матрице и рассчитываю исходный BMR."
          },
          {
            "title": "Проверка каталога",
            "body": "Сверяю спецификации, варианты SKU, этикетки питания, складские остатки и правила доставки с первичными данными магазина."
          },
          {
            "title": "ТЗ на источники",
            "body": "Уточняю структуру товаров и категорий, размерные таблицы, подбор оборудования, корректные Product/Offer и экспертные материалы."
          },
          {
            "title": "Повторные измерения",
            "body": "Сравниваю те же запросы, источники, BMR и ошибки в рекомендациях по размерам, назначению и наличию."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать магазин, который продает и экипировку, и спортивное питание?",
            "answer": "Да, но матрица запросов и доказательства у этих категорий разные. Технические параметры инвентаря проверяются по производителю, сведения о питании по этикетке и допустимым документам."
          },
          {
            "question": "Можно ли обещать безопасность спортивного питания для любого спортсмена?",
            "answer": "Нет. Состав и индивидуальные ограничения зависят от продукта и человека. Антидопинговые риски нельзя исключить одним рекламным утверждением или отзывом."
          },
          {
            "question": "Нужно ли создавать отдельные страницы для размеров и вкусов?",
            "answer": "Варианты должны иметь проверяемые SKU, цены и наличие. Архитектура URL зависит от каталога, но покупатель и поисковый сервис должны понимать выбранный вариант."
          },
          {
            "question": "Гарантирует ли ProductGroup попадание в ChatGPT?",
            "answer": "Нет. Структурированные данные помогают некоторым сервисам обрабатывать свойства товаров, но не гарантируют рекомендацию нейросети. Нужны факты и повторные измерения."
          },
          {
            "question": "Сколько стоит GEO для интернет-магазина спортивных товаров?",
            "answer": "Применяются единые тарифы GAEO на аудит и сопровождение. Объем зависит от числа категорий, размера каталога, географии и начальной матрицы запросов."
          }
        ],
        "ctaTitle": "Проверить рекомендации спортивных магазинов в нейросетях",
        "ctaText": "Пришли сайт, основные категории, документы по товарам и регионы доставки. Я подготовлю исходные запросы для диагностики.",
        "request": "GEO спортивного магазина: дисциплины, размерный ряд, экипировка, состав питания, SKU, доставка и BMR."
      },
      "en": {
        "title": "GEO for sports equipment and nutrition retailers | GAEO.ru",
        "h1": "GEO for sports equipment and nutrition online stores",
        "description": "Sports retailer GEO for AI recommendations: sport-specific equipment, sizing, approved nutrition labels, SKU variants, availability and BMR.",
        "eyebrow": "E-commerce / Sports equipment and nutrition",
        "lead": "Shoppers ask for running shoes that fit a particular use, equipment with documented specifications or nutrition products with clearly stated ingredients. I assess which retailers AI recommends for these needs and whether the answers are supported by actual catalogue evidence.",
        "heroPoints": [
          "Buyer intents by sport, experience level, equipment specifications and budget",
          "Review of sizing, actual product variants, labels and inventory",
          "Product information improvements and repeatable BMR measurement"
        ],
        "problemTitle": "Why a well-known sports shop may be missing",
        "problemIntro": "Brand recognition cannot prove that a specific item fits a user's sport or constraints. Model-level attributes and live stock are essential.",
        "problems": [
          {
            "title": "Performance specifications are not item-specific",
            "body": "Bike frame dimensions, ski lengths, equipment load limits and shoe fit vary by model. The manufacturer's evidence should back the exact SKU."
          },
          {
            "title": "Product variants and availability disagree",
            "body": "Sizes, colours, package weights and flavours can have separate stock and prices. An answer referencing the wrong variant is misleading."
          },
          {
            "title": "Nutrition claims exceed the label",
            "body": "Ingredients, serving sizes and cautions must reflect the product label. Supplements should not be portrayed as medicines or as free of all anti-doping risks."
          }
        ],
        "scenarioTitle": "Shopping questions worth measuring",
        "scenarioIntro": "Example commercial intents, to be adapted to actual sports categories, buyers and delivery areas.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I buy running shoes in a given size for a particular surface?",
            "Model sizing, intended use, materials, size-specific stock and shipping",
            "Make item-level suitability and availability discoverable"
          ],
          [
            "Which retailer offers a machine with a documented load rating?",
            "Model, permitted load, dimensions, assembly and delivery terms",
            "Verify actual technical parameters against manufacturer records"
          ],
          [
            "Where can I order sports nutrition with a specified ingredient list and flavour?",
            "Current ingredients, serving information, pack, stock and cautions",
            "Separate real product data from unsupported benefit claims"
          ],
          [
            "Which store can deliver competition equipment before my event?",
            "Discipline rules where relevant, sizing, inventory and realistic delivery timing",
            "Connect the correct product with fulfilment evidence"
          ]
        ],
        "proofTitle": "Evidence for defensible sports retail recommendations",
        "proofIntro": "Equipment requires model-level maker evidence. Nutrition product descriptions need precise ingredient and caution information. Anti-doping guidance warns that supplement composition may be unreliable, so neither performance outcomes nor an absence of risk should be inferred from advertising.",
        "checks": [
          "Equipment: intended sport, sizing, limitations, maker specifications, included components and manuals",
          "Nutrition: correct product classification, ingredients, serving information, warnings, traceable supplier and relevant documents",
          "Offer: genuine SKUs for sizes or flavours, prices, inventory, shipping zones and returns"
        ],
        "proofNote": "GAEO's broader e-commerce catalogue methodology informs this service. No finished sports-store GEO project, measured BMR lift, medical recommendation or anti-doping assurance is claimed.",
        "workTitle": "How I would build a sports retail GEO programme",
        "workIntro": "Start with the real buyer's activity and constraints, then fix missing data across catalogue pages, seller information and relevant external sources.",
        "steps": [
          {
            "title": "Establish a baseline",
            "body": "Group prompts by sport, product, size, budget and location; record the same networks, answers and inclusion rules."
          },
          {
            "title": "Verify product evidence",
            "body": "Check technical documents, size charts, nutrition labels, variant-level SKUs, availability and shipping."
          },
          {
            "title": "Improve discoverable sources",
            "body": "Write briefs for category pages, verified buying guides, Product/Offer data and contextual expert content."
          },
          {
            "title": "Recheck recommendations",
            "body": "Remeasure BMR and audit errors in sizing, intended use and fulfilment with a comparable query set."
          }
        ],
        "faq": [
          {
            "question": "Can sports equipment and sports nutrition share one GEO programme?",
            "answer": "Yes, but they need different buyer prompts and verification criteria. Equipment specifications and nutritional product labels must not be treated as interchangeable evidence."
          },
          {
            "question": "Can a retailer guarantee supplements are risk-free for athletes?",
            "answer": "No. Product composition and individual risks vary, and anti-doping concerns require appropriate caution. Marketing claims are not proof of safety."
          },
          {
            "question": "Do sizes and flavours need variant-level data?",
            "answer": "Yes. Each purchasable variation needs an accurate identifier, availability and price. The URL structure should match the actual store architecture."
          },
          {
            "question": "Will ProductGroup markup guarantee ChatGPT recommendations?",
            "answer": "No. Structured data can support product interpretation in services that use it; recommendations cannot be guaranteed."
          },
          {
            "question": "How does GAEO price sports-retail GEO?",
            "answer": "Published GAEO plans apply. Scope follows the product catalogue, target markets and the baseline prompt matrix."
          }
        ],
        "ctaTitle": "Check which sports retailers AI recommends",
        "ctaText": "Share your store, priority categories, manufacturer materials and shipping areas. I will outline a relevant baseline.",
        "request": "Sports retailer GEO: equipment, sizing, nutrition labels, SKU variants, shipping and BMR."
      }
    }
  },
  {
    "id": 93,
    "slug": "medical-supplies-online-stores",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/medical-supplies-online-stores/",
      "en": "/en/industries/medical-supplies-online-stores/"
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
        "Товарный каталог и факты для GEO",
        "Как измерять рекомендации интернет-магазина",
        "Как готовить магазин к агентной торговле"
      ],
      "en": [
        "Catalogue facts for product GEO",
        "Measuring online-store AI recommendations",
        "Preparing retail content for agentic commerce"
      ]
    },
    "sources": [
      {
        "href": "https://roszdravnadzor.gov.ru/medproducts/registration",
        "ru": "Росздравнадзор: регистрация медицинских изделий и применимые правила",
        "en": "Roszdravnadzor: registration requirements for medical devices"
      },
      {
        "href": "https://elk.roszdravnadzor.gov.ru/widget/",
        "ru": "Росздравнадзор: государственный реестр медицинских изделий",
        "en": "Roszdravnadzor: state register of medical devices"
      }
    ],
    "content": {
      "ru": {
        "title": "Продвижение магазинов медицинских товаров в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение интернет-магазинов медицинских товаров и оборудования",
        "description": "Продвижение онлайн-магазинов медицинских товаров в ChatGPT и Алисе: регистрация изделий, назначение, размер, комплектация, поставки и проверка BMR.",
        "eyebrow": "Электронная коммерция / Медицинские товары",
        "lead": "Покупатели медицинских товаров сравнивают назначение изделия, модель, размеры, доступность расходных материалов и документы. Я проверяю, какие интернет-магазины нейросети рекомендуют по таким запросам и есть ли достаточно достоверных сведений, чтобы не перепутать изделия и продавцов.",
        "heroPoints": [
          "Коммерческие запросы по изделию, модели, назначению и комплектации",
          "Проверка реестра, инструкции и фактических товарных предложений",
          "Разделение товарного подбора и медицинских советов, контроль BMR"
        ],
        "problemTitle": "Почему медицинским товарам нужна строгая проверка фактов",
        "problemIntro": "Общее слово «медицинский» не подтверждает регистрацию, назначение или совместимость товара. В рекомендациях нужно различать разные классы изделий и доступных поставщиков.",
        "problems": [
          {
            "title": "Регистрационные сведения не привязаны к модели",
            "body": "Номер регистрационного удостоверения и наименование изделия должны относиться к конкретной версии и изготовителю. Нельзя переносить документы одного товара на всю похожую категорию."
          },
          {
            "title": "Комплектация и совместимость неясны",
            "body": "Расходные материалы, адаптеры, размеры и принадлежности могут быть несовместимы между моделями. Свойства проверяются по инструкции и артикулам изготовителя."
          },
          {
            "title": "Коммерческая страница обещает медицинский результат",
            "body": "Информация о продаже изделия не заменяет профессиональный подбор и диагноз. Не допускаются вымышленные клинические преимущества, советы по лечению и смешение лекарств с медицинскими изделиями."
          }
        ],
        "scenarioTitle": "Какие запросы приводят покупателя к поставщику",
        "scenarioIntro": "Примеры товарных интентов; итоговый перечень зависит от вида изделий, режима продажи и профессиональной аудитории.",
        "columns": [
          "Вопрос покупателя",
          "Что требуется подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где купить конкретную модель медицинского прибора с документами?",
            "Модель и изготовитель, регистрационные сведения, инструкция, цена и наличие",
            "Сделать характеристики и проверку реестра доступными на странице товара"
          ],
          [
            "Как найти расходные материалы для имеющегося устройства?",
            "Совместимость по инструкции производителя, артикулы, упаковка и остатки",
            "Связать расходник с подтвержденным перечнем совместимых моделей"
          ],
          [
            "Кто поставляет оборудование медицинскому кабинету в мой регион?",
            "Перечень моделей, документы, комплектация, сроки поставки и сервисные условия",
            "Развести реальную поставку и общие заявления о возможностях магазина"
          ],
          [
            "Где заказать изделие нужного размера или конфигурации?",
            "Размерный ряд, ограничения применения, вариант SKU и условия возврата",
            "Исключить неверные размеры и недоступные варианты из рекомендаций"
          ]
        ],
        "proofTitle": "Что проверяется до того, как товар попадает в ответ",
        "proofIntro": "Государственная регистрация медицинских изделий в России и сведения реестра Росздравнадзора служат первичными источниками для соответствующих изделий. Статус определяется по точному наименованию и применимому режиму, а не по фотографии или рекламе.",
        "checks": [
          "Идентичность изделия: изготовитель, модель, регномер и статус регистрации при применимости, назначение и действующая инструкция",
          "Подбор и совместимость: размер, комплектация, аксессуары, расходники и ограничения по документации изготовителя",
          "Коммерческое предложение: реальное наличие, цена, упаковка, доставка, гарантийные и сервисные условия, статус продавца"
        ],
        "proofNote": "GAEO использует методику товарных каталогов и отраслевого анализа, но не заявляет отдельный измеренный кейс медицинского интернет-магазина. GEO-работы не являются медицинской консультацией.",
        "workTitle": "Как построю GEO-продвижение медицинского интернет-магазина",
        "workIntro": "Определяю реальные типы покупателей и допустимые товарные запросы, затем сверяю сведения с официальными реестрами и документацией производителя.",
        "steps": [
          {
            "title": "Разделить товарные интенты",
            "body": "Группирую запросы по виду изделия, модели, расходникам, аудитории, региону и форме поставки. Фиксирую исходные ответы и BMR."
          },
          {
            "title": "Проверить документы и модели",
            "body": "Сверяю точные товары с реестровыми записями, инструкциями, артикулами, комплектностью и фактическими предложениями."
          },
          {
            "title": "Подготовить безопасный контент",
            "body": "Готовлю ТЗ на товарные страницы, категории, документы, FAQ о продаже и совместимости, разметку и проверяемые публикации."
          },
          {
            "title": "Измерить результат",
            "body": "Повторяю сопоставимые запросы и отслеживаю BMR, источники и ошибки о регистрации, применимости и доступности изделий."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли проверять регистрацию каждого медицинского изделия?",
            "answer": "Регистрационный статус проверяется для изделий, на которые распространяются соответствующие требования. Сопоставляем модель, наименование, изготовителя и запись государственного реестра, учитывая законные исключения."
          },
          {
            "question": "Можно ли объединять медицинское оборудование и лекарства в одну товарную категорию?",
            "answer": "Нет. Это разные типы продукции с разными правилами обращения. Данная специализация посвящена медицинским изделиям и подходящим медицинским товарам, а не дистанционной продаже лекарств."
          },
          {
            "question": "Можно ли обещать лечебный эффект на странице магазина?",
            "answer": "Только утверждения о назначении и характеристиках изделия, подтвержденные допустимыми документами. Подбор терапии и индивидуальные медицинские рекомендации относятся к компетенции медицинских специалистов."
          },
          {
            "question": "Нужна ли совместимость расходников с конкретной моделью?",
            "answer": "Да. Ее нужно подтверждать документацией изготовителя и точным артикулом. Похожий внешний вид не доказывает, что расходный материал подойдет к устройству."
          },
          {
            "question": "Сколько стоит GEO-продвижение магазина медицинских товаров?",
            "answer": "Применяются общие тарифы GAEO. Объем зависит от групп изделий, регуляторных требований, количества SKU и первоначального замера BMR."
          }
        ],
        "ctaTitle": "Проверить рекомендации медицинских интернет-магазинов",
        "ctaText": "Пришли сайт, основные категории, регистрационные сведения и регионы поставок. Я предложу подходящую матрицу товарных запросов.",
        "request": "GEO медицинского интернет-магазина: изделия, реестровые сведения, модели, расходники, комплектация, поставки и BMR."
      },
      "en": {
        "title": "GEO for medical supplies and equipment retailers | GAEO.ru",
        "h1": "GEO for medical supplies and equipment online stores",
        "description": "Medical supplies retail GEO: device registration, product identity, intended use, accessories, inventory, delivery and measured AI recommendations.",
        "eyebrow": "E-commerce / Medical supplies and equipment",
        "lead": "Buyers compare the intended purpose of a device, model, dimensions, compatible accessories and reliable documents. I check which medical-supply retailers AI recommends, and whether those answers accurately reflect each purchasable item.",
        "heroPoints": [
          "Buyer intents by device type, model, components and procurement situation",
          "Verification of applicable device registration, instructions and current offers",
          "Safe separation of product selection from medical advice, with BMR checks"
        ],
        "problemTitle": "Why medical retail recommendations need stronger evidence",
        "problemIntro": "The word medical alone does not establish registration, intended use or device compatibility. AI responses must distinguish product categories and actual suppliers.",
        "problems": [
          {
            "title": "Registration information belongs to another model",
            "body": "The registration number and registered product name must be matched to the exact device, manufacturer and version. Documents cannot simply be copied to a similar product."
          },
          {
            "title": "Accessories and consumables lack fitment details",
            "body": "Disposable components, adapters, sizes and related devices may be incompatible. The maker's instructions and article numbers govern compatibility."
          },
          {
            "title": "Retail descriptions imply clinical outcomes",
            "body": "Selling a device is not a medical diagnosis. Unsubstantiated treatment claims and conflation of medicines with medical devices can mislead buyers."
          }
        ],
        "scenarioTitle": "Medical product shopping prompts to measure",
        "scenarioIntro": "Illustrative commercial questions; the actual set depends on product classification, sales rules and professional versus consumer buyers.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I buy a specific medical device with verifiable documentation?",
            "Exact device, maker, applicable registration, instructions, price and stock",
            "Connect product pages with trustworthy identity and registration evidence"
          ],
          [
            "Which consumable fits the device model I already own?",
            "Manufacturer compatibility guidance, reference numbers, packs and availability",
            "Create source-backed relationships between components and equipment"
          ],
          [
            "Which supplier delivers medical office equipment to my region?",
            "Real product list, specifications, documentation, delivery and service terms",
            "Distinguish verified supply capability from vague marketing language"
          ],
          [
            "Where can I order an item in a specific size or configuration?",
            "True variants, sizes, restrictions and order conditions",
            "Avoid recommending unavailable or unsuitable configurations"
          ]
        ],
        "proofTitle": "Evidence behind credible medical device offers",
        "proofIntro": "Roszdravnadzor maintains Russia's medical device registration framework and public records. For a device subject to registration, the applicable status should be checked against the exact registered item, not inferred from a product photograph.",
        "checks": [
          "Device identity: manufacturer, exact model, registration details and status where required, intended purpose and official instructions",
          "Fit and components: physical sizes, accessory references, consumables, configuration and manufacturer-specified restrictions",
          "Offer: real inventory, price, packaging, shipping, warranty and service conditions, clearly identified seller"
        ],
        "proofNote": "GAEO draws on e-commerce catalogue and sectoral research methodology. No completed medical supplies retailer GEO success or medical advisory qualification is claimed.",
        "workTitle": "How I would structure medical supplies GEO",
        "workIntro": "Begin with purchasing intent and applicable product regulations, then improve the evidence used to compare devices and sellers.",
        "steps": [
          {
            "title": "Define buyer and product intents",
            "body": "Group prompts by device type, exact model, consumables, delivery region and professional buying requirements. Save baseline answers and BMR."
          },
          {
            "title": "Validate registration and product data",
            "body": "Cross-check device names against applicable register entries, maker instructions, components and live stock records."
          },
          {
            "title": "Prepare compliant product content",
            "body": "Specify catalogue pages, document references, procurement FAQs, supported structured data and source-backed editorial material."
          },
          {
            "title": "Repeat comparable checks",
            "body": "Measure BMR and identify registration, suitability, accessory and stock errors with the same core prompts."
          }
        ],
        "faq": [
          {
            "question": "Should every medical device be checked against registration requirements?",
            "answer": "Check the applicable rules and status for each relevant device. Match the model, manufacturer and public record, while accounting for legally defined exceptions."
          },
          {
            "question": "Are medical equipment and prescription medicines the same retail category?",
            "answer": "No. They have different regulatory and commercial rules. This service addresses medical devices and related supplies, not remote prescription drug sales."
          },
          {
            "question": "Can a store promise a therapeutic result?",
            "answer": "Statements should reflect the device's verified intended purpose and relevant evidence. Individual diagnosis and treatment decisions belong with qualified healthcare professionals."
          },
          {
            "question": "Do compatible consumables need exact model references?",
            "answer": "Yes. Fit should be supported by the manufacturer's instructions and relevant reference numbers. Visual similarity is not sufficient."
          },
          {
            "question": "How does GAEO price medical supplies retailer GEO?",
            "answer": "Published GAEO plans apply. Scope depends on product groups, regulations, variants and the baseline measurement set."
          }
        ],
        "ctaTitle": "Check which medical suppliers AI recommends",
        "ctaText": "Share your site, device ranges, registration references and delivery markets. I will outline an appropriate baseline audit.",
        "request": "Medical supplies GEO: devices, registrations, model compatibility, consumables, inventory, delivery and BMR."
      }
    }
  },
  {
    "id": 94,
    "slug": "cosmetics-brands",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/cosmetics-brands/",
      "en": "/en/industries/cosmetics-brands/"
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
        "Товарный каталог и факты для GEO",
        "Как измерять рекомендации интернет-магазина",
        "Как готовить магазин к агентной торговле"
      ],
      "en": [
        "Catalogue facts for product GEO",
        "Measuring online-store AI recommendations",
        "Preparing retail content for agentic commerce"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/527769",
        "ru": "Роспотребнадзор: ТР ТС 009/2011, состав и маркировка косметической продукции",
        "en": "Rospotrebnadzor: TR CU 009/2011 on cosmetics ingredients and labelling"
      },
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/product-variants",
        "ru": "Google Search Central: сведения о товарных вариантах ProductGroup",
        "en": "Google Search Central: ProductGroup for variants"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение косметических брендов в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение косметических брендов в ответах нейросетей",
        "description": "Продвижение брендов косметики в ChatGPT и Алисе: состав INCI, назначение средств, линейки, маркировка, подтвержденные свойства и измерение BMR.",
        "eyebrow": "Электронная коммерция / Бренды косметики",
        "lead": "Косметический бренд выбирают по назначению средства, ингредиентам, типу кожи, текстуре и доступности конкретного продукта. Я проверяю, рекомендуют ли нейросети бренд по таким потребностям и совпадают ли их утверждения с фактической маркировкой и ассортиментом.",
        "heroPoints": [
          "Отдельные сценарии для бренда, косметической линейки и конкретного продукта",
          "Проверка INCI, назначения, предупреждений и подтвержденных свойств",
          "Связь брендовых источников с каталогом продавцов и повторным BMR"
        ],
        "problemTitle": "Почему косметический бренд теряется в ответах",
        "problemIntro": "Магазин косметики, производитель по контракту и владелец косметического бренда решают разные задачи. Для бренда нужно достоверно связывать его имя с конкретными линейками, составами и каналами покупки.",
        "problems": [
          {
            "title": "Активные ингредиенты превращаются в обещания лечения",
            "body": "Наличие ингредиента в INCI само по себе не доказывает эффект конкретной формулы. Рекламные заявления и сравнения должны соответствовать подтвержденным характеристикам готового продукта."
          },
          {
            "title": "Линейки и версии продукта перепутаны",
            "body": "Оттенок, объем, отдушка и упаковка могут менять SKU и доступность. Нейросеть не должна подставлять характеристики одной формулы другой."
          },
          {
            "title": "Происхождение бренда и документы непрозрачны",
            "body": "На сайте должны быть понятны владелец бренда, изготовитель, назначение, срок годности, предупреждения и применимые сведения о соответствии продукции. Факт контрактного производства не является отдельным кейсом продвижения бренда."
          }
        ],
        "scenarioTitle": "По каким запросам рекомендуют косметические бренды",
        "scenarioIntro": "Примеры коммерческих интентов; реальная матрица формируется из подтвержденных категорий и характеристик продуктов бренда.",
        "columns": [
          "Вопрос покупателя",
          "Какие данные нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какие бренды выпускают крем с определенным ингредиентом?",
            "Действующий состав INCI, продуктовая линейка, объем и доступность",
            "Связать ингредиенты с конкретным продуктом без неразрешенных обещаний"
          ],
          [
            "Где найти косметику без выбранной отдушки?",
            "Подтвержденный перечень ингредиентов конкретной формулы, оттенки и варианты",
            "Сделать проверяемые фильтры и не выводить состав по рекламному слогану"
          ],
          [
            "Какие российские бренды предлагают уход для заданной задачи?",
            "Действительное происхождение бренда, заявленное назначение, источники и ассортимент",
            "Соединить бренд, владельца и продукты через проверяемые сведения"
          ],
          [
            "Где купить определенный оттенок или объем средства?",
            "Артикул, оттенок, действующая формула, официальный продавец, цена и наличие",
            "Избежать смешения версий и недоступных товарных предложений"
          ]
        ],
        "proofTitle": "Что подтверждает сведения о косметическом бренде",
        "proofIntro": "ТР ТС 009/2011 регулирует безопасность и маркировку парфюмерно-косметической продукции в применимой юрисдикции. Требования зависят от конкретного продукта: утверждения о соответствии и регистрации должны опираться на документы, а не на общую известность бренда.",
        "checks": [
          "Формула и применение: INCI, назначение, способ использования, предупреждения, срок годности и действующие сведения на этикетке",
          "Бренд и доказательства: владелец торговой марки, производитель, подтверждаемые документы о соответствии и ссылки на проверяемые публикации",
          "Товары и покупка: линейки, оттенки, объемы, реальные SKU, продавцы, актуальное наличие, цены и география продаж"
        ],
        "proofNote": "Эта страница посвящена владельцам косметических брендов, а не розничным магазинам косметики №89 или контрактным производителям №85. GAEO не заявляет измеренный кейс роста BMR косметического бренда без подтверждений.",
        "workTitle": "Как выстрою GEO-программу для косметического бренда",
        "workIntro": "Начинаем с запросов, по которым покупатели ищут свойства и категории косметики. Затем связываем фактические данные продуктов с устойчивой идентичностью бренда.",
        "steps": [
          {
            "title": "Замер рекомендаций по потребностям",
            "body": "Отдельно измеряю названия бренда, небрендовые запросы по назначению средств, ингредиентам, линейкам, бюджету и регионам."
          },
          {
            "title": "Проверка формул и источников",
            "body": "Сверяю составы и заявления по актуальным этикеткам, спецификациям, документам и разрешенным материалам бренда."
          },
          {
            "title": "Доработка страниц бренда и товара",
            "body": "Готовлю ТЗ на структуру линеек, варианты, FAQ, производственные факты, подтвержденные публикации и Product/Offer при применимости."
          },
          {
            "title": "Повторный контроль BMR",
            "body": "Сравниваю одни и те же запросы, источники и ошибки состава или назначения в рекомендациях нейросетей."
          }
        ],
        "faq": [
          {
            "question": "Чем GEO косметического бренда отличается от продвижения интернет-магазина косметики?",
            "answer": "Бренду нужно устойчивое подтверждение его идентичности, линеек, состава и происхождения продуктов. Для магазина дополнительно важны подбор разных марок, остатки и доставка; это отдельный сценарий №89."
          },
          {
            "question": "Можно ли приписывать готовой формуле свойства одного ингредиента?",
            "answer": "Нет. Эффективность и назначение готового продукта нельзя доказать только наличием ингредиента. Используем допустимые утверждения и документы именно для конкретного средства."
          },
          {
            "question": "Нужен ли отдельный документ о соответствии для каждого вида косметики?",
            "answer": "Применимая процедура подтверждения соответствия зависит от категории товара и правил ТР ТС 009/2011. Проверяем требования к каждому ассортиментному сегменту и действующие документы."
          },
          {
            "question": "Нужно ли менять SKU при смене оттенка или формулы?",
            "answer": "Данные должны позволять различать реально продаваемые варианты и версии продукта. Для каждого предложения сверяем состав, артикул, цену и наличие."
          },
          {
            "question": "Сколько стоит продвижение косметического бренда в нейросетях?",
            "answer": "Действуют единые тарифы GAEO. Объем уточняется после исходного замера, оценки числа продуктовых линеек, регионов и запросов."
          }
        ],
        "ctaTitle": "Проверить, какие косметические бренды рекомендуют нейросети",
        "ctaText": "Пришли сайт бренда, список линеек, актуальные этикетки и основные рынки продаж. Я предложу измеримые запросы для стартовой диагностики.",
        "request": "GEO косметического бренда: INCI, назначение, линейки, документы, оттенки, продавцы и BMR."
      },
      "en": {
        "title": "GEO for cosmetics and skincare brands | GAEO.ru",
        "h1": "GEO for cosmetics and skincare brands in AI answers",
        "description": "Cosmetics brand GEO: INCI ingredients, product purpose, labels, brand identity, product ranges, shade variants and repeatable AI visibility.",
        "eyebrow": "E-commerce / Cosmetics brands",
        "lead": "Cosmetics brands are compared by product purpose, ingredients, texture, suitability claims and the availability of particular formulas. I analyse whether AI recommends the brand for these needs and whether the answers accurately reflect verified labels and product ranges.",
        "heroPoints": [
          "Distinct queries for brand identity, individual product lines and exact formulas",
          "Review of INCI, intended use, warnings and supported product claims",
          "Connections between brand sources, actual sellers and comparable BMR checks"
        ],
        "problemTitle": "Why cosmetic brands may be absent from AI answers",
        "problemIntro": "A cosmetics retailer, private-label manufacturer and consumer brand have different roles. A brand must connect its name to verifiable formulas, real collections and identifiable purchasing channels.",
        "problems": [
          {
            "title": "Ingredient mentions become treatment promises",
            "body": "The presence of an INCI ingredient does not prove a finished formula delivers a clinical or therapeutic result. Product-specific evidence is required for meaningful claims."
          },
          {
            "title": "Product versions are conflated",
            "body": "Shades, pack sizes, fragrances and reformulations can change the exact item and its availability. A recommendation must not borrow an ingredient list from another variant."
          },
          {
            "title": "Brand identity lacks verifiable backing",
            "body": "Brand ownership, maker information, usage instructions, expiry information and applicable compliance documents should be consistent and attributable."
          }
        ],
        "scenarioTitle": "Cosmetic brand questions to monitor",
        "scenarioIntro": "Illustrative commercial intents; the actual list depends on the brand's verified products and markets.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which brands sell a cream containing a specified ingredient?",
            "Current INCI, exact product line, volume and real availability",
            "Link ingredients to the actual formula without unsupported effects"
          ],
          [
            "Which products exclude a particular fragrance ingredient?",
            "Exact formula label, variants and an attributable ingredient list",
            "Provide verifiable selection criteria instead of vague clean-beauty slogans"
          ],
          [
            "Which local skincare brands serve a particular product need?",
            "Brand provenance, intended use, actual ranges and source-backed publications",
            "Connect the brand entity with genuine products and claims"
          ],
          [
            "Where can I buy a particular colour or pack size?",
            "SKU, shade, formula, authorised seller, offer price and inventory",
            "Keep variant and seller data consistent across sources"
          ]
        ],
        "proofTitle": "Evidence behind a defensible cosmetics recommendation",
        "proofIntro": "TR CU 009/2011 governs relevant cosmetic-product safety and labelling claims in its applicable market. Documentation and procedures vary by product classification; general brand recognition cannot replace product-specific verification.",
        "checks": [
          "Formula and intended use: current INCI list, label instructions, warnings, shelf life and evidence for specific claims",
          "Brand identity: owner, manufacturer, relevant conformity documentation and attributable editorial sources",
          "Commerce: product ranges, shades, sizes, accurate SKUs, approved sellers, stock, pricing and locations"
        ],
        "proofNote": "This service covers consumer cosmetics brands, separately from cosmetics retailers (#89) and contract cosmetics manufacturers (#85). GAEO makes no unsupported claim of completed cosmetics brand BMR growth.",
        "workTitle": "How I would develop cosmetics brand GEO",
        "workIntro": "Start with the actual product needs in buyer questions, then align formula evidence, brand identity and the purchasing information AI might use.",
        "steps": [
          {
            "title": "Measure buyer and brand intents",
            "body": "Group prompts by product purpose, ingredients, ranges, budget and country, measuring brand and non-brand recommendations separately."
          },
          {
            "title": "Validate formulas and brand claims",
            "body": "Compare claims with current labels, product files, supporting evidence and approved brand materials."
          },
          {
            "title": "Improve brand and product discovery",
            "body": "Specify collection pages, useful FAQs, variant and seller links, suitable product markup and source-backed brand publications."
          },
          {
            "title": "Recheck the same prompts",
            "body": "Measure BMR, citations and incorrect claims about ingredients, product purpose or availability with stable criteria."
          }
        ],
        "faq": [
          {
            "question": "How is cosmetics brand GEO different from a cosmetics retailer's GEO?",
            "answer": "A brand needs clear evidence of its identity, own formulas, product lines and provenance. A multi-brand retailer also needs comparisons, inventory and fulfilment data; these are distinct briefs."
          },
          {
            "question": "Does an INCI ingredient prove the product's effectiveness?",
            "answer": "No. Ingredient presence alone does not establish the performance of a finished formula. Claims need appropriate product-level support."
          },
          {
            "question": "Do all cosmetics follow identical conformity procedures?",
            "answer": "No. Applicable documentation and procedures depend on product classification and the relevant TR CU 009/2011 requirements."
          },
          {
            "question": "Do shade or formula changes need distinct product records?",
            "answer": "Actual versions must remain distinguishable through identifiers, ingredients, prices and availability, using the store's appropriate variant architecture."
          },
          {
            "question": "What does GAEO charge cosmetics brands?",
            "answer": "Published GAEO pricing applies. The final scope follows the baseline, product line count, markets and selected query matrix."
          }
        ],
        "ctaTitle": "Discover which cosmetics brands AI recommends",
        "ctaText": "Share your brand, current product ranges, labels and sales markets. I will outline a useful baseline query set.",
        "request": "Cosmetics brand GEO: INCI, product purposes, lines, compliance, variants, sellers and BMR."
      }
    }
  }
];
