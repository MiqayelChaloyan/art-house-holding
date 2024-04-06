import React, { FC, memo, useState } from "react";

import { LANGUAGE } from "../../../../sanity/sanity-queries/language";

import styles from './styles.module.sass';

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
}


const Select: FC<SelectProps> = ({ data, state, valueName, handleChange, classNameProperty }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (e: any) => {
        const selectedText = e.currentTarget.querySelector('label').textContent;

        handleChange((prev: FormProps) => ({
            ...prev,
            values: {
                ...prev.values,
                [valueName]: selectedText,
            },
        }));

        setIsOpen(false);
    };


    return (
        <div className={`${styles[`${classNameProperty}-select`]} ${isOpen ? styles.active : ''}`}>
            <span
                className={styles[`${classNameProperty}-select-button`]}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen ? 'true' : 'false'}
                aria-controls="select-dropdown"
                onClick={handleSelect}
            >
                <span className={styles[`${classNameProperty}-selected-value`]}>{state.values[valueName]}</span>
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