'use client'

import About from './About';
import Programming from './Programming';
import OurAdvantages from './OurAdvantages';
import Learn from './Learn';


interface Props {
    about: ABOUT_US_DETAILS_QUERYResult;
    data: HOME_DETALIS_QUERYResult;
};

const Home = ({ about, data }: Readonly<Props>) => {
    console.log(data)
    return (
        <>
            <About data={about.about_us}/>
            <Programming />
            <OurAdvantages/>
            <Learn/>
            <div style={{ backgroundColor: 'green', height: '500px' }}>
                partners
            </div>
        </>
    )
};

export default Home;