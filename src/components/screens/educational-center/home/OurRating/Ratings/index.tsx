import { memo } from 'react';

import RatingCard from '../RatingCard';

import { urlForImage } from '../../../../../../../sanity/imageUrlBuilder';

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

const Rating = ({ data }: any) => data.map((card: any, index: number): JSX.Element => {
    const urlForImageBackground: {
        src: string;
        width: any;
        height: any;
    } | any = urlForImage(card.our_rating_section_image)
    // .auto('format')
    // .fit('max')
    // .url();

    const path: {
        src: string;
        width: any;
        height: any;
    } | any = urlForImage(card.user_image)
    // .auto('format')
    // .fit('max')
    // .url();

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

    return <RatingCard key={card.slug} options={options} />;
});

export default memo(Rating);