export type ImagePath = { src: string, width: number, height: number } | any;

export type ContactUsResponse = { status: number } | { error: string } | any;

export interface Site {
    ogTitle: string,
    ogImage: {
        _type: string,
        asset: {
            _ref: string,
            _type: string
        }
    },
    ogDescription: string
};