'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import FormAppointment from '@/components/components/form-educational';
import FormHeader from '@/components/components/form-header';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/lib/constants/font';

import { PortableText } from '@portabletext/react';
import components from '@/lib/utils/PortableTextComponents';
import { flattenText, getTotalTextLength, truncateText } from '@/lib/utils/ArrayMaxItems';

import { Content as ContentType } from '@/types/educational-center';

import { COURSES, HOSTS, LESSON } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: COURSES
    socialData: HOSTS
    lessons: LESSON[]
    lessonsArmenian: LESSON[]
};

const group = {
    ['margin']: '5px',
};


const Content = ({ content, isReadMore, minimumHeight }: ContentType) => {
    const flatText = flattenText(content);
    const text = isReadMore && flatText.length > minimumHeight
        ? truncateText(content, minimumHeight)
        : content;

    return (
        <div className={cn(styles.content, Inter.className)}>
            <PortableText
                value={text}
                components={components}
            />
        </div>
    );
};

const About = ({
    course: { about_us_content },
    socialData,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const [isReadMore, setIsReadMore] = useState<boolean>(true);
    const t = useTranslations();
    const minimumHeight = 900;

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Arial.className)}>
                    {t('sections.about-courses')}
                </h1>
                <div className={styles.about_us}>
                    <div className={styles.about_box}>
                        {getTotalTextLength(about_us_content) > minimumHeight ?
                            <>
                                <Content
                                    content={about_us_content}
                                    isReadMore={isReadMore}
                                    minimumHeight={minimumHeight}
                                />
                                <Button
                                    text={isReadMore ? t('buttons.view-more') : t('buttons.show-less')}
                                    className={cn(styles.button, styles['view-more-btn'], Arial.className)}
                                    onClick={toggleReadMore}
                                />
                            </>
                            :
                            <div className={cn(styles.content, Inter.className)}>
                                <PortableText
                                    value={about_us_content}
                                    components={components}
                                />
                            </div>
                        }
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