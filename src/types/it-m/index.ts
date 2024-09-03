/* Form Contact types */
export interface FormContact {
    email: string;
    phone: string;
    training_center: number;
    message: string;
    course_name: string;
};

/* Form Order types */
export interface FormOrder {
    surname: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string;
    training_center: number;
    message: string;
    order_name: string;
};

export interface socialNetwork {
    facebook: (props: { size: string | number; fill: string | number } | any) => JSX.Element,
    x: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    instagram: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    gmail: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    linkedin: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    pinterest: (props: { size: string | number; fill: string | number } | any) => JSX.Element,
    telegram: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    tiktok: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    viber: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    whatsapp: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
    youtube: ({ size, fill }: { size: string | number; fill: string | number } | any) => JSX.Element,
};
