'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Home from '@/components/screens/design/portfolio';

import { Locale } from '@/locales';

import { client } from '../../../../../../../sanity/client';
import { courseBySlugQuery } from '../../../../../../../sanity/services/design-service/courses';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';
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

    return (<Home data={data}/>)
};


export async function generateMetadata({
    params: { locale, courseName },
}: {
    params: { locale: Locale, courseName: string };
}): Promise<Metadata> {
    const decodedQuery = decodeURIComponent(courseName[0]);
    const { data: [portfolios] } = await getResources(locale, decodedQuery);

    const ogTitle = `${portfolios.course_name} | ${portfolios.portfolios[0].author}`;
    const ogImage = portfolios.portfolios[0].background_image;
    const ogDescription = portfolios.guides[0];
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