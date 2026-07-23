import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import puppeteer from "puppeteer-core";

import {
  browserQualityRoutes,
  evaluateLayout,
  filterBlockingAxeViolations,
  findDuplicateIds,
  isLoopbackUrl,
  sanitizeBrowserResult,
} from "./browser-quality-lib.mjs";

import {
  browserQualityRevision,
  resolveBrowserExecutable,
} from "./browser-quality-executable.mjs";
export {
  browserQualityRevision,
  getBrowserExecutableCandidates,
  resolveBrowserExecutable,
} from "./browser-quality-executable.mjs";
import {
  safeFailureMessage,
  startMockReceiver,
  startNextServer,
} from "./browser-quality-server.mjs";
export { isAddressInUseFailure } from "./browser-quality-server.mjs";
import { publishBrowserQualityReport } from "./browser-quality-report.mjs";
export { formatBrowserSafeSummary } from "./browser-quality-report.mjs";

const require = createRequire(import.meta.url);
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const ARTIFACT_ROOT = path.join(PROJECT_ROOT, ".artifacts", "browser-quality");
const CONSENT_KEY = "sismosmart_cookie_consent";

async function readAxeSource() {
  const axePath = require.resolve("axe-core/axe.min.js");
  return fs.readFile(axePath, "utf8");
}

async function preparePage(browser, blockedExternalHosts, viewport) {
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.setCacheEnabled(false);
  await page.setViewport(viewport);
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = request.url();
    if (isLoopbackUrl(url)) {
      request.continue().catch(() => {});
      return;
    }
    try {
      blockedExternalHosts.add(new URL(url).hostname);
    } catch {
      blockedExternalHosts.add("unparseable-external-request");
    }
    request.abort("blockedbyclient").catch(() => {});
  });
  return page;
}

async function collectPageQuality(page, axeSource) {
  const pageState = await page.evaluate(() => {
    const main = document.querySelector("main#content");
    const h1 = document.querySelector("h1");
    const mainRect = main?.getBoundingClientRect();
    const h1Rect = h1?.getBoundingClientRect();
    return {
      clientWidth: document.documentElement.clientWidth,
      h1Rect: h1Rect
        ? { height: h1Rect.height, width: h1Rect.width }
        : { height: 0, width: 0 },
      ids: [...document.querySelectorAll("[id]")].map((element) => element.id),
      lang: document.documentElement.lang,
      mainRect: mainRect
        ? { height: mainRect.height, width: mainRect.width }
        : { height: 0, width: 0 },
      scrollWidth: document.documentElement.scrollWidth,
    };
  });
  await page.addScriptTag({ content: axeSource });
  const axe = await page.evaluate(async () =>
    globalThis.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
      },
    }),
  );
  const blockingAxe = filterBlockingAxeViolations(axe.violations);
  const duplicateIds = findDuplicateIds(pageState.ids);
  const layout = evaluateLayout(pageState);
  return {
    blockingAxe,
    duplicateIds,
    lang: pageState.lang,
    layout,
    totalAxeViolations: axe.violations.length,
  };
}

async function screenshotFailure(page, key) {
  await fs.mkdir(ARTIFACT_ROOT, { recursive: true });
  const safeKey = key.replace(/[^a-z0-9_-]/gi, "-");
  await page.screenshot({
    fullPage: true,
    path: path.join(ARTIFACT_ROOT, `${safeKey}.png`),
  });
}

async function runPageScenario({
  axeSource,
  baseUrl,
  blockedExternalHosts,
  browser,
  key,
  locale,
  routePath,
  viewport,
}) {
  const page = await preparePage(browser, blockedExternalHosts, viewport);
  try {
    const response = await page.goto(`${baseUrl}${routePath}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    const quality = await collectPageQuality(page, axeSource);
    const status = response?.status() ?? null;
    const blocking =
      status !== 200 ||
      quality.lang !== locale ||
      quality.blockingAxe.length > 0 ||
      quality.duplicateIds.length > 0 ||
      quality.layout.blocking;
    if (blocking) {
      throw new Error(
        `status=${status} lang=${quality.lang} axe=${quality.blockingAxe.length}:${quality.blockingAxe.map((item) => item.id).join(",") || "none"} axeTargets=${quality.blockingAxe.flatMap((item) => item.targets || []).join("|") || "none"} duplicateIds=${quality.duplicateIds.length} overflow=${quality.layout.horizontalOverflowPx}`,
      );
    }
    return {
      blockingAxeCount: 0,
      duplicateIds: [],
      key,
      layout: quality.layout,
      locale,
      path: routePath,
      status,
      totalAxeViolations: quality.totalAxeViolations,
      viewport: `${viewport.width}x${viewport.height}`,
    };
  } catch (error) {
    await screenshotFailure(page, key).catch(() => {});
    throw error;
  } finally {
    await page.close();
  }
}

async function clickVisibleLink(page, href) {
  const clicked = await page.evaluate((targetHref) => {
    const link = [...document.querySelectorAll(`a[href="${targetHref}"]`)].find(
      (candidate) => {
        const rect = candidate.getBoundingClientRect();
        const style = getComputedStyle(candidate);
        return (
          rect.width > 0 && rect.height > 0 && style.visibility !== "hidden"
        );
      },
    );
    if (!link) return false;
    link.click();
    return true;
  }, href);
  if (!clicked)
    throw new Error(`Visible navigation link not found for ${href}.`);
}

async function runNavigationScenario({
  baseUrl,
  blockedExternalHosts,
  browser,
}) {
  const page = await preparePage(browser, blockedExternalHosts, {
    height: 900,
    width: 1440,
  });
  try {
    await page.goto(`${baseUrl}/en`, { waitUntil: "domcontentloaded" });
    await Promise.all([
      page.waitForFunction(() => window.location.pathname === "/en/product", {
        timeout: 15_000,
      }),
      clickVisibleLink(page, "/en/product"),
    ]);
    const currentPath = new URL(page.url()).pathname;
    if (currentPath !== "/en/product") {
      throw new Error(`Navigation ended at ${currentPath}.`);
    }
    const trHref = await page.$eval('[data-locale-switch="tr"]', (link) =>
      link.getAttribute("href"),
    );
    if (trHref !== "/tr/product") {
      throw new Error(
        `Locale switch did not preserve product path: ${trHref}.`,
      );
    }
    return { key: "navigation", locale: "en", path: currentPath, status: 200 };
  } catch (error) {
    await screenshotFailure(page, "navigation").catch(() => {});
    throw error;
  } finally {
    await page.close();
  }
}

async function runConsentScenario({ baseUrl, blockedExternalHosts, browser }) {
  const page = await preparePage(browser, blockedExternalHosts, {
    height: 900,
    width: 1440,
  });
  try {
    await page.goto(`${baseUrl}/en`, { waitUntil: "domcontentloaded" });
    await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector("[data-cookie-consent]", { visible: true });
    await page.click('[data-cookie-choice="necessary"]');
    const choice = await page.evaluate(
      (key) => localStorage.getItem(key),
      CONSENT_KEY,
    );
    const hiddenAfterChoice = await page.$eval(
      "[data-cookie-consent]",
      (element) => element.hidden,
    );
    if (choice !== "necessary" || !hiddenAfterChoice) {
      throw new Error(
        "Necessary-only consent choice was not persisted and hidden.",
      );
    }
    await page.click("[data-cookie-reset]");
    await page.waitForSelector("[data-cookie-consent]", { visible: true });
    const resetChoice = await page.evaluate(
      (key) => localStorage.getItem(key),
      CONSENT_KEY,
    );
    if (resetChoice !== null)
      throw new Error("Consent reset did not clear storage.");
    return { key: "consent", locale: "en", path: "/en", status: 200 };
  } catch (error) {
    await screenshotFailure(page, "consent").catch(() => {});
    throw error;
  } finally {
    await page.close();
  }
}

async function chooseNecessaryConsentIfVisible(page) {
  const visible = await page.$eval(
    "[data-cookie-consent]",
    (element) => !element.hidden && element.getBoundingClientRect().width > 0,
  ).catch(() => false);
  if (!visible) return;
  await page.click('[data-cookie-choice="necessary"]');
  await page.waitForFunction(
    () => document.querySelector("[data-cookie-consent]")?.hidden === true,
    { timeout: 5_000 },
  );
}

async function fillAndSubmit(page, formSelector, fields, selects = {}) {
  for (const [name, value] of Object.entries(fields)) {
    const selector = `${formSelector} [name="${name}"]`;
    await page.waitForSelector(selector, { visible: true });
    await page.type(selector, String(value));
  }
  for (const [name, value] of Object.entries(selects)) {
    await page.select(`${formSelector} [name="${name}"]`, value);
  }
  await page.click(`${formSelector} [name="consent"]`);
  const validity = await page.$eval(formSelector, (form) => ({
    invalid: [...form.elements]
      .filter((element) => typeof element.checkValidity === "function" && !element.checkValidity())
      .map((element) => element.name || element.type || "unnamed"),
    valid: form.checkValidity(),
  }));
  if (!validity.valid) {
    throw new Error(`Form native validity failed: ${validity.invalid.join(",")}.`);
  }
  const responsePromise = page.waitForResponse(
    (response) => {
      const url = new URL(response.url());
      return (
        url.hostname === "127.0.0.1" &&
        url.pathname.startsWith("/api/") &&
        response.request().method() === "POST"
      );
    },
    { timeout: 15_000 },
  );
  await page.click(`${formSelector} [type="submit"]`);
  let apiResponse;
  try {
    apiResponse = await responsePromise;
  } catch (error) {
    const diagnostic = await page.evaluate((selector) => {
      const form = document.querySelector(selector);
      const status = form?.querySelector("[data-form-status]");
      const submit = form?.querySelector("[type='submit']");
      return {
        handlerInstalled: Boolean(window.__sismosmartJsonForms),
        invalid: form
          ? [...form.elements]
              .filter((element) => typeof element.checkValidity === "function" && !element.checkValidity())
              .map((element) => element.name || element.type || "unnamed")
          : ["form-missing"],
        resources: performance
          .getEntriesByType("resource")
          .map((entry) => entry.name)
          .filter((value) => value.includes("/api/"))
          .map((value) => {
            try {
              return new URL(value, window.location.origin).pathname;
            } catch {
              return "/invalid-url";
            }
          }),
        statusState: status?.dataset.state || null,
        statusText: status?.textContent?.trim() || "",
        submitDisabled: Boolean(submit?.disabled),
      };
    }, formSelector);
    throw new Error(
      `${safeFailureMessage(error)} diagnostic=${JSON.stringify(diagnostic)}`,
    );
  }
  const apiPayload = await apiResponse.json().catch(() => ({}));
  await page.waitForFunction(
    (selector) => {
      const state = document.querySelector(`${selector} [data-form-status]`)
        ?.dataset.state;
      return state === "success" || state === "error";
    },
    { timeout: 15_000 },
    formSelector,
  );
  const formStatus = await page.$eval(
    `${formSelector} [data-form-status]`,
    (element) => ({
      state: element.dataset.state || null,
      text: element.textContent?.trim() || "",
    }),
  );
  if (apiResponse.status() !== 200 || formStatus.state !== "success") {
    throw new Error(
      `Form API status=${apiResponse.status()} code=${apiPayload?.code || "unknown"} state=${formStatus.state} text=${formStatus.text}`,
    );
  }
}

async function runFormScenarios({
  baseUrl,
  blockedExternalHosts,
  browser,
  records,
}) {
  const results = [];

  const contact = await preparePage(browser, blockedExternalHosts, {
    height: 900,
    width: 1440,
  });
  try {
    await contact.goto(`${baseUrl}/en/contact?utm_source=ci`, {
      waitUntil: "domcontentloaded",
    });
    await chooseNecessaryConsentIfVisible(contact);
    await fillAndSubmit(contact, 'form[data-analytics-form="contact"]', {
      email: "browser-contact@example.com",
      message: "Synthetic browser message for local mock validation only.",
      name: "Browser Contact Test",
      subject: "Local browser integration",
    });
    results.push({
      key: "contact-form",
      locale: "en",
      path: "/en/contact",
      status: 200,
    });
  } catch (error) {
    await screenshotFailure(contact, "contact-form").catch(() => {});
    throw error;
  } finally {
    await contact.close();
  }

  const pilot = await preparePage(browser, blockedExternalHosts, {
    height: 900,
    width: 1440,
  });
  try {
    await pilot.goto(`${baseUrl}/tr/pilot-program?utm_source=ci`, {
      waitUntil: "domcontentloaded",
    });
    await chooseNecessaryConsentIfVisible(pilot);
    await fillAndSubmit(
      pilot,
      'form[data-analytics-form="pilot_program"]',
      {
        country: "Türkiye",
        email: "browser-pilot@example.com",
        message: "Yalnızca yerel mock doğrulaması için sentetik bina notu.",
        name: "Browser Pilot Test",
        number_of_buildings: "3",
        organization: "Example Test Organization",
        role: "Test Engineer",
      },
      {
        building_type: "campus",
        interest_type: "campuses",
      },
    );
    results.push({
      key: "pilot-form",
      locale: "tr",
      path: "/tr/pilot-program",
      status: 200,
    });
  } catch (error) {
    await screenshotFailure(pilot, "pilot-form").catch(() => {});
    throw error;
  } finally {
    await pilot.close();
  }

  if (records.length !== 2) {
    throw new Error(
      `Expected 2 forwarded form records, received ${records.length}.`,
    );
  }
  const contactRecord = records.find((record) => record.route === "contact");
  const pilotRecord = records.find((record) => record.route === "waitlist");
  for (const [label, record] of [
    ["contact", contactRecord],
    ["waitlist", pilotRecord],
  ]) {
    if (
      !record?.authorizationMatches ||
      !record?.contentTypeMatches ||
      !record?.formMatches ||
      record.utmSource !== "ci"
    ) {
      throw new Error(`${label} mock forwarding evidence was incomplete.`);
    }
  }
  if (
    contactRecord.locale !== "en" ||
    contactRecord.source !== "contact-page" ||
    contactRecord.pagePath !== "/en/contact"
  ) {
    throw new Error(
      "Contact forwarding metadata did not match the rendered form.",
    );
  }
  if (
    pilotRecord.locale !== "tr" ||
    pilotRecord.source !== "pilot-program" ||
    pilotRecord.pagePath !== "/tr/pilot-program"
  ) {
    throw new Error(
      "Pilot forwarding metadata did not match the rendered form.",
    );
  }
  return results;
}

export async function runBrowserQuality() {
  await fs.access(path.join(PROJECT_ROOT, ".next", "BUILD_ID"));
  const browserExecutable = await resolveBrowserExecutable();
  const axeSource = await readAxeSource();
  const mock = await startMockReceiver();
  let app = null;
  let browser = null;
  const blockedExternalHosts = new Set();
  const scenarios = [];
  const failures = [];

  try {
    app = await startNextServer(mock.baseUrl);
    browser = await puppeteer.launch({
      args: ["--disable-dev-shm-usage", "--no-sandbox"],
      executablePath: browserExecutable,
      headless: true,
    });

    const desktop = { height: 900, width: 1440 };
    const mobile = { height: 844, isMobile: true, width: 390 };
    for (const route of browserQualityRoutes) {
      try {
        scenarios.push(
          await runPageScenario({
            axeSource,
            baseUrl: app.baseUrl,
            blockedExternalHosts,
            browser,
            key: `${route.key}-desktop`,
            locale: route.locale,
            routePath: route.path,
            viewport: desktop,
          }),
        );
      } catch (error) {
        failures.push({
          key: `${route.key}-desktop`,
          message: safeFailureMessage(error),
        });
      }
    }
    for (const route of browserQualityRoutes.filter((item) =>
      ["en-home", "tr-product"].includes(item.key),
    )) {
      try {
        scenarios.push(
          await runPageScenario({
            axeSource,
            baseUrl: app.baseUrl,
            blockedExternalHosts,
            browser,
            key: `${route.key}-mobile`,
            locale: route.locale,
            routePath: route.path,
            viewport: mobile,
          }),
        );
      } catch (error) {
        failures.push({
          key: `${route.key}-mobile`,
          message: safeFailureMessage(error),
        });
      }
    }

    for (const [key, task] of [
      [
        "navigation",
        () =>
          runNavigationScenario({
            baseUrl: app.baseUrl,
            blockedExternalHosts,
            browser,
          }),
      ],
      [
        "consent",
        () =>
          runConsentScenario({
            baseUrl: app.baseUrl,
            blockedExternalHosts,
            browser,
          }),
      ],
      [
        "forms",
        () =>
          runFormScenarios({
            baseUrl: app.baseUrl,
            blockedExternalHosts,
            browser,
            records: mock.records,
          }),
      ],
    ]) {
      try {
        const result = await task();
        scenarios.push(...(Array.isArray(result) ? result : [result]));
      } catch (error) {
        failures.push({ key, message: safeFailureMessage(error) });
      }
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    if (app) await app.stop().catch(() => {});
    await mock.close().catch(() => {});
  }

  const report = sanitizeBrowserResult({
    blockedExternalHosts: [...blockedExternalHosts].sort(),
    browserRevision: browserQualityRevision,
    failures,
    forwarding: mock.records,
    generatedAt: new Date().toISOString(),
    ok: failures.length === 0,
    scenarios,
    schemaVersion: 1,
  });
  await publishBrowserQualityReport(report);
  return { exitCode: report.ok ? 0 : 1, report };
}

async function main() {
  const result = await runBrowserQuality();
  process.exitCode = result.exitCode;
}

const isCli =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isCli) {
  main().catch((error) => {
    console.error(`Browser quality audit failed: ${safeFailureMessage(error)}`);
    process.exitCode = 1;
  });
}
