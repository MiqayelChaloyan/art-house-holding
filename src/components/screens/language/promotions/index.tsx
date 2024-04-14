'use client'

import Image from "next/image";

import { urlForImage } from "../../../../../sanity/imageUrlBuilder";

import { DISCOUNTS_LANGUAGE } from "../../../../../sanity/sanity-queries/language";

import styles from './styles.module.sass'
import Promotion from "@/lib/ui/promotion";


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

    const separateArray = (array: any, size: number) => {
        return Array.from({ length: Math.ceil(array?.length / size) }, (_, index) =>
            array?.slice(index * size, index * size + size)
        );
    };

    const column = separateArray(data[0].discounts_list, 2);

    const promotions = column.map((item: DISCOUNTS_LANGUAGE[], index: number) => {
        return (
            <div className={styles.column} key={index}>
                {item.map((discount: any, index: number) => <Promotion key={discount.slug} discount={discount} index={index} />)}
            </div>
        )
    });


    return (
        <div>
            <div className={styles.discounts}>
                {promotions}
            </div>
        </div>
    )
};

export default Promotions;