// Approved page-specific content. Shared Astro components own all HTML structure and visual classes.
// Update data here, not by copying FAQ, CTA or card markup into a page.
export const designPageContent = {
  "services/index.html": {
    "services": [
      {
        "title": "GEO-аудит и продвижение в нейросетях",
        "text": "Проверяю, кого рекомендуют ChatGPT, Алиса и другие нейросети по вопросам ваших покупателей. Разбираю причины ответов, составляю план и сопровождаю работу над сайтом и внешними источниками.",
        "features": [
          "Мини-аудит текущих рекомендаций",
          "Платный подробный GEO-аудит",
          "Сопровождение продвижения и повторные замеры"
        ],
        "href": "/#pricing",
        "cta": "Посмотреть тарифы GEO"
      },
      {
        "title": "Разработка и редизайн сайтов под GEO",
        "text": "Проектирую структуру, страницы, контент и технические требования к сайту. Организую создание или обновление, проверяю SEO, Schema.org, языковые версии, работу форм и качество публикации.",
        "features": [
          "Создание сайта с нуля или переезд",
          "Каталоги, отраслевые разделы и экспертные материалы",
          "Технические проверки и поддержка после релиза"
        ],
        "href": "/services/website-development/",
        "cta": "Как устроена разработка"
      }
    ]
  },
  "en/services/index.html": {
    "services": [
      {
        "title": "GEO audits and AI search visibility",
        "text": "I test recommendations in ChatGPT, Yandex Alice and other AI services, study the sources behind them, prepare an action plan and oversee work on the website and external references.",
        "features": [
          "Initial visibility assessment",
          "Full paid GEO audit",
          "Implementation support and follow-up measurements"
        ],
        "href": "/en/#pricing",
        "cta": "See GEO pricing"
      },
      {
        "title": "Website development for SEO and GEO",
        "text": "I design site architecture, content models and implementation requirements. Work can include a new site, a migration or a redesign, with checks for structured data, language versions, forms and release quality.",
        "features": [
          "New websites and platform migrations",
          "Connected catalogs, industry pages and expert content",
          "Technical QA and ongoing improvements"
        ],
        "href": "/en/services/website-development/",
        "cta": "Explore website development"
      }
    ]
  },
  "services/website-development/index.html": {
    "when": [
      {
        "title": "Создать сайт с нуля",
        "text": "Когда у компании нет подходящего сайта, нужна новая продуктовая структура, многоязычность или каталог с большим количеством связанных страниц."
      },
      {
        "title": "Перестроить существующий",
        "text": "Когда сайт уже приносит заявки, но тормозит развитие: страницы дублируются, данные расходятся, публикации требуют ручной работы, SEO-требования сложно соблюдать."
      },
      {
        "title": "Перенести сайт без потери важного",
        "text": "Когда меняется платформа, заранее сопоставляю старые и новые URL, контент, редиректы, метаданные и аналитику. Сначала инвентаризация, потом переключение."
      }
    ],
    "steps": [
      {
        "title": "Разбираю бизнес и спрос",
        "text": "Обсуждаю продукты, целевую аудиторию, заявки, текущий SEO-трафик, обращения из нейросетей и возможности IT-команды."
      },
      {
        "title": "Проектирую страницы и данные",
        "text": "Формирую структуру URL, виды страниц, источники информации, требования к дизайну, контенту и техническому SEO/GEO."
      },
      {
        "title": "Организую реализацию",
        "text": "Готовлю задачи исполнителям и агентским инструментам, проверяю промежуточные версии, исправляю проблемы в канонических компонентах."
      },
      {
        "title": "Принимаю и публикую",
        "text": "Проверяю сборку, мобильную версию, ссылки, форму, метаданные и аналитику; при переезде отдельно контролирую URL и индексацию."
      }
    ],
    "cases": [
      {
        "title": "GAEO.ru",
        "text": "Перенос с Tilda на Astro и GitHub Pages, отраслевые страницы, RU/EN-версии, общие компоненты и автоматические проверки публикаций.",
        "href": "/cases/razrabotka-sajta-gaeo/",
        "cta": "Читать кейс GAEO.ru"
      },
      {
        "title": "IndexResearch.ru",
        "text": "Исследовательский сайт с отдельными публикациями, методиками и разделами на русском, английском и китайском языках.",
        "href": "/cases/razrabotka-sajta-indexresearch/",
        "cta": "Читать кейс IndexResearch.ru"
      },
      {
        "title": "AdaTours.ru",
        "text": "Большой туристический каталог с турами, странами, местами, экскурсиями, многострановыми маршрутами и поиском.",
        "href": "/cases/razrabotka-sajta-adatours/",
        "cta": "Читать кейс AdaTours.ru"
      }
    ]
  },
  "en/services/website-development/index.html": {
    "when": [
      {
        "title": "Build a new website",
        "text": "For a business that needs a different product structure, multilingual content or a catalog with many connected pages."
      },
      {
        "title": "Improve an existing website",
        "text": "For websites that already attract customers but are difficult to scale, contain inconsistent data or make technical SEO changes unnecessarily costly."
      },
      {
        "title": "Migrate without losing valuable pages",
        "text": "Before changing platforms, I map old and new URLs, content, redirects, analytics and metadata, then verify the release."
      }
    ],
    "steps": [
      {
        "title": "Review the business and demand",
        "text": "I discuss the offer, audience, lead sources, current search performance, AI recommendations and development resources."
      },
      {
        "title": "Design pages and data",
        "text": "I define URL structures, page types, source information, content requirements and SEO/GEO acceptance criteria."
      },
      {
        "title": "Coordinate implementation",
        "text": "I write specifications and work with developers and AI coding tools, checking shared components and intermediate builds."
      },
      {
        "title": "Test and publish",
        "text": "I check browser rendering, forms, metadata, links and analytics. For migrations, I separately verify redirects and indexability."
      }
    ],
    "cases": [
      {
        "title": "GAEO.ru",
        "text": "Migrated from Tilda to Astro and GitHub Pages, with industry content, linked Russian/English pages and repeatable release checks.",
        "href": "/en/cases/razrabotka-sajta-gaeo/",
        "cta": "Read the GAEO.ru case"
      },
      {
        "title": "IndexResearch.ru",
        "text": "A research publishing website with independent studies, methodological references and Russian, English and Chinese sections.",
        "href": "/en/cases/razrabotka-sajta-indexresearch/",
        "cta": "Read the IndexResearch.ru case"
      },
      {
        "title": "AdaTours.ru",
        "text": "An extensive travel catalog connecting tours, countries, places, excursions, multi-country itineraries and search.",
        "href": "/en/cases/razrabotka-sajta-adatours/",
        "cta": "Read the AdaTours.ru case"
      }
    ]
  }
};

export function designDataFor(sourcePath, block){
  const page=designPageContent[sourcePath];
  if(!page)throw new Error(`No design content for ${sourcePath}`);
  const data=page[block];
  if(!Array.isArray(data)||!data.length)throw new Error(`Unconfigured ${block} block on ${sourcePath}`);
  return data;
}
