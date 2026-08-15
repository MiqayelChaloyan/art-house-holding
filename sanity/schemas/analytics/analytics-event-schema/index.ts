import { defineField, defineType } from 'sanity';

const analyticsEventSchema = defineType({
  name: 'analyticsEvent',
  title: 'Analytics Event',
  type: 'document',
  description: 'View only. Events are created automatically by website tracking — admins cannot edit or delete them here.',
  fields: [
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'Page View', value: 'pageView' },
          { title: 'Button Click', value: 'buttonClick' },
          { title: 'Form Submit', value: 'formSubmit' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'pathname',
      title: 'Pathname',
      type: 'string',
      readOnly: true,
      description: 'Full path with host, e.g. localhost/am/language or arthouse.am/am/design/contact',
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'pageView',
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          { title: 'Armenian', value: 'am' },
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
        ],
      },
    }),
    defineField({
      name: 'sessionId',
      title: 'Session ID',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'device',
      title: 'Device',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'pageView',
      options: {
        list: ['desktop', 'mobile', 'tablet', 'unknown'],
      },
    }),
    defineField({
      name: 'browser',
      title: 'Browser',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'pageView',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'pageView',
    }),
    defineField({
      name: 'referrer',
      title: 'Referrer',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'pageView',
    }),
    defineField({
      name: 'success',
      title: 'Success (forms)',
      type: 'boolean',
      readOnly: true,
      hidden: ({ document }) => document?.eventType !== 'formSubmit',
    }),
    defineField({
      name: 'clientIp',
      title: 'Client IP',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) =>
        document?.eventType !== 'formSubmit' ||
        !document?.eventName?.toString().startsWith('Contact Us'),
    }),
    defineField({
      name: 'requestBodyJson',
      title: 'Request Body (JSON)',
      type: 'text',
      readOnly: true,
      hidden: ({ document }) =>
        document?.eventType !== 'formSubmit' ||
        !document?.eventName?.toString().startsWith('Contact Us'),
    }),
    defineField({
      name: 'responseStatus',
      title: 'Response Status',
      type: 'number',
      readOnly: true,
      hidden: ({ document }) =>
        document?.eventType !== 'formSubmit' ||
        !document?.eventName?.toString().startsWith('Contact Us'),
    }),
    defineField({
      name: 'responseMessage',
      title: 'Response Message',
      type: 'string',
      readOnly: true,
      hidden: ({ document }) =>
        document?.eventType !== 'formSubmit' ||
        !document?.eventName?.toString().startsWith('Contact Us'),
    }),
    defineField({
      name: 'timestamp',
      title: 'Event Timestamp',
      type: 'datetime',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Timestamp (newest first)',
      name: 'timestampDesc',
      by: [{ field: 'timestamp', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      eventType: 'eventType',
      eventName: 'eventName',
      pathname: 'pathname',
      page: 'page',
      timestamp: 'timestamp',
    },
    prepare({ eventType, eventName, pathname, page, timestamp }) {
      const label = eventName || pathname || page || 'Unknown';
      return {
        title: `[${eventType}] ${label}`,
        subtitle: pathname || page
          ? `${pathname || page} · ${timestamp ? new Date(timestamp).toLocaleString() : ''}`
          : timestamp
            ? new Date(timestamp).toLocaleString()
            : '',
      };
    },
  },
});

export default analyticsEventSchema;
