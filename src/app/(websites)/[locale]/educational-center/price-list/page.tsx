'use server'

import { notFound } from 'next/navigation';

import PriceList from '@/components/screens/educational-center/price-list';

import { allCoursesQuery } from '../../../../../../sanity/services/educational-center-service/courses';
import { client } from '../../../../../../sanity/client';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    try {
        const data = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });

        if (!data) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
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
    };

    return (<PriceList data={data} />);
};