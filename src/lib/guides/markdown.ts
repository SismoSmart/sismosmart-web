import type { GuideContent, GuideLocale } from "@/lib/guides/types";
import {
  getGuideByTranslationKey,
  getGuideCanonicalPath,
  getGuideHub,
  getGuides,
  getGuidesByCategory,
} from "@/lib/guides/catalog";
import { getGuideUiStrings } from "@/lib/guides/ui-strings";
import { siteConfig, safetyNotices, productStageNotices } from "@/lib/site";

function escapeYaml(value: string) {
  return JSON.stringify(value.replaceAll("\r\n", "\n").replaceAll("\r", "\n"));
}

function hubPublishedAt(locale: GuideLocale): string {
  const guides = getGuides(locale);
  return guides.reduce(
    (min, g) => (g.publishedAt < min ? g.publishedAt : min),
    guides[0].publishedAt,
  );
}

function hubLastUpdated(locale: GuideLocale): string {
  const guides = getGuides(locale);
  return guides.reduce(
    (max, g) => (g.updatedAt > max ? g.updatedAt : max),
    guides[0].updatedAt,
  );
}

function renderRelatedGuideLinks(
  relatedKeys: readonly string[],
  guide: GuideContent,
): string {
  return relatedKeys
    .map((key) => {
      const related = getGuideByTranslationKey(
        guide.locale,
        key as GuideContent["translationKey"],
      );
      const path = getGuideCanonicalPath(related);
      return `- [${related.h1}](${siteConfig.url}${path})`;
    })
    .join("\n");
}

export function renderGuideHubMarkdown(locale: GuideLocale): string {
  const hub = getGuideHub(locale);
  const ui = getGuideUiStrings(locale);
  const commercialGuides = getGuidesByCategory(locale, "commercial");
  const technicalGuides = getGuidesByCategory(locale, "technical");
  const canonicalUrl = `${siteConfig.url}/${locale}/guides`;
  const publishedAt = hubPublishedAt(locale);
  const lastUpdated = hubLastUpdated(locale);

  const commercialLinks = commercialGuides
    .map((g) => {
      const path = getGuideCanonicalPath(g);
      return `- [${g.h1}](${siteConfig.url}${path})`;
    })
    .join("\n");

  const technicalLinks = technicalGuides
    .map((g) => {
      const path = getGuideCanonicalPath(g);
      return `- [${g.h1}](${siteConfig.url}${path})`;
    })
    .join("\n");

  const relatedResources = `- [${ui.product}](${siteConfig.url}/${locale}/product)
- [${ui.technology}](${siteConfig.url}/${locale}/technology)
- [${ui.howItWorks}](${siteConfig.url}/${locale}/how-it-works)
- [${ui.faq}](${siteConfig.url}/${locale}/faq)
- [${ui.glossary}](${siteConfig.url}/${locale}/glossary)
- [${ui.pilotProgram}](${siteConfig.url}/${locale}/pilot-program)`;

  return `---
title: ${escapeYaml(hub.title)}
description: ${escapeYaml(hub.description)}
locale: ${locale}
canonical_url: ${escapeYaml(canonicalUrl)}
published_at: ${escapeYaml(publishedAt)}
last_updated: ${escapeYaml(lastUpdated)}
---

# ${hub.h1}

> ${hub.intro}

## ${hub.commercialHeading}

${commercialLinks}

## ${hub.technicalHeading}

${technicalLinks}

## ${hub.relatedResourcesHeading}

${relatedResources}

## Sitemap

- [Canonical HTML page](${canonicalUrl})
- [XML sitemap](${siteConfig.url}/sitemap.xml)
- [Human-readable sitemap](${siteConfig.url}/sitemap.md)
- [Markdown index](${siteConfig.url}/markdown)
`;
}

export function renderGuideMarkdown(guide: GuideContent): string {
  const ui = getGuideUiStrings(guide.locale);
  const canonicalPath = getGuideCanonicalPath(guide);
  const canonicalUrl = `${siteConfig.url}${canonicalPath}`;

  const keyTakeaways = guide.keyTakeaways
    .map((item) => `- ${item}`)
    .join("\n");

  const sections = guide.sections
    .filter((section) => section.heading !== ui.limitations)
    .map((section) => {
      const body = section.paragraphs.join("\n\n");
      const bullets = section.bullets?.length
        ? `\n\n${section.bullets.map((b) => `- ${b}`).join("\n")}`
        : "";
      return `## ${section.heading}\n\n${body}${bullets}`;
    })
    .join("\n\n");

  const limitations = guide.limitations.map((l) => `- ${l}`).join("\n");
  const sismosmartFit = guide.sismosmartFit.map((s) => `- ${s}`).join("\n");
  const relatedGlossaryTerms = guide.relatedGlossaryTerms
    .map((term) => `- [${term}](${siteConfig.url}/${guide.locale}/glossary)`)
    .join("\n");
  const relatedGuides = renderRelatedGuideLinks(guide.relatedGuides, guide);
  const references = guide.references
    .map(
      (ref) =>
        `- [${ref.label}](${ref.url}) — ${ref.organization}`,
    )
    .join("\n");

  return `---
title: ${escapeYaml(guide.title)}
description: ${escapeYaml(guide.description)}
locale: ${guide.locale}
canonical_url: ${escapeYaml(canonicalUrl)}
published_at: ${escapeYaml(guide.publishedAt)}
last_updated: ${escapeYaml(guide.updatedAt)}
---

# ${guide.h1}

> ${guide.summary}

## ${ui.keyTakeaways}

${keyTakeaways}

${sections}

## ${ui.limitations}

${limitations}

## ${ui.sismosmartFit}

${sismosmartFit}

## ${ui.relatedGlossaryTerms}

${relatedGlossaryTerms}

## ${ui.relatedGuides}

${relatedGuides}

## ${ui.references}

${references}

## ${ui.safetyNotice}

${guide.safetyNotice}

${safetyNotices[guide.locale]}

${productStageNotices[guide.locale]}

**${guide.cta.label}:** ${guide.cta.description} [${guide.cta.label}](${siteConfig.url}${guide.cta.href})

## Sitemap

- [Canonical HTML page](${canonicalUrl})
- [XML sitemap](${siteConfig.url}/sitemap.xml)
- [Human-readable sitemap](${siteConfig.url}/sitemap.md)
- [Markdown index](${siteConfig.url}/markdown)
`;
}
