"use client"

import { FC, memo } from 'react';

import Container from '@/components/components/container';

import ProgressItem from '@/lib/ui/progress';
import { ArianAMU } from '@/lib/constants/font';

import { ART_HOUSE_HOME } from '../../../../../sanity/sanity-queries/art-house';

import styles from './styles.module.sass';


type Props = {
    data: ART_HOUSE_HOME[]
};


const Progress: FC<Props> = ({ data }) => {
    const uploadProgress = data?.slice(0, 4);
    
    const items: JSX.Element[] = uploadProgress?.map((item: any) => (
        <div key={item.slug} className={styles.column}>
            <ProgressItem value={0} quantity={item.quantity} />
            <p className={`${styles.title} ${ArianAMU.className}`}>{item.title}</p>
        </div>
    ));


    return (
        <div id='circle-progress' className={styles.container}>
            <Container>
                <div className={styles.row}>
                    {items}
                </div>
            </Container>
        </div>
    );
};

export default memo(Progress);
