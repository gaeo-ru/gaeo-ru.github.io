/**
 * Phase 2AD: ophthalmology (#62), plastic surgery (#63) and fertility (#64).
 * Original, clinically distinct RU/EN service content, based on verified regulation.
 * Evidence is not a claim of a patient outcome or previous GAEO healthcare client.
 * Catalogue IDs, images, shared pricing and BMR contractual targets are unchanged.
 */
export const industrySpecializationsBatch2AD = [
  {
    "id": 62,
    "slug": "ophthalmology-clinics",
    "group": "medical-care",
    "routes": {
      "ru": "/industries/ophthalmology-clinics/",
      "en": "/en/industries/ophthalmology-clinics/"
    },
    "parent": {
      "ru": "/industries/medical-care-providers/",
      "en": "/en/industries/medical-care-providers/"
    },
    "parentLabels": {
      "ru": "GEO для медицинских организаций",
      "en": "GEO for healthcare providers"
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
        "Методика измерения BMR"
      ],
      "en": [
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: реестр медицинских лицензий и состав разрешенных работ",
        "en": "Roszdravnadzor: medical licence register and authorised service scope"
      },
      {
        "href": "https://base.garant.ru/413139055/",
        "ru": "Приказ Минздрава №633н: порядок офтальмологической помощи взрослым с 1 февраля 2026 года",
        "en": "Health Ministry Order 633n: adult ophthalmology care rules effective February 2026"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/0b1cadf39ebeb0f1fed2ef0b8ebab5973197d7f1/",
        "ru": "323-ФЗ, статья 20: информированное добровольное согласие",
        "en": "Federal Healthcare Act 323-FZ, Article 20: informed consent"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение офтальмологических клиник в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение офтальмологических клиник",
        "description": "Продвижение офтальмологических клиник в ChatGPT, Алисе и других нейросетях: диагностика зрения, хирургия, врачи, лицензии, цены и BMR.",
        "eyebrow": "Медицина / Офтальмология",
        "lead": "Пациенты сравнивают центры коррекции зрения, лечения катаракты и диагностики сетчатки по разным вопросам. Я исследую, какие клиники нейросети рекомендуют по каждому направлению, и проверяю, подтверждаются ли сведения об услугах, врачах, лицензиях и местах приема.",
        "heroPoints": [
          "Матрица небрендовых запросов по заболеваниям и видам помощи",
          "Сверка диагностики, операций, адресов и специалистов",
          "Раздельный учет исходного BMR и последующих рекомендаций"
        ],
        "problemTitle": "Почему одна страница «лечение зрения» плохо объясняет специализацию клиники",
        "problemIntro": "Человек, ищущий обследование при глаукоме, и кандидат на лазерную коррекцию зрения оценивают разные процедуры, риски и критерии выбора.",
        "problems": [
          {
            "title": "Диагностика смешана с хирургией",
            "body": "Обследование зрения, лечение катаракты, вмешательства на сетчатке и лазерная коррекция имеют разные показания, этапы и условия. Перечень методов не подтверждает, что они доступны в конкретном филиале."
          },
          {
            "title": "Цена не раскрывает состав услуги",
            "body": "В прайсе может быть указана консультация или отдельная манипуляция, тогда как обследование, операция и послеоперационное наблюдение оплачиваются по разным условиям. Нельзя автоматически считать опубликованную сумму полной стоимостью лечения."
          },
          {
            "title": "Врач и адрес не связаны с услугой",
            "body": "Публичная биография врача и лицензия организации не доказывают наличие оборудования, операционной или приема у нужного специалиста в выбранный день и по конкретному адресу."
          }
        ],
        "scenarioTitle": "Какие вопросы пациентов измерять для офтальмологических клиник",
        "scenarioIntro": "Это примеры запросов для будущего замера. Они не являются результатами уже проведенного исследования нейросетей.",
        "columns": [
          "Вопрос пациента",
          "Что требуется подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где пройти обследование сетчатки с заключением офтальмолога?",
            "Методы диагностики, оборудование, врач, филиал, правила выдачи заключения",
            "Связать услугу, врача и доступную локацию с проверяемыми данными"
          ],
          [
            "Как выбрать клинику для операции по поводу катаракты?",
            "Виды вмешательства, обследование до операции, квалификация и условия наблюдения",
            "Раскрыть этапы выбора без обещания конкретного медицинского исхода"
          ],
          [
            "Какие центры делают лазерную коррекцию зрения в моем городе?",
            "Наличие услуги по адресу, методы, критерии записи, цены и ограничения",
            "Разграничить консультацию, обследование и хирургическую услугу"
          ],
          [
            "Где наблюдаться при глаукоме и как записаться на прием?",
            "Врачебный профиль, диагностика, частота доступных приемов и каналы записи",
            "Проверить точность географических и организационных рекомендаций"
          ]
        ],
        "proofTitle": "Как проверить офтальмологические услуги перед публикацией",
        "proofIntro": "Сверяю лицензируемые работы по адресу, врачебные сведения и подтвержденный состав услуг. Приказ Минздрава №633н регулирует порядок офтальмологической помощи взрослым с февраля 2026 года; он не является оценкой качества конкретной клиники. Информированное согласие относится к медицинскому вмешательству, а не к GEO-продвижению.",
        "checks": [
          "Лицензия и виды работ по конкретному месту оказания помощи, врачебная специализация и действующие контактные данные",
          "Реальный перечень обследований и операций, оборудование, подготовка, возможные ограничения и стоимость по этапам",
          "Проверяемые документы, согласованные отзывы без раскрытия данных пациентов, корректные сведения о врачах и расписании"
        ],
        "proofNote": "Здесь описана методика GEO для отрасли. Клиентский результат GAEO в офтальмологии или медицинский эффект конкретной процедуры не заявляется.",
        "workTitle": "Как организую GEO-продвижение офтальмологической клиники",
        "workIntro": "Сначала разделяю сценарии диагностики, планового лечения и хирургии. По ним измеряю рекомендации и выявляю источники неточных сведений.",
        "steps": [
          {
            "title": "Исходный BMR по видам помощи",
            "body": "Фиксирую небрендовые вопросы о диагностике, катаракте, рефракционной хирургии и наблюдении, отдельно по городам."
          },
          {
            "title": "Сверка медицинских фактов",
            "body": "Сопоставляю адреса, виды лицензируемых работ, услуги, врачей, состав цены и допущенные к публикации сведения."
          },
          {
            "title": "Экспертные страницы и источники",
            "body": "Готовлю ТЗ для страниц направлений, реальных врачей, филиалов, методов обследования и подтвержденных ответов на вопросы."
          },
          {
            "title": "Повторные измерения",
            "body": "Сопоставляю рекомендации на исходном наборе вопросов, BMR и источники, отмечаю ошибочные рекомендации по процедуре или адресу."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать диагностику и офтальмохирургию вместе?",
            "answer": "Да, если на сайте и в измерениях разграничены обследования и хирургические вмешательства. Для каждого направления нужны собственные условия, врачебные сведения и подтверждение доступности."
          },
          {
            "question": "Достаточно ли указать офтальмологическую лицензию?",
            "answer": "Нет. Нужно проверить виды работ по адресу и сопоставить их с фактически предлагаемыми процедурами. Общая лицензия не подменяет подтверждение каждой услуги."
          },
          {
            "question": "Можно ли публиковать процент успешных операций?",
            "answer": "Только с четким определением результата, периода, состава пациентов, методики учета и разрешением на использование данных. Универсальную гарантию восстановления зрения заявлять нельзя."
          },
          {
            "question": "Стоит ли ставить диагноз в ответе нейросети?",
            "answer": "Нет. GEO помогает описывать доступные услуги и условия обращения. Медицинские показания, диагноз и выбор метода лечения определяются врачом."
          },
          {
            "question": "Сколько стоит GEO-продвижение офтальмологической клиники?",
            "answer": "Действуют общие тарифы GAEO. Объем зависит от числа направлений, городов, филиалов и стартовой матрицы запросов."
          }
        ],
        "ctaTitle": "Проверить рекомендации нейросетей об офтальмологической клинике",
        "ctaText": "Пришли сайт клиники, перечень направлений, адреса, лицензируемые работы и ссылки на врачей. Составлю исходную матрицу запросов.",
        "request": "GEO офтальмологической клиники: диагностика, операции, врачи, лицензия, филиалы, условия записи и BMR."
      },
      "en": {
        "title": "GEO for ophthalmology and eye surgery clinics | GAEO.ru",
        "h1": "GEO for ophthalmology clinics and eye-care centres",
        "description": "GEO for eye-care providers: eye examinations, cataract treatment, refractive surgery, verified clinicians, licensed locations, fees and AI recommendations.",
        "eyebrow": "Healthcare / Ophthalmology",
        "lead": "Patients ask AI assistants about eye examinations, cataract surgery and retinal services for different reasons. I investigate which clinics are recommended for each need and whether their procedures, clinical staff, licensed locations and appointment information are supported by evidence.",
        "heroPoints": [
          "Unbranded prompt groups for distinct eye-care services",
          "Checks for diagnosis-related services, surgery and provider locations",
          "Baseline BMR separated from subsequent recommendation changes"
        ],
        "problemTitle": "Why a single generic eye-treatment page is not enough",
        "problemIntro": "A person seeking glaucoma monitoring and someone considering refractive surgery need distinct medical information and different service comparisons.",
        "problems": [
          {
            "title": "Examinations are confused with surgery",
            "body": "Retinal diagnostics, cataract surgery, laser vision correction and routine consultations have different indications, settings and care stages. A procedure mentioned on a website may not be available at every location."
          },
          {
            "title": "Headline fees omit clinical stages",
            "body": "A consultation price may exclude preoperative tests, the procedure and follow-up. Without a defined scope it is misleading to present it as the total treatment fee."
          },
          {
            "title": "Clinician and location facts are detached",
            "body": "A clinician biography and an organisation's licence do not by themselves establish operating facilities, equipment or appointment availability at a particular address."
          }
        ],
        "scenarioTitle": "Patient questions to test in eye-care GEO",
        "scenarioIntro": "The prompts below are candidates for a baseline study, not evidence of already observed AI answers.",
        "columns": [
          "Patient question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I get a retinal examination with an ophthalmologist's report?",
            "Available tests, equipment, specialists, branch and reporting conditions",
            "Connect the examination and clinician with the right location"
          ],
          [
            "How should I compare clinics for cataract surgery?",
            "Consultation, surgical pathway, clinician qualifications and post-operative follow-up",
            "Explain stages and limits without promising a clinical outcome"
          ],
          [
            "Which local clinics offer laser vision correction?",
            "Specific services at the site, approach, booking conditions and staged fees",
            "Separate assessment, eligibility and surgical availability"
          ],
          [
            "Where can I book glaucoma follow-up?",
            "Professional focus, diagnostic methods, location and booking options",
            "Correct outdated location and appointment references"
          ]
        ],
        "proofTitle": "Evidence required for ophthalmology provider claims",
        "proofIntro": "I check medical service scope, clinician details and the availability of individual procedures. Russian Health Ministry Order 633n governs adult ophthalmology care from February 2026; it does not endorse a clinic. Medical consent and clinical decisions remain separate from marketing work.",
        "checks": [
          "Authorised activities and location, relevant clinicians and reliable contact details",
          "Available examinations and procedures, preparation, service boundaries and actual staged fees",
          "Permissioned evidence, up-to-date physician profiles, truthful scheduling and patient confidentiality"
        ],
        "proofNote": "This is an industry GEO approach, not a claim of completed GAEO ophthalmology work or patient outcomes.",
        "workTitle": "How I would structure ophthalmology GEO",
        "workIntro": "The baseline separates examinations, routine treatment and surgery, then compares the sources behind AI recommendations.",
        "steps": [
          {
            "title": "Baseline by eye-care intent",
            "body": "Record unbranded prompts for examinations, cataract procedures, refractive surgery and follow-up in relevant cities."
          },
          {
            "title": "Verify clinical information",
            "body": "Review licensed work, service locations, clinician profiles, actual procedures, fees and approved data."
          },
          {
            "title": "Develop reference pages",
            "body": "Specify content for departments, real staff, locations, clinical pathways and accurate patient-facing FAQ."
          },
          {
            "title": "Repeat the same prompts",
            "body": "Compare BMR, citations and errors, especially wrong procedures or locations."
          }
        ],
        "faq": [
          {
            "question": "Can diagnostic services and eye surgery share one GEO programme?",
            "answer": "Yes, but the pages, intent groups and evidence need to distinguish examinations and surgical procedures. Each service has its own clinical and location constraints."
          },
          {
            "question": "Does an ophthalmology licence prove every service is offered?",
            "answer": "No. Check the authorised activities at each address and the organisation's verified service list; the existence of a licence is not proof of availability or outcomes."
          },
          {
            "question": "Can a clinic advertise a successful-surgery rate?",
            "answer": "Only with transparent definitions, cohort, period, method and permission to use the figures. A guaranteed individual vision result must not be inferred."
          },
          {
            "question": "Will AI decide which treatment a patient needs?",
            "answer": "No. GEO concerns accurate provider descriptions and comparison. Diagnosis and treatment selection belong to qualified clinicians."
          },
          {
            "question": "What does GAEO charge an ophthalmology clinic?",
            "answer": "The published GAEO tariffs apply. The audit depends on treatment areas, sites, markets and the initial prompt matrix."
          }
        ],
        "ctaTitle": "Assess how AI assistants recommend your eye-care centre",
        "ctaText": "Share your clinic URL, treatment departments, locations and authorised services to define a useful baseline audit.",
        "request": "Ophthalmology clinic GEO: eye examinations, surgery, clinicians, licences, locations, fees and BMR."
      }
    }
  },
  {
    "id": 63,
    "slug": "plastic-surgery-clinics",
    "group": "medical-care",
    "routes": {
      "ru": "/industries/plastic-surgery-clinics/",
      "en": "/en/industries/plastic-surgery-clinics/"
    },
    "parent": {
      "ru": "/industries/medical-care-providers/",
      "en": "/en/industries/medical-care-providers/"
    },
    "parentLabels": {
      "ru": "GEO для медицинских организаций",
      "en": "GEO for healthcare providers"
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
        "Методика измерения BMR"
      ],
      "en": [
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: реестр медицинских лицензий и состав разрешенных работ",
        "en": "Roszdravnadzor: medical licence register and authorised service scope"
      },
      {
        "href": "https://72reg.roszdravnadzor.ru/medactivities/statecontrol/standards/documents/53072",
        "ru": "Росздравнадзор: приказ Минздрава №298н, порядок помощи по пластической хирургии",
        "en": "Roszdravnadzor: Health Ministry Order 298n, plastic surgery care rules"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/0b1cadf39ebeb0f1fed2ef0b8ebab5973197d7f1/",
        "ru": "323-ФЗ, статья 20: информированное добровольное согласие",
        "en": "Federal Healthcare Act 323-FZ, Article 20: informed consent"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение клиник пластической хирургии в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение клиник пластической хирургии",
        "description": "GEO для клиник пластической хирургии: эстетические и реконструктивные операции, хирургическая квалификация, лицензии, безопасность сведений и BMR.",
        "eyebrow": "Медицина / Пластическая хирургия",
        "lead": "Пациенты сравнивают хирургов и медицинские организации по конкретной операции, специализации, условиям стационара и прозрачности этапов лечения. Я проверяю рекомендации нейросетей и источники, которые могут неверно смешивать пластическую хирургию с косметологией или обещать одинаковый результат всем.",
        "heroPoints": [
          "Отдельные запросы на эстетическую и реконструктивную хирургию",
          "Проверка квалификации, лицензии, условий операции и наблюдения",
          "Контроль доказательности результатов и прав на изображения"
        ],
        "problemTitle": "Почему фотографии «до и после» не заменяют проверку хирургической услуги",
        "problemIntro": "Портфолио привлекает внимание, но пациенту нужны точные сведения о виде вмешательства, враче, подготовке и последующем наблюдении.",
        "problems": [
          {
            "title": "Хирургия смешана с косметологией",
            "body": "Инъекционная косметология, реконструктивная операция и эстетическая пластика относятся к разным вмешательствам. Общие рекламные формулировки могут скрывать реальные лицензируемые работы и условия проведения."
          },
          {
            "title": "Визуальные результаты без контекста",
            "body": "Фото «до и после» зависят от периода после операции, ракурса и индивидуальных особенностей. Для использования изображений нужны необходимые согласия и проверка отсутствия вводящих в заблуждение обещаний."
          },
          {
            "title": "Неполная стоимость лечения",
            "body": "Цена самой операции может не включать консультацию, обследование, анестезию и стационар. Эти позиции следует описывать по подтвержденному прайсу и условиям конкретной клиники."
          }
        ],
        "scenarioTitle": "По каким вопросам выбирают клинику пластической хирургии",
        "scenarioIntro": "Примеры предназначены для исследования спроса. Они не сообщают, что нейросети уже рекомендуют определенные клиники.",
        "columns": [
          "Вопрос пациента",
          "Что нужно подтвердить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где найти пластического хирурга по реконструктивной хирургии?",
            "Подтвержденная специализация, тип операций, врач и место выполнения",
            "Развести реконструктивные направления и эстетические предложения"
          ],
          [
            "Как сравнить клиники для конкретной эстетической операции?",
            "Фактический перечень услуг, консультация, хирург, стационар и условия наблюдения",
            "Опубликовать проверяемую последовательность медицинских этапов"
          ],
          [
            "Какие условия анестезии и послеоперационного наблюдения предоставляет клиника?",
            "Подтвержденная информация об анестезиологическом обеспечении и месте ухода",
            "Не подменять требования общими заявлениями о безопасности"
          ],
          [
            "Из чего складывается цена операции и что оплачивается отдельно?",
            "Актуальный прайс, обследования, анестезия, стационар и договор",
            "Показывать состав стоимости и границы каждого предложения"
          ]
        ],
        "proofTitle": "Какие сведения можно использовать как доказательство специализации",
        "proofIntro": "Сверяю виды работ по лицензии и действующие условия проведения вмешательств. Приказ Минздрава №298н определяет порядок помощи по профилю пластической хирургии; соблюдение конкретной клиникой нельзя вывести из ссылки на приказ. Для медицинских вмешательств также действуют требования информированного согласия по статье 20 закона №323-ФЗ.",
        "checks": [
          "Лицензируемые работы по адресу, сведения о профильных хирургах, порядке консультации и реальных условиях операции",
          "Структура предлагаемой услуги: обследования, анестезия, стационар, сроки визитов, прозрачность состава цены",
          "Допустимые кейсы и изображения с подтвержденными согласиями, датами, без обещаний гарантированного внешнего результата"
        ],
        "proofNote": "Материал представляет отраслевую GEO-методику. GAEO не заявляет выполненные операции, медицинские результаты клиентов или успешный кейс GEO для этой специализации.",
        "workTitle": "Как организую GEO для пластической хирургии",
        "workIntro": "Разделяю матрицу запросов по типам вмешательств и ожиданиям пациентов, затем проверяю факты на сайте и во внешних источниках.",
        "steps": [
          {
            "title": "Стартовая матрица BMR",
            "body": "Фиксирую отдельные запросы на эстетические и реконструктивные направления, географию и выбор врача."
          },
          {
            "title": "Проверка доказательств",
            "body": "Сверяю хирургические услуги, лицензии, врачей, фото, состав стоимости и разрешения на публикацию."
          },
          {
            "title": "Страницы врача и процедур",
            "body": "Готовлю ТЗ на документируемые направления, фактические условия, биографии и пациентские вопросы без медицинских гарантий."
          },
          {
            "title": "Повторный контроль",
            "body": "Сравниваю BMR и источники, отдельно отмечаю некорректные обещания о результатах и ошибочную связь врача с клиникой."
          }
        ],
        "faq": [
          {
            "question": "Можно ли объединить пластическую хирургию и косметологию в одном разделе?",
            "answer": "Навигация может быть общей, но услуги и квалификация должны различаться. Хирургические вмешательства нельзя описывать как косметологическую процедуру без проверки применимых требований."
          },
          {
            "question": "Можно ли использовать фотографии «до и после» для GEO?",
            "answer": "Только при законных основаниях использования изображения и медицинских сведений, проверке прав и корректности контекста. Фото отдельного пациента не гарантирует аналогичный результат другим."
          },
          {
            "question": "Можно ли обещать отсутствие осложнений?",
            "answer": "Нет. Сведения о рисках и предполагаемых результатах относятся к медицинскому информированию и консультации. Рекламная страница не должна заменять их гарантией."
          },
          {
            "question": "Что проверять в опубликованной цене операции?",
            "answer": "Состав оплачиваемых услуг: консультации, обследования, анестезия, пребывание и наблюдение. Сравнивать стоимость без одинакового состава некорректно."
          },
          {
            "question": "Какая цена GEO-продвижения пластической хирургии?",
            "answer": "Применяются опубликованные тарифы GAEO. Стоимость зависит от направлений операций, специалистов, локаций и числа измеряемых вопросов."
          }
        ],
        "ctaTitle": "Узнать, как нейросети сравнивают клиники пластической хирургии",
        "ctaText": "Пришли сайт, перечень операций, лицензии, врачебные профили и правила использования портфолио. Проверю первые сценарии рекомендаций.",
        "request": "GEO пластической хирургии: эстетика, реконструкция, хирург, лицензии, цены, портфолио и BMR."
      },
      "en": {
        "title": "GEO for plastic surgery and reconstructive clinics | GAEO",
        "h1": "GEO for plastic surgery clinics",
        "description": "Plastic surgery GEO: aesthetic and reconstructive procedures, surgeon credentials, licensed services, consultation pathways and measurable AI recommendations.",
        "eyebrow": "Healthcare / Plastic surgery",
        "lead": "People compare plastic surgeons and clinics for a defined procedure, clinician expertise, surgical setting and the steps before and after treatment. I examine AI recommendations and their sources, checking whether surgical services are confused with cosmetic treatments or individual outcomes are overstated.",
        "heroPoints": [
          "Separate aesthetic and reconstructive surgery intent groups",
          "Verifiable surgeon, licensing and care-setting information",
          "Careful handling of patient photographs and outcome claims"
        ],
        "problemTitle": "Why before-and-after pictures cannot establish surgical quality",
        "problemIntro": "Images may be useful context, but provider selection also involves the procedure, qualifications, clinical setting and aftercare.",
        "problems": [
          {
            "title": "Surgery and cosmetology are conflated",
            "body": "Cosmetic injections, reconstructive procedures and elective plastic surgery involve different services and care requirements. Broad advertising labels can obscure the actual authorised activity."
          },
          {
            "title": "Photographic outcomes lack context",
            "body": "Before-and-after images vary with timing, camera angle and personal characteristics. Their use requires permission and scrutiny for misleading generalisations."
          },
          {
            "title": "Published prices omit stages",
            "body": "The surgical fee may not cover assessment, tests, anaesthesia, inpatient care and follow-up. These should be described according to the provider's actual terms."
          }
        ],
        "scenarioTitle": "Questions used to compare plastic surgery providers",
        "scenarioIntro": "These are proposed audit prompts, not examples of already verified AI recommendations.",
        "columns": [
          "Patient question",
          "Evidence needed",
          "GEO action"
        ],
        "scenarios": [
          [
            "Which plastic surgeon specialises in a particular reconstructive procedure?",
            "Surgeon credentials, verified procedure scope and operating location",
            "Distinguish reconstructive care from general aesthetic offers"
          ],
          [
            "How can I compare clinics for an aesthetic procedure?",
            "Procedure, examination, surgeon, surgical setting and aftercare",
            "Explain the stages without generalising outcomes"
          ],
          [
            "What anaesthesia and follow-up care does the clinic provide?",
            "Accurate facilities, specialist roles and follow-up arrangements",
            "Replace vague safety promises with supported service information"
          ],
          [
            "What is included in the surgical fee?",
            "Current price components, testing, anaesthesia, admission and contract",
            "Clarify inclusions, exclusions and stages"
          ]
        ],
        "proofTitle": "Evidence to verify before claiming a plastic surgery specialty",
        "proofIntro": "I assess licensed services, clinician profiles and the actual setting for each intervention. Russian Health Ministry Order 298n governs plastic surgery care; citing it does not prove a particular clinic is compliant. Informed consent requirements under Healthcare Act 323-FZ remain separate from promotional copy.",
        "checks": [
          "Authorised work at each site, qualified surgeons, consultation pathways and operating conditions",
          "Procedure scope, assessment, anaesthesia, inpatient arrangements, follow-up and transparent prices",
          "Lawful and permissioned photographs, accurate dates, suitable descriptions and no guaranteed outcome claims"
        ],
        "proofNote": "This sector GEO methodology does not assert GAEO client performance in plastic surgery or any clinical treatment result.",
        "workTitle": "How I would run plastic surgery GEO",
        "workIntro": "The audit segments surgical intent, checks provider evidence and tracks whether the correct specialists are recommended.",
        "steps": [
          {
            "title": "Procedure-based baseline",
            "body": "Separate aesthetic and reconstructive intent, location and named-surgeon searches from unbranded recommendations."
          },
          {
            "title": "Verify provider information",
            "body": "Review licences, clinician roles, procedure scope, actual fees and rights to use images."
          },
          {
            "title": "Publish substantiated service pages",
            "body": "Prepare briefs for procedures, real surgeons, surgical conditions, questions and non-promissory care explanations."
          },
          {
            "title": "Recheck recommendation quality",
            "body": "Measure BMR, citations and errors, especially overpromised outcomes or outdated clinician affiliations."
          }
        ],
        "faq": [
          {
            "question": "Can surgical and cosmetic services share a website section?",
            "answer": "They may share navigation, but the services, qualifications and applicable requirements must remain distinct. A surgical procedure should not be marketed as a simple cosmetic treatment."
          },
          {
            "question": "Can before-and-after pictures support GEO?",
            "answer": "Only with appropriate legal permissions and accurate context. One patient's photographs cannot establish the likely outcome for another."
          },
          {
            "question": "Can a clinic guarantee no complications?",
            "answer": "No. Medical risks belong in clinical consultation and consent processes. Marketing content should not promise the absence of complications."
          },
          {
            "question": "What should a quoted procedure fee include?",
            "answer": "State whether consultation, tests, anaesthesia, admission and follow-up are included. Different quotes are not comparable without this breakdown."
          },
          {
            "question": "What are GAEO's plastic surgery GEO fees?",
            "answer": "The published GAEO plans apply. Scope depends on surgical disciplines, physicians, practice locations and the baseline prompt set."
          }
        ],
        "ctaTitle": "Audit AI recommendations for your plastic surgery clinic",
        "ctaText": "Share the website, procedure scope, clinician details, licences and approved portfolio evidence for an initial assessment.",
        "request": "Plastic surgery GEO: aesthetic and reconstructive services, surgeons, licences, pricing, photographs and BMR."
      }
    }
  },
  {
    "id": 64,
    "slug": "reproductive-medicine-clinics",
    "group": "medical-care",
    "routes": {
      "ru": "/industries/reproductive-medicine-clinics/",
      "en": "/en/industries/reproductive-medicine-clinics/"
    },
    "parent": {
      "ru": "/industries/medical-care-providers/",
      "en": "/en/industries/medical-care-providers/"
    },
    "parentLabels": {
      "ru": "GEO для медицинских организаций",
      "en": "GEO for healthcare providers"
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
        "Методика измерения BMR"
      ],
      "en": [
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: реестр медицинских лицензий и состав разрешенных работ",
        "en": "Roszdravnadzor: medical licence register and authorised service scope"
      },
      {
        "href": "https://www.roszdravnadzor.ru/spec/medactivities/licensing/documents/74900",
        "ru": "Росздравнадзор: приказ Минздрава №803н о вспомогательных репродуктивных технологиях",
        "en": "Roszdravnadzor: Health Ministry Order 803n on assisted reproductive technologies"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/0b1cadf39ebeb0f1fed2ef0b8ebab5973197d7f1/",
        "ru": "323-ФЗ, статья 20: информированное добровольное согласие",
        "en": "Federal Healthcare Act 323-FZ, Article 20: informed consent"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение клиник репродуктивной медицины и ЭКО | GAEO.ru",
        "h1": "GEO-продвижение клиник репродуктивной медицины",
        "description": "Продвижение клиник ЭКО в нейросетях: ВРТ, протоколы и этапы, лицензии, врачи, ОМС, стоимость, приватность пациентских данных и BMR.",
        "eyebrow": "Медицина / Репродуктология и ВРТ",
        "lead": "При выборе репродуктивной клиники пациенты уточняют доступные программы ВРТ, условия ЭКО и криопереноса, консультации, стоимость и возможность лечения по ОМС. Я измеряю рекомендации нейросетей по этим сценариям, сверяя факты по клиникам без переноса общей статистики на прогноз для отдельной пары.",
        "heroPoints": [
          "Разные запросы по ЭКО, криопереносу, обследованиям и ОМС",
          "Проверка лицензируемых услуг, врачей и состава программ",
          "Защита медицинской тайны и проверяемая статистика"
        ],
        "problemTitle": "Почему сравнение репродуктивных клиник требует точных определений",
        "problemIntro": "Слова «программа ЭКО» и «успешность» могут включать разные этапы лечения, показатели и группы пациентов. Без объяснений сравнение вводит в заблуждение.",
        "problems": [
          {
            "title": "Программы и этапы объединены",
            "body": "Диагностика бесплодия, стимуляция, получение яйцеклеток, перенос эмбрионов и криопрограммы различаются по медицинскому содержанию и оплате. Наличие ЭКО не доказывает полный перечень дополнительных услуг."
          },
          {
            "title": "Показатели успеха несопоставимы",
            "body": "Частота клинической беременности и рождения живого ребенка, расчет на перенос или цикл, возрастные группы и периоды дают разные показатели. Нельзя выводить индивидуальную вероятность из одного числа."
          },
          {
            "title": "Стоимость и ОМС описаны слишком общо",
            "body": "Условия программы, лекарственных препаратов, хранения эмбрионов, донорских материалов и направления по ОМС требуют проверки применимости и действующих правил."
          }
        ],
        "scenarioTitle": "Какие вопросы пациентов становятся матрицей GEO для ВРТ",
        "scenarioIntro": "Это примеры небрендовых запросов будущего исследования. Они не описывают наблюденные ответы нейросетей или медицинскую рекомендацию.",
        "columns": [
          "Вопрос пациента",
          "Какие данные проверить",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где доступна программа ЭКО в моем регионе и как записаться?",
            "Лицензируемые работы, адрес клиники, запись, этапы программы",
            "Раздельно описать наличие услуги и маршрут обращения"
          ],
          [
            "Как выбрать клинику для криопереноса эмбриона?",
            "Возможность программы, обследования, условия хранения, согласие, прайс",
            "Раскрыть реальные этапы и ограничения услуги"
          ],
          [
            "Что обычно входит в программу ЭКО, а что оплачивается отдельно?",
            "Прайс, лекарства, дополнительные методы, лабораторные этапы и договор",
            "Публиковать состав конкретных предложений без универсальных обещаний"
          ],
          [
            "Как сравнивать данные о результатах программ ВРТ?",
            "Период, возраст, знаменатель, метод подсчета, определение исхода",
            "Не путать показатели программ с гарантией беременности"
          ]
        ],
        "proofTitle": "Какие факты о клинике ВРТ пригодны для рекомендаций",
        "proofIntro": "Проверяю адреса и виды разрешенных медицинских работ, состав программ и условия записи. Приказ №803н описывает использование вспомогательных репродуктивных технологий, противопоказания и ограничения, но не подтверждает результат конкретного учреждения. Требования информированного добровольного согласия и врачебной тайны учитываются независимо от целей GEO.",
        "checks": [
          "Лицензируемые работы по акушерству и гинекологии с использованием ВРТ в соответствующих случаях, специалисты и места приема",
          "Подтвержденный перечень этапов программ, обследования, криохранение, цена, условия ОМС и исключения",
          "Публикуемая статистика только с определением исхода, группой, периодом и методикой; исключение данных пациентов без законного основания"
        ],
        "proofNote": "Это описание методики GAEO для репродуктивной медицины. Результаты ЭКО, беременностей и выполненных проектов GAEO в этой нише не заявляются.",
        "workTitle": "Как организую GEO-продвижение клиники репродуктивной медицины",
        "workIntro": "Запросы разбиваются по медицинским программам и организационным условиям, а результат измеряется по корректности рекомендаций и BMR.",
        "steps": [
          {
            "title": "Стартовый BMR по программам",
            "body": "Фиксирую вопросы о первичных консультациях, ЭКО, криопереносе, региональных условиях и ОМС."
          },
          {
            "title": "Сверка документируемых условий",
            "body": "Проверяю виды работ, географию, состав программ, даты прайса, врачебные профили и допустимые данные о результативности."
          },
          {
            "title": "Разработка точных страниц",
            "body": "Готовлю ТЗ на страницы направлений, этапов, вариантов оплаты, специалистов и FAQ с проверяемыми исходными данными."
          },
          {
            "title": "Повторный контроль ответов",
            "body": "Измеряю BMR на той же матрице и отмечаю несуществующие программы, неверные сведения об ОМС или обещания результата."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать ЭКО и криоперенос одной страницей?",
            "answer": "Общий раздел может связывать программы, но этапы, показания, стоимость и условия должны различаться. Конкретная доступность подтверждается клиникой."
          },
          {
            "question": "Можно ли написать, что ЭКО обязательно приведет к беременности?",
            "answer": "Нет. Исход зависит от медицинских обстоятельств. Достоверная информация о программе не заменяет консультацию и не дает индивидуальной гарантии."
          },
          {
            "question": "Как сравнивать показатели эффективности разных клиник?",
            "answer": "Нужно знать показатель, расчетную единицу, возрастную группу, период и состав пациентов. Проценты без этих параметров не являются сопоставимым доказательством."
          },
          {
            "question": "Все ли услуги ВРТ входят в ОМС?",
            "answer": "Нет. Состав оплачиваемых услуг определяется действующей программой и условиями направления; отдельные дополнительные услуги и материалы могут иметь другие правила оплаты."
          },
          {
            "question": "Какова стоимость GEO-продвижения клиники ЭКО?",
            "answer": "Применяются актуальные тарифы GAEO. Объем зависит от числа программ, филиалов, географии и стартовых вопросов пациентов."
          }
        ],
        "ctaTitle": "Проверить, какие клиники ВРТ нейросети рекомендуют пациентам",
        "ctaText": "Пришли сайт, действующие программы, лицензии, условия записи и публичные правила оплаты. Определю исходный набор запросов для BMR.",
        "request": "GEO репродуктивной клиники: ЭКО, ВРТ, криоперенос, ОМС, специалисты, программы, лицензии и BMR."
      },
      "en": {
        "title": "GEO for fertility and reproductive medicine clinics | GAEO",
        "h1": "GEO for reproductive medicine and IVF clinics",
        "description": "Fertility clinic GEO: IVF, embryo transfer, licensed ART programmes, patient privacy, treatment stages, coverage conditions and AI recommendation BMR.",
        "eyebrow": "Healthcare / Fertility and assisted reproduction",
        "lead": "People comparing fertility providers ask about IVF, frozen embryo transfers, specialist consultations, programme costs and public insurance options. I measure how AI assistants recommend clinics for these questions and verify provider facts without turning population-level statistics into a prediction for an individual patient.",
        "heroPoints": [
          "Distinct IVF, embryo transfer, examination and coverage intents",
          "Verification of licensed activities, actual programmes and costs",
          "Protection of sensitive patient information and evidence-based figures"
        ],
        "problemTitle": "Why fertility clinic comparisons require consistent definitions",
        "problemIntro": "The terms IVF programme and success rate can refer to different treatment stages and patient groups. The underlying measure must be defined before it informs a choice.",
        "problems": [
          {
            "title": "Programmes and treatment stages are mixed",
            "body": "Diagnostic work-up, stimulation, egg retrieval, embryo transfer and frozen-embryo programmes differ in clinical scope and pricing. An IVF listing does not establish the availability of every related option."
          },
          {
            "title": "Success figures cannot be compared",
            "body": "Clinical pregnancy and live birth are different endpoints. Rates per cycle or transfer, age groups and observation periods matter; one percentage cannot predict an individual's outcome."
          },
          {
            "title": "Coverage and total cost are vague",
            "body": "Medication, storage, donor material and additional procedures may be priced separately. Public insurance eligibility and scope require current, case-specific confirmation."
          }
        ],
        "scenarioTitle": "Fertility patient questions for a measurable GEO baseline",
        "scenarioIntro": "These are illustrative unbranded prompts, not recorded recommendations or clinical guidance.",
        "columns": [
          "Patient question",
          "Evidence to check",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can I access an IVF programme in my region?",
            "Authorised work, location, booking route and programme steps",
            "Connect the verified service with an actual clinic and address"
          ],
          [
            "Which clinics provide frozen embryo transfer?",
            "Programme availability, examination conditions, storage arrangements and fees",
            "Show specific services without implying universal eligibility"
          ],
          [
            "What is included in the IVF price and what is extra?",
            "Medication, laboratory procedures, contracts, exclusions and current fees",
            "Describe the real product scope rather than a generic package"
          ],
          [
            "How should I interpret published ART outcome rates?",
            "Endpoint, denominator, patient age, timeframe and method",
            "Keep clinical statistics separate from individual guarantees"
          ]
        ],
        "proofTitle": "What evidence can support a fertility clinic recommendation",
        "proofIntro": "I review the authorised medical work, available services and clinic terms. Health Ministry Order 803n describes assisted reproductive technologies and their restrictions, not the success of an individual provider. Informed consent and medical confidentiality are independent healthcare obligations.",
        "checks": [
          "Appropriate licensed assisted-reproduction activities, clinicians, facilities and actual booking addresses",
          "Defined steps and availability of IVF, freezing and transfer, current tariffs, public-coverage scope and exclusions",
          "Any published outcomes with transparent endpoint, cohort, period and calculations; strict safeguards for personal medical information"
        ],
        "proofNote": "This is GAEO's sector methodology. It does not claim completed IVF-client GEO work, pregnancies or treatment success.",
        "workTitle": "How I would run fertility-clinic GEO",
        "workIntro": "The measurement separates service programmes and access conditions while checking the quality of AI sources.",
        "steps": [
          {
            "title": "Baseline by ART intent",
            "body": "Capture unbranded queries for consultations, IVF, frozen embryo transfer, geography and coverage options."
          },
          {
            "title": "Verify service terms",
            "body": "Check authorised work, physicians, programme steps, prices, coverage policies and any permitted outcome figures."
          },
          {
            "title": "Develop reliable reference pages",
            "body": "Specify pages for available procedures, payment options, clinicians and patient questions using approved information."
          },
          {
            "title": "Repeat controlled measurements",
            "body": "Compare BMR and supporting sources; flag missing programmes, wrong coverage claims or guarantees of pregnancy."
          }
        ],
        "faq": [
          {
            "question": "Can IVF and frozen embryo transfer share one GEO landing page?",
            "answer": "A shared overview can connect them, but the procedures, eligibility, fees and available services should be explained separately using verified provider facts."
          },
          {
            "question": "Can a clinic promise pregnancy after IVF?",
            "answer": "No. Treatment outcomes depend on medical circumstances; factual programme information does not establish an individual guarantee."
          },
          {
            "question": "How should clinic outcome rates be assessed?",
            "answer": "Check the reported endpoint, denominator, age cohort, time period and calculation method. Rates without these elements are not reliable comparisons."
          },
          {
            "question": "Does public coverage include every ART-related service?",
            "answer": "No. Coverage and eligibility depend on the current programme and referral conditions; additional services or materials may be funded differently."
          },
          {
            "question": "What does fertility GEO cost with GAEO?",
            "answer": "The published GAEO plans apply. Scope depends on programmes, locations, regions and the baseline question matrix."
          }
        ],
        "ctaTitle": "Find out how AI recommends fertility clinics for real patient questions",
        "ctaText": "Share your website, programme list, licensed activities, appointment conditions and public fee policies to define the audit.",
        "request": "Fertility clinic GEO: IVF, ART, frozen transfers, clinical services, public coverage, licensed activities and BMR."
      }
    }
  }
];
