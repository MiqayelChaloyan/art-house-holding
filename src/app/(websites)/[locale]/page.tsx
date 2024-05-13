'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Home from '@/components/screens/art-house';
import { Locale } from '@/locales';

import { UrlType } from '@/types/art-house';

import { SanityClient } from 'sanity';

import { client } from '../../../../sanity/client';

import { partnersQuery } from '../../../../sanity/services/generic-service';
import { query, querySiteMeta } from '../../../../sanity/services/art-house-service';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { Site } from '../../../../sanity/sanity-queries/art-house';


interface RootLayoutProps {
  params: {
    locale: string,
  }
};

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
    .catch(error => {
      return { data: [], partners: [], isError: true };
    });
}


export default async function Page({
  params: { locale }
}: Readonly<RootLayoutProps>) {
  const { data, partners, isError } = await getResources(locale);

  if (!data || !partners || isError) {
    notFound()
  }

  return (
    <Home
      data={data}
      partners={partners}
    />
  );
}


async function getSiteMeta(
  query: string = querySiteMeta,
  client: SanityClient | any,
  mutation = 'fetch'
): Promise<Site> {
  const site: Site = await client[mutation](query)
  return site
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const meta: Site | any = await getSiteMeta(querySiteMeta, client)
  const { ogDescription, ogTitle, ogImage } = meta[1];
  const path: UrlType | any = urlForImage(ogImage);
console.log(ogTitle)
  return {
    metadataBase: process.env.NEXT_PUBLIC_DOMAIN
      ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
      : new URL(`http://localhost:${process.env.PORT || 3000}`),
    authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: path?.src,
          width: 500,
          height: 500,
          alt: "seo-image",
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: path?.src,
      title: ogTitle,
      description: ogDescription,
      creator: "@arthouse",
      images: [
        {
          url: path?.src,
          width: path?.width,
          height: path?.height,
          alt: "twitter",
        },
      ],
    },
  };
};














