import { NextResponse, type NextRequest } from "next/server.js";

import { resolveAgentPage } from "@/lib/agent-discovery";
import { routeSegments } from "@/lib/pages";

function acceptsMarkdown(acceptHeader: string | null) {
  if (!acceptHeader) return false;

  return acceptHeader.split(",").some((entry) => {
    const [mediaType, ...parameters] = entry
      .trim()
      .split(";")
      .map((part) => part.trim().toLowerCase());
    if (mediaType !== "text/markdown") return false;

    const quality = parameters.find((parameter) => parameter.startsWith("q="));
    return quality !== "q=0" && quality !== "q=0.0" && quality !== "q=0.00";
  });
}

function parseLocalizedPath(pathname: string, directMarkdown: boolean) {
  const expression = directMarkdown
    ? /^\/([a-z]{2})(?:\/([^/]+))?\.md$/
    : /^\/([a-z]{2})(?:\/([^/]+))?\/?$/;
  const match = expression.exec(pathname);
  if (!match) return null;

  const [, locale, segment] = match;
  if (segment === "home") return null;

  return resolveAgentPage(locale, segment ?? null);
}

function internalMarkdownPath(
  resolved: NonNullable<ReturnType<typeof resolveAgentPage>>,
) {
  const page =
    resolved.pageKey === "home"
      ? "home"
      : routeSegments[resolved.pageKey].slice(1);
  return `/markdown/${resolved.locale}/${page}`;
}

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const isDirectMarkdown = pathname.endsWith(".md");
  const shouldNegotiate = acceptsMarkdown(request.headers.get("accept"));
  if (!isDirectMarkdown && !shouldNegotiate) {
    return NextResponse.next();
  }

  const resolved = parseLocalizedPath(pathname, isDirectMarkdown);
  if (!resolved) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = internalMarkdownPath(resolved);
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: [
    "/((?!api(?:/|$)|_next(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$|sitemap\\.md$|llms(?:-full)?\\.txt$|AGENTS\\.md$|openapi\\.json$).*)",
  ],
};
