'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/portfolios';

import { client } from '../../../../../../sanity/client';
import { allCoursesQuery } from '../../../../../../sanity/services/design-service/courses';
import { query } from '../../../../../../sanity/services/design-service/portfolio';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    try {
        const courses = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });
        const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!courses?.length || !data.length) {
            return { courses: [], data: [], isError: true };
        }

        return { courses, data: data[0], isError: false };
    } catch (_) {
        return { courses: [], data: [], isError: true };
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { courses, data, isError } = await getResources(locale);

    if (!courses || !data || isError) {
        notFound()
    }

    return (
        <Home
            courses={courses}
            data={data}
        />
    );
};