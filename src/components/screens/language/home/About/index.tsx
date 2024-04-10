'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/components/components/container';

import { Arial, Calibri } from '@/lib/constants/font';
import blocksToText from '@/lib/utils/BlocksToText';
import { Pages } from '@/lib/constants/pages';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { ABOUT_US_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
    data: ABOUT_US_LANGUAGE | any
    locale: string
}

interface Image {
    _type: string,
    alt: string,
    _key: string,
    asset: { _ref: string, _type: string }
}


const About = ({ data, locale }: Props) => {
    const t = useTranslations();

    const content: string = blocksToText(data[0].about_us.content).slice(0, 900);

    const gallery: any = data[0].about_us?.about_us_images?.map((item: Image, index: number) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(item);

        const result: string = path.src;

        return (
            <Image
                key={index}
                src={result}
                alt={item.alt}
                priority
                className={styles.image}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                quality={50}
            />
        );
    });


    return (
        <div className={styles.container}>
            <Container>
                <div className={styles.about}>
                    <div className={styles.column}>
                        <h1 className={`${styles.title} ${Arial.className} ${Arial.className}`}>
                            {t('sections.about')}
                        </h1>
                        <p className={`${styles.text} ${Calibri.className}`}>
                            {content}...
                        </p>
                        <div className={styles.buttons}>
                            <Link
                                href={`/${locale}${Pages.LANGUAGE_HOME}${Pages.LANGUAGE_SEND_REQUEST}`}
                                prefetch={true}
                                className={cn(
                                    styles.button,
                                    Arial.className,
                                    styles.send_btn
                                )}
                            >
                                {t('texts.send-request')}
                            </Link>
                            <Link
                                href={`/${locale}${Pages.LANGUAGE_HOME}${Pages.LANGUAGE_ABOUT}`}
                                prefetch={true}
                                className={cn(
                                    styles.button,
                                    Arial.className,
                                    styles.more_btn
                                )}
                            >
                                {t('texts.more')}
                            </Link>
                        </div>
                    </div>
                    <div className={styles.gallery}>
                        <div className={styles.gallery_one}>
                            {gallery[0]}
                        </div>
                        <div className={styles.gallery_two}>
                            {gallery[1]}
                        </div>
                        <div className={styles.gallery_three}>
                            {gallery[2]}
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
};

export default About;