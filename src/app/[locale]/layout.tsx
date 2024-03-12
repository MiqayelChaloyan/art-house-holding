import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Metadata } from 'next';

// import Providers from '@/app/providers';
import { locales } from '@/navigation';

import Header from '@/components/outlets/art-house/header';
import Footer from '@/components/outlets/art-house/footer';

import '@/styles/globals.sass';


const inter = Inter({ subsets: ['latin'] });


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Art House Holding',
        description: 'At Art House, we pride ourselves on being a dynamic training center that offers a diverse array of courses to ignite your passion and elevate your skills.',
        openGraph:{
            url: process.env.NEXT_PUBLIC_DOMAIN,
            title: process.env.NEXT_PUBLIC_SITE_NAME,
            images: [
                {
                    url: 'https://images.squarespace-cdn.com/content/v1/63ed0c8e54d11151a02d1803/52c3f2b6-fbf3-469b-880f-bb3181827cc0/Training%2BCenter%2BConference%2BRoom%2BMockup.jpg',
                    width: 400,
                    height: 400,
                    alt: 'Art House Holding',
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

    const messages = useMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                {/* <Providers> */}
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header typePosition='fixed' />
                        {children}
                    <Footer />
                </NextIntlClientProvider>
                {/* </Providers> */}
            </body>
        </html>
    );
}
