'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/educational-center/course';

import { Locale } from '@/locales';

import { courseBySlugQuery } from '../../../../../../sanity/services/educational-center-service/courses';
import { querySocial } from '../../../../../../sanity/services/educational-center-service/contact-us';
import { query as lessonsQuery } from '../../../../../../sanity/services/educational-center-service/lessons';

import { client } from '../../../../../../sanity/client';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';


interface Props {
    params: {
        locale: string
        slug: string
    }
}

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
}

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

    return <Course course={course} socialData={social} lessons={lessons} lessonsArmenian={lessonsArmenian} />;
}


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const { course }: any = await getResources(slug[0], locale);
    const { course_name, about_us_content, svg, course_main: [{ title, content, image }] } = course[0];

    const path: { src: string, width: string, height: string } | any = urlForImage(image);
    const icon: { src: string, width: string, height: string } | any = urlForImage(svg);

    return {
        metadataBase: process.env.NEXT_PUBLIC_DOMAIN
            ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
            : new URL(`http://localhost:${process.env.PORT || 3000}`),
        title: title,
        description: about_us_content,
        authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
        icons: {
            icon: icon?.src,
        },
        openGraph: {
            title: title,
            description: content,
            url: path?.src,
            images: [
                {
                    url: path?.src,
                    width: 500,
                    height: 500,
                    alt: course_name,
                },
            ],
            locale,
            type: "website",
        },
        twitter: {
            card: path?.src,
            title: title,
            description: about_us_content,
            creator: "@arthouse",
            images: [
                {
                    url: path?.src,
                    width: path?.width,
                    height: path?.height,
                    alt: "twitter",
                },
            ],
        },
    };
}
