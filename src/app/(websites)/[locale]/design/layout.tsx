'use server'

import Footer from "@/lib/outlets/design/Footer";
import Header from "@/lib/outlets/design/Header";

import { notFound } from 'next/navigation';

// import { type Metadata } from 'next';

import ScrollToTopButton from '@/lib/outlets/general/ScrollToTopButton';
// import ContactUs from '@/lib/outlets/language/ContactUs';
// import Footer from '@/lib/outlets/language/Footer';
// import Header from '@/lib/outlets/language/Header';
// import PlayerModal from '@/lib/outlets/general/PlayerModal';
import FloatingMenu from '@/lib/outlets/general/FloatingMenu';

// import { Locale } from '@/locales';
// import { SanityClient } from 'sanity';

import { client } from '../../../../../sanity/client';

// import { query } from '../../../../../sanity/services/language-service/courses';
import { query as queryBranches } from '../../../../../sanity/services/art-house-service';
import { LANGUAGE } from '../../../../../sanity/sanity-queries/language';
// import { querySiteMeta } from '../../../../../sanity/services/language-service/about-us';
// import { urlForImage } from '../../../../../sanity/imageUrlBuilder';


interface RootLayoutProps {
    children: React.ReactNode,
    params: {
        locale: string,
    };
}

// interface Site {
//     site_name: string,
//     ogTitle: string,
//     ogImage: {
//         _type: string,
//         asset: {
//             _ref: string,
//             _type: string
//         }
//     },
//     ogDescription: string
// }

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
    // const coursesPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    const branchesPromise = await client.fetch(queryBranches, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([branchesPromise])
        .then(([branches]) => {
            if (!branches?.length) {
                return { branches: [], isError: true };
            }

            return { branches: branches[1], isError: false };
        })
        .catch(error => {
            return { branches: [], isError: true };
        });

}

export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const { branches, isError }: LANGUAGE[] | any = await getResources(locale);

    if (!branches || isError) {
        notFound()
    }

    return (
        <div className='design-container'>
            <Header typePosition="fixed" locale={locale} />
            <ScrollToTopButton theme='#8E685C' />
            <FloatingMenu
                website={localeStrings[locale]}
                branches={branches}
                theme='#8E685C'
                hover='#4B352B'
            />
            {children}
            <Footer />
        </div>
    );
}


// async function getSiteMeta(
//     query: string = querySiteMeta,
//     client: SanityClient | any,
//     mutation = 'fetch'
// ): Promise<Site> {
//     const site: Site = await client[mutation](query)
//     return site
// }

// export async function generateMetadata({
//     params: { locale },
// }: {
//     params: { locale: Locale };
// }): Promise<Metadata> {
//     const meta: Site | any = await getSiteMeta(querySiteMeta, client)
//     const { ogDescription, ogTitle, ogImage } = meta[0];

//     const path: { src: string, width: string, height: string } | any = urlForImage(ogImage);

//     return {
//         metadataBase: process.env.NEXT_PUBLIC_DOMAIN
//             ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
//             : new URL(`http://localhost:${process.env.PORT || 3000}`),
//         authors: [{ name: process.env.NEXT_PUBLIC_SITE_NAME, url: process.env.NEXT_PUBLIC_DOMAIN }],
//         title: ogTitle,
//         description: ogDescription,
//         openGraph: {
//             title: ogTitle,
//             description: ogDescription,
//             images: [
//                 {
//                     url: path?.src,
//                     width: 500,
//                     height: 500,
//                     alt: "seo-image",
//                 },
//             ],
//             locale,
//             type: "website",
//         },
//         twitter: {
//             card: path?.src,
//             title: ogTitle,
//             description: ogDescription,
//             creator: "@arthouse",
//             images: [
//                 {
//                     url: path?.src,
//                     width: path?.width,
//                     height: path?.height,
//                     alt: "twitter",
//                 },
//             ],
//         },
//     };
// };

