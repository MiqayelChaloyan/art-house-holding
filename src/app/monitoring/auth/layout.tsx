import { redirect } from 'next/navigation';

import { isMonitoringAuthenticated } from '@/src/lib/analytics/server/session-guard';

export default async function MonitoringAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isMonitoringAuthenticated()) {
    redirect('/monitoring');
  }

  return children;
}
