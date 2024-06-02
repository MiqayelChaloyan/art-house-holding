'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Footer from "@/lib/outlets/design/Footer";
import Header from "@/lib/outlets/design/Header";

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';
import Modal from '@/lib/outlets/design/Modal';
import CoursesModal from '@/lib/outlets/design/Modal/courses';
import ContactUs from '@/lib/outlets/design/ContactUs';
import PlayerModal from '@/lib/outlets/general/PlayerModal';
import GoBack from '@/lib/outlets/general/GoBack';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';

import { query as queryBranches } from '../../../../../sanity/services/art-house-service';
import { querySiteMeta, querySocial } from '../../../../../sanity/services/design-service/about-us';
import { query as lessonsQuery } from '../../../../../sanity/services/design-service/lessons';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { allCoursesQuery } from '../../../../../sanity/services/design-service/courses';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';
import { HOSTS, LESSONS } from '../../../../../sanity/sanity-queries/design';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    };
}

interface Site {
    ogTitle: string,
    ogImage: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    ogDescription: string
}

type TYPES = {
    branches: PARTNER[],
    courses: any,
    social: HOSTS | any,
    lessons: LESSONS[],
    lessonsArmenian: LESSONS[],
    isError: boolean,
}

const localeStrings: {
    am: string
    ru: string
    en: string
    [key: string]: string
} = {
    am: 'դիզայն ստուդիա',
    ru: 'студия дизайна',
    en: 'design studio'
};

async function getResources(locale: string) {
    const branchesPromise = await client.fetch(queryBranches, { language: locale }, { next: { revalidate: 100 } });
    const coursesPromise = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });
    const socialPromise = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });
    const lessonsPromise = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
    const lessonsAmPromise = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

    return Promise.all([branchesPromise, coursesPromise, socialPromise, lessonsPromise, lessonsAmPromise])
        .then(([branches, courses, social, lessons, lessonsArmenian]) => {
            if (!branches?.length || !courses?.length || !social?.length || !lessons?.length || !lessonsArmenian?.length) {
                return { branches: [], courses: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
            }

            return { branches: branches[1], courses, social: social[0], lessons, lessonsArmenian, isError: false };
        })
        .catch(error => {
            return { branches: [], courses: [], social: [], lessons: [], lessonsArmenian: [], isError: true };
        });
};

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const {
        branches,
        courses,
        social,
        lessons,
        lessonsArmenian,
        isError
    }: TYPES = await getResources(locale);

    if (!branches || !courses || !social || !lessons || !lessonsArmenian || isError) {
        notFound()
    };

    return (
        <>
            <div className='design-container'>
                <Header typePosition="fixed" locale={locale} />
                <GoBack locale={locale} theme='#8E685C'/>
                <ScrollToTopButton theme='#8E685C' />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme='#8E685C'
                    hover='#4B352B'
                />
                {children}
                {/* <ContactUs
                    locale={locale}
                    lessons={lessons}
                    lessonsArmenian={lessonsArmenian}
                /> */}
                <Footer socialData={social} />
            </div>
            <Modal>
                <CoursesModal locale={locale} courses={courses} />
            </Modal>
            <PlayerModal />
        </>
    );
};


async function getSiteMeta(
    query: string = querySiteMeta,
    client: SanityClient | any,
    mutation = 'fetch'
): Promise<Site> {
    const site: Site = await client[mutation](query)
    return site
}

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const meta: Site | any = await getSiteMeta(querySiteMeta, client)
    const { ogDescription, ogTitle, ogImage } = meta[0];

    const path: { src: string, width: string, height: string } | any = urlForImage(ogImage);

    return {
        metadataBase: process.env.NEXT_PUBLIC_DOMAIN
            ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
            : new URL(`http://localhost:${process.env.PORT || 3000}`),
        authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
        title: ogTitle,
        description: ogDescription,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: [
                {
                    url: path?.src,
                    width: 500,
                    height: 500,
                    alt: "seo-image",
                },
            ],
            locale,
            type: "website",
        },
        twitter: {
            card: path?.src,
            title: ogTitle,
            description: ogDescription,
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

