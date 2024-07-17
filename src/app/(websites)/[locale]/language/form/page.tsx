'use server'

import Form from '@/components/screens/language/form';
import { query, queryFilterCourses } from '../../../../../../sanity/services/language-service/courses';

import { client } from '../../../../../../sanity/client';
import { notFound } from 'next/navigation';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    try {
        const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
        const courses = await client.fetch(queryFilterCourses, { language: 'am' }, { next: { revalidate: 100 } });

        if (!data[0] || !courses) {
            return { data: [], courses: [], isError: true };
        }

        return { data, courses: courses[0], isError: false };
    } catch (_) {
        return { data: [], courses: [], isError: true };
    }
};

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const { data, courses, isError } = await getResources(locale);

    if (!data || !courses || isError) {
        notFound()
    }

    return (
        <Form
            data={data[0]}
            courses={courses} />
    );
};