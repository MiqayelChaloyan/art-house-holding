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

const EducationalCenterHome = ({ data }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(closeModal(false));
    }, []);

    console.log(data[0].section)

    return (
        <>
            <Main data={data} />
            <About data={data} />
            <CookingCourses data={data} />
            <News data={data[0]?.section} />
            <Progress data={data} />
            <Specialists data={data} />
            <OurRating data={data} /> 
        </>
    )
}

export default React.memo(EducationalCenterHome);