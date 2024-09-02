'use server'

import { notFound } from 'next/navigation';

import Courses from '@/components/screens/it-m/courses';

import { getCourses } from '@/utils/data/it-m/data';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getCourses(locale);

    if (!data) {
        notFound();
    };

    return (<Courses data={data} locale={locale}/>);
};