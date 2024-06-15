'use server'

import Home from '@/components/screens/design/order';

import { notFound } from 'next/navigation';

import { client } from '../../../../../../../sanity/client';
import { courseBySlugQuery } from '../../../../../../../sanity/services/design-service/courses';
import { COURSE } from '../../../../../../../sanity/sanity-queries/design';


interface Props {
    params: {
        locale: string;
        courseName: string;
    }
};

type TYPES = {
    data: COURSE[]
    isError: boolean;
};

async function getResources(locale: string, courseName: string | number) {
    try {
        const data = await client.fetch(courseBySlugQuery, { language: locale, slug: courseName }, { next: { revalidate: 100 } });

        if (!data.length) {
            return { data: [], isError: true };
        }

        return { data: data[0], isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale, courseName }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const { data, isError }: TYPES = await getResources(locale, decodedQuery);

    if (!data || isError) {
        notFound()
    }

    return (
        <Home data={data}/>
    )
};