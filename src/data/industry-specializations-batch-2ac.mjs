/**
 * Batch 2AC: original RU/EN medical-care specializations #62 and #63.
 * No medical treatment outcomes, fabricated GAEO cases or provider licence claims.
 * The shared 107 catalogue, original WebP assets, pricing and BMR terms remain canonical.
 */
export const industrySpecializationsBatch2AC = [
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
        "href": "https://base.garant.ru/413139055/",
        "ru": "Минздрав: приказ №633н, порядок офтальмологической помощи взрослым с 01.02.2026",
        "en": "Health Ministry Order 633n: adult ophthalmology care rules effective February 2026"
      },
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: медицинское лицензирование и перечни работ",
        "en": "Roszdravnadzor: licensed activities and provider register"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/0b1cadf39ebeb0f1fed2ef0b8ebab5973197d7f1/",
        "ru": "323-ФЗ, статья 20: информированное согласие",
        "en": "Healthcare Act 323-FZ, Article 20: informed consent"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_58968/8fbc3d05dbc778e17bfc1b45fb7339df525c1985/",
        "ru": "38-ФЗ, статья 24: ограничения медицинской рекламы",
        "en": "Advertising Act 38-FZ, Article 24: medical advertising"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение офтальмологических клиник | GAEO.ru",
        "h1": "GEO-продвижение офтальмологических клиник в нейросетях",
        "description": "GEO для офтальмологических клиник: обследования зрения, врачи, хирургические направления, лицензии, филиалы, цены и рекомендации нейросетей.",
        "eyebrow": "Медицина / Офтальмология",
        "lead": "Пациент выбирает клинику для проверки зрения, консультации офтальмолога или обсуждения хирургического лечения. Это разные задачи, поэтому я отдельно проверяю, каких врачей и организации рекомендуют нейросети, соответствуют ли ответы лицензируемым видам работ и действующим условиям приема. Показания к лечению определяет врач.",
        "heroPoints": [
          "Разные запросы на обследование, прием и хирургические направления",
          "Проверка медицинских работ, врача, филиала и актуального прайса",
          "Сопоставимые измерения BMR и контроль точности рекомендаций"
        ],
        "problemTitle": "Почему нейросети могут неверно рекомендовать глазные клиники",
        "problemIntro": "Сведения об оборудовании и перечне методик не гарантируют, что нужную помощь реально оказывают по названному адресу.",
        "problems": [
          {
            "title": "Обследование путают с операцией",
            "body": "Диагностика рефракции и хирургическое вмешательство решают разные задачи. На сайте должны различаться осмотр, предварительная консультация и возможное лечение."
          },
          {
            "title": "Услуги сети приписывают каждому филиалу",
            "body": "Квалификация врача, лицензируемый профиль и наличие оборудования могут различаться по адресам. Ответ должен подтверждать конкретное место приема."
          },
          {
            "title": "Технологию представляют гарантией результата",
            "body": "Обещания «идеального зрения» или применимости процедуры для всех не являются доказательством. Ограничения и риски определяются на индивидуальном приеме."
          }
        ],
        "scenarioTitle": "Как пациенты ищут офтальмологическую помощь через нейросети",
        "scenarioIntro": "Примеры ниже служат для будущего стартового замера. Они не являются доказательством того, что нейросеть уже рекомендовала конкретную клинику.",
        "scenarios": [
          [
            "Где пройти обследование зрения рядом с работой?",
            "Адрес, состав обследования, запись, профиль врача и цена консультации",
            "Уточнить диагностические страницы и географию приема"
          ],
          [
            "Куда обратиться за консультацией по катаракте?",
            "Действующий профиль, врач, диагностика, условия консультации и согласия",
            "Отделить консультацию от обещания конкретной операции"
          ],
          [
            "Какие клиники консультируют по лазерной коррекции?",
            "Наличие профильного приема, предварительного обследования и конкретного адреса",
            "Подтвердить фактическую доступность услуги и ограничения"
          ],
          [
            "Где оказывают неотложную офтальмологическую помощь?",
            "Режим неотложного приема, адрес и возможности медицинской организации",
            "Развести плановую запись и срочное обращение"
          ]
        ],
        "proofTitle": "Что проверяю перед публикацией фактов о клинике",
        "proofIntro": "Приказ Минздрава №633н установил обновленный порядок офтальмологической помощи взрослым с 1 февраля 2026 года. Для каждой организации сведения о лицензии, доступных работах и специалистах требуют отдельной проверки.",
        "checks": [
          "Лицензируемые виды медицинской деятельности и адрес по актуальным данным реестра",
          "Квалификация врачей, услуги конкретного филиала, часы приема и условия оплаты",
          "Медицинские рекламные формулировки, информированное согласие, достоверность ссылок и даты обновления"
        ],
        "proofNote": "Нормативные документы не доказывают качество конкретного врача и не подтверждают клиентских результатов GAEO в офтальмологии. Здесь описана методика анализа рекомендаций.",
        "workTitle": "Как провожу GEO-продвижение офтальмологической клиники",
        "workIntro": "Начинаю с запросов пациентов по направлениям помощи, после чего собираю подтверждения для сайта и внешних источников.",
        "steps": [
          {
            "title": "Стартовый замер",
            "body": "Фиксирую небрендовые запросы на обследование, специалистов и плановое лечение, отдельно учитываю географию и экстренные обращения."
          },
          {
            "title": "Проверка медицинских сведений",
            "body": "Сопоставляю лицензию, профили врачей, филиалы, расписание, цены и конкретные условия услуг."
          },
          {
            "title": "Структура сайта и публикации",
            "body": "Готовлю задания для страниц обследований, врачей, FAQ и ссылок на проверяемые источники."
          },
          {
            "title": "Повторный BMR",
            "body": "Сопоставляю ответы на ту же матрицу вопросов, проверяю точность адресов, услуг и цитируемых источников."
          }
        ],
        "faq": [
          {
            "question": "Подходит ли GEO для лазерной коррекции зрения?",
            "answer": "Да, как продвижение проверяемой консультационной услуги. Отбор пациентов, показания и итог лечения определяются врачом; универсальные результаты обещать нельзя."
          },
          {
            "question": "Чем клиника отличается от магазина оптики?",
            "answer": "Медицинский прием связан с лицензированием и квалификацией специалистов. Продажа очков и линз может относиться к другому сценарию; измерять эти запросы нужно раздельно."
          },
          {
            "question": "Достаточно ли наличия современного оборудования?",
            "answer": "Нет. Наличие прибора можно подтвердить, но оно не доказывает эффективность лечения конкретного человека и не заменяет информацию о специалисте."
          },
          {
            "question": "Как учитывать детский прием?",
            "answer": "Сведения проверяются по конкретному филиалу, специалистам и применимым требованиям. Взрослый порядок №633н нельзя автоматически переносить на детскую помощь."
          },
          {
            "question": "Сколько стоит GEO для офтальмологии?",
            "answer": "Применяются общие тарифы GAEO. Объем зависит от направлений, филиалов и выбранной матрицы запросов для измерения BMR."
          }
        ],
        "ctaTitle": "Проверим рекомендации нейросетей о вашей глазной клинике",
        "ctaText": "Пришли адрес сайта, список услуг и филиалов, сведения о врачах и лицензии. Я определю стартовую матрицу запросов.",
        "request": "GEO офтальмологической клиники: врачи, диагностика, хирургические консультации, филиалы, лицензия, BMR.",
        "columns": [
          "Вопрос пациента",
          "Что проверить",
          "Задача GEO"
        ]
      },
      "en": {
        "title": "GEO for Ophthalmology Clinics and Eye Care | GAEO.ru",
        "h1": "GEO promotion for ophthalmology clinics in AI recommendations",
        "description": "AI recommendation visibility for eye-care clinics: examinations, ophthalmologists, surgical consultations, licences, actual locations and measured BMR.",
        "eyebrow": "Healthcare / Ophthalmology",
        "lead": "A patient may need a routine eye examination, an ophthalmologist consultation or an assessment for potential surgery. These are distinct decisions. I measure which clinics AI assistants recommend for each intent and verify clinician credentials, licensed activities and location-specific appointment details. Diagnosis and treatment choices remain with clinicians.",
        "heroPoints": [
          "Separate prompts for examinations, specialist visits and surgical consultations",
          "Verify medical licences, clinicians, branches and accurate fees",
          "Track BMR while correcting unsupported health claims"
        ],
        "problemTitle": "Why ophthalmology recommendations become misleading",
        "problemIntro": "A hospital network's equipment list or broad technique description does not prove that a specific service is offered at each location.",
        "problems": [
          {
            "title": "Examinations and surgery get conflated",
            "body": "Vision tests, clinician assessments and surgical interventions answer different patient needs and require distinct descriptions."
          },
          {
            "title": "One branch inherits the whole network catalogue",
            "body": "Medical professionals, facilities and permitted activities can vary across addresses. Recommendations must refer to real local services."
          },
          {
            "title": "A technology is described as a guaranteed outcome",
            "body": "Neither a device nor an advertised method proves universal suitability or perfect vision. Individual risks and expectations require assessment."
          }
        ],
        "scenarioTitle": "Patient questions for ophthalmology GEO research",
        "scenarioIntro": "These proposed prompts guide baseline testing; they do not assert any observed assistant response before the measurement.",
        "scenarios": [
          [
            "Where can I book an adult eye examination near work?",
            "Clinic address, test scope, clinician, appointments and consultation fees",
            "Separate examinations from treatment services by location"
          ],
          [
            "Which provider offers consultations concerning cataracts?",
            "Specialty, staff, examination and informed-consent pathway",
            "Avoid claiming surgery outcomes in consultation content"
          ],
          [
            "Where can I ask about laser vision correction?",
            "Qualified consultation, assessment stage and actual site",
            "Describe eligibility evaluation without blanket promises"
          ],
          [
            "Which facility can assess an urgent eye condition?",
            "Verified urgent opening times and actual emergency service scope",
            "Keep routine bookings distinct from urgent treatment"
          ]
        ],
        "proofTitle": "Evidence behind an ophthalmology provider recommendation",
        "proofIntro": "Russia's Health Ministry Order 633n established updated adult ophthalmology care rules from February 2026. An individual provider still needs its own verified licensing, qualified specialists and service availability.",
        "checks": [
          "Licensed activities and medical service address confirmed against regulator records",
          "Clinical team, examinations, consultations, schedules and actual fee information",
          "Informed consent, medical advertising restrictions and dated official references"
        ],
        "proofNote": "Regulations establish rules, not the competence or treatment result of a particular clinic. GAEO does not claim a completed ophthalmology client case here.",
        "workTitle": "My ophthalmology GEO process",
        "workIntro": "I start with patient search intentions, validate what the provider actually offers and improve reliable web information.",
        "steps": [
          {
            "title": "Baseline questions",
            "body": "Separate examinations, specialists, surgical consultations, geography and urgent-care scenarios."
          },
          {
            "title": "Provider fact audit",
            "body": "Validate licence scope, branch details, clinicians, fees and consultation conditions."
          },
          {
            "title": "Content and citation improvements",
            "body": "Prepare briefs for service pages, clinician profiles, patient FAQs and referenced expert content."
          },
          {
            "title": "Comparable BMR measurement",
            "body": "Repeat the original questions and check assistant references to branches, clinicians and conditions."
          }
        ],
        "faq": [
          {
            "question": "Can laser vision correction consultations be promoted in AI search?",
            "answer": "Yes, when a real consultation service and assessment pathway are accurately described. Eligibility and outcome cannot be universally guaranteed."
          },
          {
            "question": "Is eye-care GEO the same as optical retail promotion?",
            "answer": "No. Medical services depend on licensed work and clinical qualifications, whereas eyewear retail involves different buying intents."
          },
          {
            "question": "Does expensive equipment prove a clinic is best?",
            "answer": "No. Equipment can be a checked attribute but does not establish individual treatment quality or predict an outcome."
          },
          {
            "question": "How should pediatric services be described?",
            "answer": "Verify actual clinicians, branches and applicable rules. Adult ophthalmology regulations do not automatically establish pediatric care compliance."
          },
          {
            "question": "How much does this GEO service cost?",
            "answer": "GAEO's published tariffs apply. Work scope depends on branches, specialties and the baseline prompt matrix."
          }
        ],
        "ctaTitle": "Find out which eye-care providers AI assistants recommend",
        "ctaText": "Share your website, locations, service lines, clinician information and licensing references for a useful baseline assessment.",
        "request": "Ophthalmology GEO: eye examinations, clinicians, surgical consultations, licensed activities, branches and BMR.",
        "columns": [
          "Patient question",
          "Evidence to verify",
          "GEO improvement"
        ]
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
        "href": "https://base.garant.ru/71972580/",
        "ru": "Минздрав: приказ №298н, порядок пластической хирургии",
        "en": "Health Ministry Order 298n: plastic surgery care procedure"
      },
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: виды медицинских работ и лицензии",
        "en": "Roszdravnadzor: licensed medical activity"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/0b1cadf39ebeb0f1fed2ef0b8ebab5973197d7f1/",
        "ru": "323-ФЗ, статья 20: информированное согласие",
        "en": "Healthcare Act 323-FZ, Article 20: informed consent"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_121895/9f906d460f9454a8a0d290738d9fc2798c1e865a/",
        "ru": "323-ФЗ, статья 13: врачебная тайна",
        "en": "Healthcare Act 323-FZ, Article 13: medical confidentiality"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_58968/8fbc3d05dbc778e17bfc1b45fb7339df525c1985/",
        "ru": "38-ФЗ, статья 24: реклама медицинских услуг",
        "en": "Advertising Act 38-FZ, Article 24: medical advertising"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение клиник пластической хирургии | GAEO.ru",
        "h1": "GEO-продвижение клиник пластической хирургии в нейросетях",
        "description": "Продвижение клиник пластической хирургии в ChatGPT и Алисе: врачи, лицензии, условия операций, консультации, цены, врачебная тайна и BMR.",
        "eyebrow": "Медицина / Пластическая хирургия",
        "lead": "Выбирая пластического хирурга, человек сопоставляет квалификацию, направление вмешательства, условия консультации и последующего наблюдения. Нейросети могут смешивать эстетические и реконструктивные услуги, а рекламные фото принимать за доказательство результата. Я измеряю рекомендации и проверяю подтверждения по конкретной клинике без медицинских оценок.",
        "heroPoints": [
          "Раздельные запросы по эстетическим и реконструктивным задачам",
          "Проверка хирурга, лицензии, условий операции и состава стоимости",
          "BMR, рекламные ограничения и охрана медицинских данных пациента"
        ],
        "problemTitle": "Где возникают ошибки при сравнении хирургов и клиник",
        "problemIntro": "Общие рейтинги хирургов и фотографии не заменяют сведений о медицинской организации и конкретном вмешательстве.",
        "problems": [
          {
            "title": "Клинике приписывают любые вмешательства",
            "body": "Список рекламируемых услуг не подтверждает виды медицинских работ, специалистов и условия выполнения процедуры по конкретному адресу."
          },
          {
            "title": "Фото «до и после» выдают за прогноз",
            "body": "Даже реальные изображения одного пациента без контекста не доказывают типичный результат, отсутствие осложнений или пригодность процедуры другому человеку."
          },
          {
            "title": "Минимальная цена выглядит как окончательная",
            "body": "В предложение могут входить отдельные обследования, анестезиологическая помощь, пребывание и наблюдение. Полная смета определяется индивидуально."
          }
        ],
        "scenarioTitle": "По каким запросам пациенты сравнивают пластических хирургов",
        "scenarioIntro": "Матрица включает намерение проконсультироваться и условия предоставления помощи; медицинские показания оценивают врачи.",
        "scenarios": [
          [
            "Где получить консультацию по ринопластике в Москве?",
            "Профиль хирурга, фактический адрес консультации, доступные услуги",
            "Разделить консультацию и подтвержденную операционную практику"
          ],
          [
            "Какие клиники занимаются реконструктивной хирургией?",
            "Квалификация врачей, направление помощи, медицинские разрешения",
            "Не смешивать реконструктивное лечение и эстетическую коррекцию"
          ],
          [
            "Как выбрать клинику по условиям сопровождения?",
            "Сведения о клинике, процессе обследования и послеоперационных визитах",
            "Описать подтвержденный порядок без обещаний результата"
          ],
          [
            "Что включено в стоимость пластической операции?",
            "Прайс, объем консультаций, обследований, условия анестезии и пребывания",
            "Показывать состав цены и зависимость от индивидуального плана"
          ]
        ],
        "proofTitle": "Какие доказательства нужны для рекомендаций клиники",
        "proofIntro": "Для пластической хирургии действует профильный порядок Минздрава №298н. Наличие нормативного акта само по себе ничего не говорит о лицензии конкретной клиники, квалификации врачей или результате процедуры.",
        "checks": [
          "Лицензируемые виды работ, адрес клиники и проверяемая специализация хирурга",
          "Реальные условия консультации, вмешательства, сопровождения и цены",
          "Врачебная тайна, согласия на материалы пациента, корректная реклама без обещаний исхода"
        ],
        "proofNote": "Это отраслевая методика GEO, а не кейс доказанного роста BMR клиента GAEO. Фотографии пациентов не используются без законных оснований.",
        "workTitle": "Как организую GEO для пластической хирургии",
        "workIntro": "Начинаю с точной сегментации потребностей пациента, затем проверяю сведения и доступные источники рекомендаций.",
        "steps": [
          {
            "title": "Определяю запросы и стартовый BMR",
            "body": "Разделяю консультации, эстетические и реконструктивные направления, географию и выбор хирурга."
          },
          {
            "title": "Аудирую факты клиники",
            "body": "Проверяю лицензии, квалификацию, реальные услуги, условия и разрешенные материалы."
          },
          {
            "title": "Готовлю экспертные страницы",
            "body": "Разрабатываю задания для страниц хирургов, услуг, консультаций и FAQ с медицинской редактурой."
          },
          {
            "title": "Повторяю замер",
            "body": "Сравниваю BMR по той же матрице и исправляю неточные сведения об услугах, местах приема и врачах."
          }
        ],
        "faq": [
          {
            "question": "Можно ли продвигать конкретного пластического хирурга?",
            "answer": "Да, если его специализация, квалификация и фактическое место приема подтверждены документами. Рекламные эпитеты не подтверждают профессиональную компетенцию."
          },
          {
            "question": "Можно ли использовать фотографии «до и после»?",
            "answer": "Публикация зависит от законных оснований, согласия и режима врачебной тайны. Даже подтвержденный индивидуальный результат не становится обещанием для других пациентов."
          },
          {
            "question": "Можно ли обещать отсутствие осложнений?",
            "answer": "Нет оснований гарантировать одинаковую эффективность и безопасность любого вмешательства. Рекламные утверждения требуют проверки в соответствии с применимыми требованиями."
          },
          {
            "question": "Как отличать консультацию от операции?",
            "answer": "Консультация предполагает специалиста и условия записи, а сведения об операции требуют дополнительной проверки условий ее проведения и допуска пациента."
          },
          {
            "question": "Как рассчитывается тариф GEO для хирургии?",
            "answer": "Применяются общие тарифы GAEO; объем зависит от числа хирургов, направлений, филиалов и проверяемой матрицы BMR."
          }
        ],
        "ctaTitle": "Узнаем, какие клиники и хирургов рекомендуют нейросети",
        "ctaText": "Пришли сайт, список реальных направлений, хирургов, лицензируемых работ и условий консультации. Подберу вопросы для стартового аудита.",
        "request": "GEO пластической хирургии: хирурги, консультации, виды работ, врачебная тайна, цены, медицинская реклама, BMR.",
        "columns": [
          "Вопрос пациента",
          "Что проверить",
          "Задача GEO"
        ]
      },
      "en": {
        "title": "GEO for Plastic Surgery Clinics | GAEO.ru",
        "h1": "GEO promotion for plastic surgery clinics in AI recommendations",
        "description": "GEO for plastic surgery practices: surgeon credentials, real licensed services, consultations, transparent costs, patient privacy and measured BMR.",
        "eyebrow": "Healthcare / Plastic surgery",
        "lead": "People researching plastic surgery compare surgeon credentials, care settings, consultation options and follow-up arrangements. AI assistants may confuse aesthetic and reconstructive procedures or repeat unsupported outcomes inferred from photos. I measure provider recommendations and verify their sources. Only the clinical team can assess individual suitability.",
        "heroPoints": [
          "Distinct prompts for aesthetic and reconstructive services",
          "Verify surgeon qualifications, licensed work and treatment setting",
          "Monitor BMR, medical advertising claims and protection of patient data"
        ],
        "problemTitle": "Where plastic surgery recommendations go wrong",
        "problemIntro": "An online ranking or before-and-after gallery does not establish a clinic's full procedural scope or safety record.",
        "problems": [
          {
            "title": "A clinic is assumed to offer every procedure",
            "body": "A broad service list is not proof of actual staff, permitted work or capability at each location."
          },
          {
            "title": "Patient photos are treated as a prediction",
            "body": "One person's image cannot establish typical effectiveness, freedom from complications or eligibility for another person."
          },
          {
            "title": "The starting fee appears to be a final quotation",
            "body": "Assessment, anaesthesia, facility and follow-up services can be priced separately. Individual clinical requirements affect the estimate."
          }
        ],
        "scenarioTitle": "Patient selection questions for plastic surgery GEO",
        "scenarioIntro": "These are proposed baseline prompts, not verified historic AI recommendations or surgical advice.",
        "scenarios": [
          [
            "Where can I consult a rhinoplasty surgeon in Moscow?",
            "Clinician specialty, consultation address and confirmed services",
            "Separate consultations from surgical service promises"
          ],
          [
            "Which providers offer reconstructive plastic surgery?",
            "Actual clinical scope, professional qualifications and licensed work",
            "Differentiate reconstructive and aesthetic questions"
          ],
          [
            "How do clinics describe postoperative follow-up?",
            "Actual provider facilities, staffing and follow-up arrangements",
            "Publish verified pathways without implying identical clinical outcomes"
          ],
          [
            "What does a quoted plastic surgery price include?",
            "Consultations, assessment, facility and other stated cost components",
            "Distinguish promotional minimum prices from individualized estimates"
          ]
        ],
        "proofTitle": "Evidence needed before AI visibility claims",
        "proofIntro": "Russia's Health Ministry Order 298n sets a plastic surgery care procedure. It does not certify an individual provider; actual licensed scope, clinicians and patient-information safeguards must be verified independently.",
        "checks": [
          "Medical activities by address, plastic surgeon qualifications and real procedural offerings",
          "Consultation, clinical pathways, follow-up and fee components based on provider records",
          "Patient confidentiality, appropriate consents and compliance with medical advertising rules"
        ],
        "proofNote": "This page is an evidence-led GEO method, not a claimed GAEO client success or a guarantee of surgical outcomes.",
        "workTitle": "How I approach plastic surgery GEO",
        "workIntro": "I identify actual patient choice questions, compare assistant recommendations and improve the reliability of discoverable provider information.",
        "steps": [
          {
            "title": "Establish baseline demand",
            "body": "Separate surgeon choice, aesthetic consultations, reconstructive enquiries and regions in the BMR matrix."
          },
          {
            "title": "Check clinical claims",
            "body": "Verify licences, clinician profiles, care setting, fees and appropriate handling of patient-related content."
          },
          {
            "title": "Improve available evidence",
            "body": "Prepare surgeon and consultation pages, procedure explanations and medically reviewed FAQs with traceable sources."
          },
          {
            "title": "Repeat the comparison",
            "body": "Remeasure the same prompts and inspect provider names, addresses, specialties and citations."
          }
        ],
        "faq": [
          {
            "question": "Can an individual surgeon be promoted through GEO?",
            "answer": "Yes, where qualifications, practice locations and relevant services are verifiable. Promotional adjectives alone do not establish competence."
          },
          {
            "question": "Are before-and-after images valid proof?",
            "answer": "Use requires suitable legal rights and privacy safeguards. An individual result still cannot guarantee outcomes for other patients."
          },
          {
            "question": "Can a clinic promise complication-free surgery?",
            "answer": "No universal outcome can be guaranteed. Public claims must be supported and comply with applicable medical advertising restrictions."
          },
          {
            "question": "Is a consultation the same as procedure availability?",
            "answer": "No. A booked discussion does not prove that an intervention is appropriate or can be performed at that location."
          },
          {
            "question": "How much does this GEO programme cost?",
            "answer": "GAEO's current published plans apply. Scope depends on service specialties, surgeons, branches and the agreed baseline prompt set."
          }
        ],
        "ctaTitle": "Audit how AI assistants recommend your plastic surgery practice",
        "ctaText": "Share the website, verified specialties, clinicians, locations and licensing references so I can assess baseline demand.",
        "request": "Plastic surgery GEO: surgeons, consultation, licensed procedures, patient privacy, prices, advertising and BMR.",
        "columns": [
          "Patient question",
          "Evidence to verify",
          "GEO improvement"
        ]
      }
    }
  }
];
