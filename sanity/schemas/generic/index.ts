import { RuleType } from '../../ruleType';

const partnersSchema = {
    name: 'partners',
    type: 'document',
    title: 'Partners',
    id: 'partners',
    fields: [
       {
            title: 'Company Name (Ընկերության Անվանումը)',
            name: 'company_name',
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
            title: 'Cooperation (Համագործակցություն)',
            name: 'cooperation',
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
            title: 'Implemented Projects (Իրականացված ծրագրեր)',
            name: 'implemented_projects',
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
            name: 'logo',
            title: 'Co-worker company logo (Գործընկեր ընկերության լոգոն)',
            type: 'image',
            options: { hotspot: true },
            fields: [

                {
                    name: 'alt',
                    title: 'Alternative text',
                    type: 'string'
                }
            ],
            validation: (Rule: RuleType) => Rule.required(),
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Գործընկերներ',
            };
        },
    }
};

export default partnersSchema;
