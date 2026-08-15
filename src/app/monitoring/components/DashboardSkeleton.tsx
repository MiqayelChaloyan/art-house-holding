'use client';

import type { ReactNode } from 'react';

import styles from '../styles.module.sass';

import { AuditTablePaginationSkeleton, AuditTableSkeleton } from './AuditTableSkeleton';
import { DATA_TABLE_PAGE_SIZE } from './DataTable';

function ChartCardSkeleton({ height = 320 }: { height?: number }) {
  return (
    <article className={styles.performanceChartCard}>
      <header className={styles.performanceChartHead}>
        <div className={styles.skeletonBar} style={{ width: 148, height: 14 }} />
        <div className={styles.skeletonBar} style={{ width: 220, height: 12, marginTop: 8 }} />
      </header>
      <div className={styles.performanceChartBody}>
        <div className={styles.skeletonChart} style={{ height }} />
      </div>
    </article>
  );
}

function IpMapSkeleton() {
  return (
    <article className={styles.performanceChartCard}>
      <header className={styles.performanceChartHead}>
        <div className={styles.skeletonBar} style={{ width: 168, height: 14 }} />
        <div className={styles.skeletonBar} style={{ width: 280, height: 12, marginTop: 8 }} />
      </header>
      <div className={styles.performanceChartBody}>
        <div className={styles.skeletonChart} style={{ height: 420 }} />
      </div>
    </article>
  );
}

export function CardsSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className={styles.cards}>
      {Array.from({ length: count }).map((_, index) => (
        <article key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonBar} style={{ width: '42%', height: 11 }} />
          <div className={styles.skeletonBar} style={{ width: '55%', height: 26, marginTop: 12 }} />
          <div className={styles.skeletonBar} style={{ width: '64%', height: 11, marginTop: 10 }} />
        </article>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = 280 }: { height?: number }) {
  return <ChartCardSkeleton height={height} />;
}

export function DashboardSkeleton() {
  return (
    <div className={styles.dashboardMain}>
      <CardsSkeleton />
      <div className={styles.chartsGrid}>
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>
      <div className={styles.chartsRow}>
        <ChartCardSkeleton />
        <ChartCardSkeleton />
      </div>
      <IpMapSkeleton />
    </div>
  );
}

export function PanelSkeleton({ children }: { children?: ReactNode }) {
  return (
    <section className={styles.auditPanel}>
      <div className={styles.auditPanelHeader}>
        <div className={styles.auditPanelHeaderAccent} aria-hidden="true" />
        <div className={styles.auditPanelHeaderMain}>
          <div className={styles.auditPanelHeaderCopy}>
            <div className={styles.skeletonBar} style={{ width: 90, height: 10 }} />
            <div className={styles.skeletonBar} style={{ width: 180, height: 18, marginTop: 10 }} />
            <div className={styles.skeletonBar} style={{ width: 260, height: 12, marginTop: 8 }} />
          </div>
          <div className={styles.skeletonBar} style={{ width: 72, height: 28, borderRadius: 999 }} />
        </div>
      </div>
      <div className={styles.auditPanelFilters}>
        <div className={styles.skeletonBar} style={{ width: '100%', height: 34, borderRadius: 8 }} />
      </div>
      {children ?? (
        <div className={styles.auditPanelTableSection}>
          <div className={styles.auditTableWrap}>
            <AuditTableSkeleton columnCount={6} rowCount={DATA_TABLE_PAGE_SIZE} withDetailsColumn />
          </div>
          <AuditTablePaginationSkeleton />
        </div>
      )}
    </section>
  );
}
