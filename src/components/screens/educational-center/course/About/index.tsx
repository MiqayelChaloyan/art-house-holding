'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import FormAppointment from '@/components/components/forms';
import FormHeader from '@/components/components/form-header';

import { Arial, Inter } from '@/lib/constants/font';

import { Content as ContentType, UrlType } from '@/types/educational-center';

import { EDUCATIONAL_CENTER_COURSES, HOSTS, LESSONS } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './style.module.sass';
import Button from '@/lib/ui/Button';


interface Props {
    course: EDUCATIONAL_CENTER_COURSES[]
    socialData: HOSTS
    lessons: LESSONS[]
    lessonsArmenian: LESSONS[]
};

const group = {
    ['margin']: '5px',
};

const Content = ({ content, isReadMore, minimumHeight }: ContentType) => (
    <p className={cn(styles.content, Inter.className)}>{isReadMore ? content.slice(0, minimumHeight) + '...' : content}</p>
);

const About = ({
    course,
    socialData,
    lessons,
    lessonsArmenian
}: Props) => {
    const { about_us_content } = course[0] as EDUCATIONAL_CENTER_COURSES;
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const minimumHeight = 1000;

    const t = useTranslations();

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{t('sections.about-courses')}</h1>
                <div className={styles.about_us}>
                    <div className={styles.about_box}>
                        <Content content={about_us_content} isReadMore={isReadMore} minimumHeight={minimumHeight} />
                        <Button
                            text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                            className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                            onClick={toggleReadMore}
                        />
                    </div>
                    <div className={styles.form_box}>
                        <FormAppointment width='30%' lessons={lessons} lessonsArmenian={lessonsArmenian}>
                            <FormHeader
                                display='flex'
                                color='black'
                                justifyContent='center'
                                alignItems='self-end'
                                title={t('contact-us-form.title')}
                                fill='#111111'
                                group={group}
                                social_links={socialData?.social_links}
                            />
                        </FormAppointment>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(About);