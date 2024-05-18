'use client'

import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Pages } from '@/lib/constants/pages';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { UrlType } from '@/types/language';

import { ImageType } from '../../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


type LanguageProps = {
    path: ImageType,
    page: string,
};

type LanguageGalleryProps = {
    locale: string,
    images: LanguageProps[]
};

const LanguageGallery = ({ locale, images }: Readonly<LanguageGalleryProps>) => {
    return (
        <div className={styles.gallery}>
            {images.map((image: LanguageProps, index: number) => {
                const path: UrlType | any = urlForImage(image?.path);

                return (
                    <Link
                        key={index}
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
    );
};

export default React.memo(LanguageGallery);