import { ImagePath } from '@/src/types/general';
import { defaultKeywords } from '../constants';
import DefaultIcon from '@/src/app/favicon.ico';

export const generateMetadataDynamic = (
    ogDescription?: string,
    ogTitle?: string,
    path?: ImagePath,
    icon?: ImagePath,
    locale?: string,
    keywords?: string[] | null,
) => {
    const icons = icon ? { icon: icon?.src } : { icon: DefaultIcon.src };
    const finalKeywords = keywords?.length ? keywords : defaultKeywords;
    const url = process.env.NEXT_PUBLIC_DOMAIN || `http://localhost:${process.env.PORT || 3000}`;

    return {
        metadataBase: new URL(url),
        title: ogTitle,
        description: ogDescription,
        authors: [
            {
                name: process.env.NEXT_PUBLIC_SITE_NAME,
                url,
            }
        ],
        twitter: {
            card: path?.src,
            title: ogTitle,
            description: ogDescription,
            creator: '@arthouse',
            images: [
                {
                    url: path?.src,
                    width: path?.width,
                    height: path?.height,
                    alt: 'twitter',
                },
            ],
        },
        robots: 'index, follow',
        alternates: {
            canonical: process.env.NEXT_PUBLIC_DOMAIN,
            languages: {
                'ru': '/ru',
                'en': '/en',
            },
        },
        openGraph: {
            type: 'website',
            url,
            title: ogTitle,
            description: ogDescription,
            siteName: process.env.NEXT_PUBLIC_SITE_NAME,
            images: [
                {
                    url: path?.src,
                    width: 500,
                    height: 500,
                    alt: 'seo-image',
                },
            ],
            locale,
        },
        icons,
        keywords: finalKeywords.join(', '),
    };
};