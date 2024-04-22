import { notFound } from 'next/navigation';

import { type Metadata } from 'next';

// import { getTranslations } from 'next-intl/server';

import { Locale } from '@/locales';

import Language from '@/components/screens/language/languages/Language';

import { querySlug } from '../../../../../../../sanity/services/language-service/languages';
import { client } from '../../../../../../../sanity/client';
import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


interface Props {
    params: {
        locale: string,
        slug: string
    }
}

async function getResources(slug: string, locale: string) {
    try {
        const data = await client.fetch(querySlug, { slug, language: locale }, { next: { revalidate: 100 } });

        if (!data?.length) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (error) {
        return { data: [], isError: true };
    }
}

export default async function Page({ 
    params: { locale, slug } 
}:Readonly<Props>) {
    const { data } = await getResources(slug[0], locale);

    if (!data.length) {
        notFound()
    }

    return (
        <Language
            locale={locale}
            data={data[0]}
        />
    )
}


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: any };
}): Promise<Metadata> {
    const result = await getResources(slug[0], locale);
    // const t = await getTranslations({ locale, namespace: 'metadata' });

    const { name, during_courses_images, text } = result?.data[0] || {};

    // const ogTitle = `${name} ${t('introduction')}`;
    const ogTitle = name;

    const ogDescription = `${text[0].children[0].text.slice(0, 100)}...`;
    const path: { src: string, width: string, height: string } | any = urlForImage(during_courses_images[0]);

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
}
