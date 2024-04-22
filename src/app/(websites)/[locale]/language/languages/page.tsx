'use server'

import Home from '@/components/screens/language/languages';
import { client } from '../../../../../../sanity/client';
import { query } from '../../../../../../sanity/services/language-service/languages';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string,
    }
}

async function getResources(locale: string) {
    try {
        const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!data?.length) {
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
    const { data } = await getResources(locale);

    if (!data.length) {
        notFound()
    }

    console.log(data)

    return <Home data={data} />
}

