'use server';

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import { Locale } from '@/locales';

import { ImagePath } from '@/types/general';

import { SanityClient } from 'sanity';

import { client } from '../../../../sanity/client';

import { partnersQuery } from '../../../../sanity/services/generic-service';
import { query, querySiteMeta } from '../../../../sanity/services/art-house-service';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { Site } from '../../../../sanity/sanity-queries/art-house';
import { generateMetadataDynamic } from '@/lib/utils/default-metadata';


interface RootProps {
  params: {
    locale: string;
  }
};

const Component = dynamic(() =>
  import('@/components/screens/art-house'),
);

async function getResources(locale: string) {
  const dataPromise = client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
  const partnersPromise = client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

  return Promise.all([dataPromise, partnersPromise])
    .then(([data, partners]) => {
      if (!data?.length || !partners?.length) {
        return { data: [], partners: [], isError: true };
      }

      return { data: data[1], partners, isError: false };
    })
    .catch(_ => {
      return { data: [], partners: [], isError: true };
    });
};

async function getSiteMeta(
  query: string = querySiteMeta,
  client: SanityClient | any,
  mutation = 'fetch'
): Promise<Site> {
  const site: Site[] = await client[mutation](query);
  return site[1];
};

export default async function Page({
  params: { locale }
}: Readonly<RootProps>) {
  const { data, partners, isError } = await getResources(locale);
  const meta: Site = await getSiteMeta(querySiteMeta, client);
  const { ogDescription, ogTitle, ogImage } = meta;
  const path: ImagePath = urlForImage(ogImage);

  if (!data || !partners || isError) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://arthouse.am',
    '@type': 'courses',
    name: ogTitle,
    image: path.src,
    description: ogDescription,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Component
        data={data}
        partners={partners}
        locale={locale}
      />
    </>
  );
};


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta: Site = await getSiteMeta(querySiteMeta, client);
  const { ogDescription, ogTitle, ogImage } = meta;
  const path: ImagePath = urlForImage(ogImage);

  const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, locale);
  return metadata;
};














