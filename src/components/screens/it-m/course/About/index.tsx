'use client'

import Image from 'next/image';

import Container from '@/components/components/container';

import { MMArmenU } from '@/constants/font';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import { Image as Asset, ImagePath, TEXT } from '@/types/general';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface ABOUT_COURSE {
    title: string;
    about_content: TEXT | any;
};

interface Props {
    course: string;
    image: Asset;
    about_course: ABOUT_COURSE;
};

const About = ({
    course,
    image,
    about_course
}: Readonly<Props>) => {
    const path: ImagePath = urlForImage(image);

    return (
        <section id='about' className={MMArmenU.className}>
            <Container className='container'>
                <div>
                    <h1 className={styles.title}>
                        {course}
                    </h1>
                    <h3 className={styles.subbtitle}>
                        {about_course.title}
                    </h3>
                </div>
                <div className={styles.block}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <PortableText
                                value={about_course?.about_content}
                                components={components}
                            />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <Image
                            src={path?.src}
                            alt={image?.alt}
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default About;