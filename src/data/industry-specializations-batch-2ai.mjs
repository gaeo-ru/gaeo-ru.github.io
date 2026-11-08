/**
 * Phase 2AI: original bilingual audit/assurance GEO specialism #28.
 * Does not imply audit credentials, clients or completed GAEO cases.
 * Canonical 107 catalogue IDs, tariffs, illustrations and BMR terms remain shared.
 */
export const industrySpecializationsBatch2AI = [
  {
    "id": 28,
    "slug": "audit-assurance-consulting-firms",
    "group": "professional-services",
    "routes": {
      "ru": "/industries/audit-assurance-consulting-firms/",
      "en": "/en/industries/audit-assurance-consulting-firms/"
    },
    "parent": {
      "ru": "/industries/",
      "en": "/en/industries/"
    },
    "parentLabels": {
      "ru": "Отрасли GEO-продвижения",
      "en": "GEO industry directory"
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
        "Методика измерения рекомендаций и BMR",
        "Как проверять доказательства B2B-подрядчика"
      ],
      "en": [
        "AI recommendation measurement and BMR",
        "Evidence checks for B2B providers"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_83311/5662200f71fec9b8ab1a6e0615896613d3852b5a/",
        "ru": "307-ФЗ, статья 1: аудиторская деятельность и сопутствующие услуги",
        "en": "Federal Law 307-FZ, Article 1: audit and related services"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_83311/936cae07de7eea62c31127923f43ce2f0e2e1599/",
        "ru": "307-ФЗ, статья 19: реестр аудиторов и аудиторских организаций",
        "en": "Federal Law 307-FZ, Article 19: auditors' and audit organisations' register"
      },
      {
        "href": "https://roskazna.gov.ru/kontrol-i-audit/nadzor-za-auditorskoj-deyatelnostyu/reestr-auditorskih-organizaciy-okazyvayuschih-auditorskie-uslugi-obschestvenno-znachimym-organizaciyam/reestr-auditorskih-organizaciy-okazyvayuschih-auditorskie-uslugi-obschestvenno-znachimym-organizaciyam",
        "ru": "Казначейство России: специальный реестр аудиторов общественно значимых организаций",
        "en": "Federal Treasury: special register of audit firms serving public-interest entities"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение аудиторских и консалтинговых компаний в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение аудиторских и консалтинговых компаний",
        "description": "Продвижение аудиторов в ChatGPT, Алисе и других нейросетях: обязательный и инициативный аудит, реестры, независимость, отраслевая специализация и BMR.",
        "eyebrow": "Профессиональные услуги / Аудит и финансовый консалтинг",
        "lead": "Финансовый директор ищет аудиторскую фирму под отчетность, отрасль и требования к конкретному заданию. Я изучаю, кого рекомендуют нейросети, на каких доказательствах основан выбор и не смешиваются ли независимый аудит, бухгалтерский аутсорсинг и консультационные услуги.",
        "heroPoints": [
          "Отдельные запросы на обязательный аудит, инициативную проверку и консультации",
          "Актуальность реестровых сведений, независимость и отраслевой опыт",
          "Стартовый BMR и сравнимые повторные замеры по запросам клиентов"
        ],
        "problemTitle": "Что мешает аудиторской фирме попасть в релевантные рекомендации",
        "problemIntro": "По одному названию компании невозможно определить ее допуск к заданию, компетенцию в конкретной отрасли и состав услуг. Покупатель должен сопоставить проверяемые условия.",
        "problems": [
          {
            "title": "Разные услуги объединены в общий список",
            "body": "Аудит отчетности, согласованные процедуры, налоговые консультации и управленческий консалтинг имеют разные цели и результаты. Смешение услуг приводит к рекомендациям с неверным предметом договора."
          },
          {
            "title": "Реестровый статус не подтвержден",
            "body": "Наличие корпоративного сайта не доказывает актуальную запись в применимом реестре. Для общественно значимых организаций требуется отдельно проверять специальный реестр и требования к заданию."
          },
          {
            "title": "Обещания об опыте не проверяются",
            "body": "Логотипы клиентов и общие слова об отраслевой экспертизе без прав на раскрытие и описания работы недостаточны. Конфиденциальность и независимость аудитора ограничивают публикацию примеров."
          }
        ],
        "scenarioTitle": "Какие вопросы руководители задают нейросетям при выборе аудитора",
        "scenarioIntro": "Четыре примера будущей матрицы коммерческих запросов. Это не утверждение о результатах уже проведенного замера или о рейтинге конкретных фирм.",
        "columns": [
          "Вопрос клиента",
          "Что нужно подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кого выбрать для обязательного аудита производственной компании?",
            "Применимость аудита, актуальные реестровые сведения, отрасль и предмет задания",
            "Показать реальные компетенции и допустимые услуги без выдуманных заключений"
          ],
          [
            "Какая аудиторская фирма подходит общественно значимой организации?",
            "Применимые требования и сведения в специальном реестре Федерального казначейства",
            "Отделить общую практику от заданий со специальными условиями"
          ],
          [
            "Кто проведет инициативный аудит перед сделкой с инвестором?",
            "Цель, документы, формат итогового результата, независимость и состав команды",
            "Создать предметное описание инициативной проверки и ее ограничений"
          ],
          [
            "Чем отличается аудит от налогового консалтинга и ведения бухгалтерии?",
            "Предмет договора, квалификация, результаты и совместимость услуг",
            "Развести предложения по отдельным интентам и страницам"
          ]
        ],
        "proofTitle": "Какие факты позволяют обосновать рекомендацию",
        "proofIntro": "Федеральный закон №307-ФЗ определяет аудиторскую деятельность и реестр аудиторов и организаций. Общий реестр ведет саморегулируемая организация аудиторов; специальный реестр для обслуживания общественно значимых организаций публикует Казначейство России. Эти источники задают критерии проверки, но не удостоверяют конкретную фирму без актуального поиска.",
        "checks": [
          "Организация, идентификаторы, сведения реестров и дата проверки применительно к типу заказчика",
          "Точный предмет услуги, стандарты задания, формат результата, ограничения независимости и условия договора",
          "Доказанная отрасль практики, специалисты и разрешенные к публикации примеры с учетом конфиденциальности"
        ],
        "proofNote": "Это отраслевая методика GEO, а не кейс продвижения аудиторской организации. Результатов клиентов GAEO в этой нише здесь не заявлено; общий управленческий консалтинг отдельно представлен направлением №72.",
        "workTitle": "Порядок GEO-продвижения аудиторской организации",
        "workIntro": "Сначала выясняю, какие услуги действительно доступны фирме и кого она обслуживает. Затем проверяю основания для рекомендаций, качество сайта и независимые источники.",
        "steps": [
          {
            "title": "Зафиксировать стартовый BMR",
            "body": "Разделяю небрендовые запросы по обязательному аудиту, инициативным заданиям, отрасли и типу клиента; сохраняю исходную матрицу для последующего сравнения."
          },
          {
            "title": "Сверить реестры и фактуру",
            "body": "Проверяю разрешенные услуги, реестровые сведения, специализации, биографии и право публиковать примеры выполненных заданий."
          },
          {
            "title": "Разработать содержание и связи",
            "body": "Готовлю ТЗ для предметных страниц услуг, отраслевых методик, экспертных профилей и проверяемых публикаций с первичными источниками."
          },
          {
            "title": "Повторить измерение",
            "body": "По тем же вопросам проверяю BMR и точность ответов: не приписываются ли фирме неподтвержденная специализация, статус или результаты."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли разделять обязательный аудит и консультационные услуги?",
            "answer": "Да, если эти услуги действительно предлагаются. У них разные предметы договора, результаты и требования к исполнителю, которые стоит раскрывать на отдельных страницах."
          },
          {
            "question": "Можно ли доверять заявлению фирмы о членстве в СРО?",
            "answer": "Сведения конкретной фирмы нужно проверить в актуальном применимом реестре. Для общественно значимых организаций дополнительно используется специальный реестр Казначейства."
          },
          {
            "question": "Можно ли публиковать имена клиентов аудиторской фирмы?",
            "answer": "Только с учетом разрешений, конфиденциальности и независимости. При ограничениях можно описать метод задания без идентификации клиента и вымышленных чисел."
          },
          {
            "question": "Является ли BMR показателем числа заключенных договоров?",
            "answer": "Нет. BMR показывает долю попаданий в ответы нейросетей по согласованной матрице запросов. Заявки и договоры измеряются отдельно."
          },
          {
            "question": "Сколько стоит GEO-продвижение аудиторской компании?",
            "answer": "Используются общие опубликованные тарифы GAEO. Состав работ, нейросети, промпты и публикации определяются после изучения исходных услуг и видимости."
          }
        ],
        "ctaTitle": "Узнать, каких аудиторов нейросети рекомендуют вашим заказчикам",
        "ctaText": "Пришли сайт фирмы, реальные виды аудиторских и консультационных услуг и ссылки на реестровые сведения. Я предложу исходную матрицу запросов.",
        "request": "GEO для аудиторской фирмы: аудит отчетности, реестры, независимость, доказательства компетенции, BMR."
      },
      "en": {
        "title": "GEO for audit and assurance consulting firms in AI answers | GAEO.ru",
        "h1": "GEO for audit, assurance and consulting firms",
        "description": "GEO for audit firms in ChatGPT and other AI: statutory and voluntary audits, eligibility registers, independence, sector experience and measured BMR.",
        "eyebrow": "Professional services / Audit and assurance",
        "lead": "A finance director needs an audit firm matched to the reporting engagement, industry and eligibility requirements. I examine which firms AI recommends, whether the evidence is verifiable and whether the answers confuse independent audit with bookkeeping or general consulting.",
        "heroPoints": [
          "Distinct prompts for statutory audits, voluntary assurance and advice",
          "Checks of current registers, independence and sector evidence",
          "Baseline and repeat BMR measurements using comparable buyer questions"
        ],
        "problemTitle": "Why audit firms need engagement-specific evidence",
        "problemIntro": "A company name alone cannot establish eligibility, industry skills or scope. A useful AI shortlist has to connect an actual buyer request to substantiated services.",
        "problems": [
          {
            "title": "Different engagements are bundled together",
            "body": "Financial statement audits, agreed-upon procedures, tax advice and management consulting have different objectives and deliverables. A generic menu creates unsuitable matches."
          },
          {
            "title": "Eligibility is treated as a marketing claim",
            "body": "A company website is not proof of an up-to-date professional register entry. Public-interest entity engagements may require separate checks against the special register."
          },
          {
            "title": "Client logos stand in for evidence",
            "body": "Brand names without permissions, engagement details or dates do not establish sector capability. Client confidentiality and auditor independence limit public disclosures."
          }
        ],
        "scenarioTitle": "Questions companies ask AI when choosing an auditor",
        "scenarioIntro": "These are proposed commercial prompts for a baseline study, not observed recommendation results or a ranking of named firms.",
        "columns": [
          "Buyer question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which firm should audit the financial statements of a manufacturer?",
            "Applicable audit obligation, register status, relevant industries and engagement scope",
            "Publish verifiable specialisms and actual service boundaries"
          ],
          [
            "Who can audit a Russian public-interest entity?",
            "Applicable requirements and the firm's current entry in the Federal Treasury special register",
            "Separate standard engagements from special eligibility requirements"
          ],
          [
            "Who can perform a voluntary audit ahead of an investment deal?",
            "Purpose, reporting scope, intended deliverable, independence and team",
            "Describe voluntary engagements and limits in precise terms"
          ],
          [
            "What separates an audit from tax advice and bookkeeping?",
            "Contract scope, expected output, qualifications and service compatibility",
            "Give each service its own buyer intent and supporting evidence"
          ]
        ],
        "proofTitle": "Evidence behind an accurate recommendation",
        "proofIntro": "Federal Law 307-FZ defines audit activity and the register of auditors and audit organisations. The self-regulatory organisation maintains the general register, while the Federal Treasury publishes a special register for firms auditing public-interest entities. A specific firm's status still requires a current verification.",
        "checks": [
          "Current firm identifiers, relevant register entries and verification date for the actual client type",
          "Engagement scope, report or deliverable, independence limitations and contract terms",
          "Documented sector capability, professionals and disclosure permissions for earlier work"
        ],
        "proofNote": "This is an evidence-led GEO method, not a completed GAEO audit-sector client case. General management consulting has its own catalogue entry #72, with a different set of buyer requirements.",
        "workTitle": "How I approach GEO for an audit firm",
        "workIntro": "The work starts by identifying the engagements the firm actually offers. I then verify eligibility, improve its accessible evidence and measure recommendation accuracy again.",
        "steps": [
          {
            "title": "Measure baseline BMR",
            "body": "Split non-branded prompts by statutory audit, voluntary engagement, sector and client type. Keep the exact initial set for repeat measurements."
          },
          {
            "title": "Verify eligibility and claims",
            "body": "Review professional registers, service descriptions, specialists and whether past work can lawfully be disclosed."
          },
          {
            "title": "Improve site and sources",
            "body": "Prepare briefs for engagement pages, sector methodology, professional profiles and useful publications based on primary sources."
          },
          {
            "title": "Repeat the measurement",
            "body": "Re-run the buyer questions and check whether AI correctly represents the firm's actual status, qualifications and scope."
          }
        ],
        "faq": [
          {
            "question": "Should statutory audit and consulting services be separate?",
            "answer": "Yes, when the firm genuinely offers both. They involve different deliverables, eligibility checks and buyer intent, and deserve distinct descriptions."
          },
          {
            "question": "Does claimed SRO membership establish eligibility?",
            "answer": "No. Verify the current entry in the applicable register. Public-interest entity engagements may also require checking the Federal Treasury's special register."
          },
          {
            "question": "Can an audit firm publish client names?",
            "answer": "Only where permissions, confidentiality and independence allow it. Otherwise explain the method without identifying clients or inventing outcomes."
          },
          {
            "question": "Is BMR the number of new audit engagements?",
            "answer": "No. It measures the share of AI recommendations within an agreed prompt sample. Leads and signed contracts are separate outcomes."
          },
          {
            "question": "What is the price of GEO for an audit firm?",
            "answer": "GAEO's published plans apply. The actual scope depends on the firm's service lines, target clients and baseline query matrix."
          }
        ],
        "ctaTitle": "Find out which audit firms AI recommends to your buyers",
        "ctaText": "Share your website, real engagement types and register references. I will propose a suitable initial prompt set.",
        "request": "Audit-firm GEO: statutory and voluntary assurance, registers, independence, sector evidence and BMR."
      }
    }
  }
];
