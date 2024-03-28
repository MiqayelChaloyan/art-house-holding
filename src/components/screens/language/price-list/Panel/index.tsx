import React, { memo, useState } from 'react';

// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';


interface PrivateLessons {
  three_week: string;
  two_week: string;
}

interface Props {
  slug: string;
  teaching_language: string;
  group_lessons: string;
  private_lessons: PrivateLessons;
}

interface PanelProps {
  data: Props[];
}

const Panel: React.FC<PanelProps> = ({ data }) => {
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const recordPerPage = 5;
  // const lastIndex = currentPage * recordPerPage;
  // const firstIndex = lastIndex - recordPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  // const npage = Math.ceil(data.length / recordPerPage);
  // const numbers = [...Array(npage + 1).keys()].slice(1)

  const tableRows = data?.map((item: Props, index: number) => {
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
      <h1 className={styles.title}>Գնացուցակ</h1>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th rowSpan={2} colSpan={1}>
                Դասավանդվող {'\n'} լեզուներ
              </th>
              <th rowSpan={1} colSpan={1}>
                Խմբային դասեր {'\n'} 1 ամսվա արժեք
              </th>
              <th rowSpan={1} colSpan={2}>
                Անհատական դասեր {'\n'} 1 ամսվա արժեք
              </th>
            </tr>
            <tr>
              <th>Շաբաթական 3 օր</th>
              <th>Շաբաթական 3 օր</th>
              <th>Շաբաթական 2 օր</th>
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

export default memo(Panel);