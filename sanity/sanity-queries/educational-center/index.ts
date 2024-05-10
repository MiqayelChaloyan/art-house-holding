import { Key } from 'react';

export interface Asset {
    _type: string,
    alt: string,
    _ref: string
};

interface Ref {
    _ref: string,
    _type: string
}

export interface MAIN {
    _key: string,
    content: string,
    image: Asset,
    title: string
}

export interface ABOUT {
    about_us_content: string,
    about_us_image: Asset,
}

export interface VIDEO {
    video_section_title: string,
    video_light: Asset,
    video_url: string,
};

export interface LESSON {
    _key: string,
    subtitle: string,
    content: string,
    image_one: Asset,
    image_two: Asset,
    categories: Ref,
}

export interface SECTON {
    section_title: string,
    lessons: LESSON[],
};

export interface PROGRESS {
    _key: string,
    title: string,
    quantity: string | number
};

export interface SPECIALIST {
    _key: string,
    title: string,
    course_name: string,
    specialists_section_image: Asset,
    categories: string,
    specialists_section_images: Asset[],
};

export interface OUR_RATING {
    _key: string,
    user_name: string,
    user_image: Asset,
    user_feedback: string,
    our_rating_section_image: Asset,
    rating: string,
};

export interface EDUCATIONAL_CENTER_DEFAULT {
    main_section: MAIN[],
    about_us: ABOUT,
    cooking_courses: VIDEO,
    section: SECTON,
    progress_section: PROGRESS[],
    specialists_section: SPECIALIST[],
    our_rating_section: OUR_RATING[]
};

export interface COURSE_MAIN {
    content: string,
    image: Asset,
    title: string,
    _key: string,
};

export interface STUDENT_WORK {
    _key: string,
    asset: Asset,
    alt: string,
    _type: string,
};

export interface PRICE_LIST {
    amount: number,
    course_title: string,
    duration: number,
    endDate: string,
    startDate: string,
    _key: string,
};

export interface COURSES {
    _id: string,
    slug: { current: string },
    course_main: COURSE_MAIN[],
    about_us_content: string,
    course_process: VIDEO,
    student_works: STUDENT_WORK[],
    price_list: PRICE_LIST[],
    svg: Asset,
};

export interface Social_Links {
    [x: string]: any;
    _key: Key | null | undefined,
    social_link: string;
    social_name: string,
}

export interface HOSTS {
    name: string,
    phone_number: string,
    email: string,
    social_links: Social_Links,
};

export interface LESSON {
    slug: string,
    course: string
};

export interface LESSONS {
    _id: string,
    course_name: LESSON[]
};