import ArrayMaxItems from "@/utils/ArrayMaxItems";
import { defineArrayMember } from "sanity";

export const aboutUsSchemaEducationalCenter = {
    name: 'about-us',
    type: 'document',
    title: 'About Us',
    id: 'about-us-educational-center',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            name: 'slug',
            type: 'slug',
            description: "Պիտի եզակի լինի",
            options: {
                source: 'name',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'main_section',
            type: 'array',
            title: 'Main Section',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
            of: [
                {
                    name: 'Object',
                    type: 'object',
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
                            title: 'Content',
                            name: 'content',
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
                            title: 'Course Image',
                            name: 'image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ],
        },
        {
            title: 'About Us Content',
            name: 'about_us_content',
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
            name: 'cooking_courses',
            type: 'array',
            title: 'Cooking Courses Section',
            // components: { input: ArrayMaxItems },
            validation: (Rule: any) => Rule.max(1),
            description: 'Ոչ պակաս, քան մեկ, և ոչ ավելի, միայն դուք կարող եք դա փոփոխել',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'Video Section Title',
                            name: 'video_section_title',
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
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ]
        },
        {
            name: 'news_section',
            type: 'array',
            title: 'News Section',
            // components: { input: ArrayMaxItems },
            validation: (Rule: any) => Rule.max(3),
            description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'News Section Title',
                            name: 'subtitle',
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
                            title: 'News Section Content',
                            name: 'content',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'news_image_one',
                            title: 'News Section Image 1',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [

                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'news_image_two',
                            title: 'News Section Image 2',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [

                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses' }],
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ]
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress Section',
            // components: { input: ArrayMaxItems },
            validation: (Rule: any) => Rule.max(4),
            description: 'Ոչ պակաս, քան չորս և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                defineArrayMember({
                    type: 'object',
                    name: 'tag',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                })
            ]
        },
        {
            name: 'specialists_section',
            type: 'array',
            title: 'Specialists Sections',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'Specialists Section Title',
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
                            title: 'Course Name',
                            name: 'course_name',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'specialists_section_image',
                            title: 'Specialists Section Image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [

                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses' }],
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'specialists_section_images',
                            type: 'array',
                            title: 'Specialists Sections Images',
                            description: 'Ոչ պակաս, քան ութ, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
                            of: [
                                {
                                    name: 'image',
                                    type: 'image',
                                    title: 'Image',
                                    options: {
                                        hotspot: true,
                                    },
                                    fields: [
                                        {
                                            name: 'alt',
                                            type: 'string',
                                            title: 'Alternative text',
                                        },
                                    ],
                                },
                            ],
                            options: {
                                layout: 'grid',
                            },
                        },
                    ]
                }
            ],
        },
        {
            name: 'our_rating_section',
            type: 'array',
            title: 'Our Rating Section',
            // components: { input: ArrayMaxItems },
            validation: (Rule: any) => Rule.max(3),
            description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'User Name',
                            name: 'user_name',
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
                            name: 'user_image',
                            title: 'User Image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [

                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'User Feedback',
                            name: 'user_feedback',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'our_rating_section_image',
                            title: 'Our Rating Section Background Image',
                            type: 'image',
                            options: { hotspot: true },
                            fields: [
                                {
                                    name: 'alt',
                                    title: 'Alt',
                                    type: 'string'
                                }
                            ]
                        },
                        {
                            title: 'Rating (1-5)*',
                            name: 'rating',
                            type: 'number',
                            validation: (Rule: any) => Rule.required(),
                            initialValue: 5,
                        },
                    ]
                }
            ]
        }
    ],
};

export default aboutUsSchemaEducationalCenter;