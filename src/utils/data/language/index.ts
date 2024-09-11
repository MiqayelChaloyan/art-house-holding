import { ABOUT_US_DETAILS_QUERY, COURSES_QUERY, DISCOUNTS_QUERY, FILTER_COURSES_QUERY, LANGUAGE_ID_QUERY, LANGUAGE_SLUG_QUERY, LANGUAGES_QUERY, PRICE_LIST_QUERY, QUIZ_SLUG_QUERY, QUIZS_QUERY, SOCIAL_QUERY } from '../../../../sanity/services/language-service';

import { sanityFetch } from '@/api/sanity-fetch';

export async function getHomeDetails(locale: string): Promise<HOME_DETALIS_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<HOME_DETALIS_LANGUAGE_QUERYResult[]>({
            query: ABOUT_US_DETAILS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getDiscounts(locale: string): Promise<DISCOUNTS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<DISCOUNTS_QUERYResult[]>({
            query: DISCOUNTS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourses(locale: string): Promise<LANGUAGE[]> {
    try {
        "use server";
        const result = await sanityFetch<LANGUAGE[]>({
            query: LANGUAGES_QUERY,
            params: { language: locale },
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getCourseBySlug(locale: string, slug: string): Promise<LANGUAGE> {
    try {
        "use server";
        const result = await sanityFetch<LANGUAGE[]>({
            query: LANGUAGE_SLUG_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourseById(locale: string, slug: string): Promise<ABOUT_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<ABOUT_LANGUAGE_QUERYResult[]>({
            query: LANGUAGE_ID_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getSelectOptions(locale: string): Promise<COURSES> {
    try {
        "use server";
        const result = await sanityFetch<COURSES[]>({
            query: COURSES_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getSelectOptionsFiltered(locale: string): Promise<COURSES> {
    try {
        "use server";
        const result = await sanityFetch<COURSES[]>({
            query: FILTER_COURSES_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getContacts(locale: string): Promise<CONTACT_US_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<CONTACT_US_LANGUAGE_QUERYResult[]>({
            query: SOCIAL_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getPriceList(locale: string): Promise<PRICE_LIST_LANGUAGE_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<PRICE_LIST_LANGUAGE_QUERYResult[]>({
            query: PRICE_LIST_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getQuizs(locale: string): Promise<QUIZ_QUERYResult[]> {
    try {
        "use server";
        const result = await sanityFetch<QUIZ_QUERYResult[]>({
            query: QUIZS_QUERY,
            params: { language: locale },
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export async function getQuizBySlug(locale: string, slug: string): Promise<QUIZ_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<QUIZ_QUERYResult[]>({
            query: QUIZ_SLUG_QUERY,
            params: { language: locale, slug },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};