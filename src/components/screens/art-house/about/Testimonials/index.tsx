'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useTranslations } from 'next-intl';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import Testimonial from './Testimonial';
import { options } from './options';

import { ArianAMU } from '@/src/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  our_rating: OUR_RATING[];
};

const Testimonials = ({ our_rating }: Readonly<Props>) => {
  const t = useTranslations('sections');

  return (
    <section className={styles.testimonials}>
      <h1 className={cn(styles.title, ArianAMU.className)}>
        {t('rating')}
      </h1>
      <div className={styles.testimonial}>
        <Swiper {...options}>
          {our_rating?.map((review: OUR_RATING) => (
            <SwiperSlide key={review?._key}>
              <Testimonial review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cn('swiper-button-next', styles['nav-btn'])}>
          <MdKeyboardArrowRight color='white' size={20} />
        </div>
        <div className={cn('swiper-button-prev', styles['nav-btn'])}>
          <MdKeyboardArrowLeft color='white' size={20} />
        </div>
        <div className='swiper-pagination' />
      </div>
    </section>
  );
};

export default Testimonials;