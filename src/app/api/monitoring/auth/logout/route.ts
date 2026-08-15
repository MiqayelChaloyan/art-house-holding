import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { getMonitoringCookieOptions, monitoringCookie } from '@/src/lib/analytics/server/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  cookies().set(monitoringCookie.name, '', {
    ...getMonitoringCookieOptions(request),
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
