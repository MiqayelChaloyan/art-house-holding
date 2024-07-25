'use client'

import Layout from "@/lib/outlets/art-house/layout";
import About from "./About";
import Header from "./Header";
import ReviewsSlider from "./Test";
import Works from "./Works";


const AboutUs = ({ data, locale }: any) => {
    const { main_section, about_us_section } = data;

    return (
        <Layout locale={locale} headerPosition='fixed'>
            <Header
                primaryTitle={main_section.primary_title}
                secondaryTitle={main_section.secondary_title}
                bgImage={main_section.background_image}
            />
            <About
                content={about_us_section.about_us_content}
                image={about_us_section.image}
            />
            <Works />
            <ReviewsSlider />
        </Layout>
    )
};

export default AboutUs;