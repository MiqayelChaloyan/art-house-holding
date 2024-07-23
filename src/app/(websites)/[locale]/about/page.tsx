'use server';

import AboutUs from "@/components/screens/art-house/about";
import { querySiteMeta } from "../../../../../sanity/services/art-house-service";
import { query } from "../../../../../sanity/services/art-house-service/about-us";

import { SanityClient } from "sanity";
import { ImagePath, Site } from "@/types/general";
import { Metadata } from "next";
import { Locale } from "@/locales";
import { urlForImage } from "../../../../../sanity/imageUrlBuilder";
import { generateMetadataDynamic } from "@/lib/utils/default-metadata";
import { client } from "../../../../../sanity/client";
import { notFound } from "next/navigation";


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
  try {
      const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

      if (!data?.length) {
          return { data: [], isError: true };
      }

  return { data: data[0], isError: false };
  } catch (error) {
      return { data: [], isError: true };
  }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
      notFound()
    };

    return (<AboutUs data={data} locale={locale}/>);
};


async function getSiteMeta(
    query: string = querySiteMeta,
    client: SanityClient | any,
    mutation = 'fetch'
  ): Promise<Site> {
    const site: Site[] = await client[mutation](query);
    return site[1];
  };
  
  export async function generateMetadata({
    params: { locale },
  }: {
    params: { locale: Locale };
  }): Promise<Metadata> {
    const meta: Site = await getSiteMeta(querySiteMeta, client);
    const { ogDescription, ogTitle, ogImage } = meta;
    const path: ImagePath = urlForImage(ogImage);
    const icon = null;
  
    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
  };