"use client"

import { FC, memo } from 'react';

import Container from '@/components/components/container';

import Player from '@/lib/ui/video-player';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


type Props = {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


const CookingCourses: FC<Props> = ({ data }) => {
    const path: {
        src: string;
        width: any;
        height: any;
    } | any = urlForImage(data[0].cooking_courses[0].video_light)
        // .auto('format')
        // .fit('max')
        // .url();

    return (
        <section id='video-player' className={styles.container}>
            <div className={styles.triangle} />
            <Container>
                <h1 className={styles.title}>{data[0].cooking_courses[0].video_section_title}</h1>
                <div className={styles.video_player}>
                    <Player light={path?.src} path={data[0].cooking_courses[0].video_url} />
                </div>
            </Container>
        </section>
    );
};

export default memo(CookingCourses);

