'use client'

import About from './About';
import Programming from './Programming';
import OurAdvantages from './OurAdvantages';
import Learn from './Learn';


const Home = () => {
    return (
        <>
            <About />
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