import { groq } from 'next-sanity';
import { client } from '../../client';
import { EDUCATIONAL_CENTER_CO_WORKERS } from '../../sanity-queries/educational-center';

export const getCoWorkers = async (language: string): Promise<EDUCATIONAL_CENTER_CO_WORKERS[]> => {
    const query = groq`*[_type == "co-workers"] {
        "company_name": company_name[$language],
        "cooperation": cooperation[$language],
        "implemented_projects": implemented_projects[$language],
        "_id": _id,
        "slug": slug.current,
        "logo": logo
    }`;

    try {
        const data = await client.fetch(query, { language: language || 'am'  });
        return data;
    } catch (err) {
        throw err;
    }
};