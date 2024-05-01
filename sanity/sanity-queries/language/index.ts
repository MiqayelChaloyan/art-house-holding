import { Key } from "react";

export interface ABOUT_US_LANGUAGE {
    _id: string
    about_us: {
        content: {
            markDefs: any,
            children: [
                {
                    marks: any,
                    text: string,
                    _key: string,
                    _type: string
                }],
            _type: string,
            style: string,
            _key: string
        },
        about_us_images: [
            {
                map: any;
                _type: string,
                alt: string,
                _key: string,
                asset: { _ref: string, _type: string }
            },
        ],
        about_our_daily: any
    };
    our_daily_life: {
        about_our_daily: [
            {
                news: string
                languages: { _ref: string, _type: string },
                video_url: string
                video_light: {
                    alt: string
                    asset: {
                        _ref: string
                        _type: string
                    },
                    _type: string
                }
            },
        ]
        our_daily_life_images: [
            {
                _type: string,
                alt: string,
                _key: string,
                asset: [Object]
            },
        ]
    }
};

export interface LANGUAGE {
    _id: string
    slug: string
    course_name: {
        course: string
        slug: string
    }
    week_number_of_lessons: {
        quantity: string
        slug: string
    }
    course_type: {
        course_type: string
        slug: string
    }
};

export interface ABOUT_LANGUAGE {
    _id: string
    name: string
    text: any
    slug: string
    image: any
    course_process: any
    during_courses_images: any
    teachers: any
};

export interface PRICE_LIST_LANGUAGE {
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

export interface DISCOUNTS_LANGUAGE {
    slug: Key | null | undefined;
    discounts_list: {
        [x: string]: any;
        procent: number
        image: {
            _type: string
            alt: string
            asset: { _ref: string, _type: string }
        }
        slug: string
        about_discount: string
    }
}

export interface QUIZ {
    _id: string
    name: string
    slug: string
    question_logo: {
        _type: string
        alt: string
        asset: { _ref: string, _type: string }
    }
    questions: {
        question: string
        slug: string
        options: any
        answer: string
    }
}