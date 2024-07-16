import { TEXT } from '../../../sanity/sanity-queries/educational-center';

export interface UrlType {
    src: string;
    width: number;
    height: number;
};

interface Asset {
    _ref: string;
    _type: string;
};

export interface Content {
    content: TEXT;
    isReadMore: boolean;
    minimumHeight: number;
};

export interface ContentCourse {
    content: string;
    isReadMore: boolean;
    minimumHeight: number;
}

/* Form types */
export interface Form {
    full_name: string;
    email: string;
    phone: string;
    training_center: number;
    course_name: string;
};

export interface SlideItem {
    url: string;
    subtitle: string;
    content: string;
};

export interface Options {
    top: number;
    left: number;
    bottom: number;
    name: string;
    urlForImageBackground: string;
    urlImageBackgroundAlt: string;
    urlForImage: string;
    urlImageAlt: string;
    result: string;
    rating: string;
};

export interface Crop {
    top: number
    left: number
    bottom: number
    _type: string
    right: number
};

export interface Hotspot {
    _type: string
    width: number
    x: number
    y: number
    height: number
};

export interface Categories {
    _ref: string
    _type: string
};

export interface SpecialistsSectionImage {
    _type: string
    alt: string
    asset: Asset
    crop: Crop
    hotspot: Hotspot
};

export interface SpecialistsSectionImages {
    _type: string
    alt: string
    asset: Asset
};

export interface Course {
    course_name: string
    specialists_section_image: SpecialistsSectionImage
    specialists_section_images: SpecialistsSectionImages[]
    categories: string
    _key: string
    title: string
};

export interface socialNetwork {
    google: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};




















