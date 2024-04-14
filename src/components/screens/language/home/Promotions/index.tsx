'use client'

import { useTranslations } from "next-intl";

import Container from "@/components/components/container";

import { Vrdznagir } from "@/lib/constants/font";
import Promotion from "@/lib/ui/promotion";

import { DISCOUNTS_LANGUAGE } from "../../../../../../sanity/sanity-queries/language";

import styles from './styles.module.sass';


interface Props {
    discounts: DISCOUNTS_LANGUAGE[] | any
}

const Promotions = ({ discounts }: Props) => {
    const t = useTranslations();
    const lastFour: Props[] = discounts[0]?.discounts_list.slice(-4);

    const lastDiscounts = lastFour?.map((discount: any, index: number) => {
        return <Promotion key={discount.slug} discount={discount} index={index}/>
    })

    return (
        <section className={styles.section}>
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

export default Promotions;