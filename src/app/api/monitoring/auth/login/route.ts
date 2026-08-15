import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { assertAllowedAppHost } from '@/src/lib/analytics/server/app-hosts';
import { createSessionToken, getMonitoringCookieOptions, monitoringCookie } from '@/src/lib/analytics/server/auth';
import { verifyMonitoringCredentials } from '@/src/lib/analytics/server/credentials';
import { clearAttempts, getClientIp, checkRateLimit, recordFailedAttempt } from '@/src/lib/analytics/server/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CSRF_HEADER = 'x-monitoring-csrf';

export async function POST(request: Request) {
  try {
    if (!assertAllowedAppHost(request)) {
      return NextResponse.json(
        { ok: false, error: 'Monitoring is only available on localhost:3000, localhost:3001, and arthouse.am.' },
        { status: 403 },
      );
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);

    if (!rate.allowed) {
      return NextResponse.json(
        { ok: false, error: 'Too many login attempts. Try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((rate.retryAfterMs ?? 0) / 1000)),
          },
        },
      );
    }

    const csrfHeader = request.headers.get(CSRF_HEADER);
    if (!csrfHeader || csrfHeader !== 'monitoring-login') {
      return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 403 });
    }

    const body = await request.json();
    const username = typeof body.username === 'string' ? body.username.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const auth = await verifyMonitoringCredentials(username, password);

    if (!auth.ok) {
      recordFailedAttempt(ip);
      return NextResponse.json({ ok: false, error: auth.error ?? 'Invalid credentials' }, { status: 401 });
    }

    clearAttempts(ip);
    const token = await createSessionToken();

    cookies().set(monitoringCookie.name, token, getMonitoringCookieOptions(request));

    return NextResponse.json({ ok: true });
  } catch (error) {
    const isConfigError =
      error instanceof Error &&
      (error.message === 'SANITY_SERVER_TOKEN_MISSING' ||
        error.message.includes('MONITORING_SESSION_SECRET'));

    return NextResponse.json(
      {
        ok: false,
        error: isConfigError
          ? 'Monitoring is temporarily unavailable. Contact an administrator.'
          : 'Login failed. Please try again.',
      },
      { status: 500 },
    );
  }
}
