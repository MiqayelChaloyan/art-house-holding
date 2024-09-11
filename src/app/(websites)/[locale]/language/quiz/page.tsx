'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/language/quiz';

import { getQuizs } from '@/utils/data/language';


interface Props {
    params: {
        locale: string;
    };
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getQuizs(locale);

    if (!data) {
        notFound()
    }

    return (<Home locale={locale} data={data} /> );
};
