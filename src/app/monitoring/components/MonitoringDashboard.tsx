'use client';

import { useCallback, useEffect, useState } from 'react';

import type { MonitoringAnalyticsConfig } from '@/src/lib/analytics/server/analytics-config';
import { formatClientIp } from '@/src/lib/analytics/client-ip';
import type {
  AnalyticsEventLogRow,
  MonitoringDashboardData,
  VisitorSessionRow,
} from '@/src/lib/analytics/server/queries';
import type { TopActionRow, TopPageRow } from '@/src/lib/analytics/types';

import { DashboardCharts } from './DashboardCharts';
import { DashboardSkeleton, PanelSkeleton } from './DashboardSkeleton';
import { IpMapPanel } from './IpMapPanel';
import type { IpMapChartFilter } from './IpMapChart';
import { MonitoringServerTable } from './MonitoringServerTable';
import { MonitoringShell, type MonitoringSection } from './MonitoringShell';
import { FormStatusBadge } from './FormStatusBadge';
import {
  DetailGrid,
  DetailItem,
  DetailList,
  DetailPanel,
  DetailSection,
  DetailTimeline,
  FormRequestDetail,
} from './TableRowDetail';

import styles from '../styles.module.sass';

function formatDate(value: string): string {
  if (!value) return '—';
  return new Date(value).toLocaleString();
}

function EventTypeBadge({ type }: { type: string }) {
  return <span className={`${styles.badge} ${styles[`badge_${type}`] ?? ''}`}>{type}</span>;
}

export function MonitoringDashboard() {
  const [section, setSection] = useState<MonitoringSection>('overview');
  const [days, setDays] = useState<number | null>(null);
  const [rangeOptions, setRangeOptions] = useState<number[]>([7, 30]);
  const [analyticsConfig, setAnalyticsConfig] = useState<MonitoringAnalyticsConfig | null>(null);
  const [data, setData] = useState<MonitoringDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitorSearchSeed, setVisitorSearchSeed] = useState<string | undefined>();

  const handleIpMapFilter = useCallback((filter: IpMapChartFilter) => {
    setSection('visitors');
    setVisitorSearchSeed(filter.type === 'ip' ? filter.value : filter.value.toUpperCase());
  }, []);

  const loadData = useCallback(async (range: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/monitoring/data?days=${range}`, {
        credentials: 'include',
        cache: 'no-store',
      });
      const json = await response.json();

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? 'Failed to load data');
      }

      if (json.config) {
        setAnalyticsConfig(json.config);
        setRangeOptions(json.config.dashboardRangeOptions ?? [7, 30]);
      }

      if (typeof json.days === 'number') {
        setDays(json.days);
      }

      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (days === null) {
      // API clamps to the current calendar month length (28–31 days).
      void loadData(31);
      return;
    }
    void loadData(days);
  }, [days, loadData]);

  function renderContent() {
    if (section === 'overview' && loading) {
      return <DashboardSkeleton />;
    }

    if (section === 'overview' && error) {
      return (
        <div className={styles.errorPanel}>
          <h2>Unable to load analytics</h2>
          <p>{error}</p>
          <button type="button" onClick={() => days !== null && void loadData(days)}>
            Retry
          </button>
        </div>
      );
    }

    if (section === 'overview' && !data) {
      return null;
    }

    if (section !== 'overview' && days === null) {
      return (
        <div className={styles.dashboardMain}>
          <PanelSkeleton />
        </div>
      );
    }

    switch (section) {
      case 'overview':
        if (!data) return null;
        return (
          <div className={styles.dashboardMain}>
            {analyticsConfig ? (
              <div className={styles.configBanner}>
                <span>
                  Data retention: <strong>{analyticsConfig.eventRetentionDays} days</strong>
                  <span className={styles.configBannerHint}> (current calendar month)</span>
                </span>
              </div>
            ) : null}
            <section className={styles.cards}>
              <article className={styles.card}>
                <h3>Total Visitors</h3>
                <div className={styles.value}>{data.overview.totalVisitors.toLocaleString()}</div>
                <div className={styles.sub}>Unique sessions</div>
              </article>
              <article className={styles.card}>
                <h3>Page Views</h3>
                <div className={styles.value}>{data.overview.totalPageViews.toLocaleString()}</div>
                <div className={styles.sub}>Tracked pages</div>
              </article>
              <article className={styles.card}>
                <h3>Top Page</h3>
                <div className={styles.valueSmall}>{data.overview.mostVisitedPage?.page ?? '—'}</div>
                <div className={styles.sub}>
                  {data.overview.mostVisitedPage
                    ? `${data.overview.mostVisitedPage.views.toLocaleString()} views`
                    : 'No data'}
                </div>
              </article>
              <article className={styles.card}>
                <h3>Top Button</h3>
                <div className={styles.valueSmall}>{data.overview.mostClickedButton?.name ?? '—'}</div>
                <div className={styles.sub}>
                  {data.overview.mostClickedButton
                    ? `${data.overview.mostClickedButton.clicks.toLocaleString()} clicks`
                    : 'No data'}
                </div>
              </article>
              <article className={styles.card}>
                <h3>Conversions</h3>
                <div className={styles.value}>{data.overview.conversionActions.toLocaleString()}</div>
                <div className={styles.sub}>Forms & key CTAs</div>
              </article>
            </section>

            {days !== null ? (
              <IpMapPanel days={days} onSelectFilter={handleIpMapFilter} />
            ) : null}

            <DashboardCharts
              dailyVisitors={data.dailyVisitors}
              monthlyComparison={data.monthlyComparison}
              topPages={data.topPages}
              topEvents={data.topEvents ?? []}
              deviceBreakdown={data.deviceBreakdown}
            />
          </div>
        );

      case 'visitors':
        return (
          <div className={styles.dashboardMain}>
            <MonitoringServerTable<VisitorSessionRow>
              key="visitors"
              tableId="visitors"
              days={days!}
              defaultSortKey="lastSeen"
              searchSeed={visitorSearchSeed}
              title="Visitor Sessions"
              description="Unique users grouped by session ID"
              rowKey={(row) => row.sessionId ?? row.lastSeen}
              searchPlaceholder="Search session, IP, page, locale…"
              renderRowDetail={(row) => (
                <DetailPanel>
                  <DetailGrid>
                    <DetailItem
                      label="Session ID"
                      value={<code className={styles.mono}>{row.sessionId}</code>}
                      fullWidth
                    />
                    <DetailItem label="Client IP" value={formatClientIp(row.clientIp)} />
                    <DetailItem label="First Seen" value={formatDate(row.firstSeen)} />
                    <DetailItem label="Last Seen" value={formatDate(row.lastSeen)} />
                    <DetailItem label="Locale" value={row.locale} />
                    <DetailItem label="Device" value={row.device} />
                    <DetailItem label="Browser" value={row.browser} />
                    <DetailItem label="Page Views" value={row.pageViews.toLocaleString()} />
                    <DetailItem label="Total Events" value={row.events.toLocaleString()} />
                  </DetailGrid>
                  <DetailSection title="Routes visited" subtitle="Pages viewed in this session">
                    <DetailList
                      labelHeader="Path"
                      valueHeader="Views"
                      items={row.routes.map((route) => ({
                        label: route.path,
                        value: route.views.toLocaleString(),
                      }))}
                    />
                  </DetailSection>
                  <DetailSection title="Activity timeline" subtitle="Chronological event stream">
                    <DetailTimeline
                      items={row.timeline.map((item) => ({
                        time: formatDate(item.timestamp),
                        type: item.eventType,
                        name: item.eventName,
                        path: item.pathname,
                      }))}
                    />
                  </DetailSection>
                </DetailPanel>
              )}
              columns={[
                {
                  key: 'sessionId',
                  header: 'Session',
                  className: 'auditTableColMono',
                  sortValue: (row) => row.sessionId ?? '',
                  render: (row) => (
                    <code className={styles.mono}>
                      {row.sessionId ? `${row.sessionId.slice(0, 12)}…` : '—'}
                    </code>
                  ),
                },
                {
                  key: 'clientIp',
                  header: 'Client IP',
                  className: 'auditTableColIp',
                  sortValue: (row) => formatClientIp(row.clientIp),
                  render: (row) => formatClientIp(row.clientIp),
                },
                {
                  key: 'pageViews',
                  header: 'Page Views',
                  align: 'center',
                  sortValue: (row) => row.pageViews,
                  render: (row) => row.pageViews.toLocaleString(),
                },
                {
                  key: 'events',
                  header: 'Events',
                  align: 'center',
                  sortValue: (row) => row.events,
                  render: (row) => row.events.toLocaleString(),
                },
                {
                  key: 'topPage',
                  header: 'Top Page',
                  align: 'left',
                  className: 'auditTableColPath',
                  sortValue: (row) => row.topPage,
                  render: (row) => row.topPage,
                },
                {
                  key: 'locale',
                  header: 'Locale',
                  sortValue: (row) => row.locale,
                  render: (row) => row.locale,
                },
                {
                  key: 'device',
                  header: 'Device',
                  sortValue: (row) => row.device,
                  render: (row) => row.device,
                },
                {
                  key: 'lastSeen',
                  header: 'Last Seen',
                  sortValue: (row) => row.lastSeen,
                  render: (row) => formatDate(row.lastSeen),
                },
              ]}
            />
          </div>
        );

      case 'pages':
        return (
          <div className={styles.dashboardMain}>
            <MonitoringServerTable<TopPageRow>
              key="pages"
              tableId="pages"
              days={days!}
              defaultSortKey="views"
              title="Pages"
              description="Most visited paths in the selected range"
              rowKey={(row) => row.page}
              searchPlaceholder="Filter by page path…"
              renderRowDetail={(row) => (
                <DetailPanel>
                  <DetailGrid>
                    <DetailItem label="Full Pathname" value={row.page} fullWidth />
                    <DetailItem label="Views" value={row.views.toLocaleString()} />
                    <DetailItem label="Unique Sessions" value={row.uniqueSessions.toLocaleString()} />
                    <DetailItem label="Share" value={`${row.percentage}%`} />
                    <DetailItem
                      label="Trend vs Previous Period"
                      value={
                        <span className={row.trend >= 0 ? styles.trendUp : styles.trendDown}>
                          {row.trend >= 0 ? '+' : ''}
                          {row.trend}%
                        </span>
                      }
                    />
                  </DetailGrid>
                </DetailPanel>
              )}
              columns={[
                {
                  key: 'page',
                  header: 'Pathname',
                  align: 'left',
                  className: 'auditTableColPath',
                  sortValue: (row) => row.page,
                  render: (row) => row.page,
                },
                {
                  key: 'views',
                  header: 'Views',
                  sortValue: (row) => row.views,
                  render: (row) => row.views.toLocaleString(),
                },
                {
                  key: 'percentage',
                  header: 'Share',
                  sortValue: (row) => row.percentage,
                  render: (row) => `${row.percentage}%`,
                },
                {
                  key: 'trend',
                  header: 'Trend',
                  sortValue: (row) => row.trend,
                  render: (row) => (
                    <span className={row.trend >= 0 ? styles.trendUp : styles.trendDown}>
                      {row.trend >= 0 ? '+' : ''}
                      {row.trend}%
                    </span>
                  ),
                },
              ]}
            />
          </div>
        );

      case 'buttons':
        return (
          <div className={styles.dashboardMain}>
            <MonitoringServerTable<TopActionRow>
              key="buttons"
              tableId="buttons"
              days={days!}
              defaultSortKey="clicks"
              title="Button Clicks"
              description="Tracked CTA and navigation interactions"
              rowKey={(row) => row.name}
              searchPlaceholder="Search button or page…"
              renderRowDetail={(row) => (
                <DetailPanel>
                  <DetailGrid>
                    <DetailItem label="Button Name" value={row.name} fullWidth />
                    <DetailItem label="Total Clicks" value={row.clicks.toLocaleString()} />
                    <DetailItem label="Top Page" value={row.page} fullWidth />
                  </DetailGrid>
                  <DetailSection title="Pages breakdown" subtitle="Clicks per pathname">
                    <DetailList
                      labelHeader="Path"
                      valueHeader="Clicks"
                      items={row.pages.map((entry) => ({
                        label: entry.path,
                        value: entry.clicks.toLocaleString(),
                      }))}
                    />
                  </DetailSection>
                </DetailPanel>
              )}
              columns={[
                {
                  key: 'name',
                  header: 'Button',
                  sortValue: (row) => row.name,
                  render: (row) => row.name,
                },
                {
                  key: 'page',
                  header: 'Pathname',
                  align: 'left',
                  className: 'auditTableColPath',
                  sortValue: (row) => row.page,
                  render: (row) => row.page,
                },
                {
                  key: 'clicks',
                  header: 'Clicks',
                  sortValue: (row) => row.clicks,
                  render: (row) => row.clicks.toLocaleString(),
                },
              ]}
            />
          </div>
        );

      case 'forms':
        return (
          <div className={styles.dashboardMain}>
            <MonitoringServerTable<AnalyticsEventLogRow>
              key="forms"
              tableId="forms"
              days={days!}
              defaultSortKey="timestamp"
              title="Form Submissions"
              description="Contact form events with HTTP status and response details"
              rowKey={(row) => row.id}
              searchPlaceholder="Search form, path, status code…"
              renderRowDetail={(row) => (
                <DetailPanel>
                  <DetailGrid>
                    <DetailItem label="Form" value={row.eventName} />
                    <DetailItem
                      label="Status Code"
                      value={<FormStatusBadge statusCode={row.responseStatus} />}
                    />
                    <DetailItem
                      label="Result"
                      value={
                        <span className={row.success ? styles.detailStatusOk : styles.detailStatusError}>
                          {row.success ? 'Success' : 'Failed'}
                        </span>
                      }
                    />
                    <DetailItem label="Pathname" value={row.pathname} fullWidth />
                    <DetailItem
                      label="Session ID"
                      value={<code className={styles.mono}>{row.sessionId}</code>}
                      fullWidth
                    />
                    <DetailItem label="Locale" value={row.locale} />
                    <DetailItem label="Device" value={row.device} />
                    <DetailItem label="Browser" value={row.browser} />
                    <DetailItem label="Timestamp" value={formatDate(row.timestamp)} fullWidth />
                  </DetailGrid>
                  <DetailSection title="Request & response" subtitle="Submitted payload and server reply">
                    <FormRequestDetail
                      requestBodyJson={row.requestBodyJson}
                      responseStatus={row.responseStatus}
                      responseMessage={row.responseMessage}
                    />
                  </DetailSection>
                </DetailPanel>
              )}
              columns={[
                {
                  key: 'eventName',
                  header: 'Form',
                  sortValue: (row) => row.eventName,
                  render: (row) => row.eventName,
                },
                {
                  key: 'pathname',
                  header: 'Pathname',
                  align: 'left',
                  className: 'auditTableColPath',
                  sortValue: (row) => row.pathname,
                  render: (row) => row.pathname,
                },
                {
                  key: 'responseStatus',
                  header: 'Status',
                  align: 'center',
                  sortValue: (row) => row.responseStatus ?? -1,
                  render: (row) => <FormStatusBadge statusCode={row.responseStatus} />,
                },
                {
                  key: 'success',
                  header: 'Result',
                  align: 'center',
                  sortValue: (row) => (row.success ? 1 : 0),
                  render: (row) => (
                    <span className={row.success ? styles.trendUp : styles.trendDown}>
                      {row.success ? 'OK' : 'Failed'}
                    </span>
                  ),
                },
                {
                  key: 'timestamp',
                  header: 'Time',
                  sortValue: (row) => row.timestamp,
                  render: (row) => formatDate(row.timestamp),
                },
              ]}
            />
          </div>
        );

      case 'events':
        return (
          <div className={styles.dashboardMain}>
            <MonitoringServerTable<AnalyticsEventLogRow>
              key="events"
              tableId="events"
              days={days!}
              defaultSortKey="timestamp"
              title="Events Log"
              description="All tracked analytics events"
              rowKey={(row) => row.id}
              searchPlaceholder="Search type, name, path, session…"
              renderRowDetail={(row) => (
                <DetailPanel>
                  <DetailGrid>
                    <DetailItem label="Event Type" value={<EventTypeBadge type={row.eventType} />} />
                    <DetailItem label="Event Name" value={row.eventName} />
                    <DetailItem label="Pathname" value={row.pathname} fullWidth />
                    <DetailItem label="Page Title" value={row.title ?? '—'} fullWidth />
                    <DetailItem
                      label="Session ID"
                      value={<code className={styles.mono}>{row.sessionId}</code>}
                      fullWidth
                    />
                    <DetailItem label="Locale" value={row.locale} />
                    <DetailItem label="Device" value={row.device} />
                    <DetailItem label="Browser" value={row.browser} />
                    <DetailItem label="Referrer" value={row.referrer ?? '—'} fullWidth />
                    <DetailItem label="User Agent" value={row.userAgent ?? '—'} fullWidth />
                    <DetailItem label="Timestamp" value={formatDate(row.timestamp)} fullWidth />
                  </DetailGrid>
                  {row.eventType === 'formSubmit' ? (
                    <DetailSection title="Request & response" subtitle="Submitted payload and server reply">
                      <FormRequestDetail
                        requestBodyJson={row.requestBodyJson}
                        responseStatus={row.responseStatus}
                        responseMessage={row.responseMessage}
                      />
                    </DetailSection>
                  ) : null}
                </DetailPanel>
              )}
              columns={[
                {
                  key: 'eventType',
                  header: 'Type',
                  sortValue: (row) => row.eventType,
                  render: (row) => <EventTypeBadge type={row.eventType} />,
                },
                {
                  key: 'eventName',
                  header: 'Name',
                  sortValue: (row) => row.eventName,
                  render: (row) => row.eventName,
                },
                {
                  key: 'pathname',
                  header: 'Pathname',
                  align: 'left',
                  className: 'auditTableColPath',
                  sortValue: (row) => row.pathname,
                  render: (row) => row.pathname,
                },
                {
                  key: 'locale',
                  header: 'Locale',
                  sortValue: (row) => row.locale,
                  render: (row) => row.locale,
                },
                {
                  key: 'device',
                  header: 'Device',
                  sortValue: (row) => row.device,
                  render: (row) => row.device,
                },
                {
                  key: 'timestamp',
                  header: 'Time',
                  sortValue: (row) => row.timestamp,
                  render: (row) => formatDate(row.timestamp),
                },
              ]}
            />
          </div>
        );

      default:
        return null;
    }
  }

  if (days === null) {
    return null;
  }

  return (
    <MonitoringShell
      activeSection={section}
      onSectionChange={setSection}
      days={days}
      onDaysChange={setDays}
      rangeOptions={rangeOptions}
    >
      {renderContent()}
    </MonitoringShell>
  );
}
