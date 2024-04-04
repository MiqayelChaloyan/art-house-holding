"use client"

import { FC } from 'react';

import SlideItem from './SlideItem';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type Props = {
	data: EDUCATIONAL_CENTER_DEFAULT[]
};


const Main: FC<Props> = ({ data }) => {
	const items = data[0].main_section;
	const [emblaRef] = useEmblaCarousel({ loop: true, align: 'center', duration: 4000 }, [Autoplay({ delay: 1000 })]);

	const scrollToElement = () => {
		const container: HTMLElement | null = document.getElementById('contact');
		if (container) {
			container.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const slidesItems = items.map((item: any) => {
		const urlFor = urlForImage(item.image)
			// .auto('format')
			// .fit('max')
			// .url();

		// return (
		// 	<SlideItem
		// 		key={item.slug}
		// 		url={urlFor?.src}
		// 		alt={item.image.alt}
		// 		subtitle={item.title}
		// 		content={item.content}
		// 		scrollToElement={scrollToElement}
		// 	/>
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
