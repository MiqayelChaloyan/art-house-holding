'use server'

import { notFound } from 'next/navigation';

import QuizPage from '@/components/screens/language/quiz/[quiz]';

import { client } from '../../../../../../../sanity/client';
import { quizBySlugQuery } from '../../../../../../../sanity/services/language-service/quiz';


interface Props {
    params: {
        locale: string;
        slug: string;
    };
};

async function getResources(slug: string, locale: string) {
    try {
        const data = await client.fetch(quizBySlugQuery, { slug, language: locale }, { next: { revalidate: 100 } });

        if (!data) {
            return { data: [], isError: true };
        }

        return { data, isError: false };
    } catch (_) {
        return { data: [], isError: true };
    }
};

export default async function Page({
    params: { locale, slug }
}: Readonly<Props>) {
    const { data, isError } = await getResources(slug[0], locale);

    if (!data || isError) {
        notFound()
    }

    return (<QuizPage data={data[0]} />);
};