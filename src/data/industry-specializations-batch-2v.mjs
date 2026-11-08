/**
 * Batch 2V: original RU/EN GEO education services (#68 private schools, #69 online schools/EdTech, #70 universities/business schools).
 * Scope and accreditation claims require programme-level verification. No invented client results.
 * Reuses canonical prices and approved industry images.
 */
export const industrySpecializationsBatch2V = [
  {
    "id": 68,
    "slug": "private-schools",
    "group": "education-consulting",
    "routes": {
      "ru": "/industries/private-schools/",
      "en": "/en/industries/private-schools/"
    },
    "parent": {
      "ru": "/industries/education-providers/",
      "en": "/en/industries/education-providers/"
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
        "Методика измерения BMR в нейросетях"
      ],
      "en": [
        "How GAEO measures AI brand mentions"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/dda3cee5868d1739eb34ccd9e8a98085fa2c76e2/",
        "ru": "273-ФЗ, статья 91: лицензирование образовательной деятельности",
        "en": "Federal Education Act, Article 91: licensing of education"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/a2c973958cc01dcacbd2106b8f88d6dfdf86e320/",
        "ru": "273-ФЗ, статья 92: государственная аккредитация образовательных программ",
        "en": "Federal Education Act, Article 92: programme accreditation"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/16484fcceccbff241e7f0387146f346240cb050e/",
        "ru": "273-ФЗ, статья 29: обязательные открытые сведения школы",
        "en": "Federal Education Act, Article 29: mandatory institutional disclosures"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение частных школ в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение частных школ в ответах нейросетей",
        "description": "GEO для частных школ: образовательные программы, лицензия, аккредитация, возраст, поступление, стоимость, район и измерение BMR.",
        "eyebrow": "Образование / Частные школы",
        "lead": "Родители спрашивают нейросети о школах в определенном районе, с конкретной программой, языками, условиями поступления и стоимостью. Проверяю, какие школы получают рекомендации и подтверждаются ли ответы действующими сведениями учебного заведения.",
        "heroPoints": [
          "Небрендовые вопросы по возрасту, району, программе и условиям обучения",
          "Проверка лицензии, аккредитации по программам и открытых сведений",
          "Контроль достоверности рекомендаций и сопоставимые замеры BMR"
        ],
        "problemTitle": "Почему известность школы не отвечает на вопрос родителей",
        "problemIntro": "Выбор зависит от подтвержденной программы, организации учебного дня и конкретных условий приема. Общих оценок «сильная школа» недостаточно.",
        "problems": [
          {
            "title": "Перепутаны лицензия и аккредитация",
            "body": "Лицензирование деятельности и государственная аккредитация определенных программ являются разными правовыми процедурами; наличие одного статуса не доказывает другой."
          },
          {
            "title": "Стоимость и условия приема неполные",
            "body": "Родителям нужны действующие тарифы, включенные занятия, формат продленки, сроки, доступные места и правила договора."
          },
          {
            "title": "Учебные результаты описаны рекламными обещаниями",
            "body": "Результаты выпускников, конкурсные достижения и профили подготовки допустимо приводить лишь при проверяемых условиях и корректном периоде."
          }
        ],
        "scenarioTitle": "Какие вопросы семья задает нейросети",
        "scenarioIntro": "Примеры запросов для согласуемой матрицы, а не измеренная статистика реальных обращений.",
        "columns": [
          "Вопрос родителей",
          "Какие сведения нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какие частные школы с углубленным английским есть рядом с нами?",
            "Адрес школы, конкретная программа, часы, преподаватели и доступность набора",
            "Связать географию с реальным предложением"
          ],
          [
            "Где учиться ребенку с переходом в 7 класс?",
            "Возрастные ступени, правила перевода, свободные места и вступительные процедуры",
            "Разделить программы и порядок зачисления"
          ],
          [
            "Сколько стоит школа с продленкой и питанием?",
            "Договор, стоимость, дополнительные платежи, состав услуг и дата",
            "Исключить неподтвержденные цены"
          ],
          [
            "Какая частная школа имеет аккредитацию по программе среднего образования?",
            "Статус конкретной программы, запись реестра, актуальность",
            "Проверять уровень и программу отдельно"
          ]
        ],
        "proofTitle": "Что подтверждает надежные сведения о школе",
        "proofIntro": "Статья 91 закона №273-ФЗ регулирует лицензирование образовательной деятельности. Статья 92 задает условия аккредитации определенных программ, а статья 29 требует публиковать сведения об организации, учебных программах и стоимости платных услуг.",
        "checks": [
          "Действующий юридический статус, лицензия и применимость аккредитации к конкретной ступени обучения",
          "Официальные программы, правила поступления, договор, стоимость и включенные услуги",
          "Подтвержденные адреса, учебные условия, допустимые фотографии и реальные отзывы"
        ],
        "proofNote": "Сведения о других школах или опыт GAEO в иных нишах не доказывают результатов продвижения этой частной школы. Стартовый BMR определяют отдельным замером.",
        "workTitle": "Как выстраиваю GEO для частной школы",
        "workIntro": "Сначала узнаю, по каким критериям родители сравнивают школы, затем проверяю факты и источники, доступные для рекомендаций нейросетей.",
        "steps": [
          {
            "title": "Составить матрицу выбора",
            "body": "Разделяю вопросы по району, классу, программе, языкам, бюджету и условиям учебного дня."
          },
          {
            "title": "Проверить опубликованные данные",
            "body": "Сверяю программы, реестровые статусы, прием, договоры, цены и объекты."
          },
          {
            "title": "Улучшить страницы школы",
            "body": "Готовлю ТЗ на ступени, правила поступления, сравнимые условия, FAQ и подтверждения."
          },
          {
            "title": "Повторить сопоставимые запросы",
            "body": "Измеряю BMR и корректность фактов на той же матрице нейросетей."
          }
        ],
        "faq": [
          {
            "question": "Достаточно ли лицензии, чтобы говорить о государственной аккредитации?",
            "answer": "Нет. Аккредитация относится к предусмотренным законом программам и проверяется отдельно от лицензии."
          },
          {
            "question": "Можно ли писать «100% поступят в вуз»?",
            "answer": "Нет без проверяемого основания; абсолютное обещание образовательного результата некорректно."
          },
          {
            "question": "Нужны ли отдельные страницы по ступеням?",
            "answer": "Да, когда программы, условия приема и стоимость реально различаются; одинаковые страницы ради поискового охвата не нужны."
          },
          {
            "question": "Учитываются ли отзывы родителей?",
            "answer": "Можно использовать подлинные публичные отзывы с указанием источника и времени. Отдельное мнение не превращается в статистику качества."
          },
          {
            "question": "Сколько стоит GEO частной школы?",
            "answer": "Действуют общие тарифы GAEO; состав работ зависит от программ, районов и начальных измерений."
          }
        ],
        "ctaTitle": "Проверить, рекомендуют ли нейросети вашу школу",
        "ctaText": "Пришли сайт, адрес, образовательные программы и действующие условия приема. Я предложу начальную диагностику рекомендаций.",
        "request": "GEO частной школы: лицензия, аккредитация по программам, прием, стоимость, район, BMR."
      },
      "en": {
        "title": "GEO promotion for private schools | GAEO.ru",
        "h1": "GEO promotion for private schools in AI recommendations",
        "description": "Private-school GEO for programme selection, licensing, accreditation, admissions, fees, location and repeatable brand mention measurement.",
        "eyebrow": "Education / Independent schools",
        "lead": "Families ask AI to shortlist schools by location, age group, curriculum, language, admissions and total fees. I check which institutions appear in those answers and whether the underlying facts can be independently verified.",
        "heroPoints": [
          "Non-brand family questions by grade, curriculum and location",
          "Separate licensing, programme accreditation and published school facts",
          "Comparable AI visibility and answer-accuracy measurements"
        ],
        "problemTitle": "Why a school's reputation does not settle the decision",
        "problemIntro": "A positive description does not tell a family whether the relevant programme is offered and admissions conditions are current.",
        "problems": [
          {
            "title": "Licensing is confused with accreditation",
            "body": "The permission to provide education and the accreditation of qualifying programmes are separate legal matters."
          },
          {
            "title": "Fees and admissions lack detail",
            "body": "Families need updated tuition, included services, admission requirements and availability rather than headline prices."
          },
          {
            "title": "Outcomes are presented without evidence",
            "body": "Exam statistics, graduate results and competition awards need clear period, sample and verifiable context."
          }
        ],
        "scenarioTitle": "How families shortlist schools in AI",
        "scenarioIntro": "Illustrative buyer intents for a fixed future measurement matrix, not quantified demand.",
        "columns": [
          "Parent's question",
          "What must be verified",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which private schools offer advanced English near our area?",
            "Actual address, timetable, curriculum, teachers and enrolment",
            "Match local demand to programmes offered"
          ],
          [
            "Where can a child transfer into grade 7?",
            "School levels, transfer policy, vacancies and admission steps",
            "Separate grades and entry rules"
          ],
          [
            "What does a school with after-school care and meals cost?",
            "Contract, fees, extras, included items and revision date",
            "Avoid unsupported all-in prices"
          ],
          [
            "Which schools have accreditation for upper secondary programmes?",
            "Programme-specific status and current official records",
            "Validate accreditation for the relevant level"
          ]
        ],
        "proofTitle": "Evidence relevant to school recommendations",
        "proofIntro": "Russia's Federal Education Act Article 91 governs licensing; Article 92 covers accreditation for eligible programmes; Article 29 requires institutions to publish specified information, including programmes and paid-service costs.",
        "checks": [
          "Current legal and licensing information, with accreditation checked by programme",
          "Published curriculum, admissions, contract and fee details",
          "Actual address and facilities, rights to images and genuine feedback"
        ],
        "proofNote": "There is no claim of a completed private-school GEO client case or measured uplift. Any baseline must use the actual institution.",
        "workTitle": "How I would build a private-school GEO programme",
        "workIntro": "Start with family decision criteria, then verify the education facts that an AI answer should cite.",
        "steps": [
          {
            "title": "Define parent intents",
            "body": "Segment by geography, grades, curriculum, language, cost and school-day requirements."
          },
          {
            "title": "Verify institutional information",
            "body": "Check programmes, legal status, admissions, fees and official documents."
          },
          {
            "title": "Improve source pages",
            "body": "Specify school-level pages, usable FAQs and verified outcome evidence."
          },
          {
            "title": "Repeat the baseline",
            "body": "Compare BMR and the accuracy of cited information on equivalent AI questions."
          }
        ],
        "faq": [
          {
            "question": "Does a licence prove accreditation?",
            "answer": "No. Qualifying programmes and their accreditation require a separate check."
          },
          {
            "question": "Can the school promise every graduate will enter university?",
            "answer": "Not without a sound evidence base; unconditional outcome claims should be avoided."
          },
          {
            "question": "Are separate grade pages appropriate?",
            "answer": "Yes when curricula, admission or prices genuinely differ, not as near-duplicate SEO pages."
          },
          {
            "question": "May parent testimonials be included?",
            "answer": "Only genuine, attributable public reviews with an appropriate date and context."
          },
          {
            "question": "What does private-school GEO cost?",
            "answer": "GAEO's standard plans apply; geographic and programme coverage determine the scope."
          }
        ],
        "ctaTitle": "Check whether AI recommends your school",
        "ctaText": "Share the school website, programmes, location and published admission rules for an initial audit.",
        "request": "Private-school GEO: licence, programme accreditation, fees, admissions, location and BMR."
      }
    }
  },
  {
    "id": 69,
    "slug": "online-schools-edtech",
    "group": "education-consulting",
    "routes": {
      "ru": "/industries/online-schools-edtech/",
      "en": "/en/industries/online-schools-edtech/"
    },
    "parent": {
      "ru": "/industries/education-providers/",
      "en": "/en/industries/education-providers/"
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
        "Методика измерения BMR в нейросетях"
      ],
      "en": [
        "How GAEO measures AI brand mentions"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/9ab9b85e5291f25d6986b5301ab79c23f0055ca4/",
        "ru": "273-ФЗ, статья 16: электронное обучение и дистанционные образовательные технологии",
        "en": "Federal Education Act, Article 16: online and distance learning"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/dda3cee5868d1739eb34ccd9e8a98085fa2c76e2/",
        "ru": "273-ФЗ, статья 91: лицензирование образовательной деятельности",
        "en": "Federal Education Act, Article 91: licensing of educational activity"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_459467/",
        "ru": "Правительство РФ, постановление №1678 о дистанционных образовательных технологиях",
        "en": "Russian Government Decree 1678: rules for distance learning"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение онлайн-школ и EdTech | GAEO.ru",
        "h1": "Продвижение онлайн-школ и EdTech в ответах нейросетей",
        "description": "GEO для онлайн-образования: дистанционные курсы, наставники, учебные результаты, программа, формат, лицензия, отзывы и замер BMR.",
        "eyebrow": "Образование / Онлайн-школы и EdTech",
        "lead": "Человек выбирает онлайн-программу по задаче, уровню, поддержке преподавателя, расписанию и результату обучения. Проверяю, какие школы и платформы нейросети предлагают для конкретных навыков, а также соответствуют ли рекомендации реальной программе.",
        "heroPoints": [
          "Запросы по навыку, исходному уровню, формату и сопровождению",
          "Разделение образовательной организации, платформы и информационного продукта",
          "Проверка программ, преподавателей, стоимости и повторных замеров"
        ],
        "problemTitle": "Почему «онлайн-курс» означает разные продукты",
        "problemIntro": "Образовательная программа с преподавателями, самостоятельный видеоматериал и технологическая платформа могут иметь разную правовую и учебную модель.",
        "problems": [
          {
            "title": "Дистанционный формат приравнивают к лицензии",
            "body": "Наличие видеозанятий или платформы само по себе не устанавливает статус образовательной деятельности; лицензионные требования зависят от фактической модели."
          },
          {
            "title": "Результат программы звучит как гарантия работы",
            "body": "Содействие трудоустройству, документ об обучении и самостоятельное освоение навыка являются разными обещаниями."
          },
          {
            "title": "Контент курса устаревает",
            "body": "У программ меняются модули, преподаватели, сроки, версия ПО, доступ к материалам и условия возврата."
          }
        ],
        "scenarioTitle": "Коммерческие вопросы об онлайн-обучении",
        "scenarioIntro": "Это примеры для будущего измерения, а не подтвержденная статистика спроса.",
        "columns": [
          "Вопрос ученика",
          "Что нужно подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Какой онлайн-курс SQL с проверкой домашних заданий выбрать новичку?",
            "План модулей, формат обратной связи, уровень, практические задания, стоимость",
            "Разделить курсы с наставником и самостоятельные материалы"
          ],
          [
            "Кому подойдет онлайн-программа подготовки к ЕГЭ?",
            "Предметы, преподаватели, формат уроков, расписание, возраст, договор",
            "Связать конкретную программу с запросом"
          ],
          [
            "Какая онлайн-школа предлагает обучение без привязки ко времени?",
            "Условия доступа, записи, дедлайны, обратная связь, продолжительность",
            "Достоверно описать асинхронный формат"
          ],
          [
            "Как сравнить 2 курса по аналитике данных?",
            "Содержание, инструменты, требования к слушателю, проекты, документы по итогам",
            "Создать понятные сравнимые критерии"
          ]
        ],
        "proofTitle": "Что должно быть проверено для онлайн-программы",
        "proofIntro": "Статья 16 закона №273-ФЗ определяет электронное обучение и дистанционные образовательные технологии. Статья 91 регулирует лицензирование образовательной деятельности. Правовой режим отдельного курса зависит от фактического обучения, а не только названия EdTech или наличия сайта.",
        "checks": [
          "Поставщик услуги, правовая модель и применимость требований к лицензированию",
          "Программа, уровень, преподаватели и формат проверки знаний, обещаемый документ",
          "Актуальная стоимость, условия оплаты/возврата, доступ к урокам, достоверные отзывы"
        ],
        "proofNote": "GAEO не приписывает онлайн-школам гарантированный заработок, карьерный рост или измеренный клиентский GEO-кейс. Сопоставимый BMR рассчитывается после базового замера.",
        "workTitle": "Как выстраиваю GEO для онлайн-образования",
        "workIntro": "Выделяю разные мотивы ученика: освоить навык, подготовиться к экзамену, получить документ или решить профессиональную задачу.",
        "steps": [
          {
            "title": "Собрать матрицу программ",
            "body": "Группирую запросы по навыку, уровню, преподавателю, формату и цене."
          },
          {
            "title": "Проверить фактическое предложение",
            "body": "Сверяю учебные планы, преподавателей, обратную связь, документы и договор."
          },
          {
            "title": "Улучшить сайт и внешние источники",
            "body": "Готовлю ТЗ на содержательные страницы курсов, FAQ, проверенные примеры и экспертные публикации."
          },
          {
            "title": "Контролировать ответы нейросетей",
            "body": "Повторяю вопросы и измеряю BMR и ошибки в характеристиках программ."
          }
        ],
        "faq": [
          {
            "question": "Нужна ли лицензия любому сайту с видеокурсом?",
            "answer": "Вывод зависит от того, осуществляется ли образовательная деятельность и как организовано обучение. Нужно анализировать конкретную модель."
          },
          {
            "question": "Можно ли обещать трудоустройство каждому выпускнику?",
            "answer": "Безусловная гарантия недопустима без реальных договорных оснований; карьерное содействие нужно описывать точно."
          },
          {
            "question": "Стоит ли делать отдельную страницу каждой программы?",
            "answer": "Да, когда у нее своя аудитория, содержание, преподаватели и условия. Массовые копии с заменой названия не нужны."
          },
          {
            "question": "Как использовать отзывы учеников?",
            "answer": "Только подлинные отзывы с допустимым раскрытием автора и конкретным периодом, без выдуманных оценок."
          },
          {
            "question": "Сколько стоит GEO для EdTech?",
            "answer": "Применяются общие тарифы GAEO; число программ, нейросетей и запросов согласуется на аудите."
          }
        ],
        "ctaTitle": "Узнать, какие онлайн-школы нейросети предлагают вашим ученикам",
        "ctaText": "Пришли сайт, список программ, форматы обучения и условия договора. Начну с запросов реальных учеников.",
        "request": "GEO для онлайн-школы и EdTech: программа, формат, правовой статус, наставники, BMR."
      },
      "en": {
        "title": "GEO promotion for online schools and EdTech | GAEO.ru",
        "h1": "GEO promotion for online schools and EdTech providers",
        "description": "EdTech GEO: programme content, tutoring, distance learning, licensing boundaries, course format, price and AI recommendation measurement.",
        "eyebrow": "Education / Online learning and EdTech",
        "lead": "Learners compare online programmes by skill, starting level, instructor support, assessment and timetable. I assess whether AI recommends a provider for those needs and whether the current programme details justify the suggestion.",
        "heroPoints": [
          "Buyer prompts by skill, level and teaching support",
          "Separate education provider, learning platform and digital content product",
          "Verify current programmes, pricing and BMR changes"
        ],
        "problemTitle": "An online course can mean different offerings",
        "problemIntro": "Instructor-led education, standalone video content and a software platform do not necessarily carry identical service obligations.",
        "problems": [
          {
            "title": "Distance delivery is mistaken for licensing status",
            "body": "Using a platform does not by itself establish the legal nature of the education provided; applicable rules depend on actual activities."
          },
          {
            "title": "A career-support offer becomes a job guarantee",
            "body": "Mentoring, completion documents, portfolio exercises and job placement are different deliverables."
          },
          {
            "title": "Programme facts go stale",
            "body": "Modules, instructors, tools, duration, access rights and refund terms can all change."
          }
        ],
        "scenarioTitle": "Online learning buyer-intent examples",
        "scenarioIntro": "Illustrative prompts for a planned fixed measurement set, not measured search volumes.",
        "columns": [
          "Learner question",
          "Required facts",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which beginner SQL course gives feedback on assignments?",
            "Module plan, feedback cadence, tutor role and total fee",
            "Distinguish mentored and self-paced options"
          ],
          [
            "Which online course prepares school students for national exams?",
            "Subjects, teacher credentials, class times, age range and teaching approach",
            "Connect the exact programme to the use case"
          ],
          [
            "Can I study asynchronously without attending scheduled classes?",
            "Recorded lessons, deadlines, support hours and availability",
            "Document the real flexibility"
          ],
          [
            "How do two data-analytics courses compare?",
            "Curriculum, tools, prerequisites, projects and completion documentation",
            "Publish comparable programme facts"
          ]
        ],
        "proofTitle": "Evidence behind an EdTech recommendation",
        "proofIntro": "Article 16 of Russia's Education Act describes electronic and distance education; Article 91 governs education licensing. Classification of an actual offering depends on what the organisation provides, not solely on the EdTech label.",
        "checks": [
          "Identity of the provider and actual licensing obligations",
          "Course content, level, teacher support, assessments and completion claims",
          "Up-to-date fees, access rules, refund policy and genuine learner feedback"
        ],
        "proofNote": "No guaranteed income, employment outcome or completed EdTech GEO client case is asserted. Brand mentions are measured using a future baseline.",
        "workTitle": "How I approach online-learning GEO",
        "workIntro": "I distinguish job skills, school exam preparation, professional development and independent study as different buying questions.",
        "steps": [
          {
            "title": "Build a programme matrix",
            "body": "Group prompts by learning goal, level, teaching model, instructor and cost."
          },
          {
            "title": "Verify service facts",
            "body": "Check curricula, staff, assessment, outcomes and contractual terms."
          },
          {
            "title": "Improve discoverable material",
            "body": "Specify useful course pages, transparent FAQs, learner examples and expert sources."
          },
          {
            "title": "Repeat the same prompts",
            "body": "Measure BMR and errors in AI descriptions of current courses."
          }
        ],
        "faq": [
          {
            "question": "Does every video-course website require an education licence?",
            "answer": "The answer depends on whether the provider performs licensed educational activities and its actual organisational model."
          },
          {
            "question": "Can a course guarantee employment?",
            "answer": "Any binding commitment needs a real legal and operational basis; career support should be described precisely."
          },
          {
            "question": "Should each programme have its own page?",
            "answer": "Yes where it contains distinct curriculum, audience, teaching and price information."
          },
          {
            "question": "Can learner reviews be reused?",
            "answer": "Only authentic reviews with appropriate publication rights and contextual dates."
          },
          {
            "question": "What does EdTech GEO cost?",
            "answer": "GAEO's published pricing applies; the audit defines the courses and AI question set."
          }
        ],
        "ctaTitle": "See which online courses AI recommends to your learners",
        "ctaText": "Send the website, programmes, learning formats and contractual terms to shape a baseline.",
        "request": "Online school and EdTech GEO: programme details, delivery, legal status, support and BMR."
      }
    }
  },
  {
    "id": 70,
    "slug": "universities-business-schools",
    "group": "education-consulting",
    "routes": {
      "ru": "/industries/universities-business-schools/",
      "en": "/en/industries/universities-business-schools/"
    },
    "parent": {
      "ru": "/industries/education-providers/",
      "en": "/en/industries/education-providers/"
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
        "Методика измерения BMR в нейросетях"
      ],
      "en": [
        "How GAEO measures AI brand mentions"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/a2c973958cc01dcacbd2106b8f88d6dfdf86e320/",
        "ru": "273-ФЗ, статья 92: аккредитация образовательных программ",
        "en": "Federal Education Act, Article 92: programme accreditation"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/16484fcceccbff241e7f0387146f346240cb050e/",
        "ru": "273-ФЗ, статья 29: открытые сведения об образовании, приеме и стоимости",
        "en": "Federal Education Act, Article 29: programme and admission disclosures"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_140174/dda3cee5868d1739eb34ccd9e8a98085fa2c76e2/",
        "ru": "273-ФЗ, статья 91: лицензирование образовательной деятельности",
        "en": "Federal Education Act, Article 91: institutional licensing"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение вузов и бизнес-школ | GAEO.ru",
        "h1": "GEO-продвижение вузов и бизнес-школ в ответах нейросетей",
        "description": "GEO для университетов и бизнес-школ: программы, прием, аккредитация, формы обучения, стоимость, стипендии, бизнес-образование и BMR.",
        "eyebrow": "Образование / Вузы и бизнес-школы",
        "lead": "Абитуриенты и руководители ищут разные программы: бакалавриат по специальности, магистратуру, профессиональную переподготовку или корпоративное обучение. Проверяю, какие учреждения рекомендуют нейросети и насколько корректно они описывают конкретные программы.",
        "heroPoints": [
          "Небрендовые запросы по специальности, формату и цели обучения",
          "Проверка программ и аккредитации по соответствующим направлениям",
          "Связь приемной информации, доказательств и сопоставимых BMR-замеров"
        ],
        "problemTitle": "Почему имя университета не заменяет информацию о программе",
        "problemIntro": "Внутри одного учреждения могут быть разные уровни образования, места, условия поступления, документы и договоры.",
        "problems": [
          {
            "title": "Аккредитацию института переносят на все программы",
            "body": "Государственная аккредитация оценивается в отношении предусмотренных законом программ и категорий, а не автоматически всей образовательной деятельности."
          },
          {
            "title": "Реальные условия приема устаревают",
            "body": "Правила, перечень направлений, формы обучения, стоимость и количество мест нужно сверять с текущим приемным циклом."
          },
          {
            "title": "MBA и высшее образование смешаны",
            "body": "Бизнес-программа, дополнительное профессиональное образование и академическая степень имеют разные цели и юридический статус."
          }
        ],
        "scenarioTitle": "Вопросы абитуриентов и корпоративных заказчиков",
        "scenarioIntro": "Примеры запроса с измеримыми условиями, не результаты проведенного исследования.",
        "columns": [
          "Вопрос будущего студента",
          "Проверяемые сведения",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где учиться на магистратуре по анализу данных с вечерними занятиями?",
            "Направление, формат, расписание, программа, правила приема и места",
            "Связать поисковый интент с конкретной программой"
          ],
          [
            "Какая бизнес-школа предлагает программу для владельцев малого бизнеса?",
            "Содержание, преподаватели, формат, даты набора и документ по окончании",
            "Разделить целевые аудитории и продукты"
          ],
          [
            "Сколько стоит обучение на выбранном направлении?",
            "Утвержденная цена конкретной программы и года, варианты оплаты, бюджетные места",
            "Показывать точные источники цены"
          ],
          [
            "Как проверить госаккредитацию конкретного направления?",
            "Реестровая информация и применимость аккредитации к программе",
            "Не выдавать общий статус за программный"
          ]
        ],
        "proofTitle": "Какие документы повышают точность рекомендаций",
        "proofIntro": "Статья 29 закона №273-ФЗ требует публиковать актуальные сведения об образовательных программах, приеме, местах и стоимости. Статья 92 относится к государственной аккредитации определенных программ, а статья 91 регламентирует лицензирование.",
        "checks": [
          "Юридическая сущность, лицензия и проверяемые аккредитационные сведения по программам",
          "Действующие направления, план приема, стоимость, формат и тип выдаваемого документа",
          "Реальные преподаватели, академические источники, партнерства и результаты с датой проверки"
        ],
        "proofNote": "Результаты трудоустройства и рейтинговые места университетов не выдумываются. GAEO не заявляет завершенных GEO-кейсов именно вузов и бизнес-школ.",
        "workTitle": "Как устроен GEO для университета и бизнес-школы",
        "workIntro": "Отдельные матрицы запросов нужны абитуриентам, профессионалам, работодателям и корпоративным заказчикам.",
        "steps": [
          {
            "title": "Разделить учебные интенты",
            "body": "Группирую запросы по уровню, программе, географии, стоимости, расписанию и карьерной задаче."
          },
          {
            "title": "Сверить официальную фактуру",
            "body": "Проверяю прием, условия обучения, лицензирование, аккредитацию и учебные планы."
          },
          {
            "title": "Улучшить страницы программ",
            "body": "Готовлю ТЗ на самостоятельные страницы направлений, преподавателей, FAQ и документы."
          },
          {
            "title": "Контролировать рекомендации",
            "body": "Повторяю фиксированные запросы и считаю BMR отдельно по программам и аудиториям."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать вуз только по его бренду?",
            "answer": "Брендовые запросы полезны для проверки фактов, но рекомендации на выбор программы требуют небрендовой матрицы."
          },
          {
            "question": "Означает ли аккредитация университета аккредитацию любой программы MBA?",
            "answer": "Нет. Статус и применимость проверяют по конкретной программе и действующим правилам."
          },
          {
            "question": "Нужно ли создавать отдельные страницы направлений?",
            "answer": "Да, когда они содержат самостоятельные условия приема и учебный план, а не только заменяют название специальности."
          },
          {
            "question": "Допустимо ли обещать выпускнику определенную зарплату?",
            "answer": "Нет без подтвержденной методики и договорных оснований; единичные истории нельзя обобщать на всех."
          },
          {
            "question": "Сколько стоит GEO-продвижение вуза?",
            "answer": "Применяются общие тарифы GAEO; масштаб зависит от числа программ, кампусов и запросов."
          }
        ],
        "ctaTitle": "Узнать, какие образовательные программы рекомендуют нейросети",
        "ctaText": "Пришли сайт вуза, актуальные программы и материалы приема. Предложу матрицу для начального BMR.",
        "request": "GEO для вуза или бизнес-школы: направления, прием, лицензия, аккредитация, цены и BMR."
      },
      "en": {
        "title": "GEO promotion for universities and business schools | GAEO.ru",
        "h1": "GEO promotion for universities and business schools",
        "description": "AI recommendations for universities, degrees and executive education: programmes, entry requirements, accreditation, fees, study format and BMR.",
        "eyebrow": "Education / Universities and business schools",
        "lead": "Applicants and executives ask different questions about bachelor's and master's degrees, professional development and business education. I measure which schools AI recommends for specific programmes and whether the stated facts are current.",
        "heroPoints": [
          "Non-brand prompts by degree, subject, audience and study mode",
          "Programme-specific checks of admission and accreditation information",
          "Official programme pages, evidence and comparable BMR checks"
        ],
        "problemTitle": "An institution's brand is not a programme specification",
        "problemIntro": "Degree and executive programmes may have different admission, credentials, teaching formats and price structures under one organisation.",
        "problems": [
          {
            "title": "Institutional status is applied to every programme",
            "body": "State accreditation has a defined legal scope; it should not be assumed to cover every offering."
          },
          {
            "title": "Admission details go out of date",
            "body": "Programmes, places, dates, entry rules and fees change by admission cycle."
          },
          {
            "title": "MBA and academic degrees are conflated",
            "body": "Executive education, vocational development and academic degree programmes can have different legal and educational models."
          }
        ],
        "scenarioTitle": "Questions students and companies ask AI",
        "scenarioIntro": "A sample fixed prompt matrix, not recorded demand statistics.",
        "columns": [
          "Applicant question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which university offers a part-time data analytics master's?",
            "Exact programme, study mode, schedule, admissions and available places",
            "Connect requirements to a real programme"
          ],
          [
            "Which business school teaches business owners?",
            "Teaching content, audience, staff, dates and completion certificate",
            "Differentiate the educational product"
          ],
          [
            "What is the annual fee for this degree programme?",
            "Approved fees by programme, academic year and payment terms",
            "Use dated programme-specific prices"
          ],
          [
            "How can I verify the accreditation of this field of study?",
            "Actual programme status, official records and relevant category",
            "Avoid unsupported blanket claims"
          ]
        ],
        "proofTitle": "Official information behind a recommendation",
        "proofIntro": "Article 29 of Russia's Federal Education Act governs public programme, admission and fee information. Article 92 sets conditions for accreditation of eligible programmes, while Article 91 governs licensing.",
        "checks": [
          "Provider identity, licensing and programme-specific accreditation where applicable",
          "Current curricula, admissions, fee schedule, campus and degree or certificate type",
          "Verifiable teachers, research sources, approved partnerships and appropriately dated results"
        ],
        "proofNote": "GAEO does not claim an unverified university GEO client case, employment result or ranking. The initial BMR would be measured for the specific institution.",
        "workTitle": "How I organise higher-education GEO",
        "workIntro": "Applicants, professionals, corporate buyers and employers require different question sets.",
        "steps": [
          {
            "title": "Segment education choices",
            "body": "Separate degrees, subject, location, study mode, fees and executive learning needs."
          },
          {
            "title": "Validate official information",
            "body": "Check course details, admissions, licensing and programme accreditation."
          },
          {
            "title": "Improve discoverability",
            "body": "Specify programme pages, admissions FAQs, faculty sources and accurate documents."
          },
          {
            "title": "Repeat controlled queries",
            "body": "Measure BMR by programme and compare factual correctness over time."
          }
        ],
        "faq": [
          {
            "question": "Is a strong university brand enough for programme GEO?",
            "answer": "Brand queries identify reputation, but programme-selection requests require distinct evidence."
          },
          {
            "question": "Does institutional accreditation automatically cover every MBA course?",
            "answer": "No. Scope and relevance must be checked for each actual programme."
          },
          {
            "question": "Should every degree have a page?",
            "answer": "Yes where it provides genuine curriculum, admissions and fee information rather than templated duplicates."
          },
          {
            "question": "Can graduate salary be promised?",
            "answer": "Not without reliable evidence and an appropriate contractual basis; individual outcomes are not universal."
          },
          {
            "question": "How much does university GEO cost?",
            "answer": "GAEO's published plans apply; scope depends on programmes, campuses and target queries."
          }
        ],
        "ctaTitle": "Find out which degree programmes AI recommends",
        "ctaText": "Share the institution website, current course catalogue and admission information to scope the baseline.",
        "request": "University and business-school GEO: programme catalogue, admissions, licensing, accreditation, fees and BMR."
      }
    }
  }
];
