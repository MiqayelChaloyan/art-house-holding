import { PARTNERS_QUERY } from '@/sanity/services/generic-service';

import { sanityFetch } from '@/src/api/sanity-fetch';


export async function getPartners(locale: string): Promise<PARTNER_Result[]> {
    try {
        "use server";
        const result = await sanityFetch<PARTNER_Result[]>({
            query: PARTNERS_QUERY,
            params: { language: locale },
        });

        return result;
    } catch (error) {
        throw error;
    }
};