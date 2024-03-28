"use server"

import { notFound } from 'next/navigation';
import { type Metadata } from "next";

import Course from "@/components/screens/educational-center/course";

import { Locale } from "@/locales";

import { getCourseBySlug } from "../../../../../../sanity/services/educational-center-service/courses";
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlFor } from '../../../../../../sanity/imageUrlBuilder';


async function getResources(locale: string, slug: string) {
    const course = await getCourseBySlug(slug, locale);

    if (!course) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data: course,
        isError: false
    }
}


interface LayoutProps {
    params: {
        locale: string
        slug: string[]
    };
}


export default async function Page({ params: { locale, slug } }: LayoutProps) {
    const { data, isError } = await getResources(locale, slug[0]);

    if (!data || isError) {
        notFound()
    }

    return <Course course={data} />;
}


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: string[] };
}): Promise<Metadata> {
    const { data, isError }: EDUCATIONAL_CENTER_COURSES | any = await getResources(locale, slug[0]);
    
    if (!data.length || isError) {
        notFound()
    }

    const { course_name, about_us_content, svg, course_main: [{ title, content, image }] } = data[0];

    const urlForImage = urlFor(image)
        .auto('format')
        .fit('max')
        .url();

    const urlForImageSvg = urlFor(svg)
        .auto('format')
        .fit('max')
        .url();

    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string | URL),
        title: course_name,
        description: about_us_content,
        keywords: [course_name, title],
        authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
        icons: {
            icon: urlForImageSvg,
        },
        openGraph: {
            // title: title,
            // description: content,
            url: urlForImage,
            type: 'website',
            images: [
                {
                    url: urlForImage,
                    width: 400,
                    height: 400,
                    alt: course_name,
                },
            ],
        },
    };
}
