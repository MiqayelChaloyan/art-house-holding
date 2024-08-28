'use client'

import React, { useState } from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import FormAppointment from '@/components/components/form-educational';

import Button from '@/lib/ui/Button';
import { Arial, Inter } from '@/constants/font';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';
import { flattenText, getTotalTextLength, truncateText } from '@/utils/ArrayMaxItems';

import { Content as ContentType } from '@/types/educational-center';

import { COURSES, HOSTS, LESSON } from '../../../../../../sanity/sanity-queries/educational-center';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    course: COURSES;
    socialData: HOSTS;
    lessons: LESSON[];
    lessonsArmenian: LESSON[];
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
    const minimumHeight = 500;

    const toggleReadMore = () => setIsReadMore(!isReadMore);

    return (
        <section id='about-us' className={styles.container}>
            <div className={styles.triangle} />
            <Container className='container'>
                <h1 className={cn(styles.title, Inter.className)}>
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
                        <FormAppointment
                            social_links={socialData?.social_links}
                            lessons={lessons}
                            lessonsArmenian={lessonsArmenian}
                            theme={colors.black}
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default React.memo(About);