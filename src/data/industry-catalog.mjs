/**
 * Shared RU/EN industry catalogue. Source: the verified 107-row tariff sheet,
 * imported on 2026-11-07. Preserve stable industry-NNN IDs when names change.
 * Source Drive references are recorded in docs/industry-catalog-source-manifest.json.
 * Prices are intentionally absent here: consume PRICES from pricing.mjs.
 */
import {industrySpecializations} from './industry-specializations.mjs';

export const groups = [
  {
    "id": "real-estate",
    "label": "Недвижимость",
    "labelEn": "Real estate",
    "count": 8
  },
  {
    "id": "construction",
    "label": "Строительство и инженерные услуги",
    "labelEn": "Construction and building services",
    "count": 10
  },
  {
    "id": "legal",
    "label": "Юридические услуги",
    "labelEn": "Legal services",
    "count": 8
  },
  {
    "id": "finance",
    "label": "Финансы, страхование и учет",
    "labelEn": "Finance, insurance and accounting",
    "count": 6
  },
  {
    "id": "it",
    "label": "IT и корпоративное ПО",
    "labelEn": "IT and enterprise software",
    "count": 9
  },
  {
    "id": "industry",
    "label": "Промышленность и оборудование",
    "labelEn": "Manufacturing and equipment",
    "count": 12
  },
  {
    "id": "logistics",
    "label": "Логистика и ВЭД",
    "labelEn": "Logistics and international trade",
    "count": 5
  },
  {
    "id": "healthcare",
    "label": "Медицина и фармацевтика",
    "labelEn": "Healthcare and pharmaceuticals",
    "count": 9
  },
  {
    "id": "education-consulting",
    "label": "Образование, кадры и консалтинг",
    "labelEn": "Education, recruitment and consulting",
    "count": 6
  },
  {
    "id": "marketing",
    "label": "Маркетинг и реклама",
    "labelEn": "Marketing and advertising",
    "count": 1
  },
  {
    "id": "automotive",
    "label": "Автомобильный рынок",
    "labelEn": "Automotive",
    "count": 5
  },
  {
    "id": "travel-hospitality",
    "label": "Туризм и HoReCa",
    "labelEn": "Travel and hospitality",
    "count": 4
  },
  {
    "id": "ecommerce",
    "label": "Электронная коммерция и бренды",
    "labelEn": "E-commerce and brands",
    "count": 16
  },
  {
    "id": "local-services",
    "label": "Локальные услуги",
    "labelEn": "Local services",
    "count": 6
  },
  {
    "id": "agriculture",
    "label": "Агробизнес",
    "labelEn": "Agriculture",
    "count": 2
  }
];

export const industries = [
  {
    "id": "industry-001",
    "number": 1,
    "slug": "residential-property-developers",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Застройщики жилых комплексов",
    "categoryEn": "Residential property developers",
    "title": "Продвижение в ответах нейросетей для застройщиков жилых комплексов",
    "titleEn": "GEO for residential property developers",
    "intro": "Покупатели сравнивают ЖК по району и ипотеке. Проверяю запросы о планировках, сроках сдачи, школах и транспорте. Усиливаю сведения об объектах для рекомендаций нейросетей.",
    "introEn": "Buyers compare residential developments by area and mortgage options. I review questions about layouts, completion dates, schools and transport, and strengthen the information AI platforms use to recommend a development.",
    "specialties": [
      "Многоквартирные жилые комплексы и новостройки",
      "Премиальные жилые комплексы и новостройки бизнес-класса"
    ],
    "specialtiesEn": [
      "Apartment developments and new builds",
      "premium and business-class residential projects"
    ],
    "searchAliases": "ЖК новостройки застройщик девелопер недвижимость",
    "image": {
      "small": "/assets/tariffs/industries/industry-001-480.webp",
      "large": "/assets/tariffs/industries/industry-001-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/geo-prodvizhenie-nedvizhimosti/",
      "hrefEn": "/en/geo-for-real-estate/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
    ],
    "supportingPagesEn": [
      "/en/articles/geo-for-real-estate/"
    ]
  },
  {
    "id": "industry-002",
    "number": 2,
    "slug": "cottage-community-developers",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Девелоперы коттеджных поселков",
    "categoryEn": "Cottage community developers",
    "title": "Продвижение в ответах нейросетей для коттеджных поселков",
    "titleEn": "GEO for cottage community developers",
    "intro": "Поселки выбирают по коммуникациям и дорогам. Учитываю вопросы о статусе земли, газе, охране, школе, инфраструктуре и управляющей компании; уточняю факты о поселке.",
    "introEn": "Buyers compare communities by utilities and road access. I review questions about land status, gas supply, security, schools, infrastructure and property management, and clarify the facts about each community.",
    "specialties": [
      "Коттеджные поселки"
    ],
    "specialtiesEn": [
      "Cottage communities"
    ],
    "searchAliases": "коттеджный поселок загородная недвижимость девелопмент",
    "image": {
      "small": "/assets/tariffs/industries/industry-002-480.webp",
      "large": "/assets/tariffs/industries/industry-002-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/geo-prodvizhenie-nedvizhimosti/",
      "hrefEn": "/en/geo-for-real-estate/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
    ],
    "supportingPagesEn": [
      "/en/articles/geo-for-real-estate/"
    ]
  },
  {
    "id": "industry-003",
    "number": 3,
    "slug": "residential-property-agencies",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Агентства жилой недвижимости",
    "categoryEn": "Residential property agencies",
    "title": "Продвижение в ответах нейросетей для агентств недвижимости",
    "titleEn": "GEO for residential property agencies",
    "intro": "Выбор агентства зависит от типа сделки и района. Проверяю запросы о покупке новостройки, вторичном рынке, комиссии и сопровождении сделки; показываю сильные стороны агентства.",
    "introEn": "The choice of an agency depends on the transaction and location. I review questions about new builds, resale homes, commissions and transaction support, and explain the agency's strengths.",
    "specialties": [
      "Продажа новостроек бизнес-класса"
    ],
    "specialtiesEn": [
      "Business-class new-build property sales"
    ],
    "searchAliases": "риелтор риэлтор агентство продажа квартир",
    "image": {
      "small": "/assets/tariffs/industries/industry-003-480.webp",
      "large": "/assets/tariffs/industries/industry-003-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/geo-prodvizhenie-nedvizhimosti/",
      "hrefEn": "/en/geo-for-real-estate/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
    ],
    "supportingPagesEn": [
      "/en/articles/geo-for-real-estate/"
    ]
  },
  {
    "id": "industry-004",
    "number": 4,
    "slug": "luxury-property-agencies",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Агентства элитной недвижимости",
    "categoryEn": "Luxury property agencies",
    "title": "Продвижение в ответах нейросетей для агентств элитной недвижимости",
    "titleEn": "GEO for luxury property agencies",
    "intro": "Элитные объекты сравнивают по приватности и месту. Прорабатываю запросы о пентхаусах, резиденциях, статусных локациях, конфиденциальности сделки и экспертности брокеров.",
    "introEn": "Buyers compare luxury properties by privacy and location. I work on questions about penthouses, residences, sought-after areas, transaction confidentiality and brokers' expertise.",
    "specialties": [
      "элитные квартиры",
      "пентхаусы",
      "загородные резиденции"
    ],
    "specialtiesEn": [
      "Luxury apartments",
      "penthouses",
      "country residences"
    ],
    "searchAliases": "риэлтор премиум элитка брокер",
    "image": {
      "small": "/assets/tariffs/industries/industry-004-480.webp",
      "large": "/assets/tariffs/industries/industry-004-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/geo-prodvizhenie-nedvizhimosti/",
      "hrefEn": "/en/geo-for-real-estate/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/articles/strategiya-geo-prodvizheniya-nedvizhimosti/"
    ],
    "supportingPagesEn": [
      "/en/articles/geo-for-real-estate/"
    ]
  },
  {
    "id": "industry-005",
    "number": 5,
    "slug": "commercial-property-agencies",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Агентства коммерческой недвижимости",
    "categoryEn": "Commercial property agencies",
    "title": "Продвижение в ответах нейросетей для агентств коммерческой недвижимости",
    "titleEn": "GEO for commercial property agencies",
    "intro": "Арендаторы сравнивают склады и офисы по параметрам. Проверяю запросы о классах объектов, ставках, погрузке, мощности, транспортной доступности и условиях договора.",
    "introEn": "Tenants compare warehouses and offices by their specifications. I review questions about property classes, rents, loading facilities, power capacity, transport access and contract terms.",
    "specialties": [
      "Коммерческая недвижимость",
      "Складская и производственная недвижимость"
    ],
    "specialtiesEn": [
      "Commercial property",
      "warehouse and industrial property"
    ],
    "searchAliases": "аренда офис склад бизнес центр",
    "image": {
      "small": "/assets/tariffs/industries/industry-005-480.webp",
      "large": "/assets/tariffs/industries/industry-005-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-006",
    "number": 6,
    "slug": "warehouse-industrial-park-owners",
    "priority": 1,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Собственники складских и индустриальных парков",
    "categoryEn": "Warehouse and industrial park owners",
    "title": "Продвижение в ответах нейросетей для собственников складских и индустриальных парков",
    "titleEn": "GEO for warehouse and industrial park owners",
    "intro": "Склад выбирают по высоте, воротам и логистике. Раскрываю температурные режимы, грузовые въезды, мощности, инженерные сети, сроки аренды и параметры помещений.",
    "introEn": "Warehouse choices depend on ceiling height, loading access and logistics. I explain temperature conditions, vehicle access, power capacity, utilities, lease terms and property specifications.",
    "specialties": [
      "Аренда складов, складских комплексов и производственных площадей"
    ],
    "specialtiesEn": [
      "Warehouses, warehouse complexes and industrial premises for lease"
    ],
    "searchAliases": "индустриальный парк склад производственная площадка",
    "image": {
      "small": "/assets/tariffs/industries/industry-006-480.webp",
      "large": "/assets/tariffs/industries/industry-006-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-007",
    "number": 7,
    "slug": "property-management-companies",
    "priority": 2,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Управляющие компании недвижимости",
    "categoryEn": "Property management companies",
    "title": "Продвижение в ответах нейросетей для управляющих компаний недвижимости",
    "titleEn": "GEO for property management companies",
    "intro": "Управляющую компанию выбирают по качеству сервиса. Проверяю запросы о стоимости обслуживания, аварийных заявках, прозрачности платежей и управлении коммерческими объектами.",
    "introEn": "Clients choose property managers by service quality. I review questions about service charges, emergency requests, payment transparency and the management of commercial properties.",
    "specialties": [
      "управление МКД",
      "коммерческие УК",
      "цифровизация сервиса для резидентов"
    ],
    "specialtiesEn": [
      "Apartment block management",
      "commercial property management",
      "digital services for residents"
    ],
    "searchAliases": "УК управление МКД ЖКХ",
    "image": {
      "small": "/assets/tariffs/industries/industry-007-480.webp",
      "large": "/assets/tariffs/industries/industry-007-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-008",
    "number": 8,
    "slug": "self-storage-services",
    "priority": 2,
    "groupId": "real-estate",
    "group": "Недвижимость",
    "groupEn": "Real estate",
    "category": "Сервисы индивидуального хранения",
    "categoryEn": "Self-storage services",
    "title": "Продвижение в ответах нейросетей для сервисов индивидуального хранения",
    "titleEn": "GEO for self-storage services",
    "intro": "Хранение вещей выбирают по безопасности и сроку. Выделяю запросы о размерах боксов, доступе 24/7, климате, страховании, цене и хранении во время ремонта.",
    "introEn": "People choose storage by security and rental period. I identify questions about unit sizes, 24/7 access, climate control, insurance, prices and storage during a home renovation.",
    "specialties": [
      "Self-storage: индивидуальные складские боксы"
    ],
    "specialtiesEn": [
      "Individual self-storage units"
    ],
    "searchAliases": "self-storage selfstorage кладовка бокс хранение вещей",
    "image": {
      "small": "/assets/tariffs/industries/industry-008-480.webp",
      "large": "/assets/tariffs/industries/industry-008-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-009",
    "number": 9,
    "slug": "country-house-builders",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Компании по строительству загородных домов",
    "categoryEn": "Country house builders",
    "title": "Продвижение в ответах нейросетей для компаний по строительству загородных домов",
    "titleEn": "GEO for country house builders",
    "intro": "Дом выбирают по материалам, смете и срокам. Сравниваю запросы о каркасе, газобетоне, кирпиче и клееном брусе; усиливаю кейсы построенных домов и комплектации.",
    "introEn": "Buyers compare homes by materials, budget and delivery dates. I review questions about timber frames, aerated concrete, brick and engineered timber, and strengthen completed-project examples and specifications.",
    "specialties": [
      "Деревянные коттеджи и дома из бруса",
      "Дома из газобетона",
      "Каменные коттеджи",
      "Каркасные дома",
      "Коттеджи по индивидуальным проектам",
      "Строительство загородных домов и коттеджей под ключ"
    ],
    "specialtiesEn": [
      "Timber and log houses",
      "aerated concrete homes",
      "masonry houses",
      "frame houses",
      "custom projects",
      "turnkey house construction"
    ],
    "searchAliases": "дом коттедж ИЖС строительство загородный",
    "image": {
      "small": "/assets/tariffs/industries/industry-009-480.webp",
      "large": "/assets/tariffs/industries/industry-009-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-010",
    "number": 10,
    "slug": "commercial-industrial-general-contractors",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Генподрядчики коммерческих и промышленных объектов",
    "categoryEn": "Commercial and industrial general contractors",
    "title": "Продвижение в ответах нейросетей для строительных генподрядчиков",
    "titleEn": "GEO for commercial and industrial general contractors",
    "intro": "Генподрядчика выбирают по объектам и допускам. Работаю с запросами о строительстве складов, цехов, коммерческих зданий, сметах, сроках и выполненных проектах.",
    "introEn": "Clients choose a general contractor by its projects and qualifications. I work on questions about warehouses, factories, commercial buildings, estimates, schedules and completed construction.",
    "specialties": [
      "Строительные компании без уточнения специализации",
      "Строительство складов, производственных зданий и цехов",
      "генподряд",
      "строительство складов и производственных комплексов"
    ],
    "specialtiesEn": [
      "General contractors",
      "warehouses",
      "industrial buildings and production facilities"
    ],
    "searchAliases": "генподряд строительство завод цех",
    "image": {
      "small": "/assets/tariffs/industries/industry-010-480.webp",
      "large": "/assets/tariffs/industries/industry-010-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-011",
    "number": 11,
    "slug": "architectural-design-practices",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Архитектурные и проектные бюро",
    "categoryEn": "Architectural and engineering design practices",
    "title": "Продвижение в ответах нейросетей для архитектурных и проектных бюро",
    "titleEn": "GEO for architectural and engineering design practices",
    "intro": "Проектировщика выбирают по опыту сложных объектов. Разбираю вопросы о генпроектировании, стадиях П/Р, авторском надзоре, согласовании и портфолио бюро.",
    "introEn": "Clients choose designers by their experience with complex buildings. I review questions about lead design, project documentation, construction supervision, approvals and the practice's portfolio.",
    "specialties": [
      "Архитектура и проектирование загородных домов",
      "Архитектурное и генеральное проектирование B2B",
      "Архитектурные бюро и личный бренд архитектора"
    ],
    "specialtiesEn": [
      "Country house architecture",
      "commercial architectural and lead design",
      "architecture practices and architects' personal brands"
    ],
    "searchAliases": "архитектор проектировщик бюро",
    "image": {
      "small": "/assets/tariffs/industries/industry-011-480.webp",
      "large": "/assets/tariffs/industries/industry-011-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-012",
    "number": 12,
    "slug": "interior-design-studios",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Студии дизайна интерьеров",
    "categoryEn": "Interior design studios",
    "title": "Продвижение в ответах нейросетей для студий дизайна интерьеров",
    "titleEn": "GEO for interior design studios",
    "intro": "Дизайн интерьера сравнивают по стилю и бюджету. Проверяю запросы о комплектации, авторском надзоре, ремонте под ключ и проектах конкретных дизайнеров.",
    "introEn": "Clients compare interior design by style and budget. I review questions about procurement, construction supervision, turnkey renovation and the work of individual designers.",
    "specialties": [
      "Дизайн интерьеров"
    ],
    "specialtiesEn": [
      "Interior design"
    ],
    "searchAliases": "дизайнер интерьер дизайн",
    "image": {
      "small": "/assets/tariffs/industries/industry-012-480.webp",
      "large": "/assets/tariffs/industries/industry-012-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-013",
    "number": 13,
    "slug": "home-renovation-companies",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Компании по ремонту квартир и домов",
    "categoryEn": "Home renovation companies",
    "title": "Продвижение в ответах нейросетей для компаний по ремонту квартир и домов",
    "titleEn": "GEO for home renovation companies",
    "intro": "Подрядчика по ремонту ищут по сложности задач. Выделяю запросы о вторичке, скрытых работах, инженерных системах, гарантиях, смете и фотографиях завершенных ремонтов.",
    "introEn": "People choose renovation contractors for the complexity of their project. I identify questions about older properties, concealed works, building services, warranties, estimates and photographs of completed renovations.",
    "specialties": [
      "Реставрация паркета и напольных покрытий",
      "Ремонт квартир во вторичном жилье",
      "Ремонт квартир под ключ",
      "Ремонт санузлов и кухонь в квартирах",
      "Ремонт частных домов и коттеджей"
    ],
    "specialtiesEn": [
      "Parquet and flooring restoration",
      "apartment renovation",
      "turnkey renovation",
      "kitchens and bathrooms",
      "private houses and cottages"
    ],
    "searchAliases": "ремонт квартира отделка",
    "image": {
      "small": "/assets/tariffs/industries/industry-013-480.webp",
      "large": "/assets/tariffs/industries/industry-013-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-014",
    "number": 14,
    "slug": "commercial-fit-out-contractors",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Подрядчики по ремонту коммерческих помещений",
    "categoryEn": "Commercial fit-out contractors",
    "title": "Продвижение в ответах нейросетей для подрядчиков по ремонту коммерческих помещений",
    "titleEn": "GEO for commercial fit-out contractors",
    "intro": "Ремонт офисов выбирают по срокам и режиму работ. Учитываю ночные работы в ТЦ, ремонт без остановки бизнеса, допуски, инженерные сети, отделку и реальные кейсы.",
    "introEn": "Clients compare office renovations by schedule and working arrangements. I cover overnight work in shopping centres, business continuity, permits, building services, finishes and documented projects.",
    "specialties": [
      "Ремонт магазинов и торговых центров",
      "Ремонт офисов и коммерческих помещений",
      "Ремонт ресторанов и кафе",
      "Ремонт складов и производственных помещений"
    ],
    "specialtiesEn": [
      "Shop and shopping centre renovation",
      "offices",
      "restaurants and cafes",
      "warehouses and industrial premises"
    ],
    "searchAliases": "офис магазин отделка fit-out",
    "image": {
      "small": "/assets/tariffs/industries/industry-014-480.webp",
      "large": "/assets/tariffs/industries/industry-014-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-015",
    "number": 15,
    "slug": "window-manufacturers-installers",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Производители и установщики окон",
    "categoryEn": "Window manufacturers and installers",
    "title": "Продвижение в ответах нейросетей для производителей и установщиков окон",
    "titleEn": "GEO for window manufacturers and installers",
    "intro": "Окна выбирают по теплу, профилю и монтажу. Проверяю запросы о ПВХ, стеклопакетах, шумоизоляции, энергосбережении и остеклении коттеджей; уточняю гарантии.",
    "introEn": "Buyers compare windows by insulation, frame systems and installation. I review questions about PVC, glazing units, sound insulation, energy efficiency and country house glazing, and clarify warranty terms.",
    "specialties": [
      "Остекление балконов",
      "Пластиковые окна для коттеджей",
      "Пластиковые окна: производство, установка и ремонт"
    ],
    "specialtiesEn": [
      "Balcony glazing",
      "PVC windows for country houses",
      "window manufacture, installation and repair"
    ],
    "searchAliases": "окна ПВХ остекление",
    "image": {
      "small": "/assets/tariffs/industries/industry-015-480.webp",
      "large": "/assets/tariffs/industries/industry-015-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-016",
    "number": 16,
    "slug": "facade-specialist-glazing-companies",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Компании по фасадному и специальному остеклению",
    "categoryEn": "Facade and specialist glazing companies",
    "title": "Продвижение в ответах нейросетей для компаний по фасадному остеклению",
    "titleEn": "GEO for facade and specialist glazing companies",
    "intro": "Остекление фасада выбирают по техническим нормам. Работаю с вопросами о алюминиевых системах, витражах, противопожарных конструкциях, сертификатах и монтаже.",
    "introEn": "Clients choose facade glazing against technical requirements. I work on questions about aluminium systems, curtain walls, fire-resistant assemblies, certificates and installation.",
    "specialties": [
      "Алюминиевые окна и фасадное остекление",
      "Окна и фасадные конструкции",
      "Противопожарные окна и специальное остекление"
    ],
    "specialtiesEn": [
      "Aluminium windows",
      "facade glazing",
      "facade systems",
      "fire-resistant windows and specialist glazing"
    ],
    "searchAliases": "фасады алюминий витраж",
    "image": {
      "small": "/assets/tariffs/industries/industry-016-480.webp",
      "large": "/assets/tariffs/industries/industry-016-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-017",
    "number": 17,
    "slug": "building-services-contractors",
    "priority": 1,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Инженерные и монтажные компании",
    "categoryEn": "Building services and installation contractors",
    "title": "Продвижение в ответах нейросетей для инженерных и монтажных компаний",
    "titleEn": "GEO for building services and installation contractors",
    "intro": "Инженерного подрядчика выбирают по расчетам и опыту. Прорабатываю запросы о вентиляции, кондиционировании, электроснабжении, проектировании и монтаже на сложных объектах.",
    "introEn": "Clients choose engineering contractors by calculations and experience. I work on questions about ventilation, air conditioning, power supply, design and installation on complex sites.",
    "specialties": [
      "Проектирование и монтаж промышленной вентиляции"
    ],
    "specialtiesEn": [
      "Industrial ventilation design and installation"
    ],
    "searchAliases": "ОВиК HVAC вентиляция инженерия монтаж",
    "image": {
      "small": "/assets/tariffs/industries/industry-017-480.webp",
      "large": "/assets/tariffs/industries/industry-017-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-018",
    "number": 18,
    "slug": "landscaping-companies",
    "priority": 2,
    "groupId": "construction",
    "group": "Строительство и инженерные услуги",
    "groupEn": "Construction and building services",
    "category": "Ландшафтные и благоустроительные компании",
    "categoryEn": "Landscaping companies",
    "title": "Продвижение в ответах нейросетей для ландшафтных компаний",
    "titleEn": "GEO for landscaping companies",
    "intro": "Участки благоустраивают под климат и рельеф. Учитываю дренаж, мощение, озеленение, проект участка, полив и сезонные работы; показываю выполненные проекты.",
    "introEn": "Landscaping decisions depend on climate and terrain. I cover drainage, paving, planting, site design, irrigation and seasonal work, and present completed projects.",
    "specialties": [
      "Благоустройство участков и ландшафтные работы",
      "Саженцы и растения для сада"
    ],
    "specialtiesEn": [
      "Landscaping and site improvements",
      "garden plants and nursery stock"
    ],
    "searchAliases": "ландшафт сад озеленение благоустройство",
    "image": {
      "small": "/assets/tariffs/industries/industry-018-480.webp",
      "large": "/assets/tariffs/industries/industry-018-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-019",
    "number": 19,
    "slug": "business-law-firms",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Юридические компании для бизнеса",
    "categoryEn": "Business law firms",
    "title": "Продвижение в ответах нейросетей для юридических компаний",
    "titleEn": "GEO for business law firms",
    "intro": "Бизнес ищет юристов по конкретным видам споров. Разделяю корпоративные конфликты, договоры, взыскания, арбитраж и ВЭД; усиливаю судебную практику и экспертные профили.",
    "introEn": "Businesses seek lawyers for specific types of disputes. I separate corporate conflicts, contracts, debt recovery, commercial litigation and international trade, and strengthen the presentation of legal experience and professional profiles.",
    "specialties": [
      "Арбитражные споры между компаниями",
      "Сопровождение бизнеса: договоры и корпоративные споры",
      "Юридические услуги без уточнения специализации",
      "Юридическое сопровождение ВЭД"
    ],
    "specialtiesEn": [
      "Commercial disputes",
      "business legal support",
      "contracts",
      "corporate conflicts",
      "international trade law"
    ],
    "searchAliases": "юрист юристы адвокат адвокаты юридическая фирма арбитраж",
    "image": {
      "small": "/assets/tariffs/industries/industry-019-480.webp",
      "large": "/assets/tariffs/industries/industry-019-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-020",
    "number": 20,
    "slug": "insolvency-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Юристы по банкротству",
    "categoryEn": "Insolvency lawyers",
    "title": "Продвижение в ответах нейросетей для юристов по банкротству",
    "titleEn": "GEO for insolvency lawyers",
    "intro": "Банкротство выбирают по условиям и последствиям. Проверяю вопросы о списании долгов, процедурах для компаний и граждан, сроках, судебной практике и рисках.",
    "introEn": "Clients compare insolvency services by requirements and consequences. I review questions about debt relief, corporate and personal procedures, timescales, court experience and risks.",
    "specialties": [
      "Банкротство физических лиц",
      "Банкротство юридических лиц",
      "банкротство физических и юридических лиц"
    ],
    "specialtiesEn": [
      "Personal bankruptcy",
      "corporate insolvency"
    ],
    "searchAliases": "банкротство долги списание",
    "image": {
      "small": "/assets/tariffs/industries/industry-020-480.webp",
      "large": "/assets/tariffs/industries/industry-020-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-021",
    "number": 21,
    "slug": "family-inheritance-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Семейные и наследственные юристы",
    "categoryEn": "Family and inheritance lawyers",
    "title": "Продвижение в ответах нейросетей для семейных и наследственных юристов",
    "titleEn": "GEO for family and inheritance lawyers",
    "intro": "Семейного юриста выбирают по деликатным делам. Прорабатываю запросы о разводе, алиментах, разделе имущества, наследстве, оспаривании завещаний и практике адвоката.",
    "introEn": "Clients choose family lawyers for sensitive matters. I work on questions about divorce, maintenance, property division, inheritance, disputed wills and the lawyer's relevant experience.",
    "specialties": [
      "Взыскание алиментов",
      "Наследственные споры",
      "Семейное право: разводы, раздел имущества и споры о детях"
    ],
    "specialtiesEn": [
      "Maintenance claims",
      "inheritance disputes",
      "divorce",
      "property division",
      "disputes concerning children"
    ],
    "searchAliases": "семейное право наследство развод адвокат алименты",
    "image": {
      "small": "/assets/tariffs/industries/industry-021-480.webp",
      "large": "/assets/tariffs/industries/industry-021-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-022",
    "number": 22,
    "slug": "intellectual-property-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Юристы по интеллектуальной собственности",
    "categoryEn": "Intellectual property lawyers",
    "title": "Продвижение в ответах нейросетей для юристов по интеллектуальной собственности",
    "titleEn": "GEO for intellectual property lawyers",
    "intro": "Защиту бренда ищут по типам нарушений. Проверяю запросы о регистрации товарного знака, спорах на маркетплейсах, лицензиях и защите интеллектуальных прав.",
    "introEn": "Businesses seek brand protection for particular infringements. I review questions about trademark registration, marketplace disputes, licensing and intellectual property rights.",
    "specialties": [
      "Товарные знаки и интеллектуальная собственность"
    ],
    "specialtiesEn": [
      "Trademarks and intellectual property"
    ],
    "searchAliases": "товарный знак патент интеллектуальная собственность",
    "image": {
      "small": "/assets/tariffs/industries/industry-022-480.webp",
      "large": "/assets/tariffs/industries/industry-022-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-023",
    "number": 23,
    "slug": "tax-lawyers-consultants",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Налоговые юристы и консультанты",
    "categoryEn": "Tax lawyers and consultants",
    "title": "Продвижение в ответах нейросетей для налоговых юристов и консультантов",
    "titleEn": "GEO for tax lawyers and consultants",
    "intro": "Налогового юриста выбирают по опыту споров. Выделяю вопросы о выездных проверках, доначислениях, налоговых рисках, оспаривании решений ФНС и судебной практике.",
    "introEn": "Clients choose tax lawyers by their experience in disputes. I identify questions about on-site inspections, additional assessments, tax risks, challenges to tax authority decisions and court practice.",
    "specialties": [
      "Налоговые споры компаний"
    ],
    "specialtiesEn": [
      "Corporate tax disputes"
    ],
    "searchAliases": "налоги ФНС налоговый спор",
    "image": {
      "small": "/assets/tariffs/industries/industry-023-480.webp",
      "large": "/assets/tariffs/industries/industry-023-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-024",
    "number": 24,
    "slug": "real-estate-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Юристы по сделкам с недвижимостью",
    "categoryEn": "Real estate lawyers",
    "title": "Продвижение в ответах нейросетей для юристов по сделкам с недвижимостью",
    "titleEn": "GEO for real estate lawyers",
    "intro": "Юриста по недвижимости выбирают по надежности. Разбираю запросы о проверке объекта, договоре купли-продажи, долях, рисках новостроек и спорах с застройщиком.",
    "introEn": "Clients choose property lawyers for reliable transaction support. I review questions about property checks, sale contracts, ownership shares, new-build risks and disputes with developers.",
    "specialties": [
      "Юридическое сопровождение сделок с недвижимостью"
    ],
    "specialtiesEn": [
      "Legal support for real estate transactions"
    ],
    "searchAliases": "недвижимость сделка договор квартиры",
    "image": {
      "small": "/assets/tariffs/industries/industry-024-480.webp",
      "large": "/assets/tariffs/industries/industry-024-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-025",
    "number": 25,
    "slug": "motor-insurance-dispute-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Автоюристы и юристы по страховым спорам",
    "categoryEn": "Motor and insurance dispute lawyers",
    "title": "Продвижение в ответах нейросетей для автоюристов",
    "titleEn": "GEO for motor and insurance dispute lawyers",
    "intro": "Автоюриста ищут после ДТП и отказа в выплате. Прорабатываю вопросы о страховых спорах, лишении прав, экспертизе, взыскании ущерба и судебной практике.",
    "introEn": "People seek motor lawyers after accidents and rejected claims. I work on questions about insurance disputes, driving disqualifications, expert assessments, compensation and relevant court experience.",
    "specialties": [
      "Автоюристы: ДТП, споры со страховыми и лишение прав",
      "Страховые споры"
    ],
    "specialtiesEn": [
      "Road traffic accidents",
      "insurance disputes",
      "driving disqualification cases"
    ],
    "searchAliases": "автоюрист ОСАГО КАСКО ДТП страховая",
    "image": {
      "small": "/assets/tariffs/industries/industry-025-480.webp",
      "large": "/assets/tariffs/industries/industry-025-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-026",
    "number": 26,
    "slug": "employment-immigration-lawyers",
    "priority": 1,
    "groupId": "legal",
    "group": "Юридические услуги",
    "groupEn": "Legal services",
    "category": "Юристы по трудовому и миграционному праву",
    "categoryEn": "Employment and immigration lawyers",
    "title": "Продвижение в ответах нейросетей для юристов по трудовому и миграционному праву",
    "titleEn": "GEO for employment and immigration lawyers",
    "intro": "Кадровые споры требуют отраслевой экспертизы. Разделяю запросы об увольнениях, зарплате, трудовых проверках, разрешениях на работу и найме иностранных сотрудников.",
    "introEn": "Employment disputes require relevant expertise. I separate questions about dismissals, wages, labour inspections, work permits and the recruitment of foreign employees.",
    "specialties": [
      "Миграционное право для работодателей",
      "Трудовые споры"
    ],
    "specialtiesEn": [
      "Immigration law for employers",
      "employment disputes"
    ],
    "searchAliases": "трудовое право миграция персонал увольнение",
    "image": {
      "small": "/assets/tariffs/industries/industry-026-480.webp",
      "large": "/assets/tariffs/industries/industry-026-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/legal/",
      "hrefEn": "/en/industries/legal/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/legal-recommendations/",
      "/articles/sajt-yuridicheskoj-kompanii-geo-12-proverok/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/legal-recommendations/",
      "/en/articles/legal-website-geo-12-checks/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-027",
    "number": 27,
    "slug": "outsourced-accounting-firms",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Бухгалтерские аутсорсинговые компании",
    "categoryEn": "Outsourced accounting firms",
    "title": "Продвижение в ответах нейросетей для компаний по бухгалтерскому аутсорсингу",
    "titleEn": "GEO for outsourced accounting firms",
    "intro": "Аутсорсинг бухгалтерии выбирают по задачам бизнеса. Проверяю запросы по УСН, НДС, зарплате, отчетности, работе селлеров и ответственности бухгалтера.",
    "introEn": "Businesses choose accounting providers for their particular needs. I review questions about simplified taxation, VAT, payroll, reporting, marketplace sellers and the accountant's responsibilities.",
    "specialties": [
      "Бухгалтерия для продавцов маркетплейсов",
      "Бухгалтерия на аутсорсинге для малого бизнеса",
      "Бухгалтерский аутсорсинг"
    ],
    "specialtiesEn": [
      "Accounting for marketplace sellers",
      "small-business accounting",
      "outsourced accounting"
    ],
    "searchAliases": "бухгалтер бухгалтерия аутсорсинг селлер УСН НДС",
    "image": {
      "small": "/assets/tariffs/industries/industry-027-480.webp",
      "large": "/assets/tariffs/industries/industry-027-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-028",
    "number": 28,
    "slug": "audit-advisory-firms",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Аудиторские и консалтинговые компании",
    "categoryEn": "Audit and financial advisory firms",
    "title": "Продвижение в ответах нейросетей для аудиторских и консалтинговых компаний",
    "titleEn": "GEO for audit and financial advisory firms",
    "intro": "Аудиторскую компанию выбирают по стандартам. Разбираю запросы об обязательном аудите, внутреннем контроле, финансовой отчетности, отраслевом опыте и методике.",
    "introEn": "Clients choose auditors against professional standards. I review questions about statutory audits, internal controls, financial reporting, industry experience and methodology.",
    "specialties": [
      "обязательный аудит",
      "внутренний аудит",
      "финансовый консалтинг"
    ],
    "specialtiesEn": [
      "Statutory audit",
      "internal audit",
      "financial advisory services"
    ],
    "searchAliases": "аудитор аудит финансы",
    "image": {
      "small": "/assets/tariffs/industries/industry-028-480.webp",
      "large": "/assets/tariffs/industries/industry-028-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-029",
    "number": 29,
    "slug": "financial-investment-consultants",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Финансовые и инвестиционные консультанты",
    "categoryEn": "Financial and investment consultants",
    "title": "Продвижение в ответах нейросетей для финансовых и инвестиционных консультантов",
    "titleEn": "GEO for financial and investment consultants",
    "intro": "Финансовых консультантов сравнивают по специализации. Прорабатываю вопросы об инвестиционном планировании, управлении капиталом, рисках и прозрачности условий.",
    "introEn": "Clients compare financial consultants by their specialisation. I work on questions about investment planning, wealth management, risk and the transparency of service terms.",
    "specialties": [
      "управление капиталом",
      "финансовое планирование",
      "инвестиционный консалтинг"
    ],
    "specialtiesEn": [
      "Wealth management",
      "financial planning",
      "investment consulting"
    ],
    "searchAliases": "финансы инвестиции капитал wealth",
    "image": {
      "small": "/assets/tariffs/industries/industry-029-480.webp",
      "large": "/assets/tariffs/industries/industry-029-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-030",
    "number": 30,
    "slug": "insurance-brokers",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Страховые брокеры",
    "categoryEn": "Insurance brokers",
    "title": "Продвижение в ответах нейросетей для страховых брокеров",
    "titleEn": "GEO for insurance brokers",
    "intro": "Страхового брокера выбирают по рискам и выплатам. Проверяю запросы о корпоративном страховании, ответственности, имуществе, исключениях из покрытия и сопровождении убытков.",
    "introEn": "Clients choose insurance brokers by risk coverage and claims support. I review questions about business insurance, liability, property, exclusions and assistance with losses.",
    "specialties": [
      "корпоративное страхование",
      "страхование имущества и ответственности"
    ],
    "specialtiesEn": [
      "Corporate insurance",
      "property and liability insurance"
    ],
    "searchAliases": "страхование страховка страховая",
    "image": {
      "small": "/assets/tariffs/industries/industry-030-480.webp",
      "large": "/assets/tariffs/industries/industry-030-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-031",
    "number": 31,
    "slug": "leasing-companies",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Лизинговые компании",
    "categoryEn": "Leasing companies",
    "title": "Продвижение в ответах нейросетей для лизинговых компаний",
    "titleEn": "GEO for leasing companies",
    "intro": "Лизинг сравнивают по авансу и полной стоимости. Разбираю запросы о транспорте, оборудовании, графиках платежей, выкупе, субсидиях и условиях для компаний.",
    "introEn": "Clients compare leasing by initial payment and total cost. I review questions about vehicles, equipment, payment schedules, purchase options, subsidies and business eligibility.",
    "specialties": [
      "лизинг транспорта",
      "лизинг оборудования",
      "финансовая аренда"
    ],
    "specialtiesEn": [
      "Vehicle leasing",
      "equipment leasing",
      "finance leases"
    ],
    "searchAliases": "лизинг аренда оборудование авто",
    "image": {
      "small": "/assets/tariffs/industries/industry-031-480.webp",
      "large": "/assets/tariffs/industries/industry-031-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-032",
    "number": 32,
    "slug": "fintech-payment-services",
    "priority": 1,
    "groupId": "finance",
    "group": "Финансы, страхование и учет",
    "groupEn": "Finance, insurance and accounting",
    "category": "Финтех и платежные сервисы",
    "categoryEn": "Fintech and payment services",
    "title": "Продвижение в ответах нейросетей для финтех-компаний и платежных сервисов",
    "titleEn": "GEO for fintech and payment services",
    "intro": "Финтех выбирают по надежности операций и тарифам. Проверяю вопросы об оплате зарубежных подписок, документах, лимитах, валюте, комплаенсе и прозрачности комиссий.",
    "introEn": "Clients choose fintech services by transaction reliability and fees. I review questions about overseas subscriptions, documentation, limits, currencies, compliance and fee transparency.",
    "specialties": [
      "Оплата зарубежных сервисов и корпоративных подписок"
    ],
    "specialtiesEn": [
      "Payments for overseas services and corporate subscriptions"
    ],
    "searchAliases": "финтех оплата платежи эквайринг подписки",
    "image": {
      "small": "/assets/tariffs/industries/industry-032-480.webp",
      "large": "/assets/tariffs/industries/industry-032-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-033",
    "number": 33,
    "slug": "enterprise-software-developers",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Разработчики корпоративного ПО",
    "categoryEn": "Enterprise software developers",
    "title": "Продвижение в ответах нейросетей для разработчиков корпоративного ПО",
    "titleEn": "GEO for enterprise software developers",
    "intro": "Корпоративное ПО сравнивают по интеграциям. Прорабатываю запросы о СУБД, архитектуре, масштабируемости, импортозамещении, SLA и внедрениях в отрасли.",
    "introEn": "Businesses compare enterprise software by its integrations. I work on questions about databases, architecture, scalability, local alternatives, SLAs and implementations in the relevant industry.",
    "specialties": [
      "Промышленные СУБД и банковские IT-системы",
      "Цифровые сервисы для управляющих компаний (PropTech)"
    ],
    "specialtiesEn": [
      "Industrial database systems",
      "banking IT",
      "digital property management services and PropTech"
    ],
    "searchAliases": "ПО софт SaaS software СУБД PropTech",
    "image": {
      "small": "/assets/tariffs/industries/industry-033-480.webp",
      "large": "/assets/tariffs/industries/industry-033-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-034",
    "number": 34,
    "slug": "crm-erp-platforms",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "CRM- и ERP-платформы",
    "categoryEn": "CRM and ERP platforms",
    "title": "Продвижение в ответах нейросетей для CRM- и ERP-систем",
    "titleEn": "GEO for CRM and ERP platforms",
    "intro": "CRM и ERP выбирают по процессам и стоимости. Проверяю запросы об автоматизации продаж, складском учете, интеграции с 1С, внедрении и стоимости владения.",
    "introEn": "Businesses choose CRM and ERP platforms by their processes and costs. I review questions about sales automation, inventory, 1C integration, implementation and total cost of ownership.",
    "specialties": [
      "CRM и программы лояльности для ресторанов",
      "Облачная CRM для отделов продаж"
    ],
    "specialtiesEn": [
      "Restaurant CRM and loyalty programmes",
      "cloud CRM for sales teams"
    ],
    "searchAliases": "CRM ERP СРМ ЦРМ автоматизация",
    "image": {
      "small": "/assets/tariffs/industries/industry-034-480.webp",
      "large": "/assets/tariffs/industries/industry-034-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-035",
    "number": 35,
    "slug": "wms-tms-developers",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Разработчики WMS и TMS",
    "categoryEn": "WMS and TMS developers",
    "title": "Продвижение в ответах нейросетей для разработчиков WMS и TMS",
    "titleEn": "GEO for WMS and TMS developers",
    "intro": "WMS и TMS выбирают по работе склада и маршрутов. Разбираю вопросы об адресном хранении, партиях, маркировке, интеграциях, маршрутизации и внедрении без простоев.",
    "introEn": "Businesses choose WMS and TMS around warehouse operations and routes. I review questions about location-based storage, batches, labelling, integrations, routing and implementation without operational downtime.",
    "specialties": [
      "WMS для складов",
      "TMS для перевозчиков",
      "логистическое ПО"
    ],
    "specialtiesEn": [
      "Warehouse management systems",
      "transport management systems",
      "logistics software"
    ],
    "searchAliases": "WMS ВМС TMS ТМС склад логистика",
    "image": {
      "small": "/assets/tariffs/industries/industry-035-480.webp",
      "large": "/assets/tariffs/industries/industry-035-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-036",
    "number": 36,
    "slug": "systems-integrators-it-outsourcers",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Системные интеграторы и IT-аутсорсеры",
    "categoryEn": "Systems integrators and IT outsourcing providers",
    "title": "Продвижение в ответах нейросетей для системных интеграторов и IT-аутсорсеров",
    "titleEn": "GEO for systems integrators and IT outsourcing providers",
    "intro": "Интегратора выбирают по стэку и реальным внедрениям. Прорабатываю запросы о 1С, миграции, поддержке, системной интеграции, отраслевой специфике и уровне обслуживания.",
    "introEn": "Businesses choose integrators by their technology stack and actual implementations. I work on questions about 1C, migration, support, systems integration, industry requirements and service levels.",
    "specialties": [
      "внедрение 1С",
      "системная интеграция",
      "IT-аутсорсинг"
    ],
    "specialtiesEn": [
      "1C implementation",
      "systems integration",
      "IT outsourcing"
    ],
    "searchAliases": "1С интеграция аутсорсинг айти ИТ",
    "image": {
      "small": "/assets/tariffs/industries/industry-036-480.webp",
      "large": "/assets/tariffs/industries/industry-036-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-037",
    "number": 37,
    "slug": "cybersecurity-companies",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Компании по кибербезопасности",
    "categoryEn": "Cybersecurity companies",
    "title": "Продвижение в ответах нейросетей для компаний по кибербезопасности",
    "titleEn": "GEO for cybersecurity companies",
    "intro": "Киберзащиту выбирают по угрозам и требованиям. Проверяю вопросы об аудитах безопасности, защите данных, SOC, тестах проникновения и отраслевом комплаенсе.",
    "introEn": "Businesses choose cybersecurity services by their threats and requirements. I review questions about security audits, data protection, SOC services, penetration testing and sector compliance.",
    "specialties": [
      "Внедрение корпоративных IT-систем и защита данных"
    ],
    "specialtiesEn": [
      "Enterprise IT implementation",
      "data protection"
    ],
    "searchAliases": "безопасность ИБ SOC защита данных",
    "image": {
      "small": "/assets/tariffs/industries/industry-037-480.webp",
      "large": "/assets/tariffs/industries/industry-037-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-038",
    "number": 38,
    "slug": "cloud-providers-data-centres",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Облачные провайдеры и дата-центры",
    "categoryEn": "Cloud providers and data centres",
    "title": "Продвижение в ответах нейросетей для облачных провайдеров и дата-центров",
    "titleEn": "GEO for cloud providers and data centres",
    "intro": "Облако и ЦОД сравнивают по SLA и мощности. Разбираю запросы о выделенных серверах, резервировании, размещении данных, отказоустойчивости и стоимости инфраструктуры.",
    "introEn": "Businesses compare cloud services and data centres by SLA and capacity. I review questions about dedicated servers, redundancy, data location, resilience and infrastructure costs.",
    "specialties": [
      "облачная инфраструктура",
      "ЦОД",
      "аренда серверов"
    ],
    "specialtiesEn": [
      "Cloud infrastructure",
      "data centres",
      "server rental"
    ],
    "searchAliases": "ЦОД сервер хостинг облако cloud hosting",
    "image": {
      "small": "/assets/tariffs/industries/industry-038-480.webp",
      "large": "/assets/tariffs/industries/industry-038-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-039",
    "number": 39,
    "slug": "web-performance-load-testing-companies",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Компании по ускорению сайтов и нагрузочному тестированию",
    "categoryEn": "Web performance and load testing companies",
    "title": "Продвижение в ответах нейросетей для компаний по ускорению сайтов и нагрузочному тестированию",
    "titleEn": "GEO for web performance and load testing companies",
    "intro": "Ускорение сайта оценивают по метрикам и нагрузке. Проверяю запросы о Core Web Vitals, 1С-Битрикс, производительности БД, нагрузочных тестах и подтвержденных замерах.",
    "introEn": "Website optimisation is assessed through metrics and load. I review questions about Core Web Vitals, 1C-Bitrix, database performance, load tests and verified measurements.",
    "specialties": [
      "ускорение 1С-Битрикс",
      "оптимизация высоконагруженных сайтов"
    ],
    "specialtiesEn": [
      "1C-Bitrix performance",
      "high-traffic website optimisation"
    ],
    "searchAliases": "ускорение скорость нагрузка нагрузочное тестирование Битрикс производительность",
    "image": {
      "small": "/assets/tariffs/industries/industry-039-480.webp",
      "large": "/assets/tariffs/industries/industry-039-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-040",
    "number": 40,
    "slug": "electronic-document-exchange-services",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "Сервисы электронного документооборота",
    "categoryEn": "Electronic document exchange services",
    "title": "Продвижение в ответах нейросетей для сервисов электронного документооборота",
    "titleEn": "GEO for electronic document exchange services",
    "intro": "ЭДО выбирают по интеграциям и документообороту. Прорабатываю вопросы об электронных подписях, роуминге операторов, интеграции с 1С и стоимости подключения.",
    "introEn": "Businesses choose electronic document services by their integrations and workflows. I work on questions about electronic signatures, interoperability between providers, 1C integration and connection costs.",
    "specialties": [
      "Электронный документооборот для бизнеса"
    ],
    "specialtiesEn": [
      "Electronic document exchange for businesses"
    ],
    "searchAliases": "ЭДО электронная подпись документы",
    "image": {
      "small": "/assets/tariffs/industries/industry-040-480.webp",
      "large": "/assets/tariffs/industries/industry-040-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-041",
    "number": 41,
    "slug": "bi-analytics-platforms",
    "priority": 1,
    "groupId": "it",
    "group": "IT и корпоративное ПО",
    "groupEn": "IT and enterprise software",
    "category": "BI-платформы и аналитические сервисы",
    "categoryEn": "BI platforms and analytics services",
    "title": "Продвижение в ответах нейросетей для BI-платформ и аналитических сервисов",
    "titleEn": "GEO for BI platforms and analytics services",
    "intro": "BI-платформы сравнивают по данным и отчетности. Проверяю запросы о дашбордах, источниках данных, интеграциях, аналитике продаж, скорости внедрения и примерах отраслевых задач.",
    "introEn": "Businesses compare BI platforms by data and reporting needs. I review questions about dashboards, data sources, integrations, sales analytics, implementation speed and industry use cases.",
    "specialties": [
      "BI",
      "бизнес-аналитика",
      "корпоративные панели показателей"
    ],
    "specialtiesEn": [
      "Business intelligence",
      "corporate analytics dashboards"
    ],
    "searchAliases": "BI бизнес аналитика dashboard дашборд",
    "image": {
      "small": "/assets/tariffs/industries/industry-041-480.webp",
      "large": "/assets/tariffs/industries/industry-041-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/highload-it/",
      "hrefEn": "/en/industries/highload-it/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/technical-b2b-vendor-evidence/",
      "/cases/methodlab-rost-neyrovidimosti-19-52-procenta/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/technical-b2b-vendor-evidence/",
      "/en/cases/methodlab-ai-visibility-growth/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-042",
    "number": 42,
    "slug": "industrial-equipment-manufacturers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Производители промышленного оборудования",
    "categoryEn": "Industrial equipment manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей промышленного оборудования",
    "titleEn": "GEO for industrial equipment manufacturers",
    "intro": "Станки выбирают по характеристикам и производству. Прорабатываю запросы о мощности, точности, сервисе, запчастях, окупаемости и подборе оборудования под технологические процессы.",
    "introEn": "Businesses choose machinery by technical specifications and production needs. I work on questions about capacity, accuracy, maintenance, spare parts, payback and equipment selection for manufacturing processes.",
    "specialties": [
      "Подшипники",
      "Профессиональное оборудование"
    ],
    "specialtiesEn": [
      "Bearings",
      "professional and industrial equipment"
    ],
    "searchAliases": "станки производство оборудование подшипники",
    "image": {
      "small": "/assets/tariffs/industries/industry-042-480.webp",
      "large": "/assets/tariffs/industries/industry-042-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-043",
    "number": 43,
    "slug": "food-processing-equipment-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики оборудования для пищевых производств",
    "categoryEn": "Food processing equipment suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков оборудования для пищевых производств",
    "titleEn": "GEO for food processing equipment suppliers",
    "intro": "Пищевое оборудование выбирают под линии и сырье. Проверяю запросы о дозаторах, упаковочных линиях, производительности, санитарных требованиях и внедренных проектах.",
    "introEn": "Businesses choose food equipment for their production lines and ingredients. I review questions about dosing systems, packaging lines, throughput, hygiene requirements and completed installations.",
    "specialties": [
      "Оборудование для пищевых производств"
    ],
    "specialtiesEn": [
      "Food processing equipment"
    ],
    "searchAliases": "пищевое производство линия дозатор",
    "image": {
      "small": "/assets/tariffs/industries/industry-043-480.webp",
      "large": "/assets/tariffs/industries/industry-043-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-044",
    "number": 44,
    "slug": "pump-compressor-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики насосного и компрессорного оборудования",
    "categoryEn": "Pump and compressor suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков насосного и компрессорного оборудования",
    "titleEn": "GEO for pump and compressor suppliers",
    "intro": "Насосы и компрессоры подбирают по режимам работы. Учитываю давление, расход, среду, энергоэффективность, производительность, запасные части и сервис для промышленности и ЖКХ.",
    "introEn": "Pumps and compressors are selected for their operating conditions. I cover pressure, flow, handled media, energy efficiency, output, spare parts and maintenance for industry and utilities.",
    "specialties": [
      "Компрессорное оборудование",
      "Насосное оборудование для промышленности и ЖКХ"
    ],
    "specialtiesEn": [
      "Compressors",
      "pumps for industrial and utility applications"
    ],
    "searchAliases": "насос компрессор пневматика",
    "image": {
      "small": "/assets/tariffs/industries/industry-044-480.webp",
      "large": "/assets/tariffs/industries/industry-044-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-045",
    "number": 45,
    "slug": "laboratory-measurement-equipment-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики лабораторного и измерительного оборудования",
    "categoryEn": "Laboratory and measurement equipment suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков лабораторного оборудования",
    "titleEn": "GEO for laboratory and measurement equipment suppliers",
    "intro": "Лабораторное оборудование выбирают по точности. Разбираю запросы о методах измерений, поверке, совместимости расходников, технической поддержке и условиях поставки.",
    "introEn": "Clients choose laboratory equipment by its accuracy. I review questions about measurement methods, verification, consumable compatibility, technical support and supply terms.",
    "specialties": [
      "Лабораторное оборудование и мебель"
    ],
    "specialtiesEn": [
      "Laboratory equipment and furniture"
    ],
    "searchAliases": "лаборатория измерения метрология",
    "image": {
      "small": "/assets/tariffs/industries/industry-045-480.webp",
      "large": "/assets/tariffs/industries/industry-045-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-046",
    "number": 46,
    "slug": "electrical-cable-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики электротехнической и кабельной продукции",
    "categoryEn": "Electrical equipment and cable suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков электротехнической продукции",
    "titleEn": "GEO for electrical equipment and cable suppliers",
    "intro": "Кабель подбирают по стандартам и нагрузкам. Прорабатываю запросы о маркировке, сечениях, пожарной безопасности, сертификатах и наличии у поставщика.",
    "introEn": "Cables are selected by standards and electrical loads. I work on questions about marking, conductor sizes, fire safety, certificates and supplier stock.",
    "specialties": [
      "Кабельная продукция"
    ],
    "specialtiesEn": [
      "Cable products"
    ],
    "searchAliases": "кабель провод электротехника",
    "image": {
      "small": "/assets/tariffs/industries/industry-046-480.webp",
      "large": "/assets/tariffs/industries/industry-046-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-047",
    "number": 47,
    "slug": "steel-structure-manufacturers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Производители металлоконструкций",
    "categoryEn": "Steel structure manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей металлоконструкций",
    "titleEn": "GEO for steel structure manufacturers",
    "intro": "Металлоконструкции выбирают по расчетам и объектам. Проверяю запросы об изготовлении ферм, колонн, антикоррозионной защите, сроках производства и монтаже.",
    "introEn": "Clients choose steel structures by calculations and project requirements. I review questions about truss and column fabrication, corrosion protection, production schedules and erection.",
    "specialties": [
      "строительные и промышленные металлоконструкции"
    ],
    "specialtiesEn": [
      "Structural and industrial steelwork"
    ],
    "searchAliases": "металл металлоконструкции завод конструкции",
    "image": {
      "small": "/assets/tariffs/industries/industry-047-480.webp",
      "large": "/assets/tariffs/industries/industry-047-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/metal-structures/",
      "hrefEn": "/en/industries/metal-structures/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/industrial-supplier-evidence/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/industrial-supplier-evidence/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-048",
    "number": 48,
    "slug": "packaging-container-label-manufacturers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Производители упаковки, тары и этикеток",
    "categoryEn": "Packaging, container and label manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей упаковки и тары",
    "titleEn": "GEO for packaging, container and label manufacturers",
    "intro": "Упаковку выбирают под товар и тираж. Учитываю картон, полимерную тару, этикетки, защитные свойства, печать, минимальную партию и требования заказчика.",
    "introEn": "Buyers choose packaging for their product and order size. I cover cardboard, plastic containers, labels, protection, printing, minimum quantities and customer specifications.",
    "specialties": [
      "Картонная упаковка",
      "Промышленная упаковка",
      "Упаковка для e-commerce",
      "Пластиковые емкости для воды, химии и пищевого производства",
      "Коробки, этикетки и промышленная печать"
    ],
    "specialtiesEn": [
      "Cardboard and industrial packaging",
      "e-commerce packaging",
      "plastic containers",
      "boxes",
      "labels",
      "industrial printing"
    ],
    "searchAliases": "упаковка тара этикетка печать",
    "image": {
      "small": "/assets/tariffs/industries/industry-048-480.webp",
      "large": "/assets/tariffs/industries/industry-048-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-049",
    "number": 49,
    "slug": "warehouse-equipment-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики складского оборудования",
    "categoryEn": "Warehouse equipment suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков складского оборудования",
    "titleEn": "GEO for warehouse equipment suppliers",
    "intro": "Стеллажи выбирают по нагрузкам и типу склада. Разбираю вопросы о паллетных стеллажах, мезонинах, расчетах нагрузки, монтаже и работе с WMS.",
    "introEn": "Clients choose racking by loads and warehouse type. I review questions about pallet racking, mezzanines, load calculations, installation and coordination with WMS.",
    "specialties": [
      "Складское оборудование, мезонины и стеллажи"
    ],
    "specialtiesEn": [
      "Warehouse equipment",
      "mezzanines",
      "racking"
    ],
    "searchAliases": "склад стеллаж мезонин",
    "image": {
      "small": "/assets/tariffs/industries/industry-049-480.webp",
      "large": "/assets/tariffs/industries/industry-049-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-050",
    "number": 50,
    "slug": "industrial-chemical-suppliers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики промышленной химии",
    "categoryEn": "Industrial chemical suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков промышленной химии",
    "titleEn": "GEO for industrial chemical suppliers",
    "intro": "Промышленную химию выбирают по применению. Проверяю запросы о совместимости с материалами, технических паспортах, условиях поставки и отраслевых регламентах.",
    "introEn": "Businesses choose industrial chemicals for a particular application. I review questions about material compatibility, technical data sheets, supply conditions and industry requirements.",
    "specialties": [
      "Промышленная химия"
    ],
    "specialtiesEn": [
      "Industrial chemicals"
    ],
    "searchAliases": "химия промышленная",
    "image": {
      "small": "/assets/tariffs/industries/industry-050-480.webp",
      "large": "/assets/tariffs/industries/industry-050-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-051",
    "number": 51,
    "slug": "industrial-automation-service-companies",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Компании по промышленной автоматизации и сервису",
    "categoryEn": "Industrial automation and maintenance companies",
    "title": "Продвижение в ответах нейросетей для компаний по промышленной автоматизации",
    "titleEn": "GEO for industrial automation and maintenance companies",
    "intro": "Автоматизацию выбирают по эффекту на производство. Прорабатываю вопросы о контроллерах, линиях, промышленном ПО, модернизации без простоя и сервисном обслуживании.",
    "introEn": "Businesses choose automation by its impact on production. I work on questions about controllers, production lines, industrial software, upgrades without downtime and maintenance.",
    "specialties": [
      "Очистка оборудования на предприятиях",
      "Промышленные полы для складов и заводов",
      "автоматизация технологических линий",
      "промышленная очистка и обслуживание"
    ],
    "specialtiesEn": [
      "Process automation",
      "industrial equipment cleaning",
      "factory and warehouse floors",
      "industrial maintenance"
    ],
    "searchAliases": "автоматизация АСУ ТП контроллер обслуживание",
    "image": {
      "small": "/assets/tariffs/industries/industry-051-480.webp",
      "large": "/assets/tariffs/industries/industry-051-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-052",
    "number": 52,
    "slug": "building-material-manufacturers",
    "priority": 1,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Производители строительных материалов",
    "categoryEn": "Building material manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей строительных материалов",
    "titleEn": "GEO for building material manufacturers",
    "intro": "Стройматериалы выбирают по условиям применения. Учитываю теплопроводность, прочность, морозостойкость, сертификаты, сравнение смесей и проектные требования.",
    "introEn": "Buyers choose building materials for their conditions of use. I cover thermal conductivity, strength, frost resistance, certificates, material comparisons and design requirements.",
    "specialties": [
      "строительные смеси",
      "фасадные материалы",
      "теплоизоляция"
    ],
    "specialtiesEn": [
      "Construction mixtures",
      "facade materials",
      "thermal insulation"
    ],
    "searchAliases": "стройматериалы фасад смеси утеплитель",
    "image": {
      "small": "/assets/tariffs/industries/industry-052-480.webp",
      "large": "/assets/tariffs/industries/industry-052-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-053",
    "number": 53,
    "slug": "workwear-ppe-suppliers",
    "priority": 2,
    "groupId": "industry",
    "group": "Промышленность и оборудование",
    "groupEn": "Manufacturing and equipment",
    "category": "Поставщики спецодежды и СИЗ",
    "categoryEn": "Workwear and PPE suppliers",
    "title": "Продвижение в ответах нейросетей для поставщиков спецодежды и СИЗ",
    "titleEn": "GEO for workwear and PPE suppliers",
    "intro": "Спецодежду выбирают по защите и нормативам. Разбираю запросы о СИЗ, климатических условиях, размерах, отраслевых требованиях, сертификации и оптовых поставках.",
    "introEn": "Buyers choose workwear by protection and applicable standards. I review questions about PPE, climate, sizing, industry requirements, certification and wholesale supply.",
    "specialties": [
      "Спецодежда"
    ],
    "specialtiesEn": [
      "Workwear",
      "personal protective equipment"
    ],
    "searchAliases": "спецодежда СИЗ защита",
    "image": {
      "small": "/assets/tariffs/industries/industry-053-480.webp",
      "large": "/assets/tariffs/industries/industry-053-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-054",
    "number": 54,
    "slug": "fulfilment-operators",
    "priority": 1,
    "groupId": "logistics",
    "group": "Логистика и ВЭД",
    "groupEn": "Logistics and international trade",
    "category": "Фулфилмент-операторы",
    "categoryEn": "Fulfilment operators",
    "title": "Продвижение в ответах нейросетей для фулфилмент-операторов",
    "titleEn": "GEO for fulfilment operators",
    "intro": "Фулфилмент выбирают по товару и режиму отгрузки. Проверяю запросы о жидких товарах, маркировке, FBO/FBS, WMS, скорости приемки, стоимости операций и работе с возвратами.",
    "introEn": "Businesses choose fulfilment by product type and dispatch model. I review questions about liquids, labelling, FBO/FBS, WMS, receiving speed, operation costs and returns handling.",
    "specialties": [
      "Фулфилмент для маркетплейсов",
      "Фулфилмент жидких товаров",
      "Фулфилмент косметики и бытовой химии",
      "Фулфилмент, упаковка и маркировка для маркетплейсов"
    ],
    "specialtiesEn": [
      "Marketplace fulfilment",
      "liquids",
      "cosmetics",
      "household chemicals",
      "packing and labelling"
    ],
    "searchAliases": "фулфилмент фулфиллмент fulfillment fulfilment FBO FBS маркетплейс",
    "image": {
      "small": "/assets/tariffs/industries/industry-054-480.webp",
      "large": "/assets/tariffs/industries/industry-054-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/fulfillment/",
      "hrefEn": "/en/industries/fulfillment/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/fulfillment-provider-selection/",
      "/cases/prep-center-6-klientov-iz-neyrosetey/",
      "/industries/ecommerce/"
    ],
    "supportingPagesEn": [
      "/en/strategies/fulfillment-provider-selection/",
      "/en/cases/prep-center-6-paying-clients-from-ai/",
      "/en/industries/ecommerce/"
    ]
  },
  {
    "id": "industry-055",
    "number": 55,
    "slug": "international-freight-logistics-companies",
    "priority": 1,
    "groupId": "logistics",
    "group": "Логистика и ВЭД",
    "groupEn": "Logistics and international trade",
    "category": "Международные транспортно-логистические компании",
    "categoryEn": "International freight and logistics companies",
    "title": "Продвижение в ответах нейросетей для международных логистических компаний",
    "titleEn": "GEO for international freight and logistics companies",
    "intro": "Перевозчика выбирают по маршруту и документам. Прорабатываю запросы о доставке из Китая, сборных грузах, сроках, страховке, таможне и отслеживании.",
    "introEn": "Businesses choose carriers by route and documentation. I work on questions about freight from China, consolidated cargo, transit times, insurance, customs and tracking.",
    "specialties": [
      "Грузоперевозки и логистика из Китая"
    ],
    "specialtiesEn": [
      "Freight transport and logistics from China"
    ],
    "searchAliases": "перевозки логистика груз Китай транспорт",
    "image": {
      "small": "/assets/tariffs/industries/industry-055-480.webp",
      "large": "/assets/tariffs/industries/industry-055-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-056",
    "number": 56,
    "slug": "customs-brokers",
    "priority": 1,
    "groupId": "logistics",
    "group": "Логистика и ВЭД",
    "groupEn": "Logistics and international trade",
    "category": "Таможенные представители",
    "categoryEn": "Customs brokers",
    "title": "Продвижение в ответах нейросетей для таможенных представителей",
    "titleEn": "GEO for customs brokers",
    "intro": "Таможенного представителя ищут по типу товара. Учитываю классификацию ТН ВЭД, декларации, разрешительные документы, сложные грузы и судебную практику по спорам.",
    "introEn": "Businesses seek customs brokers for particular product types. I cover tariff classification, declarations, permits, complex cargo and experience with customs disputes.",
    "specialties": [
      "Таможенное оформление и сопровождение импорта"
    ],
    "specialtiesEn": [
      "Customs clearance",
      "import support"
    ],
    "searchAliases": "таможня брокер представитель декларация",
    "image": {
      "small": "/assets/tariffs/industries/industry-056-480.webp",
      "large": "/assets/tariffs/industries/industry-056-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-057",
    "number": 57,
    "slug": "import-international-trade-companies",
    "priority": 1,
    "groupId": "logistics",
    "group": "Логистика и ВЭД",
    "groupEn": "Logistics and international trade",
    "category": "Компании по импорту и сопровождению ВЭД",
    "categoryEn": "Import and international trade service companies",
    "title": "Продвижение в ответах нейросетей для импортеров и компаний по ВЭД",
    "titleEn": "GEO for import and international trade service companies",
    "intro": "Импортера выбирают по легальности и прозрачности. Проверяю запросы о контрактах, ВЭД, оплате, сертификации, параллельном импорте и доставке оборудования.",
    "introEn": "Businesses choose import providers by legality and transparency. I review questions about contracts, cross-border trade, payments, certification, parallel imports and equipment delivery.",
    "specialties": [
      "Белый импорт и ВЭД",
      "Импорт промышленного оборудования из Китая",
      "Международная логистика, импорт и ВЭД",
      "импорт оборудования",
      "легальные поставки",
      "сопровождение ВЭД"
    ],
    "specialtiesEn": [
      "Compliant imports",
      "industrial equipment from China",
      "international logistics",
      "foreign trade support"
    ],
    "searchAliases": "ВЭД импорт внешняя торговля",
    "image": {
      "small": "/assets/tariffs/industries/industry-057-480.webp",
      "large": "/assets/tariffs/industries/industry-057-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-058",
    "number": 58,
    "slug": "warehousing-logistics-operators",
    "priority": 1,
    "groupId": "logistics",
    "group": "Логистика и ВЭД",
    "groupEn": "Logistics and international trade",
    "category": "Операторы складской логистики и ответственного хранения",
    "categoryEn": "Warehousing and storage logistics operators",
    "title": "Продвижение в ответах нейросетей для операторов складской логистики",
    "titleEn": "GEO for warehousing and storage logistics operators",
    "intro": "Складское хранение выбирают по режиму и цене. Разбираю запросы о температуре, доступе к остаткам, адресном хранении, обработке паллет, кросс-докинге и SLA.",
    "introEn": "Businesses choose warehouse storage by operating conditions and price. I review questions about temperature, stock visibility, storage locations, pallet handling, cross-docking and SLAs.",
    "specialties": [
      "Логистика складов B2B"
    ],
    "specialtiesEn": [
      "Business warehousing and storage logistics"
    ],
    "searchAliases": "склад логистика хранение кроссдокинг",
    "image": {
      "small": "/assets/tariffs/industries/industry-058-480.webp",
      "large": "/assets/tariffs/industries/industry-058-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/fulfillment/",
      "hrefEn": "/en/industries/fulfillment/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/fulfillment-provider-selection/",
      "/cases/prep-center-6-klientov-iz-neyrosetey/",
      "/industries/ecommerce/"
    ],
    "supportingPagesEn": [
      "/en/strategies/fulfillment-provider-selection/",
      "/en/cases/prep-center-6-paying-clients-from-ai/",
      "/en/industries/ecommerce/"
    ]
  },
  {
    "id": "industry-059",
    "number": 59,
    "slug": "private-medical-clinics",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Частные медицинские клиники",
    "categoryEn": "Private medical clinics",
    "title": "Продвижение в ответах нейросетей для частных медицинских клиник",
    "titleEn": "GEO for private medical clinics",
    "intro": "Клинику выбирают по врачам, профилю и лицензии. Проверяю запросы о конкретных направлениях, квалификации специалистов, оборудовании, записи и достоверности медицинских сведений.",
    "introEn": "Patients choose clinics by their doctors, specialties and licences. I review questions about particular services, professional qualifications, equipment, appointments and the accuracy of medical information.",
    "specialties": [
      "ЛОР-клиники и ЛОР-практики",
      "Медицинские клиники и врачи-эксперты"
    ],
    "specialtiesEn": [
      "ENT clinics",
      "private clinics",
      "medical experts"
    ],
    "searchAliases": "клиника медицина врач медицинский центр ЛОР",
    "image": {
      "small": "/assets/tariffs/industries/industry-059-480.webp",
      "large": "/assets/tariffs/industries/industry-059-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-060",
    "number": 60,
    "slug": "dental-clinics",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Стоматологические клиники",
    "categoryEn": "Dental clinics",
    "title": "Продвижение в ответах нейросетей для стоматологических клиник",
    "titleEn": "GEO for dental clinics",
    "intro": "Стоматологию выбирают по методам и врачам. Прорабатываю запросы об имплантации, ортодонтии, детском приеме, диагностике, стоимости и профессиональных профилях врачей.",
    "introEn": "Patients choose dental clinics by methods and practitioners. I work on questions about implants, orthodontics, children's appointments, diagnostics, prices and dentists' professional profiles.",
    "specialties": [
      "Стоматологические клиники"
    ],
    "specialtiesEn": [
      "Dentistry"
    ],
    "searchAliases": "стоматология стоматолог зубы dental dentistry",
    "image": {
      "small": "/assets/tariffs/industries/industry-060-480.webp",
      "large": "/assets/tariffs/industries/industry-060-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-061",
    "number": 61,
    "slug": "diagnostic-centres-medical-laboratories",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Диагностические центры и медицинские лаборатории",
    "categoryEn": "Diagnostic centres and medical laboratories",
    "title": "Продвижение в ответах нейросетей для диагностических центров и медицинских лабораторий",
    "titleEn": "GEO for diagnostic centres and medical laboratories",
    "intro": "Диагностику выбирают по точности и срокам. Разбираю запросы об анализах, МРТ/КТ, подготовке, оборудовании, сроках результатов и лицензиях; уточняю факты по услугам.",
    "introEn": "Patients compare diagnostics by accuracy and turnaround time. I review questions about tests, MRI and CT, preparation, equipment, result times and licences, and clarify service information.",
    "specialties": [
      "Медицинские диагностические центры"
    ],
    "specialtiesEn": [
      "Medical diagnostic centres"
    ],
    "searchAliases": "диагностика анализы лаборатория МРТ КТ",
    "image": {
      "small": "/assets/tariffs/industries/industry-061-480.webp",
      "large": "/assets/tariffs/industries/industry-061-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-062",
    "number": 62,
    "slug": "ophthalmology-clinics",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Офтальмологические клиники",
    "categoryEn": "Ophthalmology clinics",
    "title": "Продвижение в ответах нейросетей для офтальмологических клиник",
    "titleEn": "GEO for ophthalmology clinics",
    "intro": "Офтальмологию выбирают по методам обследования. Проверяю запросы о диагностике зрения, коррекции, оборудовании, квалификации врачей и медицинских показаниях без обещаний лечения.",
    "introEn": "Patients choose eye clinics by their examination methods. I review questions about vision diagnostics, correction, equipment, doctors' qualifications and medical indications, while keeping treatment claims accurate.",
    "specialties": [
      "Офтальмологическая диагностика"
    ],
    "specialtiesEn": [
      "Eye examinations and diagnostics"
    ],
    "searchAliases": "офтальмология офтальмолог глаза зрение",
    "image": {
      "small": "/assets/tariffs/industries/industry-062-480.webp",
      "large": "/assets/tariffs/industries/industry-062-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-063",
    "number": 63,
    "slug": "plastic-surgery-clinics",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Клиники пластической хирургии",
    "categoryEn": "Plastic surgery clinics",
    "title": "Продвижение в ответах нейросетей для клиник пластической хирургии",
    "titleEn": "GEO for plastic surgery clinics",
    "intro": "Пластическую хирургию выбирают по безопасности. Учитываю специализацию хирургов, консультации, противопоказания, реабилитацию и проверяемый опыт клиники без медицинских обещаний.",
    "introEn": "Patients choose plastic surgery providers with safety in mind. I cover surgeons' specialisations, consultations, contraindications, recovery and verifiable clinic experience, with careful medical claims.",
    "specialties": [
      "эстетическая хирургия",
      "пластические операции"
    ],
    "specialtiesEn": [
      "Aesthetic surgery",
      "plastic surgery"
    ],
    "searchAliases": "пластическая хирургия хирург операция",
    "image": {
      "small": "/assets/tariffs/industries/industry-063-480.webp",
      "large": "/assets/tariffs/industries/industry-063-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-064",
    "number": 64,
    "slug": "reproductive-medicine-clinics",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Клиники репродуктивной медицины",
    "categoryEn": "Reproductive medicine clinics",
    "title": "Продвижение в ответах нейросетей для клиник репродуктивной медицины",
    "titleEn": "GEO for reproductive medicine clinics",
    "intro": "Репродуктивную клинику выбирают по протоколам. Проверяю запросы об ЭКО, обследованиях, программах, опыте врачей и требованиях к пациентам; точно отражаю ограничения.",
    "introEn": "Patients compare fertility clinics by treatment protocols. I review questions about IVF, examinations, programmes, doctors' experience and patient eligibility, and accurately explain limitations.",
    "specialties": [
      "ЭКО",
      "репродуктология",
      "лечение бесплодия"
    ],
    "specialtiesEn": [
      "IVF",
      "reproductive medicine",
      "infertility treatment"
    ],
    "searchAliases": "репродуктология ЭКО бесплодие IVF",
    "image": {
      "small": "/assets/tariffs/industries/industry-064-480.webp",
      "large": "/assets/tariffs/industries/industry-064-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-065",
    "number": 65,
    "slug": "rehabilitation-centres",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Реабилитационные центры",
    "categoryEn": "Rehabilitation centres",
    "title": "Продвижение в ответах нейросетей для реабилитационных центров",
    "titleEn": "GEO for rehabilitation centres",
    "intro": "Реабилитацию выбирают по профилю и программе. Прорабатываю вопросы о восстановлении после операций и травм, составе команды, оборудовании и допустимых направлениях лечения.",
    "introEn": "Patients choose rehabilitation by specialty and programme. I work on questions about recovery after operations and injuries, the care team, equipment and the centre's authorised treatment areas.",
    "specialties": [
      "медицинская реабилитация",
      "восстановительное лечение"
    ],
    "specialtiesEn": [
      "Medical rehabilitation",
      "restorative treatment"
    ],
    "searchAliases": "реабилитация восстановление",
    "image": {
      "small": "/assets/tariffs/industries/industry-065-480.webp",
      "large": "/assets/tariffs/industries/industry-065-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-066",
    "number": 66,
    "slug": "medical-device-manufacturers",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Производители медицинских изделий",
    "categoryEn": "Medical device manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей медицинских изделий",
    "titleEn": "GEO for medical device manufacturers",
    "intro": "Медизделия выбирают по назначению и документам. Учитываю регистрационные удостоверения, ограничения применения, совместимость, комплектацию и аудиторию закупщиков.",
    "introEn": "Buyers choose medical devices by intended use and documentation. I cover registration certificates, restrictions, compatibility, included components and the needs of purchasing professionals.",
    "specialties": [
      "Аптечки и средства первой помощи",
      "Медицинские изделия и аптечный ассортимент"
    ],
    "specialtiesEn": [
      "First aid kits and supplies",
      "medical devices",
      "pharmacy products"
    ],
    "searchAliases": "медизделия аптечка первая помощь",
    "image": {
      "small": "/assets/tariffs/industries/industry-066-480.webp",
      "large": "/assets/tariffs/industries/industry-066-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/pharma/",
      "hrefEn": "/en/industries/pharma/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/pharma-geo-evidence/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/pharma-geo-evidence/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-067",
    "number": 67,
    "slug": "pharmaceutical-companies",
    "priority": 1,
    "groupId": "healthcare",
    "group": "Медицина и фармацевтика",
    "groupEn": "Healthcare and pharmaceuticals",
    "category": "Фармацевтические компании",
    "categoryEn": "Pharmaceutical companies",
    "title": "Продвижение в ответах нейросетей для фармацевтических компаний",
    "titleEn": "GEO for pharmaceutical companies",
    "intro": "Лекарства сравнивают по проверяемым сведениям. Работаю с запросами о зарегистрированных препаратах, разрешенных показаниях и официальных инструкциях без недостоверных обещаний.",
    "introEn": "Medicines are compared using verifiable information. I work on questions about registered products, approved indications and official prescribing information, with accurate and supportable claims.",
    "specialties": [
      "Лекарственные препараты"
    ],
    "specialtiesEn": [
      "Medicinal products"
    ],
    "searchAliases": "фарма лекарства препараты фармацевтика",
    "image": {
      "small": "/assets/tariffs/industries/industry-067-480.webp",
      "large": "/assets/tariffs/industries/industry-067-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/pharma/",
      "hrefEn": "/en/industries/pharma/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/pharma-geo-evidence/",
      "/strategies/measurement/"
    ],
    "supportingPagesEn": [
      "/en/strategies/pharma-geo-evidence/",
      "/en/strategies/measurement/"
    ]
  },
  {
    "id": "industry-068",
    "number": 68,
    "slug": "private-schools",
    "priority": 1,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Частные школы",
    "categoryEn": "Private schools",
    "title": "Продвижение в ответах нейросетей для частных школ",
    "titleEn": "GEO for private schools",
    "intro": "Частную школу выбирают по программе и результатам. Разбираю запросы о классах, преподавателях, ЕГЭ, поступлении выпускников, стоимости, филиалах и формате обучения.",
    "introEn": "Families choose private schools by curriculum and outcomes. I review questions about classes, teachers, final exams, graduate destinations, fees, campuses and learning formats.",
    "specialties": [
      "Частные школы"
    ],
    "specialtiesEn": [
      "Private schools"
    ],
    "searchAliases": "школа частное образование ЕГЭ",
    "image": {
      "small": "/assets/tariffs/industries/industry-068-480.webp",
      "large": "/assets/tariffs/industries/industry-068-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-069",
    "number": 69,
    "slug": "online-schools-edtech",
    "priority": 1,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Онлайн-школы и EdTech",
    "categoryEn": "Online schools and EdTech companies",
    "title": "Продвижение в ответах нейросетей для онлайн-школ и EdTech-компаний",
    "titleEn": "GEO for online schools and EdTech companies",
    "intro": "Онлайн-обучение выбирают по целям и методике. Проверяю запросы о программах, квалификации преподавателей, поддержке учащихся, проверке навыков и документах об обучении.",
    "introEn": "Learners choose online education by their goals and teaching methods. I review questions about programmes, teachers' qualifications, student support, skills assessment and completion documents.",
    "specialties": [
      "Образовательные проекты, школы и программы",
      "Школы подготовки к экзаменам"
    ],
    "specialtiesEn": [
      "Education projects",
      "schools and courses",
      "exam preparation"
    ],
    "searchAliases": "онлайн школа EdTech курсы обучение",
    "image": {
      "small": "/assets/tariffs/industries/industry-069-480.webp",
      "large": "/assets/tariffs/industries/industry-069-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-070",
    "number": 70,
    "slug": "universities-business-schools",
    "priority": 1,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Вузы и бизнес-школы",
    "categoryEn": "Universities and business schools",
    "title": "Продвижение в ответах нейросетей для вузов и бизнес-школ",
    "titleEn": "GEO for universities and business schools",
    "intro": "Вуз выбирают по программе, карьере и стоимости. Учитываю аккредитацию, профили подготовки, практику, условия поступления, MBA и карьерные траектории выпускников.",
    "introEn": "Students choose institutions by programme, career prospects and fees. I cover accreditation, subject areas, practical training, admissions, MBA programmes and graduates' career paths.",
    "specialties": [
      "высшее образование",
      "MBA",
      "корпоративные программы"
    ],
    "specialtiesEn": [
      "Higher education",
      "MBA",
      "corporate education"
    ],
    "searchAliases": "университет институт вуз MBA бизнес школа",
    "image": {
      "small": "/assets/tariffs/industries/industry-070-480.webp",
      "large": "/assets/tariffs/industries/industry-070-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-071",
    "number": 71,
    "slug": "recruitment-agencies",
    "priority": 1,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Кадровые агентства и рекрутеры",
    "categoryEn": "Recruitment agencies and recruiters",
    "title": "Продвижение в ответах нейросетей для кадровых агентств",
    "titleEn": "GEO for recruitment agencies and recruiters",
    "intro": "Рекрутера выбирают по отрасли и сроку закрытия. Прорабатываю запросы о подборе производственного персонала, IT-специалистов, управленцев, методике оценки и гарантиях замены.",
    "introEn": "Businesses choose recruiters by industry expertise and hiring times. I work on questions about manufacturing staff, IT specialists, managers, assessment methods and replacement guarantees.",
    "specialties": [
      "Подбор персонала для e-commerce",
      "Подбор персонала для производственных компаний"
    ],
    "specialtiesEn": [
      "Recruitment for e-commerce and manufacturing companies"
    ],
    "searchAliases": "кадры рекрутинг HR подбор персонала",
    "image": {
      "small": "/assets/tariffs/industries/industry-071-480.webp",
      "large": "/assets/tariffs/industries/industry-071-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-072",
    "number": 72,
    "slug": "consultancies-independent-experts",
    "priority": 1,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Консалтинговые компании и независимые эксперты",
    "categoryEn": "Consultancies and independent experts",
    "title": "Продвижение в ответах нейросетей для консалтинговых компаний и экспертов",
    "titleEn": "GEO for consultancies and independent experts",
    "intro": "Эксперта выбирают по компетенциям и кейсам. Уточняю специализацию, измеримые результаты, независимые публикации, отраслевой опыт и запросы о выборе консультанта.",
    "introEn": "Clients choose experts by their competencies and documented work. I clarify specialisation, measurable outcomes, independent publications, industry experience and questions about choosing a consultant.",
    "specialties": [
      "Личный бренд независимого эксперта",
      "Оценка руководителей (Executive Assessment)"
    ],
    "specialtiesEn": [
      "Independent experts' personal brands",
      "executive assessment"
    ],
    "searchAliases": "консалтинг консультант эксперт личный бренд",
    "image": {
      "small": "/assets/tariffs/industries/industry-072-480.webp",
      "large": "/assets/tariffs/industries/industry-072-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-073",
    "number": 73,
    "slug": "children-education-centres",
    "priority": 2,
    "groupId": "education-consulting",
    "group": "Образование, кадры и консалтинг",
    "groupEn": "Education, recruitment and consulting",
    "category": "Детские образовательные центры",
    "categoryEn": "Children's education centres",
    "title": "Продвижение в ответах нейросетей для детских образовательных центров",
    "titleEn": "GEO for children's education centres",
    "intro": "Детский центр выбирают по программе и возрасту. Разбираю запросы о подготовке к школе, кружках, расписании, квалификации педагогов, безопасности и территориальной доступности.",
    "introEn": "Parents choose education centres by programme and age group. I review questions about school preparation, clubs, timetables, teachers' qualifications, safety and location.",
    "specialties": [
      "Детские образовательные центры"
    ],
    "specialtiesEn": [
      "Children's education centres"
    ],
    "searchAliases": "детский центр кружки подготовка школа",
    "image": {
      "small": "/assets/tariffs/industries/industry-073-480.webp",
      "large": "/assets/tariffs/industries/industry-073-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-074",
    "number": 74,
    "slug": "branding-marketing-agencies",
    "priority": 2,
    "groupId": "marketing",
    "group": "Маркетинг и реклама",
    "groupEn": "Marketing and advertising",
    "category": "Брендинговые и маркетинговые агентства",
    "categoryEn": "Branding and marketing agencies",
    "title": "Продвижение в ответах нейросетей для брендинговых и маркетинговых агентств",
    "titleEn": "GEO for branding and marketing agencies",
    "intro": "Брендинговое агентство выбирают по задачам. Проверяю запросы о ребрендинге, дизайне упаковки FMCG, исследованиях потребителей, портфолио и составе команды.",
    "introEn": "Businesses choose branding agencies for particular objectives. I review questions about rebranding, FMCG packaging design, consumer research, portfolios and the project team.",
    "specialties": [
      "Упаковка FMCG, брендинг и ребрендинг",
      "брендинг FMCG",
      "упаковка",
      "ребрендинг"
    ],
    "specialtiesEn": [
      "FMCG branding and packaging",
      "branding",
      "rebranding"
    ],
    "searchAliases": "маркетинг брендинг реклама FMCG дизайн упаковки агентство",
    "image": {
      "small": "/assets/tariffs/industries/industry-074-480.webp",
      "large": "/assets/tariffs/industries/industry-074-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-075",
    "number": 75,
    "slug": "car-dealerships",
    "priority": 1,
    "groupId": "automotive",
    "group": "Автомобильный рынок",
    "groupEn": "Automotive",
    "category": "Автодилеры",
    "categoryEn": "Car dealerships",
    "title": "Продвижение в ответах нейросетей для автодилеров",
    "titleEn": "GEO for car dealerships",
    "intro": "Автосалон выбирают по моделям и условиям сделки. Учитываю комплектации, наличие, трейд-ин, кредит, лизинг, гарантию и реальные отзывы; разделяю новый и подержанный транспорт.",
    "introEn": "Buyers choose dealerships by models and transaction terms. I cover specifications, availability, trade-ins, finance, leasing, warranties and authentic reviews, separating new and used vehicles.",
    "specialties": [
      "Автомобили с пробегом и выкупом",
      "Автосалоны без уточнения специализации",
      "Новые автомобили",
      "Новые китайские автомобили",
      "Продажа автомобилей с кредитованием и лизингом"
    ],
    "specialtiesEn": [
      "New and used cars",
      "vehicle buybacks",
      "Chinese cars",
      "vehicle finance and leasing"
    ],
    "searchAliases": "дилер автосалон автомобили авто",
    "image": {
      "small": "/assets/tariffs/industries/industry-075-480.webp",
      "large": "/assets/tariffs/industries/industry-075-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-076",
    "number": 76,
    "slug": "vehicle-sourcing-import-companies",
    "priority": 1,
    "groupId": "automotive",
    "group": "Автомобильный рынок",
    "groupEn": "Automotive",
    "category": "Компании по подбору и импорту автомобилей",
    "categoryEn": "Vehicle sourcing and import companies",
    "title": "Продвижение в ответах нейросетей для компаний по подбору и импорту автомобилей",
    "titleEn": "GEO for vehicle sourcing and import companies",
    "intro": "Импорт автомобиля выбирают по расчету и рискам. Разбираю запросы об аукционах США, автомобилях из ОАЭ и Европы, пошлинах, сроках доставки, проверке истории и комплектации.",
    "introEn": "Buyers choose vehicle import services by total costs and risks. I review questions about US auctions, cars from the UAE and Europe, duties, delivery times, history checks and specifications.",
    "specialties": [
      "Автомобили из Европы, Азии и США под заказ",
      "Подбор и доставка автомобилей из Европы",
      "Подбор и доставка автомобилей из ОАЭ",
      "Подбор и доставка автомобилей из США, аукционы",
      "Электромобили из США"
    ],
    "specialtiesEn": [
      "Cars from Europe, Asia, the UAE and the USA",
      "auction purchases",
      "imported electric vehicles"
    ],
    "searchAliases": "автоподбор импорт авто аукцион",
    "image": {
      "small": "/assets/tariffs/industries/industry-076-480.webp",
      "large": "/assets/tariffs/industries/industry-076-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-077",
    "number": 77,
    "slug": "vehicle-repair-centres",
    "priority": 1,
    "groupId": "automotive",
    "group": "Автомобильный рынок",
    "groupEn": "Automotive",
    "category": "Автосервисы и СТО",
    "categoryEn": "Vehicle repair and service centres",
    "title": "Продвижение в ответах нейросетей для автосервисов",
    "titleEn": "GEO for vehicle repair and service centres",
    "intro": "Автосервис выбирают по марке и неисправности. Проверяю запросы о диагностике, ремонте двигателя, электронике, стоимости нормочаса, гарантии и специалистах сервиса.",
    "introEn": "Drivers choose repair centres by make and fault. I review questions about diagnostics, engine repairs, electronics, hourly labour rates, warranties and workshop specialists.",
    "specialties": [
      "Автосервисы определенных марок",
      "Сети автосервисов"
    ],
    "specialtiesEn": [
      "Make-specific repair centres",
      "vehicle service networks"
    ],
    "searchAliases": "автосервис СТО ремонт авто",
    "image": {
      "small": "/assets/tariffs/industries/industry-077-480.webp",
      "large": "/assets/tariffs/industries/industry-077-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-078",
    "number": 78,
    "slug": "commercial-vehicle-machinery-dealers",
    "priority": 1,
    "groupId": "automotive",
    "group": "Автомобильный рынок",
    "groupEn": "Automotive",
    "category": "Дилеры коммерческого транспорта и спецтехники",
    "categoryEn": "Commercial vehicle and machinery dealers",
    "title": "Продвижение в ответах нейросетей для дилеров коммерческого транспорта и спецтехники",
    "titleEn": "GEO for commercial vehicle and machinery dealers",
    "intro": "Коммерческий транспорт выбирают под задачи бизнеса. Учитываю грузоподъемность, тип кузова, лизинг, стоимость владения, сервис и применимость техники к разным перевозкам.",
    "introEn": "Businesses choose commercial vehicles for their operating needs. I cover payload, body type, leasing, total ownership costs, maintenance and suitability for different transport tasks.",
    "specialties": [
      "Коммерческий транспорт"
    ],
    "specialtiesEn": [
      "Commercial vehicles"
    ],
    "searchAliases": "грузовик коммерческий транспорт спецтехника",
    "image": {
      "small": "/assets/tariffs/industries/industry-078-480.webp",
      "large": "/assets/tariffs/industries/industry-078-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-079",
    "number": 79,
    "slug": "motorcycle-dealers",
    "priority": 2,
    "groupId": "automotive",
    "group": "Автомобильный рынок",
    "groupEn": "Automotive",
    "category": "Дилеры мотоциклов и мототехники",
    "categoryEn": "Motorcycle and powersports dealers",
    "title": "Продвижение в ответах нейросетей для дилеров мотоциклов и мототехники",
    "titleEn": "GEO for motorcycle and powersports dealers",
    "intro": "Мототехнику сравнивают по назначению и сервису. Прорабатываю запросы о дорожных и внедорожных моделях, объеме двигателя, экипировке, гарантии и обслуживании.",
    "introEn": "Buyers compare motorcycles by purpose and servicing. I work on questions about road and off-road models, engine capacity, riding gear, warranties and maintenance.",
    "specialties": [
      "Дистрибуция мотоциклов и мототехники",
      "мотоциклы",
      "мототехника",
      "дистрибуция"
    ],
    "specialtiesEn": [
      "Motorcycles",
      "powersports vehicles",
      "distribution"
    ],
    "searchAliases": "мотоциклы мототехника мото",
    "image": {
      "small": "/assets/tariffs/industries/industry-079-480.webp",
      "large": "/assets/tariffs/industries/industry-079-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-080",
    "number": 80,
    "slug": "tour-operators-travel-agencies",
    "priority": 1,
    "groupId": "travel-hospitality",
    "group": "Туризм и HoReCa",
    "groupEn": "Travel and hospitality",
    "category": "Туроператоры и туристические агентства",
    "categoryEn": "Tour operators and travel agencies",
    "title": "Продвижение в ответах нейросетей для туроператоров и туристических агентств",
    "titleEn": "GEO for tour operators and travel agencies",
    "intro": "Туры выбирают по маршруту и формату отдыха. Разбираю запросы о странах, визах, сезонности, индивидуальных поездках, гидах, длительности и прямой работе с туроператором.",
    "introEn": "Travellers choose tours by itinerary and holiday style. I review questions about countries, visas, seasons, private trips, guides, duration and booking directly with a tour operator.",
    "specialties": [
      "Авторские туры",
      "Экскурсионные программы и путешествия малыми группами"
    ],
    "specialtiesEn": [
      "Bespoke tours",
      "sightseeing programmes",
      "small-group travel"
    ],
    "searchAliases": "туризм тур туроператор турагентство путешествие",
    "image": {
      "small": "/assets/tariffs/industries/industry-080-480.webp",
      "large": "/assets/tariffs/industries/industry-080-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/tourism/",
      "hrefEn": "/en/industries/tourism/",
      "label": "Подробнее о продвижении",
      "labelEn": "Industry GEO service",
      "relation": "existing_service"
    },
    "supportingPages": [
      "/strategies/tourism-dmc-recommendations/",
      "/cases/ada-tours-rost-neyrovidimosti-za-2-nedeli/",
      "/cases/razrabotka-sajta-adatours/"
    ],
    "supportingPagesEn": [
      "/en/strategies/tourism-dmc-recommendations/",
      "/en/cases/ada-tours-bmr-growth-in-2-weeks/",
      "/en/cases/razrabotka-sajta-adatours/"
    ]
  },
  {
    "id": "industry-081",
    "number": 81,
    "slug": "corporate-travel-mice-organisers",
    "priority": 1,
    "groupId": "travel-hospitality",
    "group": "Туризм и HoReCa",
    "groupEn": "Travel and hospitality",
    "category": "Организаторы корпоративных поездок и MICE",
    "categoryEn": "Corporate travel and MICE organisers",
    "title": "Продвижение в ответах нейросетей для организаторов корпоративных поездок и MICE",
    "titleEn": "GEO for corporate travel and MICE organisers",
    "intro": "MICE выбирают по логистике и качеству программы. Проверяю запросы о корпоративных поездках, делегациях, площадках, трансферах, мероприятиях и организации групп под ключ.",
    "introEn": "Businesses choose MICE providers by logistics and programme quality. I review questions about corporate trips, delegations, venues, transfers, events and complete group arrangements.",
    "specialties": [
      "Корпоративные туры по России",
      "деловые поездки",
      "MICE",
      "корпоративные мероприятия"
    ],
    "specialtiesEn": [
      "Corporate trips in Russia",
      "business travel",
      "MICE",
      "corporate events"
    ],
    "searchAliases": "MICE корпоративный тур мероприятие командировка",
    "image": {
      "small": "/assets/tariffs/industries/industry-081-480.webp",
      "large": "/assets/tariffs/industries/industry-081-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/tourism/",
      "hrefEn": "/en/industries/tourism/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/tourism-dmc-recommendations/",
      "/cases/ada-tours-rost-neyrovidimosti-za-2-nedeli/",
      "/cases/razrabotka-sajta-adatours/"
    ],
    "supportingPagesEn": [
      "/en/strategies/tourism-dmc-recommendations/",
      "/en/cases/ada-tours-bmr-growth-in-2-weeks/",
      "/en/cases/razrabotka-sajta-adatours/"
    ]
  },
  {
    "id": "industry-082",
    "number": 82,
    "slug": "hotels-country-resorts",
    "priority": 1,
    "groupId": "travel-hospitality",
    "group": "Туризм и HoReCa",
    "groupEn": "Travel and hospitality",
    "category": "Отели, загородные гостиницы и курорты",
    "categoryEn": "Hotels and country resorts",
    "title": "Продвижение в ответах нейросетей для отелей и загородных курортов",
    "titleEn": "GEO for hotels and country resorts",
    "intro": "Отель выбирают по месту, услугам и сезону. Разбираю запросы о семейных выходных, СПА, номерах, питании, отдыхе с детьми, доступности и реальных условиях размещения.",
    "introEn": "Guests choose hotels by location, facilities and season. I review questions about family weekends, spas, rooms, dining, stays with children, accessibility and actual accommodation conditions.",
    "specialties": [
      "Загородные отели и семейный отдых"
    ],
    "specialtiesEn": [
      "Country hotels",
      "family holidays"
    ],
    "searchAliases": "отель гостиница курорт spa СПА",
    "image": {
      "small": "/assets/tariffs/industries/industry-082-480.webp",
      "large": "/assets/tariffs/industries/industry-082-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-083",
    "number": 83,
    "slug": "restaurants-coffee-shop-chains",
    "priority": 2,
    "groupId": "travel-hospitality",
    "group": "Туризм и HoReCa",
    "groupEn": "Travel and hospitality",
    "category": "Рестораны и сети кофеен",
    "categoryEn": "Restaurants and coffee shop chains",
    "title": "Продвижение в ответах нейросетей для ресторанов и сетей кофеен",
    "titleEn": "GEO for restaurants and coffee shop chains",
    "intro": "Ресторан выбирают по кухне и случаю посещения. Учитываю меню, доставку, мероприятия, корпоративные ужины, расположение, атмосферу и отзывы по конкретным филиалам.",
    "introEn": "Guests choose restaurants by cuisine and occasion. I cover menus, delivery, events, business dinners, location, atmosphere and reviews of individual branches.",
    "specialties": [
      "Кофейни с доставкой десертов",
      "Сеть кофеен с собственной обжаркой кофе"
    ],
    "specialtiesEn": [
      "Coffee shops with dessert delivery",
      "coffee shop chains with their own roasting"
    ],
    "searchAliases": "ресторан кафе кофейня еда доставка",
    "image": {
      "small": "/assets/tariffs/industries/industry-083-480.webp",
      "large": "/assets/tariffs/industries/industry-083-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-084",
    "number": 84,
    "slug": "furniture-manufacturers-retailers",
    "priority": 1,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Мебельные фабрики и магазины мебели",
    "categoryEn": "Furniture manufacturers and retailers",
    "title": "Продвижение в ответах нейросетей для мебельных фабрик и магазинов мебели",
    "titleEn": "GEO for furniture manufacturers and retailers",
    "intro": "Мебель выбирают по размеру, материалу и стилю. Проверяю запросы о кухнях на заказ, встроенной мебели, матрасах, фурнитуре, дизайне, сроках изготовления и примерах работ.",
    "introEn": "Buyers choose furniture by dimensions, materials and style. I review questions about fitted kitchens, built-in furniture, mattresses, hardware, design, production times and completed work.",
    "specialties": [
      "Детская мебель: сайт и маркетплейсы",
      "Детская мебель",
      "Компьютерные и офисные кресла",
      "Кухни и встроенная мебель на заказ",
      "Мебель для ресторанов и кафе",
      "Мебель на заказ",
      "Премиальная дизайнерская мебель",
      "Мебель и матрасы"
    ],
    "specialtiesEn": [
      "Children's furniture",
      "office chairs",
      "fitted kitchens",
      "restaurant furniture",
      "bespoke and premium furniture",
      "mattresses"
    ],
    "searchAliases": "мебель кухня кресло матрас фабрика",
    "image": {
      "small": "/assets/tariffs/industries/industry-084-480.webp",
      "large": "/assets/tariffs/industries/industry-084-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-085",
    "number": 85,
    "slug": "contract-cosmetics-manufacturers",
    "priority": 1,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Контрактные производители косметики",
    "categoryEn": "Contract cosmetics manufacturers",
    "title": "Продвижение в ответах нейросетей для контрактных производителей косметики",
    "titleEn": "GEO for contract cosmetics manufacturers",
    "intro": "Контрактное производство выбирают по рецептуре. Разбираю запросы о разработке формул, партиях под СТМ, упаковке, лабораторных испытаниях и производстве кремов и шампуней.",
    "introEn": "Brands choose contract manufacturers by formulation capabilities. I review questions about formula development, private-label batches, packaging, laboratory testing and cream and shampoo production.",
    "specialties": [
      "Контрактное производство косметики",
      "контрактное производство кремов",
      "производство шампуней под СТМ"
    ],
    "specialtiesEn": [
      "Contract cosmetics",
      "private-label creams and shampoos"
    ],
    "searchAliases": "косметика производство СТМ private label",
    "image": {
      "small": "/assets/tariffs/industries/industry-085-480.webp",
      "large": "/assets/tariffs/industries/industry-085-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-086",
    "number": 86,
    "slug": "electronics-appliance-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины электроники и бытовой техники",
    "categoryEn": "Electronics and appliance online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов электроники и бытовой техники",
    "titleEn": "GEO for electronics and appliance online stores",
    "intro": "Технику выбирают по характеристикам и совместимости. Прорабатываю запросы о ноутбуках, бытовых приборах, гарантиях, наличии, сравнении моделей и выборе надежного продавца.",
    "introEn": "Buyers compare devices by specifications and compatibility. I work on questions about laptops, home appliances, warranties, availability, model comparisons and choosing a reliable retailer.",
    "specialties": [
      "Бытовая техника",
      "Сантехника",
      "Электроника и цифровая техника"
    ],
    "specialtiesEn": [
      "Home appliances",
      "plumbing supplies",
      "electronics and digital devices"
    ],
    "searchAliases": "электроника техника ноутбук холодильник интернет магазин",
    "image": {
      "small": "/assets/tariffs/industries/industry-086-480.webp",
      "large": "/assets/tariffs/industries/industry-086-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-087",
    "number": 87,
    "slug": "home-improvement-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины товаров для дома и ремонта",
    "categoryEn": "Home and DIY online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов товаров для дома и ремонта",
    "titleEn": "GEO for home and DIY online stores",
    "intro": "Товары для дома сравнивают по задачам ремонта. Учитываю стройматериалы, сантехнику, свет, инструменты, уход за поверхностями и применимость товаров в быту.",
    "introEn": "Buyers compare home products for their renovation tasks. I cover building materials, plumbing, lighting, tools, surface care and suitability for domestic use.",
    "specialties": [
      "Бытовая химия и средства для уборки",
      "Женские сумки собственного бренда",
      "Освещение",
      "Расходные материалы для организаций (B2B)",
      "Строительные материалы",
      "Товары для сада и дачи",
      "Хозяйственные товары и товары для дома",
      "Электроинструмент"
    ],
    "specialtiesEn": [
      "Household chemicals",
      "cleaning supplies",
      "branded handbags",
      "lighting",
      "business consumables",
      "building materials",
      "garden products",
      "household goods",
      "power tools"
    ],
    "searchAliases": "дом ремонт дача инструменты магазин свет",
    "image": {
      "small": "/assets/tariffs/industries/industry-087-480.webp",
      "large": "/assets/tariffs/industries/industry-087-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-088",
    "number": 88,
    "slug": "auto-parts-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины автозапчастей и автотоваров",
    "categoryEn": "Auto parts and accessories online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов автозапчастей",
    "titleEn": "GEO for auto parts and accessories online stores",
    "intro": "Автозапчасть выбирают по совместимости с машиной. Проверяю запросы о VIN, артикулах, брендах, аналогах, сроках доставки, гарантии и подборе деталей для конкретных моделей.",
    "introEn": "Buyers choose spare parts by vehicle compatibility. I review questions about VINs, part numbers, brands, alternatives, delivery times, warranties and parts for specific models.",
    "specialties": [
      "Автозапчасти и автотовары",
      "Запчасти для спецтехники"
    ],
    "specialtiesEn": [
      "Car parts and accessories",
      "machinery spare parts"
    ],
    "searchAliases": "автозапчасти детали запчасти VIN",
    "image": {
      "small": "/assets/tariffs/industries/industry-088-480.webp",
      "large": "/assets/tariffs/industries/industry-088-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-089",
    "number": 89,
    "slug": "cosmetics-perfume-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины косметики и парфюмерии",
    "categoryEn": "Cosmetics and perfume online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов косметики и парфюмерии",
    "titleEn": "GEO for cosmetics and perfume online stores",
    "intro": "Косметику выбирают по составу и типу кожи. Разбираю запросы о средствах для волос, лица и тела, совместимости, составе, объеме и выборе официального продавца.",
    "introEn": "Buyers choose cosmetics by ingredients and skin type. I review questions about hair, face and body products, compatibility, formulas, pack sizes and authorised retailers.",
    "specialties": [
      "Косметика и уход",
      "Профессиональная косметика",
      "уход",
      "парфюмерия"
    ],
    "specialtiesEn": [
      "Cosmetics",
      "skincare",
      "professional cosmetics",
      "perfume"
    ],
    "searchAliases": "косметика парфюмерия духи магазин",
    "image": {
      "small": "/assets/tariffs/industries/industry-089-480.webp",
      "large": "/assets/tariffs/industries/industry-089-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-090",
    "number": 90,
    "slug": "children-products-toy-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины детских товаров и игрушек",
    "categoryEn": "Children's products and toy online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов детских товаров",
    "titleEn": "GEO for children's products and toy online stores",
    "intro": "Игрушки выбирают по возрасту и безопасности. Учитываю развивающие функции, материалы, возрастные ограничения, сертификаты, размеры и сценарии подарков.",
    "introEn": "Buyers choose toys by age and safety. I cover developmental uses, materials, age limits, certificates, dimensions and gift occasions.",
    "specialties": [
      "Детские игрушки",
      "Детские товары"
    ],
    "specialtiesEn": [
      "Toys",
      "children's products"
    ],
    "searchAliases": "игрушки детские товары магазин",
    "image": {
      "small": "/assets/tariffs/industries/industry-090-480.webp",
      "large": "/assets/tariffs/industries/industry-090-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-091",
    "number": 91,
    "slug": "pet-supply-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины товаров для животных",
    "categoryEn": "Pet supply online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов зоотоваров",
    "titleEn": "GEO for pet supply online stores",
    "intro": "Зоотовары выбирают по потребностям питомца. Прорабатываю запросы о кормах, возрастах животных, составах, аксессуарах, совместимости и ассортименте магазина.",
    "introEn": "Buyers choose pet products around their animals' needs. I work on questions about food, age groups, ingredients, accessories, suitability and the shop's range.",
    "specialties": [
      "Товары для животных"
    ],
    "specialtiesEn": [
      "Pet products"
    ],
    "searchAliases": "зоотовары животные питомец корм",
    "image": {
      "small": "/assets/tariffs/industries/industry-091-480.webp",
      "large": "/assets/tariffs/industries/industry-091-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-092",
    "number": 92,
    "slug": "sports-nutrition-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины спортивных товаров и питания",
    "categoryEn": "Sports goods and nutrition online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов спортивных товаров",
    "titleEn": "GEO for sports goods and nutrition online stores",
    "intro": "Спорттовары выбирают по цели и нагрузке. Проверяю запросы о тренажерах, инвентаре, размерах, домашнем фитнесе и достоверных характеристиках спортивного питания.",
    "introEn": "Buyers choose sports products by their goals and activity levels. I review questions about exercise machines, equipment, sizes, home fitness and verifiable sports nutrition specifications.",
    "specialties": [
      "Спортивное и функциональное питание",
      "Спортивное питание",
      "Спортивные товары и тренажеры",
      "фитнес-оборудование",
      "тренажеры"
    ],
    "specialtiesEn": [
      "Sports and functional nutrition",
      "sporting goods",
      "exercise machines",
      "fitness equipment"
    ],
    "searchAliases": "спорттовары спортпит тренажеры фитнес",
    "image": {
      "small": "/assets/tariffs/industries/industry-092-480.webp",
      "large": "/assets/tariffs/industries/industry-092-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-093",
    "number": 93,
    "slug": "medical-supply-online-stores",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Интернет-магазины медицинских товаров и оборудования",
    "categoryEn": "Medical supply and equipment online stores",
    "title": "Продвижение в ответах нейросетей для интернет-магазинов медицинских товаров",
    "titleEn": "GEO for medical supply and equipment online stores",
    "intro": "Медтовары выбирают по назначению и регистрации. Учитываю тонометры, расходные материалы, оборудование для домашнего ухода, документы и ограничения применения.",
    "introEn": "Buyers choose medical products by intended use and registration. I cover blood pressure monitors, consumables, home care equipment, documentation and restrictions on use.",
    "specialties": [
      "Медицинские товары для домашнего ухода",
      "Медицинское оборудование"
    ],
    "specialtiesEn": [
      "Home care medical products",
      "medical equipment"
    ],
    "searchAliases": "медтовары медтехника тонометр",
    "image": {
      "small": "/assets/tariffs/industries/industry-093-480.webp",
      "large": "/assets/tariffs/industries/industry-093-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-094",
    "number": 94,
    "slug": "cosmetics-brands",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Косметические бренды",
    "categoryEn": "Cosmetics brands",
    "title": "Продвижение в ответах нейросетей для косметических брендов",
    "titleEn": "GEO for cosmetics brands",
    "intro": "Косметический бренд выбирают по составу и доверию. Разбираю запросы об уходе, ингредиентах, применении, оригинальности продукции, производителе и сравнении линеек.",
    "introEn": "Buyers choose cosmetics brands by ingredients and trust. I review questions about care routines, ingredients, application, product authenticity, manufacturers and product line comparisons.",
    "specialties": [
      "Собственные бренды косметики и уходовых средств",
      "Товары для бьюти-мастеров: опт и маркетплейсы"
    ],
    "specialtiesEn": [
      "Cosmetics and skincare brands",
      "wholesale and marketplace supplies for beauty professionals"
    ],
    "searchAliases": "косметика уход бьюти beauty бренд",
    "image": {
      "small": "/assets/tariffs/industries/industry-094-480.webp",
      "large": "/assets/tariffs/industries/industry-094-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-095",
    "number": 95,
    "slug": "jewellery-brands-workshops",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Ювелирные бренды и мастерские",
    "categoryEn": "Jewellery brands and workshops",
    "title": "Продвижение в ответах нейросетей для ювелирных брендов и мастерских",
    "titleEn": "GEO for jewellery brands and workshops",
    "intro": "Украшения выбирают по материалу и мастеру. Проверяю запросы о золоте, драгоценных камнях, индивидуальных заказах, сертификатах, размерах и дизайне.",
    "introEn": "Buyers choose jewellery by material and maker. I review questions about gold, gemstones, bespoke orders, certificates, sizing and design.",
    "specialties": [
      "Украшения, индивидуальные заказы и продажи онлайн"
    ],
    "specialtiesEn": [
      "Jewellery",
      "custom orders",
      "online sales"
    ],
    "searchAliases": "ювелир золото украшения jewellery jewelry",
    "image": {
      "small": "/assets/tariffs/industries/industry-095-480.webp",
      "large": "/assets/tariffs/industries/industry-095-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-096",
    "number": 96,
    "slug": "clothing-accessory-brands",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Бренды одежды и аксессуаров",
    "categoryEn": "Clothing and accessory brands",
    "title": "Продвижение в ответах нейросетей для брендов одежды и аксессуаров",
    "titleEn": "GEO for clothing and accessory brands",
    "intro": "Одежду выбирают по посадке и материалам. Прорабатываю запросы о размерах, сезонности, составе ткани, уходе, коллекциях и покупке у официального бренда.",
    "introEn": "Buyers choose clothing by fit and materials. I work on questions about sizing, seasons, fabric composition, care, collections and buying directly from the brand.",
    "specialties": [
      "женские сумки",
      "аксессуары",
      "одежда",
      "обувь"
    ],
    "specialtiesEn": [
      "Handbags",
      "accessories",
      "clothing",
      "footwear"
    ],
    "searchAliases": "одежда обувь сумки мода fashion",
    "image": {
      "small": "/assets/tariffs/industries/industry-096-480.webp",
      "large": "/assets/tariffs/industries/industry-096-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-097",
    "number": 97,
    "slug": "food-producers-retailers",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Производители и продавцы продуктов питания",
    "categoryEn": "Food producers and retailers",
    "title": "Продвижение в ответах нейросетей для производителей и продавцов продуктов питания",
    "titleEn": "GEO for food producers and retailers",
    "intro": "Продукты выбирают по составу и способу применения. Разбираю запросы о ингредиентах, сроках хранения, происхождении, пищевой маркировке и оптовых поставках в HoReCa.",
    "introEn": "Buyers choose food by ingredients and intended use. I review questions about composition, shelf life, origin, food labelling and wholesale supply to hospitality businesses.",
    "specialties": [
      "Продукты длительного хранения",
      "ингредиенты для общепита"
    ],
    "specialtiesEn": [
      "Shelf-stable food",
      "food service ingredients"
    ],
    "searchAliases": "еда продукты питание food",
    "image": {
      "small": "/assets/tariffs/industries/industry-097-480.webp",
      "large": "/assets/tariffs/industries/industry-097-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-098",
    "number": 98,
    "slug": "children-product-manufacturers",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Производители детских товаров",
    "categoryEn": "Children's product manufacturers",
    "title": "Продвижение в ответах нейросетей для производителей детских товаров",
    "titleEn": "GEO for children's product manufacturers",
    "intro": "Детские товары выбирают по возрасту и нормам. Учитываю игрушки, детскую мебель, эргономику, безопасность, сертификаты, материалы и способы использования.",
    "introEn": "Buyers choose children's products by age and relevant standards. I cover toys, children's furniture, ergonomics, safety, certificates, materials and ways to use the products.",
    "specialties": [
      "Детские игрушки",
      "Товары для детей",
      "детская мебель"
    ],
    "specialtiesEn": [
      "Toys",
      "children's products",
      "children's furniture"
    ],
    "searchAliases": "детские товары игрушки детская мебель",
    "image": {
      "small": "/assets/tariffs/industries/industry-098-480.webp",
      "large": "/assets/tariffs/industries/industry-098-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-099",
    "number": 99,
    "slug": "household-chemical-brands",
    "priority": 2,
    "groupId": "ecommerce",
    "group": "Электронная коммерция и бренды",
    "groupEn": "E-commerce and brands",
    "category": "Бренды бытовой химии",
    "categoryEn": "Household chemical brands",
    "title": "Продвижение в ответах нейросетей для брендов бытовой химии",
    "titleEn": "GEO for household chemical brands",
    "intro": "Бытовую химию выбирают по поверхности и задаче. Проверяю запросы о моющих средствах, составах, концентрации, совместимости с материалами и безопасном применении.",
    "introEn": "Buyers choose cleaning products for the surface and task. I review questions about detergents, ingredients, concentration, material compatibility and safe use.",
    "specialties": [
      "Бытовая химия для маркетплейсов",
      "бренды бытовой химии",
      "товары для уборки",
      "маркетплейсы"
    ],
    "specialtiesEn": [
      "Household chemical brands",
      "cleaning products",
      "marketplace sales"
    ],
    "searchAliases": "бытовая химия уборка моющие средства",
    "image": {
      "small": "/assets/tariffs/industries/industry-099-480.webp",
      "large": "/assets/tariffs/industries/industry-099-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": {
      "href": "/industries/ecommerce/",
      "hrefEn": "/en/industries/ecommerce/",
      "label": "Материалы по отрасли",
      "labelEn": "Related industry resources",
      "relation": "related_methodology"
    },
    "supportingPages": [
      "/strategies/ecommerce-catalog/",
      "/strategies/ecommerce-measurement/",
      "/articles/agentnaya-torgovlya-gotovnost-internet-magazina/"
    ],
    "supportingPagesEn": [
      "/en/strategies/ecommerce-catalog/",
      "/en/strategies/ecommerce-measurement/",
      "/en/articles/agentic-commerce-readiness/"
    ]
  },
  {
    "id": "industry-100",
    "number": 100,
    "slug": "beauty-salons-cosmetology-practices",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Салоны красоты и косметологические кабинеты",
    "categoryEn": "Beauty salons and cosmetology practices",
    "title": "Продвижение в ответах нейросетей для салонов красоты и косметологов",
    "titleEn": "GEO for beauty salons and cosmetology practices",
    "intro": "Косметолога выбирают по квалификации и процедуре. Разбираю запросы о лазерной эпиляции, аппаратах, противопоказаниях, опыте специалиста и ценах без медицинских обещаний.",
    "introEn": "Clients choose beauty practitioners by qualifications and procedure. I review questions about laser hair removal, equipment, contraindications, professional experience and prices, with careful medical claims.",
    "specialties": [
      "Частный косметолог",
      "Лазерная эпиляция",
      "косметология",
      "аппаратные процедуры"
    ],
    "specialtiesEn": [
      "Independent cosmetologists",
      "laser hair removal",
      "cosmetology",
      "device-based procedures"
    ],
    "searchAliases": "салон красоты косметолог косметология эпиляция beauty",
    "image": {
      "small": "/assets/tariffs/industries/industry-100-480.webp",
      "large": "/assets/tariffs/industries/industry-100-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-101",
    "number": 101,
    "slug": "cleaning-companies",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Клининговые компании",
    "categoryEn": "Cleaning companies",
    "title": "Продвижение в ответах нейросетей для клининговых компаний",
    "titleEn": "GEO for cleaning companies",
    "intro": "Клининг выбирают по объекту и составу работ. Учитываю уборку квартир, офисов, сложные загрязнения, регулярность, средства, гарантии качества и географию выезда.",
    "introEn": "Clients choose cleaning providers by property and scope. I cover homes, offices, difficult stains, frequency, products, quality commitments and service areas.",
    "specialties": [
      "Клининг"
    ],
    "specialtiesEn": [
      "Cleaning services"
    ],
    "searchAliases": "клининг уборка cleaning",
    "image": {
      "small": "/assets/tariffs/industries/industry-101-480.webp",
      "large": "/assets/tariffs/industries/industry-101-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-102",
    "number": 102,
    "slug": "home-appliance-repair-services",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Сервисы ремонта бытовой техники",
    "categoryEn": "Home appliance repair services",
    "title": "Продвижение в ответах нейросетей для сервисов ремонта бытовой техники",
    "titleEn": "GEO for home appliance repair services",
    "intro": "Мастера по технике ищут по модели и поломке. Проверяю запросы о ремонте холодильников, стиральных машин, срочном выезде, диагностике, запчастях и гарантии.",
    "introEn": "People seek repair technicians for particular models and faults. I review questions about refrigerators, washing machines, urgent visits, diagnostics, spare parts and warranties.",
    "specialties": [
      "Выездной ремонт холодильников",
      "Ремонт бытовой техники и сервисные центры",
      "Ремонт бытовой техники на дому"
    ],
    "specialtiesEn": [
      "On-site refrigerator repair",
      "appliance repair",
      "service centres",
      "home visits"
    ],
    "searchAliases": "ремонт холодильник стиральная машина мастер",
    "image": {
      "small": "/assets/tariffs/industries/industry-102-480.webp",
      "large": "/assets/tariffs/industries/industry-102-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-103",
    "number": 103,
    "slug": "security-cctv-companies",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Охранные компании и установщики видеонаблюдения",
    "categoryEn": "Security companies and CCTV installers",
    "title": "Продвижение в ответах нейросетей для охранных компаний и установщиков видеонаблюдения",
    "titleEn": "GEO for security companies and CCTV installers",
    "intro": "Охрану выбирают по рискам и составу системы. Прорабатываю запросы о видеонаблюдении, СКУД, охранной сигнализации, монтажных проектах и сервисе для объектов.",
    "introEn": "Clients choose security providers by risks and system scope. I work on questions about CCTV, access control, alarm systems, installation projects and ongoing service.",
    "specialties": [
      "Системы видеонаблюдения",
      "охрана объектов",
      "СКУД",
      "видеонаблюдение"
    ],
    "specialtiesEn": [
      "CCTV",
      "site security",
      "access control systems"
    ],
    "searchAliases": "охрана ЧОП ЧОО видеонаблюдение CCTV СКУД",
    "image": {
      "small": "/assets/tariffs/industries/industry-103-480.webp",
      "large": "/assets/tariffs/industries/industry-103-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-104",
    "number": 104,
    "slug": "psychologists-psychotherapists",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Частные психологи и психотерапевты",
    "categoryEn": "Independent psychologists and psychotherapists",
    "title": "Продвижение в ответах нейросетей для частных психологов и психотерапевтов",
    "titleEn": "GEO for independent psychologists and psychotherapists",
    "intro": "Психолога выбирают по подходу и специализации. Учитываю квалификацию, формат консультаций, направления практики, конфиденциальность и границы психологической помощи.",
    "introEn": "Clients choose psychologists by approach and specialisation. I cover qualifications, consultation formats, areas of practice, confidentiality and the boundaries of psychological support.",
    "specialties": [
      "Психологическая практика",
      "психологическое консультирование",
      "частная практика"
    ],
    "specialtiesEn": [
      "Psychological counselling",
      "independent practice"
    ],
    "searchAliases": "психолог психотерапевт психология",
    "image": {
      "small": "/assets/tariffs/industries/industry-104-480.webp",
      "large": "/assets/tariffs/industries/industry-104-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-105",
    "number": 105,
    "slug": "construction-equipment-rental",
    "priority": 2,
    "groupId": "local-services",
    "group": "Локальные услуги",
    "groupEn": "Local services",
    "category": "Компании по аренде спецтехники",
    "categoryEn": "Construction equipment rental companies",
    "title": "Продвижение в ответах нейросетей для компаний по аренде спецтехники",
    "titleEn": "GEO for construction equipment rental companies",
    "intro": "Спецтехнику арендуют под объект и сроки. Разбираю запросы об экскаваторах, подъемниках, грузоподъемности, машино-часах, доставке техники и условиях аренды.",
    "introEn": "Clients hire machinery for particular sites and schedules. I review questions about excavators, lifting equipment, load capacity, operating hours, delivery and hire terms.",
    "specialties": [
      "Аренда строительной и иной спецтехники"
    ],
    "specialtiesEn": [
      "Construction and specialist equipment hire"
    ],
    "searchAliases": "аренда спецтехники экскаватор подъемник",
    "image": {
      "small": "/assets/tariffs/industries/industry-105-480.webp",
      "large": "/assets/tariffs/industries/industry-105-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-106",
    "number": 106,
    "slug": "agricultural-businesses",
    "priority": 1,
    "groupId": "agriculture",
    "group": "Агробизнес",
    "groupEn": "Agriculture",
    "category": "Сельскохозяйственные предприятия",
    "categoryEn": "Agricultural businesses",
    "title": "Продвижение в ответах нейросетей для сельскохозяйственных предприятий",
    "titleEn": "GEO for agricultural businesses",
    "intro": "Агропредприятия выбирают партнеров по специализации. Проверяю запросы о выращиваемых культурах, технологии производства, поставках, качестве продукции и сезонности.",
    "introEn": "Agricultural businesses choose partners by specialisation. I review questions about crops, production methods, supply, product quality and seasonality.",
    "specialties": [
      "растениеводство",
      "животноводство",
      "тепличные хозяйства"
    ],
    "specialtiesEn": [
      "Crop farming",
      "livestock",
      "greenhouse production"
    ],
    "searchAliases": "сельское хозяйство ферма агро теплица",
    "image": {
      "small": "/assets/tariffs/industries/industry-106-480.webp",
      "large": "/assets/tariffs/industries/industry-106-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  },
  {
    "id": "industry-107",
    "number": 107,
    "slug": "agriculture-product-suppliers",
    "priority": 2,
    "groupId": "agriculture",
    "group": "Агробизнес",
    "groupEn": "Agriculture",
    "category": "Производители и поставщики товаров для агробизнеса",
    "categoryEn": "Agricultural product manufacturers and suppliers",
    "title": "Продвижение в ответах нейросетей для производителей и поставщиков товаров для агробизнеса",
    "titleEn": "GEO for agricultural product manufacturers and suppliers",
    "intro": "Агропродукцию выбирают по нормам и применению. Учитываю кормовые добавки, сельхозоборудование, сертификацию, рекомендации производителя и задачи фермерских хозяйств.",
    "introEn": "Buyers choose agricultural products by standards and use. I cover feed additives, farm equipment, certification, manufacturers' recommendations and the practical needs of farms.",
    "specialties": [
      "Кормовые добавки"
    ],
    "specialtiesEn": [
      "Feed additives"
    ],
    "searchAliases": "агро кормовые добавки сельхозоборудование",
    "image": {
      "small": "/assets/tariffs/industries/industry-107-480.webp",
      "large": "/assets/tariffs/industries/industry-107-960.webp",
      "width": 480,
      "height": 480
    },
    "hub": null,
    "supportingPages": [],
    "supportingPagesEn": []
  }
];

export function getIndustryGroups(lang = 'ru') {
  return groups.map(group => ({ ...group, name: lang === 'en' ? group.labelEn : group.label }));
}

export function getIndustryCatalog(lang = 'ru') {
  const en = lang === 'en';
  return industries.map(industry => ({
    ...industry,
    name: en ? industry.categoryEn : industry.category,
    serviceName: en ? industry.titleEn : industry.title,
    description: en ? industry.introEn : industry.intro,
    groupName: en ? industry.groupEn : industry.group,
    examples: en ? industry.specialtiesEn : industry.specialties,
    detailLink: industrySpecializations.find(page=>page.id===industry.number)?.routes[lang] || null,
    hubLink: industry.hub ? {
      href: en ? industry.hub.hrefEn : industry.hub.href,
      label: en ? industry.hub.labelEn : industry.hub.label,
      relation: industry.hub.relation,
    } : null,
  }));
}
