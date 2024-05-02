'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './styles.module.sass';
import { ImagePaths } from '@/lib/constants';
import Container from '@/components/components/container';

const data = [
    {
        index: 0,
        path: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
        index: 1,
        path: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
        index: 2,
        path: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
];



interface CourseProps {
    position: 'left' | 'right';
}

const Course = ({ position }: CourseProps) => {
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 5000);

        return () => clearTimeout(timer); // Cleanup function to clear the timeout
    }, [index]); // Trigger the effect whenever index changes

    return (
        <Container>
            {position === 'left' ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Image
                            src={ImagePaths.DESIGN.staplerURL.default.src}
                            alt='stapler'
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                        <figure className={styles.imagesContainer}>
                            {data.map((item) => (
                                <img
                                    key={item.index}
                                    className={`${styles.slide} ${index === item.index ? styles.active : styles.next}`}
                                    src={item.path}
                                    alt='alt'
                                />
                            ))}
                        </figure>
                    </div>
                    <div>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nihil quaerat, eius rerum, aliquam ipsam asperiores in dignissimos
                            unde dicta iste pariatur sit natus consequuntur modi nobis eveniet
                            cumque odit. Quisquam nulla, eos repellat commodi quaerat eaque
                            veritatis! Qui, vel labore.
                        </h2>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Nihil quaerat, eius rerum, aliquam ipsam asperiores in dignissimos
                            unde dicta iste pariatur sit natus consequuntur modi nobis eveniet
                            cumque odit. Quisquam nulla, eos repellat commodi quaerat eaque
                            veritatis! Qui, vel labore.
                        </h2>
                    </div>
                    <div>
                        <Image
                            src={ImagePaths.DESIGN.staplerURL.default.src}
                            alt='stapler'
                            className={styles.image}
                            width={500}
                            height={500}
                            priority
                        />
                        <figure className={styles.imagesContainer}>
                            {data.map((item) => (
                                <img
                                    key={item.index}
                                    className={`${styles.slide} ${index === item.index ? styles.active : styles.next}`}
                                    src={item.path}
                                    alt='alt'
                                />
                            ))}
                        </figure>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default Course;