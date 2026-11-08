/**
 * Phase 2AJ: bilingual financial and investment adviser GEO, catalogue #29.
 * Distinguish ordinary financial planning from individually regulated securities advice.
 * Evidence links support verification procedures, not GAEO client results or investor returns.
 * Canonical prices, 107 IDs, approved WebP and BMR guarantee are unchanged.
 */
export const industrySpecializationsBatch2AJ = [
  {
    "id": 29,
    "slug": "financial-investment-advisers",
    "group": "finance",
    "routes": {
      "ru": "/industries/financial-investment-advisers/",
      "en": "/en/industries/financial-investment-advisers/"
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
        "Проверка подтверждений компетенции подрядчика"
      ],
      "en": [
        "BMR measurement methodology",
        "Checking provider claims and evidence"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_10148/c7375c64b45cadae15697cffbee9601fadc60975/",
        "ru": "39-ФЗ, статья 6.1: инвестиционное консультирование и статус советника",
        "en": "Federal Law 39-FZ, Article 6.1: regulated investment advice"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_10148/b0f0f1e253c950b933830988e85dbbc0ae025edb/",
        "ru": "39-ФЗ, статья 6.2: индивидуальные рекомендации и инвестиционный профиль",
        "en": "Federal Law 39-FZ, Article 6.2: investment profiles and personalised recommendations"
      },
      {
        "href": "https://www.cbr.ru/finorg/",
        "ru": "Банк России: проверка участников финансового рынка",
        "en": "Bank of Russia: verify a financial-market participant"
      },
      {
        "href": "https://www.cbr.ru/explan/invest/",
        "ru": "Банк России: включение в единый реестр инвестиционных советников",
        "en": "Bank of Russia: investment-adviser register and requirements"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение финансовых и инвестиционных консультантов | GAEO.ru",
        "h1": "GEO-продвижение финансовых и инвестиционных консультантов",
        "description": "Продвижение финансовых консультантов в ответах нейросетей: различие финансового планирования и инвестиционных рекомендаций, реестр Банка России, BMR, тарифы.",
        "eyebrow": "Финансы / Консультации и инвестиционные советники",
        "lead": "Человек может искать помощь с семейным бюджетом, стратегией накоплений или индивидуальными инвестиционными рекомендациями. У этих задач разные предметы и правовые требования. Я измеряю, каких консультантов нейросети рекомендуют по каждому сценарию, и сверяю описание услуг с документами и публичными фактами.",
        "heroPoints": [
          "Раздельные запросы о финансовом планировании и регулируемом инвестиционном консультировании",
          "Проверка статуса в реестре Банка России, если требуется по конкретной услуге",
          "Измерение BMR и точности описания компетенций без обещаний доходности"
        ],
        "problemTitle": "Почему широкое слово «финансовый эксперт» мешает корректной рекомендации",
        "problemIntro": "Покупателю недостаточно общего обещания улучшить финансовое положение. Нужны конкретный вид услуги, условия договора, статус исполнителя и понимание возможного риска.",
        "problems": [
          {
            "title": "Смешаны разные услуги",
            "body": "Работа с бюджетом семьи, финансовое обучение и индивидуальная инвестиционная рекомендация различаются по содержанию. Термин «консультант» сам по себе не подтверждает право давать регулируемые рекомендации."
          },
          {
            "title": "Невозможно проверить статус",
            "body": "Профиль специалиста может перечислять обучение и опыт, но для инвестиционного консультирования важны применимые требования закона и наличие записи в реестре Банка России."
          },
          {
            "title": "Обещания результата размыты",
            "body": "Прогноз накоплений, историческая доходность и гарантированный результат не равнозначны. Условия, риск и ограничения необходимо раскрывать точно без недоказанных обещаний."
          }
        ],
        "scenarioTitle": "Какие вопросы клиентов надо разделять при замере BMR",
        "scenarioIntro": "Это примеры небрендовых запросов для будущего измерения, а не утверждения о фактических рекомендациях определенных специалистов.",
        "columns": [
          "Вопрос клиента",
          "Проверяемые основания",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто поможет составить личный финансовый план с учетом кредитов?",
            "Реальные услуги по бюджетированию, этапы работы, цена, договор и квалификация",
            "Описать границы финансового планирования, процесс и ожидаемый документ"
          ],
          [
            "Как выбрать инвестиционного советника для индивидуальных рекомендаций?",
            "Запись в реестре Банка России, правовой статус, договор и методика учета профиля инвестора",
            "Связать услугу с подтвержденным статусом и требованиями 39-ФЗ"
          ],
          [
            "Кто консультирует собственников малого бизнеса по личным финансам?",
            "Целевая аудитория, компетенции, примеры с разрешением и прозрачность условий",
            "Отделить личные финансы владельца от бухгалтерии и корпоративных консультаций"
          ],
          [
            "Какие вопросы задать консультанту о рисках и вознаграждении?",
            "Порядок оплаты, конфликт интересов, документы и раскрытие существенных рисков",
            "Создать проверяемый раздел об условиях и ограничениях работы"
          ]
        ],
        "proofTitle": "Что действительно можно подтвердить по открытым источникам",
        "proofIntro": "Статьи 6.1 и 6.2 закона №39-ФЗ регулируют индивидуальные инвестиционные рекомендации и работу инвестиционных советников. Банк России ведет реестры участников финансового рынка и описывает требования к статусу инвестиционного советника. Эти источники не означают, что любое бюджетное консультирование автоматически имеет тот же регулируемый статус.",
        "checks": [
          "Точный перечень услуг: финансовый план, обучение, анализ бюджета либо индивидуальные инвестиционные рекомендации",
          "Для регулируемой деятельности: проверка реестра и договорных условий по конкретному исполнителю, без переноса статуса на иных специалистов",
          "Квалификация, методика работы, допустимые публикации, риски и порядок вознаграждения без обещаний положительной доходности"
        ],
        "proofNote": "GAEO предлагает методику GEO-продвижения консультантов, а не инвестиционные рекомендации потребителям. Клиентских результатов GAEO в этой специализации здесь не заявлено.",
        "workTitle": "Как организую GEO-продвижение финансового консультанта",
        "workIntro": "Сначала разграничиваю запросы об обучении, финансовом плане и персональных инвестиционных рекомендациях. Затем проверяю, что ответы нейросетей не смешивают эти услуги.",
        "steps": [
          {
            "title": "Стартовый BMR по типам запросов",
            "body": "Фиксирую небрендовые вопросы по жизненным ситуациям, виду консультации, требованиям к советнику и географии оказания услуг."
          },
          {
            "title": "Правовая и фактологическая проверка",
            "body": "Сверяю заявленные услуги, применимость реестра, условия договора, публичную квалификацию и формулировки о рисках."
          },
          {
            "title": "Экспертное содержание и источники",
            "body": "Готовлю задания для страниц разных услуг, методик консультаций, профильной биографии и разрешенных примеров работы."
          },
          {
            "title": "Повторное измерение и контроль ошибок",
            "body": "Сравниваю рекомендации по той же матрице и проверяю, не приписывают ли нейросети право на регулируемые услуги или гарантии доходности."
          }
        ],
        "faq": [
          {
            "question": "Обязательно ли финансовому консультанту быть инвестиционным советником?",
            "answer": "Зависит от конкретных услуг. Предоставление индивидуальных инвестиционных рекомендаций по ценным бумагам и производным инструментам регулируется законом №39-ФЗ. Финансовое планирование и общие информационные материалы надо оценивать по их фактическому содержанию."
          },
          {
            "question": "Где проверить инвестиционного советника?",
            "answer": "В реестре и сервисе проверки участников финансового рынка Банка России. Сверять следует конкретное юридическое лицо или ИП и актуальные сведения, а не только рекламный профиль."
          },
          {
            "question": "Может ли GEO обещать прибыль клиенту консультанта?",
            "answer": "Нет. GEO измеряет рекомендации самого консультанта в нейросетях. Инвестиционная доходность зависит от рыночных рисков и не является результатом GEO-продвижения."
          },
          {
            "question": "Как считать BMR финансового консультанта?",
            "answer": "По зафиксированной выборке небрендовых вопросов отдельно для финансового планирования и регулируемого инвестиционного консультирования. В ответах проверяются не только упоминания, но и точность описания услуг."
          },
          {
            "question": "Сколько стоит продвижение инвестиционного консультанта в нейросетях?",
            "answer": "Действуют опубликованные тарифы GAEO. Объем определяется видами услуг, целевой аудиторией, географией и набором проверяемых коммерческих запросов."
          }
        ],
        "ctaTitle": "Проверим, за какие финансовые запросы нейросети рекомендуют консультантов",
        "ctaText": "Пришли сайт, перечень услуг, условия договора и подтверждение статуса, когда он необходим. Предложу исходную матрицу BMR.",
        "request": "GEO для финансовых и инвестиционных консультантов: финансовый план, инвестиционные рекомендации, реестр ЦБ, риски, BMR."
      },
      "en": {
        "title": "GEO for financial planners and regulated investment advisers | GAEO",
        "h1": "GEO visibility for financial consultants and investment advisers",
        "description": "AI visibility for financial planning and investment advisers: regulated advice boundaries, Bank of Russia register, verifiable credentials and BMR.",
        "eyebrow": "Finance / Financial planning and investment advice",
        "lead": "People seeking a household budget plan and those looking for personalised securities advice need different services. I measure which advisers AI recommends for each non-branded situation and verify whether their claimed scope, professional status and engagement terms are supported by public records.",
        "heroPoints": [
          "Separate personal financial planning from regulated investment recommendations",
          "Verify the Bank of Russia register where the actual service requires it",
          "Measure recommendation accuracy and BMR without return-on-investment promises"
        ],
        "problemTitle": "Why the label “financial expert” is too vague for AI recommendations",
        "problemIntro": "A client needs to know the actual deliverable, the adviser's status, the contract and potential risks. Generic statements about improving finances do not provide those facts.",
        "problems": [
          {
            "title": "Different services are mixed",
            "body": "Budget coaching, general education and individualised securities advice have different purposes. The word “consultant” alone does not prove authorisation for regulated activity."
          },
          {
            "title": "Professional status cannot be verified",
            "body": "A biography may list credentials, yet the relevant regulatory status and current registration are crucial when the service is investment advising."
          },
          {
            "title": "Outcome claims lack context",
            "body": "An illustrative savings plan, historic investment performance and a guaranteed return are different concepts. Public content should state assumptions and risks."
          }
        ],
        "scenarioTitle": "Buyer questions for a defensible BMR benchmark",
        "scenarioIntro": "These prompts are research hypotheses, not reports of actual AI recommendations or endorsements.",
        "columns": [
          "Client question",
          "Evidence to review",
          "GEO content task"
        ],
        "scenarios": [
          [
            "Who can help my family build a financial plan around debt repayments?",
            "Budget-planning services, stages, fees, written terms and relevant background",
            "Explain the planning deliverable and its limits"
          ],
          [
            "How do I select an investment adviser for personalised recommendations?",
            "Bank of Russia registration, legal status, advice agreement and investor-profile procedure",
            "Distinguish regulated advice from general financial commentary"
          ],
          [
            "Who helps small-business owners with personal financial planning?",
            "Audience focus, documented competence, permitted work examples and fees",
            "Separate personal planning from business accounting and consultancy"
          ],
          [
            "What should I ask about conflicts of interest and investment risk?",
            "Remuneration terms, risk disclosure, contractual obligations and adviser status",
            "Publish verifiable engagement terms and limitations"
          ]
        ],
        "proofTitle": "What can be checked before an adviser is recommended",
        "proofIntro": "Articles 6.1 and 6.2 of Russia's Federal Law 39-FZ govern personalised investment advice and the requirements for investment advisers. The Bank of Russia maintains financial-sector registers and explains the admission process. Those rules must not automatically be applied to every generic budgeting or education service.",
        "checks": [
          "Exact type of service: budgeting, financial education, planning or personalised investment recommendations",
          "For regulated activity: the specific provider's current registration, governing status and engagement documents",
          "Professional history, documented methodology, permitted case evidence, remuneration and risk disclosure without guaranteed profits"
        ],
        "proofNote": "GAEO offers GEO measurement and content work, not financial product recommendations to consumers. No completed GAEO client results in this sector are asserted.",
        "workTitle": "How I develop GEO for a financial advisory practice",
        "workIntro": "I separate education, planning and personal investment recommendations before judging how AI depicts the provider.",
        "steps": [
          {
            "title": "Baseline buyer-question BMR",
            "body": "Measure non-branded questions by client life situation, service category, geography and regulatory expectations."
          },
          {
            "title": "Verify legal and professional evidence",
            "body": "Review actual service boundaries, register applicability, contract terms, credentials and risk statements."
          },
          {
            "title": "Improve professional content",
            "body": "Plan distinct service pages, adviser biographies, client-method explanations and authorised examples."
          },
          {
            "title": "Recheck AI accuracy",
            "body": "Repeat the fixed prompt matrix and identify unsupported regulated-service claims or investment-return promises."
          }
        ],
        "faq": [
          {
            "question": "Does every financial planner need to be a registered investment adviser?",
            "answer": "Not automatically. Personalised investment recommendations relating to securities and derivatives are regulated under Federal Law 39-FZ. Assess other financial-planning and educational services according to their actual content."
          },
          {
            "question": "Where can someone verify an investment adviser in Russia?",
            "answer": "Use the Bank of Russia's financial-sector participant search and investment-adviser register. Match the specific legal entity or sole proprietor and current record."
          },
          {
            "question": "Can GEO guarantee an adviser's clients' investment returns?",
            "answer": "No. GEO measures whether AI recommends the adviser accurately. Market returns and portfolio risk are separate from GEO performance."
          },
          {
            "question": "How should an adviser's BMR be measured?",
            "answer": "Use a fixed set of non-branded questions, splitting financial planning and regulated investment advice. Audit both brand recommendations and the accuracy of the services described."
          },
          {
            "question": "How much does GEO for investment advisers cost?",
            "answer": "GAEO's published plans apply. Scope depends on real service lines, audience segments, operating regions and baseline buyer questions."
          }
        ],
        "ctaTitle": "Find out which advisers AI recommends for the services you actually provide",
        "ctaText": "Share the website, genuine service scope, contract terms and applicable registration evidence. I will build an initial BMR question set.",
        "request": "Financial and investment adviser GEO: regulated recommendations, financial planning, Bank of Russia register, risk disclosures and BMR."
      }
    }
  }
];
