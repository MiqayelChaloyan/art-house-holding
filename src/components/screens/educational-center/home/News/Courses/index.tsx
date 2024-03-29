"use client"

import { FC, memo } from 'react';

import Course from '../Course';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';


type Props = {
    data: any
};


const Courses: FC<Props> = ({ data }) => {
    const scrollToElement = () => {
        const container: HTMLElement | null = document.getElementById('contact');
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        data.map((item: any): JSX.Element => {
            const urlForImageOne = urlForImage(item.news_image_one)
                // .auto('format')
                // .fit('max')
                // .url();

            const urlForImageTwo = urlForImage(item.news_image_two)
                // .auto('format')
                // .fit('max')
                // .url();

            const course = {
                subtitle: item.subtitle,
                urlForImageOne,
                urlForImageTwo,
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