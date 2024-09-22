'use server';

import { NextIntlClientProvider, useMessages } from 'next-intl';

import { StoreProvider } from '@/src/store/StoreProvider';

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
    <html lang={locale}>
      <body className={Inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
