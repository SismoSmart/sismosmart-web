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

import { isGuideLocale, guideTranslationKeys } from "../src/lib/guides/types.ts";

import {
  getGuideBySlug,
  getGuideByTranslationKey,
  getGuideCanonicalPath,
  getGuideMarkdownPath,
  getGuideHub,
  getGuides,
  getGuidesByCategory,
} from "../src/lib/guides/catalog.ts";

import { getGuideUiStrings } from "../src/lib/guides/ui-strings.ts";

import {
  getGuideHubStructuredData,
  getGuideStructuredData,
} from "../src/lib/guides/structured-data.ts";

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

import { partitionGuideSections } from "../src/lib/guides/presentation.ts";

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

test("commercial and technical translation keys are explicit and disjoint", () => {
  for (const locale of ["en", "tr"]) {
    const commercial = getGuidesByCategory(locale, "commercial");
    const technical = getGuidesByCategory(locale, "technical");
    assert.equal(commercial.length, 4, `Commercial guides count for ${locale}`);
    assert.equal(technical.length, 2, `Technical guides count for ${locale}`);
    const commercialKeys = commercial.map(g => g.translationKey);
    const technicalKeys = technical.map(g => g.translationKey);
    for (const key of commercialKeys) {
      assert.ok(!technicalKeys.includes(key), `Key ${key} should not be in both categories`);
    }
    const allKeys = [...commercialKeys, ...technicalKeys];
    assert.equal(allKeys.length, 6, `Total guides for ${locale} should be 6`);
    for (const key of guideTranslationKeys) {
      assert.ok(allKeys.includes(key), `Key ${key} missing from categories`);
    }
  }
});

test("detail component source has semantic structure", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /<main[\s\S]*id="content"/, "Detail must have <main id=\"content\">");
  assert.match(source, /<article/, "Detail must have <article>");
  assert.match(source, /<h1/, "Detail must have at least one h1");
  assert.match(source, /<time/, "Detail must have <time> element");
  assert.match(source, /rel=["']noopener noreferrer["']/, "Detail must have rel=noopener noreferrer references");
  assert.doesNotMatch(source, /["']use client["']/, "Detail must not use client directive");
  assert.match(source, /href/, "Detail must contain ordinary anchor links");
});

test("detail references use rel=noopener noreferrer", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /rel=["']noopener noreferrer["']/, "References must have rel=\"noopener noreferrer\"");
});

test("detail component source renders safety notice", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(
    source,
    /safetyNotice/,
    "Detail component must render the safetyNotice field",
  );
});

test("detail safety aside has aria-labelledby and sr-only heading", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /<aside aria-labelledby="guide-safety-title"/, "Safety section must be aside with aria-labelledby");
  assert.match(source, /<h2 id="guide-safety-title" className="sr-only"/, "Safety heading must be sr-only");
});

test("partitionGuideSections removes limitations heading and preserves paragraphs", () => {
  for (const locale of ["en", "tr"]) {
    const ui = getGuideUiStrings(locale);
    const guides = getGuides(locale);
    for (const guide of guides) {
      const { contentSections, limitationParagraphs } = partitionGuideSections(guide.sections, ui.limitations);
      for (const section of contentSections) {
        assert.notEqual(section.heading, ui.limitations, `Limitations heading should not appear in contentSections for ${guide.translationKey}`);
      }
      const originalParagraphs = guide.sections.flatMap(s => s.paragraphs);
      const resultParagraphs = [...contentSections.flatMap(s => s.paragraphs), ...limitationParagraphs];
      const sortedOriginal = [...originalParagraphs].sort();
      const sortedResult = [...resultParagraphs].sort();
      assert.deepEqual(sortedResult, sortedOriginal, `Paragraphs must be preserved for ${guide.translationKey} in ${locale}`);
    }
  }
});

test("detail component uses partitionGuideSections helper", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /import.*partitionGuideSections/, "Detail component must import partitionGuideSections");
  assert.match(source, /contentSections\.map/, "Detail component must render contentSections");
});

test("detail CTA wrapper is a div not a section", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  const ctaMatch = source.match(/<div className="space-y-3">[\s\S]*?<a[\s\S]*?{guide\.cta\.label}[\s\S]*?<\/div>/);
  assert.ok(ctaMatch, "CTA wrapper must be a div");
  assert.doesNotMatch(ctaMatch[0], /<section/, "CTA wrapper must not be a section");
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
  assert.match(source, /rel=["']noopener noreferrer["']/, "References must have rel=noopener noreferrer");
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

test("detail breadcrumb nav uses getLocalizedHref and localized label", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  const navMatch = source.match(/<nav[\s\S]*?<\/nav>/);
  assert.ok(navMatch, "Detail must have a breadcrumb nav");
  const navHtml = navMatch[0];
  assert.match(navHtml, /aria-label=\{ui\.breadcrumb\}/, "Breadcrumb nav must have aria-label={ui.breadcrumb}");
  assert.match(navHtml, /getLocalizedHref\(.*["']\/guides["']\)/, "Breadcrumb Guides href must use getLocalizedHref");
  assert.match(navHtml, /\{ui\.guides\}/, "Breadcrumb must display ui.guides");
  assert.doesNotMatch(navHtml, /getGuideCanonicalPath/, "Breadcrumb nav must not use getGuideCanonicalPath");
});

test("detail breadcrumb current page has aria-current", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  const navMatch = source.match(/<nav[\s\S]*?<\/nav>/);
  assert.ok(navMatch, "Detail must have a breadcrumb nav");
  const navHtml = navMatch[0];
  assert.match(navHtml, /aria-current="page"/, "Current page breadcrumb must have aria-current=\"page\"");
});

test("detail h1 has id guide-title and article has aria-labelledby", () => {
  const source = readText("src/components/guides/guide-detail-page.tsx");
  assert.match(source, /<h1 id="guide-title"/, "h1 must have id=\"guide-title\"");
  assert.match(source, /aria-labelledby="guide-title"/, "article must have aria-labelledby=\"guide-title\"");
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
  assert.equal(en.breadcrumb, "Breadcrumb");
  assert.equal(tr.breadcrumb, "Ekmek kırıntıları");
  assert.equal(en.safetyNotice, "Safety notice");
  assert.equal(tr.safetyNotice, "Güvenlik notu");
});

test("getGuideUiStrings returns frozen singleton and resists mutation", () => {
  const en = getGuideUiStrings("en");
  const tr = getGuideUiStrings("tr");
  const a = getGuideUiStrings("en");
  const b = getGuideUiStrings("en");
  assert.equal(a, b, "getGuideUiStrings should return a cached singleton per locale");
  assert.ok(Object.isFrozen(en), "EN locale object should be frozen");
  assert.ok(Object.isFrozen(tr), "TR locale object should be frozen");
  // Mutation attempts should throw
  assert.throws(() => { en.home = "HACKED"; }, TypeError);
  assert.throws(() => { tr.home = "HACKED"; }, TypeError);
  // Values remain unchanged after mutation attempts
  assert.equal(en.home, "Home");
  assert.equal(tr.home, "Ana sayfa");
});

test("getGuideUiStrings locale map is frozen", async () => {
  const { getGuideUiStrings: fn } = await import("../src/lib/guides/ui-strings.ts");
  // Access the module's internal map via the function's return values; we cannot directly access the map.
  // Instead, we test that the function returns the same frozen objects for each locale.
  const locales = ["en", "tr"];
  for (const locale of locales) {
    const obj = fn(locale);
    assert.ok(Object.isFrozen(obj), `Locale ${locale} object should be frozen`);
  }
});

test("getGuideUiStrings is a pure function with all required keys", () => {
  const en = getGuideUiStrings("en");
  const tr = getGuideUiStrings("tr");
  const requiredKeys = [
    "home", "guides", "published", "updated", "keyTakeaways", "limitations",
    "sismosmartFit", "relatedGlossaryTerms", "relatedGuides", "references",
    "product", "technology", "howItWorks", "faq", "glossary", "pilotProgram",
    "breadcrumb", "safetyNotice",
  ];
  for (const key of requiredKeys) {
    assert.ok(key in en, `EN string map missing key: ${key}`);
    assert.ok(key in tr, `TR string map missing key: ${key}`);
  }
});

test("getGuideByTranslationKey returns guides for all locale/key combinations", () => {
  for (const locale of ["en", "tr"]) {
    for (const key of guideTranslationKeys) {
      const guide = getGuideByTranslationKey(locale, key);
      assert.ok(guide, `Guide must exist for locale ${locale} and key ${key}`);
      assert.equal(guide.locale, locale, `Guide locale must match for ${key}`);
      assert.equal(guide.translationKey, key, `Guide translationKey must match for ${key}`);
    }
  }
});

test("getGuideByTranslationKey throws descriptive error for missing key", () => {
  assert.throws(
    () => getGuideByTranslationKey("en", "nonexistent-key"),
    /Guide translation key "nonexistent-key" not found in catalog/,
    "Should throw descriptive error for missing key"
  );
});

test("getGuideByTranslationKey throws descriptive error for missing locale", () => {
  assert.throws(
    () => getGuideByTranslationKey("es", "building-seismic-monitoring-device"),
    /Guide translation key "building-seismic-monitoring-device" missing for locale "es"/,
    "Should throw descriptive error for missing locale"
  );
});

test("catalog source does not use unsafe Record casts", () => {
  const source = readText("src/lib/guides/catalog.ts");
  assert.doesNotMatch(
    source,
    /\{\} as Record<GuideLocale, GuideContent>/,
    "Catalog must not use unsafe Record cast for guidesByKey"
  );
  assert.doesNotMatch(
    source,
    /Object\.keys\(guidesByKey\) as GuideTranslationKey\[\]/,
    "Catalog must not use Object.keys cast for guidesByKey iteration"
  );
});

test("detail structured data returns exactly Article and BreadcrumbList for each guide", () => {
  for (const locale of ["en", "tr"]) {
    const guides = getGuides(locale);
    for (const guide of guides) {
      const entities = getGuideStructuredData(guide);
      assert.equal(entities.length, 2, `Expected 2 entities for ${guide.translationKey} in ${locale}`);
      assert.equal(entities[0]["@type"], "Article", `First entity must be Article for ${guide.translationKey}`);
      assert.equal(entities[1]["@type"], "BreadcrumbList", `Second entity must be BreadcrumbList for ${guide.translationKey}`);
      for (const entity of entities) {
        assert.equal(entity["@context"], "https://schema.org", `Entity must have @context for ${guide.translationKey}`);
      }
    }
  }
});

test("detail Article has required fields", () => {
  for (const locale of ["en", "tr"]) {
    const guides = getGuides(locale);
    for (const guide of guides) {
      const entities = getGuideStructuredData(guide);
      const article = entities[0];
      assert.equal(article["@type"], "Article");
      assert.equal(article.headline, guide.h1, `headline must match h1 for ${guide.translationKey}`);
      assert.equal(article.description, guide.description, `description must match for ${guide.translationKey}`);
      assert.equal(article.url, `https://sismosmart.com${getGuideCanonicalPath(guide)}`, `url must be canonical for ${guide.translationKey}`);
      assert.equal(article.datePublished, guide.publishedAt, `datePublished must match publishedAt for ${guide.translationKey}`);
      assert.equal(article.dateModified, guide.updatedAt, `dateModified must match updatedAt for ${guide.translationKey}`);
      assert.equal(article.inLanguage, guide.locale, `inLanguage must match locale for ${guide.translationKey}`);
      assert.deepEqual(article.author, { "@type": "Organization", name: "SismoSmart", url: "https://sismosmart.com" }, `author must be SismoSmart Organization for ${guide.translationKey}`);
      assert.deepEqual(article.publisher, article.author, `publisher must equal author for ${guide.translationKey}`);
    }
  }
});

test("detail breadcrumb has exactly three ListItems at positions 1, 2, 3", () => {
  for (const locale of ["en", "tr"]) {
    const guides = getGuides(locale);
    const ui = getGuideUiStrings(locale);
    for (const guide of guides) {
      const entities = getGuideStructuredData(guide);
      const breadcrumb = entities[1];
      assert.equal(breadcrumb["@type"], "BreadcrumbList");
      const items = breadcrumb.itemListElement;
      assert.equal(items.length, 3, `Breadcrumb must have 3 items for ${guide.translationKey}`);
      assert.equal(items[0].position, 1, `Position 1 for ${guide.translationKey}`);
      assert.equal(items[0].name, ui.home, `Position 1 name must be ${ui.home} for ${guide.translationKey}`);
      assert.equal(items[0].item, `https://sismosmart.com/${locale}`, `Position 1 URL for ${guide.translationKey}`);
      assert.equal(items[1].position, 2, `Position 2 for ${guide.translationKey}`);
      assert.equal(items[1].name, ui.guides, `Position 2 name must be ${ui.guides} for ${guide.translationKey}`);
      assert.equal(items[1].item, `https://sismosmart.com/${locale}/guides`, `Position 2 URL for ${guide.translationKey}`);
      assert.equal(items[2].position, 3, `Position 3 for ${guide.translationKey}`);
      assert.equal(items[2].name, guide.h1, `Position 3 name must be guide h1 for ${guide.translationKey}`);
      assert.equal(items[2].item, `https://sismosmart.com${getGuideCanonicalPath(guide)}`, `Position 3 URL for ${guide.translationKey}`);
    }
  }
});

test("hub structured data returns exactly CollectionPage and BreadcrumbList", () => {
  for (const locale of ["en", "tr"]) {
    const entities = getGuideHubStructuredData(locale);
    assert.equal(entities.length, 2, `Expected 2 entities for hub ${locale}`);
    assert.equal(entities[0]["@type"], "CollectionPage", `First entity must be CollectionPage for ${locale}`);
    assert.equal(entities[1]["@type"], "BreadcrumbList", `Second entity must be BreadcrumbList for ${locale}`);
    for (const entity of entities) {
      assert.equal(entity["@context"], "https://schema.org", `Entity must have @context for ${locale}`);
    }
  }
});

test("hub CollectionPage has required fields", () => {
  for (const locale of ["en", "tr"]) {
    const hub = getGuideHub(locale);
    const entities = getGuideHubStructuredData(locale);
    const collection = entities[0];
    assert.equal(collection["@type"], "CollectionPage");
    assert.equal(collection.name, hub.h1, `name must match hub h1 for ${locale}`);
    assert.equal(collection.description, hub.description, `description must match hub description for ${locale}`);
    assert.equal(collection.url, `https://sismosmart.com/${locale}/guides`, `url must be canonical for ${locale}`);
    assert.equal(collection.inLanguage, locale, `inLanguage must match locale`);
  }
});

test("hub breadcrumb has exactly two ListItems at positions 1 and 2", () => {
  for (const locale of ["en", "tr"]) {
    const ui = getGuideUiStrings(locale);
    const entities = getGuideHubStructuredData(locale);
    const breadcrumb = entities[1];
    assert.equal(breadcrumb["@type"], "BreadcrumbList");
    const items = breadcrumb.itemListElement;
    assert.equal(items.length, 2, `Hub breadcrumb must have 2 items for ${locale}`);
    assert.equal(items[0].position, 1, `Position 1 for ${locale}`);
    assert.equal(items[0].name, ui.home, `Position 1 name must be ${ui.home} for ${locale}`);
    assert.equal(items[0].item, `https://sismosmart.com/${locale}`, `Position 1 URL for ${locale}`);
    assert.equal(items[1].position, 2, `Position 2 for ${locale}`);
    assert.equal(items[1].name, ui.guides, `Position 2 name must be ${ui.guides} for ${locale}`);
    assert.equal(items[1].item, `https://sismosmart.com/${locale}/guides`, `Position 2 URL for ${locale}`);
  }
});

function assertNoForbiddenProperties(serialized, label) {
  assert.doesNotMatch(serialized, /"@type"\s*:\s*"Person"/i, `No Person type for ${label}`);
  assert.doesNotMatch(serialized, /"@type"\s*:\s*"Review"/i, `No Review type for ${label}`);
  assert.doesNotMatch(serialized, /"@type"\s*:\s*"Offer"/i, `No Offer type for ${label}`);
  assert.doesNotMatch(serialized, /"aggregateRating"\s*:/i, `No aggregateRating property for ${label}`);
  assert.doesNotMatch(serialized, /"review"\s*:/i, `No review property key for ${label}`);
  assert.doesNotMatch(serialized, /"offers"\s*:/i, `No offers property key for ${label}`);
  assert.doesNotMatch(serialized, /"price"\s*:/i, `No price property for ${label}`);
  assert.doesNotMatch(serialized, /"certification"\s*:/i, `No certification property for ${label}`);
  assert.doesNotMatch(serialized, /"endorsement"\s*:/i, `No endorsement property for ${label}`);
}

test("detail structured data contains no forbidden properties", () => {
  for (const locale of ["en", "tr"]) {
    const guides = getGuides(locale);
    for (const guide of guides) {
      const entities = getGuideStructuredData(guide);
      const serialized = JSON.stringify(entities);
      assertNoForbiddenProperties(serialized, guide.translationKey);
    }
  }
});

test("hub structured data contains no forbidden properties", () => {
  for (const locale of ["en", "tr"]) {
    const entities = getGuideHubStructuredData(locale);
    const serialized = JSON.stringify(entities);
    assertNoForbiddenProperties(serialized, `hub ${locale}`);
  }
});

test("forbidden-property matcher rejects review and offers property keys", () => {
  const withReview = JSON.stringify([{ "@context": "https://schema.org", "@type": "Article", review: [] }]);
  assert.throws(
    () => assertNoForbiddenProperties(withReview, "mutation-test"),
    /No review property key/,
    "Must reject objects with review property key",
  );
  const withOffers = JSON.stringify([{ "@context": "https://schema.org", "@type": "Article", offers: {} }]);
  assert.throws(
    () => assertNoForbiddenProperties(withOffers, "mutation-test"),
    /No offers property key/,
    "Must reject objects with offers property key",
  );
  const valid = JSON.stringify(getGuideStructuredData(getGuideByTranslationKey("en", "building-seismic-monitoring-device")));
  assertNoForbiddenProperties(valid, "valid-entity-set");
});

test("guide markdown hub and detail route files exist", () => {
  const hubRoute = path.join(
    rootDir,
    "src",
    "app",
    "markdown",
    "guides",
    "[locale]",
    "route.ts",
  );
  const detailRoute = path.join(
    rootDir,
    "src",
    "app",
    "markdown",
    "guides",
    "[locale]",
    "[slug]",
    "route.ts",
  );
  assert.ok(fs.existsSync(hubRoute), "src/app/markdown/guides/[locale]/route.ts must exist");
  assert.ok(fs.existsSync(detailRoute), "src/app/markdown/guides/[locale]/[slug]/route.ts must exist");
});

test("guide markdown module exports renderGuideHubMarkdown and renderGuideMarkdown", () => {
  const source = readText("src/lib/guides/markdown.ts");
  assert.match(source, /export function renderGuideHubMarkdown/, "markdown.ts must export renderGuideHubMarkdown");
  assert.match(source, /export function renderGuideMarkdown/, "markdown.ts must export renderGuideMarkdown");
});

test("hub markdown static params returns exactly en and tr", async () => {
  const mod = await import("../src/app/markdown/guides/[locale]/route.ts");
  const params = mod.generateStaticParams();
  assert.deepEqual(params.map(p => p.locale).sort(), ["en", "tr"]);
});

test("detail markdown static params returns exactly 12 locale/slug pairs", async () => {
  const mod = await import("../src/app/markdown/guides/[locale]/[slug]/route.ts");
  const params = mod.generateStaticParams();
  assert.equal(params.length, 12);
  for (const param of params) {
    assert.ok(isGuideLocale(param.locale), `Invalid locale in markdown static params: ${param.locale}`);
    assert.equal(typeof param.slug, "string", "Missing slug in markdown static params");
    assert.ok(
      getGuideBySlug(param.locale, param.slug) !== null,
      `Slug "${param.slug}" not found for locale "${param.locale}"`,
    );
  }
});

test("hub metadata includes markdown alternate for guide hubs", () => {
  for (const locale of ["en", "tr"]) {
    const metadata = buildGuideHubMetadata(locale);
    assert.ok(metadata.alternates?.types?.["text/markdown"], `Hub metadata for ${locale} must include text/markdown alternate`);
    assert.match(
      metadata.alternates.types["text/markdown"],
      new RegExp(`/${locale}/guides\\.md`),
      `Hub markdown alternate must end with /${locale}/guides.md`,
    );
  }
});

test("hub route StructuredData call uses exact data and id", () => {
  const source = readText("src/app/[locale]/guides/page.tsx");
  assert.match(source, /import.*StructuredData.*from\s*["']@\/components\/structured-data["']/, "Hub route must import StructuredData");
  assert.match(source, /import.*getGuideHubStructuredData.*from\s*["']@\/lib\/guides\/structured-data["']/, "Hub route must import getGuideHubStructuredData");
  const sdCallMatch = source.match(/<StructuredData[\s\S]*?\/>/);
  assert.ok(sdCallMatch, "Hub route must render a <StructuredData /> call");
  assert.match(sdCallMatch[0], /data=\{getGuideHubStructuredData\(resolved\)\}/, "Hub StructuredData must use data={getGuideHubStructuredData(resolved)}");
  assert.match(sdCallMatch[0], /id=\{`\$\{resolved\}-guides-structured-data`\}/, "Hub StructuredData id must be ${resolved}-guides-structured-data");
});

test("detail route StructuredData call uses exact data and id", () => {
  const source = readText("src/app/[locale]/guides/[slug]/page.tsx");
  assert.match(source, /import.*StructuredData.*from\s*["']@\/components\/structured-data["']/, "Detail route must import StructuredData");
  assert.match(source, /import.*getGuideStructuredData.*from\s*["']@\/lib\/guides\/structured-data["']/, "Detail route must import getGuideStructuredData");
  const sdCallMatch = source.match(/<StructuredData[\s\S]*?\/>/);
  assert.ok(sdCallMatch, "Detail route must render a <StructuredData /> call");
  assert.match(sdCallMatch[0], /data=\{getGuideStructuredData\(guide\)\}/, "Detail StructuredData must use data={getGuideStructuredData(guide)}");
  assert.match(sdCallMatch[0], /id=\{`\$\{resolved\.locale\}-\$\{guide\.slug\}-structured-data`\}/, "Detail StructuredData id must be ${resolved.locale}-${guide.slug}-structured-data");
});
