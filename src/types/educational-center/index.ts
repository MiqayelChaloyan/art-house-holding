export interface UrlType {
    src: string;
    width: number;
    height: number;
}


export interface  Course {
    news_image_one: Newsimageone;
    news_image_two: Newsimageone;
    slug: string;
    categories: Asset;
    subtitle: string;
    content: string;
}

interface Newsimageone {
    _type: string;
    alt: string;
    asset: Asset;
}

interface Asset {
    _ref: string;
    _type: string;
}

export interface Content {
    content: string;
    isReadMore: boolean;
    minimumHeight: number;
}

/* Form types */
export interface Form {
    full_name: string;
    email: string;
    phone: string;
    message: string;
}