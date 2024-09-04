'use client'

import Image from 'next/image';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import { ImagePaths } from '@/constants';
import { MMArmenU } from '@/constants/font';

import styles from './styles.module.sass';
import Container from '@/components/components/container';


interface Props {
    data: ABOUT;
};

const AboutUs = ({ data }: Readonly<Props>) => {
    const { content, title } = data;

    return (
        <section id='about-us' className={MMArmenU.className}>
            <Container className='container'>
            <div className={styles.block}>
                <div className={styles.right}>
                    <h1 className={styles.title}>
                        {title}
                    </h1>
                    <div className={styles.content}>
                        <PortableText
                            value={content}
                            components={components}
                        />
                    </div>
                </div>
                <div className={styles.left}>
                    <Image
                        src={ImagePaths.ITM.illustrationURL}
                        alt='illustration'
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

export default AboutUs;