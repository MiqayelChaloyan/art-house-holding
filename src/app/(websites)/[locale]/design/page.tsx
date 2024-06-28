'use server'

import { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { notFound } from 'next/navigation';

import { client } from '../../../../../sanity/client';

import { partnersQuery } from '../../../../../sanity/services/generic-service';
import { query } from '../../../../../sanity/services/design-service/about-us';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';
import { DESIGN } from '../../../../../sanity/sanity-queries/design';


const DynamicHome = dynamic(() => import('@/components/screens/design/home'), {
    ssr: true,
    suspense: true
});

interface RootProps {
    params: {
        locale: string;
    }
};

type TYPES = {
    data: DESIGN[];
    partners: PARTNER[];
    isError: boolean;
};

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
};

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    const { data, partners, isError }: TYPES = await getResources(locale);

    if (!data || !partners || isError) {
        notFound()
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DynamicHome
                data={data}
                partners={partners}
                locale={locale}
            />
        </Suspense>

    );
};

