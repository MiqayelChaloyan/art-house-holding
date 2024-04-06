export const ImagePaths = {
    ART_HOUSE_HOLDING: {
        watchURL: require('../../../public/assets/images/art-house/watch.png'),
        logoURL: require('../../../public/assets/images/art-house/artHouseLogo.png'),
        flashLightURL: require('../../../public/assets/images/art-house/flashLight.png')
    },
    ART_EDUCATIONAL_CENTER: {
        aboutUsURL: require('../../../public/assets/images/educational-center/courses.png')
    },
    LANGUAGE: {
        spanishURL: require('../../../public/assets/images/language/lang/spanish.png'),
        russianURL: require('../../../public/assets/images/language/lang/russian.png'),
        italianURL: require('../../../public/assets/images/language/lang/italian.png'),
        germanURL: require('../../../public/assets/images/language/lang/german.png'),
        franceURL: require('../../../public/assets/images/language/lang/france.png'),
        englishURL: require('../../../public/assets/images/language/lang/english.png'),
        chineURL: require('../../../public/assets/images/language/lang/chine.png'),

        manURL: require('../../../public/assets/images/language/man.png'),
        womanURL: require('../../../public/assets/images/language/woman.png'),

    }
}


export const getLanguageImagetoLocale = (locale: string, path: string) => require(`../../../public/assets/images/language/${locale}/${path}.png`)

