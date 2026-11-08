/**
 * Phase 2AK: complete the remaining 107×2 industry tariff landing scope.
 * IDs #30 insurance brokers, #75 dealerships, #76 sourcing/import; original RU/EN.
 * Primary laws and regulators verified 2026-11-08; contract scope and prices shared.
 * No client results, insurance licence, guaranteed vehicle terms, or fixed import charges implied.
 */
export const industrySpecializationsBatch2AK = [
  {
    "id": 30,
    "slug": "insurance-brokers",
    "group": "finance",
    "routes": {
      "ru": "/industries/insurance-brokers/",
      "en": "/en/industries/insurance-brokers/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Все 107 отраслевых тарифов",
      "en": "All 107 industry GEO services"
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
        "Как измеряю BMR и рекомендации нейросетей"
      ],
      "en": [
        "How AI recommendations and BMR are measured"
      ]
    },
    "sources": [
      {
        "href": "https://www.cbr.ru/admissionfinmarket/navigator/ssd_brokers/",
        "ru": "Банк России: лицензирование страховых брокеров и требования к деятельности",
        "en": "Bank of Russia: insurance broker licensing and operating requirements"
      },
      {
        "href": "https://www.cbr.ru/finorg/",
        "ru": "Банк России: проверка лицензии и статуса участника финансового рынка",
        "en": "Bank of Russia: verify financial-market licence and status"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_1307/53ca108b05111f17badd0c1285b7c3a64cbb1d16/",
        "ru": "Закон №4015-1, статья 8: посредничество, раскрытие условий и обязанности брокера",
        "en": "Russian Insurance Law 4015-1, Article 8: brokerage scope and disclosures"
      },
      {
        "href": "https://cbr.ru/insurance/sro/",
        "ru": "Банк России: базовые стандарты защиты получателей услуг страховых брокеров",
        "en": "Bank of Russia: standards for protecting insurance brokerage clients"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение страховых брокеров в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение страховых брокеров в ответах нейросетей",
        "description": "Продвижение страхового брокера в нейросетях: корпоративные риски, лицензия Банка России, подбор покрытия, исключения, урегулирование убытков, тарифы GAEO и замеры BMR.",
        "eyebrow": "Финансы и страхование / Страховые брокеры",
        "lead": "Компании выбирают страхового брокера по конкретному риску: имущество, ответственность, перевозки или сложный корпоративный договор. Покупателю важно, кто анализирует предложения страховщиков, что исключено из покрытия и как брокер помогает при страховом случае. Я исследую такие вопросы в нейросетях, отделяя упоминание бренда от обоснованной рекомендации по задаче.",
        "heroPoints": [
          "Сравнение рекомендаций по видам рисков, типу бизнеса и регионам обслуживания",
          "Проверка брокерской лицензии, договорной роли, условий покрытия и вознаграждения",
          "Стартовый и повторные BMR-замеры на согласованных небрендовых запросах"
        ],
        "problemTitle": "Почему общий список страховых продуктов не объясняет пользу брокера",
        "problemIntro": "Страховой брокер, агент и страховщик выполняют разные роли. Когда описание сводится к «подберем страховку выгодно», у нейросети нет оснований сопоставить экспертизу компании с задачей конкретного страхователя и объяснить ограничения.",
        "problems": [
          {
            "title": "Путаются брокер, агент и страховщик",
            "body": "Покупатель может воспринимать посредника как страховую компанию и ждать от него выплаты. Для корректной рекомендации нужно указать юридическое лицо, лицензию брокера, договорные полномочия и сторону, которая принимает страховой риск."
          },
          {
            "title": "Нет параметров покрытия и исключений",
            "body": "Предложения для грузоперевозчика, завода и сети магазинов различаются объектами, страховыми суммами, франшизами, исключениями и требованиями андеррайтинга. Нельзя выводить «самый дешевый полис» из одного рекламного числа."
          },
          {
            "title": "Не раскрыто сопровождение после продажи",
            "body": "Для бизнеса важны порядок сообщения об убытке, сбор документов, переговоры со страховщиком и границы ответственности брокера. Эти действия надо подтверждать условиями реальных договоров, а не обещанием любой выплаты."
          }
        ],
        "scenarioTitle": "Какие вопросы бизнеса проверять при GEO-аудите брокера",
        "scenarioIntro": "Примеры ниже служат основой будущей матрицы запросов. Они не означают, что GAEO уже проводил измерение для какой-либо страховой брокерской компании.",
        "columns": [
          "Вопрос потенциального клиента",
          "Какие факты нужны",
          "Задача продвижения"
        ],
        "scenarios": [
          [
            "Кого выбрать для страхования склада с товарами маркетплейсов?",
            "Страхуемые риски, товарные остатки, ответственность за хранение, исключения и предложения страховщиков",
            "Создать проверяемую экспертизу по страхованию складских и товарных рисков"
          ],
          [
            "Как найти страхового брокера для перевозок по России и внешнеторговых маршрутов?",
            "Границы покрытия, перевозимые грузы, ответственность экспедитора, маршрут, перестрахование при необходимости",
            "Связать рекомендации с реальными маршрутами и составом покрытия"
          ],
          [
            "Кто поможет компании сравнить страхование ответственности руководителей?",
            "Допустимые программы D&O, лимиты, франшизы, исключения, стоимость и роль консультанта",
            "Разделить юридическую ответственность, страховое покрытие и брокерскую консультацию"
          ],
          [
            "Какой брокер сопровождает урегулирование крупного имущественного убытка?",
            "Договорные обязанности, порядок уведомления, сроки, необходимые документы, подтвержденные примеры услуг",
            "Показать реальный процесс сопровождения без гарантий страховой выплаты"
          ]
        ],
        "proofTitle": "Какие сведения подтверждают пригодность брокера для рекомендации",
        "proofIntro": "Банк России лицензирует посредническую деятельность страховых брокеров, а статья 8 закона №4015-1 регулирует их полномочия и раскрытие информации. Для GEO этого недостаточно само по себе: необходимо подтвердить, какие виды страхования компания реально сопровождает и на каких условиях сравнивает предложения.",
        "checks": [
          "Лицензия и юридическое лицо: точное наименование, текущий статус в Банке России, контакты и регионы, где фактически предоставляются услуги.",
          "Продукт и сравнение: перечень рисков и отраслей, страховые суммы, исключения, франшизы, число рассматриваемых страховщиков, условия договора и способ расчета вознаграждения.",
          "Сопровождение: договорная роль при подборе, заключении и изменении полиса, помощь при заявлении убытка, перечень документов, допустимые ссылки на опубликованные разборы."
        ],
        "proofNote": "Описана методика возможного продвижения страховых брокеров. У GAEO здесь не заявлен завершенный клиентский проект, измеренный рост BMR конкретного брокера или собственная лицензия на страховое посредничество.",
        "workTitle": "Как организую продвижение страхового брокера в нейросетях",
        "workIntro": "Отдельно измерю запросы по названию компании и вопросы, где заказчик ищет исполнителя по риску, отрасли и условиям. После замера определю, какие проверяемые факты отсутствуют на сайте и в доступных нейросетям источниках.",
        "steps": [
          {
            "title": "Матрица запросов и стартовый BMR",
            "body": "Сегментирую вопросы по корпоративным рискам, размеру бизнеса, региону и стадии сделки; сохраняю исходные ответы и проверяю, какие брокеры упоминаются с правильной ролью."
          },
          {
            "title": "Проверка статуса и условий",
            "body": "Сверяю лицензию с реестром, договоры и перечень оказываемых услуг с фактическими материалами компании. Проблемные утверждения согласую до публикации."
          },
          {
            "title": "Страницы отраслевых решений и PR",
            "body": "Готовлю ТЗ для сайта по видам рисков, процессу сравнения и сопровождению убытков; размещаю экспертные материалы, которые объясняют выбор без ложных обещаний."
          },
          {
            "title": "Повторные замеры и корректировки",
            "body": "Сравниваю прежние и новые ответы в одной матрице, фиксирую BMR и ошибки нейросетей; пересматриваю источники и спрос по мере изменения условий страхования."
          }
        ],
        "faq": [
          {
            "question": "Чем продвижение страхового брокера отличается от продвижения страховщика?",
            "answer": "Для брокера нужно объяснить посредническую роль, независимость анализа условий и обслуживание клиента, а для страховщика - собственные страховые продукты и обязательства по договору. В GEO это разные группы запросов и доказательств."
          },
          {
            "question": "Можно ли называть любую компанию, продающую полисы, страховым брокером?",
            "answer": "Нет. Статус страхового брокера связан с лицензией Банка России и законодательными требованиями. У агента другая договорная роль; ее нельзя менять ради привлекательности текста или ответа нейросети."
          },
          {
            "question": "Можно ли пообещать клиенту самый дешевый полис или обязательную выплату?",
            "answer": "Нет, без сопоставления конкретных условий такие обещания необоснованны. Страховая выплата зависит от договора и обстоятельств случая; продвижение фиксирует предложения и процессы без гарантирования решения страховщика."
          },
          {
            "question": "Как считается результат GEO-продвижения страхового брокера?",
            "answer": "Фиксируем согласованные небрендовые запросы по рискам, отраслям и регионам, исходный BMR и динамику в повторных замерах. Брендовые ответы, точность лицензии и состава услуг отслеживаются отдельно."
          },
          {
            "question": "Сколько стоит GEO-продвижение страхового брокера?",
            "answer": "Действуют общие тарифы GAEO. Объем работ зависит от числа страховых направлений, регионов, сложности продуктов и качества подтверждающих документов; условия договорной гарантии определены соответствующим тарифом."
          }
        ],
        "ctaTitle": "Проверим, рекомендуют ли нейросети вашего страхового брокера",
        "ctaText": "Пришли сайт компании, виды рисков, номер лицензии, географию работы и перечень реальных услуг. Подберу матрицу запросов и определю, что нужно проверить до первой публикации.",
        "request": "GEO для страхового брокера: лицензия, корпоративные риски, покрытие, договорная роль, урегулирование, регионы и BMR."
      },
      "en": {
        "title": "GEO for insurance brokers and corporate risk advisers | GAEO",
        "h1": "GEO promotion for insurance brokers in AI recommendations",
        "description": "Insurance broker GEO for corporate risks: verify licence, coverage comparisons, exclusions, claims support and measurable AI recommendations with GAEO pricing.",
        "eyebrow": "Finance and insurance / Insurance brokers",
        "lead": "Corporate buyers ask AI assistants to identify insurance brokers for property, liability, cargo or complex risk programmes. The deciding evidence is who compares insurers, which exclusions apply and what support a broker offers when a claim arises. I assess these unbranded questions rather than treating a mention of the broker's name as proof of a qualified recommendation.",
        "heroPoints": [
          "Measure recommendations by insured risk, industry, client type and geography",
          "Verify regulatory licence, contractual role, policy exclusions and fee disclosures",
          "Compare baseline and follow-up BMR on a fixed set of buyer questions"
        ],
        "problemTitle": "Why a generic list of insurance products does not establish broker expertise",
        "problemIntro": "Insurers underwrite risks, brokers arrange and advise on cover, and agents act under another commercial relationship. AI recommendations can misrepresent those roles when service descriptions lack precise supporting evidence.",
        "problems": [
          {
            "title": "Broker, agent and insurer roles are blurred",
            "body": "A buyer may incorrectly expect the intermediary itself to pay a claim. Reliable content identifies the licensed legal entity, its authority under the brokerage agreement and the insurer ultimately carrying the risk."
          },
          {
            "title": "Coverage terms are missing from comparisons",
            "body": "A warehouse, a freight carrier and a corporate board face different insured risks, limits, deductibles and exclusions. One headline premium cannot support a claim that a specific policy is universally the best."
          },
          {
            "title": "Claims assistance is asserted without a process",
            "body": "Businesses care about incident notification, documentation, insurer communication and the broker's actual obligations. This process must follow real service terms rather than a promise that every claim will be paid."
          }
        ],
        "scenarioTitle": "Unbranded insurance-broker queries to measure",
        "scenarioIntro": "These example prompts are proposed for a future audit. They are not findings from a completed GAEO campaign or research sample for any named insurance broker.",
        "columns": [
          "Buyer's question",
          "Evidence to verify",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which broker can arrange warehouse and e-commerce stock insurance?",
            "Covered property and risks, stock accounting, exclusions and available insurer terms",
            "Publish verifiable sector-specific insurance solutions"
          ],
          [
            "Who compares cargo and freight forwarder insurance on international routes?",
            "Cargo categories, routes, liability boundaries, limits and policy wording",
            "Connect relevant trade-lane questions to actual broker services"
          ],
          [
            "How do I compare directors' and officers' liability cover?",
            "Eligible D&O programmes, exclusions, limits, deductibles, fees and broker roles",
            "Separate risk advice, insurance contract and legal duties"
          ],
          [
            "Which insurance broker supports complex property claims?",
            "Service agreement, required documents, notification process and supported claims activities",
            "Explain claims support without implying that payment is guaranteed"
          ]
        ],
        "proofTitle": "Evidence required before recommending an insurance broker",
        "proofIntro": "The Bank of Russia licenses insurance brokerage and provides market-participant verification. Article 8 of Insurance Law 4015-1 defines broker roles and disclosures. Those regulatory facts must be paired with proof of the exact risk types and services offered by the specific business.",
        "checks": [
          "Legal identity and permission: accurate name, current regulatory status, contacts and actual service locations.",
          "Comparable products: covered exposures, exclusions, limits, deductibles, participating insurers, service agreements and remuneration model.",
          "Claims and service: contractual assistance with arranging, amending and servicing policies, claim documentation, service boundaries and substantiated public examples."
        ],
        "proofNote": "This page describes a proposed industry GEO methodology. It does not claim GAEO has delivered an insurance-broker campaign, measured client BMR gains or holds an insurance brokerage licence.",
        "workTitle": "How I would run GEO for an insurance brokerage",
        "workIntro": "First I separate branded recognition from evidence-based recommendations for a particular business risk. Then I connect insurer terms, broker services and public sources to the questions buyers actually ask.",
        "steps": [
          {
            "title": "Baseline and buyer-query segmentation",
            "body": "Record comparable unbranded questions across corporate risk classes, company sizes and regions; capture source citations and whether AI identifies the intermediary's role correctly."
          },
          {
            "title": "Licence and offering verification",
            "body": "Check the current registry entry and available service agreements against public claims, and ask the client to approve substantiated details before publication."
          },
          {
            "title": "Industry solution pages and editorial evidence",
            "body": "Specify useful content on coverage choices, claims workflows and the limits of comparisons, then improve the website and relevant external articles."
          },
          {
            "title": "Repeat measurements",
            "body": "Reuse the agreed question set to track BMR, incorrect recommendations and missing sources, revising content when insurance terms or buyer priorities change."
          }
        ],
        "faq": [
          {
            "question": "How does insurance-broker GEO differ from insurer GEO?",
            "answer": "Broker content must establish the intermediary's licence, advice and comparison services, while insurer content focuses on its own insurance products and obligations. They serve different searches and require different proof."
          },
          {
            "question": "Can any policy reseller be described as a licensed broker?",
            "answer": "No. A broker has a specific regulatory status. An insurance agent acts under a different relationship; GEO content should follow the business's actual authority and Bank of Russia status."
          },
          {
            "question": "Can a broker promise the cheapest policy or guaranteed payment?",
            "answer": "Not without misleading buyers. Premiums depend on comparable cover, and claims decisions depend on policy terms and circumstances. GEO materials must communicate actual conditions."
          },
          {
            "question": "How is improvement in broker AI recommendations measured?",
            "answer": "Use a fixed matrix of unbranded prompts by exposure, industry and location and compare BMR across repeat tests. Branded mentions and correctness of regulatory information are tracked separately."
          },
          {
            "question": "What does GAEO charge insurance brokers?",
            "answer": "Published GAEO plans apply. The agreed scope depends on product diversity, jurisdictions, usable evidence and the baseline query set; contractual BMR conditions belong to the relevant plan."
          }
        ],
        "ctaTitle": "See whether AI recommends your insurance brokerage for the right risks",
        "ctaText": "Send the company website, regulatory licence reference, risk categories, service region and a list of verifiable brokerage services. I will define an appropriate baseline review.",
        "request": "Insurance broker GEO: licence, corporate risks, coverage exclusions, intermediary role, claims support, geography and BMR."
      }
    }
  },
  {
    "id": 75,
    "slug": "car-dealerships",
    "group": "automotive",
    "routes": {
      "ru": "/industries/car-dealerships/",
      "en": "/en/industries/car-dealerships/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Тарифы и 107 направлений",
      "en": "Pricing and 107 industries"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/industries/vehicle-sourcing-import/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/industries/vehicle-sourcing-import/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика BMR для рекомендаций нейросетей",
        "Отдельно: подбор и импорт автомобилей"
      ],
      "en": [
        "How recommendation BMR is measured",
        "Separate service: vehicle sourcing and import"
      ]
    },
    "sources": [
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/federal/505894",
        "ru": "Роспотребнадзор: навязывание платных услуг при покупке автомобиля и условия договора",
        "en": "Rospotrebnadzor: bundled services and vehicle-sale contract terms"
      },
      {
        "href": "https://26.rospotrebnadzor.ru/press-center/pr/13660/",
        "ru": "Роспотребнадзор (2026): дополнительные услуги и согласие покупателя автомобиля",
        "en": "Rospotrebnadzor (2026): additional services and buyer consent"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/regional/481136",
        "ru": "Роспотребнадзор: покупка нового и подержанного автомобиля, права потребителя",
        "en": "Rospotrebnadzor: new and used vehicle purchase guidance"
      },
      {
        "href": "https://elpts.ru/?service=contacts&tab=services",
        "ru": "Система электронных паспортов: сведения и статус ЭПТС",
        "en": "Electronic Vehicle Passport System: passport data and status"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение автодилеров в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение автодилеров и автосалонов в нейросетях",
        "description": "GEO для автодилеров: модели и комплектации, наличие, цены со скидками, кредит, трейд-ин, новые и подержанные автомобили, гарантия и замеры рекомендаций BMR.",
        "eyebrow": "Автомобильный рынок / Автодилеры",
        "lead": "Покупатель спрашивает нейросеть, где приобрести конкретную модель автомобиля в своем городе, сколько она стоит с учетом кредита или трейд-ина и какие условия гарантии предлагает продавец. Я исследую такие коммерческие запросы, проверяю фактическое наличие машин и условия сделок, чтобы рекомендации опирались на актуальные данные дилерского центра.",
        "heroPoints": [
          "Отдельные вопросы по бренду, модели, комплектации, бюджету и региону",
          "Проверка статуса дилера, автомобилей в наличии, цены и обязательных доплат",
          "Стартовый BMR и повторные замеры рекомендаций по стабильной матрице"
        ],
        "problemTitle": "Почему обобщенная реклама автосалона не помогает сравнить предложения",
        "problemIntro": "Одного объявления «автомобили от ...» недостаточно для ответа на конкретный запрос. Конфигурация, наличие и итоговая цена зависят от автомобиля и условий сделки; часть сведений меняется каждый день.",
        "problems": [
          {
            "title": "Наличие и комплектация расходятся с сайтом",
            "body": "Машина из рекламы может оказаться уже проданной, быть в другом филиале или иметь иную комплектацию. Нейросеть не должна рекомендовать автомобиль как находящийся в салоне, если продавец не подтверждает его наличие и срок актуальности данных."
          },
          {
            "title": "Цена скрывает связанные условия",
            "body": "Скидка может зависеть от кредита, трейд-ина или приобретения дополнительного продукта. Для сравнения нужны отдельно базовая цена, условия акций, стоимость дополнительных услуг и корректное описание полной сделки."
          },
          {
            "title": "Неочевиден статус продавца и гарантия",
            "body": "Официальный дилер, независимый продавец и комиссионный автосалон не равнозначны. Необходимо сверить полномочия конкретного филиала, гарантийные документы и фактическую программу обслуживания новых или подержанных машин."
          }
        ],
        "scenarioTitle": "Примеры коммерческих запросов покупателей автомобилей",
        "scenarioIntro": "Приоритеты тестов определяются фактическим модельным рядом и регионами дилера. Ни один из примеров ниже не является результатом уже проведенного замера для конкретного автосалона.",
        "columns": [
          "Что спрашивает покупатель",
          "Что проверяем у дилера",
          "Какой материал нужен"
        ],
        "scenarios": [
          [
            "Где купить семейный кроссовер определенной модели в Москве без обязательных доплат?",
            "Цена машины без допуслуг, комплектация, VIN или доступная партия, наличие, срок действия предложения",
            "Точная товарная страница и прозрачные условия покупки"
          ],
          [
            "Какой дилер предлагает конкретный седан с трейд-ином старого автомобиля?",
            "Методика оценки трейд-ина, условия скидки, ограничения и договора",
            "Отдельные ответы по обмену и итоговой цене"
          ],
          [
            "Где выбрать новый автомобиль с реальной заводской гарантией и сервисом?",
            "Подтверждение дилерского статуса, гарантийные обязательства, сервисные центры и ограничения",
            "Подтвержденная информация о продавце и послепродажном обслуживании"
          ],
          [
            "Кто продает проверенные подержанные автомобили с прозрачной историей?",
            "Юридический продавец, происхождение, технический осмотр, ограничения, документы и заявленная гарантия",
            "Страницы автомобилей с датой осмотра и доказательствами состояния"
          ]
        ],
        "proofTitle": "Какие данные об автодилере должны быть проверяемыми",
        "proofIntro": "Роспотребнадзор регулярно разбирает нарушения при продаже новых и подержанных автомобилей: недостоверные цены, дополнительные услуги и некорректные условия кредитной сделки. В GEO важно описывать реальные предложения конкретного дилера, а не превращать рекламный расчет в безусловную цену для каждого покупателя.",
        "checks": [
          "Продавец и товар: юридическое лицо, подтвержденный дилерский статус при его заявлении, адреса филиалов, модель и комплектация, фактический склад или обоснованный срок поставки.",
          "Цена и договор: стоимость без дополнительных продуктов, условия кредита, трейд-ина и акций, условия предоплаты, обязательства по передаче автомобиля и предоставлению информации.",
          "Сервис и качество: гарантийные обязательства, перечень сервисных центров, особенности продажи подержанных авто, результаты доступных проверок истории и документальные ограничения."
        ],
        "proofNote": "Материал описывает отраслевую методику GAEO. Здесь нет утверждений о завершенном продвижении конкретного автодилера, гарантированном наличии автомобиля, уровне продаж или подтвержденном росте BMR.",
        "workTitle": "Как организую GEO-продвижение автодилера",
        "workIntro": "Начну с реальных покупательских задач и разницы между показом известного бренда и рекомендацией конкретного салона по модели, бюджету и условиям покупки.",
        "steps": [
          {
            "title": "Замер вопросов и конкурентов",
            "body": "Подготовлю небрендовые запросы по моделям, сегментам, городам и способам оплаты; отдельно отмечу новые машины, автомобили с пробегом и сервис."
          },
          {
            "title": "Актуализация товарных фактов",
            "body": "Проверю структуру модельных страниц, остатки по филиалам, даты обновления, документальные условия цены и гарантий, чтобы нейросеть могла сопоставлять предложения."
          },
          {
            "title": "Сайт, отзывы и публикации",
            "body": "Подготовлю ТЗ для страниц моделей, конфигураций, цен, трейд-ина, кредитования и проверенных ответов на вопросы. Подберу отраслевые источники и материалы."
          },
          {
            "title": "Повторная оценка видимости",
            "body": "Сравню ответы по тем же запросам, источники, ошибочные цены и BMR; уточню публикации по мере смены склада или модельного ряда."
          }
        ],
        "faq": [
          {
            "question": "В чем разница между продвижением автодилера и компании по импорту автомобилей?",
            "answer": "Автодилер продвигает фактические предложения салона, модельный ряд, гарантию и условия продажи. Импортер и подборщик отвечают за другую цепочку: выбор автомобиля за рубежом, договор, логистику и документы для ввоза."
          },
          {
            "question": "Можно ли показывать в нейросетях цену со скидкой за кредит или трейд-ин?",
            "answer": "Да, когда указаны все условия получения скидки и базовая цена без дополнительных продуктов. Нельзя выдавать рекламный расчет за доступную каждому покупателю окончательную стоимость."
          },
          {
            "question": "Как подтвердить статус официального дилера?",
            "answer": "Проверяйте юридическое лицо и уполномоченный статус конкретного продавца по сведениям производителя или импортера и договорным документам. Самостоятельная надпись «официальный дилер» без подтверждения не является достаточным доказательством."
          },
          {
            "question": "Что делать, если модели быстро исчезают из наличия?",
            "answer": "Нужно обновлять страницы по автомобилям или партиям, указывать дату проверки и корректно отделять «в наличии» от «под заказ». GEO-замеры также проверяют, не продолжают ли нейросети рекомендовать устаревшие предложения."
          },
          {
            "question": "Сколько стоит GEO-продвижение автодилера?",
            "answer": "Действуют общие тарифы GAEO. Объем зависит от числа моделей, дилерских центров и товарных страниц; финансовые гарантии BMR действуют только по условиям соответствующего договора."
          }
        ],
        "ctaTitle": "Проверим, рекомендуют ли нейросети ваш автосалон по покупательским запросам",
        "ctaText": "Пришли сайт дилера, список брендов и моделей, города, источники актуального склада и условия основных программ. Выделю матрицу запросов для стартового аудита.",
        "request": "GEO автодилера: модели, комплектации, наличие, цены, кредит и трейд-ин, гарантия, регионы и BMR."
      },
      "en": {
        "title": "GEO for car dealerships, models and stock availability | GAEO",
        "h1": "GEO promotion for car dealerships in AI recommendations",
        "description": "Dealership GEO: model inventory, trims, conditional prices, loans, trade-ins, warranties, new and used cars and measured AI recommendation visibility.",
        "eyebrow": "Automotive / Car dealerships",
        "lead": "Car buyers ask AI assistants where a particular model is in stock, what its real purchase price is after finance or trade-in conditions and whether the dealer provides a valid warranty. I test those transactional questions and identify which model, inventory and contract details are missing or inaccurately represented in AI recommendations.",
        "heroPoints": [
          "Test model, trim, budget, geography and buyer scenario separately",
          "Verify dealer status, actual availability, conditional pricing and fees",
          "Measure baseline and follow-up BMR against the same buyer prompt matrix"
        ],
        "problemTitle": "Why generic showroom advertising does not resolve buyer comparisons",
        "problemIntro": "A broad claim about a brand or a headline price does not answer a buyer looking for an exact vehicle. Stock, trim, delivery and finance terms differ between branches and change over time.",
        "problems": [
          {
            "title": "Inventory and trim data are outdated",
            "body": "An advertised vehicle may have been sold, stored in another location or configured differently. Claims of immediate stock need a current, documented source and an update schedule."
          },
          {
            "title": "Conditional discounts obscure the total price",
            "body": "Promotional figures may depend on a loan, trade-in or supplementary product. Buyers need the standalone vehicle price, eligibility criteria and a transparent explanation of contract costs."
          },
          {
            "title": "Dealer authority and warranty are unclear",
            "body": "An authorised franchise dealer, independent seller and used-vehicle intermediary have different relationships with manufacturers and buyers. AI should not assume a franchise or manufacturer-backed guarantee without proof."
          }
        ],
        "scenarioTitle": "Dealership queries that belong in a measured GEO programme",
        "scenarioIntro": "These are candidate buyer prompts, not verified AI answers or past GAEO outcomes for any specific dealer. The working matrix follows the dealer's real brands and locations.",
        "columns": [
          "Buyer question",
          "Facts to substantiate",
          "GEO deliverable"
        ],
        "scenarios": [
          [
            "Which Moscow dealer sells this family crossover without compulsory add-ons?",
            "Base price, exact trim, available vehicle or batch, location and current offer validity",
            "Current listing and transparent purchasing conditions"
          ],
          [
            "Where can I buy this sedan with a fair trade-in programme?",
            "Vehicle appraisal process, qualifying discounts, trade-in limits and contracts",
            "Evidence-based trade-in comparison content"
          ],
          [
            "Which dealership offers a new car with real manufacturer warranty and local service?",
            "Authorised status, warranty terms, service facilities and exclusions",
            "Verified seller, warranty and after-sales pages"
          ],
          [
            "Where can I find inspected used cars with documented history?",
            "Seller identity, condition report, ownership history checks, restrictions and warranties offered",
            "Dated used-car records with clear evidence boundaries"
          ]
        ],
        "proofTitle": "What evidence AI needs to assess a dealership",
        "proofIntro": "Russian consumer protection guidance flags misleading automobile prices, bundled products and contractual conditions during new and used car sales. GEO therefore needs verifiable terms for the exact dealership rather than generic claims that every advertised discount is universally available.",
        "checks": [
          "Seller and vehicle: legal entity, independently verifiable manufacturer authorisation where claimed, branch address, stock status, model, trim and realistic delivery terms.",
          "Deal terms: vehicle price without add-ons, loan and trade-in conditions, promotion validity, prepayment and delivery obligations.",
          "After-sales and used-car evidence: warranty documentation, service locations, dated condition checks, available history and limitations."
        ],
        "proofNote": "This is a proposed GEO method for dealerships. It is not a claim of a completed GAEO automotive campaign, confirmed dealership stock, sales uplift or measured client BMR result.",
        "workTitle": "How I approach GEO for a car dealership",
        "workIntro": "I compare general brand recognition with recommendations of a particular dealership for a specific model, city and purchase scenario. Those are distinct signals and require different evidence.",
        "steps": [
          {
            "title": "Buyer intent and baseline",
            "body": "Collect unbranded prompts by vehicle category, model, location and payment route, splitting new cars, used cars and after-sales services."
          },
          {
            "title": "Inventory and offer validation",
            "body": "Audit model pages, branch stock, publication dates, pricing conditions and warranty descriptions to reduce unsupported AI claims."
          },
          {
            "title": "Structured pages and outside evidence",
            "body": "Prepare site specifications for model inventory, trim comparisons, finance, trade-ins and documented FAQs; connect trustworthy editorial and reputation sources."
          },
          {
            "title": "Consistent follow-up measurements",
            "body": "Reuse the prompt matrix to assess BMR, cited pages, incorrect prices and outdated stock recommendations as the product range changes."
          }
        ],
        "faq": [
          {
            "question": "How is dealership GEO different from vehicle import service GEO?",
            "answer": "A dealership promotes its own available vehicles, sale contracts and after-sales services. An import agent helps source a vehicle abroad, calculate duties and arrange delivery and registration documents. Their buyer questions and proof are different."
          },
          {
            "question": "Can a finance-linked or trade-in discount appear in AI content?",
            "answer": "Yes, with a clearly disclosed standalone price and eligibility conditions. Do not present a conditional promotional estimate as the final price for every buyer."
          },
          {
            "question": "How do you verify official dealer status?",
            "answer": "Check the actual legal seller and specific franchise against manufacturer or importer information and current supporting documents. Self-description alone is insufficient."
          },
          {
            "question": "What if inventory turns over rapidly?",
            "answer": "Use dated, frequently updated listings and distinguish available stock from vehicles on order. Repeated GEO tests should identify whether AI continues to recommend sold vehicles."
          },
          {
            "question": "What does GAEO charge a dealership?",
            "answer": "Published GAEO prices apply. Scope depends on model range, number of branches and source-data quality, while any BMR guarantee follows the selected contract."
          }
        ],
        "ctaTitle": "Check how AI recommends your dealership by model and location",
        "ctaText": "Share the dealership website, authorised brands, sales regions, inventory source and major finance or trade-in conditions. I will scope the first measurable query set.",
        "request": "Car dealership GEO: models, trims, stock, prices, loans, trade-in, warranty, cities and BMR."
      }
    }
  },
  {
    "id": 76,
    "slug": "vehicle-sourcing-import",
    "group": "automotive",
    "routes": {
      "ru": "/industries/vehicle-sourcing-import/",
      "en": "/en/industries/vehicle-sourcing-import/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Тарифы GAEO по 107 отраслям",
      "en": "GAEO pricing across 107 industries"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/industries/car-dealerships/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/industries/car-dealerships/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Методика измерения видимости BMR",
        "Отдельно: продвижение автодилеров"
      ],
      "en": [
        "How GAEO measures recommendation BMR",
        "Separate service: dealership GEO"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_119866/",
        "ru": "ФТС России: декларирование и платежи при ввозе транспорта для личного пользования",
        "en": "Russian Customs Service: declarations and charges for privately imported cars"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_186589/aa0e83b07211d624e6760439513a4a75a5b5b190/",
        "ru": "ЕЭК: порядок функционирования систем электронных паспортов транспорта (решение №122)",
        "en": "Eurasian Economic Commission: electronic vehicle passport rules, Decision 122"
      },
      {
        "href": "https://elpts.ru/?service=contacts&tab=services",
        "ru": "АО «Электронный паспорт»: сведения о таможенном контроле и статусе ЭПТС",
        "en": "Electronic Passport System: customs-control data and vehicle passport status"
      },
      {
        "href": "https://zpp.rospotrebnadzor.ru/news/regional/481136",
        "ru": "Роспотребнадзор: покупка автомобиля и различия продавца-физлица и организации",
        "en": "Rospotrebnadzor: vehicle purchases and seller identity"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение подбора и импорта автомобилей | GAEO.ru",
        "h1": "GEO-продвижение компаний по подбору и импорту автомобилей",
        "description": "GEO для подбора и привоза авто из-за рубежа: аукционы, проверка VIN, Япония, Корея, ОАЭ, таможенные платежи, утильсбор, ЭПТС, доставка и замеры BMR.",
        "eyebrow": "Автомобильный рынок / Подбор и импорт",
        "lead": "Человек выбирает компанию для подбора и привоза автомобиля из другой страны по бюджету «под ключ», рискам сделки, доступности машин и документам после ввоза. Я проверяю рекомендации нейросетей по конкретным маршрутам, происхождению и ответственности исполнителя, чтобы покупатель видел расчеты и ограничения, а не одну обещанную минимальную цену.",
        "heroPoints": [
          "Сегментация вопросов по стране поиска, классу автомобиля и бюджету «под ключ»",
          "Проверка роли посредника, истории VIN, таможенных расходов, ЭПТС и сроков",
          "Сопоставимые стартовые и повторные BMR-замеры без гарантий доставки по фиксированной цене"
        ],
        "problemTitle": "Почему один расчет «авто из-за рубежа под ключ» не убеждает покупателя",
        "problemIntro": "Маршрут сделки может включать поиск, торги, оплату иностранному продавцу, доставку, таможенные формальности и передачу автомобиля в России. У каждого этапа свои исполнители, документы и риски.",
        "problems": [
          {
            "title": "Неясно, кто продавец и кто отвечает за результат",
            "body": "Подборщик может только рекомендовать машину, действовать как агент по договору или продавать автомобиль от своего имени. Клиенту нужно понимать, кому он переводит деньги, кто подтверждает состояние машины и кто отвечает за поставку."
          },
          {
            "title": "Цена не включает все обязательные платежи",
            "body": "Курс валют, стоимость лота, комиссия площадки, логистика, пошлины, сборы, оформление ЭПТС и возможные изменения условий могут существенно влиять на итог. Фиксировать универсальную стоимость ввоза без исходных данных неправильно."
          },
          {
            "title": "История и документы смешаны в одном обещании",
            "body": "Аукционная оценка, проверка VIN, отчет о повреждениях и действующий ЭПТС подтверждают разные факты. Нельзя выводить «чистую историю» или готовность к регистрации только по рекламному описанию автомобиля."
          }
        ],
        "scenarioTitle": "Запросы о подборе и ввозе авто для матрицы GEO",
        "scenarioIntro": "Матрица составляется по реальным маршрутам и сегментам компании. Примеры ниже показывают покупательские намерения, а не действующие цены, сроки или результаты клиентов GAEO.",
        "columns": [
          "Вопрос покупателя",
          "Что требуется подтвердить",
          "Действие для GEO"
        ],
        "scenarios": [
          [
            "Как выбрать компанию для привоза семейного автомобиля из Японии с полным расчетом?",
            "Доступные аукционы, состояние машины, платежи, комиссия, маршрут, договор и дата курса",
            "Опубликовать прозрачную разбивку стоимости и ролей по этапам"
          ],
          [
            "Какие фирмы проверяют автомобили из Кореи до оплаты и дают отчет о состоянии?",
            "VIN, допустимые отчеты, осмотр, признаки ремонта, история, независимость проверки",
            "Показать реальную методику осмотра и ограничения доступных баз"
          ],
          [
            "Сколько обойдется привоз кроссовера из ОАЭ после растаможки в России?",
            "Точная комплектация и год, стоимость сделки, таможенная база, пошлины, сборы, ЭПТС, логистика",
            "Разделить пример расчета и персональное окончательное предложение"
          ],
          [
            "Кому поручить импорт автомобиля с документами для регистрации?",
            "Договорная схема, декларант, платежи, статус ЭПТС, требования к машине и передача документов",
            "Создать проверяемые страницы процедуры ввоза и выдаваемых документов"
          ]
        ],
        "proofTitle": "Какие факты об импорте и подборе нужно предоставить нейросети",
        "proofIntro": "В опубликованном разъяснении ФТС описаны таможенные декларации, подтверждающие документы и платежи при ввозе транспорта для личного пользования. Электронные паспорта регулируются порядком ЕЭК; их статус необходимо проверять отдельно. Для GEO эти источники помогают описать процедуру, но не подтверждают условия конкретного посредника.",
        "checks": [
          "Договор и роли сторон: кто ищет и осматривает автомобиль, кто приобретает и оплачивает его, кто является декларантом и кто отвечает за этапы доставки.",
          "Экономика сделки: стоимость покупки и комиссии, страна и маршрут, дата валютного курса, таможенные платежи, утильсбор по применимой схеме, оформление ЭПТС и цена услуг компании.",
          "Риски и подтверждения: доступные проверки VIN, отчеты об осмотре, документы продавца и перевозки, статус ЭПТС, условия отказа, страхование перевозки и процедура передачи автомобиля."
        ],
        "proofNote": "Здесь описана методика GEO для компаний по подбору и импорту автомобилей. GAEO не заявляет реализованный импортный проект, подтвержденные сроки доставки, гарантированную цену автомобиля или измеренный клиентский рост BMR.",
        "workTitle": "Как выстрою GEO-продвижение компании по автоимпорту",
        "workIntro": "Я разделяю вопросы о надежности компании, выборе конкретного автомобиля и полной стоимости поставки. Нейросеть должна видеть, кто отвечает за каждый этап и на какой дате основан расчет.",
        "steps": [
          {
            "title": "Матрица по рынкам и маршрутам",
            "body": "Фиксирую вопросы по странам, типам автомобилей, диапазонам бюджета, проверке состояния и способу оформления. Сохраняю первоначальные ответы и показатель BMR."
          },
          {
            "title": "Аудит договора, расчета и документов",
            "body": "Проверяю роль компании, реальный список услуг, примеры расчетов с датами и нормативные источники по декларированию и ЭПТС. Выделяю риски, требующие оговорки."
          },
          {
            "title": "Публикации по этапам сделки",
            "body": "Готовлю техническое задание для страниц направлений, расчетов, способов осмотра, оплаты, перевозки, выдачи документов и ответов на реальные вопросы покупателей."
          },
          {
            "title": "Повторный замер рекомендаций",
            "body": "Сопоставляю ответы по идентичным запросам, проверяю корректность расходов и процедур, новые упоминания и BMR, учитывая изменения таможенных условий."
          }
        ],
        "faq": [
          {
            "question": "Что важнее для нейросетей: страна импорта или цена под ключ?",
            "answer": "Обе характеристики важны вместе с состоянием и документами автомобиля. Матрица GEO учитывает страны, классы машин и бюджет, но окончательный расчет требует параметров конкретного автомобиля и маршрута."
          },
          {
            "question": "Можно ли на сайте показывать постоянную цену растаможки?",
            "answer": "Только как пример с исходными допущениями и датой. Таможенные пошлины, сборы и иные обязательные платежи зависят от применимого режима и характеристик транспорта; универсальная цифра может вводить в заблуждение."
          },
          {
            "question": "ЭПТС доказывает, что автомобиль полностью проверен технически?",
            "answer": "Нет. Электронный паспорт подтверждает определенные регистрационные сведения и статус, но не заменяет независимую диагностику технического состояния, проверку истории и анализ договора."
          },
          {
            "question": "Чем продвижение компании по импорту отличается от продвижения автодилера?",
            "answer": "У импортера покупатель сравнивает маршруты, этапы покупки, документы и ответственность посредника. У дилера основной вопрос касается автомобилей в наличии, комплектаций, цены продажи и гарантии конкретного салона."
          },
          {
            "question": "Сколько стоит GEO-продвижение компании по привозу автомобилей?",
            "answer": "Используются опубликованные тарифы GAEO. Объем зависит от количества стран, каналов покупки, юридических схем и глубины проверки данных, а гарантии BMR действуют по договору."
          }
        ],
        "ctaTitle": "Проверим рекомендации нейросетей по подбору и импорту автомобилей",
        "ctaText": "Пришли сайт компании, страны и маршруты, действующий договор, пример расчета «под ключ» с датой и список выдаваемых документов. Предложу набор коммерческих запросов для замера.",
        "request": "GEO подбор и импорт авто: страны, VIN, аукционы, договор, растаможка, утильсбор, ЭПТС, доставка и BMR."
      },
      "en": {
        "title": "GEO for vehicle sourcing, overseas auctions and car imports | GAEO",
        "h1": "GEO promotion for vehicle sourcing and import companies",
        "description": "GEO for overseas car sourcing: auctions, VIN and condition checks, Japan, Korea, UAE, customs duties, recycling fees, e-passports, delivery and AI BMR.",
        "eyebrow": "Automotive / Vehicle sourcing and import",
        "lead": "Buyers choosing a vehicle sourcing company want a credible landed-cost estimate, a clear purchasing arrangement, independent condition checks and documents needed after import. I assess AI recommendations by market, route and contractual responsibility, distinguishing an illustrative price from a verified offer for a particular car.",
        "heroPoints": [
          "Segment buyer queries by country, vehicle class and total landed budget",
          "Validate intermediary role, VIN evidence, customs costs, electronic passports and delivery scope",
          "Track comparable baseline and follow-up BMR without a fixed-price or delivery guarantee"
        ],
        "problemTitle": "Why a one-line turnkey import price is insufficient",
        "problemIntro": "Vehicle sourcing may involve overseas search, auction bidding, payment, freight, customs formalities and delivery. Different parties are responsible at each stage, and the contractual model varies between providers.",
        "problems": [
          {
            "title": "The seller and contracting party are unclear",
            "body": "A sourcing agent may merely recommend a vehicle, buy under the customer's authority or sell in its own name. Buyers need to know who receives the funds, verifies the car and carries responsibility for each service."
          },
          {
            "title": "The quote omits mandatory costs",
            "body": "Currency movements, purchase and auction fees, shipping, duties, recycling charges, electronic passport processing and local delivery can change the landed cost. A universal fixed import price without assumptions is misleading."
          },
          {
            "title": "Vehicle history is confused with import documentation",
            "body": "An auction grading sheet, VIN lookup, independent inspection and valid electronic vehicle passport establish different facts. None alone proves that a car is accident-free and ready for registration."
          }
        ],
        "scenarioTitle": "Vehicle import and sourcing prompts to measure",
        "scenarioIntro": "These examples are a prospective research matrix, not GAEO client results, current import quotes or guaranteed delivery periods. Exact searches follow the provider's actual markets and service scope.",
        "columns": [
          "Buyer question",
          "Evidence needed",
          "GEO content action"
        ],
        "scenarios": [
          [
            "Which company can source a Japanese family vehicle with a fully itemised landed cost?",
            "Auction access, vehicle condition, fees, freight, customs assumptions, contract and exchange-rate date",
            "Publish a date-stamped cost breakdown and responsible parties"
          ],
          [
            "Who independently checks Korean used cars before payment?",
            "VIN verification, inspection methodology, damage records and limits of foreign data",
            "Explain the actual inspection workflow and evidence gaps"
          ],
          [
            "What would it cost to import a UAE SUV into Russia after customs?",
            "Year, trim, vehicle value, import regime, duties, recycling charge, freight and passport costs",
            "Separate scenario examples from a binding individual quotation"
          ],
          [
            "Which import agent provides documents needed for registration?",
            "Contract parties, declarant, customs payment evidence, electronic passport status and handover checklist",
            "Create verified step-by-step import and document pages"
          ]
        ],
        "proofTitle": "Evidence buyers and AI systems need about import services",
        "proofIntro": "Russian Customs Service guidance explains passenger customs declarations, supporting documents and charges for privately imported vehicles. The Eurasian Economic Commission's electronic passport rules govern vehicle passport records, which require separate status verification. These establish procedural facts, not a particular importer's performance.",
        "checks": [
          "Legal and commercial roles: who searches, inspects, buys, pays, declares, ships and hands over the car, and what each agreement actually covers.",
          "Landed-cost breakdown: vehicle and auction prices, fees, origin, shipment route, currency date, applicable customs payments, recycling fees, electronic passport expenses and supplier remuneration.",
          "Risk documents: available VIN and condition reports, seller and shipping papers, passport status, withdrawal conditions, cargo insurance and vehicle acceptance procedure."
        ],
        "proofNote": "This page presents an industry GEO methodology. It does not claim GAEO has delivered an import campaign, verified a client's landed prices or delivery dates, or measured an importer's BMR uplift.",
        "workTitle": "How I structure GEO for overseas vehicle sourcing",
        "workIntro": "I separate provider trust questions, vehicle-specific inspection needs and total delivered-cost comparisons. AI answers should identify responsibilities and the date on which each estimate was calculated.",
        "steps": [
          {
            "title": "Country and route query baseline",
            "body": "Record unbranded prompts by source country, vehicle type, budget, condition verification and paperwork route, capturing initial answers and BMR."
          },
          {
            "title": "Contracts, calculations and evidence",
            "body": "Check the company's actual service role, dated quote examples, relevant customs guidance and electronic passport rules, highlighting assumptions."
          },
          {
            "title": "Useful pages for every transaction stage",
            "body": "Specify site content on markets, buying channels, inspections, payments, freight, customs, documents and buyer FAQs with verifiable sources."
          },
          {
            "title": "Repeat and correct recommendations",
            "body": "Retest the fixed question set, compare BMR and descriptions of legal responsibilities, charges and delivery processes when policies change."
          }
        ],
        "faq": [
          {
            "question": "Is origin country or landed cost more important in an import query?",
            "answer": "Both matter alongside vehicle condition, legal setup and documentation. Accurate costs depend on the individual car and route; prompts need to capture those variables."
          },
          {
            "question": "Can a site publish a permanent customs clearance price?",
            "answer": "Only as an illustrative calculation with a date and assumptions. Duties, fees and other payments vary by applicable legal regime and vehicle specifications."
          },
          {
            "question": "Does an electronic vehicle passport prove the car was thoroughly inspected?",
            "answer": "No. An electronic passport records designated vehicle and administrative information. It does not replace mechanical inspection, history review or contractual checks."
          },
          {
            "question": "How does import-service GEO differ from car dealership GEO?",
            "answer": "An importer is compared by sourcing routes, purchasing arrangements, customs documents and intermediary responsibility. A dealership is compared by actual stock, model trims, sale terms and after-sales warranty."
          },
          {
            "question": "What does GAEO charge a vehicle sourcing business?",
            "answer": "Published GAEO plans apply. Scope depends on countries, procurement models and evidence available; any BMR guarantee follows the selected contract."
          }
        ],
        "ctaTitle": "See which import and vehicle sourcing firms AI recommends",
        "ctaText": "Send the company website, sourcing countries, sample dated quote, contracting model and document handover list. I will prepare an appropriate baseline prompt matrix.",
        "request": "Vehicle sourcing and import GEO: countries, auctions, VIN, contracts, customs, recycling fees, electronic passport, freight and BMR."
      }
    }
  }
];
