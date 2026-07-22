import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function readText(relativePath) {
  const absolutePath = path.join(rootDir, relativePath);
  assert.equal(fs.existsSync(absolutePath), true, `${relativePath} must exist`);
  return fs.readFileSync(absolutePath, "utf8");
}

const labelHeavyModules = [
  ["product-page.tsx", "ProductPage", "productLabels"],
  ["how-it-works-page.tsx", "HowItWorksPage", "howItWorksLabels"],
  ["about-page.tsx", "AboutPage", "aboutLabels"],
];

test("label-heavy localized pages own their rendering dependencies", () => {
  const dispatcher = readText("src/components/localized-subpage.tsx");

  for (const [file, component, labels] of labelHeavyModules) {
    const source = readText(`src/components/localized-pages/${file}`);
    assert.match(source, new RegExp(`export function ${component}`));
    assert.match(source, new RegExp(`const ${labels}`));
    assert.match(dispatcher, new RegExp(component));
    assert.doesNotMatch(dispatcher, new RegExp(`const ${labels}`));
  }
});
