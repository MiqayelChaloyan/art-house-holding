import { SparklesIcon } from '@sanity/icons';

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
            description: 'Do not change the name.'
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
    ],
};

export default portfolioSchemaDesign;