'use client';

import { geoNaturalEarth1, type GeoProjection, type GeoPermissibleObjects } from 'd3-geo';
import { memo, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

import {
  buildCountryCountLookup,
  isExcludedMapCountry,
  normalizeCountryNumericId,
  numericIdToCountryCode,
  type CountryMapDatum,
  type IpMapMarker,
} from '../../utils/countryMapData';

import styles from './styles.module.sass';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

type Props = {
  data: CountryMapDatum[];
  markers: IpMapMarker[];
  selectedCode?: string | null;
  selectedIp?: string | null;
  theme: 'light' | 'dark';
  onSelectCountry?: (code: string) => void;
  onSelectIp?: (ip: string) => void;
};

function countryFill(
  count: number,
  maxCount: number,
  selected: boolean,
  theme: 'light' | 'dark',
): string {
  if (selected) return theme === 'dark' ? '#fbbf24' : '#d97706';
  if (count <= 0) return theme === 'dark' ? '#2a2a2a' : '#eef0f3';
  const ratio = Math.min(1, count / maxCount);
  const alpha = 0.18 + ratio * 0.72;
  return theme === 'dark'
    ? `rgba(74, 222, 128, ${alpha})`
    : `rgba(22, 163, 74, ${alpha})`;
}

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;
const MAP_PADDING = 12;

function createMapProjection(): GeoProjection {
  return geoNaturalEarth1().fitExtent(
    [
      [MAP_PADDING, MAP_PADDING],
      [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING],
    ],
    {
      type: 'MultiPoint',
      coordinates: [
        [-165, 72],
        [165, 72],
        [165, -35],
        [-165, -35],
      ],
    } as GeoPermissibleObjects,
  );
}

function WorldIpMapComponent({
  data,
  markers,
  selectedCode = null,
  selectedIp = null,
  theme,
  onSelectCountry,
  onSelectIp,
}: Props) {
  const normalizedSelectedCode = selectedCode?.toLowerCase() ?? null;
  const maxCount = Math.max(1, ...data.map((country) => country.count));
  const countryLookup = useMemo(() => buildCountryCountLookup(data), [data]);
  const projection = useMemo(() => createMapProjection(), []);

  return (
    <div className={styles.worldMap} aria-label="World IP choropleth map">
      <div className={styles.worldMapFrame}>
        <ComposableMap
          projection={projection}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
          className={styles.worldMapSvg}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => {
                  const code = numericIdToCountryCode(String(geo.id ?? ''));
                  return !isExcludedMapCountry(code);
                })
                .map((geo) => {
                const numericId = normalizeCountryNumericId(geo.id) ?? '';
                const count = numericId ? (countryLookup.get(numericId) ?? 0) : 0;
                const code = numericIdToCountryCode(numericId);
                const selected = Boolean(code && code === normalizedSelectedCode);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={countryFill(count, maxCount, selected, theme)}
                    stroke={theme === 'dark' ? '#3f3f46' : '#d1d5db'}
                    strokeWidth={0.4}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        fill: countryFill(Math.max(count, 1), maxCount, selected, theme),
                        outline: 'none',
                        cursor: code && count > 0 ? 'pointer' : 'default',
                      },
                      pressed: { outline: 'none' },
                    }}
                    onClick={() => {
                      if (code && count > 0) onSelectCountry?.(code);
                    }}
                  />
                );
              })
            }
          </Geographies>

          {markers.map((marker) => {
            const selected = marker.ip === selectedIp;
            return (
              <Marker
                key={marker.ip}
                coordinates={[marker.longitude, marker.latitude]}
                onClick={() => onSelectIp?.(marker.ip)}
              >
                <circle
                  r={selected ? 7 : 4.5}
                  fill={selected ? '#fbbf24' : '#22c55e'}
                  stroke={theme === 'dark' ? '#111827' : '#ffffff'}
                  strokeWidth={selected ? 2.5 : 2}
                  style={{ cursor: 'pointer' }}
                />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
}

export const WorldIpMap = memo(WorldIpMapComponent);
