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
        // spanishURL: require('../../../public/assets/images/language/spanish.png'),
        // russianURL: require('../../../public/assets/images/language/russian.png'),
        // italianURL: require('../../../public/assets/images/language/italian.png'),
        // germanURL: require('../../../public/assets/images/language/german.png'),
        // frenchURL: require('../../../public/assets/images/language/french.png'),
        // englishURL: require('../../../public/assets/images/language/english.png'),
        // chineseURL: require('../../../public/assets/images/language/chinese.png'),
    }
}


export const getLanguageImagetoLocale = (locale: string, path: string) => require(`../../../public/assets/images/language/${locale}/${path}.png`)

