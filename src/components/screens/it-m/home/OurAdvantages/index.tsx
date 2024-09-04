'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'use-intl';
import Image from 'next/image';

import { FaCheck } from 'react-icons/fa';

import Container from '@/components/components/container';

import { Pages } from '@/constants/pages';
import { MMArmenU } from '@/constants/font';
import { ImagePaths } from '@/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    advantages: string[];
};

const OurAdvantages = ({ advantages }: Readonly<Props>) => {
    const activeLocale = useLocale();
    const t = useTranslations();

    const result = advantages?.map((advantae, idnex) => (
        <div key={idnex} className={styles.feature}>
            <FaCheck size={20} color='#B2D01B' />
            <p className={styles.advantae}>{advantae}</p>
        </div>
    ));


    return (
        <section id='advantages' className={cn(styles.container, MMArmenU.className)}>
            <Container className='container'>
                <div className={styles.box}>
                    <div className={styles.right}>
                        <h2 className={styles['title-large']}>
                            {t('titles.our-advantages')}
                        </h2>
                        <div className={styles.advantages}>
                            {result}
                        </div>
                        <div className={styles.button}>
                            <Link
                                href={`/${activeLocale}${Pages.ITM_CONTACT}`}
                                aria-label={Pages.ITM_CONTACT}
                                className={styles.register}
                            >
                                {t('buttons.register-now')}
                            </Link>
                        </div>
                    </div>
                    <div className={styles.left}>
                        <h2 className={styles['title-small']}>
                            {t('titles.our-advantages')}
                        </h2>
                        <Image
                            src={ImagePaths.ITM.advantagesURL}
                            alt='advantages'
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default OurAdvantages;