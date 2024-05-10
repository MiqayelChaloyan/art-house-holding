'use client'

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { UrlType } from '@/types/educational-center';

import { COURSE_MAIN } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type Props = {
	course: COURSE_MAIN[]
};

const Main = ({ course }: Readonly<Props>) => {
	const options: EmblaOptionsType = { loop: true, align: 'center',};
	const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

	const slidesItems = course?.map((item: COURSE_MAIN) => {
        const path: UrlType | any = urlForImage(item.image);
        const content = item.content.length > 272 ? item.content.slice(0, 272) + '...' : item.content;
            
        return (
            <SlideItem
                key={item._key}
                url={path?.src}
                title={item.title}
                content={content}
            />
        );
    });


	return (
		<section id='main' className={styles.screen}>
			<div className={styles.main}>
				<div className={styles.emplay} ref={emblaRef}>
					<div className={styles.emplay_container}>
						{slidesItems}
					</div>
				</div>
			</div>
		</section>
	);
};

export default React.memo(Main);
