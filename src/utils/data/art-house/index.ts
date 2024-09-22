import { ABOUT_US_DETAILS_QUERY, HOME_DETALIS_QUERY, SOCIAL_QUERY } from '@/sanity/services/art-house-service';

import { sanityFetch } from '@/src/api/sanity-fetch';


export async function getHomeDetails(locale: string): Promise<HOME_DETALIS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<HOME_DETALIS_QUERYResult[]>({
            query: HOME_DETALIS_QUERY,
            params: { language: locale },
        });

        return result[1];
    } catch (error) {
        throw error;
    }
};

export async function getContacts(locale: string): Promise<SOCIAL_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<SOCIAL_QUERYResult[]>({
            query: SOCIAL_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getAboutDetails(locale: string): Promise<ABOUT_US_DETAILS_Result> {
    try {
        "use server";
        const result = await sanityFetch<ABOUT_US_DETAILS_Result[]>({
            query: ABOUT_US_DETAILS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};