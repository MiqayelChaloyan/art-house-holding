import ArrayMaxItems from "@/utils/ArrayMaxItems";
import { defineArrayMember } from "sanity";

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
        },
        {
            title: 'Course Name (Դասընթացի անվանումը)',
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
            name: 'course_main',
            type: 'array',
            title: 'Course Main',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ, առնվազն երկու հատ',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
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
                    ]
                }
            ],
        },
        {
            title: 'About Courses Content',
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
            name: 'course_process',
            type: 'array',
            title: 'Course Process Section',
            description: 'Ոչ պակաս, քան մեկ, և ոչ ավելի, միայն դուք կարող եք դա փոփոխել',
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

            name: 'student_works',
            type: 'array',
            title: 'Student work Section',
            description: 'Դուք կարող եք ավելացնել ցանկացած թվով նկարներ',
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
                    title: 'Alt',
                    type: 'string'
                }
            ],
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'price_list',
            type: 'array',
            title: 'Price list',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'Course Title',
                            name: 'course_title',
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
                            title: 'Course Amount',
                            name: 'amount',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'Start date',
                            name: 'startDate',
                            type: 'date',
                            options: {
                                dateFormat: 'YYYY-MM-DD',
                                calendarTodayLabel: 'Today'
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            title: 'End date',
                            name: 'endDate',
                            type: 'date',
                            options: {
                                dateFormat: 'YYYY-MM-DD',
                                calendarTodayLabel: 'Today'
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'duration',
                            type: 'number',
                            title: 'Duration of the course',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
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
            ]
        },
    ],
};

export default coursesSchemaEducationalCenter;