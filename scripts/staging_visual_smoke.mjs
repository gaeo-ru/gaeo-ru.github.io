import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = process.env.GAEO_STAGING_ORIGIN || 'https://gaeo-ru.github.io';
const OUT = process.env.GAEO_VISUAL_OUT || 'visual-smoke';

const pages = {
  homepage: '/',
  articles_index: '/articles/',
  article: '/articles/strategiya-geo-prodvizheniya-nedvizhimosti/',
  cases_index: '/cases/',
  case: '/cases/prep-center-6-klientov-iz-neyrosetey/',
  biography: '/professional-biography/',
  commercial: '/geo-prodvizhenie-nedvizhimosti/',
};

const modes = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 1 },
};

await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const failures = [];
const results = [];

for (const [modeName, viewport] of Object.entries(modes)) {
  for (const [pageName, route] of Object.entries(pages)) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: viewport.deviceScaleFactor,
      isMobile: modeName === 'mobile',
      hasTouch: modeName === 'mobile',
    });
    const page = await context.newPage();
    const consoleErrors = [];
    const pageErrors = [];
    const badResponses = [];

    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => pageErrors.push(String(err)));
    page.on('response', response => {
      const url = response.url();
      const status = response.status();
      if (status >= 400 && (url.startsWith(ORIGIN) || url.includes('gaeo-ru.github.io'))) {
        badResponses.push(`${status} ${url}`);
      }
    });

    const url = new URL(route, ORIGIN).href;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    if (!response || response.status() !== 200) {
      failures.push(`${modeName}/${pageName}: page HTTP ${response ? response.status() : 'NO_RESPONSE'}`);
    }

    await page.waitForTimeout(400);

    const audit = await page.evaluate(() => {
      const root = document.documentElement;
      const main = document.querySelector('main');
      const header = document.querySelector('header');
      const footer = document.querySelector('footer');
      const badImages = Array.from(document.images)
        .filter(img => img.complete && img.naturalWidth === 0)
        .map(img => img.currentSrc || img.src || img.alt || '(unknown)');
      const mainText = main ? (main.innerText || '').replace(/\s+/g, ' ').trim() : '';
      const visibleMain = !!main && main.getBoundingClientRect().width > 0 && main.getBoundingClientRect().height > 0;
      return {
        viewportWidth: window.innerWidth,
        scrollWidth: root.scrollWidth,
        horizontalOverflow: Math.max(0, root.scrollWidth - window.innerWidth),
        bodyHeight: document.body.scrollHeight,
        hasHeader: !!header,
        hasFooter: !!footer,
        hasMain: !!main,
        visibleMain,
        mainTextLength: mainText.length,
        badImages,
        title: document.title,
        robots: document.querySelector('meta[name="robots"]')?.content || '',
      };
    });

    if (audit.horizontalOverflow > 2) {
      failures.push(`${modeName}/${pageName}: horizontal overflow ${audit.horizontalOverflow}px`);
    }
    if (!audit.hasHeader || !audit.hasFooter || !audit.hasMain || !audit.visibleMain) {
      failures.push(`${modeName}/${pageName}: missing/invisible header, main or footer`);
    }
    if (audit.mainTextLength < 120) {
      failures.push(`${modeName}/${pageName}: main text too short (${audit.mainTextLength})`);
    }
    if (audit.badImages.length) {
      failures.push(`${modeName}/${pageName}: broken images: ${audit.badImages.join(', ')}`);
    }
    if (!audit.robots.toLowerCase().includes('noindex')) {
      failures.push(`${modeName}/${pageName}: staging robots meta is not noindex: ${audit.robots}`);
    }
    if (pageErrors.length) {
      failures.push(`${modeName}/${pageName}: page errors: ${pageErrors.join(' | ')}`);
    }
    if (badResponses.length) {
      failures.push(`${modeName}/${pageName}: internal HTTP errors: ${badResponses.join(' | ')}`);
    }

    const screenshot = path.join(OUT, `${pageName}-${modeName}.png`);
    await page.screenshot({ path: screenshot, fullPage: true });

    results.push({
      mode: modeName,
      page: pageName,
      url,
      ...audit,
      consoleErrors,
      pageErrors,
      badResponses,
      screenshot,
    });

    await context.close();
  }
}

await browser.close();

await fs.writeFile(path.join(OUT, 'visual-smoke.json'), JSON.stringify({ results, failures }, null, 2));

console.log(`VISUAL_SMOKE_PAGES=${results.length}`);
console.log(`VISUAL_SMOKE_FAILURES=${failures.length}`);
for (const failure of failures) console.log('ERROR:', failure);

if (failures.length) process.exit(1);
console.log('VISUAL_SMOKE=PASS');
