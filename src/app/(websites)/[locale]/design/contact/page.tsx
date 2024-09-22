'use server'

import { notFound } from 'next/navigation';
import Home from '@/src/components/screens/design/contact';
import { getSelectOptions } from '@/src/utils/data/design';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const lessons = await getSelectOptions(locale);
    const lessonsArmenianKeyword = await getSelectOptions('am');

    if (!lessons || !lessonsArmenianKeyword) {
        notFound()
    }

    return (<Home lessons={lessons} lessonsArmenian={lessonsArmenianKeyword}/>);
};