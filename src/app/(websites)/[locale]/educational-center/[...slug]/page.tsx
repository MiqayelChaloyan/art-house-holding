'use server'

import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import Course from '@/components/screens/educational-center/course';

import { Locale } from '@/locales';

import { courseBySlugQuery } from '../../../../../../sanity/services/educational-center-service/courses';
import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import { client } from '../../../../../../sanity/client';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';


async function getResources(locale: string, slug: string) {
    const course = await client.fetch(courseBySlugQuery, { language: locale, slug }, { next: { revalidate: 100 } });

    if (!course?.length) {
        return {
            course: [],
            isError: true
        }
    }

    return {
        course,
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
    const { course, isError } = await getResources(locale, slug[0]);

    if (!course || isError) {
        notFound()
    }

    return <Course course={course} />;
}


// export async function generateMetadata({
//     params: { locale, slug },
// }: {
//     params: { locale: Locale, slug: string[] };
// }): Promise<Metadata> {
//     const { data, isError }: EDUCATIONAL_CENTER_COURSES | any = await getResources(locale, slug[0]);

//     if (!data.length || isError) {
//         notFound()
//     }

//     const { course_name, about_us_content, svg, course_main: [{ title, content, image }] } = data[0];

//     const urlForImg = urlForImage(image)
//     // .auto('format')
//     // .fit('max')
//     // .url();

//     const urlForImageSvg = urlForImage(svg)
//     // .auto('format')
//     // .fit('max')
//     // .url();

//     return {
//         metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string | URL),
//         title: course_name,
//         description: about_us_content,
//         keywords: [course_name, title],
//         authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
//         icons: {
//             icon: urlForImageSvg?.src,
//         },
//         openGraph: {
//             // title: title,
//             // description: content,
//             // url: urlForImg?.src,
//             type: 'website',
//             // images: [
//             //     {
//             //         url: urlForImg?.src,
//             //         width: 400,
//             //         height: 400,
//             //         alt: course_name,
//             //     },
//             // ],
//         },
//     };
// }
