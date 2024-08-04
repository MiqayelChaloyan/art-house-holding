export const querySocial = `
*[_type == "educational-center-contact-us"] {
    name,
    "address": address[$language],
    phone_number,
    email,
    social_links
}`;