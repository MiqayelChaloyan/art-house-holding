export const query = 
`*[_type == "art-house-home"] {
    "_id": _id,
    "our_websites": our_websites[] {
        "company_name": company_name,
        "words": words[$language],
        "website_logo_front": website_logo_front,
        "website_logo_back": website_logo_back,
        "slug": slug.current,
        "web_site_url": web_site_url
    },
    "progress_section": progress_section[] {
        "title": title[$language],
        "slug": slug.current,
        "quantity": quantity
    },
}`;


export const querySiteMeta = `
*[_type == "art-house-home"] {
    site_name,
    ogDescription,
    ogTitle,
    ogImage
}`;