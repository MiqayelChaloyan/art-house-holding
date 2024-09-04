'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import Container from '@/components/components/container';

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import { Pages } from '@/constants/pages';
import { MMArmenU } from '@/constants/font';

import { ImagePaths } from '@/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    content: any;
};

const Learn = ({ content }: Readonly<Props>) => {
    const activeLocale = useLocale();
    const t = useTranslations();

    return (
        <section id='programming' className={cn(styles.container, MMArmenU.className)}>
            <Container className='container'>
                <div className={styles.box}>
                    <div className={styles.left}>
                        <h2 className={styles['title-small']}>
                            {t('titles.what-to-learn')}
                        </h2>
                        <Image
                            src={ImagePaths.ITM.learnURL}
                            alt='learn'
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles['title-large']}>
                            {t('titles.what-to-learn')}
                        </h2>
                        <div className={styles.possibilities}>
                            <div className={styles.content}>
                                <PortableText
                                    value={content}
                                    components={components}
                                />
                            </div>
                        </div>

                        <div className={styles.button}>
                            <Link
                                href={`/${activeLocale}${Pages.ITM_COURSES}`}
                                aria-label={Pages.ITM_COURSES}
                                className={styles['courses-btn']}
                            >
                                {t('buttons.courses')}
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
};

export default Learn;