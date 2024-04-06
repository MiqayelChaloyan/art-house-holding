'use client'

import { memo, useEffect } from 'react';

import About from './About';
import CourseProcess from './CourseProcess';
import StudentWork from './StudentWork';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../sanity/sanity-queries/educational-center';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import PriceList from './PriceList';
import Main from './Main';


interface CoursePageProps {
    course: EDUCATIONAL_CENTER_COURSES | any
}

const Course = ({ course }: CoursePageProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(closeModal(false)), 1);
    }, [course]);

    
    return (
        <>
            <Main course={course} />
            <About course={course}/>
            <CourseProcess course={course} />
            <StudentWork course={course} />
            <PriceList course={course} />
        </>
    );
};

export default memo(Course);