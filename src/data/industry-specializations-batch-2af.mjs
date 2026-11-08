/**
 * Phase 2AF after concurrency check: independent evidence-led RU/EN specializations
 * for rehabilitation centres (#65) and private psychologists/psychotherapists (#104).
 * Automotive #77–79 belong to concurrent phase 2AE PR #118 and are not duplicated.
 * Retain shared 107-ID catalogue, images, pricing, BMR and canonical page template.
 */
export const industrySpecializationsBatch2AF = [
  {
    "id": 65,
    "slug": "rehabilitation-centres",
    "group": "healthcare",
    "routes": {
      "ru": "/industries/rehabilitation-centres/",
      "en": "/en/industries/rehabilitation-centres/"
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
        "/industries/medical-care-providers/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/industries/medical-care-providers/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Медицинские отрасли и профиль услуг",
        "Методика измерения BMR"
      ],
      "en": [
        "Healthcare provider sectors",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://kurort.minzdrav.gov.ru/articles/10/11",
        "ru": "Минздрав: статья 40 закона №323-ФЗ о медицинской реабилитации",
        "en": "Ministry of Health: Article 40 of Federal Law 323-FZ on medical rehabilitation"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_433852/251914c20e9de78b3ee8b2d5e0bf9dc53015020e/",
        "ru": "Минздрав, приказ №788н с поправками 2025 года: реабилитация взрослых",
        "en": "Ministry of Health Order 788n, updated in 2025: rehabilitation for adults"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_341304/2ff7a8c72de3994f30496a0ccbb1ddafdaddf518/",
        "ru": "Минздрав, приказ №878н: реабилитация детей",
        "en": "Ministry of Health Order 878n: paediatric rehabilitation"
      },
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: реестр лицензий на медицинскую деятельность",
        "en": "Roszdravnadzor: register of medical activity licences"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение реабилитационных центров в ChatGPT и Алисе | GAEO.ru",
        "h1": "GEO-продвижение реабилитационных центров в нейросетях",
        "description": "GEO для реабилитационных центров: взрослые и дети, маршрутизация, медицинская лицензия, профиль команды, этап лечения, реальная доступность и измерение BMR.",
        "eyebrow": "Медицина / Реабилитационные центры",
        "lead": "Пациент или его близкий выбирает реабилитационный центр по возрасту, профилю восстановления, этапу помощи и географии. Я анализирую, какие организации нейросети рекомендуют по этим запросам, и проверяю, подтверждаются ли заявленные услуги, лицензия и условия приема.",
        "heroPoints": [
          "Отдельные запросы по возрасту, этапу помощи и профилю реабилитации",
          "Проверка лицензии, команды и точного состава медицинских услуг",
          "Точные условия госпитализации, амбулаторной программы и повторные замеры BMR"
        ],
        "problemTitle": "Почему общий список «восстановление после болезни» мешает выбору",
        "problemIntro": "Реабилитация после инсульта, ортопедической операции и травмы отличается по задачам и маршруту пациента. Важно разграничивать медицинскую программу, оздоровительные услуги и обещания без доказательств.",
        "problems": [
          {
            "title": "Непонятен этап медицинской помощи",
            "body": "Ранняя, стационарная и амбулаторная реабилитация имеют разные условия. Страница не должна представлять любую физкультурную программу как специализированную медицинскую реабилитацию."
          },
          {
            "title": "Возраст и профиль не уточнены",
            "body": "Детская и взрослая реабилитация организуются по разным порядкам. Возраст, состояние, противопоказания и доступность конкретной программы уточняет медицинская организация, а не поисковое описание."
          },
          {
            "title": "Результаты обещаются без методики",
            "body": "Фразы «восстановим подвижность за месяц» или «лучший центр» нельзя обосновать без критериев, данных, периода и корректных медицинских оговорок."
          }
        ],
        "scenarioTitle": "Вопросы, по которым выбирают центр реабилитации",
        "scenarioIntro": "Примеры небрендовых сценариев для будущей матрицы BMR. Это возможные вопросы семей, а не результаты уже проведенного измерения.",
        "columns": [
          "Вопрос человека",
          "Что должно подтверждаться",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Где доступна медицинская реабилитация после инсульта с возможностью стационарного приема?",
            "Профиль и этап помощи, лицензионные сведения, условия отбора и свободные места",
            "Показать точную программу и ограничения маршрутизации"
          ],
          [
            "Какие центры проводят восстановление после эндопротезирования в моем регионе?",
            "Возрастная категория, штат, назначение программы, доступность очного приема",
            "Разделить профиль пациента, формат и территорию"
          ],
          [
            "Как выбрать центр реабилитации для ребенка после травмы?",
            "Применимый детский порядок, возрастные ограничения, команда и прием",
            "Не смешивать взрослые и детские программы"
          ],
          [
            "Есть ли амбулаторная программа с прозрачной ценой и перечнем процедур?",
            "Условия приема, состав услуги, стоимость по договору, необходимость направления",
            "Отделить стоимость консультации от цены полного курса"
          ]
        ],
        "proofTitle": "Какие данные проверяю перед публичными утверждениями",
        "proofIntro": "Статья 40 закона №323-ФЗ определяет медицинскую реабилитацию. Приказ №788н, актуализированный в 2025 году, регулирует организацию помощи взрослым, приказ №878н касается детей. По применимым видам деятельности отдельно проверяется запись в реестре медицинских лицензий Росздравнадзора.",
        "checks": [
          "Фактический профиль реабилитации, лицензируемые работы, возраст, формат приема, этап и доступность по конкретному адресу",
          "Состав специалистов и мультидисциплинарной команды, оснащение, направления помощи и подтвержденные правила маршрутизации",
          "Цены на обозначенный объем услуг, программа, продолжительность, информирование пациента, разрешенные публикации и датированные сведения"
        ],
        "proofNote": "Нормативные документы подтверждают требования к организации помощи, но не эффективность лечения в конкретном центре. Клиентских результатов GAEO для реабилитационных центров здесь не заявлено.",
        "workTitle": "Как организую GEO-продвижение реабилитационного центра",
        "workIntro": "Отдельно изучаю потребности взрослых пациентов, семей с детьми и направляющих специалистов; затем сравниваю ответы нейросетей с проверенными фактами и динамикой BMR.",
        "steps": [
          {
            "title": "Стартовый BMR по запросам",
            "body": "Формирую небрендовые вопросы по профилям, этапам, возрасту и городам, фиксирую исходные рекомендации и источники."
          },
          {
            "title": "Аудит медицинских доказательств",
            "body": "Сверяю лицензию, виды работ, специалистов, условия приема и точность указания программ без обещаний результата лечения."
          },
          {
            "title": "Доработка структуры и внешних источников",
            "body": "Готовлю задания для страниц направлений, команды, адресов, порядка поступления, цен и доказательной информации."
          },
          {
            "title": "Повторная проверка качества рекомендаций",
            "body": "Измеряю BMR на исходной матрице и проверяю возраст, профиль, этап помощи и достоверность ответов."
          }
        ],
        "faq": [
          {
            "question": "Одинаково ли продвигается реабилитация взрослых и детей?",
            "answer": "Нет. Применяются разные порядки организации помощи и разные запросы семей. На сайте нужны точные программы, возрастные категории и условия приема."
          },
          {
            "question": "Можно ли назвать любой оздоровительный центр медицинским реабилитационным?",
            "answer": "Нет. Нужно сверять, какая именно деятельность фактически ведется и подтверждена документами. Формулировка должна соответствовать реальным услугам и правовому статусу."
          },
          {
            "question": "Как подтверждается лицензия центра?",
            "answer": "По официальному реестру и конкретным видам работ, адресам и сведениям организации. Само наличие слова «медицинский» в названии лицензии не подтверждает."
          },
          {
            "question": "Можно ли гарантировать восстановление после болезни?",
            "answer": "Нет. Исходное состояние и медицинские показания индивидуальны. Публичное описание может объяснять программу и критерии, но не обещать результат каждому пациенту."
          },
          {
            "question": "Сколько стоит GEO-продвижение центра?",
            "answer": "Используются публичные тарифы GAEO. Конкретный объем зависит от числа программ, филиалов, возрастных групп и начальной выборки запросов."
          }
        ],
        "ctaTitle": "Проверим рекомендации центров реабилитации",
        "ctaText": "Пришли сайт, действующие программы, адреса, возрастные группы и подтвержденную информацию о лицензии. Я предложу начальную матрицу вопросов для анализа.",
        "request": "GEO для реабилитационного центра: программы, взрослые/дети, медицинская лицензия, прием и BMR."
      },
      "en": {
        "title": "GEO for Medical Rehabilitation Centres in AI Recommendations | GAEO",
        "h1": "GEO promotion for medical rehabilitation centres",
        "description": "AI visibility for medical rehabilitation providers: adult and paediatric pathways, programme eligibility, licence evidence, clinical team and baseline BMR.",
        "eyebrow": "Healthcare / Rehabilitation services",
        "lead": "Patients and families select a rehabilitation provider by age, clinical needs, stage of care and location. I analyse which centres AI assistants recommend for these questions and whether their programmes, licensing and admission requirements are verifiable.",
        "heroPoints": [
          "Separate demand by age, rehabilitation stage and clinical profile",
          "Verify the medical activity licence, staff and actual programme scope",
          "Check admission, inpatient or outpatient terms, then measure BMR"
        ],
        "problemTitle": "Why a broad 'recovery after illness' claim is inadequate",
        "problemIntro": "Stroke rehabilitation, postoperative recovery and paediatric services differ in their clinical pathways. A useful recommendation must distinguish regulated medical rehabilitation from general wellness and unsupported outcome claims.",
        "problems": [
          {
            "title": "The stage of care is missing",
            "body": "Early, inpatient and outpatient rehabilitation are not interchangeable. A fitness or wellness programme should not be described as specialist medical rehabilitation without supporting evidence."
          },
          {
            "title": "Age and clinical profile are unclear",
            "body": "Separate adult and paediatric regulations apply. Eligibility, contraindications and clinical recommendations are determined by the provider, not a search summary."
          },
          {
            "title": "Recovery claims lack a basis",
            "body": "Promises of a complete recovery within a fixed number of weeks need robust and relevant clinical evidence. Descriptions must not imply guaranteed patient outcomes."
          }
        ],
        "scenarioTitle": "Questions used to select a rehabilitation centre",
        "scenarioIntro": "Illustrative unbranded demand prompts for a future BMR baseline. They are not presented as already measured AI answers.",
        "columns": [
          "Patient or family question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "Where can someone access inpatient rehabilitation after a stroke?",
            "Programme scope, care stage, licensing, admission conditions and availability",
            "Show the actual service and eligibility limits"
          ],
          [
            "Which regional centres support rehabilitation after joint replacement?",
            "Age group, clinical team, programme eligibility and outpatient availability",
            "Match profile, format and location"
          ],
          [
            "Which centres provide paediatric rehabilitation after an injury?",
            "Paediatric requirements, team, age restrictions and referral process",
            "Separate paediatric and adult offerings"
          ],
          [
            "Is there a transparent outpatient programme with detailed fees?",
            "Specific services, contractual price, referral conditions and programme components",
            "Avoid treating a consultation fee as the whole course price"
          ]
        ],
        "proofTitle": "Evidence I verify before making service claims",
        "proofIntro": "Article 40 of Russian Federal Law 323-FZ defines medical rehabilitation. Order 788n, updated in 2025, covers adults; Order 878n addresses children. For relevant medical services I also check the provider's licence record in the Roszdravnadzor register.",
        "checks": [
          "Actual clinical programme, licensed work, age range, care stage and location-specific admission",
          "Team composition, equipment, referral process and documented clinical service scope",
          "Published prices for defined services, programme content, dates and permission to publish case details"
        ],
        "proofNote": "Regulations establish service requirements, not proof of treatment outcomes at a particular provider. No GAEO rehabilitation client success is claimed here.",
        "workTitle": "How I run GEO for rehabilitation providers",
        "workIntro": "I distinguish adult, paediatric and referring-professional questions, then compare AI answers with verifiable service evidence and consistent BMR measurement.",
        "steps": [
          {
            "title": "Unbranded BMR baseline",
            "body": "Record care-stage, clinical profile, age and location queries with current recommendations and cited sources."
          },
          {
            "title": "Check clinical evidence",
            "body": "Verify the licence, scope, team, admission requirements and accuracy of programme claims without patient guarantees."
          },
          {
            "title": "Improve service information",
            "body": "Prepare briefs for programmes, specialists, locations, admissions, prices and permitted educational materials."
          },
          {
            "title": "Measure again",
            "body": "Repeat the prompt set and review BMR and accuracy by age, medical profile and stage of care."
          }
        ],
        "faq": [
          {
            "question": "Can adult and paediatric rehabilitation use identical landing pages?",
            "answer": "No. There are distinct organisational requirements and demand scenarios. Each programme needs accurate age eligibility and referral information."
          },
          {
            "question": "Does every wellness centre qualify as medical rehabilitation?",
            "answer": "No. Check the actual service, documentation and the relevant legal status before presenting it as medical care."
          },
          {
            "question": "How can a centre's licence be checked?",
            "answer": "Consult the official register for the specific organisation, address and authorised scope of medical activity."
          },
          {
            "question": "Can rehabilitation providers promise a full recovery?",
            "answer": "No individual result can be guaranteed. Accurate content describes programmes, eligibility and limitations without promising clinical outcomes."
          },
          {
            "question": "How much does GAEO charge rehabilitation centres?",
            "answer": "Published GAEO plans apply. Scope varies by programme, location, audience and the initial buyer-prompt matrix."
          }
        ],
        "ctaTitle": "Measure how AI recommends rehabilitation providers",
        "ctaText": "Share your website, locations, programmes, age groups and verified medical licence details. I will propose a useful baseline query sample.",
        "request": "Rehabilitation provider GEO: clinical programme scope, adult/paediatric pathways, licensing, admission and BMR."
      }
    }
  },
  {
    "id": 104,
    "slug": "private-psychologists-psychotherapists",
    "group": "local-services",
    "routes": {
      "ru": "/industries/private-psychologists-psychotherapists/",
      "en": "/en/industries/private-psychologists-psychotherapists/"
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
        "/industries/local-services/",
        "/strategies/measurement/"
      ],
      "en": [
        "/en/industries/local-services/",
        "/en/strategies/measurement/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Особенности локальных услуг",
        "Методика измерения BMR"
      ],
      "en": [
        "Local-service GEO context",
        "BMR measurement methodology"
      ]
    },
    "sources": [
      {
        "href": "https://mintrud.gov.ru/docs/mintrud/orders/2458",
        "ru": "Минтруд: профессиональный стандарт «Психолог-консультант», приказ №537н",
        "en": "Ministry of Labour: Psychologist-Counsellor Standard, Order 537n"
      },
      {
        "href": "https://base.garant.ru/406969654/53f89421bbdaf741eb2d1ecc4ddb4c33/",
        "ru": "Минздрав: квалификационные требования к врачам-психотерапевтам, приказ №206н",
        "en": "Ministry of Health Order 206n: qualification requirements for medical psychotherapists"
      },
      {
        "href": "https://www.roszdravnadzor.gov.ru/Medactivities/Licensing",
        "ru": "Росздравнадзор: реестр лицензий на медицинскую деятельность",
        "en": "Roszdravnadzor: medical activity licence register"
      },
      {
        "href": "https://mintrud.gov.ru/docs/laws/130",
        "ru": "Федеральный закон №152-ФЗ о персональных данных",
        "en": "Federal Law 152-FZ on personal data"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение психологов и психотерапевтов в нейросетях | GAEO.ru",
        "h1": "GEO-продвижение частных психологов и психотерапевтов",
        "description": "Продвижение психологов и врачей-психотерапевтов в ChatGPT и Алисе: профессиональные границы, образование, формат приема, конфиденциальность, проверяемые сведения и BMR.",
        "eyebrow": "Частная практика / Психологические услуги",
        "lead": "Человек ищет помощь по теме обращения, формату общения, опыту специалиста и возможности записаться. Я проверяю, каких психологов и врачей-психотерапевтов рекомендуют нейросети, и насколько точно они описывают образование, роль и действующие услуги каждого.",
        "heroPoints": [
          "Раздельные запросы психологического консультирования и медицинской психотерапии",
          "Проверка образования, профессионального статуса и подтверждаемых методов работы",
          "Конфиденциальная подача услуг, удобная запись и корректный BMR"
        ],
        "problemTitle": "Почему путаница между психологом и врачом опасна для рекомендаций",
        "problemIntro": "Психологическое консультирование и медицинская психотерапия требуют аккуратного разграничения. Нейросети могут ошибочно приписать специалисту медицинские полномочия, диагнозы или гарантированные результаты.",
        "problems": [
          {
            "title": "Не определена профессиональная роль",
            "body": "Название «психотерапевт» в рекламе требует уточнить образование, характер услуги и правовой статус. Для врача-психотерапевта установлены медицинские квалификационные требования; статус психолога-консультанта оценивается отдельно."
          },
          {
            "title": "Обещания результата звучат как диагноз",
            "body": "«Избавлю от депрессии за 5 встреч» или «гарантирую лечение тревоги» требуют медицинских оснований и доказательств. Такие формулировки нельзя переносить в рекомендации без проверки."
          },
          {
            "title": "Конфиденциальность подменяется отзывами",
            "body": "Развернутые истории клиентов, переписка и сведения о здоровье не должны публиковаться без надлежащих оснований. Открытые отзывы не заменяют профессиональную информацию."
          }
        ],
        "scenarioTitle": "Какие вопросы задают при выборе психолога",
        "scenarioIntro": "Примеры для матрицы небрендовых запросов. Они не являются рекомендацией конкретного лечения и не доказывают, что нейросети уже советуют определенных специалистов.",
        "columns": [
          "Вопрос пользователя",
          "Что проверять",
          "Задача GEO"
        ],
        "scenarios": [
          [
            "Как найти психолога для семейной консультации онлайн с понятными условиями?",
            "Образование, специализация, формат, стоимость, расписание и границы услуги",
            "Раздельная страница услуги с проверяемыми фактами"
          ],
          [
            "Где записаться к врачу-психотерапевту очно в моем городе?",
            "Медицинская квалификация, применимая лицензия, адрес приема и запись",
            "Уточнить медицинский статус и фактическое место приема"
          ],
          [
            "Как выбрать специалиста для работы с профессиональным выгоранием?",
            "Подтвержденная специализация, процесс консультирования, формат работы",
            "Описать подход без обещаний лечения или универсального эффекта"
          ],
          [
            "Какие условия отмены онлайн-сессии и как защищаются личные данные?",
            "Договор, правила переноса, длительность, оплата, политика данных",
            "Сделать условия доступными до записи"
          ]
        ],
        "proofTitle": "Что подтверждает профиль специалиста",
        "proofIntro": "Профессиональный стандарт Минтруда №537н описывает психологическое консультирование, а квалификационные требования Минздрава №206н относятся к медицинским специальностям, включая психотерапию. При оказании медицинских услуг нужно проверять применимую лицензию, сведения о месте деятельности и требования к обработке персональных данных.",
        "checks": [
          "Образование, квалификация, профессиональная специализация и корректное название реальной услуги",
          "Наличие лицензии при медицинской деятельности, точный адрес или онлайн-формат, расписание, цена и правила оказания услуги",
          "Согласие на использование информации, конфиденциальность, защита персональных данных и разрешенные публичные профессиональные материалы"
        ],
        "proofNote": "Стандарты и реестры не являются рейтингом качества специалиста. Лечебные обещания, диагнозы и личные результаты клиентов здесь не приводятся; GEO-кейсов GAEO в этой практике не заявлено.",
        "workTitle": "Как веду GEO для частной психологической практики",
        "workIntro": "Отделяю вопросы выбора психолога-консультанта от поиска медицинского специалиста. Затем проверяю доступные источники, точность профессионального статуса и рекомендации на исходной выборке.",
        "steps": [
          {
            "title": "Измерение исходного BMR",
            "body": "Собираю запросы по формату приема, теме обращения, городу, специализации и проверяемым условиям записи."
          },
          {
            "title": "Аудит фактов о специалисте",
            "body": "Проверяю образование, статус, доступные методы, медицинские основания при необходимости и конфиденциальность."
          },
          {
            "title": "Доработка услуг и профессионального профиля",
            "body": "Готовлю задания для страниц консультаций, подтвержденной биографии, вопросов об оплате и записи, собственных экспертных объяснений."
          },
          {
            "title": "Повторная проверка рекомендаций",
            "body": "Измеряю BMR и проверяю, не приписывают ли нейросети медицинское лечение, квалификацию или обещания, которых нет."
          }
        ],
        "faq": [
          {
            "question": "Психолог и врач-психотерапевт одинаковы для GEO?",
            "answer": "Нет. Это разные профессиональные роли. Нужно точно обозначать образование, медицинский статус при наличии и фактически оказываемые услуги."
          },
          {
            "question": "Можно ли обещать решение психологической проблемы за 3 встречи?",
            "answer": "Нет надежного универсального срока. Формулировки должны описывать процесс, условия и ограничения, избегая недоказанных медицинских и результативных обещаний."
          },
          {
            "question": "Нужна ли лицензия частному психологу?",
            "answer": "Это зависит от характера фактически оказываемых услуг. Для медицинской деятельности действует лицензионное регулирование; обычное психологическое консультирование нужно оценивать отдельно, не приписывая специалисту врачебный статус."
          },
          {
            "question": "Можно ли публиковать историю клиента как кейс?",
            "answer": "Сведения о частной жизни и здоровье требуют особой осторожности и правовых оснований. Без проверенного разрешения лучше использовать общие профессиональные разборы без узнаваемых деталей."
          },
          {
            "question": "Сколько стоит GEO-продвижение психолога?",
            "answer": "Применяются опубликованные тарифы GAEO. Объем зависит от форматов консультаций, специализаций, городов и числа проверяемых запросов."
          }
        ],
        "ctaTitle": "Проверим, как нейросети рекомендуют психологов",
        "ctaText": "Пришли ссылку на профессиональный сайт, подтвержденное образование, реальные направления консультаций и условия записи. Я подберу запросы для первичного анализа.",
        "request": "GEO для психолога и врача-психотерапевта: квалификация, услуги, конфиденциальность, запись и BMR."
      },
      "en": {
        "title": "GEO for Private Psychologists and Psychotherapists | GAEO",
        "h1": "GEO promotion for psychologists and psychotherapists",
        "description": "AI search visibility for private counselling and medical psychotherapy providers: verified qualifications, service scope, privacy, availability and BMR.",
        "eyebrow": "Local professional services / Psychological counselling",
        "lead": "People select a counselling professional by concern, format, verified training and appointment availability. I examine which psychologists and medical psychotherapists AI assistants recommend and whether their qualifications, role and services are described accurately.",
        "heroPoints": [
          "Separate counselling intents from regulated medical psychotherapy",
          "Verify education, professional scope and public evidence",
          "Explain privacy, session format and booking terms while measuring BMR"
        ],
        "problemTitle": "Why mixing counsellors and medical doctors creates harmful recommendations",
        "problemIntro": "Psychological counselling and medical psychotherapy have distinct professional and regulatory considerations. AI may incorrectly attribute medical credentials, diagnoses or guaranteed treatment outcomes.",
        "problems": [
          {
            "title": "Professional role is ambiguous",
            "body": "The public label 'psychotherapist' requires clarification of qualifications and service scope. Medical psychotherapists have specific healthcare qualification requirements; counselling psychologists must be represented accurately."
          },
          {
            "title": "Promises resemble medical claims",
            "body": "Statements such as 'cure depression in five sessions' need clinical evidence and proper authority. Search-oriented text should not present unsupported individual treatment guarantees."
          },
          {
            "title": "Testimonials expose sensitive information",
            "body": "Client narratives, conversations and health details require strong privacy protection and lawful permission. Testimonials do not replace evidence of training and practice scope."
          }
        ],
        "scenarioTitle": "Questions people ask when selecting a professional",
        "scenarioIntro": "Illustrative unbranded prompts for BMR measurement, not clinical advice or claims that specific practitioners are already recommended by AI.",
        "columns": [
          "Prospective client's question",
          "Evidence required",
          "GEO action"
        ],
        "scenarios": [
          [
            "How can I find an online family counsellor with clear fees and booking rules?",
            "Training, focus, format, price, availability and scope of counselling",
            "Publish a verifiable service and booking page"
          ],
          [
            "Where can I book an appointment with a medical psychotherapist in my city?",
            "Relevant medical qualification, licence where applicable, location and appointment process",
            "Clarify doctor status and the real site of care"
          ],
          [
            "Who offers counselling for workplace burnout?",
            "Relevant professional focus, process, consultation format and limits",
            "Explain practice scope without treatment guarantees"
          ],
          [
            "What happens if I cancel an online session and how is my data protected?",
            "Service agreement, rescheduling terms, billing and data policy",
            "Make terms available before booking"
          ]
        ],
        "proofTitle": "Evidence behind a credible practitioner profile",
        "proofIntro": "Russian Ministry of Labour Standard 537n concerns psychological counselling, while Ministry of Health Order 206n sets medical qualification requirements including psychotherapy. Regulated medical activity requires the applicable licensing checks, alongside careful handling of personal information.",
        "checks": [
          "Education, specialisation, accurate role titles and the actual service provided",
          "Any applicable medical licence, verified address or online format, appointments, fees and terms",
          "Consent and lawful handling of sensitive details, confidentiality and permissible professional publications"
        ],
        "proofNote": "Standards and registers do not rank clinical quality. No patient diagnoses, testimonials or measured GAEO client outcomes in private counselling are asserted.",
        "workTitle": "How I handle GEO for private counselling professionals",
        "workIntro": "I separate choosing a non-medical counsellor from selecting a medical psychotherapist, then verify sources, professional descriptions and the same baseline recommendation prompts.",
        "steps": [
          {
            "title": "Unbranded BMR baseline",
            "body": "Capture concerns, appointment formats, cities, provider roles and availability criteria."
          },
          {
            "title": "Verify professional claims",
            "body": "Check education, relevant credentials, published service scope, any medical licensing and privacy safeguards."
          },
          {
            "title": "Improve services and profile pages",
            "body": "Prepare briefs for counselling services, verified biographies, booking terms, fees and original professional explanations."
          },
          {
            "title": "Recheck recommendation accuracy",
            "body": "Repeat the prompts and review BMR plus mistaken medical roles, qualifications or promises."
          }
        ],
        "faq": [
          {
            "question": "Are psychologists and medical psychotherapists the same for GEO?",
            "answer": "No. They are distinct professional roles. Accurately identify qualifications, regulated medical status where relevant and actual services."
          },
          {
            "question": "Can I promise results after a fixed number of sessions?",
            "answer": "A fixed outcome is not generally supportable. Describe the professional process and limitations without universal therapeutic guarantees."
          },
          {
            "question": "Does a private psychologist need a medical licence?",
            "answer": "It depends on the activity actually offered. Medical services have licensing requirements, while non-medical counselling should be assessed on its own legal and professional basis."
          },
          {
            "question": "Can client experiences be published as case studies?",
            "answer": "Private and health-related information requires lawful grounds and careful consent. General anonymised professional explanations are often more appropriate."
          },
          {
            "question": "What does GAEO charge counselling practices?",
            "answer": "Published GAEO plans apply. Scope depends on genuine practice areas, formats, regions and the baseline prompt matrix."
          }
        ],
        "ctaTitle": "Check how AI recommends counselling professionals",
        "ctaText": "Share your professional website, verified qualifications, actual practice areas and booking terms. I will design a suitable baseline demand sample.",
        "request": "Private psychologist/psychotherapist GEO: qualifications, counselling vs medical scope, privacy, booking and BMR."
      }
    }
  }
];
