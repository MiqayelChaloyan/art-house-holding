'use client'

import { memo } from 'react';

import Container from '@/components/components/container';

import { Arial, Vrdznagir } from '@/lib/constants/font';
import ArrowLeft from '@/lib/icons/language/ArrowLeft';
import ArrowRight from '@/lib/icons/language/ArrowRight';

// slick-carousel 
import Slider from 'react-slick';

// slick-carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PARTNERS } from '../../../../../../sanity/sanity-queries/generic';

import styles from './styles.module.sass';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';
import Image from 'next/image';
import useWindowSize from '@/hooks/useWindowSize';
import { useTranslations } from 'next-intl';
import cn from 'classnames';


const SampleNextArrow = ({ onClick, fill }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_right}`} onClick={onClick}>
        <ArrowRight width='21' height='50' fill={fill} />
    </div>
);

const SamplePrevArrow = ({ onClick, fill }: any) => (
    <div className={`${styles.arrow} ${styles.arrow_left}`} onClick={onClick}>
        <ArrowLeft width='21' height='50' fill={fill} />
    </div>
);

interface Props {
    partners: PARTNERS[]
}

const Partner = ({ partner }: PARTNERS | any) => {
    const path: { src: string, width: number, height: number } | any = urlForImage(partner?.logo);
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
}

const Partners = ({ partners }: Props) => {
    const t = useTranslations('navigation');
    const windowSize = useWindowSize();

    const slidesItems = partners.map((partner: PARTNERS | any, index: number) => <Partner partner={partner} key={index} />);

    const settings = {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: false,
        // autoplaySpeed: 5000,
        dots: false,
        nextArrow: <SampleNextArrow fill={windowSize.width > 1024 ? '#006ED2' : '#fff'} />,
        prevArrow: <SamplePrevArrow fill={windowSize.width > 1024 ? '#006ED2' : '#fff'} />,
        cssEase: 'ease-out',
        centerMode: true,
        centerPadding: "0",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    centerPadding: "5px",
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    centerPadding: "5px",
                }
            }
        ]
    };


    return (
        <section id='partners' className={styles.section}>
            <Container>
                <h2 className={`${styles.title} ${Vrdznagir.className}`}>{t('partners')}</h2>
                <div className={styles.slider}>
                    <Slider {...settings}>
                        {slidesItems}
                    </Slider>
                </div>
            </Container>
        </section>
    );
};

export default memo(Partners);


