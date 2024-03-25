import { SlugInput, defineArrayMember, defineField } from "sanity";
import { basePath } from "../../../env";

import { ArrayOfPrimitivesInputProps, ArrayOfPrimitivesFunctions, ArrayInputFunctionsProps, ArraySchemaType } from 'sanity'

function ArrayFunctions(props: ArrayInputFunctionsProps<string | number | boolean, ArraySchemaType>) {
    const valRules = props?.schemaType?.validation?.[0]?._rules || []
    const max = valRules.find(r => r.flag === 'max')?.constraint
    const total = props?.value?.length || 0
    if (!isNaN(max) && total >= max) return null
    return <ArrayOfPrimitivesFunctions {...props} />
}

function ArrayMaxItems(props: ArrayOfPrimitivesInputProps) {
    return props.renderDefault({ ...props, arrayFunctions: ArrayFunctions })
}

const aboutUsSchemaLanguage = {
    name: 'about-us-language',
    type: 'document',
    title: 'About Us',
    id: 'about-us-language',
    fields: [
        // {
        //     title: 'Name',
        //     name: 'name',
        //     type: 'string',
        // },
        // {
        //     title: 'About us content',
        //     name: 'text',
        //     type: 'object',
        //     validation: (Rule: any) => Rule.required(),
        //     fields: [
        //         {
        //             title: 'Armenian',
        //             name: 'am',
        //             type: 'array',
        //             of: [{ type: 'block' }],
        //         },
        //         {
        //             title: 'English',
        //             name: 'en',
        //             type: 'array',
        //             of: [{ type: 'block' }],
        //         },
        //         {
        //             title: 'Russian',
        //             name: 'ru',
        //             type: 'array',
        //             of: [{ type: 'block' }],
        //         },
        //         {
        //             name: 'about_us_images',
        //             type: 'array',
        //             title: 'About Us Images',
        //             description: 'Ոչ պակաս, քան երեք, և ոչ ավելի, միայն դուք կարող եք դրանք փոփոխել',
        //             of: [{
        //                 type: 'image', alt: 'alt',
        //                 fields: [
        //                     {
        //                         name: 'alt',
        //                         type: 'string',
        //                         title: 'Alternative text',
        //                     },
        //                 ],
        //             }],

        //         },
        //     ],
        // },

        // {
        //     name: 'promotions',
        //     type: 'array',
        //     title: 'Promotions',
        //     // components: { input: ArrayMaxItems },
        //     validation: (Rule: any) => Rule.max(3),
        //     description: 'Դուք կարող եք ավելացնել ցանկացած թվով ակցիաներ',
        //     of: [
        //         {
        //             name: 'Object',
        //             type: 'object',
        //             fields: [
        //                 {
        //                     name: 'slug',
        //                     type: 'slug',
        //                     description: "Պիտի եզակի լինի",
        //                     options: {
        //                         source: 'name',
        //                     },
        //                     validation: (Rule: any) => Rule.required(),
        //                 },
        //                 {
        //                     title: 'Promotion',
        //                     name: 'promotion',
        //                     type: 'object',
        //                     validation: (Rule: any) => Rule.required(),
        //                     fields: [
        //                         {
        //                             title: 'Armenian',
        //                             name: 'am',
        //                             type: 'string'
        //                         },
        //                         {
        //                             title: 'English',
        //                             name: 'en',
        //                             type: 'string'
        //                         },
        //                         {
        //                             title: 'Russian',
        //                             name: 'ru',
        //                             type: 'string'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     name: 'promotion_image',
        //                     title: 'Promotion Image',
        //                     type: 'image',
        //                     options: { hotspot: true },
        //                     fields: [
        //                         {
        //                             name: 'alt',
        //                             title: 'Alternative text',
        //                             type: 'string'
        //                         }
        //                     ]
        //                 },
        //             ]
        //         }
        //     ]
        // },

        defineField(
            {
                title: 'Name',
                name: 'name',
                type: 'string',
            },
        ),

        defineField({
            type: 'array',
            name: 'myArray',
            title: 'My Array Max 3 item',
            components: { input: ArrayMaxItems },
            of: [ {
                title: 'Name',
                name: 'name',
                type: 'string',
            }],
            validation: (rule) => rule.max(3),
        }),


        // {
        //     title: 'Block Content',
        //     name: 'blockContent',
        //     type: 'array',
        //     of: [
        //         defineArrayMember(
        //             {
        //                 title: 'Block',
        //                 type: 'block',

        //                 styles: [
        //                     { title: 'Normal', value: 'normal' },
        //                     { title: 'H1', value: 'h1' },
        //                     { title: 'H2', value: 'h2' },
        //                     { title: 'H3', value: 'h3' },
        //                     { title: 'H4', value: 'h4' },
        //                     { title: 'Quote', value: 'blockquote' },
        //                 ],
        //                 lists: [{ title: 'Bullet', value: 'bullet' }],
        //                 // Marks let you mark up inline text in the block editor.
        //                 marks: {
        //                     // Decorators usually describe a single property – e.g. a typographic
        //                     // preference or highlighting by editors.
        //                     decorators: [
        //                         { title: 'Strong', value: 'strong' },
        //                         { title: 'Emphasis', value: 'em' },
        //                     ],
        //                     // Annotations can be any object structure – e.g. a link or a footnote.
        //                     annotations: [
        //                         {
        //                             title: 'URL',
        //                             name: 'link',
        //                             type: 'object',
        //                             fields: [
        //                                 {
        //                                     title: 'URL',
        //                                     name: 'href',
        //                                     type: 'url',
        //                                 },
        //                             ],
        //                         },
        //                     ],
        //                 }
        //             },
        //         ),
        //     ],
        // },
    ],
};

export default aboutUsSchemaLanguage;