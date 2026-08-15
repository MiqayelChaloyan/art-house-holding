'use client';

import { useCallback, useMemo } from 'react';

import {
  trackButtonClick as trackButtonClickFn,
  trackFormSubmit as trackFormSubmitFn,
  trackPageView as trackPageViewFn,
} from '@/src/lib/analytics/tracking';

export function useAnalytics() {
  const trackPageView = useCallback(
    (input: { pathname: string; title?: string; locale?: string }) => {
      trackPageViewFn(input);
    },
    [],
  );

  const trackButtonClick = useCallback(
    (input: { name: string; page?: string; locale?: string }) => {
      trackButtonClickFn(input);
    },
    [],
  );

  const trackFormSubmit = useCallback(
    (input: {
      name: string;
      page?: string;
      locale?: string;
      success: boolean;
      requestBody?: Record<string, unknown>;
      responseStatus?: number;
      responseMessage?: string;
    }) => {
      trackFormSubmitFn(input);
    },
    [],
  );

  return useMemo(
    () => ({
      trackPageView,
      trackButtonClick,
      trackFormSubmit,
    }),
    [trackPageView, trackButtonClick, trackFormSubmit],
  );
}
