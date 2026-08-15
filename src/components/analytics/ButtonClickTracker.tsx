'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { trackButtonClick } from '@/src/lib/analytics/tracking';

const TRACK_ATTRIBUTE = 'data-track-click';

function resolveTrackName(element: Element): string | null {
  const tracked = element.closest(`[${TRACK_ATTRIBUTE}]`);
  if (!tracked) {
    return null;
  }

  const name = tracked.getAttribute(TRACK_ATTRIBUTE)?.trim();
  return name || null;
}

export function ButtonClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/monitoring')) {
      return;
    }

    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const name = resolveTrackName(target);
      if (!name) {
        return;
      }

      trackButtonClick({ name, page: pathname });
    }

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [pathname]);

  return null;
}
