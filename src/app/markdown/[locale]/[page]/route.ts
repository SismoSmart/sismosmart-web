import {
  isMarkdownPageKey,
  markdownPageKeys,
} from "@/lib/agent-discovery";
import { renderPageMarkdown } from "@/lib/markdown-content";
import {
  resolveStaticPageKey,
  routeSegments,
} from "@/lib/pages";
import { isLocale, locales } from "@/lib/site";

export const dynamic = "force-static";

type MarkdownRouteContext = {
  params: Promise<{ locale: string; page: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    markdownPageKeys.map((pageKey) => ({
      locale,
      page: routeSegments[pageKey].slice(1),
    })),
  );
}

export async function GET(
  _request: Request,
  { params }: MarkdownRouteContext,
): Promise<Response> {
  const { locale, page } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found\n", {
      headers: { "content-type": "text/plain; charset=utf-8" },
      status: 404,
    });
  }

  const pageKey = resolveStaticPageKey(page);
  if (!pageKey || !isMarkdownPageKey(pageKey)) {
    return new Response("Not found\n", {
      headers: { "content-type": "text/plain; charset=utf-8" },
      status: 404,
    });
  }

  return new Response(renderPageMarkdown(locale, pageKey), {
    headers: {
      "cache-control": "public, max-age=3600",
      "content-type": "text/markdown; charset=utf-8",
    },
  });
}
