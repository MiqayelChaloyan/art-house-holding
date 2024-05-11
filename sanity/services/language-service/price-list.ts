export const query = 
`*[_type == "price-list-language"] {
    "_id":  _id,
    "name": name,
    "price_list": price_list[] {
        "_key": _key,
        "teaching_language": teaching_language[$language],
        "group_lessons": group_lessons,
        "private_lessons": private_lessons,
    },
    "private_lessons": private_lessons[] {
        "_key": _key,
        "teaching_language": teaching_language[$language],
        "private_lessons": private_lessons,
    },
    "english_courses": english_courses[] {
        "_key": _key,
        "language_type": language_type[$language],
        "duration": duration[$language],
        "private_lessons": private_lessons,
    },
}`;
