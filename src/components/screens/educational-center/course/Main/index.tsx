'use client'

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
	course: EDUCATIONAL_CENTER_DEFAULT[] | any
};


const Main = ({ course }: Props) => {
	const items = course[0].course_main;
	const options: EmblaOptionsType = { loop: true, align: 'center',};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

	const slidesItems = items?.map((item: any) => {
        const path: { src: string, width: number, height: number } | any = urlForImage(item.image);
        const content = item.content.length > 272 ? item.content.slice(0, 272) + '...' : item.content;
            
        return (
            <SlideItem
                key={item.slug}
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

export default Main;
