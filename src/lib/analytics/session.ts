import { stripAnalyticsHost } from './path';

const SESSION_STORAGE_KEY = 'arthouse_analytics_session';
const SESSION_MAX_AGE_MS = 30 * 60 * 1000;

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function getSessionId(): string {
  if (typeof window === 'undefined') {
    return 'server';
  }

  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { id: string; createdAt: number };
      if (Date.now() - parsed.createdAt < SESSION_MAX_AGE_MS) {
        return parsed.id;
      }
    }
  } catch {
    // fall through to new session
  }

  const session = { id: generateId(), createdAt: Date.now() };
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  return session.id;
}

export function getLocaleFromPath(pathname: string): string {
  const pathOnly = stripAnalyticsHost(pathname);
  const match = pathOnly.match(/^\/(am|en|ru)(?:\/|$)/);
  return match?.[1] ?? 'am';
}
