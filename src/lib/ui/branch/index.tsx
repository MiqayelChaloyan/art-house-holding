'use client'

import React from 'react';

import Link from 'next/link';

import { ArianAMU } from '@/lib/constants/font';

import { urlForImage } from '../../../../sanity/imageUrlBuilder';
import { BRANCH } from '../../../../sanity/sanity-queries/art-house';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    item: BRANCH;
    locale: string;
};

const Branch = ({
    item,
    locale
}: Readonly<Props>) => {
    const { company_name, words, web_site_url, website_logo_front, website_logo_back } = item;

    const urlForImageFront = urlForImage(website_logo_front);
    const urlForImageBack = urlForImage(website_logo_back);

    const wordsArray = words.split(' ');

    const titlesFront =
        wordsArray?.map((word: string, index: number) =>
            <p key={index} className={cn(styles.title_front, ArianAMU.className)}>
                {word}
            </p>);

    const titlesBack =
        wordsArray?.map((word: string, index: number) =>
            <p key={index} className={cn(styles.title_back, ArianAMU.className)}>
                {word}
            </p>);

    return (
        <Link href={`/${locale}/${web_site_url}`} aria-label={web_site_url} id='card'>
            <div className={styles.card_container}>
                <div className={styles.card}>
                    <div className={styles.front}>
                        <div className={styles.logo_front}>
                            <img
                                src={urlForImageFront?.src}
                                alt={company_name}
                                className={styles.logo}
                                loading='eager'
                            />
                        </div>
                        <div className={styles.words}>
                            <p className={cn(styles.title_front, ArianAMU.className)}>
                                {company_name}
                            </p>
                            {titlesFront}
                        </div>
                    </div>
                    <div className={styles.back}>
                        <div className={styles.logo_back}>
                            <img
                                src={urlForImageBack?.src}
                                alt={company_name}
                                className={styles.logo}
                                loading='eager'
                            />
                        </div>
                        <div className={styles.words}>
                            <p className={cn(styles.title_back, ArianAMU.className)}>
                                {company_name}
                            </p>
                            {titlesBack}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(Branch);

