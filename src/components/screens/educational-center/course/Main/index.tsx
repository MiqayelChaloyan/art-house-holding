"use client"

import { FC } from 'react';

import SlideItem from './SlideItem';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type Props = {
	course: EDUCATIONAL_CENTER_DEFAULT[] | any
};


const Main: FC<Props> = ({ course }) => {
	const items = course[0].course_main;
	const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center', duration: 4000 }, [Autoplay({ delay: 1000 })]);
	
	const slidesItems = items.map((item: any) => {
        const path: {
            src: string;
            width: any;
            height: any;
        } | any = urlForImage(item.image)
            // .auto('format')
            // .fit('max')
            // .url();
            
        const content = item.content.length > 272 ? item.content.slice(0, 272) + '...' : item.content;
            
        // return (
        //     <SlideItem
        //         key={item.slug}
        //         url={path?.src}
        //         title={item.title}
        //         content={content}
        //         alt={item.image.alt}
        //     />
        // );
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
