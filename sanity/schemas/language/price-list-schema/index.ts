import { EarthGlobeIcon } from '@sanity/icons'

const priceListSchemaLanguage = {
    name: 'price-list-language',
    type: 'document',
    title: 'Price List',
    icon: EarthGlobeIcon,
    id: 'price-list-languages',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            name: 'price_list',
            type: 'array',
            // components: { input: ArrayMaxItems },
            title: 'Price list',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    fields: [
                        {
                            title: 'Course Title',
                            name: 'course_title',
                            type: 'object',
                            validation: (Rule: any) => Rule.required(),
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
                            title: 'Course Amount',
                            name: 'amount',
                            type: 'number',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'duration',
                            type: 'number',
                            title: 'Duration of the course',
                            initialValue: 0,
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Պիտի եզակի լինի",
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: any) => Rule.required(),
                        },
                    ]
                }
            ]
        },
      ],
};

export default priceListSchemaLanguage;
