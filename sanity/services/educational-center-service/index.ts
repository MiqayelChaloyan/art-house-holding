export const HOME_DETALIS_QUERY = 
`*[_type == "about-us"] {
    "main_section": main_section[] {
        _key,
        image,
        "title": title[$language],
        "content": content[$language],
    },
    "about_us": about_us {
        about_us_image,
        "about_us_content": about_us_content[$language],
    },
    "cooking_courses": cooking_courses {
        video_url,
        video_light,
        "video_section_title": video_section_title[$language],
    },
    "section": section {
        "section_title": section_title[$language],
        "lessons": lessons[] {
            _key,
            image_one,
            image_two,
            categories,
            "subtitle": subtitle[$language],
            "content": content[$language],
        },
    },
    "progress_section": progress_section[] {
        _key,
        quantity,
        isPlusSign,
        "title": title[$language],
    },
    "specialists_section": specialists_section[] {
        _key,
        categories,
        specialists_section_image,
        specialists_section_images,
        "title": title[$language],
        "course_name": course_name[$language],
    },
    "our_rating_section": our_rating_section[] {
        _key,
        user_image,
        our_rating_section_image,
        rating,
        "user_feedback": user_feedback[$language],
        "user_name": user_name[$language],
    },
}`;

export const COURSES_QUERY = 
`*[_type == "courses"] {
    _id,
    student_works,
    svg,
    "slug": slug.current,
    "about_us_content": about_us_content[$language],
    "course_name": course_name[$language],
    "course_main": course_main[] {
        _key,
        image,
        "title": title[$language],
        "content": content[$language],
    },
    "course_process": course_process {
        video_url,
        video_light,
    },
    "price_list": price_list[] {
        _key,
        "course_title": course_title[$language],
        amount,
        startDate,
        endDate,
        duration,
    },
}`;

export const COURSE_SLUG_QUERY = 
`*[_type == "courses" && slug.current == $slug] {
    _id,
    student_works,
    svg,
    "slug": slug.current,
    "about_us_content": about_us_content[$language],
    "course_name": course_name[$language],
    "course_main": course_main[] {
        _key,
        image,
        "title": title[$language],
        "content": content[$language],
    },
    "course_process": course_process {
        video_url,
        video_light,
    },
    "price_list": price_list[] {
        _key,
        "course_title": course_title[$language],
        amount,
        startDate,
        endDate,
        duration,
    },
}`;

export const COURSE_ID_QUERY = 
`*[_type == "courses" && _id == $_id][0] {
    _id,
    student_works,
    svg,
    "slug": slug.current,
    "about_us_content": about_us_content[$language],
    "course_name": course_name[$language],
    "course_main": course_main[] {
        _key,
        image,
        "title": title[$language],
        "content": content[$language],
    },
    "course_process": course_process {
        video_url,
        video_light,
    },
    "price_list": price_list[] {
        _key,
        "course_title": course_title[$language],
        amount,
        startDate,
        endDate,
        duration,
    },
}`;

export const SOCIAL_QUERY = `
*[_type == "educational-center-contact-us"] {
    name,
    phone_number,
    email,
    social_links,
    "address": address[$language],
}`;

export const LESSONS_QUERY =
    `*[_type == "educational-lessons-select-option"] {
    _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
}`;

export const SITE_META_QUERY = `
*[_type == "about-us"] {
    ogDescription,
    ogTitle,
    ogImage
}`;