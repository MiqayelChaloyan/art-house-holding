'use client'

import React from 'react';

import Container from '@/components/components/container';
import { Inter, Arial } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    url: string,
    title: string,
    content: string,
};

const SlideItem = ({
    url,
    title,
    content
}: Readonly<Props>) => (
    <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
        <div className={styles.container}>
            <Container className='container'>
                <div className={styles.contact}>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {title}
                    </h1>
                    <p className={Arial.className}>{content}</p>
                </div>
            </Container>
        </div>
    </div>
);

export default React.memo(SlideItem);