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

export interface socialNetwork {
    facebook: (props: { size: string | number; fill: string | number } | any) => JSX.Element,
    x: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    instagram: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    gmail: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    linkedin: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
};
