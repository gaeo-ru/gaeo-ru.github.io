# Sostav.ru / IndexResearch: pilot login via GitHub Secrets

Status (2026-11-06): native-password form opening is fixed and verified. **Autonomous sign-in as IndexResearch is NOT verified: the single control run stopped at the Yandex SmartCaptcha gate before filling or submitting credentials.** Existing Issue #60: https://github.com/gaeo-ru/gaeo-ru.github.io/issues/60. Do not retry blindly or assume credentials were rejected.
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
| `AUTHENTICATED_INDEXRESEARCH` | A fresh `/auth/user/edit` page exposes the authenticated profile form; its first/last name and the account header both exactly match IndexResearch (ignoring whitespace/case) |
| `AUTHENTICATED_PROFILE_UNVERIFIED` | Login is confirmed but the exact author identity was not visible on the profile page; do not assume IndexResearch author was selected |
| `CAPTCHA_REQUIRED` | The site demanded an interactive anti-bot challenge; no automated circumvention is attempted |
| `CREDENTIALS_REJECTED` | Sostav rejected the credential pair |
| `MISSING_SECRETS` | At least one of the two secrets was missing or empty |
| `LOGIN_FORM_NOT_FOUND` | The actual native-password controls did not become visible after the two normal site clicks; do not submit hidden fields or force CSS visibility |
| `ACCESS_BLOCKED` / `SITE_UNAVAILABLE` | Site blocked the runner or could not be opened |
| Other status | Inspect the workflow, **without** exporting credentials or cookies |

## 4. Architectural limits

**A GitHub Actions secret cannot be fetched back into ChatGPT Work.** It is decrypted only inside a running GitHub Actions job. A successful test will demonstrate that Actions can sign in independently; it will **not** authorize the existing Work cloud-browser session. A subsequent publication workflow can use the same isolated browser in Actions, but would require its own tested publishing logic.

Sostav may challenge a GitHub-hosted runner, particularly when connecting from a data-center IP. CAPTCHA/2FA cannot be assumed solvable automatically. Do not attempt to circumvent access controls, leak session cookies, or store plaintext credentials in repository files.

This pilot is intentionally separate from GAEO site deployment and publishing workflows. Its files are confined to `.github/`. It never commits web pages or artifacts.

## 5. Diagnosis and targeted repair — 2026-11-06

- The original infrastructure error was Playwright 1.56.0 on an unsupported newer Ubuntu host. The existing pinned `mcr.microsoft.com/playwright/python:v1.56.0-noble` container resolves this; it is retained.
- Work cloud browser already had an unrelated signed-in account. No logout or account switch was performed. The actual current profile route and form structure were inspected without submitting any changes.
- Secret-free runner diagnostics: https://github.com/gaeo-ru/gaeo-ru.github.io/actions/runs/42198515485 and https://github.com/gaeo-ru/gaeo-ru.github.io/actions/runs/42198784243.
- `#auth .auth-login` loads `/auth/login/form` and the site's `auth.js`. Requests succeeded and no page JavaScript errors were observed. The modal was open, but `#alternate_form` was inside `.native-login .form` with `display:none` and zero-size password control.
- The visible second control is **«Ввести логин / пароль»** (`a.alternate-enter`). Sostav's own listener expands the native form. The previous script repeatedly clicked «Войти» and never activated this control. This is the cause of `LOGIN_FORM_NOT_FOUND`, not missing Chromium or an iframe.
- A timed advertising overlay can intercept the initial click. Normal Playwright actionability waiting now allows it to expire; no ad removal, forced clicks, CSS overrides, CAPTCHA bypass or internal-handler calls are used.
- The existing Python script now follows the two normal clicks, waits for visible/editable native fields, submits at most once, and verifies a fresh authenticated profile page. The obsolete `/tools/user_tools.php?part=profile` fallback is removed.
- Exact identity verification uses the protected `#user_edit_form` on `/auth/user/edit`, its profile name fields and `#auth_user` together. Only boolean results leave the runner.
- Workflow retains the pinned container, permits a secret-free `[AUTH-DIAG-NO-SECRETS]` mode in the same runner, and serializes runs instead of cancelling a potentially submitted login. Normal control runs still receive secrets only inside their sign-in step.
- Completed exactly one control run after the fix: https://github.com/gaeo-ru/gaeo-ru.github.io/actions/runs/42199292677. Result: **CAPTCHA_REQUIRED**, stage `login_form`; native form opening is verified, credential entry/submission did not occur. Result comment: https://github.com/gaeo-ru/gaeo-ru.github.io/issues/60#issuecomment-6682242290. No articles, drafts or profile changes were performed.

The optional `--diagnose` mode now reports only approved booleans/status, with no raw DOM, public script snippets or network data. It does not read credential environment variables. Do not mix its Issue-body marker into a real control run.

## 6. Verified result and remaining blocker — 2026-11-06

Control evidence (approved booleans only):

- `login_modal_visible=1`, `native_toggle_visible=1`, `native_form_visible=1`, `native_form_active=1`, `home_after_password=1`.
- The site's submit button remained disabled after waiting 20 seconds for the normal CAPTCHA callback. `credential_submit_once` was never reached. No sign-in POST containing credentials was made.
- `CAPTCHA_REQUIRED` means the CAPTCHA gate did not complete; it does **not** mean the secret pair was rejected, nor does it prove an interactive checkbox appeared.
- Follow-up public diagnostics with no secrets and no CAPTCHA interaction: https://github.com/gaeo-ru/gaeo-ru.github.io/actions/runs/42199703221. Comment: https://github.com/gaeo-ru/gaeo-ru.github.io/issues/60#issuecomment-6682297146.
- Those diagnostics confirmed Yandex CAPTCHA resources returned successful HTTP responses, no observed failed CAPTCHA requests or HTTP errors, and a visible CAPTCHA iframe. The submit button still remained disabled. In that iframe, no visible checkbox/input or recognized text challenge/error was exposed to Playwright. Thus no technically available ordinary interaction was identified; human participation is not asserted solely from the generic status.
- Work's cloud browser was already signed in under another author. Its session was preserved; it cannot be treated as the isolated Actions CAPTCHA session. No session export or alternative infrastructure was created.
- Protected-profile identity verification is implemented for a fresh `/auth/user/edit` page, requiring both the actual profile name and account header to equal IndexResearch. This branch remains **unexercised**, because the CAPTCHA prevented credential submission.
- **Publication automation is not ready.** The form-opening defect is repaired, but the mandatory CAPTCHA callback has not been obtained in the unattended runner and a successful IndexResearch session has not been demonstrated. Future publishing logic would also need independent implementation and testing after sign-in is verified.
- No additional credentialed control run was made. Do not edit Issue #60 for another attempt without a justified code change or explicit new authorization.

Changed files remain confined to the original authentication script, its workflow and this README. No credentials, cookies, tokens, browser-session files or screenshots were written to repository files, Issues, logs or artifacts. The ephemeral status JSON contains only approved statuses/stages and boolean probes.
