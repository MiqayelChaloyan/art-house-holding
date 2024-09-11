import { ABOUT_US_DETAILS_QUERY, COURSE_ID_QUERY, COURSE_SLUG_QUERY, COURSES_QUERY, LESSONS_QUERY, PORTFOLIO_QUERY, PRICE_LIST_QUERY, SOCIAL_QUERY } from '../../../../sanity/services/design-service';

import { sanityFetch } from '@/api/sanity-fetch';


export async function getHomeDetails(locale: string): Promise<HOME_DETALIS_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<HOME_DETALIS_DESIGN_QUERYResult[]>({
            query: ABOUT_US_DETAILS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourses(locale: string): Promise<COURSES_DESIGN_QUERYResult[]> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
            query: COURSES_QUERY,
            params: { language: locale },
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getCourseBySlug(locale: string, slug: string): Promise<COURSES_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
            query: COURSE_SLUG_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourseById(locale: string, slug: string): Promise<COURSES_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_DESIGN_QUERYResult[]>({
            query: COURSE_ID_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getSelectOptions(locale: string): Promise<SELECT_OPTIONS_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<SELECT_OPTIONS_DESIGN_QUERYResult[]>({
            query: LESSONS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getContacts(locale: string): Promise<CONTACT_US_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<CONTACT_US_DESIGN_QUERYResult[]>({
            query: SOCIAL_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getPriceList(locale: string): Promise<PRICE_LIST_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_DESIGN_QUERYResult[]>({
            query: PRICE_LIST_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getPortfolio(locale: string): Promise<PRICE_LIST_DESIGN_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_DESIGN_QUERYResult[]>({
            query: PORTFOLIO_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};