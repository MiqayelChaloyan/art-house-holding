import { groq } from "next-sanity";


export const query = groq`*[_type == "price-list-language"] {
    "_id":  _id,
    "name": name,
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
