// import { groq } from 'next-sanity';
// import { client } from '../../client';

// import { LANGUAGE } from '../../sanity-queries/language';


// export const getCourses = async (language: string): Promise<LANGUAGE[]> => {
//     const query = groq`*[_type == "languages"] {
//         "_id": _id,
//         "slug": slug,
//         "course": option[$language],
//         "quantity_lessons": quantity_lessons[$language],
//         "class_duration": class_duration[$language],
//     }`;

//     try {
//         const data = await client.fetch(query, { language: language || 'am' }, { cache: 'no-store' });        
//         return data;
//     } catch (err) {
//         throw err;
//     }
// };



import { groq } from 'next-sanity';

export const query = groq`*[_type == "languages-select-option"] {
    "_id": _id,
    "languages": languages[] {
        "course": course[$language],
        "slug": slug.current,
    },
    "quantity_lessons": quantity_lessons[] {
        "quantity": quantity[$language],
        "slug": slug.current,
    },
    "class_duration": class_duration[] {
        "duration": duration[$language],
        "slug": slug.current,
    },
}`;


