import { NextResponse } from 'next/server';

import { getMonitoringAnalyticsConfig } from '@/src/lib/analytics/server/analytics-config';
import {
  getMonitoringTableData,
  type MonitoringTableId,
} from '@/src/lib/analytics/server/queries';
import { isMonitoringApiAuthenticated } from '@/src/lib/analytics/server/session-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TABLE_IDS = new Set<MonitoringTableId>(['visitors', 'pages', 'buttons', 'forms', 'events']);

export async function GET(request: Request) {
  const authed = await isMonitoringApiAuthenticated(request);
  if (!authed) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const analyticsConfig = await getMonitoringAnalyticsConfig();
  const { searchParams } = new URL(request.url);

  const table = searchParams.get('table') as MonitoringTableId | null;
  if (!table || !TABLE_IDS.has(table)) {
    return NextResponse.json({ ok: false, error: 'Invalid table' }, { status: 400 });
  }

  const requestedDays = Number(searchParams.get('days') ?? analyticsConfig.defaultDashboardRangeDays);
  const allowed = analyticsConfig.dashboardRangeOptions;
  const days = allowed.includes(requestedDays)
    ? requestedDays
    : analyticsConfig.defaultDashboardRangeDays;

  const page = Number(searchParams.get('page') ?? 1);
  const limit = Number(searchParams.get('limit') ?? 10);
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;
  const sortDirParam = searchParams.get('sortDir');
  const sortDir = sortDirParam === 'asc' || sortDirParam === 'desc' ? sortDirParam : undefined;

  try {
    const result = await getMonitoringTableData({
      table,
      days,
      page,
      limit,
      search,
      sort,
      sortDir,
    });

    return NextResponse.json({
      ok: true,
      table,
      days,
      rows: result.rows,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('[monitoring/table]', error);
    return NextResponse.json({ ok: false, error: 'Failed to load table data' }, { status: 500 });
  }
}
