

'use client'

import React from 'react';

import { Arial } from '@/lib/constants/font';

// import { PRICE_LIST } from '../../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';
import { PortableText } from '@portabletext/react';
import components from '@/lib/utils/PortableTextComponents';
import Vector from '@/lib/icons/design/Vector'

type Props = {
    informatie: any
    our_advantages: any
}


const Box = ({ advantages }: any) => (
    <div className={cn(styles.hex, styles['gradient-bg'])}>
        <Vector width={68.42} height={38.07} fill='#FFFFFF' />
        <p className={cn(styles['our-advantages'], Arial.className)}>{advantages}</p>
    </div>
)

const Promotions = ({ informatie, our_advantages }: Readonly<Props>) => {

    const advantages = our_advantages.map((elem: any, index: number) => <Box key={index} advantages={elem} />)

    return (
        <section id='promotions' className={styles.container}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>PROMOTIONS</h2>
                <h1 className={cn(styles.title, Arial.className)}>ԱԿՑԻԱՆԵՐ</h1>
            </div>
            <div className={cn(styles.informatie, Arial.className)}>
                <PortableText
                    value={informatie}
                    components={components}
                />
            </div>

            <div className={styles.advantages}>
                {advantages}
            </div>
        </section>
    )
};

export default Promotions;