import { notFound } from 'next/navigation';
import { type Metadata } from 'next';

import BlogDetailPage from '@/src/components/blog/DetailPage';

import { Locale } from '@/src/locales';
import { BlogSiteKey } from '@/src/components/blog/config';

import { urlForImage } from '@/sanity/imageUrlBuilder';

import { ImagePath } from '@/src/types/general';
import { generateMetadataDynamic } from '@/src/utils/default-metadata';
import { getBlogPost, getSimilarBlogPosts } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
        slug: string[];
    };
};

export default async function Page({
    params: { locale, slug },
}: Readonly<Props>) {
    const slugPath = slug?.[0];

    if (!slugPath) {
        notFound();
    }

    const decodedSlug = decodeURIComponent(slugPath);
    const post = await getBlogPost(locale, decodedSlug);

    if (!post) {
        notFound();
    }

    const similarPosts = await getSimilarBlogPosts(locale, decodedSlug, post.relatedPosts);
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${locale}/design/blog/${decodedSlug}`;

    return (
        <BlogDetailPage
            siteKey={'design' satisfies BlogSiteKey}
            post={post}
            similarPosts={similarPosts}
            shareUrl={shareUrl}
        />
    );
};

export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale; slug: string[] };
}): Promise<Metadata> {
    const slugPath = slug?.[0];

    if (!slugPath) {
        notFound();
    }

    const decodedSlug = decodeURIComponent(slugPath);
    const data = await getBlogPost(locale, decodedSlug);

    if (!data) {
        notFound();
    }

    const path: ImagePath = urlForImage(data.ogImage || data.featuredImage);

    return generateMetadataDynamic(
        data.ogDescription || data.excerpt,
        data.title,
        path,
        null,
        locale,
        data.keywords,
        `/${locale}/design/blog/${decodedSlug}`,
    );
};
