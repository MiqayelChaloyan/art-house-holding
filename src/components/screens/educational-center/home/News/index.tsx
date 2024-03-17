"use client"
import { FC, memo } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Courses from './Courses';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type Props = {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


const News: FC<Props> = ({ data }) => {
    const newsItems = data[0].news_section.slice(0, 3);
    const t = useTranslations('sections');

    return (
        <section id='cooking-courses' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{t('news')}</h1>
                <div className={styles.cooking_courses}>
                    <Courses data={newsItems} />
                </div>
            </Container>
        </section>
    );
};

export default memo(News);