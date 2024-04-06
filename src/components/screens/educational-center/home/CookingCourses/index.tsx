'use client'

import { memo } from 'react';

import Container from '@/components/components/container';

import Player from '@/lib/ui/video-player';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


interface Props {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


const CookingCourses = ({ data }: Props) => {
    const path: { src: string, width: number, height: number } | any = urlForImage(data[0].cooking_courses.video_light)


    return (
        <section id='video-player' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{data[0].cooking_courses.video_section_title}</h1>
                <div className={styles.video_player}>
                    <Player light={path?.src} path={data[0].cooking_courses.video_url} />
                </div>
            </Container>
        </section>
    );
};

export default memo(CookingCourses);

