import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Inter } from 'next/font/google';

import { type Metadata } from "next";

import { Locale } from "@/locales";

const inter = Inter({ subsets: ['latin'] });

// import './globals.css';



interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
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
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}



export default RootLayout;