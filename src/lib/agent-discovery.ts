import { routeSegments, type StaticPageKey } from "@/lib/pages";
import { siteConfig, type Locale } from "@/lib/site";

export const markdownPageKeys = [
  "product",
  "howItWorks",
  "technology",
  "faq",
  "privacy",
  "security",
] as const satisfies readonly StaticPageKey[];

export type MarkdownPageKey = (typeof markdownPageKeys)[number];

const markdownPageKeySet = new Set<StaticPageKey>(markdownPageKeys);

export function isMarkdownPageKey(
  pageKey: StaticPageKey,
): pageKey is MarkdownPageKey {
  return markdownPageKeySet.has(pageKey);
}

export function getMarkdownPath(
  locale: Locale,
  pageKey: MarkdownPageKey,
) {
  return `/markdown/${locale}/${routeSegments[pageKey].slice(1)}`;
}

export function getMarkdownUrl(
  locale: Locale,
  pageKey: MarkdownPageKey,
) {
  return `${siteConfig.url}${getMarkdownPath(locale, pageKey)}`;
}

export function getMarkdownAlternativeUrl(
  locale: Locale,
  path: string,
) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const pageKey = markdownPageKeys.find(
    (candidate) => routeSegments[candidate] === normalizedPath,
  );

  return pageKey ? getMarkdownUrl(locale, pageKey) : null;
}
