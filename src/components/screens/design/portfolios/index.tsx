'use client'

import Header from './Header';
import Portfolios from './Portfolios';

import { COURSE } from '../../../../../sanity/sanity-queries/design';


interface Props {
    courses: COURSE[];
    data: any;
};

const Home = ({
    courses,
    data
}: Readonly<Props>) => (
    <div>
        <Header data={data} />
        <Portfolios courses={courses} />
    </div>
);

export default Home;