import { getServerClient } from '@/sanity/server-client';

import { formatClientIp, isUsableClientIp, normalizeClientIp } from '@/src/lib/analytics/client-ip';
import { isHttpStatusSuccess } from '@/src/lib/analytics/http-status';

import type {
  DailyVisitorPoint,
  DashboardOverview,
  DeviceBreakdown,
  HeatmapCell,
  TopActionRow,
  TopEventRow,
  TopPageRow,
} from '../types';

interface RawEvent {
  _id?: string;
  eventType: string;
  eventName?: string;
  page?: string;
  pathname?: string;
  locale?: string;
  sessionId?: string;
  device?: string;
  browser?: string;
  success?: boolean;
  clientIp?: string;
  requestBodyJson?: string;
  responseStatus?: number;
  responseMessage?: string;
  title?: string;
  userAgent?: string;
  referrer?: string;
  timestamp?: string;
}

export interface AnalyticsEventLogRow {
  id: string;
  eventType: string;
  eventName: string;
  pathname: string;
  locale: string;
  device: string;
  browser: string;
  sessionId: string;
  success?: boolean;
  clientIp?: string;
  requestBodyJson?: string;
  responseStatus?: number;
  responseMessage?: string;
  title?: string;
  userAgent?: string;
  referrer?: string;
  timestamp: string;
}

export interface VisitorRouteRow {
  path: string;
  views: number;
}

export interface VisitorTimelineRow {
  eventType: string;
  eventName: string;
  pathname: string;
  timestamp: string;
}

export interface VisitorSessionRow {
  sessionId: string;
  clientIp?: string;
  firstSeen: string;
  lastSeen: string;
  pageViews: number;
  events: number;
  topPage: string;
  locale: string;
  device: string;
  browser: string;
  routes: VisitorRouteRow[];
  timeline: VisitorTimelineRow[];
}

export interface MonitoringDashboardData {
  overview: DashboardOverview;
  dailyVisitors: DailyVisitorPoint[];
  monthlyComparison: { current: DailyVisitorPoint[]; previous: DailyVisitorPoint[] };
  topPages: TopPageRow[];
  topActions: TopActionRow[];
  topEvents: TopEventRow[];
  deviceBreakdown: DeviceBreakdown;
  heatmap: HeatmapCell[];
}

export type MonitoringTableId = 'visitors' | 'pages' | 'buttons' | 'forms' | 'events';

export interface TablePaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface MonitoringTableQuery {
  table: MonitoringTableId;
  days: number;
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  sortDir?: 'asc' | 'desc';
}

export interface MonitoringTableResult {
  rows: unknown[];
  pagination: TablePaginationMeta;
}

const CONVERSION_EVENT_NAMES = new Set([
  'Contact Us',
  'Apply Course',
  'Course Registration',
  'Send Request',
  'Take Test',
  'Download',
  'Form Submit',
]);

function getDateRange(days: number): { start: string; end: string } {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
}

async function fetchEventsInRange(start: string, end: string): Promise<RawEvent[]> {
  const client = getServerClient();

  return client.fetch<RawEvent[]>(
    `*[_type == "analyticsEvent" && timestamp >= $start && timestamp <= $end]{
      _id,
      eventType,
      eventName,
      page,
      pathname,
      locale,
      sessionId,
      device,
      browser,
      success,
      clientIp,
      requestBodyJson,
      responseStatus,
      responseMessage,
      title,
      userAgent,
      referrer,
      timestamp
    }`,
    { start, end },
    { cache: 'no-store' },
  );
}

export async function getDashboardOverview(days = 30): Promise<DashboardOverview> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);

  const pageViews = events.filter((e) => e.eventType === 'pageView');
  const buttonClicks = events.filter((e) => e.eventType === 'buttonClick');
  const formSubmits = events.filter((e) => e.eventType === 'formSubmit');

  const uniqueSessions = new Set(
    events.map((e) => e.sessionId).filter(Boolean),
  );

  const pageCounts = new Map<string, number>();
  pageViews.forEach((e) => {
    const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
    pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
  });

  const buttonCounts = new Map<string, number>();
  buttonClicks.forEach((e) => {
    const name = e.eventName ?? 'unknown';
    buttonCounts.set(name, (buttonCounts.get(name) ?? 0) + 1);
  });

  let mostVisitedPage: DashboardOverview['mostVisitedPage'] = null;
  let maxViews = 0;
  pageCounts.forEach((views, page) => {
    if (views > maxViews) {
      maxViews = views;
      mostVisitedPage = { page, views };
    }
  });

  let mostClickedButton: DashboardOverview['mostClickedButton'] = null;
  let maxClicks = 0;
  buttonCounts.forEach((clicks, name) => {
    if (clicks > maxClicks) {
      maxClicks = clicks;
      mostClickedButton = { name, clicks };
    }
  });

  const conversionActions =
    buttonClicks.filter((e) => CONVERSION_EVENT_NAMES.has(e.eventName ?? '')).length +
    formSubmits.filter((e) => e.eventName).length;

  return {
    totalVisitors: uniqueSessions.size,
    totalPageViews: pageViews.length,
    mostVisitedPage,
    mostClickedButton,
    conversionActions,
  };
}

export async function getDailyVisitors(days = 30): Promise<DailyVisitorPoint[]> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);

  const byDate = new Map<string, { sessions: Set<string>; pageViews: number }>();

  events.forEach((e) => {
    if (!e.timestamp) return;
    const date = e.timestamp.slice(0, 10);
    if (!byDate.has(date)) {
      byDate.set(date, { sessions: new Set(), pageViews: 0 });
    }
    const entry = byDate.get(date)!;
    if (e.sessionId) entry.sessions.add(e.sessionId);
    if (e.eventType === 'pageView') entry.pageViews += 1;
  });

  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date,
      visitors: data.sessions.size,
      pageViews: data.pageViews,
    }));
}

export async function getTopPages(days = 30, limit = 10): Promise<TopPageRow[]> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);
  const pageViews = events.filter((e) => e.eventType === 'pageView');
  const total = pageViews.length || 1;

  const counts = new Map<string, number>();
  const sessionsByPage = new Map<string, Set<string>>();
  pageViews.forEach((e) => {
    const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
    counts.set(page, (counts.get(page) ?? 0) + 1);
    if (e.sessionId) {
      if (!sessionsByPage.has(page)) sessionsByPage.set(page, new Set());
      sessionsByPage.get(page)!.add(e.sessionId);
    }
  });

  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - days);
  const prevEvents = await fetchEventsInRange(prevStart.toISOString(), start);
  const prevCounts = new Map<string, number>();
  prevEvents
    .filter((e) => e.eventType === 'pageView')
    .forEach((e) => {
      const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
      prevCounts.set(page, (prevCounts.get(page) ?? 0) + 1);
    });

  return Array.from(counts.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([page, views]) => {
      const prev = prevCounts.get(page) ?? 0;
      const trend = prev === 0 ? 100 : Math.round(((views - prev) / prev) * 100);
      return {
        page,
        views,
        percentage: Math.round((views / total) * 1000) / 10,
        trend,
        uniqueSessions: sessionsByPage.get(page)?.size ?? 0,
      };
    });
}

export async function getTopActions(days = 30, limit = 10): Promise<TopActionRow[]> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);
  const clicks = events.filter((e) => e.eventType === 'buttonClick');

  const map = new Map<string, { page: string; clicks: number; pages: Map<string, number> }>();
  clicks.forEach((e) => {
    const name = e.eventName ?? 'unknown';
    const page = e.pathname ?? e.page ?? '—';
    const existing = map.get(name);
    if (existing) {
      existing.clicks += 1;
      existing.pages.set(page, (existing.pages.get(page) ?? 0) + 1);
    } else {
      map.set(name, { page, clicks: 1, pages: new Map([[page, 1]]) });
    }
  });

  return Array.from(map.entries())
    .sort(([, a], [, b]) => b.clicks - a.clicks)
    .slice(0, limit)
    .map(([name, data]) => ({
      name,
      page: data.page,
      clicks: data.clicks,
      pages: Array.from(data.pages.entries())
        .map(([path, clickCount]) => ({ path, clicks: clickCount }))
        .sort((a, b) => b.clicks - a.clicks),
    }));
}

export async function getDeviceBreakdown(days = 30): Promise<DeviceBreakdown> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);
  const pageViews = events.filter((e) => e.eventType === 'pageView');

  const breakdown: DeviceBreakdown = {
    desktop: 0,
    mobile: 0,
    tablet: 0,
    unknown: 0,
  };

  pageViews.forEach((e) => {
    const device = e.device as keyof DeviceBreakdown | undefined;
    if (device && device in breakdown) {
      breakdown[device] += 1;
    } else {
      breakdown.unknown += 1;
    }
  });

  return breakdown;
}

export async function getActivityHeatmap(days = 30): Promise<HeatmapCell[]> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);

  const grid = new Map<string, number>();

  events.forEach((e) => {
    if (!e.timestamp) return;
    const date = new Date(e.timestamp);
    const day = date.getUTCDay();
    const hour = date.getUTCHours();
    const key = `${day}-${hour}`;
    grid.set(key, (grid.get(key) ?? 0) + 1);
  });

  const cells: HeatmapCell[] = [];
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      cells.push({
        day,
        hour,
        count: grid.get(`${day}-${hour}`) ?? 0,
      });
    }
  }

  return cells;
}

export async function getMonthlyComparison(): Promise<{
  current: DailyVisitorPoint[];
  previous: DailyVisitorPoint[];
}> {
  const now = new Date();
  const currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [currentEvents, prevEvents] = await Promise.all([
    fetchEventsInRange(currentStart.toISOString(), now.toISOString()),
    fetchEventsInRange(prevStart.toISOString(), prevEnd.toISOString()),
  ]);

  function aggregate(events: RawEvent[]): DailyVisitorPoint[] {
    const byDate = new Map<string, { sessions: Set<string>; pageViews: number }>();
    events.forEach((e) => {
      if (!e.timestamp) return;
      const date = e.timestamp.slice(0, 10);
      if (!byDate.has(date)) {
        byDate.set(date, { sessions: new Set(), pageViews: 0 });
      }
      const entry = byDate.get(date)!;
      if (e.sessionId) entry.sessions.add(e.sessionId);
      if (e.eventType === 'pageView') entry.pageViews += 1;
    });

    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        visitors: data.sessions.size,
        pageViews: data.pageViews,
      }));
  }

  return {
    current: aggregate(currentEvents),
    previous: aggregate(prevEvents),
  };
}

function mapEventLogRow(event: RawEvent): AnalyticsEventLogRow {
  const responseStatus = event.responseStatus;
  const success =
    typeof responseStatus === 'number'
      ? isHttpStatusSuccess(responseStatus)
      : Boolean(event.success);

  return {
    id: event._id ?? `${event.timestamp}-${event.sessionId}`,
    eventType: event.eventType,
    eventName: event.eventName ?? '—',
    pathname: event.pathname ?? event.page ?? '—',
    locale: event.locale ?? '—',
    device: event.device ?? '—',
    browser: event.browser ?? '—',
    sessionId: event.sessionId ?? '—',
    success,
    clientIp: isUsableClientIp(event.clientIp) ? normalizeClientIp(event.clientIp) : undefined,
    requestBodyJson: event.requestBodyJson,
    responseStatus,
    responseMessage: event.responseMessage,
    title: event.title,
    userAgent: event.userAgent,
    referrer: event.referrer,
    timestamp: event.timestamp ?? '',
  };
}

export function buildVisitorSessions(events: RawEvent[]): VisitorSessionRow[] {
  const sessions = new Map<
    string,
    {
      firstSeen: string;
      lastSeen: string;
      pageViews: number;
      events: number;
      pages: Map<string, number>;
      locale: string;
      device: string;
      browser: string;
      clientIp?: string;
      timeline: VisitorTimelineRow[];
    }
  >();

  events.forEach((event) => {
    if (!event.sessionId || !event.timestamp) return;

    const entry = sessions.get(event.sessionId) ?? {
      firstSeen: event.timestamp,
      lastSeen: event.timestamp,
      pageViews: 0,
      events: 0,
      pages: new Map<string, number>(),
      locale: event.locale ?? '—',
      device: event.device ?? 'unknown',
      browser: event.browser ?? '—',
      clientIp: isUsableClientIp(event.clientIp) ? normalizeClientIp(event.clientIp) : undefined,
      timeline: [],
    };

    entry.events += 1;
    if (event.timestamp < entry.firstSeen) entry.firstSeen = event.timestamp;
    if (event.timestamp > entry.lastSeen) entry.lastSeen = event.timestamp;
    if (event.locale) entry.locale = event.locale;
    if (event.device) entry.device = event.device;
    if (event.browser) entry.browser = event.browser;
    if (isUsableClientIp(event.clientIp)) {
      entry.clientIp = normalizeClientIp(event.clientIp);
    }

    const path = event.pathname ?? event.page ?? '—';
    entry.timeline.push({
      eventType: event.eventType,
      eventName: event.eventName ?? '—',
      pathname: path,
      timestamp: event.timestamp,
    });

    if (event.eventType === 'pageView') {
      entry.pageViews += 1;
      entry.pages.set(path, (entry.pages.get(path) ?? 0) + 1);
    }

    sessions.set(event.sessionId, entry);
  });

  return Array.from(sessions.entries())
    .map(([sessionId, data]) => {
      let topPage = '—';
      let maxViews = 0;
      data.pages.forEach((views, page) => {
        if (views > maxViews) {
          maxViews = views;
          topPage = page;
        }
      });

      const routes = Array.from(data.pages.entries())
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views);

      const timeline = data.timeline
        .slice()
        .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

      return {
        sessionId,
        clientIp: isUsableClientIp(data.clientIp) ? normalizeClientIp(data.clientIp) : undefined,
        firstSeen: data.firstSeen,
        lastSeen: data.lastSeen,
        pageViews: data.pageViews,
        events: data.events,
        topPage,
        locale: data.locale,
        device: data.device,
        browser: data.browser,
        routes,
        timeline,
      };
    })
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}

function buildTopPagesList(events: RawEvent[], prevPeriodEvents: RawEvent[]): TopPageRow[] {
  const pageViews = events.filter((e) => e.eventType === 'pageView');
  const pageCounts = new Map<string, number>();
  const pageSessions = new Map<string, Set<string>>();

  pageViews.forEach((e) => {
    const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
    pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
    if (e.sessionId) {
      if (!pageSessions.has(page)) pageSessions.set(page, new Set());
      pageSessions.get(page)!.add(e.sessionId);
    }
  });

  const prevPageCounts = new Map<string, number>();
  prevPeriodEvents
    .filter((e) => e.eventType === 'pageView')
    .forEach((e) => {
      const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
      prevPageCounts.set(page, (prevPageCounts.get(page) ?? 0) + 1);
    });

  const totalPageViews = pageViews.length || 1;

  return Array.from(pageCounts.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([page, views]) => {
      const prev = prevPageCounts.get(page) ?? 0;
      const trend = prev === 0 ? 100 : Math.round(((views - prev) / prev) * 100);
      return {
        page,
        views,
        percentage: Math.round((views / totalPageViews) * 1000) / 10,
        trend,
        uniqueSessions: pageSessions.get(page)?.size ?? 0,
      };
    });
}

function buildTopActionsList(events: RawEvent[]): TopActionRow[] {
  const buttonClicks = events.filter((e) => e.eventType === 'buttonClick');
  const actionMap = new Map<string, { page: string; clicks: number; pages: Map<string, number> }>();

  buttonClicks.forEach((e) => {
    const name = e.eventName ?? 'unknown';
    const page = e.pathname ?? e.page ?? '—';
    const existing = actionMap.get(name);
    if (existing) {
      existing.clicks += 1;
      existing.pages.set(page, (existing.pages.get(page) ?? 0) + 1);
    } else {
      actionMap.set(name, { page, clicks: 1, pages: new Map([[page, 1]]) });
    }
  });

  return Array.from(actionMap.entries())
    .sort(([, a], [, b]) => b.clicks - a.clicks)
    .map(([name, data]) => ({
      name,
      page: data.page,
      clicks: data.clicks,
      pages: Array.from(data.pages.entries())
        .map(([path, clickCount]) => ({ path, clicks: clickCount }))
        .sort((a, b) => b.clicks - a.clicks),
    }));
}

function buildEventLogsList(events: RawEvent[]): AnalyticsEventLogRow[] {
  return events
    .slice()
    .sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''))
    .map(mapEventLogRow);
}

const TABLE_DEFAULT_SORT: Record<MonitoringTableId, { key: string; dir: 'asc' | 'desc' }> = {
  visitors: { key: 'lastSeen', dir: 'desc' },
  pages: { key: 'views', dir: 'desc' },
  buttons: { key: 'clicks', dir: 'desc' },
  forms: { key: 'timestamp', dir: 'desc' },
  events: { key: 'timestamp', dir: 'desc' },
};

const TABLE_SORT_KEYS: Record<MonitoringTableId, Set<string>> = {
  visitors: new Set([
    'sessionId',
    'clientIp',
    'pageViews',
    'events',
    'topPage',
    'locale',
    'device',
    'lastSeen',
    'firstSeen',
  ]),
  pages: new Set(['page', 'views', 'percentage', 'trend', 'uniqueSessions']),
  buttons: new Set(['name', 'page', 'clicks']),
  forms: new Set(['eventName', 'pathname', 'responseStatus', 'success', 'timestamp']),
  events: new Set(['eventType', 'eventName', 'pathname', 'locale', 'device', 'timestamp']),
};

function normalizeSearch(value?: string): string {
  return value?.trim().toLowerCase() ?? '';
}

function paginateRows<T>(rows: T[], page: number, limit: number): { rows: T[]; pagination: TablePaginationMeta } {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    rows: rows.slice(start, start + limit),
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  };
}

function sortRows<T>(
  rows: T[],
  sortKey: string,
  sortDir: 'asc' | 'desc',
  getValue: (row: T, key: string) => string | number | boolean | undefined,
): T[] {
  const sorted = [...rows];
  sorted.sort((a, b) => {
    const av = getValue(a, sortKey);
    const bv = getValue(b, sortKey);

    if (typeof av === 'number' && typeof bv === 'number') {
      return sortDir === 'asc' ? av - bv : bv - av;
    }

    if (typeof av === 'boolean' && typeof bv === 'boolean') {
      const avNum = av ? 1 : 0;
      const bvNum = bv ? 1 : 0;
      return sortDir === 'asc' ? avNum - bvNum : bvNum - avNum;
    }

    const avStr = String(av ?? '');
    const bvStr = String(bv ?? '');
    return sortDir === 'asc' ? avStr.localeCompare(bvStr) : bvStr.localeCompare(avStr);
  });
  return sorted;
}

function filterVisitorSessions(rows: VisitorSessionRow[], search: string): VisitorSessionRow[] {
  if (!search) return rows;
  return rows.filter((row) =>
    [row.sessionId, formatClientIp(row.clientIp), row.topPage, row.locale, row.device]
      .join(' ')
      .toLowerCase()
      .includes(search),
  );
}

function filterTopPages(rows: TopPageRow[], search: string): TopPageRow[] {
  if (!search) return rows;
  return rows.filter((row) => row.page.toLowerCase().includes(search));
}

function filterTopActions(rows: TopActionRow[], search: string): TopActionRow[] {
  if (!search) return rows;
  return rows.filter((row) => `${row.name} ${row.page}`.toLowerCase().includes(search));
}

function filterEventLogs(rows: AnalyticsEventLogRow[], search: string): AnalyticsEventLogRow[] {
  if (!search) return rows;
  return rows.filter((row) =>
    [
      row.eventName,
      row.pathname,
      row.locale,
      row.eventType,
      row.sessionId,
      row.responseStatus != null ? String(row.responseStatus) : '',
      row.responseMessage ?? '',
    ]
      .join(' ')
      .toLowerCase()
      .includes(search),
  );
}

export async function getMonitoringTableData(query: MonitoringTableQuery): Promise<MonitoringTableResult> {
  const limit = Math.min(Math.max(1, query.limit), 100);
  const page = Math.max(1, query.page);
  const search = normalizeSearch(query.search);
  const defaultSort = TABLE_DEFAULT_SORT[query.table];
  const sortKey =
    query.sort && TABLE_SORT_KEYS[query.table].has(query.sort) ? query.sort : defaultSort.key;
  const sortDir = query.sortDir === 'asc' || query.sortDir === 'desc' ? query.sortDir : defaultSort.dir;

  const { start, end } = getDateRange(query.days);
  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - query.days);

  const [events, prevPeriodEvents] = await Promise.all([
    fetchEventsInRange(start, end),
    query.table === 'pages'
      ? fetchEventsInRange(prevStart.toISOString(), start)
      : Promise.resolve([] as RawEvent[]),
  ]);

  switch (query.table) {
    case 'visitors': {
      const filtered = filterVisitorSessions(buildVisitorSessions(events), search);
      const sorted = sortRows(filtered, sortKey, sortDir, (row, key) => {
        if (key === 'clientIp') return row.clientIp ?? '';
        return row[key as keyof VisitorSessionRow] as string | number;
      });
      return paginateRows(sorted, page, limit);
    }
    case 'pages': {
      const filtered = filterTopPages(buildTopPagesList(events, prevPeriodEvents), search);
      const sorted = sortRows(filtered, sortKey, sortDir, (row, key) => row[key as keyof TopPageRow] as string | number);
      return paginateRows(sorted, page, limit);
    }
    case 'buttons': {
      const filtered = filterTopActions(buildTopActionsList(events), search);
      const sorted = sortRows(filtered, sortKey, sortDir, (row, key) => row[key as keyof TopActionRow] as string | number);
      return paginateRows(sorted, page, limit);
    }
    case 'forms': {
      const formRows = buildEventLogsList(events.filter((event) => event.eventType === 'formSubmit'));
      const filtered = filterEventLogs(formRows, search);
      const sorted = sortRows(filtered, sortKey, sortDir, (row, key) => {
        if (key === 'success') return row.success ?? false;
        return row[key as keyof AnalyticsEventLogRow] as string | number | boolean;
      });
      return paginateRows(sorted, page, limit);
    }
    case 'events': {
      const filtered = filterEventLogs(buildEventLogsList(events), search);
      const sorted = sortRows(filtered, sortKey, sortDir, (row, key) => row[key as keyof AnalyticsEventLogRow] as string | number);
      return paginateRows(sorted, page, limit);
    }
    default:
      return paginateRows([], page, limit);
  }
}

export async function getMonitoringDashboardData(days = 30): Promise<MonitoringDashboardData> {
  const { start, end } = getDateRange(days);
  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - days);

  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [events, prevPeriodEvents, currentMonthEvents, prevMonthEvents] = await Promise.all([
    fetchEventsInRange(start, end),
    fetchEventsInRange(prevStart.toISOString(), start),
    fetchEventsInRange(currentMonthStart.toISOString(), now.toISOString()),
    fetchEventsInRange(prevMonthStart.toISOString(), prevMonthEnd.toISOString()),
  ]);

  const pageViews = events.filter((e) => e.eventType === 'pageView');
  const buttonClicks = events.filter((e) => e.eventType === 'buttonClick');
  const formSubmits = events.filter((e) => e.eventType === 'formSubmit');

  const uniqueSessions = new Set(events.map((e) => e.sessionId).filter(Boolean));

  const pageCounts = new Map<string, number>();
  const pageSessions = new Map<string, Set<string>>();
  pageViews.forEach((e) => {
    const page = e.pathname ?? e.page ?? e.eventName ?? 'unknown';
    pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
    if (e.sessionId) {
      if (!pageSessions.has(page)) pageSessions.set(page, new Set());
      pageSessions.get(page)!.add(e.sessionId);
    }
  });

  const buttonCounts = new Map<string, number>();
  buttonClicks.forEach((e) => {
    const name = e.eventName ?? 'unknown';
    buttonCounts.set(name, (buttonCounts.get(name) ?? 0) + 1);
  });

  let mostVisitedPage: DashboardOverview['mostVisitedPage'] = null;
  let maxViews = 0;
  pageCounts.forEach((views, page) => {
    if (views > maxViews) {
      maxViews = views;
      mostVisitedPage = { page, views };
    }
  });

  let mostClickedButton: DashboardOverview['mostClickedButton'] = null;
  let maxClicks = 0;
  buttonCounts.forEach((clicks, name) => {
    if (clicks > maxClicks) {
      maxClicks = clicks;
      mostClickedButton = { name, clicks };
    }
  });

  const conversionActions =
    buttonClicks.filter((e) => CONVERSION_EVENT_NAMES.has(e.eventName ?? '')).length +
    formSubmits.filter((e) => e.eventName).length;

  const overview: DashboardOverview = {
    totalVisitors: uniqueSessions.size,
    totalPageViews: pageViews.length,
    mostVisitedPage,
    mostClickedButton,
    conversionActions,
  };

  function aggregateDaily(source: RawEvent[]): DailyVisitorPoint[] {
    const byDate = new Map<string, { sessions: Set<string>; pageViews: number }>();
    source.forEach((e) => {
      if (!e.timestamp) return;
      const date = e.timestamp.slice(0, 10);
      if (!byDate.has(date)) {
        byDate.set(date, { sessions: new Set(), pageViews: 0 });
      }
      const entry = byDate.get(date)!;
      if (e.sessionId) entry.sessions.add(e.sessionId);
      if (e.eventType === 'pageView') entry.pageViews += 1;
    });

    return Array.from(byDate.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        visitors: data.sessions.size,
        pageViews: data.pageViews,
      }));
  }

  const dailyVisitors = aggregateDaily(events);
  const monthlyComparison = {
    current: aggregateDaily(currentMonthEvents),
    previous: aggregateDaily(prevMonthEvents),
  };

  const topPages = buildTopPagesList(events, prevPeriodEvents).slice(0, 50);
  const topActions = buildTopActionsList(events).slice(0, 50);

  const eventCountMap = new Map<string, TopEventRow>();
  buttonClicks.forEach((e) => {
    const name = e.eventName ?? 'Unknown button';
    const key = `buttonClick::${name}`;
    const existing = eventCountMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      eventCountMap.set(key, { name, eventType: 'buttonClick', count: 1 });
    }
  });
  formSubmits.forEach((e) => {
    const name = e.eventName ?? 'Form submit';
    const key = `formSubmit::${name}`;
    const existing = eventCountMap.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      eventCountMap.set(key, { name, eventType: 'formSubmit', count: 1 });
    }
  });

  const topEvents: TopEventRow[] = Array.from(eventCountMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);

  const deviceBreakdown: DeviceBreakdown = {
    desktop: 0,
    mobile: 0,
    tablet: 0,
    unknown: 0,
  };
  pageViews.forEach((e) => {
    const device = e.device as keyof DeviceBreakdown | undefined;
    if (device && device in deviceBreakdown) {
      deviceBreakdown[device] += 1;
    } else {
      deviceBreakdown.unknown += 1;
    }
  });

  const heatGrid = new Map<string, number>();
  events.forEach((e) => {
    if (!e.timestamp) return;
    const date = new Date(e.timestamp);
    const day = date.getUTCDay();
    const hour = date.getUTCHours();
    const key = `${day}-${hour}`;
    heatGrid.set(key, (heatGrid.get(key) ?? 0) + 1);
  });

  const heatmap: HeatmapCell[] = [];
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      heatmap.push({
        day,
        hour,
        count: heatGrid.get(`${day}-${hour}`) ?? 0,
      });
    }
  }

  return {
    overview,
    dailyVisitors,
    monthlyComparison,
    topPages,
    topActions,
    topEvents,
    deviceBreakdown,
    heatmap,
  };
}

export type IpActivityItem = {
  clientIp: string;
  requestCount: number;
};

export type IpActivityMeta = {
  uniqueIps: number;
  requestCount: number;
  limit: number;
};

const IP_ACTIVITY_LIMIT = 250;

export async function getIpActivity(days = 30): Promise<{ data: IpActivityItem[]; meta: IpActivityMeta }> {
  const { start, end } = getDateRange(days);
  const events = await fetchEventsInRange(start, end);
  const counts = new Map<string, number>();

  for (const event of events) {
    if (!isUsableClientIp(event.clientIp)) continue;
    const ip = normalizeClientIp(event.clientIp!);
    counts.set(ip, (counts.get(ip) ?? 0) + 1);
  }

  const data = [...counts.entries()]
    .map(([clientIp, requestCount]) => ({ clientIp, requestCount }))
    .sort((left, right) => right.requestCount - left.requestCount)
    .slice(0, IP_ACTIVITY_LIMIT);

  return {
    data,
    meta: {
      uniqueIps: data.length,
      requestCount: data.reduce((sum, item) => sum + item.requestCount, 0),
      limit: IP_ACTIVITY_LIMIT,
    },
  };
}
