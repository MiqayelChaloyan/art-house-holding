'use server'

import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { type Metadata } from 'next';

import Home from '@/components/screens/art-house';

import { Locale } from '@/locales';

import { client } from '../../../../sanity/client';

import { partnersQuery } from '../../../../sanity/services/generic-service';
import { query } from '../../../../sanity/services/art-house-service';


interface RootLayoutProps {
  params: {
    locale: string
  };
}


async function getResources(locale: string) {
  const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
  const partners = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

  if (!data?.length || !partners?.length) {
    return {
      data: [],
      partners: [],
      isError: true
    }
  }

  return {
    data: data[1],
    partners,
    isError: false
  }
}


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
  const { data, partners, isError } = await getResources(locale);

  if (!data || !partners || isError) {
    notFound()
  }

  return <Home data={data} partners={partners}/>;
}


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}









