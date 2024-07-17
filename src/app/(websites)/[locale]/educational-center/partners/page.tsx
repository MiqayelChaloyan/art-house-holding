'use server'

import { notFound } from 'next/navigation';

import Partners from '@/components/screens/educational-center/partners';

import { client } from '../../../../../../sanity/client';
import { partnersQuery } from '../../../../../../sanity/services/generic-service';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    try {
        const partners = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

        if (!partners) {
            return { partners: [], isError: true };
        }

        return { partners, isError: false };
    } catch (error) {
        return { partners: [], isError: true };
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { partners, isError } = await getResources(locale);

    if (!partners || isError) {
        notFound()
    };

    return (<Partners data={partners} />);
};