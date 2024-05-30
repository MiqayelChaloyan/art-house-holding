import { ClipboardIcon, TrendUpwardIcon, UserIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

export const aboutUsSchemaDesign = {
    name: 'about-us-design',
    type: 'document',
    title: 'Home',
    id: 'about-us-design',
    groups: [
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
            name: 'main_section',
            type: 'array',
            title: 'Main Section',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Company Name (Ընկերության Անվանումը)',
                            name: 'company_name',
                            type: 'string'
                        },
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'object',
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
                            title: 'Course Image',
                            name: 'image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                }
            ],
        },
        {
            name: 'courses',
            type: 'array',
            title: 'Courses',
            description: 'Դուք կարող եք ավելացնել հինգ դասընթաց',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(5),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Name',
                            name: 'name',
                            type: 'string',
                            description: 'Դասընթացի անվանումը` անգլերեն'
                        },
                        {
                            title: 'Course Name',
                            name: 'course_name',
                            type: 'object',
                            description: 'Դասընթացի անվանումը',
                            validation: (Rule: RuleType) => Rule.required(),
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
                            title: 'About Course',
                            name: 'about_course',
                            type: 'object',
                            description: 'Դասընթացի մասին',
                            validation: (Rule: RuleType) => Rule.required(),
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
                            name: 'gallery_of_course',
                            type: 'array',
                            title: 'Gallery of Course',
                            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
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
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses-design' }],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ],
        },
        {
            name: 'our_day',
            type: 'object',
            title: 'Our Day Video',
            validation: (Rule: RuleType) => Rule.required(),
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
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress Section',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(4),
            description: 'Ոչ պակաս, քան չորս և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                {
                    type: 'object',
                    name: 'tag',
                    icon: TrendUpwardIcon,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
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
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ]
        },
        {
            name: 'workers',
            type: 'array',
            title: 'Workers',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով աշխատողների',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Worker',
                            name: 'worker',
                            type: 'object',
                            description: 'Անուն, Ազգանուն',
                            validation: (Rule: RuleType) => Rule.required(),
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
                            title: "The employee's profession",
                            name: 'profession',
                            type: 'object',
                            description: 'Աշխատողի մասնագիտությունը',
                            validation: (Rule: RuleType) => Rule.required(),
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
                            title: 'Worker Image',
                            name: 'worker_image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alternative text',
                                    type: 'string'
                                }
                            ]
                        },
                    ]
                }
            ],
        },
    ],
};

export default aboutUsSchemaDesign;