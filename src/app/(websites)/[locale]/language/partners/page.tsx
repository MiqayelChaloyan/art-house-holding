'use server'

import { notFound } from 'next/navigation';
import Partners from '@/src/components/screens/language/partners';
import { getPartners } from '@/src/utils/data';


interface Props {
    params: {
        locale: string;
    }
};

export default async function Page(
    { params: { locale }
    }: Readonly<Props>) {
        const partners = await getPartners(locale);

    if (!partners) {
        notFound()
    }

    return (<Partners partners={partners} />);
};

