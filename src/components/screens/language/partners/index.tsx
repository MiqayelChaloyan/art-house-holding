'use client'

import { useTranslations } from 'next-intl';

import { Arial, Vrdznagir } from '@/lib/constants/font';

import Container from '@/components/components/container';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { PARTNERS } from '../../../../../sanity/sanity-queries/generic';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
    partners: PARTNERS[]
};

const Partners = ({ partners }: Props) => {
    const t = useTranslations('navigation');

    const result = partners?.map((partner: PARTNERS | any, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(partner.logo);

        return (
            <div key={partner._id} className={styles.card}>
                <img src={path.src} alt={partner.logo.alt} className={styles.img} />
                <div className={styles.overlay}>
                    <h1 className={cn(styles['text-h1'], Arial.className)}>{partner.company_name}</h1>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.cooperation}
                    </p>
                    <p className={cn(styles['text-p'], Arial.className)}>
                        {partner.implemented_projects}
                    </p>
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