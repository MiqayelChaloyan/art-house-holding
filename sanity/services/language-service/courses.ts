export const query = 
`*[_type == "languages-select-option"] {
    "_id": _id,
    "languages": languages[] {
        "course": course[$language],
        "slug": slug.current,
    },
    "quantity_lessons": quantity_lessons[] {
        "quantity": quantity[$language],
        "slug": slug.current,
    },
    "class_duration": class_duration[] {
        "duration": duration[$language],
        "slug": slug.current,
    },
}`;


