import { memo } from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/lib/ui/Button';
import { Inter } from '@/lib/constants/font';

import styles from './styles.module.sass';


interface Props {
    url: string
    subtitle: string
    content: any
    scrollToElement: (value: number) => void
};


const SlideItem = ({ url, subtitle, content, scrollToElement }: Props) => {
    const description = content.length <= 312 ? content : content.slice(0, 313) + '...';
    const t = useTranslations('buttons');

    return (
        <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
            <div className={styles.container}>
                <div className={styles.contact}>
                    <h1 className={`${styles.title} ${Inter.className}`}>{subtitle}</h1>
                    <p className={Inter.className}>{description}</p>
                    <Button
                        className={`${styles.contact_us_button} ${Inter.className}`}
                        text={t('contact-us')}
                        onClick={scrollToElement}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(SlideItem);
