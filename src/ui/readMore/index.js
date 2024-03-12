import { memo } from 'react';

import styles from './styles.module.sass';

const ReadMore = ({ children, isReadMore }) => {
	const text = children;
	return (
		<p className={styles.text}>
			{isReadMore ? text.slice(0, 200) + '...' : text}
		</p>
	);
};

const Content = ({ content, isReadMore }) => {
	return (
		<div>
			<ReadMore isReadMore={isReadMore}>
				{content}
			</ReadMore>
		</div>
	);
};

export default memo(Content);
