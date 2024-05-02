import cn from 'classnames';
import styles from './styles.module.sass'
import { Arial } from '@/lib/constants/font';

const OurDay = () => {


    return (
        <div style={{ backgroundColor: 'gray', height: '500px' }}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>OUR DAY</h2>
                <h1 className={cn(styles.title, Arial.className)}>ՄԵՐ ԱՌՕՐՅԱՆ</h1>
            </div>
        </div>
    )
};

export default OurDay;