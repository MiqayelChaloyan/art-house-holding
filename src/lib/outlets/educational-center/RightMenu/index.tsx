'use client'

import React from 'react';

import Link from 'next/link';

import Home from '@/lib/icons/educational-center/Home';
import Courses from '@/lib/icons/educational-center//Courses';
import PriceList from '@/lib/icons/educational-center//PriceList';
import CoWorkers from '@/lib/icons/educational-center//CoWorkers';
import Contact from '@/lib/icons/educational-center//Contact';

import styles from './styles.module.sass';
import { Pages } from '@/lib/constants/pages';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/modal_reducer';


type Props = {
    locale: string
};

const RightMenu = ({locale}: Props) => {
    const dispatch = useDispatch();

	return (
		<div className={styles.nav_menu}>
			<div className={styles.nav_list}>
				<Link
					className={styles.btn_home}
					href={`/${locale}${Pages.EDUCATIONAL_HOME}`}	
                    aria-label={`${Pages.EDUCATIONAL_HOME}`}
					// title='Home'
				>
					<Home width={20} height={20} fill='white' />
				</Link>
				<button
					className={styles.btn_courses}
					onClick={() => setTimeout(() => dispatch(openModal(true)), 500)}
					// title='Courses'
				>
					<Courses width={20} height={20} fill='white' />
				</button>
				<Link
					className={styles.btn_price_list}
					href={`/${locale}${Pages.EDUCATIONAL_PRICE_LIST}`}
					aria-label={`${Pages.EDUCATIONAL_PRICE_LIST}`}
					// title='Price List'
				>
					<PriceList width={20} height={20} fill='white' />
				</Link>
				<Link
					className={styles.btn_co_worker}
					href={`/${locale}${Pages.EDUCATIONAL_PARTNERS}`}
					aria-label={`${Pages.EDUCATIONAL_PARTNERS}`}
					// title='Co Worker'
				>
					<CoWorkers width={25} height={20} fill='white' />
				</Link>
				<Link
					className={styles.btn_contact_us}
					href='tel:+37477111111'
					aria-label='Contact us'
					// title='Contact us'
				>
					<Contact width={20} height={20} fill='white' />
				</Link>
			</div>
		</div>
	);
};

export default RightMenu;