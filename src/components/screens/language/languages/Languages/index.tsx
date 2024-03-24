"use client"

import Link from 'next/link';
import Image from 'next/image';

// import { useLocale, useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { getLanguageImagetoLocale } from '@/lib/constants/index'
import { Pages } from '@/lib/constants/pages';

import styles from './styles.module.sass'


interface RootProps {
    locale: string
};


export default function Languages({ locale }: Readonly<RootProps>) {
    const english = getLanguageImagetoLocale(locale, 'english')
    const german = getLanguageImagetoLocale(locale, 'german')
    const chinese = getLanguageImagetoLocale(locale, 'chinese')
    const french = getLanguageImagetoLocale(locale, 'french')
    const italian = getLanguageImagetoLocale(locale, 'italian')
    const russian = getLanguageImagetoLocale(locale, 'russian')
    const spanish = getLanguageImagetoLocale(locale, 'spanish')

    return (
        <div className={styles.container}>
            <Container>
                <div className={styles.gallery_one}>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_ENGLISH}`} aria-label='english' className={styles.link}>
                        <Image
                            src={english.default.src}
                            alt='english'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_GERMAN}`} aria-label='german' className={styles.link}>
                        <Image
                            src={german.default.src}
                            alt='german'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_CHINESE}`} aria-label='chinese' className={styles.link}>
                        <Image
                            src={chinese.default.src}
                            alt='chinese'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_FRENCH}`} aria-label='french' className={styles.link}>
                        <Image
                            src={french.default.src}
                            alt='french'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                </div>
                <div className={styles.gallery_two}>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_ITALIAN}`} aria-label='italian' className={styles.link}>
                        <Image
                            src={italian.default.src}
                            alt='italian'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_RUSSIAN}`} aria-label='russian' className={styles.link}>
                        <Image
                            src={russian.default.src}
                            alt='russian'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                    <Link href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${Pages.LANGUAGE_SPANISH}`} aria-label='spanish' className={styles.link}>
                        <Image
                            src={spanish.default.src}
                            alt='spanish'
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </Link>
                </div>
            </Container>
        </div>
    );
}