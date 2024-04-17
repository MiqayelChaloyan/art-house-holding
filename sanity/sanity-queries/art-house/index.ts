export interface ART_HOUSE_HOME {
    _id: string
    name: string
    our_websites?: [
        {
            company_name: string,
            words: string,
            website_logo_front: {
                _type: string,
                alt: string,
                asset: {
                    _ref: string,
                    _type: string
                }
            },
            website_logo_back: {
                _type: string,
                alt: string,
                asset: {
                    _ref: string,
                    _type: string
                }
            },
            slug: { current: string }
            web_site_url: string
        }
    ]
    progress_section: [
        {
            title: string,
            slug: { current: string }
            quantity: number
        }
    ]
};


export interface BRANCHES {
    company_name: string,
    words: string,
    website_logo_front: {
        _type: string,
        alt: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    website_logo_back: {
        _type: string,
        alt: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    slug: { current: string }
    web_site_url: string
}
