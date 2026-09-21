# GAEO.ru — DNS и GitHub Pages: план переключения

**Статус:** подготовлено до переключения DNS  
**Дата снимка:** 21 сентября 2026  
**Текущий режим сайта:** staging  
**Текущий публичный staging:** https://gaeo-ru.github.io/

## 1. Текущая публичная DNS-зона

Снимок получен внешним GitHub Actions runner через `dig`.

| Имя | Тип | TTL | Текущее значение |
|---|---|---:|---|
| `gaeo.ru` | A | 900 | `176.57.66.87` |
| `gaeo.ru` | AAAA | — | отсутствует |
| `gaeo.ru` | NS | 1800 | `ns1.tildadns.com.` |
| `gaeo.ru` | NS | 1800 | `ns2.tildadns.com.` |
| `gaeo.ru` | MX | 900 | `10 mx.yandex.net.` |
| `gaeo.ru` | TXT | — | отсутствует |
| `gaeo.ru` | CAA | — | отсутствует |
| `www.gaeo.ru` | CNAME | ~900 | `gaeo.ru.` |
| `_dmarc.gaeo.ru` | TXT | — | отсутствует |
| `mail._domainkey.gaeo.ru` | TXT | 900 | DKIM Yandex, значение ниже |
| `forms.gaeo.ru` | A/AAAA/CNAME | — | отсутствует |
| `_github-pages-challenge-gaeo-ru.gaeo.ru` | TXT | — | отсутствует |

Текущий SOA: `ns1.tildadns.com. ns.tilda.team.`

### Текущий DKIM Yandex

Хост:

`mail._domainkey`

Значение:

`v=DKIM1; k=rsa; t=s; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB4ZtnEZHRadLHPgYfH/y4yD6+nwggZ/iOgaG4N5/seWCriSjpZj/7HD/qOVT6318qOygECl4GzghMope4yj7wuRUKuqNQb65gdVE0HYq20Ktvgl1CM9Yj7RaKicisxZpW/4KPVs+3lSjL0k5SAvJCwvgQ9RwzTIDJjhxwGOdUVwIDAQAB`

## 2. Поисковые верификации

На старом Tilda-сайте подтверждение Google Search Console и Яндекс Вебмастера было реализовано meta-тегами, а не DNS TXT.

Оба значения перенесены на новую главную страницу и защищены `site_qa.py`.

Google:

`<meta name="google-site-verification" content="2nIA9bL_leEm2TniUtryyUUtEiKU5k9syCqxJRLELw0">`

Яндекс:

`<meta name="yandex-verification" content="7936ae703c9ab353">`

## 3. Почта Яндекс 360: что сохранить и добавить

Текущая рабочая почта использует Яндекс 360.

### Сохранить без изменения

`MX @ 10 mx.yandex.net.`

`TXT mail._domainkey <текущий DKIM-ключ>`

### Добавить

На текущем DNS SPF отсутствует. Для Яндекс 360 требуется:

`TXT @ "v=spf1 redirect=_spf.yandex.net"`

Это нужно перенести в новую DNS-зону при переключении.

### DMARC

Публичная запись `_dmarc.gaeo.ru` сейчас отсутствует.

В рамках миграции DMARC-политику не вводить автоматически: это отдельное изменение почтовой политики и не должно смешиваться с переключением сайта/DNS.

## 4. Целевая DNS-зона для GitHub Pages

Канонический сайт после миграции:

`https://gaeo.ru/`

GitHub Pages default domain:

`https://gaeo-ru.github.io/`

### Apex `gaeo.ru`

Заменить старый A `176.57.66.87` на 4 A-записи GitHub Pages:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Добавить 4 AAAA-записи GitHub Pages:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

### `www.gaeo.ru`

Заменить:

`www CNAME gaeo.ru.`

на:

`www CNAME gaeo-ru.github.io.`

GitHub Pages при custom domain `gaeo.ru` должен автоматически перенаправлять `www.gaeo.ru` на apex.

## 5. DNS-хостинг после ухода с Tilda

Текущая делегация:

- `ns1.tildadns.com`
- `ns2.tildadns.com`

Целевой ранее согласованный DNS-хостинг — Яндекс 360.

Перед сменой NS в новой зоне должны уже существовать все необходимые записи:

1. 4 × A GitHub Pages;
2. 4 × AAAA GitHub Pages;
3. `www CNAME gaeo-ru.github.io.`;
4. `MX @ 10 mx.yandex.net.`;
5. `TXT @ "v=spf1 redirect=_spf.yandex.net"`;
6. `TXT mail._domainkey` с текущим DKIM-ключом;
7. прочие записи, которые появятся до фактического переключения и будут подтверждены повторным DNS-снимком.

Целевые NS при делегировании зоны на Яндекс:

- `dns1.yandex.net.`
- `dns2.yandex.net.`

Нельзя переключать NS на пустую зону и затем дозаполнять почтовые записи.

## 6. Forms endpoint

На момент снимка `forms.gaeo.ru` не существует в DNS.

Запись для формы добавлять только по итоговому ТЗ параллельной задачи обработчика формы. Не создавать ее по предположению только ради DNS-миграции.

## 7. GitHub Pages до переключения

Снимок настроек Pages:

- default URL: `https://gaeo-ru.github.io/`;
- source: branch `main`, path `/`;
- build type: `legacy`;
- custom domain / cname: `null`;
- HTTPS enforcement: `true`;
- root-файл `CNAME`: отсутствует.

Это правильное staging-состояние. До фактического переключения DNS не добавлять root `CNAME` и не задавать custom domain `gaeo.ru`, чтобы `gaeo-ru.github.io` не начал преждевременно редиректить на production-домен.

## 8. Порядок включения custom domain

В момент реального переключения:

1. Повторить публичный DNS snapshot и сравнить с этим документом.
2. Убедиться, что новая DNS-зона уже содержит MX, SPF и DKIM.
3. Настроить custom domain GitHub Pages = `gaeo.ru`.
4. Для branch-based Pages убедиться, что в root появился/создан `CNAME` со строкой `gaeo.ru`.
5. Переключить DNS/NS согласно согласованному сценарию.
6. Проверить A/AAAA apex и `www CNAME`.
7. Проверить `https://gaeo.ru/` и `https://www.gaeo.ru/`.
8. Убедиться, что канонический вариант `https://gaeo.ru/`, а `www` перенаправляется на него.
9. Проверить сертификат и HTTPS.
10. Проверить MX, SPF и DKIM после распространения DNS.
11. Только после подтверждения нового production-хоста переходить к снятию `noindex` по пунктам 43–45 плана.

## 9. Что не менять в этом этапе

Пока staging не прошел финальный release-check:

- не менять NS;
- не менять A/AAAA;
- не менять `www`;
- не задавать production custom domain в Pages;
- не создавать root `CNAME`;
- не снимать `noindex`;
- не открывать production robots/sitemap.

## 10. Источники

- публичный DNS snapshot GitHub Actions от 21.09.2026;
- старый экспорт Tilda GAEO.ru;
- документация GitHub Pages по custom domain и HTTPS;
- документация Яндекс 360 по MX/SPF/DKIM;
- текущие настройки репозитория `gaeo-ru/gaeo-ru.github.io`.
