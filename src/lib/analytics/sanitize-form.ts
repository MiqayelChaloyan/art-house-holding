const SENSITIVE_KEY_PATTERN = /password|secret|token|credential|passwd/i;

export function sanitizeFormRequestBody(
  body: Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  if (!body || typeof body !== 'object') return undefined;

  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(body)) {
    if (SENSITIVE_KEY_PATTERN.test(key)) continue;

    if (typeof value === 'string') {
      sanitized[key] = value.slice(0, 500);
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (value === null) {
      sanitized[key] = null;
    }
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

export function sanitizeResponseMessage(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.slice(0, 500).trim() || undefined;
}
