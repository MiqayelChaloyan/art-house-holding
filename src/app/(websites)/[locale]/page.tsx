'use server';

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/src/components/screens/art-house/home';

import { Locale } from '@/src/locales';

import { ImagePath, Site } from '@/src/types/general';

import { SanityClient } from 'sanity';

import { client } from '@/sanity/client';
import { SITE_META_QUERY } from '@/sanity/services/art-house-service';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { getPartners } from '@/src/utils/data';
import { getHomeDetails } from '@/src/utils/data/art-house';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';


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
  const { ogDescription, ogTitle, ogImage, url, keywords } = meta;
  const path: ImagePath = urlForImage(ogImage);
  const icon = null;

  const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, url, keywords, locale);
  return metadata;
};














