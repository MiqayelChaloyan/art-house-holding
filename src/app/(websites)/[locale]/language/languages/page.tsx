'use server'

import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import { client } from '../../../../../../sanity/client';
import { query } from '../../../../../../sanity/services/language-service/languages';


const Component = dynamic(() =>
    import('@/components/screens/language/languages'),
);

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
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { data } = await getResources(locale);

    if (!data.length) {
        notFound()
    }

    return (
        <Component
            locale={locale}
            data={data}
        />
    );
};

