import { ImagePath } from '@/types/general';

// export const defaultMetadata = {
//     metadataBase: new URL(site.url),
//     title: site.title,
//     description: site.description,
//     category: site.category,
//     robots: { index: true },
//     authors: { name: site.authorName },
//     keywords: site.keywords,
//     creator: site.authorUsername,
//     publisher: site.authorUsername,
//     openGraph: {
//         title: site.title,
//         description: site.description,
//         url: site.url,
//         siteName: site.title,
//         images: 'https://skaters-inifarhan.vercel.app/images/screenshoot.PNG',
//         type: 'website',
//         locale: site.locale
//     },
//     twitter: {
//         card: 'summary_large_image',
//         title: site.title,
//         description: site.description,
//         images: ['https://skaters-inifarhan.vercel.app/images/screenshoot.PNG'],
//     },
// };

export const generateMetadataDynamic = (
    ogDescription: string,
    ogTitle: string,
    path: ImagePath,
    locale: string
) => {
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
}