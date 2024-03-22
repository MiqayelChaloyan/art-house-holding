import { EarthGlobeIcon } from '@sanity/icons'

const coursesSchemaLanguage = {
    name: 'languages',
    type: 'document',
    title: 'Courses',
    icon: EarthGlobeIcon,
    id: 'courses-languages-center',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
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
        {
            title: 'Course Name (Դասընթացի անվանումը)',
            name: 'course_name',
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
    ],
};

export default coursesSchemaLanguage;
