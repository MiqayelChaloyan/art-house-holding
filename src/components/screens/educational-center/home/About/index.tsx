
'use client'

import { memo } from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { ImagePaths } from '@/lib/constants';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';
import { Inter } from '@/lib/constants/font';


interface Props  {
    data: EDUCATIONAL_CENTER_DEFAULT[]
}


const About = ({ data }: Props) => {
    const { about_us_content } = data[0];
    const t = useTranslations('sections');

    const content = about_us_content.length <= 1000 ?
        about_us_content : about_us_content.slice(0, 1000) + '...';

    return (
        <section id='about-us' className={styles.about}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={`${styles.title} ${Inter.className}`}>{t('about')}</h1>
                <div className={styles.about_us}>
                    <div className={styles.box}>
                        <p className={Inter.className}>{content}</p>
                    </div>
                    <div className={styles.box}>
                        <Image
                            src={ImagePaths.ART_EDUCATIONAL_CENTER.aboutUsURL}
                            alt='courses'
                            priority
                            className={styles.image_courses}
                            width={0}
                            height={0}
                            sizes='100vw'
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default memo(About);