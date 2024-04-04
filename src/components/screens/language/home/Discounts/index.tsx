"use client"

import Container from "@/components/components/container";


import styles from './styles.module.sass'
import { Vrdznagir } from "@/lib/constants/font";
import { DISCOUNTS_LANGUAGE } from "../../../../../../sanity/sanity-queries/language";
import Image from "next/image";
import { urlForImage } from "../../../../../../sanity/imageUrlBuilder";
import { useTranslations } from "next-intl";


interface Props {
    discounts: DISCOUNTS_LANGUAGE[]
}

interface Image {
    discount: {
        alt: string;
        _type: string
        asset: { _ref: string, _type: string }
    }
}


const Discounts = ({ discounts }: Props) => {
    const t = useTranslations();

    const lastFour = discounts[0]?.discounts_list.slice(-4);

    const lastDiscounts = lastFour.map((item: Image, index: number) => {

        const path: {
            src: string;
            width: number;
            height: number;
        } | any = urlForImage(item.discount);

        const result: string = path.src;

        return (
            <Image
                key={index}
                src={result}
                alt={item.discount?.alt}
                priority
                className={styles.discount}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                quality={50}
            />
        )
    })


    return (
        <section className={styles.section}>
            <Container>
                <h2 className={`${styles.title} ${Vrdznagir.className}`}>
                {t('navigation.discounts')}
                </h2>
                <div className={styles.discounts}>
                    {lastDiscounts}
                </div>
            </Container>
        </section>
    )
};

export default Discounts;