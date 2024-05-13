'use client'

import Courses from './courses';
import OurDay from './our-day';
import OurTeam from './our-team';
import Partners from './partners';
import Progress from './progress';

import { DESIGN } from '../../../../../sanity/sanity-queries/design';
import { PARTNER } from '../../../../../sanity/sanity-queries/generic';


type Props = {
    data: DESIGN[],
    partners: PARTNER[],
    locale: string
};

const Home = ({
    data,
    partners,
    locale,
}: Readonly<Props>) => {
    return (
        <div>
            <div style={{ backgroundColor: 'green', height: '710px' }}></div>
            <Courses />
            <OurDay />
            <Progress data={data[0].progress_section} />
            <OurTeam />
            {/* <Partners data={partners}/> */}
        </div>
    )
};

export default Home;