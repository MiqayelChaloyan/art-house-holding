'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/educational-center/course';

import { Locale } from '@/locales';

import { ImagePath } from '@/types/general';
import BlocksToText from '@/utils/BlocksToText';
import { generateMetadataDynamic } from '@/utils/default-metadata';

import { courseBySlugQuery } from '../../../../../../sanity/services/educational-center-service/courses';
import { querySocial } from '../../../../../../sanity/services/educational-center-service/contact-us';
import { query as lessonsQuery } from '../../../../../../sanity/services/educational-center-service/lessons';

import { client } from '../../../../../../sanity/client';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';


interface Props {
    params: {
        locale: string;
        slug: string;
    }
};

async function getResources(slug: string, locale: string) {
    try {
        const course = await client.fetch(courseBySlugQuery, { language: locale, slug }, { next: { revalidate: 100 } });
        const social = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });
        const lessons = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
        const lessonsArmenian = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

        if (!course?.length || !social?.length || !lessons?.length || !lessonsArmenian?.length) {
            return { course: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
        }

        return { course, social: social[0], lessons, lessonsArmenian, isError: false };
    } catch (error) {
        return { course: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const {
        course,
        social,
        lessons,
        lessonsArmenian,
        isError
    } = await getResources(slug[0], locale);

    if (!course || !social || !lessons || !lessonsArmenian || isError) {
        notFound()
    }

    return (
        <Course
            course={course}
            socialData={social}
            lessons={lessons}
            lessonsArmenian={lessonsArmenian}
        />
    );
};


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const data = await getResources(slug[0], locale);

    const ogTitle = data.course[0]?.course_name;
    const ogImage = data.course[0].course_main[0]?.image;
    const ogDescription = BlocksToText(data.course[0]?.about_us_content).slice(0, 900);

    const path: ImagePath = urlForImage(ogImage);
    const icon: ImagePath = urlForImage(data.course[0]?.svg);

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};