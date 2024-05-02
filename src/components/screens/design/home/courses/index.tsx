'use client'
import cn from 'classnames';
import styles from './styles.module.sass'
import { Arial } from '@/lib/constants/font';
import Course from './course';


const Courses = () => {

    return (
        <div style={{ backgroundColor: '#ffffff', height: 'max-content' }}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>ԴԱՍԸՆԹԱՑՆԵՐ</h1>
            </div>

            <Course position='left'/>
            <Course position='right'/>
        </div>
    )
};

export default Courses;