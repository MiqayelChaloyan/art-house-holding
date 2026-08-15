import { NextResponse } from 'next/server';

import { deleteEventsOlderThan } from '@/src/lib/analytics/server/ingest';
import { getMonitoringAnalyticsConfig } from '@/src/lib/analytics/server/analytics-config';
import { getEventRetentionCutoff } from '@/src/lib/analytics/server/retention';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const authHeader = request.headers.get('authorization');
  if (authHeader === `Bearer ${secret}`) return true;

  const cronHeader = request.headers.get('x-cron-secret');
  return cronHeader === secret;
}

export async function GET(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const analyticsConfig = getMonitoringAnalyticsConfig();
  const cutoff = getEventRetentionCutoff();

  const results: Record<string, unknown> = {
    cutoff: cutoff.toISOString(),
    analyticsConfig,
  };

  try {
    const deletedCount = await deleteEventsOlderThan(cutoff.toISOString());
    results.deletedEvents = deletedCount;

    return NextResponse.json({ ok: true, ...results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Cleanup failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}
