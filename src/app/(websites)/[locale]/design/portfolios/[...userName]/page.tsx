'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/portfolio';

import { queryBySlugCard as query } from '../../../../../../../sanity/services/design-service/courses';

import { client } from '../../../../../../../sanity/client';


interface Props {
    params: {
        locale: string,
        slug: string | number
    }
}

async function getResources(locale: string, slug: string | number) {
    try {
        const data = await client.fetch(query, { language: locale, slug }, { next: { revalidate: 100 } });

        if (!data.length) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
}

export default async function Page({
    params
}: Readonly<Props>) {
    // const { data, isError }: any = await getResources(locale, 2);
    console.log(params);

    // if (!courses || !data || isError) {
    //     notFound()
    // }

    return (
        <Home />
    )
}