export default (S: any) =>
    S.list()
        .title('Base')
        .items([
            ...S.documentTypeListItems().filter(
                (listItem: any) => !['art-house-home', 'co-workers', 'about-us', 'courses'].includes(listItem.getId())
            ),

            S.listItem()
                .title('ART-HOUSE-HOME')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home')
                                .child(S.document().schemaType('art-house-home').documentId('art-house')),
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
                                .child(S.document().schemaType('about-us').documentId('about-us-educational-center')),
                            S.listItem()
                                .title('Courses')
                                .child(
                                    S.documentList()
                                        .title('Courses')
                                        .filter('_type == "courses"')
                                ),
                            S.listItem()
                                .title('Co-Workers')
                                .child(
                                    S.documentList()
                                        .title('Co-Workers')
                                        .filter('_type == "co-workers"')
                                )
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

            S.listItem().title('ART-HOUSE-LANGUAGE')
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Categorie')
                                .child(S.document().schemaType('Categorie').documentId('Categorie')),
                        ])
                ),
        ]);
