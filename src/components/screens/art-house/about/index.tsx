'use client'

import Layout from '@/lib/outlets/art-house/layout';

import About from './About';
import Testimonials from './Testimonials';
import WebSitesPortfolio from './WebSitesPortfolio';


const AboutUs = ({ data, locale }: any) => {
    const { our_rating, our_websites, about_us_section } = data;

    return (
        <Layout locale={locale} headerPosition='fixed'>
            <WebSitesPortfolio
                locale={locale}
                data={our_websites}
            />
            <About
                content={about_us_section.about_us_content}
                image={about_us_section.image}
            />
            <Testimonials our_rating={our_rating}/>
        </Layout>
    )
};

export default AboutUs;