'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import ComingSoon from '@/src/components/screens/coming-soon';

import { Locale } from '@/src/locales';

import { ImagePath, Site } from '@/src/types/general';

import { SITE_META_QUERY } from '@/sanity/services/art-house-service';
import { urlForImage } from '@/sanity/imageUrlBuilder';

import { getContacts } from '@/src/utils/data/art-house';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { sanityFetch } from '@/src/api/sanity-fetch';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getContacts('en');

    if (!data) {
        notFound()
    }

    return (<ComingSoon data={data} />);
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








