'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/price-list';

import { query } from '../../../../../../sanity/services/design-service/price-list';
import { client } from '../../../../../../sanity/client';


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

    return { data: data[0], isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return (<Home data={data}/>);
};