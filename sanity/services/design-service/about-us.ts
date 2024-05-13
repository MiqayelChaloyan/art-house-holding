export const query = `
*[_type == "about-us-design"] {
    "_id": _id,
    "main_section": main_section[] {
        "_key": _key,
        "company_name": company_name,
        "title": title[$language],
        "image": image,
    },
    "progress_section": progress_section[] {
        "_key": _key,
        "title": title[$language],
        "quantity": quantity
    },
}`;

export const querySiteMeta = `
*[_type == "about-us-design"] {
    ogDescription,
    ogTitle,
    ogImage
}`;

export const querySocial = `
*[_type == "design-contact-us"] {
    name,
    phone_number,
    social_links
}`;