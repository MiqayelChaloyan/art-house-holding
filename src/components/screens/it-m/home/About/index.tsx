'use client'

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { ImagePaths } from '@/constants';

import Container from '@/components/components/container';
import BlocksToText from '@/utils/BlocksToText';

import { Pages } from '@/constants/pages';
import { MMArmenU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT;
};

const About = ({ data }: Readonly<Props>) => {
    const { content, title } = data;
    const activeLocale = useLocale();
    const t = useTranslations();

    const contentText: string = BlocksToText(content).slice(0, 100);

    return (
        <section id='about' className={cn(styles.container, MMArmenU.className)}>
            <Container className='container'>
                <>
                    <div className={styles.box}>
                        <div className={styles.right}>
                            <div className={styles.texts}>
                                <h1 className={styles.title}>
                                    {title}
                                </h1>
                                <p className={styles.content}>
                                    {contentText}...
                                </p>
                            </div>
                            <div className={styles['buttons-large']}>
                                <Link
                                    href={`/${activeLocale}${Pages.ITM_ABOUT}`}
                                    aria-label={Pages.ITM_CONTACT}
                                    className={cn(MMArmenU.className, styles.more)}
                                >
                                    {t('buttons.more')}
                                </Link>
                                <Link
                                    href={`/${activeLocale}${Pages.ITM_CONTACT}`}
                                    aria-label={Pages.ITM_CONTACT}
                                    className={styles.register}
                                >
                                    {t('buttons.register')}
                                </Link>
                            </div>
                        </div>
                        <div className={styles.left}>
                            <Image
                                src={ImagePaths.ITM.illustrationURL}
                                alt='illustration'
                                className={styles.image}
                                width={500}
                                height={500}
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles['buttons-small']}>
                        <Link
                            href={`/${activeLocale}${Pages.ITM_ABOUT}`}
                            aria-label={Pages.ITM_CONTACT}
                            className={cn(MMArmenU.className, styles.more)}
                        >
                            {t('buttons.more')}
                        </Link>
                        <Link
                            href={`/${activeLocale}${Pages.ITM_CONTACT}`}
                            aria-label={Pages.ITM_CONTACT}
                            className={cn(MMArmenU.className, styles.register)}
                        >
                            {t('buttons.register')}
                        </Link>
                    </div>
                </>
            </Container>
        </section>
    )
};

export default About;