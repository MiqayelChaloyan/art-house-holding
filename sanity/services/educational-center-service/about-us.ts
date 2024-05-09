export const query = 
`*[_type == "about-us"] {
    "main_section": main_section[] {
        "_key": _key,
        "title": title[$language],
        "content": content[$language],
        "image": image,
    },
    "about_us": about_us {
        "about_us_content": about_us_content[$language],
        "about_us_image": about_us_image,
    },
    "cooking_courses": cooking_courses {
        "video_section_title": video_section_title[$language],
        "video_url": video_url,
        "video_light": video_light,
    },
    "section": section {
        "section_title": section_title[$language],
        "lessons": lessons[] {
            "_key": _key,
            "subtitle": subtitle[$language],
            "content": content[$language],
            "image_one": image_one,
            "image_two": image_two,
            "categories": categories,
        },
    },
    "progress_section": progress_section[] {
        "_key": _key,
        "title": title[$language],
        "quantity": quantity
    },
    "specialists_section": specialists_section[] {
        "_key": _key,
        "title": title[$language],
        "course_name": course_name[$language],
        "specialists_section_image": specialists_section_image,
        "categories": categories,
        "specialists_section_images": specialists_section_images,
    },
    "our_rating_section": our_rating_section[] {
        "_key": _key,
        "user_name": user_name[$language],
        "user_image": user_image,
        "user_feedback": user_feedback[$language],
        "our_rating_section_image": our_rating_section_image,
        "rating": rating,
    },
}`;


export const querySiteMeta = `
*[_type == "about-us"] {
    site_name,
    ogDescription,
    ogTitle,
    ogImage
}`;