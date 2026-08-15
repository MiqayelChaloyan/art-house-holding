/** Full analytics path host label, e.g. localhost or arthouse.am */
export function getAnalyticsHostLabel(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const { hostname } = window.location;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'localhost';
  }

  if (hostname === 'www.arthouse.am') {
    return 'arthouse.am';
  }

  return hostname;
}

const HOST_PREFIX =
  /^(localhost(?::\d+)?|127\.0\.0\.1(?::\d+)?|(?:www\.)?arthouse\.am)(?=\/)/;

/** Strip host prefix from a full analytics path. */
export function stripAnalyticsHost(fullPath: string): string {
  if (!fullPath || fullPath.startsWith('/')) {
    return fullPath;
  }

  const match = fullPath.match(HOST_PREFIX);
  if (!match) {
    return fullPath;
  }

  return fullPath.slice(match[0].length);
}

/**
 * Full client path with host, e.g.
 * localhost/am/language or arthouse.am/am/design/contact?ref=home
 */
export function resolveAnalyticsPath(page?: string): string {
  if (typeof window === 'undefined') {
    return page ?? '';
  }

  let pathPart = page ?? `${window.location.pathname}${window.location.search}`;

  if (page && !page.includes('?') && window.location.search) {
    pathPart = `${page}${window.location.search}`;
  }

  if (HOST_PREFIX.test(pathPart)) {
    return pathPart;
  }

  const normalizedPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  return `${getAnalyticsHostLabel()}${normalizedPath}`;
}
