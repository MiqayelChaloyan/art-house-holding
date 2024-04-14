import cn from 'classnames'

import styles from './styles.module.sass';
import { Arial, ArianAMU } from '@/lib/constants/font';
import { urlForImage } from '../../../../sanity/imageUrlBuilder';

const Promotion = ({ discount, index }: any) => {
    const aboutText = discount.about_discount.length > 150 ? discount.about_discount.slice(0, 150) + '...' : discount.about_discount;
    const path: { src: string, width: number, height: number } | any = urlForImage(discount.image);
    const transformRotate = index % 2 === 0

    return (
        <div key={discount.slug} className={styles.discount}>
            <div className={cn(styles.header_discount, transformRotate ? styles.header_discount_start : styles.header_discount_end)}>
                <div className={styles.column}>
                    <p className={cn(styles.procent, transformRotate ? styles.procent_start : styles.procent_end, Arial.className)}>{`${discount.procent}%`}</p>
                </div>
                <div className={styles.column}>
                    <img
                        src={path?.src}
                        alt={discount?.image.alt}
                        className={styles.discount_image}
                    />
                </div>
            </div>

            <div className={styles.about}>
                <p className={cn(styles.about_discount, Arial.className)}>{aboutText}</p>
            </div>
        </div>
    )
}

export default Promotion;