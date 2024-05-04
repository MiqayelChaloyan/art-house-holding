'use client'
import Course from './course';

import { Arial } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass'


const data = [1,2];

const Courses = () => {
    return (
        <section id='design-courses' className={styles['design-courses']}>
            <div className={styles.titles}>
                <h2 className={cn(styles['title-back'], Arial.className)}>COURSES</h2>
                <h1 className={cn(styles.title, Arial.className)}>ԴԱՍԸՆԹԱՑՆԵՐ</h1>
            </div>

            {data.map(item => (
                <Course key={item} position={item % 2 !== 0 ? 'left' : 'right'}/>
            ))}
        </section>
    )
};

export default Courses;