'use client'

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { ImagePaths } from '@/lib/constants';
import { Inter } from '@/lib/constants/font';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
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
                <h1 className={cn(styles.title, Inter.className)}>
                    {t('about')}
                </h1>
                <div className={styles.about_us}>
                    <div className={styles.box}>
                        <p className={Inter.className}>
                            {content}
                        </p>
                    </div>
                    <div className={styles.box}>
                        <Image
                            src={ImagePaths.ART_EDUCATIONAL_CENTER.aboutUsURL}
                            alt='courses'
                            className={styles.image_courses}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(About);