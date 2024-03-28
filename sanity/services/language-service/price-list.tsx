// export async function getSettings() {
//     if (client) {
//       return (await client.fetch(configQuery)) || [];
//     }
//     return [];
//   }

import { groq } from "next-sanity";

  
//   export async function getPostBySlug(slug) {
//     if (client) {
//       return (await client.fetch(singlequery, { slug })) || {};
//     }
//     return {};
//   }




export const query = groq`*[_type == "price-list-language"] {
    "_id":  _id,
    "name": name,
    "description": description[$language],
    "social": social[$language],
    "openGraphImage": openGraphImage,
    "price_list": price_list[] {
        "slug": slug.current,
        "teaching_language": teaching_language[$language],
        "group_lessons": group_lessons,
        "private_lessons": private_lessons,
    },
    "private_lessons": private_lessons[] {
        "slug": slug.current,
        "teaching_language": teaching_language[$language],
        "private_lessons": private_lessons,
    },
    "english_courses": english_courses[] {
        "slug": slug.current,
        "language_type": language_type[$language],
        "duration": duration[$language],
        "private_lessons": private_lessons,
    },
}`;
