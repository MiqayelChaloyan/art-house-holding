'use client'

import { memo } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import FormAppointment from '@/components/components/forms';
import FormHeader from '@/components/components/form-header';

import { Inter } from '@/lib/constants/font';

import { EDUCATIONAL_CENTER_COURSES, HOSTS, LESSONS } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './style.module.sass';


interface Props {
    course: EDUCATIONAL_CENTER_COURSES[]
    socialData: HOSTS
    lessons: LESSONS[]
    lessonsArmenian: LESSONS[]
};

const group = {
    ['margin']: '5px',
};

const About = ({
    course,
    socialData,
    lessons,
    lessonsArmenian
}: Props) => {
    const { about_us_content } = course[0] as any;
    const content = about_us_content.length <= 1000 ? about_us_content : about_us_content.slice(0, 1000) + '...';
    const t = useTranslations();

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{t('sections.about-courses')}</h1>
                <div className={styles.about_us}>
                    <div className={styles.about_box}>
                        <p className={Inter.className}>{content}</p>
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

export default memo(About);