'use client'

import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { Arial, Vrdznagir } from '@/lib/constants/font';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import { DISCOUNTS_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import cn from 'classnames'

import styles from './styles.module.sass';


interface Props {
    discounts: DISCOUNTS_LANGUAGE[] | any
}

interface CardProps {
    discount: DISCOUNTS_LANGUAGE | any,
    index: number
}

const Promotion = ({ discount, index }: CardProps) => {
    const aboutText = discount.about_discount.length > 150 ?
        discount.about_discount.slice(0, 150) + '...' : discount.about_discount;
    const path: { src: string, width: number, height: number } | undefined = urlForImage(discount.image);
    const transformRotate = index % 2 === 0;

    return (
        <div key={discount.slug} className={styles.discount}>
            <div
                className={cn(
                    styles.header_discount,
                    transformRotate ? styles.header_discount_start : styles.header_discount_end
                )}
            >
                <div className={styles.column}>
                    <p className={cn(
                        styles.procent,
                        transformRotate ? styles.procent_start : styles.procent_end, Arial.className
                    )}>
                        {`${discount.procent}%`}
                    </p>
                </div>
                <div className={styles.column}>
                    <img
                        src={path?.src}
                        alt={discount?.image.alt}
                        className={styles.discount_image}
                    />
                </div>
            </div>
            <div className={styles.about}>
                <p className={cn(styles.about_discount, Arial.className)}>
                    {aboutText}
                </p>
            </div>
        </div>
    )
};

const Promotions = ({ discounts }: Props) => {
    const t = useTranslations();
    const lastFour: Props[] = discounts[0]?.discounts_list.slice(-4);

    const lastDiscounts = lastFour?.map((discount: DISCOUNTS_LANGUAGE | any, index: number) => {
        return <Promotion key={discount.slug} discount={discount} index={index} />
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