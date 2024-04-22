'use client'

import Image from 'next/image';

import components from '@/lib/utils/PortableTextComponents';
import { PortableText } from '@portabletext/react';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const About = ({image, text, slug}: any) => {
    const language: { src: string, width: number, height: number } | any = urlForImage(image);

    return (
        <div className={styles.row_one}>
            <div className={styles.left_side}>
                <Image
                    src={language.src}
                    alt={slug}
                    priority
                    className={styles.image}
                    width={0}
                    height={0}
                    sizes='100vw'
                    // loading="eager"
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

export default About;