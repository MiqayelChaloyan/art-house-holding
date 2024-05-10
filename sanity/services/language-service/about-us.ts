export const query = `
*[_type == "about-us-language"] {
    "_id": _id,
    "about_us": about_us {
        "content": content[$language],
        "about_us_images": about_us_images,
        "about_our_daily": about_our_daily
    },
    "our_daily_life": our_daily_life {
        "our_daily_life_images": our_daily_life_images,
        "about_our_daily": about_our_daily[] {
            "_key": _key,
            "news": news[$language],
            "languages": languages,
            "video_url": video_url,
            "video_light": video_light
        },
    },
}`;

export const querySiteMeta = `
*[_type == "about-us-language"] {
    site_name,
    ogDescription,
    ogTitle,
    ogImage
}`;