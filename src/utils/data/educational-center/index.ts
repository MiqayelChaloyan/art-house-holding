import { HOME_DETALIS_QUERY, COURSES_QUERY, COURSE_SLUG_QUERY, LESSONS_QUERY, SOCIAL_QUERY } from '@/sanity/services/educational-center-service';

import { sanityFetch } from '@/src/api/sanity-fetch';


export async function getHomeDetails(locale: string): Promise<HOME_DETALIS_QUERYResult> {
    try {
        "use server";
        const result = await sanityFetch<HOME_DETALIS_QUERYResult[]>({
            query: HOME_DETALIS_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};

export async function getCourses(locale: string): Promise<COURSES_QUERYResult[]> {
    try {
        "use server";
        const result = await sanityFetch<COURSES_QUERYResult[]>({
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
            query: LESSONS_QUERY,
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
            query: SOCIAL_QUERY,
            params: { language: locale },
        });

        return result[0];
    } catch (error) {
        throw error;
    }
};