'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useLocale } from 'next-intl';

import Container from '@/components/components/container';

import { UrlType } from '@/types/design';

import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';

// import Triangle from '@/lib/icons/design/Triangle';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { COURSE, GALLERY } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


type Props = {
  course: COURSE,
};

const Course = ({ course }: Readonly<Props>) => {
  const { gallery_of_course, course_name, conditions, guides, name } = course;
  const [index, setIndex] = useState<number>(0);
  const localActive = useLocale();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % gallery_of_course.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  const gallery = gallery_of_course.map((item: GALLERY, itemIndex: number) => {
    const path: UrlType | any = urlForImage(item);

    return (
      <img
        key={item._key}
        className={`${styles['design-image']} ${index === itemIndex ? styles.active : styles.next}`}
        src={path?.src}
        alt={item.alt}
      />
    )
  })

  const terms = conditions.map((condition: string, conditionIndex: number) =>
    <li key={conditionIndex} className={cn(styles.condition, Arial.className)}>{condition}</li>);

  const roadbook = guides.map((guide: string, guideIndex: number) =>
    <li key={guideIndex} className={cn(styles.guide, Arial.className)}>{guide}</li>);


  return (
    <section id='course' className={styles.container}>
      <div className={styles.line} />
      <Container className='box'>
        <div className={styles.course}>
          <div className={styles.left}>
            <figure className={styles.imagesContainer}>
              {gallery}
            </figure>
          </div>
          <div className={styles.right}>
            <div className={styles.titles}>
              <h2 className={cn(styles['title-top'], Arial.className)}>{name}</h2>
              <h1 className={cn(styles.title, styles.triangle, Arial.className)}>{course_name}</h1>
            </div>
            <div className={styles.conditions}>
              <ul className={styles.list}>
                {terms}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.roadbooks}>
          <ul className={styles['list-roadbook']}>
            {roadbook}
          </ul>
        </div>
      </Container>
      <div className={styles.porfolio}>
        <div className={styles['section-titles']}>
          <h2 className={cn(styles['title-back'], Arial.className)}>PORTFOLIOS</h2>
          <h2 className={cn(styles['title-portfolio'], Arial.className)}>Պորտֆոլիոներ</h2>
        </div>
        <div>
          <Link
            href={{
              pathname: `/${localActive}${Pages.DESIGN_PORTFOLIO}`,
              query: { name },
            }}
            className={styles.link}
          >
            ԴԻՏԵԼ ԲՈԼՈՐԸ
          </Link>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Course);