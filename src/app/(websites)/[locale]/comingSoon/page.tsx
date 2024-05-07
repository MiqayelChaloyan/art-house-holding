'use server'

import { notFound } from 'next/navigation';

import ComingSoon from '@/components/screens/coming-soon';

import { client } from '../../../../../sanity/client';
import { querySocial } from '../../../../../sanity/services/art-house-service';


interface Props {
    params: {
        locale: string
    }
}

const getResources = async (locale: string) => {
    try {
        const data = await client.fetch(querySocial, { language: locale }, { next: { revalidate: 100 } });

        if (!data.length) {
            return { data: [], isError: true };
        }

        return { data: data[0], isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const { data, isError } = await getResources('en');
    
    if (!data || isError) {
        notFound()
    }

    return (<ComingSoon data={data} />);
};
