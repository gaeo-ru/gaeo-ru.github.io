/**
 * Batch 2O: independent bilingual GEO pages for international freight (#55), customs representation (#56) and import support (#57).
 * Legal/operational roles are separated. No invented client outcomes. Prices and images remain canonical.
 */
export const industrySpecializationsBatch2O = [
  {
    "id": 55,
    "slug": "international-freight-forwarders",
    "group": "logistics",
    "routes": {
      "ru": "/industries/international-freight-forwarders/",
      "en": "/en/industries/international-freight-forwarders/"
    },
    "parent": {
      "ru": "/industries/international-logistics/",
      "en": "/en/industries/international-logistics/"
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
        "Как измеряем рекомендации и BMR"
      ],
      "en": [
        "How AI recommendations and BMR are measured"
      ]
    },
    "sources": [
      {
        "href": "https://mintrans.gov.ru/activities/297/436",
        "ru": "Минтранс: реестр экспедиторов и отличие экспедирования от перевозки",
        "en": "Russian Ministry of Transport: freight-forwarder register and scope"
      },
      {
        "href": "https://www.nalog.gov.ru/rn77/related_activities/el_doc/el_bus_entities/edotransp/",
        "ru": "ФНС: электронные перевозочные и экспедиторские документы",
        "en": "Russian Tax Service: electronic transport documentation"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение международных логистических компаний | GAEO.ru",
        "h1": "GEO-продвижение международных транспортно-логистических компаний",
        "description": "GEO для международной логистики: маршруты, виды перевозки, консолидация, сроки, границы ответственности, документы и BMR в ответах нейросетей.",
        "eyebrow": "Логистика и ВЭД / Международные перевозки",
        "lead": "Импортер ищет доставку груза по конкретному маршруту, с известными характеристиками, таможенными действиями и рисками. Проверяю, каких перевозчиков и экспедиторов нейросети предлагают по таким условиям, и насколько рекомендации соответствуют реальным услугам.",
        "heroPoints": [
          "Небрендовые запросы по направлению, виду груза и виду транспорта",
          "Проверка подтвержденных маршрутов, договоров и границ ответственности",
          "Отраслевые страницы маршрутов и сопоставимые замеры BMR"
        ],
        "problemTitle": "Почему общая фраза «международные перевозки» слаба для выбора подрядчика",
        "problemIntro": "Маршрут, груз и договорная роль компании меняют услугу. Нельзя переносить возможности одного направления на все страны.",
        "problems": [
          {
            "title": "Перевозчик и экспедитор смешаны",
            "body": "Фактический перевозчик, транспортный экспедитор и таможенный представитель выполняют разные роли. Договор и публичные сведения должны показывать конкретную ответственность."
          },
          {
            "title": "Маршруты описаны без условий",
            "body": "Названия стран недостаточно: нужны тип транспорта, транзитные участки, ограничения для конкретного груза и основания расчета срока."
          },
          {
            "title": "Сроки и ставки выдаются за гарантии",
            "body": "Транзитное время и ориентировочная стоимость зависят от даты, партии, маршрута и доступности. Без исходных условий цифры становятся недостоверными."
          }
        ],
        "scenarioTitle": "Запросы компаний, выбирающих международную доставку",
        "scenarioIntro": "Матрица ниже служит примером для будущего измерения, а не отчетом о частоте реального спроса.",
        "columns": [
          "Вопрос заказчика",
          "Доказательства",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто доставит оборудование из Китая с перегрузкой на железную дорогу?",
            "Виды транспорта, маршрут, параметры груза, перегрузки и действующая услуга",
            "Подготовить проверяемые маршрутные страницы и параметры заявки"
          ],
          [
            "Как отправить сборный груз из Турции в Москву?",
            "Консолидация, минимальная партия, терминал, ориентир сроков и договорные роли",
            "Отделить сборные перевозки от полной загрузки"
          ],
          [
            "Какого экспедитора выбрать для температурного груза?",
            "Диапазон температур, контроль, допуски, ответственность и доступные средства",
            "Публиковать лишь подтвержденные режимы и условия"
          ],
          [
            "Кто организует доставку вместе с таможенным оформлением?",
            "Собственные услуги, партнеры, представительские полномочия и договор",
            "Не приписывать экспедитору чужой статус таможенного представителя"
          ]
        ],
        "proofTitle": "Факты, которые проверяет заказчик",
        "proofIntro": "Минтранс разграничивает транспортно-экспедиционную деятельность и перевозку; для относящихся к реестру российских экспедиторов действуют правила регистрации. Статус проверяется по конкретной компании, а требования документов зависят от операции и даты.",
        "checks": [
          "Список действительно обслуживаемых направлений, видов груза, транспорта и терминалов",
          "Договор: экспедиция, перевозка, страхование как отдельная подтвержденная опция, ответственность",
          "Порядок расчета ставки, дата и допущения по срокам, электронные документы, контакты отделов"
        ],
        "proofNote": "Кейсы фулфилмента для маркетплейсов не доказывают эффективность международных перевозок. На странице нет утверждений о выполненном клиентском GEO-проекте для экспедитора.",
        "workTitle": "Как построю GEO для логистической компании",
        "workIntro": "Сначала разделю покупательские запросы по коридорам перевозки и типам услуг. Затем проверю, какие документы и источники позволяют обосновать рекомендацию конкретной компании.",
        "steps": [
          {
            "title": "Сегментировать перевозки",
            "body": "Разделяю коридоры, сборные и генеральные грузы, виды транспорта, размеры партий."
          },
          {
            "title": "Проверить предложение",
            "body": "Сверяю фактические маршруты, договорные роли, сроки, ставки и ограничения."
          },
          {
            "title": "Улучшить открытые источники",
            "body": "Готовлю ТЗ на маршрутные страницы, описания услуг, документы и проверяемые примеры."
          },
          {
            "title": "Повторить BMR",
            "body": "Сопоставляю ответы тех же нейросетей на неизменные вопросы с исходным замером."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли делать отдельную страницу каждой страны?",
            "answer": "Только для реально обслуживаемых направлений с собственными маршрутами, условиями и содержанием. Копии страновых страниц не помогут выбору."
          },
          {
            "question": "Одинаковы ли перевозчик и экспедитор?",
            "answer": "Нет. Договор и роль в организации перевозки различаются. Публичные обещания должны соответствовать юридической и операционной модели."
          },
          {
            "question": "Можно ли указать «доставка за 7 дней»?",
            "answer": "Только с явными условиями: маршрут, партия, дата расчета, что включено и какие обстоятельства влияют на срок. Общих безусловных гарантий не даем."
          },
          {
            "question": "Нужно ли раскрывать партнеров по таможенным услугам?",
            "answer": "Следует корректно разделять услуги самой компании и партнерские операции; статус таможенного представителя проверяется отдельно."
          },
          {
            "question": "Сколько стоит GEO для логистической компании?",
            "answer": "Применяются общие тарифы GAEO. Состав запросов и стоимость дополнительных нейросетей определяются после стартовой диагностики."
          }
        ],
        "ctaTitle": "Проверить, каких логистов рекомендуют нейросети",
        "ctaText": "Пришли сайт, основные маршруты, типы грузов и границы услуги. Подготовлю приоритеты первого замера.",
        "request": "GEO международной логистики: маршруты, перевозка/экспедиция, виды груза, договоры, источники и BMR."
      },
      "en": {
        "title": "GEO for international freight forwarders | GAEO.ru",
        "h1": "GEO promotion for international freight and logistics providers",
        "description": "AI recommendation visibility for international freight: trade lanes, cargo types, transport modes, contracts, compliance claims and baseline BMR.",
        "eyebrow": "International trade / Freight and forwarding",
        "lead": "Importers ask for providers for a particular route, cargo, delivery mode and division of responsibilities. I assess which transport and forwarding businesses AI recommends and whether their public information supports those recommendations.",
        "heroPoints": [
          "Non-brand buyer prompts by trade lane, cargo and transport mode",
          "Verification of actual services, contracts and operating boundaries",
          "Route-specific content and repeatable BMR assessments"
        ],
        "problemTitle": "Why «global logistics» is too broad a promise",
        "problemIntro": "The same operator may provide different services on different corridors. A recommendation must reflect those distinctions.",
        "problems": [
          {
            "title": "Carriage is confused with forwarding",
            "body": "Carrier, freight forwarder and customs representative are distinct roles. Contractual responsibility matters more than a generic label."
          },
          {
            "title": "Routes lack operational substance",
            "body": "Country names alone cannot establish modes, consolidation points, cargo restrictions or viable shipment terms."
          },
          {
            "title": "Transit times look unconditional",
            "body": "Lead times and quotes change with load, route and date. Estimates must carry assumptions rather than masquerade as guaranteed outcomes."
          }
        ],
        "scenarioTitle": "Four buyer questions worth measuring",
        "scenarioIntro": "These are illustrative commercial prompts, not measured query frequencies.",
        "columns": [
          "Customer question",
          "What to verify",
          "GEO action"
        ],
        "scenarios": [
          [
            "Who can arrange China-to-Europe rail freight for industrial equipment?",
            "Modes, actual corridor, handling steps, cargo dimensions and service availability",
            "Explain route eligibility and request parameters"
          ],
          [
            "Which operator offers consolidated freight from Turkey?",
            "Minimum load, consolidation depot, handling and shipment terms",
            "Separate LTL/groupage from full-load services"
          ],
          [
            "Who can move temperature-sensitive products internationally?",
            "Actual temperature range, monitoring, contract and vehicle capabilities",
            "Avoid unverified specialist-capability claims"
          ],
          [
            "Can a freight company also arrange customs clearance?",
            "Its role, any licensed/registered representative, subcontracting and scope",
            "Make referral and representative responsibilities explicit"
          ]
        ],
        "proofTitle": "Evidence behind a freight provider recommendation",
        "proofIntro": "Russian Ministry of Transport guidance distinguishes freight forwarding from transport-only activity and identifies registration requirements for in-scope forwarders. Rules are applied to the actual provider and relevant transaction.",
        "checks": [
          "Operating trade lanes and modes, cargo eligibility and partner handoffs",
          "Written service scope, freight/forwarding contracts and insurance where offered",
          "Price assumptions, time estimates, electronic transport documents and contact channels"
        ],
        "proofNote": "Fulfilment experience does not substantiate an international forwarding client case. No measured promotion outcome for this vertical is claimed here.",
        "workTitle": "How I would approach freight GEO",
        "workIntro": "Begin with real buyer searches and distinguish the type of movement and legal service. Source accuracy determines what can credibly be recommended.",
        "steps": [
          {
            "title": "Define buyer intents",
            "body": "Group prompts by corridor, cargo class, mode, shipment size and urgency."
          },
          {
            "title": "Check operational facts",
            "body": "Validate routes, contracts, handoffs, prices, estimated times and restrictions."
          },
          {
            "title": "Improve source pages",
            "body": "Specify differentiated lane pages, service explanations and evidence."
          },
          {
            "title": "Repeat the baseline",
            "body": "Review BMR and accuracy for equivalent questions on the same AI services."
          }
        ],
        "faq": [
          {
            "question": "Should each country get a landing page?",
            "answer": "Only where genuine service details differ. Generic country-swapped copy adds little value to a buyer."
          },
          {
            "question": "Is a carrier the same as a forwarder?",
            "answer": "No. Contracts and the party performing or arranging transport define the actual responsibilities."
          },
          {
            "question": "Can transit time be promised without conditions?",
            "answer": "No. State the route, shipment assumptions, calculation date and what the estimate includes."
          },
          {
            "question": "Should third-party customs services be identified?",
            "answer": "Yes. Separate the provider's own services from partner activity and check any representative registration."
          },
          {
            "question": "What does freight GEO cost?",
            "answer": "GAEO's canonical pricing applies. Prompt selection and extra AI platforms are scoped after the baseline."
          }
        ],
        "ctaTitle": "See which freight providers AI recommends",
        "ctaText": "Share the website, trade lanes, cargo classes and contracts used. I will outline the starting measurement.",
        "request": "International freight GEO: trade lanes, roles, shipment types, documented capabilities and BMR."
      }
    }
  },
  {
    "id": 56,
    "slug": "customs-representatives",
    "group": "logistics",
    "routes": {
      "ru": "/industries/customs-representatives/",
      "en": "/en/industries/customs-representatives/"
    },
    "parent": {
      "ru": "/industries/international-logistics/",
      "en": "/en/industries/international-logistics/"
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
        "Как измеряем рекомендации и BMR"
      ],
      "en": [
        "How AI recommendations and BMR are measured"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_215315/aa98ab898e1930b5be07f66a09b34a690d51d519/",
        "ru": "ТК ЕАЭС, статья 401: деятельность таможенного представителя",
        "en": "EAEU Customs Code, Article 401: customs representation"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_543965/541d53cd1861c1b4608b2b7d257b559bba792980/",
        "ru": "ФТС: административный регламент реестра таможенных представителей (приказ №216)",
        "en": "Federal Customs Service: customs representative register regulations"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение таможенных представителей | GAEO.ru",
        "h1": "GEO-продвижение таможенных представителей в ответах нейросетей",
        "description": "Продвижение таможенных представителей в ChatGPT и Алисе: статус в реестре, категории товаров, операции, регион, документы и замер BMR.",
        "eyebrow": "Логистика и ВЭД / Таможенное представительство",
        "lead": "Импортер выбирает исполнителя для конкретного оформления: товарная категория, декларация, процедура, таможенный пост и комплект документов. Проверяю, рекомендуют ли нейросети действительно подходящих таможенных представителей и подтверждают ли их статус.",
        "heroPoints": [
          "Запросы по товару, процедуре, режиму и географии оформления",
          "Сверка регистрации в реестре и реальных ограничений представителя",
          "Разные страницы услуг и сопоставимые замеры рекомендации"
        ],
        "problemTitle": "Что нейросети путают при выборе таможенного представителя",
        "problemIntro": "Популярность брокера не равна наличию права совершать все операции в любом регионе и по любому грузу.",
        "problems": [
          {
            "title": "Статус не проверен",
            "body": "Название «таможенный брокер» в рекламе не подтверждает включение в реестр. Важны действующий статус и указанные ограничения."
          },
          {
            "title": "Смешаны услуги декларанта и представителя",
            "body": "Подготовка документов, консультация и совершение операций от имени декларанта имеют разные основания и последствия."
          },
          {
            "title": "Обещания «без задержек» без оговорок",
            "body": "Сроки зависят от полноты документов, вида товара, контрольных процедур и обстоятельств конкретного оформления."
          }
        ],
        "scenarioTitle": "Какие задачи импортер задает нейросети",
        "scenarioIntro": "В рабочем замере вопросы уточняются по товарной группе, роли стороны и применимому регулированию.",
        "columns": [
          "Вопрос заказчика",
          "Доказательства",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кого выбрать для оформления промышленного оборудования?",
            "Категория товара, компетенция, ТН ВЭД, документы и ограничения реестра",
            "Сделать проверяемую страницу соответствующей услуги"
          ],
          [
            "Кто оформляет многокомпонентную поставку для завода?",
            "Состав, спецификации, участники цепочки и распределение операций",
            "Отделить классификацию и документальное сопровождение"
          ],
          [
            "Как найти представителя под конкретный таможенный пост?",
            "Регион действия, присутствие и действительные ограничения полномочий",
            "Публиковать географию услуг по факту"
          ],
          [
            "Нужен ли представитель для оформления товара?",
            "Роль декларанта, процедура и договорные условия конкретной сделки",
            "Объяснить варианты без универсального юридического обещания"
          ]
        ],
        "proofTitle": "Как подтвердить профессиональный статус",
        "proofIntro": "Статья 401 Таможенного кодекса ЕАЭС определяет действия представителя от имени заинтересованного лица на договорной основе. Реестровый статус и ограничения проверяются по актуальным сведениям компетентного органа, а не по рекламному слогану.",
        "checks": [
          "Действующее включение в реестр, юридическое лицо и ограничения по товарам, операциям или региону",
          "Реальные услуги, товарные группы, договор, этапы и применимые документы",
          "Проверяемые квалификации сотрудников и разрешенные к раскрытию примеры без клиентских секретов"
        ],
        "proofNote": "Таможенное представительство выделено отдельно от международной перевозки и импорта под ключ. У GAEO нет заявленного клиентского кейса роста BMR этой специализации.",
        "workTitle": "GEO-методика для таможенного представителя",
        "workIntro": "Вопросы о поиске исполнителя не должны превращаться в неподтвержденную юридическую консультацию. Сначала устанавливаю точные предметы услуг.",
        "steps": [
          {
            "title": "Собрать матрицу запросов",
            "body": "Группирую вопросы по грузу, процедуре, географии и срочности."
          },
          {
            "title": "Проверить юридическую фактуру",
            "body": "Сверяю статус, договорные полномочия, ограничения и подтверждения компетенций."
          },
          {
            "title": "Структурировать услуги",
            "body": "Ставлю ТЗ на товарные и процедурные страницы, реквизиты, FAQ и источники."
          },
          {
            "title": "Оценить ответы после изменений",
            "body": "Замеряю BMR, корректность представления статуса и источники упоминаний."
          }
        ],
        "faq": [
          {
            "question": "Можно ли верить слову «брокер» на сайте?",
            "answer": "Нет. Для роли таможенного представителя проверяют запись в реестре и связанные ограничения."
          },
          {
            "question": "Оформляет ли представитель любые товары?",
            "answer": "Не обязательно. Следует проверять действительные ограничения по реестру, специализацию и условия договора."
          },
          {
            "question": "Заменяет ли GEO проверку таможенного законодательства?",
            "answer": "Нет. Контент строится на официальных данных, а решение по конкретной декларации требует проверки специалистом."
          },
          {
            "question": "Можно ли обещать выпуск декларации в определенный срок?",
            "answer": "Безусловно обещать такой результат нельзя. Срок зависит от документов и действий таможенного органа."
          },
          {
            "question": "Сколько стоит продвижение таможенного представителя?",
            "answer": "Действуют общие тарифы GAEO; матрица запросов и работа с экспертными материалами уточняются на аудите."
          }
        ],
        "ctaTitle": "Проверить рекомендации таможенных представителей",
        "ctaText": "Пришли сайт, перечень операций, товарные группы и номер действующей записи в реестре. Начну с исследования ответов.",
        "request": "GEO таможенного представителя: реестр, ограничения, товарные группы, оформление, договорные услуги и BMR."
      },
      "en": {
        "title": "GEO for customs representatives | GAEO.ru",
        "h1": "GEO promotion for customs representatives and brokerage firms",
        "description": "AI recommendation optimisation for customs representatives: verified register status, customs procedures, goods, geographic limits and repeatable BMR.",
        "eyebrow": "International trade / Customs representatives",
        "lead": "An importer selects a customs specialist for particular goods, a declaration, a procedure and an operational location. I check whether AI suggests businesses whose registration and documented services fit those conditions.",
        "heroPoints": [
          "Buyer questions by goods, procedure and jurisdiction",
          "Verification of register entry, restrictions and service terms",
          "Distinct service pages and comparable AI recommendation measurements"
        ],
        "problemTitle": "Three frequent mistakes in customs-service recommendations",
        "problemIntro": "A recognisable brokerage name is not proof of an unrestricted right to act as a customs representative.",
        "problems": [
          {
            "title": "Registration is taken on trust",
            "body": "A marketing claim of «customs broker» does not substitute for an active official register entry and applicable limitations."
          },
          {
            "title": "Representation and advisory services are blurred",
            "body": "Document preparation, advice and filing on another party's behalf have different legal roles and responsibilities."
          },
          {
            "title": "Clearance time becomes a guarantee",
            "body": "Documents, classification, control and individual circumstances can affect processing, regardless of a provider's promise."
          }
        ],
        "scenarioTitle": "Commercial prompts for a customs specialist",
        "scenarioIntro": "The actual measurement set is adjusted to goods, procedure, jurisdiction and the party represented.",
        "columns": [
          "Customer question",
          "What to verify",
          "GEO action"
        ],
        "scenarios": [
          [
            "Who can handle customs formalities for industrial machinery?",
            "Goods category, competence, classification, declarations and register restrictions",
            "Create a fact-checked service page"
          ],
          [
            "Which firm supports a shipment containing several product categories?",
            "Specifications, classification work, parties and scope of the contract",
            "Separate documentation and representation"
          ],
          [
            "Which representative operates for this customs office?",
            "Actual permitted region, presence and recorded limitations",
            "Publish only verified service geography"
          ],
          [
            "Do we need a customs representative for this import?",
            "Importer role, customs procedure, legal options and case-specific terms",
            "Provide a qualified explanation without universal legal claims"
          ]
        ],
        "proofTitle": "Evidence for a representative's status",
        "proofIntro": "Article 401 of the EAEU Customs Code describes representative action on behalf of customers under a contract. A company's current register status and limitations must be verified with competent authorities.",
        "checks": [
          "Legal identity, register entry and any restrictions by region, operation or goods",
          "Actual declaration and advice services, procedures and contractual scope",
          "Verifiable qualifications and permitted references, with confidential trade details excluded"
        ],
        "proofNote": "Customs representation is distinct from haulage or general import consulting. No GAEO customs client results or automatic clearance outcomes are asserted.",
        "workTitle": "A measured approach to customs GEO",
        "workIntro": "Establish the services the business genuinely provides and the register-based facts that substantiate them before writing recommendation content.",
        "steps": [
          {
            "title": "Define buyer requests",
            "body": "Group questions by goods, declaration type, customs location and service scope."
          },
          {
            "title": "Validate legal claims",
            "body": "Check register status, restrictions, contracts and factual qualifications."
          },
          {
            "title": "Clarify service pages",
            "body": "Specify accurate procedure, goods and region pages with primary sources."
          },
          {
            "title": "Reassess visibility",
            "body": "Compare equivalent AI prompts, citation quality and BMR with the baseline."
          }
        ],
        "faq": [
          {
            "question": "Does the title «broker» prove registration?",
            "answer": "No. Verify current official customs-representative registration and any limits."
          },
          {
            "question": "May a representative work with all goods?",
            "answer": "Not necessarily. Verify legal restrictions, actual competence and agreed scope."
          },
          {
            "question": "Does GEO replace customs legal advice?",
            "answer": "No. A case-specific declaration needs qualified review of current requirements."
          },
          {
            "question": "Can a fixed clearance deadline be guaranteed?",
            "answer": "It is not generally within a service provider's sole control. Documents and authority checks affect the result."
          },
          {
            "question": "How much does customs GEO cost?",
            "answer": "GAEO's standard prices apply; the scope is set by the initial audit and buyer-intent matrix."
          }
        ],
        "ctaTitle": "Find out who AI recommends for customs formalities",
        "ctaText": "Share your website, services, goods categories and current register entry. I will propose the initial recommendation check.",
        "request": "Customs-representative GEO: registration, goods, procedures, scope, verifiable sources and BMR."
      }
    }
  },
  {
    "id": 57,
    "slug": "import-trade-support",
    "group": "logistics",
    "routes": {
      "ru": "/industries/import-trade-support/",
      "en": "/en/industries/import-trade-support/"
    },
    "parent": {
      "ru": "/industries/international-logistics/",
      "en": "/en/industries/international-logistics/"
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
        "Как измеряем рекомендации и BMR"
      ],
      "en": [
        "How AI recommendations and BMR are measured"
      ]
    },
    "sources": [
      {
        "href": "https://www.nalog.gov.ru/rn77/related_activities/spot/",
        "ru": "ФНС: система подтверждения ожидания товаров (СПОТ) для отдельных поставок из ЕАЭС",
        "en": "Russian Tax Service: SPOT system for specified EAEU imports"
      },
      {
        "href": "https://www.nalog.gov.ru/rn50/news/tax_doc_news/16641276/",
        "ru": "ФНС: декларация по косвенным налогам при импорте из ЕАЭС",
        "en": "Russian Tax Service: indirect-tax declaration for EAEU imports"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение компаний по импорту и сопровождению ВЭД | GAEO.ru",
        "h1": "GEO-продвижение компаний по импорту и сопровождению ВЭД",
        "description": "Продвижение импортеров и консультантов по ВЭД в нейросетях: поиск поставщиков, контракты, документы, налоги, границы услуги и BMR.",
        "eyebrow": "Логистика и ВЭД / Импорт и сопровождение",
        "lead": "Компании обращаются за разными задачами: подобрать поставщика, подготовить контракт, проверить документы, провести платежи или организовать ввоз. Проверяю, какие исполнители появляются в рекомендациях нейросетей и насколько точно указано, что они реально берут на себя.",
        "heroPoints": [
          "Матрица запросов по стране, категории товара и этапу импорта",
          "Разделение консультаций, закупки, логистики и таможенных операций",
          "Проверяемые источники, точные формулировки и замеры BMR"
        ],
        "problemTitle": "Почему «импорт под ключ» не объясняет объем ответственности",
        "problemIntro": "Один консультант ведет контракт и документы, другой становится стороной внешнеторговой сделки, третий организует доставку. Эти модели нельзя считать эквивалентными.",
        "problems": [
          {
            "title": "Роли сторон не определены",
            "body": "Нужно выяснить, кто является покупателем и импортером по контракту, кто платит поставщику и кто отвечает за декларирование."
          },
          {
            "title": "Требования к товару обобщены",
            "body": "Технические регламенты, маркировка и разрешительные документы зависят от кода товара, страны и операции. Универсального набора нет."
          },
          {
            "title": "Налоговые правила смешаны",
            "body": "Ввоз из ЕАЭС и из третьих стран требует различать процедуры и подтверждения. Правила СПОТ применимы к определенным поставкам, а не автоматически к любому импорту."
          }
        ],
        "scenarioTitle": "Как бизнес ищет сопровождение импорта",
        "scenarioIntro": "Ниже примеры конкретных коммерческих задач для будущих контрольных вопросов.",
        "columns": [
          "Вопрос заказчика",
          "Доказательства",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто поможет закупить оборудование у производителя в Китае?",
            "Поиск и проверка контрагента, контракт, платеж, перевозка, декларирование",
            "Разделить стадии и ответственность исполнителя"
          ],
          [
            "Как ввезти товар из Казахстана в Россию?",
            "Статус сторон, вид товара, документы, косвенные налоги, применимость СПОТ",
            "Отделить режим ЕАЭС и действие конкретных требований"
          ],
          [
            "Кто возьмет на себя подготовку документов для импорта косметики?",
            "Состав продукта, документы о соответствии, маркировка, роли импортера",
            "Указать специализацию и подтверждаемые услуги"
          ],
          [
            "Кого выбрать для сопровождения первого внешнеторгового контракта?",
            "Страна, продукт, договор, платежи, юридические ограничения и роли сторон",
            "Показать маршрут работ от проверки договора до приемки"
          ]
        ],
        "proofTitle": "Какая фактура делает услугу ВЭД проверяемой",
        "proofIntro": "ФНС публикует действующие требования к отдельным поставкам в рамках ЕАЭС и декларациям по косвенным налогам. При подготовке страниц нужно указывать товар, способ перевозки и применимость режима на дату проверки.",
        "checks": [
          "Перечень фактически оказываемых услуг и статус стороны внешнеторговой сделки",
          "Страны, товарные категории, договорная модель, подтверждения компетенций и партнеров",
          "Актуальные правила по конкретной поставке, инструкции без универсальных гарантий таможенного выпуска"
        ],
        "proofNote": "Сервис сопровождения импорта нельзя выдавать за таможенного представителя без проверки статуса; эта страница не содержит утверждений об измеренном GEO-результате для клиента.",
        "workTitle": "Как выстрою GEO для сопровождающей ВЭД компании",
        "workIntro": "Отталкиваюсь от стадии, на которой клиент ищет помощь, и от правовой роли подрядчика.",
        "steps": [
          {
            "title": "Разделить запросы по стадиям",
            "body": "Фиксирую поиск поставщика, контракт, оплату, доставку, оформление и документы."
          },
          {
            "title": "Проверить область работы",
            "body": "Сверяю границы услуг, регионы, партнеров, документы и ограничения по товарам."
          },
          {
            "title": "Создать экспертные материалы",
            "body": "Ставлю ТЗ на услуги по конкретным сценариям, FAQ и ссылки на актуальные первоисточники."
          },
          {
            "title": "Контролировать BMR",
            "body": "Повторяю исходные промпты и отдельно анализирую точность ответов и источники."
          }
        ],
        "faq": [
          {
            "question": "Всегда ли компания по ВЭД сама является импортером?",
            "answer": "Нет. Юридическая роль определяется договором и фактическими операциями, поэтому ее нужно указывать для каждой услуги."
          },
          {
            "question": "СПОТ применяется к любому импорту?",
            "answer": "Нет. Сфера применения зависит от страны отправления, вида транспорта, этапа введения и действующих правил ФНС."
          },
          {
            "question": "Может ли консультант обещать таможенный выпуск?",
            "answer": "Нет универсальной гарантии решения таможенного органа. Условия и ответственность должны быть сформулированы точно."
          },
          {
            "question": "Нужно ли разделять страны и товарные категории на сайте?",
            "answer": "Да, когда отличаются документы, услуги и коммерческие сценарии. Массовые одинаковые страницы без фактуры бесполезны."
          },
          {
            "question": "Сколько стоит продвижение услуг ВЭД?",
            "answer": "Применяется действующий прайс GAEO. Состав замеров и объем работ согласуются после диагностики."
          }
        ],
        "ctaTitle": "Понять, кому нейросети советуют поручить импорт",
        "ctaText": "Пришли сайт, рынки, категории товаров и точный перечень договорных услуг. Составлю стартовые вопросы для проверки.",
        "request": "GEO для ВЭД и импорта: страны, услуги, статус импортера, документы, поставщики и BMR."
      },
      "en": {
        "title": "GEO for import and foreign trade support | GAEO.ru",
        "h1": "GEO promotion for import and foreign trade support companies",
        "description": "Import-services GEO: supplier sourcing, contracts, customs paperwork, indirect tax requirements, provider responsibilities and measurable AI brand mentions.",
        "eyebrow": "International trade / Import support",
        "lead": "A buyer may need a supplier search, cross-border contract, documentation review, payment coordination or shipment organisation. I test which providers AI recommends for each specific need and whether those providers actually perform the claimed work.",
        "heroPoints": [
          "Queries grouped by country, product and import stage",
          "Separation of sourcing, trading, logistics and customs representation",
          "Evidence-based service descriptions and BMR monitoring"
        ],
        "problemTitle": "Why «turnkey import» can be misleading",
        "problemIntro": "An adviser, purchasing intermediary, importer of record and freight organiser have different duties. The same generic promise hides crucial differences.",
        "problems": [
          {
            "title": "Trading roles are not explicit",
            "body": "The client needs to know who buys the goods, who contracts with the supplier, who pays and who makes any declarations."
          },
          {
            "title": "Product regulations are overstated",
            "body": "Conformity documents, labels and permissions depend on the actual goods and transaction; a universal checklist is misleading."
          },
          {
            "title": "EAEU rules are generalised",
            "body": "Imports from EAEU members and third countries differ. Russia's SPOT requirements apply to specified movements, not every import by default."
          }
        ],
        "scenarioTitle": "Four concrete searches for an import adviser",
        "scenarioIntro": "These are examples for a future prompt matrix rather than quantified demand observations.",
        "columns": [
          "Customer question",
          "What to verify",
          "GEO action"
        ],
        "scenarios": [
          [
            "Who can source machinery from a Chinese manufacturer?",
            "Supplier diligence, contracts, payment, shipping and declaration responsibilities",
            "Explain service stages and legal roles"
          ],
          [
            "How can a business import goods from Kazakhstan into Russia?",
            "Parties, goods, indirect taxes, documents and SPOT applicability",
            "Distinguish EAEU-specific obligations"
          ],
          [
            "Which firm can prepare documents for importing cosmetics?",
            "Composition, product compliance, labels, importer role and actual service",
            "Show verified category competence"
          ],
          [
            "Who can guide a business through its first import contract?",
            "Origin, product, terms, payments, counterparties and responsibilities",
            "Present a defensible end-to-end workflow"
          ]
        ],
        "proofTitle": "The evidence behind an import-support claim",
        "proofIntro": "Russia's Tax Service publishes current rules for certain EAEU imports, including indirect-tax declarations and the SPOT system. Applicability depends on the specific operation and effective rules.",
        "checks": [
          "Documented services and exact legal role in import and purchase contracts",
          "Trade countries, product categories, partners and verifiable qualifications",
          "Current case-specific compliance requirements without unconditional clearance promises"
        ],
        "proofNote": "Import advisory services do not imply registered customs-representative status. No GAEO client outcome or measured uplift is asserted for this niche.",
        "workTitle": "A practical GEO programme for trade support",
        "workIntro": "Map the client's import process and verify which stages a service provider actually controls.",
        "steps": [
          {
            "title": "Map import-stage intents",
            "body": "Separate supplier sourcing, contract work, payment, transport, declarations and compliance."
          },
          {
            "title": "Validate service boundaries",
            "body": "Review contractual roles, countries, goods, partner responsibilities and documents."
          },
          {
            "title": "Produce differentiated content",
            "body": "Specify scenario-based services, useful FAQs and links to primary guidance."
          },
          {
            "title": "Measure changes consistently",
            "body": "Repeat baseline prompts and examine accuracy, source use and BMR."
          }
        ],
        "faq": [
          {
            "question": "Is a foreign trade consultant always the importer of record?",
            "answer": "No. Contractual and operational roles vary by service and transaction."
          },
          {
            "question": "Does SPOT apply to every cross-border purchase?",
            "answer": "No. Check origin, movement type, introduction phase and the current official rules."
          },
          {
            "question": "Can an adviser promise customs release?",
            "answer": "No generic promise can override the authority's review of a real declaration."
          },
          {
            "question": "Should the site separate countries and product categories?",
            "answer": "Yes, where actual service terms and compliance needs differ, rather than generating near-identical pages."
          },
          {
            "question": "How is import GEO priced?",
            "answer": "GAEO uses the published pricing model. Prompt scope and content work follow the initial diagnosis."
          }
        ],
        "ctaTitle": "Find out which import specialists AI recommends",
        "ctaText": "Share the website, countries, goods categories and contract scope. I will outline the initial BMR questions.",
        "request": "Import and trade-support GEO: markets, goods, parties, import roles, regulations and BMR."
      }
    }
  }
];
