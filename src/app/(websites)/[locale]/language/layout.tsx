'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/lib/outlets/language/ContactUs';
import Footer from '@/lib/outlets/language/Footer';
import Header from '@/lib/outlets/language/Header';
import PlayerModal from '@/lib/outlets/general/PlayerModal';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';
import GoBack from '@/lib/outlets/general/GoBack';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';

import { query, queryFilterCourses } from '../../../../../sanity/services/language-service/courses';
import { query as queryBranches } from '../../../../../sanity/services/art-house-service';
import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';
import { querySiteMeta } from '../../../../../sanity/services/language-service/about-us';
import { querySocial } from '../../../../../sanity/services/language-service/contact-us';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


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

const localeStrings: {
    am: string
    ru: string
    en: string
    [key: string]: string
} = {
    am: 'լեզվի կենտրոն',
    ru: 'языковой центр',
    en: 'language center'
};

async function getResources(locale: string) {
    const coursesPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const branchesPromise = await client.fetch(queryBranches, { language: locale }, { next: { revalidate: 100 } });
    const languagesPromise = await client.fetch(queryFilterCourses, { language: 'am' }, { next: { revalidate: 100 } });
    const socialPromise = await client.fetch(querySocial, { language: 'en' }, { next: { revalidate: 100 } });

    return Promise.all([coursesPromise, branchesPromise, languagesPromise, socialPromise])
        .then(([courses, branches, languages, social]) => {
            if (!courses?.length || !branches?.length || !languages?.length || !social?.length) {
                return { courses: [], branches: [], languages: [], social: [], isError: true };
            }

            return { courses: courses[0], branches: branches[1], languages: languages[0], social: social[0], isError: false };
        })
        .catch(error => {
            return { courses: [], branches: [], languages: [], social: [], isError: true };
        });

}

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const {
        courses,
        branches,
        languages,
        social,
        isError
    }: LANGUAGE[] | any = await getResources(locale);

    if (!courses || !branches || !languages || !social || isError) {
        notFound()
    }

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <div>
                    <Header locale={locale} />
                </div>
                {/* <FBMessenger /> */}
                <GoBack locale={locale} theme='#006ED2'/>
                <ScrollToTopButton theme='#006ED2' />
                <FloatingMenu
                    website={localeStrings[locale]}
                    branches={branches}
                    theme='#006ED2'
                    hover='#F9CC48'
                />
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal />
            <ContactUs courses={courses?.course_name} languages={languages} socialData={social} />
            <Footer socialData={social} />
        </div>
    );
}


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

