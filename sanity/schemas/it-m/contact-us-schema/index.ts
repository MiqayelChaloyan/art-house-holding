import { LinkIcon } from '@sanity/icons';
import { IoShareSocial } from 'react-icons/io5';

import ArrayMaxItems from '@/utils/ArrayMaxItems';
import { RuleType } from '../../../ruleType';


const contactUsSchemaIT_M = {
    name: 'it-m-contact-us',
    type: 'document',
    title: 'Contact Us',
    id: 'it-m-contact-us',
    fields: [
        {
            title: 'Country, Region/City, Street',
            name: 'address',
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
            description: `
                        You can add up to ten phone numbers.
                        It should be in the specified format: +374 | (XX)-XXX-XXX
                        `,
            validation: (Rule: RuleType) => Rule.max(10).unique(),
            components: { input: ArrayMaxItems },
        },
        {
            name: 'messengers',
            type: 'array',
            title: 'Messengers',
            description: `
                        You can add up to ten messengers. You can only add these WhatsApp, Viber, Skype.
                        It would be advisable to choose any three of the above, no more.
                        `,
            validation: (Rule: RuleType) => Rule.max(10).unique(),
            components: { input: ArrayMaxItems },
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: IoShareSocial,
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            name: 'messenger_name',
                            title: 'Messenger Name',
                            type: 'string',
                        },
                        {
                            name: 'messenger',
                            title: 'Messenger',
                            description: 'It should be in the specified format: +374 | (XX)-XXX-XXX',
                            type: 'string',
                        },
                    ]
                }
            ],
        },
        {
            name: 'social_links',
            type: 'array',
            title: 'Social Links',
            description: `
                        You can only add these Facebook, Instagram, Gmail, Linkedin, X, Tiktok, Telegram, YouTube, Pinterest, WhatsApp, Viber.
                        It would be advisable to choose any three of the above, no more.
                        `,
            validation: (Rule: RuleType) => Rule.max(4),
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
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare() {
            return {
                title: 'Կապ մեզ հետ',
            };
        },
    }
};

export default contactUsSchemaIT_M;
