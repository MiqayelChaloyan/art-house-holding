'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SwiperSlide } from 'swiper/react';

import FlatList from '@/components/components/flat-list';

import useWindowSize from '@/hooks/useWindowSize';

import Checkmark from '@/lib/icons/design/Checkmark';
import PortfolioImageCard from '@/lib/ui/portfolio-card';
import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { COURSE } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  locale: string;
  course: COURSE;
};

interface BoxProps {
  guide: string;
  iconSize: number;
};

const Box = ({ guide, iconSize }: Readonly<BoxProps>) => (
  <div className={cn(styles.hex)}>
    <Checkmark width={20} height={18} fill='#FFFFFF' />
    <p className={cn(styles['our-advantages'], Arial.className)}>{guide}</p>
  </div>);


const Course = ({ locale, course }: Readonly<Props>) => {
  const { gallery_of_course, course_name, conditions, guides, name, portfolios } = course;
  const latestProjects = portfolios?.slice(Math.max(portfolios.length - 4, 0)) ?? [];
  const [index, setIndex] = useState<number>(0);
  const windoSize = useWindowSize();
  const t = useTranslations();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % gallery_of_course.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  const gallery = gallery_of_course?.map((image, imageIndex) => {
    const path: UrlType | any = urlForImage(image);

    return (
      <Image
        key={image._key}
        priority
        src={path?.src}
        height={500}
        width={500}
        alt={image.alt}
        className={cn(styles['design-image'], index === imageIndex ? styles.active : styles.next)}
      />
    )
  });

  const terms = conditions?.map((condition: string, conditionIndex: number) =>
    <div key={conditionIndex} className={styles.term}>
      <li className={cn(styles.condition, Arial.className)}>{condition}</li>
    </div>);

  const roadbook = guides?.map((guide: string, guideIndex: number) =>
    <Box key={guideIndex} guide={guide} iconSize={windoSize.width} />);

  const { desktopCards, mobileCards } = latestProjects.reduce((acc, project) => {
    const desktopCard = (
      <PortfolioImageCard
        key={project._key}
        course_name={course_name}
        project={project}
        slug={course.slug}
        type='portfolios'
      />
    );

    const mobileCard = (
      <SwiperSlide key={project._key}>
        <PortfolioImageCard
          course_name={course_name}
          project={project}
          slug={course.slug}
          type='portfolios'
        />
      </SwiperSlide>
    );

    acc.desktopCards.push(desktopCard);
    acc.mobileCards.push(mobileCard);

    return acc;
  }, { desktopCards: [] as JSX.Element[], mobileCards: [] as JSX.Element[] });

  return (
    <section id='course' className={styles.container}>
      <div className={styles.line} />
      <div className={styles.course}>
        <div className={styles.left}>
          <figure>
            {gallery}
          </figure>
        </div>
        <div className={styles.right}>
          <div className={styles.titles}>
            <h2 className={cn(styles['design-title-top'], Arial.className)}>{name}</h2>
            <div className={styles['design-corner-large-right']}>
              <h1 className={cn(styles['design-title'], Arial.className)}>
                {course_name}
              </h1>
            </div>
            <h1 className={cn(styles['design-title-mobile'], Arial.className)}>
              {course_name}
            </h1>
          </div>
          <div className={styles.conditions}>
            <ul className={styles.list}>
              {terms}
            </ul>
          </div>
        </div>
      </div>
      <div>
        {roadbook}
      </div>
      <div className={styles.porfolio}>
        <div className={styles['section-titles']}>
          <h2 className={cn(styles['title-back'], Arial.className)}>PORTFOLIOS</h2>
          <h2 className={cn(styles['title-portfolio'], Arial.className)}>{t('sections.portfolios')}</h2>
        </div>
        {windoSize.width <= 768 ? (
          <div className={styles.projects}>
            <FlatList list={mobileCards} />
          </div>
        ) : (
          <div className={styles.projects}>
            {desktopCards}
          </div>
        )}
        <div className={styles.button}>
          <Link
            href={{
              pathname: `/${locale}${Pages.DESIGN_PORTFOLIOS}`,
              query: { name },
            }}
            className={cn(styles.link, Arial.className)}
          >
            {t('buttons.view-all')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Course);