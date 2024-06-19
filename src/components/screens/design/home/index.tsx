'use client'

import React from 'react';

import Main from './Main';
import Courses from './Courses';
import OurDay from './OurDay';
import OurTeam from './OurTeam';
import Partners from './Partners';
import Progress from './Progress';

import { DESIGN } from '../../../../../sanity/sanity-queries/design';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';


interface Props {
    data: DESIGN[];
    partners: PARTNER[];
    locale: string;
};

const Home = ({
    data,
    partners,
    locale,
}: Readonly<Props>) => (
    <>
        <Main data={data[0].main_section} />
        <Courses courses={data[0].courses} />
        <OurDay our_day={data[0].our_day} />
        <Progress data={data[0].progress_section} />
        <OurTeam data={data[0].workers} />
        <Partners data={partners}/>
    </>
);

export default React.memo(Home);