'use server';

import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StoreProvider } from '@/src/store/StoreProvider';
import { AnalyticsProvider } from '@/src/components/analytics/AnalyticsProvider';

import { Inter } from '@/src/constants/font';

import '@/src/styles/globals.sass';


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string
  };
};

function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={Inter.className} suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            <AnalyticsProvider>
              {children}
            </AnalyticsProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
