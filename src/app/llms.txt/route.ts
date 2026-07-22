import { locales, siteConfig } from "@/lib/site";

/**
 * /llms.txt follows the llmstxt.org convention: a concise, link-first summary
 * that lets an LLM understand what this site is and where its key pages are,
 * without crawling and parsing every HTML page. Served as Markdown text.
 */
export const dynamic = "force-static";

const englishPaths: Array<{ label: string; path: string; note: string }> = [
  { label: "Home", path: "/en", note: "What SismoSmart is and who it is for." },
  { label: "Product", path: "/en/product", note: "The device, its specs, and how it is installed." },
  { label: "How it works", path: "/en/how-it-works", note: "From vibration to measurement to notification." },
  { label: "Technology", path: "/en/technology", note: "The sensing, connectivity, and data approach." },
  { label: "Pilot program", path: "/en/pilot-program", note: "Multi-device pilots for buildings and organizations." },
  { label: "FAQ", path: "/en/faq", note: "Common questions about accuracy, privacy, and alerts." },
  { label: "About", path: "/en/about", note: "The team and why the product exists." },
  { label: "Contact", path: "/en/contact", note: "How to reach the team." },
];

export function GET(): Response {
  const body = `# ${siteConfig.name}

> ${siteConfig.name} is a small seismic monitoring device you mount on the wall. It measures how your building moves during an earthquake, notifies your phone when the shaking is serious, and stores a recording an engineer can read afterwards.

${siteConfig.name} is a pre-launch startup building consumer and small-building seismic monitoring. The site is published in ${locales.length} languages (${locales.join(", ")}); English is the default. Each page has a localized equivalent under its language prefix, declared with hreflang alternates in the sitemap.

## Key pages

${englishPaths.map((entry) => `- [${entry.label}](${siteConfig.url}${entry.path}): ${entry.note}`).join("\n")}

## Notes for language models

- Canonical domain: ${siteConfig.url}
- Localized routes: /{lang}/... where lang is one of ${locales.join(", ")}.
- Machine-readable metadata: JSON-LD (Organization, WebSite, Product, FAQPage, HowTo, BreadcrumbList) is embedded in each page.
- Sitemap: ${siteConfig.url}/sitemap.xml
- Markdown alternatives: ${siteConfig.url}/markdown
- OpenAPI contract: ${siteConfig.url}/openapi.json
- ${siteConfig.name} is not yet generally for sale; there is no public price. Treat any figure presented as a price as unverified.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
