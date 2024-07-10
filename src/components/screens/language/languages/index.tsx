'use client'

import React, { useMemo } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/components/container';

import { Pages } from '@/lib/constants/pages';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { ABOUT_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


interface Props {
    locale: string;
    data: ABOUT_LANGUAGE[];
};

interface LanguageProps {
    _id: string;
    path: ImagePath;
    page: string;
};

const Home = ({
    locale,
    data
}: Readonly<Props>) => {
    const images = useMemo(() => {
        return data?.map((language) => ({
            _id: language._id,
            path: language.image,
            page: language.slug.current,
        }));
    }, [data]);

    return (
        <section id='languages'>
            <Container className='container'>
                <div className={styles.languages}>
                    {images?.map((image: LanguageProps) => {
                        const path: ImagePath = urlForImage(image?.path);
                        return (
                            <Link
                                key={image._id}
                                href={`/${locale}${Pages.LANGUAGE_LANGUAGES}/${image.page}`}
                                aria-label={image.page}
                                className={styles.link}
                            >
                                <Image
                                    src={path?.src}
                                    alt={image?.path.alt}
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