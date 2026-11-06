# Sostav.ru / IndexResearch: pilot login via GitHub Secrets

Status (2026-11-06): infrastructure repaired (pinned Playwright Chromium container); secrets detected. **Successful Sostav login has NOT been verified.** See existing Issue #60: https://github.com/gaeo-ru/gaeo-ru.github.io/issues/60. The login control is visible and clickable but the site's password form stays hidden (LOGIN_FORM_NOT_FOUND after multiple safe entry-point checks). No credential validation was performed. Do not silently retry or claim login success.
No global ChatGPT rule is enabled. No passwords are present in source code.
The Actions job runs in this GAEO repository only; GitHub does not automatically share its secrets with other repositories or ChatGPT Work.

## 1. Add secrets yourself

GAEO website repository: `gaeo-ru/gaeo-ru.github.io` (public code; GitHub Actions Secrets are encrypted and never exposed in repository files).

Open https://github.com/gaeo-ru/gaeo-ru.github.io/settings/secrets/actions

Settings -> Secrets and variables -> Actions -> Repository secrets -> New repository secret.

Create exactly these two secrets:

| Name | Value |
| --- | --- |
| `SOSTAV_INDEXRESEARCH_LOGIN` | The Sostav login for the IndexResearch account |
| `SOSTAV_INDEXRESEARCH_PASSWORD` | The Sostav password for the same account |

No quotes, JSON or prefixes; paste the raw values. Never send the values through chat, GitHub Issues, commits, logs or artifacts. Do not edit any BrandFound API keys.

## 2. Work chat test

Ask Work to use the connected GitHub app and fetch this document. **Issue #60 already exists. Do not create another Issue.** For future independent login-test cases only, create one Issue with the **exact title**:

`[AUTH-TEST] Sostav IndexResearch`

Issue body may say `One-shot login test, no publication.`; it must contain no credentials.

Opening or editing an Issue with the exact title triggers `.github/workflows/gaeo-sostav-indexresearch-auth-test.yml`. Reuse Issue #60 for controlled retries only when code changes justify one; avoid blind repeated logins.
This is limited to an Issue created by `alexyakovlev79` with the exact title. The workflow reads only the two Sostav Secrets, opens Sostav in an isolated Playwright browser and attempts one normal sign-in. It does **not** publish, save cookies, screenshot password fields, upload artifacts or transfer a browser session to Work.

Work must follow the **same Issue** and its GitHub Actions run. After the run completes, read its status comment. Do not create a second Issue simply because the first result was delayed or unclear.

Manual alternative: GitHub -> Actions -> Sostav IndexResearch authentication test -> Run workflow.

## 3. Interpretation

| Status | Meaning |
| --- | --- |
| `AUTHENTICATED_INDEXRESEARCH` | The Sostav profile page confirms a logged-in session and displays IndexResearch |
| `AUTHENTICATED_PROFILE_UNVERIFIED` | Login is confirmed but the exact author identity was not visible on the profile page; do not assume IndexResearch author was selected |
| `CAPTCHA_REQUIRED` | The site demanded an interactive anti-bot challenge; no automated circumvention is attempted |
| `CREDENTIALS_REJECTED` | Sostav rejected the credential pair |
| `MISSING_SECRETS` | At least one of the two secrets was missing or empty |
| `LOGIN_FORM_NOT_FOUND` | Sostav's password field is present in the DOM but hidden after the available login controls are clicked (confirmed in Issue #60). Requires targeted UI/JavaScript diagnosis before a further login attempt |
| `ACCESS_BLOCKED` / `SITE_UNAVAILABLE` | Site blocked the runner or could not be opened |
| Other status | Inspect the workflow, **without** exporting credentials or cookies |

## 4. Architectural limits

**A GitHub Actions secret cannot be fetched back into ChatGPT Work.** It is decrypted only inside a running GitHub Actions job. A successful test will demonstrate that Actions can sign in independently; it will **not** authorize the existing Work cloud-browser session. A subsequent publication workflow can use the same isolated browser in Actions, but would require its own tested publishing logic.

Sostav may challenge a GitHub-hosted runner, particularly when connecting from a data-center IP. CAPTCHA/2FA cannot be assumed solvable automatically. Do not attempt to circumvent access controls, leak session cookies, or store plaintext credentials in repository files.

This pilot is intentionally separate from GAEO site deployment and publishing workflows. Its files are confined to `.github/`. It never commits web pages or artifacts.
