import { groq } from 'next-sanity';
import { client } from '../../client';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../sanity-queries/educational-center';

export const getHomeData = async (language: string): Promise<EDUCATIONAL_CENTER_DEFAULT[]> => {
        const query = groq`*[_type == "about-us"] {
        "slug": slug.current,
        "main_section": main_section[] {
            "title": title[$language],
            "content": content[$language],
            "image": image,
            "slug": slug.current
        },
        "about_us_content": about_us_content[$language],
        "cooking_courses": cooking_courses[] {
            "video_section_title": video_section_title[$language],
            "video_url": video_url,
            "video_light": video_light,
        },
        "news_section": news_section[] {
            "subtitle": subtitle[$language],
            "content": content[$language],
            "news_image_one": news_image_one,
            "news_image_two": news_image_two,
            "slug": slug.current,
            "categories": categories,
        },
        "progress_section": progress_section[] {
            "title": title[$language],
            "slug": slug.current,
            "quantity": quantity
        },
        "specialists_section": specialists_section[] {
            "title": title[$language],
            "course_name": course_name[$language],
            "specialists_section_image": specialists_section_image,
            "categories": categories,
            "specialists_section_images": specialists_section_images,
            "slug": slug.current
        },
        "our_rating_section": our_rating_section[] {
            "user_name": user_name[$language],
            "user_image": user_image,
            "user_feedback": user_feedback[$language],
            "our_rating_section_image": our_rating_section_image,
            "rating": rating,
            "slug": slug.current
        },
        "_id": _id,
    }`;

    try {
        const data = await client.fetch(query, { language: language || 'am'  });
        return data;
    } catch (err) {
        throw err;
    }
};