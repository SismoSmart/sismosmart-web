import * as Sentry from "@sentry/nextjs";

/**
 * Edge-runtime Sentry init for any route explicitly configured for the edge runtime.
 * Inert unless SENTRY_DSN is set. See sentry.server.config.ts for why there is
 * no browser config.
 */
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  });
}
