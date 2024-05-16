'use client'

import React from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { ArianAMU } from '@/lib/constants/font';

import { PROGRESS } from '../../../../../sanity/sanity-queries/art-house';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    data: PROGRESS[]
};

const Progress = ({ data }: Readonly<Props>) => {

    const items: JSX.Element[] = data?.map((item: PROGRESS) => (
        <div key={item._key} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} />
            <p className={cn(styles.title, ArianAMU.className)}>
                {item.title}
            </p>
        </div>
    ));

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
