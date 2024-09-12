// 'use client'

// import React, { useCallback, useEffect, useState } from 'react';

// import Link from 'next/link';
// import { usePathname, useSearchParams } from 'next/navigation';
// import { useLocale, useTranslations } from 'next-intl';

// import Gallery from '@/components/components/gallery';
// import { Arial } from '@/constants/font';
// import { Titles } from '@/constants';

// import cn from 'classnames';

// import styles from './styles.module.sass';


// interface Props {
//   courses: COURSES_DESIGN_QUERYResult[];
// };

// const defaultSearchParam = 'All';

// const Portfolios = ({ courses }: Readonly<Props>) => {
//   const t = useTranslations();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const property: string | null = searchParams.get('name');
//   const [allCourses, setAllCourses] = useState<COURSES_DESIGN_QUERYResult | any>(courses);
//   const [category, setCategory] = useState<COURSE[]>([]);

//   const activeLocale = useLocale(); //

//   useEffect(() => {
//     const filteredCourses = property && property !== defaultSearchParam
//       ? allCourses?.filter((elem: COURSE) => elem.name === property)
//       : allCourses;
//     setCategory(filteredCourses);
//   }, [property, courses]);

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       params.set(name, value);
//       return params.toString();
//     },
//     [searchParams]
//   );

//   const navbar: React.JSX.Element[] = allCourses?.map(({ course_name, _id, name }: COURSE) => (
//     <Link
//       key={_id}
//       href={`${activeLocale}/design/portfolios?${createQueryString('name', name)}`}
//       scroll={false}
//       className={cn(styles.link, styles.line, property === name ? styles.active : '', Arial.className)}
//     >
//       <span>{course_name}</span>
//     </Link>
//   ));

//   console.log(pathname)

//   return (
//     <section id='portfolio' className={styles.container}>
//       <div className={styles.navigation}>
//         <Link
//           href={`${activeLocale}/design/portfolios?${createQueryString('name', defaultSearchParam)}`}
//           scroll={false}
//           className={cn(styles.link, styles.line, !property || property === defaultSearchParam ? styles.active : '', Arial.className)}
//         >
//           <span>{t('buttons.view-all')}</span>
//         </Link>
//         {navbar}
//       </div>
//       <div className={styles.titles}>
//         <div>
//           <div className={cn(styles['title-line'], styles['back-line'])} />
//           <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.portfolio}</h2>
//         </div>
//         <div className={styles['bottom-title']}>
//           <h1 className={cn(styles.title, Arial.className)}>{t('navigation.portfolios')}</h1>
//           <div className={cn(styles['title-line'], styles['bottom-line'])} />
//         </div>
//       </div>
//       <div className={styles.gallery}>
//         {category.length === 0 ? (
//           <div className={styles.loader}>
//             <div className={styles['loader-card']} />
//           </div>
//         ) : (
//           <div className='projects'>
//             <Gallery projects={category} type='portfolios' />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default React.memo(Portfolios);









'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import Gallery from '@/components/components/gallery';
import { Arial } from '@/constants/font';
import { Pages } from '@/constants/pages';
import { Titles } from '@/constants';

import cn from 'classnames';

import styles from './styles.module.sass';


interface Props {
  courses: COURSES_DESIGN_QUERYResult[];
};

const defaultSearchParam = 'All';

const Portfolios = ({ courses }: Readonly<Props>) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const property: string | null = searchParams.get('name');
  const decodedProperty = property ? decodeURIComponent(property).replace(/_/g, ' ') : '';
  const [allCourses, _] = useState<COURSES_DESIGN_QUERYResult[]>(courses);
  const [category, setCategory] = useState<COURSES_DESIGN_QUERYResult[]>([]);

  const activeLocale = useLocale();

  useEffect(() => {
    const filteredCourses = decodedProperty && decodedProperty !== defaultSearchParam
      ? allCourses?.filter((elem: COURSES_DESIGN_QUERYResult) => elem.name === decodedProperty)
      : allCourses;
    setCategory(filteredCourses);
  }, [decodedProperty, courses]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const modifiedValue = value.replace(/ /g, '_');
      params.set(name, encodeURIComponent(modifiedValue));
      return params.toString();
    },
    [searchParams]
  );

  const navbar: React.JSX.Element[] = allCourses?.map(({ course_name, _id, name }: COURSES_DESIGN_QUERYResult) => (
    <Link
      key={_id}
      href={`/${activeLocale}${Pages.DESIGN_PORTFOLIOS}?${createQueryString('name', name)}`}
      scroll={false}
      className={cn(styles.link, styles.line, decodedProperty === name ? styles.active : '', Arial.className)}
    >
      <span>{course_name}</span>
    </Link>
  ));


  return (
    <section id='portfolio' className={styles.container}>
      <div className={styles.navigation}>
        <Link
          href={`/${activeLocale}${Pages.DESIGN_PORTFOLIOS}?${createQueryString('name', defaultSearchParam)}`}
          scroll={false}
          className={cn(styles.link, styles.line, !decodedProperty || decodedProperty === defaultSearchParam ? styles.active : '', Arial.className)}
        >
          <span>{t('buttons.view-all')}</span>
        </Link>
        {navbar}
      </div>
      <div className={styles.titles}>
        <div>
          <div className={cn(styles['title-line'], styles['back-line'])} />
          <h2 className={cn(styles['title-back'], Arial.className)}>{Titles.portfolio}</h2>
        </div>
        <div className={styles['bottom-title']}>
          <h1 className={cn(styles.title, Arial.className)}>{t('navigation.portfolios')}</h1>
          <div className={cn(styles['title-line'], styles['bottom-line'])} />
        </div>
      </div>
      <div className={styles.gallery}>
        {category.length === 0 ? (
          <div className={styles.loader}>
            <div className={styles['loader-card']} />
          </div>
        ) : (
          <div className='projects'>
            <Gallery projects={category} type='portfolios' />
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(Portfolios);
