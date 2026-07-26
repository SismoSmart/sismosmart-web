import assert from "node:assert/strict";
import test from "node:test";

import {
  guideLocales,
  guideTranslationKeys,
  isGuideLocale,
} from "../src/lib/guides/types.ts";

import {
  getGuideAlternates,
  getGuideBySlug,
  getGuideByTranslationKey,
  getGuideCanonicalPath,
  getGuideMarkdownPath,
  getGuides,
  getGuideLocaleSwitchPathMap,
} from "../src/lib/guides/catalog.ts";

const expectedKeys = [
  "building-seismic-monitoring-device",
  "measuring-building-motion-after-earthquake",
  "earthquake-app-vs-fixed-sensor",
  "seismic-sensor-placement",
  "mems-accelerometers-seismic-monitoring",
  "building-natural-frequency-monitoring",
];

test("guide domain fixes the supported locales and translation keys", () => {
  assert.deepEqual(guideLocales, ["en", "tr"]);
  assert.deepEqual(guideTranslationKeys, expectedKeys);
  assert.equal(isGuideLocale("en"), true);
  assert.equal(isGuideLocale("tr"), true);
  assert.equal(isGuideLocale("es"), false);
  assert.equal(isGuideLocale("missing"), false);
});

test("each locale exposes exactly six guides with unique slugs", () => {
  for (const locale of guideLocales) {
    const guides = getGuides(locale);
    assert.equal(guides.length, 6);
    assert.deepEqual(
      guides.map((guide) => guide.translationKey).sort(),
      [...guideTranslationKeys].sort(),
    );
    assert.equal(new Set(guides.map((guide) => guide.slug)).size, 6);
  }
});

test("translation key lookup, slug lookup, and URL helpers are consistent", () => {
  for (const key of guideTranslationKeys) {
    const en = getGuideByTranslationKey("en", key);
    const tr = getGuideByTranslationKey("tr", key);
    assert.equal(getGuideBySlug("en", en.slug), en);
    assert.equal(getGuideBySlug("tr", tr.slug), tr);
    assert.equal(getGuideCanonicalPath(en), `/en/guides/${en.slug}`);
    assert.equal(getGuideMarkdownPath(tr), `/tr/guides/${tr.slug}.md`);
    assert.deepEqual(getGuideAlternates(key), {
      en: `https://sismosmart.com/en/guides/${en.slug}`,
      tr: `https://sismosmart.com/tr/guides/${tr.slug}`,
      "x-default": `https://sismosmart.com/en/guides/${en.slug}`,
    });
  }
  assert.equal(getGuideBySlug("es", "anything"), null);
  assert.equal(getGuideBySlug("en", "missing"), null);
  const switchMap = getGuideLocaleSwitchPathMap();
  assert.equal(switchMap["/en/guides"].tr, "/tr/guides");
  assert.equal(switchMap["/tr/guides"].en, "/en/guides");
});

test("every guide satisfies content completeness requirements", () => {
  for (const locale of guideLocales) {
    for (const guide of getGuides(locale)) {
      assert.ok(guide.title.length >= 35 && guide.title.length <= 70);
      assert.ok(guide.description.length >= 100 && guide.description.length <= 180);
      assert.ok(guide.h1.length >= 20);
      assert.ok(guide.summary.length >= 180);
      assert.ok(guide.sections.length >= 4);
      assert.ok(guide.keyTakeaways.length >= 3);
      assert.ok(guide.limitations.length >= 3);
      assert.ok(guide.sismosmartFit.length >= 2);
      assert.ok(guide.references.length >= 2);
      assert.ok(guide.relatedGuides.length >= 2 && guide.relatedGuides.length <= 3);
      assert.ok(guide.relatedGlossaryTerms.length >= 2);
      assert.match(guide.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.match(guide.updatedAt, /^\d{4}-\d{2}-\d{2}$/);
      assert.match(guide.safetyNotice, /engineer|mühendis/i);
      assert.ok(guide.references.every((reference) => reference.url.startsWith("https://")));
    }
  }
});

test("no guide contains prohibited claims", () => {
  const publicCopy = guideLocales
    .flatMap(getGuides)
    .map(JSON.stringify)
    .join("\n");
  const forbiddenPatterns = [
    /predicts? earthquakes?/i,
    /depremi (?:önceden )?tahmin/i,
    /certifies? (?:a )?building (?:as )?safe/i,
    /binanın güvenli olduğunu (?:belirler|onaylar)/i,
    /replaces? (?:a )?(?:structural )?engineer/i,
    /mühendisin yerini alır/i,
    /official early.warning/i,
    /resm[iî] erken uyarı/i,
    /proven accuracy/i,
    /kanıtlanmış doğruluk/i,
  ];
  for (const pattern of forbiddenPatterns)
    assert.doesNotMatch(publicCopy, pattern);
  assert.doesNotMatch(publicCopy, /[/\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/u);
});