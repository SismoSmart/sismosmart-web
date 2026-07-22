import { Browser, computeExecutablePath } from "@puppeteer/browsers";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import fs from "node:fs/promises";
import net from "node:net";
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
  summarizeForwardRequest,
} from "./browser-quality-lib.mjs";

const require = createRequire(import.meta.url);
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const ARTIFACT_ROOT = path.join(PROJECT_ROOT, ".artifacts", "browser-quality");
const BROWSER_CACHE_DIR = path.join(PROJECT_ROOT, ".cache", "puppeteer");
const BROWSER_REVISION = "150.0.7871.24";
const TEST_TOKEN = "browser-quality-local-token";
const CONSENT_KEY = "sismosmart_cookie_consent";
const MAX_MOCK_BODY_BYTES = 128 * 1024;
const SERVER_READY_TIMEOUT_MS = 45_000;
const PROCESS_LOG_LIMIT = 64 * 1024;
const MAX_APP_START_ATTEMPTS = 4;

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function getBrowserExecutableCandidates({
  cacheDir = BROWSER_CACHE_DIR,
  env = process.env,
  platform = process.platform,
} = {}) {
  let cachedExecutable = "";
  try {
    cachedExecutable = computeExecutablePath({
      browser: Browser.CHROMEHEADLESSSHELL,
      buildId: BROWSER_REVISION,
      cacheDir,
    });
  } catch {
    cachedExecutable = "";
  }

  const systemCandidates =
    platform === "darwin"
      ? [
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
          "/Applications/Chromium.app/Contents/MacOS/Chromium",
        ]
      : platform === "win32"
        ? [
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
          ]
        : [
            "/usr/bin/google-chrome",
            "/usr/bin/google-chrome-stable",
            "/usr/bin/chromium",
            "/usr/bin/chromium-browser",
          ];

  return unique([
    env.PUPPETEER_EXECUTABLE_PATH,
    env.CHROME_PATH,
    cachedExecutable,
    ...systemCandidates,
  ]);
}

export async function resolveBrowserExecutable(options = {}) {
  for (const candidate of getBrowserExecutableCandidates(options)) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Continue to the next explicit, cached, or system candidate.
    }
  }

  throw new Error(
    `Chrome Headless Shell ${BROWSER_REVISION} is not installed. Run npm run browser:install.`,
  );
}

function safeFailureMessage(error) {
  const message = String(error?.message || error || "browser scenario failed");
  return message
    .replaceAll(PROJECT_ROOT, "<repo>")
    .replace(/https?:\/\/(?:127\.0\.0\.1|localhost|\[::1\]):\d+/g, "<loopback>")
    .slice(0, 500);
}

export function isAddressInUseFailure(error) {
  return /EADDRINUSE|address already in use/i.test(
    String(error?.message || error || ""),
  );
}

export function formatBrowserSafeSummary(report) {
  const safe = sanitizeBrowserResult({
    blockedExternalHosts: report?.blockedExternalHosts || [],
    failures: (report?.failures || []).map((failure) => ({
      key: failure.key,
      message: failure.message,
    })),
    forwarding: report?.forwarding || [],
    ok: Boolean(report?.ok),
    scenarios: (report?.scenarios || []).map((scenario) => ({
      blockingAxeCount: scenario.blockingAxeCount || 0,
      duplicateIds: scenario.duplicateIds || [],
      key: scenario.key,
      layout: scenario.layout || null,
      locale: scenario.locale || null,
      path: scenario.path || null,
      status: scenario.status ?? null,
      viewport: scenario.viewport || null,
    })),
  });
  return `BROWSER_QUALITY_SAFE ${JSON.stringify(safe)}`;
}

function appendBounded(current, chunk) {
  if (current.length >= PROCESS_LOG_LIMIT) return current;
  return `${current}${String(chunk)}`.slice(-PROCESS_LOG_LIMIT);
}

async function findOpenPort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close((error) => {
        if (error) reject(error);
        else if (!port)
          reject(new Error("Could not allocate a loopback port."));
        else resolve(port);
      });
    });
  });
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_MOCK_BODY_BYTES)
      throw new Error("Mock payload exceeded limit.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

async function startMockReceiver() {
  const records = [];
  const server = createServer(async (request, response) => {
    const route =
      request.url === "/contact"
        ? "contact"
        : request.url === "/waitlist"
          ? "waitlist"
          : null;
    if (request.method !== "POST" || !route) {
      response.writeHead(404, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: false }));
      return;
    }

    try {
      const envelope = await readJsonBody(request);
      const summary = summarizeForwardRequest({
        authorization: request.headers.authorization,
        contentType: request.headers["content-type"],
        expectedToken: TEST_TOKEN,
        payload: envelope?.payload,
        route,
      });
      const valid =
        envelope?.form === route &&
        summary.authorizationMatches &&
        summary.contentTypeMatches;
      records.push({ ...summary, formMatches: envelope?.form === route });
      response.writeHead(valid ? 200 : 400, {
        "content-type": "application/json",
      });
      response.end(JSON.stringify({ ok: valid }));
    } catch {
      response.writeHead(400, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: false }));
    }
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address !== "object") {
    server.close();
    throw new Error("Mock receiver did not expose a loopback address.");
  }

  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
    records,
  };
}

async function waitForApp(baseUrl, child) {
  const deadline = Date.now() + SERVER_READY_TIMEOUT_MS;
  let lastError = null;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(
        `Next server exited before readiness with code ${child.exitCode}.`,
      );
    }
    try {
      const response = await fetch(`${baseUrl}/en`, {
        redirect: "manual",
        signal: AbortSignal.timeout(2_000),
      });
      if (response.status === 200) return;
      lastError = new Error(`Next readiness returned ${response.status}.`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw lastError || new Error("Next server readiness timed out.");
}

async function stopChild(child) {
  if (!child || child.exitCode !== null) return;
  child.kill("SIGTERM");
  const stopped = await Promise.race([
    new Promise((resolve) => child.once("exit", () => resolve(true))),
    new Promise((resolve) => setTimeout(() => resolve(false), 5_000)),
  ]);
  if (!stopped && child.exitCode === null) {
    child.kill("SIGKILL");
    await new Promise((resolve) => child.once("exit", resolve));
  }
}

async function startNextServerAttempt(mockBaseUrl, port) {
  const nextBin = path.join(
    PROJECT_ROOT,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next",
  );
  let stdout = "";
  let stderr = "";
  const child = spawn(
    process.execPath,
    [nextBin, "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: PROJECT_ROOT,
      env: {
        ...process.env,
        CONTACT_FORM_ENDPOINT: `${mockBaseUrl}/contact`,
        FORM_FORWARD_AUTH_TOKEN: TEST_TOKEN,
        NODE_ENV: "production",
        WAITLIST_FORM_ENDPOINT: `${mockBaseUrl}/waitlist`,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  child.stdout.on("data", (chunk) => {
    stdout = appendBounded(stdout, chunk);
  });
  child.stderr.on("data", (chunk) => {
    stderr = appendBounded(stderr, chunk);
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  try {
    await waitForApp(baseUrl, child);
  } catch (error) {
    await stopChild(child);
    const details = `${safeFailureMessage(error)} Next stdout=${stdout.slice(-500)} stderr=${stderr.slice(-500)}`;
    const wrapped = new Error(details);
    wrapped.cause = error;
    throw wrapped;
  }
  return { baseUrl, child, stop: () => stopChild(child) };
}

async function startNextServer(mockBaseUrl) {
  let lastError = null;
  for (let attempt = 1; attempt <= MAX_APP_START_ATTEMPTS; attempt += 1) {
    const port = await findOpenPort();
    try {
      return await startNextServerAttempt(mockBaseUrl, port);
    } catch (error) {
      lastError = error;
      if (!isAddressInUseFailure(error) || attempt === MAX_APP_START_ATTEMPTS) {
        throw error;
      }
    }
  }
  throw lastError || new Error("Next server could not start.");
}

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

async function writeReport(report) {
  await fs.mkdir(ARTIFACT_ROOT, { recursive: true });
  const outputPath = path.join(ARTIFACT_ROOT, "result.json");
  await fs.writeFile(
    outputPath,
    `${JSON.stringify(sanitizeBrowserResult(report), null, 2)}\n`,
    { mode: 0o600 },
  );
  await fs.chmod(outputPath, 0o600);
  return outputPath;
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
    browserRevision: BROWSER_REVISION,
    failures,
    forwarding: mock.records,
    generatedAt: new Date().toISOString(),
    ok: failures.length === 0,
    scenarios,
    schemaVersion: 1,
  });
  const outputPath = await writeReport(report);
  console.log(formatBrowserSafeSummary(report));
  console.log(
    `Browser quality report: ${path.relative(PROJECT_ROOT, outputPath)}`,
  );
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

export const browserQualityRevision = BROWSER_REVISION;
