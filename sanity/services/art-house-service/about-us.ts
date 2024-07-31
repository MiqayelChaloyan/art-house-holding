export const query = `
*[_type == "art-house-about-us"] {
    "_id": _id,
    "our_websites": our_websites[] {
        "_key": _key,
        "website_title": website_title[$language],
        "about_website": about_website[$language],
        "website_image": website_image,
        "web_site_url": web_site_url
    },
    "about_us_section": about_us_section {
        "about_us_content": about_us_content[$language],
        "image": image,
    },
    "our_rating": our_rating[] {
        "_key": _key,
        "user_name": user_name[$language],
        "user_image": user_image,
        "user_feedback": user_feedback[$language],
    },
}`;