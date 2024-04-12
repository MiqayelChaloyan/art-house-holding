import { notFound } from "next/navigation";

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { Locale } from "@/locales";

import Language from "@/components/screens/language/languages/Language";
import QuizPage from "@/components/screens/language/quiz/[quiz]";
import { client } from "../../../../../../../sanity/client";
import { quizBySlugQuery } from "../../../../../../../sanity/services/language-service/quiz";


interface RootLayoutProps {
    params: {
        locale: string
        slug: string
    };
}


async function getResources(slug: string, locale: string) {
    const data = await client.fetch(quizBySlugQuery, { slug, language: locale }, { next: { revalidate: 100 } });
    return data[0]
}


export default async function Page({ params: { locale, slug } }: Readonly<RootLayoutProps>) {
    const data = await getResources(slug[0], locale);

    if (!data) {
        notFound()
    }

    return <QuizPage data={data}/>
}


// export async function generateMetadata({
//     params: { locale, slug },
// }: {
//     params: { locale: Locale, slug: any };
// }): Promise<Metadata> {
//     const t = await getTranslations({ locale, namespace: 'metadata' });

//     // const data = await getResources(slug[0], locale);

//     return {
//         description: t('language'),
//     };
// }
