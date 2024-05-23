export const query =
    `*[_type == "design-lessons-select-option"] {
    "_id": _id,
    "course_name": course_name[] {
        "course_name": course_name[$language],
        "slug": slug.current,
    },
}`;
