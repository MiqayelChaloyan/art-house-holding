'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/art-house/home';

import { Locale } from '@/src/locales';

import { ImagePath, Site } from '@/src/types/general';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { getPartners } from '@/src/utils/data';
import { getHomeDetails } from '@/src/utils/data/art-house';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { sanityFetch } from '@/src/api/sanity-fetch';


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


async function getSiteMeta(
  query: string = SITE_META_QUERY,
  locale?: Locale,
): Promise<Site> {
  const site = await sanityFetch<Site[]>({
    query,
    params: { language: locale },
  });

  return site[1];
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta: Site = await getSiteMeta(SITE_META_QUERY, locale);
  const { ogDescription, ogTitle, ogImage, keywords } = meta;
  const path: ImagePath = urlForImage(ogImage);
  const icon = null;

  const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale, keywords);
  return metadata;
};














