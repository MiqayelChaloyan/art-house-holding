import { ProjectsIcon, TrendUpwardIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../ruleType';

const homeSchemaArtHouse = {
    name: 'art-house-home',
    type: 'document',
    title: 'Home',
    id: 'art-house',
    groups: [
        {
            name: "meta",
            title: "Site Info",
            default: true
        },
        {
            name: "og",
            title: "Social Share Info",
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
        /* Site Metadata Schema */
        {
            type: 'string',
            name: 'site_name',
            title: 'Site Name',
            group: ['og', 'meta'],
        },
        {
            type: "text",
            name: "ogDescription",
            title: "Social Share Description",
            group: ['og', 'meta']
        },
        {
            type: 'url',
            title: 'URL',
            name: 'url',
            description: 'Most likely either the url of the page or its canonical url',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og', 'meta'],
        },
        {
            type: 'string',
            title: 'Page Title',
            name: 'ogTitle',
            description:
                'Set the title Open Graph should use. In most situations, this should be different from the value of the title prop',
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            type: 'image',
            title: 'Image',
            name: 'ogImage',
            description:
                'URL of the image that should be used in social media previews. If you define this, you must define two other OG basic properties as well: title and type.',
            validation: (Rule: RuleType) => Rule.required(),
            group: ['og'],
        },
        /* Schema */
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'our_websites',
            type: 'array',
            title: 'Websites',
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
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
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
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
