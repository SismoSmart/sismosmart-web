import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import sitemap from "../src/app/sitemap.ts";
import robots from "../src/app/robots.ts";
import { webManifest } from "../src/app/manifest-data.ts";
import { buildPageMetadata } from "../src/lib/metadata.ts";
import { routeSegments, staticPageKeys } from "../src/lib/pages.ts";
import {
  locales,
  productStageNotices,
  safetyNotices,
  siteConfig,
} from "../src/lib/site.ts";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

async function read(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

test("root permanently redirects to the intentional default locale", async () => {
  const source = await read("src/app/page.tsx");
  const nextConfig = await read("next.config.ts");
  assert.match(source, /permanentRedirect/);
  assert.match(source, /defaultLocale/);
  assert.match(nextConfig, /destination:\s*basePath \? basePath\.concat\("\/en"\) : "\/en"[^}]*?permanent:\s*true/);
  assert.doesNotMatch(source, /Continue to SismoSmart/);
});

test("canonical metadata and hreflang stay aligned for every locale and route", () => {
  const routePaths = ["/", ...staticPageKeys.map((key) => routeSegments[key])];
  for (const locale of locales) {
    for (const routePath of routePaths) {
      const metadata = buildPageMetadata(locale, routePath, "Title", "Description");
      const suffix = routePath === "/" ? "" : routePath;
      const canonical = `${siteConfig.url}/${locale}${suffix}`;
      assert.equal(metadata.alternates?.canonical, canonical);
      assert.equal(metadata.openGraph?.url, canonical);
      assert.equal(metadata.alternates?.languages?.["x-default"], `${siteConfig.url}/en${suffix}`);
      for (const alternateLocale of locales) {
        assert.equal(
          metadata.alternates?.languages?.[alternateLocale],
          `${siteConfig.url}/${alternateLocale}${suffix}`,
        );
      }
    }
  }
});

test("sitemap contains each canonical indexable locale route exactly once", () => {
  const entries = sitemap();
  const expectedCount = locales.length * (1 + staticPageKeys.length);
  assert.equal(entries.length, expectedCount);
  const urls = entries.map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => url.startsWith(`${siteConfig.url}/`)));
  assert.ok(urls.every((url) => !url.includes("/api/")));
  assert.ok(!urls.includes(siteConfig.url));
  for (const entry of entries) {
    assert.equal(entry.alternates?.languages?.["x-default"]?.startsWith(`${siteConfig.url}/en`), true);
    assert.deepEqual(
      Object.keys(entry.alternates?.languages || {}).sort(),
      [...locales, "x-default"].sort(),
    );
  }
});

test("robots and manifest point at canonical public resources", () => {
  const policy = robots();
  assert.equal(policy.host, siteConfig.url);
  assert.equal(policy.sitemap, `${siteConfig.url}/sitemap.xml`);
  assert.ok(policy.rules.disallow.includes("/api/"));
  assert.equal(webManifest.start_url, "/en");
  assert.equal(webManifest.scope, "/");
});

test("private repository metadata records homepage and no-license decision", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.homepage, siteConfig.url);
  assert.equal(packageJson.license, "UNLICENSED");
  assert.equal(packageJson.repository?.url, "https://github.com/SismoSmart/sismosmart-web.git");
  const license = await read("LICENSE");
  assert.match(license, /All rights reserved/i);
  assert.match(license, /no license is granted/i);
  assert.doesNotMatch(license, /confidential/i);
});

test("all locales expose equivalent safety and pre-launch notices", () => {
  assert.deepEqual(Object.keys(safetyNotices).sort(), [...locales].sort());
  assert.deepEqual(Object.keys(productStageNotices).sort(), [...locales].sort());
  for (const locale of locales) {
    assert.ok(safetyNotices[locale].length >= 70);
    assert.ok(productStageNotices[locale].length >= 70);
  }
});

test("public technical copy avoids unsupported absolute detection and residency claims", async () => {
  const pages = await read("src/lib/pages.ts");
  assert.doesNotMatch(pages, /won't cross the threshold|Kapı çarpması ya da ayak sesi eşiği geçmez/);
  assert.doesNotMatch(pages, /AWS(?:'s|\'nin| de)? (?:Turkey|Türkiye|Turquía|Turki|Turchia|Turquia)/i);
  assert.match(pages, /false positives and missed events remain possible/);
  assert.match(pages, /Pilot data residency is not final/);
});

test("technical claims have an evidence and translation governance register", async () => {
  const claims = await read("docs/governance/technical-claims-register.md");
  for (const phrase of [
    "Claim class",
    "Evidence status",
    "Approved wording",
    "Translation rule",
    "not an emergency service",
    "pilot validation",
    "certification",
    "data residency",
  ]) {
    assert.match(claims, new RegExp(phrase, "i"));
  }
});

test("browser runbook documents deterministic coverage and privacy boundaries", async () => {
  const runbook = await read("docs/operations/browser-quality.md");
  for (const phrase of [
    "Chrome Headless Shell `150.0.7871.24`",
    "loopback mock receiver",
    "serious",
    "critical",
    "duplicate DOM ID",
    "horizontal overflow",
    "synthetic",
    "three days",
    "BROWSER_QUALITY_SAFE",
  ]) {
    assert.match(runbook, new RegExp(phrase, "i"));
  }
});

test("form runtime documents proxy trust, retry, and rate-limit boundaries", async () => {
  const runtime = await read("docs/operations/form-runtime.md");
  for (const phrase of [
    "CF-Connecting-IP",
    "Passenger",
    "per-process",
    "best-effort",
    "not a hard global limit",
    "non-idempotent",
    "no automatic retry",
    "shared store",
  ]) {
    assert.match(runtime, new RegExp(phrase, "i"));
  }
});

test("maintenance ownership and configuration boundaries are documented", async () => {
  const maintenance = await read("docs/operations/maintenance-ownership.md");
  for (const phrase of [
    "Deployments",
    "DNS",
    "Cloudflare",
    "cPanel",
    "Analytics",
    "Incident response",
    "second administrator",
    "quarterly",
    "local-only",
    "CI-only",
    "runtime-only",
    "secret rotation",
  ]) {
    assert.match(maintenance, new RegExp(phrase, "i"));
  }
  const gitignore = await read(".gitignore");
  assert.match(gitignore, /^\/\.serena\/$/m);
  assert.match(gitignore, /^\/\.cache\/$/m);
});

test("private historical reports are excluded under a public retention policy", async () => {
  assert.equal(await exists("AGENT_RUN_LOG.md"), false);
  assert.equal(await exists("ANALYSIS_REPORT.md"), false);
  assert.equal(await exists("docs/archive/2026-07-initial-audit/AGENT_RUN_LOG.md"), false);
  assert.equal(await exists("docs/archive/2026-07-initial-audit/ANALYSIS_REPORT.md"), false);
  const policy = await read("docs/archive/README.md");
  assert.match(policy, /retention/i);
  assert.match(policy, /historical/i);
  assert.match(policy, /not imported into the public repository/i);
});
