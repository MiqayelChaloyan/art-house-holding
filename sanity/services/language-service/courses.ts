export const query = 
`*[_type == "languages-select-option"] {
    "_id": _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
    "week_number_of_lessons": week_number_of_lessons[] {
        "week_number_of_lessons": week_number_of_lessons[$language],
        "slug": slug.current,
    },
    "course_type": course_type[] {
        "course_type": course_type[$language],
        "slug": slug.current,
    },
}`;


