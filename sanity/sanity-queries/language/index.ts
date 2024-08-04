interface Asset {
    _ref: string;
    _type: string;
};

export interface ImageType {
    alt: string;
    asset: Asset;
    _type: string;
};

interface Slug {
    current: string;
    _type: string;
};

interface PortableChildren {
    marks: any;
    text: string;
    _key: string;
    _type: string;
};

export interface TEACHER {
    _key: string;
    fullName: string;
    teacher_image: ImageType;
};

export interface VIDEO {
    video_light: ImageType;
    video_url: string;
};

export interface TEXT {
    children: PortableChildren[];
    markDefs: any;
    style: string;
    _key: string;
    _type: string;
};

export interface COURSE_IMAGES {
    _key: string;
    alt: string;
    asset: Asset;
    _type: string;
};

export interface LANGUAGE {
    _id: string;
    course_process: VIDEO;
    during_courses_images: COURSE_IMAGES[];
    image: ImageType;
    name: string;
    slug: Slug;
    teachers: TEACHER[];
    text: TEXT[];
};


export interface ABOUT_US_LANGUAGE {
    _id: string;
    about_us: {
        content: {
            markDefs: any,
            children: PortableChildren[],
            _type: string;
            style: string;
            _key: string;
        },
        about_us_images: [{
            map: any;
            _type: string;
            alt: string;
            _key: string;
            asset: Asset;
        }],
        about_our_daily: {
            video_light: ImageType;
            _type: string;
            video_url: string;
            _key: string;
        } | any
    };
    our_daily_life: {
        about_our_daily: [{
            news: string;
            languages: Asset;
            video_url: string;
            video_light: ImageType;
        }]
        our_daily_life_images: ImageType[];
    }
};

export interface ABOUT_LANGUAGE {
    _id: string;
    image: ImageType;
    slug: Slug;
};

export interface QUIZ {
    _id: string;
    name: string;
    slug: string;
    question_logo: ImageType;
    questions: {
        question: string;
        slug: string;
        options: string[];
        answer: string;
    }
};

export interface DISCOUNT {
    discounts_list: any;
    _key: string;
    procent: number;
    image: ImageType;
    about_discount: string;
};

export interface DISCOUNTS_LANGUAGE {
    _id: string;
    discounts_list: DISCOUNT[];
};

export interface PRICE_LIST {
    _key: string;
    teaching_language: string;
    group_lessons: string | number;
    private_lessons: {
        three_week: string | number;
        two_week: string | number;
    },
};

export interface ENGLISH_COURSE {
    _key: string;
    language_type: string;
    duration: string;
    private_lessons: string | number;
};

export interface PRIVATE_LESSONS {
    _key: string;
    teaching_language: string
    private_lessons: {
        three_week: string | number;
        two_week: string | number;
    };
};

export interface PRICE_LIST_LANGUAGE {
    _id: string;
    name: string;
    price_list: PRICE_LIST[];
    private_lessons: PRIVATE_LESSONS[];
    english_courses: ENGLISH_COURSE[];
};

export interface COURSE_NAME {
    course_name: string;
    slug: string | number;
};

export interface COURSE_TYPE {
    course_type: string;
    slug: string | number;
};

export interface WEEK_NUMBER_LESSONS {
    week_number_of_lessons: string;
    slug: string | number;
};

export interface COURSES {
    course_name: COURSE_NAME[];
};

export interface FORM {
    _id: string;
    course_name: COURSE_NAME[];
    course_type: COURSE_TYPE[];
    week_number_of_lessons: WEEK_NUMBER_LESSONS[];
};

export interface Social_Links {
    _key: string,
    _type: string,
    social_link: string,
    social_name: string,
};

export interface HOSTS {
    name: string,
    address: string,
    phone_number: string,
    social_links: Social_Links[],
};

export interface RootProps {
    courses: any,
    branches: any,
    social: any,
    lessons: any,
    lessonsArmenian: any,
    isError: any
}