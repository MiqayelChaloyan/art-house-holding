'use client'

import React from 'react';

import Promotion from '@/lib/ui/promotion';

import { DISCOUNTS_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


type Props = {
    data: DISCOUNTS_LANGUAGE[]
}

const Promotions = ({ data }: Props) => {
    const promotions: JSX.Element[] = data[0]?.discounts_list.map((discount: DISCOUNTS_LANGUAGE, index: number) =>
        <Promotion key={discount.slug} discount={discount} index={index} classNameProperty='large' />);

    return (
        <section id='promotions'>
            <div className={styles.discounts}>
                {promotions}
            </div>
        </section>
    )
};

export default React.memo(Promotions);