'use client'

import { ImagePaths } from "@/lib/constants";
import styles from './styles.module.sass'
import Link from "next/link";
import { Arial } from "@/lib/constants/font";
import Image from "next/image";
import { useDispatch } from "react-redux";

import * as Action from '@/store/question_reducer'

interface Props {
    locale: string | any
}

const Home: React.FC<Props> = ({ locale }) => {

    const dispatch = useDispatch();

    const handleSubmit = (locale: string) => {
        const quiz = require(`@/lib/quiz/${locale}`);
        localStorage.setItem('quiz', locale);
        dispatch(Action.startExamAction(quiz.default))
    }

    return (
        <section id='quiz'>
            <h1 className={`${styles.title} ${Arial.className}`}>ԸՆՏՐԵԼ ԼԵԶՈՒՆ</h1>

            <div className={styles.languages}>
                <div className={styles.row}>
                    <Link
                        href={`/${locale}/language/quiz/en`}
                        aria-label={`/${locale}/language/quiz/en`}
                        className={styles.link}
                        onClick={() => handleSubmit('en')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.englishURL.default.src}
                            alt='english'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            // draggable="false"
                            // loading="lazy"
                        />
                    </Link>
                    <Link
                        href={`/${locale}/language/quiz/de`}
                        aria-label={`/${locale}/language/quiz/de`}
                        className={styles.link}
                        onClick={() => handleSubmit('de')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.germanURL.default.src}
                            alt='german'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                    <Link
                        href={`/${locale}/language/quiz/fr`}
                        aria-label={`/${locale}/language/quiz/fr`}
                        className={styles.link}
                        onClick={() => handleSubmit('fr')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.franceURL.default.src}
                            alt='france'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                    <Link
                        href={`/${locale}/language/quiz/cn`}
                        aria-label={`/${locale}/language/quiz/cn`}
                        className={styles.link}
                        onClick={() => handleSubmit('cn')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.chineURL.default.src}
                            alt='chine'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                </div>

                <div className={styles.row}>
                    <Link
                        href={`/${locale}/language/quiz/ru`}
                        aria-label={`/${locale}/language/quiz/ru`}
                        className={styles.link}
                        onClick={() => handleSubmit('ru')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.russianURL.default.src}
                            alt='russian'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                    <Link
                        href={`/${locale}/language/quiz/it`}
                        aria-label={`/${locale}/language/quiz/it`}
                        className={styles.link}
                        onClick={() => handleSubmit('it')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.italianURL.default.src}
                            alt='italian'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                    <Link
                        href={`/${locale}/language/quiz/esp`}
                        aria-label={`/${locale}/language/quiz/esp`}
                        className={styles.link}
                        onClick={() => handleSubmit('esp')}
                    >
                        <Image
                            src={ImagePaths.LANGUAGE.spanishURL.default.src}
                            alt='spanish'
                            // priority
                            className={styles.language}
                            width={0}
                            height={0}
                            sizes="100vw"
                            draggable="false"
                            loading="lazy"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Home