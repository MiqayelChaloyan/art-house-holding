'use client'

import React from 'react';

import About from './About';
import Teachers from './Teachers';
import Gallery from './Gallery';

import Player from '@/lib/ui/video-player';

import Container from '@/components/components/container';

import { ABOUT_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { UrlType } from '@/types/language';

import styles from './styles.module.sass';


type Props = {
    data: ABOUT_LANGUAGE
    locale: string
};

const Language = ({ locale, data }: Props) => {
    const { during_courses_images, course_process, teachers } = data;
    const path: UrlType | any = urlForImage(course_process.video_light);

    return (
        <Container>
            <section id='language' className={styles.container}>
                <About
                    image={data.image}
                    text={data.text}
                />
                <Gallery during_courses={during_courses_images} />
                <div className={styles.row_three}>
                    <div className={styles.video_player}>
                        <Player
                            light={path?.src}
                            path={course_process.video_url}
                        />
                    </div>
                </div>
                <Teachers teachers={teachers} />
            </section>
        </Container>
    );
};

export default React.memo(Language);