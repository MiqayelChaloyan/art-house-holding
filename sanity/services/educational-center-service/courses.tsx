import { groq } from 'next-sanity';
import { client } from '../../client';

import { EDUCATIONAL_CENTER_COURSES } from '../../sanity-queries/educational-center';


export const getCourses = async (language: string): Promise<EDUCATIONAL_CENTER_COURSES[]> => {
    const query = groq`*[_type == "courses"] {
        "course_name": course_name[$language],
        "course_main": course_main[] {
            "title": title[$language],
            "content": content[$language],
            "image": image,
            "slug": slug.current
        },
        "about_us_content": about_us_content[$language],
        "course_process": course_process[] {
            "video_url": video_url,
            "video_light": video_light,
        },
        "student_works": student_works,
        "svg": svg,
        "price_list": price_list[] {
            "course_title": course_title[$language],
            "amount": amount,
            "startDate": startDate,
            "endDate": endDate,
            "duration": duration,
            "slug": slug.current
        },
        "_id": _id,
        "slug": slug.current,
    }`;
    
    try {
        const data = await client.fetch(query, { language: language || 'am'  });
        return data;
    } catch (err) {
        throw err;
    }
};

export const getCourseBySlug = async (slug: string, language: string): Promise<EDUCATIONAL_CENTER_COURSES> => {
    const query = groq`*[_type == "courses" && slug.current == $slug] {
        "course_name": course_name[$language],
        "course_main": course_main[] {
            "title": title[$language],
            "content": content[$language],
            "image": image,
            "slug": slug.current
        },
        "about_us_content": about_us_content[$language],
        "course_process": course_process[] {
            "video_url": video_url,
            "video_light": video_light,
        },
        "student_works": student_works,
        "svg": svg,
        "price_list": price_list[] {
            "course_title": course_title[$language],
            "amount": amount,
            "startDate": startDate,
            "endDate": endDate,
            "duration": duration,
            "slug": slug.current
        },
        "_id": _id,
        "slug": slug.current,
    }`;    

    try {
        const data = await client.fetch(query, { slug, language: language || 'am'  });
        return data;

    } catch (err) {
        throw err;
    }
};

export const getCourseById = async (_id: string, language: string): Promise<EDUCATIONAL_CENTER_COURSES> => {
    const query = groq`*[_type == "courses" && _id == $_id][0] {
        "course_name": course_name[$language],
        "course_main": course_main[] {
            "title": title[$language],
            "content": content[$language],
            "image": image,
            "slug": slug.current
        },
        "about_us_content": about_us_content[$language],
        "course_process": course_process[] {
            "video_url": video_url,
            "video_light": video_light,
        },
        "student_works": student_works,
        "svg": svg,
        "price_list": price_list[] {
            "course_title": course_title[$language],
            "amount": amount,
            "startDate": startDate,
            "endDate": endDate,
            "duration": duration,
            "slug": slug.current
        },
        "_id": _id,
        "slug": slug.current,
    }`;

    try {
        const data = await client.fetch(query, { _id, language: language || 'am'  });        
        return data;
    } catch (err) {
        throw err;
    }
};