import { RuleType } from "../../../ruleType";
import ArrayMaxItems from "@/lib/utils/ArrayMaxItems";


const aboutUsSchemaLanguage = {
    name: 'about-us-language',
    type: 'document',
    title: 'About Us',
    id: 'about-us-language',
    groups: [
        // {
        //     name: "meta",
        //     title: "Site Info",
        //     default: true
        // },
        {
            name: "og",
            title: "Social Share Info",
            default: true
        },
        {
            name: "manifest",
            title: "Web App Settings",
            hidden: ({ document }: {
                document: {
                    [key: string]: never;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
         /* Site Metadata Schema */
        //  {
        //     type: 'string',
        //     name: 'site_name',
        //     title: 'Site Name',
        //     group: ['og', 'meta'],
        // },
        {
            type: 'string',
            title: 'Page Title',
            name: 'ogTitle',
            description:
                'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og']
        },
        {
            type: "text",
            name: "ogDescription",
            title: "Social Share Description",
            group: ['og']
        },
        {
            type: 'image',
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews. If you define this, you must define two other OG basic properties as well: title and type.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Չփոփոխել անվանումը'
        },
        {
            title: 'About us',
            name: 'about_us',
            type: 'object',
            fields: [
                {
                    title: 'Content',
                    name: 'content',
                    type: 'object',
                    fields: [
                        {
                            title: 'Armenian',
                            name: 'am',
                            type: 'array',
                            of: [{ type: 'block' }],
                        },
                        {
                            title: 'English',
                            name: 'en',
                            type: 'array',
                            of: [{ type: 'block' }],
                        },
                        {
                            title: 'Russian',
                            name: 'ru',
                            type: 'array',
                            of: [{ type: 'block' }],
                        },
                    ]
                },
                {
                    name: 'about_us_images',
                    type: 'array',
                    title: 'About Us Images',
                    description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [{
                        type: 'image', alt: 'alt',
                        fields: [
                            {
                                name: 'alt',
                                type: 'string',
                                title: 'Alternative text',
                            },
                        ],
                    }],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'about_our_daily',
                    type: 'array',
                    title: 'Videos about our daily life',
                    description: 'Ոչ պակաս, քան երկու, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(2),
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            fields: [
                                {
                                    name: 'video_url',
                                    title: 'Video Link',
                                    type: 'string',
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'video_light',
                                    title: 'Video Light',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: 'alt',
                                            title: 'Alternative text',
                                            type: 'string'
                                        }
                                    ],
                                    validation: (Rule: any) => Rule.required(),
                                },
                            ]
                        }
                    ]
                },
            ],
        },
        {
            title: 'Our Daily Life',
            name: 'our_daily_life',
            type: 'object',
            fields: [
                {
                    name: 'our_daily_life_images',
                    type: 'array',
                    title: 'Our Daily Life Images',
                    description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [{
                        type: 'image', alt: 'alt',
                        fields: [
                            {
                                name: 'alt',
                                type: 'string',
                                title: 'Alternative text',
                            },
                            {
                                name: 'slug',
                                type: 'slug',
                                options: {
                                    source: 'name',
                                },
                                validation: (Rule: any) => Rule.required(),
                            },
                        ],
                    }],
                    options: {
                        layout: 'grid',
                    },
                },
                {
                    name: 'about_our_daily',
                    type: 'array',
                    title: 'Videos about our daily life',
                    description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            fields: [
                                {
                                    title: 'News',
                                    name: 'news',
                                    type: 'object',
                                    validation: (Rule: any) => Rule.required(),
                                    fields: [
                                        {
                                            title: 'Armenian',
                                            name: 'am',
                                            type: 'string'
                                        },
                                        {
                                            title: 'English',
                                            name: 'en',
                                            type: 'string'
                                        },
                                        {
                                            title: 'Russian',
                                            name: 'ru',
                                            type: 'string'
                                        }
                                    ]
                                },
                                {
                                    name: 'languages',
                                    type: 'reference',
                                    title: 'Languages Category',
                                    to: [{ type: 'about-language' }],
                                    validation: (Rule: any) => Rule.required(),
                                },
                                // {
                                //     name: 'slug',
                                //     type: 'slug',
                                //     options: {
                                //         source: 'name',
                                //     },
                                //     validation: (Rule: any) => Rule.required(),
                                // },
                                {
                                    name: 'video_url',
                                    title: 'Video Link',
                                    type: 'string',
                                    validation: (Rule: any) => Rule.required(),
                                },
                                {
                                    name: 'video_light',
                                    title: 'Video Light',
                                    type: 'image',
                                    options: { hotspot: true },
                                    fields: [
                                        {
                                            name: 'alt',
                                            title: 'Alternative text',
                                            type: 'string'
                                        }
                                    ],
                                    validation: (Rule: any) => Rule.required(),
                                },
                            ]
                        }
                    ]
                },
            ],
        },
    ],
};

export default aboutUsSchemaLanguage;