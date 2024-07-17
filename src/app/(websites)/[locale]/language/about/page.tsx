'use server'

import { notFound } from 'next/navigation';

import About from '@/components/screens/language/about';

import { client } from '../../../../../../sanity/client';
import { query } from '../../../../../../sanity/services/language-service/about-us';


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

        return { data, isError: false };
    } catch (_) {
        return { data: [], isError: true };
    }
}

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const result = await getResources(locale);

    if (!result || !result.data) {
        notFound()
    }

    return (
        <About
            data={result?.data}
            locale={locale}
        />
    );
};

