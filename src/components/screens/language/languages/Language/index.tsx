"use client"

import { memo, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { PortableText } from '@portabletext/react'

import Player from '@/lib/ui/video-player';
import components from '@/lib/utils/PortableTextComponents';
import { getLanguageImagetoLocale } from '@/lib/constants/index'

import Container from '@/components/components/container';

import useWindowSize from '@/hooks/useWindowSize';

import { ABOUT_LANGUAGE } from '../../../../../../sanity/sanity-queries/language';
import { urlFor } from '../../../../../../sanity/imageUrlBuilder';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './styles.module.sass'


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

const SampleNextArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_right}`} onClick={onClick}>
        <SlArrowRight />
    </div>
);

const SamplePrevArrow = ({ onClick }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_left}`} onClick={onClick}>
        <SlArrowLeft />
    </div>
);

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


const Language = ({ locale, data }: Readonly<RootProps>) => {
    const [slideIndex, setSlideIndex] = useState<number>(0);

    const windowSize = useWindowSize();
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
                    alt={item?.teacher_image.alt}
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


    const slider = during_courses_images.map((image: Image, index: number) => {
        const path = urlFor(image)
            .auto('format')
            .fit('max')
            .url();

        return (
            <div
                key={index}
                className={index === slideIndex ? `${styles.slide} ${styles.slide_active}` : styles.slide}
            >
                <Image
                    key={image?._key}
                    src={path}
                    alt={image?.alt}
                    priority
                    className={styles.low_altitude_picture}
                    width={0}
                    height={0}
                    sizes="100vw"
                    loading="eager"
                    quality={50}
                />
            </div>
        )
    });


    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 2000,
        dots: false,
        beforeChange: (current: any, next: any) => setSlideIndex(next),
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        cssEase: 'ease-out',
    }


    return (
        <Container>
            <section id='language' className={styles.container}>
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
                    {
                        windowSize.width > 768 ?
                            <>
                                <div className={styles.gallery_row_one}>
                                    {renderImages(one, 'odd')}
                                </div>
                                <div className={styles.gallery_row_two}>
                                    {renderImages(two, 'even')}
                                </div>
                            </>
                            :
                            <Slider {...settings}>
                                {...slider}
                            </Slider>
                    }
                </div>

                <div className={styles.row_three}>
                    <div className={styles.video_player}>
                        <Player light={urlForImage} path={course_process.video_url} />
                    </div>
                </div>

                <div className={styles.row_four}>
                    {teachersRow}
                </div>
            </section>
        </Container>
    );
}

export default memo(Language);