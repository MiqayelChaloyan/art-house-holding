'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/language/quiz';

import { client } from '../../../../../../sanity/client';
import { query } from '../../../../../../sanity/services/language-service/quiz';


interface Props {
    params: {
        locale: string,
    };
}

async function getResources(locale: string) {
    try {
        const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!data) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
}

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return (
        <Home
            locale={locale}
            data={data}
        />
    );
}
