/** Hosts where the monitoring dashboard and session cookies are allowed. */
export const ALLOWED_APP_HOSTS = {
  production: ['arthouse.am', 'www.arthouse.am'] as const,
  localPorts: [3000, 3001] as const,
} as const;

export function isLocalAppHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

export function isProductionAppHost(hostname: string): boolean {
  return (ALLOWED_APP_HOSTS.production as readonly string[]).includes(hostname);
}

export function isAllowedAppHost(hostname: string, port?: string): boolean {
  if (isProductionAppHost(hostname)) {
    return true;
  }

  if (isLocalAppHost(hostname)) {
    const raw = port ? Number(port) : 3000;
    const resolvedPort = raw === 80 || raw === 443 ? 3000 : raw;
    return (ALLOWED_APP_HOSTS.localPorts as readonly number[]).includes(resolvedPort);
  }

  return false;
}

export function resolveRequestHost(request: Request): { hostname: string; port: string } {
  const url = new URL(request.url);
  const port = url.port || (url.protocol === 'https:' ? '443' : '80');
  return { hostname: url.hostname, port };
}

export function assertAllowedAppHost(request: Request): boolean {
  const { hostname, port } = resolveRequestHost(request);
  return isAllowedAppHost(hostname, port);
}

/** Secure cookies only on production domain over HTTPS — not on localhost. */
export function shouldUseSecureMonitoringCookie(request: Request): boolean {
  const { hostname } = resolveRequestHost(request);
  if (!isProductionAppHost(hostname)) {
    return false;
  }

  const url = new URL(request.url);
  const forwardedProto = request.headers.get('x-forwarded-proto');
  return forwardedProto === 'https' || url.protocol === 'https:';
}

export function getAppHostLabel(request: Request): string {
  const { hostname, port } = resolveRequestHost(request);
  if (isLocalAppHost(hostname)) {
    return `localhost:${port === '80' ? '3000' : port}`;
  }
  return hostname === 'www.arthouse.am' ? 'arthouse.am' : hostname;
}
