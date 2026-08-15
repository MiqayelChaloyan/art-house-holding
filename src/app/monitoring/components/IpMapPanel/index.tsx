'use client';

import { useCallback, useEffect, useState } from 'react';

import type { IpActivityItem } from '@/src/lib/analytics/server/queries';

import { IpMapChart, type IpMapChartFilter } from '../IpMapChart';

import styles from './styles.module.sass';

type Props = {
  days: number;
  onSelectFilter: (filter: IpMapChartFilter) => void;
};

export function IpMapPanel({ days, onSelectFilter }: Props) {
  const [activity, setActivity] = useState<IpActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadActivity = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/monitoring/ip-activity?days=${days}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      const json = await response.json();

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? 'Failed to load IP activity');
      }

      setActivity(Array.isArray(json.data) ? json.data : []);
    } catch (loadError) {
      setActivity([]);
      setError(loadError instanceof Error ? loadError.message : 'Failed to load IP activity');
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    void loadActivity();
  }, [loadActivity]);

  return (
    <div className={styles.ipMapPanel}>
      {error ? <p className={styles.ipMapPanelError}>{error}</p> : null}

      {loading ? (
        <div className={styles.ipMapPanelLoading} aria-busy="true" aria-live="polite">
          <div className={styles.ipMapPanelSkeleton} />
        </div>
      ) : (
        <IpMapChart key={`ip-map-${days}`} activity={activity} onSelectFilter={onSelectFilter} />
      )}
    </div>
  );
}
