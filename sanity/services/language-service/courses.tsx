import { groq } from 'next-sanity';
import { client } from '../../client';

import { LANGUAGE } from '../../sanity-queries/language';


export const getCourses = async (language: string): Promise<LANGUAGE[]> => {
    const query = groq`*[_type == "languages"] {
        "_id": _id,
        "slug": slug,
        "course_name": course_name[$language],
    }`;

    try {
        const data = await client.fetch(query, { language: language || 'am' }, { cache: 'no-store' });        
        return data;
    } catch (err) {
        throw err;
    }
};
