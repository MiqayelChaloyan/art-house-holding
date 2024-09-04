'use client'

import Container from "@/components/components/container";
import AboutUs from "./AboutUs";
import Strengths from "./Strengths";
import VideoPlayer from "./VideoPlayer";


interface Props {
    data: ABOUT_US_DETAILS_QUERYResult;
};

const About = ({ data }: Readonly<Props>) => {
    return (
        <>
            <AboutUs data={data?.about_us} />
            <Strengths data={data?.strengths}/>
            <VideoPlayer video={data?.video}/>
        </>
    )
};

export default About;