// import React, { useState, useEffect } from 'react';

// import cn from 'classnames';

// // import { useAppSelector, useAppDispatch } from '@/hooks/useStore';
// import { closeModal } from '@/store/stateModalSlice';

// import Cancel from '@/components/icons/educational-center/Cancel';

// import styles from './Modal.module.sass';

// interface Props {
// 	children: React.ReactElement
// }

// const SectionCareerServices: React.FC<Props> = ({ children }) => {
// 	const isOpen = useAppSelector((state) => state.stateModal.isOpen);
// 	const dispatch = useAppDispatch();

// 	const [showModal, setShowModal] = useState(false);

// 	useEffect(() => {
// 		if (isOpen) {
// 			const timerId = setTimeout(() => setShowModal(true), 1);
// 			return () => clearTimeout(timerId);
// 		} else {
// 			setShowModal(false);
// 		}
// 	}, [isOpen]);

// 	return (
// 		<div className={cn(styles.box, `${isOpen ? styles.boxOpen : ''}`)}>
// 			<div className={styles.wrap}>
// 				<div
// 					className={cn(styles.overlay, { [styles.overlayShow]: showModal })}
// 					onClick={() => {
// 						setShowModal(false);
// 						setTimeout(() => dispatch(closeModal()), 500);
// 					}}
// 				></div>
// 				<div className={cn(styles.content, { [styles.contentShow]: showModal })}>
// 					<button className={styles.close}
// 						title='Close'
// 						onClick={() => {
// 							setShowModal(false);
// 							setTimeout(() => dispatch(closeModal()), 500);
// 						}}>
// 						<Cancel
// 							width='104'
// 							height='104'
// 							fill='white'
// 						/>
// 					</button>
// 					{React.cloneElement(children)}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default SectionCareerServices;