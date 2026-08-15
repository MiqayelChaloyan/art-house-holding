import type {
  AnalyticsEventDocument,
  AnalyticsPayload,
  AnalyticsEventType,
  DeviceType,
} from '../types';
import { isHttpStatusSuccess } from '../http-status';
import { sanitizeFormRequestBody, sanitizeResponseMessage } from '../sanitize-form';

const VALID_EVENT_TYPES: AnalyticsEventType[] = ['pageView', 'buttonClick', 'formSubmit'];
const MAX_STRING_LENGTH = 500;
const MAX_EVENTS_PER_REQUEST = 25;

function sanitize(value: unknown, maxLength = MAX_STRING_LENGTH): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.slice(0, maxLength).trim() || undefined;
}

function sanitizeLocale(value: unknown): string | undefined {
  const locale = sanitize(value, 5);
  if (locale && ['am', 'en', 'ru'].includes(locale)) {
    return locale;
  }
  return undefined;
}

function parseDeviceType(value: unknown): DeviceType {
  const device = String(value);
  if (device === 'desktop' || device === 'mobile' || device === 'tablet') {
    return device;
  }
  return 'unknown';
}

export function validateCollectPayload(body: unknown): AnalyticsPayload[] | null {
  if (!body || typeof body !== 'object') return null;

  const events = (body as { events?: unknown }).events;
  if (!Array.isArray(events) || events.length === 0 || events.length > MAX_EVENTS_PER_REQUEST) {
    return null;
  }

  const validated: AnalyticsPayload[] = [];

  for (const raw of events) {
    if (!raw || typeof raw !== 'object') continue;

    const event = raw as Record<string, unknown>;
    const type = event.type;

    if (!VALID_EVENT_TYPES.includes(type as AnalyticsEventType)) continue;

    const timestamp = sanitize(event.timestamp, 40);
    const sessionId = sanitize(event.sessionId, 100);
    if (!timestamp || !sessionId) continue;

    if (type === 'pageView') {
      const pathname = sanitize(event.pathname);
      if (!pathname) continue;

      validated.push({
        type: 'pageView',
        pathname,
        title: sanitize(event.title) ?? '',
        locale: sanitizeLocale(event.locale) ?? 'am',
        timestamp,
        sessionId,
        userAgent: sanitize(event.userAgent, 1000) ?? '',
        device: parseDeviceType(event.device),
        browser: sanitize(event.browser, 50) ?? 'unknown',
        referrer: sanitize(event.referrer, 1000) ?? '',
      });
      continue;
    }

    if (type === 'buttonClick') {
      const name = sanitize(event.name, 200);
      const page = sanitize(event.page);
      if (!name || !page) continue;

      validated.push({
        type: 'buttonClick',
        name,
        page,
        locale: sanitizeLocale(event.locale) ?? 'am',
        timestamp,
        sessionId,
      });
      continue;
    }

    if (type === 'formSubmit') {
      const name = sanitize(event.name, 200);
      const page = sanitize(event.page);
      if (!name || !page) continue;

      const responseStatus =
        typeof event.responseStatus === 'number' && Number.isFinite(event.responseStatus)
          ? Math.trunc(event.responseStatus)
          : undefined;

      validated.push({
        type: 'formSubmit',
        name,
        page,
        locale: sanitizeLocale(event.locale) ?? 'am',
        success:
          responseStatus !== undefined ? isHttpStatusSuccess(responseStatus) : Boolean(event.success),
        timestamp,
        sessionId,
        requestBody: sanitizeFormRequestBody(event.requestBody as Record<string, unknown> | undefined),
        responseStatus,
        responseMessage: sanitizeResponseMessage(event.responseMessage),
      });
    }
  }

  return validated.length > 0 ? validated : null;
}

export function payloadToDocument(event: AnalyticsPayload): AnalyticsEventDocument {
  if (event.type === 'pageView') {
    return {
      _type: 'analyticsEvent',
      eventType: 'pageView',
      eventName: event.pathname,
      page: event.pathname,
      pathname: event.pathname,
      title: event.title,
      locale: event.locale,
      sessionId: event.sessionId,
      device: event.device,
      browser: event.browser,
      userAgent: event.userAgent,
      referrer: event.referrer,
      timestamp: event.timestamp,
    };
  }

  if (event.type === 'buttonClick') {
    return {
      _type: 'analyticsEvent',
      eventType: 'buttonClick',
      eventName: event.name,
      page: event.page,
      pathname: event.page,
      locale: event.locale,
      sessionId: event.sessionId,
      timestamp: event.timestamp,
    };
  }

  const doc: AnalyticsEventDocument = {
    _type: 'analyticsEvent',
    eventType: 'formSubmit',
    eventName: event.name,
    page: event.page,
    pathname: event.page,
    locale: event.locale,
    sessionId: event.sessionId,
    success: event.success,
    timestamp: event.timestamp,
  };

  if (event.requestBody) {
    doc.requestBodyJson = JSON.stringify(event.requestBody);
  }
  if (event.responseStatus !== undefined) {
    doc.responseStatus = event.responseStatus;
  }
  if (event.responseMessage) {
    doc.responseMessage = event.responseMessage;
  }

  return doc;
}
