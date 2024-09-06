'use client'

import React from 'react';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Arial, Vrdznagir } from '@/constants/font';

import Container from '@/components/components/container';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';

import { UrlType } from '@/types/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    partners: PARTNER_Result[],
};

const Partners = ({ partners }: Readonly<Props>) => {
    const t = useTranslations('navigation');

    const result: JSX.Element[] = partners?.map((partner: PARTNER_Result) => {
        const path: UrlType | any = urlForImage(partner.logo);

        return (
            <div key={partner._id} className={styles.card}>
                <Image
                    src={path?.src}
                    alt={partner?.logo.alt}
                    className={styles.img}
                    width={500}
                    height={500}
                    priority
                />
                <div className={styles.overlay}>
                    <h1 className={cn(styles['text-h1'], Arial.className)}>
                        {partner.company_name}
                    </h1>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.cooperation}
                    </p>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.implemented_projects}
                    </p>
                </div>
            </div>
        )
    });

    return (
        <section id='partners' className={styles.container}>
            <Container className='container'>
                <h1 className={cn(styles.title, Vrdznagir.className)}>
                    {t('partners')}
                </h1>
                <div className={styles.partners}>
                    {result}
                </div>
            </Container>
        </section>
    )
}

export default React.memo(Partners);