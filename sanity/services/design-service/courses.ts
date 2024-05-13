export const allCoursesQuery = 
`*[_type == "courses-design"] {
    "_id": _id,
    "name": name,
    "course_name": course_name[$language],
    "slug": slug.current,
    "gallery_of_course": gallery_of_course,
    "conditions": conditions[][$language],
    "guides": guides[][$language],
}`;