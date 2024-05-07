import { DocumentsIcon } from '@sanity/icons'


export default (S: any) =>
    S.list()
        .title('Base')
        .items([
            ...S.documentTypeListItems().filter(
                (listItem: any) => ![
                    'art-house-home',
                    'art-house-contact-us',
                    'about-us',
                    'courses',
                    'educational-center-contact-us',
                    'languages',
                    'language-contact-us',
                    'about-language',
                    'about-us-language',
                    'price-list-language',
                    'languages-select-option',
                    'questions-language',
                    'promotions-languages',
                    'languages-quiz',
                    'partners'
                ].includes(listItem.getId())
            ),

            S.listItem()
                .title('ART-HOUSE-HOME')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('art-house-home').documentId('art-house')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('art-house-contact-us').documentId('art-house-contact-us')),
                        ])
                ),

            S.listItem()
                .title('ART-HOUSE-EDUCATIONAL-CENTER')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('About Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('about-us').documentId('about-us-educational-center')),
                            S.listItem()
                                .title('Courses')
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses"')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('educational-center-contact-us').documentId('educational-center-contact-us')),
                        ])
                ),

            S.listItem().title('ART-HOUSE-DESIGN')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Brand')
                                .child(S.document().schemaType('Brand').documentId('Brand')),
                        ])
                ),

            S.listItem().title('ART-HOUSE-IT-M')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Categorie')
                                .child(S.document().schemaType('Categorie').documentId('Categorie')),
                        ])
                ),
            S.listItem()
                .title('ART-HOUSE-LANGUAGE')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('About Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('about-us-language').documentId('about-us-language')),
                            S.listItem()
                                .title('Courses')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('languages-select-option').documentId('languages-select-option')),
                            S.listItem()
                                .title('Languages')
                                .child(
                                    S.documentList()
                                        .title('Languages')
                                        .filter('_type == "about-language"')),
                            S.listItem()
                                .title('Price List')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('price-list-language').documentId('price-list-languages')),
                            S.listItem()
                                .title('Promotions')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('promotions-languages').documentId('promotions-languages')),
                            S.listItem()
                                .title('Quiz')
                                .child(
                                    S.documentList()
                                        .title('Quiz')
                                        .filter('_type == "languages-quiz"')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('language-contact-us').documentId('language-contact-us')),
                        ])
                ),

            S.listItem().title('GENERIC')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Partners')
                                .child(
                                    S.documentList()
                                        .title('Partners')
                                        .filter('_type == "partners"')),
                        ])
                ),
        ]);
