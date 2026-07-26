import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";
import { NextRequest } from "next/server";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const proxyPath = path.join(rootDir, "src/proxy.ts");

async function loadProxy() {
  assert.equal(fs.existsSync(proxyPath), true, "src/proxy.ts must exist");
  return import(pathToFileURL(proxyPath).href);
}

function rewritePath(response) {
  const value = response.headers.get("x-middleware-rewrite");
  return value ? new URL(value).pathname : null;
}

test("direct same-path Markdown mirrors rewrite to the internal renderer", async () => {
  const { proxy } = await loadProxy();
  for (const [pathname, expected] of [
    ["/en.md", "/markdown/en/home"],
    ["/en/product.md", "/markdown/en/product"],
    ["/tr/glossary.md", "/markdown/tr/glossary"],
  ]) {
    const response = proxy(new NextRequest(`https://sismosmart.com${pathname}`));
    assert.equal(rewritePath(response), expected);
  }
});

test("explicit Markdown Accept requests negotiate the same public resource", async () => {
  const { proxy } = await loadProxy();
  for (const [pathname, expected] of [
    ["/en", "/markdown/en/home"],
    ["/en/contact", "/markdown/en/contact"],
  ]) {
    const response = proxy(
      new NextRequest(`https://sismosmart.com${pathname}`, {
        headers: { Accept: "text/markdown" },
      }),
    );
    assert.equal(rewritePath(response), expected);
  }
});

test("HEAD requests negotiate Markdown while ordinary browser and unsafe requests pass through", async () => {
  const { proxy } = await loadProxy();
  const head = proxy(
    new NextRequest("https://sismosmart.com/en/product", {
      method: "HEAD",
      headers: { Accept: "text/markdown, text/plain;q=0.9" },
    }),
  );
  assert.equal(rewritePath(head), "/markdown/en/product");

  for (const request of [
    new NextRequest("https://sismosmart.com/en/product", {
      headers: { Accept: "text/html,application/xhtml+xml" },
    }),
    new NextRequest("https://sismosmart.com/en/product", {
      headers: { Accept: "*/*" },
    }),
    new NextRequest("https://sismosmart.com/api/contact", {
      headers: { Accept: "text/markdown" },
    }),
    new NextRequest("https://sismosmart.com/_next/static/chunk.js", {
      headers: { Accept: "text/markdown" },
    }),
    new NextRequest("https://sismosmart.com/en/contact", {
      method: "POST",
      headers: { Accept: "text/markdown" },
    }),
    new NextRequest("https://sismosmart.com/en/missing.md"),
  ]) {
    const response = proxy(request);
    assert.equal(rewritePath(response), null);
    assert.equal(response.headers.get("x-middleware-next"), "1");
  }
});
