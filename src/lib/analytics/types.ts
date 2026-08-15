export type AnalyticsEventType = 'pageView' | 'buttonClick' | 'formSubmit';

export interface PageViewPayload {
  type: 'pageView';
  pathname: string;
  title: string;
  locale: string;
  timestamp: string;
  sessionId: string;
  userAgent: string;
  device: DeviceType;
  browser: string;
  referrer: string;
}

export interface ButtonClickPayload {
  type: 'buttonClick';
  name: string;
  page: string;
  locale: string;
  timestamp: string;
  sessionId: string;
}

export interface FormSubmitPayload {
  type: 'formSubmit';
  name: string;
  page: string;
  locale: string;
  success: boolean;
  timestamp: string;
  sessionId: string;
  requestBody?: Record<string, unknown>;
  responseStatus?: number;
  responseMessage?: string;
}

export type AnalyticsPayload = PageViewPayload | ButtonClickPayload | FormSubmitPayload;

export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'unknown';

export interface AnalyticsEventDocument {
  _type: 'analyticsEvent';
  eventType: AnalyticsEventType;
  eventName?: string;
  page?: string;
  pathname?: string;
  title?: string;
  locale?: string;
  sessionId?: string;
  device?: DeviceType;
  browser?: string;
  userAgent?: string;
  referrer?: string;
  success?: boolean;
  clientIp?: string;
  requestBodyJson?: string;
  responseStatus?: number;
  responseMessage?: string;
  timestamp: string;
}

export interface DashboardOverview {
  totalVisitors: number;
  totalPageViews: number;
  mostVisitedPage: { page: string; views: number } | null;
  mostClickedButton: { name: string; clicks: number } | null;
  conversionActions: number;
}

export interface TopPageRow {
  page: string;
  views: number;
  percentage: number;
  trend: number;
  uniqueSessions: number;
}

export interface TopActionPageRow {
  path: string;
  clicks: number;
}

export interface TopActionRow {
  name: string;
  page: string;
  clicks: number;
  pages: TopActionPageRow[];
}

export interface TopEventRow {
  name: string;
  eventType: AnalyticsEventType;
  count: number;
}

export interface DailyVisitorPoint {
  date: string;
  visitors: number;
  pageViews: number;
}

export interface HeatmapCell {
  day: number;
  hour: number;
  count: number;
}

export interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
  unknown: number;
}
