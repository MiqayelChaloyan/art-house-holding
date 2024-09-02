'use client'

import About from "./About";
import OurDay from "./OurDay";
import VideoPlayer from "./VideoPlayer";

interface Props {
    data: COURSES_QUERYResult;
    locale: string;
};

const Course = ({ data, locale }: Readonly<Props>) => {
    const { course_name, course_image, about_course, our_day, course_process } = data;

    return (
        <>
            <About
                course={course_name}
                image={course_image}
                about_course={about_course}
            />
            <OurDay our_day={our_day} />
            <VideoPlayer course_process={course_process} />
        </>
    )
};

export default Course;