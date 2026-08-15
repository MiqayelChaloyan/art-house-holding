export type HttpStatusTone = '2xx' | '3xx' | '4xx' | '5xx' | 'unknown';

const STATUS_LABELS: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Request Timeout',
  409: 'Conflict',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

export function getHttpStatusTone(code?: number | null): HttpStatusTone {
  if (code == null || !Number.isFinite(code) || code <= 0) return 'unknown';
  if (code >= 500) return '5xx';
  if (code >= 400) return '4xx';
  if (code >= 300) return '3xx';
  return '2xx';
}

export function getHttpStatusLabel(code?: number | null): string {
  if (code == null || !Number.isFinite(code) || code <= 0) return 'No response';
  return STATUS_LABELS[code] ?? (code >= 200 && code < 300 ? 'OK' : `HTTP ${code}`);
}

export function isHttpStatusSuccess(code?: number | null): boolean {
  return code != null && Number.isFinite(code) && code >= 200 && code < 300;
}

export function formatHttpStatus(code?: number | null): string {
  if (code == null || !Number.isFinite(code) || code <= 0) return '—';
  return `${code} ${getHttpStatusLabel(code)}`;
}
