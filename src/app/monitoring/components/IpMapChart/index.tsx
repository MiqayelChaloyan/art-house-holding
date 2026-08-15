'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiGlobe, FiMapPin } from 'react-icons/fi';

import type { IpActivityItem } from '@/src/lib/analytics/server/queries';

import { useMonitoringTheme } from '../MonitoringThemeProvider';
import { WorldIpMap } from '../WorldIpMap';
import {
  buildCountryCountLookup,
  buildIpMapMarkers,
  getWorldCountryFeatures,
  isExcludedMapCountry,
  type CountryMapDatum,
} from '../../utils/countryMapData';
import { formatCompactNumber } from '../../utils/formatCompactNumber';
import { normalizeIp, resolveIpLocations, type IpGeoLocation } from '../../utils/ipGeo';

import styles from './styles.module.sass';

export type IpMapChartFilter = {
  type: 'ip' | 'country';
  value: string;
};

/** Desktop: 6 rows fit in `--ip-map-panel-height` (480px) with pagination. */
const IP_LIST_PAGE_SIZE_DESKTOP = 6;
const IP_LIST_PAGE_SIZE_MOBILE = 4;
const IP_MAP_MOBILE_QUERY = '(max-width: 960px)';

function buildIpCounts(activity: IpActivityItem[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entry of activity) {
    const ip = normalizeIp(entry.clientIp);
    counts.set(ip, (counts.get(ip) ?? 0) + entry.requestCount);
  }
  return counts;
}

function buildCountryCounts(
  locations: IpGeoLocation[],
  ipCounts: Map<string, number>,
): CountryMapDatum[] {
  const byCountry = new Map<string, CountryMapDatum>();

  for (const location of locations) {
    const code = location.countryCode?.trim().toLowerCase();
    if (!code || isExcludedMapCountry(code)) continue;

    const count = ipCounts.get(location.ip) ?? 0;
    const existing = byCountry.get(code);
    byCountry.set(code, {
      code,
      count: (existing?.count ?? 0) + count,
      name: location.country ?? existing?.name ?? code.toUpperCase(),
    });
  }

  return [...byCountry.values()].sort((left, right) => right.count - left.count);
}

function MapSkeleton() {
  return <div className={styles.mapSkeleton} aria-hidden="true" />;
}

function ListSkeleton() {
  return (
    <div className={styles.listSkeleton}>
      {Array.from({ length: IP_LIST_PAGE_SIZE_DESKTOP }).map((_, index) => (
        <div key={index} className={styles.listSkeletonItem} />
      ))}
    </div>
  );
}

type Props = {
  activity: IpActivityItem[];
  onSelectFilter: (filter: IpMapChartFilter) => void;
};

export function IpMapChart({ activity, onSelectFilter }: Props) {
  const { theme } = useMonitoringTheme();
  const [locations, setLocations] = useState<IpGeoLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIp, setSelectedIp] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [listPage, setListPage] = useState(1);
  const [listPageSize, setListPageSize] = useState(IP_LIST_PAGE_SIZE_DESKTOP);

  useEffect(() => {
    const media = window.matchMedia(IP_MAP_MOBILE_QUERY);
    const syncPageSize = () => {
      setListPageSize(media.matches ? IP_LIST_PAGE_SIZE_MOBILE : IP_LIST_PAGE_SIZE_DESKTOP);
    };
    syncPageSize();
    media.addEventListener('change', syncPageSize);
    return () => media.removeEventListener('change', syncPageSize);
  }, []);

  const ipCounts = useMemo(() => buildIpCounts(activity), [activity]);
  const sortedIps = useMemo(
    () => [...ipCounts.entries()].sort((left, right) => right[1] - left[1]),
    [ipCounts],
  );
  const totalRequests = useMemo(
    () => sortedIps.reduce((sum, [, count]) => sum + count, 0),
    [sortedIps],
  );

  useEffect(() => {
    setSelectedIp(null);
    setSelectedCountry(null);
    setListPage(1);
  }, [activity, listPageSize]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    void resolveIpLocations(sortedIps.map(([ip]) => ip))
      .then((resolved) => {
        if (!cancelled) {
          setLocations(resolved);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLocations([]);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [sortedIps]);

  const countryCounts = useMemo(
    () => buildCountryCounts(locations, ipCounts),
    [locations, ipCounts],
  );

  const mapMarkers = useMemo(
    () => buildIpMapMarkers(locations, ipCounts, getWorldCountryFeatures()),
    [locations, ipCounts],
  );

  const highlightedCountry = useMemo(() => {
    if (selectedCountry) return selectedCountry;
    if (!selectedIp) return null;
    return locations.find((loc) => loc.ip === selectedIp)?.countryCode?.toLowerCase() ?? null;
  }, [locations, selectedCountry, selectedIp]);

  const maxIpCount = sortedIps[0]?.[1] ?? 1;
  const totalListPages = Math.max(1, Math.ceil(sortedIps.length / listPageSize));
  const safeListPage = Math.min(listPage, totalListPages);
  const listPageStart = (safeListPage - 1) * listPageSize;
  const pageIps = sortedIps.slice(listPageStart, listPageStart + listPageSize);
  const listSpacerCount = Math.max(0, listPageSize - pageIps.length);
  const listRangeStart = sortedIps.length === 0 ? 0 : listPageStart + 1;
  const listRangeEnd = Math.min(listPageStart + listPageSize, sortedIps.length);
  const hasLocalOnly = locations.length > 0 && locations.every((location) => location.isLocal);
  const showMap = !loading && (sortedIps.length > 0 || mapMarkers.length > 0);

  const handleSelectIp = useCallback(
    (ip: string) => {
      setSelectedIp(ip);
      setSelectedCountry(null);
      onSelectFilter({ type: 'ip', value: ip });
    },
    [onSelectFilter],
  );

  const handleSelectCountry = useCallback(
    (code: string) => {
      setSelectedCountry(code);
      setSelectedIp(null);
      onSelectFilter({ type: 'country', value: code });
    },
    [onSelectFilter],
  );

  const mapSessionKey = useMemo(
    () => sortedIps.map(([ip]) => ip).join('\u0000') || 'empty',
    [sortedIps],
  );

  return (
    <section className={styles.ipMapCard} aria-label="Client IP map">
      <header className={styles.ipMapHero}>
        <div className={styles.ipMapHeroCopy}>
          <p className={styles.ipMapEyebrow}>
            <FiGlobe size={14} aria-hidden="true" />
            Geographic traffic
          </p>
          <h3 className={styles.ipMapTitle}>Client IP Map</h3>
          <p className={styles.ipMapLede}>
            Click a country or IP dot to filter visitor sessions by geographic traffic.
          </p>
        </div>
        <div className={styles.ipMapStats}>
          <article className={styles.ipMapStat}>
            <span>Countries</span>
            <strong>{countryCounts.length}</strong>
          </article>
          <article className={styles.ipMapStat}>
            <span>Unique IPs</span>
            <strong>{sortedIps.length}</strong>
          </article>
          <article className={`${styles.ipMapStat} ${styles.ipMapStatAccent}`}>
            <span>Requests</span>
            <strong>{formatCompactNumber(totalRequests)}</strong>
          </article>
        </div>
      </header>

      <div className={styles.ipMapBody}>
        <section className={`${styles.ipMapPanel} ${styles.ipMapPanelMap}`} aria-labelledby="ip-map-title">
          <header className={styles.ipMapPanelHead}>
            <div className={styles.ipMapPanelCopy}>
              <h4 id="ip-map-title" className={styles.ipMapPanelTitle}>
                World view
              </h4>
              <p className={styles.ipMapPanelHint}>
                Gray to green = requests by country · green/gold dots = IP locations
              </p>
            </div>
          </header>
          <div className={styles.ipMapMapArea}>
            {loading ? (
              <MapSkeleton />
            ) : !showMap ? (
              <div className={styles.ipMapEmpty}>No IP locations available yet.</div>
            ) : (
              <>
                <WorldIpMap
                  key={mapSessionKey}
                  data={countryCounts}
                  markers={mapMarkers}
                  selectedCode={highlightedCountry}
                  selectedIp={selectedIp}
                  theme={theme}
                  onSelectCountry={handleSelectCountry}
                  onSelectIp={handleSelectIp}
                />
                {hasLocalOnly ? (
                  <div className={styles.ipMapOverlay}>
                    Local/private IPs counted at your network country.
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>

        <aside className={`${styles.ipMapPanel} ${styles.ipMapPanelList}`} aria-labelledby="ip-map-list-title">
          <header className={`${styles.ipMapPanelHead} ${styles.ipMapPanelHeadList}`}>
            <div className={styles.ipMapPanelCopy}>
              <h4 id="ip-map-list-title" className={styles.ipMapPanelTitle}>
                <FiMapPin size={15} aria-hidden="true" />
                IP addresses
              </h4>
              <p className={styles.ipMapPanelHint}>Select an IP to highlight its location</p>
            </div>
          </header>
          <div className={styles.ipMapListBody}>
            <ul className={styles.ipMapList}>
              {loading ? (
                <li>
                  <ListSkeleton />
                </li>
              ) : pageIps.length === 0 ? (
                <li className={styles.ipMapEmptyList}>No IP addresses in this range.</li>
              ) : (
                pageIps.map(([ip, count], index) => {
                  const globalIndex = listPageStart + index;
                  const location = locations.find((loc) => loc.ip === ip);
                  const isActive = selectedIp === ip;
                  const countryCode = location?.countryCode?.toLowerCase() ?? null;
                  const isCountryActive =
                    !isActive &&
                    Boolean(countryCode && highlightedCountry && countryCode === highlightedCountry);
                  const barWidth = maxIpCount > 0 ? Math.max(8, (count / maxIpCount) * 100) : 0;

                  return (
                    <li key={ip}>
                      <button
                        type="button"
                        className={[
                          styles.ipMapItem,
                          isActive ? styles.ipMapItemActive : '',
                          isCountryActive ? styles.ipMapItemCountryActive : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => handleSelectIp(ip)}
                      >
                        <div className={styles.ipMapItemTop}>
                          <span className={styles.ipMapRank}>{globalIndex + 1}</span>
                          <span className={styles.ipMapIp}>{ip}</span>
                          <span className={styles.ipMapCount}>{count}</span>
                        </div>
                        <div className={styles.ipMapBarTrack} aria-hidden="true">
                          <div className={styles.ipMapBarFill} style={{ width: `${barWidth}%` }} />
                        </div>
                        <span className={styles.ipMapMeta}>{location?.label ?? 'Unknown location'}</span>
                      </button>
                    </li>
                  );
                })
              )}
              {!loading && listSpacerCount > 0
                ? Array.from({ length: listSpacerCount }).map((_, index) => (
                    <li key={`spacer-${index}`} className={styles.ipMapListSpacer} aria-hidden="true" />
                  ))
                : null}
            </ul>

            {!loading && sortedIps.length > 0 ? (
              <nav className={styles.ipMapPagination} aria-label="IP address list pagination">
                <span className={styles.ipMapPaginationInfo}>
                  {listRangeStart}–{listRangeEnd} of {sortedIps.length}
                </span>
                <div className={styles.ipMapPaginationControls}>
                  <button
                    type="button"
                    className={styles.ipMapPaginationBtn}
                    disabled={safeListPage <= 1}
                    onClick={() => setListPage((page) => Math.max(1, page - 1))}
                  >
                    Prev
                  </button>
                  <span className={styles.ipMapPaginationPage}>
                    {safeListPage} / {totalListPages}
                  </span>
                  <button
                    type="button"
                    className={styles.ipMapPaginationBtn}
                    disabled={safeListPage >= totalListPages}
                    onClick={() => setListPage((page) => Math.min(totalListPages, page + 1))}
                  >
                    Next
                  </button>
                </div>
              </nav>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  );
}
