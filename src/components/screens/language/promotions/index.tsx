'use client'

import Promotion from '@/lib/ui/promotion';

import { DISCOUNTS_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


interface Props {
    data: DISCOUNTS_LANGUAGE[]
}

interface Image {
    alt: string;
    discount: {
        _type: string,
        asset: { _ref: string, _type: string }
    }
}

const Promotions = ({ data }: Props) => {
    const promotions = data[0]?.discounts_list.map((discount: any, index: number) =>
        <Promotion key={discount.slug} discount={discount} index={index} classNameProperty='large' />);

    return (
        <div>
            <div className={styles.discounts}>
                {promotions}
            </div>
        </div>
    )
};

export default Promotions;