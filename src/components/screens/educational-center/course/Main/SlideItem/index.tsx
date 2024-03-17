import { memo } from 'react';

import Container from '@/components/components/container';

import styles from './styles.module.sass';


type Props = {
    url: string;
    title: string;
    content: any;
    alt: string;
};

const SlideItem: React.FC<Props> = ({ url, title, content, alt }) => (
    <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
        <div className={styles.box}>
            <Container>
                <div className={styles.contact}>
                    <h1 className={styles.title}>{title}</h1>
                    <p>{content}</p>
                </div>
            </Container>
        </div>
    </div>
);

export default memo(SlideItem);