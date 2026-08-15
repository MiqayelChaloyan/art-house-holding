'use client';

import {
  formatHttpStatus,
  getHttpStatusTone,
  type HttpStatusTone,
} from '@/src/lib/analytics/http-status';

import styles from '../styles.module.sass';

type Props = {
  statusCode?: number | null;
  className?: string;
};

function toneClass(tone: HttpStatusTone): string {
  switch (tone) {
    case '2xx':
      return styles.httpStatus2xx;
    case '3xx':
      return styles.httpStatus3xx;
    case '4xx':
      return styles.httpStatus4xx;
    case '5xx':
      return styles.httpStatus5xx;
    default:
      return styles.httpStatusUnknown;
  }
}

export function FormStatusBadge({ statusCode, className }: Props) {
  const tone = getHttpStatusTone(statusCode);
  const label = formatHttpStatus(statusCode);

  return (
    <span className={[styles.httpStatusBadge, toneClass(tone), className].filter(Boolean).join(' ')}>
      {label}
    </span>
  );
}
