'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import AboutUs from '@/src/components/screens/art-house/about';

import { Locale } from '@/src/locales';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';

import { getAboutDetails } from '@/src/utils/data/art-house';
import { buildSiteMetadata, fetchSiteMetaEntry } from '@/src/utils/site-meta';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface Props {
  params: {
    locale: string;
  }
};

export default async function Page({
  params: { locale }
}: Readonly<Props>) {
  const data = await getAboutDetails(locale);

  if (!data) {
    notFound()
  };

  return (<AboutUs data={data} />);
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta = await fetchSiteMetaEntry(SITE_META_QUERY, locale, 1);
  return buildSiteMetadata(meta, locale, `/${locale}/about`);
};