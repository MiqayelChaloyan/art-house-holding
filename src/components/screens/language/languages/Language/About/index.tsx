'use client'

import React from 'react';

import Image from 'next/image';

import components from '@/lib/utils/PortableTextComponents';
import { PortableText } from '@portabletext/react';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import { UrlType, ABOUT } from '@/types/language';

import styles from './styles.module.sass';


const About = ({ image, text }: Readonly<ABOUT>) => {
    const language: UrlType | any = urlForImage(image);

    return (
        <div className={styles.row_one}>
            <div className={styles.left_side}>
                <Image
                    src={language?.src}
                    alt={image?.alt}
                    className={styles.image}
                    width={500}
                    height={500}
                    priority
                />
            </div>
            <div className={styles.right_side}>
                <PortableText
                    value={text}
                    components={components}
                />
            </div>
        </div>
    )
};

export default React.memo(About);