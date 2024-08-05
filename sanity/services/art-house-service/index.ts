export const query = `
*[_type == "art-house-home"] {
    "our_websites": our_websites[] {
        "_key": _key,
        "company_name": company_name,
        "words": words[$language],
        "website_logo_front": website_logo_front,
        "website_logo_back": website_logo_back,
        "web_site_url": web_site_url
    },
    "progress_section": progress_section[] {
        "_key": _key,
        "title": title[$language],
        "quantity": quantity,
        "isPlusSign": isPlusSign
    },
}`;

export const querySiteMeta = `
*[_type == "art-house-home"] {
    ogDescription,
    ogTitle,
    ogImage
}`;

export const querySocial = `
*[_type == "art-house-contact-us"] {
    name,
    "address": address[$language],
    phone_numbers,
    social_links
}`;