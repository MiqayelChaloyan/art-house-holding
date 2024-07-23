'use client'

import Layout from "@/lib/outlets/art-house/layout";
import About from "./About";
import Header from "./Header";


const AboutUs = ({ locale }: any) => {
    return (
        <Layout locale={locale} headerPosition='fixed'>
            <Header/>
            <About />
        </Layout>
    )
};

export default AboutUs;