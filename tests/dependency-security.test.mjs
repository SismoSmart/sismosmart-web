import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));

function parts(version) {
  return String(version).replace(/^[^0-9]*/, "").split(".").slice(0, 3).map(Number);
}

function atLeast(version, minimum) {
  const left = parts(version);
  const right = parts(minimum);
  for (let index = 0; index < 3; index += 1) {
    const delta = (left[index] || 0) - (right[index] || 0);
    if (delta !== 0) return delta > 0;
  }
  return true;
}

test("direct dependencies meet the reviewed high-severity security floor", () => {
  assert.equal(atLeast(packageJson.dependencies.next, "16.2.11"), true);
  assert.equal(atLeast(packageJson.dependencies.sharp, "0.35.3"), true);
  assert.equal(atLeast(packageJson.dependencies.react, "19.2.8"), true);
  assert.equal(atLeast(packageJson.dependencies["react-dom"], "19.2.8"), true);
  assert.equal(atLeast(packageJson.dependencies["@sentry/nextjs"], "10.67.0"), true);
});

test("all locked fast-uri instances use the patched compatible release", () => {
  const versions = Object.entries(lock.packages || {})
    .filter(([name]) => name === "node_modules/fast-uri" || name.endsWith("/node_modules/fast-uri"))
    .map(([, metadata]) => metadata.version);
  assert.ok(versions.length > 0, "No fast-uri instances found in lockfile");
  for (const version of versions) {
    assert.equal(atLeast(version, "3.1.4"), true, `Unsafe fast-uri version: ${version}`);
  }
});


test("all locked sharp instances use a patched libvips line", () => {
  const versions = Object.entries(lock.packages || {})
    .filter(([name]) => name === "node_modules/sharp" || name.endsWith("/node_modules/sharp"))
    .map(([, metadata]) => metadata.version);
  assert.ok(versions.length > 0, "No sharp instances found in lockfile");
  for (const version of versions) {
    assert.equal(atLeast(version, "0.35.0"), true, `Unsafe sharp version: ${version}`);
  }
});
