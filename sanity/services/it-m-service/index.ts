export const PRICE_LIST_QUERY = `
*[_type == "price-list-it-m"] {
    "price_list": price_list[] {
        "_key": _key,
        "course": course[$language],
        "duration": duration[$language],
        "hours_lessons": hours_lessons[$language],
        group_lessons,
        personal_lessons,
    }
}`;

export const OUR_TEAM_QUERY = `
*[_type == "our-team-it-m"] {
    "our_team": our_team[] {
        "_key": _key,
        "worker": worker[$language],
        "profession": profession[$language],
        "additional_detalis": additional_detalis[] {
            "detalis": detalis[$language]
        },
        worker_image,
    },
}`;

export const COURSES_QUERY = `
*[_type == "courses-it-m"] {
    "ogDescription": ogDescription[$language],
    "course_name": course_name[$language],
    "course_image": course_image,
    "slug": slug.current,
    "about_course": about_course {
        "title": title[$language],
        "about_content": about_content[$language]
    },
    course_process,
    our_day,
}`;

export const COURSE_SLUG_QUERY = `
*[_type == "courses-it-m" && slug.current == $slug] {
    "ogDescription": ogDescription[$language],
    "course_name": course_name[$language],
    "course_image": course_image,
    "slug": slug.current,
    "about_course": about_course {
        "title": title[$language],
        "about_content": about_content[$language]
    },
    course_process,
    our_day,
}`;

export const LESSONS_ORDERS_QUERY = `
*[_type == "it-m-select-option"] {
    "courses_names": courses_names[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
    "orders_names": orders_names[] {
        "order_name": order_name[$language],
        "slug": slug.current,
    },
}`;

export const CONTACT_US_QUERY = `
*[_type == "it-m-contact-us"] {
    "address": address[$language],
    "phone_numbers": phone_numbers[],
    "messengers": messengers[] {
        "_key": _key,
        "messenger_name": messenger_name,
        "messenger": messenger,
    },
    "social_links": social_links[] {
        "_key": _key,
        "social_name": social_name,
        "social_link": social_link,
    },
    email,
}`;

// export const ABOUT_US_DETALIS_QUERY = `
// *[_type == "it-m-about-us"] {
//     "about_us": about_us {
//         "title": title[$language],
//         "content" content[$language],
//     },
//     "strengths": strengths[] {
//         "_key": _key,
//         "title": title[$language],
//         "content" content[$language],
//         showImage,
//         images,
//     },
//     video,
// }`;

export const ABOUT_US_DETAILS_QUERY = `
*[_type == "it-m-about-us"] {
    "about_us": about_us {
        "title": title[$language],
        "content": content[$language],
    },
    "strengths": strengths[] {
        "_key": _key,
        "title": title[$language],
        "content": content[$language],
        showImage,
        images,
    },
    video,
}`;
