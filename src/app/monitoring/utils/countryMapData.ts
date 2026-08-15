import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { geoCentroid, type GeoPermissibleObjects } from 'd3-geo';
import { feature as topojsonFeature } from 'topojson-client';
import countries50m from 'world-atlas/countries-50m.json';

countries.registerLocale(enLocale as Parameters<typeof countries.registerLocale>[0]);

export type CountryMapDatum = {
  code: string;
  count: number;
  name?: string;
};

type WorldAtlas = {
  objects: {
    countries: object;
  };
};

export type CountryFeature = {
  id?: string;
  properties: {
    name?: string;
  };
  type: string;
  geometry: object;
};

let cachedCountryFeatures: CountryFeature[] | null = null;

export function getWorldCountryFeatures(): CountryFeature[] {
  if (!cachedCountryFeatures) {
    const atlas = countries50m as WorldAtlas;
    const collection = topojsonFeature(
      countries50m as unknown as Parameters<typeof topojsonFeature>[0],
      atlas.objects.countries as Parameters<typeof topojsonFeature>[1],
    ) as { features: CountryFeature[] };
    cachedCountryFeatures = collection.features;
  }
  return cachedCountryFeatures;
}

export function normalizeCountryNumericId(id: string | number | undefined): string | null {
  if (id == null) return null;
  const raw = String(id).trim();
  if (!/^\d+$/.test(raw)) return null;
  return raw.padStart(3, '0');
}

/** Territories excluded from choropleth — keeps the map focused on inhabited land. */
export const EXCLUDED_MAP_COUNTRY_CODES = new Set(['aq', 'tf', 'hm', 'bv', 'gs']);

export function isExcludedMapCountry(code: string | null | undefined): boolean {
  if (!code) return false;
  return EXCLUDED_MAP_COUNTRY_CODES.has(code.trim().toLowerCase());
}

export function countryCodeToNumeric(code: string): string | null {
  const normalized = countries.alpha2ToNumeric(code.toUpperCase());
  return normalized ? normalizeCountryNumericId(normalized) : null;
}

export function numericIdToCountryCode(id: string | number | undefined): string | null {
  const normalized = normalizeCountryNumericId(id);
  if (!normalized) return null;
  const alpha2 = countries.numericToAlpha2(normalized);
  return alpha2 ? alpha2.toLowerCase() : null;
}

export function buildCountryCountLookup(data: CountryMapDatum[]): Map<string, number> {
  const lookup = new Map<string, number>();
  for (const item of data) {
    const numericId = countryCodeToNumeric(item.code);
    if (!numericId) continue;
    lookup.set(numericId, (lookup.get(numericId) ?? 0) + item.count);
  }
  return lookup;
}

export type IpMapMarker = {
  ip: string;
  latitude: number;
  longitude: number;
  count: number;
  label: string;
  countryCode: string | null;
};

export function buildIpMapMarkers(
  locations: Array<{
    ip: string;
    lat: number | null;
    lng: number | null;
    label: string;
    countryCode: string | null;
  }>,
  ipCounts: Map<string, number>,
  worldCountries: CountryFeature[],
): IpMapMarker[] {
  const featureByNumericId = new Map<string, CountryFeature>();
  for (const feature of worldCountries) {
    const numericId = normalizeCountryNumericId(feature.id);
    if (numericId) featureByNumericId.set(numericId, feature);
  }

  return locations
    .map((location) => {
      const count = ipCounts.get(location.ip) ?? 0;
      if (count <= 0) return null;

      let latitude = location.lat;
      let longitude = location.lng;

      if (latitude == null || longitude == null) {
        const code = location.countryCode?.trim().toLowerCase();
        if (!code) return null;
        const numericId = countryCodeToNumeric(code);
        const feature = numericId ? featureByNumericId.get(numericId) : undefined;
        if (!feature) return null;
        [longitude, latitude] = geoCentroid(feature as GeoPermissibleObjects);
      }

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) return null;

      return {
        ip: location.ip,
        latitude,
        longitude,
        count,
        label: location.label,
        countryCode: location.countryCode?.toLowerCase() ?? null,
      };
    })
    .filter((marker): marker is IpMapMarker => marker !== null);
}
