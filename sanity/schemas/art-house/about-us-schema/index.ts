import { RuleType } from '../../../ruleType';

export const aboutUsSchemaArtHouse = {
    name: 'art-house-about-us',
    type: 'document',
    title: 'Home',
    id: 'art-house-about-us',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
            description: 'Do not change the name.'
        },
        /* Schema */
        {
            title: 'Main',
            name: 'main_section',
            type: 'object',
            fields: [
                {
                    title: 'Heading primary Title',
                    name: 'primary_title',
                    type: 'object',
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
                    title: 'Secondary primary Title',
                    name: 'secondary_title',
                    type: 'object',
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
                    title: 'Background Image',
                    name: 'background_image',
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
            ]
        },
        {
            title: 'AboutUs',
            name: 'about_us_section',
            type: 'object',
            fields: [
                {
                    title: 'About Us Content',
                    name: 'about_us_content',
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
                    title: 'Image',
                    name: 'image',
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
            ]
        }
    ],
};

export default aboutUsSchemaArtHouse;