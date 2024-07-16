import { ClipboardIcon, TrendUpwardIcon, LaunchIcon, UserIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

export const aboutUsSchemaEducationalCenter = {
    name: 'about-us',
    type: 'document',
    title: 'About Us',
    id: 'about-us-educational-center',
    groups: [
        {
            name: 'og',
            title: 'Social Share Info',
            default: true
        },
        {
            name: 'manifest',
            title: 'Web App Settings',
            hidden: ({ document }: {
                document: {
                    [key: string]: string;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Do not change the name.'
        },
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
            type: 'text',
            name: 'ogDescription',
            title: 'Social Share Description',
            group: ['og']
        },
        {
            type: 'image',
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            name: 'main_section',
            type: 'array',
            title: 'Main Section',
            description: 'You can add any number of pictures, with a minimum of two.',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
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
                            title: 'Content',
                            name: 'content',
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
            name: 'about_us',
            type: 'object',
            title: 'About Us',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'About Us Content',
                    name: 'about_us_content',
                    type: 'object',
                    validation: (Rule: RuleType) => Rule.required(),
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
                    name: 'about_us_image',
                    title: 'About Us Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string'
                        }
                    ],
                    validation: (Rule: RuleType) => Rule.required(),
                },
            ]
        },
        {
            name: 'cooking_courses',
            type: 'object',
            title: 'Cooking Courses Section',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Video Section Title',
                    name: 'video_section_title',
                    type: 'object',
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
                    name: 'video_url',
                    title: 'Video Link',
                    type: 'string',
                    validation: (Rule: RuleType) => Rule.required(),
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
                    validation: (Rule: RuleType) => Rule.required(),
                },
            ]
        },
        {
            name: 'section',
            type: 'object',
            title: 'Section Lessons',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    title: 'Section Title',
                    name: 'section_title',
                    type: 'object',
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
                    name: 'lessons',
                    type: 'array',
                    title: 'Lessons',
                    components: { input: ArrayMaxItems },
                    validation: (Rule: RuleType) => Rule.max(3),
                    description: 'No less than three, and no more, only you can modify them.',
                    of: [
                        {
                            name: 'Object',
                            type: 'object',
                            icon: ClipboardIcon,
                            fields: [
                                {
                                    title: 'Lessons Title',
                                    name: 'subtitle',
                                    type: 'object',
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
                                    title: 'Content',
                                    name: 'content',
                                    type: 'object',
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
                                    name: 'image_one',
                                    title: 'Image 1',
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
                                    name: 'image_two',
                                    title: 'Image 2',
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
                                    validation: (Rule: RuleType) => Rule.required(),
                                },
                            ]
                        }
                    ]
                },
            ]
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress bars',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(4),
            description: 'No less than four and no more, only you can modify them.',
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
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ]
                }
            ]
        },
        {
            name: 'specialists_section',
            type: 'array',
            title: 'Specialists Sections',
            description: 'You can add any number of pictures, with a minimum of two.',
            validation: (Rule: RuleType) => Rule.min(2),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: LaunchIcon,
                    fields: [
                        {
                            title: 'Specialists Section Title',
                            name: 'title',
                            type: 'object',
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
                            title: 'Course Name',
                            name: 'course_name',
                            type: 'object',
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
                            name: 'specialists_section_image',
                            title: 'Specialists Section Image',
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
                            name: 'categories',
                            type: 'reference',
                            title: 'Course Category',
                            to: [{ type: 'courses' }],
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            name: 'specialists_section_images',
                            type: 'array',
                            title: 'Specialists Sections Images',
                            description: 'No less than eight, and no more, only you can modify them.',
                            components: { input: ArrayMaxItems },
                            validation: (Rule: RuleType) => Rule.max(8),
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
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(3),
            description: 'No less than three, and no more, only you can modify them.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'User Name',
                            name: 'user_name',
                            type: 'object',
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
                            name: 'user_image',
                            title: 'User Image',
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
                            title: 'User Feedback',
                            name: 'user_feedback',
                            type: 'object',
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
                            name: 'our_rating_section_image',
                            title: 'Our Rating Section Background Image',
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
                            title: 'Rating (1-5)*',
                            name: 'rating',
                            type: 'number',
                            validation: (Rule: RuleType) => Rule.required(),
                            initialValue: 5,
                        },
                    ]
                }
            ]
        }
    ],
};

export default aboutUsSchemaEducationalCenter;