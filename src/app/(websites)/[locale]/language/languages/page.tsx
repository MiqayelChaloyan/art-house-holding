'use server'

import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { getCourses } from '@/src/utils/data/language';


const Component = dynamic(() =>
    import('@/src/components/screens/language/languages'),
);

interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const languages = await getCourses(locale);

    if (!languages) {
        notFound()
    }

    return (<Component locale={locale} data={languages} />);
};

