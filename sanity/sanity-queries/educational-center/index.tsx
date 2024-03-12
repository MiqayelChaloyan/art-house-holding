export interface EDUCATIONAL_CENTER_DEFAULT {
    _id: string
    slug: string
    main_section: any
    about_us_content: any
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

export interface EDUCATIONAL_CENTER_CO_WORKERS {
    id: string
    _id: string
    name: string
    co_workers_image: string
    slug: { current: string }
};