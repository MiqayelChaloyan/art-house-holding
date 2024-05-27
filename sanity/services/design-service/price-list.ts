export const query = `
*[_type == "price-list-design"] {
    "_id": _id,
    "informatie": informatie[$language],
    "our_advantages": our_advantages[][$language],
    "price_list": price_list[] {
        "_key": _key,
        "course": course[$language],
        "group_lessons": group_lessons,
        "personal_lessons": personal_lessons,
        "duration": duration[$language],
        "hours_lessons": hours_lessons[$language],
    }
}`;