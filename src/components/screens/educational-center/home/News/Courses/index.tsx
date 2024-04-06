'use client'

import { memo } from 'react';

import Course from '../Course';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


interface Props {
    data: any
};


const Courses = ({ data }: Props) => {
    const scrollToElement = () => {
        const container: HTMLElement | null = document.getElementById('contact');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        data.map((item: any): JSX.Element => {
            const path1: { src: string, width: number, height: number } | any = urlForImage(item.news_image_one);
            const path2: { src: string, width: number, height: number } | any = urlForImage(item.news_image_two);

            const course = {
                subtitle: item.subtitle,
                urlForImageOne: path1.src,
                urlForImageTwo: path2.src,
                content: item.content,
                scrollToElement,
                altOne: item.news_image_one.alt,
                altTwo: item.news_image_two.alt,
                categories: item.categories
            };            

            return (
                <Course  {...course} key={item.slug} />
            );
        }
        ));
};

export default memo(Courses);