'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import ContactUs from '@/lib/outlets/language/ContactUs';
import Footer from '@/lib/outlets/language/Footer';
import Header from '@/lib/outlets/language/Header';
import PlayerModal from '@/lib/outlets/language/Modal';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';

import { query } from '../../../../../sanity/services/language-service/courses';
import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';
import { querySiteMeta } from '../../../../../sanity/services/language-service/about-us';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    };
}

interface Site {
    site_name: string,
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

async function getResources(locale: string) {
    try {
        const courses = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

        if (!courses[0]) {
            return { languages: [], isError: true };
        }

        return { courses, isError: false };
    } catch (error) {
        return { courses: [], isError: true };
    }
}

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const { courses, isError }: LANGUAGE[] | any = await getResources(locale);

    if (!courses || isError) {
        notFound()
    }

    return (
        <div className='languages-container'>
            <div className='wrapper-content'>
                <div>
                    <Header locale={locale} />
                </div>
                {/* <FBMessenger /> */}
                <ScrollToTopButton />
                <main className='languages-main'>
                    {children}
                </main>
            </div>
            <PlayerModal />
            <ContactUs courses={courses[0]?.languages} />
            <Footer />
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

