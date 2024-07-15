import { ProjectsIcon, TrendUpwardIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

const homeSchemaArtHouse = {
    name: 'art-house-home',
    type: 'document',
    title: 'Home',
    id: 'art-house',
    groups: [
        {
            name: "og",
            title: "Social Share Info",
            default: true
        },
        {
            name: "manifest",
            title: "Web App Settings",
            hidden: ({ document }: {
                document: {
                    [key: string]: never;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Չփոփոխել անվանումը'
        },
        {
            type: 'string',
            title: 'Page Title',
            name: 'ogTitle',
            description:
                'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og']
        },
        {
            type: "text",
            name: "ogDescription",
            title: "Social Share Description",
            group: ['og']
        },
        {
            type: 'image',
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            name: 'our_websites',
            type: 'array',
            title: 'Websites',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(5),
            description: 'Ոչ պակաս, քան հինգ և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ProjectsIcon,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            title: 'Company Name (Ընկերության Անվանումը)',
                            name: 'company_name',
                            type: 'string'
                        },
                        {
                            title: 'Website Title',
                            name: 'words',
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
                            title: 'Website Logo Front',
                            name: 'website_logo_front',
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
                            title: 'Website Logo Back',
                            name: 'website_logo_back',
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
                            name: 'web_site_url',
                            title: 'Website url',
                            type: 'string',
                        },
                    ]
                }
            ],
        },
        {
            name: 'progress_section',
            type: 'array',
            title: 'Progress Section',
            components: { input: ArrayMaxItems },
            validation: (Rule: RuleType) => Rule.max(4),
            description: 'Ոչ պակաս, քան չորս և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
            of: [
                {
                    type: 'object',
                    name: 'tag',
                    icon: TrendUpwardIcon,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
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
                            title: 'Quantity',
                            name: 'quantity',
                            type: 'number',
                            initialValue: 0,
                        },
                    ]
                }
            ]
        },
    ],
};

export default homeSchemaArtHouse;
