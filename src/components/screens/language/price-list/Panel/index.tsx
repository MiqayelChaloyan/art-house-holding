'use client'

import React from 'react';

import { useTranslations } from 'next-intl';

// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';


type PrivateLessons = {
  three_week: string,
  two_week: string,
}

type Props = {
  slug: string,
  teaching_language: string,
  group_lessons: string,
  private_lessons: PrivateLessons,
}

type PanelProps = {
  data: Props[]
}

const Panel = ({ data }: PanelProps) => {
  const t = useTranslations();
  
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const recordPerPage = 5;
  // const lastIndex = currentPage * recordPerPage;
  // const firstIndex = lastIndex - recordPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(data.length / recordPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1)

  const tableRows: JSX.Element[] = data?.map((item: Props, index: number) => {
    return (
      <tr key={item?.slug || index}>
        <td>{item.teaching_language}</td>
        <td>{item.group_lessons}</td>
        <td>{item.private_lessons.three_week}</td>
        <td>{item.private_lessons.two_week}</td>
      </tr>
    );
  });

  // const prePage = () => {
  //   if (currentPage !== firstIndex && firstIndex !== 0) {
  //     setCurrentPage(currentPage - 1)
  //   }
  // }

  // const nextPage = () => {
  //   console.log(tableRows)
  //   if (currentPage !== lastIndex && currentPage !== tableRows.length - 2) {
  //     setCurrentPage(currentPage + 1)
  //   }
  // }

  // const changePage = (id: number) => {
  //   setCurrentPage(id)
  // }

  return (
    <div className={Arial.className}>
      <h1 className={styles.title}>{t('titles.price-list')}</h1>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th rowSpan={2} colSpan={1}>
                {t('tables-titles.languages-taught')}
              </th>
              <th rowSpan={1} colSpan={1}>
                {t('tables-titles.group-lessons')}
              </th>
              <th rowSpan={1} colSpan={2}>
                {t('tables-titles.private-lessons')}
              </th>
            </tr>
            <tr>
              <th>{t('tables-titles.three-days-week')}</th>
              <th>{t('tables-titles.three-days-week')}</th>
              <th>{t('tables-titles.two-days-week')}</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>

      {/* <div>
        <nav className={styles.pagination_nav}>
          <ul className={styles.pagination}>
            <button className={styles.page_btn} onClick={prePage}>
              <IoIosArrowBack />
            </button>
            {
              numbers.map((n, i) => (
                <li className={`${styles.page_item} ${currentPage === n ? styles.active : ''}`} key={i}>
                  <button className={styles.page_link} onClick={() => changePage(n)}>
                    {n}
                  </button>
                </li>
              ))
            }
            <button className={styles.page_btn} onClick={nextPage}>
              <IoIosArrowForward />
            </button>
          </ul>
        </nav>
      </div> */}
    </div>
  );
};

export default React.memo(Panel);