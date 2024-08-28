import { EarthGlobeIcon, CheckmarkIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';
import { BookIcon } from '@sanity/icons';

const title = 'Գնացուցակ';

const priceListSchemaIt_M = {
    name: 'price-list-it-m',
    type: 'document',
    title: 'Price List',
    icon: EarthGlobeIcon,
    id: 'price-list-it-m',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        {
            name: 'price_list',
            type: 'array',
            title: 'Price List',
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
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title,
            };
        },
    }
};

export default priceListSchemaIt_M;
