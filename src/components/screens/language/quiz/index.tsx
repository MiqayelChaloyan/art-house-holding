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
            windowSize.width < 600 ? (
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
            ) : (
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