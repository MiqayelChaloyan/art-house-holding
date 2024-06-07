import { SparklesIcon, BulbOutlineIcon, CheckmarkIcon, ImagesIcon, ClipboardImageIcon } from '@sanity/icons';

import { RuleType } from '../../../ruleType';
import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';

export const coursesSchemaDesign = {
    name: 'courses-design',
    type: 'document',
    title: 'Courses',
    id: 'courses-design',
    icon: SparklesIcon,
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
            name: 'slug',
            type: 'slug',
            description: "slug-ը պիտի լինի դասընթացի անվանումը՝ փոքրատառերով և պիտի եզակի լինի",
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
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
            name: 'conditions',
            type: 'array',
            title: 'Conditions',
            description: 'Դուք կարող եք ավելացնել ցանկացած քանակի պայմաններ',
            // validation: (Rule: RuleType) => Rule.max(5),
            // components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BulbOutlineIcon,
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
                }
            ],
        },
        {
            name: 'guides',
            type: 'array',
            title: 'Guides',
            description: 'Դուք կարող եք ավելացնել ցանկացած քանակի ուղեցույցներ',
            validation: (Rule: RuleType) => Rule.required(),
            // validation: (Rule: RuleType) => Rule.max(5),
            // components: { input: ArrayMaxItems },
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
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
                }
            ],
        },
        {
            name: 'portfolios',
            type: 'array',
            title: 'Portfolios',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով աշխատանքներ, առնվազն չորս հատ',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ImagesIcon,
                    fields: [
                        {
                            title: 'Author (name, surname)',
                            description: 'Հեղինակի անուն, ազգանունը',
                            name: 'author',
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
                            title: 'Image',
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
                        {
                            name: 'slug',
                            type: 'slug',
                            description: 'slug-ը պիտի եզակի լինի',
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Background Image',
                            name: 'background_image',
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
                        {
                            name: 'title_images_array',
                            type: 'array',
                            title: 'Title and Images Array',
                            of: [
                                {
                                    type: 'object',
                                    icon: ClipboardImageIcon,
                                    fields: [
                                        {
                                            title: 'Title',
                                            // description: 'Հեղինակի անուն, ազգանունը',
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
                                            name: 'images',
                                            type: 'array',
                                            title: 'Images',
                                            of: [
                                                {
                                                    title: 'Image',
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
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ]
                }
            ],
        },
        // {
        //     name: 'orders',
        //     type: 'array',
        //     title: 'Orders',
        //     description: 'Դուք կարող եք ավելացնել ցանկացած թվով աշխատանքներ',
        //     validation: (Rule: RuleType) => Rule.required(),
        //     of: [
        //         {
        //             name: 'Object',
        //             type: 'object',
        //             icon: ImagesIcon,
        //             fields: [
        //                 {
        //                     title: 'Author (name, surname)',
        //                     description: 'Հեղինակի անուն, ազգանունը',
        //                     name: 'author',
        //                     type: 'object',
        //                     fields: [
        //                         {
        //                             title: 'Armenian',
        //                             name: 'am',
        //                             type: 'string'
        //                         },
        //                         {
        //                             title: 'English',
        //                             name: 'en',
        //                             type: 'string'
        //                         },
        //                         {
        //                             title: 'Russian',
        //                             name: 'ru',
        //                             type: 'string'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     title: 'Image',
        //                     name: 'image',
        //                     type: 'image',
        //                     options: { hotspot: true },
        //                     fields: [
        //                         {
        //                             name: 'alt',
        //                             title: 'Alternative text',
        //                             type: 'string'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     title: 'Background Image',
        //                     name: 'background_image',
        //                     type: 'image',
        //                     options: { hotspot: true },
        //                     fields: [
        //                         {
        //                             name: 'alt',
        //                             title: 'Alternative text',
        //                             type: 'string'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     name: 'titleImagesArray',
        //                     type: 'array',
        //                     title: 'Title and Images Array',
        //                     of: [
        //                         {
        //                             type: 'object',
        //                             icon: ClipboardImageIcon,
        //                             fields: [
        //                                 {
        //                                     title: 'Title',
        //                                     // description: 'Հեղինակի անուն, ազգանունը',
        //                                     name: 'title',
        //                                     type: 'object',
        //                                     fields: [
        //                                         {
        //                                             title: 'Armenian',
        //                                             name: 'am',
        //                                             type: 'string'
        //                                         },
        //                                         {
        //                                             title: 'English',
        //                                             name: 'en',
        //                                             type: 'string'
        //                                         },
        //                                         {
        //                                             title: 'Russian',
        //                                             name: 'ru',
        //                                             type: 'string'
        //                                         }
        //                                     ]
        //                                 },
        //                                 {
        //                                     name: 'images',
        //                                     type: 'array',
        //                                     title: 'Images',
        //                                     of: [
        //                                         {
        //                                             title: 'Image',
        //                                             name: 'image',
        //                                             type: 'image',
        //                                             options: { hotspot: true },
        //                                             fields: [
        //                                                 {
        //                                                     name: 'alt',
        //                                                     title: 'Alternative text',
        //                                                     type: 'string'
        //                                                 }
        //                                             ]
        //                                         },
        //                                     ],
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                 },
        //             ]
        //         }
        //     ],
        // },
    ],
};

export default coursesSchemaDesign;