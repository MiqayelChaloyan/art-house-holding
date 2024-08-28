'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/design/course';

import { Locale } from '@/locales';

import { ImagePath } from '@/types/general';

import { client } from '../../../../../../sanity/client';
import { courseBySlugQuery } from '../../../../../../sanity/services/design-service/courses';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { generateMetadataDynamic } from '@/utils/default-metadata';


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

async function getResources(slug: string, locale: string) {
    try {
        const course = await client.fetch(courseBySlugQuery, { language: locale, slug }, { next: { revalidate: 100 } });

        if (!course?.length) {
            return { course: [], isError: true };
        }

        return { course, isError: false };
    } catch (_) {
        return { course: [], isError: true };
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(slug[0]);
    const { course, isError } = await getResources(decodedQuery, locale);

    if (!course || isError) {
        notFound()
    }

    return (
        <Course
            locale={locale}
            course={course[0]}
        />
    );
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(slug[0]);
    const data = await getResources(decodedQuery, locale);

    const ogTitle = data.course[0]?.name;
    const ogImage = data.course[0]?.gallery_of_course[0];
    const ogDescription = data.course[0].guides[0];

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};