"use server"

import Home from '@/components/screens/art-house';
import { fetchArtHouseHomeData } from '../../../sanity/services/art-house-service';
import { notFound } from 'next/navigation';
import { getTranslations } from "next-intl/server";

import { type Metadata } from "next";

import { Locale } from "@/locales";


interface RootLayoutProps {
  params: {
    locale: string;
  };
}


async function getResources(locale: string) {
  const res = await fetchArtHouseHomeData(locale);

  if (!res?.length) {
    return {
      data: [],
      isError: true
    }
  }

  return {
    data: res[1],
    isError: false
  }
}

export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
  const { data, isError } = await getResources(locale);

  if (!data || isError) {
    notFound()
  }

  return <Home data={data} />;
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
