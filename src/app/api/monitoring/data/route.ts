import { NextResponse } from 'next/server';

import { getMonitoringDashboardData } from '@/src/lib/analytics/server/queries';
import { getMonitoringAnalyticsConfig } from '@/src/lib/analytics/server/analytics-config';
import { isMonitoringApiAuthenticated } from '@/src/lib/analytics/server/session-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authed = await isMonitoringApiAuthenticated(request);
  if (!authed) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const analyticsConfig = getMonitoringAnalyticsConfig();
  const { searchParams } = new URL(request.url);
  const requestedDays = Number(searchParams.get('days') ?? analyticsConfig.defaultDashboardRangeDays);
  const allowed = analyticsConfig.dashboardRangeOptions;
  const days = allowed.includes(requestedDays)
    ? requestedDays
    : analyticsConfig.defaultDashboardRangeDays;

  try {
    const data = await getMonitoringDashboardData(days);
    return NextResponse.json({ ok: true, data, config: analyticsConfig, days });
  } catch (error) {
    console.error('[monitoring/data]', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load analytics data' },
      { status: 500 },
    );
  }
}
