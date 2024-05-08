'use server'

import { notFound } from 'next/navigation';

import ComingSoon from '@/components/screens/coming-soon';

import { Locale } from '@/locales';

import { type Metadata } from 'next';

import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';
import { querySocial } from '../../../../../sanity/services/art-house-service';
import { querySiteMeta } from '../../../../../sanity/services/art-house-service';


interface Props {
    params: {
        locale: string
    }
}

interface Site {
    site_name: string,
    ogTitle: string,
    ogImage: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    ogDescription: string
}

const getResources = async (locale: string) => {
    try {
        const data = await client.fetch(querySocial, { language: locale }, { next: { revalidate: 100 } });

        if (!data.length) {
            return { data: [], isError: true };
        }

        return { data: data[0], isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const { data, isError } = await getResources('en');

    if (!data || isError) {
        notFound()
    }

    return (<ComingSoon data={data} />);
};


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
    const { ogDescription, ogTitle } = meta[1];

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
            siteName: '',
            locale,
            type: "website",
        },
    };
}