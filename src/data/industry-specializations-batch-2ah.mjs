/**
 * Phase 2AH, revised after detecting overlapping parallel 2AG (#31/32) and 2AI (#28).
 * Original RU/EN GEO content for outsourced accounting (#27) and financial/investment advisers (#29).
 * Public laws describe verification methods, not providers' credentials or GAEO client outcomes.
 * Preserve all shared tariffs, permanent 107 IDs, approved WebP and BMR guarantee terms.
 */
export const industrySpecializationsBatch2AH = [
  {
    "id": 27,
    "slug": "outsourced-accounting-services",
    "group": "finance",
    "routes": {
      "ru": "/industries/outsourced-accounting-services/",
      "en": "/en/industries/outsourced-accounting-services/"
    },
    "parent": {
      "ru": "/tarify/",
      "en": "/en/pricing/"
    },
    "parentLabels": {
      "ru": "Каталог 107 отраслевых услуг",
      "en": "107-industry GEO pricing catalogue"
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
        "Методика замеров BMR",
        "Проверка доказательств профессиональных B2B-услуг"
      ],
      "en": [
        "How BMR is measured",
        "Evidence checks for professional B2B services"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_122855/56dc96d26dd9e8b6922341ab162acc7e10d57ddf/",
        "ru": "402-ФЗ, статья 7: организация бухгалтерского учета и договор с исполнителем",
        "en": "Accounting Law 402-FZ, Article 7: outsourcing accounting responsibilities"
      },
      {
        "href": "https://www.nalog.gov.ru/rn77/taxation/submission_statements/",
        "ru": "ФНС: способы подачи налоговой и бухгалтерской отчетности",
        "en": "Federal Tax Service: submitting tax and accounting returns"
      },
      {
        "href": "https://www.nalog.gov.ru/rn77/related_activities/el_doc/use_electronic_sign/",
        "ru": "ФНС: квалифицированная подпись и машиночитаемые доверенности",
        "en": "Federal Tax Service: qualified digital signatures and machine-readable powers of attorney"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение бухгалтерского аутсорсинга в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение бухгалтерских аутсорсинговых компаний",
        "description": "Продвижение бухгалтерского аутсорсинга в ChatGPT и Алисе: учет и отчетность, МЧД, отрасли, 1С, договоры, ответственность и измерение рекомендаций BMR.",
        "eyebrow": "Финансы и учет / Бухгалтерский аутсорсинг",
        "lead": "Предприниматель ищет бухгалтерскую компанию для конкретного налогового режима, оборота, персонала и документооборота. Проверяю, какие подрядчики попадают в рекомендации нейросетей по таким небрендовым вопросам и что подтверждает их реальную специализацию.",
        "heroPoints": [
          "Запросы по режиму налогообложения, отрасли, объему операций и 1С",
          "Разделение текущего учета, восстановления документов и подготовки отчетности",
          "Проверка договора, полномочий представителя и сопоставимый BMR"
        ],
        "problemTitle": "Почему бизнесу сложно сравнивать бухгалтерские компании по общим обещаниям",
        "problemIntro": "Фраза «ведем бухгалтерию под ключ» не отвечает на вопросы о кассах, зарплате, внешнеэкономической деятельности и сроках закрытия месяца. Для рекомендации нужны границы обязанностей и проверяемый порядок работы.",
        "problems": [
          {
            "title": "Не указан состав сопровождения",
            "body": "Ведение первичных документов, кадровый учет, расчет зарплаты, подготовка деклараций и восстановление учета могут оплачиваться отдельно. Без списка работ и исключений тарифы несопоставимы."
          },
          {
            "title": "Одинаковые условия для разного бизнеса",
            "body": "Селлер маркетплейса, производитель и сервисная компания используют разные операции и документы. Сайт без сегментации не показывает, есть ли у подрядчика нужная практика."
          },
          {
            "title": "Неясны полномочия и ответственность",
            "body": "Для сдачи отчетности от имени клиента важны корректные полномочия, доступы, электронные подписи и порядок согласования. Обещание «сдадим все за вас» требует юридической и технической конкретики."
          }
        ],
        "scenarioTitle": "Какие запросы приводят предпринимателей к выбору бухгалтера через нейросети",
        "scenarioIntro": "Это примеры для будущей матрицы BMR, а не утверждение о уже полученных рекомендациях конкретных компаний.",
        "columns": [
          "Запрос предпринимателя",
          "Что проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какое бухгалтерское агентство ведет ООО на УСН с сотрудниками?",
            "Состав учета и зарплатного блока, опыт режима, сроки, лимиты операций, договор",
            "Разделить услуги учета и подготовки отчетности для ООО"
          ],
          [
            "Кому передать бухгалтерию продавца на маркетплейсах?",
            "Работа с отчетами площадок, комиссиями, возвратами, товарным учетом и 1С",
            "Показать отраслевую методику и подтвержденные возможности"
          ],
          [
            "Кто восстановит бухгалтерский учет после смены подрядчика?",
            "Порядок первичной диагностики, период восстановления, перечень исходных документов",
            "Описать отдельную услугу восстановления с условиями приемки"
          ],
          [
            "Как бухгалтерская компания сдает декларации по доверенности?",
            "МЧД, КЭП, полномочия, контроль подписания, роли исполнителя и заказчика",
            "Показать легитимную схему работы представителя"
          ]
        ],
        "proofTitle": "Какие факты подтверждают пригодность бухгалтерского подрядчика",
        "proofIntro": "Статья 7 закона №402-ФЗ предусматривает договор об оказании услуг по ведению бухгалтерского учета в установленных случаях, при этом обязанности руководителя нужно оценивать отдельно. ФНС описывает способы подачи отчетности и применение машиночитаемых доверенностей. Эти нормы не подтверждают точность работы конкретного подрядчика.",
        "checks": [
          "Договорной объем работ, налоговые режимы, отрасли, критерии расчета тарифа и правила передачи документов",
          "Порядок КЭП и МЧД, взаимодействие с ФНС, роли сотрудников, сроки и контроль ошибок",
          "Разрешенные клиентские примеры, фактические показатели с методикой и условия конфиденциальности"
        ],
        "proofNote": "Это профессиональный анализ GEO для бухгалтерского аутсорсинга; клиентские кейсы и результаты роста BMR в этой отрасли GAEO здесь не заявляет.",
        "workTitle": "Как организую GEO-продвижение бухгалтерского аутсорсинга",
        "workIntro": "Определяю бизнес-сегменты и запросы выбора исполнителя, проверяю прозрачность услуги и затем сравниваю рекомендации нейросетей по фиксированной матрице.",
        "steps": [
          {
            "title": "Сформировать стартовую матрицу BMR",
            "body": "Фиксирую вопросы по налоговому режиму, числу сотрудников, документообороту и отрасли. Брендовые вопросы отделяю от небрендовых."
          },
          {
            "title": "Проверить подтверждающие материалы",
            "body": "Сверяю договор, тарифные ограничения, примеры задач, порядок МЧД и роль специалистов. Непроверенные заявления о безошибочности исключаю."
          },
          {
            "title": "Доработать страницы услуг и экспертные материалы",
            "body": "Готовлю задания на страницы по отрасли, режиму учета, восстановлению документов, интеграциям 1С и распространенным вопросам клиента."
          },
          {
            "title": "Повторить контрольный замер",
            "body": "Сравниваю BMR на тех же запросах и проверяю, правильно ли нейросети описывают состав услуги и условия подрядчика."
          }
        ],
        "faq": [
          {
            "question": "Бухгалтерский аутсорсинг и аудит — одна услуга?",
            "answer": "Нет. Текущий учет и подготовка отчетности имеют иной предмет, чем независимая аудиторская проверка. На сайте нужно разделить исполнение учетных функций и аудит."
          },
          {
            "question": "Можно ли обещать фиксированную цену для любого ООО?",
            "answer": "Стоимость зависит от состава работ, объема документов, числа сотрудников, режима налогообложения и дополнительных задач. Фиксированный тариф возможен при четко описанных пределах."
          },
          {
            "question": "Может ли подрядчик сдавать отчетность от имени клиента?",
            "answer": "Да, при наличии надлежащих полномочий и соблюдении применимых правил представительства и электронной подписи. Фактическую схему КЭП и МЧД следует проверять перед публикацией."
          },
          {
            "question": "Как доказать опыт с продавцами маркетплейсов?",
            "answer": "Подойдут разрешенные примеры документооборота, список поддерживаемых операций и интеграций, методика контроля возвратов и комиссий. Нельзя выдумывать клиентские результаты."
          },
          {
            "question": "Сколько стоит GEO-продвижение бухгалтерской компании?",
            "answer": "Применяются общие опубликованные тарифы GAEO. Объем зависит от специализаций, числа регионов и исходной матрицы запросов BMR."
          }
        ],
        "ctaTitle": "Выясним, каких бухгалтерских подрядчиков нейросети советуют предпринимателям",
        "ctaText": "Пришли сайт, налоговые режимы клиентов, список услуг и допустимые примеры работы. Подготовлю основу стартового замера.",
        "request": "GEO бухгалтерского аутсорсинга: учет ООО, УСН, маркетплейсы, зарплата, МЧД, 1С, договор и BMR."
      },
      "en": {
        "title": "GEO for outsourced accounting services and bookkeepers | GAEO",
        "h1": "GEO promotion for outsourced accounting providers",
        "description": "GEO for outsourced accountants: tax regimes, payroll, reporting, client authority, 1C integrations, service scope and AI recommendation BMR.",
        "eyebrow": "Finance and accounting / Outsourced bookkeeping",
        "lead": "Business owners seek an accounting partner that understands their tax regime, transaction volume, employees and reporting duties. I study which providers AI recommends for those specific non-brand questions and what facts support an accurate comparison.",
        "heroPoints": [
          "Buyer prompts by tax regime, industry, headcount and software",
          "Separate bookkeeping, reporting, payroll and remediation scope",
          "Contracts, authorised representation and repeatable BMR checks"
        ],
        "problemTitle": "Why generic accounting promises leave business owners without a useful comparison",
        "problemIntro": "A vague end-to-end bookkeeping promise does not explain payroll, transaction imports, marketplace reports or month-end deliverables. AI assistants need clear service boundaries and evidence.",
        "problems": [
          {
            "title": "Services are grouped under one price",
            "body": "Bookkeeping, payroll, filing, historic reconstruction and additional document processing may have separate scopes. A headline monthly fee must include the assumptions behind it."
          },
          {
            "title": "Different businesses are treated alike",
            "body": "Marketplace sellers, manufacturers and professional firms create different accounting records. Sector examples matter when a provider claims experience."
          },
          {
            "title": "Responsibilities are unclear",
            "body": "Client approval, electronic signatures, powers of attorney and filing access are distinct responsibilities. Claims of full delegation need an accurate legal and technical workflow."
          }
        ],
        "scenarioTitle": "Accounting-provider searches that can trigger AI recommendations",
        "scenarioIntro": "These are proposed baseline questions rather than observed recommendations or performance claims.",
        "columns": [
          "Business question",
          "Evidence to check",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which accountants support a small LLC with payroll and simplified tax?",
            "Supported tax regime, payroll scope, document limits and terms",
            "Build a dedicated business-type service explanation"
          ],
          [
            "Who can handle marketplace seller accounting?",
            "Marketplace statements, commissions, returns, inventory and 1C handling",
            "Describe supported marketplace workflows"
          ],
          [
            "Which firm can reconstruct records after a provider switch?",
            "Diagnostic process, document intake, period covered and deliverables",
            "Separate reconstruction from ongoing bookkeeping"
          ],
          [
            "Can accountants file tax reports as a representative?",
            "Authorisation, electronic signatures, machine-readable powers and client approval",
            "Explain the actual representative workflow"
          ]
        ],
        "proofTitle": "Evidence that supports a reliable outsourced accounting recommendation",
        "proofIntro": "Article 7 of Russia's Accounting Law 402-FZ permits contracted bookkeeping within its stated conditions, while the Federal Tax Service explains return submission and representative authorisations. These sources do not establish a particular firm's accuracy or reliability.",
        "checks": [
          "Actual client segments, service deliverables, limits, pricing assumptions and onboarding procedures",
          "Electronic signature and power-of-attorney processes, data access and filing responsibility",
          "Permissioned examples, client confidentiality and verifiable processes rather than invented performance data"
        ],
        "proofNote": "This is an evidence-led GEO methodology, not a claim of a completed GAEO outsourced-accounting client engagement.",
        "workTitle": "How I structure GEO for outsourced accounting firms",
        "workIntro": "I separate client requirements, validate provider claims, and measure changes in AI recommendations on an unchanged sample.",
        "steps": [
          {
            "title": "Baseline BMR by business scenario",
            "body": "Record non-branded questions by tax regime, payroll, accounting software and client industry; measure brand prompts separately."
          },
          {
            "title": "Check legal and service evidence",
            "body": "Review the agreement, filing authority, technology, limits and permitted client examples without publishing confidential records."
          },
          {
            "title": "Build service and sector content",
            "body": "Specify dedicated pages for accounting arrangements, payroll, reporting, remediation and supported industry integrations."
          },
          {
            "title": "Repeat the same recommendation prompts",
            "body": "Compare BMR and identify false claims about scope, deadlines or filing authority."
          }
        ],
        "faq": [
          {
            "question": "Is outsourced bookkeeping the same as independent audit?",
            "answer": "No. Ongoing accounting and tax reporting are separate from the assurance engagement performed by an auditor."
          },
          {
            "question": "Can every small company receive the same fixed price?",
            "answer": "Only if the fee assumptions and service limits are genuinely comparable. Document volume, payroll and compliance obligations vary."
          },
          {
            "question": "Can an outside provider submit returns on behalf of a client?",
            "answer": "Yes when the relevant authorisation, signature and filing rules are satisfied. The actual process should be documented."
          },
          {
            "question": "How can a firm show marketplace-accounting expertise?",
            "answer": "Use verified workflows, supported integration evidence and authorised client examples rather than invented success metrics."
          },
          {
            "question": "How much does GAEO charge an accounting provider?",
            "answer": "GAEO's published pricing applies, with the scope determined by client segments, geographical coverage and the initial prompt matrix."
          }
        ],
        "ctaTitle": "See which outsourced accountants AI recommends to business owners",
        "ctaText": "Share your site, supported tax regimes, service breakdown and permitted process evidence. I will scope the initial measurement.",
        "request": "Outsourced accounting GEO: SMEs, payroll, marketplace accounting, filing authority, 1C and BMR."
      }
    }
  },
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
      "ru": "Каталог 107 отраслевых услуг",
      "en": "107-industry GEO pricing catalogue"
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
        "Методика замеров BMR",
        "Проверка доказательств профессиональных B2B-услуг"
      ],
      "en": [
        "How BMR is measured",
        "Evidence checks for professional B2B services"
      ]
    },
    "sources": [
      {
        "href": "https://www.cbr.ru/explan/invest/",
        "ru": "Банк России: статус инвестиционных советников и порядок включения в ЕРИС",
        "en": "Bank of Russia: investment adviser rules and registration"
      },
      {
        "href": "https://www.cbr.ru/securities_market/registries/",
        "ru": "Банк России: единый реестр инвестиционных советников и реестры рынка ценных бумаг",
        "en": "Bank of Russia: unified register of investment advisers"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_58968/0021818db8b93ae5fbd38076074a7182e157186c/",
        "ru": "38-ФЗ, статья 28: реклама финансовых услуг и применимые ограничения",
        "en": "Advertising Law 38-FZ, Article 28: financial-service advertising"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение финансовых и инвестиционных консультантов | GAEO.ru",
        "h1": "GEO-продвижение финансовых и инвестиционных консультантов",
        "description": "GEO для финансовых консультантов в ChatGPT и Алисе: финансовый план, инвестиционное консультирование, статус ЕРИС, конфликты интересов и замеры BMR.",
        "eyebrow": "Финансы / Консультанты и инвестиционные советники",
        "lead": "Человек выбирает финансового консультанта для планирования бюджета, капитала или обращения за инвестиционной рекомендацией. Я разделяю эти разные услуги, проверяю правовой статус исполнителя и измеряю, кого нейросети рекомендуют по конкретным сценариям.",
        "heroPoints": [
          "Разные запросы о финансовом планировании и индивидуальных инвестиционных рекомендациях",
          "Проверка статуса инвестиционного советника в применимом реестре Банка России",
          "Прозрачность вознаграждения, конфликтов интересов и метода сравнения BMR"
        ],
        "problemTitle": "Почему универсальное название «финансовый советник» вводит клиентов в заблуждение",
        "problemIntro": "Общий расчет семейного бюджета и персональная рекомендация по ценным бумагам имеют разное правовое содержание. Для обоснованного ответа нейросети должны объяснять фактическую услугу, а не переносить регулируемый статус с одной категории на другую.",
        "problems": [
          {
            "title": "Не определен характер рекомендации",
            "body": "Обучение финансовой грамотности, финансовое планирование и индивидуальная инвестиционная рекомендация различаются предметом и применимыми требованиями. На сайте нужно указать, что конкретно получает клиент."
          },
          {
            "title": "Не раскрыты стимулы консультанта",
            "body": "Фиксированная оплата, комиссия или вознаграждение от поставщиков продуктов могут влиять на выбор услуги. Эти условия нужно описывать точно и проверяемо."
          },
          {
            "title": "Обещания доходности без исходных условий",
            "body": "Прошлые результаты, сценарные расчеты и гарантии будущего дохода не равнозначны. Нельзя превращать иллюстративный расчет в обещание прибыли или отсутствия риска."
          }
        ],
        "scenarioTitle": "По каким вопросам люди ищут финансовых консультантов через нейросети",
        "scenarioIntro": "Это потенциальные вопросы стартового замера; до исследования они не показывают, какие советники реально присутствуют в ответах.",
        "columns": [
          "Запрос клиента",
          "Проверяемые факты",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Как найти специалиста по финансовому плану семьи на 5 лет?",
            "Состав плана, квалификация, тариф, этапы и раскрытие ограничений",
            "Развести консультацию по бюджету и регулируемую инвестиционную рекомендацию"
          ],
          [
            "Как проверить инвестиционного советника перед получением индивидуальной рекомендации?",
            "Наличие в ЕРИС при применимости, юридическое лицо, договор и объем полномочий",
            "Привязать статус к конкретной услуге с официальной ссылкой"
          ],
          [
            "Кто помогает предпринимателю планировать личный капитал после продажи бизнеса?",
            "Объем задачи, методика анализа рисков, конфликты интересов, условия оплаты",
            "Показать подтверждаемую методику без обещаний доходности"
          ],
          [
            "Как сравнить независимую консультацию и продажу финансового продукта?",
            "Модель вознаграждения, партнерские выплаты, рекомендованные продукты и риски",
            "Раскрыть экономические стимулы и условия услуги"
          ]
        ],
        "proofTitle": "Что подтверждает надежность финансового или инвестиционного консультанта",
        "proofIntro": "Банк России публикует порядок регулирования инвестиционных советников и единый реестр ЕРИС. Реестровый статус проверяется для деятельности, в которой он необходим; сам по себе он не гарантирует доходность. Общие консультации по бюджету нельзя автоматически выдавать за право предоставлять индивидуальные инвестиционные рекомендации.",
        "checks": [
          "Юридическое лицо и роль специалиста, определение услуги и статус в реестре при применимости",
          "Профессиональная биография, договор, стоимость, порядок раскрытия вознаграждения и конфликтов интересов",
          "Документирование методики, рисков и ограничений, разрешенные примеры без личных финансовых данных клиентов"
        ],
        "proofNote": "Страница раскрывает возможный GEO-подход и критерии проверки, но не заявляет клиентских кейсов GAEO у инвестиционных советников или доказанного финансового результата.",
        "workTitle": "Как организую GEO-продвижение финансового консультанта",
        "workIntro": "Сначала разделяю клиентские задачи и правовые режимы, затем выстраиваю источники доказательств и проверяю фактическую динамику рекомендаций.",
        "steps": [
          {
            "title": "Составить матрицу BMR по задачам клиента",
            "body": "Фиксирую небрендовые запросы о бюджете, финансовом плане, выборе инвестиционного советника и структуре оплаты."
          },
          {
            "title": "Проверить статус и границы услуги",
            "body": "Сверяю договор, полномочия, сведения Банка России при применимости, квалификацию, ограничения и порядок обработки данных."
          },
          {
            "title": "Подготовить отдельные сервисные страницы",
            "body": "Разделяю финансовое планирование и регулируемое инвестиционное консультирование, публикую методику, FAQ и разрешенную экспертную фактуру."
          },
          {
            "title": "Повторно измерить корректные рекомендации",
            "body": "Сравниваю BMR по первоначальной выборке, отслеживая ложные обещания доходности и ошибочно приписанный регуляторный статус."
          }
        ],
        "faq": [
          {
            "question": "Любой финансовый консультант должен быть в ЕРИС?",
            "answer": "Нет, требование зависит от фактической деятельности. Если исполнитель предоставляет индивидуальные инвестиционные рекомендации в смысле применимых норм, статус нужно проверять по правилам Банка России. Общую консультацию по бюджету нельзя автоматически приравнивать к этой услуге."
          },
          {
            "question": "Включение в реестр гарантирует доходность инвестиций?",
            "answer": "Нет. Реестр помогает проверить предусмотренный регулированием статус, но не устраняет инвестиционный риск и не доказывает будущий финансовый результат."
          },
          {
            "question": "Как отличить независимый совет от продажи продукта?",
            "answer": "Нужно раскрыть источник вознаграждения, партнерские отношения, сферу рекомендаций и потенциальные конфликты интересов. Название «независимый» само по себе ничего не подтверждает."
          },
          {
            "question": "Можно ли публиковать историю портфеля клиента?",
            "answer": "Публикация требует проверки прав на раскрытие, согласий и защиты персональных данных. Для объяснения методики лучше использовать корректно обозначенный учебный пример без идентификации клиента."
          },
          {
            "question": "Какая стоимость GEO для финансового консультанта?",
            "answer": "Применяются опубликованные тарифы GAEO. Объем работ определяется услугами, целевой аудиторией, географией и матрицей запросов нейросетей."
          }
        ],
        "ctaTitle": "Проверим, каких консультантов нейросети рекомендуют по финансовым задачам",
        "ctaText": "Пришли сайт, точный перечень услуг, сведения о статусе, условиях вознаграждения и допустимых материалах. Составлю исходную матрицу.",
        "request": "GEO финансового консультанта: финансовое планирование, инвестиционные советы, статус ЕРИС, конфликты интересов и BMR."
      },
      "en": {
        "title": "GEO for financial planners and investment advisers | GAEO",
        "h1": "GEO promotion for financial and investment advisers",
        "description": "GEO for financial advisers: planning, regulated personal investment recommendations, Bank of Russia registry, fees, conflicts and AI BMR measurement.",
        "eyebrow": "Finance / Financial planning and investment advice",
        "lead": "A person may seek help with household financial planning, capital strategy or a personalised investment recommendation. I distinguish these different services, check the provider's applicable legal status and measure which advisers AI recommends for each buyer question.",
        "heroPoints": [
          "Separate planning from regulated personalised investment recommendations",
          "Verify applicable investment adviser status through Bank of Russia sources",
          "Disclose remuneration, conflicts and evidence behind AI recommendation BMR"
        ],
        "problemTitle": "Why the generic label financial adviser can mislead clients",
        "problemIntro": "Budget coaching and individual securities advice are different services with different duties. Useful AI answers should clarify the exact service and should not transfer regulated credentials from one category to another.",
        "problems": [
          {
            "title": "The kind of advice is unclear",
            "body": "Financial education, personal budgeting and an individual investment recommendation serve different purposes. The provider must describe the actual deliverable."
          },
          {
            "title": "Compensation can create conflicts",
            "body": "Flat fees, product distribution commissions and third-party payments may influence adviser incentives. Verifiable compensation information matters."
          },
          {
            "title": "Projected returns are overclaimed",
            "body": "Illustrative scenarios, past outcomes and guarantees of future profits are not equivalent. Financial risk must remain visible in service descriptions."
          }
        ],
        "scenarioTitle": "Questions people ask AI when selecting a financial adviser",
        "scenarioIntro": "These are proposed BMR measurement questions, not already observed recommendations.",
        "columns": [
          "Client question",
          "Evidence to examine",
          "GEO content objective"
        ],
        "scenarios": [
          [
            "Who can help develop a five-year household financial plan?",
            "Work scope, qualifications, delivery stages, price and limits",
            "Separate financial planning from regulated securities advice"
          ],
          [
            "How do I verify an adviser before receiving personal investment recommendations?",
            "Applicable central-bank register, provider identity, agreement and authority",
            "Link advice status to official verifiable records"
          ],
          [
            "Who helps founders plan personal wealth after selling a business?",
            "Scope, risk methodology, fees, potential conflicts and documented process",
            "Describe a verifiable approach without promising returns"
          ],
          [
            "How do I compare independent advice with product distribution?",
            "Fee model, commissions, affiliations and instruments covered",
            "Clarify economic incentives and service constraints"
          ]
        ],
        "proofTitle": "Evidence behind a defensible adviser recommendation",
        "proofIntro": "The Bank of Russia explains regulation of investment advisers and maintains the Unified Register of Investment Advisers. An entry must be checked where the activity legally calls for it, and registration does not guarantee investment returns. General financial planning should not be conflated with personalised investment recommendations.",
        "checks": [
          "Service definition, firm identity, named professional and applicable regulatory status",
          "Experience evidence, contract, compensation and potential conflicts of interest",
          "Documented risk methodology and privacy-safe examples with no invented customer outcomes"
        ],
        "proofNote": "This page sets out an evidence-led GEO method, not completed GAEO work for an investment adviser or proof of financial performance.",
        "workTitle": "How I approach GEO for financial advisory providers",
        "workIntro": "I separate client needs and regulatory categories, verify the basis for claims and track recommendations on a fixed set of prompts.",
        "steps": [
          {
            "title": "Baseline BMR by advice use case",
            "body": "Record non-brand searches for household planning, wealth planning, adviser verification and fee transparency."
          },
          {
            "title": "Check status and service boundaries",
            "body": "Review the contract, relevant Bank of Russia records, adviser credentials and documented restrictions."
          },
          {
            "title": "Build clear service and expert pages",
            "body": "Separate planning from regulated investment advice, publish actual process information and accurate expert evidence."
          },
          {
            "title": "Repeat recommendation and accuracy checks",
            "body": "Re-run the same prompts and flag false return guarantees or incorrectly attributed regulated status."
          }
        ],
        "faq": [
          {
            "question": "Must every financial planner appear in the Russian investment adviser register?",
            "answer": "No. The requirement depends on the actual activities. Providers giving individual investment recommendations must assess their regulatory obligations; general budgeting advice should not be classified automatically as regulated investment advice."
          },
          {
            "question": "Does registration guarantee investment performance?",
            "answer": "No. The register helps verify a defined legal status, not future returns or the absence of risk."
          },
          {
            "question": "How do I distinguish independent advice from a product sale?",
            "answer": "Review who compensates the adviser, disclosed affiliations, product coverage and potential conflicts."
          },
          {
            "question": "Can an adviser share a client's portfolio results publicly?",
            "answer": "Only with suitable legal grounds and appropriate privacy protection. Generic educational scenarios may be more appropriate if clearly labelled."
          },
          {
            "question": "What does GEO cost a financial adviser?",
            "answer": "GAEO's published pricing applies; scope depends on advice types, audiences, geographies and the initial AI prompt set."
          }
        ],
        "ctaTitle": "See which financial advisers AI recommends for real client questions",
        "ctaText": "Share your website, precise services, applicable registry details and compensation terms. I will prepare a baseline scope.",
        "request": "Financial adviser GEO: planning, investment recommendations, registry status, fees, conflicts and BMR."
      }
    }
  }
];
