'use client'

import React from 'react';

import Image from 'next/image';

import components from '@/lib/utils/PortableTextComponents';
import { PortableText } from '@portabletext/react';

import { Arial } from '@/lib/constants/font';
import { ABOUT } from '@/types/language';
import { ImagePath } from '@/types/general';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import cn from 'classnames';

import styles from './styles.module.sass';


const About = ({
    image,
    text
}: Readonly<ABOUT>) => {
    const language: ImagePath = urlForImage(image);

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
            <div className={cn(styles.right_side, Arial.className)}>
                <PortableText
                    value={text}
                    components={components}
                />
            </div>
        </div>
    )
};

export default React.memo(About);