import { ProjectsIcon, CheckmarkIcon } from '@sanity/icons';

import ArrayMaxItems from '@/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

const homeSchemaIT_M = {
    name: 'it-m-home',
    type: 'document',
    title: 'Home',
    id: 'it-m-home',
    groups: [
        {
            name: 'og',
            title: 'Social Share Info',
            default: true
        },
        {
            name: 'manifest',
            title: 'Web App Settings',
            hidden: ({ document }: {
                document: {
                    [key: string]: never;
                }
            }): boolean => !(document.isPwa)
        },
    ],
    fields: [
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
            type: 'text',
            name: 'ogDescription',
            title: 'Social Share Description',
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
            name: 'our_advantages',
            type: 'array',
            title: 'Our advantages',
            description: 'Դուք կարող եք ավելացնել ցանկացած քանակի (Տեքստը չպետք է լինի 250 նիշից ավելի)',
            validation: (Rule: RuleType) => Rule.required(),
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: CheckmarkIcon,
                    fields: [
                        {
                            title: 'Armenian',
                            name: 'am',
                            type: 'string',
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
        },
        {
            title: 'Content',
            name: 'content',
            description: 'Ի՞նչ սովորել ITM-ում',
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
            ],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Գլխավոր',
            };
        },
    }
};

export default homeSchemaIT_M;
