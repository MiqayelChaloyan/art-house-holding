'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/components/container';

import { Pages } from '@/constants/pages';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { ABOUT_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    data: ABOUT_LANGUAGE[];
};

const Home = ({
    locale,
    data
}: Readonly<Props>) => {
    return (
        <section id='languages'>
            <Container className='container'>
                <div className={styles.languages}>
                    {data?.map((language) => {
                        const path: ImagePath = urlForImage(language?.image);
                        return (
                            <Link
                                key={language._id}
                                href={`/${locale}${Pages.LANGUAGE_LANGUAGES}/${language?.slug.current}`}
                                aria-label={language.slug.current}
                                className={styles.link}
                            >
                                <Image
                                    src={path?.src}
                                    alt={language.image?.alt}
                                    className={styles.language}
                                    width={500}
                                    height={500}
                                    priority
                                />
                            </Link>
                        )
                    })}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Home);