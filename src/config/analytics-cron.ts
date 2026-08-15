/**
 * Analytics cron defaults.
 *
 * Event retention is automatic: data older than the current calendar month
 * is deleted daily (28–31 days depending on the month).
 * See `src/lib/analytics/server/retention.ts`.
 */
export const analyticsCronConfig = {
  /** Daily cleanup schedule is configured in vercel.json (03:00 UTC). */
  cleanupCronSchedule: '0 3 * * *',
} as const;
