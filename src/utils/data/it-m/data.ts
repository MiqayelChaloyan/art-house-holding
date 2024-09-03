import { ABOUT_US_DETAILS_QUERY, CONTACT_US_QUERY, COURSE_SLUG_QUERY, COURSES_QUERY, LESSONS_ORDERS_QUERY, OUR_TEAM_QUERY, PRICE_LIST_QUERY } from '../../../../sanity/services/it-m-service';

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
};

export async function getOurTeam(locale: string): Promise<OUR_TEAM_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<OUR_TEAM_QUERYResult[]>({
            query: OUR_TEAM_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourses(locale: string): Promise<COURSES_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_QUERYResult>({
            query: COURSES_QUERY,
            params: { language: locale },
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getCourse(locale: string, slug: string): Promise<COURSES_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_QUERYResult[]>({
            query: COURSE_SLUG_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getSelectOptions(locale: string): Promise<SELECT_OPTIONS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<SELECT_OPTIONS_QUERYResult[]>({
            query: LESSONS_ORDERS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getContacts(locale: string): Promise<CONTACT_US_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<CONTACT_US_QUERYResult[]>({
            query: CONTACT_US_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getAboutDetails(locale: string): Promise<ABOUT_US_DETAILS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<ABOUT_US_DETAILS_QUERYResult[]>({
            query: ABOUT_US_DETAILS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};