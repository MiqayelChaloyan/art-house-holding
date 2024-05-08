import { RocketIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';

const lessonsSchemaEducationCenter = {
    name: 'educational-lessons-select-option',
    type: 'document',
    title: 'Courses',
    id: 'educational-lessons-select-option',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            name: 'course_name',
            type: 'array',
            title: 'Course Name (Դասընթացի անվանումը)',
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
                            description: "Պիտի եզակի լինի",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ]
                }
            ]
        },
    ],
};

export default lessonsSchemaEducationCenter;;
