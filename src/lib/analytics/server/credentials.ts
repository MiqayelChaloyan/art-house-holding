import bcrypt from 'bcryptjs';

import { loadMonitoringSettings } from './monitoring-settings';

export interface MonitoringAuthResult {
  ok: boolean;
  error?: string;
}

export async function verifyMonitoringCredentials(
  username: string,
  password: string,
): Promise<MonitoringAuthResult> {
  let loadResult;

  try {
    loadResult = await loadMonitoringSettings();
  } catch (error) {
    if (error instanceof Error && error.message === 'SANITY_SERVER_TOKEN_MISSING') {
      return {
        ok: false,
        error:
          'Server missing Sanity API token. Add SANITY_API_WRITE_TOKEN to .env (Sanity → Project → API → Tokens).',
      };
    }
    return { ok: false, error: 'Unable to verify credentials. Please try again later.' };
  }

  if (loadResult.status === 'token_cannot_read') {
    return {
      ok: false,
      error:
        'Monitoring settings exist in Sanity, but SANITY_API_WRITE_TOKEN cannot read them. Create a new token with Editor role at sanity.io/manage → API → Tokens, update .env, and restart the server.',
    };
  }

  if (loadResult.status === 'not_found') {
    return {
      ok: false,
      error:
        'Monitoring is not configured. Open Sanity Studio → MONITORING → Monitoring Settings, set username & password, turn Monitoring Enabled on, then Publish.',
    };
  }

  const settings = loadResult.settings;

  if (!settings.passwordHash) {
    return {
      ok: false,
      error: 'Monitoring password is not set. Open Sanity Studio → MONITORING → Monitoring Settings, set New Password, and Publish.',
    };
  }

  if (!settings.enabled) {
    return { ok: false, error: 'Monitoring login is currently disabled. Turn Monitoring Enabled on in Sanity Studio and Publish.' };
  }

  if (username !== settings.username) {
    return { ok: false, error: 'Invalid credentials' };
  }

  const matches = await bcrypt.compare(password, settings.passwordHash);
  if (!matches) {
    return { ok: false, error: 'Invalid credentials' };
  }

  return { ok: true };
}
