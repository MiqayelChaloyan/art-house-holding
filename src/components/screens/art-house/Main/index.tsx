"use client"

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';
import { ArianAMU } from '@/lib/constants/font';

import styles from './styles.module.sass';


const Main = () => {
    const t = useTranslations('texts');  

    return (
        <div id='about' className={styles.header}>
            <Container>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.watch} />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.art_house_logo} />
                        <p className={`${styles.text} ${ArianAMU.className}`}>
                            {t('main-title')}
                        </p>
                    </div>
                    <div className={styles.column}>
                        <div className={styles.flash_light} />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Main;