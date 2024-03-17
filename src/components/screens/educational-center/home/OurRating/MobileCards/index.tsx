import RatingCard from '../RatingCard';

import { urlFor } from '../../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const MobileCards = (data: any, slideIndex: any) => {
    const feedbacks = data.map((card: any, index: string): JSX.Element => {

        const urlForImageBackground = urlFor(card.our_rating_section_image)
            .auto('format')
            .fit('max')
            .url();

        const urlForImage = urlFor(card.user_image)
            .auto('format')
            .fit('max')
            .url();

        const urlImageBackgroundAlt = card.our_rating_section_image.alt;
        const urlImageAlt = card.user_image.alt;
        const name = card.user_name;

        const options = {
            name,
            urlForImageBackground,
            urlImageBackgroundAlt,
            urlForImage,
            urlImageAlt,
            result: card?.user_feedback,
            rating: card.rating + 1,
        };

        return (
            <div key={card.slug}  className={index === slideIndex ? `${styles.slide} ${styles.slide_active}` : styles.slide}>
                <RatingCard options={options} />
            </div>
        );
    });

    return feedbacks;
};

export default MobileCards;