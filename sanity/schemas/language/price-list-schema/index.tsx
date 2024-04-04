import { EarthGlobeIcon } from '@sanity/icons'
import { RuleType } from '../../../ruleType';
import { BookIcon } from '@sanity/icons';

const priceListSchemaLanguage = {
    name: 'price-list-language',
    type: 'document',
    title: 'Price List',
    icon: EarthGlobeIcon,
    id: 'price-list-languages',
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
                            title: 'Teaching language',
                            description: 'Դասավանդվող լեզու',
                            name: 'teaching_language',
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
                            title: 'Group lessons cost 1 month',
                            description: 'Խմբային դասեր 1 ամսվա արժեք (Շաբաթական 3 օր)',
                            name: 'group_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Private lessons 1 month worth',
                            description: 'Անհատական դասեր 1 ամսվա արժեք',
                            name: 'private_lessons',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: '3 days a week',
                                    description: 'Շաբաթական 3 օր',
                                    name: 'three_week',
                                    type: 'number'
                                },
                                {
                                    title: '2 days a week',
                                    description: 'Շաբաթական 2 օր',
                                    name: 'two_week',
                                    type: 'number'
                                },
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
            name: 'private_lessons',
            type: 'array',
            title: 'Private lessons for foreigners',
            description: 'Անհատական դասեր օտարերկրացիների համար',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Teaching language',
                            description: 'Դասավանդվող լեզու',
                            name: 'teaching_language',
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
                            title: 'Private lessons 1 month worth',
                            description: 'Անհատական դասեր 1 ամսվա արժեք',
                            name: 'private_lessons',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: '3 days a week',
                                    description: 'Շաբաթական 3 օր',
                                    name: 'three_week',
                                    type: 'number'
                                },
                                {
                                    title: '2 days a week',
                                    description: 'Շաբաթական 2 օր',
                                    name: 'two_week',
                                    type: 'number'
                                },
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
                },
            ]
        },
        {
            name: 'english_courses',
            type: 'array',
            title: 'Advanced English language classes',
            description: 'Անգլերեն լեզվի խորացված դասեր',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: BookIcon,
                    fields: [
                        {
                            title: 'Language Type',
                            description: 'Դասավանդվող տեսակը',
                            name: 'language_type',
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
                            title: 'Private lessons cost 1 month',
                            description: 'Անհատական դասեր 1 ամսվա արժեք (Շաբաթական 3 օր)',
                            name: 'private_lessons',
                            type: 'number',
                        },
                        {
                            title: 'Duration',
                            description: 'Տևողությունը',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ],
                },
            ],
        },
    ],
};

export default priceListSchemaLanguage;
