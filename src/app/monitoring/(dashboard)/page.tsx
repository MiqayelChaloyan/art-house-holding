import { MonitoringDashboard } from '../components/MonitoringDashboard';
import { MonitoringThemeProvider } from '../components/MonitoringThemeProvider';

export const dynamic = 'force-dynamic';

export default function MonitoringDashboardPage() {
  return (
    <MonitoringThemeProvider>
      <MonitoringDashboard />
    </MonitoringThemeProvider>
  );
}
