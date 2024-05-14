import { EarthGlobeIcon, CheckmarkIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';
import { BookIcon } from '@sanity/icons';

const priceListSchemaDesign = {
    name: 'price-list-design',
    type: 'document',
    title: 'Price List',
    icon: EarthGlobeIcon,
    id: 'price-list-design',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Չփոփոխել անվանումը'
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
            name: 'guides',
            type: 'array',
            title: 'Guides',
            description: 'Դուք կարող եք ավելացնել ցանկացած քանակի ուղեցույցներ',
            validation: (Rule: RuleType) => Rule.required(),
            // validation: (Rule: RuleType) => Rule.max(5),
            // components: { input: ArrayMaxItems },
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
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
                }
            ],
        },
        {
            name: 'price_list',
            type: 'array',
            title: 'Price list',
            description: 'Գնացուցակ',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Course',
                            description: 'Դասընթաց',
                            name: 'course',
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
                            title: 'Group lessons',
                            description: 'Խմբային դասեր',
                            name: 'group_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Personal lessons',
                            description: 'Անհատական դասեր',
                            name: 'personal_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Duration Group/Individual',
                            description: 'Տևողությունը Խմբային/Անհատական',
                            name: 'duration',
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
                            title: 'Hours Group/Individual',
                            description: 'Ժամեր Խմբային/Անհատական',
                            name: 'hours_lessons',
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
                    ]
                }
            ]
        },
    ],
};

export default priceListSchemaDesign;
