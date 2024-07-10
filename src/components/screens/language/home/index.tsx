'use client'

import React from 'react';

import Main from './Main';
import About from './About';
import Promotions from './Promotions';
import OurDailyLife from './OurDailyLife';
import Partners from './Partners';

import { ABOUT_US_LANGUAGE, DISCOUNT } from '../../../../../sanity/sanity-queries/language';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';


interface Props {
    data: ABOUT_US_LANGUAGE[];
    discounts: DISCOUNT[];
    partners: PARTNER[];
    locale: string;
};

const Home = ({
    data,
    discounts,
    partners,
    locale
}: Readonly<Props>) => (
    <div>
        <Main />
        <About data={data} locale={locale} />
        <Promotions discounts={discounts} />
        <OurDailyLife locale={locale} data={data} />
        <Partners partners={partners} />
    </div>
);

export default React.memo(Home);