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

export interface socialNetwork {
    facebook: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    instagram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    gmail: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    linkedin: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    x: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    tiktok: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    telegram: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    youtube: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    pinterest: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    whatsapp: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
    viber: ({ width, height, fill }: { width: string | number; height: string | number; fill: string | number }) => JSX.Element,
};