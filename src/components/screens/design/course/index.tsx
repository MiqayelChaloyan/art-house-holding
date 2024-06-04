'use client'

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

// import { Pages } from '@/lib/constants/pages';
import { Arial } from '@/lib/constants/font';
import Checkmark from '@/lib/icons/design/Checkmark';

import useWindowSize from '@/hooks/useWindowSize';

import { UrlType } from '@/types/design';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';
import { COURSE, GALLERY } from '../../../../../sanity/sanity-queries/design';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  locale: string,
  course: COURSE,
};

interface BoxProps {
  guide: string,
  iconSize: number,
};

const Box = ({ guide, iconSize }: BoxProps) => (
  <div className={cn(styles.hex)}>
    <Checkmark width={20} height={18} fill='#FFFFFF' />
    <p className={cn(styles['our-advantages'], Arial.className)}>{guide}</p>
  </div>);


const Course = ({ locale, course }: Readonly<Props>) => {
  const { gallery_of_course, course_name, conditions, guides, name } = course;
  const [index, setIndex] = useState<number>(0);
  const windoSize = useWindowSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % gallery_of_course.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index]);

  const gallery = gallery_of_course?.map((image, imageIndex) => {
    const path: UrlType | any = urlForImage(image);

    return (
      <div
        key={image._key}
        className={cn(styles['design-image'], index === imageIndex ? styles.active : styles.next)}
        style={{ backgroundImage: `url(${path?.src})` }} />
    )
  });

  const terms = conditions?.map((condition: string, conditionIndex: number) =>
    <div key={conditionIndex} className={styles.term}>
      <div className={styles.dote} />
      <li className={cn(styles.condition, Arial.className)}>{condition}</li>
    </div>);

  const roadbook = guides?.map((guide: string, guideIndex: number) =>
    <Box key={guideIndex} guide={guide} iconSize={windoSize.width} />);

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
          <h2 className={cn(styles['title-portfolio'], Arial.className)}>Պորտֆոլիոներ</h2>
        </div>
        <div style={{ backgroundColor: 'green', height: '700px', margin: '50px auto' }}></div>
        {/* <div>
          <Link
            href={{
              pathname: `/${localActive}${Pages.DESIGN_PORTFOLIO}`,
              query: { name },
            }}
            className={styles.link}
          >
            ԴԻՏԵԼ ԲՈԼՈՐԸ
          </Link>
        </div> */}
      </div>
    </section>
  );
}

export default React.memo(Course);