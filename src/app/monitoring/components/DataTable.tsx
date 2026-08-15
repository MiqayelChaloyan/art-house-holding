'use client';

import { Fragment, useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';

import { AuditTablePaginationSkeleton, AuditTableSkeleton } from './AuditTableSkeleton';

import styles from '../styles.module.sass';

export const DATA_TABLE_PAGE_SIZE = 10;

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  width?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
};

type BaseProps<T> = {
  title: string;
  description?: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  searchPlaceholder?: string;
  renderRowDetail?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
};

type ClientProps<T> = BaseProps<T> & {
  mode?: 'client';
  searchFilter: (row: T, query: string) => boolean;
};

type ServerProps<T> = BaseProps<T> & {
  mode: 'server';
  totalRows: number;
  page: number;
  onPageChange: (page: number) => void;
  search: string;
  onSearchChange: (value: string) => void;
  loading?: boolean;
  sortKey: string | null;
  sortDir: 'asc' | 'desc';
  onSortChange: (key: string | null, dir: 'asc' | 'desc') => void;
};

type Props<T> = ClientProps<T> | ServerProps<T>;

function isServerProps<T>(props: Props<T>): props is ServerProps<T> {
  return props.mode === 'server';
}

export function DataTable<T>(props: Props<T>) {
  const {
    title,
    description,
    columns,
    rows,
    rowKey,
    searchPlaceholder = 'Search…',
    renderRowDetail,
    emptyMessage = 'No data found',
    pageSize = DATA_TABLE_PAGE_SIZE,
  } = props;

  const isServer = isServerProps(props);

  const [clientQuery, setClientQuery] = useState('');
  const [clientSortKey, setClientSortKey] = useState<string | null>(null);
  const [clientSortDir, setClientSortDir] = useState<'asc' | 'desc'>('desc');
  const [clientPage, setClientPage] = useState(0);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const query = isServer ? props.search : clientQuery;
  const sortKey = isServer ? props.sortKey : clientSortKey;
  const sortDir = isServer ? props.sortDir : clientSortDir;
  const loading = isServer ? props.loading ?? false : false;

  const filtered = useMemo(() => {
    if (isServer) return rows;

    const q = clientQuery.trim().toLowerCase();
    let result = q ? rows.filter((row) => props.searchFilter(row, q)) : [...rows];

    if (clientSortKey) {
      const column = columns.find((col) => col.key === clientSortKey);
      if (column?.sortValue) {
        result.sort((a, b) => {
          const av = column.sortValue!(a);
          const bv = column.sortValue!(b);
          if (typeof av === 'number' && typeof bv === 'number') {
            return clientSortDir === 'asc' ? av - bv : bv - av;
          }
          return clientSortDir === 'asc'
            ? String(av).localeCompare(String(bv))
            : String(bv).localeCompare(String(av));
        });
      }
    }

    return result;
  }, [clientQuery, clientSortDir, clientSortKey, columns, isServer, props, rows]);

  const totalRows = isServer ? props.totalRows : filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = isServer ? props.page : Math.min(clientPage, totalPages - 1);
  const safePage = isServer ? Math.min(Math.max(1, currentPage), totalPages) : Math.min(clientPage, totalPages - 1);
  const pageStart = totalRows === 0 ? 0 : (safePage - (isServer ? 1 : 0)) * pageSize + 1;
  const pageEnd = Math.min(totalRows, (safePage - (isServer ? 1 : 0) + 1) * pageSize);
  const pageRows = isServer ? rows : filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);
  const detailColSpan = columns.length + (renderRowDetail ? 1 : 0);
  const hasExpandedRow = expandedKey !== null;
  const skeletonColumnCount = detailColSpan;
  const placeholderRowCount =
    !loading &&
    !hasExpandedRow &&
    totalRows > 0 &&
    pageRows.length > 0 &&
    pageRows.length < pageSize
      ? pageSize - pageRows.length
      : 0;

  const serverPage = isServer ? props.page : clientPage;

  useEffect(() => {
    setExpandedKey(null);
  }, [query, safePage, sortKey, sortDir, serverPage]);

  function toggleSort(key: string) {
    if (isServer) {
      if (props.sortKey === key) {
        props.onSortChange(key, props.sortDir === 'asc' ? 'desc' : 'asc');
        return;
      }
      props.onSortChange(key, 'desc');
      return;
    }

    if (clientSortKey === key) {
      setClientSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setClientSortKey(key);
    setClientSortDir('desc');
  }

  function toggleDetails(row: T, event?: React.MouseEvent) {
    event?.stopPropagation();
    if (!renderRowDetail) return;
    const key = rowKey(row);
    setExpandedKey((current) => (current === key ? null : key));
  }

  function goToPage(nextPage: number) {
    const bounded = isServer
      ? Math.max(1, Math.min(totalPages, nextPage))
      : Math.max(0, Math.min(totalPages - 1, nextPage));

    if (isServer) {
      props.onPageChange(bounded);
    } else {
      setClientPage(bounded);
    }
    setExpandedKey(null);
  }

  function handleSearchChange(value: string) {
    if (isServer) {
      props.onSearchChange(value);
      props.onPageChange(1);
      return;
    }
    setClientQuery(value);
    setClientPage(0);
    setExpandedKey(null);
  }

  const displayPage = isServer ? safePage : safePage + 1;
  const isFirstPage = isServer ? safePage <= 1 : safePage === 0;
  const isLastPage = isServer ? safePage >= totalPages : safePage >= totalPages - 1;

  return (
    <section className={styles.auditPanel}>
      <header className={styles.auditPanelHeader}>
        <div className={styles.auditPanelHeaderAccent} aria-hidden="true" />
        <div className={styles.auditPanelHeaderMain}>
          <div className={styles.auditPanelHeaderCopy}>
            <p className={styles.auditPanelEyebrow}>Data table</p>
            <h2 className={styles.auditPanelTitle}>{title}</h2>
            {description ? <p className={styles.auditPanelDescription}>{description}</p> : null}
          </div>
          <p className={styles.auditPanelCount}>
            {loading
              ? 'Loading…'
              : `${totalRows.toLocaleString()} ${totalRows === 1 ? 'row' : 'rows'}${query.trim() ? ' · filtered' : ''}`}
          </p>
        </div>
      </header>

      <div className={styles.auditPanelFilters}>
        <div className={`${styles.auditPanelFiltersRow} ${styles.auditPanelFiltersRowSearch}`}>
          <div className={styles.auditSearchField}>
            <input
              type="search"
              value={query}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              onChange={(event) => handleSearchChange(event.target.value)}
            />
            {query.length > 0 ? (
              <button
                type="button"
                className={styles.auditSearchClear}
                onClick={() => handleSearchChange('')}
                aria-label="Clear search"
              >
                <FiX size={16} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={[
          styles.auditPanelTableSection,
          hasExpandedRow ? styles.auditPanelTableSectionExpanded : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className={[
            styles.auditTableWrap,
            loading ? styles.auditTableWrapLoading : '',
            !loading && totalRows === 0 ? styles.auditTableWrapEmpty : '',
            hasExpandedRow ? styles.auditTableWrapExpanded : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {loading ? (
            <AuditTableSkeleton
              columnCount={skeletonColumnCount}
              rowCount={pageSize}
              withDetailsColumn={Boolean(renderRowDetail)}
            />
          ) : (
          <table className={styles.auditTable}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={[
                      styles.auditTableCol,
                      column.className ? styles[column.className] : '',
                      column.align ? styles[`auditAlign_${column.align}`] : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {column.sortValue ? (
                      <button
                        type="button"
                        className={
                          sortKey === column.key
                            ? `${styles.auditSortBtn} ${styles.auditSortBtnActive}`
                            : styles.auditSortBtn
                        }
                        onClick={() => toggleSort(column.key)}
                      >
                        <span>{column.header}</span>
                        {sortKey === column.key ? (
                          <span className={styles.auditSortIndicator}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                        ) : null}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
                {renderRowDetail ? (
                  <th className={`${styles.auditTableCol} ${styles.auditTableColDetails}`}>Details</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={detailColSpan} className={styles.auditEmptyCell}>
                    <div className={styles.auditEmptyState}>
                      <strong>{emptyMessage}</strong>
                      <span>Try adjusting search or date range</span>
                    </div>
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => {
                  const key = rowKey(row);
                  const isExpanded = expandedKey === key;

                  return (
                    <Fragment key={key}>
                      <tr
                        className={[
                          renderRowDetail ? styles.auditRowClickable : '',
                          isExpanded ? styles.auditRowExpanded : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        onClick={() => toggleDetails(row)}
                      >
                        {columns.map((column) => (
                          <td
                            key={column.key}
                            className={[
                              styles.auditTableCol,
                              column.className ? styles[column.className] : '',
                              column.align ? styles[`auditAlign_${column.align}`] : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          >
                            {column.render(row)}
                          </td>
                        ))}
                        {renderRowDetail ? (
                          <td className={`${styles.auditTableCol} ${styles.auditTableColDetails}`}>
                            <button
                              type="button"
                              className={styles.detailsBtn}
                              onClick={(event) => toggleDetails(row, event)}
                            >
                              {isExpanded ? 'Hide' : 'Details'}
                            </button>
                          </td>
                        ) : null}
                      </tr>
                      {isExpanded && renderRowDetail ? (
                        <tr className={styles.detailsRow}>
                          <td colSpan={detailColSpan}>
                            <div className={styles.detailsRowBody}>{renderRowDetail(row)}</div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  );
                })
              )}
              {placeholderRowCount > 0 ? (
                <tr className={styles.auditTableSpacerRow} aria-hidden="true">
                  <td
                    colSpan={detailColSpan}
                    className={styles.auditTableSpacerCell}
                    style={{ height: `calc(${placeholderRowCount} * var(--mon-audit-row-height))` }}
                  />
                </tr>
              ) : null}
            </tbody>
          </table>
          )}
        </div>

        {loading ? (
          <AuditTablePaginationSkeleton />
        ) : (
        <nav className={styles.auditTablePagination} aria-label="Table pagination">
          <span className={styles.auditTablePaginationInfo}>
            {totalRows === 0
              ? 'No rows'
              : `Showing ${pageStart.toLocaleString()}–${pageEnd.toLocaleString()} of ${totalRows.toLocaleString()}`}
          </span>
          <div className={styles.auditTablePaginationControls}>
            <button
              type="button"
              className={styles.auditTablePaginationBtn}
              disabled={isFirstPage || loading}
              onClick={() => goToPage(isServer ? safePage - 1 : safePage - 1)}
            >
              Previous
            </button>
            <span className={styles.auditTablePaginationPage}>
              Page {displayPage} of {totalPages}
            </span>
            <button
              type="button"
              className={styles.auditTablePaginationBtn}
              disabled={isLastPage || loading}
              onClick={() => goToPage(isServer ? safePage + 1 : safePage + 1)}
            >
              Next
            </button>
          </div>
        </nav>
        )}
      </div>
    </section>
  );
}
