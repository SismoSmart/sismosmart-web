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


const expectedAgentSegments = [
  "",
  "product",
  "technology",
  "how-it-works",
  "pilot-program",
  "investors",
  "faq",
  "about",
  "contact",
  "privacy",
  "terms",
  "security",
  "press",
  "glossary",
];

const expectedLocales = ["en", "tr", "es", "id", "pt", "it"];

test("agent page catalog covers home and every localized public page", async () => {
  const discovery = await import("../src/lib/agent-discovery.ts");
  assert.equal(
    typeof discovery.getAgentPageDescriptor,
    "function",
    "getAgentPageDescriptor must define the canonical HTML/Markdown contract",
  );
  assert.equal(
    typeof discovery.resolveAgentPage,
    "function",
    "resolveAgentPage must validate localized public routes",
  );

  for (const locale of expectedLocales) {
    for (const segment of expectedAgentSegments) {
      const resolved = discovery.resolveAgentPage(locale, segment || null);
      assert.ok(resolved, `${locale}/${segment || "home"} must resolve`);
      const descriptor = discovery.getAgentPageDescriptor(locale, resolved.pageKey);
      const canonicalPath = segment ? `/${locale}/${segment}` : `/${locale}`;
      const markdownPath = segment ? `${canonicalPath}.md` : `/${locale}.md`;
      assert.equal(descriptor.canonicalPath, canonicalPath);
      assert.equal(descriptor.canonicalUrl, `https://sismosmart.com${canonicalPath}`);
      assert.equal(descriptor.markdownPath, markdownPath);
      assert.equal(descriptor.markdownUrl, `https://sismosmart.com${markdownPath}`);
    }
  }

  assert.equal(discovery.resolveAgentPage("xx", "product"), null);
  assert.equal(discovery.resolveAgentPage("en", "missing"), null);
});

test("every public page renders frontmatter markdown with sitemap and safety context", async () => {
  const markdown = await import("../src/lib/markdown-content.ts");
  const discovery = await import("../src/lib/agent-discovery.ts");
  assert.equal(typeof markdown.renderAgentPageMarkdown, "function");

  for (const locale of expectedLocales) {
    for (const segment of expectedAgentSegments) {
      const resolved = discovery.resolveAgentPage(locale, segment || null);
      assert.ok(resolved);
      const descriptor = discovery.getAgentPageDescriptor(locale, resolved.pageKey);
      const body = markdown.renderAgentPageMarkdown(locale, resolved.pageKey);
      assert.match(body, /^---\n/);
      assert.match(body, /\ntitle: /);
      assert.match(body, /\ndescription: /);
      assert.match(body, new RegExp(`\\nlocale: ${locale}\\n`));
      assert.match(
        body,
        new RegExp(
          `\\ncanonical_url: ${descriptor.canonicalUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\n`,
        ),
      );
      assert.match(body, /\nlast_updated: "\d{4}-\d{2}-\d{2}"\n/);
      assert.match(body, /\n## Sitemap\n/);
      assert.match(body, /https:\/\/sismosmart\.com\/sitemap\.md/);
      assert.match(body, /https:\/\/sismosmart\.com\/[a-z]{2}\/glossary/);
      assertPublicOutput(body);
    }
  }
});

test("localized Markdown route serves every page with canonical response headers", async () => {
  const route = await loadRoute("src/app/markdown/[locale]/[page]/route.ts");

  for (const locale of expectedLocales) {
    for (const segment of expectedAgentSegments) {
      const page = segment || "home";
      const response = await route.GET(
        new Request(`https://sismosmart.com/markdown/${locale}/${page}`),
        { params: Promise.resolve({ locale, page }) },
      );
      assert.equal(response.status, 200, `${locale}/${page}`);
      assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
      assert.equal(response.headers.get("vary"), "Accept");
      const canonicalPath = segment ? `/${locale}/${segment}` : `/${locale}`;
      assert.equal(
        response.headers.get("link"),
        `<https://sismosmart.com${canonicalPath}>; rel="canonical"`,
      );
      assert.match(await response.text(), /\n## Sitemap\n/);
    }
  }
});

test("every localized HTML page advertises a same-path Markdown alternate", () => {
  for (const locale of expectedLocales) {
    for (const segment of expectedAgentSegments) {
      const path = segment ? `/${segment}` : "/";
      const metadata = buildPageMetadata(
        locale,
        path,
        "Title",
        "A sufficiently descriptive public page description.",
      );
      const expected = segment
        ? `https://sismosmart.com/${locale}/${segment}.md`
        : `https://sismosmart.com/${locale}.md`;
      assert.equal(metadata.alternates?.types?.["text/markdown"], expected);
    }
  }
});

test("public AGENTS.md exposes required sections without private operations data", async () => {
  const relativePath = "src/app/AGENTS.md/route.ts";
  assert.equal(
    fs.existsSync(path.join(rootDir, relativePath)),
    true,
    `${relativePath} must exist`,
  );
  const { GET } = await loadRoute(relativePath);
  const response = GET();
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("content-type"), "text/markdown; charset=utf-8");
  for (const heading of [
    "Overview",
    "Installation",
    "Configuration",
    "Usage",
    "Validation",
    "Safety and limitations",
  ]) {
    assert.match(body, new RegExp(`^## ${heading}$`, "m"));
  }
  assertPublicOutput(body);
});
