import { groq } from 'next-sanity';

export const allCoursesQuery = groq`*[_type == "courses"] {
    "course_name": course_name[$language],
    "course_main": course_main[] {
        "title": title[$language],
        "content": content[$language],
        "image": image,
        "slug": slug.current
    },
    "about_us_content": about_us_content[$language],
    "course_process": course_process {
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

export const courseBySlugQuery = groq`*[_type == "courses" && slug.current == $slug] {
        "course_name": course_name[$language],
        "course_main": course_main[] {
            "title": title[$language],
            "content": content[$language],
            "image": image,
            "slug": slug.current
        },
        "about_us_content": about_us_content[$language],
        "course_process": course_process {
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

export const queryId = groq`*[_type == "courses" && _id == $_id][0] {
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