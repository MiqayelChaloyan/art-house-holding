'use client'

import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal } from '@/store/modal_reducer';

import Main from './Main';
import About from './About';
import CookingCourses from './CookingCourses';
import News from './News';
import Progress from './Progress';
import Specialists from './Specialists';
import OurRating from './OurRating';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../sanity/sanity-queries/educational-center';


type Props = {
    data: EDUCATIONAL_CENTER_DEFAULT[]
}

const EducationalCenterHome = ({ data }: Readonly<Props>) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeModal(false));
    }, []);

    return (
        <>
            <Main data={data[0]?.main_section} />
            <About data={data[0]?.about_us} />
            <CookingCourses data={data[0]?.cooking_courses} />
            <News data={data[0]?.section} />
            <Progress data={data[0]?.progress_section} />
            <Specialists data={data[0]?.specialists_section} />
            <OurRating data={data[0]?.our_rating_section} /> 
        </>
    )
}

export default React.memo(EducationalCenterHome);