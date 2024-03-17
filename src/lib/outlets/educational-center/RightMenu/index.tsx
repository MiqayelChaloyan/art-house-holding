import React from 'react';

import Link from 'next/link';

// import { useAppDispatch } from '@/hooks/useStore';
// import { openModal } from '@/store/stateModalSlice';

import Home from '@/lib/icons/educational-center/Home';
import Courses from '@/lib/icons/educational-center//Courses';
import PriceList from '@/lib/icons/educational-center//PriceList';
import CoWorkers from '@/lib/icons/educational-center//CoWorkers';
import Contact from '@/lib/icons/educational-center//Contact';

import styles from './styles.module.sass';

const RightMenu = () => {
	// const dispatch = useAppDispatch();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={styles.btn_home}
					href='/'
					aria-label='Home'
					title='Home'
				>
					<Home width={20} height={20} fill='white' />
				</Link>
				<button
					className={styles.btn_courses}
					// onClick={() => setTimeout(() => dispatch(openModal()), 500)}
					title='Courses'
				>
					<Courses width={20} height={20} fill='white' />
				</button>
				<Link
					className={styles.btn_price_list}
					href='/price_list'
					aria-label='Price List'
					title='Price List'
				>
					<PriceList width={20} height={20} fill='white' />
				</Link>
				<Link
					className={styles.btn_co_worker}
					href='/co_workers'
					aria-label='Co Worker'
					title='Co Worker'
				>
					<CoWorkers width={25} height={20} fill='white' />
				</Link>
				<Link
					className={styles.btn_contact_us}
					href='tel:+37477111111'
					aria-label='Contact us'
					title='Contact us'
				>
					<Contact width={20} height={20} fill='white' />
				</Link>
			</div>
		</div>
	);
};

export default RightMenu;