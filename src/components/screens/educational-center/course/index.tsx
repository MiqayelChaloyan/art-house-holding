'use client'

import React, { useEffect } from 'react';

import About from './About';
import CourseProcess from './CourseProcess';
import StudentWork from './StudentWork';

import { COURSES, HOSTS, LESSONS } from '../../../../../sanity/sanity-queries/educational-center';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import PriceList from './PriceList';
import Main from './Main';


type Props = {
    course: COURSES[]
    socialData: HOSTS
    lessons: LESSONS[]
    lessonsArmenian: LESSONS[]
}

const Course = ({
    course,
    socialData,
    lessons,
    lessonsArmenian
}: Readonly<Props>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [course]);

    return (
        <>
            <Main course={course[0]?.course_main} />
            <About
                course={course[0]}
                socialData={socialData}
                lessons={lessons[0]?.course_name}
                lessonsArmenian={lessonsArmenian[0]?.course_name}
            />
            <CourseProcess course={course[0]?.course_process} />
            <StudentWork course={course[0]?.student_works} />
            <PriceList price_list={course[0]?.price_list} />
        </>
    );
};

export default React.memo(Course);