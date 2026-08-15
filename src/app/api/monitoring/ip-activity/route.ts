import { NextResponse } from 'next/server';

import { getMonitoringAnalyticsConfig } from '@/src/lib/analytics/server/analytics-config';
import { getIpActivity } from '@/src/lib/analytics/server/queries';
import { isMonitoringApiAuthenticated } from '@/src/lib/analytics/server/session-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authed = await isMonitoringApiAuthenticated(request);
  if (!authed) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const analyticsConfig = await getMonitoringAnalyticsConfig();
  const { searchParams } = new URL(request.url);
  const requestedDays = Number(searchParams.get('days') ?? analyticsConfig.defaultDashboardRangeDays);
  const allowed = analyticsConfig.dashboardRangeOptions;
  const days = allowed.includes(requestedDays)
    ? requestedDays
    : analyticsConfig.defaultDashboardRangeDays;

  try {
    const { data, meta } = await getIpActivity(days);
    return NextResponse.json({ ok: true, data, meta, days });
  } catch (error) {
    console.error('[monitoring/ip-activity]', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to load IP activity' },
      { status: 500 },
    );
  }
}
