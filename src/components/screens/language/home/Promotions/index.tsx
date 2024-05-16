'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Promotion from '@/lib/ui/promotion';
import { Vrdznagir } from '@/lib/constants/font';

import { DISCOUNT } from '../../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    discounts: DISCOUNT[]
}

const Promotions = ({ discounts }: Props) => {
    const lastFour: DISCOUNT[] = discounts[0]?.discounts_list.slice(-4);
    const t = useTranslations();

    return (
        <section id='promotions' className={styles.section}>
            <Container className='container'>
                <h2 className={cn(styles.title, Vrdznagir.className)}>
                    {t('navigation.promotions')}
                </h2>
                <div className={styles.discounts}>
                    {lastFour?.map((discount: DISCOUNT, index: number) =>
                        <Promotion
                            key={discount?._key}
                            discount={discount}
                            index={index}
                            classNameProperty='small'
                        />)
                    }
                </div>
            </Container>
        </section>
    )
};

export default React.memo(Promotions);