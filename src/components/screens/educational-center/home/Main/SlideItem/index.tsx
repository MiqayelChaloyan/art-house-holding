import { memo } from 'react';

import { useTranslations } from 'next-intl';

import Button from '@/lib/ui/Button';
import { ArianAMU } from '@/lib/constants/font';

import styles from './styles.module.sass';


type Props = {
    url: string
    subtitle: string
    content: any
    alt: string
    scrollToElement: (value: number) => void
};


const SlideItem: React.FC<Props> = ({ url, alt, subtitle, content, scrollToElement }) => {
    const t = useTranslations();
    const description = content.length <= 312 ? content : content.slice(0, 313) + '...';

    return (
        <div className={styles.emplay_slide} style={{ backgroundImage: `url(${url})` }}>
        <div className={styles.box}>
            <div className={styles.contact}>
                <h1 className={`${styles.title} ${ArianAMU.className}`}>{subtitle}</h1>
                <p className={ArianAMU.className}>{description}</p>
                <Button
                    className={`${styles.contact_btn} ${ArianAMU.className}`}
                    text={t('buttons.contact-us')}
                    onClick={scrollToElement}
                />
            </div>
        </div>
    </div>
    );
};

export default memo(SlideItem);
