interface Asset {
    _type: string,
    alt: string,
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

export interface DESIGN {
    _id: string,
    main_section: MAIN[],
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