import { ClipboardIcon, BookIcon } from '@sanity/icons';

import { RuleType } from '../../../ruleType';

export const coursesSchemaEducationalCenter = {
    name: 'courses',
    type: 'document',
    title: 'Courses',
    id: 'courses-educational-center',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Դասընթացի անվանումը'
        },
        {
            title: 'Course Name (Դասընթացի անվանումը)',
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
            name: 'slug',
            type: 'slug',
            description: "slug-ը պիտի լինի դասընթացի անվանումը՝ փոքրատառերով և պիտի եզակի լինի",
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'course_main',
            type: 'array',
            title: 'Course Main',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
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
            title: 'About Courses Content',
            name: 'about_us_content',
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
            name: 'course_process',
            type: 'object',
            title: 'Course Process Section',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    name: 'video_url',
                    title: 'Video Link',
                    type: 'string',
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
                },
            ]
        },
        {

            name: 'student_works',
            type: 'array',
            title: 'Student work Section',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ',
            validation: (Rule: RuleType) => Rule.required(),
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
        {
            name: 'svg',
            title: 'Svg',
            type: 'image',
            options: { hotspot: true },
            fields: [

                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string'
                }
            ],
        },
        {
            name: 'price_list',
            type: 'array',
            title: 'Price list',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Course Title',
                            name: 'course_title',
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
                            title: 'Course Amount',
                            name: 'amount',
                            type: 'number',
                            initialValue: 0,
                        },
                        {
                            title: 'Start date',
                            name: 'startDate',
                            type: 'date',
                            options: {
                                dateFormat: 'YYYY-MM-DD',
                                calendarTodayLabel: 'Today'
                            },
                        },
                        {
                            title: 'End date',
                            name: 'endDate',
                            type: 'date',
                            options: {
                                dateFormat: 'YYYY-MM-DD',
                                calendarTodayLabel: 'Today'
                            },
                        },
                        {
                            name: 'duration',
                            type: 'number',
                            title: 'Duration of the course',
                            initialValue: 0,
                        },
                    ]
                }
            ]
        },
    ],
};

export default coursesSchemaEducationalCenter;