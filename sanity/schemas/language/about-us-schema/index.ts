import { RuleType } from "../../../ruleType";
import ArrayMaxItems from "@/lib/utils/ArrayMaxItems";


const aboutUsSchemaLanguage = {
    name: 'about-us-language',
    type: 'document',
    title: 'About Us',
    id: 'about-us-language',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
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
                    description: 'Ոչ պակաս, քան երկու, և ոչ ավելի, միայն դուք կարող եք դա փոփոխել',
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





        // {
        //     name: 'our_daily_life',
        //     type: 'array',
        //     components: { input: ArrayMaxItems },
        //     validation: (Rule: RuleType) => Rule.max(2),
        //     title: 'Our Daily Life',
            
        // },

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
                    description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դա փոփոխել',
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
                                {
                                    name: 'slug',
                                    type: 'slug',
                                    options: {
                                        source: 'name',
                                    },
                                    validation: (Rule: any) => Rule.required(),
                                },
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