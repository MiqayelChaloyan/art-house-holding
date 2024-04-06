'use client'

import { memo } from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { ArianAMU } from '@/lib/constants/font';

import { ART_HOUSE_HOME } from '../../../../../sanity/sanity-queries/art-house';

import styles from './styles.module.sass';


type Props = {
    data: ART_HOUSE_HOME[] | any
};

type Progress = {
    title?: string
    slug?: string
    quantity?: number
}

const Progress = ({ data }: Props) => {

    const items: JSX.Element[] = data?.progress_section.map((item: Progress) => (
        <div key={item.slug} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} />
            <p className={`${styles.title} ${ArianAMU.className}`}>{item.title}</p>
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

export default memo(Progress);
