'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/language/home';

import { client } from '../../../../../sanity/client';

import { query } from '../../../../../sanity/services/language-service/about-us';
import { query as discountsQuery } from '../../../../../sanity/services/language-service/promotions';
import { getPartners } from '@/utils/data';


interface RootProps {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    const dataPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const discountsPromise = await client.fetch(discountsQuery, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([dataPromise, discountsPromise])
        .then(([data, discounts]) => {
            if (!data?.length || !discounts?.length) {
                return { data: [], discounts: [], isError: true };
            }

            return { data, discounts, isError: false };
        })
        .catch(_ => {
            return { data: [],  discounts: [], isError: true };
        });
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const { data, discounts } = await getResources(locale);

    const partners = await getPartners(locale);

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
};

