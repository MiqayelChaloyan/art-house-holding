import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// import Providers from '@/app/providers';
import { locales } from '@/navigation';

import Header from '@/components/header';
import Footer from '@/components/footer';

import '@/styles/globals.sass';


const inter = Inter({ subsets: ['latin'] });


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Art House Holding',
        description: 'Through immersive classes, ART teaches you the skills you need in your future career as a successful and competitive professional.',
        openGraph:{
            url: process.env.NEXT_PUBLIC_DOMAIN,
            title: process.env.NEXT_PUBLIC_SITE_NAME,
            images: [
                {
                    url: 'https://images.squarespace-cdn.com/content/v1/63ed0c8e54d11151a02d1803/52c3f2b6-fbf3-469b-880f-bb3181827cc0/Training%2BCenter%2BConference%2BRoom%2BMockup.jpg',
                    width: 400,
                    height: 400,
                    alt: 'Art Education Center',
                },
            ],
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
            type: 'website',
            locale: 'en'
        }
    };
}


export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}


export default function PublicLayout({
    children,
    params: { locale },
}: {
    children: ReactNode;
    params: { locale: string };
}) {

    if (!locales.includes(locale as any)) notFound();

    return (
        <div className="flex min-h-0 flex-1 p-4">
            {/* <Providers> */}
            <Header />
                {children}
            <Footer />
            {/* </Providers> */}
        </div>
    );
}
