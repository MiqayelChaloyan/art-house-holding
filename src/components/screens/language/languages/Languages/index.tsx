'use client'

import Link from 'next/link';
import Image from 'next/image';

import { Pages } from '@/lib/constants/pages';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type LanguageProps = {
    path: string,
    page: string,
};

type LanguageGalleryProps = {
    locale: string
    images: any
};

const LanguageGallery = ({ locale, images }: LanguageGalleryProps) => {
    return (
        <div className={styles.gallery}>
            {images.map((image: LanguageProps, index: number) => {
                const path: { src: string, width: number, height: number } | any = urlForImage(image?.path);

                return (
                    <Link key={index} href={`/${locale}${Pages.LANGUAGE_LANGUAGES}/${image.page}`} aria-label={image.page} className={styles.link}>
                        <Image
                            src={path?.src}
                            alt={image?.page}
                            // priority
                            height={0}
                            width={0}
                            className={styles.language}
                            sizes='100vh'
                            loading="eager"
                        />
                    </Link>
                )

            })}
        </div>
    );
};

export default LanguageGallery;