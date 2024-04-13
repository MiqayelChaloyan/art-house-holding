"use client"

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import * as Action from '@/store/question_reducer';

import { Calibri } from '@/lib/constants/font';

import Checkbox from '@/lib/ui/checkbox/Checkbox';

import cn from 'classnames';

import styles from './styles.module.sass';


// const tmp = [
//     { value: '', id: 0, isChecked: false },
//     { value: '', id: 1, isChecked: false },
//     { value: '', id: 2, isChecked: false },
//     { value: '', id: 3, isChecked: false }
// ];

const Questions = ({ onCheked }: any) => {
    const questions = useSelector((state: any) => state.questions.quiz[state.questions.trace]);
    const question = useSelector((state: any) => state.questions?.quiz[state.questions.trace]);
    const options = question?.options?.map((item: string, index: number) => ({ value: item, id: index, isChecked: false }));

    const dispatch = useDispatch();

    const checkBoxes = useSelector((state: any) => state.questions.checkBoxes);


    // dispatch(Action.changeCheckBoxes(options))

    // const [checkBoxes, setCheckBoxes] = useState<any>(options || tmp);

    // const isButtonDisabled = (): boolean => {
    //     if (!checkBoxes) {
    //         return true;
    //     }

    //     const isAtLeastOneUnchecked = checkBoxes.some((checkbox: any) => !checkbox.isChecked);

    //     const areAllUnchecked = checkBoxes.every((checkbox: any) => !checkbox.isChecked);

    //     return !isAtLeastOneUnchecked || areAllUnchecked;
    // };

    const handleCheckBoxChange = (id: number) => {
        const updatedCheckBoxes = checkBoxes?.map((checkbox: any) => {
            if (checkbox.id === id) {
                return { ...checkbox, isChecked: true };
            } else {
                return { ...checkbox, isChecked: false };
            }
        });

        dispatch(Action.changeCheckBoxes(updatedCheckBoxes));

        // const disabled = isButtonDisabled();
        // setIsDisable(disabled);

        onCheked(id);
    };


    return (
        <div className={styles.field}>
            <h2 className={`${styles.question} ${Calibri.className}`}>{questions?.question}</h2>
            <ul id={questions?.id} className={styles.quiz}>
                {
                    questions?.options.map((q: any, i: number) => {
                        return (
                            <Checkbox
                                key={i}
                                label={q}
                                id={`q${i}-option`}
                                value={checkBoxes?.length && checkBoxes[i].isChecked || false}
                                onChange={() => handleCheckBoxChange(i)}
                                className={styles.answer}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Questions;