export const query = `
*[_type == "art-house-about-us"] {
    "_id": _id,
    "main_section": main_section {
        "primary_title": primary_title[$language],
        "secondary_title": secondary_title[$language],
        "background_image": background_image,
    },
    "about_us_section": about_us_section {
        "about_us_content": about_us_content[$language],
        "image": image,
    },
}`;