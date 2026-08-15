import type { DocumentActionComponent } from 'sanity';

/** Prevent manual creation of system-generated analytics events in Studio. */
export const blockAnalyticsEventCreate: DocumentActionComponent = () => null;

export const ANALYTICS_SYSTEM_TYPES = ['analyticsEvent'] as const;

/** Studio actions that modify or remove system-generated analytics documents. */
const BLOCKED_ANALYTICS_ACTIONS = new Set([
  'publish',
  'unpublish',
  'delete',
  'duplicate',
  'discardChanges',
  'restore',
  'schedule',
]);

export function filterAnalyticsDocumentActions(
  actions: DocumentActionComponent[],
  schemaType: string,
): DocumentActionComponent[] {
  if (!ANALYTICS_SYSTEM_TYPES.includes(schemaType as (typeof ANALYTICS_SYSTEM_TYPES)[number])) {
    return actions;
  }

  return actions.filter((action) => {
    const actionName =
      typeof action === 'function' ? undefined : (action as { action?: string }).action;
    return !actionName || !BLOCKED_ANALYTICS_ACTIONS.has(actionName);
  });
}

export function filterMonitoringSettingsActions(
  actions: DocumentActionComponent[],
  schemaType: string,
): DocumentActionComponent[] {
  if (schemaType !== 'monitoringSettings') {
    return actions;
  }

  return actions.filter((action) => {
    const actionName =
      typeof action === 'function' ? undefined : (action as { action?: string }).action;
    return actionName !== 'delete' && actionName !== 'duplicate';
  });
}

/**
 * Sanity project roles (configure at sanity.io/manage → API → Roles):
 *
 * monitoring-admin:
 *   - Read/write monitoringSettings
 *   - Read-only analyticsEvent in Studio
 *
 * analytics-system (API token used by Next.js cron + collect):
 *   - Create analyticsEvent
 *   - Delete analyticsEvent (cleanup job)
 *   - Read monitoringSettings (login verification only)
 *
 * editor (default CMS):
 *   - No access to monitoringSettings, analyticsEvent
 */
export const SANITY_ROLE_NAMES = {
  monitoringAdmin: 'monitoring-admin',
  analyticsSystem: 'analytics-system',
  editor: 'editor',
} as const;
