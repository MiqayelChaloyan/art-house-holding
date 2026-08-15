'use client';

import styles from '../styles.module.sass';

import { DATA_TABLE_PAGE_SIZE } from './DataTable';

const CELL_WIDTHS = [
  styles.skeletonTableCellXs,
  styles.skeletonTableCellSm,
  styles.skeletonTableCellMd,
  styles.skeletonTableCellLg,
] as const;

type Props = {
  columnCount: number;
  rowCount?: number;
  withDetailsColumn?: boolean;
};

function cellWidthClass(index: number): string {
  return CELL_WIDTHS[index % CELL_WIDTHS.length];
}

function SkeletonBone({
  className,
  width,
  height = '0.78rem',
  pill = false,
  delay,
}: {
  className?: string;
  width?: string;
  height?: string;
  pill?: boolean;
  delay?: string;
}) {
  return (
    <span
      className={[styles.skeletonBone, pill ? styles.skeletonBonePill : '', className].filter(Boolean).join(' ')}
      style={{ width, height, animationDelay: delay }}
      aria-hidden="true"
    />
  );
}

export function AuditTableSkeleton({
  columnCount,
  rowCount = DATA_TABLE_PAGE_SIZE,
  withDetailsColumn = false,
}: Props) {
  const dataColumns = withDetailsColumn ? Math.max(1, columnCount - 1) : columnCount;
  const gridColumns = columnCount;

  return (
    <div
      className={styles.skeletonAuditTable}
      style={{
        ['--skeleton-table-columns' as string]: String(gridColumns),
        ['--skeleton-table-rows' as string]: String(rowCount),
      }}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles.visuallyHidden}>Loading table…</span>

      <div className={styles.skeletonAuditTableHead}>
        {Array.from({ length: dataColumns }, (_, index) => (
          <SkeletonBone key={`head-${index}`} height="0.62rem" className={styles.skeletonAuditTableHeadCell} />
        ))}
        {withDetailsColumn ? (
          <SkeletonBone height="1.35rem" pill className={styles.skeletonAuditTableDetailsCell} />
        ) : null}
      </div>

      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className={[
            styles.skeletonAuditTableRow,
            rowIndex % 2 === 1 ? styles.skeletonAuditTableRowAlt : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {Array.from({ length: dataColumns }, (_, cellIndex) => (
            <SkeletonBone
              key={`row-${rowIndex}-cell-${cellIndex}`}
              className={cellWidthClass(cellIndex + rowIndex)}
              delay={`${(rowIndex * dataColumns + cellIndex) * 0.04}s`}
            />
          ))}
          {withDetailsColumn ? (
            <SkeletonBone
              pill
              height="1.35rem"
              className={styles.skeletonAuditTableDetailsCell}
              delay={`${rowIndex * 0.05}s`}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export function AuditTablePaginationSkeleton() {
  return (
    <div className={styles.skeletonAuditPagination} aria-hidden="true">
      <SkeletonBone width="11rem" height="0.85rem" />
      <div className={styles.skeletonAuditPaginationControls}>
        <SkeletonBone width="5.5rem" height="2rem" pill />
        <SkeletonBone width="6.5rem" height="0.85rem" />
        <SkeletonBone width="4.5rem" height="2rem" pill />
      </div>
    </div>
  );
}
