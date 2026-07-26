import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function readText(relativePath) {
  return fs.readFileSync(path.join(rootDir, relativePath), "utf8");
}

import { isGuideLocale } from "../src/lib/guides/types.ts";

import {
  getGuideBySlug,
  getGuideByTranslationKey,
  getGuideCanonicalPath,
  getGuideMarkdownPath,
} from "../src/lib/guides/catalog.ts";

import { getGuideUiStrings } from "../src/lib/guides/ui-strings.ts";

import {
  getHubStaticParams,
  getDetailStaticParams,
  resolveHubLocale,
  resolveDetailParams,
} from "../src/lib/guides/routing.ts";

import {
  buildGuideHubMetadata,
  buildGuideMetadata,
} from "../src/lib/guides/metadata.ts";

test("no concrete locale route directories exist under src/app", () => {
  const appDir = path.join(rootDir, "src", "app");
  for (const locale of ["en", "tr", "es", "id", "pt", "it"]) {
    assert.equal(
      fs.existsSync(path.join(appDir, locale)),
      false,
      `src/app/${locale} must not exist as a concrete directory`,
    );
  }
});

test("dynamic guide route files exist", () => {
  const hubPath = path.join(
    rootDir,
    "src",
    "app",
    "[locale]",
    "guides",
    "page.tsx",
  );
  const detailPath = path.join(
    rootDir,
    "src",
    "app",
    "[locale]",
    "guides",
    "[slug]",
    "page.tsx",
  );
  assert.ok(fs.existsSync(hubPath), "src/app/[locale]/guides/page.tsx must exist");
  assert.ok(
    fs.existsSync(detailPath),
    "src/app/[locale]/guides/[slug]/page.tsx must exist",
  );
});

test("hub static params returns exactly en and tr", () => {
  const params = getHubStaticParams();
  assert.deepEqual(params, [{ locale: "en" }, { locale: "tr" }]);
});

test("detail static params returns exactly 12 locale/slug pairs", () => {
  const params = getDetailStaticParams();
  assert.equal(params.length, 12);
  for (const param of params) {
    assert.ok(isGuideLocale(param.locale), `Invalid locale in static params: ${param.locale}`);
    assert.equal(typeof param.slug, "string", `Missing slug in static params`);
    assert.ok(
      getGuideBySlug(param.locale, param.slug) !== null,
      `Slug "${param.slug}" not found for locale "${param.locale}"`,
    );
  }
});

test("resolveHubLocale validates locale", () => {
  assert.equal(resolveHubLocale("en"), "en");
  assert.equal(resolveHubLocale("tr"), "tr");
  assert.equal(resolveHubLocale("es"), null);
  assert.equal(resolveHubLocale("missing"), null);
});

test("resolveDetailParams validates locale and slug", () => {
  const enGuide = getGuideByTranslationKey("en", "building-seismic-monitoring-device");
  const result = resolveDetailParams("en", enGuide.slug);
  assert.ok(result !== null);
  assert.equal(result.locale, "en");
  assert.equal(result.slug, enGuide.slug);

  assert.equal(resolveDetailParams("es", "anything"), null);
  assert.equal(resolveDetailParams("en", "missing-slug"), null);
});

test("hub metadata for English locale has correct alternates", () => {
  const metadata = buildGuideHubMetadata("en");
  assert.equal(
    metadata.alternates?.canonical,
    "https://sismosmart.com/en/guides",
  );
  assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}).sort(), [
    "en",
    "tr",
    "x-default",
  ]);
  assert.equal(
    metadata.alternates?.languages?.["x-default"],
    "https://sismosmart.com/en/guides",
  );
  assert.equal(
    metadata.alternates?.languages?.en,
    "https://sismosmart.com/en/guides",
  );
  assert.equal(
    metadata.alternates?.languages?.tr,
    "https://sismosmart.com/tr/guides",
  );
  assert.equal(metadata.openGraph?.url, "https://sismosmart.com/en/guides");
  assert.equal(metadata.openGraph?.type, "website");
});

test("hub metadata for Turkish locale has correct alternates", () => {
  const metadata = buildGuideHubMetadata("tr");
  assert.equal(
    metadata.alternates?.canonical,
    "https://sismosmart.com/tr/guides",
  );
  assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}).sort(), [
    "en",
    "tr",
    "x-default",
  ]);
  assert.equal(metadata.openGraph?.url, "https://sismosmart.com/tr/guides");
});

test("detail metadata for English guide has correct alternates and markdown type", () => {
  const guide = getGuideByTranslationKey("en", "building-seismic-monitoring-device");
  const metadata = buildGuideMetadata(guide);
  const canonicalPath = getGuideCanonicalPath(guide);
  const markdownPath = getGuideMarkdownPath(guide);

  assert.equal(
    metadata.alternates?.canonical,
    `https://sismosmart.com${canonicalPath}`,
  );
  assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}).sort(), [
    "en",
    "tr",
    "x-default",
  ]);
  assert.equal(
    metadata.alternates?.types?.["text/markdown"],
    `https://sismosmart.com${markdownPath}`,
  );
  assert.equal(metadata.openGraph?.url, `https://sismosmart.com${canonicalPath}`);
  assert.equal(metadata.openGraph?.type, "article");
});

test("detail metadata for Turkish guide has correct alternates", () => {
  const guide = getGuideByTranslationKey("tr", "building-seismic-monitoring-device");
  const metadata = buildGuideMetadata(guide);
  const canonicalPath = getGuideCanonicalPath(guide);

  assert.equal(
    metadata.alternates?.canonical,
    `https://sismosmart.com${canonicalPath}`,
  );
  assert.equal(metadata.openGraph?.url, `https://sismosmart.com${canonicalPath}`);
  assert.equal(metadata.openGraph?.type, "article");
});

test("hub metadata does not call buildPageMetadata", () => {
  const metadataSource = readText("src/lib/guides/metadata.ts");
  assert.doesNotMatch(
    metadataSource,
    /buildPageMetadata/,
    "metadata.ts must not import or call buildPageMetadata",
  );
});

test("hub component source has semantic structure", () => {
  const source = readText("src/components/guides/guide-hub-page.tsx");
  assert.match(source, /<main[\s\S]*id="content"/, "Hub must have <main id=\"content\">");
  assert.match(source, /<h1/, "Hub must have at least one h1");
  assert.doesNotMatch(source, /["']use client["']/, "Hub must not use client directive");
  assert.match(source, /href/, "Hub must contain ordinary anchor links");
});

test("detail component source has semantic structure", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /<main[\s\S]*id="content"/, "Detail must have <main id=\"content\">");
  assert.match(source, /<article/, "Detail must have <article>");
  assert.match(source, /<h1/, "Detail must have at least one h1");
  assert.match(source, /<time/, "Detail must have <time> element");
  assert.match(source, /rel=["']noreferrer["']/, "Detail must have rel=noreferrer references");
  assert.doesNotMatch(source, /["']use client["']/, "Detail must not use client directive");
  assert.match(source, /href/, "Detail must contain ordinary anchor links");
});

test("detail component source renders safety notice", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(
    source,
    /safetyNotice/,
    "Detail component must render the safetyNotice field",
  );
});

test("guide-links component source renders ordinary anchors", () => {
  const source = readText("src/components/guides/guide-links.tsx");
  assert.match(source, /href/, "GuideLinks must render ordinary anchor links");
  assert.doesNotMatch(
    source,
    /["']use client["']/,
    "GuideLinks must not use client directive",
  );
});

test("hub route source uses async params and notFound", () => {
  const source = readText("src/app/[locale]/guides/page.tsx");
  assert.match(source, /Promise<\{[^}]*locale/, "Hub route must use async Promise params");
  assert.match(source, /notFound/, "Hub route must call notFound for invalid locale");
  assert.match(source, /generateStaticParams/, "Hub route must export generateStaticParams");
});

test("detail route source uses async params and notFound", () => {
  const source = readText("src/app/[locale]/guides/[slug]/page.tsx");
  assert.match(
    source,
    /Promise<\{[^}]*slug/,
    "Detail route must use async Promise params with slug",
  );
  assert.match(source, /notFound/, "Detail route must call notFound for invalid params");
  assert.match(
    source,
    /generateStaticParams/,
    "Detail route must export generateStaticParams",
  );
});

test("hub route links to localized product, technology, how-it-works, FAQ, glossary, and pilot", () => {
  const source = readText("src/components/guides/guide-hub-page.tsx");
  assert.match(source, /\/product|getLocalizedHref|localizedHref/i, "Hub links to product");
  assert.match(source, /\/technology|getLocalizedHref|localizedHref/i, "Hub links to technology");
  assert.match(source, /\/how-it-works|getLocalizedHref|localizedHref/i, "Hub links to how-it-works");
  assert.match(source, /\/faq|getLocalizedHref|localizedHref/i, "Hub links to FAQ");
  assert.match(source, /\/glossary|getLocalizedHref|localizedHref/i, "Hub links to glossary");
  assert.match(source, /\/pilot|getLocalizedHref|localizedHref/i, "Hub links to pilot");
});

test("detail component renders references with visible organization names", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /references/, "Detail must render references");
  assert.match(source, /rel=["']noreferrer["']/, "References must have rel=noreferrer");
  assert.match(source, /organization/, "Detail must display organization names");
});

test("detail component renders glossary links without fabricated fragments", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /glossary/, "Detail must link to glossary page");
  assert.doesNotMatch(
    source,
    /glossary#/,
    "Detail must not link to glossary with fabricated fragments",
  );
});

test("routing.ts source exports required helpers", () => {
  const source = readText("src/lib/guides/routing.ts");
  assert.match(source, /getHubStaticParams/, "routing.ts must export getHubStaticParams");
  assert.match(source, /getDetailStaticParams/, "routing.ts must export getDetailStaticParams");
  assert.match(source, /resolveHubLocale/, "routing.ts must export resolveHubLocale");
  assert.match(source, /resolveDetailParams/, "routing.ts must export resolveDetailParams");
});

test("routing.ts source validates locale against guideLocales", () => {
  const source = readText("src/lib/guides/routing.ts");
  assert.match(
    source,
    /guideLocales|isGuideLocale/,
    "routing.ts must use guideLocales or isGuideLocale for validation",
  );
});

test("detail breadcrumb Guides link uses getLocalizedHref for hub, not getGuideCanonicalPath", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  const guidesBreadcrumbPattern = /Guides[\s\S]*?<\/a>/;
  const match = source.match(guidesBreadcrumbPattern);
  assert.ok(match, "Detail must render a Guides breadcrumb link");
  const linkHtml = match[0];
  assert.ok(
    /getLocalizedHref\(.*["']\/guides["']\)/.test(source),
    "Breadcrumb Guides href must use getLocalizedHref(locale, '/guides')",
  );
  assert.ok(
    !(/href=\{getGuideCanonicalPath\(.*slug/.test(linkHtml)),
    "Guides breadcrumb must not use getGuideCanonicalPath for the hub link",
  );
});

test("getGuideUiStrings returns localized strings for both EN and TR", () => {
  const en = getGuideUiStrings("en");
  const tr = getGuideUiStrings("tr");
  assert.equal(typeof en.home, "string");
  assert.equal(typeof tr.home, "string");
  assert.notEqual(en.home, tr.home);
  assert.equal(en.home, "Home");
  assert.equal(tr.home, "Ana sayfa");
  assert.equal(en.guides, "Guides");
  assert.equal(tr.guides, "Rehberler");
  assert.equal(en.published, "Published");
  assert.equal(tr.published, "Yayınlandı");
  assert.equal(en.updated, "Updated");
  assert.equal(tr.updated, "Güncellendi");
  assert.equal(en.keyTakeaways, "Key takeaways");
  assert.equal(tr.keyTakeaways, "Temel çıkarımlar");
  assert.equal(en.limitations, "Limitations");
  assert.equal(tr.limitations, "Sınırlamalar");
  assert.equal(en.sismosmartFit, "SismoSmart fit");
  assert.equal(tr.sismosmartFit, "SismoSmart bu tabloda nerede?");
  assert.equal(en.relatedGlossaryTerms, "Related glossary terms");
  assert.equal(tr.relatedGlossaryTerms, "İlgili sözlük terimleri");
  assert.equal(en.relatedGuides, "Related guides");
  assert.equal(tr.relatedGuides, "İlgili rehberler");
  assert.equal(en.references, "References");
  assert.equal(tr.references, "Kaynaklar");
  assert.equal(en.product, "Product");
  assert.equal(tr.product, "Ürün");
  assert.equal(en.technology, "Technology");
  assert.equal(tr.technology, "Teknoloji");
  assert.equal(en.howItWorks, "How it works");
  assert.equal(tr.howItWorks, "Nasıl çalışır");
  assert.equal(en.faq, "FAQ");
  assert.equal(tr.faq, "SSS");
  assert.equal(en.glossary, "Glossary");
  assert.equal(tr.glossary, "Sözlük");
  assert.equal(en.pilotProgram, "Pilot program");
  assert.equal(tr.pilotProgram, "Pilot program");
});

test("getGuideUiStrings returns the same object reference for same locale (immutable)", () => {
  const a = getGuideUiStrings("en");
  const b = getGuideUiStrings("en");
  assert.equal(a, b, "getGuideUiStrings should return a cached singleton per locale");
});

test("getGuideUiStrings is a pure function with all required keys", () => {
  const en = getGuideUiStrings("en");
  const tr = getGuideUiStrings("tr");
  const requiredKeys = [
    "home", "guides", "published", "updated", "keyTakeaways", "limitations",
    "sismosmartFit", "relatedGlossaryTerms", "relatedGuides", "references",
    "product", "technology", "howItWorks", "faq", "glossary", "pilotProgram",
  ];
  for (const key of requiredKeys) {
    assert.ok(key in en, `EN string map missing key: ${key}`);
    assert.ok(key in tr, `TR string map missing key: ${key}`);
  }
});
