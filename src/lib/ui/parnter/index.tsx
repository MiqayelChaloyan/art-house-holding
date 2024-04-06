import { memo } from 'react';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const Partner = ({ item }: any) => {
    const { logo: { alt }, logo } = item;

    const path = urlForImage(logo);

    return (
        <div className={styles.co_worker}>
            <div className={styles.logo}>
                <img src={path?.src} alt={alt} className={styles.svg_icon} />
            </div>
        </div>
    );
};


export default memo(Partner);