'use server'

import Home from '@/components/screens/design/home';

import { notFound } from 'next/navigation';

import { client } from '../../../../../sanity/client';

import { query } from '../../../../../sanity/services/design-service/about-us';
import { getPartners } from '@/utils/data';


interface RootProps {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    const dataPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([dataPromise])
        .then(([data]) => {
            if (!data?.length) {
                return { data: [], isError: true };
            }

            return { data, isError: false };
        })
        .catch(_ => {
            return { data: [], isError: true };
        });
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const { data, isError } = await getResources(locale);

    const partners = await getPartners(locale);

    if (!data || !partners || isError) {
        notFound()
    }

    return (
        <Home
            data={data}
            partners={partners}
            locale={locale}
        />
    );
};

