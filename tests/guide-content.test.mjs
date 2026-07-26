import assert from "node:assert/strict";
import test from "node:test";

import {
  guideLocales,
  guideTranslationKeys,
  isGuideLocale,
} from "../src/lib/guides/types.ts";

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