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
PROFILE_URL = "https://www.sostav.ru/auth/user/edit"

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
    """Use both real site controls; never change CSS or call internal handlers."""
    trigger = page.locator('#auth .auth-login')
    trigger.wait_for(state="visible", timeout=30000)
    # The site's timed advertising overlay can intercept a normal click.
    trigger.click(timeout=45000)
    modal = page.locator('.vex-content .modal-auth').last
    alternate = modal.locator('a.alternate-enter')
    alternate.wait_for(state="visible", timeout=30000)
    PROBE["login_modal_visible"] = True
    PROBE["native_toggle_visible"] = True
    alternate.click(timeout=10000)
    form = modal.locator('#alternate_form')
    form.locator('#input_username').wait_for(state="visible", timeout=15000)
    form.locator('#input_password').wait_for(state="visible", timeout=15000)
    PROBE["native_form_visible"] = True
    PROBE["native_form_active"] = "active" in (modal.locator('.native-login .form').get_attribute('class') or '').split()
    PROBE[phase + "_trigger_success"] = find_password_form(context) is not None


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
        if not sostav_origin(page.url) or urlparse(page.url).path != "/auth/user/edit":
            return "AUTHENTICATION_NOT_CONFIRMED"
        form = page.locator('form#user_edit_form[action="/auth/user/edit"]')
        form.wait_for(state="visible", timeout=15000)
        page.locator('#auth_user').wait_for(state="visible", timeout=15000)
        PROBE["profile_edit_loaded"] = True
        # Account-specific profile fields, never generic page text or public articles.
        name = form.locator('input[name="firstName"]').input_value() + form.locator('input[name="lastName"]').input_value()
        normalize = lambda value: "".join(value.split()).casefold()
        PROBE["profile_identity_matches"] = normalize(name) == "indexresearch"
        PROBE["header_identity_matches"] = normalize(page.locator('#auth_user').inner_text()) == "indexresearch"
    except Exception:
        return "PROFILE_UNAVAILABLE"
    if PROBE["profile_identity_matches"] and PROBE["header_identity_matches"]:
        return "AUTHENTICATED_INDEXRESEARCH"
    return "AUTHENTICATED_PROFILE_UNVERIFIED"



def inspect_visible_slider(page) -> None:
    """Inspect only boolean UI affordances of a legitimate SmartCaptcha iframe."""
    selectors = {
        "role": ('[role="slider"]', 'input[type="range"]'),
        "slider": ('[class*="slider" i]',),
        "thumb": ('[class*="thumb" i]', '[class*="handle" i]'),
        "track": ('[class*="track" i]',),
        "draggable": ('[draggable="true"]', '[style*="touch-action"]'),
        "canvas": ('canvas',),
    }
    for frame in page.frames:
        parsed = urlparse(frame.url)
        host = (parsed.hostname or "").lower()
        if not (
            (host == "yandex.ru" or host.endswith(".yandex.ru") or host.endswith(".yandex.net"))
            and "captcha" in (host + parsed.path)
        ):
            continue
        PROBE["captcha_slider_frame_found"] = True
        try:
            owner = frame.frame_element()
            if not owner.is_visible():
                continue
            PROBE["captcha_slider_frame_visible"] = True
            for key, options in selectors.items():
                PROBE["captcha_slider_" + key + "_present"] = (
                    PROBE.get("captcha_slider_" + key + "_present", False)
                    or any(frame.locator(option).count() > 0 for option in options)
                )
                PROBE["captcha_slider_" + key + "_visible"] = (
                    PROBE.get("captcha_slider_" + key + "_visible", False)
                    or first_visible(frame, options) is not None
                )
        except Exception:
            PROBE["captcha_slider_dom_unavailable"] = True



def drag_visible_yandex_slider_once(page) -> bool:
    """One normal GUI mouse gesture on a visible Yandex slider; no token injection."""
    def boxes(frame, selectors):
        matches = []
        for selector in selectors:
            try:
                nodes = frame.locator(selector)
                for idx in range(min(nodes.count(), 12)):
                    node = nodes.nth(idx)
                    if not node.is_visible():
                        continue
                    box = node.bounding_box(timeout=1500)
                    if box and box["width"] > 0 and box["height"] > 0:
                        matches.append((box, node))
            except Exception:
                pass
        return matches

    for frame in page.frames:
        parsed = urlparse(frame.url)
        host = (parsed.hostname or "").lower()
        if not (
            (host == "yandex.ru" or host.endswith(".yandex.ru") or host.endswith(".yandex.net"))
            and "captcha" in (host + parsed.path)
        ):
            continue
        try:
            if not frame.frame_element().is_visible():
                continue
            thumbs = boxes(frame, ('[class*="thumb" i]', '[class*="handle" i]', '[role="slider"]'))
            tracks = boxes(frame, ('[class*="track" i]', '[class*="slider" i]'))
            for thumb, thumb_node in sorted(thumbs, key=lambda item: item[0]["width"]):
                if not (9 <= thumb["width"] <= 105 and 8 <= thumb["height"] <= 110):
                    continue
                cx = thumb["x"] + thumb["width"] / 2
                cy = thumb["y"] + thumb["height"] / 2
                for track, _ in sorted(tracks, key=lambda item: item[0]["width"], reverse=True):
                    if track["width"] < max(120, thumb["width"] * 2.3):
                        continue
                    if not (track["x"] - 10 <= cx <= track["x"] + track["width"] + 10):
                        continue
                    if not (track["y"] - 55 <= cy <= track["y"] + track["height"] + 55):
                        continue
                    target_x = track["x"] + track["width"] - thumb["width"] / 2 - 3
                    if target_x - cx < 55:
                        continue
                    PROBE["captcha_slider_geometry_valid"] = True
                    role = first_visible(frame, ('[role="slider"]',))
                    aria_before = role.get_attribute("aria-valuenow") if role else None
                    page.mouse.move(cx, cy)
                    page.mouse.down()
                    try:
                        page.mouse.move(target_x, cy, steps=40)
                    finally:
                        page.mouse.up()
                    PROBE["captcha_slider_mouse_drag_performed"] = True
                    page.wait_for_timeout(1200)
                    try:
                        after = thumb_node.bounding_box(timeout=1500)
                        if after:
                            PROBE["captcha_slider_thumb_moved_right"] = (
                                after["x"] > thumb["x"] + 12
                            )
                            PROBE["captcha_slider_thumb_near_end"] = (
                                after["x"] + after["width"] / 2
                                >= track["x"] + track["width"] - max(14, thumb["width"])
                            )
                    except Exception:
                        PROBE["captcha_slider_thumb_disappeared"] = True
                    try:
                        if role:
                            aria_after = role.get_attribute("aria-valuenow")
                            if aria_before is not None and aria_after is not None:
                                PROBE["captcha_slider_aria_changed"] = aria_before != aria_after
                    except Exception:
                        pass
                    # Do not read or persist the SmartCaptcha token itself.
                    try:
                        PROBE["captcha_token_present_after_drag"] = bool(
                            page.locator('input[name="smart-token"]').evaluate_all(
                                "(nodes) => nodes.some(n => !!n.value)"
                            )
                        )
                    except Exception:
                        pass
                    return True
        except Exception:
            PROBE["captcha_slider_mouse_drag_failed"] = True
            return False
    PROBE["captcha_slider_geometry_valid"] = False
    return False


def diagnose() -> int:
    """Exercise the same public UI without reading or receiving any secrets."""
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            context = browser.new_context(locale="ru-RU", viewport={"width": 1440, "height": 900})
            page = context.new_page()
            captcha_statuses = []
            captcha_failures = []
            def is_captcha_resource(url):
                parsed = urlparse(url)
                return "captcha" in ((parsed.hostname or "") + parsed.path).lower()
            page.on("response", lambda response: captcha_statuses.append(response.status)
                    if is_captcha_resource(response.url) else None)
            page.on("requestfailed", lambda request: captcha_failures.append(True)
                    if is_captcha_resource(request.url) else None)
            page.goto(HOME_URL, wait_until="domcontentloaded", timeout=45000)
            activate_login_control(page, context, "home")
            probe_ui(page, "home_after")
            form = page.locator('#alternate_form')
            username = form.locator('#input_username')
            password = form.locator('#input_password')
            submit = form.locator('button[type="submit"]')
            # Purely local, non-secret form validation probe. Do not click Submit;
            # no authentication request is sent. This cannot validate the real
            # credentials and is never used for an actual sign-in.
            PROBE["submit_enabled_before_dummy"] = submit.is_enabled()
            PROBE["native_form_valid_before_dummy"] = form.evaluate("(el) => el.checkValidity()")
            username.fill("gaeo-ui-probe@example.invalid")
            password.fill("UiProbeOnlyNotARealPassword2026!")
            PROBE["dummy_fields_valid"] = (
                username.evaluate("(el) => el.checkValidity()")
                and password.evaluate("(el) => el.checkValidity()")
            )
            PROBE["native_form_valid_after_dummy"] = form.evaluate("(el) => el.checkValidity()")
            page.wait_for_timeout(3000)
            PROBE["submit_enabled_after_dummy"] = submit.is_enabled()
            username.fill("")
            password.fill("")
            # Check whether legacy site's handlers require keyboard events
            # (keydown/keyup) rather than Playwright's input-only fill().
            # Deliberately fake data, no click on Submit, no authentication POST.
            username.press_sequentially("gaeo-ui-probe@example.invalid", delay=5)
            password.press_sequentially("UiProbeOnlyNotARealPassword2026!", delay=5)
            page.wait_for_timeout(3000)
            PROBE["submit_enabled_after_typing"] = submit.is_enabled()
            PROBE["native_form_valid_after_typing"] = form.evaluate("(el) => el.checkValidity()")
            if "--slider-drag" in sys.argv:
                inspect_visible_slider(page)
                PROBE["captcha_slider_drag_attempted"] = drag_visible_yandex_slider_once(page)
                page.wait_for_timeout(3500)
                PROBE["submit_enabled_after_slider_drag"] = submit.is_enabled()
            username.fill("")
            password.fill("")
            PROBE["submit_enabled"] = submit.is_enabled()
            PROBE["captcha_visible"] = visible_challenge(page)
            inspect_visible_slider(page)
            PROBE["captcha_network_failed"] = bool(captcha_failures)
            PROBE["captcha_http_error"] = any(status >= 400 for status in captcha_statuses)
            PROBE["captcha_http_success"] = any(200 <= status < 300 for status in captcha_statuses)
            for frame in page.frames:
                parsed = urlparse(frame.url)
                if "captcha" not in ((parsed.hostname or "") + parsed.path).lower():
                    continue
                PROBE["captcha_yandex"] = PROBE.get("captcha_yandex", False) or "yandex" in (parsed.hostname or "")
                try:
                    owner = frame.frame_element()
                    if not owner.is_visible():
                        continue
                    PROBE["captcha_frame_visible"] = True
                    text = frame.locator('body').inner_text(timeout=3000).casefold()
                    PROBE["captcha_robot_checkbox_prompt"] = PROBE.get("captcha_robot_checkbox_prompt", False) or any(
                        marker in text for marker in ("я не робот", "i'm not a robot", "i am not a robot"))
                    PROBE["captcha_interactive_prompt"] = PROBE.get("captcha_interactive_prompt", False) or any(
                        marker in text for marker in ("введите", "выберите", "нажмите", "перетащите", "select", "enter the", "drag", "click"))
                    PROBE["captcha_error_text"] = PROBE.get("captcha_error_text", False) or any(
                        marker in text for marker in ("ошибка", "не удалось", "error", "failed"))
                    PROBE["captcha_checkbox_visible"] = PROBE.get("captcha_checkbox_visible", False) or bool(first_visible(frame, ('input[type=checkbox]', '[role=checkbox]')))
                    PROBE["captcha_input_visible"] = PROBE.get("captcha_input_visible", False) or bool(first_visible(frame, ('input:not([type=hidden])',)))
                except Exception:
                    PROBE["captcha_frame_inspection_failed"] = True
            context.close()
            browser.close()
        finish("DIAGNOSTICS_COMPLETE", "diagnostics")
        return 0
    except Exception:
        return finish("LOGIN_FORM_NOT_FOUND", "diagnostics")


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
            probe_ui(page, "home")
            try:
                activate_login_control(page, context, "home")
            except Exception:
                if visible_challenge(page):
                    return finish("CAPTCHA_REQUIRED", "pre_login")
                return finish("LOGIN_FORM_NOT_FOUND", "login_form")
            probe_ui(page, "home_after")
            login_form = find_password_form(context)
            if login_form is None:
                return finish("LOGIN_FORM_NOT_FOUND", "login_form")

            tab, frame, password_input = login_form
            form = password_input.locator("xpath=ancestor::form[1]")
            scope = form if form.count() else frame
            if form.count():
                action = form.first.get_attribute("action") or ""
                destination = urljoin(frame.url, action)
                if not sostav_origin(destination):
                    return finish("UNTRUSTED_LOGIN_DESTINATION", "login_form")

            login_input = first_visible(scope, ('input#input_username[name="username"]',))
            if login_input is None:
                return finish("LOGIN_FIELD_NOT_FOUND", "login_form")

            submit = scope.locator('button[type="submit"]')
            if submit.count() != 1:
                return finish("LOGIN_SUBMIT_FAILED", "login_form")
            # Sostav may disable Submit while the *required username and password
            # fields are still empty*. A loaded SmartCaptcha iframe alone is not
            # evidence that the captcha has blocked an otherwise valid form.
            PROBE["submit_enabled_before_fill"] = submit.is_enabled()
            try:
                login_input.fill(login, timeout=7000)
                password_input.fill(password, timeout=7000)
                PROBE["credentials_filled"] = True
            except Exception:
                return finish("LOGIN_FIELDS_NOT_EDITABLE", "login_form")

            # Allow the site's own input validation and ordinary, invisible
            # SmartCaptcha callbacks to run. Never enable the button ourselves,
            # invoke CAPTCHA APIs, inject responses, or force a hidden click.
            try:
                tab.wait_for_function("""() => {
                  const b=document.querySelector('#alternate_form button[type=submit]');
                  return !!b && !b.disabled;
                }""", timeout=20000)
            except Exception:
                pass
            PROBE["submit_enabled_after_fill"] = submit.is_enabled()
            if not PROBE["submit_enabled_after_fill"]:
                PROBE["captcha_present"] = bool(
                    tab.locator('[class*="captcha" i], [id*="captcha" i], iframe[src*="captcha" i]').count()
                )
                # This is not automatically a CAPTCHA challenge: a form may also
                # remain disabled because of native validation or a site-side bug.
                return finish("SUBMIT_DISABLED_AFTER_FILL", "filled_form")

            try:
                # Exactly one normal, user-equivalent submit through the site's UI.
                submit.click(timeout=10000)
                PROBE["credential_submit_once"] = True
                try:
                    tab.locator('#auth_user').wait_for(state="visible", timeout=12000)
                except Exception:
                    pass
            except Exception:
                return finish("LOGIN_SUBMIT_FAILED", "submit")

            # The SmartCaptcha iframe may be present even after a successful
            # invisible check. Verify actual login outcome instead of declaring
            # CAPTCHA_REQUIRED solely because an iframe is on the page.
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

            # Verify in a fresh page sharing only this ephemeral browser context.
            result = profile_status(context.new_page())
            if result != "AUTHENTICATED_INDEXRESEARCH":
                # Only a genuine visible interactive challenge, not the widget
                # shell, may justify a CAPTCHA_REQUIRED result.
                PROBE["captcha_present"] = bool(
                    tab.locator('[class*="captcha" i], [id*="captcha" i], iframe[src*="captcha" i]').count()
                )
                PROBE["captcha_interaction_detected"] = any(
                    bool(first_visible(f, ('input[type="checkbox"]', '[role="checkbox"]')))
                    for f in tab.frames if "captcha" in f.url.lower()
                )
                if PROBE["captcha_interaction_detected"]:
                    result = "CAPTCHA_REQUIRED"
            context.close()
            browser.close()
            return finish(result, "profile")
    except Exception:
        # Never print exception messages: upstream URLs may contain tokens.
        return finish("UNEXPECTED_ERROR", "runtime")


if __name__ == "__main__":
    sys.exit(diagnose() if "--diagnose" in sys.argv else run())

