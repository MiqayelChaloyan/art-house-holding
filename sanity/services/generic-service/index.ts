import { groq } from 'next-sanity';

export const partnersQuery = groq`*[_type == "partners"] {
    "company_name": company_name[$language],
    "cooperation": cooperation[$language],
    "implemented_projects": implemented_projects[$language],
    "_id": _id,
    "slug": slug.current,
    "logo": logo
}`;