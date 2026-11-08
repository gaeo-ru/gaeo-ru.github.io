/**
 * Batch 2Z (reassigned after 2Y merge): #103 security/CCTV and #105 equipment hire.
 * Distinct RU/EN buyer journeys and evidence; shared canonical prices and images.
 */
export const industrySpecializationsBatch2Z = [
  {
    "id": 103,
    "slug": "security-cctv-companies",
    "group": "local-services",
    "routes": {
      "ru": "/industries/security-cctv-companies/",
      "en": "/en/industries/security-cctv-companies/"
    },
    "parent": {
      "ru": "/industries/",
      "en": "/en/industries/"
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
        "Как измеряем BMR",
        "Как проверяю подрядчиков сложных B2B-услуг"
      ],
      "en": [
        "How BMR is measured",
        "Technical B2B supplier evidence"
      ]
    },
    "sources": [
      {
        "href": "https://rosguard.gov.ru/News/Article/federalnyj-zakon-reguliruyushhij-chastnuyu-oxrannuyu-deyatelnost-vstupil-v-silu-1-sentyabrya-2026-g",
        "ru": "Росгвардия: закон №427-ФЗ о частной охране действует с 1 сентября 2026 года",
        "en": "Rosgvardia: private security law 427-FZ in force since September 2026"
      },
      {
        "href": "https://www.rosguard.gov.ru/page/index/voprosy-chastnoj-oxrannoj-deyatelnosti",
        "ru": "Росгвардия: вопросы лицензирования и переходных положений 2026–2027",
        "en": "Rosgvardia: private security licensing and transition-period guidance"
      },
      {
        "href": "https://mintrud.gov.ru/docs/laws/130",
        "ru": "Закон №152-ФЗ о персональных данных, включая обработку видео с людьми",
        "en": "Russian Federal Law 152-FZ on personal data"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение охранных компаний и установщиков видеонаблюдения | GAEO.ru",
        "h1": "GEO-продвижение охранных компаний и систем видеонаблюдения",
        "description": "GEO для ЧОО и подрядчиков по видеонаблюдению: выбор охраны, СКУД, монтажа и сервиса, лицензии, требования к проекту, точность рекомендаций и BMR.",
        "eyebrow": "Локальные услуги / Безопасность объектов",
        "lead": "Управляющий объектом ищет либо лицензированную охранную организацию, либо подрядчика по монтажу видеонаблюдения и СКУД. Это разные услуги с разными доказательствами. Я проверяю рекомендации нейросетей по конкретным типам объектов и задачам заказчиков.",
        "heroPoints": [
          "Отдельные запросы по охране объектов, монтажу CCTV и обслуживанию СКУД",
          "Проверка роли исполнителя, лицензии там, где она необходима, и документированных работ",
          "Замеры BMR по территории, масштабу объекта и составу услуги"
        ],
        "problemTitle": "Почему рекомендации охранных услуг требуют проверки",
        "problemIntro": "Результат поиска должен отвечать не только на вопрос «кто рядом», но и на вопрос «какую именно услугу подрядчик вправе и способен выполнить».",
        "problems": [
          {
            "title": "ЧОО смешивают с монтажником камер",
            "body": "Монтаж и обслуживание технической системы нельзя автоматически считать лицензируемой охранной деятельностью. Для собственно частной охраны необходимо проверять статус организации и применимость закона."
          },
          {
            "title": "Комплектацию выдают за готовое решение",
            "body": "Количество камер не описывает задачу. Значимы сценарии наблюдения, условия освещения, хранение записей, сетевые ограничения, поддержка и согласованные требования заказчика."
          },
          {
            "title": "Не видно географию и обслуживание",
            "body": "Подрядчик может обслуживать один город, а нейросеть советует его по другому региону. Заявления об аварийном выезде, SLA и гарантийных сроках требуют подтверждения."
          }
        ],
        "scenarioTitle": "Какие вопросы задают заказчики охраны и видеонаблюдения",
        "scenarioIntro": "Эти примеры формируют исходную матрицу диагностики. Реальный проект определяется объектом, географией и подтвержденным набором услуг.",
        "columns": [
          "Запрос заказчика",
          "Какие сведения проверять",
          "Что раскрыть для GEO"
        ],
        "scenarios": [
          [
            "Кто имеет право охранять складской комплекс в нашем городе?",
            "Лицензия ЧОО в применимом режиме, территория работы, вид услуги и договор",
            "Разделить охранные услуги и технический монтаж"
          ],
          [
            "Кто спроектирует CCTV для нескольких торговых точек?",
            "Объекты, проектные ограничения, этапы работ, сервис, реальные примеры",
            "Показать опыт многоточечных внедрений без публикации схем безопасности"
          ],
          [
            "Кто установит СКУД в офисном здании?",
            "Модель управления проходами, интеграции, требования к эксплуатации и поддержке",
            "Связать конкретную услугу с типом объекта"
          ],
          [
            "Как выбрать обслуживание камер и видеорегистратора?",
            "Доступный выезд, регламент обслуживания, ответственность за данные и оборудование",
            "Отделить монтаж от последующего договора сервиса"
          ]
        ],
        "proofTitle": "Какие факты позволяют рекомендовать подрядчика по безопасности",
        "proofIntro": "С 1 сентября 2026 года действует федеральный закон №427-ФЗ о частной охранной деятельности, с переходными положениями по лицензиям. Подрядчики, устанавливающие технические системы, и частные охранные организации имеют разные роли. При работе с видео, на котором можно идентифицировать людей, применимость законодательства о персональных данных оценивается отдельно.",
        "checks": [
          "Фактический тип услуги: охрана, проектирование, монтаж видеонаблюдения, СКУД, пусконаладка, техническое обслуживание",
          "При лицензируемой охране: действующий статус, разрешенные виды деятельности и условия договора; при монтаже: документы, компетенции и подтвержденные объекты",
          "География выезда, регламент поддержки, доступность сервиса, безопасные публичные примеры без раскрытия конфиденциальных схем"
        ],
        "proofNote": "Публикуемые сведения о системах безопасности должны быть согласованы с заказчиком. GAEO не заявляет на этой странице выполненных кейсов охранных компаний или измеренного прироста их BMR.",
        "workTitle": "Как работаю с GEO для охранных и монтажных компаний",
        "workIntro": "Сначала разделяю лицензируемые и технические услуги, затем оцениваю точность каждого коммерческого ответа нейросети.",
        "steps": [
          {
            "title": "Собираю стартовые запросы",
            "body": "Группирую вопросы по объекту, услуге, региону, режиму поддержки и требованиям заказчика; фиксирую исходные рекомендации."
          },
          {
            "title": "Сверяю доказательства",
            "body": "Проверяю описание услуг, применимый лицензионный статус, примеры проектов и условия сервиса без раскрытия небезопасных деталей."
          },
          {
            "title": "Готовлю содержание для сайта",
            "body": "Создаю задания для отдельных услуг охраны, монтажа и обслуживания, отраслевых страниц объектов и документации компании."
          },
          {
            "title": "Повторяю BMR",
            "body": "Сравниваю нейросети на той же матрице запросов и отдельно отмечаю ошибки в лицензировании, регионах и компетенциях."
          }
        ],
        "faq": [
          {
            "question": "Нужна ли лицензия ЧОО для любой установки камеры?",
            "answer": "Само по себе техническое подключение камеры нельзя автоматически приравнивать к частной охранной деятельности. Вид услуги и применимость закона №427-ФЗ проверяются отдельно."
          },
          {
            "question": "Какой закон регулирует частную охрану в ноябре 2026 года?",
            "answer": "С 1 сентября 2026 года действует №427-ФЗ с переходными положениями. Для конкретной организации нужно сверять лицензию и разъяснения Росгвардии."
          },
          {
            "question": "Можно ли публиковать схему камер клиента для доказательства опыта?",
            "answer": "Подробные схемы размещения и охранные уязвимости публиковать не требуется. Подойдут согласованные обезличенные сведения о масштабе задачи и выполненных работах."
          },
          {
            "question": "Что измеряется в BMR охранной компании?",
            "answer": "Доля рекомендаций бренда в фиксированной выборке коммерческих запросов. Она не измеряет уровень фактической безопасности объекта."
          },
          {
            "question": "Сколько стоит GEO-продвижение ЧОО или установщика CCTV?",
            "answer": "Применяются единые тарифы GAEO. Объем зависит от типов объектов, числа услуг, территорий и доступности подтверждающих материалов."
          }
        ],
        "ctaTitle": "Проверить нейровидимость охранной или монтажной компании",
        "ctaText": "Пришли сайт, список услуг, регионы работы и типичные объекты. Я подберу исходные запросы для диагностики.",
        "request": "GEO охранной организации или монтажника CCTV: ЧОО, СКУД, видеонаблюдение, объекты, лицензии, сервис и BMR."
      },
      "en": {
        "title": "GEO for security companies and CCTV installers | GAEO.ru",
        "h1": "GEO visibility for security providers and CCTV installers",
        "description": "AI visibility for guarding firms, CCTV and access-control installers: licensing boundaries, service regions, project evidence and BMR.",
        "eyebrow": "Local services / Property security",
        "lead": "Facility managers choose between a licensed guarding provider and a technical installer of cameras or access control. These are different services. I measure which companies AI recommends for specific properties and verify what those firms actually offer.",
        "heroPoints": [
          "Separate prompts for site guarding, CCTV projects and access control service",
          "Evidence of the supplier role, licensing where applicable and real service capability",
          "BMR checks segmented by property type, region and contract scope"
        ],
        "problemTitle": "Why security contractor recommendations need careful verification",
        "problemIntro": "A nearby vendor is not automatically qualified for every type of property security service.",
        "problems": [
          {
            "title": "Guarding and technical installation are conflated",
            "body": "Installing surveillance equipment is not automatically the same as licensed private guarding. The commercial service and relevant legal obligations must be distinguished."
          },
          {
            "title": "Equipment counts replace project scope",
            "body": "A proposed camera count says little about coverage objectives, privacy, recording retention, network constraints or ongoing maintenance. Client-specific requirements must be established."
          },
          {
            "title": "Geography and service response are overstated",
            "body": "AI may recommend a contractor outside its coverage area or imply a service-response guarantee that has not been agreed. Locations, support windows and contract terms require evidence."
          }
        ],
        "scenarioTitle": "Four buyer questions for guarding and surveillance",
        "scenarioIntro": "Illustrative procurement prompts for a baseline rather than claims about completed GAEO security projects.",
        "columns": [
          "Buyer question",
          "Evidence needed",
          "GEO response"
        ],
        "scenarios": [
          [
            "Who can provide compliant guarding for our warehouse locally?",
            "Guarding licence as applicable, service location, scope and contract terms",
            "Clearly distinguish guarding from equipment installation"
          ],
          [
            "Who can install CCTV across several stores?",
            "Documented multi-site delivery capability, support, scope and permissions",
            "Use safe project evidence without exposing security-sensitive layouts"
          ],
          [
            "Who integrates access control into office buildings?",
            "Building type, technical scope, commissioning and support capability",
            "Relate each service to the relevant property use case"
          ],
          [
            "Who maintains existing recorders and CCTV networks?",
            "Coverage area, service terms, response windows and data responsibilities",
            "Differentiate new installation from maintenance"
          ]
        ],
        "proofTitle": "Evidence for accurate security-service recommendations",
        "proofIntro": "Russian Federal Law 427-FZ on private guarding came into effect in September 2026 with transitional licensing provisions. Guarding organisations and system installers have distinct roles. Where surveillance data identifies people, personal-data rules may also be relevant.",
        "checks": [
          "Exact guarding, CCTV, access control and maintenance services offered and the contracting entity",
          "Licence and permitted guarding activities when applicable, or actual technical capability and authorised project references for installers",
          "Documented locations, contractual support and safe public case evidence without confidential protection details"
        ],
        "proofNote": "Site-protection designs and operational security details should not be disclosed as promotional material. No security-client GEO outcome or BMR uplift is claimed here.",
        "workTitle": "A GEO workflow for security contractors",
        "workIntro": "Start with the legal service category and the real buyer's needs, then audit AI descriptions against verified evidence.",
        "steps": [
          {
            "title": "Benchmark procurement prompts",
            "body": "Segment property types, services, regions and support needs, preserving baseline AI recommendations."
          },
          {
            "title": "Validate service credentials",
            "body": "Review guarding licensing where needed, actual project capability and safe-to-publish supporting facts."
          },
          {
            "title": "Improve website structure",
            "body": "Brief service-specific and property-specific pages, support information, clear supplier roles and evidence."
          },
          {
            "title": "Retest the same matrix",
            "body": "Measure BMR consistently and flag false licence, location and capability assertions."
          }
        ],
        "faq": [
          {
            "question": "Does every CCTV installation require a private guarding licence?",
            "answer": "No blanket conclusion should be made. Technical installation and licensed guarding are different service categories; the applicable legal duties must be assessed."
          },
          {
            "question": "Which private guarding law applies in November 2026?",
            "answer": "Federal Law 427-FZ took effect in September 2026 and includes transitional provisions. Provider-specific licences require verification."
          },
          {
            "question": "Can contractor case studies publish security-camera layouts?",
            "answer": "Detailed protection layouts or vulnerabilities should not be used as public promotion. Agreed high-level project facts can provide evidence."
          },
          {
            "question": "What does security BMR measure?",
            "answer": "Brand recommendations in a fixed sample of non-branded buyer prompts. It does not assess how secure a building actually is."
          },
          {
            "question": "What are GAEO's rates for guarding and CCTV services?",
            "answer": "GAEO's published plans apply. Scope varies with service types, properties, regions and available evidence."
          }
        ],
        "ctaTitle": "Check whether AI recommends your security services",
        "ctaText": "Share your website, verified service list, covered areas and typical project types. I will scope the baseline audit.",
        "request": "Security GEO: private guarding, CCTV, access control, service geography, licence checks and BMR."
      }
    }
  },
  {
    "id": 105,
    "slug": "construction-equipment-rental",
    "group": "local-services",
    "routes": {
      "ru": "/industries/construction-equipment-rental/",
      "en": "/en/industries/construction-equipment-rental/"
    },
    "parent": {
      "ru": "/industries/",
      "en": "/en/industries/"
    },
    "methods": {
      "ru": [
        "/strategies/measurement/",
        "/strategies/industrial-supplier-evidence/"
      ],
      "en": [
        "/en/strategies/measurement/",
        "/en/strategies/industrial-supplier-evidence/"
      ]
    },
    "methodLabels": {
      "ru": [
        "Как измеряем BMR",
        "Как проверяю поставщиков промышленной техники"
      ],
      "en": [
        "How BMR is measured",
        "Evidence for industrial equipment suppliers"
      ]
    },
    "sources": [
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_535444/",
        "ru": "Постановление Правительства РФ №625: регистрация самоходных машин, с 01.09.2026",
        "en": "Russian Government Resolution 625: registration of self-propelled machinery, from September 2026"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/1ffe0cb622bfbe86c61d7d6df4c8c6011dfb45fe/",
        "ru": "ГК РФ, статья 632: аренда транспортного средства с экипажем",
        "en": "Russian Civil Code Article 632: vehicle hire with crew"
      },
      {
        "href": "https://www.consultant.ru/document/cons_doc_LAW_9027/0980286733e45f8e2639d616606189838d3f3bcc/",
        "ru": "ГК РФ, статья 642: аренда транспортного средства без экипажа",
        "en": "Russian Civil Code Article 642: vehicle hire without crew"
      }
    ],
    "content": {
      "ru": {
        "title": "GEO-продвижение компаний по аренде спецтехники | GAEO.ru",
        "h1": "GEO-продвижение аренды спецтехники в нейросетях",
        "description": "GEO для аренды экскаваторов, автокранов, подъемников и другой спецтехники: параметры, смены, доставка, оператор, документы, BMR и тарифы GAEO.",
        "eyebrow": "Локальные услуги / Аренда строительной техники",
        "lead": "Подрядчику нужна конкретная машина на объект к определенному сроку, с оператором или без него, по подходящей грузоподъемности и условиям доставки. Я проверяю, какие компании нейросети рекомендуют по таким вопросам и что известно о фактическом парке техники.",
        "heroPoints": [
          "Запросы по типу машины, характеристикам, адресу и дате работ",
          "Различение аренды с оператором, без оператора и оказания работ",
          "Проверка парка, условий подачи, документов и исходной видимости BMR"
        ],
        "problemTitle": "Почему название техники не гарантирует подходящую аренду",
        "problemIntro": "Для строительного объекта важны рабочие параметры, график и модель договора. Рекомендация только по близости и минимальной цене часто непригодна.",
        "problems": [
          {
            "title": "Не учитываются ограничения площадки",
            "body": "Габариты, высота подъема, вылет стрелы, несущая способность основания и доступ к площадке могут исключить формально похожую машину. Требования уточняются по проекту."
          },
          {
            "title": "Смешаны аренда с экипажем и без него",
            "body": "Клиенту могут предложить технику без машиниста, хотя ему нужна услуга с оператором. Различаются договор, ответственность, управление техникой и доступность персонала."
          },
          {
            "title": "Стоимость скрывает реальные условия",
            "body": "Цена за машино-час не показывает минимальную смену, доставку, простой, топливо и дополнительные работы. Нейросеть должна ссылаться на актуальные условия конкретного поставщика."
          }
        ],
        "scenarioTitle": "Как заказчики ищут спецтехнику в нейросетях",
        "scenarioIntro": "Матрица строится по реальным машинам и регионам. Примеры ниже не являются актуальными предложениями наличия техники.",
        "columns": [
          "Запрос клиента",
          "Что надо подтвердить",
          "Что показать для GEO"
        ],
        "scenarios": [
          [
            "Где арендовать экскаватор с оператором на 2 смены?",
            "Модель, ковш, доступность машиниста, территория, сроки и минимальная смена",
            "Уточнить формат услуги и реальный график"
          ],
          [
            "Кто подаст автокран нужной грузоподъемности к объекту?",
            "Модель, конфигурация, вылет и условия площадки, маршрут подачи",
            "Отделить паспортные параметры от условий конкретного подъема"
          ],
          [
            "Какие подъемники арендуют для работ на высоте?",
            "Тип подъемника, рабочая высота, условия применения, доставка, документы",
            "Сформировать точные категории машин по задаче"
          ],
          [
            "Кто сдаст погрузчик на склад в выходные?",
            "Габариты, грузоподъемность, сменность, район и сервисная поддержка",
            "Проверить возможность выполнения заявки в требуемое время"
          ]
        ],
        "proofTitle": "Какие данные нужны для проверяемых рекомендаций спецтехники",
        "proofIntro": "С 1 сентября 2026 года действует постановление №625 о государственной регистрации самоходных машин и других видов техники. К применимым видам аренды транспортных средств относятся разные модели с экипажем и без экипажа по статьям 632 и 642 ГК РФ. Регистрационный режим и тип договора надо определять по конкретной машине и услуге.",
        "checks": [
          "Парк: модели, характеристики, фотографии реальных машин, обслуживаемые регионы и подтвержденная доступность",
          "Договорная модель: есть ли оператор, условия доставки и возврата, смена, простой, работы в выходные и дополнительные расходы",
          "Применимые документы на технику и персонал, проверки технического состояния и ограничения выполнения опасных работ"
        ],
        "proofNote": "На странице нет обещаний GAEO о полученных заказах аренды или доказанном росте BMR у конкретного арендодателя. Наличие техники и цена уточняются на дату заявки.",
        "workTitle": "Как строю GEO-продвижение аренды строительной техники",
        "workIntro": "Отталкиваюсь от параметров машины и сценариев стройплощадки, а не от одинаковых ключей для всех видов спецтехники.",
        "steps": [
          {
            "title": "Замеряю стартовые рекомендации",
            "body": "Разделяю запросы по типу техники, характеристикам, оператору, графику, региону и бюджету; фиксирую ответы и BMR."
          },
          {
            "title": "Проверяю парк и договоры",
            "body": "Сверяю характеристики с документами, реальные сроки подачи, дополнительные услуги, транспорт и ограничения."
          },
          {
            "title": "Готовлю данные для сайта",
            "body": "Создаю задания для страниц моделей, параметрического выбора, условий аренды, доставки и FAQ для подрядчиков."
          },
          {
            "title": "Сравниваю динамику",
            "body": "Повторяю матрицу небрендовых запросов и фиксирую, когда нейросеть рекомендует неподходящую технику или устаревшую цену."
          }
        ],
        "faq": [
          {
            "question": "Достаточно ли грузоподъемности для выбора автокрана?",
            "answer": "Нет. Вылет стрелы, конфигурация, условия площадки и другие ограничения могут изменить допустимую нагрузку. Подбор выполняется по конкретной задаче и документации."
          },
          {
            "question": "Чем отличается аренда спецтехники с оператором?",
            "answer": "Формат с оператором предусматривает предоставление техники с управлением и эксплуатацией силами арендодателя там, где применима такая договорная модель. Условия и ответственность нужно согласовать в договоре."
          },
          {
            "question": "Постановление №625 уже действует в ноябре 2026 года?",
            "answer": "Да, оно вступило в силу 1 сентября 2026 года. Применимость к конкретной единице самоходной техники проверяется отдельно."
          },
          {
            "question": "Можно ли обещать точную цену в ответах нейросетей?",
            "answer": "Только по актуальному подтвержденному предложению, учитывающему смену, доставку и дополнительные условия. Историческая цена из статьи не доказывает сегодняшнюю стоимость."
          },
          {
            "question": "Сколько стоит GEO для компании по аренде спецтехники?",
            "answer": "Действуют единые тарифы GAEO. Объем зависит от числа моделей, регионов, сценариев аренды и доступных первичных данных."
          }
        ],
        "ctaTitle": "Проверить рекомендации нейросетей об аренде вашей техники",
        "ctaText": "Пришли сайт, перечень машин, основные регионы и условия аренды. Я определю структуру стартовой диагностики.",
        "request": "GEO аренды спецтехники: экскаваторы, краны, подъемники, парк, машинист, условия подачи и BMR."
      },
      "en": {
        "title": "GEO for construction equipment rental companies | GAEO.ru",
        "h1": "GEO visibility for construction equipment rental providers",
        "description": "AI visibility for excavator, crane, lift and specialist machinery hire: technical fit, operators, schedules, delivery, evidence and BMR.",
        "eyebrow": "Local services / Equipment hire",
        "lead": "Construction buyers need a specific machine on a specific site, with the right operator arrangement, operating limits and delivery date. I test which rental firms AI platforms recommend and whether the stated fleet and hire conditions can be verified.",
        "heroPoints": [
          "Buyer prompts by machine, capacity, site, location and schedule",
          "Clear distinction between operated and self-drive hire where applicable",
          "Current fleet evidence, dispatch terms and consistent BMR measurements"
        ],
        "problemTitle": "Why a machine name is not enough to recommend a rental provider",
        "problemIntro": "The technical requirement, deployment route and contractual model make the difference between a useful supplier shortlist and a misleading suggestion.",
        "problems": [
          {
            "title": "Site constraints are missing",
            "body": "Working height, reach, load chart, ground conditions and physical access can rule out a seemingly appropriate crane or lift. Selection must relate to the actual task."
          },
          {
            "title": "Operated and unoperated hire are mixed",
            "body": "The buyer may require a driver/operator, while the quoted product excludes one. Staffing, responsibility and contract terms differ by hire model."
          },
          {
            "title": "Rates omit real delivery costs",
            "body": "An hourly price may exclude minimum shifts, mobilization, fuel, waiting and special conditions. AI must not present an old generic quote as today's binding offer."
          }
        ],
        "scenarioTitle": "Four machinery-hire search intents",
        "scenarioIntro": "Examples for diagnostic prompt selection, not promises of live inventory or site-specific equipment suitability.",
        "columns": [
          "Buyer question",
          "Proof required",
          "GEO response"
        ],
        "scenarios": [
          [
            "Where can we hire an excavator with an operator for two shifts?",
            "Model, bucket capacity, operator availability, site area, timing",
            "Match offered hire model to a real schedule"
          ],
          [
            "Who can supply a suitable crane to a constrained site?",
            "Machine configuration, load chart, reach and access constraints",
            "Separate nominal capacity from the actual lifting task"
          ],
          [
            "Which lift rental firms serve our construction zone?",
            "Lift type, working height, safe operating limits, dispatch area",
            "Publish verified use cases and delivery terms"
          ],
          [
            "Who can hire a forklift to our warehouse over a weekend?",
            "Dimensions, capacity, service coverage, staffing and timing",
            "Confirm weekend service and equipment availability"
          ]
        ],
        "proofTitle": "Evidence before recommending construction equipment hire",
        "proofIntro": "Russian Government Resolution 625 introduced registration rules for applicable self-propelled machinery in September 2026. Civil Code Articles 632 and 642 distinguish vehicle-hire arrangements with and without a crew where legally applicable. Contract type and registration status must be evaluated for the actual machine.",
        "checks": [
          "Real fleet inventory, models, operating limitations, inspected photos, coverage area and availability on the requested date",
          "Operated or unoperated contract, mobilization, minimum shift, fuel, idle time and additional costs",
          "Applicable registration and personnel records, servicing and task-specific operating limitations"
        ],
        "proofNote": "No completed rental-industry GEO project or measured client BMR improvement is claimed. Prices and stock are time-sensitive.",
        "workTitle": "A GEO workflow for machinery rental",
        "workIntro": "Commercial prompts start with the job specification and available machinery rather than a generic equipment keyword.",
        "steps": [
          {
            "title": "Benchmark rental prompts",
            "body": "Group requests by machinery, capacity, operator, schedule, location and budget; preserve baseline AI answers."
          },
          {
            "title": "Validate inventory and hire terms",
            "body": "Check machine specifications, actual fleet, dispatch arrangements, applicable documents and contract models."
          },
          {
            "title": "Structure website information",
            "body": "Brief model pages, technical comparison fields, coverage areas, hire terms and procurement FAQs."
          },
          {
            "title": "Retest BMR and accuracy",
            "body": "Use the same sample and flag outdated quotes, unavailable machines and unsafe assumptions."
          }
        ],
        "faq": [
          {
            "question": "Is nominal crane capacity enough to select a rental?",
            "answer": "No. Reach, configuration, site access and specific load-chart limitations are essential to the actual lifting task."
          },
          {
            "question": "Does operated hire differ from renting machinery without an operator?",
            "answer": "Yes. Where the relevant contractual model applies, operated hire includes crew and technical operation by the lessor. The parties should agree actual terms and responsibilities."
          },
          {
            "question": "Are Russia's new machinery-registration rules already in force?",
            "answer": "Government Resolution 625 took effect on 1 September 2026. Applicability depends on the type of machine."
          },
          {
            "question": "Can AI quote an exact current rental price?",
            "answer": "Only from confirmed current terms including shift, delivery and optional costs. Historical website rates are not automatically valid offers."
          },
          {
            "question": "What are GAEO's rates for rental companies?",
            "answer": "Published GAEO plans apply. Scope depends on fleet size, machine types, service areas and procurement scenarios."
          }
        ],
        "ctaTitle": "Check which machinery-rental firms AI recommends",
        "ctaText": "Share your fleet catalogue, service areas, hire terms and website. I will define a useful baseline prompt set.",
        "request": "Construction equipment rental GEO: cranes, lifts, excavators, fleet availability, operated hire, delivery and BMR."
      }
    }
  }
];
