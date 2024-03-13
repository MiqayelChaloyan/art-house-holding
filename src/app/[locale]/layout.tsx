import { NextIntlClientProvider, useMessages } from "next-intl";

import { Inter } from 'next/font/google';

import '@/styles/globals.sass';


const inter = Inter({ subsets: ['latin'] });


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string
  };
}


function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


export default RootLayout;