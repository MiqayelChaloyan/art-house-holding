import { getServerClient } from '@/sanity/server-client';

import { MONITORING_SETTINGS_DOCUMENT_ID } from '@/sanity/constants/monitoring';

export interface MonitoringSettingsRecord {
  username: string;
  passwordHash: string;
  enabled: boolean;
  updatedAt?: string;
}

export type MonitoringSettingsLoadResult =
  | { status: 'ok'; settings: MonitoringSettingsRecord }
  | { status: 'not_found' }
  | { status: 'token_cannot_read' };

const SETTINGS_QUERY = `*[_type == "monitoringSettings" && _id == $id][0]{
  username,
  passwordHash,
  enabled,
  updatedAt
}`;

const FALLBACK_QUERY = `*[_type == "monitoringSettings"] | order(_updatedAt desc) [0]{
  username,
  passwordHash,
  enabled,
  updatedAt
}`;

/** Detect when settings exist in Sanity but the API token cannot read them. */
async function probeHiddenMonitoringDocument(): Promise<boolean> {
  const client = getServerClient();

  try {
    await client.create({
      _id: MONITORING_SETTINGS_DOCUMENT_ID,
      _type: 'monitoringSettings',
      username: '__access_probe__',
      enabled: false,
    });
    await client.delete(MONITORING_SETTINGS_DOCUMENT_ID);
    return false;
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    const body = typeof (error as { responseBody?: string }).responseBody === 'string'
      ? (error as { responseBody: string }).responseBody
      : '';

    return message.includes('already exists') || body.includes('already exists');
  }
}

/** Server-only fetch — never use the public CDN client for credentials. */
export async function loadMonitoringSettings(): Promise<MonitoringSettingsLoadResult> {
  const client = getServerClient();

  const byId = await client.fetch<MonitoringSettingsRecord | null>(
    SETTINGS_QUERY,
    { id: MONITORING_SETTINGS_DOCUMENT_ID },
    { cache: 'no-store' },
  );

  if (byId) {
    return { status: 'ok', settings: byId };
  }

  const fallback = await client.fetch<MonitoringSettingsRecord | null>(
    FALLBACK_QUERY,
    {},
    { cache: 'no-store' },
  );

  if (fallback) {
    return { status: 'ok', settings: fallback };
  }

  const hidden = await probeHiddenMonitoringDocument();
  if (hidden) {
    return { status: 'token_cannot_read' };
  }

  return { status: 'not_found' };
}

/** @deprecated Prefer loadMonitoringSettings for clearer error handling */
export async function getMonitoringSettings(): Promise<MonitoringSettingsRecord | null> {
  const result = await loadMonitoringSettings();
  return result.status === 'ok' ? result.settings : null;
}
