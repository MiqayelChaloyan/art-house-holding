import { ActivityIcon } from '@sanity/icons'
import { RuleType } from '../../../ruleType';

const promotionsSchemaLanguage = {
    name: 'promotions-languages',
    type: 'document',
    title: 'Promotions',
    id: 'promotions-languages',
    initialValue: () => ({
        publishedAt: new Date().toISOString()
    }),
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            name: 'discounts_list',
            type: 'array',
            title: 'Discounts',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ActivityIcon,
                    fields: [
                        {
                            title: 'Discount',
                            name: 'discount',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Poster Armenian',
                                    name: 'am',
                                    type: 'image',
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
                                    title: 'Poster English',
                                    name: 'en',
                                    type: 'image',
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
                                    title: 'Poster Russian',
                                    name: 'ru',
                                    type: 'image',
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
                    ]
                }
            ]
        }
    ],
};

export default promotionsSchemaLanguage;
