'use server'

import { notFound } from 'next/navigation';

import Promotions from '@/components/screens/language/promotions';

import { client } from '../../../../../../sanity/client';
import { query } from '../../../../../../sanity/services/language-service/promotions';


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
};;

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return (<Promotions data={data} />);
}
