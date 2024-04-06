import { memo } from 'react';

import Container from '@/components/components/container';
import { Inter } from '@/lib/constants/font';

import styles from './styles.module.sass';


interface Props {
    url: string;
    title: string;
    content: any;
};

const SlideItem = ({ url, title, content }: Props) => (
    <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
        <div className={styles.container}>
            <Container>
                <div className={styles.contact}>
                    <h1 className={`${styles.title} ${Inter.className}`}>{title}</h1>
                    <p className={Inter.className}>{content}</p>
                </div>
            </Container>
        </div>
    </div>
);

export default memo(SlideItem);