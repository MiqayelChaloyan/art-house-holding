import { ClipboardIcon, TrendUpwardIcon, LaunchIcon, UserIcon } from '@sanity/icons';
import { BsLayersHalf } from "react-icons/bs";

import { RuleType } from '../../../ruleType';
import ArrayMaxItems from '@/utils/ArrayMaxItems';

export const aboutUsSchemaIT_M = {
    name: 'it-m-about-us',
    type: 'document',
    title: 'About Us',
    id: 'it-m-about-us',
    fields: [
        {
            title: 'About us',
            name: 'about_us',
            type: 'object',
            fields: [
                {
                    title: 'Title',
                    name: 'title',
                    type: 'object',
                    validation: (Rule: RuleType) => Rule.required(),
                    fields: [
                        {
                            title: 'Armenian',
                            name: 'am',
                            type: 'string',
                        },
                        {
                            title: 'English',
                            name: 'en',
                            type: 'string',
                        },
                        {
                            title: 'Russian',
                            name: 'ru',
                            type: 'string',
                        },
                    ],
                },
                {
                    title: 'Content',
                    name: 'content',
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
        },
        {
            name: 'strengths',
            type: 'array',
            title: 'Strengths',
            description: 'Դուք կարող եք ավելացնել ցանկացած քանակի:',
            of: [
                {
                    title: 'Advantage',
                    name: 'advantage',
                    type: 'object',
                    icon: TrendUpwardIcon,
                    fields: [
                        {
                            title: 'Title',
                            name: 'title',
                            type: 'object',
                            validation: (Rule: RuleType) => Rule.required(),
                            fields: [
                                {
                                    title: 'Armenian',
                                    name: 'am',
                                    type: 'string',
                                },
                                {
                                    title: 'English',
                                    name: 'en',
                                    type: 'string',
                                },
                                {
                                    title: 'Russian',
                                    name: 'ru',
                                    type: 'string',
                                },
                            ],
                        },
                        {
                            title: 'Content',
                            name: 'content',
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
                        {
                            name: 'showImage',
                            title: 'Show Image',
                            type: 'boolean',
                            description: 'Check this box to display the image.',
                            initialValue: false,
                        },
                        {
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            hidden: ({ parent }: { parent: { showImage?: boolean } }) => !parent?.showImage,
                            options: {
                                hotspot: true,
                            },
                            fields: [
                                {
                                    name: 'alt',
                                    type: 'string',
                                    title: 'Alternative text',
                                },
                            ],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'title',
                        },
                        prepare(selection: { title?: { am?: string; en?: string; ru?: string } }) {
                            const { title } = selection;
                            return {
                                title: title?.am,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'video',
            type: 'object',
            title: 'Video',
            validation: (Rule: RuleType) => Rule.required(),
            fields: [
                {
                    name: 'video_url',
                    title: 'Video Link',
                    type: 'url',
                },
                {
                    name: 'video_light',
                    title: 'Video Light',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alternative text',
                            type: 'string'
                        }
                    ],
                },
            ]
        },
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

export default aboutUsSchemaIT_M;