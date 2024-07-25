'use client';

import { useEffect } from 'react';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import './styles.css';

const data = [
    {
        name: 'Educational Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    },
    {
        name: 'Language Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    },
    {
        name: 'Design Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    },
    {
        name: 'Help House charity Center',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    },
    {
        name: 'Regoinal Program',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!',
        imageUrl: 'https://designfor-me.com/wp-content/uploads/2023/03/interior-renovation.webp'
    }
];

const Works = () => {
    useEffect(() => {
        const next = document.querySelector('.next') as HTMLButtonElement | null;
        const prev = document.querySelector('.prev') as HTMLButtonElement | null;

        const handleNextClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.querySelector('.slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.appendChild(items[0]);
            }
        };

        const handlePrevClick = () => {
            const items = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
            const slide = document.querySelector('.slide') as HTMLElement;
            if (items.length > 0 && slide) {
                slide.prepend(items[items.length - 1]);
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
        <section className='section'>
            <div className='test'>
                <div className="slide">
                    {data.map((item, index) => (
                        <div key={index} className="item" style={{ backgroundImage: `url(${item.imageUrl})` }}>
                            <div className="content">
                                <div className="name">{item.name}</div>
                                <div className="des">{item.description}</div>
                                <button>See More</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="button">
                    <button className="prev"><MdKeyboardArrowLeft  size={30} color='white'/></button>
                    <button className="next"><MdKeyboardArrowRight size={30} color='white'/></button>
                </div>
            </div>
        </section>
    );
};

export default Works;
