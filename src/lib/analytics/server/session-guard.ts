import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  getSessionTokenFromCookie,
  monitoringCookie,
  verifySessionToken,
} from '@/src/lib/analytics/server/auth';

export async function requireMonitoringSession(): Promise<void> {
  const token = getSessionTokenFromCookie(cookies().toString());
  if (!token) {
    redirect('/monitoring/auth');
  }

  const valid = await verifySessionToken(token);
  if (!valid) {
    redirect('/monitoring/auth');
  }
}

export async function isMonitoringAuthenticated(): Promise<boolean> {
  const token = cookies().get(monitoringCookie.name)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function isMonitoringApiAuthenticated(request: Request): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie');
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return false;
  return verifySessionToken(token);
}
