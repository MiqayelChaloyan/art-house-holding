'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import AboutUs from '@/src/components/screens/art-house/about';

import { Locale } from '@/src/locales';

import { ImagePath, Site } from '@/src/types/general';

import { SanityClient } from 'sanity';

import { client } from '@/sanity/client';
import { SITE_META_QUERY } from '@/sanity/services/art-house-service';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { getAboutDetails } from '@/src/utils/data/art-house';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';

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


async function getSiteMeta(
  query: string = SITE_META_QUERY,
  client: SanityClient,
  mutation: 'fetch' = 'fetch'
): Promise<Site> {
  const site: Site[] = await client[mutation](query);
  return site[1];
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta: Site = await getSiteMeta(SITE_META_QUERY, client);
  const { ogDescription, ogTitle, ogImage } = meta;
  const path: ImagePath = urlForImage(ogImage);
  const icon = null;
  const keywords = null;

  const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale, keywords);
  return metadata;
};