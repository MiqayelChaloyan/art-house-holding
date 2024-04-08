"use client"

import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/components/container';

import { getLanguageImagetoLocale } from '@/lib/constants/index'
import { Pages } from '@/lib/constants/pages';

import styles from './styles.module.sass'


interface RootProps {
    locale: string
};


type LanguageProps = {
    src: string,
    alt: string,
    page: string,
    label: string
};

interface LanguageGalleryProps {
    locale: string
    images: any
};


const LanguageGallery = ({ locale, images }: Readonly<LanguageGalleryProps>) => {
    return (
        <div className={styles.gallery}>
            {images.map((image: LanguageProps, index: number) => (
                <Link key={index} href={`/${locale}${Pages.LANGUAGE_LANGUAGES}${image.page}`} aria-label={image.label} className={styles.link}>
                    <Image
                        src={image.src}
                        alt={`${index}-image`}
                        priority
                        className={styles.language}
                        width={0}
                        height={0}
                        sizes="100vw"
                        // loading="eager"
                        // quality={50}
                    />
                </Link>
            ))}
        </div>
    );
};


const Languages = ({ locale }: Readonly<RootProps>) => {
    const english = getLanguageImagetoLocale(locale, 'english')
    const german = getLanguageImagetoLocale(locale, 'german')
    const chinese = getLanguageImagetoLocale(locale, 'chinese')
    const french = getLanguageImagetoLocale(locale, 'french')
    const italian = getLanguageImagetoLocale(locale, 'italian')
    const russian = getLanguageImagetoLocale(locale, 'russian')
    const spanish = getLanguageImagetoLocale(locale, 'spanish')

    const images = [
        { src: english.default.src, alt: 'english', page: Pages.LANGUAGE_ENGLISH, label: 'english' },
        { src: german.default.src, alt: 'german', page: Pages.LANGUAGE_GERMAN, label: 'german' },
        { src: chinese.default.src, alt: 'chinese', page: Pages.LANGUAGE_CHINESE, label: 'chinese' },
        { src: french.default.src, alt: 'french', page: Pages.LANGUAGE_FRENCH, label: 'french' },
        { src: italian.default.src, alt: 'italian', page: Pages.LANGUAGE_ITALIAN, label: 'italian' },
        { src: russian.default.src, alt: 'russian', page: Pages.LANGUAGE_RUSSIAN, label: 'russian' },
        { src: spanish.default.src, alt: 'spanish', page: Pages.LANGUAGE_SPANISH, label: 'spanish' }
    ];

    return (
        <section id='language' className={styles.container}>
            <Container>
                <LanguageGallery locale={locale} images={images.slice(0, 4)} />
                <LanguageGallery locale={locale} images={images.slice(4, 7)} />
            </Container>
        </section>
    );
}

export default Languages;