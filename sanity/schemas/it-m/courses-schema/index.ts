import { BookIcon } from '@sanity/icons';

import { RuleType } from '../../../ruleType';


export const coursesSchemaIt_M = {
    name: 'courses-it-m',
    type: 'document',
    title: 'Courses',
    id: 'courses-it-m',
    icon: BookIcon,
    groups: [
        {
            name: "og",
            title: "Social Share Info",
            default: true
        },
    ],
    fields: [
        {
            type: "object",
            name: "ogDescription",
            title: "Social Share Description",
            group: ['og'],
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
            title: 'Course Image',
            name: 'course_image',
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
            description: 'Slug must be the name of the course in lowercase and must be unique. Write only between words with `-` or `_` symbols. Do not use these symbols `/`.',
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'about_course',
            type: 'object',
            title: 'About the course',
            validation: (Rule: RuleType) => Rule.required(),
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
                    title: 'Content',
                    name: 'about_content',
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
            ]
        },
        {
            name: 'course_process',
            type: 'object',
            title: 'Course Process',
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
            name: 'our_day',
            type: 'array',
            title: 'Our day',
            description: 'You can add any number of pictures.',
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
    ],
    preview: {
        select: {
            course: 'course_name.en',
        },
        prepare(selection: { course: string }) {
            const { course } = selection;
            return {
                title: `Դասընթաց / ${course}`,
            };
        },
    }
};

export default coursesSchemaIt_M;