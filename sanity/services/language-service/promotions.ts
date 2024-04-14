


import { groq } from 'next-sanity';

export const query = groq`*[_type == "promotions-languages"] {
    "_id": _id,
    "discounts_list": discounts_list[] {
        "procent": procent,
        "image": image,
        "slug": slug.current,
        "about_discount": about_discount[$language],
    },
}`;
