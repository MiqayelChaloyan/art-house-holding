export const query = 
`*[_type == "about-language"] {
    "_id":  _id,
    "name": name,
    "slug": slug,
    "image": image[$language],
    "text": text[$language],
    "during_courses_images": during_courses_images,
    "course_process": course_process,
    "teachers": teachers[] {
        "_key": _key,
        "fullName": fullName[$language],
        "teacher_image": teacher_image,
    },
}`;

export const querySlug = 
`*[_type == "about-language" && slug.current == $slug] {
    "_id":  _id,
    "name": name,
    "slug": slug,
    "image": image[$language],
    "text": text[$language],
    "during_courses_images": during_courses_images,
    "course_process": course_process,
    "teachers": teachers[] {
        "_key": _key,
        "fullName": fullName[$language],
        "teacher_image": teacher_image,
    },
}`;

export const queryId = 
`*[_type == "about-language" && _id == $_id][0] {
    "_id":  _id,
    "name": name,
    "slug": slug,
    "image": image[$language],
    "text": text[$language],
    "during_courses_images": during_courses_images,
    "course_process": course_process,
    "teachers": teachers[] {
        "_key": _key,
        "fullName": fullName[$language],
        "teacher_image": teacher_image,
    },
}`;