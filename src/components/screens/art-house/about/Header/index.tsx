'use client'

import './styles.css'
import cn from 'classnames';

import styles from './styles.module.sass'
import { IoIosArrowDown } from "react-icons/io";



const Header = () => {


  return (
    <section className={styles.box}>
      <header className="header">
        <div className="text-box">
          <h1 className="heading-primary">
            <span className="heading-primary-main">Heading Primary Main</span>
            <span className="heading-primary-sub">The secondary heading</span>
          </h1>
          <button className="btn-animated">
          <IoIosArrowDown size={40} color='white'/>
          </button>
        </div>
      </header>
    </section>
  )
};

export default Header;