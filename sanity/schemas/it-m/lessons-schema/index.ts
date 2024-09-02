import { RocketIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';

const lessonsSchemaIT_M = {
    name: 'it-m-select-option',
    type: 'document',
    title: 'Lessons & Orders',
    id: 'it-m-select-option',
    fields: [
        {
            name: 'courses_names',
            type: 'array',
            title: 'Lessons Names (Դասընթացների անվանումները)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: RocketIcon,
                    fields: [
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
                            description: "Must be unique.",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ]
                }
            ],
        },
        {
            name: 'orders_names',
            type: 'array',
            title: 'Orders Names (Պատվերների անվանումները)',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: RocketIcon,
                    fields: [
                        {
                            title: 'Order Name (Պատվերի անվանումը)',
                            name: 'order_name',
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
                            description: "Must be unique.",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ]
                }
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Դասընթացներ և Պատվերներ',
            };
        },
    }
};

export default lessonsSchemaIT_M;
