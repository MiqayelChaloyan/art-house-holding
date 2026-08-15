export function normalizeClientIp(ip?: string | null): string {
  const value = ip?.trim();
  if (!value) return 'unknown';
  if (value === '::1') return '127.0.0.1';
  if (value.startsWith('::ffff:')) return value.slice(7);
  return value;
}

export function formatClientIp(ip?: string | null): string {
  const normalized = normalizeClientIp(ip);
  return normalized === 'unknown' ? '—' : normalized;
}

export function isUsableClientIp(ip?: string | null): boolean {
  const normalized = normalizeClientIp(ip);
  return normalized !== 'unknown';
}
