#!/usr/bin/env python3
"""One-shot Sostav sign-in probe. No credentials, cookies or traces are persisted."""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

from playwright.sync_api import sync_playwright

RESULT_FILE = Path("auth_result.json")
PROBE = {}


def probe_ui(page, phase: str) -> None:
    """Record only booleans, never text, HTML, URL, email or cookies."""
    try:
        PROBE[phase + "_login_text"] = bool(page.get_by_text("Войти", exact=True).count())
        PROBE[phase + "_login_locator"] = bool(first_visible(page, LOGIN_LINK_SELECTORS))
        PROBE[phase + "_password"] = bool(first_visible(page, ('input[type="password"]',)))
        PROBE[phase + "_frame"] = bool(len(page.frames) > 1)
        PROBE[phase + "_password_any_frame"] = any(
            bool(frame.locator('input[type="password"]').count()) for frame in page.frames
        )
        PROBE[phase + "_password_dom"] = bool(page.locator('input[type="password"]').count())
        PROBE[phase + "_cross_origin_frame"] = any(
            bool(frame.url and not sostav_origin(frame.url) and not frame.url.startswith("about:"))
            for frame in page.frames
        )
        PROBE[phase + "_body_login_word"] = "войти" in page.locator("body").inner_text(timeout=3000).lower()
    except Exception:
        PROBE[phase + "_probe_error"] = True

HOME_URL = "https://www.sostav.ru/"
PROFILE_URL = "https://www.sostav.ru/tools/user_tools.php?part=profile"

LOGIN_FIELD_SELECTORS = (
    'input[type="email"]',
    'input[autocomplete="username"]',
    'input[name="login"]',
    'input[name*="email" i]',
    'input[name*="user" i]',
    'input[placeholder*="почт" i]',
    'input[placeholder*="mail" i]',
    'input[placeholder*="логин" i]',
    'input[type="text"]',
)
LOGIN_LINK_SELECTORS = (
    'a:has-text("Войти")',
    'button:has-text("Войти")',
    '[role="button"]:has-text("Войти")',
    'text="Войти"',
)
SUBMIT_SELECTORS = (
    'button[type="submit"]',
    'input[type="submit"]',
    'button:has-text("Войти")',
    'button:has-text("Вход")',
    'input[value="Войти"]',
)
CHALLENGE_SELECTORS = (
    'iframe[src*="recaptcha" i]',
    'iframe[src*="captcha" i]',
    'iframe[title*="captcha" i]',
    '[class*="smart-captcha" i]',
    '[id*="captcha" i]',
    'input[name*="captcha" i]',
    '[data-sitekey]',
)


def finish(status: str, stage: str) -> int:
    # Controlled, non-secret values only. No URL, email, page contents or exception.
    RESULT_FILE.write_text(
        json.dumps({"status": status, "stage": stage, "probe": PROBE}, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    return 0 if status == "AUTHENTICATED_INDEXRESEARCH" else 1


def sostav_origin(url: str) -> bool:
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    return parsed.scheme == "https" and (host == "sostav.ru" or host.endswith(".sostav.ru"))


def first_visible(scope, selectors):
    for selector in selectors:
        try:
            matches = scope.locator(selector)
            for index in range(min(matches.count(), 8)):
                candidate = matches.nth(index)
                if candidate.is_visible(timeout=700):
                    return candidate
        except Exception:
            continue
    return None


def activate_login_control(page, context, phase: str) -> None:
    """Try each visible login trigger; stop as soon as the form becomes visible."""
    seen = 0
    for selector in LOGIN_LINK_SELECTORS:
        try:
            nodes = page.locator(selector)
            count = min(nodes.count(), 10)
        except Exception:
            continue
        for idx in range(count):
            try:
                node = nodes.nth(idx)
                if not node.is_visible():
                    continue
                seen += 1
                node.click(timeout=4000)
                page.wait_for_timeout(650)
                if find_password_form(context) is not None:
                    PROBE[phase + "_trigger_success"] = True
                    return
            except Exception:
                continue
    PROBE[phase + "_trigger_success"] = False
    PROBE[phase + "_some_click"] = bool(seen)


def visible_challenge(page) -> bool:
    for frame in page.frames:
        if not sostav_origin(frame.url):
            continue
        if first_visible(frame, CHALLENGE_SELECTORS) is not None:
            return True
        try:
            body = frame.locator("body").inner_text(timeout=1500).lower()
            if any(
                phrase in body
                for phrase in (
                    "подтвердите, что вы не робот",
                    "проверка, что вы не робот",
                    "пройдите проверку captcha",
                    "пройдите капчу",
                )
            ):
                return True
        except Exception:
            pass
    return False


def find_password_form(context):
    for tab in reversed(context.pages):
        for frame in tab.frames:
            if not sostav_origin(frame.url):
                continue
            password_input = first_visible(frame, ('input[type="password"]',))
            if password_input is not None:
                return tab, frame, password_input
    return None


def profile_status(page) -> str:
    try:
        response = page.goto(PROFILE_URL, wait_until="domcontentloaded", timeout=30000)
        if response is not None and response.status in (403, 429):
            return "ACCESS_BLOCKED"
        page.wait_for_timeout(1000)
        body = page.locator("body").inner_text(timeout=10000).lower()
    except Exception:
        return "PROFILE_UNAVAILABLE"
    logged_in = any(
        marker in body
        for marker in (
            "вы уже авторизованы под логином",
            "вы авторизованы под логином",
            "выйти из аккаунта",
            "мой профиль",
        )
    )
    if not logged_in:
        # Login form or site home with "Войти" does not prove an authenticated session.
        return "AUTHENTICATION_NOT_CONFIRMED"
    # Expected publishing identity must be confirmed separately from the login itself.
    if "indexresearch" in body.replace(" ", "") or "index research" in body:
        return "AUTHENTICATED_INDEXRESEARCH"
    return "AUTHENTICATED_PROFILE_UNVERIFIED"


def diagnose() -> int:
    """Unauthenticated DOM diagnostics; no secrets are read or supplied."""
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        context = browser.new_context(locale="ru-RU", viewport={"width": 1440, "height": 900})
        page = context.new_page()
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error).splitlines()[0][:200]))
        network = []
        page.on("response", lambda response: network.append({"path": urlparse(response.url).path, "status": response.status})
                if sostav_origin(response.url) and "auth" in urlparse(response.url).path else None)
        page.goto(HOME_URL, wait_until="domcontentloaded", timeout=45000)
        page.wait_for_timeout(4000)
        def inspect(phase):
            # Never include field values, hidden inputs, page text, HTML or query strings.
            data = page.evaluate("""() => {
              const info=e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {
                tag:e.tagName,id:e.id,cls:e.className,display:s.display,visibility:s.visibility,
                opacity:s.opacity,width:Math.round(r.width),height:Math.round(r.height)}};
              const pass=[...document.querySelectorAll('input[type=password]')];
              return {triggers:[...document.querySelectorAll('a,button,div,span')]
                .filter(e=>e.childElementCount===0 && e.textContent.trim()==='Войти').map(e=>({self:info(e),parent:info(e.parentElement)})),
                passwords:pass.map(e=>{const chain=[];for(let p=e;p&&chain.length<8;p=p.parentElement)chain.push(info(p));return chain}),
                scripts:[...document.scripts].map(s=>s.getAttribute('src')).filter(Boolean)
                 .filter(s=>s.includes('sostav.ru')||s.startsWith('/')).map(s=>s.split('?')[0])};
            }""")
            print("AUTH_DIAG_" + phase + "=" + json.dumps(data, ensure_ascii=False))
        inspect("before")
        trigger = page.get_by_text("Войти", exact=True).first
        try:
            trigger.click(timeout=35000)
        except Exception:
            print("AUTH_DIAG_click_timeout=1")
        page.wait_for_timeout(5000)
        inspect("after")
        print("AUTH_DIAG_network=" + json.dumps(network))
        # Only a public, static first-party resource; no session data or form HTML.
        source = context.request.get("https://cdn.sostav.ru/js/front/karkas.js?v=202050126").text()
        lines = source.splitlines()
        for i, line in enumerate(lines):
            if any(term in line.lower() for term in ("auth", "vex.", "login")):
                print("AUTH_DIAG_static_js=" + "\\n".join(lines[max(0, i-2):i+4])[:3000])
        # Error categories only; no error messages or source URLs.
        print("AUTH_DIAG_errors=" + json.dumps({
            "count": len(errors), "jquery_undefined": any("jQuery is not defined" in e or "$ is not defined" in e for e in errors),
            "require_undefined": any("require is not defined" in e for e in errors),
            "type_error": any("is not a function" in e for e in errors),
        }))
        context.close()
        browser.close()
    finish("DIAGNOSTICS_COMPLETE", "diagnostics")
    return 0


def run() -> int:
    login = os.environ.get("SOSTAV_INDEXRESEARCH_LOGIN", "")
    password = os.environ.get("SOSTAV_INDEXRESEARCH_PASSWORD", "")
    if not login or not password:
        return finish("MISSING_SECRETS", "configuration")

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            context = browser.new_context(
                locale="ru-RU",
                timezone_id="Europe/Moscow",
                viewport={"width": 1440, "height": 900},
                accept_downloads=False,
            )
            page = context.new_page()
            try:
                response = page.goto(HOME_URL, wait_until="domcontentloaded", timeout=45000)
            except Exception:
                return finish("SITE_UNAVAILABLE", "home")
            if response is not None and response.status in (403, 429):
                return finish("ACCESS_BLOCKED", "home")
            page.wait_for_timeout(1200)
            probe_ui(page, "home")

            login_form = find_password_form(context)
            if login_form is None:
                activate_login_control(page, context, "home")
                probe_ui(page, "home_after")
                login_form = find_password_form(context)

            if login_form is None and visible_challenge(page):
                return finish("CAPTCHA_REQUIRED", "pre_login")

            # Sostav also exposes a legacy profile/login entry point, independent
            # of the homepage login modal. Try it before declaring the form absent.
            if login_form is None:
                try:
                    response = page.goto(PROFILE_URL, wait_until="domcontentloaded", timeout=25000)
                    if response is not None and response.status in (403, 429):
                        return finish("ACCESS_BLOCKED", "profile_entry")
                    page.wait_for_timeout(2000)
                except Exception:
                    pass
                probe_ui(page, "profile")
                login_form = find_password_form(context)

            # Registration has the same header login trigger but does not itself
            # ask for a password; safe fallback on the verified Sostav origin.
            if login_form is None:
                try:
                    response = page.goto("https://www.sostav.ru/auth/register", wait_until="domcontentloaded", timeout=25000)
                    if response is not None and response.status in (403, 429):
                        return finish("ACCESS_BLOCKED", "register_entry")
                    page.wait_for_timeout(1200)
                    activate_login_control(page, context, "register")
                except Exception:
                    PROBE["register_trigger_success"] = False
                probe_ui(page, "register_after")
                login_form = find_password_form(context)

            if login_form is None:
                if visible_challenge(page):
                    return finish("CAPTCHA_REQUIRED", "alternate_entry")
                return finish("LOGIN_FORM_NOT_FOUND", "alternate_entry")

            tab, frame, password_input = login_form
            if visible_challenge(tab):
                return finish("CAPTCHA_REQUIRED", "login_form")

            form = password_input.locator("xpath=ancestor::form[1]")
            scope = form if form.count() else frame
            if form.count():
                action = form.first.get_attribute("action") or ""
                destination = urljoin(frame.url, action)
                if not sostav_origin(destination):
                    return finish("UNTRUSTED_LOGIN_DESTINATION", "login_form")

            # With no form element, never confuse the site-wide search box with a login input.
            selectors = LOGIN_FIELD_SELECTORS if form.count() else LOGIN_FIELD_SELECTORS[:-1]
            login_input = first_visible(scope, selectors)
            if login_input is None:
                return finish("LOGIN_FIELD_NOT_FOUND", "login_form")

            try:
                login_input.fill(login, timeout=7000)
                password_input.fill(password, timeout=7000)
            except Exception:
                return finish("LOGIN_FIELDS_NOT_EDITABLE", "login_form")

            submit = first_visible(scope, SUBMIT_SELECTORS)
            try:
                if submit is not None:
                    submit.click(timeout=10000)
                else:
                    password_input.press("Enter", timeout=10000)
                tab.wait_for_timeout(3300)
            except Exception:
                return finish("LOGIN_SUBMIT_FAILED", "submit")

            if visible_challenge(tab):
                return finish("CAPTCHA_REQUIRED", "post_submit")

            try:
                content = tab.locator("body").inner_text(timeout=4000).lower()
                if any(
                    marker in content
                    for marker in (
                        "неверный пароль",
                        "неправильный пароль",
                        "неверный логин",
                        "неверный email",
                        "неправильный логин",
                    )
                ):
                    return finish("CREDENTIALS_REJECTED", "post_submit")
            except Exception:
                pass

            result = profile_status(tab)
            context.close()
            browser.close()
            return finish(result, "profile")
    except Exception:
        # Never print exception messages: upstream URLs may contain tokens.
        return finish("UNEXPECTED_ERROR", "runtime")


if __name__ == "__main__":
    sys.exit(diagnose() if "--diagnose" in sys.argv else run())

