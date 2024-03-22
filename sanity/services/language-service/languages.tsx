import { groq } from 'next-sanity';
import { client } from '../../client';

import { ABOUT_LANGUAGE } from '../../sanity-queries/language';


export const getLanguageBySlug = async (slug: string, language: string): Promise<ABOUT_LANGUAGE[]> => {
    const query = groq`*[_type == "about-language" && slug.current == $slug] {
        "_id": _id,
        "name": name,
        "slug": slug,
        "text": text[$language],
        "during_courses_images": during_courses_images,
        "teachers": teachers[] {
            "fullName": fullName[$language],
            "teacher_image": teacher_image,
            "slug": slug,
        },
    }`;

    try {
        const data = await client.fetch(query, { slug, language: language || 'am' });
        return data;
    } catch (err) {
        throw err;
    }
};
