export const query = 
`*[_type == "promotions-languages"] {
    "_id": _id,
    "discounts_list": discounts_list[] {
        "_key": _key,
        "procent": procent,
        "image": image,
        "about_discount": about_discount[$language],
    },
}`;
