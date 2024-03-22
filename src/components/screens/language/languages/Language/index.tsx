"use client"

import { PortableText } from '@portabletext/react'

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import components from '@/lib/utils/PortableTextComponents';
import { getLanguageImagetoLocale } from '@/lib/constants/index'

import Container from '@/components/components/container';

import { ABOUT_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import styles from './styles.module.sass'


interface RootProps {
    data: ABOUT_LANGUAGE
    locale: string
};


export default function Language({ locale, data }: Readonly<RootProps>) {
    // const t = useTranslations('navigation');
    const pathname = usePathname();
    const slug = pathname?.split('/').pop() as string;

    const language = getLanguageImagetoLocale(locale, slug)

    return (
        <Container>
            <div>
                <div className={styles.block}>
                    <div className={styles.row_1}>
                        <Image
                            src={language.default.src}
                            alt={slug}
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                        />
                    </div>
                    <div className={styles.row_2}>
                        <PortableText
                            value={data.text}
                            components={components}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
}