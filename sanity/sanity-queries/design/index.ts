interface Asset {
    _type: string,
    alt: string,
    _ref: string
};

interface AssetRef {
    _type: string,
    _ref: string
};

export interface MAIN {
    _key: string,
    company_name: string,
    title: string,
    image: Asset,
};

export interface PROGRESS {
    _key: string,
    title: string,
    quantity: number
};

export interface GALLERY {
    alt: string,
    _type: string,
    _key: string,
    asset: AssetRef
};

export interface PORTFOLIO {
    _key: string,
    author: string,
    image: Asset
};

export interface COURSE {
    _id: string,
    slug: string,
    course_name: string,
    name: string,
    conditions: string[],
    guides: string[],
    gallery_of_course: GALLERY[],
    portfolio: PORTFOLIO[],
};

export interface HOME_COURSES {
    _key: string,
    name: string,
    title: string,
    course_name: string,
    about_course: string,
    gallery_of_course: GALLERY[],
    categories: AssetRef
};

export interface DESIGN {
    _id: string,
    main_section: MAIN[],
    courses: HOME_COURSES[],
    progress_section: PROGRESS[],
};

export interface Social_Links {
    _key: string,
    _type: string,
    social_link: string,
    social_name: string,
};

export interface HOSTS {
    name: string,
    phone_number: string,
    social_links: Social_Links[],
};

export interface LESSON {
    slug: number | string,
    course_name: string,
};

export interface LESSONS {
    _id: string,
    course_name: LESSON[]
};