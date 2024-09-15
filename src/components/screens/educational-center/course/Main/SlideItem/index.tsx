'use client'

import React from 'react';

import Container from '@/components/components/container';
import { Inter, Arial } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    url: string;
    title: string;
};

const SlideItem = ({ url, title }: Readonly<Props>) => (
    <div className={styles.article} style={{ backgroundImage: `url(${url})` }}>
        <div className={styles.container}>
            <Container className='container'>
                <div className={styles.contact}>
                    <h1 className={cn(styles.title, Inter.className)}>
                        {title}
                    </h1>
                </div>
            </Container>
        </div>
    </div>
);

export default React.memo(SlideItem);