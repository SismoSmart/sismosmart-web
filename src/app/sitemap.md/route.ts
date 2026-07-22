import { getPages, routeSegments, staticPageKeys } from "@/lib/pages";
import { localeLabels, locales, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const englishPages = getPages("en");

function pageUrl(locale: string, segment: string) {
  return segment === "/"
    ? `${siteConfig.url}/${locale}`
    : `${siteConfig.url}/${locale}${segment}`;
}

export function GET(): Response {
  const languages = locales
    .map((locale) => `- [${localeLabels[locale]}](${pageUrl(locale, routeSegments.home)})`)
    .join("\n");

  const pages = staticPageKeys
    .map((key) => {
      const page = englishPages[key];
      return `- [${page.title}](${pageUrl("en", routeSegments[key])}): ${page.description}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name} site map

> Human-readable navigation for ${siteConfig.name}'s public website.

## Languages

${languages}

## English key pages

- [Home](${pageUrl("en", routeSegments.home)}): ${siteConfig.description}
${pages}

## Machine-readable indexes

- [XML sitemap](${siteConfig.url}/sitemap.xml)
- [LLM summary](${siteConfig.url}/llms.txt)
- [Expanded LLM context](${siteConfig.url}/llms-full.txt)
- [Markdown alternatives](${siteConfig.url}/markdown)
- [OpenAPI contract](${siteConfig.url}/openapi.json)
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
