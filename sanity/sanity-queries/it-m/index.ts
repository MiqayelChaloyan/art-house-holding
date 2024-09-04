interface AssetRef {
    _type: string;
    _ref: string;
};

interface Asset {
    _type: string;
    alt: string;
    asset: AssetRef;
};

interface PRICES {
    _key: string;
    course: string;
    group_lessons: number;
    personal_lessons: number;
    duration: string;
    hours_lessons: string;
};

interface PRICE_LIST_QUERYResult {
    price_list: PRICES[];
};

interface ADDITIONAL_DETALIS {
    detalis: string;
};

interface OUR_TEAM {
    _key: string;
    worker: string;
    profession: string;
    worker_image: Asset;
    additional_detalis: ADDITIONAL_DETALIS[];
};

interface OUR_TEAM_QUERYResult {
    our_team: OUR_TEAM[];
};

interface COURSES_QUERYResult {
    [x: string]: any;
    ogDescription: string;
    course_name: string;
    course_image: Asset;
    slug: string;
    about_course: {
        title: string;
        about_content: string;
    },
    course_process: any;
    our_day: any
};

interface LESSON {
    course_name: string;
    slug: string | number;
};

interface ORDER {
    order_name: string;
    slug: string | number;
};

interface SELECT_OPTIONS_QUERYResult {
    courses_names: LESSON[];
    orders_names: ORDER[];
};

interface MESSENGER {
    _key: string;
    messenger_name: string;
    messenger: string;
};

interface SOCIAL {
    _key: string;
    social_name: string;
    social_link: string;
};

interface CONTACT_US_QUERYResult {
    address: string;
    phone_numbers: string[];
    messengers: MESSENGER[];
    social_links: SOCIAL[];
    email: string;
};

interface ABOUT {
    title: string;
    content: any;
};

interface STRENGTHS {
    _key: string;
    title: string;
    content: any;
    showImage?: boolean;
    image?: Asset;
};

interface VIDEO {
    video_url: string;
    video_light: {
        asset: Asset;
        alt: string;
    } | null;
};

interface ABOUT_US_DETAILS_QUERYResult {
    about_us: ABOUT;
    strengths: STRENGTHS[];
    video: VIDEO;
};

interface HOME_DETALIS_QUERYResult {
    ogTitle: string;
    ogDescription: string;
    ogImage: Asset;
    our_advantages: string[];
    content: string;
};