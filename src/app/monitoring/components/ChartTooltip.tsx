'use client';

import type { MonitoringChartTheme } from '../chart-theme';

import styles from '../styles.module.sass';

type TooltipPayload = {
  color?: string;
  name?: string;
  value?: number | string;
  dataKey?: string | number;
};

type Props = {
  active?: boolean;
  label?: string | number;
  payload?: unknown;
  colors: MonitoringChartTheme;
};

export function ChartTooltip({ active, label, payload, colors }: Props) {
  const items = Array.isArray(payload) ? (payload as TooltipPayload[]) : [];
  if (!active || items.length === 0) return null;

  return (
    <div
      className={styles.chartTooltip}
      style={{
        background: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        color: colors.tooltipText,
      }}
    >
      {label != null ? (
        <strong className={styles.chartTooltipTitle}>{String(label)}</strong>
      ) : null}
      <ul className={styles.chartTooltipList}>
        {items.map((entry) => (
          <li key={`${entry.name}-${entry.dataKey}`}>
            <span
              className={styles.chartTooltipSwatch}
              style={{ background: entry.color ?? colors.primary }}
              aria-hidden="true"
            />
            <span className={styles.chartTooltipLabel}>{entry.name}</span>
            <span className={styles.chartTooltipValue}>
              {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
