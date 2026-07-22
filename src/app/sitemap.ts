import type { MetadataRoute } from "next";

import { routeSegments, staticPageKeys } from "@/lib/pages";
import { locales, siteConfig } from "@/lib/site";

function languageAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      path === "/" ? `${siteConfig.url}/${locale}` : `${siteConfig.url}/${locale}${path}`,
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
          languages: {
            ...languageAlternates("/"),
            "x-default": `${siteConfig.url}/en`,
          },
      },
    });

    for (const pageKey of staticPageKeys) {
      const path = routeSegments[pageKey];

      entries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: {
            ...languageAlternates(path),
            "x-default": `${siteConfig.url}/en${path}`,
          },
        },
      });
    }
  }

  return entries;
}
