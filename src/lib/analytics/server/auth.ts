import { SignJWT, jwtVerify } from 'jose';

import { shouldUseSecureMonitoringCookie } from './app-hosts';

const COOKIE_NAME = 'monitoring_session';
const SESSION_DURATION = '24h';

function getSecret(): Uint8Array {
  const secret = process.env.MONITORING_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('MONITORING_SESSION_SECRET must be at least 32 characters');
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: 'monitoring_admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(getSecret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

export function getMonitoringCookieOptions(request: Request) {
  return {
    httpOnly: true,
    secure: shouldUseSecureMonitoringCookie(request),
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24,
  };
}

export const monitoringCookie = {
  name: COOKIE_NAME,
  /** @deprecated Use getMonitoringCookieOptions(request) for host-aware secure flag */
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24,
  },
};

export function getSessionTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  for (const cookie of cookies) {
    const [name, ...rest] = cookie.split('=');
    if (name === COOKIE_NAME) {
      return rest.join('=');
    }
  }
  return null;
}
