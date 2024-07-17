'use server'

import { notFound } from 'next/navigation';

import Home from '@/components/screens/design/contact';

import { client } from '../../../../../../sanity/client';
import { query as lessonsQuery } from '../../../../../../sanity/services/design-service/lessons';


interface Props {
    params: {
        locale: string;
    }
};

async function getResources(locale: string) {
    const lessonsPromise = await client.fetch(lessonsQuery, { language: locale }, { next: { revalidate: 100 } });
    const lessonsAmPromise = await client.fetch(lessonsQuery, { language: 'am' }, { next: { revalidate: 100 } });

    return Promise.all([lessonsPromise, lessonsAmPromise])
        .then(([lessons, lessonsArmenian]) => {
            if (!lessons?.length || !lessonsArmenian?.length) {
                return {lessons: [], lessonsArmenian: [], isError: true };
            }

            return { lessons, lessonsArmenian, isError: false };
        })
        .catch(_ => {
            return {  lessons: [], lessonsArmenian: [], isError: true };
        });
}

export default async function Page({
    params: { locale }
}: Readonly<Props>) {

    const { lessons,  lessonsArmenian, isError} = await getResources(locale);

    if (!lessons || !lessonsArmenian || isError) {
        notFound()
    }

    return (<Home lessons={lessons} lessonsArmenian={lessonsArmenian}/>);
};