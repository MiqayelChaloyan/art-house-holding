'use server';

import AboutUs from "@/components/screens/art-house/about";
import { querySiteMeta } from "../../../../../sanity/services/art-house-service";
import { SanityClient } from "sanity";
import { ImagePath, Site } from "@/types/general";
import { Metadata } from "next";
import { Locale } from "@/locales";
import { urlForImage } from "../../../../../sanity/imageUrlBuilder";
import { generateMetadataDynamic } from "@/lib/utils/default-metadata";
import { client } from "../../../../../sanity/client";


interface Props {
    params: {
        locale: string;
    }
};


export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    // const { data, partners, isError } = await getResources(locale);

    // if (!data || !partners || isError) {
    //   notFound()
    // };

    return (<AboutUs locale={locale}/>);
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