import * as Sentry from "@sentry/nextjs";

/**
 * Server-runtime Sentry init. Only runs when SENTRY_DSN is set, so local dev
 * and any environment without the secret stay completely inert. This is the
 * Node.js side; the edge runtime has its own config.
 *
 * The browser SDK is intentionally not installed: the site ships almost no
 * client JS and a browser bundle would work against the Lighthouse budget, so
 * we capture server and edge errors only.
 */
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    // Keep tracing light on a mostly-static server; errors are the goal here.
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  });
}
