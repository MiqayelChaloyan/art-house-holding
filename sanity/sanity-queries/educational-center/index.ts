import { Key } from 'react';

export interface EDUCATIONAL_CENTER_DEFAULT {
    _id: string
    slug: string
    main_section: any
    about_us: any
    cooking_courses: any
    news_section: any
    progress_section: any
    specialists_section: any
    our_rating_section: any
    video_section_title: any
};

export interface EDUCATIONAL_CENTER_COURSES {
    _id: string
    slug: { current: string }
    course_name: any
    course_main: any
    about_us_content: any
    course_process: any
    student_works: any
    svg: any
    price_list: any
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
}

export interface LESSONS {
    _id: string
    course_name: {
        course: string
        slug: string
    }
};