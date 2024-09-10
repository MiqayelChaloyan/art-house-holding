'use client'

import React, { useMemo } from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { Inter } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: PROGRESS[];
};

const Progress = ({ data }: Readonly<Props>) => {
    const items = useMemo(() => data.map((item: PROGRESS) => (
        <div key={item._key} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} isPlusSign={item.isPlusSign} />
            <p className={cn(styles.title, Inter.className)}>
                {item.title}
            </p>
        </div>
    )), [data]);

    return (
        <section id='circle-progress' className={styles.container}>
            <Container className='container'>
                <div className={styles.row}>
                    {items}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Progress);
