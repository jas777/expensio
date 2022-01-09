import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN: string =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: "https://addd5f1e5661401d914f876f253a32d4@o1111252.ingest.sentry.io/6140334",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
