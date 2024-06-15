'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/design/course';

import { Locale } from '@/locales';

import { client } from '../../../../../../sanity/client';
import { courseBySlugQuery } from '../../../../../../sanity/services/design-service/courses';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { COURSE } from '../../../../../../sanity/sanity-queries/design';


interface Props {
    params: {
        locale: string,
        slug: string
    }
}

async function getResources(slug: string, locale: string) {
    try {
        const course = await client.fetch(courseBySlugQuery, { language: locale, slug }, { next: { revalidate: 100 } });

        if (!course?.length) {
            return { course: [], isError: true };
        }

        return { course, isError: false };
    } catch (error) {
        return { course: [], isError: true };
    }
}

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const decodedQuery = decodeURIComponent(slug[0]);

    const { course, isError }: any = await getResources(decodedQuery, locale);

    if (!course || isError) {
        notFound()
    }

    return (<Course locale={locale} course={course[0]} />)
}


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string };
}): Promise<Metadata> {
    const { course }: { course: COURSE[], isError: boolean } = await getResources(decodeURIComponent(slug[0]), locale);

    const ogTitle = course[0].course_name;
    const ogImage = course[0].gallery_of_course[0];
    const ogDescription = course[0].guides[0];
    const path: { src: string, width: number, height: number } | any = urlForImage(ogImage);

    return {
        metadataBase: process.env.NEXT_PUBLIC_DOMAIN
            ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
            : new URL(`http://localhost:${process.env.PORT || 3000}`),
        title: ogTitle,
        description: ogDescription,
        authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
        openGraph: {
            title: 'title',
            description: 'content',
            url: path?.src,
            images: [
                {
                    url: path?.src,
                    width: 500,
                    height: 500,
                    alt: 'course_name',
                },
            ],
            locale,
            type: "website",
        },
        twitter: {
            card: path?.src,
            title: 'title',
            description: 'about_us_content',
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
};