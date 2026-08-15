import { normalizeClientIp } from '@/src/lib/analytics/client-ip';

function firstForwardedIp(value: string | null): string | undefined {
  if (!value) return undefined;
  const ip = value.split(',')[0]?.trim();
  return ip || undefined;
}

function localDevFallback(request: Request): string | undefined {
  try {
    const { hostname } = new URL(request.url);
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return '127.0.0.1';
    }
  } catch {
    // ignore
  }
  return undefined;
}

/** Resolve client IP from an incoming Request (monitoring_system sanitize.getClientIp pattern). */
export function getClientIp(request: Request): string {
  const headerCandidates = [
    request.headers.get('x-forwarded-for'),
    request.headers.get('x-real-ip'),
    request.headers.get('cf-connecting-ip'),
    request.headers.get('x-vercel-forwarded-for'),
    request.headers.get('true-client-ip'),
  ];

  for (const candidate of headerCandidates) {
    const fromForwarded = firstForwardedIp(candidate);
    if (fromForwarded) {
      return normalizeClientIp(fromForwarded);
    }
  }

  return normalizeClientIp(localDevFallback(request));
}
