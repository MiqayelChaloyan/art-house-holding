'use client'

import { MAIN } from "../../../../../../sanity/sanity-queries/design";

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';

import SlideItem from './SlideItem';

import { urlForImage } from '../../../../../../sanity/imageUrlBuilder';

import { UrlType } from '@/types/educational-center';

import styles from './styles.module.sass';


interface Props {
	data: MAIN[]
};

const Main = ({ data }: Readonly<Props>) => {
	const options: EmblaOptionsType = { loop: true, align: 'center',};
	const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);

	const slidesItems = data?.map((item: any) => {
		const path: UrlType | any = urlForImage(item.image);

		return (
			<SlideItem
				key={item._key}
				url={path?.src}
                company_name={item.company_name}
				title={item.title}
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
