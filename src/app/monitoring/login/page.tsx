import { redirect } from 'next/navigation';

export default function MonitoringLoginRedirect() {
  redirect('/monitoring/auth');
}
