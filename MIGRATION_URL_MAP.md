# GAEO.ru — карта URL для миграции с Tilda на GitHub Pages

**Статус:** каноническая карта URL перед переключением домена  
**Дата:** 21 сентября 2026  
**Правило:** существующие публичные содержательные URL сохраняются 1:1. Новый URL допустим только для нового контента. Технические страницы Tilda не переносятся.

## Источники проверки

- архив старого GAEO.ru `gaeo-old-site-metadata-html(1).zip`;
- старый публичный `sitemap.xml`;
- `urls.csv` и raw HTML из архива;
- текущий GitHub-репозиторий `gaeo-ru/gaeo-ru.github.io`;
- индексные результаты веб-поиска на 21.09.2026.

Итог старого инвентаря:

- 15 публичных содержательных URL;
- 7 технических Tilda-URL;
- всего 22 захваченных старых URL.

## 1. Старые публичные URL: сохранить без изменения

| Старый URL | Новый URL | Решение |
|---|---|---|
| `https://gaeo.ru/` | `https://gaeo.ru/` | сохранить 1:1 |
| `https://gaeo.ru/articles/` | `https://gaeo.ru/articles/` | сохранить 1:1 |
| `https://gaeo.ru/articles/kakie-istochniki-ispolzuyut-neyroseti-pri-vybore-geo-specialistov/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/articles/kakie-neyroseti-vazhny-imenno-vashemu-biznesu-portrety-polzovateley-ii/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/articles/prodvizhenie-lichnogo-brenda-eksperta-v-neyrosetyah/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/articles/strategiya-geo-prodvizheniya-nedvizhimosti/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/cases/` | `https://gaeo.ru/cases/` | сохранить 1:1 |
| `https://gaeo.ru/cases/gaeo-ru/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/cases/prep-center-6-klientov-iz-neyrosetey/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/geo-prodvizhenie-nedvizhimosti/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/professional-biography/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/publications/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/reviews/` | тот же | сохранить 1:1 |
| `https://gaeo.ru/en/` | `https://gaeo.ru/en/` | сохранить 1:1 |
| `https://gaeo.ru/en/professional-biography/` | тот же | сохранить 1:1 |

**Результат:** все 15 старых публичных содержательных URL уже существуют в новом репозитории по тем же адресам. Для них 301 не требуется.

## 2. Старые технические URL Tilda: не переносить

Эти URL были служебными страницами header/footer Tilda. Они не являются самостоятельным содержательным контентом нового сайта.

| Старый URL | Старое назначение | Решение после миграции |
|---|---|---|
| `https://gaeo.ru/header-gaeo` | RU header | не переносить, HTTP 404 |
| `https://gaeo.ru/page146690596.html` | дубль RU header | не переносить, HTTP 404 |
| `https://gaeo.ru/page148769616.html` | RU footer | не переносить, HTTP 404 |
| `https://gaeo.ru/footer-en-canonical` | EN footer | не переносить, HTTP 404 |
| `https://gaeo.ru/header-en-canonical` | EN header | не переносить, HTTP 404 |
| `https://gaeo.ru/page202570109.html` | дубль EN header | не переносить, HTTP 404 |
| `https://gaeo.ru/page202571309.html` | EN footer | не переносить, HTTP 404 |

Не делать для этих адресов редирект на главную: это создало бы ложное соответствие технической страницы содержательной странице и риск soft-404.

## 3. Новые URL, которых не было на старом сайте

Эти страницы созданы уже в новой версии сайта. Для них старого URL и redirect-источника нет.

### Новый индексируемый контент

- `/en/articles/`
- `/en/articles/ai-sources-for-geo-specialists/`
- `/en/articles/geo-for-real-estate/`
- `/en/articles/personal-brand-promotion-in-ai/`
- `/en/articles/which-ai-platforms-matter-for-your-business/`
- `/en/cases/`
- `/en/cases/gaeo-ru/`
- `/en/cases/prep-center-6-paying-clients-from-ai/`
- `/en/geo-for-real-estate/`
- `/en/publications/`
- `/en/reviews/`

### Новые юридические страницы, noindex

- `/privacy-policy/`
- `/personal-data-consent/`
- `/en/privacy-policy/`
- `/en/personal-data-consent/`

## 4. Сводка решения по редиректам

На текущем наборе URL **контентных 301-редиректов не требуется**:

- старые содержательные адреса сохранены 1:1;
- новые страницы не имеют старых аналогов;
- технические URL Tilda удаляются и должны отдавать настоящий 404.

Если до переключения DNS обнаружится еще один старый содержательный URL вне этого списка, по умолчанию решение такое:

1. если страница сохранилась по смыслу — сохранить старый URL;
2. если содержимое объединено с другой страницей — отдельно решить вопрос 301 на наиболее близкий эквивалент;
3. если это технический/мусорный URL без пользовательского содержания — 404;
4. не отправлять все исчезнувшие адреса на главную.

## 5. Приемка после DNS

После переключения домена проверить:

- все 15 старых публичных URL возвращают HTTP 200;
- URL в адресной строке не меняются;
- canonical каждого адреса указывает на этот же `https://gaeo.ru/...`;
- 7 старых технических Tilda-URL возвращают HTTP 404;
- новые URL работают согласно их текущему статусу index/noindex;
- не возникает массовых redirect chains или soft-404.
