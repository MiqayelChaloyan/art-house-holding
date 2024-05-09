import { Key } from 'react';

interface Asset {
    _type: string,
    alt: string,
    _ref: string
};

export interface BRANCH {
    _key: string,
    company_name: string,
    words: string,
    website_logo_front: {
        _type: string,
        alt: string,
        asset: Asset
    },
    website_logo_back: {
        _type: string,
        alt: string,
        asset: Asset
    },
    web_site_url: string
};

export interface PROGRESS {
    _key: string,
    title: string,
    quantity: number
};

export interface ART_HOUSE_HOME {
    our_websites: BRANCH[]
    progress_section: PROGRESS[]
};

export interface Social_Links {
    [x: string]: any,
    _key: Key | null | undefined,
    social_link: string;
    social_name: string,
};

export interface HOSTS {
    name: string,
    phone_numbers: { phone_numbers: string },
    social_links: Social_Links,
};

export interface Site {
    site_name: string,
    ogTitle: string,
    ogImage: {
        _type: string,
        asset: Asset
    },
    ogDescription: string
};