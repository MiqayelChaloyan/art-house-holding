import { EarthGlobeIcon } from '@sanity/icons';
import {CalendarIcon} from '@sanity/icons'
import {ClockIcon} from '@sanity/icons'

import { RuleType } from '../../../ruleType';

const coursesSchemaLanguage = {
    name: 'languages-select-option',
    type: 'document',
    title: 'Courses',
    id: 'languages-select-option',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },

        {
            name: 'languages',
            type: 'array',
            // components: { input: ArrayMaxItems },
            title: 'Languages',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: EarthGlobeIcon,
                    fields: [
                        {
                            title: 'Course Name (Դասընթացի անվանումը)',
                            name: 'course',
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
       


        {
            name: 'quantity_lessons',
            type: 'array',
            // components: { input: ArrayMaxItems },
            title: 'Quantity of lessons per week',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CalendarIcon,
                    fields: [
                        {
                            title: 'Quantity of lessons per week (Դասերի քանակը շաբաթական)',
                            name: 'quantity',
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



        {
            name: 'class_duration',
            type: 'array',
            // components: { input: ArrayMaxItems },
            title: 'Class duration',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClockIcon,
                    fields: [
                        {
                            title: 'Class duration (Դասի տևողությունը)',
                            name: 'duration',
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

export default coursesSchemaLanguage;
