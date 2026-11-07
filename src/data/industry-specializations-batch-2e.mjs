/**
 * Phase 2E: three bilingual evidence-based GEO specializations.
 * BI (#41) is handled by parallel PR #78 (phase 2F); no duplicate page.
 * Shared GAEO prices and catalogue media remain canonical.
 */
export const industrySpecializationsBatch2E = [
  {
    "id": 23,
    "slug": "tax-lawyers",
    "group": "legal",
    "routes": {
      "ru": "/industries/tax-lawyers/",
      "en": "/en/industries/tax-lawyers/"
    },
    "parent": {
      "ru": "/industries/legal/",
      "en": "/en/industries/legal/"
    },
    "methods": {
      "ru": [
        "/strategies/legal-recommendations/",
        "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/"
      ],
      "en": [
        "/en/strategies/legal-recommendations/",
        "/en/articles/legal-website-geo-12-checks/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как нейросети выбирают юридические компании",
        "12 проверок юридического сайта для GEO"
      ],
      "en": [
        "How AI compares law firms",
        "12 GEO checks for a law firm website"
      ]
    },
    "sources": [
      {
        "href": "https://www.nalog.gov.ru/rn77/apply_fts/complaint/",
        "ru": "ФНС России: порядок подачи жалобы на действия налоговых органов",
        "en": "Federal Tax Service: how to appeal a tax-authority decision"
      },
      {
        "href": "https://www.nalog.gov.ru/rn77/service/complaint_decision/about/",
        "ru": "ФНС России: открытый сервис решений по жалобам",
        "en": "Federal Tax Service: public tax-appeal decision database"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение налоговых юристов и консультантов | GAEO.ru",
        "h1": "Продвижение налоговых юристов в ChatGPT и Алисе",
        "description": "GEO для налоговых юристов и консультантов: запросы по налоговым спорам, проверкам ФНС, НДС и сопровождению бизнеса. Проверяемая экспертиза, BMR и тарифы GAEO.",
        "eyebrow": "Юридические услуги / Налоговое право",
        "lead": "Налогового юриста ищут под конкретный спор, вид проверки или задачу бизнеса. Проверяю, каких специалистов нейросети называют по таким запросам, какие факты подтверждают их практику и где теряется видимость фирмы.",
        "heroPoints": [
          "Запросы по налоговым спорам и консультациям отдельно от брендовых",
          "Проверка специализации, полномочий и публичных доказательств",
          "Отраслевые страницы, источники и сопоставимые замеры BMR"
        ],
        "problemTitle": "Почему налоговая практика требует отдельной методики GEO",
        "problemIntro": "Общее обещание «решаем налоговые проблемы» плохо отвечает на вопросы о конкретном налоге, процедуре и клиентской ситуации. По каждому направлению нужны разные факты и ограничения.",
        "problems": [
          {
            "title": "Смешение консалтинга и судебной защиты",
            "body": "Планирование налоговой нагрузки, подготовка возражений и представительство в споре отличаются по документам, срокам и роли исполнителя. На сайте эти услуги следует разделять."
          },
          {
            "title": "Громкие результаты без доказательств",
            "body": "Заявления о выигранных делах и отмененных доначислениях требуют проверяемых реквизитов и права на раскрытие. Отдельный судебный акт нельзя превращать в гарантию исхода аналогичного спора."
          },
          {
            "title": "Нет ответов на вопросы о процедуре",
            "body": "Покупателю важно понимать, когда подается возражение или жалоба, какие сведения потребуются и где граница первичной консультации. Формулировки сверяем с актуальной процедурой ФНС."
          }
        ],
        "scenarioTitle": "Какие запросы формируют выбор налогового юриста",
        "scenarioIntro": "Примеры коммерческих запросов для исходного замера. Итоговую матрицу составлю после уточнения налогов, географии и фактически оказываемых услуг.",
        "columns": [
          "Вопрос клиента",
          "Какие факты нужны",
          "Что делаем для GEO"
        ],
        "scenarios": [
          [
            "К кому обратиться после решения выездной налоговой проверки?",
            "Опыт с налоговыми проверками, порядок обжалования, полномочия, документы и сроки",
            "Разделить стадии спора и опубликовать проверяемую процедуру обращения"
          ],
          [
            "Какого налогового консультанта выбрать для вопросов НДС и вычетов?",
            "Перечень задач, компетенция специалиста, метод работы, условия консультации",
            "Подготовить профиль практики и предметный FAQ без обещаний результата"
          ],
          [
            "Кто сопровождает споры по доначислению налога на прибыль?",
            "Конкретный предмет споров, допустимые обезличенные примеры, процессуальная роль",
            "Связать услугу с проверяемыми материалами и разбором решений"
          ],
          [
            "Кого привлечь для проверки налоговых рисков при покупке бизнеса?",
            "Объем проверки, категории документов, границы ответственности и конфиденциальность",
            "Описать услугу налоговой проверки сделки отдельным сценарием"
          ]
        ],
        "proofTitle": "Что должно подтверждать специализацию",
        "proofIntro": "Сверяю перечень услуг, статус специалистов, публичные материалы и допустимые примеры практики. Для юридически значимых утверждений использую первичные источники ФНС и действующую редакцию нормативных требований.",
        "checks": [
          "Услуги: налоги, стадии спора, виды проверок и отрасли клиентов, которые реально ведет команда",
          "Доказательства: авторские разборы, публичные решения по делам, квалификация и разрешенные примеры",
          "Ограничения: тайна клиента, дата судебного акта, отсутствие гарантии исхода и точный объем участия"
        ],
        "proofNote": "Существующая методика GAEO по юридическим компаниям дает основу проверки. Завершенный проект продвижения налоговой практики здесь не заявляется.",
        "workTitle": "Как выстраиваю GEO для налоговой практики",
        "workIntro": "Сначала определяю коммерческие интенты и исходные упоминания. Затем готовлю задания для подтверждающих страниц и публикаций, после чего повторяю измерения по неизменной матрице.",
        "steps": [
          {
            "title": "Сегментация и BMR",
            "body": "Разделяю консультации, споры, сопровождение проверок и аудит сделок. Фиксирую формулировки запросов и сравнимый исходный BMR."
          },
          {
            "title": "Проверка полномочий и источников",
            "body": "Проверяю заявленные компетенции, допустимость раскрытия кейсов, документы и соответствие юридическим процедурам."
          },
          {
            "title": "Сайт и отраслевые материалы",
            "body": "Составляю ТЗ для страниц по конкретным налоговым задачам, профилей практики, FAQ и публикаций со ссылками на первоисточники."
          },
          {
            "title": "Повторные измерения",
            "body": "Сравниваю рекомендации одних и тех же нейросетей по согласованным запросам; отдельно оцениваю корректность ответов и источников."
          }
        ],
        "faq": [
          {
            "question": "Можно ли гарантировать победу в налоговом споре с помощью GEO?",
            "answer": "Нет. GEO касается обнаружения и корректного описания практики в ответах нейросетей. Решение по налоговому спору принимается уполномоченным органом или судом и зависит от фактов конкретного дела."
          },
          {
            "question": "Обязательно ли публиковать клиентов и материалы дел?",
            "answer": "Нет. Можно использовать разрешенные обезличенные примеры и открытые документы. Сведения, составляющие налоговую, коммерческую и адвокатскую тайну, публиковать нельзя без надлежащего основания."
          },
          {
            "question": "Как нейросети различают налогового консультанта и налогового юриста?",
            "answer": "Проверяю, какие задачи описаны на сайте: расчет и консультация по налогам, сопровождение проверки, обжалование и представительство. В материале указываем реальные функции каждого исполнителя."
          },
          {
            "question": "Как измеряется видимость налоговой практики?",
            "answer": "Фиксируем постоянные запросы по типам налогов, задачам и географии, состав нейросетей и исходный BMR. Повторный замер проводится в сопоставимых условиях."
          },
          {
            "question": "Сколько стоит GEO-продвижение налогового юриста?",
            "answer": "Используются общие тарифы GAEO на аудит и сопровождение. Окончательный объем зависит от числа юридических практик, регионов, запросов и источников."
          }
        ],
        "ctaTitle": "Проверить, кого нейросети советуют по вашим налоговым задачам",
        "ctaText": "Пришли сайт практики, ключевые виды споров, географию и подтвержденные публичные материалы. Я предложу направления для мини-аудита.",
        "request": "GEO налоговых юристов и консультантов: налоговые споры, проверки ФНС, НДС, подтверждения и рекомендации нейросетей."
      },
      "en": {
        "title": "GEO for tax lawyers and tax advisers in AI | GAEO.ru",
        "h1": "GEO promotion for tax lawyers and tax advisers",
        "description": "GEO for Russian tax law practices: audit disputes, tax appeals, VAT advisory services and evidence-backed AI recommendations. BMR measurement and GAEO pricing.",
        "eyebrow": "Legal services / Tax law",
        "lead": "Businesses seek tax advisers for specific disputes, audits and transactions. I examine which firms AI recommends for those needs, which claims can be verified and where the practice is absent from relevant answers.",
        "heroPoints": [
          "Separate non-brand prompts for tax disputes and advisory work",
          "Verify services, credentials and public evidence",
          "Improve source pages and track comparable BMR results"
        ],
        "problemTitle": "Why tax law needs a distinct GEO approach",
        "problemIntro": "A generic promise to solve tax problems does not answer questions about a particular tax, procedure or business situation. The supporting information changes with the service.",
        "problems": [
          {
            "title": "Advisory and disputes are mixed",
            "body": "Tax planning, audit objections and representation in a dispute are different activities. A useful service page identifies their scope, documents and the provider's actual role."
          },
          {
            "title": "Case outcomes lack verification",
            "body": "Claims about successful appeals or cancelled assessments need traceable evidence and permission to publish. One decision does not guarantee the same outcome for another taxpayer."
          },
          {
            "title": "Procedural questions go unanswered",
            "body": "Prospects need to know what an initial consultation covers, how complaints are considered and what evidence to prepare. Descriptions should follow current tax-authority procedures."
          }
        ],
        "scenarioTitle": "Questions that lead to a tax-lawyer shortlist",
        "scenarioIntro": "Sample commercial prompts for baseline measurement. The final matrix reflects the actual practice, jurisdiction and tax types.",
        "columns": [
          "Prospect's question",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "Who can help after a corporate tax audit decision?",
            "Audit and appeal scope, roles, documents, procedural steps and experience",
            "Publish a verifiable process and distinguish phases of representation"
          ],
          [
            "Which adviser handles corporate VAT deductions?",
            "Actual service scope, specialist qualifications, examples and engagement terms",
            "Prepare a focused practice profile and factual FAQ"
          ],
          [
            "Who represents businesses in profit-tax assessment disputes?",
            "Subject-matter experience, publishable decisions and professional role",
            "Connect services to documented analysis without outcome guarantees"
          ],
          [
            "Who conducts tax due diligence before an acquisition?",
            "Review scope, document categories, confidentiality and deliverables",
            "Describe this as a separate business decision and service"
          ]
        ],
        "proofTitle": "Evidence behind a credible tax practice",
        "proofIntro": "I check actual services, professional roles, accessible publications and authorised examples. Regulatory descriptions are checked against tax-authority primary sources.",
        "checks": [
          "Tax types, appeal stages, client sectors and services the team really provides",
          "Publicly verifiable analysis, authorised anonymised examples and qualified contributors",
          "Confidentiality, decision dates, scope of representation and explicit case limitations"
        ],
        "proofNote": "GAEO's existing law-firm methodology provides a starting point. No completed GEO success story for a tax-law practice is claimed here.",
        "workTitle": "A verifiable GEO programme for tax practices",
        "workIntro": "Start with buyer questions and baseline visibility, then develop accurate service evidence and remeasure the same prompts.",
        "steps": [
          {
            "title": "Segment prompts and measure BMR",
            "body": "Separate advisory, disputes, audits and transaction due diligence. Record baseline AI answers for stable non-brand query groups."
          },
          {
            "title": "Verify the underlying facts",
            "body": "Review practice credentials, permitted disclosures, source documents and procedural accuracy."
          },
          {
            "title": "Improve site and publications",
            "body": "Prepare a structured brief for focused services, profiles, procedural FAQs and sourced expert articles."
          },
          {
            "title": "Repeat comparable measurements",
            "body": "Check the same AI services and prompts, separately recording mentions, correct roles and supporting citations."
          }
        ],
        "faq": [
          {
            "question": "Can GEO guarantee success in a tax dispute?",
            "answer": "No. GEO work seeks better discovery and factual representation in AI answers. Tax appeal outcomes depend on evidence and decisions by authorities or courts."
          },
          {
            "question": "Must confidential clients or filings be named?",
            "answer": "No. Use permitted anonymised examples and public decisions. Taxpayer and professional confidentiality must be respected."
          },
          {
            "question": "How are tax advisers and tax litigators distinguished?",
            "answer": "Describe the actual work: advice, compliance, audit response, tax appeals or representation. Do not attribute services or credentials that the provider does not possess."
          },
          {
            "question": "How do you measure visibility for a tax practice?",
            "answer": "Fix a consistent set of prompts by tax type, business issue and geography, the tested AI services and the baseline BMR before comparing later results."
          },
          {
            "question": "How much does tax-law GEO cost?",
            "answer": "GAEO's standard audit and monthly plans apply. Scope depends on jurisdictions, service areas, query volumes and source coverage."
          }
        ],
        "ctaTitle": "Find out who AI recommends for your tax practice's services",
        "ctaText": "Share the practice website, actual tax services, jurisdictions and verifiable public materials to discuss a focused initial audit.",
        "request": "Tax-law GEO: tax audits, VAT, disputes, verifiable credentials and AI recommendations."
      }
    }
  },
  {
    "id": 33,
    "slug": "enterprise-software",
    "group": "highload-it",
    "routes": {
      "ru": "/industries/enterprise-software/",
      "en": "/en/industries/enterprise-software/"
    },
    "parent": {
      "ru": "/industries/highload-it/",
      "en": "/en/industries/highload-it/"
    },
    "methods": {
      "ru": [
        "/strategies/technical-b2b-vendor-evidence/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/technical-b2b-vendor-evidence/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как подтверждать компетенции технического B2B-поставщика",
        "Методика измерения нейровидимости"
      ],
      "en": [
        "Evidence for technical B2B vendor selection",
        "How GAEO measures AI visibility"
      ]
    },
    "sources": [
      {
        "href": "https://www.iso.org/standard/78176.html",
        "ru": "ISO/IEC 25010:2023: модель качества программного продукта",
        "en": "ISO/IEC 25010:2023: software product quality model"
      },
      {
        "href": "https://csrc.nist.gov/pubs/sp/800/218/final",
        "ru": "NIST SP 800-218: практики безопасной разработки ПО",
        "en": "NIST SP 800-218: Secure Software Development Framework"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение разработчиков корпоративного ПО | GAEO.ru",
        "h1": "Продвижение разработчиков корпоративного ПО в нейросетях",
        "description": "GEO для разработчиков корпоративного ПО: выбор по интеграциям, архитектуре, безопасности, SLA, внедрению и сопровождению. Отраслевые запросы, факты, BMR и тарифы GAEO.",
        "eyebrow": "IT и корпоративное ПО / Разработка",
        "lead": "Корпоративное ПО выбирают под бизнес-процесс, существующую инфраструктуру и ограничения внедрения. Проверяю, рекомендуют ли нейросети конкретного разработчика при таких условиях и каких подтверждений им не хватает.",
        "heroPoints": [
          "Запросы по функциональным задачам, интеграциям и масштабу внедрения",
          "Проверка документации, архитектурных ограничений и референсов",
          "Сопоставимые замеры нейровидимости по B2B-сценариям"
        ],
        "problemTitle": "Почему страница «разрабатываем любое ПО» не помогает выбору",
        "problemIntro": "У закупщика, IT-директора и владельца процесса разные критерии. Нейросети должны понимать, какой продукт и тип проекта компания действительно реализует.",
        "problems": [
          {
            "title": "Нет четкой границы продукта и заказной разработки",
            "body": "Готовая платформа, доработка типового решения и разработка под заказ предполагают разные сроки, права, инфраструктуру и поддержку. Эти модели нельзя описывать как один товар."
          },
          {
            "title": "Интеграции заявлены без условий",
            "body": "Фраза «интегрируем с любой ERP» требует уточнения API, вариантов развертывания, версий, миграции и ответственности сторон. Публичные материалы должны отражать реальные ограничения."
          },
          {
            "title": "Качество описано рекламными эпитетами",
            "body": "Надежность, информационная безопасность и сопровождаемость нужно раскрывать через архитектуру, практики тестирования, требования и проверяемые показатели, а не общее слово «надежно»."
          }
        ],
        "scenarioTitle": "Как потенциальный заказчик ищет разработчика",
        "scenarioIntro": "Ниже примерная матрица запросов. Реальные технологии, ограничения, отрасли и тип договора подтверждаются с заказчиком до публикации.",
        "columns": [
          "Запрос покупателя",
          "Нужные доказательства",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто разработает корпоративный портал с интеграцией CRM и ERP?",
            "Подтвержденные интеграции, архитектура, API, поддерживаемые версии, границы проекта",
            "Страница интеграций с конкретными совместимостями и ответственностью"
          ],
          [
            "Какую команду выбрать для модернизации монолитной информационной системы?",
            "Этапы обследования, миграция, непрерывность работы, опыт с нужным стеком",
            "Разобрать сценарий миграции с рисками и критериями приемки"
          ],
          [
            "Кто разрабатывает внутренние B2B-системы с требованиями безопасности?",
            "Модель угроз, практики безопасной разработки, тесты, права доступа, аудит",
            "Опубликовать метод безопасности без неподтвержденных сертификатов"
          ],
          [
            "Как сравнить заказную разработку и готовое корпоративное ПО?",
            "Стоимость владения, настройка, пределы кастомизации, лицензирование и сопровождение",
            "Дать сопоставимую таблицу вариантов и условий внедрения"
          ]
        ],
        "proofTitle": "Какие подтверждения помогают сделать рекомендацию обоснованной",
        "proofIntro": "Проверяю фактический продукт, роли команды, документацию и доступные материалы по реализованным проектам. ISO/IEC 25010 дает модель свойств качества продукта, а NIST SSDF описывает практики безопасной разработки; соответствие каждому пункту не предполагается без проверки.",
        "checks": [
          "Продукт и проекты: функциональные модули, сценарии внедрения, совместимые системы, ограничения и документы",
          "Качество: тестирование, производительность, доступность, сопровождаемость, безопасность и доступные подтверждения",
          "Коммерческий выбор: лицензия или заказная разработка, этапы, передача прав, поддержка, измеримые критерии приемки"
        ],
        "proofNote": "Существующие B2B-IT-методики GAEO помогают строить диагностику. Результаты MethodLab не выдаются за выполненный проект продвижения разработчика корпоративного ПО.",
        "workTitle": "Как строю GEO-программу для разработчика",
        "workIntro": "Разделяю категории продуктов и запросы ролей покупателей, проверяю подтверждающие материалы и формирую измеряемый план развития страниц и внешних источников.",
        "steps": [
          {
            "title": "Карта спроса и стартовый BMR",
            "body": "Собираю вопросы CIO, закупок и руководителей процессов по функциям, технологиям, масштабу и типам интеграций."
          },
          {
            "title": "Проверка реальной компетенции",
            "body": "Сверяю возможности продукта, документы API, договорные условия, разрешенные кейсы и заявления о безопасности."
          },
          {
            "title": "Архитектура и публикации",
            "body": "Готовлю ТЗ на страницы решений, интеграций, вариантов развертывания, FAQ и независимые экспертные материалы."
          },
          {
            "title": "Повторный контроль рекомендаций",
            "body": "Измеряю те же запросы, проверяю корректность упоминаний и используемые нейросетями источники."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать продукт без публичных клиентских кейсов?",
            "answer": "Да, если есть проверяемая документация, демонстрационные сценарии, функции и ограничения. Отсутствие разрешенных клиентских имен не повод выдумывать результаты внедрения."
          },
          {
            "question": "Нужны ли открытые API и спецификации?",
            "answer": "Полезно описать поддерживаемые варианты интеграций и доступные требования. Закрытые технические детали можно оставить закрытыми, не обещая совместимость без проверки."
          },
          {
            "question": "Можно ли писать, что ПО соответствует ISO/IEC 25010?",
            "answer": "Модель ISO/IEC 25010 помогает оценивать качества продукта, но сама по себе не доказывает сертификацию или соответствие конкретного вендора. Публичные заявления опираются на проверенные документы."
          },
          {
            "question": "Как отделить брендовую узнаваемость от спроса на разработку?",
            "answer": "Небрендовые запросы фиксируются отдельно по задачам, отрасли и технологиям. BMR рассчитывается по согласованным ответам без автоматического смешения с запросами по названию разработчика."
          },
          {
            "question": "Какие тарифы действуют для корпоративного ПО?",
            "answer": "Действуют общие тарифы GAEO на аудит, продвижение и контент. Объем зависит от продуктовых направлений, языков, конкурентов и числа проверяемых сценариев."
          }
        ],
        "ctaTitle": "Проверить, кого нейросети советуют для разработки вашего класса ПО",
        "ctaText": "Пришли сайт продукта, перечень решений, подтвержденные интеграции и публичные кейсы. Подготовлю структуру первоначального замера.",
        "request": "GEO разработчика корпоративного ПО: интеграции, архитектура, безопасность, внедрение, B2B-рекомендации."
      },
      "en": {
        "title": "GEO for enterprise software developers | GAEO.ru",
        "h1": "GEO promotion for enterprise software developers",
        "description": "Enterprise software GEO: integration capabilities, product architecture, security, implementation and support evidence in AI recommendations. GAEO pricing and BMR.",
        "eyebrow": "IT and enterprise software / Development",
        "lead": "Enterprise software is selected against business processes, existing infrastructure and implementation constraints. I test whether AI recommends a vendor in those contexts and what verifiable information is missing.",
        "heroPoints": [
          "Role-specific questions about features, integration and scale",
          "Checks of documentation, constraints and approved project references",
          "Comparable B2B recommendation measurements"
        ],
        "problemTitle": "Why a generic software-development pitch is insufficient",
        "problemIntro": "Procurement, CIOs and business owners evaluate different aspects of a solution. AI needs a precise description of what the company actually delivers.",
        "problems": [
          {
            "title": "Product and bespoke development are conflated",
            "body": "A packaged platform, customisation and a bespoke system differ in ownership, implementation risk and support. Each business model deserves a separate explanation."
          },
          {
            "title": "Integration claims omit conditions",
            "body": "A promise to integrate with every ERP needs verified APIs, deployment models, version compatibility and responsibility boundaries."
          },
          {
            "title": "Quality is described only as a slogan",
            "body": "Reliability, security and maintainability should be supported by design, testing practices, requirements and documented evidence rather than adjectives."
          }
        ],
        "scenarioTitle": "Questions used to shortlist enterprise developers",
        "scenarioIntro": "Illustrative non-brand commercial intents. The exact stack, industries and contract models are confirmed with the client.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "Who builds corporate portals integrated with CRM and ERP?",
            "Supported APIs, actual integrations, compatible versions and support boundaries",
            "Publish an integration-specific capabilities page"
          ],
          [
            "Who can modernise an ageing business-critical system?",
            "Assessment process, migration strategy, continuity measures and relevant skills",
            "Explain migration options, risks and acceptance criteria"
          ],
          [
            "Which development company handles security-sensitive internal B2B platforms?",
            "Secure-development practices, access control, auditability and testing",
            "Document the approach without invented security certificates"
          ],
          [
            "Should we buy enterprise software or commission bespoke development?",
            "Total cost, licence models, customisation limits, ownership and maintenance",
            "Provide an honest, comparable decision framework"
          ]
        ],
        "proofTitle": "Evidence behind a credible recommendation",
        "proofIntro": "I verify the actual software or service, technical documents and permitted project examples. ISO/IEC 25010 outlines product quality characteristics; NIST SSDF covers secure-development practices. Neither is evidence of a vendor's compliance on its own.",
        "checks": [
          "Capabilities: product modules, target workflows, integrations, limitations and documentation",
          "Quality: testing, performance, availability, maintainability, security and evidence of actual practices",
          "Engagement: licensing versus bespoke work, milestones, IP terms, support and acceptance criteria"
        ],
        "proofNote": "GAEO's technical B2B methodology informs the audit. Work performed for MethodLab is not presented as an enterprise software GEO case.",
        "workTitle": "How I plan an enterprise-software GEO programme",
        "workIntro": "Start with product segments and decision-maker intents, verify factual claims, then build and measure the evidence needed for recommendations.",
        "steps": [
          {
            "title": "Buyer-intent baseline",
            "body": "Build a query matrix for CIOs, procurement teams and functional managers by task, technology and integration scope."
          },
          {
            "title": "Document the actual offer",
            "body": "Check API documents, product features, reference permissions, deployment requirements and security statements."
          },
          {
            "title": "Improve product information",
            "body": "Specify service pages, integration documents, deployment guides, FAQs and relevant expert publications."
          },
          {
            "title": "Measure comparable answers",
            "body": "Re-run fixed prompts and review recommendation accuracy and citations as well as BMR."
          }
        ],
        "faq": [
          {
            "question": "Can a software vendor without public case studies use GEO?",
            "answer": "Yes, with accurate technical documentation, product demonstrations and documented limitations. Do not invent clients or implementation results."
          },
          {
            "question": "Must private API documentation be published?",
            "answer": "No. Publish supported integration types and requirements where permitted, while keeping sensitive internal details protected."
          },
          {
            "question": "Does referencing ISO/IEC 25010 prove certification?",
            "answer": "No. It is a product-quality model, not proof that a particular vendor has passed certification or testing. All compliance claims need their own evidence."
          },
          {
            "question": "How is non-brand software visibility measured?",
            "answer": "The matrix covers use cases, technologies and buyer roles without the vendor name; brand-related prompts are monitored separately."
          },
          {
            "question": "How much does enterprise software GEO cost?",
            "answer": "GAEO's standard audit and monthly offers apply. Pricing scope depends on products, languages, integrations and query coverage."
          }
        ],
        "ctaTitle": "See which software vendors AI recommends instead",
        "ctaText": "Share your product site, confirmed functions, supported integrations and publishable evidence to discuss a focused audit.",
        "request": "Enterprise-software GEO: integration, deployment, security, implementation and AI vendor shortlists."
      }
    }
  },
  {
    "id": 40,
    "slug": "electronic-document-flow",
    "group": "highload-it",
    "routes": {
      "ru": "/industries/electronic-document-flow/",
      "en": "/en/industries/electronic-document-flow/"
    },
    "parent": {
      "ru": "/industries/highload-it/",
      "en": "/en/industries/highload-it/"
    },
    "methods": {
      "ru": [
        "/strategies/technical-b2b-vendor-evidence/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/strategies/technical-b2b-vendor-evidence/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Проверка технических B2B-поставщиков",
        "Как измеряется видимость в нейросетях"
      ],
      "en": [
        "Evidence for technical B2B providers",
        "Measuring AI recommendation visibility"
      ]
    },
    "sources": [
      {
        "href": "https://www.nalog.gov.ru/rn77/related_activities/el_doc/el_bus_entities/",
        "ru": "ФНС: электронный документооборот между организациями",
        "en": "Federal Tax Service: electronic document exchange between businesses"
      },
      {
        "href": "https://www.nalog.gov.ru/rn77/taxation/submission_statements/el_count/",
        "ru": "ФНС: электронные счета-фактуры и операторы ЭДО",
        "en": "Federal Tax Service: electronic invoices and EDI operators"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение сервисов ЭДО и операторов | GAEO.ru",
        "h1": "Продвижение сервисов электронного документооборота в нейросетях",
        "description": "GEO для сервисов и операторов ЭДО: электронные счета-фактуры, УПД, подписи, роуминг, интеграция с 1С, архив. Проверка фактов, запросов и тарифы GAEO.",
        "eyebrow": "IT и корпоративное ПО / ЭДО",
        "lead": "Электронный документооборот покупают под конкретные документы, контрагентов и учетную систему. Проверяю, какие сервисы ChatGPT, Алиса и другие нейросети рекомендуют по этим условиям и насколько точны их сравнения.",
        "heroPoints": [
          "Запросы по типам документов, интеграциям и роумингу",
          "Сверка статуса оператора, функций и условий использования",
          "Отраслевые страницы, независимые подтверждения и BMR"
        ],
        "problemTitle": "Где сравнение сервисов ЭДО становится ошибочным",
        "problemIntro": "Для закупщика важны юридическая значимость документов, формат обмена и интеграция. Обещание «полный ЭДО за 1 день» ничего не говорит о реальных процессах.",
        "problems": [
          {
            "title": "Операторы и программные модули смешаны",
            "body": "Сервис обмена документами, оператор ЭДО и внутренний архив решают разные задачи. Подключение к юридически значимому обмену и набор функций нужно описывать раздельно."
          },
          {
            "title": "Роуминг и совместимость не доказаны",
            "body": "Поддержка определенного оператора, автоматический обмен через роуминг и интеграция с учетной системой требуют актуальных списков подключений, версий и ограничений."
          },
          {
            "title": "Устаревшие форматы и цены",
            "body": "Для счетов-фактур и УПД применяются установленные форматы и процедуры. На сайте нужны даты актуальности, тарифная единица, стоимость исходящих документов и правила хранения."
          }
        ],
        "scenarioTitle": "По каким задачам бизнес выбирает ЭДО",
        "scenarioIntro": "Примеры поисковых интентов для BMR. Конкретные функции сервиса и правовые условия проверяются перед созданием посадочных страниц.",
        "columns": [
          "Запрос компании",
          "Что нужно подтвердить",
          "Действие GEO"
        ],
        "scenarios": [
          [
            "Какой оператор ЭДО подходит для обмена УПД и счетами-фактурами?",
            "Статус оператора, поддерживаемые форматы, тарифы, условия работы с контрагентами",
            "Создать проверяемое сравнение форматов и возможностей"
          ],
          [
            "Как подключить ЭДО к 1С без ручной выгрузки документов?",
            "Поддерживаемые конфигурации, версия модуля, сценарии синхронизации и ограничения",
            "Описать интеграцию с конкретными версиями и этапами настройки"
          ],
          [
            "Какие сервисы поддерживают роуминг с оператором контрагента?",
            "Перечни взаимодействующих операторов, доступные направления, регламент подключения",
            "Показывать текущие маршруты обмена и дату проверки"
          ],
          [
            "Где хранить подписанные электронные документы и проверять подпись?",
            "Форматы, срок доступа, архив, проверка подписи, перенос и условия расторжения",
            "Подготовить отдельную страницу архива и жизненного цикла документа"
          ]
        ],
        "proofTitle": "Какие факты подтверждают возможность сервиса",
        "proofIntro": "Сверяю описание продукта с информацией ФНС об операторах, электронных счетах-фактурах и форматах. Проверка конкретного сервиса включает документы поставщика, демонстрацию функций и действующие условия.",
        "checks": [
          "Юридическая часть: оператор, применимые форматы, электронная подпись и корректная терминология",
          "Техническая часть: интеграции с 1С/ERP, маршруты обмена, роуминг, API, перенос и хранение",
          "Коммерческая часть: единица тарификации, документы в пакете, подключение, поддержка и ограничения"
        ],
        "proofNote": "Методика GAEO для технических B2B-компаний применима к ЭДО, но не является доказательством проведенного продвижения конкретного оператора.",
        "workTitle": "Как организую GEO для поставщика ЭДО",
        "workIntro": "Разделяю намерения компаний по типам документов и учетным системам, фиксирую исходную видимость и строю базу проверяемых страниц.",
        "steps": [
          {
            "title": "Замер по сценариям ЭДО",
            "body": "Собираю запросы по УПД, счетам-фактурам, контрагентам, интеграциям и объему обмена; отдельно фиксирую брендовые ответы."
          },
          {
            "title": "Проверка продуктовых заявлений",
            "body": "Сверяю статусы, поддерживаемые форматы, версии интеграций, условия архива и доступа, стоимость и список операторов."
          },
          {
            "title": "Страницы и источники",
            "body": "Готовлю ТЗ на страницы интеграций и документов, FAQ, сравнение тарифных единиц и подтвержденные технические публикации."
          },
          {
            "title": "Контроль качества ответов",
            "body": "Повторяю те же запросы, сравниваю BMR и ошибки о цене, формате, доступности роуминга и назначении сервиса."
          }
        ],
        "faq": [
          {
            "question": "Электронная подпись делает любой документ юридически значимым?",
            "answer": "Юридический статус зависит от вида документа, применимой подписи, требований закона и процедуры обмена. Формулировки проверяем по конкретному сценарию, без универсального обещания."
          },
          {
            "question": "Можно ли утверждать, что ЭДО работает с любыми контрагентами?",
            "answer": "Только если соответствующий маршрут реально поддерживается. Проверяются контрагенты, доступные операторы, роуминг и условия подключения."
          },
          {
            "question": "Поддержка 1С означает совместимость со всеми конфигурациями?",
            "answer": "Нет. Необходимо указывать конкретные конфигурации, версии, механизм интеграции и ограничения, подтвержденные поставщиком."
          },
          {
            "question": "Какие запросы входят в BMR для ЭДО?",
            "answer": "Матрица включает небрендовые вопросы о документах, интеграциях, тарифах, роуминге и архиве. Количество запросов и нейросетей согласуется заранее."
          },
          {
            "question": "Сколько стоит GEO для оператора ЭДО?",
            "answer": "Применяются опубликованные тарифы GAEO. Масштаб зависит от продуктов, поддерживаемых интеграций, сегментов клиентов и числа категорий запросов."
          }
        ],
        "ctaTitle": "Проверить, каких поставщиков ЭДО выбирают нейросети",
        "ctaText": "Пришли сайт сервиса, подтвержденные интеграции, поддерживаемые форматы и условия подключения. Составлю предварительную матрицу запросов.",
        "request": "GEO для ЭДО: УПД, счета-фактуры, 1С, роуминг, архив, реальные функции и AI-рекомендации."
      },
      "en": {
        "title": "GEO for electronic document exchange and EDI | GAEO.ru",
        "h1": "GEO for electronic document exchange providers",
        "description": "Electronic document exchange GEO: Russian e-invoices, universal transfer documents, signatures, interoperability, 1C integration and archives. GAEO pricing.",
        "eyebrow": "IT and enterprise software / Document exchange",
        "lead": "Businesses select electronic document exchange services for specific document types, counterparties and accounting software. I measure which products AI recommends for those requirements and whether the comparisons are accurate.",
        "heroPoints": [
          "Intent groups by document type, integration and operator connectivity",
          "Verification of operator status, product functions and contract terms",
          "Evidence-backed pages and repeat BMR measurements"
        ],
        "problemTitle": "Where AI comparisons of document exchange go wrong",
        "problemIntro": "Procurement needs legal validity, supported exchange routes and workable integration. A generic digital-transformation promise does not provide enough detail.",
        "problems": [
          {
            "title": "Operators and software modules are confused",
            "body": "An exchange operator, a document workflow app and an internal archive provide different functions. Actual legal exchange capabilities must be described separately."
          },
          {
            "title": "Interoperability is overstated",
            "body": "Support for an operator, cross-operator roaming and an integration module require current compatibility lists, versions and conditions."
          },
          {
            "title": "Formats and pricing are outdated",
            "body": "Russian electronic invoices and transfer documents follow regulated formats and exchange procedures. Content needs current applicability dates, charge units and archive terms."
          }
        ],
        "scenarioTitle": "Business questions used to select document exchange",
        "scenarioIntro": "Illustrative commercial search intents for BMR. All product and regulatory claims are validated before publication.",
        "columns": [
          "Business question",
          "Evidence required",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which operator supports Russian e-invoices and universal transfer documents?",
            "Operator status, document formats, contract terms and current pricing",
            "Create a verifiable document-by-document capabilities comparison"
          ],
          [
            "Which service integrates with our version of 1C?",
            "Supported 1C configurations, connector version, sync direction and prerequisites",
            "Publish product-specific integration guides and limitations"
          ],
          [
            "Can we exchange documents with counterparties on other operators?",
            "Available operator connections, supported routes and activation requirements",
            "Document supported interoperability and the date checked"
          ],
          [
            "How do we archive signed documents and validate signatures?",
            "Archive terms, signature validation, export procedures and data retention",
            "Describe the full document lifecycle and exit options"
          ]
        ],
        "proofTitle": "What confirms a service can deliver",
        "proofIntro": "I cross-check product claims against Russian tax-authority information on e-document operators and invoicing, as well as the vendor's own documented capabilities.",
        "checks": [
          "Legal scope: operator identity, document format and signature requirements for each use case",
          "Technical scope: ERP/1C versions, APIs, exchange routing, interoperability, storage and exports",
          "Commercial scope: pricing units, included document volumes, onboarding, support and exclusions"
        ],
        "proofNote": "GAEO's technical B2B approach applies to document exchange, but no prior GEO result for an individual EDI operator is claimed.",
        "workTitle": "How I structure GEO for a document exchange vendor",
        "workIntro": "I classify buyer questions by workflow and accounting platform, establish baseline visibility and improve the evidence AI can inspect.",
        "steps": [
          {
            "title": "Intent and BMR baseline",
            "body": "Measure non-brand questions about e-invoices, transfer documents, counterparties, integrations and document volumes."
          },
          {
            "title": "Validate product claims",
            "body": "Review operator status, supported formats, connector versions, archive details, pricing and interoperability."
          },
          {
            "title": "Build supporting content",
            "body": "Specify pages about supported documents and integrations, real-world workflows, FAQs and authoritative technical evidence."
          },
          {
            "title": "Check subsequent answers",
            "body": "Repeat the fixed prompt matrix and track mistakes about price, format, integrations and availability of roaming."
          }
        ],
        "faq": [
          {
            "question": "Does an electronic signature make every document legally valid?",
            "answer": "Validity depends on the document type, applicable signature and exchange procedures. Legal descriptions must be checked for the particular Russian business scenario."
          },
          {
            "question": "Can a service claim to reach every counterparty?",
            "answer": "Only with evidence for the supported exchange path. Operator interoperability and activation conditions may vary."
          },
          {
            "question": "Does 1C support mean every configuration is compatible?",
            "answer": "No. Published compatibility should identify supported configurations, versions, integration methods and any material limitations."
          },
          {
            "question": "Which buyer prompts count towards EDI BMR?",
            "answer": "Non-brand questions about document types, integrations, tariffs, operator connectivity and archives are measured using a stable, agreed query matrix."
          },
          {
            "question": "How much does EDI GEO promotion cost?",
            "answer": "GAEO's standard audit and monthly plans apply. Scope depends on products, integrations, customer segments and question categories."
          }
        ],
        "ctaTitle": "See which document exchange services AI recommends",
        "ctaText": "Share your service website, verified integrations, supported formats and onboarding terms to build an initial audit.",
        "request": "EDI and electronic document exchange GEO: e-invoicing, 1C, operator roaming, archive and verified AI recommendations."
      }
    }
  }
];
