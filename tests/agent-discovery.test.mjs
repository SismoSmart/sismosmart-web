import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { getPages } from "../src/lib/pages.ts";
import { buildPageMetadata } from "../src/lib/metadata.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

async function loadRoute(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `${relativePath} must exist`);
  return import(pathToFileURL(absolutePath).href);
}

const prohibitedOutputPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(?:token|password|secret)\s*[:=]\s*["'][^"']{8,}/i,
  /\b(?:10|127|169\.254|172\.(?:1[6-9]|2\d|3[01])|192\.168)\.\d{1,3}\.\d{1,3}\b/,
  /\/srv\/|\/home\/[^\s]+\/|[A-Z]:\\/,
];

function assertPublicOutput(value) {
  for (const pattern of prohibitedOutputPatterns) {
    assert.doesNotMatch(value, pattern);
  }
}

test("AGENTS.md defines repository commands, public safety, and review expectations", () => {
  const source = readText("AGENTS.md");

  assert.match(source, /^# SismoSmart repository guidance/m);
  assert.match(source, /npm run lint/);
  assert.match(source, /npm run typecheck/);
  assert.match(source, /npm test/);
  assert.match(source, /npm run build/);
  assert.match(source, /public repository/i);
  assert.match(source, /Doppler/);
  assert.match(source, /GitHub Actions/);
  assert.match(source, /bot/i);
  assert.match(source, /agent/i);
  assert.match(source, /security/i);
  assert.match(source, /dependency/i);
  assertPublicOutput(source);
});

test("OpenAPI route documents only the existing public form endpoints", async () => {
  const { GET } = await loadRoute("src/app/openapi.json/route.ts");
  const response = GET();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "application/json; charset=utf-8");
  assert.match(response.headers.get("cache-control") ?? "", /max-age=3600/);

  const document = await response.json();
  assert.equal(document.openapi, "3.1.0");
  assert.equal(document.info.title, "SismoSmart public form API");
  assert.deepEqual(Object.keys(document.paths).sort(), ["/api/contact", "/api/waitlist"]);
  assert.equal(document.paths["/api/status"], undefined);

  for (const pathItem of Object.values(document.paths)) {
    assert.ok(pathItem.get);
    assert.ok(pathItem.post);
    assert.deepEqual(Object.keys(pathItem.get.responses).sort(), ["200", "503"]);
    assert.deepEqual(
      Object.keys(pathItem.post.responses).sort(),
      ["200", "400", "413", "429", "502", "503"],
    );
  }

  const schemas = document.components.schemas;
  assert.equal(schemas.ContactRequest.additionalProperties, undefined);
  assert.equal(schemas.WaitlistRequest.additionalProperties, undefined);
  assert.deepEqual(schemas.ContactRequest.required.sort(), [
    "consent",
    "email",
    "message",
    "name",
    "subject",
  ]);
  assert.deepEqual(schemas.WaitlistRequest.required.sort(), ["consent", "email"]);
  assert.deepEqual(schemas.Locale.enum, ["en", "tr", "es", "id", "pt", "it"]);
  assertPublicOutput(JSON.stringify(document));
});

test("Markdown index lists every priority page for every locale", async () => {
  const { GET } = await loadRoute("src/app/markdown/route.ts");
  const response = GET();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.match(response.headers.get("cache-control") ?? "", /max-age=3600/);
  assert.match(body, /^# SismoSmart Markdown alternatives/m);

  for (const locale of ["en", "tr", "es", "id", "pt", "it"]) {
    for (const segment of ["product", "how-it-works", "technology", "faq", "privacy", "security"]) {
      assert.match(body, new RegExp(`https://sismosmart\\.com/markdown/${locale}/${segment}`));
    }
  }
  assertPublicOutput(body);
});

test("localized Markdown route renders current page copy and rejects unsupported paths", async () => {
  const route = await loadRoute("src/app/markdown/[locale]/[page]/route.ts");
  const response = await route.GET(
    new Request("https://sismosmart.com/markdown/en/product"),
    { params: Promise.resolve({ locale: "en", page: "product" }) },
  );
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.match(response.headers.get("cache-control") ?? "", /max-age=3600/);
  assert.match(body, new RegExp(`^# ${getPages("en").product.title}`, "m"));
  assert.match(body, new RegExp(getPages("en").product.deviceDescription.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(body, /https:\/\/sismosmart\.com\/en\/product/);
  assertPublicOutput(body);

  const invalidLocale = await route.GET(
    new Request("https://sismosmart.com/markdown/xx/product"),
    { params: Promise.resolve({ locale: "xx", page: "product" }) },
  );
  assert.equal(invalidLocale.status, 404);

  const unsupportedPage = await route.GET(
    new Request("https://sismosmart.com/markdown/en/about"),
    { params: Promise.resolve({ locale: "en", page: "about" }) },
  );
  assert.equal(unsupportedPage.status, 404);
});

test("priority HTML pages advertise Markdown alternates", () => {
  const product = buildPageMetadata("en", "/product", "Product", "Description");
  assert.equal(
    product.alternates?.types?.["text/markdown"],
    "https://sismosmart.com/markdown/en/product",
  );

  const about = buildPageMetadata("en", "/about", "About", "Description");
  assert.equal(about.alternates?.types, undefined);
});

test("existing machine-readable indexes link to Markdown and OpenAPI discovery", async () => {
  for (const relativePath of [
    "src/app/llms.txt/route.ts",
    "src/app/llms-full.txt/route.ts",
    "src/app/sitemap.md/route.ts",
  ]) {
    const { GET } = await loadRoute(relativePath);
    const body = await GET().text();
    assert.match(body, /https:\/\/sismosmart\.com\/markdown/);
    assert.match(body, /https:\/\/sismosmart\.com\/openapi\.json/);
    assertPublicOutput(body);
  }
});
