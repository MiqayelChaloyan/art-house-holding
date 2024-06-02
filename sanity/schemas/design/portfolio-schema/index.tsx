import { SparklesIcon, BulbOutlineIcon, CheckmarkIcon, ImagesIcon } from '@sanity/icons';

import { RuleType } from '../../../ruleType';
import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';

export const portfolioSchemaDesign = {
    name: 'portfolio-design',
    type: 'document',
    title: 'Portfolio',
    id: 'portfolio-design',
    icon: SparklesIcon,
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
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
        {
            name: 'advantages',
            type: 'array',
            title: 'Advantages',
            // description: 'Դուք կարող եք ավելացնել ցանկացած քանակի',
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
                }
            ],
        }
    ],
};

export default portfolioSchemaDesign;