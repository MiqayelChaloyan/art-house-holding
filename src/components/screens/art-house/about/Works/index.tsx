'use client';

import React, { useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import colors from '@/themes';

import cn from 'classnames';

import styles from './styles.module.sass';

const data = [
    {
        name: 'Educational Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    },
    {
        name: 'Language Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://t3.ftcdn.net/jpg/05/35/47/38/360_F_535473874_OWCa2ohzXXNZgqnlzF9QETsnbrSO9pFS.jpg'
    },
    {
        name: 'Design Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://images2.alphacoders.com/134/1347182.png'
    },
    {
        name: 'Help House charity Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://t4.ftcdn.net/jpg/06/89/80/39/360_F_689803910_Ml7A9Xlx49dlA1zPPAFzRlf5EGWaYTzi.jpg'
    },
    {
        name: 'Regional Program',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://a-static.besthdwallpaper.com/artistic-landscape-green-mountain-wallpaper-2160x1440-55129_40.jpg'
    }
];


const Works = () => {
    useEffect(() => {
        const next = document.getElementById('next') as HTMLButtonElement | null;
        const prev = document.getElementById('prev') as HTMLButtonElement | null;

        const disableButtonsTemporarily = () => {
            if (next && prev) {
                next.disabled = true;
                prev.disabled = true;
                setTimeout(() => {
                    next.disabled = false;
                    prev.disabled = false;
                }, 500);
            }
        };

        const handleNextClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.getElementById('slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.appendChild(items[0]);
                disableButtonsTemporarily();
            }
        };

        const handlePrevClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.getElementById('slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.prepend(items[items.length - 1]);
                disableButtonsTemporarily();
            }
        };

        next?.addEventListener('click', handleNextClick);
        prev?.addEventListener('click', handlePrevClick);

        return () => {
            next?.removeEventListener('click', handleNextClick);
            prev?.removeEventListener('click', handlePrevClick);
        };
    }, []);


    return (
        <section className={styles.slides}>
            <div className={styles.test}>
                <div id='slide' className={styles.slide}>
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.item} item`}
                            style={{ backgroundImage: `url(${item.imageUrl})` }}
                        >
                            <div className={styles.content}>
                                <h3 className={styles.name}>{item.name}</h3>
                                <p className={styles.des}>{item.description}</p>
                                <button>See More</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.button}>
                    <button id='prev' className={styles.prev}>
                        <MdKeyboardArrowLeft size={30} color={colors.white} />
                    </button>
                    <button id='next' className={styles.next}>
                        <MdKeyboardArrowRight size={30} color={colors.white} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Works);
