'use client'

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import Promotion from '@/lib/ui/promotion';
import { Vrdznagir } from '@/lib/constants/font';

import { DISCOUNTS_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass';


type Props = {
    discounts: DISCOUNTS_LANGUAGE[] | any
}

export default function Promotions ({ discounts }: Props) {
    const lastFour: Props[] = discounts[0]?.discounts_list.slice(-4);
    const t = useTranslations();

    const lastDiscounts = lastFour?.map((discount: DISCOUNTS_LANGUAGE | any, index: number) =>
        <Promotion key={discount.slug} discount={discount} index={index} classNameProperty='small' />)

    return (
        <section id='promotions' className={styles.section}>
            <Container>
                <h2 className={`${styles.title} ${Vrdznagir.className}`}>
                    {t('navigation.promotions')}
                </h2>
                <div className={styles.discounts}>
                    {lastDiscounts}
                </div>
            </Container>
        </section>
    )
};