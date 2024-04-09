'use client'


import Main from './Main';
import About from './About';
import Promotions from './Promotions';
import OurDailyLife from './OurDailyLife';


import styles from './styles.module.sass'
import Partners from './Partners';
import React from 'react';
import { ABOUT_US_LANGUAGE, DISCOUNTS_LANGUAGE } from '../../../../../sanity/sanity-queries/language';


interface Props {
    data: ABOUT_US_LANGUAGE[];
    discounts: DISCOUNTS_LANGUAGE[]
    locale: string
}


const Home = ({ data, discounts, locale }: Props) => {
    // const { about_us } = data[0]

    return (
        <div className={styles.container}>
            <Main />
            <About data={data} locale={locale}/>
            <Promotions discounts={discounts}/>
            <OurDailyLife  locale={locale} data={data}/>
            {/* <Partners /> */}
        </div>
    );
}


export default Home;
