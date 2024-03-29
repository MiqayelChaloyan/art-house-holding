// import ArrayMaxItems from "@/lib/utils/ArrayMaxItems";
import { defineArrayMember } from "sanity";

const art_house_itm = {
    name: 'art-house-itm',
    type: 'document',
    title: 'ART-HOUSE-IT-M',
    fields: [
        {
            name: 'our_websites',
            type: 'array',
            title: 'Websites',
            of: [
                {
                    name: 'Object',
                    type: 'object',
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
                            // validation: (Rule: any) => Rule.required(),
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
                    ]
                }
            ],
        },
    ],
};

export default art_house_itm;
