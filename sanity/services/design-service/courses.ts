export const allCoursesQuery = `
*[_type == "courses-design"] {
    "_id": _id,
    "name": name,
    "course_name": course_name[$language],
    "slug": slug.current,
    "gallery_of_course": gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
    "portfolio": portfolio[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
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
    "portfolio": portfolio[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
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
    "portfolio": portfolio[] {
        "_key": _key,
        "author": author[$language],
        "image": image,
    },
}`;