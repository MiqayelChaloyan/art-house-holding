'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Pages } from '@/lib/constants/pages';
import { Arial, ArianAMU } from '@/lib/constants/font';

import useWindowSize from '@/hooks/useWindowSize';

import { QUIZ } from '../../../../../sanity/sanity-queries/language';
import { urlForImage } from "../../../../../sanity/imageUrlBuilder";

import { UrlType, Quiz } from '@/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: QUIZ[],
    locale: string
}

const Home = ({ data, locale }: Props) => {
    const t = useTranslations('texts');
    const windowSize = useWindowSize();

    const links: JSX.Element[] = data?.map((lang: Quiz | any) => {
        const path: UrlType | any = urlForImage(lang.question_logo);

        return locale && windowSize.width < 600 ? (
            <Link
                href={`/${locale}${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                aria-label={`${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                className={styles.row}
                key={lang.slug}
            >
                <Image
                    src={path?.src}
                    alt={lang.question_logo.alt}
                    className={styles.language}
                    width={500}
                    height={500}
                    priority
                />
                <h3 className={cn(styles.language_name, ArianAMU.className)}>
                    {lang.name}
                </h3>
            </Link>
        ) : (
            <Link
                key={lang.slug}
                href={`/${locale}${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                aria-label={`${Pages.LANGUAGE_QUIZ}/${lang.slug}`}
                className={styles.link}
            >
                <Image
                    src={path?.src}
                    alt={lang.question_logo.alt}
                    className={styles.language}
                    width={500}
                    height={500}
                    priority
                />
            </Link>
        )
    });

    return (
        <section id='quiz'>
            <h1 className={cn(styles.title, Arial.className)}>
                {t('select-language')}
            </h1>
            <div className={styles.href}>
                {links}
            </div>
        </section>
    )
};

export default React.memo(Home);