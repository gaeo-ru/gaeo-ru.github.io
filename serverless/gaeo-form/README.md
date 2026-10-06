# GAEO lead form backend

Serverless handler for the public GAEO.ru lead form. It follows the same production pattern as IndexResearch.ru: GitHub Pages frontend → Yandex Cloud Function → Yandex Cloud Postbox → email.

## Yandex Cloud Function

- Runtime: Python 3.14
- Entrypoint: `index.handler`
- Memory: 128 MB
- Timeout: 10 seconds
- Public function: enabled
- Service account: attach a service account with the `postbox.sender` role
- Static API keys are not required; the handler uses the service-account IAM token available in the function context.

## Environment variables

```text
POSTBOX_FROM=form@gaeo.ru
POSTBOX_TO=ya@gaeo.ru
ALLOWED_ORIGINS=https://gaeo.ru,https://www.gaeo.ru
MAX_BODY_BYTES=32768
MIN_FILL_SECONDS=1.5
```

Production accepts submissions only from `https://gaeo.ru` and `https://www.gaeo.ru`.

## Postbox

Verify `gaeo.ru` in Yandex Cloud Postbox in the same cloud folder as the service account used by the function. Easy DKIM is preferred.

The function sends a raw MIME message through the Postbox HTTP API. A validated visitor email is used as `Reply-To`, so a lead can be answered directly.

## Frontend endpoint

After deployment, set the public invocation URL in the GAEO frontend configuration before declaring the form production-ready. The public function URL is not a secret.

Expected payload fields:

- `site=gaeo`
- `lang`
- `full_name`
- normalized `phone`
- `phone_country`
- `email`
- `preferred_contact` (`phone`, `telegram`, `whatsapp`, `email`; optional)
- `comment`
- honeypot
- page URL and referrer
- UTM/click identifiers
- form start/submission timestamps

## Privacy and anti-spam

The handler validates Origin, field lengths and formats, rejects oversized requests, uses a honeypot and suppresses unrealistically fast submissions. It does not log the visitor's lead contents.
