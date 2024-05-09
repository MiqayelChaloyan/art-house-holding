'use client'

import React from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { Inter } from '@/lib/constants/font';

import { PROGRESS } from '../../../../../../sanity/sanity-queries/educational-center';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: PROGRESS[]
};

const Progress = ({ data }: Props) => {

    const items = data?.map((item: PROGRESS) => (
        <div key={item._key} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} />
            <p className={cn(styles.title, Inter.className)}>
                {item.title}
            </p>
        </div>
    ));

    return (
        <section id='circle-progress' className={styles.container}>
            <Container>
                <div className={styles.row}>
                    {items}
                </div>
            </Container>
        </section>
    );
};

export default React.memo(Progress);
