export const querySocial = `
*[_type == "language-contact-us"] {
    name,
    "address": address[$language],
    phone_number,
    social_links
}`;