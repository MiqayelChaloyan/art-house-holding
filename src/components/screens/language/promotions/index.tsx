'use client'

import Image from "next/image";

import { urlForImage } from "../../../../../sanity/imageUrlBuilder";

import { DISCOUNTS_LANGUAGE } from "../../../../../sanity/sanity-queries/language";

import styles from './styles.module.sass'


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

    const promotions = column.map((item: Image[], index: number) => {
        return (
            <div className={styles.column} key={index}>
                {item.map((discount: Image, index: number) => {

                    const path: {
                        src: string;
                        width: number;
                        height: number;
                    } | any = urlForImage(discount.discount);

                    const result: string = path.src;

                    return (
                        <Image
                            key={index}
                            src={result}
                            alt={discount.alt}
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    )
                })}
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