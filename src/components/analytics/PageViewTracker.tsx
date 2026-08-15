'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { resolveAnalyticsPath } from '@/src/lib/analytics/path';
import { trackPageView } from '@/src/lib/analytics/tracking';
import { getLocaleFromPath } from '@/src/lib/analytics/session';

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || pathname.startsWith('/monitoring')) {
      return;
    }

    const fullPath = resolveAnalyticsPath(pathname);

    if (lastTracked.current === fullPath) {
      return;
    }

    lastTracked.current = fullPath;

    trackPageView({
      pathname: fullPath,
      locale: getLocaleFromPath(fullPath),
    });
  }, [pathname]);

  return null;
}
