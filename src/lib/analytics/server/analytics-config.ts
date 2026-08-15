import { getEventRetentionDays } from '@/src/lib/analytics/server/retention';

export interface MonitoringAnalyticsConfig {
  eventRetentionDays: number;
  dashboardRangeOptions: number[];
  defaultDashboardRangeDays: number;
}

/** Analytics config; retention days follow the current calendar month (28–31). */
export function getMonitoringAnalyticsConfig(): MonitoringAnalyticsConfig {
  const eventRetentionDays = getEventRetentionDays();

  return {
    eventRetentionDays,
    dashboardRangeOptions: [7, eventRetentionDays],
    defaultDashboardRangeDays: eventRetentionDays,
  };
}
