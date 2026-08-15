import type {
  AnalyticsPayload,
  ButtonClickPayload,
  FormSubmitPayload,
  PageViewPayload,
} from './types';
import { resolveAnalyticsPath } from './path';
import { sanitizeFormRequestBody, sanitizeResponseMessage } from './sanitize-form';
import { getClientContext } from './device';
import { getLocaleFromPath, getSessionId } from './session';

const COLLECT_ENDPOINT = '/api/analytics/collect';
const FLUSH_INTERVAL_MS = 5000;
const MAX_BATCH_SIZE = 20;

let queue: AnalyticsPayload[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let isFlushing = false;

function enqueue(event: AnalyticsPayload): void {
  queue.push(event);

  if (queue.length >= MAX_BATCH_SIZE) {
    void flushQueue();
    return;
  }

  if (!flushTimer) {
    flushTimer = setTimeout(() => {
      void flushQueue();
    }, FLUSH_INTERVAL_MS);
  }
}

async function flushQueue(preferBeacon = false): Promise<void> {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }

  if (isFlushing || queue.length === 0) {
    return;
  }

  isFlushing = true;
  const batch = queue.splice(0, MAX_BATCH_SIZE);

  try {
    const body = JSON.stringify({ events: batch });

    if (
      preferBeacon &&
      typeof navigator !== 'undefined' &&
      navigator.sendBeacon
    ) {
      const sent = navigator.sendBeacon(
        COLLECT_ENDPOINT,
        new Blob([body], { type: 'application/json' }),
      );
      if (sent) {
        return;
      }
    }

    await fetch(COLLECT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      // fire-and-forget: silently drop on failure
    });
  } finally {
    isFlushing = false;
    if (queue.length > 0) {
      void flushQueue(preferBeacon);
    }
  }
}

export function trackPageView(input: {
  pathname: string;
  title?: string;
  locale?: string;
}): void {
  if (typeof window === 'undefined') return;

  const pathname = resolveAnalyticsPath(input.pathname);
  const { userAgent, device, browser, referrer } = getClientContext();
  const event: PageViewPayload = {
    type: 'pageView',
    pathname,
    title: input.title ?? document.title,
    locale: input.locale ?? getLocaleFromPath(pathname),
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    userAgent,
    device,
    browser,
    referrer,
  };

  enqueue(event);
}

export function trackButtonClick(input: {
  name: string;
  page?: string;
  locale?: string;
}): void {
  if (typeof window === 'undefined') return;

  const page = resolveAnalyticsPath(input.page);
  const event: ButtonClickPayload = {
    type: 'buttonClick',
    name: input.name,
    page,
    locale: input.locale ?? getLocaleFromPath(page),
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
  };

  enqueue(event);
  void flushQueue();
}

export function trackFormSubmit(input: {
  name: string;
  page?: string;
  locale?: string;
  success: boolean;
  requestBody?: Record<string, unknown>;
  responseStatus?: number;
  responseMessage?: string;
}): void {
  if (typeof window === 'undefined') return;

  const page = resolveAnalyticsPath(input.page);
  const event: FormSubmitPayload = {
    type: 'formSubmit',
    name: input.name,
    page,
    locale: input.locale ?? getLocaleFromPath(page),
    success:
      typeof input.responseStatus === 'number'
        ? input.responseStatus >= 200 && input.responseStatus < 300
        : input.success,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    requestBody: input.requestBody ? sanitizeFormRequestBody(input.requestBody) : undefined,
    responseStatus: input.responseStatus,
    responseMessage: input.responseMessage ? sanitizeResponseMessage(input.responseMessage) : undefined,
  };

  enqueue(event);
}

export function flushAnalytics(): void {
  void flushQueue(true);
}

if (typeof window !== 'undefined') {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushAnalytics();
    }
  });

  window.addEventListener('pagehide', () => {
    flushAnalytics();
  });
}
