"use client"

import { FC, memo } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import FormAppointment from '@/components/components/forms';
import FormHeader from '@/components/components/form-header';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './style.module.sass';


type Props = {
    course: EDUCATIONAL_CENTER_COURSES[]
};

const group = {
    ['margin']: '0',
};

const About: FC<Props> = ({ course }) => {
    const { about_us_content } = course[0] as any;
    const content = about_us_content.length <= 1000 ? about_us_content : about_us_content.slice(0, 1000) + '...';
    const t = useTranslations();

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.skew} />
            <Container>
                <h1 className={styles.title}>{t('sections.about-courses')}</h1>
                <div className={styles.about_us}>
                    <div className={styles.about_box}>
                        <p>{content}</p>
                    </div>
                    <div className={styles.form_box}>
                        <FormAppointment width='30%'>
                            <FormHeader
                                display='flex'
                                color='black'
                                justifyContent='space-around'
                                title={t('contact-us-form.title')}
                                fill='#111111'
                                group={group}
                            />
                        </FormAppointment>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default memo(About);