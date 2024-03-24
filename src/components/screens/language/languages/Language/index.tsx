"use client"

import { PortableText } from '@portabletext/react'

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import components from '@/lib/utils/PortableTextComponents';
import { getLanguageImagetoLocale } from '@/lib/constants/index'

import Container from '@/components/components/container';

import { ABOUT_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';

import { urlFor } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass'

import Player from '@/lib/ui/video-player';

interface RootProps {
    data: ABOUT_LANGUAGE
    locale: string
};

interface Image {
    _type: string;
    alt: string;
    _key: string;
    asset: {
        _ref: string;
        _type: string;
    };
}

const renderImages = (images: Image[], type: string) => {
    return images.map((image: Image, index: number) => {
        const path = urlFor(image)
            .auto('format')
            .fit('max')
            .url();

        let className;

        if (type === 'odd') {
            className = index % 2 !== 0 ? styles.high_altitude_picture : styles.low_altitude_picture;

        } else {
            className = index % 2 === 0 ? styles.high_altitude_picture : styles.low_altitude_picture;
        }

        return (
            <Image
                key={image._key}
                src={path}
                alt={image?.alt}
                priority
                className={className}
                width={0}
                height={0}
                sizes="100vw"
                loading="eager"
                quality={50}
            />
        );
    });
};




export default function Language({ locale, data }: Readonly<RootProps>) {
    // const t = useTranslations('navigation');
    const pathname = usePathname();
    const slug = pathname?.split('/').pop() as string;

    const language = getLanguageImagetoLocale(locale, slug)

    const { during_courses_images, course_process, teachers } = data;

    const one = during_courses_images.slice(0, 3);
    const two = during_courses_images.slice(3, 6);

    const urlForImage = urlFor(course_process.video_light)
        .auto('format')
        .fit('max')
        .url();

    const teachersRow = teachers.map((item: any) => {
        const urlForPath = urlFor(item.teacher_image)
            .auto('format')
            .fit('max')
            .url();

        return (
            <div key={item.slug.current} className={styles.teacher_column}>
                <Image
                    src={urlForPath}
                    alt={item.teacher_image.alt}
                    priority
                    className={styles.teacher}
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="eager"
                    quality={50}
                />
                <div className={styles.fullName}>
                    <h2>{item.fullName}</h2>
                </div>
            </div>
        )

    })


    return (
        <Container>
            <div>
                <div className={styles.row_one}>
                    <div className={styles.left_side}>
                        <Image
                            src={language.default.src}
                            alt={slug}
                            priority
                            className={styles.image}
                            width={0}
                            height={0}
                            sizes="100vw"
                            loading="eager"
                            quality={50}
                        />
                    </div>
                    <div className={styles.right_side}>
                        <PortableText
                            value={data.text}
                            components={components}
                        />
                    </div>
                </div>
                <div className={styles.row_two}>
                    <div className={styles.gallery_row_one}>
                        {renderImages(one, 'odd')}
                    </div>
                    <div className={styles.gallery_row_two}>
                        {renderImages(two, 'even')}
                    </div>
                </div>
                <div className={styles.row_three}>
                    <div className={styles.video_player}>
                        <Player light={urlForImage} path={course_process.video_url} />
                    </div>
                </div>

                <div className={styles.row_four}>
                    {teachersRow}
                </div>
            </div>
        </Container>
    );
}