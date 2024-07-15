import { LinkIcon } from '@sanity/icons';

import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';

const contactUsSchemaArtHouse = {
    name: 'art-house-contact-us',
    type: 'document',
    title: 'Contact Us',
    id: 'art-house-contact-us',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Չփոփոխել անվանումը'
        },
        {
            title: 'Phone Numbers',
            name: 'phone_numbers',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'You can only add six phone number.',
            validation: (Rule: RuleType | any) => Rule.max(6).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            description: 'You can only add these Facebook, Instagram, Gmail, Linkedin, X, Tiktok, Telegram, YouTube, Pinterest, WhatsApp, Viber.',
            validation: (Rule: RuleType | any) => Rule.max(11).unique(),
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

export default contactUsSchemaArtHouse;
