import ArrayMaxItems from '@/utils/ArrayMaxItems';
import { EarthGlobeIcon, UserIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';

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
            description: 'Do not change the name.'
        },
        {
            name: 'slug',
            type: 'slug',
            description: 'Slug must be the name of the course in lowercase and must be unique. Write only between words with `-` or `_` symbols. Do not use these symbols `/`.',
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },

        {
            title: 'Image',
            name: 'image',
            type: 'object',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    name: 'am',
                    type: 'image',
                    title: 'Armenian',
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
                {
                    name: 'en',
                    type: 'image',
                    title: 'English',
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
                {
                    name: 'ru',
                    type: 'image',
                    title: 'Russian',
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
            ]
        },
        {
            title: 'Text',
            name: 'text',
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
            name: 'during_courses_images',
            type: 'array',
            title: 'During Courses Images',
            description: 'No less than six, and no more, only you can modify them',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(6),
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
            title: 'Teachers',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'Name, Surname',
                            name: 'fullName',
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











