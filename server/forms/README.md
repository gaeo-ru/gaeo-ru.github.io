# GAEO forms backend

Small isolated backend for lead forms on GAEO.ru.

## Architecture

- public site: GitHub Pages
- endpoint: `https://forms.gaeo.ru/v1/lead`
- service: Go binary bound only to `127.0.0.1:8787`
- reverse proxy / TLS: nginx
- mail delivery: authenticated Yandex SMTP
- sender: `gaeo@gaeo.ru`
- recipient: `ya@gaeo.ru`
- no lead database

## Anti-spam

The handler uses several low-friction checks:

- hidden honeypot field
- strict server-side validation
- maximum request size 32 KB
- rate limit: 10 requests per IP per 10 minutes
- duplicate suppression for 15 minutes
- browser Origin allowlist when Origin is present

There is intentionally no CAPTCHA in the first version. Requests without an Origin header are allowed so legitimate automated agents can submit a lead on a person's behalf.

## Required environment

Copy `.env.example` to `/etc/gaeo-forms.env` and put the real Yandex application password there.

The password must never be committed to Git.

## First server deployment, before DNS switch

Commands below require an administrator once for initial setup.

```bash
useradd --system --home /opt/gaeo-forms --shell /usr/sbin/nologin gaeo-forms
install -d -o gaeo-forms -g gaeo-forms -m 0750 /opt/gaeo-forms

# build on any Linux amd64 host with Go 1.23+
cd server/forms
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o gaeo-forms .

install -o gaeo-forms -g gaeo-forms -m 0750 gaeo-forms /opt/gaeo-forms/gaeo-forms
install -o root -g gaeo-forms -m 0640 .env.example /etc/gaeo-forms.env
# edit /etc/gaeo-forms.env and replace CHANGE_ME with the Yandex app password

install -o root -g root -m 0644 gaeo-forms.service /etc/systemd/system/gaeo-forms.service
systemctl daemon-reload
systemctl enable --now gaeo-forms

curl -fsS http://127.0.0.1:8787/healthz
```

Expected response:

```text
ok
```

At this stage the service is not exposed to the internet and does not affect sunnytoy.ru.

## Nginx preparation

Copy `nginx-forms.gaeo.ru.conf` into the server's nginx sites directory according to the existing distro layout, enable it and reload nginx.

Before DNS is changed, the vhost can be checked locally:

```bash
curl -fsS -H 'Host: forms.gaeo.ru' http://127.0.0.1/healthz
```

## DNS and HTTPS

After the local service and nginx vhost are healthy:

1. create DNS record `A forms.gaeo.ru -> 178.132.207.162`;
2. wait until it resolves publicly;
3. issue a Let's Encrypt certificate for `forms.gaeo.ru`;
4. verify `https://forms.gaeo.ru/healthz`;
5. set the frontend endpoint to `https://forms.gaeo.ru/v1/lead`.

Do not change the GitHub Pages records just to add this subdomain.

## SMTP

Production values:

```text
host: smtp.yandex.ru
port: 587 STARTTLS
username: gaeo@gaeo.ru
From: gaeo@gaeo.ru
To: ya@gaeo.ru
```

Use a Yandex application password, not the normal account password.

## Privacy

The service does not store lead bodies in a database. Rate-limit and duplicate data exist only in RAM and disappear on restart. Application logs must not contain form fields.
