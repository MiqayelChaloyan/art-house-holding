'use client'

import React from 'react';

import RatingCard from '../RatingCard';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';
import { UrlType } from '@/types/educational-center';
import { OUR_RATING } from '../../../../../../../sanity/sanity-queries/educational-center';

const sizes = [
    {
        top: 60,
        left: 2,
        bottom: 20
    },
    {
        top: 40,
        left: 15,
        bottom: 40
    },
    {
        top: 70,
        left: 2,
        bottom: 5
    }
];

type Props = {
    data: OUR_RATING[]
};

const Rating = ({ data }: Readonly<Props>) =>
    data?.map((card: OUR_RATING, index: number): JSX.Element => {
        const urlForImageBackground: UrlType | any = urlForImage(card.our_rating_section_image);
        const path: UrlType | any = urlForImage(card.user_image);

        const urlImageBackgroundAlt = card.our_rating_section_image.alt;
        const urlImageAlt = card.user_image.alt;
        const name = card.user_name;

        const options = {
            name,
            urlForImageBackground: urlForImageBackground.src,
            urlImageBackgroundAlt,
            urlForImage: path.src,
            urlImageAlt,
            result: card?.user_feedback,
            rating: card.rating + 1,
            ...sizes[index],
        };

        return <RatingCard key={card._key} options={options} />;
});

export default React.memo(Rating);