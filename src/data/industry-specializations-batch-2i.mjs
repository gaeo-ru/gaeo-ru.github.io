/**
 * Phase 2I: four distinct bilingual GEO specializations, catalogue IDs 95–98.
 * Primary sources are explicitly linked. No fabricated client outcomes or guarantees.
 * Pricing, approved images and core templates remain shared with the canonical catalogue.
 */
export const industrySpecializationsBatch2I = [
  {
    "id": 95,
    "slug": "jewelry-brands-workshops",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/jewelry-brands-workshops/",
      "en": "/en/industries/jewelry-brands-workshops/"
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
        "Как готовить товарный каталог к рекомендациям",
        "Как измерять рекомендации интернет-магазинов",
        "Готовность интернет-магазина к агентной торговле"
      ],
      "en": [
        "Preparing a product catalogue for AI recommendations",
        "Measuring ecommerce recommendations",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://probpalata.gov.ru/check-uin",
        "ru": "Федеральная пробирная палата: проверка изделия по УИН",
        "en": "Federal Assay Chamber: jewelry item lookup by unique ID"
      },
      {
        "href": "https://probpalata.gov.ru/dmdk/razyasneniya-dlya-uchastnikov-oborota-dmdk-po-chasto-vstrechayushhimsya-voprosam-raboty-v-giis-dmdk/",
        "ru": "Федеральная пробирная палата: правила учета, маркировки и исключения для ювелирных изделий",
        "en": "Federal Assay Chamber: jewelry registration, marking and exceptions"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение ювелирных брендов и мастерских в нейросетях | GAEO.ru",
        "h1": "Продвижение ювелирных брендов и мастерских в ответах нейросетей",
        "description": "GEO для ювелирного бренда и мастерской: проба, металл, камни, УИН, индивидуальный заказ, стоимость и сроки. Проверяемые товарные данные и замеры BMR.",
        "eyebrow": "Электронная коммерция / Ювелирные бренды",
        "lead": "Кольцо на заказ и серийное украшение из каталога покупают по разным основаниям. Для одного важны размеры и материалы, для другого еще и эскиз, этапы изготовления и сроки. Я проверяю, какие бренды нейросети советуют по таким задачам и насколько их ответы подтверждаются данными мастерской.",
        "heroPoints": [
          "Отдельные запросы для готовых украшений, кастомизации и ремонта",
          "Проверка металла, пробы, камней, УИН и условий исполнения заказа",
          "Доказательные страницы изделий и замеры BMR по коммерческим интентам"
        ],
        "problemTitle": "Где покупатель теряет доверие к ювелирному предложению",
        "problemIntro": "В ювелирной категории стоимость сильно зависит от состава, веса и исполнения. Сходное фото не доказывает, что два изделия сопоставимы, а общие заявления о подлинности не заменяют проверяемые данные.",
        "problems": [
          {
            "title": "Неясна идентичность изделия",
            "body": "Проба, масса, вставка, размер, артикул и УИН, если он требуется, не сведены в одну товарную запись. Покупатель может принять разные изделия за одну модель."
          },
          {
            "title": "Индивидуальный заказ представлен как складской товар",
            "body": "Цена по эскизу, утверждение макета, сроки производства, аванс и возможность изменения заказа зависят от согласованных условий, а не от цены похожего кольца."
          },
          {
            "title": "Репутация опирается на неподтвержденные обещания",
            "body": "Слова «натуральный камень», «сертифицировано» или «гарантированная инвестиция» требуют разных доказательств. Без них нейросеть рискует рекомендовать изделие по неверному основанию."
          }
        ],
        "scenarioTitle": "По каким вопросам выбирают ювелирный бренд",
        "scenarioIntro": "Матрицу BMR составляю отдельно для готовых украшений, индивидуальных проектов и сервисных работ. В выборку включаются география, бюджет и фактические ограничения производителя.",
        "columns": [
          "Покупательский запрос",
          "Подтверждающие сведения",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где заказать помолвочное кольцо с определенным камнем и бюджетом?",
            "Тип и характеристики камня, металл, проба, размер, состав цены, срок",
            "Показать сопоставимые изделия и условия заказа"
          ],
          [
            "Какая мастерская изготовит обручальные кольца по эскизу?",
            "Портфолио с разрешением, этапы согласования, сроки, материалы и гарантия работ",
            "Отделить индивидуальный заказ от каталога"
          ],
          [
            "Как проверить подлинность золотого украшения перед покупкой?",
            "Применимые данные о клейме и УИН, возможность проверки в официальном реестре",
            "Дать проверяемую информацию без универсальных обещаний"
          ],
          [
            "Где изменить размер кольца или отремонтировать украшение?",
            "Виды принимаемых работ, ограничения по материалам, сроки и адрес мастерской",
            "Создать отдельные страницы сервисных работ"
          ]
        ],
        "proofTitle": "Какие сведения проверяю до публикации утверждений",
        "proofIntro": "Федеральная пробирная палата предоставляет проверку ювелирных изделий по УИН и разъясняет требования к обороту. Применимость маркировки и исключений зависит от конкретного вида изделия. Ссылки ниже служат источниками требований, а не подтверждением любого украшения клиента.",
        "checks": [
          "Товарный паспорт: металл, проба, вес, размеры, вставки, артикул, УИН при применимости и фактические фотографии",
          "Коммерческие условия: наличие, цена с составом работ, сроки изготовления или доставки, обмен и сервис",
          "Доказательства: документы и реальные примеры работ с разрешением на публикацию, согласованные заявления о материалах"
        ],
        "proofNote": "Кейс другого магазина или мастерской не доказывает успех продвижения ювелирного бизнеса. Сначала формирую базовый BMR; фактические результаты сообщаю только после сопоставимых замеров.",
        "workTitle": "Как выстраиваю GEO для ювелирной мастерской",
        "workIntro": "Разделяю серийную торговлю и услуги изготовления: у них разные запросы, страницы и доказательства.",
        "steps": [
          {
            "title": "Сегментирую спрос",
            "body": "Разделяю обручальные, помолвочные, подарочные украшения, ремонт и работу по эскизу. Фиксирую географию и бюджет."
          },
          {
            "title": "Проверяю товарные факты",
            "body": "Сверяю фактические материалы, идентификаторы и сроки с тем, что написано в каталоге и публичных профилях."
          },
          {
            "title": "Исправляю доступность сведений",
            "body": "Готовлю задания по структуре изделий, услуг, подтверждений, Product/Offer там, где товар действительно продается."
          },
          {
            "title": "Измеряю рекомендации",
            "body": "Повторяю одинаковую небрендовую выборку запросов, учитывая корректность бренда и достоверность рекомендаций."
          }
        ],
        "faq": [
          {
            "question": "Можно ли обещать подлинность всех изделий только по информации на сайте?",
            "answer": "Нет. Конкретное изделие нужно сопоставить с его документами, идентификаторами и применимыми официальными правилами проверки. Общая надпись бренда не заменяет проверку."
          },
          {
            "question": "Нужен ли УИН каждому украшению?",
            "answer": "Требования и исключения зависят от материала и вида изделия. Для российских ювелирных изделий из серебра предусмотрены особенности добровольного клеймения и маркировки. Проверять применимый режим нужно по первичному источнику."
          },
          {
            "question": "Продвигаются ли изготовление на заказ и готовые кольца одной страницей?",
            "answer": "Лучше разделить два сценария, если отличаются условия, спрос и подтверждения. Для готового изделия важны цена и наличие, для индивидуальной работы также эскиз, согласование и сроки."
          },
          {
            "question": "Гарантирует ли разметка Product рекомендации в ChatGPT?",
            "answer": "Нет. Разметка может облегчить понимание товарных данных в поддерживающих ее интерфейсах, но не гарантирует включения в ответы нейросетей."
          },
          {
            "question": "Сколько стоит GEO-продвижение ювелирного бренда?",
            "answer": "Действуют опубликованные общие тарифы GAEO. Объем зависит от ассортимента, числа услуг, регионов и стартового замера запросов."
          }
        ],
        "ctaTitle": "Проверить, каких ювелиров рекомендуют нейросети",
        "ctaText": "Пришли сайт или каталог, ключевые группы украшений, географию и условия изготовления. Составлю начальную матрицу запросов для аудита.",
        "request": "GEO ювелирного бренда: готовые украшения, работа по эскизу, металл, камни, УИН, сроки и рекомендации нейросетей."
      },
      "en": {
        "title": "GEO for Jewelry Brands and Workshops in AI Answers | GAEO.ru",
        "h1": "GEO Promotion for Jewelry Brands and Workshops",
        "description": "AI recommendation visibility for jewelry brands and workshops: metal, assay marks, gemstones, item identifiers, made-to-order services, verified pricing and BMR.",
        "eyebrow": "Ecommerce / Jewelry brands and workshops",
        "lead": "A bespoke engagement ring and a ready-to-ship pendant answer different buyer questions. The first requires design approval and production terms; the second relies on precise specifications and availability. I assess which businesses AI recommends for each decision and whether the claims can be verified.",
        "heroPoints": [
          "Separate demand for finished jewelry, bespoke commissions and repair",
          "Check materials, assay evidence, gemstone details, IDs and fulfillment terms",
          "Improve product evidence and measure comparable non-brand recommendations"
        ],
        "problemTitle": "Why a jewelry product image is not enough evidence",
        "problemIntro": "Two similar-looking pieces can differ in precious-metal content, stone specifications and production method. Their prices and promises cannot be compared responsibly without item-level facts.",
        "problems": [
          {
            "title": "Product identity is unclear",
            "body": "Metal, assay, weight, gemstone, dimensions, SKU and applicable registered identifiers are scattered across product pages or absent."
          },
          {
            "title": "Commissioned work looks like ready stock",
            "body": "A bespoke quote, design review, deposit and manufacturing schedule are not the same as an immediately purchasable catalog item."
          },
          {
            "title": "Authenticity and value claims lack evidence",
            "body": "Descriptions such as natural gemstone or verified precious metal require the right documents and identification. Claims of guaranteed investment returns should not be invented."
          }
        ],
        "scenarioTitle": "Buyer questions worth tracking",
        "scenarioIntro": "I separate product purchase, custom commission and repair intents, then set the geography and budget before measuring BMR.",
        "columns": [
          "AI shopping question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I commission an engagement ring with a specified stone and budget?",
            "Gem specification, material, size, actual quote structure and timeline",
            "Explain customization options and verified terms"
          ],
          [
            "Which workshop makes matching wedding rings from a design?",
            "Approved real portfolio, manufacturing steps, timing and materials",
            "Give bespoke services an independent factual page"
          ],
          [
            "How can I verify a gold jewelry item before buying in Russia?",
            "Applicable hallmark rules and official unique-ID lookup",
            "Link to the responsible registry and state limits"
          ],
          [
            "Where can a ring be resized or a bracelet repaired?",
            "Accepted materials and services, restrictions, address and timing",
            "Publish repair-specific service data"
          ]
        ],
        "proofTitle": "Evidence before AI recommendations are assessed",
        "proofIntro": "Russia's Federal Assay Chamber documents identification, marking and applicable exemptions, and offers public item checks. Which legal requirements apply depends on the specific piece; none of these public pages independently validates a customer's product.",
        "checks": [
          "Precise item facts: material, assay, weight, gemstone, size, SKU and any applicable registered ID",
          "Actual order facts: inventory, customization process, repair scope, timelines, returns and costs",
          "Verifiable photographs, consented examples of finished work and documentary claims"
        ],
        "proofNote": "Adjacent ecommerce expertise is a method, not a proven client result in jewelry. Results for this specialization require its own baseline and follow-up measurements.",
        "workTitle": "My GEO process for a jewelry business",
        "workIntro": "A maker, independent atelier and online retailer may have different service and product architectures.",
        "steps": [
          {
            "title": "Segment buyers",
            "body": "Separate engagement jewelry, gifts, bespoke commissions and repairs by budget and delivery region."
          },
          {
            "title": "Audit product truth",
            "body": "Match descriptions with underlying documents, items and service conditions."
          },
          {
            "title": "Improve factual pages",
            "body": "Plan product and service pages and apply Product/Offer where actual purchasing is offered."
          },
          {
            "title": "Track comparable responses",
            "body": "Repeat the fixed non-brand prompt set and flag unsupported or inaccurate AI claims."
          }
        ],
        "faq": [
          {
            "question": "Can a jewelry brand verify authenticity with a generic website statement?",
            "answer": "No. Check item-level evidence, relevant marking requirements and the official verification options that apply to the product."
          },
          {
            "question": "Does every jewelry item require the same identification procedure?",
            "answer": "No. Requirements and exceptions differ by material and product classification. The Federal Assay Chamber publishes current rules and explanations."
          },
          {
            "question": "Should bespoke rings and ready-made rings share one landing page?",
            "answer": "They may share navigation, but their core product facts and fulfillment terms are distinct. Dedicated pages are useful when each query has meaningful independent demand."
          },
          {
            "question": "Does Product structured data guarantee an AI recommendation?",
            "answer": "No. It is a way of conveying actual product information to compatible services, not a promise of visibility in ChatGPT or other AI interfaces."
          },
          {
            "question": "What does GEO for a jewelry brand cost?",
            "answer": "Published GAEO plans apply. Scope depends on inventory, service mix, regions and the initial prompt matrix."
          }
        ],
        "ctaTitle": "Find out which jewelry makers AI recommends",
        "ctaText": "Share your website, main product groups and commission terms. I will outline a suitable baseline audit.",
        "request": "Jewelry GEO: catalog vs bespoke rings, hallmark and identifiers, materials, inventory and recommendation tracking."
      }
    }
  },
  {
    "id": 96,
    "slug": "fashion-apparel-brands",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/fashion-apparel-brands/",
      "en": "/en/industries/fashion-apparel-brands/"
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
        "Как готовить товарный каталог к рекомендациям",
        "Как измерять рекомендации интернет-магазинов",
        "Готовность интернет-магазина к агентной торговле"
      ],
      "en": [
        "Preparing a product catalogue for AI recommendations",
        "Measuring ecommerce recommendations",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/product-variants",
        "ru": "Google Search Central: ProductGroup и варианты товаров",
        "en": "Google Search Central: ProductGroup and product variants"
      },
      {
        "href": "https://markirovka.ru/knowledge/tovarnye-gruppy/legkaya-promishlennost/etapy-i-sroki-markirovki-tovarov-legkoy-promyshlennosti",
        "ru": "Честный знак: этапы и сроки маркировки товаров легкой промышленности",
        "en": "Chestny Znak: apparel traceability and marking stages"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение брендов одежды и аксессуаров | GAEO.ru",
        "h1": "Продвижение брендов одежды и аксессуаров в ответах нейросетей",
        "description": "GEO для fashion-брендов: размеры, посадка, материалы, цветовые варианты, наличие, возвраты и маркировка. Каталог, ProductGroup, запросы и замеры BMR.",
        "eyebrow": "Электронная коммерция / Одежда и аксессуары",
        "lead": "Покупатель спрашивает нейросеть, где найти куртку под сезон, платье нужной посадки или сумку определенного формата. Ответ зависит от материалов, размеров, вариантов и реального наличия. Помогаю бренду превратить эти данные в проверяемое предложение и измеряю его присутствие в рекомендациях.",
        "heroPoints": [
          "Матрица спроса по назначению, посадке, размерам и материалам",
          "Согласованные SKU, цветовые варианты, цены, наличие и правила возврата",
          "Проверка маркировки для применимых товаров и динамики BMR"
        ],
        "problemTitle": "Почему коллекция в соцсетях не заменяет товарный каталог",
        "problemIntro": "Эмоциональный образ коллекции помогает бренду, но при подборе одежды нейросети нужны отличимые параметры конкретной вещи и достоверные коммерческие условия.",
        "problems": [
          {
            "title": "Размеры и посадка описаны неопределенно",
            "body": "Одна надпись «оверсайз» не объясняет мерки, размерную сетку и различия между моделями. Покупатель может получить ошибочную рекомендацию."
          },
          {
            "title": "Варианты скрыты за общим артикулом",
            "body": "Несколько цветов и размеров могут иметь отдельные SKU и остатки. Если каталог смешивает их, обещание доступного размера становится ненадежным."
          },
          {
            "title": "Статус маркировки и возврата неясен",
            "body": "Для части категорий одежды в России действует обязательная маркировка. Ее применимость нужно проверять по товарной группе; условия покупки и возврата должны соответствовать фактическому предложению."
          }
        ],
        "scenarioTitle": "Как покупатель формулирует запрос о бренде одежды",
        "scenarioIntro": "Сравниваю функциональные запросы, поиски бренда по стилю и запросы покупки конкретных моделей; наличие и регион доставки фиксируются на дату замера.",
        "columns": [
          "Запрос покупателя",
          "Нужные данные",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какой российский бренд делает непромокаемые куртки для города?",
            "Материал, подтвержденные свойства, размеры, уход и цена",
            "Показать проверяемые характеристики модели"
          ],
          [
            "Где купить платье на невысокий рост с быстрой доставкой?",
            "Размерная сетка, длина изделия, реальные остатки и доставка",
            "Связать варианты SKU и условия покупки"
          ],
          [
            "Какие марки предлагают кожаные сумки для ноутбука 15 дюймов?",
            "Состав материала, реальные внутренние размеры и фото",
            "Создать полезное сравнение по формату и вместимости"
          ],
          [
            "Где подобрать одежду с возможностью возврата по размеру?",
            "Актуальные условия возврата, способ заказа и примерки",
            "Прояснить правила на страницах товара и помощи"
          ]
        ],
        "proofTitle": "Какая фактура нужна бренду для проверяемого выбора",
        "proofIntro": "В документации Google ProductGroup описано объединение вариантов одного товара с собственными идентификаторами. Правила обязательной маркировки легкой промышленности в России меняются по группам и срокам; источники ниже помогают проверить применимость, но не подтверждают маркировку каждого артикула бренда.",
        "checks": [
          "Товар: модель, состав, реальные измерения, размерная сетка, цвет, SKU, фотографии, инструкции по уходу",
          "Продажа: остатки конкретного варианта, итоговая цена, регионы доставки, примерка и возврат",
          "Подтверждения: применимые сведения о маркировке и документах, источники заявленных свойств ткани"
        ],
        "proofNote": "Статистику продаж бренда и подтвержденные результаты продвижения одежды не придумываю. Эффект оценивается на фиксированной матрице BMR после выполнения работ.",
        "workTitle": "Как делаю GEO-программу для fashion-бренда",
        "workIntro": "Устанавливаю, какие вопросы связаны с функцией изделия, какие со стилем и брендом, а какие с возможностью купить нужный вариант.",
        "steps": [
          {
            "title": "Группирую коллекции по спросу",
            "body": "Выделяю сезонность, материалы, фасоны, целевую посадку, категории аксессуаров и важные регионы."
          },
          {
            "title": "Проверяю варианты",
            "body": "Сопоставляю цвета, размеры, SKU, доступность, фотографии и применимость маркировки."
          },
          {
            "title": "Формирую задания по каталогу",
            "body": "Определяю страницы моделей, варианты ProductGroup, сравнения, источники характеристик и FAQ."
          },
          {
            "title": "Повторяю замеры",
            "body": "Проверяю BMR, точность размерных рекомендаций и упоминания бренда на тех же запросах."
          }
        ],
        "faq": [
          {
            "question": "Достаточно ли указать универсальную таблицу размеров?",
            "answer": "Нет, если изделия имеют разные мерки и посадку. Нужна проверенная таблица модели и согласование выбранного размера с конкретным SKU."
          },
          {
            "question": "Нужно ли отдельное предложение для каждого цвета?",
            "answer": "Реальные варианты можно связать с базовой моделью и при необходимости дать отдельный адрес. ProductGroup позволяет описывать связь вариантов без выдуманных товаров."
          },
          {
            "question": "Любая одежда обязана иметь одинаковую маркировку?",
            "answer": "Нет. Обязательная маркировка распространяется на определенные товарные группы и вводится по этапам. Проверяйте актуальный код товара и условия применения правил."
          },
          {
            "question": "Гарантирует ли публикация ProductGroup появление в нейросетях?",
            "answer": "Нет. Разметка помогает систематизировать данные там, где ее поддерживают, но рекомендация зависит от множества других факторов."
          },
          {
            "question": "Как рассчитывается стоимость GEO для бренда одежды?",
            "answer": "Применяются действующие тарифы GAEO. Объем определяется числом товарных групп, вариантами, географией и базовой матрицей запросов."
          }
        ],
        "ctaTitle": "Узнать, какие бренды одежды советуют нейросети",
        "ctaText": "Пришли каталог, основные коллекции, таблицы размеров и регионы продаж. Подберу стартовые коммерческие вопросы для мини-аудита.",
        "request": "GEO fashion-бренда: размерные сетки, материалы, SKU, ProductGroup, наличие, маркировка и рекомендации нейросетей."
      },
      "en": {
        "title": "GEO Promotion for Fashion and Accessories Brands | GAEO.ru",
        "h1": "GEO for Clothing and Accessories Brands in AI Answers",
        "description": "GEO for apparel and accessories brands: sizing, fit, fabric, variants, inventory, returns and applicable marking. ProductGroup data and BMR measurement.",
        "eyebrow": "Ecommerce / Apparel and accessories",
        "lead": "People ask AI for a jacket suited to the climate, a dress with a particular fit or a bag for a laptop. A useful recommendation requires real dimensions, fabric facts, available variants and buying terms. I measure whether a brand appears for these needs and help correct the evidence behind each claim.",
        "heroPoints": [
          "Track need-based searches by fit, sizes, materials and occasion",
          "Link genuine SKUs, colours, inventory, delivery and return conditions",
          "Check product-group structure and applicable Russian traceability requirements"
        ],
        "problemTitle": "A lookbook cannot answer every product question",
        "problemIntro": "Brand imagery builds appeal, but product recommendation depends on facts that distinguish one style and size from another.",
        "problems": [
          {
            "title": "Fit descriptions are ambiguous",
            "body": "Words such as oversized and tailored are not substitutes for garment measurements, model-specific size charts or material information."
          },
          {
            "title": "Variations are mixed together",
            "body": "Sizes and colours can have their own SKUs, images and stock. An AI answer may recommend an unavailable variant when the product page hides those differences."
          },
          {
            "title": "Marking and return terms are disconnected",
            "body": "Rules for specified apparel categories are introduced by product group. A brand also needs accurate customer-facing delivery, fitting and return conditions."
          }
        ],
        "scenarioTitle": "Fashion product intents to measure",
        "scenarioIntro": "The baseline separates style inspiration from functional product choice and actual purchase availability.",
        "columns": [
          "AI buyer question",
          "Necessary facts",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which domestic brands make rain-resistant everyday jackets?",
            "Verified material properties, fit, sizes, care and price",
            "Describe testable features at model level"
          ],
          [
            "Where can I buy a petite-size dress with prompt delivery?",
            "Garment length, size chart, stock by SKU and location",
            "Connect sizes to genuine inventory and shipping"
          ],
          [
            "Which leather bags fit a 15-inch laptop?",
            "Actual internal dimensions, fabric or leather composition and product photos",
            "Build comparison-ready accessory details"
          ],
          [
            "Which brand offers clear size-based return terms?",
            "Current return policy, fulfillment and fitting process",
            "Publish specific purchasing and service information"
          ]
        ],
        "proofTitle": "Product evidence required before recommendation claims",
        "proofIntro": "Google describes how ProductGroup relates variants of one model. Russia's official marking information specifies stages for different textile product groups. Neither source establishes that a particular brand's SKU is compliant; that must be verified with its records.",
        "checks": [
          "Exact composition, measurements, fit, size charts, colour, SKU, photographs and care instructions",
          "Real variant inventory, prices, delivery region, returns and fitting conditions",
          "Applicable product markings and support for any performance claims about fabric"
        ],
        "proofNote": "Experience with ecommerce structure does not equal a measured GEO outcome for an apparel brand. I report a result only after comparable baseline and follow-up checks.",
        "workTitle": "How I structure GEO for a fashion label",
        "workIntro": "Style-led discovery and precise purchasing are different classes of prompts; both matter to a viable content model.",
        "steps": [
          {
            "title": "Map demand",
            "body": "Segment seasonal, style and function-led intent across the brand's garments and accessories."
          },
          {
            "title": "Audit variants",
            "body": "Validate each size and colour against SKU records, inventory and actual product attributes."
          },
          {
            "title": "Improve machine-readable facts",
            "body": "Prepare model pages, ProductGroup links, contextual FAQ and useful product comparisons."
          },
          {
            "title": "Measure again",
            "body": "Repeat the same queries and verify brand mentions, fit claims and product availability."
          }
        ],
        "faq": [
          {
            "question": "Is one generic size chart sufficient?",
            "answer": "Not when products differ in fit. Model-specific measurements and an accurate variant mapping reduce incorrect recommendations."
          },
          {
            "question": "Does every colour need a separate product page?",
            "answer": "No universal layout is required. Use genuine variant identifiers and accessible selection URLs where relevant; avoid duplicate pages with no useful differences."
          },
          {
            "question": "Are all apparel products subject to exactly the same marking rule?",
            "answer": "No. Check the applicable category, implementation date and official requirements for the actual item."
          },
          {
            "question": "Does ProductGroup ensure that ChatGPT recommends a brand?",
            "answer": "No. The structured data documents verified variants for compatible services; it cannot guarantee AI placement."
          },
          {
            "question": "What is the cost of GEO for a fashion brand?",
            "answer": "Published GAEO pricing applies. Scope reflects product groups, variants, markets and baseline prompts."
          }
        ],
        "ctaTitle": "Check which apparel brands AI recommends",
        "ctaText": "Send the collection catalogue, key sizes and delivery markets. I will prepare the starting recommendation audit.",
        "request": "Fashion brand GEO: fit, sizes, fabric, variants, stock, returns, applicable markings and BMR."
      }
    }
  },
  {
    "id": 97,
    "slug": "food-producers-retailers",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/food-producers-retailers/",
      "en": "/en/industries/food-producers-retailers/"
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
        "Как готовить товарный каталог к рекомендациям",
        "Как измерять рекомендации интернет-магазинов",
        "Готовность интернет-магазина к агентной торговле"
      ],
      "en": [
        "Preparing a product catalogue for AI recommendations",
        "Measuring ecommerce recommendations",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/572903",
        "ru": "Роспотребнадзор: проверка маркировки, состава и условий хранения продуктов",
        "en": "Rospotrebnadzor: food labels, ingredients, shelf life and storage"
      },
      {
        "href": "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing",
        "ru": "Google Search Central: товарные данные Product и Offer",
        "en": "Google Search Central: merchant Product and Offer data"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение производителей и продавцов продуктов питания | GAEO.ru",
        "h1": "Продвижение производителей и продавцов продуктов питания в нейросетях",
        "description": "GEO для пищевых брендов и продавцов: состав, пищевая ценность, срок годности, хранение, регион доставки, Product/Offer и контроль рекомендаций BMR.",
        "eyebrow": "Электронная коммерция / Продукты питания",
        "lead": "Когда человек просит нейросеть подобрать продукт по составу, рациону или способу доставки, ошибка в ингредиентах и сроке хранения может повлиять на безопасность выбора. Я проверяю рекомендации пищевых брендов и готовлю структуру фактов, которую можно сверить с маркировкой конкретного товара.",
        "heroPoints": [
          "Спрос по категории, составу, вкусу, упаковке и доступности",
          "Сверка описаний с официальной маркировкой и фактическими условиями хранения",
          "Разделение производителя, торговой марки и продавца в данных и BMR"
        ],
        "problemTitle": "Какие ошибки мешают сравнению продуктов",
        "problemIntro": "Для продовольственной категории одинаковое рекламное обещание может скрывать различия в составе и условиях покупки. Описание требуется привязать к конкретной упаковке и партии в пределах доступных проверяемых данных.",
        "problems": [
          {
            "title": "Состав и аллергенная информация упрощены",
            "body": "Надписи «натуральный» и «полезный» не заменяют список ингредиентов, заявленные ограничения и сведения с этикетки. Нельзя приписывать продукту лечебный эффект без оснований."
          },
          {
            "title": "Срок хранения и доставка не согласованы",
            "body": "Сухой продукт, охлажденный набор и замороженная продукция требуют разных условий хранения и логистики. Обещание доставки без этих параметров может вводить покупателя в заблуждение."
          },
          {
            "title": "Производитель и продавец перепутаны",
            "body": "Один бренд выпускает товар, другой сайт продает его в конкретном регионе. Нейросеть должна различать производителя, доступное предложение и место покупки."
          }
        ],
        "scenarioTitle": "Запросы о продуктах, по которым измеряю BMR",
        "scenarioIntro": "Матрица отделяет продуктовые предпочтения от медицинских запросов. Проверку состава и ограничений провожу по действующим данным производителя, а не по догадкам модели.",
        "columns": [
          "Вопрос покупателя",
          "Что нужно подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какой производитель предлагает продукты без указанного ингредиента?",
            "Полный состав и применимые предупреждения именно на нужной упаковке",
            "Дать фактический состав без медицинских обещаний"
          ],
          [
            "Где заказать охлажденные готовые блюда с доставкой в мой район?",
            "Температурный режим, срок годности, адресная доставка и наличие",
            "Разделить категории по реальным условиям хранения"
          ],
          [
            "Какие бренды делают продукты с известной пищевой ценностью?",
            "Значения на маркировке и размер порции или единицы измерения",
            "Подготовить сопоставимые характеристики"
          ],
          [
            "Где купить набор продуктов к определенной дате?",
            "Комплектация, срок доставки, остатки и условия замены",
            "Связать конкретные предложения с географией и датой"
          ]
        ],
        "proofTitle": "Какие документы и данные проверяю",
        "proofIntro": "Роспотребнадзор разъясняет состав обязательных сведений на маркировке пищевых продуктов, включая ингредиенты, количество, срок годности, изготовителя и хранение. Для сайта производителя это источник критериев сверки, но не разрешение автоматически объявлять продукт полезным или безопасным при любых условиях.",
        "checks": [
          "Конкретное наименование и SKU, изготовитель, состав, масса, пищевая ценность и заявленные ограничения",
          "Дата и срок годности, условия хранения, тип упаковки, реальные остатки и температурные условия доставки",
          "Источники сертификационных и иных заявлений по применимости, прозрачные условия покупки и возврата"
        ],
        "proofNote": "GEO-замер показывает упоминания и корректность ответа, а не подтверждает пищевую безопасность товара. Не переношу показатели другого бренда на эту категорию.",
        "workTitle": "Как строю GEO для пищевого производителя и продавца",
        "workIntro": "Разделяю производителя как источник товарных сведений и продавца как источник актуальной доступности, цены и условий доставки.",
        "steps": [
          {
            "title": "Классифицирую продукты",
            "body": "Разделяю категории по составу, способу употребления, упаковке и требованиям к хранению."
          },
          {
            "title": "Сверяю первичные сведения",
            "body": "Проверяю данные этикетки, товарных страниц, склада и доставки на явные противоречия."
          },
          {
            "title": "Улучшаю структуру каталога",
            "body": "Готовлю страницы товарных групп, Product/Offer для действительных предложений, FAQ и связи с производителем."
          },
          {
            "title": "Контролирую ответы",
            "body": "Повторяю исходную матрицу запросов, учитываю ошибки состава, доступности и бренда."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать продукт как лечебный или диетический без подтверждений?",
            "answer": "Нет. Пищевые характеристики, ограничения и специальные заявления должны соответствовать реальной маркировке и применимым требованиям. Нейросети не должны дополнять их медицинскими выводами."
          },
          {
            "question": "Нужна ли информация о сроке хранения на сайте?",
            "answer": "Для практического выбора она существенна. Указывайте подтвержденные срок и условия хранения конкретного продукта, а для скоропортящихся товаров также реальные ограничения доставки."
          },
          {
            "question": "Как различать производителя и интернет-магазин?",
            "answer": "В источниках разделяют сведения о происхождении и составе продукта от предложения продавца: цены, наличия, географии и сроков доставки."
          },
          {
            "question": "Гарантирует ли разметка Offer попадание товара в рекомендации?",
            "answer": "Нет. Разметка помогает представить проверяемые коммерческие сведения, но не гарантирует появления в ответе конкретной нейросети."
          },
          {
            "question": "Как формируется тариф для пищевого бренда?",
            "answer": "Действуют общие тарифы GAEO. Объем зависит от ассортимента, особенностей маркировки, регионов и набора проверяемых запросов."
          }
        ],
        "ctaTitle": "Проверить рекомендации бренда продуктов питания",
        "ctaText": "Пришли товарный каталог, этикетки ключевых продуктов и условия доставки. Подготовлю стартовые запросы без неподтвержденных пищевых и медицинских утверждений.",
        "request": "GEO продуктов питания: производитель, состав, маркировка, срок годности, хранение, доставка и BMR."
      },
      "en": {
        "title": "GEO for Food Producers and Retailers in AI Answers | GAEO.ru",
        "h1": "GEO Promotion for Food Producers and Retailers",
        "description": "AI visibility for food producers and retailers: verified ingredients, nutrition, shelf life, storage, regional delivery, Product/Offer and BMR measurement.",
        "eyebrow": "Ecommerce / Food producers and retailers",
        "lead": "A food recommendation based on ingredients or delivery needs dependable labeling and availability. Wrong storage or composition claims can affect a buyer's decision. I assess recommendations for food brands separately from retail offers and align product descriptions with verifiable packaging facts.",
        "heroPoints": [
          "Buyer demand by product type, ingredients, packaging and availability",
          "Verify labeling and storage data before making claims",
          "Separate manufacturer reputation from seller stock and delivery in BMR"
        ],
        "problemTitle": "Common failures in food recommendations",
        "problemIntro": "The same generic promotional description can obscure major differences between two packaged products. Buyers need item-level data and truthful delivery conditions.",
        "problems": [
          {
            "title": "Ingredients are reduced to slogans",
            "body": "Labels such as natural or healthy do not replace the actual ingredients, nutritional information and stated restrictions. Unsupported treatment claims must be excluded."
          },
          {
            "title": "Shelf life conflicts with fulfillment",
            "body": "Ambient, chilled and frozen goods depend on different storage and transport conditions. Availability cannot be communicated accurately without those constraints."
          },
          {
            "title": "The maker is mistaken for the retailer",
            "body": "The manufacturer determines product composition; the store controls local inventory, retail price and delivery. AI should distinguish these roles."
          }
        ],
        "scenarioTitle": "Food product questions for the baseline",
        "scenarioIntro": "I keep consumer product selection distinct from medical advice. Facts come from real manufacturer labels and commercial data.",
        "columns": [
          "Buyer question",
          "Verified inputs",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which producer sells foods without a specified ingredient?",
            "Current full ingredient declaration and applicable warnings",
            "Show correct composition without medical promises"
          ],
          [
            "Where can I order chilled prepared meals in my area?",
            "Storage temperature, shelf life, actual delivery coverage and inventory",
            "Explain region and cold-chain limitations"
          ],
          [
            "Which brands list verifiable nutritional values?",
            "Declared nutrition per stated measurement unit or serving",
            "Publish comparable product facts"
          ],
          [
            "Where can I buy a food gift box for a specified delivery date?",
            "Exact contents, stock, transit time and substitution rules",
            "Link offers to real dates and delivery limits"
          ]
        ],
        "proofTitle": "Data sources for trustworthy food descriptions",
        "proofIntro": "Rospotrebnadzor explains food labeling requirements for ingredients, quantity, expiration, producer and storage. Its guidance establishes what must be checked, not independent approval of any particular product.",
        "checks": [
          "Product identity, manufacturer, ingredient list, weight, nutritional declaration and relevant restrictions",
          "Packaging, shelf life, storage conditions, actual stock and temperature-sensitive shipping",
          "Support for any specialized product claims and up-to-date purchasing information"
        ],
        "proofNote": "Visibility metrics measure recommendations and their accuracy, not food safety certification. No outcome from another food business is asserted here.",
        "workTitle": "A GEO process for a food producer or seller",
        "workIntro": "The manufacturer's product record and the retailer's active offer must remain consistent without being treated as identical.",
        "steps": [
          {
            "title": "Group demand",
            "body": "Define meaningful product clusters by ingredients, use, packing format and storage."
          },
          {
            "title": "Check source facts",
            "body": "Compare label records with product pages, stock and delivery policies."
          },
          {
            "title": "Structure catalogue information",
            "body": "Plan factual category and product pages, valid Product/Offer and direct buyer answers."
          },
          {
            "title": "Re-measure",
            "body": "Run the same baseline queries and track incorrect ingredient, stock or brand claims."
          }
        ],
        "faq": [
          {
            "question": "Can a food brand claim medical benefits based on marketing copy alone?",
            "answer": "No. Claims must follow actual labeling and applicable requirements, and AI recommendations should not create medical benefits without evidence."
          },
          {
            "question": "Is shelf-life data important for GEO?",
            "answer": "Yes for product suitability and purchase decisions, especially when storage and transport conditions limit available delivery."
          },
          {
            "question": "Should manufacturer and retailer be shown as one business?",
            "answer": "No. Manufacturer information establishes product identity while the retailer supplies inventory, price, geography and delivery conditions."
          },
          {
            "question": "Does Offer markup guarantee an AI listing?",
            "answer": "No. Structured data can describe a real offer to supported services, but AI inclusion is not guaranteed."
          },
          {
            "question": "What does food brand GEO cost?",
            "answer": "GAEO's published pricing applies. Final scope follows product diversity, label checks, geography and the prompt set."
          }
        ],
        "ctaTitle": "Audit where AI recommends your food brand",
        "ctaText": "Share your catalogue, key labels and delivery terms. I will outline a bounded initial measurement.",
        "request": "Food brand GEO: manufacturer vs retailer, ingredients, labels, storage, delivery, offers and AI recommendation BMR."
      }
    }
  },
  {
    "id": 98,
    "slug": "children-product-manufacturers",
    "group": "ecommerce",
    "routes": {
      "ru": "/industries/children-product-manufacturers/",
      "en": "/en/industries/children-product-manufacturers/"
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
        "Как готовить товарный каталог к рекомендациям",
        "Как измерять рекомендации интернет-магазинов",
        "Готовность интернет-магазина к агентной торговле"
      ],
      "en": [
        "Preparing a product catalogue for AI recommendations",
        "Measuring ecommerce recommendations",
        "Agentic commerce readiness for online stores"
      ]
    },
    "sources": [
      {
        "href": "https://protect.gost.ru/tr/details/20172201-a028-437f-9355-43beb60f3b0d",
        "ru": "Росстандарт: ТР ТС 007/2011 для продукции детей и подростков",
        "en": "Rosstandart: TR TS 007/2011 for children's products"
      },
      {
        "href": "https://protect.gost.ru/tr/details/227543dd-6838-4c55-b44e-25dabab34665",
        "ru": "Росстандарт: ТР ТС 008/2011 о безопасности игрушек",
        "en": "Rosstandart: TR TS 008/2011 toy safety regulation"
      },
      {
        "href": "https://26.rospotrebnadzor.ru/ond/zpp/1580/",
        "ru": "Роспотребнадзор: сведения о возрасте, материале и маркировке игрушек",
        "en": "Rospotrebnadzor: age, material and marking requirements for toys"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение производителей детских товаров | GAEO.ru",
        "h1": "Продвижение производителей детских товаров в ответах нейросетей",
        "description": "GEO для производителей детских товаров: возрастные ограничения, материалы, безопасность, документы, артикулы, дилеры и измерение BMR в ChatGPT и Алисе.",
        "eyebrow": "Электронная коммерция / Производители детских товаров",
        "lead": "Родитель спрашивает, какую коляску, игрушку или детскую одежду выбрать для определенного возраста. Производитель отвечает за сведения о товаре и применимые доказательства соответствия, а продавец за наличие и доставку. Я измеряю, какие бренды нейросети рекомендуют, и устраняю расхождения между этими источниками.",
        "heroPoints": [
          "Отдельные запросы по возрасту, назначению и типу детского товара",
          "Проверка маркировки, инструкций, ограничений и документов по применимости",
          "Связь производителя, SKU и дилеров без вымышленных обещаний безопасности"
        ],
        "problemTitle": "Почему универсальная фраза «подходит детям» опасна для рекомендаций",
        "problemIntro": "Разные категории детских товаров регулируются по-разному. Описания должны соответствовать фактическому возрастному назначению и типу изделия; нейросеть не вправе переносить характеристики одной модели на другую.",
        "problems": [
          {
            "title": "Возрастные ограничения потеряны",
            "body": "Игрушка для детей старшего возраста и товар для младенцев имеют разные требования к маркировке и использованию. Неверная возрастная рекомендация может привести к опасной покупке."
          },
          {
            "title": "В одну категорию смешаны разные регламенты",
            "body": "ТР ТС 008/2011 относится к игрушкам, а ТР ТС 007/2011 к определенной продукции для детей и подростков. Применимость устанавливают по назначению и товарной группе."
          },
          {
            "title": "Производитель и дилер дают противоречивые сведения",
            "body": "Размер, комплектация, инструкция и возраст от производителя могут отличаться от описания на маркетплейсе. Модель рискует повторить неверную версию."
          }
        ],
        "scenarioTitle": "Какие запросы родителей и дилеров важны для BMR",
        "scenarioIntro": "Матрицу составляю отдельно для покупки конечным потребителем и B2B-выбора производителя или поставщика. Возрастные критерии сверяю с официальной информацией изделия.",
        "columns": [
          "Запрос",
          "Что подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какие производители выпускают развивающие игрушки для конкретного возраста?",
            "Фактическая возрастная маркировка, назначение, инструкции и предупреждения",
            "Устранить неточные возрастные рекомендации"
          ],
          [
            "Где найти детскую одежду из заявленного материала нужного размера?",
            "Состав ткани, размер, назначение, применимые документы",
            "Связать производителя с конкретными SKU"
          ],
          [
            "Какой производитель предлагает детские товары для сети магазинов?",
            "Каталог, оптовые условия, реальные сертификаты, сроки поставки",
            "Создать подтверждаемую B2B-страницу для дилеров"
          ],
          [
            "Где купить запасную часть или аксессуар к конкретной коляске?",
            "Точная совместимость по моделям и версиям, официальные инструкции",
            "Проверить совместимость, не подбирать наугад"
          ]
        ],
        "proofTitle": "Что проверяю в документах и товарной информации",
        "proofIntro": "Росстандарт публикует сведения о действующих технических регламентах 007/2011 и 008/2011. Роспотребнадзор поясняет маркировку игрушек, включая возраст и изготовителя. Это критерии проверки применимости, но не основание считать любой товар клиента безопасным без собственных документов.",
        "checks": [
          "Идентификация модели: производитель, артикул, назначение, возрастная маркировка, состав, размер и ограничения",
          "Применимые декларации или сертификаты, инструкции, предупреждения и даты актуальности сведений",
          "Связь официальной страницы изделия с дилерами, вариантами, наличием и условиями поставки"
        ],
        "proofNote": "Опыт продвижения детского интернет-магазина не равен подтвержденному результату производителя. Для этого сегмента нужны собственные коммерческие запросы и повторный замер BMR.",
        "workTitle": "Как выстраиваю GEO для производителя детских товаров",
        "workIntro": "В центре работы первичные сведения производителя, а дилерские страницы и маркетплейсы должны ссылаться на точную модель и актуальные инструкции.",
        "steps": [
          {
            "title": "Разделяю группы изделий",
            "body": "Определяю игрушки, детскую одежду, аксессуары и другие товары с собственными условиями применения."
          },
          {
            "title": "Сверяю безопасность и маркировку",
            "body": "Проверяю возраст, предупреждения, документы и соответствие описаний назначению изделия."
          },
          {
            "title": "Связываю бренд и продукцию",
            "body": "Проектирую страницы моделей, подтверждения производителя, дилерские сведения и B2B-условия."
          },
          {
            "title": "Проверяю ответы повторно",
            "body": "Считаю BMR по фиксированным сценариям и отдельно отмечаю ошибки в возрастных ограничениях и совместимости."
          }
        ],
        "faq": [
          {
            "question": "Можно ли автоматически считать все детские товары игрушками?",
            "answer": "Нет. Игрушки и иные товары для детей могут подпадать под разные технические регламенты. Требования нужно устанавливать по конкретному назначению изделия."
          },
          {
            "question": "Достаточно ли надписи «для детей от 0 лет»?",
            "answer": "Нет. Возрастная адресация должна подтверждаться действительной информацией изготовителя и применимыми требованиями. Нельзя приписывать изделию назначение, которого у него нет."
          },
          {
            "question": "Нужно ли показывать сертификаты на сайте производителя?",
            "answer": "Проверяемые сведения о применимой оценке соответствия полезны покупателям и дилерам. Указывать нужно настоящие документы именно на соответствующую продукцию, без расширения их области действия."
          },
          {
            "question": "Может ли GEO исправить неверную совместимость аксессуаров?",
            "answer": "Можно выявить расхождения в каталоге и внешних описаниях и подготовить ТЗ на корректировку. Фактическая совместимость подтверждается документацией производителя."
          },
          {
            "question": "Сколько стоит продвижение производителя детских товаров?",
            "answer": "Стоимость определяется опубликованными тарифами GAEO и согласованным объемом. Учитываются товарные группы, дилерские каналы, география и набор запросов."
          }
        ],
        "ctaTitle": "Проверить рекомендации производителя детских товаров",
        "ctaText": "Пришли перечень категорий, модели, инструкции и дилерские каналы. Предложу стартовый замер с акцентом на возраст и подтвержденные характеристики.",
        "request": "GEO производителя детских товаров: возраст, ТР ТС 007/008, документация, SKU, дилеры, совместимость и BMR."
      },
      "en": {
        "title": "GEO for Children's Product Manufacturers | GAEO.ru",
        "h1": "GEO Promotion for Children's Product Manufacturers",
        "description": "GEO for children's product manufacturers: age guidance, materials, safety evidence, SKU, retailers and measurable brand recommendation visibility.",
        "eyebrow": "Ecommerce / Children's product manufacturers",
        "lead": "Parents ask AI which stroller, toy or garment fits a child's age and intended use. Manufacturers control item specifications and applicable conformity evidence; sellers control inventory and local delivery. I measure brand recommendations and identify mismatches between these information sources.",
        "heroPoints": [
          "Separate demand by age, intended purpose and product category",
          "Verify genuine safety documents, instructions and age restrictions",
          "Connect manufacturer data to correct SKU and retailer offers"
        ],
        "problemTitle": "Why a broad 'safe for kids' label creates risk",
        "problemIntro": "Children's products have category-specific requirements. Recommendations must respect a particular item's stated age range and instructions rather than projecting one product's characteristics onto another.",
        "problems": [
          {
            "title": "Age restrictions are lost",
            "body": "Products for older children should not be casually recommended to infants. The actual age guidance and warnings must remain visible."
          },
          {
            "title": "Different regulatory categories are merged",
            "body": "Toy safety under TR TS 008/2011 and other defined children's product rules under TR TS 007/2011 require checking the actual product scope."
          },
          {
            "title": "Manufacturer and dealer descriptions conflict",
            "body": "Third-party listings may use incorrect sizes, contents or compatibility. AI can repeat the wrong version if official information is hard to locate."
          }
        ],
        "scenarioTitle": "Consumer and dealer questions to measure",
        "scenarioIntro": "I build distinct consumer and wholesale prompt groups, with age and compatibility requirements anchored to actual product instructions.",
        "columns": [
          "Buyer request",
          "Required evidence",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which brands make learning toys for a stated age?",
            "Actual age marking, instructions, warnings and intended use",
            "Avoid unverified age recommendations"
          ],
          [
            "Who manufactures children's clothing in a particular material and size?",
            "Composition, size, product category and applicable documents",
            "Link the producer to genuine product records"
          ],
          [
            "Which manufacturers supply children's goods to retail chains?",
            "Wholesale catalog, supply terms, valid conformity documentation",
            "Create a factual dealer-facing offer"
          ],
          [
            "Which accessory fits this exact stroller model?",
            "Verified compatibility by model and version, instructions",
            "Publish accurate compatibility information"
          ]
        ],
        "proofTitle": "Manufacturer evidence before AI claims",
        "proofIntro": "Rosstandart maintains information about TR TS 007/2011 and TR TS 008/2011. Rospotrebnadzor describes toy markings including age and manufacturer data. These sources explain what to verify; they do not certify a particular brand or item.",
        "checks": [
          "Product identity, manufacturer, SKU, intended use, age mark, materials and warnings",
          "Applicable certificates or declarations, real instructions and date-consistent statements",
          "Official product pages connected to genuine retailer variants and wholesale terms"
        ],
        "proofNote": "A case for children's retailers is not evidence of a measured result for a manufacturer. This specialization needs its own baseline and follow-up BMR checks.",
        "workTitle": "How I plan GEO for children's product manufacturers",
        "workIntro": "Official product information is the starting point; retailer catalogs and marketplace offers must not contradict it.",
        "steps": [
          {
            "title": "Classify product groups",
            "body": "Separate toys, clothes, accessories and other categories by actual purpose."
          },
          {
            "title": "Validate documentation",
            "body": "Match age marks, materials, warnings and applicable evidence to specific items."
          },
          {
            "title": "Connect product and distribution data",
            "body": "Plan official product records, manufacturer identity, verified retailer links and B2B descriptions."
          },
          {
            "title": "Measure comparable recommendations",
            "body": "Repeat the fixed prompt list and separately flag wrong age or compatibility statements."
          }
        ],
        "faq": [
          {
            "question": "Are all products for children legally classified as toys?",
            "answer": "No. Toys and other children's products may follow different technical regulations. Product scope and intended use must be checked individually."
          },
          {
            "question": "Is a generic 'from birth' claim sufficient?",
            "answer": "No. Only the manufacturer's genuine age guidance and applicable evidence should support such a claim."
          },
          {
            "question": "Should a producer publish conformity information?",
            "answer": "Relevant and verifiable documents can help buyers and distributors, but each document must relate to the actual product and applicable requirement."
          },
          {
            "question": "Can GEO fix inaccurate accessory compatibility in AI answers?",
            "answer": "A GEO audit can identify inconsistent listings and set corrective content tasks. Actual compatibility must come from verified manufacturer documentation."
          },
          {
            "question": "What does GEO cost for a children's goods producer?",
            "answer": "GAEO's published plans apply; scope depends on product categories, distribution channels, territories and baseline prompts."
          }
        ],
        "ctaTitle": "Measure AI recommendations of your children's brand",
        "ctaText": "Share product groups, model specifications, applicable instructions and distributor channels. I will outline an initial evidence-led audit.",
        "request": "Children's goods manufacturer GEO: age, TR TS 007/008, documentation, SKU, distributor data, compatibility and BMR."
      }
    }
  }
];
