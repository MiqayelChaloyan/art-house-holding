import { NextIntlClientProvider, useMessages } from "next-intl";

import { Inter } from "@/lib/constants/font";

import '@/styles/globals.sass';


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string
  };
}

// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {}
//   console.error = () => {}
//   console.debug = () => {}
// }

function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={Inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;