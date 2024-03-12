const coWorkersSchemaEducationalCenter = {
    name: 'co-workers',
    type: 'document',
    title: 'Co-workers',
    id: 'co-workers-educational-center',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            title: 'Company Name (Ընկերության Անվանումը)',
            name: 'company_name',
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
            title: 'Cooperation (Համագործակցություն)',
            name: 'cooperation',
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
            title: 'Implemented Projects (Իրականացված ծրագրեր)',
            name: 'implemented_projects',
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
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'logo',
            title: 'Co-worker company logo (Գործընկեր ընկերության լոգոն)',
            type: 'image',
            options: { hotspot: true },
            fields: [

                {
                    name: 'alt',
                    title: 'Alt',
                    type: 'string'
                }
            ],
            validation: (Rule: any) => Rule.required(),
        },
    ],
};

export default coWorkersSchemaEducationalCenter;

