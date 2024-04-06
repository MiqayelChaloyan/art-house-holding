import Home from "@/components/screens/language/price-list";
import { client } from "../../../../../../sanity/client";
import { notFound } from "next/navigation";
import { query } from "../../../../../../sanity/services/language-service/price-list";

import { getTranslations } from "next-intl/server";

import { type Metadata } from "next";

import { Locale } from "@/locales";
import { urlForImage } from "../../../../../../sanity/imageUrlBuilder";


async function getResources(locale: string) {
    // const res = await getLanguageBySlug(slug, locale);
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    return data
}

// async function getResources(locale: any) {
//     if (client) {
//         return (await client.fetch(query, { language: locale })) || [];
//     }
//     return [];
// }


interface RootLayoutProps {
    params: {
        locale: string | any;
    };
}

export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return (<Home data={data} />);
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
