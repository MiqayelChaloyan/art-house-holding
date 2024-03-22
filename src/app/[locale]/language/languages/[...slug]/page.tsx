import { notFound } from "next/navigation";

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Locale } from "@/locales";

import Language from "@/components/screens/language/languages/Language";

import { getLanguageBySlug } from "../../../../../../sanity/services/language-service/languages";


interface RootLayoutProps {
    params: {
        locale: string;
        slug: any
    };
}


async function getResources(slug: string, locale: string) {
    const res = await getLanguageBySlug(slug, locale);
    return res[0]
}


export default async function Page({ params: { locale, slug } }: Readonly<RootLayoutProps>) {
    const data = await getResources(slug[0], locale);
    
    if (!data) {
        notFound()
    }

    return <Language locale={locale} data={data} />
}


export async function generateMetadata({
    params: { locale, slug },
}: {
    params: { locale: Locale, slug: any };
}): Promise<Metadata> {
    const t = await getTranslations({ locale, namespace: 'metadata' });

    // const data = await getResources(slug[0], locale);

    return {
        description: t('language'),
    };
}
