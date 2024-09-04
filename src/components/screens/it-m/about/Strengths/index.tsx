'use client'

import { PortableText } from '@portabletext/react';
import components from '@/utils/PortableTextComponents';

import Container from '@/components/components/container';
import ImageBlock from './Image';

import { MMArmenU } from '@/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: STRENGTHS[];
};

const Strengths = ({ data }: Readonly<Props>) => {
    const strengths = data?.map((strength, index) => (
        <div key={strength._key} className={cn(strength.showImage ? styles.block : styles['full-block'])}>
            <div className={cn(strength.showImage ? styles.right : styles['full'], data.length - 1 === index && styles['last-element'])}>
                <h1 className={styles.title}>
                    {strength.title}
                </h1>
                <div className={styles.content}>
                    <PortableText
                        value={strength.content}
                        components={components}
                    />
                </div>
            </div>
            {strength?.showImage && strength?.image &&
                (<div className={styles.left}>
                    <ImageBlock image={strength?.image} />
                </div>)}
        </div>
    ))

    return (
        <section id='strengths'>
            <Container className='container'>
                <div className={cn(styles.section, MMArmenU.className)}>
                    {strengths}
                </div>
            </Container>
        </section>
    )
};

export default Strengths;