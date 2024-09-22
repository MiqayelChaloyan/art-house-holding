'use client'

import Layout from '@/src/lib/outlets/art-house/layout';
import About from './About';
import Testimonials from './Testimonials';


interface Props {
    data: ABOUT_US_DETAILS_Result;
};

const AboutUs = ({ data }: Readonly<Props>) => {
    const { our_rating, about_us_section } = data;

    return (
        <Layout headerPosition='fixed'>
            <About content={about_us_section?.about_us_content} image={about_us_section?.image} />
            <Testimonials our_rating={our_rating} />
        </Layout>
    )
};

export default AboutUs;