export interface ImageType {
    _type: string;
    alt: string;
    _key: string;
    asset: { _ref: string, _type: string }
}

export interface UrlType {
    src: string;
    width: number;
    height: number;
}

export interface PARTNER {
    cooperation: string;
    implemented_projects: string;
    _id: string;
    slug: string;
    logo: Image;
    company_name: string;
}

export interface DAILY_LIFE_VIDEO {
    video_light: Image;
    news: string;
    languages: Asset;
    slug: string;
    video_url: string;
}

export interface Video {
    video_url: string;
    _type: string;
    _key: string;
    video_light: Image;
}

export interface DAILY_LIFE_IMAGE {
    _key: string;
    asset: Asset;
    slug: Slug;
    _type: string;
    alt: string;
}

export interface LANGUAGE {
    path: Path;
    page: string;
}

export interface ABOUT {
    image: Image;
    text: Text[];
}

export interface Teachers {
    fullName: string;
    teacher_image: Path;
    slug: Slug;
}

export interface ImageType {
    asset: Asset;
    _type: string;
    _key: string;
    alt: string;
}

export interface Quiz {
    _id: string;
    name: string;
    question_logo: Path;
    slug: string;
    questions: Question[];
}

interface Question {
    question: string;
    slug: string;
    options: string[];
    answer: string;
}

interface Text {
    markDefs: any[];
    children: Child[];
    _type: string;
    style: string;
    _key: string;
}

interface Child {
    _type: string;
    marks: any[];
    text: string;
    _key: string;
}

interface Asset {
    _ref: string;
    _type: string;
}

interface Path {
    _type: string;
    alt: string;
    asset: Asset;
}

interface Image {
    asset: Asset;
    _type: string;
    alt: string;
}

interface Asset {
    _ref: string;
    _type: string;
}

interface Slug {
    current: string;
    _type: string;
}

/* REDUX STATE TYPES */
export interface ReduxType {
    questions: Questions;
    modal: Modal;
    player: Player;
    loader: Loader;
}

interface Loader {
    isLoader: boolean;
}

interface Player {
    isPlay: boolean;
    path: string;
}

interface Modal {
    isOpen: boolean;
}

interface Questions {
    quiz: any[];
    trace: number;
    score: number;
    answer: any[];
    isLoading: boolean;
    isViewAnswer: boolean;
}

/* Form types */
export interface FormLarge {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    training_center: number;
    course_name: string;
    week_number_of_lessons: string;
    course_type: string;
}

export interface FormSmall {
    full_name: string;
    email: string;
    phone: string;
    course_name: string;
}

export interface socialNetwork {
    gmail: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};
