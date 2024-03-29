export interface LANGUAGE {
    _id: string
    slug: any
    course_name: string
};

export interface ABOUT_LANGUAGE {
    _id: string
    name: string
    text: any
    slug: any
    course_process: any
    during_courses_images: any
    teachers: any
};

export interface PRICE_LIST_LANHUAGE {
    _id: string
    name: string
    price_list: {
        slug: string
        teaching_language: string
        group_lessons: string,
        private_lessons: {
            three_week: string
            two_week: string
        },
    },
    private_lessons: {
        slug: string
        teaching_language: string
        private_lessons: string
    },
    english_courses: {
        slug: string
        language_type: string
        duration: string
        private_lessons: string
    }
}