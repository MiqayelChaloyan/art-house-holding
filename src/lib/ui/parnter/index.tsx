import { memo } from 'react';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';

import styles from './styles.module.sass';


const Partner = ({ item }: any) => {
    const { alt } = item;

    const urlForSvg = urlForImage(item)
        // .auto('format')
        // .fit('max')
        // .url();


    return (
        <div className={styles.co_worker}>
            <div className={styles.logo}>
                <img src={urlForSvg?.src} alt={alt} className={styles.svg_icon} />
            </div>
        </div>
    );
};


export default memo(Partner);