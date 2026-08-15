'use client';

import { ButtonClickTracker } from './ButtonClickTracker';
import { PageViewTracker } from './PageViewTracker';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageViewTracker />
      <ButtonClickTracker />
      {children}
    </>
  );
}
