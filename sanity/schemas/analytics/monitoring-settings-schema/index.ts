import { defineField, defineType } from 'sanity';

import {
  MonitoringCurrentPasswordReadOnlyInput,
  MonitoringNewPasswordInput,
} from '../../../components/MonitoringPasswordInput';
import { MONITORING_SETTINGS_DOCUMENT_ID } from '../../../constants/monitoring';

export { MONITORING_SETTINGS_DOCUMENT_ID };

const monitoringSettingsSchema = defineType({
  name: 'monitoringSettings',
  title: 'Monitoring Settings',
  type: 'document',
  description: 'Monitoring dashboard login credentials only.',
  fields: [
    defineField({
      name: 'username',
      title: 'Monitoring Username',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(64),
    }),
    defineField({
      name: 'currentPassword',
      title: 'Current Password',
      type: 'string',
      readOnly: true,
      description: 'View only — updated automatically when you publish New Password. Cannot be edited or removed here.',
      components: {
        input: MonitoringCurrentPasswordReadOnlyInput,
      },
    }),
    defineField({
      name: 'newPassword',
      title: 'New Password',
      type: 'string',
      description: 'First setup: required. Later: optional — only fill to replace the current password.',
      components: {
        input: MonitoringNewPasswordInput,
      },
    }),
    defineField({
      name: 'passwordHash',
      title: 'Active Password Hash',
      type: 'string',
      readOnly: true,
      hidden: true,
      description: 'Managed automatically when you publish New Password.',
    }),
    defineField({
      name: 'enabled',
      title: 'Monitoring Enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Disable to block all monitoring dashboard logins.',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Credentials Updated At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      username: 'username',
      enabled: 'enabled',
      updatedAt: 'updatedAt',
    },
    prepare({ username, enabled, updatedAt }) {
      return {
        title: username ? `Monitoring: ${username}` : 'Monitoring Settings',
        subtitle: `${enabled ? 'Enabled' : 'Disabled'} · ${updatedAt ? new Date(updatedAt).toLocaleString() : 'Not configured'}`,
      };
    },
  },
});

export default monitoringSettingsSchema;
