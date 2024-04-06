'use server'

import { notFound } from 'next/navigation';

import Partners from '@/components/screens/language/partners';

import { client } from '../../../../../../sanity/client';
import { partnersQuery } from '../../../../../../sanity/services/generic-service';


async function getResources(locale: string) {
    const partners = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });

    if (!partners?.length || !partners?.length) {
        return {
            partners: [],
            isError: true
        }
    }

    return {
        partners,
        isError: false
    }
}


interface LayoutProps {
    params: {
        locale: string
    };
}


export default async function Page({ params: { locale } }: LayoutProps) {
    const { partners, isError } = await getResources(locale);

    if (!partners || isError) {
        notFound()
    }

    return <Partners partners={partners} />;
}


// export async function generateMetadata({
//     params: { locale },
// }: {
//     params: { locale: Locale };
// }): Promise<Metadata> {
//     const data = await getResources(locale);
//     const image = urlForImage(data[0].openGraphImage) as {
//         src: string
//     }

//     return {
//         // title: data[0].social,
//         description: data[0].description,
//         openGraph: {
//             images: [image.src],
//         },
//     };
// }
