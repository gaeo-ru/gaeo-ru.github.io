# GAEO.ru — финальный staging release-check перед DNS

**Дата проверки:** 21 сентября 2026  
**Проверенный сайт:** `https://gaeo-ru.github.io/`  
**Проверенный контентный commit:** `e216b02c3f9ec4e182ba13e9294894fa00e54d12`  
**Результат:** **PASS — staging готов к этапу переключения DNS**

## 1. Технический SEO/GEO QA

GitHub Actions: `Site maintenance and QA #96`

- HTML pages: **31**
- errors: **0**
- warnings: **0**
- `SITE_QA=PASS`

Проверяются в том числе:

- Title / description / H1;
- canonical;
- hreflang;
- lang;
- robots meta;
- Schema.org / JSON-LD;
- FAQ ↔ FAQPage;
- sitemap preview;
- изображения / ALT / размеры;
- внутренние ссылки;
- Tilda CDN / Base64;
- staging hostname в production metadata;
- Google/Yandex verification;
- сохранение старых URL;
- staging/production CNAME contract.

## 2. Полный HTTP-crawl опубликованного staging

GitHub Actions: `Staging release audit #27`

- ожидаемых HTML-маршрутов: **30**
- уникальных внутренних URL / ресурсов: **68**
- проверено HTTP-целей: **68**
- ошибок: **0**
- предупреждений: **0**
- результат: **PASS**

Реальный GitHub Pages 404 также проверяется отдельным probe-запросом.

## 3. Lighthouse / производительность

Контрольные страницы:

- главная;
- статья;
- кейс;
- профессиональная биография;
- коммерческая посадочная.

Финальный контроль:

| Страница | Desktop | Mobile | Mobile LCP | Mobile CLS | Mobile TBT |
|---|---:|---:|---:|---:|---:|
| Главная | 99 | 97 | 2.4 s | 0.005 | 50 ms |
| Статья | — | 96 | 2.6 s | 0.005 | 0 ms |
| Биография | — | 96 | 2.6 s | 0.002 | 0 ms |
| Кейс | — | 100 | 1.5 s | 0.008 | 0 ms |
| Коммерческая | — | 95 | 2.8 s | 0.002 | 10 ms |

Desktop-проверки репрезентативных страниц в том же workflow находятся в диапазоне 99–100.

## 4. Visual desktop/mobile QA

GitHub Actions: `Staging visual release check #1`

Проверено:

- 7 типов страниц;
- desktop 1440×900;
- mobile 390×844;
- всего **14 browser-проверок**;
- failures: **0**;
- `VISUAL_SMOKE=PASS`.

Автоматически проверены:

- горизонтальное переполнение;
- наличие и видимость header/main/footer;
- достаточный статический текст в main;
- незагрузившиеся изображения;
- внутренние HTTP 4xx/5xx;
- необработанные page errors;
- staging noindex.

Сохранены full-page screenshots всех 14 вариантов. Скриншоты также просмотрены вручную: новых налезаний, обрезаний, горизонтального скролла, пустых изображений или сломанного футера не обнаружено.

## 5. Tilda dependency

Поиск по текущему репозиторию:

- `static.tildacdn.com`: **0 совпадений**;
- `tildacdn.com`: **0 совпадений**.

Рабочих зависимостей нового сайта от Tilda не осталось.

## 6. Защита от преждевременной индексации

Текущее состояние:

- `SITE_MODE = staging`;
- `robots.txt`:
  ```txt
  User-agent: *
  Disallow: /
  ```
- содержательные страницы имеют staging robots meta `noindex,nofollow,noarchive`;
- активного root `CNAME` нет;
- GitHub Pages custom domain пока не задан;
- `CNAME.production` подготовлен отдельно и неактивен.

Production robots, sitemap и index meta **не включены**.

## 7. URL migration

- 15 старых содержательных URL сохранены 1:1;
- 7 технических Tilda-URL не переносятся;
- migration contract закреплен в `site_qa.py`;
- каноническая карта: `MIGRATION_URL_MAP.md`.

## 8. DNS / custom domain

Подготовлено:

- `DNS_MIGRATION_PLAN.md`;
- сохранены MX и DKIM Яндекс 360;
- зафиксирован обязательный SPF для целевой зоны;
- перенесены Google Search Console и Яндекс Вебмастер verification meta;
- `CNAME.production = gaeo.ru`;
- GitHub Pages source = `main /`;
- перед проверкой custom domain Pages build имел конечный статус `built`;
- HTTPS enforcement включен на staging Pages.

## 9. Решение

Критерий пункта 38 выполнен:

```text
site_qa.py = PASS
crawl = PASS
visual mobile/desktop = PASS
no Tilda dependency
no accidental production indexing
```

**Можно переходить к этапу 2 — переключению DNS / custom domain.**

До начала пункта 39 ничего из production-режима не включать:

- не снимать noindex;
- не открывать production robots;
- не публиковать production sitemap;
- не активировать IndexNow;
- не создавать активный root `CNAME` вне согласованного сценария переключения.
