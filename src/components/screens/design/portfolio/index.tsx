'use client'

import Header from './Header';
import Portfolios from './Portfolios';

import { COURSE } from '../../../../../sanity/sanity-queries/design';

type Props = {
    courses: COURSE[],
};


const Home = ({ courses }: Readonly<Props>) => {

    return (
        <div>
            {/* <Header /> */}
            <Portfolios courses={courses}/>
        </div>
    )
}

export default Home;