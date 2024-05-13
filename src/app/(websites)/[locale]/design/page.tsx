'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/home';

import { client } from '../../../../../sanity/client';

import { partnersQuery } from '../../../../../sanity/services/generic-service';
import { query } from '../../../../../sanity/services/design-service/about-us';


interface RootProps {
    params: {
        locale: string,
    }
}

async function getResources(locale: string) {
    const dataPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const partnersPromise = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([dataPromise, partnersPromise])
        .then(([data, partners]) => {
            if (!data?.length || !partners?.length) {
                return { data: [], partners: [], isError: true };
            }

            return { data, partners, isError: false };
        })
        .catch(error => {
            return { data: [], partners: [], isError: true };
        });
}

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const { data, partners } = await getResources(locale);

    if (!data || !partners) {
        notFound()
    }

    return (
        <Home
            data={data}
            partners={partners}
            locale={locale}
        />
    )
};

