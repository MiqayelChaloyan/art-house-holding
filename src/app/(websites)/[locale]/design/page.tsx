'use server'

import Home from '@/components/screens/design/home';
import { notFound } from 'next/navigation';

// import Home from '@/components/screens/language/home';

// import { client } from '../../../../../sanity/client';

// import { query } from '../../../../../sanity/services/language-service/about-us';
// import { query as discountsQuery } from '../../../../../sanity/services/language-service/promotions';
// import { partnersQuery } from '../../../../../sanity/services/generic-service';


interface RootProps {
    params: {
        locale: string,
    }
}

// async function getResources(locale: string) {
//     const dataPromise = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
//     const partnersPromise = await client.fetch(partnersQuery, { language: locale }, { next: { revalidate: 100 } });
//     const discountsPromise = await client.fetch(discountsQuery, { language: locale }, { next: { revalidate: 100 } });

//     return Promise.all([dataPromise, partnersPromise, discountsPromise])
//         .then(([data, partners, discounts]) => {
//             if (!data?.length || !partners?.length || !discounts?.length) {
//                 return { data: [], partners: [], discounts: [], isError: true };
//             }

//             return { data, partners, discounts, isError: false };
//         })
//         .catch(error => {
//             return { data: [], partners: [], discounts: [], isError: true };
//         });
// }

export default async function Page({
    params: { locale }
}:
    Readonly<RootProps>) {
    // const { data, discounts, partners } = await getResources(locale);

    // if (!data || !discounts || !partners) {
    //     notFound()
    // }

    return (<Home/>)
}

