'use client'

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT;
};

const AboutUs = ({ data }: Readonly<Props>) => {
    const { content, title } = data;

    return (
        <section id='about-us'>
            <h1>{title}</h1>
            <div className={styles.content}>
                <PortableText
                    value={content}
                    components={components}
                />
            </div>
        </section>
    )
};

export default AboutUs;