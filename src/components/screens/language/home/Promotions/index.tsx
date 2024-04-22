'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Promotion from '@/lib/ui/promotion';
import { Vrdznagir } from '@/lib/constants/font';

import { DISCOUNTS_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    discounts: DISCOUNTS_LANGUAGE[]
}

const Promotions = ({ discounts }: Props) => {
    const lastFour: DISCOUNTS_LANGUAGE[] = discounts[0]?.discounts_list.slice(-4);
    const t = useTranslations();

    return (
        <section id='promotions' className={styles.section}>
            <Container>
                <h2 className={cn(styles.title, Vrdznagir.className)}>
                    {t('navigation.promotions')}
                </h2>
                <div className={styles.discounts}>
                    {lastFour?.map((discount: DISCOUNTS_LANGUAGE, index: number) =>
                        <Promotion
                            key={discount.slug}
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