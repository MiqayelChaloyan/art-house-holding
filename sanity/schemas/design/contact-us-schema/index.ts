import { LinkIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

const contactUsSchemaDesign = {
    name: 'design-contact-us',
    type: 'document',
    title: 'Contact Us',
    id: 'contact-us-design',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            title: 'Phone Numbers',
            name: 'phone_numbers',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'You can only add two phone number',
            validation: (Rule: RuleType | any) => Rule.max(2).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            description: 'You can only add these Facebook, X(Twitter), Instagram, Gmail, LinkedIn.',
            validation: (Rule: RuleType) => Rule.max(5),
            components: { input: ArrayMaxItems },
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: LinkIcon,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            name: 'social_name',
                            title: 'Social Name',
                            type: 'string',
                        },
                        {
                            name: 'social_link',
                            title: 'Social Link',
                            type: 'string',
                        },
                    ]
                }
            ],
        },
    ]
};

export default contactUsSchemaDesign;
