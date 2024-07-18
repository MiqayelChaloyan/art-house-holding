import { ClipboardIcon } from '@sanity/icons'

import { RuleType } from '../../../ruleType';
import ArrayMaxItems from '@/lib/utils/ArrayMaxItems';


const quizSchemaLanguage = {
    name: 'languages-quiz',
    type: 'document',
    title: 'Quiz',
    id: 'languages-quiz',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            title: 'Question Language image',
            name: 'question_logo',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                },
            ]
        },
        {
            name: 'slug',
            type: 'slug',
            description: "Պարտադիր պիտի լինի ISO 639 ստանդարտով տվյալ լեզուն, օրինակ՝ English - en",
            maxLength: 9,
            options: {
                source: 'name',
            },
            validation: (Rule: RuleType) => Rule.required(),
        },
        {
            name: 'questions',
            type: 'array',
            title: 'Questions',
            of: [
                {
                    name: 'Object',
                    type: 'object',
                    icon: ClipboardIcon,
                    fields: [
                        {
                            title: 'Question (Հարց)',
                            name: 'question',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            name: 'slug',
                            type: 'slug',
                            description: "Must be unique",
                            maxLength: 9,
                            options: {
                                source: 'name',
                            },
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                        {
                            title: 'Answers',
                            name: 'options',
                            type: 'array',
                            components: { input: ArrayMaxItems },
                            validation: (Rule: RuleType) => Rule.max(5),
                            of: [{ type: 'string' }]
                        },
                        {
                            title: 'Correct answer (Ճիշտ պատասխան)',
                            name: 'answer',
                            type: 'string',
                            validation: (Rule: RuleType) => Rule.required(),
                        },
                    ]
                }
            ]
        },
    ],
};

export default quizSchemaLanguage;
