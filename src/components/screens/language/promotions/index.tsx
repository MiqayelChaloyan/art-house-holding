'use client'

import React from 'react';

import Promotion from '@/lib/ui/promotion';

import { DISCOUNTS_LANGUAGE, DISCOUNT } from '../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


type Props = {
    data: DISCOUNTS_LANGUAGE[]
};

const Promotions = ({ data }: Readonly<Props>) => {
    const promotions: JSX.Element[] = data[0]?.discounts_list.map((discount: DISCOUNT, index: number) =>
        <Promotion key={discount._key} discount={discount} index={index} classNameProperty='large' />);

    return (
        <section id='promotions'>
            <div className={styles.discounts}>
                {promotions}
            </div>
        </section>
    )
};

export default React.memo(Promotions);