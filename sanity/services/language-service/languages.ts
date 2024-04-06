import { groq } from 'next-sanity';

export const query = groq`*[_type == "about-language" && slug.current == $slug] {
    "_id":  _id,
    "name": name,
    "slug": slug,
    "text": text[$language],
    "during_courses_images": during_courses_images,
    "course_process": course_process,
    "teachers": teachers[] {
        "fullName": fullName[$language],
        "teacher_image": teacher_image,
        "slug": slug,
    },
}`;
