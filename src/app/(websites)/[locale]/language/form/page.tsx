'use server'

import { notFound } from 'next/navigation';

import Form from '@/components/screens/language/form';

import { getSelectOptions, getSelectOptionsFiltered } from '@/utils/data/language';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const data = await getSelectOptions(locale);
    const courses = await getSelectOptionsFiltered(locale);

    if (!data || !courses) {
        notFound()
    }

    return (<Form data={data} courses={courses} />);
};