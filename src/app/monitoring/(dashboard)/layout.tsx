import { redirect } from 'next/navigation';

import { isMonitoringAuthenticated } from '@/src/lib/analytics/server/session-guard';

export default async function MonitoringProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isMonitoringAuthenticated();
  if (!authed) {
    redirect('/monitoring/auth');
  }

  return children;
}
