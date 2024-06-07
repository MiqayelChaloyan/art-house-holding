export const allCoursesQuery = `
*[_type == "courses-design"] {
    "_id": _id,
    "name": name,
    "course_name": course_name[$language],
    "slug": slug.current,
    "gallery_of_course": gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
        "background_image": background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            "title": title[$language],
            "images": images[],
        }
    },
}`;


export const courseBySlugQuery = `
*[_type == "courses-design" && slug.current == $slug] {
    "_id": _id,
    "name": name,
    "course_name": course_name[$language],
    "slug": slug.current,
    "gallery_of_course": gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
        "background_image": background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            "title": title[$language],
            "images": images[],
        }
    },
}`;

export const queryId = `
*[_type == "courses-design" && _id == $_id][0] {
    "_id": _id,
    "name": name,
    "course_name": course_name[$language],
    "slug": slug.current,
    "gallery_of_course": gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
    "portfolios": portfolios[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
        "background_image": background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            "title": title[$language],
            "images": images[],
        }
    },
}`;

export const queryBySlugCard = `
*[_type == "courses-design"] {
    "portfolios": portfolios[slug.current == $slug] {
        "_key": _key,
        "author": author[$language],
        "image": image,
        "background_image": background_image,
        "slug": slug.current,
        "title_images_array": title_images_array[] {
            "title": title[$language],
            "images": images[],
        }
    },
}`;