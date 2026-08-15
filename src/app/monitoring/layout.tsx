import type { Metadata, Viewport } from 'next';

import './globals.sass';
import './styles.module.sass';

export const metadata: Metadata = {
  title: 'ART HOUSE Monitoring',
  robots: { index: false, follow: false },
  icons: {
    icon: '/monitoring-icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function MonitoringRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="monitoringRoot">{children}</body>
    </html>
  );
}
