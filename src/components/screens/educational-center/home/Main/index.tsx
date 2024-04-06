'use client'

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { EDUCATIONAL_CENTER_DEFAULT } from '../../../../../../sanity/sanity-queries/educational-center';
import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


interface Props {
	data: EDUCATIONAL_CENTER_DEFAULT[]
};


const Main = ({ data }: Props) => {
	const items = data[0].main_section;
	const options: EmblaOptionsType = { loop: true, align: 'center',};
	const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);


	const scrollToElement = () => {
		const container: HTMLElement | null = document.getElementById('contact');
		if (container) {
			container.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	};

	const slidesItems = items.map((item: any) => {
		const path: { src: string, width: number, height: number } | any = urlForImage(item.image);

		return (
			<SlideItem
				key={item.slug}
				url={path?.src}
				subtitle={item.title}
				content={item.content}
				scrollToElement={scrollToElement}
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
