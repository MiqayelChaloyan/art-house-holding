export const PRICE_LIST_QUERY = `
*[_type == "price-list-it-m"] {
    "_id": _id,
    "price_list": price_list[] {
        "_key": _key,
        "course": course[$language],
        "group_lessons": group_lessons,
        "personal_lessons": personal_lessons,
        "duration": duration[$language],
        "hours_lessons": hours_lessons[$language],
    }
}`;