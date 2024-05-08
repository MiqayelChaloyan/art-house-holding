'use client'

import { memo, useEffect } from 'react';

import About from './About';
import CourseProcess from './CourseProcess';
import StudentWork from './StudentWork';

import { EDUCATIONAL_CENTER_COURSES, HOSTS, LESSONS } from '../../../../../sanity/sanity-queries/educational-center';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import PriceList from './PriceList';
import Main from './Main';


interface CoursePageProps {
    course: EDUCATIONAL_CENTER_COURSES | any
    socialData: HOSTS
    lessons: LESSONS | any
    lessonsArmenian: LESSONS | any
}

const Course = ({
    course,
    socialData,
    lessons,
    lessonsArmenian
}: CoursePageProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [course]);

    return (
        <>
            <Main course={course} />
            <About
                course={course}
                socialData={socialData}
                lessons={lessons[0]?.course_name}
                lessonsArmenian={lessonsArmenian[0]?.course_name}
            />
            <CourseProcess course={course} />
            <StudentWork course={course} />
            <PriceList course={course} />
        </>
    );
};

export default memo(Course);