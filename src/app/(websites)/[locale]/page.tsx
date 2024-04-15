'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Home from '@/components/screens/art-house';

import { Locale } from '@/locales';

import { SanityClient } from 'sanity';

import { client } from '../../../../sanity/client';

import { partnersQuery } from '../../../../sanity/services/generic-service';
import { query, querySiteMeta } from '../../../../sanity/services/art-house-service';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';


interface RootLayoutProps {
  params: {
    locale: string,
  }
}

interface Site {
  title: string,
  description: string,
  canonical: string,
  openGraph: {
    basic: { title: string, url: string, image: string },
    optional: {
      locale: string,
      site_name: string,
      description: string
    }
  }
}


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


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
  const { data, partners, isError } = await getResources(locale);

  if (!data || !partners || isError) {
    notFound()
  }

  return <Home data={data} partners={partners} />;
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
  const meta = getSiteMeta(querySiteMeta, client)
  const [data]: Site[] | any = await Promise.all([meta]);

  const { ogDescription, url, ogTitle, ogImage, site_name } = data[1];

  const path: { src: string, width: string, height: string } | any = urlForImage(ogImage);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || url),
    title: ogTitle,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: path?.src,
          width: path?.width,
          height: path?.height,
          alt: 'seo-image',
        },
      ],
      locale,
      type: 'website'
    },
  };
}














