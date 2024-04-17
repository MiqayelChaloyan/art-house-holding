'use server'

import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

import Header from '@/lib/outlets/educational-center/Header';
import BottomMenu from '@/lib/outlets/educational-center/BottomMenu';
import RightMenu from '@/lib/outlets/educational-center/RightMenu';
import Footer from '@/lib/outlets/educational-center/Footer';
import Modal from '@/lib/outlets/educational-center/Modal';
import CoursesModal from '@/lib/outlets/educational-center/Modal/courses';
import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';

import { Locale } from '@/locales';
import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';
import { allCoursesQuery } from '../../../../../sanity/services/educational-center-service/courses';
import { querySiteMeta } from '../../../../../sanity/services/educational-center-service/about-us';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    }
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
        const data = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });

        if (!data) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
}

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return (
        <div>
            <div className='wrapper'>
                <RightMenu />
                <BottomMenu locale={locale} />
                {/* <ScrollToTopButton theme='#821616' />
                <FloatingMenu website='educational center' theme='#821616' /> */}
                <div className='wrapper-content'>
                    <Header typePosition="fixed" locale={locale} />
                    <main className='wrapper-main'>
                        {children}
                    </main>
                </div>
                <Footer courses={data} />
            </div>
            <Modal>
                <CoursesModal locale={locale} courses={data} />
            </Modal>
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

