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
    content: string;
    isReadMore: boolean;
    minimumHeight: number;
};

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
    scrollToElement: (value: number) => void;
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

export interface socialNetwork {
    google: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};