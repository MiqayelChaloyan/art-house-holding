import { FC, useEffect } from 'react';

// import { useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

import { EDUCATIONAL_CENTER_COURSES } from '../../../../../sanity/sanity-queries/educational-center';

// 
// import Accordion from '../Accordion';
// import { Courses } from '../../../../../sanity/sanity-queries/courses';

import styles from './styles.module.sass';
import Accordion from './Accordion';
import { useTranslations } from 'next-intl';
import Container from '@/components/components/container';

type PriceListProps = {
	data: EDUCATIONAL_CENTER_COURSES[]
}

const PriceList: FC<PriceListProps> = ({ data }) => {
	const t = useTranslations('sections');
	// const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	dispatch(closeModal());
	// }, []);

	return (
		<section id='price-list' className={styles.container}>
			<Container>
				<h1 className={styles.title}>{t('price-list')}</h1>
				<Accordion courses={data} />
			</Container>
		</section>
	);
};

export default PriceList;











