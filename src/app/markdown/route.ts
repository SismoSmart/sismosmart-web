import {
  getMarkdownUrl,
  markdownPageKeys,
} from "@/lib/agent-discovery";
import { getPages } from "@/lib/pages";
import { localeLabels, locales, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET(): Response {
  const sections = locales
    .map((locale) => {
      const pages = getPages(locale);
      const links = markdownPageKeys
        .map(
          (pageKey) =>
            `- [${pages[pageKey].title}](${getMarkdownUrl(locale, pageKey)})`,
        )
        .join("\n");

      return `## ${localeLabels[locale]}\n\n${links}`;
    })
    .join("\n\n");

  const body = `# ${siteConfig.name} Markdown alternatives

> Localized Markdown views generated from the same public page copy used by the HTML website.

${sections}

## Other machine-readable resources

- [OpenAPI contract](${siteConfig.url}/openapi.json)
- [Concise LLM summary](${siteConfig.url}/llms.txt)
- [Expanded LLM context](${siteConfig.url}/llms-full.txt)
`;

  return new Response(body, {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
