'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Home from '@/components/screens/language/home';

import { Locale } from '@/locales';

import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';

import { query, querySiteMeta } from '../../../../../sanity/services/language-service/about-us';
import { query as discountsQuery } from '../../../../../sanity/services/language-service/promotions';
import { partnersQuery } from '../../../../../sanity/services/generic-service';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


interface RootLayoutProps {
    params: {
        locale: string,
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

async function getResources(locale: string) {
    const dataPromise = client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const partnersPromise = client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });
    const discountsPromise = await client.fetch(discountsQuery, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([dataPromise, partnersPromise, discountsPromise])
        .then(([data, partners, discounts]) => {
            if (!data?.length || !partners?.length || !discounts?.length) {
                return { data: [], partners: [], discounts: [], isError: true };
            }

            return { data, partners, discounts, isError: false };
        })
        .catch(error => {
            return { data: [], partners: [], discounts: [], isError: true };
        });
}

export default async function Page({
    params: { locale }
}:
    Readonly<RootLayoutProps>) {
    const { data, discounts, partners } = await getResources(locale);

    if (!data || !discounts || !partners) {
        notFound()
    }

    return (
        <Home
            data={data}
            discounts={discounts}
            partners={partners}
            locale={locale}
        />
    )
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

    const { ogDescription, ogTitle, ogImage } = data[0];

    const path: { src: string, width: string, height: string } | any = urlForImage(ogImage);

    return {
        metadataBase: process.env.NEXT_PUBLIC_DOMAIN
            ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
            : new URL(`http://localhost:${process.env.PORT || 3000}`),
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
}

