import { FC, memo, useEffect } from 'react';

import About from './About';
import CourseProcess from './CourseProcess';
import StudentWork from './StudentWork';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../sanity/sanity-queries/educational-center';

// import { useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

import PriceList from './PriceList';
import Main from './Main';

type CoursePageProps = {
    course: EDUCATIONAL_CENTER_COURSES | any
}

const Course: FC<CoursePageProps> = ({ course }) => {
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     setTimeout(() => dispatch(closeModal()), 1);
    // }, [course]);


    // console.log(course, 'course><><')
    
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