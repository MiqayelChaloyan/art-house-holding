import 'server-only';

import { headers } from 'next/headers';

import { ImagePath } from '@/src/types/general';
import { defaultKeywords } from '../constants';
import DefaultIcon from '@/src/app/favicon.ico';
import { buildHreflangAlternates, encodeCanonicalPath, resolveCanonicalPath } from '@/src/utils/canonical';

export const generateMetadataDynamic = (
    ogDescription?: string,
    ogTitle?: string,
    path?: ImagePath,
    icon?: ImagePath | null,
    locale?: string,
    keywords?: string[] | null,
    canonicalPath?: string,
) => {
    const icons = icon ? { icon: icon?.src } : { icon: DefaultIcon.src };
    const finalKeywords = keywords?.length ? keywords : defaultKeywords;
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN || `http://localhost:${process.env.PORT || 3000}`;
    const requestPathname = headers().get('x-pathname');
    const pathname = encodeCanonicalPath(
        resolveCanonicalPath(locale, canonicalPath, requestPathname),
    );
    const canonical = `${baseUrl.replace(/\/$/, '')}${pathname}`;

    return {
        metadataBase: new URL(baseUrl),
        title: ogTitle,
        description: ogDescription,
        authors: [
            {
                name: process.env.NEXT_PUBLIC_SITE_NAME,
                url: baseUrl,
            },
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
            canonical,
            languages: buildHreflangAlternates(pathname),
        },
        openGraph: {
            type: 'website',
            url: canonical,
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
