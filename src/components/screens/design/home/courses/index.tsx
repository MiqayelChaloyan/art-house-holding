import cn from 'classnames';
import styles from './styles.module.sass'
import { Arial } from '@/lib/constants/font';
import Course from './course';

const Courses = () => {

    return (
        <div style={{ backgroundColor: '#ffffff', height: '1200px' }}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>ԴԱՍԸՆԹԱՑՆԵՐ</h1>
            </div>

            <Course/>
        </div>
    )
};

export default Courses;