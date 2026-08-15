'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSyncedDebouncedSearch } from '@/src/hooks/useDebouncedValue';
import type {
  MonitoringTableId,
  TablePaginationMeta,
} from '@/src/lib/analytics/server/queries';

import { DATA_TABLE_PAGE_SIZE, DataTable, type DataTableColumn } from './DataTable';

import styles from '../styles.module.sass';

type BaseTableProps<T> = {
  tableId: MonitoringTableId;
  days: number;
  defaultSortKey: string;
  defaultSortDir?: 'asc' | 'desc';
  searchSeed?: string;
  title: string;
  description?: string;
  columns: DataTableColumn<T>[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  renderRowDetail?: (row: T) => React.ReactNode;
  emptyMessage?: string;
};

export function MonitoringServerTable<T>({
  tableId,
  days,
  defaultSortKey,
  defaultSortDir = 'desc',
  searchSeed,
  ...tableProps
}: BaseTableProps<T>) {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useSyncedDebouncedSearch(searchInput);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(defaultSortKey);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(defaultSortDir);
  const [rows, setRows] = useState<T[]>([]);
  const [pagination, setPagination] = useState<TablePaginationMeta>({
    page: 1,
    limit: DATA_TABLE_PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, days, sortKey, sortDir, tableId]);

  useEffect(() => {
    if (searchSeed !== undefined) {
      setSearchInput(searchSeed);
    }
  }, [searchSeed]);

  const loadTable = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        table: tableId,
        days: String(days),
        page: String(page),
        limit: String(DATA_TABLE_PAGE_SIZE),
      });

      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      }
      if (sortKey) {
        params.set('sort', sortKey);
        params.set('sortDir', sortDir);
      }

      const response = await fetch(`/api/monitoring/table?${params.toString()}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      const json = await response.json();

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? 'Failed to load table data');
      }

      setRows(Array.isArray(json.rows) ? json.rows.filter(Boolean) : []);
      setPagination(json.pagination as TablePaginationMeta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load table data');
      setRows([]);
      setPagination({
        page: 1,
        limit: DATA_TABLE_PAGE_SIZE,
        total: 0,
        totalPages: 1,
      });
    } finally {
      setLoading(false);
    }
  }, [tableId, days, page, debouncedSearch, sortKey, sortDir]);

  useEffect(() => {
    void loadTable();
  }, [loadTable]);

  if (error) {
    return (
      <div className={styles.errorPanel}>
        <h2>Unable to load table</h2>
        <p>{error}</p>
        <button type="button" onClick={() => void loadTable()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <DataTable<T>
      mode="server"
      rows={rows}
      totalRows={pagination.total}
      page={pagination.page}
      onPageChange={setPage}
      search={searchInput}
      onSearchChange={setSearchInput}
      loading={loading}
      sortKey={sortKey}
      sortDir={sortDir}
      onSortChange={(key, dir) => {
        setSortKey(key);
        setSortDir(dir);
      }}
      {...tableProps}
    />
  );
}
