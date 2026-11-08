/**
 * Phase 2AA: original RU/EN GEO content for recruitment (#71), consulting (#72),
 * and branding/marketing agencies (#74). Evidence-led professional-services
 * buyer intents; source laws and standards are not assertions of certification.
 * The 107 catalogue IDs, artwork, canonical tariffs and BMR terms remain unchanged.
 */
export const industrySpecializationsBatch2AA = [
  {
    "id": 71,
    "slug": "recruitment-agencies-recruiters",
    "group": "professional-services",
    "routes": {
      "ru": "/industries/recruitment-agencies-recruiters/",
      "en": "/en/industries/recruitment-agencies-recruiters/"
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
        "Как измеряется видимость и BMR",
        "Как проверять профессиональные услуги и доказательства"
      ],
      "en": [
        "BMR and AI recommendation measurement",
        "Evidence checks for professional services"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_464093/",
        "ru": "565-ФЗ: действующая модель законодательства о занятости населения",
        "en": "Federal Law 565-FZ: Russian employment framework"
      },
      {
        "href": "https://mintrud.gov.ru/docs/laws/130",
        "ru": "152-ФЗ: закон о персональных данных, опубликован Минтрудом",
        "en": "Federal Law 152-FZ: personal-data processing"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_139574/",
        "ru": "Разъяснения Роскомнадзора: персональные данные соискателей и кадрового резерва",
        "en": "Roskomnadzor guidance on candidates' and talent-pool data"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение кадровых агентств и рекрутеров в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение кадровых агентств и рекрутеров",
        "description": "Продвижение агентств подбора персонала в ChatGPT, Алисе и других нейросетях: executive search, массовый подбор, сроки, отрасли, конфиденциальность и BMR.",
        "eyebrow": "Профессиональные услуги / Подбор персонала",
        "lead": "Работодатель ищет рекрутера для конкретной позиции, рынка труда и сроков. Я анализирую, какие кадровые агентства нейросети рекомендуют по таким запросам, и проверяю, подтверждаются ли их специализации, модель оплаты и опыт закрытия вакансий.",
        "heroPoints": [
          "Матрица запросов работодателей по должностям и отраслям",
          "Разделение executive search, редкого и массового подбора",
          "Проверяемые условия сотрудничества и защита данных соискателей"
        ],
        "problemTitle": "Почему общие обещания о подборе персонала не помогают выбрать агентство",
        "problemIntro": "Для директора по персоналу важны глубина поиска, профиль вакансии и условия замены кандидата. Списки отраслей без конкретных подтверждений не дают надежного сравнения.",
        "problems": [
          {
            "title": "Не разделены модели поиска",
            "body": "Подбор руководителя, инженерных кадров и массовый линейный найм требуют разных ресурсов, этапов оценки и сроков. Заявление «закрываем любые вакансии» не показывает компетенцию агентства."
          },
          {
            "title": "Показатели без методики",
            "body": "Среднее время закрытия и процент успешных выходов не сопоставимы без типов позиций, периода, определения успешного выхода и размера выборки."
          },
          {
            "title": "Закрытые сведения становятся публичными",
            "body": "Истории кандидатов, клиентские вакансии и резюме нельзя использовать как доказательства без проверки прав на раскрытие и требований к персональным данным."
          }
        ],
        "scenarioTitle": "Как работодатели выбирают рекрутингового партнера через нейросети",
        "scenarioIntro": "Вопросы ниже служат основой замера рекомендаций. Они не описывают фактически полученные ответы нейросетей до отдельного исследования.",
        "columns": [
          "Вопрос работодателя",
          "Какие доказательства нужны",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто специализируется на подборе технических директоров в производстве?",
            "Подтвержденные направления executive search, этапы оценки, роль консультанта и география",
            "Раскрыть специализацию по управленческим функциям, а не перечислять все вакансии"
          ],
          [
            "Как выбрать агентство для массового подбора сотрудников на склад?",
            "Регионы, объемы найма по согласованной методике, сроки выхода и модель сопровождения",
            "Сделать отдельный материал о массовом подборе с условиями"
          ],
          [
            "Какие рекрутеры закрывают редкие B2B-продажи в регионах?",
            "Наличие отраслевой практики, поиск вне города, критерии квалификации и ограничения",
            "Привязать реальные отрасли, роли и зоны работы к проверяемым фактам"
          ],
          [
            "Сколько стоит подбор руководителя и когда возможна замена?",
            "Договорные модели, этапы оплаты, исключения, условия гарантии замены и сроки",
            "Опубликовать прозрачные условия без единой выдуманной цены"
          ]
        ],
        "proofTitle": "Какие факты подтверждают качество услуги по подбору",
        "proofIntro": "Проверяю содержание оффера и разрешенные примеры работы. Закон №565-ФЗ регулирует отношения в сфере занятости, а работа с резюме и кадровыми резервами требует соблюдения №152-ФЗ и применимых разъяснений Роскомнадзора. Эти источники не подтверждают результаты конкретного агентства.",
        "checks": [
          "Специализации по должностям, форматам поиска и рынкам, состав команды и реальные ограничения географии",
          "Методика оценки кандидатов, допустимая статистика закрытий с периодами и правилами подсчета",
          "Договорная ответственность, конфиденциальность, основания обработки персональных данных и разрешение на публикацию кейса"
        ],
        "proofNote": "Методика GEO для рекрутеров представлена как профессиональный анализ. Клиентских результатов GAEO в рекрутинге здесь не заявлено.",
        "workTitle": "Как организую GEO-продвижение кадрового агентства",
        "workIntro": "Разделяю спрос работодателя на найм по сценариям, проверяю источники и далее измеряю, как меняется доля обоснованных рекомендаций.",
        "steps": [
          {
            "title": "Стартовый BMR по вакансиям",
            "body": "Фиксирую небрендовые вопросы о поиске руководителей, узких специалистов и массовом найме отдельно по регионам."
          },
          {
            "title": "Проверка профильных доказательств",
            "body": "Сверяю специализации, этапы оценки, условия подбора, разрешенные показатели и правила использования данных кандидатов."
          },
          {
            "title": "Экспертные страницы и внешние источники",
            "body": "Готовлю задания для страниц отраслей и моделей подбора, биографий консультантов, публичных методик и согласованных кейсов."
          },
          {
            "title": "Повторный замер точности",
            "body": "На той же матрице сравниваю упоминания и проверяю, не приписывают ли нейросети агентству несвойственные вакансии и сроки."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать массовый подбор и executive search на одной странице?",
            "answer": "Общая страница полезна для навигации, но нужны разные сценарии спроса и доказательства. Для executive search важны роли и процедура оценки; для массового подбора другие объемы и организация выхода сотрудников."
          },
          {
            "question": "Можно ли публиковать резюме кандидатов как доказательство опыта?",
            "answer": "Только при подтвержденных правовых основаниях и соблюдении требований к персональным данным. Обычно безопаснее использовать согласованные обезличенные описания задачи и методики без идентификации человека."
          },
          {
            "question": "Что означает обещание закрыть вакансию за определенный срок?",
            "answer": "Его следует оценивать по конкретной должности, рынку, стартовым условиям и договору. Сроки по типовым вакансиям нельзя автоматически переносить на редкие роли."
          },
          {
            "question": "Измеряется ли рекомендация кадрового агентства по названию?",
            "answer": "Для BMR фиксируются прежде всего небрендовые вопросы работодателей. Брендовые ответы учитываются отдельно, чтобы не путать известность имени с рекомендацией по задаче."
          },
          {
            "question": "Сколько стоит GEO для рекрутингового агентства?",
            "answer": "Действуют опубликованные тарифы GAEO. Итоговый объем зависит от направлений подбора, числа рынков, географии и исходной матрицы рекомендаций."
          }
        ],
        "ctaTitle": "Проверим, какие рекрутинговые агентства нейросети советуют работодателям",
        "ctaText": "Пришли сайт, основные типы вакансий, регионы работы и разрешенные данные о результатах. Составлю первую матрицу сравнения.",
        "request": "GEO для кадрового агентства: специализации, executive search, массовый подбор, условия подбора, данные кандидатов и BMR."
      },
      "en": {
        "title": "GEO for recruitment agencies and executive-search firms | GAEO",
        "h1": "GEO promotion for recruitment agencies and recruiters",
        "description": "GEO for recruitment firms: executive search, high-volume hiring, roles, candidate-data privacy, real service terms and measurable AI recommendations.",
        "eyebrow": "Professional services / Recruitment",
        "lead": "Employers ask AI assistants to recommend a recruiter for a specific role, location and hiring challenge. I examine which firms are suggested and whether their sector expertise, delivery model and evidence withstand a buyer's review.",
        "heroPoints": [
          "Employer-intent prompts segmented by vacancy and sector",
          "Clear distinctions between executive search and volume hiring",
          "Verifiable service terms and safeguards for candidate information"
        ],
        "problemTitle": "Why a broad recruitment pitch makes AI comparison difficult",
        "problemIntro": "A hiring manager needs to understand sourcing depth, specialist coverage and replacement terms. A general list of industries rarely answers these procurement questions.",
        "problems": [
          {
            "title": "Search models are mixed",
            "body": "Senior leadership search, scarce engineering skills and volume workforce recruitment involve different sourcing practices, assessments and timeframes. The website must distinguish them."
          },
          {
            "title": "Performance figures lack definitions",
            "body": "Time-to-fill and placement rates cannot be compared without a period, vacancy classes, sample size and a shared definition of a successful placement."
          },
          {
            "title": "Confidential evidence becomes exposed",
            "body": "Candidate CVs, private vacancies and client names require a lawful disclosure basis. They are not reusable marketing proof merely because the agency handled the assignment."
          }
        ],
        "scenarioTitle": "Employer questions that create recruitment-agency demand",
        "scenarioIntro": "These are candidate prompts for an initial audit, not claims about observed AI responses.",
        "columns": [
          "Employer question",
          "Evidence needed",
          "GEO task"
        ],
        "scenarios": [
          [
            "Which recruiter can source a manufacturing technical director?",
            "Verified executive-search focus, assessment stages and geographic reach",
            "Connect specific leadership roles to supported experience"
          ],
          [
            "Who can staff a regional warehouse operation at scale?",
            "Delivery locations, lawful case metrics, onboarding responsibility and contract model",
            "Create a distinct volume-recruitment service explanation"
          ],
          [
            "Which agencies recruit hard-to-find B2B sales talent?",
            "Relevant sector knowledge, sourcing process, role criteria and boundaries",
            "Make supported role and industry expertise findable"
          ],
          [
            "How are executive placement fees and replacement terms defined?",
            "Contract models, payment stages, exclusions and any replacement window",
            "Explain actual terms rather than publish an invented universal fee"
          ]
        ],
        "proofTitle": "Evidence to check before recommending a recruitment provider",
        "proofIntro": "I examine verifiable role expertise and approved service examples. Russian Federal Law 565-FZ governs employment matters, while personal-data legislation and regulator guidance matter when processing candidate information. Neither law endorses the performance of a particular recruiter.",
        "checks": [
          "Role and industry focus, search model, team qualifications and genuine service territory",
          "Assessment process and any permissioned placement statistics with periods and clear definitions",
          "Contract responsibility, confidentiality, lawful candidate data use and publication permissions"
        ],
        "proofNote": "This is a service-specific GEO methodology. It does not claim a completed GAEO recruitment-sector result.",
        "workTitle": "How I would run recruitment GEO work",
        "workIntro": "The audit separates employer requirements before comparing AI recommendations and their supporting sources.",
        "steps": [
          {
            "title": "Baseline by hiring intent",
            "body": "Record unbranded prompts for executive, specialist and volume recruitment, segmented by region."
          },
          {
            "title": "Verify service evidence",
            "body": "Check supported roles, assessment steps, contracts, permissioned figures and candidate-data handling."
          },
          {
            "title": "Develop evidence-led pages",
            "body": "Prepare briefs for role-specific services, recruiter profiles, methods and authorised case descriptions."
          },
          {
            "title": "Repeat and qualify the measure",
            "body": "Re-run the same prompts and check recommendation accuracy as well as BMR."
          }
        ],
        "faq": [
          {
            "question": "Can one page cover executive search and volume hiring?",
            "answer": "It can introduce both, but separate buyer scenarios and supporting evidence are needed for credible recommendations."
          },
          {
            "question": "Can candidate CVs be used as proof?",
            "answer": "Only with an appropriate lawful basis and compliance with applicable personal-data rules. Permissioned anonymous case descriptions are usually better for public evidence."
          },
          {
            "question": "Does an average time-to-fill guarantee my vacancy will be closed by that date?",
            "answer": "No. Role complexity, candidate market, geography and contract assumptions materially affect timing."
          },
          {
            "question": "Do branded AI answers count as recommendation visibility?",
            "answer": "Branded discovery should be tracked separately from unbranded employer questions used in a baseline BMR matrix."
          },
          {
            "question": "What does recruitment GEO cost?",
            "answer": "GAEO's published plans apply. Scope depends on hiring segments, regions, provider evidence and the agreed prompt matrix."
          }
        ],
        "ctaTitle": "See which recruitment firms AI recommends to employers",
        "ctaText": "Share your website, vacancy specialisms and permissioned proof. I will outline a targeted starting audit.",
        "request": "Recruitment agency GEO: executive search, volume hiring, role expertise, confidentiality and BMR."
      }
    }
  },
  {
    "id": 72,
    "slug": "consulting-firms-independent-experts",
    "group": "professional-services",
    "routes": {
      "ru": "/industries/consulting-firms-independent-experts/",
      "en": "/en/industries/consulting-firms-independent-experts/"
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
        "Как измеряется видимость и BMR",
        "Как проверять профессиональные услуги и доказательства"
      ],
      "en": [
        "BMR and AI recommendation measurement",
        "Evidence checks for professional services"
      ]
    },
    "sources": [
      {
        "href": "https://www.iso.org/standard/63501.html",
        "ru": "ISO 20700:2017: рекомендации по оказанию управленческих консультационных услуг",
        "en": "ISO 20700:2017 guidelines for management consultancy services"
      },
      {
        "href": "https://www.nalog.gov.ru/donline/",
        "ru": "ФНС: проверка юридических лиц, ИП и сведений ЕГРЮЛ/ЕГРИП",
        "en": "Russian Federal Tax Service: company and sole-trader verification"
      },
      {
        "href": "https://mintrud.gov.ru/docs/laws/130",
        "ru": "152-ФЗ: проверка прав на использование персональных данных в проектах",
        "en": "Federal Law 152-FZ: personal-data processing principles"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение консалтинговых компаний и независимых экспертов | GAEO.ru",
        "h1": "GEO-продвижение консалтинговых компаний и независимых экспертов",
        "description": "GEO для бизнес-консультантов: управленческий консалтинг, аудит процессов, компетенции экспертов, методики, этапы проектов и измерение рекомендаций BMR.",
        "eyebrow": "Профессиональные услуги / Консалтинг",
        "lead": "Собственник компании спрашивает нейросеть, кто сможет решить конкретную управленческую задачу. Я проверяю, какие консалтинговые фирмы и независимые эксперты попадают в ответы и можно ли подтвердить их специализацию, подход и реальные результаты.",
        "heroPoints": [
          "Интенты по управленческим задачам, а не только по названию профессии",
          "Проверка квалификации, методики и права раскрывать кейсы",
          "Разделение диагностики, рекомендаций и внедрения с последующим BMR"
        ],
        "problemTitle": "Почему формула «решаем любые задачи бизнеса» не помогает выбрать консультанта",
        "problemIntro": "Консалтинг отличается по предмету проекта и формату ответственности. Покупателю важно знать, что именно делает консультант и какой результат можно проверить.",
        "problems": [
          {
            "title": "Экспертность без области применения",
            "body": "Управленческие, операционные и финансовые задачи требуют разных компетенций. Обобщенное описание опыта не заменяет конкретных отраслей и типов решений."
          },
          {
            "title": "Не определен результат работы",
            "body": "Аналитический отчет, план изменений и сопровождение внедрения имеют разный состав. Нельзя обозначать их одним обещанием роста прибыли без исходных показателей и согласованной методики."
          },
          {
            "title": "Кейс без права на раскрытие",
            "body": "Показатели клиента и имя ответственного лица нельзя считать открытыми по умолчанию. Для публичной экспертизы нужны согласованные факты и различение роли консультанта и команды заказчика."
          }
        ],
        "scenarioTitle": "Какие вопросы задает бизнес при выборе консультанта",
        "scenarioIntro": "Примеры типовых запросов для самостоятельного начального GEO-замера. Конкретные компании в рекомендациях фиксируются только после проверки.",
        "columns": [
          "Вопрос заказчика",
          "Что проверять у консультанта",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто поможет производственной компании перестроить операционные процессы?",
            "Отраслевые ограничения, диагностика, состав команды, измеримые примеры с разрешением",
            "Создать материал об операционном консалтинге и границах ответственности"
          ],
          [
            "Как найти независимого эксперта для оценки бизнес-модели?",
            "Профиль эксперта, метод анализа, итоговые документы, условия независимости",
            "Сделать личную экспертизу проверяемой по авторским источникам"
          ],
          [
            "Кто проведет управленческий аудит сети магазинов?",
            "Модель оценки, охват объектов, работа с данными, формат итоговых рекомендаций",
            "Разделить аудит, стратегию и внедрение как разные услуги"
          ],
          [
            "Чем отличается стратегический консультант от исполнителя изменений?",
            "Состав работ, ответственность, этапы, участие клиента и критерии приемки",
            "Сопоставить договорные результаты по задачам клиента"
          ]
        ],
        "proofTitle": "Что может подтверждать компетенцию консультанта",
        "proofIntro": "ISO 20700:2017 дает рекомендации для организации управленческих консультационных услуг; это ориентир качества процесса, а не обязательный сертификат и не доказательство результатов конкретного эксперта. Статус юридического лица или ИП можно проверять по ФНС, а публичность клиентских сведений требует отдельного основания.",
        "checks": [
          "Имена экспертов, специализации, проверяемые квалификации и личные материалы по теме задачи",
          "Описание методики: что исследуется, какие данные нужны, что получает заказчик и как принимается работа",
          "Разрешенные кейсы с исходными условиями, периодом, ролью консультанта и ограничениями причинно-следственных выводов"
        ],
        "proofNote": "Описана методика GEO для профессионального консалтинга. Результат продвижения конкретной консалтинговой компании GAEO здесь не заявляется.",
        "workTitle": "Как выстрою GEO для консультанта или консалтинговой фирмы",
        "workIntro": "Отправная точка – задачи собственника и реальные критерии выбора консультанта. Только затем обновляются сайт и подтверждающие внешние материалы.",
        "steps": [
          {
            "title": "Матрица управленческих запросов",
            "body": "Разделяю интенты диагностики, стратегии, экспертизы и внедрения по масштабу бизнеса и отрасли."
          },
          {
            "title": "Карта компетенций и доказательств",
            "body": "Сверяю экспертов, методики, проекты, роль исполнителей, согласия на раскрытие и проверяемые документы."
          },
          {
            "title": "Страницы услуг и авторских материалов",
            "body": "Готовлю содержательные задания на специализации, методики, биографии, FAQ и публикации с примерами решения задачи."
          },
          {
            "title": "Контроль повторных рекомендаций",
            "body": "Сравниваю BMR по фиксированным вопросам и проверяю корректность приписанных консультанту компетенций и результатов."
          }
        ],
        "faq": [
          {
            "question": "Нужно ли консультанту показывать реальные клиентские кейсы?",
            "answer": "Полезно показывать подтвержденные проекты с разрешением на публикацию. Если разрешения нет, можно объяснять методику и общие сценарии без выдуманных имен и цифр."
          },
          {
            "question": "Должен ли любой консультант быть сертифицирован по ISO 20700?",
            "answer": "Нет. ISO 20700:2017 содержит рекомендации для управленческих консультационных услуг и не является универсальной обязательной сертификацией всех консультантов."
          },
          {
            "question": "Как показать личный бренд независимого эксперта?",
            "answer": "Через полную биографию, авторские материалы, узкие задачи, проверяемые квалификации и связанные сведения на независимых площадках."
          },
          {
            "question": "Можно ли гарантировать рост прибыли клиента после консультирования?",
            "answer": "Без доказанного механизма, исходных данных и согласованных условий такого обещания делать нельзя. GEO-замеры отдельно показывают динамику рекомендаций, а не автоматически финансовый эффект."
          },
          {
            "question": "Какие тарифы GAEO подходят консалтингу?",
            "answer": "Используются общие тарифы GAEO. Стоимость зависит от числа экспертов, специализаций, рынков и исходной видимости."
          }
        ],
        "ctaTitle": "Проверим, каких консультантов нейросети предлагают по твоей специализации",
        "ctaText": "Пришли ссылку на сайт, перечень реальных консультационных услуг и разрешенные доказательства опыта. Определю приоритетные вопросы для стартового аудита.",
        "request": "GEO для консалтинговой фирмы или независимого эксперта: проверяемая специализация, авторские материалы, методики, кейсы, BMR."
      },
      "en": {
        "title": "GEO for consulting firms and independent experts | GAEO",
        "h1": "GEO promotion for consulting firms and independent experts",
        "description": "GEO for management consultants and independent advisers: specialisms, expert identities, deliverables, authorised case evidence and AI visibility measurement.",
        "eyebrow": "Professional services / Consulting",
        "lead": "Business owners ask AI assistants who can solve a defined management problem. I review which consultants are recommended and whether their expertise, project approach and published results can be substantiated.",
        "heroPoints": [
          "Procurement prompts structured around business problems",
          "Verifiable individual expertise, methods and permitted case evidence",
          "Clear separation of diagnosis, recommendations and implementation"
        ],
        "problemTitle": "Why 'we solve every business problem' is weak evidence",
        "problemIntro": "Consulting engagements have different subject matter and responsibilities. Buyers need a credible statement of what the adviser does and what will be delivered.",
        "problems": [
          {
            "title": "Expertise has no bounded application",
            "body": "Operational, strategy and financial questions require distinct skills. A general background statement does not demonstrate experience in a specific industry or decision."
          },
          {
            "title": "Deliverables are undefined",
            "body": "A diagnostic report, transformation roadmap and hands-on implementation are different engagements. They should not be bundled into an unsupported profit-growth promise."
          },
          {
            "title": "Client evidence may be confidential",
            "body": "A client's metrics or identity are not public simply because an adviser worked on the project. Permission and accurate attribution of responsibilities are needed."
          }
        ],
        "scenarioTitle": "How businesses look for consultants in AI answers",
        "scenarioIntro": "These are example procurement questions for a future baseline, not recorded responses.",
        "columns": [
          "Buyer question",
          "Evidence to examine",
          "GEO task"
        ],
        "scenarios": [
          [
            "Who can redesign operations for a manufacturing company?",
            "Industry constraints, diagnosis method, team roles and authorised examples",
            "Explain operational advisory scope and implementation boundaries"
          ],
          [
            "Which independent expert can assess our business model?",
            "Named expert, analysis method, deliverables and independence terms",
            "Make attributable personal expertise visible"
          ],
          [
            "Who can conduct a management review for a retail chain?",
            "Assessment criteria, site coverage, data access and report structure",
            "Separate review, strategy and implementation services"
          ],
          [
            "How does a strategy adviser differ from an implementation partner?",
            "Responsibilities, phases, acceptance criteria and client contribution",
            "Publish specific engagement terms rather than broad outcomes"
          ]
        ],
        "proofTitle": "Evidence behind a credible consulting recommendation",
        "proofIntro": "ISO 20700:2017 provides guidance on management-consulting service delivery; it is not universal compulsory certification or proof of an individual adviser's success. Official business registries can help verify company identity, while publishing client information needs a proper basis.",
        "checks": [
          "Named practitioners, topic specialisms, verifiable qualifications and relevant authored work",
          "Work method: inputs, analytical process, deliverables, client participation and acceptance",
          "Permitted cases with initial conditions, timeframe, the consultant's actual role and attribution limits"
        ],
        "proofNote": "This is GAEO's proposed consulting-sector GEO method, not a claim of completed client GEO results.",
        "workTitle": "How a consulting GEO programme would run",
        "workIntro": "I start from business decision-maker questions and evaluate the evidence that would make a recommendation credible.",
        "steps": [
          {
            "title": "Measure management-problem prompts",
            "body": "Separate diagnosis, strategy, expert opinion and implementation requests by company size and industry."
          },
          {
            "title": "Verify practitioner evidence",
            "body": "Review biographies, methods, permissioned projects and each participant's actual role."
          },
          {
            "title": "Develop service and expert pages",
            "body": "Prepare briefs for distinct engagements, expert profiles, methodology articles and verifiable case descriptions."
          },
          {
            "title": "Recheck BMR and answer quality",
            "body": "Compare a fixed prompt matrix and flag unsupported service or outcome claims in AI answers."
          }
        ],
        "faq": [
          {
            "question": "Are named client cases essential for consulting GEO?",
            "answer": "Permissioned cases are useful, but detailed methods and authored evidence can also help. Never invent a client or use private information without an appropriate basis."
          },
          {
            "question": "Is ISO 20700 certification mandatory for every adviser?",
            "answer": "No. ISO 20700:2017 is guidance for management consultancy services, not a universal compulsory credential."
          },
          {
            "question": "How can an independent expert support a personal recommendation?",
            "answer": "Use a consistent professional biography, relevant authored work, bounded areas of competence and independently checkable references."
          },
          {
            "question": "Does visibility growth prove a client's profit increased?",
            "answer": "No. AI recommendation measures and financial outcomes are different metrics with different attribution requirements."
          },
          {
            "question": "How is consulting-sector GEO priced?",
            "answer": "GAEO's published plans apply. Scope depends on the number of experts, specialisms, markets and baseline prompts."
          }
        ],
        "ctaTitle": "Check which consultants AI recommends for your specific work",
        "ctaText": "Send your service pages, expert profiles and authorised case material. I will outline a focused audit.",
        "request": "Consulting GEO: independent expert identity, specialisms, delivery method, permissioned cases and BMR."
      }
    }
  },
  {
    "id": 74,
    "slug": "branding-marketing-agencies",
    "group": "professional-services",
    "routes": {
      "ru": "/industries/branding-marketing-agencies/",
      "en": "/en/industries/branding-marketing-agencies/"
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
        "Как измеряется видимость и BMR",
        "Как проверять профессиональные услуги и доказательства"
      ],
      "en": [
        "BMR and AI recommendation measurement",
        "Evidence checks for professional services"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_58968/2c4537e4796f6ff8b2736ed1b0d4fef08e14458e/",
        "ru": "38-ФЗ, ст. 18.1: требования к интернет-рекламе и учету рекламных данных",
        "en": "Federal Advertising Law 38-FZ, Article 18.1: online advertising transparency"
      },
      {
        "href": "https://www.nalog.gov.ru/donline/",
        "ru": "ФНС: проверка статуса и реквизитов юридического лица или ИП",
        "en": "Russian Federal Tax Service: business registry verification"
      },
      {
        "href": "https://www.iso.org/standard/63501.html",
        "ru": "ISO 20700:2017: пример методики фиксации результата профессиональных услуг",
        "en": "ISO 20700:2017: professional-service delivery guidance (consulting context)"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение брендинговых и маркетинговых агентств | GAEO.ru",
        "h1": "GEO-продвижение брендинговых и маркетинговых агентств",
        "description": "Продвижение брендинговых и маркетинговых агентств в нейросетях: стратегия бренда, дизайн, рекламные кампании, подтвержденные кейсы, специализации и BMR.",
        "eyebrow": "Профессиональные услуги / Брендинг и маркетинг",
        "lead": "Заказчик сравнивает агентства по конкретной работе: платформе бренда, фирменному стилю, исследованию аудитории или маркетингу с измеримыми показателями. Проверяю, каких подрядчиков нейросети рекомендуют и какие публичные доказательства поддерживают такой выбор.",
        "heroPoints": [
          "Разделение бренд-стратегии, дизайна и продвижения по задачам заказчика",
          "Проверка авторства портфолио, бюджета, периода и роли команды",
          "Контроль BMR и корректности рекомендаций по специализациям"
        ],
        "problemTitle": "Почему красивое портфолио не равно доказательству результата агентства",
        "problemIntro": "Презентация может показывать известный бренд, но не объяснять, что именно сделало агентство и на каких условиях. Для нейросетей нужны корректные связи между услугой, исполнителем и проверяемыми работами.",
        "problems": [
          {
            "title": "Смешаны направления маркетинга",
            "body": "Бренд-платформа, нейминг, упаковка, медиапланирование и performance-маркетинг имеют разные результаты. Название «маркетинговое агентство полного цикла» не заменяет отдельные компетенции."
          },
          {
            "title": "Метрики не имеют базы сравнения",
            "body": "Охват, конверсия, лиды и финансовая отдача относятся к разным задачам. Цифры без периода, бюджета, атрибуции и роли агентства вводят заказчика в заблуждение."
          },
          {
            "title": "Случайное приписывание клиентского бренда",
            "body": "Работа субподрядчика, участие в тендере и полноценное ведение кампании не одно и то же. Нельзя утверждать авторство чужого кейса или раскрывать закрытые результаты."
          }
        ],
        "scenarioTitle": "Вопросы заказчиков о выборе брендингового и маркетингового подрядчика",
        "scenarioIntro": "Это планируемые запросы для измерения нейровидимости, а не утверждения о реально полученных рекомендациях.",
        "columns": [
          "Вопрос маркетинг-директора",
          "Что проверяем",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Кто разработает бренд-платформу для нового B2B-продукта?",
            "Позиционирование, интервью, исследование аудитории, состав результата и авторство проекта",
            "Выделить бренд-стратегию и исследование как отдельные предложения"
          ],
          [
            "Как выбрать агентство по дизайну упаковки косметики?",
            "Категории товаров, стадии дизайна, права на макеты, требования к упаковке",
            "Соединить отраслевые кейсы с конкретными дизайнерскими задачами"
          ],
          [
            "Какая команда может вести performance-рекламу для интернет-магазина?",
            "Каналы, бюджеты, модель измерения, исключения, договорные обязанности",
            "Показать воспроизводимую отчетность без гарантий произвольного ROI"
          ],
          [
            "Кому поручить ребрендинг сети из нескольких регионов?",
            "Архитектура брендов, внедрение на носителях, состав команды, сроки и география",
            "Раскрыть масштаб проекта и проверяемую роль исполнителя"
          ]
        ],
        "proofTitle": "Какие сведения помогают оценить агентство и его кейсы",
        "proofIntro": "Проверяю первичные материалы о проекте, разрешение использовать бренд клиента и реальную роль исполнителя. Статья 18.1 закона №38-ФЗ регулирует размещение и учет интернет-рекламы при наличии применимых условий, но сама по себе не подтверждает эффективность агентства или конкретной кампании.",
        "checks": [
          "Тип услуги и результат: бренд-платформа, дизайн-система, исследование, креатив, размещение или управление рекламой",
          "Роль команды в проекте, согласованные примеры, исходные данные, период, бюджеты и корректные ограничения атрибуции",
          "Доступные авторские материалы, эксперты, способ приемки, права на работы и ответственность за рекламу при применимости"
        ],
        "proofNote": "Описана методика продвижения профессиональных агентств в ответах нейросетей. Конкретные результаты GEO-продвижения агентств GAEO здесь не приписываются.",
        "workTitle": "Как построю GEO для брендингового или маркетингового агентства",
        "workIntro": "Сначала определяем, по каким задачам заказчик выбирает подрядчика, и какие подтверждения объясняют профессиональное отличие агентства.",
        "steps": [
          {
            "title": "Сегментация запросов и стартовый BMR",
            "body": "Разделяю бренд-стратегию, дизайн, исследование, рекламные услуги и отраслевые запросы покупателей."
          },
          {
            "title": "Аудит портфолио и специализаций",
            "body": "Проверяю авторство работ, права на публикацию, состав услуг, реальные компетенции и подтвержденные показатели."
          },
          {
            "title": "Отраслевые страницы и авторская фактура",
            "body": "Составляю ТЗ на отдельные страницы услуг, описания проектов, роли команды, методики и внешние экспертные материалы."
          },
          {
            "title": "Повторные замеры и контроль утверждений",
            "body": "Измеряю динамику BMR на тех же запросах и проверяю, корректно ли нейросети описывают специализацию агентства."
          }
        ],
        "faq": [
          {
            "question": "Нужна ли отдельная страница для брендинга и для performance-рекламы?",
            "answer": "Да, если это реально самостоятельные услуги. Заказчики сравнивают разные критерии результата, а общий список услуг не раскрывает методику и специализацию."
          },
          {
            "question": "Можно ли использовать логотип клиента в портфолио агентства?",
            "answer": "Перед публикацией необходимо проверить права, договор и согласие на использование конкретных материалов. Само участие в проекте не означает автоматического разрешения."
          },
          {
            "question": "Подходит ли рост лидов как универсальная метрика качества брендинга?",
            "answer": "Нет. У бренд-стратегии, дизайна и медийной кампании разные задачи и горизонты. Финансовые показатели показывают только с подтвержденным периодом и методом атрибуции."
          },
          {
            "question": "Нужно ли учитывать маркировку рекламы в GEO-контенте?",
            "answer": "Маркировка регулируется по фактическому рекламному размещению и его правовому статусу. Нельзя автоматически объявлять любой экспертный материал рекламой или освобожденным от требований."
          },
          {
            "question": "Сколько стоит GEO-продвижение маркетингового агентства?",
            "answer": "Действуют общие тарифы GAEO. Объем определяется услугами, отраслевыми компетенциями, количеством экспертов и стартовым замером."
          }
        ],
        "ctaTitle": "Узнаем, кому нейросети рекомендуют поручить брендинг и маркетинг",
        "ctaText": "Пришли сайт, реальные направления агентства, публичные проекты и сведения об авторах работ. Я предложу первую матрицу запросов.",
        "request": "GEO для брендингового и маркетингового агентства: специализации, портфолио, подтверждения работ, маркетинговые метрики и BMR."
      },
      "en": {
        "title": "GEO for branding and marketing agencies | GAEO",
        "h1": "GEO promotion for branding and marketing agencies",
        "description": "GEO for branding, design and marketing agencies: service specialisms, approved portfolios, project attribution, campaign evidence and measurable AI recommendations.",
        "eyebrow": "Professional services / Branding and marketing",
        "lead": "Clients compare agencies for a specific assignment: brand strategy, identity design, audience research or measurable marketing execution. I examine which providers AI recommends and whether the recommendation is supported by credible public work.",
        "heroPoints": [
          "Separate brand strategy, design and media execution by buyer question",
          "Check portfolio permissions, team contributions and metric definitions",
          "Measure BMR and the accuracy of service-specific AI answers"
        ],
        "problemTitle": "Why a polished portfolio is not sufficient evidence",
        "problemIntro": "A project can feature a famous client brand without explaining what the agency actually delivered. AI answers require reliable links between the buyer's task, the service and the attributable work.",
        "problems": [
          {
            "title": "Different disciplines are bundled",
            "body": "Naming, brand platform, packaging design, media planning and performance marketing do not produce the same deliverable. A full-service claim needs service-specific evidence."
          },
          {
            "title": "Metrics have no comparable baseline",
            "body": "Reach, leads, conversion and commercial return answer different questions. Figures without a period, budget, attribution method or agency responsibility may mislead buyers."
          },
          {
            "title": "Client work is over-attributed",
            "body": "Subcontracting, a pitch proposal and running a complete campaign are different roles. Portfolio presentation needs correct permission and clear contribution."
          }
        ],
        "scenarioTitle": "Agency-selection questions asked through AI assistants",
        "scenarioIntro": "These are proposed prompts for a baseline study, not assertions about observed recommendations.",
        "columns": [
          "Marketing buyer question",
          "Evidence to verify",
          "GEO task"
        ],
        "scenarios": [
          [
            "Who can create a brand platform for a new B2B product?",
            "Research approach, positioning deliverable, actual project authorship",
            "Build a distinct brand-strategy service explanation"
          ],
          [
            "Which studio has relevant cosmetics-packaging design experience?",
            "Product category, design stages, rights and sector-specific constraints",
            "Connect permitted examples to the design decision"
          ],
          [
            "Who can manage performance advertising for an online retailer?",
            "Channels, budget scope, measurement model and responsibility",
            "Present verifiable campaign methodology without invented ROI"
          ],
          [
            "Who can rebrand a multi-region retail network?",
            "Brand architecture, rollout work, team composition and agreed scope",
            "Explain supported scale and the provider's precise contribution"
          ]
        ],
        "proofTitle": "Evidence behind an agency recommendation",
        "proofIntro": "I verify original project materials, the right to reference client brands and the provider's actual role. Article 18.1 of Russian Advertising Law 38-FZ covers online advertising reporting and labelling when its conditions apply; it does not establish a campaign's effectiveness.",
        "checks": [
          "Service and deliverable: brand platform, identity, research, creative production, media or ad management",
          "Permissioned portfolio examples, baseline, dates, budget context and attribution boundaries",
          "Named specialists, authored methodology, acceptance criteria, use rights and applicable advertising responsibilities"
        ],
        "proofNote": "This is a sector-specific GEO method, not a claim of measured GAEO results for marketing agency clients.",
        "workTitle": "How I would organise GEO for a branding or marketing agency",
        "workIntro": "First separate what a buyer is commissioning, then check which evidence supports each service.",
        "steps": [
          {
            "title": "Baseline by agency service",
            "body": "Record unbranded prompts for strategy, design, research, advertising and sector-specific work."
          },
          {
            "title": "Review portfolios and specialist evidence",
            "body": "Check permitted project claims, authorship, methodology, available figures and specialist identities."
          },
          {
            "title": "Build service and case content",
            "body": "Prepare briefs for distinct services, attributable cases, team profiles and original industry commentary."
          },
          {
            "title": "Recheck BMR and claim accuracy",
            "body": "Repeat the prompt matrix and review whether AI accurately describes the agency's real capabilities."
          }
        ],
        "faq": [
          {
            "question": "Should branding and performance marketing have separate pages?",
            "answer": "Yes, when both are genuine services. Buyer expectations and proof differ, so they benefit from distinct descriptions and examples."
          },
          {
            "question": "Can an agency publish a client's logo?",
            "answer": "Check the contract, permissions and applicable rights first. Participation in a project does not automatically permit promotional use."
          },
          {
            "question": "Are leads a universal branding-success metric?",
            "answer": "No. Brand, design and advertising projects use different measures and timescales. Commercial attribution requires a documented method."
          },
          {
            "question": "Does online advertising labelling apply to every expert article?",
            "answer": "It depends on whether the actual placement qualifies as advertising under applicable rules. Do not assume all expert writing is advertising or exempt."
          },
          {
            "question": "How does GAEO price marketing-agency GEO?",
            "answer": "Published GAEO plans apply. Scope depends on real service lines, specialist profiles, industries and baseline prompts."
          }
        ],
        "ctaTitle": "Find out which agencies AI recommends for branding and marketing",
        "ctaText": "Share your services, approved work samples and team evidence. I will suggest the initial buyer-question set.",
        "request": "Branding and marketing agency GEO: services, project attribution, campaign evidence, specialists and BMR."
      }
    }
  }
];
