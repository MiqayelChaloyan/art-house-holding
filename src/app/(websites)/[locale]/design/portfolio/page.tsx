'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/portfolio';

import { allCoursesQuery } from '../../../../../../sanity/services/design-service/courses';

import { client } from '../../../../../../sanity/client';


interface Props {
    params: {
        locale: string,
    }
}

async function getResources(locale: string) {
    try {
        const courses = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });

        if (!courses?.length) {
            return { portfolios: [], isError: true };
        }

        return { courses, isError: false };
    } catch (error) {
        return { courses: [], isError: true };
    }
}

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const { courses, isError }: any = await getResources(locale);

    if (!courses || isError) {
        notFound()
    }

    return (
        <Home courses={courses}/>
    )
}