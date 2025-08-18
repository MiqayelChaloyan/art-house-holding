'use server'

import { notFound } from 'next/navigation';
import About from '@/src/components/screens/language/about';
import { getHomeDetails } from '@/src/utils/data/language';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<Props>) {
    const data = await getHomeDetails(locale);

    if (!data) {
        notFound()
    }

    return (<About data={data} locale={locale} />);
};

