import { DocumentsIcon } from '@sanity/icons';

export default (S: any) =>
    S.list()
        .title('Base')
        .items([
            ...S.documentTypeListItems().filter(
                (listItem: any) => ![
                    'art-house-home',
                    'art-house-about-us',
                    'art-house-contact-us',
                    'about-us',
                    'courses',
                    'educational-center-contact-us',
                    'educational-lessons-select-option',
                    'languages',
                    'language-contact-us',
                    'about-language',
                    'about-us-language',
                    'price-list-language',
                    'languages-select-option',
                    'questions-language',
                    'promotions-languages',
                    'languages-quiz',
                    'about-us-design',
                    'design-contact-us',
                    'courses-design',
                    'price-list-design',
                    'design-lessons-select-option',
                    'partners',
                    'portfolio-design',
                    'price-list-it-m',
                    'our-team-it-m',
                    'courses-it-m',
                    'it-m-select-option',
                    'it-m-contact-us',
                    'it-m-about-us',
                    'it-m-home'
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
                                .title('About Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('art-house-about-us').documentId('art-house-about-us')),
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
                                .title('Home')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('about-us').documentId('about-us-educational-center')),
                            S.listItem()
                                .title('Courses')
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses"')),
                            S.listItem()
                                .title('Lessons')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('educational-lessons-select-option').documentId('educational-lessons-select-option')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('educational-center-contact-us').documentId('contact-us-educational-center')),
                        ])
                ),

            S.listItem().title('ART-HOUSE-DESIGN')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('about-us-design').documentId('about-us-design')),
                            S.listItem()
                                .title('Courses')
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses-design"')),
                            S.listItem()
                                .title('Price List')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('price-list-design').documentId('price-list-design')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('design-contact-us').documentId('contact-us-design')),
                            S.listItem()
                                .title('Lessons & Orders')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('design-lessons-select-option').documentId('design-lessons-select-option')),
                            S.listItem()
                                .title('Portfolios')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('portfolio-design').documentId('portfolio-design')),
                        ])
                ),

            S.listItem().title('ART-HOUSE-IT-M')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('it-m-home').documentId('it-m-home')),
                            S.listItem()
                                .title('About Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('it-m-about-us').documentId('it-m-about-us')),
                            S.listItem()
                                .title('Courses')
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses-it-m"')),
                            S.listItem()
                                .title('Price List')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('price-list-it-m').documentId('price-list-it-m')),
                            S.listItem()
                                .title('Our team')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('our-team-it-m').documentId('our-team-it-m')),
                            S.listItem()
                                .title('Contact Us')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('it-m-contact-us').documentId('it-m-contact-us')),
                            S.listItem()
                                .title('Lessons & Orders')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('it-m-select-option').documentId('it-m-select-option')),
                        ])
                ),
            S.listItem()
                .title('ART-HOUSE-LANGUAGE')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .icon(DocumentsIcon)
                                .child(S.document().schemaType('about-us-language').documentId('about-us-language')),
                            S.listItem()
                                .title('Lessons')
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
                                .child(S.document().schemaType('language-contact-us').documentId('contact-us-language')),
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
