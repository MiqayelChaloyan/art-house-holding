'use server';

// import { use } from 'react';

import { NextIntlClientProvider, useMessages } from 'next-intl';
// import { generateStructuredData } from '@/src/utils/jsonLdData';

import { StoreProvider } from '@/src/store/StoreProvider';

// import { SITE_META_QUERY as HOME_QUERY } from '@/sanity/services/art-house-service';
// import { SITE_META_QUERY as DESIGN_QUERY } from '@/sanity/services/design-service';
// import { SITE_META_QUERY as EDUCATIONAL_QUERY } from '@/sanity/services/educational-center-service';
// import { SITE_META_QUERY as LANGUAGE_QUERY } from '@/sanity/services/language-service';
// import { sanityFetch } from '@/src/api/sanity-fetch';
// import { Site } from '@/src/types/general';

import { Inter } from '@/src/constants/font';

import '@/src/styles/globals.sass';


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string
  };
};

// async function getSiteMeta(
//   query: string,
//   locale?: string,
//   index?: number,
// ): Promise<Site> {
//   const site = await sanityFetch<Site[]>({
//     query,
//     params: { language: locale },
//   });

//   return site[index ?? 0];
// };

function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();

  // const homeMeta: Site = use(getSiteMeta(HOME_QUERY, locale, 1));
  // const educationalMeta: Site = use(getSiteMeta(EDUCATIONAL_QUERY, locale, 0));
  // const designMeta: Site = use(getSiteMeta(DESIGN_QUERY, locale, 0));
  // const languageMeta: Site = use(getSiteMeta(LANGUAGE_QUERY, locale, 0));

  // const baseUrls = [
  //   { url: '/', name: homeMeta?.ogTitle, description: homeMeta?.ogDescription },
  //   { url: '/educational-center', name: educationalMeta?.ogTitle, description: educationalMeta?.ogDescription },
  //   { url: '/design', name: designMeta?.ogTitle, description: designMeta?.ogDescription },
  //   { url: '/language', name: languageMeta?.ogTitle, description: languageMeta?.ogDescription },
  //   // { url: '/charity', name: '', description: '' },
  //   // { url: '/regional', name: '', description: '' },
  // ];

  // const structuredData = generateStructuredData({
  //   personName: homeMeta?.ogTitle,
  //   qualifications: 'Corporation',
  //   websiteUrl: 'https://arthouse.am',
  //   locale,
  //   baseUrls,
  // });

  return (
    <html lang={locale}>
      <body className={Inter.className}>
        {/* <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />  */}
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
