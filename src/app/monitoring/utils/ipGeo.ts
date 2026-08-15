export interface IpGeoLocation {
  ip: string;
  lat: number | null;
  lng: number | null;
  label: string;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  isLocal: boolean;
}

interface NetworkLocation {
  label: string;
  country: string | null;
  countryCode: string | null;
  timezone: string | null;
  lat: number | null;
  lng: number | null;
}

interface GeoJsResponse {
  country?: string | null;
  country_code?: string | null;
  timezone?: string | null;
  latitude?: string | number | null;
  longitude?: string | number | null;
  city?: string | null;
  region?: string | null;
}

const cache = new Map<string, IpGeoLocation>();
let networkLocationPromise: Promise<NetworkLocation | null> | null = null;

const GEOJS_IP_URL = 'https://get.geojs.io/v1/ip/geo';
const GEOJS_NETWORK_URL = 'https://get.geojs.io/v1/ip/geo.json';

function getFallbackTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

export function normalizeIp(ip: string): string {
  const trimmed = ip.trim();
  if (trimmed === '::1') return '127.0.0.1';
  if (trimmed.startsWith('::ffff:')) return trimmed.slice(7);
  return trimmed;
}

export function isPrivateIp(ip: string): boolean {
  const normalized = normalizeIp(ip);
  if (normalized === '127.0.0.1' || normalized === 'localhost' || normalized === 'unknown') {
    return true;
  }
  if (normalized.startsWith('10.')) return true;
  if (normalized.startsWith('192.168.')) return true;
  if (normalized.startsWith('172.')) {
    const second = Number(normalized.split('.')[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

function normalizeTimezone(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readCountryFields(data: GeoJsResponse): { country: string | null; countryCode: string | null } {
  const country = data.country?.trim() || null;
  const countryCode = data.country_code?.trim().toUpperCase() || null;
  return { country, countryCode };
}

function parseGeoResponse(normalized: string, data: GeoJsResponse): IpGeoLocation | null {
  const lat = data.latitude != null ? Number(data.latitude) : NaN;
  const lng = data.longitude != null ? Number(data.longitude) : NaN;
  const { country, countryCode } = readCountryFields(data);
  const timezone = normalizeTimezone(data.timezone);
  const label =
    [data.city, data.region, country].filter(Boolean).join(', ') ||
    country ||
    countryCode ||
    normalized;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    if (!country && !countryCode && !timezone) return null;
    return {
      ip: normalized,
      lat: null,
      lng: null,
      label,
      country,
      countryCode,
      timezone,
      isLocal: false,
    };
  }

  return {
    ip: normalized,
    lat,
    lng,
    label,
    country,
    countryCode,
    timezone,
    isLocal: false,
  };
}

async function fetchGeoJson(url: string): Promise<GeoJsResponse | null> {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) return null;
  return (await response.json()) as GeoJsResponse;
}

async function fetchNetworkLocation(): Promise<NetworkLocation | null> {
  if (!networkLocationPromise) {
    networkLocationPromise = fetchGeoJson(GEOJS_NETWORK_URL)
      .then((data) => {
        if (!data) return null;
        const lat = data.latitude != null ? Number(data.latitude) : NaN;
        const lng = data.longitude != null ? Number(data.longitude) : NaN;
        const { country, countryCode } = readCountryFields(data);
        const timezone = normalizeTimezone(data.timezone);
        const label = [data.city, data.region, country].filter(Boolean).join(', ') || country || 'Network';
        return {
          label,
          country,
          countryCode,
          timezone,
          lat: Number.isFinite(lat) ? lat : null,
          lng: Number.isFinite(lng) ? lng : null,
        };
      })
      .catch(() => null);
  }

  return networkLocationPromise;
}

async function resolveLocalIpLocation(normalized: string): Promise<IpGeoLocation> {
  const network = await fetchNetworkLocation();
  if (network) {
    const resolved: IpGeoLocation = {
      ip: normalized,
      lat: network.lat,
      lng: network.lng,
      label: network.label,
      country: network.country,
      countryCode: network.countryCode,
      timezone: network.timezone,
      isLocal: true,
    };
    cache.set(normalized, resolved);
    return resolved;
  }

  const fallback: IpGeoLocation = {
    ip: normalized,
    lat: null,
    lng: null,
    label: normalized,
    country: null,
    countryCode: null,
    timezone: getFallbackTimezone(),
    isLocal: true,
  };
  cache.set(normalized, fallback);
  return fallback;
}

export async function resolveIpLocation(ip: string): Promise<IpGeoLocation> {
  const normalized = normalizeIp(ip);
  const cached = cache.get(normalized);
  if (cached) return cached;

  if (isPrivateIp(normalized)) {
    return resolveLocalIpLocation(normalized);
  }

  try {
    const data = await fetchGeoJson(`${GEOJS_IP_URL}/${encodeURIComponent(normalized)}.json`);
    if (data) {
      const resolved = parseGeoResponse(normalized, data);
      if (resolved) {
        cache.set(normalized, resolved);
        return resolved;
      }
    }
  } catch {
    // fall through
  }

  const unknown: IpGeoLocation = {
    ip: normalized,
    lat: null,
    lng: null,
    label: normalized,
    country: null,
    countryCode: null,
    timezone: null,
    isLocal: false,
  };
  cache.set(normalized, unknown);
  return unknown;
}

async function runWithConcurrencyCollect<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  const queue = items.map((item, index) => ({ item, index }));
  const poolSize = Math.min(Math.max(1, limit), queue.length);

  await Promise.all(
    Array.from({ length: poolSize }, async () => {
      while (queue.length > 0) {
        const next = queue.shift();
        if (!next) return;
        results[next.index] = await worker(next.item);
      }
    }),
  );

  return results;
}

export async function resolveIpLocations(ips: string[]): Promise<IpGeoLocation[]> {
  const unique = [...new Set(ips.map(normalizeIp))];
  return runWithConcurrencyCollect(unique, 8, (ip) => resolveIpLocation(ip));
}
