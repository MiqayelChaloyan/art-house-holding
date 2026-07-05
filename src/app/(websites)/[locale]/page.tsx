'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/art-house/home';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';

import { getPartners } from '@/src/utils/data';
import { getHomeDetails } from '@/src/utils/data/art-house';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';


interface RootProps {
  params: {
    locale: string;
  }
};

export default async function Page({
  params: { locale }
}: Readonly<RootProps>) {
  const partners = await getPartners(locale);
  const data = await getHomeDetails(locale);

  if (!data || !partners) {
    notFound()
  };

  return (<Home data={data} partners={partners} />);
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 1);
  return buildSiteMetadata(meta, locale, `/${locale}`);
};














