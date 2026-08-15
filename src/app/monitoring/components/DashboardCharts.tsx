'use client';

import React, { useId, useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type {
  DailyVisitorPoint,
  DeviceBreakdown,
  TopEventRow,
  TopPageRow,
} from '@/src/lib/analytics/types';

import { getChartTheme } from '../chart-theme';
import { ChartTooltip } from './ChartTooltip';
import { useMonitoringTheme } from './MonitoringThemeProvider';

import styles from '../styles.module.sass';

interface Props {
  dailyVisitors: DailyVisitorPoint[];
  monthlyComparison: { current: DailyVisitorPoint[]; previous: DailyVisitorPoint[] };
  topPages: TopPageRow[];
  topEvents: TopEventRow[];
  deviceBreakdown: DeviceBreakdown;
}

function formatEventLabel(row: TopEventRow): string {
  const label = row.name.length > 28 ? `${row.name.slice(0, 28)}…` : row.name;
  return row.eventType === 'formSubmit' ? `Form · ${label}` : label;
}

function ChartCard({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={`${styles.performanceChartCard} ${className ?? ''}`.trim()}>
      <header className={styles.performanceChartHead}>
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </header>
      <div className={styles.performanceChartBody}>{children}</div>
    </article>
  );
}

const axisTick = { fontSize: 11, fontWeight: 500 as const };
const legendStyle = { fontSize: 12, fontWeight: 500 as const };

function formatActivityTickDate(value: string, index: number, total: number): string {
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;
  if (total > 14) {
    const step = Math.max(1, Math.ceil(total / 6));
    if (index !== 0 && index !== total - 1 && index % step !== 0) return '';
  }
  return parsed.toLocaleDateString(undefined, { day: '2-digit', month: 'short' });
}

function buildActivityYMax(values: number[]): number {
  const peak = Math.max(0, ...values);
  if (peak <= 5) return 5;
  if (peak <= 20) return Math.ceil(peak / 5) * 5;
  if (peak <= 100) return Math.ceil(peak / 20) * 20;
  if (peak <= 300) return Math.ceil(peak / 50) * 50;
  return Math.ceil(peak / 100) * 100;
}

export function DashboardCharts({
  dailyVisitors,
  monthlyComparison,
  topPages,
  topEvents,
  deviceBreakdown,
}: Props) {
  const { theme } = useMonitoringTheme();
  const colors = getChartTheme(theme);
  const chartId = useId().replace(/:/g, '');

  const comparisonData = dailyVisitors.map((point, index) => ({
    date: point.date,
    visitors: point.visitors,
    previous: monthlyComparison.previous[index]?.visitors ?? 0,
  }));

  const activityYMax = useMemo(
    () => buildActivityYMax(comparisonData.flatMap((point) => [point.visitors, point.previous])),
    [comparisonData],
  );

  const pageChartData = topPages.slice(0, 8).map((row) => ({
    page: row.page.length > 32 ? `${row.page.slice(0, 32)}…` : row.page,
    views: row.views,
  }));

  const eventChartData = topEvents.slice(0, 8).map((row) => ({
    name: formatEventLabel(row),
    count: row.count,
  }));

  const deviceData = [
    { name: 'Desktop', value: deviceBreakdown.desktop },
    { name: 'Mobile', value: deviceBreakdown.mobile },
    { name: 'Tablet', value: deviceBreakdown.tablet },
    { name: 'Unknown', value: deviceBreakdown.unknown },
  ].filter((d) => d.value > 0);

  const deviceTotal = deviceData.reduce((sum, item) => sum + item.value, 0);

  const tooltipContent = (props: {
    active?: boolean;
    label?: string | number;
    payload?: unknown;
  }) => <ChartTooltip {...props} colors={colors} />;

  return (
    <section className={styles.chartsSection} aria-label="Analytics charts">
      <div className={styles.chartsGrid}>
        <ChartCard title="Activity" subtitle="Solid line = users · dashed line = prior period">
          <div className={`${styles.chartCanvas} ${styles.activityChartCanvas}`}>
            <ResponsiveContainer width="100%" height={320} minWidth={0}>
              <LineChart
                data={comparisonData}
                margin={{ top: 12, right: 4, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  stroke={colors.grid}
                  vertical={false}
                  horizontal
                  strokeDasharray="0"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  tick={{ ...axisTick, fill: colors.axis }}
                  tickFormatter={(value, index) =>
                    formatActivityTickDate(String(value), index, comparisonData.length)
                  }
                  dy={8}
                />
                <YAxis
                  orientation="right"
                  domain={[0, activityYMax]}
                  tickLine={false}
                  axisLine={false}
                  width={44}
                  tick={{ ...axisTick, fill: colors.axis }}
                  allowDecimals={false}
                />
                <Tooltip content={tooltipContent} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke={colors.primary}
                  strokeWidth={2}
                  name="Users"
                  dot={false}
                  activeDot={{ r: 4, fill: colors.primary, stroke: colors.cardBg, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke={colors.primary}
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  strokeOpacity={0.45}
                  name="Prior period"
                  dot={false}
                  activeDot={{ r: 3, fill: colors.primary, stroke: colors.cardBg, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Device category" subtitle="Share of page views by device">
          <div className={styles.chartCanvas} style={{ background: colors.plotBg }}>
            {deviceData.length === 0 ? (
              <div className={styles.chartEmpty}>No device data in this date range yet.</div>
            ) : (
              <div className={styles.donutWrap}>
                <ResponsiveContainer width="100%" height={320} minWidth={0}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      dataKey="value"
                      nameKey="name"
                      cx="38%"
                      cy="50%"
                      innerRadius={72}
                      outerRadius={104}
                      paddingAngle={2}
                      stroke={colors.cardBg}
                      strokeWidth={3}
                      cornerRadius={4}
                    >
                      {deviceData.map((_, index) => (
                        <Cell key={index} fill={colors.series[index % colors.series.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={tooltipContent} />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ ...legendStyle, color: colors.text }}
                      formatter={(value, entry) => {
                        const item = entry.payload as { value?: number } | undefined;
                        const pct =
                          deviceTotal > 0 && item?.value
                            ? ` (${Math.round((item.value / deviceTotal) * 100)}%)`
                            : '';
                        return `${value}${pct}`;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className={styles.donutCenter} aria-hidden="true">
                  <strong>{deviceTotal.toLocaleString()}</strong>
                  <span>views</span>
                </div>
              </div>
            )}
          </div>
        </ChartCard>
      </div>

      <div className={styles.chartsRow}>
        <ChartCard title="Top pages" subtitle="Most viewed paths">
          <div className={styles.chartCanvas} style={{ background: colors.plotBg }}>
            {pageChartData.length === 0 ? (
              <div className={styles.chartEmpty}>No page views in this date range yet.</div>
            ) : (
              <ResponsiveContainer width="100%" height={320} minWidth={0}>
                <BarChart
                  data={pageChartData}
                  layout="vertical"
                  margin={{ top: 8, left: 4, right: 16, bottom: 4 }}
                  barCategoryGap="18%"
                >
                  <defs>
                    <linearGradient id={`${chartId}-pages-bar`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={colors.barFillStart} />
                      <stop offset="100%" stopColor={colors.barFillEnd} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={colors.grid} horizontal={false} strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    stroke={colors.axisLine}
                    tick={{ ...axisTick, fill: colors.axis }}
                    axisLine={{ stroke: colors.axisLine }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="page"
                    stroke={colors.axisLine}
                    tick={{ ...axisTick, fill: colors.axis, fontSize: 10 }}
                    width={132}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={tooltipContent} cursor={{ fill: colors.plotBg, opacity: 0.65 }} />
                  <Bar
                    dataKey="views"
                    name="Views"
                    radius={[0, 6, 6, 0]}
                    barSize={18}
                    fill={`url(#${chartId}-pages-bar)`}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>

        <ChartCard title="Top events" subtitle="Button clicks and form submissions">
          <div className={styles.chartCanvas} style={{ background: colors.plotBg }}>
            {eventChartData.length === 0 ? (
              <div className={styles.chartEmpty}>
                No button or form events in this date range yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={320} minWidth={0}>
                <BarChart
                  data={eventChartData}
                  layout="vertical"
                  margin={{ top: 8, left: 4, right: 16, bottom: 4 }}
                  barCategoryGap="18%"
                >
                  <defs>
                    <linearGradient id={`${chartId}-events-bar`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={colors.secondary} />
                      <stop offset="100%" stopColor={colors.series[3] ?? colors.primary} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={colors.grid} horizontal={false} strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    stroke={colors.axisLine}
                    tick={{ ...axisTick, fill: colors.axis }}
                    axisLine={{ stroke: colors.axisLine }}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke={colors.axisLine}
                    tick={{ ...axisTick, fill: colors.axis, fontSize: 10 }}
                    width={132}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={tooltipContent} cursor={{ fill: colors.plotBg, opacity: 0.65 }} />
                  <Bar
                    dataKey="count"
                    name="Events"
                    radius={[0, 6, 6, 0]}
                    barSize={18}
                    fill={`url(#${chartId}-events-bar)`}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
