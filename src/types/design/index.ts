import { TypedObject } from 'sanity';

export interface UrlType {
    src: string,
    width: number,
    height: number,
};

export interface SlideItem {
    url: string;
    company_name: string;
    title: string;
};

export interface PROMOTIONS {
    informatie: TypedObject | TypedObject[] | any,
    our_advantages: string[],
};

/* Form types */
export interface FormContactUs {
    full_name: string;
    email: string;
    phone: string;
    training_center: number;
    course_name: string;
};

export interface FormOrder {
    full_name: string;
    email: string;
    phone: string;
    order: string;
    message: string;
    training_center: number;
};

export interface AssetRef {
    _ref: string,
    _type: string,
}

export interface Gallery {
    _type: string,
    alt: string,
    _key: string,
    asset: AssetRef
}

export interface socialNetwork {
    facebook: (props: { size: string | number; fill: string | number } | any) => JSX.Element,
    x: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    instagram: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    gmail: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    linkedin: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
};
