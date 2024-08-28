import { PRICE_LIST_QUERY } from '../../../../sanity/services/it-m-service';

import { sanityFetch } from '@/api/sanity-fetch';


export async function getPriceList(locale: string): Promise<PRICE_LIST_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_QUERYResult[]>({
            query: PRICE_LIST_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
}
