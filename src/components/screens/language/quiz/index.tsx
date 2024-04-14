'use client'

import Link from 'next/link';
import { Arial, ArianAMU } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { QUIZ } from "../../../../../sanity/sanity-queries/language";
import { urlForImage } from "../../../../../sanity/imageUrlBuilder";

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: QUIZ[]
    locale: string | any
}


const Home: React.FC<Props> = ({ data, locale }) => {
    const windowSize = useWindowSize();

    const links = data.map((lang: any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(lang.question_logo);

        return (
            windowSize.width > 600 ? (
                <Link
                    key={lang.slug}
                    href={`/${locale}/language/quiz/${lang.slug}`}
                    aria-label={`/${locale}/language/quiz/${lang.slug}`}
                    className={styles.link}
                >
                    <img
                        src={path.src}
                        className={styles.language}
                        alt={lang.question_logo.alt}
                    />
                </Link>
            ) : (
                <Link
                    href={`/${locale}/language/quiz/${lang.slug}`}
                    aria-label={`/${locale}/language/quiz/${lang.slug}`}
                    className={styles.row}
                    key={lang.slug}
                >
                    <img
                        src={path.src}
                        className={styles.language}
                        alt={lang.question_logo.alt}
                    />
                    <h3 className={cn(styles.language_name, ArianAMU.className)}>{lang.name}</h3>
                </Link>
            )
        )
    })

    return (
        <section id='quiz'>
            <h1 className={`${styles.title} ${Arial.className}`}>ԸՆՏՐԵԼ ԼԵԶՈՒՆ</h1>
            <div className={styles.href}>
                {links}
            </div>
        </section>
    );
}

export default Home;


















// <div className={styles.languages}>
// <div className={styles.row}>
// <Link
//     href={`/${locale}/language/quiz/en`}
//     aria-label={`/${locale}/language/quiz/en`}
//     className={styles.link}
//     onClick={() => handleSubmit('en')}
// >
//     <Image
//         src={ImagePaths.LANGUAGE.englishURL.default.src}
//         alt='english'
//         // priority
//         className={styles.language}
//         width={0}
//         height={0}
//         sizes="100vw"
//         // draggable="false"
//         // loading="lazy"
//     />
// </Link>
//     <Link
//         href={`/${locale}/language/quiz/de`}
//         aria-label={`/${locale}/language/quiz/de`}
//         className={styles.link}
//         onClick={() => handleSubmit('de')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.germanURL.default.src}
//             alt='german'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
//     <Link
//         href={`/${locale}/language/quiz/fr`}
//         aria-label={`/${locale}/language/quiz/fr`}
//         className={styles.link}
//         onClick={() => handleSubmit('fr')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.franceURL.default.src}
//             alt='france'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
//     <Link
//         href={`/${locale}/language/quiz/cn`}
//         aria-label={`/${locale}/language/quiz/cn`}
//         className={styles.link}
//         onClick={() => handleSubmit('cn')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.chineURL.default.src}
//             alt='chine'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
// </div>

// <div className={styles.row}>
//     <Link
//         href={`/${locale}/language/quiz/ru`}
//         aria-label={`/${locale}/language/quiz/ru`}
//         className={styles.link}
//         onClick={() => handleSubmit('ru')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.russianURL.default.src}
//             alt='russian'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
//     <Link
//         href={`/${locale}/language/quiz/it`}
//         aria-label={`/${locale}/language/quiz/it`}
//         className={styles.link}
//         onClick={() => handleSubmit('it')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.italianURL.default.src}
//             alt='italian'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
//     <Link
//         href={`/${locale}/language/quiz/esp`}
//         aria-label={`/${locale}/language/quiz/esp`}
//         className={styles.link}
//         onClick={() => handleSubmit('esp')}
//     >
//         <Image
//             src={ImagePaths.LANGUAGE.spanishURL.default.src}
//             alt='spanish'
//             // priority
//             className={styles.language}
//             width={0}
//             height={0}
//             sizes="100vw"
//             draggable="false"
//             loading="lazy"
//         />
//     </Link>
// </div>
// </div>