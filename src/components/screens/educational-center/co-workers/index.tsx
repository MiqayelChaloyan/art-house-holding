import { FC, useEffect } from 'react';

import { useTranslations } from 'next-intl';

// import { useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

import { EDUCATIONAL_CENTER_CO_WORKERS } from '../../../../../sanity/sanity-queries/educational-center';

import Image from 'next/image';

import Container from '@/components/components/container';

import { urlForImage } from '../../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


type CoWorkersProps = {
	data: EDUCATIONAL_CENTER_CO_WORKERS[]
};

const CoWorkers: FC<CoWorkersProps> = ({ data }) => {
	const t = useTranslations('sections');
	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(closeModal());
	// }, []);

	const workers = data.map((item: any) => {
		const urlFor = urlForImage(item.logo)
			// .auto('format')
			// .fit('max')
			// .url();

		return (
			<div key={item._id} className={styles.co_worker}>
				<div className={styles.image_container}>
					{/* <Image
						src={urlForImage}
						alt={item.logo.alt || 'company-logo'}
						priority
						className={styles.image}
						width={0}
						height={0}
						sizes="100vw"
						style={{ objectFit: 'cover' }}
					/> */}

					<img src={urlFor?.src} className={styles.image}/>
				</div>
				<p className={styles.text}>{item.company_name}</p>
				<p className={styles.text}>{item.cooperation}</p>
				<p className={styles.text}>{item.implemented_projects}</p>
			</div>
		);
	});

	return (
		<section id='co-workers' className={styles.container}>
			<div className={styles.skew} />
			<Container>
				<h1 className={styles.title}>{t('co-worker')}</h1>
				<div className={styles.workers}>
					{workers}
				</div>
			</Container>
		</section>
	);
};

export default CoWorkers;