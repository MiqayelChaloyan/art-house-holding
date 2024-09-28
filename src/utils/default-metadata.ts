import { ImagePath } from '@/src/types/general';
import { defaultKeywords } from '../constants';
import DefaultIcon from '@/src/app/favicon.ico';

export const generateMetadataDynamic = (
    ogDescription?: string,
    ogTitle?: string,
    path?: ImagePath,
    icon?: ImagePath | null,
    locale?: string,
    keywords?: string[] | null,
) => {
    const icons = icon ? { icon: icon?.src } : { icon: DefaultIcon.src };
    const finalKeywords = keywords?.length ? keywords : defaultKeywords;

    return {
        metadataBase: process.env.NEXT_PUBLIC_DOMAIN
            ? new URL(process.env.NEXT_PUBLIC_DOMAIN)
            : new URL(`http://localhost:${process.env.PORT || 3000}`),
        authors: [
            {
                name: process.env.NEXT_PUBLIC_SITE_NAME,
                url: process.env.NEXT_PUBLIC_DOMAIN
            }
        ],
        icons,
        title: ogTitle,
        keywords: finalKeywords.join(', '),
        description: ogDescription,
        openGraph: {
            title: ogTitle,
            description: ogDescription,
            images: [
                {
                    url: path?.src,
                    width: 500,
                    height: 500,
                    alt: 'seo-image',
                },
            ],
            locale,
            type: 'website',
        },
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
    };
};
