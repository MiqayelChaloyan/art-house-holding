'use client'

import { useTranslations } from 'next-intl';
import { PARTNERS } from '../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';
import { Inter, Vrdznagir } from '@/lib/constants/font';
import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import Image from 'next/image';
import Container from '@/components/components/container';

type Props = {
    partners: PARTNERS[]
};

const Partners = ({ partners }: Props) => {
    const t = useTranslations('navigation');

    const result = partners?.map((partner: PARTNERS | any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(partner.logo);

        return (
            <div key={partner._id} className={styles.partner}>
                <div className={styles.image_container}>
                    <img src={path?.src} className={styles.image} />
                </div>
                <div className={styles.img_overlay}>
                    <p className={`${styles.text} ${Inter.className}`}>{partner.company_name}</p>
                    <p className={`${styles.text} ${Inter.className}`}>{partner.cooperation}</p>
                    <p className={`${styles.text} ${Inter.className}`}>{partner.implemented_projects}</p>
                </div>
            </div>
        )
    })

    return (
        <section id='partners' className={styles.container}>
            <Container>
                <h1 className={`${styles.title} ${Vrdznagir.className}`}>{t('partners')}</h1>

                <div className={styles.partners}>
                    {result}
                </div>
            </Container>
        </section>
    )
}

export default Partners;