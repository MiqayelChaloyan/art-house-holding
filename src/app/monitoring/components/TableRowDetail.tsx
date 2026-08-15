'use client';

import type { ReactNode } from 'react';

import { FormStatusBadge } from './FormStatusBadge';

import styles from '../styles.module.sass';

export function DetailPanel({ children }: { children: ReactNode }) {
  return <div className={styles.detailPanel}>{children}</div>;
}

export function DetailGrid({ children }: { children: ReactNode }) {
  return <div className={styles.detailGrid}>{children}</div>;
}

export function DetailSection({
  title,
  children,
  subtitle,
}: {
  title: string;
  children: ReactNode;
  subtitle?: string;
}) {
  return (
    <section className={styles.detailSection}>
      <div className={styles.detailSectionHeader}>
        <span className={styles.detailSectionAccent} aria-hidden="true" />
        <div>
          <h3 className={styles.detailSectionTitle}>{title}</h3>
          {subtitle ? <p className={styles.detailSectionSubtitle}>{subtitle}</p> : null}
        </div>
      </div>
      <div className={styles.detailSectionBody}>{children}</div>
    </section>
  );
}

export function DetailItem({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? styles.detailItemFull : styles.detailItem}>
      <span className={styles.detailLabel}>{label}</span>
      <div className={styles.detailValue}>{value}</div>
    </div>
  );
}

export function DetailCodeBlock({ value }: { value: string }) {
  return <pre className={styles.detailCode}>{value}</pre>;
}

export function DetailList({
  items,
  labelHeader = 'Item',
  valueHeader = 'Value',
}: {
  items: { label: string; value: ReactNode }[];
  labelHeader?: string;
  valueHeader?: string;
}) {
  if (items.length === 0) {
    return <p className={styles.detailEmpty}>No data</p>;
  }

  return (
    <div className={styles.detailNestedList}>
      <div className={styles.detailNestedListHeader}>
        <span className={styles.detailNestedListHeaderLabel}>{labelHeader}</span>
        <span className={styles.detailNestedListHeaderLabel}>{valueHeader}</span>
      </div>
      <ul className={styles.detailNestedListBody}>
        {items.map((item, index) => (
          <li key={index} className={styles.detailNestedListRow}>
            <div className={styles.detailNestedPath}>
              <span className={styles.detailNestedIndex} aria-hidden="true">
                {index + 1}
              </span>
              <span className={styles.detailNestedLabel}>{item.label}</span>
            </div>
            <span className={styles.detailNestedValue}>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TIMELINE_TYPE_CLASS: Record<string, string> = {
  pageView: 'detailTimelineDot_pageView',
  buttonClick: 'detailTimelineDot_buttonClick',
  formSubmit: 'detailTimelineDot_formSubmit',
};

export function DetailTimeline({
  items,
}: {
  items: { time: string; type: string; name: string; path: string }[];
}) {
  if (items.length === 0) {
    return <p className={styles.detailEmpty}>No timeline events</p>;
  }

  return (
    <div className={styles.detailTimeline}>
      {items.map((item, index) => {
        const dotClass = TIMELINE_TYPE_CLASS[item.type] ?? 'detailTimelineDot_default';
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.time}-${index}`}
            className={`${styles.detailTimelineItem} ${isLast ? styles.detailTimelineItemLast : ''}`.trim()}
          >
            <div className={styles.detailTimelineRail} aria-hidden="true">
              <span className={`${styles.detailTimelineDot} ${styles[dotClass]}`} />
              {!isLast ? <span className={styles.detailTimelineLine} /> : null}
            </div>
            <div className={styles.detailTimelineContent}>
              <div className={styles.detailTimelineMeta}>
                <time className={styles.detailTimelineTime}>{item.time}</time>
                <span className={`${styles.detailTimelineType} ${styles[`detailTimelineType_${item.type}`] ?? ''}`}>
                  {item.type}
                </span>
              </div>
              <p className={styles.detailTimelineName}>{item.name}</p>
              <code className={styles.detailTimelinePath}>{item.path}</code>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function tryFormatJson(raw?: string): string {
  if (!raw) return '—';
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

export function FormRequestDetail({
  requestBodyJson,
  responseStatus,
  responseMessage,
}: {
  requestBodyJson?: string;
  responseStatus?: number;
  responseMessage?: string;
}) {
  return (
    <DetailGrid>
      <DetailItem label="Status Code" value={<FormStatusBadge statusCode={responseStatus} />} />
      <DetailItem
        label="Result"
        value={
          responseStatus !== undefined ? (
            <span
              className={
                responseStatus >= 200 && responseStatus < 300
                  ? styles.detailStatusOk
                  : styles.detailStatusError
              }
            >
              {responseStatus >= 200 && responseStatus < 300 ? 'Success' : 'Failed'}
            </span>
          ) : (
            '—'
          )
        }
      />
      <DetailItem label="Response Message" value={responseMessage ?? '—'} fullWidth />
      <DetailItem
        label="Request Body"
        value={<DetailCodeBlock value={tryFormatJson(requestBodyJson)} />}
        fullWidth
      />
    </DetailGrid>
  );
}
