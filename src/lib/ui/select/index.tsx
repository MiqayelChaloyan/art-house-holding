'use client'

import React, { memo, useEffect, useRef, useState } from 'react';

import { LANGUAGE } from '../../../../sanity/sanity-queries/language';

import { Arial } from '@/lib/constants/font';

import styles from './styles.module.sass';

// import { useScroll } from "framer-motion";

// values: {
//     fullName: string,
//     email: string,
//     phone: string,
//     language: string
// } 
// ^
type FormProps = {
    isLoading: boolean,
    values: any
};

interface SelectProps {
    data: LANGUAGE[]
    state: FormProps
    valueName: string
    handleChange: (value: any) => void
    classNameProperty: string
    isClear: boolean
}

const Select = ({ data, state, valueName, handleChange, classNameProperty, isClear }: SelectProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const componentRef = useRef<HTMLDivElement>(null);
    // const { scrollYProgress } = useScroll();
    // const [position, setPosition] = useState<number>(0)
    const [num, setNum] = useState<number>(0)

    const handleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (e: any) => {
        const selectedText = e.currentTarget.querySelector('label').textContent;
        setNum(1)
        handleChange((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [valueName]: selectedText,
            },
        }));

        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // useEffect(() => {
    //     return scrollYProgress.on('change', (latestValue) => {
    //         if (latestValue > 0.2) {
    //             setPosition(0)

    //         } else {
    //             setPosition(60)
    //         }
    //     });
    // });
    //style={{bottom: position > 0 ? `${position}px` : ''}}

    const colorTheme = () => {
        const color = classNameProperty !== 'large' ? (num > 0 && !isClear ? 'black' : '#D4C7BA') : '#fff';
        return { color };
    }

    return (
        <div ref={componentRef} className={`${styles[`${classNameProperty}-select`]} ${isOpen ? styles.active : ''}`}>
            <span
                className={styles[`${classNameProperty}-select-button`]}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen ? 'true' : 'false'}
                aria-controls="select-dropdown"
                onClick={handleSelect}
            >
                <span className={`${styles[`${classNameProperty}-selected-value`]} ${Arial.className}`} style={colorTheme()}>{state.values[valueName]}</span>
                <span className={styles[`${classNameProperty}-arrow`]}></span>
            </span>
            <ul className={styles[`${classNameProperty}-select-dropdown`]} role="listbox" id="select-dropdown">
                {data?.map((item: any, index: number) => (
                    <li key={item?.slug.current || index} role="option" onClick={handleOptionClick} tabIndex={index}>
                        <input type="radio" id={item?.valueName} name={valueName} />
                        <label htmlFor={item?.[valueName]}>{item?.[valueName]}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default memo(Select);