import { UserIcon } from '@sanity/icons';
import ArrayMaxItems from '@/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

export const aboutUsSchemaArtHouse = {
    name: 'art-house-about-us',
    type: 'document',
    title: 'Home',
    id: 'art-house-about-us',
    fields: [
        {
            title: 'About Us',
            name: 'about_us_section',
            type: 'object',
            fields: [
                {
                    title: 'Content',
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
        },
        {
            name: 'our_rating',
            type: 'array',
            title: 'Our Rating Section',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(10),
            description: 'No less than two, and no more ten.',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: UserIcon,
                    fields: [
                        {
                            title: 'User Name',
                            name: 'user_name',
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
                            name: 'user_image',
                            title: 'User Image',
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
                            title: 'User Feedback',
                            name: 'user_feedback',
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
                    ],
                    preview: {
                        select: {
                            title: 'user_name.en',
                        },
                        prepare(selection: { title?: string }) {
                            return {
                                title: selection.title,
                            };
                        },
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Մեր մասին',
            };
        },
    }
};

export default aboutUsSchemaArtHouse;