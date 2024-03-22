import React, { FC, useState } from "react";

import styles from './styles.module.sass';
import { LANGUAGE } from "../../../../sanity/sanity-queries/language";

const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry" },
    { label: "Watermelon 🍉", value: "watermelon" },
    { label: "Pear 🍐", value: "pear", disabled: true },
    { label: "Apple 🍎", value: "apple" },
    { label: "Tangerine 🍊", value: "tangerine" },
    { label: "Pineapple 🍍", value: "pineapple" },
    { label: "Peach 🍑", value: "peach" }
];

// type Language = {
//     id: number;
//     name: string;
//     email: string;
//   };

interface SelectProps {
    data: LANGUAGE[]
	state: any
	handleChange: (value: any) => void
}

const Select: FC<SelectProps>  = ({ data, state, handleChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (e: { currentTarget: { querySelector: (arg0: string) => { (): any; new(): any; textContent: any; }; }; }) => {
        const selectedText = e.currentTarget.querySelector('label').textContent;

        handleChange((prev: any) => ({
            ...prev,
            values: {
                ...prev.values,
                language: selectedText,
            },
        }));

        setIsOpen(false);
    };


    return (
        <div className={`${styles.custom_select} ${isOpen ? styles.active : ''}`}>
            <span
                className={styles.select_button}
                role="combobox"
                aria-labelledby="select button"
                aria-haspopup="listbox"
                aria-expanded={isOpen ? 'true' : 'false'}
                aria-controls="select-dropdown"
                onClick={handleSelect}
            >
                <span className={styles.selected_value}>{state.values.language}</span>
                <span className={styles.arrow}></span>
            </span>
            <ul className={styles.select_dropdown} role="listbox" id="select-dropdown">
                {data?.map((item: any, index: number) => (
                    <li key={item?.slug.current || index} role="option" onClick={handleOptionClick} tabIndex={index}>
                        <input type="radio" id={item?.course_name} name="languages" />
                        <label htmlFor={item?.course_name}>{item?.course_name}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Select;