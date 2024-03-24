import { EarthGlobeIcon, LinkIcon } from '@sanity/icons'
import { defineField } from 'sanity';

const languagesSchemaLanguage = {
    name: 'about-language',
    type: 'document',
    title: 'Languages',
    icon: EarthGlobeIcon,
    id: 'languages-languages-center',
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
            title: 'Text',
            name: 'text',
            type: 'object',
            validation: (Rule: any) => Rule.required(),
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
            name: 'during_courses_images',
            type: 'array',
            title: 'During Courses Images',
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
            title: 'Course Process Video',
            name: 'course_process',
            type: 'object',
            fields: [
                {
                    name: 'video_url',
                    title: 'Video URL',
                    type: 'url',
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
        },
        {
            name: 'teachers',
            type: 'array',
            // components: { input: ArrayMaxItems },
            title: 'Teachers',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'Name, Surname',
                            name: 'fullName',
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
                            name: 'teacher_image',
                            title: 'Teacher Image',
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
            ]
        }
    ],
};

export default languagesSchemaLanguage;











