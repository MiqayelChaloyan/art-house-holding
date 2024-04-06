'use client'

import { memo } from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { Inter } from '@/lib/constants/font';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';

import styles from './styles.module.sass';


interface Props {
    data: EDUCATIONAL_CENTER_DEFAULT[]
};


const Progress = ({ data }: Props) => {
    const uploadProgress = data[0].progress_section;

    const items = uploadProgress.map((item: any) => {
        return (
            <div key={item.slug} className={styles.column}>
                <ProgressItem value={0} quantity={item.quantity} />
                <p className={`${styles.title} ${Inter.className}`}>{item.title}</p>
            </div>
        );
    });

    
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

export default memo(Progress);
